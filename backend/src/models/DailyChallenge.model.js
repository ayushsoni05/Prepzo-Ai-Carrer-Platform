import mongoose from 'mongoose';

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  rounds: [{
    type: { type: String, enum: ['dsa', 'behavioral', 'system-design'] },
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    xpReward: { type: Number, default: 25 }
  }],
}, { timestamps: true });

const DailyChallenge = mongoose.model('DailyChallenge', dailyChallengeSchema);
export default DailyChallenge;
