import { asyncHandler } from '../middleware/error.middleware.js';
import GameStats from '../models/GameStats.model.js';

/**
 * @desc    Report proctor sandbox training outcome
 * @route   POST /api/proctor/report
 * @access  Private
 */
export const reportProctorOutcome = asyncHandler(async (req, res) => {
  const { trustScore } = req.body;
  const userId = req.user._id;

  if (trustScore === undefined || typeof trustScore !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid trustScore score.'
    });
  }

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP (Base 20 XP, plus trustScore/2. Capped at 70 XP)
  const earnedXp = Math.round(trustScore / 2) + 20;
  stats.xp += earnedXp;

  stats.proctorSandbox.played += 1;
  if (trustScore > stats.proctorSandbox.highestTrustScore) {
    stats.proctorSandbox.highestTrustScore = trustScore;
  }

  // Award Honor Code Champion badge if they completed with a perfect 100 trust score
  if (trustScore === 100 && !stats.badges.includes('Honor Code Champion')) {
    stats.badges.push('Honor Code Champion');
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
