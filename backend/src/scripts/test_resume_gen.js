import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractResumeDataWithAI } from '../services/resumeDataExtractor.service.js';
import { getTemplateById } from '../data/latexTemplates.js';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cleanJSONString } from '../services/resumeDataExtractor.service.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const sampleResumeText = `
Ayush Soni
ayushsoni@example.com | +91 9876543210
linkedin.com/in/ayushsoni | github.com/ayushsoni

SUMMARY
High-performing Full Stack Developer with 3+ years of experience building scalable web applications. Expert in Node.js, React, and MongoDB. Proven track record of optimizing page load speeds by 40% and leading teams to deliver projects ahead of schedule.

SKILLS
Programming Languages: JavaScript, TypeScript, Python, C++
Frameworks & Libraries: React, Node.js, Express, Next.js, Redux
Databases: MongoDB, PostgreSQL, Redis
Tools & DevOps: Git, Docker, AWS (S3, EC2), CI/CD, Nginx

EXPERIENCE
Lead Software Engineer | TechCorp (Jun 2024 - Present)
- Spearheaded the redesign of the core SaaS platform using React and Node.js, improving page performance by 35% and increasing user retention by 15%.
- Formulated code styling guidelines and code review protocols, reducing onboarding time for new developers by 4 days.
- Engineered a Redis-based caching layer that cut API latency by 120ms and handled over 5M daily requests.

Full Stack Developer | StartupInc (Jan 2023 - May 2024)
- Designed and built a real-time analytics dashboard from scratch using React and MongoDB, serving 10,000+ monthly active users.
- Automated deployment pipelines using GitHub Actions and AWS EC2, reducing release cycles from bi-weekly to daily.
- Integrated payment gateways (Stripe) and implemented OAuth 2.0 authentication, raising system security.

PROJECTS
E-Commerce Engine | React, Node.js, Stripe (Oct 2024 - Dec 2024)
- Developed a high-performance headless e-commerce backend supporting 500+ concurrent transactions.
- Achieved a 95% test coverage score using Jest and supertest, securing payment processing routes.
- Repo link: github.com/ayushsoni/ecommerce-engine

Task Scheduler | Go, Redis, Docker (Jul 2024 - Sep 2024)
- Built a distributed job scheduling engine capable of processing 100,000 tasks per minute.
- Deployed using Docker containers on AWS ECS, achieving 99.9% uptime.
- Repo link: github.com/ayushsoni/task-scheduler

EDUCATION
Bachelor of Technology in Computer Science | Global University (2019 - 2023)
- GPA: 9.2/10
- Relevant coursework: Data Structures, Database Management Systems, Software Engineering

CERTIFICATIONS
- AWS Certified Developer Associate (2024)
- MongoDB Certified Developer (2023)
`;

async function runTest() {
  console.log('--- STARTING PARSER TEST ---');
  try {
    const parsedData = await extractResumeDataWithAI(sampleResumeText);
    console.log('PARSED DATA RESULT:');
    console.log(JSON.stringify(parsedData, null, 2));

    console.log('\n--- STARTING LATEX GENERATOR TEST ---');
    const template = getTemplateById('jakes-resume');
    if (!template) {
      console.error('Template not found!');
      return;
    }

    const userProfile = {
      name: parsedData.name || 'Ayush Soni',
      email: parsedData.email || 'ayushsoni@example.com',
      phone: parsedData.phone || '+91 9876543210',
      linkedin: parsedData.linkedin || 'ayushsoni',
      github: parsedData.github || 'ayushsoni',
      summary: parsedData.summary || '',
      education: parsedData.education || [],
      experience: parsedData.experience || [],
      projects: parsedData.projects || [],
      skills: parsedData.skills || [],
      certifications: parsedData.certifications || []
    };

    let prompt = `
You are an expert LaTeX developer and career assistant.
Your task is to take a professional LaTeX resume template and populate it with the user's profile information.

User Profile:
${JSON.stringify(userProfile)}

LaTeX Template:
${template.source}

CRITICAL LATEX INTEGRITY & COMPILATION RULES:
1. You MUST NOT modify, simplify, or delete any macro definitions, packages, settings, or color definitions in the LaTeX preamble (such as \\definecolor{primary}{...}, \\definecolor{accent}{...}, \\definecolor{PRIMARY}{...}, \\definecolor{ACCENT}{...}, \\resumeSubheading, \\resumeItem, \\resumeProjectHeading, \\resumeSubHeadingListStart, \\resumeSubHeadingListEnd, \\resumeItemListStart, \\resumeItemListEnd, etc.). Copy them EXACTLY as they are from the template.
2. If you use a macro or color in the document body (e.g. \\resumeSubheading, \\resumeItem, primary, accent, etc.), its definition MUST exist in the preamble.
3. Keep the document structure, spacing, fonts, margins, packages, colors, and custom commands exactly matching the template. Only fill and optimize the content inside the sections.
4. Escaping special LaTeX characters in the user's profile text is MANDATORY. Ensure that:
   - All unescaped ampersands "&" are replaced with "\\&"
   - All percent signs "%" are replaced with "\\%"
   - All underscores "_" are replaced with "\\_"
   - All dollar signs "$" are replaced with "\\$"
   - All hash signs "#" are replaced with "\\#"
   - All curly braces "{" and "}" are replaced with "\\{" and "\\}"
   - Do NOT double-escape characters if they are already escaped in the template code.

ATS SCORE MAXIMIZATION (90+ ATS SCORE TARGET):
1. Keep the layout standard, single-column, and highly readable.
2. Bullet Points: Write impact-driven, professional bullet points for the Experience and Projects sections.
   - Start EVERY single bullet point with a strong, active verb (e.g. "Spearheaded", "Optimized", "Architected", "Engineered", "Pioneered", "Designed").
   - Quantify achievements: Introduce metrics, numbers, percentages, time-savings, or scale to every bullet point where possible (e.g. "improving system reliability by 24%", "saving 8 hours of manual overhead per week", "managing data ingestion pipeline of 10M+ events/day").
3. Skills: Group/categorize skills cleanly using standard industry keywords matching the target role.
4. No Placeholders: Eliminate all template symbols like {{NAME}}, {{EMAIL}}, etc. Replace them with the actual data.
`;

    prompt += `
Instructions:
1. Populate the template with the user's information.
2. Optimize the content to be highly professional and general high-ATS compliant.
3. Keep the LaTeX formatting, commands, styling, and package imports exactly as defined in the template (do not omit or alter the preamble).
4. Escape any LaTeX special characters in the user's profile text (e.g. & to \\&, % to \\%, _ to \\_, etc.) to prevent compilation errors.
5. Output JSON format containing:
   {
     "latex": "your compiled LaTeX source code as a single string",
     "tips": ["Tip 1", "Tip 2"]
   }
`;

    let result = null;

    // Use Groq if configured
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey && groqKey !== 'your-groq-api-key' && groqKey.trim() !== '') {
      console.log('Testing with Groq (llama-3.3-70b-versatile)...');
      const groq = new OpenAI({
        apiKey: groqKey,
        baseURL: 'https://api.groq.com/openai/v1',
      });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.7,
      });
      result = JSON.parse(cleanJSONString(completion.choices[0].message.content));
    } else {
      console.warn('Groq not configured in .env. Skipping.');
    }

    if (result) {
      console.log('GENERATED LATEX RESULT:');
      console.log(result.latex);
      console.log('\nTIPS:');
      console.log(result.tips);
    } else {
      console.error('Failed to generate LaTeX using LLM.');
    }
  } catch (err) {
    console.error('Error running test:', err);
  }
}

runTest();
