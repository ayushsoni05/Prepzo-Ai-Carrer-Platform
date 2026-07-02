/**
 * Notification Routes
 * Handles user notification endpoints
 */

import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  updatePreferences,
} from '../controllers/notification.controller.js';
import { streamNotifications } from '../controllers/notificationSSE.controller.js';
import { subscribePush, unsubscribePush } from '../controllers/pushSubscription.controller.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getNotifications);
router.get('/stream', streamNotifications);
router.post('/push-subscribe', subscribePush);
router.post('/push-unsubscribe', unsubscribePush);
router.get('/unread-count', getUnreadCount);
router.put('/read-all', markAllAsRead);
router.delete('/clear-all', clearAllNotifications);
router.put('/preferences', updatePreferences);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
