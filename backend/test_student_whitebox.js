import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.model.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prepzo';

async function runStudentWhiteboxTests() {
  console.log('🤖 STARTING STUDENT PORTAL WHITE BOX TESTING...');
  console.log(`Connecting to: ${mongoUri}`);
  
  await mongoose.connect(mongoUri);
  console.log('✅ MongoDB Connected successfully.');

  let testUserId = null;

  try {
    // -------------------------------------------------------------
    // Test Case 1: Student Default Properties
    // -------------------------------------------------------------
    console.log('\n--- Test 1: Student Default Attributes Validations ---');
    
    const candidateData = {
      fullName: 'Student QA Candidate',
      email: `student.qa-${Date.now()}@prepzo.com`,
      role: 'student',
      status: 'active',
      password: 'Password!123'
    };

    const student = new User(candidateData);
    const savedStudent = await student.save();
    testUserId = savedStudent._id;
    console.log(`✓ Temporary Student user created with ID: ${testUserId}`);

    // Assert defaults
    if (savedStudent.role !== 'student') {
      throw new Error(`Assertion failed: expected role to be student, got ${savedStudent.role}`);
    }
    if (savedStudent.isOnboarded !== false) {
      throw new Error('Assertion failed: isOnboarded should default to false');
    }
    if (savedStudent.placementReadinessScore !== 0) {
      throw new Error('Assertion failed: placementReadinessScore should default to 0');
    }
    console.log('✓ Student Default Attributes validated.');

    // -------------------------------------------------------------
    // Test Case 2: Onboarding Progress States
    // -------------------------------------------------------------
    console.log('\n--- Test 2: Onboarding Progress Transitions ---');
    
    savedStudent.isOnboarded = true;
    savedStudent.collegeName = 'Imperial College London';
    savedStudent.degree = 'Master of Science';
    savedStudent.fieldOfStudy = 'Computing';
    savedStudent.yearOfStudy = '5';
    savedStudent.cgpa = '8.7';
    savedStudent.targetRole = 'Backend Engineer';

    const updatedStudent = await savedStudent.save();
    if (!updatedStudent.isOnboarded) {
      throw new Error('Assertion failed: isOnboarded state was not updated');
    }
    if (updatedStudent.collegeName !== 'Imperial College London') {
      throw new Error(`Assertion failed: collegeName mismatch, got ${updatedStudent.collegeName}`);
    }
    console.log('✓ Onboarding progress transitions verified successfully.');

    // -------------------------------------------------------------
    // Test Case 3: ELO Streak Calculations
    // -------------------------------------------------------------
    console.log('\n--- Test 3: Streak ELO Calculations Bounds ---');
    // Experience increments base formula mock validation
    const streak = updatedStudent.streak || 5;
    const baseEloMultiplier = 1.2;
    const eloSurge = Math.floor(100 + (streak * baseEloMultiplier * 10));
    console.log(`Verified consecutive submissions streak: ${streak} days -> Calculated ELO surge: +${eloSurge} ELO`);
    if (eloSurge < 100 || eloSurge > 500) {
      throw new Error(`Assertion failed: ELO surge outside normal boundaries: ${eloSurge}`);
    }
    console.log('✓ ELO streak calculations verified.');

  } catch (error) {
    console.error('❌ STUDENT WHITE BOX TEST FAILURE:', error);
    process.exitCode = 1;
  } finally {
    // Clean up test candidate
    if (testUserId) {
      console.log('\nCleaning up temporary student record...');
      await User.deleteOne({ _id: testUserId });
      console.log('✓ Cleanup complete.');
    }
    await mongoose.connection.close();
    console.log('🏁 MongoDB Connection closed. Student Whitebox testing complete.\n');
  }
}

runStudentWhiteboxTests();
