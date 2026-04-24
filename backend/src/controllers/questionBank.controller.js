import InterviewQuestion from '../models/InterviewQuestion.model.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * @desc    Get all categories and sub-skills for filtering
 * @route   GET /api/question-bank/categories
 * @access  Private
 */
export const getCategories = catchAsync(async (req, res) => {
  const categories = await InterviewQuestion.aggregate([
    {
      $group: {
        _id: '$category',
        subSkills: { $addToSet: '$subSkill' }
      }
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        subSkills: 1
      }
    },
    {
      $sort: { category: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: categories
  });
});

/**
 * @desc    Get questions based on filters
 * @route   GET /api/question-bank/questions
 * @access  Private
 */
export const getQuestions = catchAsync(async (req, res) => {
  const { category, subSkill, difficulty, search } = req.query;

  const query = {};

  if (category) query.category = category;
  if (subSkill) query.subSkill = subSkill;
  if (difficulty) {
    const diff = difficulty.toLowerCase();
    if (diff === 'beginner' || diff === 'easy') {
      query.difficulty = { $in: ['beginner', 'easy'] };
    } else if (diff === 'intermediate' || diff === 'medium') {
      query.difficulty = { $in: ['intermediate', 'medium'] };
    } else if (diff === 'advanced' || diff === 'hard') {
      query.difficulty = { $in: ['advanced', 'hard'] };
    } else {
      query.difficulty = diff;
    }
  }
  
  if (search) {
    query.$or = [
      { question: { $regex: search, $options: 'i' } },
      { answer: { $regex: search, $options: 'i' } },
      { keywords: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  const questions = await InterviewQuestion.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: questions.length,
    data: questions
  });
});
