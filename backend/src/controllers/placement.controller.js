import { asyncHandler } from '../middleware/error.middleware.js';
import aiServiceModule from '../services/aiService.js';

/**
 * @desc    Analyze ATS match score between resume and job description
 * @route   POST /api/placement/analyze-ats
 * @access  Private
 */
export const analyzeAts = asyncHandler(async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    res.status(400);
    throw new Error('Please provide both resume text and job description');
  }

  const result = await aiServiceModule.analyzeAtsMatch(resumeText, jobDescription);

  res.status(200).json(result);
});

/**
 * @desc    Tailor specific resume bullets
 * @route   POST /api/placement/tailor-resume
 * @access  Private
 */
export const tailorResume = asyncHandler(async (req, res) => {
  const { originalBullets, jobDescription, missingKeywords } = req.body;

  if (!originalBullets || !jobDescription || !missingKeywords) {
    res.status(400);
    throw new Error('Please provide original bullets, job description, and missing keywords');
  }

  const result = await aiServiceModule.tailorResumeBullets(originalBullets, jobDescription, missingKeywords);

  res.status(200).json(result);
});

/**
 * @desc    Generate cold outreach messages
 * @route   POST /api/placement/generate-outreach
 * @access  Private
 */
export const generateOutreach = asyncHandler(async (req, res) => {
  const { resumeText, jobDescription, targetCompany, targetRole } = req.body;

  if (!resumeText || !jobDescription || !targetCompany || !targetRole) {
    res.status(400);
    throw new Error('Please provide resume text, job description, target company, and target role');
  }

  const result = await aiServiceModule.generateColdOutreach(resumeText, jobDescription, targetCompany, targetRole);

  res.status(200).json(result);
});
