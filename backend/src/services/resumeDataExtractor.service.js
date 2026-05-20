import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Extract structured resume data from raw text using Gemini 1.5 Flash.
 * Returns a JSON structure matching the frontend schema.
 * 
 * @param {string} resumeText - The raw text extracted from a resume.
 * @returns {Promise<Object>} The parsed resume details.
 */
export const extractResumeDataWithAI = async (resumeText) => {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey || geminiKey === 'your-gemini-api-key' || geminiKey.trim() === '') {
    console.warn('[resumeDataExtractor] GEMINI_API_KEY is missing. Falling back to empty structure.');
    return getEmptySchema();
  }

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

  try {
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const response = await model.generateContent(prompt);
    const responseText = response.response.text();
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
      result.experience = result.experience.map(exp => ({
        company: exp.company || '',
        role: exp.role || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        location: exp.location || '',
        description: exp.description || '',
        highlights: Array.isArray(exp.highlights) ? exp.highlights.filter(Boolean) : []
      }));
    }
    if (result.projects) {
      result.projects = result.projects.map(proj => ({
        name: proj.name || '',
        description: proj.description || '',
        technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : [],
        highlights: Array.isArray(proj.highlights) ? proj.highlights.filter(Boolean) : [],
        link: proj.link || ''
      }));
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
    return getEmptySchema();
  }
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
