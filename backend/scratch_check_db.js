import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './src/models/Question.model.js';
import ModuleSeeder from './src/models/ModuleSeeder.model.js';

dotenv.config();

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const totalQuestions = await Question.countDocuments();
    console.log(`Total Questions: ${totalQuestions}`);

    const fieldCounts = await Question.aggregate([
      { $group: { _id: '$field', count: { $sum: 1 } } }
    ]);
    console.log('Question counts by field:', JSON.stringify(fieldCounts, null, 2));

    const moduleCounts = await Question.aggregate([
      { $group: { _id: '$moduleId', count: { $sum: 1 } } }
    ]);
    console.log('Question counts by moduleId (top 5):', JSON.stringify(moduleCounts.slice(0, 5), null, 2));

    const seederStatus = await ModuleSeeder.find();
    console.log('Seeder Modules:', JSON.stringify(seederStatus.slice(0, 5), null, 2));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

checkDatabase();
