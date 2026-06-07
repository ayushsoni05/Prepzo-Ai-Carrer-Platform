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
