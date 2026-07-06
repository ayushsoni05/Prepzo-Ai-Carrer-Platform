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
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    const email = 'recruiter@prepzo.com';
    const password = 'Recruiter@123';

    let recruiter = await User.findOne({ email });

    if (recruiter) {
      console.log(`ℹ️ Recruiter account already exists with email: ${email}`);
      console.log('🔄 Resetting password to: Recruiter@123...');
      recruiter.password = password;
      recruiter.role = 'recruiter';
      recruiter.accountStatus = 'active';
      recruiter.isEmailVerified = true;
      recruiter.isOnboarded = true;
      await recruiter.save();
      console.log('✅ Recruiter password successfully reset!');
    } else {
      console.log(`➕ Creating new recruiter account with email: ${email}...`);
      recruiter = await User.create({
        fullName: 'Sarah Vance',
        email: email,
        password: password,
        phone: '9876543210',
        role: 'recruiter',
        isEmailVerified: true,
        accountStatus: 'active',
        isOnboarded: true
      });
      console.log('✅ Recruiter account successfully created!');
    }

    console.log('----------------------------------------');
    console.log('Credentials to log in as Recruiter:');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('----------------------------------------');

  } catch (err) {
    console.error('❌ Error seeding recruiter user:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

run();
