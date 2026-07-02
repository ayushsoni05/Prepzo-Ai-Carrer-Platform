import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
import {
  getAutomationStatus,
  triggerAutomationRun,
  getAutomationLogs,
  getAutomationConfig,
  updateAutomationConfig,
} from '../controllers/jobAutomation.controller.js';

const router = express.Router();

// Apply auth middleware - Admin only
router.use(protect);
router.use(admin);

router.get('/status', getAutomationStatus);
router.post('/trigger', triggerAutomationRun);
router.get('/logs', getAutomationLogs);
router.get('/config', getAutomationConfig);
router.put('/config', updateAutomationConfig);

export default router;
