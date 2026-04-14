import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { spawn, execSync } from 'child_process';
import { securityConfig, validateSecurityConfig } from './config/security.config.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import testRoutes from './routes/test.routes.js';

import recommendationRoutes from './routes/recommendation.routes.js';
import mentorRoutes from './routes/mentor.routes.js';
import aiDashboardRoutes from './routes/aiDashboard.routes.js';
import adminRoutes from './routes/admin.routes.js';
import aiTestRoutes from './routes/aiTest.routes.js';
import adminProctoringRoutes from './routes/adminProctoring.routes.js';
import resumeRoutes from './routes/resume.routes.js';
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import networkRoutes from './routes/network.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import publicRoutes from './routes/public.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';
import aiValidation from './middleware/aiValidation.middleware.js';
import {
  helmetConfig,
  requestIdMiddleware,
  securityHeaders,
  sanitizeInput,
  noSQLInjectionPrevention,
  preventParamPollution,
} from './middleware/security.middleware.js';
import { generalLimiter, ipBlocker, dynamicRateLimiter } from './middleware/rateLimit.middleware.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Validate security configuration
const securityValidation = validateSecurityConfig();
if (!securityValidation.valid) {
  console.warn('⚠️  Security configuration warnings:');
  securityValidation.issues.forEach(issue => console.warn(`   - ${issue}`));
}

// Connect to MongoDB
connectDB();

const app = express();

// Trust proxy (for getting real IP behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ========== SECURITY MIDDLEWARE ========== 

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', req.headers);
  next();
});

// Request ID for tracking
app.use(requestIdMiddleware);

// IP blocking
app.use(ipBlocker);

// Helmet security headers
app.use(helmetConfig);

// Additional security headers
app.use(securityHeaders);

// Cookie parser
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.) in development
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    if (securityConfig.cors.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== 'production') {
      // Allow any origin in development
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: securityConfig.cors.credentials,
  methods: securityConfig.cors.methods,
  allowedHeaders: securityConfig.cors.allowedHeaders,
  exposedHeaders: securityConfig.cors.exposedHeaders,
  maxAge: securityConfig.cors.maxAge,
}));

// Body parsing
app.use(express.json({ limit: '1mb' })); // Increased limit to accommodate large assessment payloads
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Input sanitization
app.use(sanitizeInput);

// NoSQL injection prevention
app.use(noSQLInjectionPrevention);

// Parameter pollution prevention
app.use(preventParamPollution);

// General rate limiting
app.use('/api', generalLimiter);

// Dynamic rate limiting
app.use(dynamicRateLimiter);

// Serve static files for uploaded resumes (with security)
app.use('/uploads', (req, res, next) => {
  // Add security headers for file downloads
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Disposition', 'attachment');
  next();
}, express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// --- AI Service Auto-Start ---
const checkAIService = async () => {
  const axios = await import('axios');
  try {
    const res = await axios.default.get('http://localhost:8000/ready', { timeout: 3000 });
    return res.data && res.data.ready === true;
  } catch {
    return false;
  }
};

const startAIService = () => {
  const scriptPath = path.join(__dirname, '../../ai-service/scripts/start_ai_service.ps1');
  console.log('🧠 Starting Prepzo AI Service (Python FastAPI)...');
  
  // Try to use pwsh if available (Cross-platform/modern), fallback to powershell
  let shellChoice = 'powershell.exe';
  try {
    execSync('where.exe pwsh', { stdio: 'ignore' });
    shellChoice = 'pwsh.exe';
  } catch (e) {
    // Stick with powershell.exe
  }

  const child = spawn(shellChoice, ['-ExecutionPolicy', 'Bypass', '-File', scriptPath], {
    cwd: path.join(__dirname, '../../ai-service'),
    detached: true,
    stdio: 'ignore',
  });
  
  child.on('error', (err) => {
    console.error('❌ Failed to start AI Service process:', err.message);
  });
  
  child.unref();
};

(async () => {
  if (!(await checkAIService())) {
    startAIService();
    // Wait for AI service to become ready
    let waited = 0;
    while (!(await checkAIService()) && waited < 30) {
      await new Promise(res => setTimeout(res, 1000));
      waited++;
    }
    if (waited >= 30) {
      console.warn('⚠️ AI Service did not start in time. Backend will continue, but AI features may not work.');
    } else {
      console.log('✅ AI Service is running and ready!');
    }
  } else {
    console.log('✅ AI Service already running.');
  }
})();
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/recommendations', aiValidation.aiRequestContext(), recommendationRoutes);
app.use('/api/mentor', aiValidation.aiRequestContext(), mentorRoutes);
app.use('/api/ai', aiDashboardRoutes);
app.use('/api/test', testRoutes);
app.use('/api/ai-test', aiValidation.aiRequestContext(), aiTestRoutes);
app.use('/api/resume', aiValidation.aiRequestContext(), resumeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/proctoring', adminProctoringRoutes);

// Placement ecosystem routes
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/public', publicRoutes);

// AI Failsafe error handler (catches AI-specific errors)
app.use(aiValidation.aiFailsafe());

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Increase server timeout to 10 minutes for long AI operations
server.timeout = 600000;

export default app;
