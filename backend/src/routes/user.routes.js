import express from 'express';
import { getUserProfile, getLeaderboard, getRecommendations } from '../controllers/profile.controller.js';
import {
  getProfile,
  updateProfile,
  completeOnboarding,
  completeAssessment,
  getAllUsers,
  getUserById,
  deleteUser,
} from '../controllers/user.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public Gamification routes
router.get('/profile/:userId', getUserProfile);
router.get('/leaderboard/global', getLeaderboard);
router.get('/recommendations', getRecommendations);

// Protected routes (logged in users)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/onboarding', protect, completeOnboarding);
router.put('/assessment', protect, completeAssessment);

// Admin routes
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);

export default router;
