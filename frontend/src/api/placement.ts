import api from './axios';

export interface ATSAnalysisResult {
    match_score: number;
    missing_keywords: string[];
    matched_keywords: string[];
    critical_gaps: string;
    recommendation: string;
}

export interface TailoredResumeResult {
    tailored_bullets: string[];
    explanation: string;
}

export interface OutreachResult {
    email_subject: string;
    email_body: string;
    linkedin_dm: string;
}

export const placementApi = {
    analyzeAtsMatch: async (resumeText: string, jobDescription: string): Promise<{ success: boolean; data: ATSAnalysisResult }> => {
        const response = await api.post('/placement/analyze-ats', { resumeText, jobDescription });
        return response.data;
    },

    tailorResumeBullets: async (originalBullets: string[], jobDescription: string, missingKeywords: string[]): Promise<{ success: boolean; data: TailoredResumeResult }> => {
        const response = await api.post('/placement/tailor-resume', { originalBullets, jobDescription, missingKeywords });
        return response.data;
    },

    generateColdOutreach: async (resumeText: string, jobDescription: string, targetCompany: string, targetRole: string): Promise<{ success: boolean; data: OutreachResult }> => {
        const response = await api.post('/placement/generate-outreach', { resumeText, jobDescription, targetCompany, targetRole });
        return response.data;
    }
};
