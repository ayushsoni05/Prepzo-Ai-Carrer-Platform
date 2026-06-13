import express from 'express';
import axios from 'axios';
import { getPublicStats } from '../controllers/public.controller.js';

const router = express.Router();

// @desc    Get public platform statistics
// @route   GET /api/public/stats
// @access  Public
router.get('/stats', getPublicStats);

// @desc    Proxy Google Translate TTS to avoid CORS and anti-bot blocks on client-side
// @route   GET /api/public/tts
// @access  Public
router.get('/tts', async (req, res) => {
  try {
    const { text, lang } = req.query;
    if (!text) {
      return res.status(400).json({ success: false, message: 'Text is required' });
    }

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang || 'en-IN'}&client=tw-ob&q=${encodeURIComponent(text)}`;

    const response = await axios({
      method: 'get',
      url: ttsUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked'
    });

    response.data.pipe(res);
  } catch (error) {
    console.error('TTS Proxy Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to synthesize speech' });
  }
});

export default router;
