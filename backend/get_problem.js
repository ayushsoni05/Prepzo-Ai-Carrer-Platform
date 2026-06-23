import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CodingProblem from './src/models/CodingProblem.model.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const problem = await CodingProblem.findOne();
  console.log(JSON.stringify(problem, null, 2));
  process.exit(0);
}

run();
