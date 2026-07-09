import axios from 'axios';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import mongoose from 'mongoose';
import User from './src/models/User.model.js';

dotenv.config();

const port = process.env.PORT || 5000;
const baseUrl = `http://localhost:${port}/api`;

// Helper to wait
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runBlackboxTests() {
  console.log('🕵️ STARTING BLACK BOX INTEGRATION TESTING...');
  
  let serverProcess = null;
  let client = axios.create({
    baseURL: baseUrl,
    validateStatus: () => true // Don't throw on non-2xx codes
  });

  try {
    // 1. Check if server is already running, if not start it
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
      // Wait for server to boot up
      await sleep(3500);
    }

    // 2. Perform Login as Recruiter
    console.log('\n--- Step 1: Login Authenticator ---');
    const loginRes = await client.post('/auth/login', {
      email: 'recruiter@prepzo.com',
      password: 'Recruiter@123'
    });

    if (loginRes.status !== 200) {
      throw new Error(`Login failed with status: ${loginRes.status}. Data: ${JSON.stringify(loginRes.data)}`);
    }
    console.log('✓ Login response code: 200 (Success)');
    
    // Save cookies for authenticated session
    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      throw new Error('Assertion failed: No auth cookies returned from login');
    }
    console.log('✓ Auth token cookies captured.');

    // Attach cookies to subsequent requests
    client.defaults.headers.common['Cookie'] = cookies.join('; ');

    // 3. Fetch Candidates Pipeline
    console.log('\n--- Step 2: Fetch Candidates Listing ---');
    const candidatesRes = await client.get('/recruiters/candidates');
    if (candidatesRes.status !== 200) {
      throw new Error(`Failed to list candidates: ${candidatesRes.status}`);
    }
    
    const candidates = candidatesRes.data.data?.candidates || [];
    console.log(`✓ Fetched ${candidates.length} candidates in recruitment funnel.`);
    if (candidates.length === 0) {
      throw new Error('Assertion failed: Candidate pool is empty. Please run seeder first.');
    }

    const testCandidate = candidates[0];
    console.log(`✓ Selected candidate for further endpoints audit: ${testCandidate.fullName} (${testCandidate._id})`);

    // 4. Test notes saving API
    console.log('\n--- Step 3: Candidate Notes Update API ---');
    const notesRes = await client.put(`/recruiters/candidates/${testCandidate._id}/notes`, {
      notes: 'Verified candidate credentials via E2E test runner.'
    });
    if (notesRes.status !== 200 || !notesRes.data.success) {
      throw new Error(`Failed to save notes: ${notesRes.status}`);
    }
    console.log('✓ Candidate notes successfully persisted in DB.');

    // 5. Test Outreach AI pitch compilation API
    console.log('\n--- Step 4: AI Outreach Pitch Generator API ---');
    const outreachRes = await client.post(`/recruiters/candidates/${testCandidate._id}/outreach-draft`);
    if (outreachRes.status !== 200 || !outreachRes.data.success) {
      throw new Error(`Failed to generate outreach pitch: ${outreachRes.status}`);
    }
    
    const { subject, body } = outreachRes.data.data || {};
    if (!subject || !body) {
      throw new Error('Assertion failed: outreach-draft subject or body is missing');
    }
    console.log(`✓ Outreach Pitch Subject: "${subject}"`);
    console.log(`✓ Outreach Pitch Body generated (${body.length} characters)`);

    // 6. Test Interview Scheduling API
    console.log('\n--- Step 5: Schedule Interview API ---');
    const scheduleRes = await client.post(`/recruiters/candidates/${testCandidate._id}/schedule`, {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      format: 'Coding',
      interviewer: 'QA Automation Bot'
    });
    if (scheduleRes.status !== 200 || !scheduleRes.data.success) {
      throw new Error(`Failed to schedule interview: ${scheduleRes.status}`);
    }
    console.log('✓ Interview scheduled successfully.');

    // 7. Test ELO Battles History fetching API
    console.log('\n--- Step 6: Arena Battle History API ---');
    const battlesRes = await client.get(`/recruiters/candidates/${testCandidate._id}/battles`);
    if (battlesRes.status !== 200) {
      throw new Error(`Failed to get ELO battles: ${battlesRes.status}`);
    }
    console.log(`✓ Successfully retrieved arena match history list (${battlesRes.data?.data?.length || 0} matches).`);

    console.log('\n🌟 ALL BLACK BOX INTEGRATION TESTS PASSED SUCCESSFULLY! 🌟');

  } catch (error) {
    console.error('\n❌ BLACK BOX TEST FAILURE:', error.message);
    process.exitCode = 1;
  } finally {
    // Kill the background server if we launched it
    if (serverProcess) {
      console.log('\nStopping background server process...');
      serverProcess.kill('SIGTERM');
      console.log('✓ Server stopped.');
    }
    console.log('🏁 Integration testing finished.\n');
  }
}

runBlackboxTests();
