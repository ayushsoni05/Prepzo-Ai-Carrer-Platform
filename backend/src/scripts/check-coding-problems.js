import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const CodingProblemSchema = new mongoose.Schema({}, { strict: false });
const CodingProblem = mongoose.model('CodingProblem', CodingProblemSchema, 'codingproblems');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB.');
  const count = await CodingProblem.countDocuments({});
  console.log('Total Coding Problems in DB:', count);
  if (count > 0) {
    const samples = await CodingProblem.find({}).limit(3);
    for (const s of samples) {
      console.log(` - ID: "${s.get('id')}", Title: "${s.get('title')}", Difficulty: "${s.get('difficulty')}"`);
    }
  }
  await mongoose.disconnect();
  process.exit(0);
}

check().catch(console.error);
