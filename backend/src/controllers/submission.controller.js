import { Submission } from "../models/Submission.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Private
const createSubmission = asyncHandler(async (req, res) => {
  const { problemId, language, code, status, testCasesPassed, totalTestCases } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized request"));
  }

  if (!problemId || !language || !code || !status || totalTestCases === undefined) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  const submission = await Submission.create({
    userId,
    problemId,
    language,
    code,
    status,
    testCasesPassed,
    totalTestCases,
  });

  return res.status(201).json(new ApiResponse(201, submission, "Submission saved successfully"));
});

// @desc    Get submissions for a specific problem by user
// @route   GET /api/submissions/problem/:problemId
// @access  Private
const getProblemSubmissions = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized request"));
  }

  const submissions = await Submission.find({ userId, problemId })
    .sort({ createdAt: -1 })
    .limit(50); // Fetch latest 50 submissions

  return res.status(200).json(new ApiResponse(200, submissions, "Submissions fetched successfully"));
});

export { createSubmission, getProblemSubmissions };
