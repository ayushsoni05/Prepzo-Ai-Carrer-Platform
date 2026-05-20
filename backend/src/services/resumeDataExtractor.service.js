import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

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
      "name": "Project name",
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
    const result = JSON.parse(responseText);
    
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
          company: exp.company || '',
          role: exp.role || exp.title || '',
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
          name: proj.name || proj.title || '',
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
    result.name = ''; // Reset if it doesn't look like a name
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

  // 3. Extract skills
  const COMMON_SKILLS = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C\\+\\+', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'HTML', 'CSS', 'Sass', 'React', 'Angular', 'Vue', 'Next.js', 'Nuxt.js', 'Node.js', 'Express', 'Django', 'Flask',
    'Spring Boot', 'ASP.NET', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Supabase',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'CI/CD', 'Jenkins', 'REST API', 'GraphQL',
    'Machine Learning', 'Deep Learning', 'Data Structures', 'Algorithms', 'System Design'
  ];
  const foundSkills = new Set();
  COMMON_SKILLS.forEach(skillPattern => {
    const regex = new RegExp(`\\b${skillPattern}\\b`, 'i');
    if (regex.test(resumeText)) {
      foundSkills.add(skillPattern.replace('\\+', '+'));
    }
  });
  result.skills = Array.from(foundSkills);

  // 4. Section parsing
  let currentSection = '';
  let sectionContent = [];

  const flushSection = () => {
    if (!currentSection || sectionContent.length === 0) return;

    if (currentSection === 'education') {
      const degreeRegex = /(B\.?Tech|M\.?Tech|B\.?S|M\.?S|Bachelor|Master|Ph\.?D|Graduate|Degree)/i;
      let degree = '';
      let institution = '';
      sectionContent.forEach(line => {
        const dMatch = line.match(degreeRegex);
        if (dMatch && !degree) {
          degree = line;
        } else if (!institution && line.length > 5 && !line.includes('GPA') && !line.includes('CGPA')) {
          institution = line;
        }
      });
      if (degree || institution) {
        result.education.push({
          degree: degree || 'Degree',
          fieldOfStudy: '',
          institution: institution || 'Institution',
          location: '',
          gpa: '',
          startDate: '',
          endDate: ''
        });
      }
    } else if (currentSection === 'experience') {
      let currentExp = null;
      sectionContent.forEach(line => {
        const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || /^\d+\.\s/.test(line);
        const cleanLine = line.replace(/^[•\-\*\d\.\s·]+/, '').trim();
        if (!cleanLine) return;

        if (isBullet || line.length >= 60) {
          if (!currentExp) {
            currentExp = { company: 'Company', role: 'Software Engineer', startDate: '', endDate: '', location: '', description: [], highlights: [] };
          }
          currentExp.description.push(cleanLine);
          currentExp.highlights.push(cleanLine);
        } else {
          if (currentExp) {
            result.experience.push(currentExp);
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
          } else if (cleanLine.includes('-') && !/\b(19|20)\d{2}\b/.test(cleanLine)) {
            const parts = cleanLine.split('-');
            company = parts[0].trim();
            role = parts[1].trim();
          }
          currentExp = {
            company,
            role,
            startDate: '',
            endDate: '',
            location: '',
            description: [],
            highlights: []
          };
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

        if (isBullet || line.length >= 60) {
          if (!currentProj) {
            currentProj = { name: 'Project', description: [], technologies: [], highlights: [], link: '' };
          }
          currentProj.description.push(cleanLine);
          currentProj.highlights.push(cleanLine);
        } else {
          if (currentProj) {
            result.projects.push(currentProj);
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
          currentProj = {
            name,
            description: [],
            technologies,
            highlights: [],
            link: ''
          };
        }
      });
      if (currentProj) {
        result.projects.push(currentProj);
      }
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
    } else if (lowerLine.includes('skills') || lowerLine.includes('technologies') || lowerLine.includes('certifications')) {
      flushSection();
      currentSection = 'other';
    } else if (currentSection) {
      sectionContent.push(line);
    }
  });
  flushSection();

  // If no sections were parsed but we have lines, populate a default experience to show they have parsed info
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
