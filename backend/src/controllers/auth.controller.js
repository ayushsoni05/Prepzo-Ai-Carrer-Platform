import User from '../models/User.model.js';
import RefreshToken from '../models/RefreshToken.model.js';
import OTP from '../models/OTP.model.js';
import AuditLog from '../models/AuditLog.model.js';
import {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
  revokeRefreshToken,
  revokeAllUserTokens,
  setTokenCookies,
  clearTokenCookies,
} from '../middleware/auth.middleware.js';
import { validatePasswordStrength } from '../utils/passwordSecurity.js';
import { securityConfig } from '../config/security.config.js';

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      collegeName,
      degree,
      fieldOfStudy,
      yearOfStudy,
      targetRole,
      knownTechnologies,
      linkedin,
      github,
      password,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      await AuditLog.log({
        userEmail: email,
        action: 'register',
        category: 'authentication',
        severity: 'low',
        status: 'failure',
        description: 'Registration failed - email already exists',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
        code: 'EMAIL_EXISTS',
      });
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password, { email, fullName });
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        errors: passwordValidation.errors,
        code: 'WEAK_PASSWORD',
      });
    }

    // Parse technologies
    let technologiesArray = knownTechnologies;
    if (typeof knownTechnologies === 'string') {
      technologiesArray = knownTechnologies.split(',').map(tech => tech.trim()).filter(Boolean);
    }

    // Create user
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      dateOfBirth,
      gender,
      collegeName,
      degree,
      fieldOfStudy,
      yearOfStudy,
      targetRole,
      knownTechnologies: technologiesArray || [],
      linkedin: linkedin || '',
      github: github || '',
      password,
      isEmailVerified: false,
      accountStatus: 'pending_verification',
    });

    // Generate OTP for email verification
    const { otp } = await OTP.createOTP({
      email: user.email,
      userId: user._id,
      type: 'email_verification',
      expiryMinutes: 5,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    console.log(`[DEV] Email verification OTP for ${user.email}: ${otp}`);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshTokenData = await generateRefreshToken(user, null, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    setTokenCookies(res, accessToken, refreshTokenData.token);

    await AuditLog.log({
      userId: user._id,
      userEmail: user.email,
      action: 'register',
      category: 'authentication',
      severity: 'low',
      status: 'success',
      description: 'User registered successfully',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      user: user.toJSON(),
      accessToken,
      refreshToken: refreshTokenData.token,
      token: accessToken, // Backwards compatibility
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe = false } = req.body;

    const user = await User.findByEmailWithPassword(email);

    if (!user) {
      await AuditLog.log({
        userEmail: email,
        action: 'login_failed',
        category: 'authentication',
        severity: 'low',
        status: 'failure',
        description: 'Login failed - user not found',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      const remainingTime = user.getRemainingLockoutTime();
      return res.status(403).json({
        success: false,
        message: `Account is locked. Try again in ${Math.ceil(remainingTime / 60000)} minutes.`,
        code: 'ACCOUNT_LOCKED',
      });
    }

    // Check login delay
    const loginDelay = user.getLoginDelay();
    if (loginDelay > 0 && user.lastFailedLoginAt) {
      const timeSinceLastFail = Date.now() - user.lastFailedLoginAt.getTime();
      if (timeSinceLastFail < loginDelay) {
        const waitTime = Math.ceil((loginDelay - timeSinceLastFail) / 1000);
        return res.status(429).json({
          success: false,
          message: `Please wait ${waitTime} seconds before trying again`,
        });
      }
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      await user.recordFailedLogin();

      await AuditLog.log({
        userId: user._id,
        userEmail: user.email,
        action: 'login_failed',
        category: 'authentication',
        severity: 'low',
        status: 'failure',
        description: `Login failed - incorrect password (attempt ${user.failedLoginAttempts})`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    await user.recordSuccessfulLogin(req.ip);

    const accessToken = generateAccessToken(user);
    const refreshTokenData = await generateRefreshToken(user, null, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    setTokenCookies(res, accessToken, refreshTokenData.token, rememberMe);

    await AuditLog.log({
      userId: user._id,
      userEmail: user.email,
      action: 'login_success',
      category: 'authentication',
      severity: 'low',
      status: 'success',
      description: 'User logged in successfully',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.json({
      success: true,
      user: user.toJSON(),
      accessToken,
      refreshToken: refreshTokenData.token,
      token: accessToken, // Backwards compatibility
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      });
    }

    const tokens = await refreshTokens(refreshToken, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

    res.json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: tokens.user,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    clearTokenCookies(res);
    res.status(401).json({
      success: false,
      message: 'Token refresh failed',
    });
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken, 'logout');
    }

    clearTokenCookies(res);

    if (req.user) {
      await AuditLog.log({
        userId: req.user._id,
        userEmail: req.user.email,
        action: 'logout',
        category: 'authentication',
        severity: 'low',
        status: 'success',
        description: 'User logged out',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.json({ success: true, message: 'Logged out' });
  }
};

/**
 * @desc    Logout from all devices
 * @route   POST /api/auth/logout-all
 * @access  Private
 */
export const logoutAll = async (req, res) => {
  try {
    await revokeAllUserTokens(req.user._id, 'logout');
    clearTokenCookies(res);

    res.json({ success: true, message: 'Logged out from all devices' });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({ success: false, message: 'Failed to logout from all devices' });
  }
};

/**
 * @desc    Verify email with OTP
 * @route   POST /api/auth/verify-email
 * @access  Public
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await OTP.verifyOTP(email, otp, 'email_verification');

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        message: result.reason,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      await user.verifyEmail();
    }

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
};

/**
 * @desc    Resend verification OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOTP = async (req, res) => {
  try {
    const { email, type = 'email_verification' } = req.body;

    const canResend = await OTP.canResendOTP(email, type, 60000);
    if (!canResend.canResend) {
      return res.status(429).json({
        success: false,
        message: `Please wait ${canResend.waitTime} seconds`,
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: true, message: 'If an account exists, a code has been sent' });
    }

    const { otp } = await OTP.createOTP({
      email: user.email,
      userId: user._id,
      type,
      expiryMinutes: 5,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    console.log(`[DEV] ${type} OTP for ${user.email}: ${otp}`);

    res.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to send code' });
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.json({ success: true, message: 'If an account exists, a reset code has been sent' });
    }

    const { otp } = await OTP.createOTP({
      email: user.email,
      userId: user._id,
      type: 'password_reset',
      expiryMinutes: 5,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });
    console.log(`[DEV] Password reset OTP for ${user.email}: ${otp}`);

    res.json({ success: true, message: 'If an account exists, a reset code has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Failed to process request' });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const result = await OTP.verifyOTP(email, otp, 'password_reset');
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.reason });
    }

    const user = await User.findByEmailWithPassword(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const passwordValidation = validatePasswordStrength(newPassword, { email: user.email, fullName: user.fullName });
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors,
      });
    }

    if (await user.isPasswordInHistory(newPassword)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot reuse a recent password',
      });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    if (user.isAccountLocked) {
      user.isAccountLocked = false;
      user.accountLockedAt = null;
      user.accountLockReason = null;
      user.failedLoginAttempts = 0;
    }
    await user.save();

    await revokeAllUserTokens(user._id, 'password_reset');

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};

/**
 * @desc    Change password
 * @route   POST /api/auth/change-password
 * @access  Private
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password +passwordHistory');

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const passwordValidation = validatePasswordStrength(newPassword, { email: user.email, fullName: user.fullName });
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors,
      });
    }

    if (await user.isPasswordInHistory(newPassword)) {
      return res.status(400).json({ success: false, message: 'Cannot reuse a recent password' });
    }

    user.password = newPassword;
    await user.save();

    await revokeAllUserTokens(user._id, 'password_change');

    const accessToken = generateAccessToken(user);
    const refreshTokenData = await generateRefreshToken(user, null, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    setTokenCookies(res, accessToken, refreshTokenData.token);

    res.json({
      success: true,
      message: 'Password changed successfully',
      accessToken,
      refreshToken: refreshTokenData.token,
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};

/**
 * @desc    Get active sessions
 * @route   GET /api/auth/sessions
 * @access  Private
 */
export const getSessions = async (req, res) => {
  try {
    const sessions = await RefreshToken.getActiveSessions(req.user._id);

    res.json({
      success: true,
      sessions: sessions.map(s => ({
        id: s._id,
        createdAt: s.createdAt,
        lastUsedAt: s.lastUsedAt,
        device: s.deviceInfo,
        ip: s.createdByIp,
      })),
    });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ success: false, message: 'Failed to get sessions' });
  }
};

export default {
  register,
  login,
  refresh,
  getMe,
  logout,
  logoutAll,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword,
  changePassword,
  getSessions,
};