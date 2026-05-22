import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

/**
 * Utility to clean markdown format blocks and other non-JSON noise from LLM responses.
 */
export const cleanJSONString = (str) => {
  if (typeof str !== 'string') return '';
  let cleaned = str.replace(/```json/gi, '').replace(/```/g, '').trim();
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }
  return cleaned;
};

/**
 * Post-parsing safety utility to strip date ranges and timeline formats from name/company fields.
 */
export const cleanTimelineAndSkillsFromName = (name) => {
  if (typeof name !== 'string') return '';
  let cleaned = name;
  
  // 1. Remove parenthesized blocks containing dates/months
  const parenthesizedDateRegex = /\([\s\-\–\—a-zA-Z0-9\/\.]*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|20\d\d)\b[\s\-\–\—a-zA-Z0-9\/\.]*\)/gi;
  cleaned = cleaned.replace(parenthesizedDateRegex, '');

  // 2. Remove standard month patterns with optional year (no left boundary check to handle PlatformJun)
  const monthRegex = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b\s*\d{0,4}/gi;
  cleaned = cleaned.replace(monthRegex, '');

  // 3. Remove standalone year or Present markers
  const presentOrYearRegex = /\b(?:Present)\b|(?:19|20)\d{2}\b/gi;
  cleaned = cleaned.replace(presentOrYearRegex, '');

  // 4. Clean up any double spaces, trailing brackets, dashes or dangling dividers
  cleaned = cleaned.replace(/^[\s\-\–\—\|,\(\)•\·\*\+]+|[\s\-\–\—\|,\(\)•\·\*\+]+$/g, '').replace(/\s+/g, ' ').trim();
  return cleaned || name;
};

export const restoreMergedSpaces = (text) => {
  if (typeof text !== 'string') return text;
  
  // Split by whitespace to process word by word
  const words = text.split(/(\s+)/);
  const restoredWords = words.map(word => {
    // If it looks like an email or a URL, or has @ or http or .com, do not touch it
    if (word.includes('@') || /https?:\/\//i.test(word) || /\b(?:[a-z0-9]+\.)+[a-z]{2,}\b/i.test(word) || word.includes('linkedin.com') || word.includes('github.com')) {
      return word;
    }
    
    let cleaned = word;
    
    // 1. Separate numbers/percentages from leading/trailing words first
    cleaned = cleaned.replace(/([a-zA-Z]+)(\d+)/g, '$1 $2');
    cleaned = cleaned.replace(/(\d+(?:\+|-|%)?)([a-zA-Z]+)/g, '$1 $2');

    // 2. Separate common articles/adjectives merged at start: a, with, system, etc.
    cleaned = cleaned.replace(/\ba(full-stack|real-time|deep|learning)\b/gi, (match) => {
      const first = match.charAt(0);
      const rest = match.slice(1);
      return first + ' ' + rest;
    });

    // 3. Separate technology name or action verb prefix
    cleaned = cleaned.replace(/\b(Integrated|Engineered|Developed|Designed|Optimized|Implemented|Built|Trained|Collaborated|Created|Led)(MongoDB|Haar|OpenCV|TensorFlow|React|Node|Express|Flask|Django|Python|Java|SQL|C\+\+)/g, '$1 $2');

    // 4. Separate words merged with "with", "using", "for"
    cleaned = cleaned.replace(/([a-zA-Z]{3,})(with|using|for)\b/g, '$1 $2');
    
    // 5. Separate words ending in via/and using precise word boundaries & callback list checks
    cleaned = cleaned.replace(/\b([a-zA-Z]+)(and|via)\b/gi, (match, prefix, suffix) => {
      const lowerMatch = match.toLowerCase();
      if (suffix.toLowerCase() === 'via') {
        if (['trivia', 'olivia', 'salvia', 'via'].includes(lowerMatch)) return match;
        return prefix + ' ' + suffix;
      } else {
        const commonAnd = ['and', 'hand', 'land', 'band', 'sand', 'brand', 'grand', 'stand', 'command', 'expand', 'demand', 'island', 'thousand', 'husband', 'understand', 'operand', 'garland', 'highland', 'woodland', 'borderland', 'hinterland', 'headband', 'wristband', 'waistband', 'broadband', 'contraband', 'standby', 'candid'];
        if (commonAnd.includes(lowerMatch)) return match;
        return prefix + ' ' + suffix;
      }
    });
    
    cleaned = cleaned.replace(/([a-zA-Z]+)and([A-Z][a-zA-Z]*)/g, '$1 and $2');
    
    // Handle specific reverse merges
    cleaned = cleaned.replace(/\bwith(multi-threaded|multi-threading|real-time)\b/gi, 'with $1');

    return cleaned;
  });

  return restoredWords.join('');
};

export const cleanLeadingBullets = (line) => {
  if (typeof line !== 'string') return '';
  return line
    .replace(/^[•\-\*\–\—\·\s]+/, '')
    .replace(/^(?:\d+\.(?:\s|$)+|\d+\)(?:\s|$)+)/, '')
    .trim();
};

/**
 * Extract structured resume data from raw text using Gemini 1.5 Flash.
 * Returns a JSON structure matching the frontend schema.
 * 
 * @param {string} resumeText - The raw text extracted from a resume.
 * @returns {Promise<Object>} The parsed resume details.
 */
export const extractResumeDataWithAI = async (resumeText) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  const isGeminiAvailable = geminiKey && geminiKey !== 'your-gemini-api-key' && geminiKey.trim() !== '';
  let responseText = null;

  const prompt = `
You are an expert ATS (Applicant Tracking System) parser. Your task is to extract all structured details from the raw resume text provided.
Extract as much information as possible. Do not paraphrase, shorten, or rewrite summary/objective statements or description bullet points; capture the EXACT original wording, sentences, and details.

Raw Resume Text:
"""
${resumeText}
"""

You must return a JSON object that adheres strictly to the following schema:
{
  "name": "Full name of the candidate, or empty string if not found",
  "email": "Email address, or empty string",
  "phone": "Phone number, or empty string",
  "linkedin": "LinkedIn profile link, or empty string",
  "github": "GitHub profile link, or empty string",
  "summary": "Professional summary or objective statement, or empty string",
  "education": [
    {
      "degree": "Degree (e.g. Bachelor of Technology, Master of Science)",
      "fieldOfStudy": "Major / Field of study (e.g. Computer Science)",
      "institution": "University / College / School name",
      "location": "City, State or Country",
      "gpa": "GPA or CGPA (e.g. 3.8/4.0, 9.1/10)",
      "startDate": "Start date or year",
      "endDate": "End date, graduation year, or 'Present'"
    }
  ],
  "experience": [
    {
      "company": "Company name",
      "role": "Job title / Role",
      "startDate": "Start date",
      "endDate": "End date or 'Present'",
      "location": "City, State or Country",
      "description": "Brief summary of responsibilities, if any",
      "highlights": [
        "Bullet point describing an achievement or task",
        "Another bullet point"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project name (e.g. Portfolio Website, E-commerce App). DO NOT append dates, links, or technologies here.",
      "description": "Detailed project description",
      "technologies": ["List of technologies/languages/frameworks used, e.g. React, Node.js"],
      "highlights": [
        "Specific feature built or challenge solved in the project",
        "Another project bullet point"
      ],
      "link": "Project link, demo link, or GitHub repo link"
    }
  ],
  "skills": [
    "Individual skill name (e.g. JavaScript, Python, Docker, System Design)"
  ],
  "certifications": [
    {
      "name": "Certification name",
      "issuer": "Issuing organization (e.g. AWS, Coursera)",
      "date": "Date obtained"
    }
  ],
  "achievements": [
    "Extracted achievement, award, extra-curricular activity, or co-curricular activity description"
  ]
}

CRITICAL RULES FOR STRUCTURAL CLEANLINESS:
1. DO NOT append dates, timeline ranges, technologies, or links into the "name" of the project or "company"/"role" of the experience. Keep them strictly in their respective fields (e.g. "startDate", "endDate", "technologies", "link").
2. Capture all bullet points. Do not omit details or summarize multiple items into a single string.
3. Clean all text to be free of raw formatting chars (like bullet characters •, -, * at the beginning of parsed fields).
4. If a field is not found in the resume, use an empty string or empty array as specified in the schema.
5. DO NOT include lists of technologies/tools (e.g. 'React, Node.js, AWS') as separate highlights or bullet points in either 'projects.highlights' or 'experience.highlights'. Filter them out entirely from highlights and ensure they are only placed in 'technologies' or 'skills' array. Highlights should strictly represent action-oriented statements (achievements, tasks, metrics).
6. EXACT WORDING PRESERVATION: You MUST capture the EXACT original wording of the professional summary and all description bullet points for both projects and experience. Do NOT rewrite, paraphrase, simplify, or shorten them.
7. PROJECT LINKS: If a project title or its bullet points contain a URL or link (e.g., a GitHub URL or demo link), extract it into the "link" field. Remove the link from the project "name" field, but keep it intact inside the description/bullet point text.

Only return the JSON response. Do not include markdown code block formatting (like \`\`\`json).
`;

  if (isGeminiAvailable) {
    try {
      console.log('[resumeDataExtractor] Attempting extraction with Gemini...');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json' }
      });
      const response = await model.generateContent(prompt);
      responseText = response.response.text();
      console.log('[resumeDataExtractor] Gemini extraction succeeded');
    } catch (geminiError) {
      console.error('[resumeDataExtractor] Gemini extraction failed:', geminiError.message);
    }
  }

  // Fallback to Groq if Gemini failed or is not available
  if (!responseText) {
    const groqKey = process.env.GROQ_API_KEY;
    const isGroqAvailable = groqKey && groqKey !== 'your-groq-api-key' && groqKey.trim() !== '';

    if (isGroqAvailable) {
      try {
        console.log('[resumeDataExtractor] Attempting fallback extraction with Groq (llama-3.3-70b-versatile)...');
        const groq = new OpenAI({
          apiKey: groqKey,
          baseURL: 'https://api.groq.com/openai/v1',
        });
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are an expert ATS parser. You must analyze the text and output a JSON object matching the requested schema strictly. Do not output anything else but valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: 'json_object' }
        });
        responseText = completion.choices[0]?.message?.content;
        console.log('[resumeDataExtractor] Groq extraction succeeded');
      } catch (groqError) {
        console.error('[resumeDataExtractor] Groq extraction failed:', groqError.message);
      }
    } else {
      console.warn('[resumeDataExtractor] No valid GEMINI_API_KEY or GROQ_API_KEY available.');
    }
  }

  if (!responseText) {
    console.warn('[resumeDataExtractor] Both Gemini and Groq failed or are unconfigured. Calling local rule-based fallback parser.');
    return extractLocalFallback(resumeText);
  }

  try {
    const cleanedText = cleanJSONString(responseText);
    const result = JSON.parse(cleanedText);
    
    // Clean up lists if any elements are null/undefined
    if (result.education) {
      result.education = result.education.map(edu => ({
        degree: edu.degree || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        institution: edu.institution || '',
        location: edu.location || '',
        gpa: edu.gpa || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || ''
      }));
    }
    if (result.experience) {
      result.experience = result.experience.map(exp => {
        let bullets = [];
        if (Array.isArray(exp.highlights) && exp.highlights.length > 0) {
          bullets = exp.highlights;
        } else if (Array.isArray(exp.description)) {
          bullets = exp.description;
        } else if (typeof exp.description === 'string' && exp.description.trim()) {
          bullets = exp.description.split('\n').map(l => l.replace(/^[•\-\*\s]+/, '').trim()).filter(Boolean);
        }
        return {
          company: cleanTimelineAndSkillsFromName(exp.company || ''),
          role: cleanTimelineAndSkillsFromName(exp.role || exp.title || ''),
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          location: exp.location || '',
          description: bullets.filter(Boolean),
          highlights: bullets.filter(Boolean)
        };
      });
    }
    if (result.projects) {
      result.projects = result.projects.map(proj => {
        let bullets = [];
        if (Array.isArray(proj.highlights) && proj.highlights.length > 0) {
          bullets = proj.highlights;
        } else if (Array.isArray(proj.description)) {
          bullets = proj.description;
        } else if (typeof proj.description === 'string' && proj.description.trim()) {
          bullets = proj.description.split('\n').map(l => l.replace(/^[•\-\*\s]+/, '').trim()).filter(Boolean);
        }
        const { cleanedBullets, technologies } = cleanProjectBulletsAndExtractTechs(bullets.filter(Boolean), proj.technologies);
        return {
          name: cleanTimelineAndSkillsFromName(proj.name || proj.title || ''),
          description: cleanedBullets,
          technologies: technologies,
          highlights: cleanedBullets,
          link: proj.link || ''
        };
      });
    }
    if (result.skills) {
      result.skills = Array.isArray(result.skills) ? result.skills.filter(Boolean) : [];
    }
    if (result.certifications) {
      result.certifications = result.certifications.map(cert => ({
        name: cert.name || '',
        issuer: cert.issuer || '',
        date: cert.date || ''
      }));
    }
    if (result.achievements) {
      result.achievements = Array.isArray(result.achievements) ? result.achievements.filter(Boolean) : [];
    }

    return result;
  } catch (error) {
    console.error('[resumeDataExtractor] Extraction error:', error);
    return extractLocalFallback(resumeText);
  }
};

/**
 * Utility to filter out technology lists from project bullets/descriptions
 * and merge them into the technologies array.
 */
export const cleanProjectBulletsAndExtractTechs = (bullets, existingTechs) => {
  const cleanedBullets = [];
  const mergedTechs = new Set(
    (Array.isArray(existingTechs) ? existingTechs : [])
      .map(t => t.trim())
      .filter(Boolean)
  );

  const techHeaderRegex = /^(?:technologies|tech\s+stack|tools\s+used|technologies\s+used|built\s+with|stack|tech)\s*[:\-–—\s]+/i;

  (bullets || []).forEach(bullet => {
    const restored = restoreMergedSpaces(bullet);
    const trimmed = restored.trim();
    if (!trimmed) return;

    // Check if the bullet is a header pattern like "Technologies: React, Node.js"
    if (techHeaderRegex.test(trimmed)) {
      const techPart = trimmed.replace(techHeaderRegex, '');
      const parts = techPart.split(/[,/|;]|\s+and\s+|\s*&\s*/i).map(t => t.trim()).filter(Boolean);
      parts.forEach(t => {
        const cleanT = t.replace(/\b(?:and|etc)\b/gi, '').trim();
        if (cleanT) mergedTechs.add(cleanT);
      });
      return; // Skip this bullet from descriptions
    }

    // Check if it's a pure tech list (e.g. "React, Node.js, Express.js")
    if (isPureTechList(trimmed)) {
      const parts = trimmed.split(/[,/|;]|\s+and\s+|\s*&\s*/i).map(t => t.trim()).filter(Boolean);
      parts.forEach(t => {
        const cleanT = t.replace(/\b(?:and|etc)\b/gi, '').trim();
        if (cleanT) {
          mergedTechs.add(cleanT);
        }
      });
      return; // Skip this bullet from descriptions
    }

    cleanedBullets.push(bullet);
  });

  return {
    cleanedBullets,
    technologies: Array.from(mergedTechs)
  };
};

export const isPureTechList = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;

  const TECH_REG = /\b(?:react(?:\.js)?|angular|vue(?:\.js)?|svelte|next\.js|nuxt\.js|node(?:\.js)?|express(?:\.js)?|koa|django|flask|fastapi|spring\s*boot|laravel|asp\.net|rails|ruby\s*on\s*rails|mongodb|postgres(?:ql)?|mysql|sqlite|redis|cassandra|dynamodb|firebase|supabase|oracle|mssql|docker|kubernetes|k8s|aws|gcp|azure|heroku|vercel|netlify|digital\s*ocean|html(?:5)?|css(?:3)?|javascript|js|typescript|ts|python|java|c\+\+|c\#|go|golang|rust|ruby|php|swift|kotlin|scala|perl|bash|shell|git|github|gitlab|rest\s*apis?|restful|graphql|grpc|socket\.io|jwt|oauth|redux|mobx|recoil|tailwind|bootstrap|material\-ui|mui|chakra|sass|less|webpack|vite|babel|gulp|jest|mocha|cypress|selenium|playwright|jenkins|travis|circleci|github\s*actions|tensorflow|pytorch|keras|scikit\-learn|numpy|pandas|opencv|mediapipe|nltk|spacy|hugging\s*face|transformers|nlp|llm|gan|cnn|rnn|lstm|bert|gpt|gemini|openai|s3|ec2|lambda|serverless|microservices|ci\/cd|dsa|oop|dbms|expo|native|api|apis|rest|nosql|db|databases)\b/i;

  const NON_TECH_PROJECT_WORDS = /\b(?:platform|system|application|app|website|portal|software|tool|dashboard|extension|game|detector|classifier|generator|engine|management|tracker|detection|control|gaming|commerce|executive|professional|experience|project|internship|student|education|university|college|role|engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head|building|scaling|developing|implementing|managing|predict(?:or|ion)?|recommend(?:er|ation)?|solve(?:r)?|recognition|analysis|learning|smart|automatic|smart|intelligent|helper|utility|portfolio|blog)\b/i;

  const ACTION_VERB_OR_DESC_WORD = /\b(?:engineered|designed|integrated|developed|implemented|optimized|built|trained|led|completed|created|spearheaded|architected|pioneered|managed|formulated|automated|collaborated|conducted|established|improved|enhanced|contributed|delivered|utilizing|using|translating|achieving|reducing|processing|securing|solving|leading|completing|facial|classification|prediction|webcam|hyperparameter|tuning|augmentation|inference|grayscale|normalization|listings|checkout|validation|handling|modeling|uptime)\b/i;

  const cleanLine = cleanLeadingBullets(trimmed).replace(/[\-–—\s]+$/, '').trim();
  if (!cleanLine) return false;

  // If it contains action verbs or key descriptive words, it's not a pure tech list
  if (ACTION_VERB_OR_DESC_WORD.test(cleanLine)) return false;

  // If it contains non-tech project words, it's not a pure tech list
  if (NON_TECH_PROJECT_WORDS.test(cleanLine)) return false;

  // Split by common delimiters and spaces to check density
  const words = cleanLine.split(/[\s,;|/\\()]+/).filter(Boolean);
  if (words.length === 0) return false;

  // Count how many words match the tech keywords regex
  const techWordCount = words.filter(w => TECH_REG.test(w)).length;
  const ratio = techWordCount / words.length;

  return ratio >= 0.5;
};

export const isLikelyProjectTitle = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;
  if (/^[a-z]/.test(trimmed)) return false;
  if (/^[%&\+\/]/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return false;
  if (/[%,.]$/.test(trimmed)) return false;
  if (/^\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(trimmed) && trimmed.length < 30) return false;
  return true;
};

export const isLikelyExperienceTitle = (line) => {
  return isLikelyProjectTitle(line);
};

const extractDatesFromText = (text) => {
  const dates = text.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi);
  let startDate = '';
  let endDate = '';
  if (dates && dates.length > 0) {
    startDate = dates[0];
    if (dates.length > 1) {
      endDate = dates[1];
      if (text.toLowerCase().includes('expected') && !endDate.toLowerCase().includes('expected')) {
        endDate += ' (Expected)';
      }
    } else if (text.toLowerCase().includes('present')) {
      endDate = 'Present';
    } else if (text.toLowerCase().includes('expected')) {
      endDate = dates[0] + ' (Expected)';
    }
  }
  return { startDate, endDate };
};

const cleanDatesFromText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi, '')
    .replace(/\bexpected\b/gi, '')
    .replace(/[\s\-\–\—\|,\(\)•\·\*\+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const isNewProjectStart = (cleanLine, currentProj) => {
  const clean = cleanLeadingBullets(cleanLine);
  if (isPureTechList(clean)) return false;
  if (!isLikelyProjectTitle(clean)) return false;
  if (/^(repo|github|link|http|url|demo|website|source)/i.test(clean)) return false;
  if (/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b/i.test(clean) && clean.length < 40) return false;
  if (/^(?:technologies|tech\s+stack|tools|languages|frameworks|libraries|database|devops|skills)/i.test(clean)) return false;
  
  const ACTION_VERBS = /^(?:engineered|designed|integrated|developed|implemented|optimized|built|trained|led|completed|created|spearheaded|architected|pioneered|managed|formulated|automated|collaborated|conducted|established|improved|enhanced|formulated|contributed|delivered)/i;
  if (ACTION_VERBS.test(clean)) return false;

  if (!currentProj) return true;
  
  if (currentProj.description.length === 0 && currentProj.highlights.length === 0) {
    return false;
  }
  
  if (clean.includes('|') || clean.includes('–') || (clean.includes(' - ') && !/(?:19|20)\d{2}\b/.test(clean)) || clean.includes(':')) {
    const divider = clean.includes('|') ? '|' : (clean.includes(':') ? ':' : '–');
    const firstPart = clean.split(divider)[0].trim();
    if (firstPart.split(/\s+/).length <= 8) {
      return true;
    }
  }
  
  const words = clean.split(/\s+/);
  const isShortTitle = words.length >= 1 && words.length <= 8 && /^[A-Z]/.test(clean);
  return isShortTitle;
};

const isSectionHeader = (line) => {
  const clean = line.trim();
  if (!clean) return null;
  if (clean.length > 50) return null;
  if (/^[•\-\*\–\—\·]/.test(clean)) return null;
  if (clean.includes(',')) return null;
  if (clean.endsWith('.')) return null;
  if (clean.includes(':') && clean.split(':')[1].trim().length > 3) return null;
  if (/^[a-z]/.test(clean)) return null;

  const lower = clean.toLowerCase();

  if (/^(?:education|academic|academics|qualifications|schooling)(?:\s+\&\s+\w+)?$/i.test(lower) || 
      /^(?:academic\s+)?qualifications$/i.test(lower)) {
    return 'education';
  }
  if (/^(?:experience|employment|work\s+history|career|professional\s+background|professional\s+experience|work\s+experience)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'experience';
  }
  if (/^(?:projects|personal\s+projects|academic\s+projects|key\s+projects|featured\s+projects)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'projects';
  }
  if (/^(?:skills|technologies|tech\s+stack|technical\s+skills|technical\s+expertise|skills\s+\&\s+expertise|languages|programming\s+languages)$/i.test(lower)) {
    return 'skills';
  }
  if (/^(?:certifications|courses|licenses|credentials|certified)(?:\s+\&\s+\w+)?$/i.test(lower)) {
    return 'certifications';
  }
  if (/^(?:achievements|awards|extracurriculars?|extra-curriculars?|leadership|interests|publications|co-curriculars?|activities|honors|volunteer|volunteering)(?:\s+\&\s+[\w\-]+)*$/i.test(lower) ||
      lower.includes('achievements') || lower.includes('extracurricular') || lower.includes('activities') || lower.includes('awards') || lower.includes('leadership')) {
    
    if (lower.includes('solving') || lower.includes('team') || lower.includes('workshop') || lower.includes('dsa') || lower.includes('contest') || lower.includes('participants')) {
      return null;
    }
    return 'achievements';
  }
  if (/^(?:professional\s+|career\s+|executive\s+)?(?:summary|objective|profile|about\s+me)$/i.test(lower)) {
    return 'summary';
  }

  return null;
};

export const extractLocalFallback = (resumeText) => {
  const lines = (resumeText || '').split('\n').map(l => restoreMergedSpaces(l.trim())).filter(Boolean);
  const result = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    achievements: []
  };

  if (lines.length === 0) return result;

  result.name = lines[0].replace(/[^a-zA-Z\s.-]/g, '').trim();
  if (result.name.length > 50 || result.name.split(' ').length > 4) {
    result.name = '';
  }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const phoneRegex = /(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
  const githubRegex = /github\.com\/[a-zA-Z0-9_-]+/i;

  const emailMatch = resumeText.match(emailRegex);
  if (emailMatch) result.email = emailMatch[0];

  const phoneMatch = resumeText.match(phoneRegex);
  if (phoneMatch) result.phone = phoneMatch[0];

  const linkedinMatch = resumeText.match(linkedinRegex);
  if (linkedinMatch) result.linkedin = 'https://' + linkedinMatch[0];

  const githubMatch = resumeText.match(githubRegex);
  if (githubMatch) result.github = 'https://' + githubMatch[0];

  const foundSkills = new Set();

  const COMMON_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C\\+\\+', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'HTML', 'CSS', 'Sass', 'React', 'Angular', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring Boot', 'ASP.NET', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'CI/CD', 'Jenkins', 'REST API', 'GraphQL',
    'Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms', 'System Design'
  ];
  COMMON_SKILLS.forEach(skillPattern => {
    const regex = new RegExp(`\\b${skillPattern}\\b`, 'i');
    if (regex.test(resumeText)) {
      foundSkills.add(skillPattern.replace('\\+', '+'));
    }
  });

  let currentSection = null;
  let sectionContent = [];
  const preHeaderLines = [];
  
  const flushSection = () => {
    if (!currentSection || sectionContent.length === 0) return;

    if (currentSection === 'education') {
      let educationEntries = [];
      let currentEdu = null;

      sectionContent.forEach(line => {
        let cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        if (!cleanLine) return;

        const dateInfo = extractDatesFromText(cleanLine);
        
        let gpa = '';
        const gpaRegex = /\b(?:c?gpa|gpa|score)\b\s*[:\-–—\s]*\s*(\d+(?:\.\d+)?(?:\s*[\/\-–—]\s*\d+(?:\.\d+)?)?)/i;
        const gpaMatch = cleanLine.match(gpaRegex);
        if (gpaMatch) {
          gpa = gpaMatch[1].trim();
          cleanLine = cleanLine.replace(gpaMatch[0], '').trim();
        } else {
          const standaloneGpaRegex = /\b\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?\b/;
          const standaloneGpaMatch = cleanLine.match(standaloneGpaRegex);
          if (standaloneGpaMatch) {
            gpa = standaloneGpaMatch[0].trim();
            cleanLine = cleanLine.replace(standaloneGpaMatch[0], '').trim();
          }
        }

        let location = '';
        const locMatch = cleanLine.match(/\b(Baddi|Himachal Pradesh|Didwana|Rajasthan|India|Delhi|Baddi,\s*Himachal Pradesh|Didwana,\s*Rajasthan)\b/gi);
        if (locMatch) {
          const idx = cleanLine.toLowerCase().indexOf(locMatch[0].toLowerCase());
          location = cleanLine.substring(idx).replace(/^[\s,\|-]+/, '').trim();
          cleanLine = cleanLine.substring(0, idx).replace(/[\s,\|-]+$/, '').trim();
        }

        cleanLine = cleanDatesFromText(cleanLine).replace(/^[\s,\|-]+|[\s,\|-]+$/g, '').trim();

        if (!cleanLine) return;

        const isDegree = /\b(?:B\.?Tech|B\.?E\.?|B\.?Sc|B\.?A|B\.?B\.?A|M\.?Tech|M\.?E\.?|M\.?S|M\.?Sc|M\.?A|Bachelor|Master|Ph\.?D|Graduate|Postgraduate|Secondary|Senior Secondary|High School|Matriculation|CBSE|RBSE|ICSE|Diploma|Class XII|Class X|10th|12th)\b/i.test(cleanLine);
        const isInstitution = /\b(?:School|University|College|Institute|Academy|Vidhyalaya|Vidyalaya|Public School|EduSystem)\b/i.test(cleanLine);

        const hasInst = currentEdu && currentEdu.institution && currentEdu.institution !== 'Institution';
        const hasDeg = currentEdu && currentEdu.degree && currentEdu.degree !== 'Degree';

        const shouldStartNew = !currentEdu || 
                               (isInstitution && hasInst) || 
                               (isDegree && hasDeg) || 
                               (hasInst && hasDeg);

        if (shouldStartNew) {
          if (currentEdu) {
            educationEntries.push(currentEdu);
          }
          currentEdu = {
            degree: 'Degree',
            fieldOfStudy: '',
            institution: 'Institution',
            location: '',
            gpa: '',
            startDate: '',
            endDate: ''
          };
        }

        const currentHasInst = currentEdu && currentEdu.institution && currentEdu.institution !== 'Institution';
        const currentHasDeg = currentEdu && currentEdu.degree && currentEdu.degree !== 'Degree';

        if (isDegree) {
          currentEdu.degree = cleanLine;
        } else if (isInstitution) {
          currentEdu.institution = cleanLine;
        } else {
          if (!currentHasInst) {
            currentEdu.institution = cleanLine;
          } else if (!currentHasDeg) {
            currentEdu.degree = cleanLine;
          } else if (!currentEdu.fieldOfStudy) {
            currentEdu.fieldOfStudy = cleanLine;
          }
        }

        if (location) currentEdu.location = location;
        if (gpa) currentEdu.gpa = gpa;
        if (dateInfo.startDate) {
          currentEdu.startDate = dateInfo.startDate;
          currentEdu.endDate = dateInfo.endDate;
        }
      });

      if (currentEdu) {
        educationEntries.push(currentEdu);
      }

      result.education = educationEntries.map(edu => {
        if (edu.degree === 'Degree') edu.degree = '';
        if (edu.institution === 'Institution') edu.institution = '';
        return edu;
      }).filter(edu => edu.degree || edu.institution);

    } else if (currentSection === 'skills') {
      sectionContent.forEach(line => {
        let cleanLine = line.replace(/^[a-zA-Z\s&/\\|():\-\–\—]+:/, '').trim();
        const parts = cleanLine.split(/[,;|•·\*\t]|\s{2,}/);
        parts.forEach(part => {
          const skill = part.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
          if (skill && (skill.length > 1 || skill.toLowerCase() === 'c' || skill.toLowerCase() === 'r') && skill.length < 40 && !/(?:19|20)\d{2}\b/.test(skill)) {
            foundSkills.add(skill);
          }
        });
      });

    } else if (currentSection === 'experience') {
      let currentExp = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–') || line.startsWith('—') || line.startsWith('·') || /^\d+\.\s/.test(line);
        const cleanLine = cleanLeadingBullets(line);
        if (!cleanLine) return;

        const isTimeline = /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b|(?:19|20)\d{2}\b/i.test(cleanLine) && cleanLine.length < 40;
        const isTechList = isPureTechList(cleanLine);

        if (isBullet || (cleanLine.length >= 60 && !isLikelyExperienceTitle(cleanLine))) {
          if (!currentExp) {
            currentExp = { company: 'Company', role: 'Software Engineer', startDate: '', endDate: '', location: '', description: [], highlights: [] };
          }
          if (currentExp.description.length > 0 && !isBullet && !line.startsWith(' ') && !/^[A-Z]/.test(cleanLine)) {
            const lastIdx = currentExp.description.length - 1;
            currentExp.description[lastIdx] += ' ' + cleanLine;
            currentExp.highlights[lastIdx] += ' ' + cleanLine;
          } else {
            currentExp.description.push(cleanLine);
            currentExp.highlights.push(cleanLine);
          }
        } else if (isTimeline || isTechList) {
          if (!currentExp) {
            currentExp = { company: 'Company', role: 'Software Engineer', startDate: '', endDate: '', location: '', description: [], highlights: [] };
          }
          if (isTimeline) {
            const dates = cleanLine.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/gi);
            if (dates && dates.length > 0) {
              currentExp.startDate = dates[0];
              if (dates.length > 1) {
                currentExp.endDate = dates[1];
              } else if (cleanLine.toLowerCase().includes('present')) {
                currentExp.endDate = 'Present';
              }
            }
          }
        } else if (isLikelyExperienceTitle(cleanLine) && !isPureTechList(cleanLine)) {
          if (currentExp && (currentExp.highlights.length > 0 || currentExp.company !== 'Company')) {
            result.experience.push(currentExp);
            currentExp = null;
          }

          let company = cleanLine;
          let role = 'Software Engineer';
          if (cleanLine.includes('@')) {
            const parts = cleanLine.split('@');
            role = parts[0].trim();
            company = parts[1].trim();
          } else if (cleanLine.includes('|')) {
            const parts = cleanLine.split('|');
            company = parts[0].trim();
            role = parts[1].trim();
          } else if (cleanLine.includes('–')) {
            const parts = cleanLine.split('–');
            company = parts[0].trim();
            role = parts[1].trim();
          } else if (cleanLine.includes('-') && !/(?:19|20)\d{2}\b/.test(cleanLine)) {
            const parts = cleanLine.split('-');
            company = parts[0].trim();
            role = parts[1].trim();
          }

          let companyClean = cleanTimelineAndSkillsFromName(company);
          let roleClean = cleanTimelineAndSkillsFromName(role);
          const roleKeywords = /\b(?:engineer|developer|designer|manager|analyst|lead|architect|intern|specialist|consultant|programmer|tester|administrator|exec|executive|director|vp|head)\b/i;
          if (roleKeywords.test(companyClean) && !roleKeywords.test(roleClean)) {
            const temp = companyClean;
            companyClean = roleClean;
            roleClean = temp;
          }

          if (!currentExp) {
            currentExp = {
              company: companyClean,
              role: roleClean,
              startDate: '',
              endDate: '',
              location: '',
              description: [],
              highlights: []
            };
          } else {
            currentExp.company = companyClean;
            currentExp.role = roleClean;
          }
        } else {
          if (currentExp) {
            if (currentExp.description.length > 0) {
              const lastIdx = currentExp.description.length - 1;
              currentExp.description[lastIdx] += ' ' + cleanLine;
              currentExp.highlights[lastIdx] += ' ' + cleanLine;
            } else {
              currentExp.description.push(cleanLine);
              currentExp.highlights.push(cleanLine);
            }
          }
        }
      });
      if (currentExp) {
        result.experience.push(currentExp);
      }
    } else if (currentSection === 'projects') {
      let currentProj = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.startsWith('–') || line.startsWith('—') || line.startsWith('·') || /^\d+\.\s/.test(line);
        let cleanLine = cleanLeadingBullets(line);
        if (!cleanLine) return;

        const dateRegex = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-zA-Z]*[\s,.]*\d{4})|\b(?:19|20)\d{2}\b|\bPresent\b/gi;
        const dateMatch = cleanLine.match(dateRegex);
        const isTimeline = dateMatch && cleanLine.length < 40;
        const isTechList = isPureTechList(cleanLine);

        // Scan for links on this line
        const linkMatch = cleanLine.match(/(?:https?:\/\/|www\.)[^\s\)]+|github\.com\/[a-zA-Z0-9_\-\.\/]+/i);
        let extractedLink = '';
        if (linkMatch) {
          extractedLink = linkMatch[0].trim();
        }

        if (isTimeline) {
          if (currentProj) {
            currentProj.date = cleanLine;
          }
          return; // Skip adding it to description/highlights
        }

        if (isBullet || !isNewProjectStart(cleanLine, currentProj)) {
          if (!currentProj) {
            currentProj = { name: 'Project', description: [], technologies: [], highlights: [], link: '', date: '' };
          }
          
          if (extractedLink && !currentProj.link) {
            currentProj.link = extractedLink;
          }

          if (isTechList) {
            const techs = cleanLine.split(/[,/–-]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
            currentProj.technologies = [...new Set([...currentProj.technologies, ...techs])];
          } else {
            // Keep the exact original line wording for descriptions (don't strip link to avoid incomplete sentences)
            if (currentProj.description.length > 0 && !isBullet && !line.startsWith(' ') && !/^[A-Z]/.test(cleanLine)) {
              const lastIdx = currentProj.description.length - 1;
              currentProj.description[lastIdx] += ' ' + cleanLine;
              currentProj.highlights[lastIdx] += ' ' + cleanLine;
            } else {
              currentProj.description.push(cleanLine);
              currentProj.highlights.push(cleanLine);
            }
          }
        } else {
          if (currentProj && (currentProj.highlights.length > 0 || currentProj.name !== 'Project')) {
            result.projects.push(currentProj);
            currentProj = null;
          }

          // Clean link out of project title line to avoid splitting issues or cluttered title
          let nameLine = cleanLine;
          let projLink = '';
          if (extractedLink) {
            projLink = extractedLink;
            nameLine = nameLine.replace(extractedLink, '')
              .replace(/\(\s*\)/g, '')
              .replace(/\[\s*\]/g, '')
              .replace(/^[•\-\*\–\—\·\s|:,\/()\[\]]+|[•\-\*\–\—\·\s|:,\/()\[\]]+$/g, '')
              .replace(/\s+/g, ' ')
              .trim();
          }

          // Extract date/timeline from nameLine if any
          let projDate = '';
          const titleDateMatches = nameLine.match(dateRegex);
          if (titleDateMatches && titleDateMatches.length > 0) {
            projDate = titleDateMatches.join(' – ');
            nameLine = nameLine.replace(dateRegex, '')
              .replace(/^[•\-\*\–\—\·\s|:,\/()\[\]\–\-]+|[•\-\*\–\—\·\s|:,\/()\[\]\–\-]+$/g, '')
              .replace(/\s+/g, ' ')
              .trim();
          }

          let name = nameLine;
          let technologies = [];
          if (nameLine.includes('|')) {
            const parts = nameLine.split('|');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          } else if (nameLine.includes(':')) {
            const parts = nameLine.split(':');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          }

          currentProj = {
            name: cleanTimelineAndSkillsFromName(name),
            description: [],
            technologies,
            highlights: [],
            link: projLink,
            date: projDate
          };
        }
      });
      if (currentProj) {
        result.projects.push(currentProj);
      }

    } else if (currentSection === 'certifications') {
      let certList = [];
      let currentCertText = '';
      
      sectionContent.forEach(line => {
        const isBullet = /^[•\-\*\–\—\·]/.test(line.trim());
        const cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        
        if (isBullet) {
          if (currentCertText) {
            certList.push(currentCertText);
            currentCertText = '';
          }
          if (cleanLine) {
            currentCertText = cleanLine;
          }
        } else {
          if (cleanLine) {
            if (currentCertText) {
              currentCertText += ' ' + cleanLine;
            } else {
              currentCertText = cleanLine;
            }
          }
        }
      });
      if (currentCertText) {
        certList.push(currentCertText);
      }

      certList.forEach(certText => {
        let name = certText;
        let issuer = '';
        let date = '';
        if (certText.includes('|')) {
          const parts = certText.split('|');
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('by')) {
          const parts = certText.split(/\bby\b/i);
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('–')) {
          const parts = certText.split('–');
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (certText.includes('-')) {
          if (!/\d{4}\s*-\s*\d{4}/.test(certText)) {
            const parts = certText.split('-');
            name = parts[0].trim();
            issuer = parts[1].trim();
          }
        }
        
        const dateMatch = certText.match(/(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b|(?:19|20)\d{2}\b/i);
        if (dateMatch) {
          date = dateMatch[0];
          name = name.replace(date, '').replace(/[\(\),\-\–\—\s]+$/, '').trim();
          if (issuer) {
            issuer = issuer.replace(date, '').replace(/[\(\),\-\–\—\s]+$/, '').trim();
          }
        }
        result.certifications.push({ name, issuer, date });
      });

    } else if (currentSection === 'achievements') {
      let achList = [];
      let currentAch = '';
      sectionContent.forEach(line => {
        const isBullet = /^[•\-\*\–\—\·]/.test(line.trim());
        const cleanLine = line.replace(/^[•\-\*\–\—\·\s]+/, '').trim();
        
        if (isBullet) {
          if (currentAch) {
            achList.push(currentAch);
            currentAch = '';
          }
          if (cleanLine) {
            currentAch = cleanLine;
          }
        } else {
          if (cleanLine) {
            if (currentAch) {
              currentAch += ' ' + cleanLine;
            } else {
              currentAch = cleanLine;
            }
          }
        }
      });
      if (currentAch) {
        achList.push(currentAch);
      }
      result.achievements = achList;

    } else if (currentSection === 'summary') {
      result.summary = sectionContent.map(l => l.trim()).filter(Boolean).join(' ');
    }
    sectionContent = [];
  };

  lines.forEach(line => {
    const detected = isSectionHeader(line);
    if (detected) {
      flushSection();
      currentSection = detected;
    } else if (currentSection) {
      sectionContent.push(line);
    } else {
      preHeaderLines.push(line);
    }
  });
  flushSection();

  if (!result.summary && preHeaderLines.length > 0) {
    const localEmailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const localPhoneRegex = /(?:\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/;
    const cleanSummaryLines = preHeaderLines.filter(line => {
      const lower = line.toLowerCase();
      if (lower.includes('@') || localEmailRegex.test(line) || localPhoneRegex.test(line)) return false;
      if (lower.includes('linkedin.com') || lower.includes('github.com') || /https?:\/\//i.test(line)) return false;
      if (result.name && lower.includes(result.name.toLowerCase())) return false;
      if (line.length < 20) return false;
      if (/^[•\-\*\–\—\·\s\|]+$/.test(line)) return false;
      if (isPureTechList(line)) return false;
      return true;
    });
    if (cleanSummaryLines.length > 0) {
      result.summary = cleanSummaryLines.join(' ');
    }
  }

  if (result.experience.length === 0 && result.education.length === 0 && result.projects.length === 0) {
    const descLines = lines.slice(1, 10).filter(l => l.length > 10 && !l.includes('@'));
    if (descLines.length > 0) {
      result.experience.push({
        company: 'Resume Import',
        role: 'Candidate Profile Details',
        startDate: '',
        endDate: '',
        location: '',
        description: descLines,
        highlights: descLines
      });
    }
  }

  if (result.projects) {
    result.projects = result.projects.map(proj => {
      const { cleanedBullets, technologies } = cleanProjectBulletsAndExtractTechs(proj.description || [], proj.technologies || []);
      return {
        ...proj,
        description: cleanedBullets,
        highlights: cleanedBullets,
        technologies: technologies
      };
    });
  }

  result.skills = Array.from(foundSkills);
  return result;
};

const getEmptySchema = () => ({
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: []
});

