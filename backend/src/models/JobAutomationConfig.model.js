import mongoose from 'mongoose';

const jobAutomationConfigSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      default: true,
    },
    autoApproveJobs: {
      type: Boolean,
      default: false, // Default to requiring admin approval/moderation
    },
    maxJobsPerRun: {
      type: Number,
      default: 15, // Cap to 15 per run to conserve API rate limits
    },
    searchQueries: {
      type: [String],
      default: [
        'Software Engineer hiring India 2026',
        'Frontend Developer react internship India',
        'Backend Developer Node startup jobs',
        'QA Engineer remote roles',
        'DevOps Engineer fresher hiring'
      ],
    },
    rssFeeds: {
      type: [String],
      default: [
        'https://weworkremotely.com/categories/remote-programming-jobs.rss',
        'https://remoteok.com/remote-jobs.rss'
      ],
    },
    lastRunTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only a single config document exists in the collection
jobAutomationConfigSchema.statics.getOrCreate = async function () {
  let config = await this.findOne({});
  if (!config) {
    config = await this.create({});
  }
  return config;
};

const JobAutomationConfig = mongoose.model('JobAutomationConfig', jobAutomationConfigSchema);

export default JobAutomationConfig;
