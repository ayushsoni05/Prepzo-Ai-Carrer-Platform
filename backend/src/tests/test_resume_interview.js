import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import aiInterviewService from '../services/aiInterview.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const testResumeText = `
Name: Jane Doe
Target Role: Frontend Developer
Skills: React, JavaScript, TypeScript, CSS, HTML
Experience:
- Frontend Engineer at Tech Solutions (2024 - Present)
  * Built high-performance dashboard application using React and Tailwind CSS.
  * Optimized page load times by 30% through code splitting and image optimization.
`;

const runTests = async () => {
  console.log('Starting AI Interview Service verification tests...\n');

  console.log('--- TEST 1: Question Generation ---');
  const genResponse = await aiInterviewService.getResumeInterviewQuestions(testResumeText, 'Frontend Developer', 3);
  console.log('Success:', genResponse.success);
  if (genResponse.success) {
    console.log('Questions Generated:', genResponse.data.questions);
  } else {
    console.error('Error generating questions:', genResponse.error || genResponse.message);
  }

  console.log('\n--- TEST 2: Answer Evaluation & Cross-Questioning ---');
  if (genResponse.success && genResponse.data.questions.length > 0) {
    const firstQuestion = genResponse.data.questions[0];
    const userResponse = "I have built dashboards where I loaded chunks dynamically using React.lazy and Suspense, which helped reduce bundle size. I also optimized images using WebP format and compressed them using sharp.";
    
    const conversationHistory = [
      { sender: 'recruiter', text: firstQuestion },
      { sender: 'candidate', text: userResponse }
    ];

    const evalResponse = await aiInterviewService.evaluateResumeInterviewResponse(
      firstQuestion,
      userResponse,
      conversationHistory,
      'Frontend Developer'
    );

    console.log('Success:', evalResponse.success);
    if (evalResponse.success) {
      console.log('Evaluation Data:', JSON.stringify(evalResponse.data, null, 2));
    } else {
      console.error('Error evaluating answer:', evalResponse.error || evalResponse.message);
    }
  } else {
    console.log('Skipping Test 2: No questions generated.');
  }

  console.log('\nTests completed.');
};

runTests().catch(console.error);
