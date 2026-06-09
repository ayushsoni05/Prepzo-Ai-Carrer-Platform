import { asyncHandler } from '../middleware/error.middleware.js';
import { extractResumeDataWithAI } from '../services/resumeDataExtractor.service.js';
import { createRequire } from 'module';
import mammoth from 'mammoth';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

/**
 * Helper to normalize extracted text
 */
const normalizeText = (rawText = '') =>
  rawText
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

/**
 * Extract text from file buffer
 */
const extractTextFromBuffer = async (buffer, originalname) => {
  const extension = originalname.split('.').pop().toLowerCase();

  if (extension === 'pdf') {
    const parsed = await pdfParse(buffer);
    return normalizeText(parsed.text || '');
  }

  if (extension === 'docx') {
    const parsed = await mammoth.extractRawText({ buffer });
    return normalizeText(parsed.value || '');
  }

  throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
};

/**
 * Parse date or year to number/string
 */
const parseGraduationYear = (dateStr) => {
  if (!dateStr) return new Date().getFullYear();
  const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/);
  return yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
};

/**
 * Parse GPA string to number
 */
const parseCGPA = (gpaStr) => {
  if (!gpaStr) return undefined;
  const gpaMatch = gpaStr.match(/\b\d+(?:\.\d+)?\b/);
  return gpaMatch ? parseFloat(gpaMatch[0]) : undefined;
};

/**
 * Map AI extracted resume data to application form data structure
 */
const mapToApplicationSchema = (extracted) => {
  if (!extracted) return {};

  const name = extracted.name || '';
  const email = extracted.email || '';
  const phone = extracted.phone || '';
  const linkedin = extracted.linkedin || '';
  const github = extracted.github || '';
  
  // Location parsing
  let city = '';
  let state = '';
  if (extracted.location) {
    const parts = extracted.location.split(',').map(p => p.trim());
    city = parts[0] || '';
    state = parts[1] || '';
  }

  // Education mapping
  const education = (extracted.education || []).map(edu => ({
    degree: edu.degree || '',
    field: edu.fieldOfStudy || '',
    institution: edu.institution || '',
    university: edu.institution || '',
    graduationYear: parseGraduationYear(edu.endDate),
    cgpa: parseCGPA(edu.gpa),
  }));

  if (education.length === 0) {
    education.push({
      degree: '',
      field: '',
      institution: '',
      university: '',
      graduationYear: new Date().getFullYear(),
    });
  }

  // Work experience mapping
  const workExperience = (extracted.experience || []).map(exp => {
    let description = '';
    if (Array.isArray(exp.highlights)) {
      description = exp.highlights.join('\n');
    } else if (typeof exp.description === 'string') {
      description = exp.description;
    }

    return {
      companyName: exp.company || '',
      jobTitle: exp.role || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      isCurrent: exp.endDate ? exp.endDate.toLowerCase().includes('present') : false,
      description,
      location: exp.location || '',
    };
  });

  return {
    personalInfo: {
      fullName: name,
      email,
      phone,
      alternatePhone: '',
      dateOfBirth: '',
      gender: undefined,
      address: {
        street: '',
        city,
        state,
        pincode: '',
        country: 'India',
      },
    },
    education,
    workExperience,
    skills: extracted.skills || [],
    links: {
      linkedin,
      github,
      portfolio: '',
      other: '',
    },
    availability: {
      noticePeriod: 'Immediate',
      preferredJoiningDate: '',
      expectedSalary: undefined,
      willingToRelocate: false,
    },
    additionalInfo: {
      howDidYouHear: '',
      whyThisRole: extracted.summary || '',
      additionalNotes: '',
    },
  };
};

/**
 * @desc    Parse resume file and extract structured data
 * @route   POST /api/resume/parse
 * @access  Private
 */
export const parseResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a resume file (PDF or DOCX)');
  }

  try {
    // Extract text from uploaded buffer
    const text = await extractTextFromBuffer(req.file.buffer, req.file.originalname);
    
    if (!text || text.length < 50) {
      res.status(400);
      throw new Error('Resume file seems empty or could not be read properly.');
    }

    // Call existing AI extractor
    const extractedData = await extractResumeDataWithAI(text);
    
    // Map to the Application form schema
    const mappedData = mapToApplicationSchema(extractedData);

    res.status(200).json({
      success: true,
      message: 'Resume parsed successfully',
      data: mappedData,
    });
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500);
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
});
