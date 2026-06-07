import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import axios from 'axios';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
});

/**
 * Scrapes an external URL to extract the main problem text.
 * Note: SPA sites like LeetCode might require Puppeteer, but we try standard fetch first.
 * @param {string} url 
 * @returns {Promise<string>}
 */
export const scrapeProblemUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    const html = response.data;
    const $ = cheerio.load(html);
    
    // Remove scripts, styles, navs
    $('script, style, nav, footer, header').remove();
    
    // Extract text from common problem description classes if known, else body
    let text = $('.description, .problem-description, .task-description').text();
    if (!text || text.trim().length < 50) {
      text = $('body').text();
    }
    
    // Clean up whitespace
    return text.replace(/\s+/g, ' ').trim().substring(0, 10000); // Limit to 10k chars
  } catch (error) {
    console.error('Scraping failed:', error.message);
    throw new Error('Failed to extract problem description from the provided URL.');
  }
};

/**
 * Generates an algorithm visualization plan using OpenRouter.
 * @param {string} problemDescription 
 */
export const generateAlgorithmVisualization = async (problemDescription) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  const prompt = `
You are an expert algorithm visualizer. Given the coding problem description below, your task is to identify the optimal algorithm to solve it and provide a step-by-step visual explanation.

You MUST respond ONLY with a valid JSON object matching this exact schema, with no markdown code block formatting (no \`\`\`json or \`\`\` wrappers, just raw JSON).

{
  "problemSummary": "A concise 1-2 sentence summary of the problem.",
  "optimalAlgorithmName": "e.g., Two Pointers, Depth-First Search, Dynamic Programming",
  "timeComplexity": "e.g., O(N log N)",
  "spaceComplexity": "e.g., O(1)",
  "steps": [
    {
      "stepTitle": "Title of the step",
      "description": "Clear explanation of what happens in this step.",
      "mermaidSyntax": "Valid Mermaid.js graph string illustrating the current state. Example: 'graph TD; A-->B;' Use graph LR or graph TD or flowchart. Do not include markdown code block syntax inside the string."
    }
  ]
}

Problem Description:
${problemDescription}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "user", content: prompt }
      ]
    });
    
    let text = response.choices[0].message.content;
    
    // Clean potential markdown blocks
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsedJSON = JSON.parse(text);
    return parsedJSON;
  } catch (error) {
    console.error('Visualization generation failed:', error);
    throw new Error('Failed to generate visualization. ' + error.message);
  }
};

export default {
  scrapeProblemUrl,
  generateAlgorithmVisualization
};
