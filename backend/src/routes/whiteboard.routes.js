import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportWhiteboardOutcome } from '../controllers/whiteboard.controller.js';

const router = express.Router();

router.post('/report', protect, reportWhiteboardOutcome);

export default router;
