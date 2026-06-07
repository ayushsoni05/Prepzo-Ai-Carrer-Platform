import express from 'express';
import { getBattle, getRecentBattles, getUserBattleHistory } from '../controllers/battle.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getRecentBattles);
router.get('/history/me', protect, getUserBattleHistory);
router.get('/:battleId', protect, getBattle);

export default router;
