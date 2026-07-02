import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

import User from '../models/User.model.js';
import PlacementScore from '../models/PlacementScore.model.js';
import UserStreak from '../models/UserStreak.model.js';

const NEWSLETTER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Prepzo Career Roadmap Update</title>
  <style>
    body {
      background-color: #0a0c10;
      color: #e2e8f0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #0f131a;
      border: 1px solid rgba(139, 92, 246, 0.15);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #1e1b4b 0%, #090514 100%);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(139, 92, 246, 0.1);
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      letter-spacing: 2px;
      font-weight: 800;
    }
    .header h1 span {
      color: #a78bfa;
    }
    .content {
      padding: 40px 30px;
    }
    .dna-gauge {
      background: rgba(167, 139, 250, 0.05);
      border: 1px dashed rgba(167, 139, 250, 0.2);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin-bottom: 30px;
    }
    .dna-score {
      font-size: 48px;
      font-weight: 800;
      color: #a78bfa;
      margin: 10px 0;
    }
    .dna-label {
      font-size: 14px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    h3 {
      color: #ffffff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      padding-bottom: 8px;
      margin-top: 30px;
    }
    .item-list {
      list-style-type: none;
      padding: 0;
      margin: 15px 0;
    }
    .item-list li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.02);
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .critical {
      color: #ef4444;
      font-weight: bold;
    }
    .important {
      color: #f59e0b;
    }
    .match-percent {
      color: #10b981;
      font-weight: bold;
    }
    .cta-container {
      text-align: center;
      margin: 40px 0 20px 0;
    }
    .cta-button {
      background: linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      font-weight: 800;
      border-radius: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
      display: inline-block;
    }
    .footer {
      background: #020617;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #475569;
      border-top: 1px solid rgba(139, 92, 246, 0.05);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>PREP<span>ZO</span> NEWSLETTER</h1>
    </div>
    <div class="content">
      <p>Hello {{NAME}},</p>
      <p>Here is your personalized Prepzo career roadmap diagnostic and placement preparedness update for this week.</p>
      
      <div class="dna-gauge">
        <div class="dna-label">Current Placement DNA Score</div>
        <div class="dna-score">{{DNA_SCORE}} / 100</div>
        <div class="dna-label">Rating: {{DNA_GRADE}}</div>
      </div>

      <p>🔥 <strong>Consistency Streak:</strong> You currently have an active streak of <strong>{{STREAK}} days</strong>. Completing coding challenges regularly is key to maintaining your placement consistency metric.</p>

      <h3>🎯 Predicted Target Company Matches</h3>
      <p>Based on your current tech skills, mock scores, and consistency ratios, here are your matching odds for target roles:</p>
      <ul class="item-list">
        {{COMPANY_MATCHES}}
      </ul>

      <h3>🧬 Identified Skill Gaps</h3>
      <p>To qualify for elite tiers, focus on resolving these high-priority skill discrepancies:</p>
      <ul class="item-list">
        {{SKILL_GAPS}}
      </ul>

      <div class="cta-container">
        <a href="https://prepzo.ai/placement-dna" class="cta-button">Bridge Your Skill Gaps</a>
      </div>
    </div>
    <div class="footer">
      This automated career newsletter was dispatched specifically to {{EMAIL}} | Prepzo © 2026.
    </div>
  </div>
</body>
</html>
`;

const run = async () => {
  const isDryRun = process.argv.includes('--dry-run');
  
  if (!process.env.MONGODB_URI) {
    console.error('No MONGODB_URI found.');
    process.exit(1);
  }

  console.log('Connecting to database...');
  await mongoose.connect(process.env.MONGODB_URI);

  const users = await User.find({}, 'email name');
  console.log(`Found ${users.length} registered users to dispatch newsletters.`);

  const useBrevo = process.env.BREVO_API_KEY && process.env.EMAIL_FROM;

  for (const user of users) {
    // Fetch stats
    const placementScore = await PlacementScore.findOne({ user: user._id });
    const userStreak = await UserStreak.findOne({ user: user._id });

    // Format metrics
    const dnaScore = placementScore ? placementScore.overallScore : 0;
    let grade = 'N/A';
    if (dnaScore >= 85) grade = 'Elite Candidate (A)';
    else if (dnaScore >= 70) grade = 'Strong Contender (B)';
    else if (dnaScore >= 55) grade = 'Rising Star (C)';
    else if (dnaScore >= 40) grade = 'Getting Started (D)';
    else if (dnaScore > 0) grade = 'Needs Work (F)';

    const streakCount = userStreak ? userStreak.currentStreak : 0;

    // Build company matches list
    let companyMatchesHtml = '';
    if (placementScore && placementScore.companyPredictions && placementScore.companyPredictions.length > 0) {
      companyMatchesHtml = placementScore.companyPredictions.map(p => `
        <li>
          <span><strong>${p.company}</strong> (${p.tier.toUpperCase()})</span>
          <span class="match-percent">${p.matchPercentage}% match</span>
        </li>
      `).join('');
    } else {
      companyMatchesHtml = `<li><span>No target data. Complete mock trials to calculate predictions.</span></li>`;
    }

    // Build skill gaps list
    let skillGapsHtml = '';
    if (placementScore && placementScore.skillGaps && placementScore.skillGaps.length > 0) {
      skillGapsHtml = placementScore.skillGaps.map(g => `
        <li>
          <span><strong>${g.skill}</strong> (Current: ${g.currentLevel}/10, Target: ${g.requiredLevel}/10)</span>
          <span class="${g.priority === 'critical' ? 'critical' : 'important'}">${g.priority.toUpperCase()}</span>
        </li>
      `).join('');
    } else {
      skillGapsHtml = `<li><span>No skill gaps identified. Keep practice rooms active.</span></li>`;
    }

    const personalizedNewsletter = NEWSLETTER_TEMPLATE
      .replace(/{{NAME}}/g, user.name || 'Developer')
      .replace(/{{EMAIL}}/g, user.email)
      .replace(/{{DNA_SCORE}}/g, dnaScore)
      .replace(/{{DNA_GRADE}}/g, grade)
      .replace(/{{STREAK}}/g, streakCount)
      .replace(/{{COMPANY_MATCHES}}/g, companyMatchesHtml)
      .replace(/{{SKILL_GAPS}}/g, skillGapsHtml);

    if (useBrevo && !isDryRun) {
      try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
          sender: { name: 'Prepzo Career Core', email: process.env.EMAIL_FROM },
          to: [{ email: user.email, name: user.name }],
          subject: '📊 Your Weekly Prepzo Placement DNA & Career Diagnostic Update',
          htmlContent: personalizedNewsletter
        }, {
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
            'accept': 'application/json'
          }
        });
        console.log(`Sent personalized newsletter to: ${user.email}`);
      } catch (err) {
        console.error(`Failed to send newsletter to ${user.email}:`, err.message);
      }
    } else {
      console.log(`[MOCK] Dispatched newsletter to ${user.email} (DNA Score: ${dnaScore}, Streak: ${streakCount})`);
    }
  }

  console.log('🎉 Newsletter dispatch complete!');
  await mongoose.disconnect();
  process.exit(0);
};

run().catch(console.error);
