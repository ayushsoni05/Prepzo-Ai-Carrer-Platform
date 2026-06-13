import aiInterviewService from '../services/aiInterview.service.js';
import User from '../models/User.model.js';
import ResumeInterviewSession from '../models/ResumeInterviewSession.model.js';

/**
 * @desc    Start a new AI mock interview session based on resume
 * @route   POST /api/interview/start
 */
export const startInterview = async (req, res, next) => {
  console.log('--- START INTERVIEW REQUEST ---');
  console.log('User ID:', req.user?._id);
  console.log('Resume Based:', req.body.resumeBased);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isResumeBased = req.body.resumeBased === true;

    // Get the user's latest resume text from their profile
    let resumeText = user.resumeText;

    if (!resumeText && user.resumeAnalysis) {
      // Synthesize text from analysis if raw text is missing
      const extracted = user.resumeAnalysis.extractedData;
      if (extracted) {
        resumeText = [
          `Skills: ${(extracted.skills || []).join(', ')}`,
          `Experience: ${(extracted.experience || []).map(e => `${e.role} at ${e.company}`).join('; ')}`,
          `Education: ${(extracted.education || []).map(e => `${e.degree} from ${e.institution}`).join('; ')}`
        ].join('\n');
      }
    }

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: 'No resume found. Please upload or paste your resume first.'
      });
    }

    const targetRole = user.targetRole || 'Software Engineer';

    // Generate questions using Groq (3 questions for resume-based interview)
    const numQuestions = 3;
    const aiResponse = await aiInterviewService.getResumeInterviewQuestions(resumeText, targetRole, numQuestions);

    if (!aiResponse.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate interview questions'
      });
    }

    const questions = aiResponse.data.questions;
    const firstQuestion = questions[0];

    if (isResumeBased) {
      // Create a persistent ResumeInterviewSession in MongoDB
      const session = await ResumeInterviewSession.create({
        user: req.user._id,
        status: 'active',
        questions,
        currentQuestionIndex: 0,
        followUpCount: 0,
        conversationHistory: [
          {
            sender: 'recruiter',
            text: firstQuestion,
          }
        ],
        evaluations: []
      });

      return res.status(200).json({
        success: true,
        data: {
          sessionId: session._id,
          questions,
          currentQuestion: firstQuestion,
          questionNumber: 1,
          totalQuestions: 9, // 3 main questions, each with 2 levels of follow-ups = 9 total stages
        }
      });
    }

    // Default legacy / stateless fallback
    const interviewSession = await aiInterviewService.resumeMockInterview(questions, 0);

    res.status(200).json({
      success: true,
      data: {
        questions,
        currentQuestion: interviewSession.data.question,
        questionNumber: interviewSession.data.question_number,
        totalQuestions: interviewSession.data.total_questions
      }
    });
  } catch (error) {
    console.error('Start interview error:', error);
    next(error);
  }
};

/**
 * @desc    Submit an answer to the current interview question
 * @route   POST /api/interview/submit
 */
export const submitAnswer = async (req, res, next) => {
  try {
    const { sessionId, questions, questionIndex, answer } = req.body;

    // Check if it is a stateful session-based interview
    if (sessionId) {
      const session = await ResumeInterviewSession.findById(sessionId);
      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Interview session not found'
        });
      }

      if (session.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'This interview session has already been completed'
        });
      }

      // User's answer corresponds to the last recruiter question
      const currentRecruiterQuestion = session.conversationHistory[session.conversationHistory.length - 1].text;

      // 1. Log the candidate's response
      session.conversationHistory.push({
        sender: 'candidate',
        text: answer || 'No response provided.',
      });

      const user = await User.findById(req.user._id);
      const targetRole = user?.targetRole || 'Software Engineer';

      // 2. Evaluate candidate's response and get a follow-up question
      const evalResponse = await aiInterviewService.evaluateResumeInterviewResponse(
        currentRecruiterQuestion,
        answer,
        session.conversationHistory,
        targetRole
      );

      if (!evalResponse.success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to evaluate answer and generate cross-question'
        });
      }

      const { feedback, score, perfectAnswer, followupQuestion } = evalResponse.data;

      // Log the evaluation for the current question/answer
      session.evaluations.push({
        question: currentRecruiterQuestion,
        answer: answer || 'No response.',
        feedback,
        score,
        perfectAnswer,
      });

      let nextQuestion = null;
      let isComplete = false;
      let questionNumber = session.evaluations.length + 1;

      // 3. Conversational State Machine: Ask at least 2 cross-questions (follow-up count 0, 1, then 2)
      if (session.followUpCount < 2) {
        // We need another follow-up question (cross-questioning)
        session.followUpCount += 1;
        nextQuestion = followupQuestion || 'Can you explain further?';
        
        session.conversationHistory.push({
          sender: 'recruiter',
          text: nextQuestion,
        });

        await session.save();

        return res.status(200).json({
          success: true,
          data: {
            feedback,
            score,
            perfectAnswer,
            nextQuestion,
            question_number: questionNumber,
            total_questions: 9, // Fixed max questions (3 main questions * 3 stages each = 9)
            is_complete: false,
          }
        });
      } else {
        // We have asked 2 follow-ups already. We reset the count and move to the next main question.
        session.followUpCount = 0;
        session.currentQuestionIndex += 1;

        if (session.currentQuestionIndex >= session.questions.length) {
          // All main questions and their follow-ups have been completed!
          session.status = 'completed';
          isComplete = true;
        } else {
          // Move to the next main question generated from resume
          nextQuestion = session.questions[session.currentQuestionIndex];
          session.conversationHistory.push({
            sender: 'recruiter',
            text: nextQuestion,
          });
        }

        await session.save();

        return res.status(200).json({
          success: true,
          data: {
            feedback,
            score,
            perfectAnswer,
            nextQuestion,
            question_number: questionNumber,
            total_questions: 9,
            is_complete: isComplete,
            evaluations: isComplete ? session.evaluations : undefined,
          }
        });
      }
    }

    // Default legacy / stateless fallback
    if (!questions || questionIndex === undefined || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: questions, questionIndex, or answer'
      });
    }

    // Evaluate current answer and get next question using Groq
    const aiResponse = await aiInterviewService.resumeMockInterview(questions, questionIndex + 1, answer);

    if (!aiResponse.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to evaluate answer'
      });
    }

    res.status(200).json({
      success: true,
      data: aiResponse.data
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    next(error);
  }
};

/**
 * @desc    Get the final results of an interview session
 * @route   GET /api/interview/results/:sessionId
 */
export const getInterviewResults = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = await ResumeInterviewSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found' });
    }
    res.status(200).json({
      success: true,
      data: {
        status: session.status,
        evaluations: session.evaluations,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      }
    });
  } catch (error) {
    next(error);
  }
};

