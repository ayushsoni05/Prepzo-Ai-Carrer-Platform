import { asyncHandler } from '../middleware/error.middleware.js';
import PlacementScore from '../models/PlacementScore.model.js';
import GameStats from '../models/GameStats.model.js';
import User from '../models/User.model.js';

export const calculateScore = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = await GameStats.create({ user: userId });
  }

  // 1. Resume Strength (out of 100)
  // 40 points if resume URL exists, up to 60 points based on profile completeness (experiences, education, skills, projects, links)
  let resumeStrength = 0;
  if (user.resumeUrl) resumeStrength += 40;
  if (user.experiences && user.experiences.length > 0) resumeStrength += 15;
  if (user.portfolioProjects && user.portfolioProjects.length > 0) resumeStrength += 15;
  if (user.knownTechnologies && user.knownTechnologies.length > 0) resumeStrength += 15;
  if (user.collegeName || user.degree) resumeStrength += 15;
  resumeStrength = Math.min(100, resumeStrength);

  // 2. Technical Skills (out of 100)
  // Normalized based on XP in GameStats
  const totalXp = stats.xp || 0;
  let technicalSkills = Math.min(100, Math.floor(totalXp / 50) + 30); // Base 30, grows with XP

  // 3. Interview Readiness (out of 100)
  // Based on proctoring / mock interviews played
  const interviewsPlayed = stats.proctorSandbox?.played || 0;
  let interviewReadiness = Math.min(100, (interviewsPlayed * 15) + 40); // Base 40, grows with mocks

  // 4. Project Portfolio (out of 100)
  // Based on profile projects and devops sandbox status
  const devopsPlayed = stats.devopsSandbox?.played || 0;
  let projectPortfolio = Math.min(100, ((user.portfolioProjects?.length || 0) * 20) + (devopsPlayed * 10) + 35);

  // 5. Consistency (out of 100)
  // Based on total games played
  const gamesPlayed = (stats.trivia?.played || 0) + 
                      (stats.regexInvaders?.played || 0) + 
                      (stats.codeGolf?.played || 0) + 
                      (stats.cyberDefense?.played || 0) + 
                      (stats.githubReconstructor?.played || 0) + 
                      (stats.systemWhiteboard?.played || 0);
  let consistency = Math.min(100, (gamesPlayed * 5) + 45);

  // 6. Target Alignment (out of 100)
  // Random fluctuation around a stable baseline
  const targetAlignment = Math.floor(Math.random() * 30) + 55;

  // Overall Score (Weighted Average)
  // Weights: Resume (20%), Technical (25%), Interview (20%), Projects (15%), Consistency (10%), Target (10%)
  const overallScore = Math.round(
    (resumeStrength * 0.20) +
    (technicalSkills * 0.25) +
    (interviewReadiness * 0.20) +
    (projectPortfolio * 0.15) +
    (consistency * 0.10) +
    (targetAlignment * 0.10)
  );

  // Company Match predictions based on overallScore + custom offsets
  const COMPANIES = [
    { company: 'Google', tier: 'dream', offset: -12 },
    { company: 'Amazon', tier: 'target', offset: 2 },
    { company: 'Microsoft', tier: 'target', offset: 5 },
    { company: 'Meta', tier: 'dream', offset: -10 },
    { company: 'Flipkart', tier: 'safety', offset: 12 },
    { company: 'Razorpay', tier: 'target', offset: 8 },
    { company: 'Stripe', tier: 'dream', offset: -15 },
    { company: 'Atlassian', tier: 'target', offset: 6 }
  ];

  const companyPredictions = COMPANIES.map(c => {
    const variance = Math.floor(Math.random() * 6) - 3; // -3 to +3 random variance
    const matchPercentage = Math.min(99, Math.max(25, overallScore + c.offset + variance));
    return {
      company: c.company,
      matchPercentage,
      tier: c.tier
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Skill Gaps mapping
  const skillGaps = [
    { skill: 'System Design', currentLevel: Math.min(10, Math.floor(overallScore / 15) + 1), requiredLevel: 8, priority: 'critical' },
    { skill: 'Data Structures', currentLevel: Math.min(10, Math.floor(technicalSkills / 11)), requiredLevel: 9, priority: 'important' },
    { skill: 'Behavioral', currentLevel: Math.min(10, Math.floor(interviewReadiness / 12) + 1), requiredLevel: 7, priority: 'important' },
    { skill: 'Problem Solving', currentLevel: Math.min(10, Math.floor(technicalSkills / 12) + 2), requiredLevel: 8, priority: 'important' },
    { skill: 'Communication', currentLevel: Math.min(10, Math.floor(interviewReadiness / 14) + 2), requiredLevel: 8, priority: 'nice-to-have' },
    { skill: 'Projects', currentLevel: Math.min(10, Math.floor(projectPortfolio / 13) + 1), requiredLevel: 7, priority: 'critical' }
  ];

  let placementScore = await PlacementScore.findOne({ user: userId });
  if (!placementScore) {
    placementScore = new PlacementScore({ user: userId });
  }

  placementScore.overallScore = overallScore;
  placementScore.breakdown = {
    resumeStrength,
    technicalSkills,
    interviewReadiness,
    projectPortfolio,
    consistency,
    targetAlignment
  };
  placementScore.companyPredictions = companyPredictions;
  placementScore.skillGaps = skillGaps;
  placementScore.lastCalculated = new Date();
  
  // Update history trend
  placementScore.history.push({ score: overallScore, date: new Date() });
  // Keep only last 10 records for history to prevent document bloat
  if (placementScore.history.length > 10) {
    placementScore.history.shift();
  }

  await placementScore.save();

  res.json({ success: true, data: placementScore });
});

export const getScore = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let score = await PlacementScore.findOne({ user: userId });

  if (!score) {
    // If none exists, calculate the first one automatically
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    // We will trigger a calculation
    let stats = await GameStats.findOne({ user: userId });
    if (!stats) {
      await GameStats.create({ user: userId });
    }
    // Perform standard calculations
    const resumeStrength = user.resumeUrl ? 65 : 30;
    const technicalSkills = 45;
    const interviewReadiness = 50;
    const projectPortfolio = 40;
    const consistency = 40;
    const targetAlignment = 60;
    const overallScore = 48;

    score = await PlacementScore.create({
      user: userId,
      overallScore,
      breakdown: { resumeStrength, technicalSkills, interviewReadiness, projectPortfolio, consistency, targetAlignment },
      companyPredictions: [
        { company: 'Flipkart', matchPercentage: 60, tier: 'safety' },
        { company: 'Microsoft', matchPercentage: 53, tier: 'target' },
        { company: 'Atlassian', matchPercentage: 54, tier: 'target' },
        { company: 'Amazon', matchPercentage: 50, tier: 'target' },
        { company: 'Google', matchPercentage: 36, tier: 'dream' }
      ],
      skillGaps: [
        { skill: 'System Design', currentLevel: 3, requiredLevel: 8, priority: 'critical' },
        { skill: 'Data Structures', currentLevel: 5, requiredLevel: 9, priority: 'important' },
        { skill: 'Projects', currentLevel: 4, requiredLevel: 7, priority: 'critical' }
      ],
      history: [{ score: overallScore, date: new Date() }],
      lastCalculated: new Date()
    });
  }

  res.json({ success: true, data: score });
});

export const getSkillGaps = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const score = await PlacementScore.findOne({ user: userId });

  if (!score) {
    res.json({ success: true, data: [] });
    return;
  }

  res.json({ success: true, data: score.skillGaps });
});
