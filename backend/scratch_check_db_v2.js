import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './src/models/Question.model.js';
import ModuleSeeder from './src/models/ModuleSeeder.model.js';

dotenv.config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const totalQuestions = await Question.countDocuments();
    const fieldCounts = await Question.aggregate([
      { $group: { _id: '$field', count: { $sum: 1 } } }
    ]);
    const cseQuestions = await Question.countDocuments({ field: 'Computer Science' });
    const cseEngQuestions = await Question.countDocuments({ field: 'Computer Science & Engineering' });

    console.log(`SUMMARY:`);
    console.log(`Total Questions in DB: ${totalQuestions}`);
    console.log(`Questions with field='Computer Science': ${cseQuestions}`);
    console.log(`Questions with field='Computer Science & Engineering': ${cseEngQuestions}`);
    console.log(`Field distribution:`, JSON.stringify(fieldCounts, null, 2));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkDatabase();
