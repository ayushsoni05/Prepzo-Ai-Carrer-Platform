import mongoose from 'mongoose';

const codingRoomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem: {
    title: String,
    description: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    examples: [{ input: String, output: String }],
    hints: [String]
  },
  status: { type: String, enum: ['waiting', 'active', 'completed'], default: 'waiting' },
  language: { type: String, default: 'javascript' },
  hostCode: { type: String, default: '' },
  participantCode: { type: String, default: '' },
  chatMessages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now }
  }],
  hintsUsed: { type: Number, default: 0 },
  startedAt: Date,
  endedAt: Date,
}, { timestamps: true });

const CodingRoom = mongoose.model('CodingRoom', codingRoomSchema);
export default CodingRoom;
