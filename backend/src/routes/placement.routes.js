import express from 'express';
import { analyzeAts, tailorResume, generateOutreach } from '../controllers/placement.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/analyze-ats', analyzeAts);
router.post('/tailor-resume', tailorResume);
router.post('/generate-outreach', generateOutreach);

export default router;
