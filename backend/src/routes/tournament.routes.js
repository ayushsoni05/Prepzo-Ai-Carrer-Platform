import express from 'express';
import { getTournaments, getTournamentById } from '../controllers/tournament.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getTournaments);
router.get('/:id', protect, getTournamentById);

export default router;
