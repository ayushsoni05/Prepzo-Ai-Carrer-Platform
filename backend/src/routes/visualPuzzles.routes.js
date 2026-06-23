import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportVisualPuzzleOutcome, getVisualPuzzleDecks } from '../controllers/visualPuzzles.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/decks', getVisualPuzzleDecks);
router.post('/report', reportVisualPuzzleOutcome);

export default router;
