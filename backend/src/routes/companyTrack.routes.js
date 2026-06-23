import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { getAllTracks, getTrack, getProgress, updateProgress } from '../controllers/companyTrack.controller.js';

const router = express.Router();

router.get('/', getAllTracks);
router.get('/:company', getTrack);
router.get('/:company/progress', protect, getProgress);
router.patch('/:company/progress', protect, updateProgress);

export default router;
