import express from 'express';
import {
  trackOpen,
  trackClick,
  unsubscribeUser,
  resubscribeUser,
  getAnalytics
} from '../controllers/newsletterTracker.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Publicly accessible tracking & unsubscribe links (called from email clients / users)
router.get('/open/:dispatchId', trackOpen);
router.get('/click', trackClick);
router.get('/unsubscribe/:userId', unsubscribeUser);
router.post('/resubscribe/:userId', resubscribeUser);

// Admin-only tracking analytics
router.get('/analytics', protect, admin, getAnalytics);

export default router;
