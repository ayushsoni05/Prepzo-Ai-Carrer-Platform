import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report Grid Quest game session outcomes
 * @route   POST /api/grid-quest/report
 * @access  Private
 */
export const reportGridQuestOutcome = asyncHandler(async (req, res) => {
  const { score, domain, domainCompleted } = req.body;
  const userId = req.user._id;

  if (typeof score !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid score value' });
  }

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP: score points directly (e.g. 50 XP per level, 150 XP for full domain)
  const earnedXp = Math.max(10, Math.min(250, score));
  stats.xp += earnedXp;

  // Update Grid Quest stats
  stats.gridQuest.played += 1;
  if (score > stats.gridQuest.highScore) {
    stats.gridQuest.highScore = score;
  }

  if (domainCompleted && domain) {
    if (!stats.gridQuest.completedDomains.includes(domain)) {
      stats.gridQuest.completedDomains.push(domain);
    }
  }

  // Award Gridmaster Supreme badge if at least 2 domains are completed
  if (stats.gridQuest.completedDomains.length >= 2 && !stats.badges.includes('Gridmaster Supreme')) {
    stats.badges.push('Gridmaster Supreme');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});
