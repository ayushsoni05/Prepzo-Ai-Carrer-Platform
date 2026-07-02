import Notification from '../models/Notification.model.js';
import GameStats from '../models/GameStats.model.js';
import User from '../models/User.model.js';

/**
 * Service to aggregate multiple notifications into a consolidated report
 * and calculate the optimal smart delivery schedule based on user activity profiles.
 */

/**
 * Aggregates unread notifications for a user to keep the inbox neat and low-noise.
 * E.g., multiple "post_like" notifications are consolidated into "X people liked your post".
 * @param {string} userId - Mongoose User ID
 */
export const aggregateUserNotifications = async (userId) => {
  const unread = await Notification.find({
    recipient: userId,
    isRead: false,
    isDismissed: false
  }).sort({ createdAt: -1 });

  const groups = {};
  
  // Group notifications by type and related object (e.g., same post or same category)
  for (const notif of unread) {
    const key = `${notif.type}_${notif.category}_${notif.relatedEntities?.post || 'general'}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(notif);
  }

  for (const [key, list] of Object.entries(groups)) {
    if (list.length > 1) {
      // More than 1 similar notification - consolidate them!
      const primary = list[0];
      const others = list.slice(1);
      
      const totalCount = list.length;
      primary.groupedCount = totalCount;
      
      // Update text to reflect bundling
      if (primary.type === 'post_like') {
        primary.title = 'New Post Interactions';
        primary.message = `${totalCount} peers liked your post recently.`;
      } else if (primary.type === 'new_job_match') {
        primary.title = 'Multiple Job Openings Available';
        primary.message = `We found ${totalCount} new job matches fitting your Placement DNA profile.`;
      } else if (primary.type === 'profile_view') {
        primary.title = 'Profile Visibility Pulse';
        primary.message = `${totalCount} recruiters and peers viewed your profile.`;
      } else {
        primary.message = `${primary.message} (and ${totalCount - 1} other similar updates)`;
      }

      await primary.save();
      
      // Dismiss secondary notifications to keep feed clean
      await Notification.updateMany(
        { _id: { $in: others.map(o => o._id) } },
        { isDismissed: true, dismissedAt: new Date() }
      );
    }
  }
};

/**
 * Analyzes user historical activity logs from GameStats to find the optimal hour for dispatching notifications.
 * Defaults to current time if no sufficient history is found.
 * @param {string} userId - Mongoose User ID
 * @returns {number} - Best hour of day (0-23)
 */
export const getSmartDeliveryHour = async (userId) => {
  try {
    const stats = await GameStats.findOne({ user: userId });
    if (!stats || !stats.history || stats.history.length === 0) {
      return new Date().getHours(); // Default to current hour
    }

    const hourCounts = Array(24).fill(0);
    stats.history.forEach((entry) => {
      if (entry.completedAt) {
        const hour = new Date(entry.completedAt).getHours();
        hourCounts[hour]++;
      }
    });

    let bestHour = new Date().getHours();
    let maxCount = -1;
    
    for (let h = 0; h < 24; h++) {
      if (hourCounts[h] > maxCount) {
        maxCount = hourCounts[h];
        bestHour = h;
      }
    }
    
    return bestHour;
  } catch (error) {
    console.error('Error analyzing smart delivery schedule:', error);
    return new Date().getHours();
  }
};
