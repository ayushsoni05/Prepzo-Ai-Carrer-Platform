import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report Visual Puzzles game outcome
 * @route   POST /api/visual-puzzles/report
 * @access  Private
 */
export const reportVisualPuzzleOutcome = asyncHandler(async (req, res) => {
  const { score, levelId, levelCompleted } = req.body;
  const userId = req.user._id;

  if (typeof score !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid score value' });
  }

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP
  let earnedXp = 5; // Default for playing / replaying
  stats.visualPuzzles.played += 1;

  if (score > stats.visualPuzzles.highScore) {
    stats.visualPuzzles.highScore = score;
  }

  if (levelCompleted && levelId) {
    if (!stats.visualPuzzles.completedLevels.includes(levelId)) {
      stats.visualPuzzles.completedLevels.push(levelId);
      earnedXp = 25; // 25 XP for first-time completion
    }
  }

  stats.xp += earnedXp;

  // Award Visual Mastermind badge if at least 5 levels are completed
  if (stats.visualPuzzles.completedLevels.length >= 5 && !stats.badges.includes('Visual Mastermind')) {
    stats.badges.push('Visual Mastermind');
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
