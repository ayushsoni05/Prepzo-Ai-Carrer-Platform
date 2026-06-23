import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { reportWhiteboardOutcome, auditWhiteboardDiagram } from '../controllers/whiteboard.controller.js';

const router = express.Router();

router.post('/report', protect, reportWhiteboardOutcome);
router.post('/audit', protect, auditWhiteboardDiagram);

export default router;
