import { asyncHandler } from '../middleware/error.middleware.js';
import User from '../models/User.model.js';

/**
 * @desc    Save push notification subscription for a user
 * @route   POST /api/notifications/push-subscribe
 * @access  Private
 */
export const subscribePush = asyncHandler(async (req, res) => {
  const { subscription } = req.body;
  
  if (!subscription) {
    res.status(400);
    throw new Error('Subscription object is required');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent duplicate subscriptions
  const exists = user.pushSubscriptions.some(
    (sub) => sub.endpoint === subscription.endpoint
  );

  if (!exists) {
    user.pushSubscriptions.push(subscription);
    await user.save();
  }

  res.json({
    success: true,
    message: 'Push subscription registered successfully',
  });
});

/**
 * @desc    Remove push notification subscription for a user
 * @route   POST /api/notifications/push-unsubscribe
 * @access  Private
 */
export const unsubscribePush = asyncHandler(async (req, res) => {
  const { endpoint } = req.body;

  if (!endpoint) {
    res.status(400);
    throw new Error('Endpoint string is required');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.pushSubscriptions = user.pushSubscriptions.filter(
    (sub) => sub.endpoint !== endpoint
  );
  await user.save();

  res.json({
    success: true,
    message: 'Push subscription unregistered successfully',
  });
});
