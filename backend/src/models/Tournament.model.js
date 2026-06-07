import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'registration_open', 'in_progress', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  maxParticipants: {
    type: Number,
    default: 16,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  brackets: {
    // A flexible JSON object representing the tournament tree structure
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  prizes: [{
    place: Number,
    description: String,
    xpReward: Number,
  }],
  winnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
export default Tournament;
