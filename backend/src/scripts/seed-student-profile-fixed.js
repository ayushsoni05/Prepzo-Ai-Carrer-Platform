import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
  }

  console.log('Connecting to MongoDB database at:', mongoUri.split('@')[1] || mongoUri);
  await mongoose.connect(mongoUri);
  console.log('Connected successfully.');

  console.log('Cleaning up existing test student account...');
  await User.deleteMany({ email: 'test.student@example.com' });

  console.log('Seeding new test student profile...');
  const student = new User({
    fullName: 'Test Student',
    email: 'test.student@example.com',
    phone: '1234567890',
    dateOfBirth: '2002-01-01',
    gender: 'Male',
    password: 'TestPassword123!',
    collegeName: 'Prepzo University',
    degree: 'B.Tech',
    fieldOfStudy: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    cgpa: '8.5',
    targetRole: 'Software Development Engineer',
    knownTechnologies: ['JavaScript', 'Python', 'React', 'Node.js'],
    preferredCompanies: ['Google', 'Microsoft', 'Amazon'],
    linkedin: 'https://linkedin.com/in/teststudent',
    github: 'https://github.com/teststudent',
    resumeUrl: '',
    role: 'student',
    isOnboarded: true,
    isAssessmentComplete: true,
    isFieldTestComplete: true,
    isSkillTestComplete: true,
    accountStatus: 'active',
    isEmailVerified: true,
    placementReadinessScore: 65,
    atsScore: 85,
    xp: 2450,
    codingElo: 1420
  });

  await student.save();
  console.log('Test student profile seeded successfully.');
  
  // Verify user search
  const found = await User.findOne({ email: 'test.student@example.com' }).select('+password');
  console.log('Verified user email in DB:', found.email);
  console.log('Verified user role in DB:', found.role);

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
