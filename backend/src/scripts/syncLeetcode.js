import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import CodingProblem from '../models/CodingProblem.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const LEETCODE_DUMP_URL = 'https://leetcode.com/api/problems/algorithms/';

async function runSync() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // ── STEP 0: FETCH ALL CURRENT SLUGS TO AVOID DUPES ──
    const existingInDB = await CodingProblem.find({}, { id: 1 }).lean();
    const existingIds = new Set(existingInDB.map(p => p.id));
    console.log(`Found ${existingIds.size} existing problems in DB.`);

    // ── STEP 1: IMPORT EXISTING PROBLEMS FROM FRONTEND FILE ──
    const codingLabPath = path.join(__dirname, '../../../frontend/src/api/codingLab.ts');
    console.log(`Reading existing problems from ${codingLabPath}...`);

    if (fs.existsSync(codingLabPath)) {
      const content = fs.readFileSync(codingLabPath, 'utf8');
      
      // Extract the codingProblems array content
      const arrayStartToken = 'export const codingProblems: CodingProblem[] = ';
      const arrayStartIdx = content.indexOf(arrayStartToken);
      if (arrayStartIdx !== -1) {
        const arrayStr = content.substring(arrayStartIdx + arrayStartToken.length);
        const arrayEndIdx = arrayStr.indexOf('\n];');
        const arrayCleaned = arrayStr.substring(0, arrayEndIdx) + '\n]';
        
        // Clean up the string to make it evaluatable JS
        const parseArray = new Function(`
          return ${arrayCleaned}
        `);
        
        const existingProblems = parseArray();
        console.log(`Extracted ${existingProblems.length} problems from codingLab.ts.`);

        const toInsert = [];
        for (const problem of existingProblems) {
          if (!existingIds.has(problem.id)) {
            toInsert.push({
              id: problem.id,
              title: problem.title,
              description: problem.description,
              difficulty: problem.difficulty || 'Easy',
              acceptanceRate: problem.acceptanceRate || 50,
              companyTags: problem.companyTags || [],
              hints: problem.hints || [],
              starterCode: problem.starterCode || {
                javascript: '',
                python: '',
                cpp: '',
                java: ''
              },
              testCases: problem.testCases || []
            });
            existingIds.add(problem.id);
          }
        }
        if (toInsert.length > 0) {
          await CodingProblem.insertMany(toInsert);
          console.log(`Successfully migrated ${toInsert.length} new problems from frontend file to MongoDB.`);
        } else {
          console.log('All frontend problems already exist in DB.');
        }
      } else {
        console.warn('Could not find codingProblems array in frontend file.');
      }
    } else {
      console.warn('Frontend codingLab.ts file not found, skipping local migration.');
    }

    // ── STEP 2: SCRAPE ALL 3500+ LEETCODE QUESTIONS METADATA ──
    console.log(`Fetching LeetCode dump from: ${FILLER_WORDS_URL(LEETCODE_DUMP_URL)}...`);
    
    let leetcodeQuestions = [];
    try {
      const response = await axios.get(LEETCODE_DUMP_URL, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 20000
      });
      
      if (response.data && response.data.stat_status_pairs) {
        const difficultyMap = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
        leetcodeQuestions = response.data.stat_status_pairs.map(pair => ({
          title: pair.stat.question__title,
          slug: pair.stat.question__title_slug,
          difficulty: difficultyMap[pair.difficulty.level] || 'Medium'
        }));
        console.log(`Downloaded list of ${leetcodeQuestions.length} LeetCode questions.`);
      }
    } catch (err) {
      console.warn('Failed to fetch LeetCode dump via HTTP. Using local fallback stubs...', err.message);
      // Fallback stubs of popular questions to ensure we have data
      leetcodeQuestions = [
        { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", slug: "longest-substring-without-repeating-characters" },
        { title: "Median of Two Sorted Arrays", difficulty: "Hard", slug: "median-of-two-sorted-arrays" },
        { title: "Longest Palindromic Substring", difficulty: "Medium", slug: "longest-palindromic-substring" },
        { title: "Zigzag Conversion", difficulty: "Medium", slug: "zigzag-conversion" },
        { title: "Reverse Integer", difficulty: "Medium", slug: "reverse-integer" },
        { title: "String to Integer (atoi)", difficulty: "Medium", slug: "string-to-integer-atoi" },
        { title: "Palindrome Number", difficulty: "Easy", slug: "palindrome-number" },
        { title: "Regular Expression Matching", difficulty: "Hard", slug: "regular-expression-matching" },
        { title: "Container With Most Water", difficulty: "Medium", slug: "container-with-most-water" },
        { title: "Integer to Roman", difficulty: "Medium", slug: "integer-to-roman" },
        { title: "Roman to Integer", difficulty: "Easy", slug: "roman-to-integer" },
        { title: "Longest Common Prefix", difficulty: "Easy", slug: "longest-common-prefix" },
        { title: "3Sum", difficulty: "Medium", slug: "3sum" },
        { title: "3Sum Closest", difficulty: "Medium", slug: "3sum-closest" },
        { title: "Letter Combinations of a Phone Number", difficulty: "Medium", slug: "letter-combinations-of-a-phone-number" },
        { title: "4Sum", difficulty: "Medium", slug: "4sum" }
      ];
    }

    const toInsertStubs = [];
    for (const q of leetcodeQuestions) {
      const slug = q.slug || q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      if (!existingIds.has(slug)) {
        toInsertStubs.push({
          id: slug,
          title: q.title,
          description: `<p>Determine the optimal solution for <strong>${q.title}</strong>.</p><p>Use the editor to write and submit your code.</p>`,
          difficulty: q.difficulty || 'Medium',
          acceptanceRate: 50,
          companyTags: ['General'],
          hints: ['Think about brute-force first.', 'Can we optimize using a Hash Map or Dynamic Programming?'],
          starterCode: {
            javascript: `// Starter template for ${q.title}\nfunction solution() {\n  \n}`,
            python: `# Starter template for ${q.title}\ndef solution():\n    pass`,
            cpp: `// Starter template for ${q.title}\nclass Solution {\npublic:\n    void solution() {\n        \n    }\n};`,
            java: `// Starter template for ${q.title}\nclass Solution {\n    public void solution() {\n        \n    }\n}`
          },
          testCases: [
            { id: "tc1", input: "1", expectedOutput: "1" },
            { id: "tc2", input: "2", expectedOutput: "2" }
          ]
        });
        existingIds.add(slug);
      }
    }
    if (toInsertStubs.length > 0) {
      await CodingProblem.insertMany(toInsertStubs);
      console.log(`Generated ${toInsertStubs.length} new question stubs in MongoDB.`);
    } else {
      console.log('No new stubs to generate.');
    }

    console.log('🎉 Ingestion/Sync Completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Failsafe URL helper
function FILLER_WORDS_URL(url) {
  return url;
}

runSync();
