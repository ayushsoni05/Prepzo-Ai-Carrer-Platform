import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  codeSnapshot: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'submitted', 'disconnected', 'surrendered'],
    default: 'active',
  },
  submittedAt: {
    type: Date,
  },
  testsPassed: {
    type: Number,
    default: 0,
  },
  totalTests: {
    type: Number,
    default: 0,
  }
});

const battleSchema = new mongoose.Schema({
  battleId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['1v1', 'multiplayer', 'boss'],
    default: '1v1',
  },
  status: {
    type: String,
    enum: ['waiting', 'in_progress', 'completed', 'cancelled'],
    default: 'waiting',
  },
  problemIds: {
    type: [String],
    required: true,
  },
  participants: [participantSchema],
  spectators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  timeLimitMinutes: {
    type: Number,
    default: 30,
  },
  winnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
  }
}, {
  timestamps: true,
});

const Battle = mongoose.model('Battle', battleSchema);
export default Battle;
