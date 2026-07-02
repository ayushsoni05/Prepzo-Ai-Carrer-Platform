import { notificationEmitter } from '../utils/notificationEmitter.js';

/**
 * @desc    Establish real-time Server-Sent Events stream for user notifications
 * @route   GET /api/notifications/stream
 * @access  Private
 */
export const streamNotifications = (req, res) => {
  const userId = req.user._id.toString();

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send heartbeat keep-alive every 30 seconds to prevent timeout
  const heartbeat = setInterval(() => {
    res.write(': ping\n\n');
  }, 30000);

  const onNotification = (notification) => {
    if (notification.recipient.toString() === userId) {
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    }
  };

  notificationEmitter.on('notification_created', onNotification);

  req.on('close', () => {
    clearInterval(heartbeat);
    notificationEmitter.off('notification_created', onNotification);
  });
};
