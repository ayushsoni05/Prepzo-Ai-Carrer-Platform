/**
 * Application Routes
 * Handles job application endpoints
 */

import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  applyForJob,
  getUserApplications,
  getApplication,
  withdrawApplication,
  getApplicationStats,
  getCompanyApplications,
  updateApplicationStatus,
  addInterview,
  updateInterview,
  addRecruiterNote,
  extendOffer,
  getAllApplicationsAdmin,
  exportApplicationsExcel,
} from '../controllers/application.controller.js';

const router = express.Router();

// All application routes require authentication
router.use(protect);

// User routes
router.post('/', applyForJob);
router.get('/', getUserApplications);
router.get('/stats', getApplicationStats);

// Admin routes (placed before /:id to avoid route conflicts)
router.get('/admin/all', authorize('admin'), getAllApplicationsAdmin);
router.get('/admin/export', authorize('admin'), exportApplicationsExcel);

router.get('/:id', getApplication);
router.put('/:id/withdraw', withdrawApplication);

// Remaining admin routes
router.use(authorize('admin'));

router.get('/company/:companyId', getCompanyApplications);
router.put('/:id/status', updateApplicationStatus);
router.post('/:id/interview', addInterview);
router.put('/:id/interview/:interviewId', updateInterview);
router.post('/:id/notes', addRecruiterNote);
router.post('/:id/offer', extendOffer);

export default router;
