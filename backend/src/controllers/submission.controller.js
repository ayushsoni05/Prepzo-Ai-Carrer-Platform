import { Submission } from "../models/Submission.model.js";
import User from "../models/User.model.js";
import catchAsync from "../utils/catchAsync.js";

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Private
const createSubmission = catchAsync(async (req, res) => {
  const { problemId, language, code, status, testCasesPassed, totalTestCases, difficulty } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized request" });
  }

  if (!problemId || !language || !code || !status || totalTestCases === undefined) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const submission = await Submission.create({
    userId,
    problemId,
    language,
    code,
    status,
    testCasesPassed,
    totalTestCases,
  });

  let gamification = null;

  if (status === "Accepted") {
    const user = await User.findById(userId);
    if (user) {
      const alreadySolved = user.solvedProblems.find(p => p.problemId === problemId);
      
      if (!alreadySolved) {
        // 1. Add to solved problems
        user.solvedProblems.push({
          problemId,
          difficulty: difficulty || 'Medium', // Fallback to medium
          solvedAt: new Date()
        });

        // 2. Add XP
        let xpGained = 0;
        if (difficulty === 'Easy') xpGained = 10;
        else if (difficulty === 'Hard') xpGained = 50;
        else xpGained = 30; // Medium

        user.xp += xpGained;

        // 3. Update Streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let lastActive = null;
        if (user.lastActiveDate) {
          lastActive = new Date(user.lastActiveDate);
          lastActive.setHours(0, 0, 0, 0);
        }

        if (!lastActive) {
          user.streak = 1;
        } else {
          const diffTime = Math.abs(today - lastActive);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          
          if (diffDays === 1) {
            user.streak += 1;
          } else if (diffDays > 1) {
            user.streak = 1;
          }
        }
        user.lastActiveDate = new Date();

        // 4. Badges Evaluation
        const newBadges = [];
        const solvedCount = user.solvedProblems.length;
        
        const badgeCheck = (name, condition) => {
          if (condition && !user.badges.find(b => b.name === name)) {
            user.badges.push({ name, earnedAt: new Date() });
            newBadges.push(name);
          }
        };

        badgeCheck("First Blood", solvedCount >= 1);
        badgeCheck("Novice Solver", solvedCount >= 10);
        badgeCheck("Dedicated", user.streak >= 3);
        badgeCheck("Consistent", user.streak >= 7);
        badgeCheck("Array Master", solvedCount >= 25); // Placeholder milestone

        await user.save();

        gamification = {
          xpGained,
          newTotalXp: user.xp,
          newStreak: user.streak,
          newBadges
        };
      }
    }
  }

  return res.status(201).json({ 
    success: true, 
    data: submission, 
    gamification,
    message: "Submission saved successfully" 
  });
});

// @desc    Get submissions for a specific problem by user
// @route   GET /api/submissions/problem/:problemId
// @access  Private
const getProblemSubmissions = catchAsync(async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized request" });
  }

  const submissions = await Submission.find({ userId, problemId })
    .sort({ createdAt: -1 })
    .limit(50); // Fetch latest 50 submissions

  return res.status(200).json({ success: true, data: submissions, message: "Submissions fetched successfully" });
});

export { createSubmission, getProblemSubmissions };
