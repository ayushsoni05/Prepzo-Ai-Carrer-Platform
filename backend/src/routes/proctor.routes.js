import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportProctorOutcome } from '../controllers/proctor.controller.js';

const router = express.Router();

router.post('/report', protect, reportProctorOutcome);

export default router;
