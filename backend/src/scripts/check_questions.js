import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import InterviewQuestion from '../models/InterviewQuestion.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const checkDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log(`Connecting to ${mongoUri.split('@')[1] || mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to DB');
    
    const count = await InterviewQuestion.countDocuments();
    console.log(`Total questions: ${count}`);
    
    const categories = await InterviewQuestion.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    console.log('Categories:', JSON.stringify(categories, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkDB();
