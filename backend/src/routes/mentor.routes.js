/**
 * AI Mentor Routes
 */

import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { mentorUpload } from '../middleware/mentorUpload.middleware.js';
import { uploadLimiter } from '../middleware/rateLimit.middleware.js';
import {
  chat,
  getHistory,
  getSessions,
  startInterview,
  explainConcept,
  getStatus,
  uploadFile
} from '../controllers/mentor.controller.js';

const router = express.Router();

// Public route - check service status
router.get('/status', getStatus);

// Protected routes
router.use(protect);

// Upload file for AI mentor
router.post('/upload', uploadLimiter, mentorUpload.single('file'), uploadFile);

// Chat with AI mentor
router.post('/chat', chat);

// Get conversation history
router.get('/history/:sessionId', getHistory);

// Get all sessions for user
router.get('/sessions', getSessions);

// Mock interview
router.post('/interview/start', startInterview);

// Concept explanation
router.post('/explain', explainConcept);

export default router;
