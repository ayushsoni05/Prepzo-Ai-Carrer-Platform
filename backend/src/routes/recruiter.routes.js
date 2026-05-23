import { Router } from 'express';
import { getCandidates, getCandidateById } from '../controllers/recruiter.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// All recruiter routes must be protected and require 'recruiter' role (or 'admin')
router.use(protect);
router.use(authorize('recruiter', 'admin'));

router.route('/candidates').get(getCandidates);
router.route('/candidates/:id').get(getCandidateById);

export default router;
