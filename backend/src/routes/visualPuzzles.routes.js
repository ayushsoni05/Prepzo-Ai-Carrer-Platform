import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportVisualPuzzleOutcome } from '../controllers/visualPuzzles.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/report', reportVisualPuzzleOutcome);

export default router;
