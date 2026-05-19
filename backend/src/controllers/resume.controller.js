/**
 * Resume Analysis Controller
 * Handles AI-powered resume analysis with user-specific storage
 * 
 * Each user gets their own resume analysis - NO shared data
 */

import { asyncHandler } from '../middleware/error.middleware.js';
import User from '../models/User.model.js';
import aiService from '../services/aiService.js';
import { compileLatexToPdf, isPdflatexAvailable } from '../services/latexCompiler.service.js';
import { extractResumeTextFromStoredFile } from '../services/resumeTextExtractor.service.js';
import { buildAdvancedResumeReport } from '../services/resumeReport.service.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getTemplateById } from '../data/latexTemplates.js';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import OpenAI from 'openai';

const buildResumeAnalysisPayload = (aiAnalysis, role, advancedReport = {}) => ({
  overallScore: advancedReport.overallScore || aiAnalysis.overall_score || aiAnalysis.ats_score || 0,
  sections: aiAnalysis.sections || [],
  keywords: advancedReport.keywords || aiAnalysis.keywords || [],
  missingKeywords: advancedReport.missingKeywords || aiAnalysis.missing_keywords || [],
  keywordMatchScore: advancedReport.keywordAnalysis?.keywordMatchRate || 0,
  suggestions: aiAnalysis.suggestions || [],
  improvedLines: advancedReport.improvedLines || aiAnalysis.improved_lines || [],
  suggestedSummary: advancedReport.resumeRewrite?.summaryRewrite || aiAnalysis.suggested_summary || '',
  jobMatch: advancedReport.jobMatch || {
    score: aiAnalysis.job_match?.score || 0,
    matchedSkills: aiAnalysis.jobMatch?.matchedSkills || aiAnalysis.job_match?.matched_skills || [],
    missingSkills: aiAnalysis.jobMatch?.missingSkills || aiAnalysis.job_match?.missing_skills || [],
    feedback: aiAnalysis.jobMatch?.feedback || aiAnalysis.job_match?.feedback || ''
  },
  skillGapsDetailed: aiAnalysis.skillGapsDetailed || aiAnalysis.skill_gaps_detailed || [],
  formatAnalysis: aiAnalysis.formatAnalysis || aiAnalysis.format_analysis || [],
  improvementPlan: aiAnalysis.improvement_plan || [],
  industryComparison: aiAnalysis.industry_comparison || [],
  strengthsSummary: aiAnalysis.strengths || [],
  weaknessesSummary: aiAnalysis.weaknesses || [],
  extractedData: {
    skills: aiAnalysis.extracted_data?.skills || [],
    experience: aiAnalysis.extracted_data?.experience || [],
    education: aiAnalysis.extracted_data?.education || [],
    projects: aiAnalysis.extracted_data?.projects || [],
    certifications: aiAnalysis.extracted_data?.certifications || []
  },
  analyzedAt: new Date(),
  analyzerVersion: '2.0.0',
  targetRoleUsed: role,
  roleContext: advancedReport.roleContext,
  keywordAnalysis: advancedReport.keywordAnalysis,
  parsedResume: advancedReport.parsedResume,
  skillGapAnalysis: advancedReport.skillGapAnalysis,
  atsBreakdown: advancedReport.atsBreakdown,
  projectQualityEvaluation: advancedReport.projectQualityEvaluation,
  aiRecommendations: advancedReport.aiRecommendations,
  resumeRewrite: advancedReport.resumeRewrite,
  recruiterSimulation: advancedReport.recruiterSimulation,
  linkedinOptimization: advancedReport.linkedinOptimization,
  resumeRanking: advancedReport.resumeRanking,
  interviewSuccess: advancedReport.interviewSuccess,
  scoreSimulation: advancedReport.scoreSimulation,
  careerRoadmap: advancedReport.careerRoadmap,
  mentorContextPrompts: advancedReport.mentorContextPrompts,
});

const appendAtsHistory = (user, { score, targetRole, source }) => {
  if (!user.atsHistory) {
    user.atsHistory = [];
  }

  user.atsHistory.unshift({
    score,
    targetRole,
    source,
    analyzedAt: new Date(),
  });

  if (user.atsHistory.length > 20) {
    user.atsHistory = user.atsHistory.slice(0, 20);
  }
};

/**
 * @desc    Analyze resume using AI and store results in user profile
 * @route   POST /api/resume/analyze
 * @access  Private
 */
export const analyzeResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { resumeText, targetRole, jobDescription, demoJobId } = req.body;

  // Get user for profile context
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const role = targetRole || user.targetRole || 'Software Engineer';
  let normalizedResumeText = (resumeText || '').trim();

  if (!normalizedResumeText) {
    if (!user.resumeUrl) {
      res.status(400);
      throw new Error('Resume text is required. Paste resume text or upload resume (PDF/DOCX).');
    }

    try {
      normalizedResumeText = await extractResumeTextFromStoredFile(user.resumeUrl, user.resumeOriginalName);
    } catch (extractError) {
      res.status(400);
      throw new Error(extractError.message || 'Could not extract text from uploaded resume');
    }
  }

  if (normalizedResumeText.length < 50) {
    res.status(400);
    throw new Error('Resume content is too short for ATS analysis. Paste complete resume text or upload a clearer PDF/DOCX file.');
  }

  try {
    // Call AI service for comprehensive analysis
    const aiAnalysis = await aiService.analyzeResume(normalizedResumeText, role);
    const advancedReport = buildAdvancedResumeReport({
      aiAnalysis,
      resumeText: normalizedResumeText,
      role,
      user,
      jobDescription,
      demoJobId,
    });

    // Store analysis in user profile (user-specific!)
    const resumeAnalysis = buildResumeAnalysisPayload(aiAnalysis, role, advancedReport);

    // Update user with analysis and keep text for future role-based rechecks.
    user.resumeAnalysis = resumeAnalysis;
    user.atsScore = resumeAnalysis.overallScore || 0;
    appendAtsHistory(user, {
      score: resumeAnalysis.overallScore || 0,
      targetRole: role,
      source: 'analyze',
    });
    user.resumeText = normalizedResumeText;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        analysis: resumeAnalysis,
        userId: userId
      }
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500);
    throw new Error(`Resume analysis failed: ${error.message}`);
  }
});

/**
 * @desc    Get user's stored resume analysis
 * @route   GET /api/resume/analysis
 * @access  Private
 */
export const getResumeAnalysis = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select('resumeAnalysis resumeUrl targetRole atsHistory').lean();
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    success: true,
    data: {
      analysis: user.resumeAnalysis || null,
      hasResume: !!user.resumeUrl,
      targetRole: user.targetRole,
      atsHistory: user.atsHistory || [],
    }
  });
});

/**
 * @desc    Ask AI Resume Mentor a question
 * @route   POST /api/resume/mentor/ask
 * @access  Private
 */
export const askMentor = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { question, context } = req.body;

  if (!question) {
    return res.status(400).json({
      success: false,
      message: 'Question is required'
    });
  }

  // Get user profile for personalized responses
  const user = await User.findById(userId)
    .select('name targetRole resumeAnalysis knownTechnologies degree college')
    .lean();

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const userProfile = {
    name: user.name,
    targetRole: user.targetRole,
    knownTechnologies: user.knownTechnologies,
    degree: user.degree,
    college: user.college,
    currentAtsScore: user.resumeAnalysis?.overallScore,
    currentStrengths: user.resumeAnalysis?.strengthsSummary,
    currentWeaknesses: user.resumeAnalysis?.weaknessesSummary
  };

  try {
    const response = await aiService.askResumeMentor(question, userProfile, user.resumeAnalysis, context);

    res.status(200).json({
      success: true,
      data: {
        answer: response.answer || response.response,
        mentorName: 'Prepzo AI Mentor',
        relatedTopics: response.related_topics || [],
        actionItems: response.action_items || []
      }
    });
  } catch (error) {
    console.error('Mentor query error:', error.message);
    // Provide a helpful fallback response
    const fallbackAnswers = {
      resume: "Focus on quantifying your achievements with numbers (e.g., 'Improved performance by 30%'). Tailor your experience to match the job description keywords, and ensure your skills section highlights technologies mentioned in the role requirements.",
      skills: "For your target role, prioritize building both technical and soft skills. Use a combination of online courses, hands-on projects, and practice problems. Document everything you learn and add it to your portfolio.",
      interview: "Prepare by practicing common behavioral questions using the STAR method. For technical interviews, focus on data structures, algorithms, and system design. Mock interviews can help build confidence.",
      default: "I'd recommend starting with your resume analysis to identify areas for improvement. Focus on matching your skills and experience to your target role's requirements. Feel free to ask specific questions about resume formatting, skills to highlight, or interview preparation!"
    };
    
    // Determine which fallback to use based on the question
    let fallbackKey = 'default';
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('resume') || lowerQuestion.includes('cv')) fallbackKey = 'resume';
    else if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn')) fallbackKey = 'skills';
    else if (lowerQuestion.includes('interview')) fallbackKey = 'interview';
    
    res.status(200).json({
      success: true,
      data: {
        answer: fallbackAnswers[fallbackKey],
        mentorName: 'Prepzo AI Mentor',
        relatedTopics: ['Resume Tips', 'Interview Prep', 'Skill Building'],
        actionItems: ['Analyze your resume', 'Practice coding problems', 'Research target companies'],
        isFallback: true
      }
    });
  }
});

/**
 * @desc    Get quick tip from AI Mentor
 * @route   GET /api/resume/mentor/quick-tip
 * @access  Private
 */
export const getQuickTip = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const category = req.query.category || 'general';

  const user = await User.findById(userId)
    .select('targetRole resumeAnalysis')
    .lean();

  try {
    const response = await aiService.getResumeMentorQuickTip(
      user?.targetRole || 'Software Engineer',
      category
    );

    res.status(200).json({
      success: true,
      data: {
        tip: response.tip,
        category: response.category || category,
        mentorName: 'Prepzo AI Mentor'
      }
    });
  } catch (error) {
    console.error('Quick tip error:', error.message);
    // Return a fallback tip instead of throwing an error
    const fallbackTips = {
      general: "Focus on quantifying your achievements with numbers and metrics - this makes your resume stand out to both ATS systems and recruiters!",
      skills: "List your most relevant technical skills at the top of your skills section, and include proficiency levels for clarity.",
      experience: "Use action verbs like 'Developed', 'Implemented', 'Led', and 'Optimized' to start your bullet points for maximum impact.",
      achievements: "Transform responsibilities into achievements by adding 'resulting in...' or 'which led to...' after describing your actions.",
      formatting: "Keep your resume to 1-2 pages, use consistent formatting, and ensure adequate white space for readability."
    };
    
    res.status(200).json({
      success: true,
      data: {
        tip: fallbackTips[category] || fallbackTips.general,
        category: category,
        mentorName: 'Prepzo AI Mentor',
        isFallback: true
      }
    });
  }
});

/**
 * @desc    Get improvement checklist from AI Mentor
 * @route   GET /api/resume/mentor/checklist
 * @access  Private
 */
export const getChecklist = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
    .select('targetRole resumeAnalysis')
    .lean();

  if (!user?.resumeAnalysis) {
    // Return a generic checklist if no analysis exists
    return res.status(200).json({
      success: true,
      data: {
        checklist: [
          { item: 'Upload your resume for AI analysis', completed: false, priority: 1 },
          { item: 'Add quantifiable achievements (numbers, percentages)', completed: false, priority: 2 },
          { item: 'Include relevant technical skills', completed: false, priority: 3 },
          { item: 'Tailor experience to target role', completed: false, priority: 4 },
          { item: 'Optimize for ATS keywords', completed: false, priority: 5 }
        ],
        priorityOrder: ['Upload resume', 'Add metrics', 'Skills', 'Experience', 'ATS'],
        mentorName: 'Prepzo AI Mentor',
        isFallback: true
      }
    });
  }

  try {
    const response = await aiService.getResumeMentorChecklist(
      user.resumeAnalysis,
      user.targetRole || 'Software Engineer'
    );

    res.status(200).json({
      success: true,
      data: {
        checklist: response.checklist,
        priorityOrder: response.priority_order,
        mentorName: 'Prepzo AI Mentor'
      }
    });
  } catch (error) {
    console.error('Checklist error:', error.message);
    // Return a fallback checklist based on resume analysis
    const analysis = user.resumeAnalysis;
    const fallbackChecklist = [
      { item: 'Improve overall ATS score', completed: (analysis.overallScore || 0) >= 70, priority: 1 },
      { item: 'Add more quantifiable achievements', completed: false, priority: 2 },
      { item: 'Include missing skills for target role', completed: false, priority: 3 },
      { item: 'Strengthen summary section', completed: false, priority: 4 },
      { item: 'Review and update experience bullets', completed: false, priority: 5 }
    ];
    
    res.status(200).json({
      success: true,
      data: {
        checklist: fallbackChecklist,
        priorityOrder: ['ATS', 'Achievements', 'Skills', 'Summary', 'Experience'],
        mentorName: 'Prepzo AI Mentor',
        isFallback: true
      }
    });
  }
});

/**
 * @desc    Get role-specific skill requirements
 * @route   GET /api/resume/skills/:role
 * @access  Private
 */
export const getRoleSkills = asyncHandler(async (req, res) => {
  const { role } = req.params;

  // Fallback skill data for common roles
  const fallbackSkills = {
    'Software Engineer': {
      required: ['JavaScript', 'Python', 'Data Structures', 'Algorithms', 'Git', 'SQL'],
      preferred: ['React', 'Node.js', 'System Design', 'AWS', 'Docker'],
      keywords: ['Full Stack', 'Backend', 'API', 'Microservices', 'Agile']
    },
    'Frontend Developer': {
      required: ['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'TypeScript'],
      preferred: ['Next.js', 'Vue.js', 'Tailwind CSS', 'Redux', 'Testing'],
      keywords: ['UI/UX', 'Responsive', 'Accessibility', 'Performance', 'SPA']
    },
    'Backend Developer': {
      required: ['Node.js', 'Python', 'SQL', 'REST API', 'Git', 'Docker'],
      preferred: ['MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'System Design'],
      keywords: ['Microservices', 'Scalability', 'Security', 'CI/CD', 'Cloud']
    },
    'Data Scientist': {
      required: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Pandas', 'NumPy'],
      preferred: ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision'],
      keywords: ['Analytics', 'Modeling', 'Big Data', 'Visualization', 'MLOps']
    }
  };

  try {
    const response = await aiService.getRoleSkillRequirements(role);

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Role skills error:', error.message);
    // Return fallback skills
    const normalizedRole = Object.keys(fallbackSkills).find(
      r => r.toLowerCase().includes(role.toLowerCase()) || role.toLowerCase().includes(r.toLowerCase())
    ) || 'Software Engineer';
    
    const skills = fallbackSkills[normalizedRole];
    
    res.status(200).json({
      success: true,
      data: {
        role: role,
        required_skills: skills.required,
        preferred_skills: skills.preferred,
        keywords: skills.keywords,
        isFallback: true
      }
    });
  }
});

/**
 * @desc    Get action verb suggestions
 * @route   GET /api/resume/action-verbs
 * @access  Private
 */
export const getActionVerbs = asyncHandler(async (req, res) => {
  const { category } = req.query;

  try {
    const response = await aiService.getActionVerbs(category);

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Action verbs error:', error);
    res.status(500);
    throw new Error(`Failed to get action verbs: ${error.message}`);
  }
});

/**
 * @desc    Re-analyze resume with different target role
 * @route   POST /api/resume/reanalyze
 * @access  Private
 */
export const reanalyzeResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { targetRole, jobDescription, demoJobId } = req.body;

  if (!targetRole) {
    res.status(400);
    throw new Error('Target role is required');
  }

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!user.resumeText && !user.resumeUrl) {
    res.status(400);
    throw new Error('No resume found. Please upload a resume first.');
  }

  // Use existing resume text or synthesize from stored extracted fields.
  let resumeText = user.resumeText;
  
  if (!resumeText) {
    if (user.resumeUrl) {
      try {
        resumeText = await extractResumeTextFromStoredFile(user.resumeUrl, user.resumeOriginalName);
      } catch {
        // Fallback to extracted analysis synthesis below.
      }
    }

    if (!resumeText) {
      const extracted = user.resumeAnalysis?.extractedData;
      const hasExtractedData = !!(
        extracted &&
        (
          (extracted.skills && extracted.skills.length) ||
          (extracted.experience && extracted.experience.length) ||
          (extracted.education && extracted.education.length) ||
          (extracted.projects && extracted.projects.length) ||
          (extracted.certifications && extracted.certifications.length)
        )
      );

      if (hasExtractedData) {
        const skillsLine = (extracted.skills || []).join(', ');
        const experienceLines = (extracted.experience || [])
          .map((exp) => `${exp.role || ''} at ${exp.company || ''} (${exp.duration || ''})`)
          .join('; ');
        const educationLines = (extracted.education || [])
          .map((edu) => `${edu.degree || ''} - ${edu.institution || ''} (${edu.year || ''})`)
          .join('; ');
        const projectLines = (extracted.projects || [])
          .map((proj) => `${proj.name || ''}: ${proj.description || ''} [${(proj.technologies || []).join(', ')}]`)
          .join('; ');
        const certificationsLine = (extracted.certifications || []).join(', ');

        resumeText = [
          `Skills: ${skillsLine}`,
          `Experience: ${experienceLines}`,
          `Education: ${educationLines}`,
          `Projects: ${projectLines}`,
          `Certifications: ${certificationsLine}`,
        ].join('\n');
      } else {
        res.status(400);
        throw new Error('Resume text not available for reanalysis. Run ATS check once with pasted text or upload PDF/DOCX.');
      }
    }
  }

  try {
    // Call AI service with new target role
    const aiAnalysis = await aiService.analyzeResume(resumeText, targetRole);
    const advancedReport = buildAdvancedResumeReport({
      aiAnalysis,
      resumeText,
      role: targetRole,
      user,
      jobDescription,
      demoJobId,
    });

    // Update user's resume analysis with new role
    const resumeAnalysis = buildResumeAnalysisPayload(aiAnalysis, targetRole, advancedReport);

    user.resumeAnalysis = resumeAnalysis;
    user.atsScore = resumeAnalysis.overallScore || 0;
    appendAtsHistory(user, {
      score: resumeAnalysis.overallScore || 0,
      targetRole,
      source: 'reanalyze',
    });
    user.resumeText = resumeText;
    user.targetRole = targetRole;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Resume re-analyzed for ${targetRole}`,
      data: {
        analysis: resumeAnalysis,
        newTargetRole: targetRole
      }
    });
  } catch (error) {
    console.error('Resume reanalysis error:', error);
    res.status(500);
    throw new Error(`Resume reanalysis failed: ${error.message}`);
  }
});

/**
 * @desc    Clear user's resume analysis (for fresh start)
 * @route   DELETE /api/resume/analysis
 * @access  Private
 */
export const clearAnalysis = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.resumeAnalysis = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Resume analysis cleared'
  });
});

/**
 * @desc    Generate resume using pure AI
 * @route   POST /api/resume/generate
 * @access  Private
 */
export const generateResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { targetRole, jobDescription, templateStyle } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prepare profile data for AI
  const userProfile = {
    fullName: user.name,
    degree: user.degree,
    stream: user.stream,
    year: user.year,
    skills: user.knownTechnologies || [],
    knownTechnologies: user.knownTechnologies || [],
    experienceText: user.resumeAnalysis?.extractedData?.experience?.length 
      ? JSON.stringify(user.resumeAnalysis.extractedData.experience) 
      : 'Entry Level / Career Beginner',
    projectsText: user.resumeAnalysis?.extractedData?.projects?.length
      ? JSON.stringify(user.resumeAnalysis.extractedData.projects)
      : 'Technical projects and academic work'
  };

  try {
    const result = await aiService.generateResume(
      userProfile, 
      targetRole || user.targetRole || 'Software Engineer', 
      jobDescription,
      templateStyle || 'Standard Professional ATS'
    );
    
    res.status(200).json({
      success: true,
      message: 'Resume generated successfully',
      data: result
    });
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500);
    throw new Error(`Resume generation failed: ${error.message}`);
  }
});

// =====================================================
// LATEX RESUME BUILDER CONTROLLERS
// =====================================================

/**
 * @desc    Compile LaTeX source to PDF
 * @route   POST /api/resume/compile-latex
 * @access  Private
 */
export const compileLatex = asyncHandler(async (req, res) => {
  const { latexSource } = req.body;

  if (!latexSource || !latexSource.trim()) {
    res.status(400);
    throw new Error('LaTeX source is required');
  }


  try {
    const result = await compileLatexToPdf(latexSource);

    // Update last compiled timestamp
    await User.findByIdAndUpdate(req.user._id, { latexLastCompiledAt: new Date() });

    res.status(200).json({
      success: true,
      message: 'LaTeX compiled successfully',
      data: result
    });
  } catch (error) {
    console.error('LaTeX compilation error:', error.message);
    res.status(422).json({
      success: false,
      message: 'LaTeX compilation failed',
      data: { log: error.message }
    });
  }
});

/**
 * @desc    Generate LaTeX resume using AI
 * @route   POST /api/resume/generate-latex
 * @access  Private
 */
export const generateLatexResume = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { templateId, targetRole, jobDescription } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Build user profile for AI
  const userProfile = {
    fullName: user.fullName || 'John Doe',
    email: user.email || '',
    phone: user.phone || '',
    linkedin: user.linkedin || '',
    github: user.github || '',
    location: '',
    degree: user.degree || '',
    fieldOfStudy: user.fieldOfStudy || '',
    collegeName: user.collegeName || '',
    yearOfStudy: user.yearOfStudy || '',
    cgpa: user.cgpa || '',
    skills: user.knownTechnologies || [],
    targetRole: targetRole || user.targetRole || 'Software Engineer',
    experience: user.resumeAnalysis?.extractedData?.experience || [],
    projects: user.resumeAnalysis?.extractedData?.projects || [],
    education: user.resumeAnalysis?.extractedData?.education || [],
    certifications: user.resumeAnalysis?.extractedData?.certifications || [],
    achievements: user.resumeAnalysis?.extractedData?.achievements || [],
    resumeText: user.resumeText || ''
  };

  const template = getTemplateById(templateId || 'jakes-resume');
  if (!template) {
    res.status(404);
    throw new Error('LaTeX template not found');
  }

  let prompt = `
You are an expert LaTeX developer and career assistant.
Your task is to take a professional LaTeX resume template and populate it with the user's profile information.

User Profile:
${JSON.stringify(userProfile)}

LaTeX Template:
${template.source}
`;

  if (jobDescription && jobDescription.trim()) {
    prompt += `
Job Description to tailor against:
${jobDescription.trim()}

Instructions:
1. Populate the template with the user's information.
2. Tailor and optimize the professional summary, experience bullet points, and skills to highlight keywords and requirements from the Job Description to maximize ATS match score.
3. Keep the LaTeX formatting, commands, styling, and package imports exactly as defined in the template.
4. Escape any LaTeX special characters in the user's profile text (e.g. & to \\&, % to \\%, _ to \\_, etc.) to prevent compilation errors.
5. Output JSON format containing:
   {
     "latex": "your compiled LaTeX source code as a single string",
     "tips": ["Tip 1", "Tip 2"]
   }
`;
  } else {
    prompt += `
Instructions:
1. Populate the template with the user's information.
2. Optimize the content to be highly professional and general high-ATS compliant.
3. Keep the LaTeX formatting, commands, styling, and package imports exactly as defined in the template.
4. Escape any LaTeX special characters in the user's profile text (e.g. & to \\&, % to \\%, _ to \\_, etc.) to prevent compilation errors.
5. Output JSON format containing:
   {
     "latex": "your compiled LaTeX source code as a single string",
     "tips": ["Tip 1", "Tip 2"]
   }
`;
  }

  let result = null;
  let usedFallback = false;
  let usedFailsafe = false;
  const errors = [];

  // 1. Try Gemini
  const geminiKey = process.env.GEMINI_API_KEY;
  const isGeminiPlaceholder = !geminiKey || geminiKey === 'your-gemini-api-key' || geminiKey.trim() === '';

  if (!isGeminiPlaceholder) {
    try {
      console.log('[generateLatex] Attempting generation with Gemini...');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json' }
      });

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      result = JSON.parse(text);
      console.log('[generateLatex] Gemini generation succeeded');
    } catch (error) {
      console.error('[generateLatex] Gemini generation failed:', error.message);
      errors.push(`Gemini Error: ${error.message}`);
    }
  } else {
    console.log('[generateLatex] Gemini API key is missing or placeholder. Skipping.');
    errors.push('Gemini: API key missing/placeholder');
  }

  // 2. Try Groq (Independent from Gemini status)
  if (!result) {
    const groqKey = process.env.GROQ_API_KEY;
    const isGroqAvailable = groqKey && groqKey !== 'your-groq-api-key' && groqKey.trim() !== '';

    if (isGroqAvailable) {
      try {
        console.log('[generateLatex] Attempting fallback generation with Groq (llama-3.3-70b-versatile)...');
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
        result = JSON.parse(completion.choices[0].message.content);
        usedFallback = true;
        console.log('[generateLatex] Groq fallback generation succeeded');
      } catch (error) {
        console.error('[generateLatex] Groq fallback failed:', error.message);
        errors.push(`Groq Error: ${error.message}`);
      }
    } else {
      console.log('[generateLatex] Groq API key is missing or placeholder. Skipping.');
      errors.push('Groq: API key missing/placeholder');
    }
  }

  // 3. Try OpenAI (Independent from Gemini/Groq status)
  if (!result) {
    const openaiKey = process.env.OPENAI_API_KEY;
    const isOpenaiAvailable = openaiKey && openaiKey !== 'sk-your-openai-api-key' && openaiKey.trim() !== '';

    if (isOpenaiAvailable) {
      try {
        console.log('[generateLatex] Attempting fallback generation with OpenAI (gpt-4o-mini)...');
        const openai = new OpenAI({ apiKey: openaiKey });
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          temperature: 0.7,
        });
        result = JSON.parse(completion.choices[0].message.content);
        usedFallback = true;
        console.log('[generateLatex] OpenAI fallback generation succeeded');
      } catch (error) {
        console.error('[generateLatex] OpenAI fallback failed:', error.message);
        errors.push(`OpenAI Error: ${error.message}`);
      }
    } else {
      console.log('[generateLatex] OpenAI API key is missing or placeholder. Skipping.');
      errors.push('OpenAI: API key missing/placeholder');
    }
  }

  // 4. Try Local Failsafe Template Engine if all AI providers failed
  if (!result) {
    try {
      console.log('[generateLatex] All AI providers failed. Using local Failsafe Template Engine...');
      
      const escapeLatex = (str) => {
        if (typeof str !== 'string') return '';
        return str
          .replace(/\\/g, '\\\\')
          .replace(/&/g, '\\&')
          .replace(/%/g, '\\%')
          .replace(/\$/g, '\\$')
          .replace(/#/g, '\\#')
          .replace(/_/g, '\\_')
          .replace(/\{/g, '\\{')
          .replace(/\}/g, '\\}')
          .replace(/~/g, '\\textasciitilde{}')
          .replace(/\^/g, '\\textasciicircum{}');
      };

      const cleanName = escapeLatex(userProfile.fullName);
      const cleanEmail = escapeLatex(userProfile.email);
      const cleanPhone = escapeLatex(userProfile.phone);
      const cleanLinkedin = escapeLatex(userProfile.linkedin);
      const cleanGithub = escapeLatex(userProfile.github);
      const cleanLocation = escapeLatex(userProfile.location || 'San Francisco, CA');
      
      // Formatting education
      let educationItems = '';
      if (userProfile.education && userProfile.education.length > 0) {
        userProfile.education.forEach(edu => {
          educationItems += `  \\resumeSubheading\n    {${escapeLatex(edu.institution || edu.school || 'University')}}{${escapeLatex(edu.location || '')}}\n    {${escapeLatex(edu.degree || 'Degree')}${edu.fieldOfStudy ? ' in ' + escapeLatex(edu.fieldOfStudy) : ''}}{${escapeLatex(edu.startDate || '')} -- ${escapeLatex(edu.endDate || 'Present')}}\n`;
        });
      } else {
        educationItems = `  \\resumeSubheading\n    {${escapeLatex(userProfile.collegeName || 'University Name')}}{}\n    {${escapeLatex(userProfile.degree || 'Bachelor of Science')} ${userProfile.fieldOfStudy ? 'in ' + escapeLatex(userProfile.fieldOfStudy) : ''}}{${escapeLatex(userProfile.yearOfStudy || '')}}\n`;
      }

      // Formatting experience
      let experienceItems = '';
      if (userProfile.experience && userProfile.experience.length > 0) {
        userProfile.experience.forEach(exp => {
          const bulletsList = Array.isArray(exp.description) ? exp.description : [exp.description].filter(Boolean);
          const bullets = bulletsList
            .map(bullet => `      \\resumeItem{${escapeLatex(bullet)}}`)
            .join('\n');
          experienceItems += `  \\resumeSubheading\n    {${escapeLatex(exp.company || 'Company')}}{${escapeLatex(exp.location || '')}}\n    {${escapeLatex(exp.position || 'Software Engineer')}}{${escapeLatex(exp.startDate || '')} -- ${escapeLatex(exp.endDate || 'Present')}}\n    \\resumeItemListStart\n${bullets || '      \\resumeItem{Contributed to development and deployment of projects.}'}\n    \\resumeItemListEnd\n`;
        });
      } else {
        experienceItems = `  \\resumeSubheading\n    {Software Engineering Internship}{}\n    {Junior Developer}{Present}\n    \\resumeItemListStart\n      \\resumeItem{Developed, tested and optimized responsive web applications.}\n      \\resumeItem{Collaborated with teammates to build custom RESTful APIs and databases.}\n    \\resumeItemListEnd\n`;
      }

      // Formatting projects
      let projectItems = '';
      if (userProfile.projects && userProfile.projects.length > 0) {
        userProfile.projects.forEach(proj => {
          const bulletsList = Array.isArray(proj.description) ? proj.description : [proj.description].filter(Boolean);
          const bullets = bulletsList
            .map(bullet => `      \\resumeItem{${escapeLatex(bullet)}}`)
            .join('\n');
          const techString = Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || '');
          projectItems += `  \\resumeProjectHeading\n    {\\textbf{${escapeLatex(proj.title || 'Project')}} $|$ \\emph{${escapeLatex(techString || 'React, Node.js')}}}{${escapeLatex(proj.date || '')}}\n    \\resumeItemListStart\n${bullets || '      \\resumeItem{Built and deployed the application, improving performance.}'}\n    \\resumeItemListEnd\n`;
        });
      } else {
        projectItems = `  \\resumeProjectHeading\n    {\\textbf{Portfolio Website} $|$ \\emph{React, Tailwind CSS}}{}\n    \\resumeItemListStart\n      \\resumeItem{Designed and developed a personal portfolio site to showcase projects.}\n    \\resumeItemListEnd\n`;
      }

      // Formatting skills
      let skillsItems = '';
      if (userProfile.skills && userProfile.skills.length > 0) {
        skillsItems = `\\textbf{Languages/Technologies}{: ${escapeLatex(userProfile.skills.join(', '))}}`;
      } else {
        skillsItems = `\\textbf{Languages/Technologies}{: JavaScript, TypeScript, Node.js, Python, React, MongoDB, Git}`;
      }

      const summaryText = `Results-oriented ${escapeLatex(userProfile.targetRole)} with a strong foundation in modern software engineering principles. Dedicated to writing clean, maintainable, and efficient code to solve complex real-world problems.`;

      // Fill in placeholders
      let latexSource = template.source
        .replace(/\{\{NAME\}\}/g, cleanName)
        .replace(/\{\{EMAIL\}\}/g, cleanEmail)
        .replace(/\{\{PHONE\}\}/g, cleanPhone)
        .replace(/\{\{LINKEDIN\}\}/g, cleanLinkedin)
        .replace(/\{\{GITHUB\}\}/g, cleanGithub)
        .replace(/\{\{LOCATION\}\}/g, cleanLocation)
        .replace(/\{\{SUMMARY\}\}/g, summaryText)
        .replace(/\{\{EDUCATION_ITEMS\}\}/g, educationItems)
        .replace(/\{\{EXPERIENCE_ITEMS\}\}/g, experienceItems)
        .replace(/\{\{PROJECT_ITEMS\}\}/g, projectItems)
        .replace(/\{\{SKILLS_ITEMS\}\}/g, skillsItems);

      result = {
        latex: latexSource,
        tips: [
          "Note: All AI provider API keys failed or were invalid. This resume was compiled using the local failsafe template engine.",
          `AI Provider Errors: ${errors.join(' | ')}`
        ]
      };
      usedFailsafe = true;
      console.log('[generateLatex] Local Failsafe generation succeeded');
    } catch (failsafeError) {
      console.error('[generateLatex] Failsafe generation failed:', failsafeError.message);
      res.status(500);
      throw new Error(`LaTeX generation failed. AI Errors: ${errors.join(' | ')}. Failsafe Error: ${failsafeError.message}`);
    }
  }

  res.status(200).json({
    success: true,
    message: usedFailsafe 
      ? 'LaTeX resume generated (local failsafe engine)'
      : (usedFallback ? 'LaTeX resume generated (fallback provider)' : 'LaTeX resume generated'),
    data: {
      latex: result.latex || '',
      tips: result.tips || []
    }
  });
});

/**
 * @desc    Save LaTeX source to user profile
 * @route   PUT /api/resume/latex-source
 * @access  Private
 */
export const saveLatexSource = asyncHandler(async (req, res) => {
  const { latexSource, templateId } = req.body;

  await User.findByIdAndUpdate(req.user._id, {
    latexResumeSource: latexSource || '',
    latexTemplateId: templateId || ''
  });

  // Commit the LaTeX resume to the repository
  try {
    const userId = req.user._id.toString();
    const resumesDir = path.join(process.cwd(), 'uploads', 'resumes');
    
    // Ensure uploads/resumes directory exists
    if (!existsSync(resumesDir)) {
      mkdirSync(resumesDir, { recursive: true });
    }
    
    const texPath = path.join(resumesDir, `resume_${userId}.tex`);
    writeFileSync(texPath, latexSource || '', 'utf-8');

    // Run git commands: git add and git commit
    const cmd = `git add "${texPath}" && git commit -m "Auto-commit: saved LaTeX resume for user ${userId}"`;
    exec(cmd, { cwd: process.cwd() }, (gitErr, stdout, stderr) => {
      if (gitErr) {
        console.error('[gitCommit] git commit failed:', gitErr.message);
      } else {
        console.log('[gitCommit] git commit succeeded:', stdout);
      }
    });
  } catch (err) {
    console.error('[gitCommit] Error writing or committing LaTeX file:', err.message);
  }

  res.status(200).json({
    success: true,
    message: 'LaTeX source saved'
  });
});

/**
 * @desc    Get saved LaTeX source
 * @route   GET /api/resume/latex-source
 * @access  Private
 */
export const getLatexSource = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('latexResumeSource latexTemplateId');

  res.status(200).json({
    success: true,
    data: {
      latexSource: user?.latexResumeSource || '',
      templateId: user?.latexTemplateId || ''
    }
  });
});

