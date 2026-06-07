import Battle from '../models/Battle.model.js';
import catchAsync from '../utils/catchAsync.js';

// @desc    Get battle by ID
// @route   GET /api/battles/:battleId
// @access  Protected
export const getBattle = catchAsync(async (req, res) => {
  const { battleId } = req.params;
  const battle = await Battle.findOne({ battleId }).populate('participants.userId', 'fullName avatar xp');
  
  if (!battle) {
    return res.status(404).json({ success: false, message: 'Battle not found' });
  }
  
  res.status(200).json({ success: true, data: battle });
});

// @desc    Get all active/recent battles
// @route   GET /api/battles
// @access  Protected
export const getRecentBattles = catchAsync(async (req, res) => {
  const battles = await Battle.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('participants.userId', 'fullName avatar xp');
    
  res.status(200).json({ success: true, data: battles });
});

// @desc    Get user battle history
// @route   GET /api/battles/history/me
// @access  Protected
export const getUserBattleHistory = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const battles = await Battle.find({
    'participants.userId': userId,
    status: 'completed'
  })
    .sort({ endTime: -1 })
    .populate('participants.userId', 'fullName avatar xp codingElo')
    .populate('winnerId', 'fullName avatar');

  // Calculate stats
  const totalBattles = battles.length;
  const wins = battles.filter(b => b.winnerId && b.winnerId._id.toString() === userId.toString()).length;
  const winRate = totalBattles > 0 ? Math.round((wins / totalBattles) * 100) : 0;
  const rank = getRankFromElo(req.user.codingElo || 1200);

  res.status(200).json({
    success: true,
    stats: {
      elo: req.user.codingElo || 1200,
      winRate,
      totalBattles,
      rank
    },
    data: battles
  });
});

const getRankFromElo = (elo) => {
  if (elo < 1300) return 'Bronze';
  if (elo < 1500) return 'Silver';
  if (elo < 1800) return 'Gold';
  if (elo < 2000) return 'Platinum';
  if (elo < 2200) return 'Diamond';
  return 'Master';
};
