import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { createRoom, joinRoom, getRoom, getHint, endRoom } from '../controllers/codingRoom.controller.js';

const router = express.Router();
router.use(protect);

router.post('/create', createRoom);
router.post('/join/:code', joinRoom);
router.get('/:code', getRoom);
router.post('/:code/hint', getHint);
router.post('/:code/end', endRoom);

export default router;
