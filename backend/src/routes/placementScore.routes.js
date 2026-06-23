import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { calculateScore, getScore, getSkillGaps } from '../controllers/placementScore.controller.js';

const router = express.Router();
router.use(protect);

router.post('/calculate', calculateScore);
router.get('/', getScore);
router.get('/gaps', getSkillGaps);

export default router;
