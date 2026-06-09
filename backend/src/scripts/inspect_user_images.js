import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  avatar: String,
  coverPhoto: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function run() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to', uri);
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    const users = await User.find({}, 'email fullName avatar coverPhoto');
    console.log('Found', users.length, 'users:');
    for (const u of users) {
      console.log(`- User: ${u.fullName} (${u.email})`);
      console.log(`  Avatar (length: ${u.avatar ? u.avatar.length : 0}):`, u.avatar ? u.avatar.substring(0, 100) + '...' + (u.avatar.length > 50 ? u.avatar.substring(u.avatar.length - 50) : '') : 'None');
      console.log(`  CoverPhoto (length: ${u.coverPhoto ? u.coverPhoto.length : 0}):`, u.coverPhoto ? u.coverPhoto.substring(0, 100) + '...' + (u.coverPhoto.length > 50 ? u.coverPhoto.substring(u.coverPhoto.length - 50) : '') : 'None');
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
