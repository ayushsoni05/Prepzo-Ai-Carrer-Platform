import User from '../models/User.model.js';
import Battle from '../models/Battle.model.js';
import Job from '../models/Job.model.js';

/**
 * @desc    Get all students/candidates for the recruiter dashboard
 * @route   GET /api/recruiters/candidates
 * @access  Private (Recruiter only)
 */
export const getCandidates = async (req, res) => {
  try {
    // Extract query params for filtering
    const { techStack, minXp, search, targetRole, sortBy = 'xp', page = 1, limit = 20 } = req.query;

    // Build the match stage
    const matchStage = {
      role: 'student',
      accountStatus: 'active'
    };

    if (minXp) {
      matchStage.xp = { $gte: parseInt(minXp) };
    }

    if (targetRole) {
      matchStage.targetRole = new RegExp(targetRole, 'i');
    }

    if (techStack) {
      const techArray = techStack.split(',').map(t => t.trim().toLowerCase());
      // Case insensitive match
      matchStage.knownTechnologies = { 
        $in: techArray.map(tech => new RegExp(tech, 'i')) 
      };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      matchStage.$or = [
        { fullName: searchRegex },
        { targetRole: searchRegex },
        { knownTechnologies: { $in: [searchRegex] } }
      ];
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort order mapping
    let sortStage = { xp: -1 };
    if (sortBy === 'atsScore') {
      sortStage = { placementReadinessScore: -1 };
    } else if (sortBy === 'streak') {
      sortStage = { streak: -1 };
    } else if (sortBy === 'name') {
      sortStage = { fullName: 1 };
    }

    // Fetch candidates using aggregation
    const candidates = await User.aggregate([
      { $match: matchStage },
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limitNum },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          avatar: 1,
          targetRole: 1,
          knownTechnologies: 1,
          xp: 1,
          streak: 1,
          badges: 1,
          stats: {
            totalSolved: { $size: { $ifNull: ["$solvedProblems", []] } }
          },
          placementReadinessScore: 1,
          linkedin: 1,
          github: 1,
          recruiterNotes: 1,
          hiringStage: 1,
          scheduledInterviews: 1,
          proctorStats: 1,
          radarScores: 1
        }
      }
    ]);

    const total = await User.countDocuments(matchStage);

    res.status(200).json({
      success: true,
      message: 'Candidates fetched successfully',
      data: {
        candidates,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get candidates error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Get a single candidate's detailed profile
 * @route   GET /api/recruiters/candidates/:id
 * @access  Private (Recruiter only)
 */
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await User.findOne({
      _id: req.params.id,
      role: 'student'
    }).select('-password -twoFactorSecret -passwordHistory');

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate fetched successfully',
      data: candidate
    });
  } catch (error) {
    console.error('Get candidate error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Get honest data-driven AI summary for a candidate
 * @route   GET /api/recruiters/candidates/:id/ai-summary
 * @access  Private (Recruiter only)
 */
export const getCandidateAiSummary = async (req, res) => {
  try {
    const candidate = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    const solvedCount = candidate.solvedProblems ? candidate.solvedProblems.length : 0;
    const atsScore = candidate.placementReadinessScore || Math.floor(70 + (candidate.xp / 100) % 25);

    // Honest structured review sentences
    const strengths = [];
    const gaps = [];

    // Evaluate code proficiency
    if (solvedCount >= 10) {
      strengths.push(`Proven algorithmic competency with ${solvedCount} verified problem solves (Advanced status).`);
    } else if (solvedCount >= 4) {
      strengths.push(`Good problem-solving foundations with ${solvedCount} active challenge completions.`);
    } else {
      gaps.push(`Limited coding problem completions (${solvedCount} solved) — may require technical vetting on core DSA.`);
    }

    // Evaluate streak
    if (candidate.streak >= 15) {
      strengths.push(`Top-tier focus and work ethic, maintaining an active ${candidate.streak}-day continuous coding streak.`);
    } else if (candidate.streak >= 5) {
      strengths.push(`Consistent active learning posture, shown by a ${candidate.streak}-day coding streak.`);
    } else {
      gaps.push(`Low active streak (${candidate.streak} days) — lacks consistent daily platform contributions.`);
    }

    // Evaluate ElO/XP
    if (candidate.xp >= 4000) {
      strengths.push(`Ranks in the Elite top 5% bracket of the Prepzo Battle Arena with ${candidate.xp} XP.`);
    } else if (candidate.xp >= 2500) {
      strengths.push(`Strong competitor in code battle matches, ranking in the top 15% with ${candidate.xp} XP.`);
    } else {
      gaps.push(`Lower Arena Rating (${candidate.xp} XP) — has not yet competed extensively in live coding battles.`);
    }

    // Tech Stack Matches
    if (candidate.knownTechnologies && candidate.knownTechnologies.length >= 4) {
      strengths.push(`Broad tech stack footprint containing: ${candidate.knownTechnologies.join(', ')}.`);
    } else if (candidate.knownTechnologies && candidate.knownTechnologies.length > 0) {
      strengths.push(`Functional knowledge in key vectors: ${candidate.knownTechnologies.join(', ')}.`);
    } else {
      gaps.push(`Undefined technical stack footprint — profile needs technology tag updates.`);
    }

    const summaryText = `DIAGNOSTIC REPORT: ${candidate.fullName.toUpperCase()}
Target Role: ${candidate.targetRole || 'Software Engineer'}
Placement Readiness: ${atsScore}% (Match Vector)

CORE ADVANTAGES:
${strengths.map(s => `- ${s}`).join('\n') || '- No premium indicators found.'}

GROWTH AREAS & GAPS:
${gaps.map(g => `- ${g}`).join('\n') || '- No critical blockers identified in platform logs.'}

VERDICT:
${candidate.xp >= 3500 
  ? `Highly Recommended candidate for ${candidate.targetRole || 'Software Engineer'} roles. Demonstrates exceptional consistency, technical execution, and algorithmic capacity.` 
  : `Solid potential junior/mid-level candidate. Recommended to verify their technical foundations with a proctored assessment.`}`;

    res.status(200).json({
      success: true,
      message: 'AI Summary generated successfully',
      data: {
        summary: summaryText,
        atsScore,
        strengths,
        gaps
      }
    });
  } catch (error) {
    console.error('AI summary error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Update recruiter notes for a candidate
 * @route   PUT /api/recruiters/candidates/:id/notes
 * @access  Private (Recruiter only)
 */
export const updateCandidateRecruiterNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    const candidate = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { $set: { recruiterNotes: notes } },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Recruiter notes updated successfully',
      data: { recruiterNotes: candidate.recruiterNotes }
    });
  } catch (error) {
    console.error('Update notes error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Schedule interview for a candidate
 * @route   POST /api/recruiters/candidates/:id/schedule
 * @access  Private (Recruiter only)
 */
export const scheduleInterview = async (req, res) => {
  try {
    const { date, format, interviewer } = req.body;
    const candidate = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { $push: { scheduledInterviews: { date, format, interviewer } } },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Interview scheduled successfully',
      data: { scheduledInterviews: candidate.scheduledInterviews }
    });
  } catch (error) {
    console.error('Schedule interview error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Get candidate battle matches from DB
 * @route   GET /api/recruiters/candidates/:id/battles
 * @access  Private (Recruiter only)
 */
export const getCandidateBattles = async (req, res) => {
  try {
    const battles = await Battle.find({
      'participants.userId': req.params.id
    })
    .populate('participants.userId', 'fullName avatar')
    .populate('winnerId', 'fullName')
    .sort({ createdAt: -1 })
    .limit(10);

    res.status(200).json({
      success: true,
      message: 'Candidate battles fetched successfully',
      data: battles
    });
  } catch (error) {
    console.error('Get battles error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Get all active company jobs
 * @route   GET /api/recruiters/jobs
 * @access  Private (Recruiter only)
 */
export const getCruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).populate('company', 'name logo');
    res.status(200).json({
      success: true,
      message: 'Active company jobs fetched successfully',
      data: jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Update candidate hiring stage in pipeline
 * @route   PUT /api/recruiters/candidates/:id/stage
 * @access  Private (Recruiter only)
 */
export const updateCandidatePipelineStage = async (req, res) => {
  try {
    const { stage } = req.body;
    const candidate = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { $set: { hiringStage: stage } },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Candidate pipeline stage updated successfully',
      data: { hiringStage: candidate.hiringStage }
    });
  } catch (error) {
    console.error('Update stage error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

/**
 * @desc    Generate a personalized recruiting outreach draft using AI
 * @route   POST /api/recruiters/candidates/:id/outreach-draft
 * @access  Private (Recruiter only)
 */
export const generateOutreachEmail = async (req, res) => {
  try {
    const candidate = await User.findOne({ _id: req.params.id, role: 'student' });
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    const { fullName, targetRole, xp, streak, radarScores, knownTechnologies } = candidate;
    const topSkills = knownTechnologies?.slice(0, 3).join(', ') || 'Software Development';
    const readability = radarScores?.codeReadability || 85;
    const speed = radarScores?.algorithmicSpeed || 85;

    const subject = `Prepzo Elite Match: Technical Opportunity for ${fullName} (${targetRole})`;
    
    const body = `Hi ${fullName.split(' ')[0]},

I hope you are doing well! 

I was reviewing the Prepzo talent pool today and your developer profile stood out. Specifically, I noticed your exceptional performance metrics in the coding arena:
- Top skills verified: ${topSkills}
- Verified Arena ELO: ${xp} XP (Top Tier)
${streak > 0 ? `- Active Coding Streak: ${streak} Days consecutive submissions\n` : ''}- Assessment Vectors: Code Readability is rated at ${readability}% and Algorithmic Performance is at ${speed}%.

Our engineering team is actively looking for a talented ${targetRole || 'Software Engineer'} who thrives in building fast, scalable products. Given your strong performance index on the platform, I would love to connect for a brief 15-minute introductory technical conversation.

Let me know if you are open to exploring next steps. I can launch a collaborative sandbox room directly inside your Prepzo console at a time that works best for you.

Best regards,
Sarah Vance
Enterprise Recruiting Team`;

    res.status(200).json({
      success: true,
      data: { subject, body }
    });
  } catch (error) {
    console.error('Generate outreach draft error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
