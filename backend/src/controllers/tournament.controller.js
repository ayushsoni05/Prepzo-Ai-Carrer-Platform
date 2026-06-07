import Tournament from '../models/Tournament.model.js';
import catchAsync from '../utils/catchAsync.js';

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Protected
export const getTournaments = catchAsync(async (req, res) => {
  const tournaments = await Tournament.find()
    .sort({ startDate: -1 })
    .populate('participants', 'fullName avatar xp');
    
  res.status(200).json({ success: true, data: tournaments });
});

// @desc    Get tournament by ID
// @route   GET /api/tournaments/:id
// @access  Protected
export const getTournamentById = catchAsync(async (req, res) => {
  const tournament = await Tournament.findById(req.params.id)
    .populate('participants', 'fullName avatar xp')
    .populate('winnerId', 'fullName avatar');
    
  if (!tournament) {
    return res.status(404).json({ success: false, message: 'Tournament not found' });
  }
  
  res.status(200).json({ success: true, data: tournament });
});
