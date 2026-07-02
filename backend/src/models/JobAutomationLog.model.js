import mongoose from 'mongoose';

const jobAutomationLogSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['running', 'success', 'failed'],
      default: 'running',
    },
    jobsFoundCount: {
      type: Number,
      default: 0,
    },
    jobsAddedCount: {
      type: Number,
      default: 0,
    },
    companiesCreatedCount: {
      type: Number,
      default: 0,
    },
    jobsExpiredClosedCount: {
      type: Number,
      default: 0,
    },
    notificationsSentCount: {
      type: Number,
      default: 0,
    },
    logs: [
      {
        timestamp: { type: Date, default: Date.now },
        message: String,
      },
    ],
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const JobAutomationLog = mongoose.model('JobAutomationLog', jobAutomationLogSchema);

export default JobAutomationLog;
