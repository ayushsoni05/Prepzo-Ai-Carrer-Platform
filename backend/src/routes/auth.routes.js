import express from 'express';
import {
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
  setupMFA,
  verifyAndEnableMFA,
  loginMFA,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authLimiter, registerLimiter, passwordResetLimiter, bruteForceProtection } from '../middleware/rateLimit.middleware.js';
import { validate, registerSchema, loginSchema, verifyOTPSchema, resendOTPSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema } from '../validators/schemas.js';

const router = express.Router();

// Public routes with rate limiting
router.post('/register', registerLimiter, validate({ body: registerSchema }), register);
router.post('/login', authLimiter, bruteForceProtection, validate({ body: loginSchema }), login);
router.post('/refresh', refresh);

// Email verification
router.post('/verify-email', validate({ body: verifyOTPSchema }), verifyEmail);
router.post('/resend-otp', validate({ body: resendOTPSchema }), resendOTP);

// Password reset
router.post('/forgot-password', passwordResetLimiter, validate({ body: forgotPasswordSchema }), forgotPassword);
router.post('/reset-password', passwordResetLimiter, validate({ body: resetPasswordSchema }), resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/logout-all', protect, logoutAll);
router.post('/change-password', protect, validate({ body: changePasswordSchema }), changePassword);
router.get('/sessions', protect, getSessions);

// MFA Routes
router.post('/mfa/setup', protect, setupMFA);
router.post('/mfa/verify', protect, verifyAndEnableMFA);
router.post('/mfa/login', protect, loginMFA); // Needs protect because login returns partial token

export default router;
