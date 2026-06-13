import mongoose from 'mongoose';

const resumeInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    questions: {
      type: [String],
      required: true,
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    followUpCount: {
      type: Number,
      default: 0, // Number of follow-ups asked for the current main question (0, 1, or 2)
    },
    conversationHistory: [
      {
        sender: {
          type: String,
          enum: ['recruiter', 'candidate'],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    evaluations: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        feedback: {
          type: String,
          default: '',
        },
        score: {
          type: Number,
          default: 0,
        },
        perfectAnswer: {
          type: String,
          default: '',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ResumeInterviewSession = mongoose.model('ResumeInterviewSession', resumeInterviewSessionSchema);
export default ResumeInterviewSession;
