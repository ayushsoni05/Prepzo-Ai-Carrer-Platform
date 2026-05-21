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
  const parenthesizedDateRegex = /\([\s\-\–\—a-zA-Z0-9\/\.]*\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present|20\d\d)\b[\s\-\–\—a-zA-Z0-9\/\.]*\)/gi;
  cleaned = cleaned.replace(parenthesizedDateRegex, '');

  // 2. Remove standard month patterns with optional year
  const monthRegex = /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b\s*\d{0,4}/gi;
  cleaned = cleaned.replace(monthRegex, '');

  // 3. Remove standalone year or Present markers
  const presentOrYearRegex = /\b(?:Present|20\d\d)\b/gi;
  cleaned = cleaned.replace(presentOrYearRegex, '');

  // 4. Clean up any double spaces, trailing brackets, dashes or dangling dividers
  cleaned = cleaned.replace(/^[\s\-\–\—\|,\(\)•\·\*\+]+|[\s\-\–\—\|,\(\)•\·\*\+]+$/g, '').replace(/\s+/g, ' ').trim();
  return cleaned || name;
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
Extract as much information as possible. Do not paraphrase or shorten bullet points; capture the exact meaning and details.

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
  ]
}

CRITICAL RULES FOR STRUCTURAL CLEANLINESS:
1. DO NOT append dates, timeline ranges, technologies, or links into the "name" of the project or "company"/"role" of the experience. Keep them strictly in their respective fields (e.g. "startDate", "endDate", "technologies", "link").
2. Capture all bullet points. Do not omit details or summarize multiple items into a single string.
3. Clean all text to be free of raw formatting chars (like bullet characters •, -, * at the beginning of parsed fields).
4. If a field is not found in the resume, use an empty string or empty array as specified in the schema.

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
        return {
          name: cleanTimelineAndSkillsFromName(proj.name || proj.title || ''),
          description: bullets.filter(Boolean),
          technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : [],
          highlights: bullets.filter(Boolean),
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

    return result;
  } catch (error) {
    console.error('[resumeDataExtractor] Extraction error:', error);
    return extractLocalFallback(resumeText);
  }
};

export const isPureTechList = (line) => {
  const trimmed = (line || '').trim();
  if (!trimmed) return false;

  if (trimmed.includes('|')) {
    const firstPart = trimmed.split('|')[0].trim().toLowerCase();
    const techKeywords = new Set([
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
      'html', 'css', 'sass', 'react', 'react.js', 'angular', 'vue', 'vue.js', 'next.js', 'node.js', 'node', 'express', 'express.js', 'django', 'flask',
      'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'docker', 'kubernetes', 'aws', 'git', 'github', 'rest api', 'graphql'
    ]);
    if (!techKeywords.has(firstPart) && !Array.from(techKeywords).some(k => firstPart === k || firstPart.includes(' ' + k) || firstPart.includes(k + ' '))) {
      return false;
    }
  }

  const parts = trimmed.split(/[,/|;]/).map(p => p.trim().toLowerCase()).filter(Boolean);
  if (parts.length > 1) {
    const techKeywords = new Set([
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php', 'swift', 'kotlin',
      'html', 'css', 'sass', 'react', 'react.js', 'angular', 'vue', 'vue.js', 'next.js', 'node.js', 'node', 'express', 'express.js', 'django', 'flask',
      'mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'docker', 'kubernetes', 'aws', 'git', 'github', 'rest api', 'graphql',
      'jwt', 'apis', 'rest apis', 'computer vision', 'opencv', 'mediapipe', 'numpy', 'scipy', 'pandas', 'scikit-learn'
    ]);
    const matchCount = parts.filter(p => {
      const cleanPart = p.replace(/\(.*\)/g, '').replace(/[\d\.]+/g, '').replace(/[^a-z\+\#\s]/g, '').trim();
      return techKeywords.has(cleanPart) || Array.from(techKeywords).some(k => cleanPart === k || cleanPart.startsWith(k + ' ') || cleanPart.endsWith(' ' + k));
    }).length;
    if (matchCount >= parts.length * 0.7 && matchCount >= 2) {
      return true;
    }
  }
  return false;
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

export const extractLocalFallback = (resumeText) => {
  const lines = (resumeText || '').split('\n').map(l => l.trim()).filter(Boolean);
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
    certifications: []
  };

  if (lines.length === 0) return result;

  // 1. Name is typically the first line
  result.name = lines[0].replace(/[^a-zA-Z\s.-]/g, '').trim();
  if (result.name.length > 50 || result.name.split(' ').length > 4) {
    result.name = '';
  }

  // 2. Extract email, phone, links
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

  // 3. Keep a set of found skills
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

  // 4. Section parsing
  let currentSection = '';
  let sectionContent = [];

  const flushSection = () => {
    if (!currentSection || sectionContent.length === 0) return;

    if (currentSection === 'education') {
      const degreeRegex = /(B\.?Tech|M\.?Tech|B\.?S|M\.?S|Bachelor|Master|Ph\.?D|Graduate|Degree|School|University|College)/i;
      let currentEdu = null;
      sectionContent.forEach(line => {
        const cleanLine = line.replace(/^[•\-\*\s]+/, '').trim();
        if (!cleanLine) return;

        const isDegree = /(B\.?Tech|M\.?Tech|B\.?S|M\.?S|Bachelor|Master|Ph\.?D|Graduate|Degree)/i.test(cleanLine);
        const isInstitution = /(School|University|College|Institute|Academy)/i.test(cleanLine);
        const isTimeline = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(cleanLine) && cleanLine.length < 40;

        if (isDegree || isInstitution) {
          if (currentEdu && (currentEdu.degree !== 'Degree' || currentEdu.institution !== 'Institution')) {
            result.education.push(currentEdu);
            currentEdu = null;
          }
          if (!currentEdu) {
            currentEdu = { degree: 'Degree', fieldOfStudy: '', institution: 'Institution', location: '', gpa: '', startDate: '', endDate: '' };
          }
          if (isDegree) {
            currentEdu.degree = cleanLine;
          } else {
            currentEdu.institution = cleanLine;
          }
        } else if (isTimeline) {
          if (!currentEdu) {
            currentEdu = { degree: 'Degree', fieldOfStudy: '', institution: 'Institution', location: '', gpa: '', startDate: '', endDate: '' };
          }
          const dates = cleanLine.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\b\d{4})\b/gi);
          if (dates && dates.length > 0) {
            currentEdu.startDate = dates[0];
            if (dates.length > 1) {
              currentEdu.endDate = dates[1];
            }
          }
        } else if (cleanLine.toLowerCase().includes('gpa') || cleanLine.toLowerCase().includes('cgpa')) {
          if (!currentEdu) {
            currentEdu = { degree: 'Degree', fieldOfStudy: '', institution: 'Institution', location: '', gpa: '', startDate: '', endDate: '' };
          }
          const gpaMatch = cleanLine.match(/\b\d+(\.\d+)?(\s*\/\s*\d+)?\b/);
          if (gpaMatch) {
            currentEdu.gpa = gpaMatch[0];
          }
        } else {
          if (currentEdu) {
            if (currentEdu.institution === 'Institution') {
              currentEdu.institution = cleanLine;
            } else if (!currentEdu.fieldOfStudy) {
              currentEdu.fieldOfStudy = cleanLine;
            }
          }
        }
      });
      if (currentEdu) {
        result.education.push(currentEdu);
      }
    } else if (currentSection === 'skills') {
      sectionContent.forEach(line => {
        let cleanLine = line.replace(/^[a-zA-Z\s&/\\|():\-\–\—]+:/, '').trim();
        const parts = cleanLine.split(/[,;|•·\*\t]|\s{2,}/);
        parts.forEach(part => {
          const skill = part.replace(/^[•\-\*\s]+/, '').trim();
          if (skill && skill.length > 1 && skill.length < 40 && !/\b(?:19|20)\d{2}\b/.test(skill)) {
            foundSkills.add(skill);
          }
        });
      });
    } else if (currentSection === 'experience') {
      let currentExp = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+\.\s/.test(line);
        const cleanLine = line.replace(/^[•\-\*\d\.\s·]+/, '').trim();
        if (!cleanLine) return;

        const isTimeline = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(cleanLine) && cleanLine.length < 40;
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
            const dates = cleanLine.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\b\d{4})\b/gi);
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
          } else if (cleanLine.includes('-') && !/\b(19|20)\d{2}\b/.test(cleanLine)) {
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
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+\.\s/.test(line);
        const cleanLine = line.replace(/^[•\-\*\d\.\s·]+/, '').trim();
        if (!cleanLine) return;

        const isTimeline = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|20\d\d)\b/i.test(cleanLine) && cleanLine.length < 40;
        const isTechList = isPureTechList(cleanLine);
        const isLink = cleanLine.toLowerCase().includes('github.com') || cleanLine.toLowerCase().includes('http');

        if (isBullet || (cleanLine.length >= 60 && !isLikelyProjectTitle(cleanLine))) {
          if (!currentProj) {
            currentProj = { name: 'Project', description: [], technologies: [], highlights: [], link: '' };
          }
          if (currentProj.description.length > 0 && !isBullet && !line.startsWith(' ') && !/^[A-Z]/.test(cleanLine)) {
            const lastIdx = currentProj.description.length - 1;
            currentProj.description[lastIdx] += ' ' + cleanLine;
            currentProj.highlights[lastIdx] += ' ' + cleanLine;
          } else {
            currentProj.description.push(cleanLine);
            currentProj.highlights.push(cleanLine);
          }
        } else if (isTimeline || isTechList || isLink) {
          if (!currentProj) {
            currentProj = { name: 'Project', description: [], technologies: [], highlights: [], link: '' };
          }
          if (isTechList) {
            const techs = cleanLine.split(/[,/|–-]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 25);
            currentProj.technologies = [...new Set([...currentProj.technologies, ...techs])];
          } else if (isLink) {
            const linkMatch = cleanLine.match(/https?:\/\/[^\s]+|github\.com\/[^\s]+/i);
            if (linkMatch) {
              currentProj.link = linkMatch[0];
            }
          }
        } else if (isLikelyProjectTitle(cleanLine) && !isPureTechList(cleanLine)) {
          if (currentProj && (currentProj.highlights.length > 0 || currentProj.name !== 'Project')) {
            result.projects.push(currentProj);
            currentProj = null;
          }

          let name = cleanLine;
          let technologies = [];
          if (cleanLine.includes('|')) {
            const parts = cleanLine.split('|');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          } else if (cleanLine.includes(':')) {
            const parts = cleanLine.split(':');
            name = parts[0].trim();
            const techPart = parts[1].trim();
            technologies = techPart.split(/[,/]/).map(t => t.trim()).filter(Boolean);
          }

          if (!currentProj) {
            currentProj = {
              name: cleanTimelineAndSkillsFromName(name),
              description: [],
              technologies,
              highlights: [],
              link: ''
            };
          } else {
            currentProj.name = cleanTimelineAndSkillsFromName(name);
            if (technologies.length > 0) {
              currentProj.technologies = technologies;
            }
          }
        } else {
          if (currentProj) {
            if (currentProj.description.length > 0) {
              const lastIdx = currentProj.description.length - 1;
              currentProj.description[lastIdx] += ' ' + cleanLine;
              currentProj.highlights[lastIdx] += ' ' + cleanLine;
            } else {
              currentProj.description.push(cleanLine);
              currentProj.highlights.push(cleanLine);
            }
          }
        }
      });
      if (currentProj) {
        result.projects.push(currentProj);
      }
    } else if (currentSection === 'certifications') {
      sectionContent.forEach(line => {
        const cleanLine = line.replace(/^[•\-\*\s]+/, '').trim();
        if (!cleanLine) return;
        let name = cleanLine;
        let issuer = '';
        let date = '';
        if (cleanLine.includes('|')) {
          const parts = cleanLine.split('|');
          name = parts[0].trim();
          issuer = parts[1].trim();
        } else if (cleanLine.includes('by')) {
          const parts = cleanLine.split(/\bby\b/i);
          name = parts[0].trim();
          issuer = parts[1].trim();
        }
        const dateMatch = cleanLine.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|\b\d{4})\b/i);
        if (dateMatch) {
          date = dateMatch[0];
          name = name.replace(date, '').replace(/[\(\),\-\–\—\s]+$/, '').trim();
        }
        result.certifications.push({ name, issuer, date });
      });
    }
    sectionContent = [];
  };

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('education') || lowerLine.includes('academic')) {
      flushSection();
      currentSection = 'education';
    } else if (lowerLine.includes('experience') || lowerLine.includes('work history') || lowerLine.includes('employment')) {
      flushSection();
      currentSection = 'experience';
    } else if (lowerLine.includes('projects') || lowerLine.includes('personal projects')) {
      flushSection();
      currentSection = 'projects';
    } else if (lowerLine.includes('skills') || lowerLine.includes('technologies') || lowerLine.includes('tech stack')) {
      flushSection();
      currentSection = 'skills';
    } else if (lowerLine.includes('certifications') || lowerLine.includes('courses')) {
      flushSection();
      currentSection = 'certifications';
    } else if (currentSection) {
      sectionContent.push(line);
    }
  });
  flushSection();

  // If no sections were parsed but we have lines, populate a default experience
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
  certifications: []
});
