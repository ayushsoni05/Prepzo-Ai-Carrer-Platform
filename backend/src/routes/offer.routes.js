import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { parseOffer } from '../controllers/offer.controller.js';
import {
  startNegotiation,
  sendNegotiationMessage,
  completeNegotiation,
  getNegotiationHistory,
  getNegotiationSession,
} from '../controllers/negotiation.controller.js';

const router = express.Router();

// All offer routes should be protected
router.use(protect);

router.post('/parse', parseOffer);

// Negotiation Simulator routes
router.post('/negotiate/start', startNegotiation);
router.post('/negotiate/message', sendNegotiationMessage);
router.post('/negotiate/complete', completeNegotiation);
router.get('/negotiate/history', getNegotiationHistory);
router.get('/negotiate/:id', getNegotiationSession);

export default router;
