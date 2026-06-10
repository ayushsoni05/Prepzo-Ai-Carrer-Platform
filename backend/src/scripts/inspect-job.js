import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Company from '../models/Company.model.js';
import Job from '../models/Job.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function inspect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const job = await Job.findOne({}).populate('company');
    console.log(JSON.stringify(job, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
inspect();
