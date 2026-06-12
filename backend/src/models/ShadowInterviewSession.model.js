import mongoose from 'mongoose';

const shadowInterviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
    recruiterPersonality: {
      type: String,
      default: 'standard',
    },
    speechMetrics: {
      wordsPerMinute: {
        type: Number,
        default: 0,
      },
      fillerWordsCount: {
        type: Number,
        default: 0,
      },
      detectedFillers: {
        type: [String],
        default: [],
      },
      silenceGaps: {
        type: Number,
        default: 0,
      },
    },
    overallEvaluation: {
      codeScore: {
        type: Number,
        default: 0,
      },
      communicationScore: {
        type: Number,
        default: 0,
      },
      finalCode: {
        type: String,
        default: '',
      },
      feedbackSummary: {
        type: String,
        default: '',
      },
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
        codeSnapshot: {
          type: String,
          default: '',
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShadowInterviewSession = mongoose.model('ShadowInterviewSession', shadowInterviewSessionSchema);
export default ShadowInterviewSession;
