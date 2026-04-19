import React, { useEffect, useState } from 'react';
import AICareerResults from '../results/AICareerResults';
import { XCircle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIRecommendationsPanelProps {
  onClose?: () => void;
}

const AIRecommendationsPanel: React.FC<AIRecommendationsPanelProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recs, setRecs] = useState<any>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const backendRecsStr = localStorage.getItem('backendRecommendations');
      const testAnalysisStr = localStorage.getItem('testAnalysis');
      
      if (backendRecsStr) {
        const parsedBackend = JSON.parse(backendRecsStr);
        const parsedAnalysis = testAnalysisStr ? JSON.parse(testAnalysisStr) : null;
        
        const backendData = parsedBackend.data || parsedBackend.recommendation || parsedBackend;
        
        let sections = [];
        if (parsedAnalysis && parsedAnalysis.sections) {
           sections = parsedAnalysis.sections.map((s: any) => ({
              name: s.name || s.sectionName || 'Unknown',
              score: s.score || 0,
              total: s.totalQuestions || 0,
              correct: s.correctAnswers || s.correct || 0,
              percentage: s.score || 0,
              category: 'intermediate',
              status: (s.score || 0) >= 70 ? 'strength' : (s.score || 0) >= 50 ? 'moderate' : 'weakness'
           }));
        } else {
           sections = [{
              name: 'Overall',
              score: backendData.assessmentData?.overallScore || 0,
              total: 10,
              correct: 0,
              percentage: backendData.assessmentData?.overallScore || 0,
              category: 'intermediate',
              status: 'moderate'
           }];
        }

        const mappedRecs = {
          sectionScores: sections,
          analysis: {
             strengthSummary: backendData.analysisInsights?.strengthSummary || backendData.analysis?.strengthSummary || 'Strong fundamentals in core areas.',
             weaknessSummary: backendData.analysisInsights?.weaknessSummary || backendData.analysis?.weaknessSummary || 'Some areas require more focus to achieve mastery.',
             skillGapAnalysis: (backendData.prioritySkillGaps || []).map((g: any) => g.skill).join(', ') || 'No major skill gaps detected.',
             improvementPriority: (backendData.prioritySkillGaps || []).map((g: any) => g.skill) || [],
             overallAssessment: backendData.analysisInsights?.overallAssessment || backendData.analysis?.overallAssessment || 'Good performance overall.',
             careerReadinessScore: backendData.analysisInsights?.careerReadinessScore || backendData.analysis?.careerReadinessScore || 75,
             interviewConfidence: backendData.analysisInsights?.interviewConfidence || backendData.analysis?.interviewConfidence || 70,
          },
          recommendations: {
            courses: backendData.recommendations?.courses || [],
            youtube: backendData.recommendations?.youtube || [],
            certifications: backendData.recommendations?.certifications || [],
            projects: backendData.recommendations?.projects || [],
            studyNotes: backendData.recommendations?.studyNotes || backendData.recommendations?.study_notes || [],
            interviewPrep: backendData.recommendations?.interviewPrep || backendData.recommendations?.interview_prep || [],
            practice: backendData.recommendations?.practice || []
          },
          learningPath: backendData.learningPath || backendData.learning_path || { title: 'Strategic Growth Roadmap', phases: [] },
          improvementPrediction: backendData.improvementPrediction || backendData.improvement_prediction || {
              currentScore: backendData.assessmentData?.overallScore || 0,
              predictedScore: (backendData.assessmentData?.overallScore || 0) + 15,
              improvementPercentage: 15,
              timeToAchieve: '1-2 months',
              sectionImprovements: [],
              interviewConfidenceBoost: 10,
              placementReadinessBoost: 10
          },
          generatedAt: new Date().toISOString()
        };
        
        // Final normalization to ensure all fields are mapped regardless of case
        if (mappedRecs.improvementPrediction) {
          const ip = mappedRecs.improvementPrediction;
          ip.currentScore = ip.currentScore ?? ip.current_score ?? 0;
          ip.predictedScore = ip.predictedScore ?? ip.predicted_score ?? (ip.currentScore + 15);
          ip.improvementPercentage = ip.improvementPercentage ?? ip.improvement_percentage ?? 15;
          ip.timeToAchieve = ip.timeToAchieve ?? ip.time_to_achieve ?? '1 month';
        }

        if (mappedRecs.learningPath) {
          const lp = mappedRecs.learningPath;
          lp.readinessGoal = lp.readinessGoal ?? lp.readiness_goal;
          lp.weeklyCommitment = lp.weeklyCommitment ?? lp.weekly_commitment;
        }
        
        setRecs(mappedRecs);
      } else {
        setError("No recent Prepzo AI Career Recommendation found. Please take an assessment first so we can fetch your genuine score recommendations.");
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load recommendations.');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <Brain className="w-16 h-16 text-cyan-400 mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
          Loading Prepzo AI Career Recommendation...
        </h3>
      </div>
    );
  }

  if (error || !recs) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="p-8 bg-gray-900 border border-red-500/30 rounded-3xl max-w-md w-full text-center shadow-2xl">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">Recommendation Unavailable</h3>
          <p className="text-red-300/80 mb-8">{error}</p>
          <button 
            className="w-full px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-semibold transition text-lg" 
            onClick={onClose}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0a0f1c] text-white">
      <div className="sticky top-0 z-[110] p-4 flex justify-end bg-gradient-to-b from-[#0a0f1c] to-transparent pointer-events-none">
        <button 
          onClick={onClose} 
          className="pointer-events-auto px-6 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 rounded-full font-semibold transition-all text-gray-300 hover:text-white shadow-xl backdrop-blur-md flex items-center gap-2 group"
        >
          <XCircle className="w-5 h-5 group-hover:text-red-400" />
          Close Recommendations
        </button>
      </div>
      <div className="-mt-16">
        <AICareerResults recommendations={recs} />
      </div>
    </div>
  );
};

export default AIRecommendationsPanel;
