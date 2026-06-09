/**
 * One-time migration script to generate profileSlug for existing users.
 * 
 * Usage: node backend/src/scripts/generate-slugs.js
 * 
 * This creates a URL-friendly slug from each user's fullName,
 * handling collisions by appending -1, -2, etc.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ No MONGODB_URI or MONGO_URI found in .env');
  process.exit(1);
}

async function generateSlugs() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const User = mongoose.connection.collection('users');
    
    // Find all users without a profileSlug
    const users = await User.find({ 
      $or: [
        { profileSlug: { $exists: false } },
        { profileSlug: null },
        { profileSlug: '' }
      ]
    }).toArray();

    console.log(`Found ${users.length} users without a profileSlug`);

    let updated = 0;
    const usedSlugs = new Set();

    // Pre-load existing slugs
    const existingSlugs = await User.find({ profileSlug: { $exists: true, $ne: null, $ne: '' } }).toArray();
    existingSlugs.forEach(u => usedSlugs.add(u.profileSlug));

    for (const user of users) {
      if (!user.fullName) continue;

      let baseSlug = user.fullName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      if (!baseSlug) baseSlug = 'user';

      let slug = baseSlug;
      let counter = 1;

      while (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      usedSlugs.add(slug);

      await User.updateOne(
        { _id: user._id },
        { $set: { profileSlug: slug } }
      );

      console.log(`  ${user.fullName} → ${slug}`);
      updated++;
    }

    console.log(`\n✅ Updated ${updated} users with profileSlug`);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

generateSlugs();
