import express from 'express';
import OpenAI from 'openai';
import CodingProblem from '../models/CodingProblem.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

const groq = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : 'https://api.groq.com/openai/v1',
  defaultHeaders: process.env.OPENROUTER_API_KEY ? {
    'HTTP-Referer': 'https://prepzo-ai-career-platform.vercel.app/',
    'X-Title': 'Prepzo AI Career Platform',
  } : undefined
});

async function populateProblemWithAI(problem) {
  try {
    const systemPrompt = `
You are an expert curriculum designer and software engineer.
Your task is to generate full content for the LeetCode coding problem: "${problem.title}".

Provide the following:
1. A detailed HTML-formatted LeetCode description containing examples (input/output) and constraints.
2. Boilerplate starter code in: JavaScript, Python, C++, and Java. Ensure correct syntax, standard class/function signatures, and parameter comments.
3. Exactly 10 test cases (3 public, 7 hidden). The test inputs and expected outputs must be strings.

You MUST respond ONLY with a valid JSON object matching this schema:
{
  "description": "HTML description",
  "starterCode": {
    "javascript": "var...",
    "python": "class...",
    "cpp": "class...",
    "java": "class..."
  },
  "testCases": [
    {
      "id": "tc1",
      "input": "input representation",
      "expectedOutput": "expected return representation",
      "isHidden": false
    },
    ...
  ]
}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Please populate content for: "${problem.title}"` }
      ],
      model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 4000
    });

    const aiData = JSON.parse(completion.choices[0].message.content);

    if (aiData.testCases && Array.isArray(aiData.testCases) && aiData.testCases.length >= 5) {
      problem.description = aiData.description || problem.description;
      problem.starterCode = aiData.starterCode || problem.starterCode;
      problem.testCases = aiData.testCases;
      await problem.save();
      console.log(`✅ On-demand populated: ${problem.title}`);
    }
  } catch (err) {
    console.error(`❌ Failed to populate on-demand ${problem.title}:`, err.message);
  }
  return problem;
}

// Optional: protect routes so only authenticated users can access the problem bank
// router.use(protect);

/**
 * @desc    Get all coding problems (lightweight payload, optimized for hub listing)
 * @route   GET /api/coding-problems
 */
router.get('/', async (req, res, next) => {
  try {
    const { search, difficulty, company, page = 1, limit = 20 } = req.query;
    
    // Build filter query
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (difficulty) {
      filter.difficulty = { $regex: new RegExp(`^${difficulty}$`, 'i') };
    }
    if (company) {
      filter.companyTags = { $regex: new RegExp(`^${company}$`, 'i') };
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Exclude heavy fields like testCases and starterCode for the listing view
    const totalProblems = await CodingProblem.countDocuments(filter);
    const problems = await CodingProblem.find(filter)
      .select('id title difficulty acceptanceRate companyTags')
      .sort({ title: 1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      data: {
        problems,
        totalProblems,
        totalPages: Math.ceil(totalProblems / limitNum),
        currentPage: pageNum
      }
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
    let problem = await CodingProblem.findOne({ id });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Coding problem not found'
      });
    }

    // Check if it's a stub
    const isStub = !problem.testCases || problem.testCases.length <= 2 || problem.description.includes('Determine the optimal solution');
    if (isStub) {
      console.log(`Stub detected for "${problem.title}" (${problem.id}). Populating on-demand...`);
      problem = await populateProblemWithAI(problem);
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
