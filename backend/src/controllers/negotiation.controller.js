import OpenAI from 'openai';
import dotenv from 'dotenv';
import NegotiationSession from '../models/NegotiationSession.model.js';

dotenv.config();

// Configure OpenAI client with OpenRouter and Groq fallback
const groq = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : 'https://api.groq.com/openai/v1',
  defaultHeaders: process.env.OPENROUTER_API_KEY ? {
    'HTTP-Referer': 'https://prepzo-ai-career-platform.vercel.app/',
    'X-Title': 'Prepzo AI Career Platform',
  } : undefined
});

/**
 * Start a new negotiation session
 */
export const startNegotiation = async (req, res) => {
  try {
    const { originalOffer, personality } = req.body;

    if (!originalOffer || !personality) {
      return res.status(400).json({
        success: false,
        message: 'Original offer and recruiter personality are required.',
      });
    }

    // Set initial greeting based on personality
    let greeting = '';
    if (personality === 'heather') {
      greeting = "Hi, I'm Heather. Thanks for taking the time to speak today. We are really excited about your background and would love to have you join us. I trust you've reviewed the offer we sent over. What are your thoughts on the package?";
    } else {
      greeting = "Hey there! I'm Fred. Really glad we could connect today. We're super excited to bring you on board the team and think you'll do amazing things here. I wanted to check in and see how you feel about the offer details we put together?";
    }

    const newSession = await NegotiationSession.create({
      user: req.user._id,
      personality,
      originalOffer,
      currentOffer: { ...originalOffer },
      sentiment: 75,
      status: 'active',
      chatHistory: [
        {
          role: 'recruiter',
          content: greeting,
          timestamp: new Date(),
        },
      ],
      tacticsUsed: [],
      finalCompensationIncrease: 0,
    });

    return res.status(201).json({
      success: true,
      data: newSession,
    });
  } catch (error) {
    console.error('Error in startNegotiation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to start negotiation session.',
      error: error.message,
    });
  }
};

/**
 * Process a message from the candidate
 */
export const sendNegotiationMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and message are required.',
      });
    }

    const session = await NegotiationSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Negotiation session not found.',
      });
    }

    if (session.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This negotiation session has already ended.',
      });
    }

    // Add user's message to chat history
    session.chatHistory.push({
      role: 'candidate',
      content: message,
      timestamp: new Date(),
    });

    const originalOffer = session.originalOffer;
    const currentOffer = session.currentOffer;
    const personality = session.personality;
    const chatHistory = session.chatHistory;

    // Construct the prompt for Groq Llama 3.3
    const systemPrompt = `
You are simulating a high-stakes salary negotiation for a job offer.
You must act as the recruiter: "${personality === 'heather' ? 'Hardball Heather' : 'Flexible Fred'}".

PERSONALITY RULES:
${personality === 'heather' ? 
`- Hardball Heather: Strict, authoritative recruiter for a mega-tech firm. Expects high-quality justifications (market data, alternative offers, specialized skillsets). Easily annoyed by aggressive demands without reasoning. If the user makes demands without solid justification, decrease sentiment by 15-20%. If sentiment drops below 30%, warn the user that the offer is at risk of being rescinded. If sentiment drops to 0%, the offer is rescinded. Offers incremental raises only when strongly convinced.` : 
`- Flexible Fred: Warm, collaborative recruiter at a high-growth startup. Highly receptive to equity/bonus requests and collaborative language. Wants to reach a win-win. Doesn't rescind easily (minimum sentiment drop is 5% for bad demands). If the user asks for too much base, Fred redirects them to equity or sign-on bonuses.`}

NEGOTIATION CONSTRAINTS:
- Original Offer: Base $${originalOffer.base_salary}, Sign-on $${originalOffer.sign_on_bonus}, Equity $${originalOffer.equity_amount}
- Current Offer: Base $${currentOffer.base_salary}, Sign-on $${currentOffer.sign_on_bonus}, Equity $${currentOffer.equity_amount}
- Maximum increase allowed over original offer:
  * Heather: Base (+15% max), Sign-on (+20% max), Equity (+25% max)
  * Fred: Base (+10% max), Sign-on (+35% max), Equity (+50% max)
- Do NOT exceed these caps under any circumstances. If the user asks for more, refuse firmly or make a counter-offer up to the cap.

YOUR TASK:
Analyze the user's pitch. Detect the negotiation tactic they used (e.g. "Data-Backed Pitch", "Double Anchor", "Unjustified Demand", "Collaborative Framing", "Passive Appeal"). Update the sentiment (0-100%) and the current offer values based on their pitch and your personality.
Generate the recruiter's response and coaching tips.

RESPONSE FORMAT:
You MUST respond with a single, valid JSON object containing exactly the following keys:
{
  "recruiterResponse": "The text response of the recruiter in character.",
  "sentiment": number, // Current sentiment from 0 to 100
  "base_salary": number, // Updated base salary (equal or higher than current, up to cap)
  "sign_on_bonus": number, // Updated sign-on bonus
  "equity_amount": number, // Updated equity amount
  "tactic": "The name of the detected tactic",
  "coachingTip": "1-2 sentences of coaching advice from the Prepzo AI Coach guiding the user on how to respond next.",
  "coachSample": "A suggested, professional sample reply the candidate could use."
}
`;

    // format messages
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-10).map(h => ({
        role: h.role === 'recruiter' ? 'assistant' : 'user',
        content: h.content,
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);

    // Apply strict validation on numbers (ensure they don't cheat or exceed max caps)
    const baseCap = originalOffer.base_salary * (personality === 'heather' ? 1.15 : 1.10);
    const bonusCap = originalOffer.sign_on_bonus * (personality === 'heather' ? 1.20 : 1.35);
    const equityCap = originalOffer.equity_amount * (personality === 'heather' ? 1.25 : 1.50);

    const validatedBase = Math.min(baseCap, Math.max(currentOffer.base_salary, aiResponse.base_salary || 0));
    const validatedBonus = Math.min(bonusCap, Math.max(currentOffer.sign_on_bonus, aiResponse.sign_on_bonus || 0));
    const validatedEquity = Math.min(equityCap, Math.max(currentOffer.equity_amount, aiResponse.equity_amount || 0));

    let finalSentiment = Math.max(0, Math.min(100, aiResponse.sentiment ?? session.sentiment));
    let status = 'active';

    if (finalSentiment <= 0) {
      status = 'rescinded';
      aiResponse.recruiterResponse = personality === 'heather' 
        ? "Given the misaligned expectations and the nature of this discussion, we have decided to rescind our offer. We wish you the best in your job search."
        : "I'm sorry, but it looks like we're too far apart on expectations to make this work. We'll have to move forward with other candidates and withdraw the offer. Best of luck.";
    }

    // Save recruiter response to chatHistory
    session.chatHistory.push({
      role: 'recruiter',
      content: aiResponse.recruiterResponse,
      tactic: aiResponse.tactic,
      coachingTip: aiResponse.coachingTip,
      timestamp: new Date(),
    });

    // Update session state
    session.sentiment = finalSentiment;
    session.status = status;
    session.currentOffer = {
      base_salary: validatedBase,
      sign_on_bonus: validatedBonus,
      target_bonus: currentOffer.target_bonus,
      equity_type: currentOffer.equity_type,
      equity_amount: validatedEquity,
      strike_price: currentOffer.strike_price,
      current_valuation: currentOffer.current_valuation,
      vesting_years: currentOffer.vesting_years,
      cliff_months: currentOffer.cliff_months,
    };

    if (aiResponse.tactic && !session.tacticsUsed.includes(aiResponse.tactic)) {
      session.tacticsUsed.push(aiResponse.tactic);
    }

    await session.save();

    // Include the generated coach sample directly in response
    return res.status(200).json({
      success: true,
      data: {
        ...session.toObject(),
        coachSample: aiResponse.coachSample || '',
      },
    });
  } catch (error) {
    console.error('Error in sendNegotiationMessage:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process negotiation response.',
      error: error.message,
    });
  }
};

/**
 * Complete a negotiation session (accept/reject)
 */
export const completeNegotiation = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    if (!sessionId || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and a valid status (accepted/rejected) are required.',
      });
    }

    const session = await NegotiationSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Negotiation session not found.',
      });
    }

    if (session.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This negotiation session has already ended.',
      });
    }

    // Calculate total compensation increase over 4 years
    const origTC = (session.originalOffer.base_salary * 4) + session.originalOffer.sign_on_bonus + session.originalOffer.equity_amount;
    const newTC = (session.currentOffer.base_salary * 4) + session.currentOffer.sign_on_bonus + session.currentOffer.equity_amount;
    const increase = status === 'accepted' ? Math.max(0, newTC - origTC) : 0;

    session.status = status;
    session.finalCompensationIncrease = increase;

    await session.save();

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Error in completeNegotiation:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete negotiation.',
      error: error.message,
    });
  }
};

/**
 * Fetch negotiation history for current user
 */
export const getNegotiationHistory = async (req, res) => {
  try {
    const sessions = await NegotiationSession.find({ user: req.user._id }).sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error('Error in getNegotiationHistory:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch negotiation history.',
      error: error.message,
    });
  }
};

/**
 * Fetch details of a single session
 */
export const getNegotiationSession = async (req, res) => {
  try {
    const session = await NegotiationSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Negotiation session not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error('Error in getNegotiationSession:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch negotiation session.',
      error: error.message,
    });
  }
};
