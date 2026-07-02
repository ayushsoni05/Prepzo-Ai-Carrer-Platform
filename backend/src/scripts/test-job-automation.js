import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { jobAutomator } from '../services/jobAutomator.service.js';
import JobAutomationConfig from '../models/JobAutomationConfig.model.js';
import JobAutomationLog from '../models/JobAutomationLog.model.js';
import Job from '../models/Job.model.js';
import Company from '../models/Company.model.js';
import User from '../models/User.model.js';
import Notification from '../models/Notification.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runTest() {
  try {
    console.log('🚀 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    let systemUser = await User.findOne({ role: 'admin' });
    const defaultAdminId = systemUser ? systemUser._id : new mongoose.Types.ObjectId('69a590f221db2e23dc9e1e11');

    // Initialize or get config
    console.log('⚙️ Loading Config...');
    const config = await JobAutomationConfig.getOrCreate();
    
    // Set parameters for quick test run
    config.isEnabled = true;
    config.autoApproveJobs = true; // Auto publish for testing match matching and notifications
    config.maxJobsPerRun = 2; // Only fetch 2 to run fast
    
    // Use smaller/highly reliable sources for testing
    config.rssFeeds = ['https://weworkremotely.com/categories/remote-programming-jobs.rss'];
    config.searchQueries = ['Junior Node js developer hiring India 2026'];
    
    await config.save();
    console.log('✅ Test configuration applied.');

    // 1. Create a matching student user
    console.log('👤 Creating temporary matching student user...');
    await User.deleteMany({ email: 'automation.student@prepzo.com' });
    const mockStudent = await User.create({
      fullName: 'Ayush Soni',
      email: 'automation.student@prepzo.com',
      password: 'TestPassword123!',
      role: 'student',
      isOnboarded: true,
      accountStatus: 'active',
      targetRole: 'Full Stack Developer',
      knownTechnologies: ['React', 'WordPress', 'Shopify', 'PHP', 'CakePHP'],
      yearOfStudy: '4',
      fieldOfStudy: 'Computer Science',
      degree: 'B.Tech',
      collegeName: 'Test College',
      gender: 'Male',
      dateOfBirth: new Date('2000-01-01'),
      phone: '9999999999'
    });
    console.log(`✅ Temporary student created: ${mockStudent.fullName} (${mockStudent.email})`);

    // Clean up past job scrapes from this test script to ensure fresh run parses again
    // (since it skips already existing applicationLinks)
    await Job.deleteMany({ postedBy: defaultAdminId });

    // Run the automated job system
    console.log('🏃 Starting automated run...');
    const logDoc = await jobAutomator.runAutomatedJobSystem();
    
    if (logDoc) {
      console.log('\n=========================================');
      console.log(`📊 Automation Run Result Summary:`);
      console.log(`Status: ${logDoc.status}`);
      console.log(`Jobs Scraped: ${logDoc.jobsFoundCount}`);
      console.log(`Jobs Added: ${logDoc.jobsAddedCount}`);
      console.log(`Companies Created: ${logDoc.companiesCreatedCount}`);
      console.log(`Notifications Sent: ${logDoc.notificationsSentCount}`);
      console.log(`Expired Closed: ${logDoc.jobsExpiredClosedCount}`);
      console.log(`Errors: ${logDoc.error || 'None'}`);
      console.log('=========================================');

      console.log('\n📜 Execution Logs:');
      logDoc.logs.forEach(log => {
        console.log(`[${log.timestamp.toISOString()}] ${log.message}`);
      });
      console.log('=========================================');

      // Let's verify creations
      const newlyAddedJobs = await Job.find({ postedBy: defaultAdminId }).sort({ createdAt: -1 }).populate('company');
      console.log('\n🆕 Newly Added Jobs:');
      for (const job of newlyAddedJobs) {
        console.log(`- "${job.title}" at "${job.company.name}" (Role Category: ${job.roleCategory})`);
        console.log(`  Skills: ${job.requiredSkills.map(s => s.skill).join(', ')}`);
        
        // Let's test the matching query manually for this job
        const matchQuery = {
          role: 'student',
          isOnboarded: true,
          accountStatus: 'active',
          $or: [
            { targetRole: { $regex: new RegExp(`^${job.roleCategory.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i') } },
            { knownTechnologies: { $in: job.requiredSkills.map(s => s.skill) } }
          ]
        };
        console.log('  Debug query:', JSON.stringify(matchQuery, null, 2));
        const matches = await User.find(matchQuery);
        console.log(`  Manual matches count: ${matches.length}`);
        if (matches.length > 0) {
          console.log(`  Matched user names: ${matches.map(m => m.fullName).join(', ')}`);
        }
      }

      // Let's verify notifications sent to our test user
      const matchedNotifications = await Notification.find({ recipient: mockStudent._id }).populate('recipient');
      console.log('\n🔔 Dispatched matched notifications:');
      matchedNotifications.forEach(notif => {
        console.log(`- Recipient: ${notif.recipient?.fullName} (${notif.recipient?.email})`);
        console.log(`  Title: ${notif.title}`);
        console.log(`  Message: ${notif.message}`);
      });
    } else {
      console.log('❌ Automated job run did not produce a log document.');
    }

    // Clean up mock student & notifications
    console.log('🧹 Cleaning up temporary student, notifications and test data...');
    await Notification.deleteMany({ recipient: mockStudent._id });
    await User.deleteMany({ email: 'automation.student@prepzo.com' });
    await Job.deleteMany({ postedBy: defaultAdminId });

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    console.log('🔌 Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('✅ Disconnected. Exit.');
    process.exit(0);
  }
}

runTest();
