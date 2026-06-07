import express from 'express';
import { scrapeProblemUrl, generateAlgorithmVisualization } from '../services/aiVisualization.service.js';
import { protect } from '../middleware/auth.middleware.js';
import Question from '../models/Question.model.js'; // Assuming this exists or similar

const router = express.Router();

// POST /api/ai/visualize
router.post('/visualize', protect, async (req, res) => {
  try {
    const { url, problemId, problemText } = req.body;
    let descriptionToAnalyze = problemText || '';

    if (!descriptionToAnalyze) {
      if (problemId) {
        // Platform's own problem
        // Find by problemId or object ID depending on schema
        // Assuming there is an InterviewQuestion or similar model. We can search QuestionBank
        // Let's use the DB if we can, but since the frontend will have the problem text anyway
        // it's much better if the frontend just sends `problemText` directly for native problems!
        // To be safe, if we get here without text but with ID, we can throw error or query.
        return res.status(400).json({ success: false, message: 'problemText is required for internal problems.' });
      } else if (url) {
        // External URL
        descriptionToAnalyze = await scrapeProblemUrl(url);
      } else {
        return res.status(400).json({ success: false, message: 'Either url, problemId, or problemText must be provided.' });
      }
    }

    if (!descriptionToAnalyze) {
      return res.status(400).json({ success: false, message: 'Could not extract problem description.' });
    }

    const visualizationData = await generateAlgorithmVisualization(descriptionToAnalyze);

    res.json({
      success: true,
      data: visualizationData
    });
  } catch (error) {
    console.error('Visualization route error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
