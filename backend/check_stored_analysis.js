import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.model.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // We select only non-encrypted or specific fields if we want to avoid decryption errors,
    // or we can catch it. The decryption error happens in post-find/init hooks.
    // Let's query by specific email so only that document is loaded and decrypted.
    const emails = ['aayushsonisoni58@gmail.com', 'aabus0909@gmail.com', 'aabus@gmail.com'];
    for (const email of emails) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          console.log(`\n--- USER: ${email} ---`);
          console.log(`Name: ${user.fullName || user.name}`);
          console.log('ATS Score:', user.atsScore);
          console.log('Extracted Data:');
          console.log(JSON.stringify(user.resumeAnalysis?.extractedData, null, 2));
        } else {
          console.log(`User ${email} not found.`);
        }
      } catch (err) {
        console.error(`Error loading user ${email}:`, err.message);
      }
    }
    
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
