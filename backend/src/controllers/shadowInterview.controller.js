import OpenAI from 'openai';
import dotenv from 'dotenv';
import ShadowInterviewSession from '../models/ShadowInterviewSession.model.js';
import CodingProblem from '../models/CodingProblem.model.js';

dotenv.config();

// Configure OpenAI client with OpenRouter and Groq fallback
const groq = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : 'https://api.groq.com/openai/v1',
  defaultHeaders: process.env.OPENROUTER_API_KEY ? {
    'HTTP-Referer': 'https://prepzo-ai-career-platform.vercel.app/',
    'X-Title': 'Prepzo AI Career Platform',
  } : undefined
});

const FILLER_WORDS = ['um', 'uh', 'like', 'actually', 'basically', 'you know', 'literally', 'mean', 'sort of'];

// Helper to count filler words
const analyzeFillerWords = (text) => {
  if (!text) return { count: 0, detected: [] };
  const words = text.toLowerCase().split(/\s+/);
  const detected = [];
  let count = 0;

  words.forEach(word => {
    // Clean word of punctuation
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    if (FILLER_WORDS.includes(cleanWord)) {
      count++;
      if (!detected.includes(cleanWord)) {
        detected.push(cleanWord);
      }
    }
  });

  return { count, detected };
};

/**
 * Start a new shadow interview session
 */
export const startShadowInterview = async (req, res) => {
  try {
    const { problemId = 'two-sum', recruiterPersonality = 'fred' } = req.body;

    // Retrieve problem
    let problem = await CodingProblem.findOne({ id: problemId });
    if (!problem) {
      // Fallback local problem so it never crashes
      problem = {
        id: 'two-sum',
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'Easy',
        starterCode: {
          javascript: 'function twoSum(nums, target) {\n  // Write your solution here\n}',
          python: 'def twoSum(nums, target):\n    # Write your solution here\n    pass',
          cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n}',
          java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n}'
        }
      };
    }

    let greeting = '';
    if (recruiterPersonality === 'heather') {
      greeting = `Hi, I'm Heather. Thanks for coming in today. We will be looking at the "${problem.title}" problem. I trust you're familiar with it. Please explain your approach out loud to me first, and then you can start writing your code.`;
    } else {
      greeting = `Hey there! I'm Fred. Super excited to run through this technical coding interview with you today. We'll be working on "${problem.title}". Take your time, explain your thoughts out loud as you go, and let's write some code together.`;
    }

    const session = await ShadowInterviewSession.create({
      user: req.user._id,
      problemId,
      recruiterPersonality,
      status: 'active',
      conversationHistory: [
        {
          sender: 'recruiter',
          text: greeting,
          timestamp: new Date(),
        }
      ],
      speechMetrics: {
        wordsPerMinute: 0,
        fillerWordsCount: 0,
        detectedFillers: [],
        silenceGaps: 0,
      },
      overallEvaluation: {
        codeScore: 0,
        communicationScore: 0,
        finalCode: '',
        feedbackSummary: '',
      }
    });

    return res.status(201).json({
      success: true,
      data: {
        session,
        problem
      }
    });
  } catch (error) {
    console.error('Error in startShadowInterview:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to start interview session.',
      error: error.message,
    });
  }
};

/**
 * Handle user message & code update during interview
 */
export const sendShadowInterviewMessage = async (req, res) => {
  try {
    const { sessionId, message, code } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required.',
      });
    }

    const session = await ShadowInterviewSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found.',
      });
    }

    if (session.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Interview session has already completed.',
      });
    }

    // Add candidate's spoken text and code snapshot to history
    session.conversationHistory.push({
      sender: 'candidate',
      text: message || '[typing code or silent thinking]',
      codeSnapshot: code || '',
      timestamp: new Date(),
    });

    // Analyze speech metrics
    const fillers = analyzeFillerWords(message);
    session.speechMetrics.fillerWordsCount += fillers.count;
    fillers.detected.forEach(f => {
      if (!session.speechMetrics.detectedFillers.includes(f)) {
        session.speechMetrics.detectedFillers.push(f);
      }
    });

    // Fetch problem details for reference
    let problem = await CodingProblem.findOne({ id: session.problemId });
    const problemDesc = problem ? problem.description : 'Two Sum description';

    // Construct history log for AI
    const systemPrompt = `
You are simulating a live technical coding interview.
Your persona is: "${session.recruiterPersonality === 'heather' ? 'Hardball Heather' : 'Flexible Fred'}".

Recruiter Personality Rules:
${session.recruiterPersonality === 'heather'
  ? `- Hardball Heather: Strict, sharp, and highly demanding. Wants to see optimal time/space complexity. Asks candidates to justify their DS&A choices. Probes edge cases and points out logical flaws immediately. Speaks concisely and professionally.`
  : `- Flexible Fred: Friendly, encouraging, and collaborative. Helps the user out if they get stuck. Focuses on logical thinking and offers gentle nudges if they go off track.`}

Interview Context:
- Problem: "${problem ? problem.title : 'Two Sum'}"
- Description: "${problemDesc}"

Your Task:
Evaluate the candidate's latest spoken explanation and current code draft.
Generate the recruiter's next verbal response. If they written suboptimal code (like a brute-force O(N^2) solution), Heather should push them to optimize it; Fred should guide them towards a Hash Map or optimization.
Respond with a speakable response (text-to-speech friendly).

You MUST respond ONLY with a valid JSON object matching this schema:
{
  "recruiterResponse": "The conversational reply of the recruiter.",
  "shouldInterrupt": boolean, // true if the recruiter wants to stop the user's coding flow to ask about an optimization or bug
  "coachingTip": "1-2 sentences of strategic guidance from Prepzo Coach on how the candidate can improve their response or code.",
  "evaluation": {
    "correctness": "e.g., pending / partially-correct / optimal",
    "timeComplexity": "e.g., O(N^2) / O(N)",
    "spaceComplexity": "e.g., O(1)"
  }
}
`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...session.conversationHistory.slice(-10).map(h => ({
        role: h.sender === 'recruiter' ? 'assistant' : 'user',
        content: `Candidate said: "${h.text}"\nCandidate's current code:\n\`\`\`\n${h.codeSnapshot}\n\`\`\``,
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    // Add recruiter's response to history
    session.conversationHistory.push({
      sender: 'recruiter',
      text: aiResponse.recruiterResponse || 'Got it. Go ahead and write the code.',
      codeSnapshot: code || '',
      timestamp: new Date(),
    });

    // Update speech metrics (WPM approximation)
    const totalWords = session.conversationHistory
      .filter(h => h.sender === 'candidate')
      .reduce((sum, h) => sum + (h.text ? h.text.split(/\s+/).length : 0), 0);
    const durationMinutes = Math.max(0.5, (new Date() - session.createdAt) / 60000);
    session.speechMetrics.wordsPerMinute = Math.round(totalWords / durationMinutes);

    await session.save();

    return res.status(200).json({
      success: true,
      data: {
        session,
        coachingTip: aiResponse.coachingTip || '',
        shouldInterrupt: aiResponse.shouldInterrupt || false,
        evaluation: aiResponse.evaluation || {}
      }
    });
  } catch (error) {
    console.error('Error in sendShadowInterviewMessage:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process interview message.',
      error: error.message,
    });
  }
};

/**
 * Complete the interview and run a detailed scorecard evaluation
 */
export const completeShadowInterview = async (req, res) => {
  try {
    const { sessionId, code } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required.',
      });
    }

    const session = await ShadowInterviewSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found.',
      });
    }

    session.status = 'completed';
    if (code) {
      session.overallEvaluation.finalCode = code;
    }

    // Call LLM for a comprehensive scorecard report
    const systemPrompt = `
You are a senior technical interviewer.
Analyze this candidate's entire coding interview logs and final code.
Evaluate:
1. Technical correctness and optimality of the code (0-100).
2. Communication clarity, structural explanation, and verbal pacing (0-100).
3. Provide a summary of constructive feedback.

You MUST respond ONLY with a valid JSON object matching this schema:
{
  "codeScore": number, // 0 to 100
  "communicationScore": number, // 0 to 100
  "feedbackSummary": "A detailed multi-line summary of strengths, weaknesses, and concrete action steps."
}
`;

    const formattedLogs = session.conversationHistory
      .map(h => `${h.sender.toUpperCase()}: ${h.text}\n[Code Snapshot]:\n${h.codeSnapshot}\n`)
      .join('\n');

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Interview Log:\n${formattedLogs}\n\nFinal Code submitted:\n${code || session.overallEvaluation.finalCode}` }
      ],
      model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.5,
      max_tokens: 1500,
    });

    const aiReport = JSON.parse(completion.choices[0].message.content);

    session.overallEvaluation.codeScore = aiReport.codeScore || 50;
    session.overallEvaluation.communicationScore = aiReport.communicationScore || 50;
    session.overallEvaluation.feedbackSummary = aiReport.feedbackSummary || 'Evaluation completed.';

    await session.save();

    return res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error in completeShadowInterview:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete interview evaluation.',
      error: error.message,
    });
  }
};
