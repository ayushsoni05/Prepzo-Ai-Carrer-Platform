import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report Domain Runner 3D game session outcomes
 * @route   POST /api/domain-runner/report
 * @access  Private
 */
export const reportDomainRunnerOutcome = asyncHandler(async (req, res) => {
  const { score, domain } = req.body;
  const userId = req.user._id;

  if (typeof score !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid score value' });
  }

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP: 0.5 XP per score point (min 10 XP, max 150 XP)
  const baseScoreXp = Math.floor(score * 0.5);
  const earnedXp = Math.max(10, Math.min(150, baseScoreXp));
  
  stats.xp += earnedXp;
  
  // Update Domain Runner 3D Stats
  stats.domainRunner3D.played += 1;
  if (score > stats.domainRunner3D.highScore) {
    stats.domainRunner3D.highScore = score;
  }
  stats.domainRunner3D.favoriteDomain = domain || stats.domainRunner3D.favoriteDomain;

  // Award Polymath Voyager badge for scoring >= 1000 points
  if (score >= 1000 && !stats.badges.includes('Polymath Voyager')) {
    stats.badges.push('Polymath Voyager');
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
