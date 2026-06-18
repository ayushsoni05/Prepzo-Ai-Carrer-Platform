import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportGridQuestOutcome } from '../controllers/gridQuest.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/report', reportGridQuestOutcome);

export default router;
