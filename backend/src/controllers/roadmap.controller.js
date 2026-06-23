import { asyncHandler } from '../middleware/error.middleware.js';
import CareerRoadmap from '../models/CareerRoadmap.model.js';

const ROADMAP_TEMPLATES = {
  faang: [
    {
      title: 'DSA Foundations & Core Patterns',
      description: 'Master sliding window, two-pointers, hash maps, heaps, and binary search.',
      weekRatio: 0.25,
      tasks: [
        { title: 'Arrays & Strings Patterns', description: 'Solve 30 window/pointer problems', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'Linked Lists & Stacks/Queues', description: 'Understand pointer manipulations and monotonic stacks', linkedFeature: 'Interactive Playground', linkedUrl: '/playground' },
        { title: 'Searching & Sorting Algorithms', description: 'Master binary search variations and merge/quicksort concepts', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      title: 'Advanced DSA & Graph Theory',
      description: 'Deep dive into trees, graphs, backtracking, and dynamic programming.',
      weekRatio: 0.25,
      tasks: [
        { title: 'Binary Trees & BSTs', description: 'DFS/BFS traversals, recursion, and BST validations', linkedFeature: 'Interactive Playground', linkedUrl: '/playground' },
        { title: 'Graphs & BFS/DFS/Union-Find', description: 'Topological sort, cycle detection, and shortest paths', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'Dynamic Programming Patterns', description: 'LCS, Knapsack, and grid DP variations', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      title: 'System Design & Scalability',
      description: 'Learn load balancers, caching, distributed databases, and sharding.',
      weekRatio: 0.25,
      tasks: [
        { title: 'Scalability Principles', description: 'CAP theorem, consistent hashing, caching strategies', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Microservices & APIs', description: 'Design REST/gRPC interfaces, rate-limiters, API gateways', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Real-world System Designs', description: 'Design URL Shortener and Instagram-like feed', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    },
    {
      title: 'Company Tracks & Mock Loops',
      description: 'Simulate high-pressure loops, behavioral STAR stories, and final polish.',
      weekRatio: 0.25,
      tasks: [
        { title: 'Company Interview Tracks', description: 'Complete company specific coding tracks', linkedFeature: 'Company Tracks', linkedUrl: '/company-tracks' },
        { title: 'Behavioral STAR stories', description: 'Build 8-10 behavioral stories based on target values', linkedFeature: 'STAR Story Builder', linkedUrl: '/star-story-builder' },
        { title: 'Full Mock Interview Day', description: 'Complete a simulated full-loop interview', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
      ]
    }
  ],
  bigtech: [
    {
      title: 'DSA Fundamentals',
      description: 'Review arrays, linked lists, maps, stacks, and search algorithms.',
      weekRatio: 0.3,
      tasks: [
        { title: 'Key DSA Practice', description: 'Solve 25 arrays & string problems', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'BST & Hash Maps', description: 'Learn lookup optimization and tree traversals', linkedFeature: 'Interactive Playground', linkedUrl: '/playground' }
      ]
    },
    {
      title: 'System & Object-Oriented Design',
      description: 'Object design patterns, databases, and microservices.',
      weekRatio: 0.4,
      tasks: [
        { title: 'Object-Oriented Design', description: 'Design parking lot and retail billing classes', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Database Design', description: 'SQL vs NoSQL schema designs and indexes', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    },
    {
      title: 'Final Prep & Mocks',
      description: 'Polish behavioral responses and run full timed mocks.',
      weekRatio: 0.3,
      tasks: [
        { title: 'Behavioral prep', description: 'Prepare growth mindset stories', linkedFeature: 'STAR Story Builder', linkedUrl: '/star-story-builder' },
        { title: 'Mock Interviews', description: 'Take 2 technical mocks', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
      ]
    }
  ],
  indian: [
    {
      title: 'DSA Core Prep',
      description: 'Flipkart/Razorpay style complex algorithmic problems.',
      weekRatio: 0.35,
      tasks: [
        { title: 'Advanced Algorithms', description: 'Solve 25+ hard trees, graphs, and DP questions', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      title: 'Machine Coding round preparation',
      description: 'Learn to write clean, working OOP code within 90 minutes.',
      weekRatio: 0.35,
      tasks: [
        { title: 'Machine Coding Practice', description: 'Implement Splitwise or Parking Lot in 90 mins', linkedFeature: 'Interactive Playground', linkedUrl: '/playground' },
        { title: 'OOP Design Patterns', description: 'Learn Factory, Singleton, Strategy patterns', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    },
    {
      title: 'System Design & HM Round',
      description: 'Architecture discussions and Hiring Manager preparation.',
      weekRatio: 0.3,
      tasks: [
        { title: 'Hiring Manager Stories', description: 'Prepare answers about projects and leadership', linkedFeature: 'STAR Story Builder', linkedUrl: '/star-story-builder' },
        { title: 'Scalability Mocks', description: 'Design booking/payment gateway systems', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    }
  ],
  product: [
    {
      title: 'Practical Coding & Debugging',
      description: 'Stripe/Atlassian style real-world debugging and integration.',
      weekRatio: 0.35,
      tasks: [
        { title: 'Debugging Drills', description: 'Squash bugs in active code repos', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'API Integrations', description: 'Integrate external services and build SDK wrappers', linkedFeature: 'Interactive Playground', linkedUrl: '/playground' }
      ]
    },
    {
      title: 'System Design & Craftsmanship',
      description: 'Designing highly robust APIs and clean architectures.',
      weekRatio: 0.35,
      tasks: [
        { title: 'API Design Patterns', description: 'Clean REST API endpoints design with error states', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Distributed Systems Design', description: 'Eventual consistency, webhooks, idempotency keys', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    },
    {
      title: 'Cultural Values & Mock Loops',
      description: 'Atlassian values or Stripe user-empathy mock interviews.',
      weekRatio: 0.3,
      tasks: [
        { title: 'Values Alignment Stories', description: 'Map personal stories to product values', linkedFeature: 'STAR Story Builder', linkedUrl: '/star-story-builder' },
        { title: 'Mock Technical Rounds', description: 'Take 2 practical coding and bug-squash mocks', linkedFeature: 'Mock Interview', linkedUrl: '/interview' }
      ]
    }
  ]
};

export const generateRoadmap = asyncHandler(async (req, res) => {
  const { targetCompany, targetRole, totalWeeks, currentLevel } = req.body;
  const userId = req.user._id;

  // Deactivate existing roadmaps
  await CareerRoadmap.updateMany({ user: userId }, { isActive: false });

  // Map company to template type
  const companyLower = targetCompany.toLowerCase();
  let templateType = 'faang';
  if (['google', 'amazon', 'meta'].includes(companyLower)) {
    templateType = 'faang';
  } else if (['microsoft', 'apple', 'netflix'].includes(companyLower)) {
    templateType = 'bigtech';
  } else if (['flipkart', 'razorpay', 'ola', 'swiggy'].includes(companyLower)) {
    templateType = 'indian';
  } else if (['stripe', 'atlassian', 'uber', 'airbnb'].includes(companyLower)) {
    templateType = 'product';
  }

  const template = ROADMAP_TEMPLATES[templateType];
  let elapsedWeeks = 0;

  const milestones = template.map((m, index) => {
    const weeksForMilestone = Math.max(1, Math.round(m.weekRatio * totalWeeks));
    const startWeek = elapsedWeeks + 1;
    const endWeek = elapsedWeeks + weeksForMilestone;
    elapsedWeeks += weeksForMilestone;

    return {
      weekRange: `Week ${startWeek}-${endWeek}`,
      title: m.title,
      description: m.description,
      status: index === 0 ? 'in-progress' : 'locked',
      tasks: m.tasks.map(t => ({
        title: t.title,
        description: t.description,
        completed: false,
        linkedFeature: t.linkedFeature,
        linkedUrl: t.linkedUrl
      }))
    };
  });

  // Adjust last milestone to fit exactly
  if (elapsedWeeks !== totalWeeks && milestones.length > 0) {
    const lastMilestone = milestones[milestones.length - 1];
    const parts = lastMilestone.weekRange.split('-');
    const start = parts[0].replace('Week ', '').trim();
    lastMilestone.weekRange = `Week ${start}-${totalWeeks}`;
  }

  const roadmap = await CareerRoadmap.create({
    user: userId,
    targetCompany,
    targetRole,
    totalWeeks,
    currentWeek: 1,
    milestones,
    isActive: true
  });

  res.status(201).json({ success: true, data: roadmap });
});

export const getActiveRoadmap = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const roadmap = await CareerRoadmap.findOne({ user: userId, isActive: true });
  res.json({ success: true, data: roadmap });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { milestoneIndex, taskIndex, completed } = req.body;
  const userId = req.user._id;

  const roadmap = await CareerRoadmap.findOne({ _id: id, user: userId });
  if (!roadmap) {
    res.status(404);
    throw new Error('Roadmap not found');
  }

  const milestone = roadmap.milestones[milestoneIndex];
  if (!milestone) {
    res.status(400);
    throw new Error('Invalid milestone index');
  }

  const task = milestone.tasks[taskIndex];
  if (!task) {
    res.status(400);
    throw new Error('Invalid task index');
  }

  task.completed = completed;

  // Check if all tasks in the current milestone are completed
  const allMilestoneTasksCompleted = milestone.tasks.every(t => t.completed);
  if (allMilestoneTasksCompleted) {
    milestone.status = 'completed';
    // Unlock next milestone if it exists
    const nextMilestone = roadmap.milestones[milestoneIndex + 1];
    if (nextMilestone && nextMilestone.status === 'locked') {
      nextMilestone.status = 'in-progress';
    }
  } else {
    milestone.status = 'in-progress';
  }

  // Update currentWeek estimate based on overall progress
  const totalTasks = roadmap.milestones.reduce((acc, m) => acc + m.tasks.length, 0);
  const completedTasks = roadmap.milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0);
  const progressRatio = completedTasks / totalTasks;
  roadmap.currentWeek = Math.min(roadmap.totalWeeks, Math.floor(progressRatio * roadmap.totalWeeks) + 1);

  await roadmap.save();
  res.json({ success: true, data: roadmap });
});

export const deleteRoadmap = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const roadmap = await CareerRoadmap.findOneAndDelete({ _id: id, user: userId });
  if (!roadmap) {
    res.status(404);
    throw new Error('Roadmap not found or unauthorized');
  }

  res.json({ success: true, message: 'Roadmap deleted successfully' });
});
