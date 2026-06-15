import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report DevOps pipeline sandbox outcome
 * @route   POST /api/devops/report
 * @access  Private
 */
export const reportDevopsOutcome = asyncHandler(async (req, res) => {
  const { success } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // 60 XP for a successful build, 15 XP consolation for trying
  const earnedXp = success ? 60 : 15;
  stats.xp += earnedXp;

  stats.devopsSandbox.played += 1;
  if (success) {
    stats.devopsSandbox.successfulPipelines += 1;
  }

  // Award DevOps Maestro badge after 3 successful pipelines
  if (stats.devopsSandbox.successfulPipelines >= 3 && !stats.badges.includes('DevOps Maestro')) {
    stats.badges.push('DevOps Maestro');
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
