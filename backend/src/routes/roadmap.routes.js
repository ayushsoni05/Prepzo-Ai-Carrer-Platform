import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { generateRoadmap, getActiveRoadmap, updateProgress, deleteRoadmap } from '../controllers/roadmap.controller.js';

const router = express.Router();
router.use(protect);

router.post('/generate', generateRoadmap);
router.get('/active', getActiveRoadmap);
router.patch('/:id/progress', updateProgress);
router.delete('/:id', deleteRoadmap);

export default router;
