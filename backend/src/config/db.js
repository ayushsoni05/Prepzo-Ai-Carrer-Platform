import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongoServer = null;

const seedInMemoryDB = async () => {
  try {
    const InterviewQuestion = (await import('../models/InterviewQuestion.model.js')).default;
    const BANK_PATH = path.join(__dirname, '../../../question_bank.json');
    
    if (fs.existsSync(BANK_PATH)) {
      console.log('🌱 Seeding in-memory database from question_bank.json...');
      const data = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));
      const categories = data.question_bank.categories;
      const questionsToInsert = [];

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

      if (questionsToInsert.length > 0) {
        await InterviewQuestion.insertMany(questionsToInsert);
        console.log(`✅ Successfully seeded ${questionsToInsert.length} questions into in-memory DB.`);
      }
    }
  } catch (err) {
    console.warn('⚠️ Failed to seed in-memory DB:', err.message);
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
          
          // Seed the in-memory DB so it's not empty
          await seedInMemoryDB();
          return;
        } catch (memError) {
          console.error(`❌ Failed to start In-memory MongoDB: ${memError.message}`);
          // Fall through to final catch
        }
      }
    }
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
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
