import mongoose from 'mongoose';

const gameStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  trivia: {
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
  },
  regexInvaders: {
    played: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    maxLevelReached: { type: Number, default: 0 },
  },
  codeGolf: {
    played: { type: Number, default: 0 },
    shortestChar: { type: Number, default: 9999 },
  },
  cyberDefense: {
    played: { type: Number, default: 0 },
    successfulPatches: { type: Number, default: 0 },
  },
  githubReconstructor: {
    played: { type: Number, default: 0 },
    lineCountAnalyzed: { type: Number, default: 0 },
  },
  proctorSandbox: {
    played: { type: Number, default: 0 },
    highestTrustScore: { type: Number, default: 0 },
  },
  devopsSandbox: {
    played: { type: Number, default: 0 },
    successfulPipelines: { type: Number, default: 0 },
  },
  systemWhiteboard: {
    played: { type: Number, default: 0 },
    auditsRun: { type: Number, default: 0 },
  },
  gridQuest: {
    played: { type: Number, default: 0 },
    highScore: { type: Number, default: 0 },
    completedDomains: [{ type: String }],
  },
  visualPuzzles: {
    played: { type: Number, default: 0 },
    completedLevels: [{ type: String }],
    highScore: { type: Number, default: 0 },
  },
  badges: [{
    type: String,
  }]
}, {
  timestamps: true,
});

const GameStats = mongoose.model('GameStats', gameStatsSchema);

export default GameStats;
