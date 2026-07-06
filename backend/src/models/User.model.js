import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../utils/encryption.js';

const userSchema = new mongoose.Schema({
  // Basic Information (from signup)
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: 2,
  },
  pronouns: {
    type: String,
    default: '',
  },
  headline: {
    type: String,
    default: '',
  },
  industry: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple nulls
  },
  avatar: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    required: false, // Make optional for OAuth users
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: false, // Make optional for OAuth users
  },
  gender: {
    type: String,
    required: false, // Make optional for OAuth users
    enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other', 'male', 'female', 'non-binary', 'prefer not to say', 'other'],
    set: function(val) {
      if (val && typeof val === 'string') {
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
      }
      return val;
    }
  },
  password: {
    type: String,
    required: false, // Make optional for OAuth users
    minlength: 8,
    select: false,
  },

  // Education Information
  collegeName: {
    type: String,
    required: false,
    trim: true,
  },
  degree: {
    type: String,
    required: false,
  },
  fieldOfStudy: {
    type: String,
    required: false,
  },
  yearOfStudy: {
    type: String,
    required: false,
  },
  cgpa: {
    type: String,
    default: '',
  },

  // Career Information
  targetRole: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500,
  },
  location: {
    type: String,
    default: '',
  },
  coverPhoto: {
    type: String,
    default: '',
  },
  profileSlug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  profileLanguage: {
    type: String,
    default: 'English',
  },
  experiences: [{
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, default: '' }
  }],
  portfolioProjects: [{
    title: { type: String, required: true },
    description: { type: String, default: '' },
    link: { type: String, default: '' },
    technologies: { type: [String], default: [] }
  }],
  certifications: [{
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, default: '' },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' }
  }],
  languages: {
    type: [String],
    default: [],
  },
  knownTechnologies: {
    type: [String],
    default: [],
  },
  skillRatings: {
    type: Map,
    of: Number, // Maps skill name to rating (1-10)
    default: {},
  },

  // Career Goals (from onboarding)
  placementTimeline: {
    type: String,
    default: '',
  },
  expectedCtc: {
    type: String,
    default: '',
  },
  preferredCompanies: {
    type: [String],
    default: [],
  },

  // Social Links
  linkedin: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  resumeText: {
    type: String,
    default: '',
  },
  resumeOriginalName: {
    type: String,
    default: '',
  },
  resumeUploadedAt: {
    type: Date,
    default: null,
  },

  // LaTeX Resume Data
  latexResumeSource: {
    type: String,
    default: '',
  },
  latexTemplateId: {
    type: String,
    default: '',
  },
  latexLastCompiledAt: {
    type: Date,
    default: null,
  },

  // Platform Data
  role: {
    type: String,
    enum: ['student', 'recruiter', 'admin'],
    default: 'student',
  },
  isTopVoice: {
    type: Boolean,
    default: false,
  },
  isOnboarded: {
    type: Boolean,
    default: false,
  },
  isAssessmentComplete: {
    type: Boolean,
    default: false,
  },
  isFieldTestComplete: {
    type: Boolean,
    default: false,
  },
  isSkillTestComplete: {
    type: Boolean,
    default: false,
  },
  lastAssessmentAt: {
    type: Date,
    default: null,
  },
  fieldAssessmentResults: {
    score: Number,
    sections: [{
      name: String,
      score: Number,
      correct: Number,
      total: Number
    }],
    completedAt: Date
  },
  skillAssessmentResults: {
    score: Number,
    sections: [{
      name: String,
      score: Number,
      correct: Number,
      total: Number
    }],
    completedAt: Date
  },


  // Assessment Scores
  placementReadinessScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  atsScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  atsHistory: [{
    score: { type: Number, min: 0, max: 100 },
    targetRole: { type: String },
    analyzedAt: { type: Date, default: Date.now },
    source: { type: String, enum: ['analyze', 'reanalyze'], default: 'analyze' }
  }],

  // ========== RESUME ANALYSIS (AI-GENERATED) ==========
  resumeAnalysis: {
    // Overall ATS Score
    overallScore: { type: Number, default: 0, min: 0, max: 100 },
    
    // Section-wise Analysis
    sections: [{
      name: { type: String },
      score: { type: Number, min: 0, max: 100 },
      feedback: [{ type: String }],
      icon: { type: String }
    }],
    
    // Keywords Analysis
    keywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    keywordMatchScore: { type: Number, default: 0 },
    
    // AI-Generated Suggestions
    suggestions: [{ type: String }],
    
    // Improved Lines (AI-generated better versions)
    improvedLines: [{
      original: { type: String },
      improved: { type: String },
      reason: { type: String }
    }],
    
    // Professional Summary Suggestion
    suggestedSummary: { type: String },
    
    // Role-Based Analysis
    jobMatch: {
      targetRole: { type: String },
      matchPercentage: { type: Number, default: 0 },
      requiredSkillsMatch: [{
        skill: { type: String },
        found: { type: Boolean },
        importance: { type: String, enum: ['required', 'preferred', 'nice-to-have'] }
      }]
    },
    
    // Skill Gaps with Recommendations
    skillGapsDetailed: [{
      skill: { type: String },
      importance: { type: String, enum: ['critical', 'high', 'medium', 'low'] },
      description: { type: String },
      certifications: [{
        name: { type: String },
        provider: { type: String },
        url: { type: String },
        duration: { type: String },
        difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
        skills: [{ type: String }],
        price: { type: String },
        rating: { type: Number }
      }]
    }],
    
    // Format Analysis
    formatAnalysis: [{
      category: { type: String },
      status: { type: String, enum: ['good', 'warning', 'error'] },
      message: { type: String },
      tip: { type: String }
    }],
    
    // Improvement Plan (Prioritized)
    improvementPlan: [{
      priority: { type: Number },
      action: { type: String },
      impact: { type: String, enum: ['high', 'medium', 'low'] },
      timeToComplete: { type: String },
      details: { type: String }
    }],
    
    // Industry Comparison
    industryComparison: [{
      metric: { type: String },
      yourScore: { type: Number },
      average: { type: Number },
      topPerformers: { type: Number }
    }],
    
    // Strengths & Weaknesses Summary
    strengthsSummary: [{ type: String }],
    weaknessesSummary: [{ type: String }],
    
    // Extracted Data from Resume
    extractedData: { type: mongoose.Schema.Types.Mixed, default: {} },
    
    // Analysis Metadata
    analyzedAt: { type: Date },
    analyzerVersion: { type: String, default: '1.0' },
    targetRoleUsed: { type: String },

    // Role + JD Context
    roleContext: {
      targetRole: { type: String },
      jobDescriptionUsed: { type: String },
      demoJobId: { type: String, default: null },
      analyzedAgainst: { type: String }
    },

    // Advanced ATS report fields
    keywordAnalysis: {
      jdKeywords: [{ type: String }],
      matchedKeywords: [{ type: String }],
      missingKeywords: [{ type: String }],
      keywordMatchRate: { type: Number, default: 0 },
      industryKeywordDensity: { type: Number, default: 0 }
    },
    parsedResume: {
      name: { type: String },
      education: [{ type: mongoose.Schema.Types.Mixed }],
      technicalSkills: [{ type: String }],
      projects: [{ type: mongoose.Schema.Types.Mixed }],
      workExperience: [{ type: mongoose.Schema.Types.Mixed }],
      certifications: [{ type: mongoose.Schema.Types.Mixed }],
      technologiesUsed: [{ type: String }],
      achievements: [{ type: String }]
    },
    skillGapAnalysis: {
      currentSkills: [{ type: String }],
      missingSkills: [{ type: String }],
      recommendations: [{ type: String }]
    },
    atsBreakdown: {
      factors: [{
        id: { type: String },
        label: { type: String },
        weight: { type: Number },
        score: { type: Number }
      }],
      weightedScore: { type: Number, default: 0 },
      baselineAIATS: { type: Number, default: 0 }
    },
    projectQualityEvaluation: {
      projectCount: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
      notes: { type: String }
    },
    aiRecommendations: {
      skillsToLearn: [{ type: String }],
      projectsToBuild: [{ type: String }],
      certificationsToPursue: [{ type: String }],
      technologiesToAdd: [{ type: String }],
      coursesToTake: [{ type: String }],
      industryTools: [{ type: String }]
    },
    resumeRewrite: {
      beforeAfterPairs: [{
        original: { type: String },
        improved: { type: String },
        reason: { type: String }
      }],
      summaryRewrite: { type: String }
    },
    recruiterSimulation: {
      strengths: [{ type: String }],
      concerns: [{ type: String }],
      recommendation: { type: String }
    },
    linkedinOptimization: {
      optimizedHeadline: { type: String },
      summarySuggestions: [{ type: String }],
      skillHighlights: [{ type: String }],
      networkingStrategies: [{ type: String }],
      portfolioLinksSuggestions: [{ type: String }]
    },
    resumeRanking: {
      percentile: { type: Number, default: 0 },
      tier: { type: String },
      rankingFactors: {
        atsScore: { type: Number, default: 0 },
        skillRelevance: { type: Number, default: 0 },
        projectQuality: { type: Number, default: 0 },
        experienceRelevance: { type: Number, default: 0 }
      }
    },
    interviewSuccess: {
      probability: { type: Number, default: 0 },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      communicationReadiness: { type: Number, default: 0 },
      recommendations: [{ type: String }]
    },
    scoreSimulation: {
      currentScore: { type: Number, default: 0 },
      expectedScoreAfterImprovements: { type: Number, default: 0 },
      topActions: [{ type: String }]
    },
    careerRoadmap: {
      milestones: [{
        week: { type: String },
        goal: { type: String },
        output: { type: String }
      }]
    },
    mentorContextPrompts: [{ type: String }]
  },

  // Skills Analysis
  skillGaps: {
    type: [String],
    default: [],
  },
  strengths: {
    type: [String],
    default: [],
  },
  weaknesses: {
    type: [String],
    default: [],
  },

  // ========== ANALYTICS FIELDS ==========
  profileViews: {
    type: Number,
    default: 0,
  },
  searchAppearances: {
    type: Number,
    default: 0,
  },
  postImpressions: {
    type: Number,
    default: 0,
  },

  // ========== GAMIFICATION FIELDS ==========
  xp: {
    type: Number,
    default: 0,
  },
  codingElo: {
    type: Number,
    default: 1200, // Standard starting ELO
  },
  solvedProblems: [{
    problemId: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    solvedAt: { type: Date, default: Date.now },
  }],
  streak: {
    type: Number,
    default: 0,
  },
  lastActiveDate: {
    type: Date,
    default: null,
  },
  badges: [{
    name: String,
    earnedAt: { type: Date, default: Date.now },
  }],

  // ========== SECURITY FIELDS ==========
  
  // Email Verification
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },

  // Two-Factor Authentication
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
    select: false,
    default: null,
  },
  twoFactorBackupCodes: {
    type: [String],
    select: false,
    default: [],
  },
  twoFactorTempSecret: {
    type: String,
    select: false,
    default: null,
  },

  // Account Security
  isAccountLocked: {
    type: Boolean,
    default: false,
  },
  accountLockedAt: {
    type: Date,
    default: null,
  },
  accountLockReason: {
    type: String,
    enum: ['failed_attempts', 'security_breach', 'admin_action', 'suspicious_activity', null],
    default: null,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lastFailedLoginAt: {
    type: Date,
    default: null,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
  lastLoginIp: {
    type: String,
    default: '',
  },

  // Password Security
  passwordHistory: {
    type: [String],
    select: false,
    default: [],
  },
  passwordChangedAt: {
    type: Date,
    default: null,
  },
  mustChangePassword: {
    type: Boolean,
    default: false,
  },

  // Session Management
  activeSessions: {
    type: Number,
    default: 0,
  },
  lastActivityAt: {
    type: Date,
    default: Date.now,
  },

  // Security Preferences
  securityPreferences: {
    loginNotifications: { type: Boolean, default: true },
    suspiciousActivityAlerts: { type: Boolean, default: true },
    twoFactorForSensitiveOps: { type: Boolean, default: false },
  },

  // Application Settings
  settings: {
    profileVisibility: { type: Boolean, default: true },
    networkVisibility: { type: Boolean, default: true },
    emailAlerts: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false },
    dataTelemetry: { type: Boolean, default: true },
    twoFactorAuth: { type: Boolean, default: false },
    targetedAds: { type: Boolean, default: false },
    autoplayVideos: { type: Boolean, default: true },
    language: { type: String, default: 'English' },
    weeklyDigestEnabled: { type: Boolean, default: true },
    notificationPreferences: {
      streakReminders: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        inApp: { type: Boolean, default: true }
      },
      jobMatches: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        inApp: { type: Boolean, default: true }
      },
      leaderboardAlerts: {
        email: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
        inApp: { type: Boolean, default: true }
      },
      aiInsights: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        inApp: { type: Boolean, default: true }
      }
    },
    pushSubscriptions: {
      type: [mongoose.Schema.Types.Mixed],
      default: []
    }
  },

  // Account Status
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'pending_verification', 'deactivated'],
    default: 'pending_verification',
  },
  suspendedAt: {
    type: Date,
    default: null,
  },
  suspendedReason: {
    type: String,
    default: null,
  },

  // Recruiter notes and scheduled interviews
  recruiterNotes: {
    type: String,
    default: ''
  },
  hiringStage: {
    type: String,
    enum: ['screening', 'technical', 'interviewing', 'offered', 'hired'],
    default: 'screening'
  },
  scheduledInterviews: [{
    date: Date,
    format: String,
    interviewer: String,
    scheduledAt: { type: Date, default: Date.now }
  }],

  // Extended Role
  role: {
    type: String,
    enum: ['student', 'recruiter', 'admin', 'superadmin'],
    default: 'student',
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  // Save old password to history before changing
  if (this.password && !this.isNew) {
    const currentPasswordHash = this.password;
    // Keep only last 5 passwords in history
    if (!this.passwordHistory) {
      this.passwordHistory = [];
    }
    this.passwordHistory.unshift(currentPasswordHash);
    if (this.passwordHistory.length > 5) {
      this.passwordHistory = this.passwordHistory.slice(0, 5);
    }
  }
  
  // Hash password with 12 salt rounds (enterprise grade)
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordChangedAt = new Date();
  
  next();
});

// Encrypt sensitive fields before saving
userSchema.pre('save', function(next) {
  if (this.isModified('phone')) {
    this.phone = encrypt(this.phone);
  }
  if (this.isModified('dateOfBirth')) {
    this.dateOfBirth = encrypt(this.dateOfBirth);
  }
  next();
});

// Auto-generate profileSlug from fullName
userSchema.pre('save', async function(next) {
  if (this.isNew && !this.profileSlug) {
    let baseSlug = this.fullName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    let slug = baseSlug;
    let counter = 1;
    const User = this.constructor;
    
    while (await User.findOne({ profileSlug: slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.profileSlug = slug;
  }
  next();
});

// Decrypt sensitive fields after loading
userSchema.post('init', function(doc) {
  if (doc.phone) {
    doc.phone = decrypt(doc.phone);
  }
  if (doc.dateOfBirth) {
    doc.dateOfBirth = decrypt(doc.dateOfBirth);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if password was used before
userSchema.methods.isPasswordInHistory = async function(newPassword) {
  if (!this.passwordHistory || this.passwordHistory.length === 0) {
    return false;
  }
  
  for (const oldHash of this.passwordHistory) {
    if (await bcrypt.compare(newPassword, oldHash)) {
      return true;
    }
  }
  return false;
};

// Record failed login attempt
userSchema.methods.recordFailedLogin = async function() {
  this.failedLoginAttempts += 1;
  this.lastFailedLoginAt = new Date();
  
  // Lock account after 5 failed attempts
  if (this.failedLoginAttempts >= 5) {
    this.isAccountLocked = true;
    this.accountLockedAt = new Date();
    this.accountLockReason = 'failed_attempts';
  }
  
  await this.save();
  return this.failedLoginAttempts;
};

// Record successful login
userSchema.methods.recordSuccessfulLogin = async function(ip = '') {
  this.failedLoginAttempts = 0;
  this.lastFailedLoginAt = null;
  this.lastLoginAt = new Date();
  this.lastLoginIp = ip;
  this.lastActivityAt = new Date();
  
  // Unlock account if it was locked due to failed attempts
  if (this.isAccountLocked && this.accountLockReason === 'failed_attempts') {
    // Check if lockout period has passed (15 minutes)
    const lockoutDuration = 15 * 60 * 1000;
    const timeSinceLock = Date.now() - this.accountLockedAt.getTime();
    
    if (timeSinceLock >= lockoutDuration) {
      this.isAccountLocked = false;
      this.accountLockedAt = null;
      this.accountLockReason = null;
    }
  }
  
  await this.save();
};

// Check if account is currently locked
userSchema.methods.isLocked = function() {
  if (!this.isAccountLocked) return false;
  
  // Check if lockout period has expired for failed_attempts
  if (this.accountLockReason === 'failed_attempts') {
    const lockoutDuration = 15 * 60 * 1000; // 15 minutes
    const timeSinceLock = Date.now() - this.accountLockedAt.getTime();
    return timeSinceLock < lockoutDuration;
  }
  
  // For other lock reasons, stay locked until admin unlocks
  return true;
};

// Get remaining lockout time
userSchema.methods.getRemainingLockoutTime = function() {
  if (!this.isAccountLocked || !this.accountLockedAt) return 0;
  
  const lockoutDuration = 15 * 60 * 1000; // 15 minutes
  const timeSinceLock = Date.now() - this.accountLockedAt.getTime();
  const remaining = lockoutDuration - timeSinceLock;
  
  return Math.max(remaining, 0);
};

// Calculate exponential backoff delay
userSchema.methods.getLoginDelay = function() {
  const attempts = this.failedLoginAttempts;
  if (attempts < 3) return 0;
  
  const baseDelay = 1000; // 1 second
  const maxDelay = 30000; // 30 seconds
  const delay = baseDelay * Math.pow(2, attempts - 3);
  
  return Math.min(delay, maxDelay);
};

// Unlock account (admin action)
userSchema.methods.unlockAccount = async function() {
  this.isAccountLocked = false;
  this.accountLockedAt = null;
  this.accountLockReason = null;
  this.failedLoginAttempts = 0;
  await this.save();
};

// Verify email
userSchema.methods.verifyEmail = async function() {
  this.isEmailVerified = true;
  this.emailVerifiedAt = new Date();
  this.accountStatus = 'active';
  await this.save();
};

// Virtual for assessment locking
userSchema.virtual('isAssessmentLocked').get(function() {
  if (!this.lastAssessmentAt) return false;
  const dateObj = this.lastAssessmentAt instanceof Date ? this.lastAssessmentAt : new Date(this.lastAssessmentAt);
  if (isNaN(dateObj.getTime())) return false;
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
  const timeSinceLast = Date.now() - dateObj.getTime();
  return timeSinceLast < threeDaysInMs;
});

// Virtual for assessment unlock date
userSchema.virtual('assessmentUnlockDate').get(function() {
  if (!this.lastAssessmentAt) return null;
  const dateObj = this.lastAssessmentAt instanceof Date ? this.lastAssessmentAt : new Date(this.lastAssessmentAt);
  if (isNaN(dateObj.getTime())) return null;
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
  return new Date(dateObj.getTime() + threeDaysInMs);
});

// Method to convert to JSON for frontend (excluding sensitive data)
userSchema.methods.toJSON = function() {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  delete obj.passwordHistory;
  delete obj.twoFactorSecret;
  delete obj.__v;
  obj.id = obj._id;
  delete obj._id;
  return obj;
};


// Static: Find user with password for authentication
userSchema.statics.findByEmailWithPassword = async function(email) {
  return this.findOne({ email: email.toLowerCase() })
    .select('+password +passwordHistory');
};

// Static: Find active users
userSchema.statics.findActiveUsers = async function(query = {}) {
  return this.find({
    ...query,
    accountStatus: 'active',
    isAccountLocked: false,
  });
};

const User = mongoose.model('User', userSchema);

export default User;
