import { asyncHandler } from '../middleware/error.middleware.js';
import TriviaQuestion from '../models/TriviaQuestion.model.js';
import GameStats from '../models/GameStats.model.js';

// Default CS questions to seed if the database is empty
const DEFAULT_QUESTIONS = [
  // --- EASY QUESTIONS (10) ---
  {
    question: "Which of the following is not a valid state in a process life cycle?",
    options: ["New", "Running", "Waiting", "Compiled"],
    correctAnswer: 3,
    category: "OS",
    difficulty: "Easy",
    explanation: "The standard states of a process are New, Ready, Running, Waiting, and Terminated. Compiled is not a process state."
  },
  {
    question: "What does ACID stand for in DBMS?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Completeness, Integrity, Durability",
      "Access, Control, Index, Data",
      "Atomicity, Concurrency, Isolation, Distribution"
    ],
    correctAnswer: 0,
    category: "DBMS",
    difficulty: "Easy",
    explanation: "ACID properties ensure transaction reliability: Atomicity (all or nothing), Consistency (preserves database rules), Isolation (independent transactions), and Durability (saved permanently)."
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
    question: "Which port is commonly used for secure web traffic (HTTPS)?",
    options: ["21", "80", "443", "8080"],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Easy",
    explanation: "Port 443 is the default port for secure HTTPS web traffic, while port 80 is used for unencrypted HTTP traffic."
  },
  {
    question: "What is the primary function of a CPU?",
    options: [
      "Executing instructions and processing data",
      "Storing data permanently",
      "Rendering high-end graphics",
      "Managing cooling fans speed"
    ],
    correctAnswer: 0,
    category: "General",
    difficulty: "Easy",
    explanation: "The CPU (Central Processing Unit) executes instruction code and processes operations. Memory and GPU handle storage and graphics."
  },
  {
    question: "Which data structure operates on a Last In First Out (LIFO) basis?",
    options: ["Queue", "Stack", "Graph", "Tree"],
    correctAnswer: 1,
    category: "General",
    difficulty: "Easy",
    explanation: "A Stack operates on a LIFO basis (the last item added is the first one removed). A Queue is First In First Out (FIFO)."
  },
  {
    question: "What is the HTML tag used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<link>"],
    correctAnswer: 2,
    category: "General",
    difficulty: "Easy",
    explanation: "The <style> tag is used to write CSS rules internally within an HTML page. <link> is for external sheets."
  },

  // --- MEDIUM QUESTIONS (10) ---
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
    question: "What is a virtual function in C++?",
    options: [
      "A function that cannot be modified",
      "A function defined in a base class and overridden by a derived class",
      "A function with no body",
      "A private utility function"
    ],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Medium",
    explanation: "A virtual function is used to ensure dynamic binding, where the overridden function in the derived class is called at runtime."
  },
  {
    question: "What is the primary function of the Address Resolution Protocol (ARP)?",
    options: [
      "Map IP address to MAC address",
      "Resolve domain names to IP addresses",
      "Establish secure TCP connection",
      "Route packets across subnets"
    ],
    correctAnswer: 0,
    category: "Networks",
    difficulty: "Medium",
    explanation: "ARP maps a dynamic Internet Protocol (IP) address to a permanent physical machine (MAC) address in a local network."
  },
  {
    question: "Which memory management scheme suffers from external fragmentation?",
    options: ["Segmentation", "Paging", "Virtual Memory", "Cache Mapping"],
    correctAnswer: 0,
    category: "OS",
    difficulty: "Medium",
    explanation: "Segmentation allocates variable-sized memory segments, leading to external fragmentation. Paging divides memory into fixed pages, avoiding this."
  },
  {
    question: "What is the purpose of an index in a database?",
    options: [
      "To encrypt stored records",
      "To speed up data retrieval operations",
      "To eliminate all duplicate values",
      "To enforce foreign key relationships"
    ],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Medium",
    explanation: "An index is a data structure that allows database engines to find rows quickly without performing a full-table scan."
  },
  {
    question: "Which type of inheritance is not directly supported in Java?",
    options: ["Single Inheritance", "Multilevel Inheritance", "Multiple Inheritance", "Hierarchical Inheritance"],
    correctAnswer: 2,
    category: "OOPs",
    difficulty: "Medium",
    explanation: "Java does not support Multiple Inheritance with classes to avoid diamond problems, though it is supported through interfaces."
  },
  {
    question: "Which protocol is used to dynamically assign IP addresses to hosts on a network?",
    options: ["DHCP", "DNS", "FTP", "SMTP"],
    correctAnswer: 0,
    category: "Networks",
    difficulty: "Medium",
    explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses, subnet masks, and gateways to clients."
  },
  {
    question: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    category: "General",
    difficulty: "Medium",
    explanation: "Searching in a balanced BST takes logarithmic time, O(log n), because half the tree is eliminated at each decision step."
  },

  // --- HARD QUESTIONS (10) ---
  {
    question: "What is the primary difference between a process and a thread?",
    options: [
      "Threads share the same memory space; processes have independent memory spaces",
      "Processes share the same memory space; threads have independent memory spaces",
      "Threads run on CPU; processes run on disk",
      "Processes can be multi-tasked; threads cannot"
    ],
    correctAnswer: 0,
    category: "OS",
    difficulty: "Hard",
    explanation: "A process has its own address space, file descriptors, and security context. Threads run within a process and share its address space."
  },
  {
    question: "What does the CAP Theorem state about distributed databases?",
    options: [
      "It is impossible to guarantee Consistency, Access, and Performance simultaneously",
      "A distributed system can only provide two of: Consistency, Availability, and Partition Tolerance",
      "Database structures must maintain Concurrency, Auditing, and Privacy",
      "Every database transaction must adhere to Complexity, Availability, and Portability"
    ],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Hard",
    explanation: "CAP Theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance."
  },
  {
    question: "In object-oriented design, what does the Liskov Substitution Principle (LSP) declare?",
    options: [
      "Objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior",
      "A class should only have a single reason to change",
      "Subclasses must hide all parent fields",
      "High-level modules should not depend on low-level modules"
    ],
    correctAnswer: 0,
    category: "OOPs",
    difficulty: "Hard",
    explanation: "LSP states that derived classes must be completely substitutable for their base classes, ensuring polymorphic correctness."
  },
  {
    question: "Which TCP congestion control phase occurs immediately after receiving three duplicate ACKs?",
    options: ["Slow Start", "Fast Recovery and Fast Retransmit", "Congestion Avoidance", "Timeout Phase"],
    correctAnswer: 1,
    category: "Networks",
    difficulty: "Hard",
    explanation: "Three duplicate ACKs suggest a packet was lost but network flow is active. TCP triggers Fast Retransmit and enters Fast Recovery, avoiding Slow Start."
  },
  {
    question: "What is the main goal of the Banker's Algorithm in an Operating System?",
    options: [
      "To optimize virtual memory allocations",
      "To assign priorities to system threads",
      "To safely allocate resources and prevent deadlocks",
      "To schedule disk read/write requests"
    ],
    correctAnswer: 2,
    category: "OS",
    difficulty: "Hard",
    explanation: "The Banker's Algorithm is a deadlock avoidance algorithm that checks if allocating resources leaves the system in a safe state."
  },
  {
    question: "Which indexing structure is most optimal for range-based queries in relational databases?",
    options: ["Hash Indexing", "B+ Tree Indexing", "Inverted Indexing", "Bitmap Indexing"],
    correctAnswer: 1,
    category: "DBMS",
    difficulty: "Hard",
    explanation: "B+ Trees store records in sorted leaf nodes linked sequentially, making range queries (e.g. BETWEEN A AND B) extremely efficient."
  },
  {
    question: "What is the primary security vulnerability of the standard Diffie-Hellman key exchange without authentication?",
    options: [
      "Distributed Denial of Service",
      "SQL Query Injection",
      "Man-in-the-Middle Attack",
      "Stack Buffer Overflow"
    ],
    correctAnswer: 2,
    category: "Networks",
    difficulty: "Hard",
    explanation: "Diffie-Hellman establishes keys between anonymous parties. Without authentication, an active eavesdropper can intercept and negotiate keys with both sides."
  },
  {
    question: "In multi-threaded Java applications, what does the volatile keyword guarantee?",
    options: [
      "Thread lock exclusion on the variable block",
      "Ensures variable read/write operations bypass CPU caches and go directly to main memory",
      "Forces variables to remain immutable",
      "Converts a variable to thread-local storage"
    ],
    correctAnswer: 1,
    category: "OOPs",
    difficulty: "Hard",
    explanation: "Volatile guarantees memory visibility. Changes to a volatile variable are immediately visible to all threads by forcing direct memory syncs."
  },
  {
    question: "What is the time complexity of the Floyd-Warshall algorithm for all-pairs shortest paths?",
    options: ["O(V log V)", "O(V^2)", "O(V^3)", "O(E log V)"],
    correctAnswer: 2,
    category: "General",
    difficulty: "Hard",
    explanation: "Floyd-Warshall uses three nested loops over the set of vertices V, yielding a time complexity of O(V^3)."
  },
  {
    question: "Which of the following is true about a compiler compared to an interpreter?",
    options: [
      "A compiler translates the entire source code to machine code before execution; an interpreter translates it line-by-line during runtime",
      "An interpreter produces a standalone executable file; a compiler does not",
      "A compiler executes programs faster initially than an interpreter",
      "Interpreted programs generally use less memory than compiled programs"
    ],
    correctAnswer: 0,
    category: "General",
    difficulty: "Hard",
    explanation: "Compilers convert high-level code into executable machine binaries beforehand. Interpreters evaluate source code sequentially on-the-fly."
  }
];

// Helper to seed questions if empty or incomplete
const seedQuestionsIfNeeded = async () => {
  const count = await TriviaQuestion.countDocuments();
  if (count < 30) {
    console.log('🌱 Seeding/Resetting default CS Trivia Questions to match new Who Wants to Be a Millionaire suite...');
    await TriviaQuestion.deleteMany({});
    await TriviaQuestion.insertMany(DEFAULT_QUESTIONS);
  }
};

/**
 * @desc    Get random trivia questions sorted progressively by difficulty
 * @route   GET /api/games/trivia/questions
 * @access  Private
 */
export const getTriviaQuestions = asyncHandler(async (req, res) => {
  await seedQuestionsIfNeeded();
  
  const { category, limit = 15 } = req.query;
  const matchStage = {};
  if (category) {
    matchStage.category = category;
  }

  const parsedLimit = parseInt(limit);

  if (parsedLimit === 15) {
    // Millionaire progression: 5 Easy, 5 Medium, 5 Hard
    const easyQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Easy' } },
      { $sample: { size: 5 } }
    ]);
    const mediumQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Medium' } },
      { $sample: { size: 5 } }
    ]);
    const hardQs = await TriviaQuestion.aggregate([
      { $match: { ...matchStage, difficulty: 'Hard' } },
      { $sample: { size: 5 } }
    ]);

    const orderedQuestions = [...easyQs, ...mediumQs, ...hardQs];

    return res.status(200).json({
      success: true,
      data: orderedQuestions,
    });
  }

  const questions = await TriviaQuestion.aggregate([
    { $match: matchStage },
    { $sample: { size: parsedLimit } }
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
 * @desc    Report trivia game outcome (Who Wants to Be a Millionaire)
 * @route   POST /api/games/trivia/report
 * @access  Private
 */
export const reportTriviaOutcome = asyncHandler(async (req, res) => {
  const { score, cashedOut } = req.body;
  const userId = req.user._id;

  let stats = await GameStats.findOne({ user: userId });
  if (!stats) {
    stats = new GameStats({ user: userId });
  }

  // Calculate XP according to progressive Millionaire ladder
  let earnedXp = 5; // Default minor participation XP

  if (score === 15) {
    earnedXp = 500; // Grand prize
  } else if (cashedOut) {
    // Map of score-to-XP payouts when player cashes out safely
    const cashOutXpMap = {
      14: 400, 13: 300, 12: 250, 11: 200,
      10: 150, 9: 120, 8: 100, 7: 80, 6: 60,
      5: 50, 4: 40, 3: 30, 2: 20, 1: 10, 0: 0
    };
    earnedXp = cashOutXpMap[score] || 5;
  } else {
    // Player failed a question - drop to last safe milestone
    if (score >= 10) {
      earnedXp = 150; // Milestone 2 safe haven
    } else if (score >= 5) {
      earnedXp = 50;  // Milestone 1 safe haven
    } else {
      earnedXp = 5;   // Pre-milestone 1 failure
    }
  }

  stats.xp += earnedXp;
  stats.trivia.played += 1;

  // Deem a score >= 10 (clearing Milestone 2) as a "Won" match for trivia stats
  if (score >= 10 || score === 15) {
    stats.trivia.won += 1;
  }

  if (score > stats.trivia.highScore) {
    stats.trivia.highScore = score;
  }

  // Award Trivia Master badge
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
