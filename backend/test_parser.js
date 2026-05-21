import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { extractLocalFallback, extractResumeDataWithAI } from './src/services/resumeDataExtractor.service.js';

dotenv.config();

const resumeText = fs.readFileSync('raw_resume.txt', 'utf8');

console.log('Running local fallback parser...');
const localResult = extractLocalFallback(resumeText);
fs.writeFileSync('local.json', JSON.stringify(localResult, null, 2));

console.log('Running AI parser...');
try {
  const aiResult = await extractResumeDataWithAI(resumeText);
  fs.writeFileSync('ai.json', JSON.stringify(aiResult, null, 2));
} catch (error) {
  console.error('AI Parser Error:', error);
}

console.log('Done! Compare local.json and ai.json');
