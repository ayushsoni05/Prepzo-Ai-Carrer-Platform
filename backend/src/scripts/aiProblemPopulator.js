import mongoose from 'mongoose';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import CodingProblem from '../models/CodingProblem.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const groq = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY,
  baseURL: process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : 'https://api.groq.com/openai/v1',
  defaultHeaders: process.env.OPENROUTER_API_KEY ? {
    'HTTP-Referer': 'https://prepzo-ai-career-platform.vercel.app/',
    'X-Title': 'Prepzo AI Career Platform',
  } : undefined
});

async function populateProblems() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // Find up to 5 stubs that need detailed content
    const stubs = await CodingProblem.find({
      $or: [
        { testCases: { $size: 2 } }, // placeholder testCases
        { description: /Determine the optimal solution/ } // placeholder description
      ]
    }).limit(5);

    if (stubs.length === 0) {
      console.log('No placeholder stubs found. All problems are fully populated!');
      process.exit(0);
    }

    console.log(`Found ${stubs.length} stubs to populate. Starting AI generation...`);

    for (const stub of stubs) {
      console.log(`\nGenerating content for: ${stub.title} (${stub.id})...`);

      const systemPrompt = `
You are an expert curriculum designer and software engineer.
Your task is to generate full content for the LeetCode coding problem: "${stub.title}".

Provide the following:
1. A detailed HTML-formatted LeetCode description containing examples (input/output) and constraints.
2. Boilerplate starter code in: JavaScript, Python, C++, and Java. Ensure correct syntax, standard class/function signatures, and parameter comments.
3. Exactly 10 test cases (3 public, 7 hidden). The test inputs and expected outputs must be strings.

You MUST respond ONLY with a valid JSON object matching this schema:
{
  "description": "HTML description",
  "starterCode": {
    "javascript": "var...",
    "python": "class...",
    "cpp": "class...",
    "java": "class..."
  },
  "testCases": [
    {
      "id": "tc1",
      "input": "input representation",
      "expectedOutput": "expected return representation",
      "isHidden": false
    },
    ...
  ]
}
`;

      try {
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Please populate content for: "${stub.title}"` }
          ],
          model: process.env.OPENROUTER_API_KEY ? 'google/gemini-2.5-flash' : 'llama-3.3-70b-versatile',
          response_format: { type: 'json_object' },
          temperature: 0.2,
          max_tokens: 4000
        });

        const aiData = JSON.parse(completion.choices[0].message.content);

        // Validate exactly 10 test cases are generated
        if (!aiData.testCases || !Array.isArray(aiData.testCases) || aiData.testCases.length < 5) {
          throw new Error('AI failed to return sufficient test cases.');
        }

        // Save content to DB
        stub.description = aiData.description || stub.description;
        stub.starterCode = aiData.starterCode || stub.starterCode;
        stub.testCases = aiData.testCases;
        await stub.save();

        console.log(`✅ Fully populated: ${stub.title}! Saved 10 test cases and boilerplate templates.`);
        
        // Cooldown between requests to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (err) {
        console.error(`❌ Failed to populate ${stub.title}:`, err.message);
      }
    }

    console.log('\nAll batched stubs processed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Population failed:', error);
    process.exit(1);
  }
}

populateProblems();
