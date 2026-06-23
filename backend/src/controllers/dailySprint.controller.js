import { asyncHandler } from '../middleware/error.middleware.js';
import UserStreak from '../models/UserStreak.model.js';
import DailyChallenge from '../models/DailyChallenge.model.js';

const QUESTION_POOL = {
  dsa: [
    {
      question: "What is the worst-case time complexity of lookup in a hash table?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation: "In the worst case (when all keys hash to the same bucket causing collisions), lookup becomes O(n).",
      difficulty: "easy"
    },
    {
      question: "Which data structure uses LIFO (Last In First Out) ordering?",
      options: ["Queue", "Stack", "Heap", "Binary Tree"],
      correctAnswer: 1,
      explanation: "A Stack inserts and removes elements from the same end, satisfying Last In First Out behavior.",
      difficulty: "easy"
    },
    {
      question: "Which algorithm is commonly used to find the shortest path in a weighted graph with non-negative edge weights?",
      options: ["Kruskal's", "Dijkstra's", "Prim's", "Bellman-Ford"],
      correctAnswer: 1,
      explanation: "Dijkstra's algorithm solves the single-source shortest path problem for graphs with non-negative edge weights.",
      difficulty: "medium"
    },
    {
      question: "What is the time complexity to search an element in a balanced Binary Search Tree?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "A balanced BST halves the search space at each node, giving a search time complexity of O(log n).",
      difficulty: "easy"
    },
    {
      question: "Which sorting algorithm has a stable O(n log n) worst-case time complexity?",
      options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation: "Merge Sort is guaranteed to run in O(n log n) time and maintains the relative order of equal elements (stable).",
      difficulty: "medium"
    },
    {
      question: "What is the maximum number of nodes in a binary tree of height h (where height of root is 1)?",
      options: ["2^h - 1", "2^(h-1)", "2^h", "2^(h+1) - 1"],
      correctAnswer: 0,
      explanation: "A fully complete binary tree of height h has exactly 2^h - 1 nodes.",
      difficulty: "medium"
    }
  ],
  behavioral: [
    {
      question: "What does the 'A' in the STAR method stand for?",
      options: ["Agreement", "Action", "Analysis", "Authority"],
      correctAnswer: 1,
      explanation: "STAR stands for Situation, Task, Action, and Result. 'Action' describes what steps you took.",
      difficulty: "easy"
    },
    {
      question: "If a teammate is consistently underperforming, what is the best first step?",
      options: [
        "Report them immediately to the manager",
        "Talk to them privately to understand the root cause and offer help",
        "Ignore it and do their share of work",
        "Call them out publicly in the next standup"
      ],
      correctAnswer: 1,
      explanation: "Constructive private discussion allows for understanding potential issues and building trust.",
      difficulty: "easy"
    },
    {
      question: "When handling a critical production bug, how should you communicate status to stakeholders?",
      options: [
        "Silence until the bug is fully resolved",
        "Blame the person who wrote the buggy line of code",
        "Provide regular, clear updates with status, impact, and expected resolution time",
        "Minimize the severity so they do not worry"
      ],
      correctAnswer: 2,
      explanation: "Proactive and transparent communication helps build trust and keeps stakeholders aligned during outages.",
      difficulty: "medium"
    },
    {
      question: "A client insists on a feature that will significantly delay the project timeline. What is the best approach?",
      options: [
        "Say 'no' immediately without explanation",
        "Accept it blindly and work 80-hour weeks",
        "Present alternative designs or phased options, showing cost/timeline impacts",
        "Escalate to executive leadership to force them to back down"
      ],
      correctAnswer: 2,
      explanation: "Presenting collaborative options with transparent impacts enables healthy decision making and consensus.",
      difficulty: "medium"
    },
    {
      question: "How should you respond to critical feedback on your pull request?",
      options: [
        "Defend your code aggressively and refuse to change it",
        "Accept it with a growth mindset, ask clarifying questions, and discuss trade-offs",
        "Delete the pull request and start over",
        "Complain to other teammates about the reviewer"
      ],
      correctAnswer: 1,
      explanation: "Constructive feedback loop is a key element of engineering growth and maintaining software quality.",
      difficulty: "easy"
    },
    {
      question: "Which quality is most critical when leading a cross-functional team project?",
      options: [
        "Having the most technical knowledge in all areas",
        "Clear alignment on goals, expectations, and transparent communication",
        "Micro-managing every task to ensure perfection",
        "Making all design decisions independently"
      ],
      correctAnswer: 1,
      explanation: "Shared goals and transparent communication align diverse teams toward successful execution.",
      difficulty: "medium"
    }
  ],
  "system-design": [
    {
      question: "Which of the following is primarily used to distribute traffic across a group of servers?",
      options: ["Web Server", "Database Index", "Load Balancer", "Reverse Proxy"],
      correctAnswer: 2,
      explanation: "A Load Balancer routes incoming network traffic across multiple servers to ensure scalability and availability.",
      difficulty: "easy"
    },
    {
      question: "What does database sharding involve?",
      options: [
        "Creating replicas of the database for read scaling",
        "Splitting a database table horizontally across multiple machines",
        "Encrypting database tables for security",
        "Converting relational tables to NoSQL formats"
      ],
      correctAnswer: 1,
      explanation: "Sharding is horizontal partitioning of data across multiple database instances to distribute load.",
      difficulty: "medium"
    },
    {
      question: "In system design, what does the CAP theorem state?",
      options: [
        "A system can achieve Consistency, Availability, and Partition Tolerance simultaneously",
        "A system can choose at most two of Consistency, Availability, and Partition Tolerance in the presence of network partitions",
        "Caching, API gateways, and Proxies are required for all web applications",
        "Complexity increases in proportion to Application Performance"
      ],
      correctAnswer: 1,
      explanation: "CAP theorem states that a distributed system can guarantee at most two out of Consistency, Availability, and Partition Tolerance.",
      difficulty: "medium"
    },
    {
      question: "Which technology is optimal for sub-millisecond caching of database queries?",
      options: ["MongoDB", "Redis", "Elasticsearch", "PostgreSQL"],
      correctAnswer: 1,
      explanation: "Redis is an in-memory key-value store optimized for ultra-fast, sub-millisecond lookups and caching.",
      difficulty: "easy"
    },
    {
      question: "What is a major advantage of using a Microservices architecture over a Monolithic one?",
      options: [
        "Simplified deployment and monitoring",
        "Elimination of network communication overhead",
        "Independent scalability and loose coupling of services",
        "Easier transaction management across all features"
      ],
      correctAnswer: 2,
      explanation: "Microservices allow independent scaling, tech stack flexibility, and loose coupling, though they increase operational complexity.",
      difficulty: "medium"
    },
    {
      question: "Which mechanism is used to handle service failures gracefully by returning default responses or falling back?",
      options: ["Rate Limiter", "Circuit Breaker", "Reverse Proxy", "Consistent Hashing"],
      correctAnswer: 1,
      explanation: "Circuit Breakers prevent cascading failures by stopping calls to a failing service and returning mock/default data.",
      difficulty: "medium"
    }
  ]
};

export const getTodaysSprint = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let challenge = await DailyChallenge.findOne({ date: today });

  if (!challenge) {
    // Generate new DailyChallenge by selecting a random question from each category
    const rounds = ['dsa', 'behavioral', 'system-design'].map(category => {
      const pool = QUESTION_POOL[category];
      const selected = pool[Math.floor(Math.random() * pool.length)];
      return {
        type: category,
        question: selected.question,
        options: selected.options,
        correctAnswer: selected.correctAnswer,
        explanation: selected.explanation,
        difficulty: selected.difficulty,
        xpReward: 25
      };
    });

    challenge = await DailyChallenge.create({
      date: today,
      rounds
    });
  }

  // Strip correctAnswer from response for security
  const sanitizedRounds = challenge.rounds.map(r => ({
    type: r.type,
    question: r.question,
    options: r.options,
    difficulty: r.difficulty,
    xpReward: r.xpReward
  }));

  res.json({ success: true, data: { rounds: sanitizedRounds } });
});

export const submitRound = asyncHandler(async (req, res) => {
  const { roundIndex, answer, timeTakenMs } = req.body;
  const userId = req.user._id;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const challenge = await DailyChallenge.findOne({ date: today });
  if (!challenge) {
    res.status(404);
    throw new Error("Daily challenge not found for today.");
  }

  const round = challenge.rounds[roundIndex];
  if (!round) {
    res.status(400);
    throw new Error("Invalid round index.");
  }

  const isCorrect = round.correctAnswer === answer;
  let xpEarned = 0;

  if (isCorrect) {
    // Base 25 XP + speed bonus (up to 15 XP if time taken is small)
    const timeBonus = Math.max(0, Math.min(15, Math.floor((30000 - timeTakenMs) / 2000)));
    xpEarned = round.xpReward + timeBonus;

    // Update or create UserStreak
    let streak = await UserStreak.findOne({ user: userId });
    if (!streak) {
      streak = new UserStreak({ user: userId });
    }

    streak.weeklyXp += xpEarned;
    streak.totalXp += xpEarned;

    // Check if streak needs updating
    if (roundIndex === 2) {
      // Completed all 3 rounds
      streak.totalSprintsCompleted += 1;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!streak.lastCompletedDate) {
        streak.currentStreak = 1;
      } else {
        const lastDate = new Date(streak.lastCompletedDate);
        lastDate.setUTCHours(0, 0, 0, 0);

        if (lastDate.getTime() === yesterday.getTime()) {
          streak.currentStreak += 1;
        } else if (lastDate.getTime() !== today.getTime()) {
          // Streak was broken
          streak.currentStreak = 1;
        }
      }

      streak.lastCompletedDate = today;
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
    }

    // Update League based on weeklyXp
    if (streak.weeklyXp >= 800) streak.league = 'Diamond';
    else if (streak.weeklyXp >= 500) streak.league = 'Platinum';
    else if (streak.weeklyXp >= 300) streak.league = 'Gold';
    else if (streak.weeklyXp >= 100) streak.league = 'Silver';
    else streak.league = 'Bronze';

    await streak.save();
  }

  res.json({
    success: true,
    data: {
      correct: isCorrect,
      correctAnswer: round.correctAnswer,
      explanation: round.explanation,
      xpEarned
    }
  });
});

export const getStreakStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let streak = await UserStreak.findOne({ user: userId });

  if (!streak) {
    streak = await UserStreak.create({ user: userId });
  }

  res.json({ success: true, data: streak });
});

export const useStreakFreeze = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const streak = await UserStreak.findOne({ user: userId });

  if (!streak || streak.freezesAvailable <= 0) {
    res.status(400);
    throw new Error("No streak freezes available.");
  }

  streak.freezesAvailable -= 1;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Mark streak as saved for today
  streak.lastCompletedDate = today;
  await streak.save();

  res.json({ success: true, data: streak });
});
