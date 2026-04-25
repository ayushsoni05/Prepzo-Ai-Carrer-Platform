import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Note from '../models/Note.model.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const NEW_BANK_PATH = path.join(__dirname, '../../../question_bank.json');

const seedNotes = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error('MONGODB_URI not found in .env');

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Database:', mongoose.connection.name);

    await Note.deleteMany({});
    console.log('Cleared existing notes');

    const notesToInsert = [];
    const DUMMY_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    if (fs.existsSync(NEW_BANK_PATH)) {
      console.log('Processing question bank to generate notes...');
      const data = JSON.parse(fs.readFileSync(NEW_BANK_PATH, 'utf8'));
      const categories = data.question_bank.categories;

      for (const [categoryName, subSkills] of Object.entries(categories)) {
        for (const subSkillName of Object.keys(subSkills)) {
          // Generate 3 notes for each subskill
          for (let i = 1; i <= 3; i++) {
            const difficulties = ['beginner', 'intermediate', 'advanced'];
            const difficulty = difficulties[i - 1];
            
            notesToInsert.push({
              noteId: uuidv4(),
              title: `${subSkillName} - Comprehensive Guide Part ${i}`,
              category: categoryName,
              subSkill: subSkillName,
              summary: `This is a comprehensive study guide covering the essential concepts, principles, and applications of ${subSkillName}. Perfect for ${difficulty} level students preparing for interviews.`,
              content: DUMMY_PDF_URL, // Using content field to store the PDF URL as requested
              difficulty: difficulty,
              readTimeMinutes: Math.floor(Math.random() * 15) + 5, // 5 to 20 minutes
              tags: [subSkillName.toLowerCase().replace(/ /g, '-'), 'study-material', 'interview-prep', difficulty]
            });
          }
        }
      }
    }

    if (notesToInsert.length > 0) {
      await Note.insertMany(notesToInsert);
      console.log(`✅ Successfully seeded ${notesToInsert.length} study notes`);
    } else {
      console.log('⚠️ No subskills found to generate notes for.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedNotes();
