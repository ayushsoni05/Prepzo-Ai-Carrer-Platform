import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { parseOffer } from '../controllers/offer.controller.js';

const router = express.Router();

// All offer routes should be protected
router.use(protect);

router.post('/parse', parseOffer);

export default router;
