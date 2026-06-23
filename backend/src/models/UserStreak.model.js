import mongoose from 'mongoose';

const userStreakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastCompletedDate: { type: Date },
  freezesAvailable: { type: Number, default: 1 },
  totalSprintsCompleted: { type: Number, default: 0 },
  league: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'], default: 'Bronze' },
  weeklyXp: { type: Number, default: 0 },
  totalXp: { type: Number, default: 0 },
}, { timestamps: true });

const UserStreak = mongoose.model('UserStreak', userStreakSchema);
export default UserStreak;
