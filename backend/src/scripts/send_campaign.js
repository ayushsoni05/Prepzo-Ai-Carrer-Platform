import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const CAMPAIGN_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prepzo - Accelerate Your Coding Career</title>
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
      border: 1px solid rgba(6, 182, 212, 0.15);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 1px solid rgba(6, 182, 212, 0.1);
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 32px;
      letter-spacing: 2px;
      font-weight: 800;
    }
    .header h1 span {
      color: #06b6d4;
    }
    .content {
      padding: 40px 30px;
    }
    .tagline {
      font-size: 18px;
      color: #06b6d4;
      font-weight: 600;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.8;
      font-size: 15px;
      color: #94a3b8;
    }
    .features {
      margin: 30px 0;
      border-left: 3px solid #06b6d4;
      padding-left: 20px;
    }
    .feature-item {
      margin-bottom: 15px;
    }
    .feature-title {
      font-weight: bold;
      color: #f1f5f9;
    }
    .cta-container {
      text-align: center;
      margin: 40px 0 20px 0;
    }
    .cta-button {
      background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 16px 32px;
      font-weight: 800;
      border-radius: 30px;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
      display: inline-block;
    }
    .footer {
      background: #020617;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #475569;
      border-top: 1px solid rgba(6, 182, 212, 0.05);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>PREP<span>ZO</span></h1>
    </div>
    <div class="content">
      <div class="tagline">The Flight Simulator for Landing Your Dream Coding Job.</div>
      <p>Hello {{NAME}},</p>
      <p>Why face real technical interviews unprepared when you can crash our simulator for free? Prepzo is the ultimate career diagnostic ecosystem built to stress-test your skills and help you stand out to hiring managers.</p>
      
      <div class="features">
        <div class="feature-item">
          <span class="feature-title">⚡ Llama-3.1 Adaptive Testing:</span> Dynamic technical assessments that scale difficulty based on your speed and performance.
        </div>
        <div class="feature-item">
          <span class="feature-title">🛡️ Smart Proctoring Integrity:</span> Practice in environments that mimic real-world online code evaluation rules.
        </div>
        <div class="feature-item">
          <span class="feature-title">🧬 Placement DNA Scorecard:</span> Map your exact skills gaps, confidence indexes, and matching odds against top hiring companies.
        </div>
      </div>
      
      <p>Get instant access to AI mentors, interactive roadmaps, collaborative coding workspaces, and resume enhancers in a single premium dashboard.</p>
      
      <div class="cta-container">
        <a href="https://prepzo.ai" class="cta-button">Access Dashboard Now</a>
      </div>
    </div>
    <div class="footer">
      This email was sent to {{EMAIL}} | Prepzo © 2026. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

const run = async () => {
  const isDryRun = process.argv.includes('--dry-run');
  const leadsPath = path.join(__dirname, '../../../data/leads.json');
  
  let targetAudience = [];
  
  // 1. Load online/scraped leads
  if (fs.existsSync(leadsPath)) {
    try {
      const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      targetAudience = [...targetAudience, ...leads];
      console.log(`Loaded ${leads.length} scraped leads from data/leads.json.`);
    } catch (e) {
      console.error('Error reading leads.json:', e.message);
    }
  }

  // 2. Query registered users from Database
  if (process.env.MONGODB_URI) {
    try {
      console.log('Connecting to MongoDB database...');
      await mongoose.connect(process.env.MONGODB_URI);
      const users = await User.find({}, 'email name');
      const userLeads = users.map(u => ({
        email: u.email,
        name: u.name || 'Developer',
        segment: 'Registered User'
      }));
      targetAudience = [...targetAudience, ...userLeads];
      console.log(`Retrieved ${users.length} registered users from database.`);
    } catch (e) {
      console.log('Database connection failed. Proceeding with leads file data only.');
    } finally {
      await mongoose.disconnect();
    }
  } else {
    console.log('No MONGODB_URI found in env. Operating on leads file only.');
  }

  // Deduplicate by email
  const uniqueAudience = Array.from(new Map(targetAudience.map(item => [item.email, item])).values());
  console.log(`Target audience compiled. Total unique recipients: ${uniqueAudience.length}`);

  if (uniqueAudience.length === 0) {
    console.log('No recipients found. Exiting.');
    process.exit(0);
  }

  const useBrevo = process.env.BREVO_API_KEY && process.env.EMAIL_FROM;

  if (useBrevo && !isDryRun) {
    console.log('Configured Brevo REST API dispatcher.');
  } else {
    console.log('Operating in DRY-RUN/MOCK delivery mode. All emails will be printed to logs.');
  }

  const logsDir = path.join(__dirname, '../../../logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  const logFile = path.join(logsDir, 'campaign_deliveries.log');
  fs.writeFileSync(logFile, `=== Prepzo Ad Campaign Delivery Log: ${new Date().toISOString()} ===\n\n`);

  for (const recipient of uniqueAudience) {
    const personalizedHtml = CAMPAIGN_HTML
      .replace(/{{NAME}}/g, recipient.name)
      .replace(/{{EMAIL}}/g, recipient.email);

    if (useBrevo && !isDryRun) {
      try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
          sender: { name: 'Prepzo Team', email: process.env.EMAIL_FROM },
          to: [{ email: recipient.email, name: recipient.name }],
          subject: '⚡ Accelerate Your Coding Career - Meet Prepzo',
          htmlContent: personalizedHtml
        }, {
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
            'accept': 'application/json'
          }
        });
        console.log(`Sent campaign email via Brevo REST API to: ${recipient.email}`);
      } catch (err) {
        const errMsg = err.response && err.response.data ? JSON.stringify(err.response.data) : err.message;
        console.error(`Failed to send email to ${recipient.email}:`, errMsg);
      }
    } else {
      const logEntry = `To: ${recipient.name} <${recipient.email}>\nSegment: ${recipient.segment}\nSubject: ⚡ Accelerate Your Coding Career - Meet Prepzo\nBody Snippet: "Hello ${recipient.name}, why face real..."\n----------------------------------------\n`;
      fs.appendFileSync(logFile, logEntry);
      console.log(`[MOCK] Logged campaign mail delivery to ${recipient.email}`);
    }
  }

  console.log(`\n🎉 Campaign delivery task complete! All mock records saved to ${logFile}`);
  process.exit(0);
};

run().catch(console.error);
