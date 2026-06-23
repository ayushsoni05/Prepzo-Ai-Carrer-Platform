import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, TrendingUp, Target, Award, Briefcase, Code, Users, Flame, Brain, Zap, BarChart3, FileText, CheckCircle } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface ScoreBreakdown {
  resumeStrength: number;
  technicalSkills: number;
  interviewReadiness: number;
  projectPortfolio: number;
  consistency: number;
  targetAlignment: number;
}

interface CompanyPrediction {
  company: string;
  matchPercentage: number;
  tier: 'dream' | 'target' | 'safety';
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: 'critical' | 'important' | 'nice-to-have';
}

interface HistoryRecord {
  score: number;
  date: string;
}

interface PlacementScoreData {
  overallScore: number;
  breakdown: ScoreBreakdown;
  companyPredictions: CompanyPrediction[];
  skillGaps: SkillGap[];
  history: HistoryRecord[];
}

const MOCK_SCORE: PlacementScoreData = {
  overallScore: 72,
  breakdown: {
    resumeStrength: 65,
    technicalSkills: 78,
    interviewReadiness: 55,
    projectPortfolio: 80,
    consistency: 70,
    targetAlignment: 75
  },
  companyPredictions: [
    { company: 'Flipkart', matchPercentage: 85, tier: 'safety' },
    { company: 'Razorpay', matchPercentage: 80, tier: 'target' },
    { company: 'Atlassian', matchPercentage: 78, tier: 'target' },
    { company: 'Microsoft', matchPercentage: 75, tier: 'target' },
    { company: 'Amazon', matchPercentage: 72, tier: 'target' },
    { company: 'Meta', matchPercentage: 61, tier: 'dream' },
    { company: 'Google', matchPercentage: 58, tier: 'dream' },
    { company: 'Stripe', matchPercentage: 55, tier: 'dream' }
  ],
  skillGaps: [
    { skill: 'System Design', currentLevel: 3, requiredLevel: 8, priority: 'critical' },
    { skill: 'Data Structures', currentLevel: 7, requiredLevel: 9, priority: 'important' },
    { skill: 'Projects', currentLevel: 4, requiredLevel: 7, priority: 'critical' },
    { skill: 'Problem Solving', currentLevel: 6, requiredLevel: 8, priority: 'important' },
    { skill: 'Behavioral', currentLevel: 5, requiredLevel: 7, priority: 'important' },
    { skill: 'Communication', currentLevel: 7, requiredLevel: 8, priority: 'nice-to-have' }
  ],
  history: [
    { score: 45, date: 'May 01' },
    { score: 52, date: 'May 15' },
    { score: 60, date: 'Jun 01' },
    { score: 68, date: 'Jun 10' },
    { score: 72, date: 'Jun 20' }
  ]
};

export const PlacementDNA: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [data, setData] = useState<PlacementScoreData>(MOCK_SCORE);

  const fetchScoreData = async () => {
    try {
      const res = await api.get('/api/placement-score');
      if (res.data?.success && res.data.data) {
        // Format history dates nicely
        const formatted = {
          ...res.data.data,
          history: res.data.data.history.map((h: any) => ({
            score: h.score,
            date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }))
        };
        setData(formatted);
      } else {
        setData(MOCK_SCORE);
      }
    } catch (err) {
      console.warn("Using mock data as fallback for PlacementDNA APIs:", err);
      setData(MOCK_SCORE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScoreData();
  }, []);

  const triggerRecalculation = async () => {
    setCalculating(true);
    try {
      const res = await api.post('/api/placement-score/calculate');
      if (res.data?.success && res.data.data) {
        const formatted = {
          ...res.data.data,
          history: res.data.data.history.map((h: any) => ({
            score: h.score,
            date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          }))
        };
        setData(formatted);
        showSuccess('Placement DNA Score recalculated!');
      }
    } catch (err) {
      showError('Failed to recalculate placement score.');
    } finally {
      setCalculating(false);
    }
  };

  const getScoreGrade = (score: number) => {
    if (score >= 85) return { grade: 'A', label: 'Elite Candidate', color: 'text-cyan-400' };
    if (score >= 70) return { grade: 'B', label: 'Strong Contender', color: 'text-purple-400' };
    if (score >= 55) return { grade: 'C', label: 'Rising Star', color: 'text-yellow-400' };
    if (score >= 40) return { grade: 'D', label: 'Getting Started', color: 'text-gray-400' };
    return { grade: 'F', label: 'Needs Work', color: 'text-red-400' };
  };

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'resumeStrength': return <FileText className="w-5 h-5" />;
      case 'technicalSkills': return <Code className="w-5 h-5" />;
      case 'interviewReadiness': return <Users className="w-5 h-5" />;
      case 'projectPortfolio': return <Briefcase className="w-5 h-5" />;
      case 'consistency': return <Flame className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getMetricLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const getMetricColor = (score: number) => {
    if (score >= 80) return 'stroke-cyan-400 text-cyan-400';
    if (score >= 60) return 'stroke-purple-400 text-purple-400';
    if (score >= 40) return 'stroke-yellow-400 text-yellow-400';
    return 'stroke-red-400 text-red-400';
  };

  // SVGs parameters
  const radiusBig = 80;
  const circBig = 2 * Math.PI * radiusBig;
  const offsetBig = circBig - (data.overallScore / 100) * circBig;

  const radiusMini = 25;
  const circMini = 2 * Math.PI * radiusMini;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <button 
            onClick={() => navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={triggerRecalculation}
              disabled={calculating}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 rounded-xl font-semibold shadow-lg shadow-purple-500/10 active:scale-[0.98] transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${calculating ? 'animate-spin' : ''}`} />
              <span>{calculating ? 'Analyzing DNA...' : 'Recalculate Score'}</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60">Reading placement genetics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Center Column: Hero Score Gauge & Breakdown */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Hero Score Gauge */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-around gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[60px] rounded-full" />
                
                {/* SVG Gauge */}
                <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r={radiusBig}
                      className="stroke-white/5 fill-none"
                      strokeWidth="10"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r={radiusBig}
                      className="stroke-url(#scoreGradient) fill-none transition-all duration-1500"
                      strokeWidth="10"
                      strokeDasharray={circBig}
                      strokeDashoffset={offsetBig}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tight">{data.overallScore}</span>
                    <span className={`text-xl font-bold uppercase tracking-wider mt-1 ${getScoreGrade(data.overallScore).color}`}>
                      Grade {getScoreGrade(data.overallScore).grade}
                    </span>
                  </div>
                </div>

                {/* Score Summary Details */}
                <div className="text-center md:text-left space-y-4 max-w-sm">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>{getScoreGrade(data.overallScore).label}</span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight">Your Placement DNA</h1>
                  <p className="text-white/60 leading-relaxed text-sm">
                    This score updates dynamically based on your game play, coding submissions, resume quality, mock interviews, and consistency. Aim above 80 for elite FAANG status.
                  </p>
                </div>
              </div>

              {/* Sub-Metrics Breakdown Grid */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <span>Sub-Metric Assessments</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {Object.entries(data.breakdown).map(([key, value]) => {
                    const offsetMini = circMini - (value / 100) * circMini;
                    const colorClass = getMetricColor(value);

                    return (
                      <div key={key} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center">
                        <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="32"
                              cy="32"
                              r={radiusMini}
                              className="stroke-white/5 fill-none"
                              strokeWidth="4"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r={radiusMini}
                              className={`fill-none transition-all duration-1000 ${colorClass.split(' ')[0]}`}
                              strokeWidth="4"
                              strokeDasharray={circMini}
                              strokeDashoffset={offsetMini}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className={`absolute ${colorClass.split(' ')[1]}`}>
                            {getMetricIcon(key)}
                          </div>
                        </div>

                        <span className="text-xs text-white/55 font-semibold line-clamp-1 mb-1">
                          {getMetricLabel(key)}
                        </span>
                        <span className="text-lg font-bold">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Score History Graph */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Employability Trend</span>
                </h3>

                {data.history && data.history.length > 1 ? (
                  <div className="space-y-4">
                    {/* SVG Line Graph */}
                    <div className="relative w-full h-40">
                      <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Area Gradient */}
                        <path
                          d={`M 0 100 
                              ${data.history.map((h, i) => `L ${(i / (data.history.length - 1)) * 500} ${100 - h.score}`).join(' ')} 
                              L 500 100 Z`}
                          fill="url(#chartGlow)"
                        />

                        {/* Polyline */}
                        <path
                          d={data.history.map((h, i) => `${i === 0 ? 'M' : 'L'} ${(i / (data.history.length - 1)) * 500} ${100 - h.score}`).join(' ')}
                          fill="none"
                          stroke="#c084fc"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Node Dots */}
                        {data.history.map((h, i) => (
                          <circle
                            key={i}
                            cx={(i / (data.history.length - 1)) * 500}
                            cy={100 - h.score}
                            r="3"
                            fill="#22d3ee"
                            stroke="#c084fc"
                            strokeWidth="1.5"
                          />
                        ))}
                      </svg>
                    </div>
                    {/* X-Axis Dates */}
                    <div className="flex justify-between text-xs text-white/40 px-1">
                      {data.history.map((h, i) => (
                        <span key={i}>{h.date}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-white/40 text-sm">Need at least 2 points to display history chart.</p>
                )}
              </div>
            </div>

            {/* Right Column: Company Predictions & Skill Gaps Heatmap */}
            <div className="space-y-8">
              
              {/* Company Match Predictions */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>Target Match Predictions</span>
                </h3>

                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
                  {data.companyPredictions.map((c, i) => {
                    let tierColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
                    if (c.tier === 'dream') tierColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
                    if (c.tier === 'safety') tierColor = 'text-green-400 bg-green-500/10 border-green-500/20';

                    return (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm text-white/80">
                              {c.company.charAt(0)}
                            </div>
                            <span className="font-bold text-sm">{c.company}</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${tierColor}`}>
                            {c.tier}
                          </span>
                        </div>

                        {/* Progress Match Meter */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${c.matchPercentage}%` }}
                              transition={{ duration: 1.2, delay: i * 0.05 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                            />
                          </div>
                          <span className="text-sm font-extrabold text-cyan-400 shrink-0">{c.matchPercentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Skills Gap Heatmap */}
              <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Skills Gap Matrix</span>
                </h3>

                <div className="space-y-4">
                  {data.skillGaps.map((sg, i) => {
                    const isCritical = sg.priority === 'critical';
                    const isImportant = sg.priority === 'important';

                    let borderClass = 'border-white/5';
                    let badgeColor = 'text-white/40 bg-white/5 border-white/10';
                    if (isCritical) {
                      borderClass = 'border-red-500/10 shadow-sm shadow-red-500/5';
                      badgeColor = 'text-red-400 bg-red-500/10 border-red-500/20';
                    } else if (isImportant) {
                      badgeColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
                    }

                    return (
                      <div key={i} className={`bg-white/5 border rounded-2xl p-4 space-y-3 ${borderClass}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{sg.skill}</span>
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}>
                            {sg.priority}
                          </span>
                        </div>

                        {/* Gap Meter Display */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-white/40">
                            <span>Level {sg.currentLevel}/10 (Current)</span>
                            <span>Target: {sg.requiredLevel}</span>
                          </div>
                          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden flex">
                            {/* Current progress */}
                            <div 
                              style={{ width: `${sg.currentLevel * 10}%` }}
                              className="h-full bg-cyan-500 rounded-l-full"
                            />
                            {/* Needed Gap */}
                            <div 
                              style={{ width: `${Math.max(0, sg.requiredLevel - sg.currentLevel) * 10}%` }}
                              className={`h-full opacity-60 ${isCritical ? 'bg-red-500' : 'bg-yellow-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDNA;
