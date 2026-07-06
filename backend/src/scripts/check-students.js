import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');

    const students = await User.find({ role: 'student' }).select('fullName email role accountStatus xp');
    console.log(`Total students in DB: ${students.length}`);
    students.forEach(s => {
      console.log(`- Name: ${s.fullName}, Email: ${s.email}, Status: ${s.accountStatus}, XP: ${s.xp}`);
    });

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

run();
