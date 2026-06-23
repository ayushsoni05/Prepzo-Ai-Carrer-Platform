import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { saveReplay, getUserReplays, getReplay, analyzeReplay, deleteReplay } from '../controllers/replay.controller.js';

const router = express.Router();
router.use(protect);

router.post('/', saveReplay);
router.get('/', getUserReplays);
router.get('/:id', getReplay);
router.post('/:id/analyze', analyzeReplay);
router.delete('/:id', deleteReplay);

export default router;
