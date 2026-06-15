import { asyncHandler } from '../middleware/error.middleware.js';
import TriviaQuestion from '../models/TriviaQuestion.model.js';
import GameStats from '../models/GameStats.model.js';

// Default CS questions to seed if the database is empty
const DEFAULT_QUESTIONS = [
  {
    question: "Which of the following is not a valid state in a process life cycle?",
    options: ["New", "Running", "Waiting", "Compiled"],
    correctAnswer: 3,
    category: "OS",
    difficulty: "Easy",
    explanation: "The standard states of a process are New, Ready, Running, Waiting, and Terminated. Compiled is not a process state."
  },
  {
    question: "What is thrashing in an Operating System?",
    options: ["High CPU utilization", "Excessive page swapping activity", "Deadlock state", "Cache coherence problem"],
    correctAnswer: 1,
    category: "OS",
    difficulty: "Medium",
    explanation: "Thrashing occurs when a virtual memory system spends more time swapping pages in and out of secondary storage than executing actual processes."
  },
  {
    question: "Which CPU scheduling algorithm can lead to starvation?",
    options: ["Round Robin", "First Come First Served", "Shortest Job First", "FIFO"],
    correctAnswer: 2,
    category: "OS",
    difficulty: "Medium",
    explanation: "Shortest Job First scheduling can cause starvation for longer jobs if shorter jobs constantly arrive at the queue."
  },
  {
    question: "Which normal form handles transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: 2,
    category: "DBMS",
    difficulty: "Medium",
    explanation: "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key."
  },
  {
    question: "What does ACID stand for in DBMS?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Durability", "Access, Control, Index, Data", "Atomicity, Concurrency, Isolation, Distribution"],
    correctAnswer: 0,
    category: "DBMS",
    difficulty: "Easy",
    explanation: "ACID properties ensure transaction reliability: Atomicity, Consistency, Isolation, and Durability."
  },
  {
    question: "Which of the following joins returns all rows from both tables even if there is no match?",
    options: ["Inner Join", "Left Join", "Right Join", "Full Outer Join"],
    correctAnswer: 3,
    category: "DBMS",
    difficulty: "Easy",
    explanation: "A Full Outer Join returns all records when there is a match in either left or right table records."
  },
  {
    question: "Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its superclass?",
    options: ["Method Overloading", "Method Overriding", "Encapsulation", "Polymorphism"],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Easy",
    explanation: "Method Overriding is dynamic polymorphism where a subclass overrides a superclass method implementation."
  },
  {
    question: "What is a virtual function in C++?",
    options: ["A function that cannot be modified", "A function defined in a base class and overridden by a derived class", "A function with no body", "A private utility function"],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Medium",
    explanation: "A virtual function is used to ensure dynamic binding, where the overridden function in the derived class is called at runtime."
  },
  {
    question: "Which keyword is used to prevent inheritance of a class in Java?",
    options: ["static", "abstract", "final", "private"],
    correctAnswer: 2,
    category: "OOPs",
    difficulty: "Easy",
    explanation: "In Java, declaring a class as 'final' prevents it from being subclassed / inherited."
  },
  {
    question: "Which layer of the OSI model is responsible for routing packets?",
    options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Easy",
    explanation: "The Network Layer handles packet routing, logical addressing (IP), and forwarding."
  },
  {
    question: "What is the primary function of the Address Resolution Protocol (ARP)?",
    options: ["Map IP address to MAC address", "Resolve domain names to IP addresses", "Establish secure TCP connection", "Route packets across subnets"],
    correctAnswer: 0,
    category: "Networks",
    difficulty: "Medium",
    explanation: "ARP maps a dynamic Internet Protocol (IP) address to a permanent physical machine (MAC) address in a local network."
  },
  {
    question: "Which port is commonly used for secure web traffic (HTTPS)?",
    options: ["21", "80", "443", "8080"],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Easy",
    explanation: "Port 443 is the default port for secure HTTPS web traffic, while port 80 is used for unencrypted HTTP traffic."
  }
];

// Helper to seed questions if empty
const seedQuestionsIfNeeded = async () => {
  const count = await TriviaQuestion.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding default CS Trivia Questions...');
    await TriviaQuestion.insertMany(DEFAULT_QUESTIONS);
  }
};

/**
 * @desc    Get random trivia questions
 * @route   GET /api/games/trivia/questions
 * @access  Private
 */
export const getTriviaQuestions = asyncHandler(async (req, res) => {
  await seedQuestionsIfNeeded();
  
  const { category, limit = 5 } = req.query;
  const matchStage = {};
  if (category) {
    matchStage.category = category;
  }

  const questions = await TriviaQuestion.aggregate([
    { $match: matchStage },
    { $sample: { size: parseInt(limit) } }
  ]);

  res.status(200).json({
    success: true,
    data: questions,
  });
});

/**
 * @desc    Get user's game stats
 * @route   GET /api/games/stats
 * @access  Private
 */
export const getMyGameStats = asyncHandler(async (req, res) => {
  let stats = await GameStats.findOne({ user: req.user._id });
  if (!stats) {
    stats = await GameStats.create({ user: req.user._id });
  }

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * @desc    Report trivia game outcome
 * @route   POST /api/games/trivia/report
 * @access  Private
 */
export const reportTriviaOutcome = asyncHandler(async (req, res) => {
  const { score, won } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP (10 per correct answer, 50 bonus for win)
  const earnedXp = (score * 10) + (won ? 50 : 0);
  stats.xp += earnedXp;

  // Update stats
  stats.trivia.played += 1;
  if (won) stats.trivia.won += 1;
  if (score > stats.trivia.highScore) {
    stats.trivia.highScore = score;
  }

  // Award badges based on milestones
  if (stats.trivia.won >= 5 && !stats.badges.includes('Trivia Master')) {
    stats.badges.push('Trivia Master');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Report regex invaders score
 * @route   POST /api/games/regex/report
 * @access  Private
 */
export const reportRegexOutcome = asyncHandler(async (req, res) => {
  const { score, level } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP (20 per level reached, + score/10)
  const earnedXp = Math.round((level * 20) + (score / 10));
  stats.xp += earnedXp;

  // Update stats
  stats.regexInvaders.played += 1;
  if (score > stats.regexInvaders.highScore) {
    stats.regexInvaders.highScore = score;
  }
  if (level > stats.regexInvaders.maxLevelReached) {
    stats.regexInvaders.maxLevelReached = level;
  }

  // Award badges
  if (stats.regexInvaders.maxLevelReached >= 5 && !stats.badges.includes('Regex Commander')) {
    stats.badges.push('Regex Commander');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Get total game leaderboard
 * @route   GET /api/games/leaderboard
 * @access  Private
 */
export const getGameLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await GameStats.find()
    .populate('user', 'fullName avatar targetRole')
    .sort({ xp: -1 })
    .limit(10);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});

/**
 * @desc    Report code golf game outcome
 * @route   POST /api/games/golf/report
 * @access  Private
 */
export const reportCodeGolfOutcome = asyncHandler(async (req, res) => {
  const { charCount, passed } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  let earnedXp = 5; // Consolation XP for playing
  if (passed) {
    // Shorter code yields more XP, minimum 15 XP + 40 XP pass bonus
    earnedXp = Math.max(15, Math.round(120 - charCount)) + 40;
    stats.xp += earnedXp;

    stats.codeGolf.played += 1;
    if (charCount < stats.codeGolf.shortestChar) {
      stats.codeGolf.shortestChar = charCount;
    }

    // Award Golf Champion badge if they solved it in <= 60 characters
    if (stats.codeGolf.shortestChar <= 60 && !stats.badges.includes('Golf Champion')) {
      stats.badges.push('Golf Champion');
    }
  } else {
    stats.xp += earnedXp;
    stats.codeGolf.played += 1;
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});

/**
 * @desc    Report cyber defense patches outcome
 * @route   POST /api/games/cyber/report
 * @access  Private
 */
export const reportCyberDefenseOutcome = asyncHandler(async (req, res) => {
  const { patches } = req.body; // Number of successful patches (e.g. 0 to 3)
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // 40 XP per successful patch, plus 10 consolation XP if played but 0 patches
  const earnedXp = patches > 0 ? (patches * 40) : 10;
  stats.xp += earnedXp;

  stats.cyberDefense.played += 1;
  stats.cyberDefense.successfulPatches += patches;

  // Award Certified Secure Coder badge if they accumulated 6 successful patches
  if (stats.cyberDefense.successfulPatches >= 6 && !stats.badges.includes('Certified Secure Coder')) {
    stats.badges.push('Certified Secure Coder');
  }

  await stats.save();

  res.status(200).json({
    success: true,
    data: {
      stats,
      earnedXp
    }
  });
});
