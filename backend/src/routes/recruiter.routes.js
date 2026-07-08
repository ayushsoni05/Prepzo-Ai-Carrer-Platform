import { Router } from 'express';
import { 
  getCandidates, 
  getCandidateById, 
  getCandidateAiSummary, 
  updateCandidateRecruiterNotes, 
  scheduleInterview,
  getCandidateBattles,
  getCruiterJobs,
  updateCandidatePipelineStage,
  generateOutreachEmail
} from '../controllers/recruiter.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// All recruiter routes must be protected and require 'recruiter' role (or 'admin')
router.use(protect);
router.use(authorize('recruiter', 'admin'));

router.route('/candidates').get(getCandidates);
router.route('/candidates/:id').get(getCandidateById);
router.route('/candidates/:id/ai-summary').get(getCandidateAiSummary);
router.route('/candidates/:id/notes').put(updateCandidateRecruiterNotes);
router.route('/candidates/:id/schedule').post(scheduleInterview);
router.route('/candidates/:id/battles').get(getCandidateBattles);
router.route('/candidates/:id/stage').put(updateCandidatePipelineStage);
router.route('/candidates/:id/outreach-draft').post(generateOutreachEmail);
router.route('/jobs').get(getCruiterJobs);

export default router;
