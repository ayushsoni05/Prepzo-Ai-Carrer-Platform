import axios from 'axios';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import mongoose from 'mongoose';
import User from './src/models/User.model.js';

dotenv.config();

const port = process.env.PORT || 5000;
const baseUrl = `http://localhost:${port}/api`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runStudentBlackboxTests() {
  console.log('🕵️ STARTING STUDENT PORTAL BLACK BOX INTEGRATION TESTING...');
  
  let serverProcess = null;
  let client = axios.create({
    baseURL: baseUrl,
    validateStatus: () => true
  });

  const testEmail = `qa.student-${Date.now()}@prepzo.com`;
  const testPassword = 'Password!123';
  let createdUserId = null;

  try {
    // 1. Start Server process if not running
    let serverRunning = false;
    try {
      await axios.get(`http://localhost:${port}/health`, { timeout: 1000 });
      serverRunning = true;
      console.log('ℹ️ Server is already running. Testing against active instance.');
    } catch (err) {
      console.log('ℹ️ Server is not running. Starting server process in background...');
      serverProcess = spawn('node', ['src/server.js'], {
        env: { ...process.env, PORT: port },
        stdio: 'inherit'
      });
      await sleep(9500);
    }

    // 2. Register new student candidate
    console.log('\n--- Step 1: Candidate Signup ---');
    const registerRes = await client.post('/auth/register', {
      fullName: 'Student Integration Tester',
      email: testEmail,
      phone: '9988776655',
      dateOfBirth: '2000-01-01',
      gender: 'Male',
      collegeName: 'Stanford University',
      degree: 'B.S.',
      fieldOfStudy: 'Computer Science',
      yearOfStudy: '4',
      targetRole: 'AI Engineer',
      password: testPassword
    });

    if (registerRes.status !== 201) {
      throw new Error(`Register failed: ${registerRes.status}. Data: ${JSON.stringify(registerRes.data)}`);
    }
    createdUserId = registerRes.data.data?.user?.id || registerRes.data.data?.user?._id;
    console.log(`✓ Candidate registered successfully. Test email: ${testEmail}`);

    // Login to capture session cookies
    console.log('\n--- Step 2: Login Authenticator ---');
    const loginRes = await client.post('/auth/login', {
      email: testEmail,
      password: testPassword
    });

    if (loginRes.status !== 200) {
      throw new Error(`Login failed: ${loginRes.status}`);
    }
    console.log('✓ Login response code: 200 (Success)');
    
    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      throw new Error('Assertion failed: Login did not return auth cookies');
    }
    client.defaults.headers.common['Cookie'] = cookies.join('; ');
    console.log('✓ Session cookies active.');

    // 3. Complete Onboarding
    console.log('\n--- Step 3: Complete Onboarding Flow ---');
    const onboardingRes = await client.put('/users/onboarding', {
      collegeName: 'Stanford University',
      degree: 'B.S.',
      fieldOfStudy: 'Computer Science',
      yearOfStudy: '4',
      cgpa: '3.9',
      targetRole: 'AI Engineer',
      placementTimeline: 'Within 3 Months',
      expectedCtc: '$120,000',
      preferredCompanies: ['Google', 'OpenAI', 'Stripe']
    });

    if (onboardingRes.status !== 200 || !onboardingRes.data.user) {
      throw new Error(`Onboarding failed: ${onboardingRes.status}`);
    }
    console.log('✓ Onboarding form successfully submitted. Onboarding complete.');

    // 4. Complete Initial Placement Assessment
    console.log('\n--- Step 4: Complete Placement Assessment ---');
    const assessmentRes = await client.put('/users/assessment', {
      isAssessmentComplete: true,
      placementReadinessScore: 85,
      atsScore: 78
    });
    if (assessmentRes.status !== 200 || !assessmentRes.data.user) {
      throw new Error(`Assessment completion failed: ${assessmentRes.status}`);
    }
    console.log('✓ Initial placement readiness diagnostics logged.');

    // 5. Fetch Global Leaderboards
    console.log('\n--- Step 5: Global Leaderboards API ---');
    const leaderboardRes = await client.get('/users/leaderboard/global');
    if (leaderboardRes.status !== 200) {
      throw new Error(`Leaderboard fetch failed: ${leaderboardRes.status}`);
    }
    const rankList = leaderboardRes.data.data || [];
    console.log(`✓ Global leaderboards listed successfully (${rankList.length} ranked users returned).`);

    // 6. Fetch Student Profile
    console.log('\n--- Step 6: Retrieve Candidate Profile ---');
    const profileRes = await client.get('/users/profile');
    if (profileRes.status !== 200) {
      throw new Error(`Profile fetch failed: ${profileRes.status}`);
    }
    const profile = profileRes.data.user || {};
    console.log(`✓ Profile Name: ${profile.fullName}`);
    console.log(`✓ Onboarding status: ${profile.isOnboarded ? 'Active' : 'Pending'}`);
    console.log(`✓ Placement Readiness Rating: ${profile.placementReadinessScore}`);

    console.log('\n🌟 ALL STUDENT PORTAL BLACK BOX INTEGRATION TESTS PASSED SUCCESSFULLY! 🌟');

  } catch (error) {
    console.error('\n❌ STUDENT BLACK BOX TEST FAILURE:', error.message);
    process.exitCode = 1;
  } finally {
    // Connect to database to delete temporary test user
    if (createdUserId || testEmail) {
      console.log('\nConnecting to DB for post-test cleanup...');
      try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prepzo');
        const emailFilter = testEmail;
        await User.deleteOne({ email: emailFilter });
        console.log(`✓ Cleaned up QA candidate account: ${testEmail}`);
      } catch (err) {
        console.error('Failed to clean up candidate:', err);
      } finally {
        await mongoose.connection.close();
      }
    }

    if (serverProcess) {
      console.log('\nStopping background server process...');
      serverProcess.kill('SIGTERM');
      console.log('✓ Server stopped.');
    }
    console.log('🏁 Student Integration testing finished.\n');
  }
}

runStudentBlackboxTests();
