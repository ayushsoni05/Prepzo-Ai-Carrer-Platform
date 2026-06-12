import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.model.js';
import ShadowInterviewSession from '../models/ShadowInterviewSession.model.js';
import {
  startShadowInterview,
  sendShadowInterviewMessage,
  completeShadowInterview
} from '../controllers/shadowInterview.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the project directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runTest() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // Find test student
    const student = await User.findOne({ email: 'test.student@example.com' });
    if (!student) {
      console.error('❌ Error: Test student test.student@example.com not found!');
      process.exit(1);
    }
    console.log(`Found test user: ${student.fullName} (${student._id})`);

    // Mock Express request and response objects
    const startReq = {
      user: student,
      body: {
        problemId: 'two-sum',
        recruiterPersonality: 'heather'
      }
    };

    let responseData = null;
    const dummyRes = {
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = data;
        responseData = data;
        return this;
      },
      statusCode: 200
    };

    console.log('\n--- 1. TESTING startShadowInterview ---');
    await startShadowInterview(startReq, dummyRes);

    if (!responseData || !responseData.success) {
      console.error('❌ Failed startShadowInterview:', responseData);
      process.exit(1);
    }
    const { session, problem } = responseData.data;
    console.log('✅ Session initialized successfully!');
    console.log('Session ID:', session._id);
    console.log('Problem Title:', problem.title);
    console.log('Recruiter Greeting:', session.conversationHistory[0].text);

    console.log('\n--- 2. TESTING sendShadowInterviewMessage ---');
    const msgReq = {
      user: student,
      body: {
        sessionId: session._id,
        message: "Hi, basically I am going to use a hash map, um, to solve this. We can iterate through the array once. For each element, we check if the target minus the current element exists in the hash map, like, we do a lookup. If it does, we return those index values. Otherwise, we add the current element and its index to the map. Actually, this gives us O(N) time complexity.",
        code: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) {\n      return [map.get(diff), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}"
      }
    };
    responseData = null;
    await sendShadowInterviewMessage(msgReq, dummyRes);

    if (!responseData || !responseData.success) {
      console.error('❌ Failed sendShadowInterviewMessage:', responseData);
      process.exit(1);
    }
    const stepData = responseData.data;
    console.log('✅ Step processed successfully!');
    console.log('Recruiter Response:', stepData.session.conversationHistory[stepData.session.conversationHistory.length - 1].text);
    console.log('Detected Complexity Evaluation:', stepData.evaluation);
    console.log('Coaching Tip:', stepData.coachingTip);
    console.log('Words Per Minute:', stepData.session.speechMetrics.wordsPerMinute);
    console.log('Filler Words Count:', stepData.session.speechMetrics.fillerWordsCount);
    console.log('Detected Fillers List:', stepData.session.speechMetrics.detectedFillers);

    console.log('\n--- 3. TESTING completeShadowInterview ---');
    const completeReq = {
      user: student,
      body: {
        sessionId: session._id,
        code: msgReq.body.code
      }
    };
    responseData = null;
    await completeShadowInterview(completeReq, dummyRes);

    if (!responseData || !responseData.success) {
      console.error('❌ Failed completeShadowInterview:', responseData);
      process.exit(1);
    }
    const finalSession = responseData.data;
    console.log('✅ Interview completed and evaluated!');
    console.log('Code Score:', finalSession.overallEvaluation.codeScore);
    console.log('Communication Score:', finalSession.overallEvaluation.communicationScore);
    console.log('AI Feedback Summary:', finalSession.overallEvaluation.feedbackSummary);

    // Clean up test data
    console.log('\nCleaning up test session from DB...');
    await ShadowInterviewSession.deleteOne({ _id: session._id });
    console.log('Cleaned.');

    console.log('\n🎉 ALL TESTS PASSED!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

runTest();
