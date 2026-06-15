import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report System Design Whiteboard outcome
 * @route   POST /api/whiteboard/report
 * @access  Private
 */
export const reportWhiteboardOutcome = asyncHandler(async (req, res) => {
  const { audits } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // 30 XP per system audit, maxed out at 90 XP per session
  const earnedXp = Math.min(90, (audits || 1) * 30);
  stats.xp += earnedXp;

  stats.systemWhiteboard.played += 1;
  stats.systemWhiteboard.auditsRun += (audits || 1);

  // Award System Architect badge if they successfully run 4 system audits
  if (stats.systemWhiteboard.auditsRun >= 4 && !stats.badges.includes('System Architect')) {
    stats.badges.push('System Architect');
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
