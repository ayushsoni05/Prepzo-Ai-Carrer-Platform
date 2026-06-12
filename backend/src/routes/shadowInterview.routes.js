import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  startShadowInterview,
  sendShadowInterviewMessage,
  completeShadowInterview,
} from '../controllers/shadowInterview.controller.js';

const router = express.Router();

router.use(protect);

router.post('/start', startShadowInterview);
router.post('/message', sendShadowInterviewMessage);
router.post('/complete', completeShadowInterview);

export default router;
