import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CodingProblem from './src/models/CodingProblem.model.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const easyCount = await CodingProblem.countDocuments({ difficulty: 'Easy' });
  const mediumCount = await CodingProblem.countDocuments({ difficulty: 'Medium' });
  const hardCount = await CodingProblem.countDocuments({ difficulty: 'Hard' });
  console.log(`Easy: ${easyCount}, Medium: ${mediumCount}, Hard: ${hardCount}`);
  process.exit(0);
}

run();
