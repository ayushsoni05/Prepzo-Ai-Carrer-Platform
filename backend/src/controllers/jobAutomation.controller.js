import { asyncHandler } from '../middleware/error.middleware.js';
import JobAutomationConfig from '../models/JobAutomationConfig.model.js';
import JobAutomationLog from '../models/JobAutomationLog.model.js';
import { jobAutomator } from '../services/jobAutomator.service.js';

/**
 * @desc    Get current job automation status, last run logs, and configs
 * @route   GET /api/admin/job-automation/status
 * @access  Admin
 */
export const getAutomationStatus = asyncHandler(async (req, res) => {
  const config = await JobAutomationConfig.getOrCreate();
  const latestLog = await JobAutomationLog.findOne({}).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: {
      isRunning: jobAutomator.isRunning,
      config,
      latestLog,
    },
  });
});

/**
 * @desc    Trigger automated job scraping & parsing run immediately in the background
 * @route   POST /api/admin/job-automation/trigger
 * @access  Admin
 */
export const triggerAutomationRun = asyncHandler(async (req, res) => {
  if (jobAutomator.isRunning) {
    res.status(400);
    throw new Error('An automation run is already in progress.');
  }

  // Run in background, do not await
  jobAutomator.runAutomatedJobSystem().catch(err => {
    console.error('Background manual trigger failed:', err);
  });

  res.json({
    success: true,
    message: 'Job automation scraping and parsing runs triggered successfully in the background.',
  });
});

/**
 * @desc    Get paginated logs of past automation runs
 * @route   GET /api/admin/job-automation/logs
 * @access  Admin
 */
export const getAutomationLogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const logs = await JobAutomationLog.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await JobAutomationLog.countDocuments({});

  res.json({
    success: true,
    data: {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

/**
 * @desc    Get current job automation config
 * @route   GET /api/admin/job-automation/config
 * @access  Admin
 */
export const getAutomationConfig = asyncHandler(async (req, res) => {
  const config = await JobAutomationConfig.getOrCreate();
  res.json({
    success: true,
    data: config,
  });
});

/**
 * @desc    Update job automation configuration details
 * @route   PUT /api/admin/job-automation/config
 * @access  Admin
 */
export const updateAutomationConfig = asyncHandler(async (req, res) => {
  const { isEnabled, autoApproveJobs, maxJobsPerRun, searchQueries, rssFeeds } = req.body;

  let config = await JobAutomationConfig.getOrCreate();

  if (isEnabled !== undefined) config.isEnabled = isEnabled;
  if (autoApproveJobs !== undefined) config.autoApproveJobs = autoApproveJobs;
  if (maxJobsPerRun !== undefined) config.maxJobsPerRun = parseInt(maxJobsPerRun);
  if (searchQueries !== undefined) config.searchQueries = searchQueries;
  if (rssFeeds !== undefined) config.rssFeeds = rssFeeds;

  await config.save();

  res.json({
    success: true,
    message: 'Configuration updated successfully.',
    data: config,
  });
});
