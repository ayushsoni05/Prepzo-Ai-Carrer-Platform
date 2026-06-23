import { asyncHandler } from '../middleware/error.middleware.js';
import CompanyPrepTrack from '../models/CompanyPrepTrack.model.js';
import UserTrackProgress from '../models/UserTrackProgress.model.js';

export const getAllTracks = asyncHandler(async (req, res) => {
  // Return summary fields to avoid sending large nested phases
  const tracks = await CompanyPrepTrack.find({}, 'company slug logo tier avgSalary difficulty phases').lean();
  
  const formatted = tracks.map(t => ({
    company: t.company,
    slug: t.slug || t.company.toLowerCase(),
    logo: t.logo || '',
    tier: t.tier,
    difficulty: t.difficulty,
    avgSalary: t.avgSalary,
    phasesCount: t.phases ? t.phases.length : 0
  }));

  res.json({ success: true, data: formatted });
});

export const getTrack = asyncHandler(async (req, res) => {
  const { company } = req.params;
  
  const track = await CompanyPrepTrack.findOne({
    $or: [
      { company: { $regex: new RegExp(`^${company}$`, 'i') } },
      { slug: company.toLowerCase() }
    ]
  });

  if (!track) {
    res.status(404);
    throw new Error(`Company prep track for '${company}' not found`);
  }

  res.json({ success: true, data: track });
});

export const getProgress = asyncHandler(async (req, res) => {
  const { company } = req.params;
  const userId = req.user._id;

  const progress = await UserTrackProgress.findOne({ user: userId, company: company.toLowerCase() });
  
  res.json({ 
    success: true, 
    data: progress || { company: company.toLowerCase(), completedTasks: [] } 
  });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { company } = req.params;
  const { phaseIndex, taskIndex } = req.body;
  const userId = req.user._id;

  let progress = await UserTrackProgress.findOne({ user: userId, company: company.toLowerCase() });
  
  if (!progress) {
    progress = new UserTrackProgress({
      user: userId,
      company: company.toLowerCase(),
      completedTasks: []
    });
  }

  // Check if already completed
  const alreadyExists = progress.completedTasks.some(
    task => task.phaseIndex === phaseIndex && task.taskIndex === taskIndex
  );

  if (!alreadyExists) {
    progress.completedTasks.push({ phaseIndex, taskIndex, completedAt: new Date() });
    await progress.save();
  }

  res.json({ success: true, data: progress });
});
