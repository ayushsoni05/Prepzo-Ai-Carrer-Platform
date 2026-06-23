import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getTodaysSprint, submitRound, getStreakStats, useStreakFreeze } from '../controllers/dailySprint.controller.js';

const router = express.Router();
router.use(protect);

router.get('/today', getTodaysSprint);
router.post('/submit', submitRound);
router.get('/streak', getStreakStats);
router.post('/freeze', useStreakFreeze);

export default router;
