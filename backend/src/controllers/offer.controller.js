import { analyzeOfferWithAI } from '../services/aiService.js';

export const parseOffer = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Offer text is required.'
      });
    }

    // Call the Python AI service
    const parsedData = await analyzeOfferWithAI(text, req.user);
    
    return res.status(200).json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    console.error('Error in parseOffer controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to parse offer letter.',
      error: error.message
    });
  }
};
