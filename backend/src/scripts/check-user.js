import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import User from '../models/User.model.js';

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findById('69dfe5c42c96bae11c266680');
  
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  
  console.log("Token:", token);
  
  // now simulate the protect middleware
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const fetchedUser = await User.findById(decoded.id).select('-password');
  
  console.log("Fetched User JSON:", fetchedUser.toJSON());
  process.exit(0);
}

check().catch(console.error);
