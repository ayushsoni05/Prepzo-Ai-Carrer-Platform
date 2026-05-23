import express from 'express';
import { getTemplates, downloadTemplate } from '../controllers/overleaf.controller.js';

const router = express.Router();

router.get('/templates', getTemplates);
router.get('/download', downloadTemplate);

export default router;
