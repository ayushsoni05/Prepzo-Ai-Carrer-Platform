import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportDevopsOutcome } from '../controllers/devops.controller.js';

const router = express.Router();

router.post('/report', protect, reportDevopsOutcome);

export default router;
