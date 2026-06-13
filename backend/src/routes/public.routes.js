import express from 'express';
import axios from 'axios';
import { getPublicStats } from '../controllers/public.controller.js';

const router = express.Router();

// @desc    Get public platform statistics
// @route   GET /api/public/stats
// @access  Public
router.get('/stats', getPublicStats);

// User-Agent rotation pool to avoid Google anti-bot detection
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
];

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

    // Retry up to 3 times with different User-Agent strings
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const userAgent = USER_AGENTS[attempt % USER_AGENTS.length];
        const response = await axios({
          method: 'get',
          url: ttsUrl,
          responseType: 'stream',
          timeout: 8000,
          headers: {
            'User-Agent': userAgent,
            'Referer': 'https://translate.google.com/',
            'Accept': 'audio/mpeg, audio/*, */*',
            'Accept-Language': 'en-IN,en;q=0.9',
          }
        });

        // Set response headers for audio streaming with CORS support
        res.set({
          'Content-Type': 'audio/mpeg',
          'Transfer-Encoding': 'chunked',
          'Access-Control-Allow-Origin': '*',
          'Cross-Origin-Resource-Policy': 'cross-origin',
          'Cache-Control': 'public, max-age=86400',
        });

        response.data.pipe(res);
        return; // Success — exit the retry loop
      } catch (err) {
        lastError = err;
        console.warn(`TTS Proxy attempt ${attempt + 1} failed:`, err.message);
        // Brief pause before retry
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }

    // All retries exhausted
    console.error('TTS Proxy Error (all retries failed):', lastError?.message);
    res.status(500).json({ success: false, message: 'Failed to synthesize speech' });
  } catch (error) {
    console.error('TTS Proxy Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to synthesize speech' });
  }
});

export default router;
