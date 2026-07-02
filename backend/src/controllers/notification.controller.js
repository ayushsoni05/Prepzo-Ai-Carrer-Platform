/**
 * Notification Controller
 * Handles user notifications
 */

import { asyncHandler } from '../middleware/error.middleware.js';
import Notification from '../models/Notification.model.js';
import { generatePersonalizedNotifications } from '../services/notificationPersonalization.service.js';

/**
 * @desc    Get user notifications
 * @route   GET /api/notifications
 * @access  Private
 */
export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 20, category, isRead } = req.query;

  // Consolidate/aggregate redundant alert types before fetching
  try {
    const { aggregateUserNotifications } = await import('../services/notificationAggregator.service.js');
    await aggregateUserNotifications(userId);
  } catch (aggError) {
    console.error('Failed to run AI notification aggregator:', aggError);
  }

  // Dynamically trigger personalized updates based on scoring/streak analysis
  await generatePersonalizedNotifications(userId);

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  if (category) options.category = category;
  if (isRead !== undefined) options.isRead = isRead === 'true';

  const result = await Notification.getUserNotifications(userId, options);

  res.json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get unread notification count
 * @route   GET /api/notifications/unread-count
 * @access  Private
 */
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.getUnreadCount(req.user._id);

  res.json({
    success: true,
    data: { count },
  });
});

/**
 * @desc    Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true, readAt: new Date() },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({
    success: true,
    data: notification,
  });
});

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private
 */
export const markAllAsRead = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  await Notification.markAllAsRead(req.user._id, category);

  res.json({
    success: true,
    message: 'All notifications marked as read',
  });
});

/**
 * @desc    Delete notification
 * @route   DELETE /api/notifications/:id
 * @access  Private
 */
export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    recipient: req.user._id,
  });

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({
    success: true,
    message: 'Notification deleted',
  });
});

/**
 * @desc    Clear all notifications
 * @route   DELETE /api/notifications/clear-all
 * @access  Private
 */
export const clearAllNotifications = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  const query = { recipient: req.user._id };
  if (category) query.category = category;

  await Notification.deleteMany(query);

  res.json({
    success: true,
    message: 'Notifications cleared',
  });
});

/**
 * @desc    Update notification preferences
 * @route   PUT /api/notifications/preferences
 * @access  Private
 */
export const updatePreferences = asyncHandler(async (req, res) => {
  const { preferences } = req.body;
  const User = (await import('../models/User.model.js')).default;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (preferences) {
    user.settings.notificationPreferences = {
      ...user.settings.notificationPreferences,
      ...preferences
    };
    if (preferences.emailAlerts !== undefined) user.settings.emailAlerts = preferences.emailAlerts;
    if (preferences.pushNotifications !== undefined) user.settings.pushNotifications = preferences.pushNotifications;
    
    await user.save();
  }

  res.json({
    success: true,
    message: 'Preferences updated successfully',
    data: user.settings,
  });
});
