import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  getTriviaQuestions,
  getMyGameStats,
  reportTriviaOutcome,
  reportRegexOutcome,
  getGameLeaderboard,
  reportCodeGolfOutcome,
  reportCyberDefenseOutcome
} from '../controllers/game.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/trivia/questions', getTriviaQuestions);
router.get('/stats', getMyGameStats);
router.post('/trivia/report', reportTriviaOutcome);
router.post('/regex/report', reportRegexOutcome);
router.post('/golf/report', reportCodeGolfOutcome);
router.post('/cyber/report', reportCyberDefenseOutcome);
router.get('/leaderboard', getGameLeaderboard);

export default router;
