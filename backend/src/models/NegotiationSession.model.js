import mongoose from 'mongoose';

const negotiationSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    personality: {
      type: String,
      enum: ['heather', 'fred'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'accepted', 'rejected', 'rescinded'],
      default: 'active',
    },
    sentiment: {
      type: Number,
      min: 0,
      max: 100,
      default: 75,
    },
    originalOffer: {
      base_salary: Number,
      sign_on_bonus: Number,
      target_bonus: Number,
      equity_type: String,
      equity_amount: Number,
      strike_price: Number,
      current_valuation: Number,
      vesting_years: Number,
      cliff_months: Number,
    },
    currentOffer: {
      base_salary: Number,
      sign_on_bonus: Number,
      target_bonus: Number,
      equity_type: String,
      equity_amount: Number,
      strike_price: Number,
      current_valuation: Number,
      vesting_years: Number,
      cliff_months: Number,
    },
    chatHistory: [
      {
        role: {
          type: String,
          enum: ['recruiter', 'candidate', 'coach'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        tactic: String,
        coachingTip: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tacticsUsed: [String],
    finalCompensationIncrease: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const NegotiationSession = mongoose.model('NegotiationSession', negotiationSessionSchema);
export default NegotiationSession;
