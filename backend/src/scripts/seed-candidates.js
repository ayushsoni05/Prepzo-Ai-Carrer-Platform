import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const candidatesData = [
  {
    fullName: 'Ayush Soni',
    email: 'ayush@example.com',
    password: 'Student@123',
    phone: '9876543201',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 4500,
    streak: 12,
    knownTechnologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker'],
    targetRole: 'Full Stack Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Easy' },
      { problemId: '3', difficulty: 'Medium' },
      { problemId: '4', difficulty: 'Medium' },
      { problemId: '5', difficulty: 'Hard' }
    ]
  },
  {
    fullName: 'Sarah Chen',
    email: 'sarah@example.com',
    password: 'Student@123',
    phone: '9876543202',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 3200,
    streak: 8,
    knownTechnologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    targetRole: 'Frontend Developer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' },
      { problemId: '3', difficulty: 'Medium' }
    ]
  },
  {
    fullName: 'James Wilson',
    email: 'james@example.com',
    password: 'Student@123',
    phone: '9876543203',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 5100,
    streak: 21,
    knownTechnologies: ['Python', 'Django', 'AWS', 'Docker', 'Go', 'Kubernetes'],
    targetRole: 'Backend Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Easy' },
      { problemId: '3', difficulty: 'Medium' },
      { problemId: '4', difficulty: 'Medium' },
      { problemId: '5', difficulty: 'Medium' },
      { problemId: '6', difficulty: 'Hard' },
      { problemId: '7', difficulty: 'Hard' }
    ]
  },
  {
    fullName: 'Priya Patel',
    email: 'priya@example.com',
    password: 'Student@123',
    phone: '9876543204',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 2800,
    streak: 3,
    knownTechnologies: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'NumPy'],
    targetRole: 'AI/ML Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' }
    ]
  },
  {
    fullName: 'Elena Rostova',
    email: 'elena@example.com',
    password: 'Student@123',
    phone: '9876543205',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 4100,
    streak: 15,
    knownTechnologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
    targetRole: 'Backend Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Easy' },
      { problemId: '3', difficulty: 'Medium' },
      { problemId: '4', difficulty: 'Medium' }
    ]
  },
  {
    fullName: 'David Kim',
    email: 'david@example.com',
    password: 'Student@123',
    phone: '9876543206',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 1800,
    streak: 0,
    knownTechnologies: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Git'],
    targetRole: 'Frontend Developer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' }
    ]
  },
  {
    fullName: 'Alex Mercer',
    email: 'alex@example.com',
    password: 'Student@123',
    phone: '9876543207',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 5900,
    streak: 30,
    knownTechnologies: ['Go', 'Rust', 'Kubernetes', 'Terraform', 'Prometheus', 'AWS'],
    targetRole: 'DevOps Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' },
      { problemId: '3', difficulty: 'Medium' },
      { problemId: '4', difficulty: 'Hard' },
      { problemId: '5', difficulty: 'Hard' }
    ]
  },
  {
    fullName: 'Siddharth Sharma',
    email: 'siddharth@example.com',
    password: 'Student@123',
    phone: '9876543208',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 3400,
    streak: 9,
    knownTechnologies: ['React Native', 'Swift', 'Kotlin', 'TypeScript', 'Node.js'],
    targetRole: 'Mobile Developer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' }
    ]
  },
  {
    fullName: 'Emily Watson',
    email: 'emily@example.com',
    password: 'Student@123',
    phone: '9876543209',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 2200,
    streak: 4,
    knownTechnologies: ['Figma', 'UI/UX Design', 'HTML5', 'CSS3', 'Sass'],
    targetRole: 'UI/UX Designer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' }
    ]
  },
  {
    fullName: 'Carlos Santana',
    email: 'carlos@example.com',
    password: 'Student@123',
    phone: '9876543211',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 4900,
    streak: 18,
    knownTechnologies: ['Ruby on Rails', 'React', 'PostgreSQL', 'Redis', 'AWS'],
    targetRole: 'Full Stack Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' },
      { problemId: '3', difficulty: 'Medium' },
      { problemId: '4', difficulty: 'Hard' }
    ]
  },
  {
    fullName: 'Lara Croft',
    email: 'lara@example.com',
    password: 'Student@123',
    phone: '9876543212',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 3800,
    streak: 11,
    knownTechnologies: ['C++', 'Algorithms', 'Data Structures', 'Python', 'Git'],
    targetRole: 'Software Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' },
      { problemId: '3', difficulty: 'Medium' }
    ]
  },
  {
    fullName: 'Rajesh Koothrappali',
    email: 'rajesh@example.com',
    password: 'Student@123',
    phone: '9876543213',
    role: 'student',
    isEmailVerified: true,
    accountStatus: 'active',
    isOnboarded: true,
    xp: 4700,
    streak: 16,
    knownTechnologies: ['Go', 'gRPC', 'Kubernetes', 'Docker', 'MySQL', 'Kafka'],
    targetRole: 'Backend Engineer',
    solvedProblems: [
      { problemId: '1', difficulty: 'Easy' },
      { problemId: '2', difficulty: 'Medium' },
      { problemId: '3', difficulty: 'Hard' }
    ]
  }
];

async function run() {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    console.log('🧹 Cleaning up old student users to prevent duplicates...');
    const emails = candidatesData.map(c => c.email);
    await User.deleteMany({ email: { $in: emails } });

    console.log('➕ Seeding 12 high-quality active candidates...');
    for (const c of candidatesData) {
      await User.create(c);
      console.log(`- Seeded: ${c.fullName} (${c.email})`);
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

run();
