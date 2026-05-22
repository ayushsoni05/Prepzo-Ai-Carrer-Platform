import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import User from './src/models/User.model.js';

dotenv.config({ path: './.env' });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    const users = await User.find({}, 'email name fullName resumeUrl resumeOriginalName resumeText');
    console.log('Users in DB:');
    users.forEach(u => {
      console.log(`Email: ${u.email}, Name: ${u.fullName || u.name}, resumeUrl: ${u.resumeUrl}`);
      if (u.resumeText) {
        console.log(`Resume Text Length: ${u.resumeText.length}`);
      }
    });
    const targetUser = users.find(u => u.email === 'aabus0909@gmail.com');
    if (targetUser && targetUser.resumeText) {
      fs.writeFileSync('./raw_resume.txt', targetUser.resumeText, 'utf-8');
      console.log('Successfully wrote raw_resume.txt');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
