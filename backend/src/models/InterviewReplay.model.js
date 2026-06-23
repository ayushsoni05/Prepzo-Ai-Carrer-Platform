import mongoose from 'mongoose';

const interviewReplaySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  duration: { type: Number },
  recordingUrl: { type: String },
  analysis: {
    overallGrade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'] },
    confidenceScore: { type: Number, min: 0, max: 100 },
    speechPace: { type: Number },
    fillerWordCount: { type: Number, default: 0 },
    fillerWords: [{ word: String, count: Number, timestamps: [Number] }],
    answerStructureScore: { type: Number, min: 0, max: 100 },
    eyeContactScore: { type: Number, min: 0, max: 100 }
  },
  keyMoments: [{
    timestamp: Number,
    type: { type: String, enum: ['positive', 'warning', 'negative'] },
    description: String
  }],
}, { timestamps: true });

const InterviewReplay = mongoose.model('InterviewReplay', interviewReplaySchema);
export default InterviewReplay;
