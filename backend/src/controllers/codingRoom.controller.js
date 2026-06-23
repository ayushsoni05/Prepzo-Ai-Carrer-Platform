import { asyncHandler } from '../middleware/error.middleware.js';
import CodingRoom from '../models/CodingRoom.model.js';

const PROBLEMS = [
  {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    difficulty: "Easy",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" }
    ],
    hints: [
      "Try a brute force search first using double loops.",
      "Can you use a hash map to look up the complement in O(1) time?",
      "Be careful not to use the same element twice."
    ]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string `s` containing just characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.",
    difficulty: "Easy",
    examples: [
      { input: "s = '()[]{}'", output: "true" }
    ],
    hints: [
      "A stack is suitable for matching matching pairs.",
      "Push open symbols, pop and match when close symbols are seen.",
      "The stack must be empty at the end."
    ]
  },
  {
    title: "Merge Sorted Arrays",
    description: "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order. Merge them into a single sorted array.",
    difficulty: "Easy",
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], nums2 = [2,5,6]", output: "[1,2,2,3,5,6]" }
    ],
    hints: [
      "Start merging from the back to avoid overwriting elements in nums1.",
      "Keep three pointers: read index 1, read index 2, and write index.",
      "Copy any remaining elements of nums2 if nums1 is exhausted."
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    examples: [
      { input: "s = 'abcabcbb'", output: "3" }
    ],
    hints: [
      "Use a sliding window representation with left and right pointers.",
      "Store character indexes in a hash map to shift the left boundary quickly.",
      "Maintain the maximum window size seen so far."
    ]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    difficulty: "Medium",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }
    ],
    hints: [
      "Use a two-pointer approach starting from both ends.",
      "At each step, calculate the area and move the pointer pointing to the shorter line.",
      "Why move the shorter line? Moving the taller line can never increase the area."
    ]
  },
  {
    title: "LRU Cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    difficulty: "Hard",
    examples: [
      { input: "get(1), put(2, 2), get(1)", output: "returns value or -1" }
    ],
    hints: [
      "We need O(1) read and write capabilities.",
      "Combine a Hash Map with a doubly linked list.",
      "Move accessed nodes to the head, evict from the tail."
    ]
  }
];

export const createRoom = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Generate random 6-character room code
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Select a random coding problem
  const problem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];

  const room = await CodingRoom.create({
    roomCode,
    host: userId,
    problem,
    status: 'waiting',
    hostCode: '// Write your code here\n',
    participantCode: '// Write your code here\n'
  });

  res.status(201).json({ success: true, data: room });
});

export const joinRoom = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const userId = req.user._id;

  const room = await CodingRoom.findOne({ roomCode: code.toUpperCase() });
  if (!room) {
    res.status(404);
    throw new Error('Coding room not found');
  }

  if (room.status !== 'waiting' && room.host.toString() !== userId.toString() && room.participant?.toString() !== userId.toString()) {
    res.status(400);
    throw new Error('This room is already full or completed');
  }

  if (room.host.toString() !== userId.toString() && !room.participant) {
    room.participant = userId;
    room.status = 'active';
    room.startedAt = new Date();
    await room.save();
  }

  res.json({ success: true, data: room });
});

export const getRoom = asyncHandler(async (req, res) => {
  const { code } = req.params;
  
  const room = await CodingRoom.findOne({ roomCode: code.toUpperCase() })
    .populate('host', 'fullName email')
    .populate('participant', 'fullName email');

  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  res.json({ success: true, data: room });
});

export const getHint = asyncHandler(async (req, res) => {
  const { code } = req.params;
  const userId = req.user._id;

  const room = await CodingRoom.findOne({ roomCode: code.toUpperCase() });
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  if (room.hintsUsed >= 3) {
    res.status(400);
    throw new Error('All available hints have been used');
  }

  const hint = room.problem.hints[room.hintsUsed];
  room.hintsUsed += 1;
  await room.save();

  res.json({ success: true, data: { hint, hintsUsed: room.hintsUsed } });
});

export const endRoom = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const room = await CodingRoom.findOne({ roomCode: code.toUpperCase() });
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }

  room.status = 'completed';
  room.endedAt = new Date();
  await room.save();

  res.json({ success: true, data: room });
});
