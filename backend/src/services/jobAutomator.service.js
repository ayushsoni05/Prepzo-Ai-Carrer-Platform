import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Job from '../models/Job.model.js';
import Company from '../models/Company.model.js';
import User from '../models/User.model.js';
import Notification from '../models/Notification.model.js';
import JobAutomationConfig from '../models/JobAutomationConfig.model.js';
import JobAutomationLog from '../models/JobAutomationLog.model.js';

dotenv.config();

let genAI = null;
let openRouter = null;

function initAI() {
  if (!genAI && process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key') {
    try {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
      console.error('Failed to initialize direct Gemini AI:', e);
    }
  }
  if (!openRouter && process.env.OPENROUTER_API_KEY) {
    try {
      openRouter = new OpenAI({
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': 'https://prepzo-ai-career-platform.vercel.app/',
          'X-Title': 'Prepzo AI Career Platform',
        },
      });
    } catch (e) {
      console.error('Failed to initialize OpenRouter:', e);
    }
  }
}

class JobAutomatorService {
  constructor() {
    this.isRunning = false;
    this.intervalId = null;
  }

  /**
   * Start the daily automated job system loop
   */
  start() {
    // Prevent running loop in production serverless environments to avoid function timeouts
    if (process.env.NODE_ENV === 'production') {
      console.log('🌐 Production Mode: Automated Job Service daemon bypassed. Run manually or via external cron.');
      return;
    }

    if (this.intervalId) return;

    console.log('🤖 Job Automation Service started.');
    
    // Run once immediately (after 10s cooldown to let DB/Server stabilize)
    setTimeout(() => {
      this.runAutomatedJobSystem().catch(err => console.error('Error in initial Job Automation run:', err));
    }, 10000);

    // Schedule to run every 24 hours
    this.intervalId = setInterval(() => {
      this.runAutomatedJobSystem().catch(err => console.error('Error in scheduled Job Automation run:', err));
    }, 24 * 60 * 60 * 1000);
  }

  /**
   * Stop the loop
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('🔌 Job Automation Service stopped.');
    }
  }

  /**
   * Main orchestrator function for the Automated Job System
   */
  async runAutomatedJobSystem() {
    if (this.isRunning) {
      console.warn('⚠️ Job automation run already in progress. Skipping.');
      return null;
    }

    this.isRunning = true;
    const logDoc = await JobAutomationLog.create({
      status: 'running',
      startTime: new Date(),
      logs: [{ message: 'Job Automation run initialized.' }],
    });

    const addLog = async (message) => {
      console.log(`[JobAutomation] ${message}`);
      await JobAutomationLog.findByIdAndUpdate(logDoc._id, {
        $push: { logs: { message } },
      });
    };

    try {
      const config = await JobAutomationConfig.getOrCreate();
      if (!config.isEnabled) {
        await addLog('System is disabled in configuration. Aborting.');
        logDoc.status = 'success';
        logDoc.endTime = new Date();
        await logDoc.save();
        this.isRunning = false;
        return logDoc;
      }

      // Step 1: Scrape & Parse New Jobs
      await addLog('Starting Scrape & Parse phase...');
      const scrapeResult = await this.scrapeAndParseNewJobs(config, addLog);
      
      logDoc.jobsFoundCount = scrapeResult.found;
      logDoc.jobsAddedCount = scrapeResult.added;
      logDoc.companiesCreatedCount = scrapeResult.companiesCreated;
      logDoc.notificationsSentCount = scrapeResult.notificationsSent;
      await logDoc.save();

      // Step 2: Cleanup Expired Jobs
      await addLog('Starting Cleanup Expired Jobs phase...');
      const expiredCount = await this.cleanupExpiredJobs(addLog);
      logDoc.jobsExpiredClosedCount = expiredCount;

      // Finish Run
      logDoc.status = 'success';
      logDoc.endTime = new Date();
      await logDoc.save();

      // Update Config lastRunTime
      config.lastRunTime = new Date();
      await config.save();

      await addLog(`Job Automation run completed successfully. Added: ${scrapeResult.added} jobs, Closed: ${expiredCount} expired jobs.`);
    } catch (err) {
      console.error('Error in Job Automation:', err);
      logDoc.status = 'failed';
      logDoc.error = err.message;
      logDoc.endTime = new Date();
      await logDoc.save();
      await addLog(`Job Automation run failed. Error: ${err.message}`);
    } finally {
      this.isRunning = false;
    }

    return logDoc;
  }

  /**
   * Fetches RSS feeds and queries search engines to gather job URLs,
   * then extracts details using AI and registers them in the database.
   */
  async scrapeAndParseNewJobs(config, addLog) {
    let urlsToScrape = [];
    const maxLimit = Math.max(config.maxJobsPerRun || 25, 25);

    // 1. Gather URLs from RSS Feeds
    for (const feedUrl of config.rssFeeds) {
      try {
        await addLog(`Fetching RSS Feed: ${feedUrl}`);
        const response = await axios.get(feedUrl, {
          timeout: 10000,
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PrepzoAI/1.0' },
        });
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        $('item').slice(0, 30).each((i, el) => {
          const title = $(el).find('title').text();
          const link = $(el).find('link').text();
          const description = $(el).find('description').text();
          if (link) {
            urlsToScrape.push({ 
              url: link.trim(), 
              source: 'rss', 
              hintTitle: title,
              hintDescription: description 
            });
          }
        });
      } catch (err) {
        await addLog(`Error fetching RSS feed ${feedUrl}: ${err.message}`);
      }
    }

    // 2. Gather URLs from DuckDuckGo Web Search
    for (const query of config.searchQueries) {
      try {
        await addLog(`Querying Web Search for: "${query}"`);
        const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
        const response = await axios.get(searchUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        const $ = cheerio.load(response.data);
        
        $('a.result__url').slice(0, 15).each((i, el) => {
          const href = $(el).attr('href');
          if (href) {
            // DuckDuckGo redirects links sometimes, clean them up
            let cleanUrl = href;
            if (href.includes('uddg=')) {
              const urlParam = new URL(href, 'https://duckduckgo.com').searchParams.get('uddg');
              if (urlParam) cleanUrl = decodeURIComponent(urlParam);
            }
            urlsToScrape.push({ url: cleanUrl.trim(), source: 'search' });
          }
        });
      } catch (err) {
        await addLog(`Error querying search for "${query}": ${err.message}`);
      }
    }

    // De-duplicate URLs and filter out already scraped ones
    const uniqueMap = new Map();
    for (const item of urlsToScrape) {
      uniqueMap.set(item.url, item);
    }
    const rawCandidates = Array.from(uniqueMap.values());
    await addLog(`Discovered ${rawCandidates.length} total raw candidates. Pre-filtering already scraped jobs...`);

    // Pre-filter already existing jobs to save resources and time
    const candidateUrls = [];
    for (const cand of rawCandidates) {
      const exists = await Job.exists({ applicationLink: cand.url });
      if (!exists) {
        candidateUrls.push(cand);
      }
    }
    await addLog(`Found ${candidateUrls.length} new candidates to process.`);

    let addedCount = 0;
    let foundCount = 0;
    let companiesCreatedCount = 0;
    let notificationsSentCount = 0;

    // Default Admin user for attribution
    let systemUser = await User.findOne({ role: 'admin' });
    const defaultAdminId = systemUser ? systemUser._id : new mongoose.Types.ObjectId('69a590f221db2e23dc9e1e11');

    // Concurrency queue processing worker
    const processCandidate = async (item) => {
      if (addedCount >= maxLimit) return;

      const { url } = item;
      try {
        foundCount++;
        await addLog(`Processing: ${url}`);
        
        let pageText = "";
        if (item.source === 'rss' && item.hintDescription) {
          // Direct RSS parsing payload usage: completely bypasses Cloudflare blocks and network time!
          const $desc = cheerio.load(item.hintDescription);
          pageText = `Job Title: ${item.hintTitle || ''}\nDescription Summary: ${$desc.text().replace(/\s+/g, ' ').trim()}`;
        } else {
          // Web search items are fetched with a short timeout
          pageText = await this.fetchAndCleanPageText(url);
        }

        if (!pageText || pageText.length < 100) {
          await addLog(`Could not retrieve meaningful text for: ${url}. Skipping.`);
          return;
        }

        // Parse with AI
        await addLog(`Parsing details using AI for: ${url}...`);
        const aiOutput = await this.parseJobDetailsWithAI(pageText, url);
        if (!aiOutput || !aiOutput.job || !aiOutput.company) {
          await addLog(`AI failed to parse details for: ${url}. Skipping.`);
          return;
        }

        const normalizedOutput = this.normalizeParsedData(aiOutput);
        if (!normalizedOutput.job || !normalizedOutput.company) {
          await addLog(`Normalization failed for: ${url}. Skipping.`);
          return;
        }

        // Save company
        const companyName = normalizedOutput.company.name;
        let companyObj = await Company.findOne({ name: { $regex: new RegExp(`^${companyName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i') } });
        
        if (!companyObj) {
          try {
            await addLog(`Creating new Company: ${companyName}`);
            companyObj = await Company.create({
              ...normalizedOutput.company,
              status: 'approved',
              addedBy: defaultAdminId,
              logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=random&size=200`
            });
            companiesCreatedCount++;
          } catch (createErr) {
            companyObj = await Company.findOne({ name: { $regex: new RegExp(`^${companyName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i') } });
            if (!companyObj) throw createErr;
          }
        } else {
          if (companyObj.hiringStatus !== 'actively_hiring') {
            companyObj.hiringStatus = 'actively_hiring';
            await companyObj.save();
          }
        }

        // Save Job
        const isApproved = config.autoApproveJobs !== false;
        const jobObj = await Job.create({
          ...normalizedOutput.job,
          company: companyObj._id,
          applicationLink: url,
          status: isApproved ? 'active' : 'draft',
          isApproved: isApproved,
          postedBy: defaultAdminId,
          approvedBy: isApproved ? defaultAdminId : undefined,
          approvedAt: isApproved ? new Date() : undefined,
        });

        // Update company job count
        const jobCount = await Job.countDocuments({ company: companyObj._id });
        companyObj.jobCount = jobCount;
        await companyObj.save();

        addedCount++;
        await addLog(`✅ Created Job: "${jobObj.title}" at "${companyName}" (Status: ${jobObj.status})`);

        // Trigger matches & notifications if job is active/approved
        if (isApproved) {
          const sentCount = await this.dispatchMatchingNotifications(jobObj, companyObj, addLog);
          notificationsSentCount += sentCount;
        }
      } catch (err) {
        await addLog(`Failed to process job at URL ${url}. Error: ${err.message}`);
      }
    };

    // Concurrency Worker Pool Setup
    const concurrency = 4;
    const queue = [...candidateUrls];
    const workers = Array(concurrency).fill(null).map(async () => {
      while (queue.length > 0) {
        if (addedCount >= maxLimit) break;
        const item = queue.shift();
        if (!item) break;
        await processCandidate(item);
      }
    });

    await Promise.all(workers);

    return {
      found: foundCount,
      added: addedCount,
      companiesCreated: companiesCreatedCount,
      notificationsSent: notificationsSentCount,
    };
  }

  /**
   * Fetches the web page content, strips styles, scripts, navigation, and footer blocks
   * to extract raw text content optimized for LLM token usage.
   */
  async fetchAndCleanPageText(url) {
    try {
      const response = await axios.get(url, {
        timeout: 3000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
      });
      const $ = cheerio.load(response.data);

      // Strip out junk elements
      $('script, style, iframe, noscript, nav, footer, header, svg, path, button, form, input, link').remove();

      // Extract text content
      let rawText = $('body').text() || $('html').text();
      
      // Clean up whitespace
      rawText = rawText
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .trim();

      // Return truncated string to fit LLM window context
      return rawText.slice(0, 8000);
    } catch (e) {
      console.warn(`Error fetching URL: ${url}`, e.message);
      return null;
    }
  }

  /**
   * Calls the Gemini API to analyze page text and return a structured JSON response
   */
  async parseJobDetailsWithAI(pageText, pageUrl) {
    const prompt = `
    You are an expert recruitment parser AI. Analyse the following raw text content extracted from a job posting at URL: "${pageUrl}".
    Extract the details and return a single valid JSON object representing the job posting and company profile.

    Do not include any markdown comments, explanation, or codeblocks. Return only the raw JSON.

    CRITICAL RULES FOR VALUES:
    - job.jobType must be one of: "full_time", "part_time", "internship", "contract", "freelance"
    - job.workMode must be one of: "remote", "onsite", "hybrid" (detect this based on locations or text)
    - job.experienceLevel must be one of: "fresher", "entry", "mid", "senior", "lead", "executive"
    - job.department must be one of: "Engineering", "Product", "Design", "Data Science", "DevOps", "QA", "Security", "Marketing", "Sales", "HR", "Finance", "Operations", "Customer Support", "Other"
    - job.roleCategory must be one of: "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Data Analyst", "ML Engineer", "DevOps Engineer", "Cloud Engineer", "QA Engineer", "Product Manager", "UI/UX Designer", "System Administrator", "Network Engineer", "Security Engineer", "Technical Writer", "Business Analyst", "Project Manager", "Other"
    - company.industry must be one of: "Information Technology", "Software Development", "E-commerce", "Finance & Banking", "Consulting", "Healthcare", "Education", "Manufacturing", "Telecommunications", "Media & Entertainment", "Automotive", "Aerospace", "Energy", "Retail", "Hospitality", "Real Estate", "Other"
    - company.companyType must be one of: "Product", "Service", "Startup", "MNC", "Government", "PSU", "Other"
    - company.companySize must be one of: "1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5000+"
    - Normalize salary numbers to INR (Indian Rupees) yearly. e.g. 10 LPA is 1000000 min and 1200000 max. If no salary info is found, use min: 400000, max: 800000, isNegotiable: true.
    - requiredSkills must be an array of objects containing: { skill: "Name", importance: "required" | "preferred" | "nice_to_have" }
    - locations must be an array of objects: { city: "City Name", state: "State Name", country: "Country Name (default India)" }

    Page Content:
    ${pageText}

    Expected JSON Format:
    {
      "company": {
        "name": "Company Name",
        "industry": "Software Development",
        "companyType": "Startup",
        "companySize": "51-200",
        "tagline": "A short company tagline",
        "description": "Short description of what the company does",
        "website": "https://companywebsite.com",
        "headquarters": { "city": "Bengaluru", "state": "Karnataka", "country": "India" }
      },
      "job": {
        "title": "Job Title",
        "description": "Full job description including responsibilities",
        "responsibilities": ["Responsibility 1", "Responsibility 2"],
        "jobType": "full_time",
        "workMode": "remote",
        "experienceLevel": "entry",
        "experienceRequired": { "min": 1, "max": 3 },
        "requiredSkills": [
          { "skill": "React", "importance": "required" },
          { "skill": "Node.js", "importance": "required" }
        ],
        "preferredSkills": ["TypeScript", "AWS"],
        "educationRequired": {
          "degree": "Bachelor's",
          "fields": ["Computer Science", "Information Technology"]
        },
        "salary": {
          "min": 800000,
          "max": 1500000,
          "currency": "INR",
          "period": "yearly",
          "isNegotiable": true
        },
        "locations": [
          { "city": "Bengaluru", "state": "Karnataka", "country": "India" }
        ],
        "department": "Engineering",
        "roleCategory": "Frontend Developer",
        "benefits": ["Medical Insurance", "Paid Time Off"],
        "perks": ["Free Snacks", "Gym Membership"],
        "tags": ["React", "Frontend", "Developer"]
      }
    }
    `;

    // Initialize AI engines dynamically
    initAI();

    // Try Gemini Primary
    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: { responseMimeType: 'application/json' },
        });
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text().trim());
      } catch (err) {
        console.warn('Gemini primary extraction failed, falling back to OpenRouter...', err.message);
      }
    }

    // Try OpenRouter Fallback with multiple models
    if (openRouter) {
      const openRouterModels = [
        'openrouter/free',
        'google/gemini-2.5-flash',
        'meta-llama/llama-3.3-70b-instruct:free',
        'deepseek/deepseek-chat',
        'qwen/qwen-2.5-72b-instruct:free'
      ];

      for (const model of openRouterModels) {
        try {
          console.log(`[JobAutomation] Attempting OpenRouter parsing with model: ${model}...`);
          const response = await openRouter.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: model,
            temperature: 0.2,
            max_tokens: 1500,
          });
          const text = response.choices[0].message.content;
          const start = text.indexOf('{');
          const end = text.lastIndexOf('}') + 1;
          return JSON.parse(text.slice(start, end));
        } catch (err) {
          console.warn(`[JobAutomation] OpenRouter model ${model} failed:`, err.message);
        }
      }
    }

    return null;
  }

  /**
   * Matches new jobs with candidate students and dispatches Unstop-style notifications
   */
  async dispatchMatchingNotifications(job, company, addLog) {
    let notificationsSent = 0;
    try {
      const targetSkills = job.requiredSkills.map(s => s.skill.toLowerCase());
      
      // Query students matching targetRole OR having overlapping skills
      const matchedUsers = await User.find({
        role: 'student',
        isOnboarded: true,
        accountStatus: 'active',
        $or: [
          { targetRole: { $regex: new RegExp(`^${job.roleCategory.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, 'i') } },
          { knownTechnologies: { $in: job.requiredSkills.map(s => s.skill) } }
        ]
      }).select('fullName email settings');

      await addLog(`Matching job with ${matchedUsers.length} potential students...`);

      for (const student of matchedUsers) {
        const matchedSkill = student.knownTechnologies?.find(tech => 
          targetSkills.includes(tech.toLowerCase())
        ) || targetSkills[0] || 'engineering';

        // Unstop-style personal notification
        const title = `🔥 Hot Match: ${company.name} is hiring!`;
        const message = `Hey ${student.fullName}! Unstop your career prep! 🚀 ${company.name} just posted a new role: "${job.title}". It matches your skills in ${matchedSkill}. Apply now!`;

        await Notification.createNotification({
          recipient: student._id,
          type: 'new_job_match',
          title,
          message,
          relatedEntities: { job: job._id, company: company._id },
          actionUrl: `/jobs?jobId=${job._id}`,
          category: 'jobs',
          actions: [
            { label: 'View Details', type: 'primary', url: `/jobs?jobId=${job._id}` }
          ],
          deliveryChannels: { inApp: true, email: true, push: false }
        });
        notificationsSent++;
      }
      await addLog(`Successfully dispatched matching notifications to ${notificationsSent} students.`);
    } catch (err) {
      await addLog(`Error dispatching notifications: ${err.message}`);
    }
    return notificationsSent;
  }

  /**
   * Cleans up expired jobs. Marks jobs past their application deadline as closed.
   * Also verifies live jobs with no deadlines by checking if links are broken (HEAD pings).
   */
  async cleanupExpiredJobs(addLog) {
    let closedCount = 0;

    try {
      // 1. Mark jobs with past deadline as closed
      const now = new Date();
      const pastDeadlineResult = await Job.updateMany(
        {
          status: 'active',
          applicationDeadline: { $lt: now }
        },
        { status: 'closed' }
      );
      closedCount += pastDeadlineResult.modifiedCount;
      if (pastDeadlineResult.modifiedCount > 0) {
        await addLog(`Closed ${pastDeadlineResult.modifiedCount} jobs with expired deadlines.`);
      }

      // 2. Perform live pings check on active jobs to verify link validity
      // To prevent heavy network loads, we check a maximum of 10 random active jobs per run
      const activeJobs = await Job.find({ status: 'active' }).limit(10);
      for (const job of activeJobs) {
        if (!job.applicationLink) continue;

        try {
          // Try a quick HEAD ping request
          const res = await axios.head(job.applicationLink, {
            timeout: 5000,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            validateStatus: () => true // Resolve on all statuses
          });

          // If the link returns 404, the posting is dead
          if (res.status === 404) {
            job.status = 'closed';
            await job.save();
            closedCount++;
            await addLog(`Closed inactive job due to broken link (404): "${job.title}" at URL: ${job.applicationLink}`);
            continue;
          }

          // If status is 200, we perform a quick GET search for text-based expiry indicators
          if (res.status === 200) {
            const pageRes = await axios.get(job.applicationLink, {
              timeout: 5000,
              headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const html = pageRes.data;
            const $ = cheerio.load(html);
            const pageText = $('body').text().toLowerCase();

            const expiredKeywords = [
              'position is closed',
              'no longer accepting applications',
              'this job has expired',
              'listing has expired',
              'job is no longer available',
              'opportunity has expired'
            ];

            const isExpired = expiredKeywords.some(keyword => pageText.includes(keyword));
            if (isExpired) {
              job.status = 'closed';
              await job.save();
              closedCount++;
              await addLog(`Closed inactive job due to text indicators (expired): "${job.title}"`);
            }
          }
        } catch (pingErr) {
          // Network error on HEAD check, log it but do not close immediately unless it consistently fails
          console.warn(`Ping check failed for ${job.applicationLink}: ${pingErr.message}`);
        }
      }
    } catch (err) {
      await addLog(`Error during cleanup expired phase: ${err.message}`);
    }

    return closedCount;
  }

  /**
   * Normalizes values in the parsed job/company object to ensure strict validation checks succeed.
   */
  normalizeParsedData(data) {
    if (!data || typeof data !== 'object') return data;

    // Recursive helper to replace curly apostrophes with straight ones
    const normalizeQuotes = (val) => {
      if (typeof val === 'string') {
        return val.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').trim();
      }
      if (Array.isArray(val)) {
        return val.map(normalizeQuotes);
      }
      if (val && typeof val === 'object') {
        const copy = {};
        for (const k in val) {
          copy[k] = normalizeQuotes(val[k]);
        }
        return copy;
      }
      return val;
    };

    data = normalizeQuotes(data);

    if (data.job) {
      const job = data.job;

      // 1. Normalize jobType
      const allowedJobTypes = ['full_time', 'part_time', 'internship', 'contract', 'freelance'];
      if (job.jobType) {
        job.jobType = job.jobType.toLowerCase().replace('-', '_').replace(' ', '_');
        if (!allowedJobTypes.includes(job.jobType)) {
          job.jobType = 'full_time';
        }
      } else {
        job.jobType = 'full_time';
      }

      // 2. Normalize workMode
      const allowedWorkModes = ['remote', 'onsite', 'hybrid'];
      if (job.workMode) {
        job.workMode = job.workMode.toLowerCase();
        if (!allowedWorkModes.includes(job.workMode)) {
          job.workMode = 'onsite';
        }
      } else {
        job.workMode = 'onsite';
      }

      // 3. Normalize experienceLevel
      const allowedExpLevels = ['fresher', 'entry', 'mid', 'senior', 'lead', 'executive'];
      if (job.experienceLevel) {
        job.experienceLevel = job.experienceLevel.toLowerCase();
        if (!allowedExpLevels.includes(job.experienceLevel)) {
          job.experienceLevel = 'entry';
        }
      } else {
        job.experienceLevel = 'entry';
      }

      // 4. Normalize educationRequired.degree
      if (job.educationRequired) {
        let degree = String(job.educationRequired.degree || '').toLowerCase();
        if (degree.includes('bachelor') || degree.includes('btech') || degree.includes('b.tech') || degree.includes('be') || degree.includes('b.e') || degree.includes('bs')) {
          job.educationRequired.degree = "Bachelor's";
        } else if (degree.includes('master') || degree.includes('mtech') || degree.includes('m.tech') || degree.includes('ms') || degree.includes('mba')) {
          job.educationRequired.degree = "Master's";
        } else if (degree.includes('phd') || degree.includes('doctorate')) {
          job.educationRequired.degree = 'PhD';
        } else if (degree.includes('diploma')) {
          job.educationRequired.degree = 'Diploma';
        } else if (degree.includes('high school')) {
          job.educationRequired.degree = 'High School';
        } else {
          job.educationRequired.degree = 'Any';
        }
      } else {
        job.educationRequired = { degree: 'Any', fields: [] };
      }

      // 5. Normalize locations
      if (Array.isArray(job.locations) && job.locations.length > 0) {
        job.locations = job.locations.map(loc => {
          return {
            city: loc.city || (job.workMode === 'remote' ? 'Remote' : 'Bengaluru'),
            state: loc.state || '',
            country: loc.country || 'India'
          };
        });
      } else {
        job.locations = [{
          city: job.workMode === 'remote' ? 'Remote' : 'Bengaluru',
          state: '',
          country: 'India'
        }];
      }

      // 6. Normalize department
      const allowedDepts = ['Engineering', 'Product', 'Design', 'Data Science', 'DevOps', 'QA', 'Security', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Customer Support', 'Other'];
      if (job.department) {
        const matchedDept = allowedDepts.find(d => d.toLowerCase() === job.department.toLowerCase());
        job.department = matchedDept || 'Other';
      } else {
        job.department = 'Engineering';
      }

      // 7. Normalize roleCategory
      const allowedRoles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'Data Analyst', 'ML Engineer', 'DevOps Engineer', 'Cloud Engineer', 'QA Engineer', 'Product Manager', 'UI/UX Designer', 'System Administrator', 'Network Engineer', 'Security Engineer', 'Technical Writer', 'Business Analyst', 'Project Manager', 'Other'];
      if (job.roleCategory) {
        const matchedRole = allowedRoles.find(r => r.toLowerCase() === job.roleCategory.toLowerCase());
        job.roleCategory = matchedRole || 'Other';
      } else {
        job.roleCategory = 'Other';
      }
    }

    if (data.company) {
      const company = data.company;
      
      // Normalize companyType
      const allowedCompTypes = ['Product', 'Service', 'Startup', 'MNC', 'Government', 'PSU', 'Other'];
      if (company.companyType) {
        const matchedType = allowedCompTypes.find(t => t.toLowerCase() === company.companyType.toLowerCase());
        company.companyType = matchedType || 'Other';
      } else {
        company.companyType = 'Other';
      }

      // Normalize industry
      const allowedIndustries = ['Information Technology', 'Software Development', 'E-commerce', 'Finance & Banking', 'Consulting', 'Healthcare', 'Education', 'Manufacturing', 'Telecommunications', 'Media & Entertainment', 'Automotive', 'Aerospace', 'Energy', 'Retail', 'Hospitality', 'Real Estate', 'Other'];
      if (company.industry) {
        const matchedInd = allowedIndustries.find(i => i.toLowerCase() === company.industry.toLowerCase());
        company.industry = matchedInd || 'Other';
      } else {
        company.industry = 'Other';
      }
    }

    return data;
  }
}

export const jobAutomator = new JobAutomatorService();
export default jobAutomator;
