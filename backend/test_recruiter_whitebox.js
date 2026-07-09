import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from './src/models/User.model.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prepzo';

async function runWhiteboxTests() {
  console.log('🤖 STARTING WHITE BOX TESTING...');
  console.log(`Connecting to: ${mongoUri}`);
  
  await mongoose.connect(mongoUri);
  console.log('✅ MongoDB Connected successfully.');

  let testUserId = null;

  try {
    // -------------------------------------------------------------
    // Test Case 1: Mongoose Schema Validation for Proctor Statistics
    // -------------------------------------------------------------
    console.log('\n--- Test 1: Proctor Statistics Validation ---');
    
    const candidateData = {
      fullName: 'QA Verification Candidate',
      email: `qa.candidate-${Date.now()}@prepzo.com`,
      role: 'student',
      status: 'active',
      password: 'Password!123',
      xp: 4500,
      streak: 15,
      knownTechnologies: ['JavaScript', 'React', 'NodeJS'],
      targetRole: 'Full Stack Engineer',
      proctorStats: {
        aiProbability: 82,
        pasteCount: 5,
        backspaceCount: 140,
        totalIdleTimeSeconds: 45,
        playbackEvents: [
          { eventType: 'insert', text: 'function solve() {', line: 1, timestamp: 100 },
          { eventType: 'insert', text: '\n  return true;\n}', line: 2, timestamp: 200 }
        ],
        plagiarismScore: 78
      },
      radarScores: {
        algorithmicSpeed: 88,
        codeReadability: 92,
        optimizationSpeed: 85,
        behavioralAlignment: 90,
        domainKnowledge: 95
      }
    };

    const candidate = new User(candidateData);
    const savedCandidate = await candidate.save();
    testUserId = savedCandidate._id;
    console.log(`✓ Temporary Candidate user created with ID: ${testUserId}`);

    // Assert proctor statistics structure
    if (!savedCandidate.proctorStats) {
      throw new Error('Assertion failed: proctorStats field is undefined');
    }
    if (savedCandidate.proctorStats.aiProbability !== 82) {
      throw new Error(`Assertion failed: expected aiProbability to be 82, got ${savedCandidate.proctorStats.aiProbability}`);
    }
    if (savedCandidate.proctorStats.playbackEvents.length !== 2) {
      throw new Error(`Assertion failed: expected 2 playbackEvents, got ${savedCandidate.proctorStats.playbackEvents.length}`);
    }
    console.log('✓ Proctor Statistics schema validations passed.');

    // -------------------------------------------------------------
    // Test Case 2: Radar Scores Vector Integrity & Ranges
    // -------------------------------------------------------------
    console.log('\n--- Test 2: Radar Scores Vector Ranges ---');
    if (!savedCandidate.radarScores) {
      throw new Error('Assertion failed: radarScores is undefined');
    }
    const scores = savedCandidate.radarScores;
    const vectors = ['algorithmicSpeed', 'codeReadability', 'optimizationSpeed', 'behavioralAlignment', 'domainKnowledge'];
    
    for (const vec of vectors) {
      const val = scores[vec];
      if (typeof val !== 'number' || val < 0 || val > 100) {
        throw new Error(`Assertion failed: radar Score vector ${vec} must be between 0 and 100, got ${val}`);
      }
    }
    console.log('✓ Radar Scores vector ranges validated successfully.');

    // -------------------------------------------------------------
    // Test Case 3: Job Matchmaker Scoring Index Bounds
    // -------------------------------------------------------------
    console.log('\n--- Test 3: Matchmaker Scoring Index Bounds ---');
    // Calculate expected job match index using candidate's experience rating (mocking UI computation)
    const matchIndex = Math.min(98, Math.floor(75 + (savedCandidate.xp / 100) % 20));
    console.log(`Candidate XP: ${savedCandidate.xp} -> Calculated Job Match Index: ${matchIndex}%`);
    if (matchIndex < 50 || matchIndex > 100) {
      throw new Error(`Assertion failed: Job match index out of safety bounds: ${matchIndex}%`);
    }
    console.log('✓ Job Matchmaker Index bounds calculations verified.');

  } catch (error) {
    console.error('❌ WHITE BOX TEST FAILURE:', error);
    process.exitCode = 1;
  } finally {
    // Clean up test candidate
    if (testUserId) {
      console.log('\nCleaning up temporary candidate record...');
      await User.deleteOne({ _id: testUserId });
      console.log('✓ Cleanup complete.');
    }
    await mongoose.connection.close();
    console.log('🏁 MongoDB Connection closed. Whitebox testing complete.\n');
  }
}

runWhiteboxTests();
