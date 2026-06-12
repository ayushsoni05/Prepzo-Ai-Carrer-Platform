import express from 'express';
import CodingProblem from '../models/CodingProblem.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Optional: protect routes so only authenticated users can access the problem bank
// router.use(protect);

/**
 * @desc    Get all coding problems (lightweight payload, optimized for hub listing)
 * @route   GET /api/coding-problems
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, difficulty, company } = req.query;
    
    // Build filter query
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (company) {
      filter.companyTags = company;
    }

    // Exclude heavy fields like testCases and starterCode for the listing view
    const problems = await CodingProblem.find(filter)
      .select('id title difficulty acceptanceRate companyTags')
      .sort({ title: 1 })
      .limit(100);

    res.json({
      success: true,
      count: problems.length,
      data: problems
    });
  } catch (error) {
    console.error('Failed to fetch coding problems:', error);
    next(error);
  }
});

/**
 * @desc    Get a single coding problem's details (full payload including test cases and starter codes)
 * @route   GET /api/coding-problems/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const problem = await CodingProblem.findOne({ id });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Coding problem not found'
      });
    }

    res.json({
      success: true,
      data: problem
    });
  } catch (error) {
    console.error(`Failed to fetch coding problem ${id}:`, error);
    next(error);
  }
});

export default router;
