import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";

// @desc    Get user profile and gamification stats
// @route   GET /api/users/profile/:userId
// @access  Public
const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .select('fullName avatar xp streak badges solvedProblems')
    .lean();

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Calculate difficulty distribution
  let easy = 0, medium = 0, hard = 0;
  user.solvedProblems.forEach(p => {
    if (p.difficulty === 'Easy') easy++;
    else if (p.difficulty === 'Medium') medium++;
    else if (p.difficulty === 'Hard') hard++;
  });

  // Most recent 5 problems
  const recentProblems = [...user.solvedProblems]
    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
    .slice(0, 5);

  const profileData = {
    ...user,
    stats: {
      totalSolved: user.solvedProblems.length,
      easy,
      medium,
      hard,
    },
    recentProblems
  };

  return res.status(200).json({ success: true, data: profileData });
});

// @desc    Get global leaderboard sorted by XP
// @route   GET /api/users/leaderboard
// @access  Public
const getLeaderboard = catchAsync(async (req, res) => {
  const users = await User.find({ xp: { $gt: 0 } })
    .select('fullName avatar xp streak badges')
    .sort({ xp: -1 })
    .limit(100)
    .lean();

  return res.status(200).json({ success: true, data: users });
});

export { getUserProfile, getLeaderboard };
