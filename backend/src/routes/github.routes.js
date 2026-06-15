import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/auth.middleware.js';
import { analyzeRepositoryZip } from '../controllers/github.controller.js';

const router = express.Router();

// Memory multer storage to parse buffer directly in AdmZip without writing to server disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // Capped at 10 Megabytes
});

router.post('/analyze', protect, upload.single('repository'), analyzeRepositoryZip);

export default router;
