import express from 'express';
import { getBattle, getRecentBattles } from '../controllers/battle.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getRecentBattles);
router.get('/:battleId', protect, getBattle);

export default router;
