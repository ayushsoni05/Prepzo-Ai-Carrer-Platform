import Notification from '../models/Notification.model.js';
import PlacementScore from '../models/PlacementScore.model.js';
import UserStreak from '../models/UserStreak.model.js';
import User from '../models/User.model.js';

/**
 * Generate highly personalized career suggestions and notifications for a user
 * based on their stats, streak, and Placement DNA score breakdown.
 */
export const generatePersonalizedNotifications = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // 1. Fetch user Placement DNA score
    const placementScore = await PlacementScore.findOne({ user: userId });
    
    // 2. Fetch User Streak stats
    const userStreak = await UserStreak.findOne({ user: userId });

    const notificationsToCreate = [];

    // --- CASE A: LOW STREAK WARNING (Consistency suggestion) ---
    if (userStreak && userStreak.currentStreak > 0) {
      const today = new Date();
      const lastCompleted = userStreak.lastCompletedDate ? new Date(userStreak.lastCompletedDate) : null;
      
      // If today is not completed, remind them
      if (!lastCompleted || lastCompleted.toDateString() !== today.toDateString()) {
        const existingStreakNotification = await Notification.findOne({
          recipient: userId,
          type: 'assessment_reminder',
          createdAt: { $gte: new Date(today.setHours(0, 0, 0, 0)) }
        });

        if (!existingStreakNotification) {
          notificationsToCreate.push({
            recipient: userId,
            type: 'assessment_reminder',
            title: '🔥 Keep Your Streak Alive!',
            message: `You are on a ${userStreak.currentStreak}-day coding streak. Complete today's Daily Sprint to protect it!`,
            actionUrl: '/daily-sprint',
            priority: 'high',
            category: 'ai'
          });
        }
      }
    }

    // --- CASE B: PLACEMENT SCORE RECRUITER MATCH SUGGESTION ---
    if (placementScore && placementScore.companyPredictions && placementScore.companyPredictions.length > 0) {
      // Find companies with >= 75% match
      const highMatches = placementScore.companyPredictions.filter(p => p.matchPercentage >= 75);
      
      for (const match of highMatches) {
        const existingMatchNotif = await Notification.findOne({
          recipient: userId,
          type: 'new_job_match',
          title: new RegExp(match.company, 'i')
        });

        if (!existingMatchNotif) {
          notificationsToCreate.push({
            recipient: userId,
            type: 'new_job_match',
            title: `🎯 High Match Probability: ${match.company}`,
            message: `Your Placement DNA matches ${match.matchPercentage}% of ${match.company}'s requirements. Start their preparation track now!`,
            actionUrl: `/company-prep/${match.company.toLowerCase()}`,
            priority: 'normal',
            category: 'jobs'
          });
        }
      }
    }

    // --- CASE C: SYSTEM DESIGN OR TECHNICAL SKILLS GAP RECOMMENDATION ---
    if (placementScore && placementScore.skillGaps && placementScore.skillGaps.length > 0) {
      // Find critical skill gaps (e.g. required > current by >= 3 levels)
      const criticalGaps = placementScore.skillGaps.filter(g => g.priority === 'critical' || (g.requiredLevel - g.currentLevel) >= 3);

      for (const gap of criticalGaps) {
        const existingGapNotif = await Notification.findOne({
          recipient: userId,
          type: 'ai_recommendation',
          title: new RegExp(gap.skill, 'i')
        });

        if (!existingGapNotif) {
          let actionUrl = '/code-golf';
          if (gap.skill.toLowerCase().includes('design')) actionUrl = '/company-tracks';
          if (gap.skill.toLowerCase().includes('interview') || gap.skill.toLowerCase().includes('behavioral')) actionUrl = '/interview-replay';

          notificationsToCreate.push({
            recipient: userId,
            type: 'ai_recommendation',
            title: `🧬 Skill Boost: Upgrade ${gap.skill}`,
            message: `Your ${gap.skill} rating is ${gap.currentLevel}/10, but top target tiers require ${gap.requiredLevel}/10. Practice matching exercises now.`,
            actionUrl,
            priority: 'high',
            category: 'ai'
          });
        }
      }
    }

    // Create notifications in database
    for (const notif of notificationsToCreate) {
      await Notification.create(notif);
    }
  } catch (err) {
    console.error('Error generating personalized notifications:', err.message);
  }
};
