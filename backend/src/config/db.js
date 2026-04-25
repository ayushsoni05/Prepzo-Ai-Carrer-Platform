import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongoServer = null;

/**
 * Auto-seed interview questions if the collection is empty.
 * This ensures production (Render) always has data without manual scripts.
 */
const autoSeedInterviewQuestions = async () => {
  try {
    const InterviewQuestion = (await import('../models/InterviewQuestion.model.js')).default;
    const existingCount = await InterviewQuestion.countDocuments();
    
    if (existingCount > 0) {
      console.log(`📊 Interview questions already present: ${existingCount} documents. Skipping seed.`);
      return;
    }

    console.log('🌱 No interview questions found. Auto-seeding from question_bank.json...');
    
    const questionsToInsert = [];

    // 1. Process New Question Bank
    const NEW_BANK_PATH = path.join(__dirname, '../../../question_bank.json');
    if (fs.existsSync(NEW_BANK_PATH)) {
      const newData = JSON.parse(fs.readFileSync(NEW_BANK_PATH, 'utf8'));
      const categories = newData.question_bank.categories;

      for (const [categoryName, subSkills] of Object.entries(categories)) {
        for (const [subSkillName, questions] of Object.entries(subSkills)) {
          for (const q of questions) {
            questionsToInsert.push({
              questionId: q.id,
              category: categoryName,
              subSkill: subSkillName,
              question: q.question,
              answer: q.answer,
              difficulty: (q.difficulty || 'medium').toLowerCase(),
              keywords: []
            });
          }
        }
      }
    }

    // 2. Process Old Question Bank (Migration)
    const OLD_BANK_PATH = path.join(__dirname, '../../../frontend/src/data/interview_questions_bank.json');
    if (fs.existsSync(OLD_BANK_PATH)) {
      const oldData = JSON.parse(fs.readFileSync(OLD_BANK_PATH, 'utf8'));
      const bank = oldData.questionsBank;

      const processOldGroup = (group, categoryName) => {
        if (!group) return;
        for (const [skillKey, data] of Object.entries(group)) {
          const subSkillName = data.skillName || data.fieldName || skillKey;
          if (data.questions) {
            for (const q of data.questions) {
              if (!questionsToInsert.find(existing => existing.questionId === q.id)) {
                questionsToInsert.push({
                  questionId: q.id,
                  category: categoryName,
                  subSkill: subSkillName,
                  question: q.question,
                  answer: q.expectedAnswer || q.answer,
                  difficulty: (q.difficulty || 'medium').toLowerCase(),
                  keywords: q.keywords || []
                });
              }
            }
          }
        }
      };

      processOldGroup(bank.technicalSkills, 'Technical Skills');
      processOldGroup(bank.nonTechnicalSkills, 'Non-Technical Skills');
      processOldGroup(bank.fieldSpecific, 'Field Specific');
    }

    if (questionsToInsert.length > 0) {
      await InterviewQuestion.insertMany(questionsToInsert);
      console.log(`✅ Auto-seeded ${questionsToInsert.length} interview questions successfully!`);
    } else {
      console.warn('⚠️ No question bank JSON files found to seed from.');
    }
  } catch (err) {
    console.warn('⚠️ Auto-seed interview questions failed:', err.message);
  }
};

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    // In development, use in-memory MongoDB if local connection fails
    if (process.env.NODE_ENV === 'development') {
      try {
        console.log(`🔍 Attempting to connect to MongoDB: ${mongoUri.split('@')[1] || mongoUri}`);
        // Try connecting to the configured URI first
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
        // Auto-seed if empty
        await autoSeedInterviewQuestions();
        return;
      } catch (localError) {
        console.warn(`⚠️ Connection to ${mongoUri.split('@')[1] || 'remote'} failed, starting in-memory server...`);
        console.warn(`Details: ${localError.message}`);
        
        try {
          // Dynamically import mongodb-memory-server
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          mongoServer = await MongoMemoryServer.create({
            instance: {
              dbName: 'prepzo'
            }
          });
          mongoUri = mongoServer.getUri();
          console.log(`📦 In-memory MongoDB started at: ${mongoUri}`);
          
          await mongoose.connect(mongoUri);
          console.log(`✅ Connected to In-memory MongoDB`);
          
          // Auto-seed the in-memory DB
          await autoSeedInterviewQuestions();
          return;
        } catch (memError) {
          console.error(`❌ Failed to start In-memory MongoDB: ${memError.message}`);
          // Fall through to final catch
        }
      }
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Auto-seed if empty (critical for Render/production)
    await autoSeedInterviewQuestions();
  } catch (error) {
    console.error(`❌ Critical MongoDB Connection Error: ${error.message}`);
    console.error(`NODE_ENV is ${process.env.NODE_ENV}`);
    // Only exit in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️ Server will continue in a degraded state (No DB)');
    }
  }
};

// Cleanup function for graceful shutdown
export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

export default connectDB;
