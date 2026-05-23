import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all students/candidates for the recruiter dashboard
 * @route   GET /api/recruiters/candidates
 * @access  Private (Recruiter only)
 */
export const getCandidates = asyncHandler(async (req, res) => {
  // Extract query params for filtering
  const { techStack, minXp, page = 1, limit = 20 } = req.query;

  // Build the match stage
  const matchStage = {
    role: 'student',
    accountStatus: 'active'
  };

  if (minXp) {
    matchStage.xp = { $gte: parseInt(minXp) };
  }

  if (techStack) {
    const techArray = techStack.split(',').map(t => t.trim().toLowerCase());
    // Use regex for case insensitive match on knownTechnologies
    matchStage.knownTechnologies = { 
      $in: techArray.map(tech => new RegExp(tech, 'i')) 
    };
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Fetch candidates using aggregation
  const candidates = await User.aggregate([
    { $match: matchStage },
    { $sort: { xp: -1, 'placementReadinessScore': -1 } },
    { $skip: skip },
    { $limit: limitNum },
    {
      $project: {
        _id: 1,
        fullName: 1,
        email: 1,
        avatar: 1,
        targetRole: 1,
        knownTechnologies: 1,
        xp: 1,
        streak: 1,
        badges: 1,
        stats: {
          totalSolved: { $size: { $ifNull: ["$solvedProblems", []] } }
        },
        placementReadinessScore: 1,
        linkedin: 1,
        github: 1
      }
    }
  ]);

  const total = await User.countDocuments(matchStage);

  res.status(200).json(
    new ApiResponse(200, {
      candidates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    }, 'Candidates fetched successfully')
  );
});

/**
 * @desc    Get a single candidate's detailed profile
 * @route   GET /api/recruiters/candidates/:id
 * @access  Private (Recruiter only)
 */
export const getCandidateById = asyncHandler(async (req, res) => {
  const candidate = await User.findOne({
    _id: req.params.id,
    role: 'student'
  }).select('-password -twoFactorSecret -passwordHistory');

  if (!candidate) {
    throw new ApiError(404, 'Candidate not found');
  }

  res.status(200).json(
    new ApiResponse(200, candidate, 'Candidate fetched successfully')
  );
});
