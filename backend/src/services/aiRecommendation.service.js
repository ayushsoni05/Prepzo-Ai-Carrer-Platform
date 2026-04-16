/**
 * AI Recommendation Service (Prepzo Pro)
 * Powered by Google Gemini
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Resource Library for high-fidelity thumbnails (Common Skills)
const RESOURCE_METADATA = {
    'dsa': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    'coding': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    'system design': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80',
    'os': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    'dbms': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    'database': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    'oops': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
    'javascript': 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
    'typescript': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    'frontend': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    'node': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    'backend': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    'python': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'java': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    'sql': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    'machine learning': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80',
    'data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'cloud': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    'api': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80',
    'devops': 'https://images.unsplash.com/photo-1618401471353-b98a520d9e46?w=800&q=80',
    'network': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&q=80'
};

const getThumbnail = (skill) => {
    if (!skill || typeof skill !== 'string') return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80';
    const key = skill.toLowerCase();
    for (const [k, v] of Object.entries(RESOURCE_METADATA)) {
        if (key.includes(k)) return v;
    }
    return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'; // Generic high-tech
};

/**
 * Generate Pure AI Recommendations
 */
export const generateAIRecommendations = async (data) => {
    const { studentProfile, assessmentResults, targetRole } = data;
    const score = assessmentResults.overallScore || 0;
    const isBeginner = score <= 20;

    // Upgraded to Gemini 1.5 Pro for maximum accuracy, robust reasoning, and pure AI involvement
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: { responseMimeType: "application/json" }
    });

    const isBeginnerCondition = isBeginner 
        ? "BEGGINER STARTUP CASE (SCORE <= 20%): The roadmap MUST be a 'Beginner Foundation Roadmap'. YOU MUST RECOMMEND ALL FUNDAMENTAL SKILLS for their target role because they are weak in everything. YOU MUST PROVIDE EXACTLY 2 TO 3 HIGH-QUALITY RECOMMENDATIONS (inclusive of Course, YouTube, and Project) FOR **EVERY SINGLE REQUIRED SKILL**. Ensure a 100% comprehensive roadmap." 
        : "Focus on their weak skills (score < 60%). For EACH weak skill, provide exactly 1-2 high-quality recommendations.";

    const prompt = `
    You are the Prepzo AI Placement Mentor, an elite career advisor with 100% accuracy in skill gap analysis. 
    Analyze this student's assessment results and generate a PURE AI-based career roadmap and resource recommendation.
    
    Student Profile: ${JSON.stringify(studentProfile)}
    Assessment Score: ${score}%
    Target Role: ${targetRole}
    Section Performance (Operational Modules): ${JSON.stringify(assessmentResults.sections || assessmentResults.sectionResults)}
    
    CRITICAL INSTRUCTIONS:
    1. ${isBeginnerCondition}
    2. Based on the "Section Performance" (Operational Modules), DO NOT just stick to the initial Target Role. Recommend 3 distinct career paths that fit this student's module scores.
    3. Each recommendation MUST include: title, platform/channel, type (Course/YouTube/Project), level, a brief "Why This?", and crucially the explicit "skill" attribute.
    4. Provide a structured "Success Roadmap" with at least 3-4 Phases and 8-12 weeks total.
    5. Pure AI involvement: Ensure every piece of reasoning, summary, and recommendation logic is distinct and mathematically aligned with their exact weaknesses.
    
    RESPONSE FORMAT (JSON ONLY - DO NOT WRAP IN BACKTICKS):
    {
      "analysis": {
        "strengthSummary": "...",
        "weaknessSummary": "...",
        "skillGapAnalysis": "...",
        "overallAssessment": "...",
        "careerReadinessScore": ${score},
        "interviewConfidence": ${Math.min(score + 15, 100)},
        "strengths": ["skill1"],
        "primaryWeaknesses": ["skill1"]
      },
      "career_paths": [
        { "role": "Role Name", "fit_score": 95, "why_this_role": "Because you scored high in X and Y modules", "market_demand": "High", "salary_expectation": "$70k - $90k" }
      ],
      "prioritySkillGaps": [
        { "skill": "...", "priority": "critical/important", "reasoning": "..." }
      ],
      "recommendations": {
        "courses": [ { "title": "...", "platform": "...", "level": "...", "whyThisCourse": "...", "skill": "...", "duration": "..." } ],
        "youtube": [ { "playlistTitle": "...", "channelName": "...", "url": "...", "skill": "..." } ],
        "projects": [ { "title": "...", "description": "...", "techStack": ["..."], "difficulty": "...", "skill": "..." } ],
        "certifications": [ { "title": "...", "issuingAuthority": "...", "duration": "...", "resumeImpact": 15, "url": "..." } ],
        "studyNotes": [ { "title": "...", "category": "...", "skillsCovered": ["..."] } ],
        "interviewPrep": [ { "title": "...", "category": "...", "timeToComplete": "..." } ],
        "practice": [ { "title": "...", "type": "...", "matchPercentage": 90 } ]
      },
      "improvementPrediction": {
        "currentScore": ${score},
        "predictedScore": ${Math.min(score + 45, 100)},
        "improvementPercentage": 45,
        "timeToAchieve": "12 weeks",
        "interviewConfidenceBoost": 25,
        "placementReadinessBoost": 35
      },
      "learningPath": {
        "title": "${isBeginner ? 'Beginner Foundation Masterclass' : 'Professional Placement Acceleration'}",
        "readinessGoal": "Market Ready",
        "weeklyCommitment": "15 Hours",
        "phases": [
          { "phase": "...", "weeks": "...", "focus": ["..."], "milestone": "...", "tasks": ["..."] }
        ]
      },
      "summary": "Detailed overall summary explanation based on findings that proves AI pure involvement.",
      "confidenceScore": 0.98
    }
    `;


    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        let aiData;
        try {
            // Trim any potential raw text or codeblock artifacts
            let cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const firstBrace = cleanedText.indexOf('{');
            const lastBrace = cleanedText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                cleanedText = cleanedText.slice(firstBrace, lastBrace + 1);
            }
            aiData = JSON.parse(cleanedText);
        } catch (e) {
            console.error('Failed to parse AI JSON:', e.message);
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error('Failed to extract JSON from AI response');
            aiData = JSON.parse(jsonMatch[0]);
        }

        // ENRICH WITH THUMBNAILS (Pure AI Matching logic)
        aiData.recommendations.courses = (aiData.recommendations.courses || []).map(c => ({
            ...c,
            thumbnail: getThumbnail(c.skill || c.title)
        }));
        
        aiData.recommendations.youtube = (aiData.recommendations.youtube || []).map(v => ({
            ...v,
            thumbnailUrl: getThumbnail(v.skill || v.playlistTitle)
        }));

        aiData.recommendations.projects = (aiData.recommendations.projects || []).map(p => ({
            ...p,
            thumbnailUrl: getThumbnail(p.skill || p.title)
        }));

        return {
            ...aiData,
            generatedBy: 'Gemini-1.5-Pro',
            metadata: {
                timestamp: new Date(),
                model: 'Gemini-1.5-Pro',
                accuracyTarget: '100%'
            }
        };
    } catch (error) {
        console.error('Gemini Recommendation Generation Failed:', error);
        throw error;
    }
};

/**
 * Generate Quick Insights
 */
export const generateQuickInsights = async (data) => {
    const { assessmentResults, placementReadinessScore } = data;
    
    // Quick heuristic logic for dashboard speed
    const strengths = assessmentResults.sectionResults?.filter(s => s.score >= 70).map(s => s.name) || [];
    const weaknesses = assessmentResults.sectionResults?.filter(s => s.score < 50).map(s => s.name) || [];

    return {
        readinessLevel: placementReadinessScore >= 80 ? 'Placement Ready' : placementReadinessScore >= 50 ? 'Developing' : 'Beginner',
        score: placementReadinessScore,
        summary: `You are currently in the ${placementReadinessScore >= 50 ? 'Intermediate' : 'Learning'} phase. Focus on ${weaknesses[0] || 'core concepts'} to increase your readiness score.`,
        highlights: [
            `Top Strength: ${strengths[0] || 'Learning Velocity'}`,
            `Key Area: ${weaknesses[0] || 'Domain Knowledge'}`
        ]
    };
};

export const validateRecommendations = (recs) => {
    return !!recs && typeof recs === 'object' && !!recs.analysis;
};
