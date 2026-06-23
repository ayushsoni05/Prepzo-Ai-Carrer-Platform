import mongoose from 'mongoose';

const placementScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  overallScore: { type: Number, default: 0, min: 0, max: 100 },
  breakdown: {
    resumeStrength: { type: Number, default: 0 },
    technicalSkills: { type: Number, default: 0 },
    interviewReadiness: { type: Number, default: 0 },
    projectPortfolio: { type: Number, default: 0 },
    consistency: { type: Number, default: 0 },
    targetAlignment: { type: Number, default: 0 }
  },
  companyPredictions: [{
    company: String,
    matchPercentage: Number,
    tier: { type: String, enum: ['dream', 'target', 'safety'] }
  }],
  skillGaps: [{
    skill: String,
    currentLevel: Number,
    requiredLevel: Number,
    priority: { type: String, enum: ['critical', 'important', 'nice-to-have'] }
  }],
  history: [{ score: Number, date: { type: Date, default: Date.now } }],
  lastCalculated: { type: Date },
}, { timestamps: true });

const PlacementScore = mongoose.model('PlacementScore', placementScoreSchema);
export default PlacementScore;
