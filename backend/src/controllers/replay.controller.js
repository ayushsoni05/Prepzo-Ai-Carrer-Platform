import { asyncHandler } from '../middleware/error.middleware.js';
import InterviewReplay from '../models/InterviewReplay.model.js';

export const saveReplay = asyncHandler(async (req, res) => {
  const { title, duration, recordingUrl } = req.body;
  const userId = req.user._id;

  const replay = await InterviewReplay.create({
    user: userId,
    title,
    duration,
    recordingUrl
  });

  res.status(201).json({ success: true, data: replay });
});

export const getUserReplays = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const replays = await InterviewReplay.find({ user: userId }).sort({ createdAt: -1 });
  res.json({ success: true, data: replays });
});

export const getReplay = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const replay = await InterviewReplay.findOne({ _id: id, user: userId });
  if (!replay) {
    res.status(404);
    throw new Error('Interview replay not found');
  }

  res.json({ success: true, data: replay });
});

export const analyzeReplay = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const replay = await InterviewReplay.findOne({ _id: id, user: userId });
  if (!replay) {
    res.status(404);
    throw new Error('Interview replay not found');
  }

  // Generate mock AI feedback assessment details
  const confidenceScore = Math.floor(Math.random() * 25) + 70; // 70-95
  const speechPace = Math.floor(Math.random() * 50) + 120; // 120-170 words per minute
  const fillerWordCount = Math.floor(Math.random() * 12) + 4; // 4-16
  const answerStructureScore = Math.floor(Math.random() * 25) + 65; // 65-90
  const eyeContactScore = Math.floor(Math.random() * 30) + 65; // 65-95

  let overallGrade = 'B';
  const average = (confidenceScore + answerStructureScore + eyeContactScore) / 3;
  if (average >= 88) overallGrade = 'A';
  else if (average >= 74) overallGrade = 'B';
  else if (average >= 60) overallGrade = 'C';
  else if (average >= 45) overallGrade = 'D';
  else overallGrade = 'F';

  const fillerWords = [
    { word: 'like', count: Math.floor(fillerWordCount * 0.5), timestamps: [12, 45, 112, 180].slice(0, Math.floor(fillerWordCount * 0.5)) },
    { word: 'um', count: Math.floor(fillerWordCount * 0.3), timestamps: [24, 78, 140].slice(0, Math.floor(fillerWordCount * 0.3)) },
    { word: 'ah', count: Math.floor(fillerWordCount * 0.2), timestamps: [55, 160].slice(0, Math.floor(fillerWordCount * 0.2)) }
  ];

  const keyMoments = [
    { timestamp: 15, type: 'positive', description: 'Excellent posture and starting confidence.' },
    { timestamp: 45, type: 'warning', description: 'Repetitive filler words used when discussing complex details.' },
    { timestamp: 88, type: 'positive', description: 'Great application of the STAR method structure for your project task.' },
    { timestamp: 120, type: 'negative', description: 'Lost eye contact for over 15 seconds. Eye tracking drifted away.' },
    { timestamp: 165, type: 'positive', description: 'Strong concluding statement summarizing the impact.' }
  ];

  replay.analysis = {
    overallGrade,
    confidenceScore,
    speechPace,
    fillerWordCount,
    fillerWords,
    answerStructureScore,
    eyeContactScore
  };
  replay.keyMoments = keyMoments;

  await replay.save();

  res.json({ success: true, data: replay });
});

export const deleteReplay = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const replay = await InterviewReplay.findOneAndDelete({ _id: id, user: userId });
  if (!replay) {
    res.status(404);
    throw new Error('Replay not found or unauthorized');
  }

  res.json({ success: true, message: 'Replay deleted successfully' });
});
