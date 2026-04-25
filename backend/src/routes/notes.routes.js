import express from 'express';
import {
  getNoteCategories,
  getNotes,
  getNoteById
} from '../controllers/notes.controller.js';

const router = express.Router();

// All notes routes are public
router.get('/categories', getNoteCategories);
router.get('/', getNotes);
router.get('/:noteId', getNoteById);

export default router;
