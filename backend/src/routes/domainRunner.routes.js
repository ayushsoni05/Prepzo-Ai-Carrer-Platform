import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportDomainRunnerOutcome } from '../controllers/domainRunner.controller.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/report', reportDomainRunnerOutcome);

export default router;
