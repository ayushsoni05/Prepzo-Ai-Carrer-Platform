import { asyncHandler } from '../middleware/error.middleware.js';
import NewsletterDispatch from '../models/NewsletterDispatch.model.js';
import User from '../models/User.model.js';

// 1. Invisible tracking pixel
export const trackOpen = asyncHandler(async (req, res) => {
  const { dispatchId } = req.params;

  // Strip .png or other extension if present (e.g. tracking.png)
  const cleanDispatchId = dispatchId ? dispatchId.split('.')[0] : '';

  try {
    if (cleanDispatchId && cleanDispatchId.match(/^[0-9a-fA-F]{24}$/)) {
      const dispatch = await NewsletterDispatch.findById(cleanDispatchId);
      if (dispatch && !dispatch.opened) {
        dispatch.opened = true;
        dispatch.openedAt = new Date();
        await dispatch.save();
      }
    }
  } catch (error) {
    console.error('Error tracking newsletter open:', error);
  }

  // Send a 1x1 transparent GIF
  const gifBase64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const buffer = Buffer.from(gifBase64, 'base64');
  
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': buffer.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  res.end(buffer);
});

// 2. Redirect tracking link
export const trackClick = asyncHandler(async (req, res) => {
  const { url, dispatchId } = req.query;

  try {
    if (dispatchId && dispatchId.match(/^[0-9a-fA-F]{24}$/) && url) {
      const dispatch = await NewsletterDispatch.findById(dispatchId);
      if (dispatch) {
        dispatch.clicks.push({ url, clickedAt: new Date() });
        await dispatch.save();
      }
    }
  } catch (error) {
    console.error('Error tracking newsletter click:', error);
  }

  if (url) {
    res.redirect(url);
  } else {
    res.redirect('/');
  }
});

// 3. Unsubscribe user
export const unsubscribeUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.settings.weeklyDigestEnabled = false;
  await user.save();

  // Redirect to the frontend unsubscribe feedback page
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/unsubscribe/${userId}`);
});

// 4. Opt-back in or update preferences
export const resubscribeUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { enabled } = req.body;

  if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.settings.weeklyDigestEnabled = !!enabled;
  await user.save();

  res.json({
    success: true,
    message: `Weekly digest subscription updated to ${enabled}`,
    data: { weeklyDigestEnabled: user.settings.weeklyDigestEnabled }
  });
});

// 5. Get tracking analytics (admin)
export const getAnalytics = asyncHandler(async (req, res) => {
  const totalSent = await NewsletterDispatch.countDocuments();
  const totalOpened = await NewsletterDispatch.countDocuments({ opened: true });
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0';

  // Aggregate total unique clicks & overall clicks
  const dispatches = await NewsletterDispatch.find({ 'clicks.0': { $exists: true } });
  let totalClicksCount = 0;
  const uniqueClickers = dispatches.length;
  
  const linkClickCounts = {};
  dispatches.forEach(d => {
    d.clicks.forEach(c => {
      totalClicksCount++;
      linkClickCounts[c.url] = (linkClickCounts[c.url] || 0) + 1;
    });
  });

  const clickRate = totalSent > 0 ? ((uniqueClickers / totalSent) * 100).toFixed(1) : '0';

  const topLinks = Object.entries(linkClickCounts)
    .map(([url, count]) => ({ url, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  res.json({
    success: true,
    data: {
      totalSent,
      totalOpened,
      openRate: parseFloat(openRate),
      uniqueClickers,
      totalClicks: totalClicksCount,
      clickThroughRate: parseFloat(clickRate),
      topLinks
    }
  });
});
