import mongoose from 'mongoose';

const userTrackProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  completedTasks: [{ phaseIndex: Number, taskIndex: Number, completedAt: { type: Date, default: Date.now } }],
  startedAt: { type: Date, default: Date.now },
}, { timestamps: true });

userTrackProgressSchema.index({ user: 1, company: 1 }, { unique: true });

const UserTrackProgress = mongoose.model('UserTrackProgress', userTrackProgressSchema);
export default UserTrackProgress;
