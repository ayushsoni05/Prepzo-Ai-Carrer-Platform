import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import CompanyPrepTrack from '../models/CompanyPrepTrack.model.js';

const TRACKS = [
  // ─── 1. Google ───────────────────────────────────────────────────
  {
    company: 'Google',
    slug: 'google',
    logo: '/logos/google.svg',
    tier: 'FAANG',
    difficulty: 'Very Hard',
    avgSalary: '$180k-$350k',
    interviewFormat: {
      totalRounds: 5,
      rounds: [
        { name: 'Phone Screen', duration: '45 min', description: 'A recruiter-led technical phone screen focusing on data structures and algorithms. Expect one medium-hard coding problem solved in a shared Google Doc.' },
        { name: 'Coding Interview 1', duration: '45 min', description: 'First onsite coding round. You will solve one or two algorithmic problems with emphasis on optimal time/space complexity. Interviewer evaluates problem-solving approach and code quality.' },
        { name: 'Coding Interview 2', duration: '45 min', description: 'Second coding round with a different interviewer. Problems tend to be harder and may involve dynamic programming, graph algorithms, or complex data structures.' },
        { name: 'System Design', duration: '45 min', description: 'Design a large-scale distributed system (e.g., Google Maps, YouTube recommendations). Evaluated on scalability, trade-offs, and depth of understanding.' },
        { name: 'Behavioral (Googleyness & Leadership)', duration: '30 min', description: 'Assesses culture fit, collaboration, and how you handle ambiguity. Uses structured behavioral questions based on Google\'s hiring attributes.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Foundation',
        description: 'Build a rock-solid foundation in DSA patterns that appear most frequently in Google interviews.',
        durationWeeks: 4,
        tasks: [
          { title: 'Master Sliding Window & Two Pointers', description: 'Solve 30+ problems covering sliding window, two pointer, and prefix sum patterns. Focus on optimal solutions.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Graph & Tree Mastery', description: 'Deep dive into BFS, DFS, topological sort, shortest path algorithms, and binary tree traversals.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Dynamic Programming Patterns', description: 'Study the 5 DP patterns: knapsack, LCS, interval, digit DP, and bitmask DP. Solve 25+ classic problems.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Mock Coding Interview (Easy-Medium)', description: 'Complete 3 timed mock interviews focusing on communication, brute-force-to-optimal progression, and clean code.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 2: Deep Dive',
        description: 'Focus on system design and Google-specific problem patterns that distinguish top candidates.',
        durationWeeks: 4,
        tasks: [
          { title: 'System Design Fundamentals', description: 'Learn load balancing, caching, sharding, CAP theorem, consistent hashing, and message queues.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Design Google-Scale Systems', description: 'Practice designing Google Docs, YouTube, Google Search, and Gmail at scale. Focus on data modeling and API design.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Advanced Algorithm Patterns', description: 'Master segment trees, Fenwick trees, union-find, and advanced graph algorithms that appear in Google L5+ interviews.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Googleyness & Leadership Prep', description: 'Prepare 8-10 STAR stories demonstrating collaboration, navigating ambiguity, and driving impact without authority.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Final Sprint',
        description: 'Simulate real Google interview conditions with full-length mock loops and targeted weak-area practice.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Mock Interview Loop', description: 'Complete 2 full 5-round mock interview simulations under timed conditions with feedback analysis.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Weak Area Blitz', description: 'Identify and aggressively practice your weakest 2-3 topic areas based on mock interview performance data.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'System Design Mock', description: 'Do 2 full system design mocks (45 min each) with a focus on driving the conversation and asking clarifying questions.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
        ]
      }
    ],
    tips: [
      'Google values clean, bug-free code. Think out loud constantly.',
      'Always discuss time and space complexity before and after coding.',
      'Start with brute force, then optimize — interviewers want to see your thought process.',
      'For system design, lead the conversation. Don\'t wait for the interviewer to guide you.',
      'Practice writing code in Google Docs — no autocomplete, no syntax highlighting.'
    ]
  },

  // ─── 2. Amazon ───────────────────────────────────────────────────
  {
    company: 'Amazon',
    slug: 'amazon',
    logo: '/logos/amazon.svg',
    tier: 'FAANG',
    difficulty: 'Hard',
    avgSalary: '$160k-$320k',
    interviewFormat: {
      totalRounds: 4,
      rounds: [
        { name: 'Online Assessment (OA)', duration: '90 min', description: 'Two coding problems of medium-hard difficulty on a proctored platform. May include a work simulation and leadership assessment survey.' },
        { name: 'Phone Screen', duration: '60 min', description: 'Technical phone screen with one coding problem and behavioral questions tied to Amazon Leadership Principles.' },
        { name: 'Onsite Loop (4 Rounds)', duration: '4 x 45 min', description: 'Four back-to-back interviews: two coding, one system design (for senior roles), and one behavioral. Every round includes LP-based behavioral questions.' },
        { name: 'Bar Raiser Round', duration: '45 min', description: 'A specially trained interviewer from a different team evaluates your overall hire/no-hire decision. This person has veto power and focuses on Leadership Principles.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Leadership Principles & DSA Basics',
        description: 'Internalize Amazon\'s 16 Leadership Principles while building core DSA skills.',
        durationWeeks: 3,
        tasks: [
          { title: 'Learn All 16 Leadership Principles', description: 'Study each LP with real examples. Prepare 2 STAR stories per principle (32 total). Focus on Customer Obsession, Ownership, and Bias for Action.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Core DSA: Arrays, Strings, Hash Maps', description: 'Solve 40+ problems on arrays, strings, and hash maps. Amazon favors practical problems over theoretical ones.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Trees & Graphs for Amazon', description: 'Focus on BFS/DFS, binary search trees, and graph traversal — frequent topics in Amazon OAs and interviews.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'OA Practice Set', description: 'Complete 5 timed mock OAs (90 min each) to build speed and accuracy under assessment conditions.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      },
      {
        title: 'Phase 2: Advanced Coding & System Design',
        description: 'Tackle harder coding problems and learn to design systems the Amazon way.',
        durationWeeks: 3,
        tasks: [
          { title: 'Medium-Hard Problem Sprint', description: 'Solve 30+ medium-hard problems in greedy, DP, and sliding window. Time yourself to solve within 25 minutes.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Design Amazon-Scale Systems', description: 'Practice designing Amazon\'s Order Pipeline, Recommendation Engine, Prime Video streaming, and Inventory Management system.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'LP-Integrated Mock Interview', description: 'Do 3 mock interviews where every answer ties back to a Leadership Principle. Practice the STAR method with quantified results.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Bar Raiser Simulation', description: 'Simulate a Bar Raiser round focusing on deep behavioral dives and cross-functional thinking.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Full Loop Simulation',
        description: 'Run complete interview day simulations and refine your weakest areas.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Day Mock Loop', description: 'Complete 2 full onsite simulations (4 rounds each) back-to-back to build stamina and consistency.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'LP Story Refinement', description: 'Polish your top 10 STAR stories. Ensure each has clear Situation, Task, Action, and measurable Result.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Targeted Weak Area Practice', description: 'Analyze mock results and spend focused time on your 2-3 weakest coding and behavioral areas.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      }
    ],
    tips: [
      'Every answer should tie back to a Leadership Principle.',
      'Use the STAR method religiously — Situation, Task, Action, Result with metrics.',
      'Amazon interviewers write detailed notes. Speak clearly and structured.',
      'For system design, think about cost optimization and scalability — core Amazon values.',
      'The Bar Raiser can override other interviewers. Treat that round with extra seriousness.'
    ]
  },

  // ─── 3. Microsoft ────────────────────────────────────────────────
  {
    company: 'Microsoft',
    slug: 'microsoft',
    logo: '/logos/microsoft.svg',
    tier: 'Big Tech',
    difficulty: 'Medium',
    avgSalary: '$150k-$300k',
    interviewFormat: {
      totalRounds: 4,
      rounds: [
        { name: 'Phone Screen', duration: '45 min', description: 'A recruiter or engineer-led phone screen with one coding problem (usually medium difficulty) and basic behavioral questions.' },
        { name: 'Onsite Round 1: Coding', duration: '45 min', description: 'Whiteboard or shared editor coding round focusing on data structures and algorithms. Problems are practical and application-oriented.' },
        { name: 'Onsite Round 2: Design', duration: '45 min', description: 'System design or object-oriented design round. For junior roles, this may focus on class design; for senior, it\'s distributed systems.' },
        { name: 'As-Appropriate (AA) Round', duration: '45 min', description: 'Final round with a senior leader who makes the hire/no-hire decision. Mix of technical depth, behavioral questions, and culture fit assessment.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Core Fundamentals',
        description: 'Build a strong foundation in coding fundamentals and Microsoft\'s growth-mindset culture.',
        durationWeeks: 3,
        tasks: [
          { title: 'Data Structures Deep Dive', description: 'Master arrays, linked lists, stacks, queues, hash maps, trees, and heaps through 35+ targeted problems.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Algorithm Patterns', description: 'Practice binary search, BFS/DFS, sorting algorithms, and two-pointer techniques. Focus on clean, readable implementations.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Growth Mindset Stories', description: 'Prepare 6-8 behavioral stories showcasing learning from failure, collaboration, and intellectual curiosity.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'OOD Fundamentals', description: 'Practice designing classes and object models for real-world systems like parking lots, libraries, and card games.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
        ]
      },
      {
        title: 'Phase 2: Interview-Specific Prep',
        description: 'Focus on Microsoft-style problems and system design at an appropriate level.',
        durationWeeks: 3,
        tasks: [
          { title: 'Microsoft-Style Coding Problems', description: 'Solve 25+ problems commonly asked at Microsoft, including string manipulation, tree problems, and matrix operations.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'System Design Practice', description: 'Design systems like OneDrive, Microsoft Teams, and Xbox Live matchmaking. Focus on reliability and user experience.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Mock Phone Screen', description: 'Complete 3 mock phone screens with feedback. Practice explaining your thought process clearly.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Final Preparation',
        description: 'Polish your interview skills and simulate the full Microsoft interview experience.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Loop Simulation', description: 'Complete 2 full mock interview loops (4 rounds each) simulating the actual Microsoft interview day.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'AA Round Preparation', description: 'Practice answering senior leader questions about career goals, impact at scale, and cultural alignment.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Coding Speed Drills', description: 'Timed coding exercises — aim to solve medium problems in 20 minutes with clean, bug-free code.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      }
    ],
    tips: [
      'Microsoft values growth mindset and collaboration — show you learn from mistakes.',
      'Write clean, well-structured code. Microsoft cares about code quality and readability.',
      'For the AA round, be ready to discuss your biggest career impact and what excites you about Microsoft.',
      'Don\'t be afraid to ask clarifying questions — it shows thoroughness.',
      'Microsoft interviewers tend to be collaborative. Treat it as a conversation, not an exam.'
    ]
  },

  // ─── 4. Meta ─────────────────────────────────────────────────────
  {
    company: 'Meta',
    slug: 'meta',
    logo: '/logos/meta.svg',
    tier: 'FAANG',
    difficulty: 'Hard',
    avgSalary: '$170k-$340k',
    interviewFormat: {
      totalRounds: 3,
      rounds: [
        { name: 'Phone Screen', duration: '45 min', description: 'Two coding problems in 45 minutes on CoderPad. Speed and correctness are critical — problems are typically medium difficulty.' },
        { name: 'Onsite Coding (2 Rounds)', duration: '2 x 45 min', description: 'Two separate 45-minute coding rounds, each with 2 problems. You are expected to solve all 4 problems correctly. Focus on arrays, strings, trees, and graphs.' },
        { name: 'System Design', duration: '45 min', description: 'Design a large-scale system like Facebook News Feed, Instagram Stories, or Messenger. Emphasis on data modeling, APIs, and scalability.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Speed Coding',
        description: 'Meta emphasizes speed. Train yourself to solve problems fast with correct code.',
        durationWeeks: 3,
        tasks: [
          { title: 'Speed Drills: Arrays & Strings', description: 'Solve 40+ array and string problems under 15-minute time limits. Meta expects you to solve mediums in under 20 minutes.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Trees & Graphs Sprint', description: 'Master binary tree operations, BST validation, graph BFS/DFS, and connected components — all under time pressure.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Two-Problem Mock Sessions', description: 'Simulate Meta phone screens: solve 2 problems in 45 minutes, 5 times. Track completion rate and accuracy.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Edge Case Mastery', description: 'Practice handling empty inputs, single elements, duplicates, and overflow edge cases — Meta tests these rigorously.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      },
      {
        title: 'Phase 2: System Design & Advanced Coding',
        description: 'Combine advanced coding with Meta-scale system design preparation.',
        durationWeeks: 3,
        tasks: [
          { title: 'Design Meta Products', description: 'Practice designing Facebook News Feed, Instagram, WhatsApp messaging, and Marketplace. Emphasize real-time features and data consistency.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Advanced Pattern Practice', description: 'Focus on DP, backtracking, and interval problems — the harder problems that differentiate candidates.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Four-Problem Marathon', description: 'Simulate onsite coding: solve 4 problems in 90 minutes (2 rounds × 2 problems). Aim for 100% solve rate.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Full Simulation',
        description: 'Run complete Meta interview simulations under real conditions.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Onsite Mock', description: 'Complete 2 full Meta interview simulations (phone screen + 2 coding + system design) with timing and feedback.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'System Design Deep Dive', description: 'Do 3 dedicated system design mocks focusing on News Feed ranking, real-time messaging, and content delivery.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Speed Optimization', description: 'Review and optimize your solve times. Aim for medium problems in 15 min, hard in 25 min.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      }
    ],
    tips: [
      'Meta focuses on speed. Aim to solve problems in 20 minutes.',
      'You MUST solve all problems in a round — partial credit doesn\'t help much at Meta.',
      'Write working code first, then optimize. Don\'t spend too long on the perfect solution.',
      'For system design, focus on products you use — interviewers appreciate genuine product intuition.',
      'Practice on CoderPad or a similar platform — get comfortable with the coding environment.'
    ]
  },

  // ─── 5. Flipkart ────────────────────────────────────────────────
  {
    company: 'Flipkart',
    slug: 'flipkart',
    logo: '/logos/flipkart.svg',
    tier: 'Indian Giants',
    difficulty: 'Hard',
    avgSalary: '₹25L-₹60L',
    interviewFormat: {
      totalRounds: 4,
      rounds: [
        { name: 'Online Test', duration: '90 min', description: 'A coding assessment on HackerRank or similar platform with 3-4 problems of increasing difficulty. May include MCQs on OS, DBMS, and networking.' },
        { name: 'Machine Coding Round', duration: '90 min', description: 'Build a small but functional application from scratch (e.g., a parking lot system, splitwise clone). Evaluated on design, code quality, extensibility, and working demo.' },
        { name: 'DS & Algorithm Round', duration: '60 min', description: 'Deep-dive into data structures and algorithms. Expect hard problems on trees, graphs, DP, and string algorithms with follow-up optimizations.' },
        { name: 'Hiring Manager Round', duration: '45 min', description: 'Discussion on past projects, system design at a high level, team collaboration, and culture fit. For senior roles, this includes detailed architecture discussions.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Coding & Machine Coding Basics',
        description: 'Build strong coding skills and learn to design small applications from scratch.',
        durationWeeks: 3,
        tasks: [
          { title: 'DSA Foundation Sprint', description: 'Solve 40+ problems on arrays, linked lists, trees, and graphs. Focus on problems commonly asked at Flipkart.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Machine Coding Practice', description: 'Build 3 small apps: Parking Lot, Snake & Ladder, and Splitwise Clone. Focus on clean OOP design and working code in 90 minutes.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'OOP & SOLID Principles', description: 'Study object-oriented design principles. Practice applying SOLID principles to real-world code problems.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Online Test Simulation', description: 'Complete 4 timed mock OAs (90 min each) with a mix of coding problems and CS fundamentals MCQs.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      },
      {
        title: 'Phase 2: Advanced DSA & System Design',
        description: 'Tackle harder algorithmic problems and understand Flipkart-scale system design.',
        durationWeeks: 3,
        tasks: [
          { title: 'Advanced DSA: DP & Graphs', description: 'Solve 25+ hard problems on dynamic programming, graph algorithms, and advanced data structures like segment trees.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Design E-Commerce Systems', description: 'Practice designing Flipkart\'s product catalog, order management, inventory system, and payment processing pipeline.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Machine Coding: Advanced', description: 'Build 2 more complex apps: a rate limiter and a caching system. Focus on extensibility and edge case handling.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Mock DS Round', description: 'Complete 3 mock DS algorithm rounds with a focus on problem-solving approach and optimization discussions.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Interview Readiness',
        description: 'Simulate the full Flipkart interview experience and polish weak areas.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Mock Interview Loop', description: 'Complete 2 full Flipkart interview simulations covering all 4 rounds with detailed feedback.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'HM Round Prep', description: 'Prepare for the Hiring Manager round: practice discussing past projects, trade-offs you made, and technical leadership examples.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Machine Coding Under Pressure', description: 'Do 2 timed machine coding rounds (90 min each) with review and feedback on design decisions.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      }
    ],
    tips: [
      'Flipkart emphasizes machine coding — practice building small apps in 90 minutes.',
      'Write extensible, well-designed code with clear separation of concerns.',
      'For the DS round, always discuss brute force → optimized approach with the interviewer.',
      'Flipkart values candidates who can build working software, not just solve puzzles.',
      'Prepare to discuss scalability challenges specific to Indian e-commerce (COD, logistics, etc.).'
    ]
  },

  // ─── 6. Razorpay ────────────────────────────────────────────────
  {
    company: 'Razorpay',
    slug: 'razorpay',
    logo: '/logos/razorpay.svg',
    tier: 'Indian Giants',
    difficulty: 'Medium',
    avgSalary: '₹20L-₹45L',
    interviewFormat: {
      totalRounds: 3,
      rounds: [
        { name: 'Online Test', duration: '75 min', description: 'A coding assessment with 2-3 medium problems on a platform like HackerEarth. May include questions on concurrency and database concepts.' },
        { name: 'Technical Round (1-2 Rounds)', duration: '60 min each', description: 'Deep technical interviews covering DSA, system design, and domain-specific questions about payment systems, APIs, and distributed transactions.' },
        { name: 'Culture Fit / Hiring Manager', duration: '45 min', description: 'Discussion about motivation, working style, past projects, and alignment with Razorpay\'s mission and values.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Fundamentals & Payments Domain',
        description: 'Build coding foundations while understanding the payments domain.',
        durationWeeks: 3,
        tasks: [
          { title: 'Core DSA Practice', description: 'Solve 30+ problems on arrays, hash maps, trees, and graphs. Focus on clean, production-quality code.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Payments Domain Study', description: 'Understand payment gateways, PCI compliance, idempotency, and transaction lifecycle. Study how UPI, cards, and net banking work.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'API Design Basics', description: 'Practice designing RESTful APIs for financial services. Focus on error handling, versioning, and security.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Concurrency Fundamentals', description: 'Study race conditions, locking, and distributed transactions — critical for payment systems.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      },
      {
        title: 'Phase 2: System Design & Interview Prep',
        description: 'Design payment-scale systems and practice technical interviews.',
        durationWeeks: 3,
        tasks: [
          { title: 'Design Payment Systems', description: 'Practice designing a payment gateway, subscription billing system, and fraud detection pipeline.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Advanced Coding Practice', description: 'Solve 20+ medium-hard problems focusing on string manipulation, DP, and graph algorithms.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Mock Technical Interview', description: 'Complete 3 mock technical interviews covering coding + system design with payment domain context.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Final Polish',
        description: 'Fine-tune your interview performance and domain knowledge.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Interview Simulation', description: 'Complete 2 full Razorpay interview simulations (OA + tech + culture fit) with detailed feedback.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Culture & Mission Prep', description: 'Research Razorpay\'s products (Payment Gateway, RazorpayX, Payroll). Prepare stories showing passion for fintech.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'System Design Refinement', description: 'Revisit your system design answers. Focus on reliability, consistency, and handling financial edge cases.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
        ]
      }
    ],
    tips: [
      'Razorpay values system design and payment domain knowledge.',
      'Understand idempotency and why it matters for payments — this comes up frequently.',
      'Show genuine interest in fintech and financial inclusion — it matters for culture fit.',
      'Practice designing APIs with proper error codes and retry mechanisms.',
      'Know the basics of UPI, NEFT, RTGS, and card payment flows.'
    ]
  },

  // ─── 7. Stripe ──────────────────────────────────────────────────
  {
    company: 'Stripe',
    slug: 'stripe',
    logo: '/logos/stripe.svg',
    tier: 'Product',
    difficulty: 'Very Hard',
    avgSalary: '$190k-$380k',
    interviewFormat: {
      totalRounds: 5,
      rounds: [
        { name: 'Phone Screen', duration: '60 min', description: 'A coding interview focused on practical problem-solving. Problems often involve real-world scenarios like parsing data or building small utilities.' },
        { name: 'Bug Squash', duration: '60 min', description: 'You\'re given a real codebase with bugs. Find and fix them under time pressure. Tests debugging skills, code reading ability, and attention to detail.' },
        { name: 'Integration Round', duration: '60 min', description: 'Build a small feature that integrates with an existing API or codebase. Evaluates ability to work with real code, understand docs, and ship quickly.' },
        { name: 'System Design', duration: '60 min', description: 'Design a complex system like a payment processing pipeline, fraud detection system, or developer dashboard. Stripe emphasizes practical, buildable designs.' },
        { name: 'Manager / Culture', duration: '45 min', description: 'Discussion with a hiring manager about your career, working style, and alignment with Stripe\'s culture of craft and user empathy.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Practical Coding & Debugging',
        description: 'Stripe interviews test real-world engineering skills, not just algorithms.',
        durationWeeks: 4,
        tasks: [
          { title: 'Practical Coding Challenges', description: 'Solve 30+ real-world problems: data parsing, API integration, string processing, and utility building. No abstract puzzles.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Debugging Practice', description: 'Find and fix bugs in 15+ codebases across multiple languages. Practice systematic debugging: reproduce, isolate, fix, verify.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Code Reading Skills', description: 'Practice reading and understanding unfamiliar codebases quickly. Work through 5 open-source projects and document their architecture.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'API Integration Practice', description: 'Build 3 small projects that integrate with external APIs (Stripe, Twilio, GitHub). Focus on error handling and edge cases.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      },
      {
        title: 'Phase 2: System Design & Payment Architecture',
        description: 'Design payment systems and understand Stripe\'s technical architecture.',
        durationWeeks: 3,
        tasks: [
          { title: 'Payment System Design', description: 'Design payment processing pipelines, recurring billing, and multi-currency settlement systems.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'API Design Excellence', description: 'Study Stripe\'s API design patterns. Practice designing clean, developer-friendly APIs with proper versioning and error handling.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Distributed Systems', description: 'Study eventual consistency, saga patterns, and distributed transactions — critical for financial systems at Stripe\'s scale.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Mock Bug Squash & Integration', description: 'Complete 3 mock debugging sessions and 3 mock integration rounds with realistic codebases.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 3: Full Interview Simulation',
        description: 'Simulate the complete Stripe interview experience.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Loop Mock', description: 'Complete 2 full 5-round Stripe interview simulations with all round types represented.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Culture & Craft Prep', description: 'Prepare stories about building high-quality software, user empathy, and attention to detail — core Stripe values.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Real-World Bug Fixing', description: 'Practice finding and fixing bugs in real open-source projects. Document your debugging process for each fix.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
        ]
      }
    ],
    tips: [
      'Stripe uses real-world coding challenges — practice debugging actual code.',
      'The Bug Squash round is unique to Stripe. Practice reading unfamiliar code under time pressure.',
      'Write production-quality code with proper error handling, edge cases, and clean structure.',
      'For system design, think about developer experience — Stripe is obsessed with API quality.',
      'Show craft and attention to detail in everything you do. Stripe values quality over speed.'
    ]
  },

  // ─── 8. Atlassian ───────────────────────────────────────────────
  {
    company: 'Atlassian',
    slug: 'atlassian',
    logo: '/logos/atlassian.svg',
    tier: 'Product',
    difficulty: 'Medium',
    avgSalary: '$150k-$290k',
    interviewFormat: {
      totalRounds: 4,
      rounds: [
        { name: 'Values Interview', duration: '45 min', description: 'A deep-dive into Atlassian\'s 5 company values. You\'ll be asked behavioral questions mapped to each value. Prepare specific examples from your past work.' },
        { name: 'Technical Interview', duration: '60 min', description: 'A coding round focusing on practical problem-solving. Problems are medium difficulty and emphasize clean code, testing, and edge case handling.' },
        { name: 'System Design', duration: '60 min', description: 'Design a system relevant to Atlassian\'s products (Jira, Confluence, Bitbucket). Focus on collaboration features, real-time updates, and extensibility.' },
        { name: 'Manager Interview', duration: '45 min', description: 'Discussion about leadership, team dynamics, career growth, and how you handle conflict and ambiguity.' }
      ]
    },
    phases: [
      {
        title: 'Phase 1: Values & Coding Foundations',
        description: 'Internalize Atlassian\'s values and build core coding skills.',
        durationWeeks: 3,
        tasks: [
          { title: 'Learn Atlassian\'s 5 Values', description: 'Study: Open company no BS, Build with heart and balance, Don\'t #@!% the customer, Play as a team, Be the change you seek. Prepare 2 stories per value.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Core DSA Practice', description: 'Solve 30+ medium problems on arrays, trees, graphs, and hash maps. Focus on clean, testable code.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Testing & Code Quality', description: 'Practice writing unit tests alongside your solutions. Atlassian values engineers who think about testing from the start.', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
          { title: 'Values Mock Interview', description: 'Complete 2 mock values interviews with feedback on how well your stories map to Atlassian\'s values.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      },
      {
        title: 'Phase 2: System Design & Product Thinking',
        description: 'Design collaboration tools and develop product-thinking skills.',
        durationWeeks: 3,
        tasks: [
          { title: 'Design Atlassian Products', description: 'Practice designing Jira (issue tracking), Confluence (wiki), Bitbucket (code review), and Trello (kanban boards).', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Collaboration System Design', description: 'Focus on real-time collaboration, conflict resolution, permissions, and notification systems — core Atlassian patterns.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
          { title: 'Technical Mock Interview', description: 'Complete 3 mock technical interviews focusing on code quality, edge cases, and testing approach.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Product Thinking Practice', description: 'For each system design, think about user personas, use cases, and product trade-offs — not just technical architecture.', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
        ]
      },
      {
        title: 'Phase 3: Full Loop Prep',
        description: 'Simulate the complete Atlassian interview experience.',
        durationWeeks: 2,
        tasks: [
          { title: 'Full Interview Simulation', description: 'Complete 2 full Atlassian interview simulations (values + technical + design + manager) with comprehensive feedback.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Manager Round Prep', description: 'Prepare for leadership discussions: how you handle disagreements, drive consensus, and mentor teammates.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' },
          { title: 'Values Story Refinement', description: 'Polish your top stories to be concise, impactful, and clearly mapped to specific Atlassian values.', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
        ]
      }
    ],
    tips: [
      'Atlassian interviews are values-driven. Know their company values by heart.',
      'Every behavioral answer should clearly map to one of the 5 Atlassian values.',
      'Write clean, well-tested code. Mention your testing strategy proactively.',
      'For system design, think about extensibility and plugins — Atlassian Marketplace is a huge ecosystem.',
      'Show empathy for end users. Atlassian\'s motto is "Don\'t #@!% the customer" — demonstrate that mindset.'
    ]
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    await CompanyPrepTrack.deleteMany({});
    console.log('🗑️  Cleared existing company tracks');

    const inserted = await CompanyPrepTrack.insertMany(TRACKS);
    console.log(`✅ Seeded ${inserted.length} company tracks:`);
    inserted.forEach(t => console.log(`   • ${t.company} (${t.tier}, ${t.difficulty})`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
