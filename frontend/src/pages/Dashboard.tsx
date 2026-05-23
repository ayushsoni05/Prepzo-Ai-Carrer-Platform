import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import {
  Activity,
  ArrowRight,
  ArrowLeft,
  Bot,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
  CheckCircle2,
  Download,
  Zap,
  Award,
  Shield,
  Brain,
  Lock,
  CheckCircle,
  Building2,
  MapPin,
  Briefcase,
  ArrowUpRight,
  ChevronRight,
  Mic,
  BookOpen,
  Search,
  Layers,
  TrendingUp,
  Code,
  Star
} from 'lucide-react';
import { type Job } from '@/api/jobs';
import { showSuccess } from '@/utils/toastManager';
import { GlassButton, GlassCard } from '@/components/ui/GlassCard';
import { CircularProgress, SkillBar } from '@/components/ui/CircularProgress';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import QuickInsightsWidget from '@/components/recommendations/QuickInsightsWidget';
import { ProctoredAssessment } from '@/components/assessment/ProctoredAssessment';
import { LaTeXResumeBuilder } from '@/components/resume/LaTeXResumeBuilder';
import ThinkingLoader from '@/components/ui/loading';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { QuestionBank } from '@/components/interview/QuestionBank';
import { SettingsForm } from '@/components/profile/SettingsForm';
import { PreparationVelocityChart } from '@/components/dashboard/PreparationVelocityChart';
import { PeerLeaderboard } from '@/components/dashboard/PeerLeaderboard';
import { AtsOptimizer } from '@/components/dashboard/AtsOptimizer';
import { ReferralGenerator } from '@/components/dashboard/ReferralGenerator';
import allTemplates from '@/data/templates.json';
type DashboardTab = 'home' | 'resume' | 'assessment' | 'opportunities' | 'settings';

export function Dashboard() {
  const { user, completeAssessmentAsync, logout } = useAuthStore();
  const {
    dashboardTab,
    setDashboardTab,
    resumeAnalysis,
    atsHistory,
    loadResumeAnalysisFromBackend,
    setShowFullRecommendations,
    setGlobalLoading,
  } = useAppStore();
  const [startAssessment, setStartAssessment] = useState<false | 'field' | 'skills'>(false);
  const [opportunitiesWorkspace, setOpportunitiesWorkspace] = useState<'selection' | 'jobs' | 'companies' | 'applications' | 'network'>('selection');
  const [resumeWorkspace, setResumeWorkspace] = useState<'selection' | 'maker' | 'optimizer' | 'gallery'>('selection');
  const [templateInput, setTemplateInput] = useState<string | undefined>(undefined);
  const [dashboardJobs, setDashboardJobs] = useState<Job[]>([]);
  const [dashboardJobsLoading, setDashboardJobsLoading] = useState(false);

  // Format helper for 2 decimal places
  const formatVal = (val: any) => {
    if (val === undefined || val === null) return '0';
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return '0';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Only call protected endpoints if the user has a valid auth token
        const token = localStorage.getItem('prepzo-token');
        if (token && token !== 'null' && token !== 'undefined') {
          await loadResumeAnalysisFromBackend();
        }
      } finally {
        setGlobalLoading(false);
      }
    };

    void initializeDashboard();
  }, [loadResumeAnalysisFromBackend, setGlobalLoading]);



  // Load jobs for the opportunities workspace
  useEffect(() => {
    const loadJobs = async () => {
      if (opportunitiesWorkspace !== 'jobs') return;
      
      setDashboardJobsLoading(true);
      try {
        const { jobsApi } = await import('@/api/jobs');
        const response = await jobsApi.searchJobs({ limit: 50 });
        if (response.success) {
          setDashboardJobs(response.data.jobs);
        }
      } catch (error) {
        console.error('Failed to load dashboard jobs:', error);
      } finally {
        setDashboardJobsLoading(false);
      }
    };
    
    void loadJobs();
  }, [opportunitiesWorkspace]);

  const activeTab = (dashboardTab === 'overview' ? 'home' : (dashboardTab as DashboardTab)) || 'home';
  const readinessScore = user?.placementReadinessScore || 68.42;
  const atsScore = resumeAnalysis?.overallScore ?? user?.atsScore ?? 0;

  const skillBars = useMemo(() => {
    const technologies = user?.knownTechnologies?.slice(0, 4) || ['React', 'Node.js', 'System Design', 'Problem Solving'];
    return technologies.map((skill, index) => ({
      skill,
      level: Math.max(55, Math.min(94, readinessScore - 8 + index * 7.25)),
    }));
  }, [readinessScore, user?.knownTechnologies]);

  const shellCards = [
    {
      title: 'Jobs',
      description: 'Track role-matched openings with cleaner filters and calmer surfaces.',
      action: () => window.location.hash = 'jobs',
    },
    {
      title: 'Companies',
      description: 'Company prep, hiring signals, and target lists in a premium workspace.',
      action: () => window.location.hash = 'companies',
    },
    {
      title: 'Applications',
      description: 'Review application status, momentum, and next actions in one view.',
      action: () => window.location.hash = 'applications',
    },
    {
      title: 'Network',
      description: 'Stay connected to peers, mentors, and warm opportunities.',
      action: () => window.location.hash = 'network',
    },
  ];

  const ranking = resumeAnalysis?.resumeRanking;
  const isFieldComplete = !!user?.isFieldTestComplete;
  const isSkillComplete = !!user?.isSkillTestComplete;
  const isFullyQualified = isFieldComplete && isSkillComplete;

  // Calculate real metrics for "fancy things"
  const dailyStreak = useMemo(() => {
    if (!atsHistory || atsHistory.length === 0) return 1;
    // Simple logic: count unique days in history
    const days = new Set(atsHistory.map(h => new Date(h.analyzedAt).toDateString()));
    return Math.max(1, days.size);
  }, [atsHistory]);

  const activityScore = useMemo(() => {
    const base = readinessScore * 0.8;
    const momentum = Math.min(20, (atsHistory?.length || 0) * 2);
    return Math.min(100, Math.round(base + momentum));
  }, [readinessScore, atsHistory]);

  const globalPercentile = ranking?.percentile || Math.round(readinessScore / 1.1);

  const missions = useMemo(() => {
    const baseMissions = [
      { label: "AI Interview Warmup", sub: "15 min spoken practice", done: !!user?.interviewScore, icon: Mic, type: 'interview' },
    ];

    if (resumeAnalysis?.improvementPlan) {
      const planMissions = resumeAnalysis.improvementPlan.slice(0, 2).map(plan => ({
        label: plan.action,
        sub: `Impact: ${plan.impact} | ${plan.timeToComplete}`,
        done: false,
        icon: Sparkles,
        type: 'improvement'
      }));
      return [...planMissions, ...baseMissions];
    }

    return [
      { label: "Update Resume keywords", sub: "Matches target job signals", done: false, icon: FileText, type: 'resume' },
      ...baseMissions,
      { label: "Complete Skill Assessment", sub: "Level up your signal", done: isSkillComplete, icon: Code, type: 'assessment' }
    ];
  }, [resumeAnalysis, user, isSkillComplete]);

  // Force assessment tab if not qualified
  useEffect(() => {
    if (!isFullyQualified && dashboardTab !== 'assessment') {
      setDashboardTab('assessment');
    }
  }, [isFullyQualified, dashboardTab]);


  const renderHome = () => (
    <div className="max-w-7xl mx-auto space-y-10 selection:bg-[#5ed29c] selection:text-black font-rubik pb-20">
      {/* Row 1: Fancy Welcome Card */}
      <div className="relative rounded-[40px] p-8 md:p-14 mb-8 bg-black border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
        {/* Background Grid Beam */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
           <GridBeam className="w-full h-full" />
        </div>
        
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#5ed29c]/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#5ed29c]" />
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#5ed29c]">Career Command Center</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-8xl font-[900] text-white uppercase tracking-tighter leading-[0.75] italic mb-8">
                Welcome back,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/10">{user?.fullName?.split(' ')[0] || 'there'}.</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-[16px] font-medium tracking-tight leading-relaxed text-white/40 max-w-md italic">
                  Your AI mentor is standing by. All systems are calibrated for your next career jump.
                </p>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/5 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="avatar" className="w-full h-full object-cover opacity-50" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">+12 Peers active now</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 items-center lg:items-end">
              <button 
                onClick={() => setDashboardTab('assessment')}
                className="relative h-[75px] px-12 group active:scale-95 transition-transform"
              >
                <svg className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105 shadow-2xl shadow-[#5ed29c]/20" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0 0H184L174 65H10L0 0Z" fill="#5ed29c" />
                </svg>
                <span className="relative z-10 flex items-center justify-center h-full text-[#070b0a] font-[900] text-[14px] uppercase tracking-[0.2em] gap-4 italic">
                   System Launch <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              <div className="flex items-center gap-4 text-white/30 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><Zap size={12} className="text-amber-400" /> Daily Streak: {dailyStreak}</div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5"><Award size={12} className="text-blue-400" /> Rank: {readinessScore > 80 ? 'Elite' : readinessScore > 60 ? 'Pro' : 'Rising'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Fancy Progress Tracker + Filling Space */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        {/* Progress Tracker Card */}
        <div className="rounded-[40px] p-10 bg-black/40 border border-white/5 xl:col-span-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-colors duration-1000" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-14">
            <div className="flex flex-col items-center justify-center gap-8 min-w-[200px]">
              <CircularProgress value={readinessScore} label="AI Readiness" color="purple" />
              <div className="flex flex-col items-center gap-2">
                <div className="px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center gap-2">
                  <ShieldCheck size={14} className="text-purple-400" />
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] italic">Validated Score</span>
                </div>
                <p className="text-[10px] font-bold text-white/20 uppercase">Last updated: {resumeAnalysis?.analyzedAt ? new Date(resumeAnalysis.analyzedAt).toLocaleDateString() : 'Just now'}</p>
              </div>
            </div>

            <div className="flex-1 w-full space-y-10">
              <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5ed29c] mb-2 italic">Performance Matrix</p>
                  <h3 className="text-4xl font-[900] text-white uppercase italic tracking-tighter">Skill Signals</h3>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Percentile</p>
                  <p className="text-2xl font-[900] text-white italic tracking-tighter">Top {100 - globalPercentile}%</p>
                </div>
              </div>

              <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                {skillBars.map((item, index) => (
                  <SkillBar key={item.skill} skill={item.skill} level={item.level} delay={index * 0.1} />
                ))}
              </div>
            </div>
          </div>
          <PreparationVelocityChart score={readinessScore} />
        </div>

        {/* Filling Space: Quick Engagement Widget */}
        <div className="xl:col-span-4 flex flex-col gap-8 h-full">
          <div className="rounded-[40px] p-8 bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#5ed29c]/30 transition-colors duration-500 flex-1">
             <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={160} className="text-[#5ed29c]" />
             </div>
             
             <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">AI Next Steps</p>
                <h4 className="text-2xl font-[900] text-white uppercase italic tracking-tighter leading-none">Your Daily <span className="text-[#5ed29c]">Missions.</span></h4>
                
                <div className="space-y-4 pt-4">
                  {missions.map((task, i) => (
                    <div key={i} className={`p-4 rounded-3xl border transition-all ${task.done ? 'bg-[#5ed29c]/5 border-[#5ed29c]/20 opacity-50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${task.done ? 'bg-[#5ed29c]/20' : 'bg-white/5'}`}>
                           {task.done ? <CheckCircle2 size={16} className="text-[#5ed29c]" /> : <task.icon size={16} className="text-white/40" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-black text-white uppercase tracking-wider line-clamp-1">{task.label}</p>
                          <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic">{task.sub}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowFullRecommendations(true)}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white"
                >
                  View All Missions
                </button>
             </div>
          </div>

          {/* New Fancy Thing: Career Roadmap Preview */}
          {resumeAnalysis?.careerRoadmap?.milestones?.length ? (
            <div className="rounded-[40px] p-8 bg-black border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full" />
               <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400/60 italic">Strategic Roadmap</p>
                  <h4 className="text-xl font-[900] text-white uppercase italic tracking-tighter leading-none">Your Path to <span className="text-blue-400">Success.</span></h4>
                  
                  <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                    {resumeAnalysis.careerRoadmap.milestones.slice(0, 3).map((ms, i) => (
                      <div key={i} className="relative pl-8 group/ms">
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white/10 bg-black flex items-center justify-center group-hover/ms:border-blue-400 transition-colors">
                           <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/ms:bg-blue-400" />
                        </div>
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">{ms.week}</p>
                        <p className="text-[11px] font-bold text-white tracking-tight leading-tight">{ms.goal}</p>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1 italic">{ms.output}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          ) : (
             <div className="rounded-[40px] p-8 bg-black border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="p-4 bg-white/5 rounded-full">
                   <Target size={32} className="text-white/20" />
                </div>
                <div>
                   <p className="text-[11px] font-black text-white/40 uppercase tracking-widest italic">Roadmap Locked</p>
                   <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">Complete AI Analysis to generate path</p>
                </div>
             </div>
          )}
        </div>
      </div>

      <div id="ai-insights" className="mt-12">
         <QuickInsightsWidget onViewFull={() => setShowFullRecommendations(true)} />
      </div>

      {/* Interactive Career Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pointer-events-auto">
        <div className="lg:col-span-7">
          <AtsOptimizer userSkills={user?.knownTechnologies} currentAtsScore={atsScore} />
        </div>
        <div className="lg:col-span-5">
          <PeerLeaderboard collegeName={user?.collegeName} currentUserScore={readinessScore} currentUserName={user?.fullName} />
        </div>
      </div>

      <div className="mt-8 pointer-events-auto">
        <ReferralGenerator />
      </div>

      {/* Row 3: More fancy widgets to fill space */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="p-8 rounded-[40px] bg-black border border-white/5 relative overflow-hidden group hover:bg-gradient-to-br hover:from-black hover:to-indigo-900/20 transition-all duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target size={40} className="text-indigo-400" />
          </div>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Target Role</p>
          <h5 className="text-2xl font-[900] text-white uppercase italic tracking-tighter mb-4">{user?.targetRole || resumeAnalysis?.roleContext?.targetRole || 'Not Set'}</h5>
          <div className="flex items-center gap-2 text-[#5ed29c] text-[10px] font-black uppercase italic">
            <TrendingUp size={12} /> Market Demand: {readinessScore > 70 ? 'High' : 'Stable'}
          </div>
        </div>

        <div className="p-8 rounded-[40px] bg-black border border-white/5 relative overflow-hidden group hover:bg-gradient-to-br hover:from-black hover:to-purple-900/20 transition-all duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity size={40} className="text-purple-400" />
          </div>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Activity Score</p>
          <h5 className="text-2xl font-[900] text-white uppercase italic tracking-tighter mb-4">{activityScore}/100</h5>
          <div className="flex items-center gap-2 text-purple-400 text-[10px] font-black uppercase italic">
            <Sparkles size={12} /> Top {100 - globalPercentile}% Globally
          </div>
        </div>

        <div className="p-8 rounded-[40px] bg-black border border-white/5 relative overflow-hidden group hover:bg-gradient-to-br hover:from-black hover:to-emerald-900/20 transition-all duration-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={40} className="text-[#5ed29c]" />
          </div>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Job Matches</p>
          <h5 className="text-2xl font-[900] text-white uppercase italic tracking-tighter mb-4">{dashboardJobs.length > 0 ? `${dashboardJobs.length} Matches` : 'Analyzing Jobs...'}</h5>
          <div className="flex items-center gap-2 text-[#5ed29c] text-[10px] font-black uppercase italic">
            <ArrowRight size={12} /> Browse Opportunities
          </div>
        </div>
      </div>

      {/* AI Mock Interview Entry Card */}
      <div className="mt-10">
        <div className="rounded-[40px] p-10 bg-gradient-to-br from-[#13171d] to-black border border-[#5ed29c]/30 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-125">
            <Bot size={240} className="text-[#5ed29c]" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-full">
                  <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest">Stage 3 Validation</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-purple-500 flex items-center justify-center"><Mic size={10} className="text-white" /></div>
                  <div className="w-6 h-6 rounded-full border-2 border-black bg-[#5ed29c] flex items-center justify-center"><Bot size={10} className="text-black" /></div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic mb-6 leading-none">
                AI Mock <span className="text-white/40">Interview.</span>
              </h2>
              
              <p className="text-white/50 font-medium tracking-tight leading-relaxed max-w-md mb-8">
                The most advanced interview simulation. AI will analyze your resume, ask spoken questions, and evaluate your responses in real-time using high-fidelity voice synthesis.
              </p>
              
              <button 
                onClick={() => window.location.hash = 'ai-interview'}
                className="group/btn relative h-[55px] px-8 bg-[#5ed29c] rounded-2xl flex items-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#5ed29c]/20"
              >
                <span className="relative z-10 text-black font-black uppercase tracking-widest text-xs">Launch Session</span>
                <ArrowUpRight size={18} className="relative z-10 text-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Proctored", sub: "Integrity check" },
                { icon: Brain, label: "Resume-Linked", sub: "Deep alignment" },
                { icon: Zap, label: "Real-time", sub: "Instant feedback" },
                { icon: Sparkles, label: "Voice-Sync", sub: "Speech API" }
              ].map((feature, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-[#5ed29c]/20 transition-colors group/feat">
                  <feature.icon size={20} className="text-[#5ed29c] mb-3 group-hover/feat:scale-110 transition-transform" />
                  <p className="text-[11px] font-black text-white uppercase tracking-wider mb-1">{feature.label}</p>
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic">{feature.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STAR Story Builder Entry Card */}
      <div className="mt-10">
        <div 
          onClick={() => { window.location.hash = 'star-builder'; }}
          className="rounded-[40px] p-10 bg-gradient-to-br from-[#13171d] to-black border border-yellow-500/30 shadow-2xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors cursor-pointer"
        >
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-125">
            <Star size={240} className="text-yellow-500" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center pointer-events-none">
            <div className="pointer-events-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                  <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Behavioral Prep</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic mb-6 leading-none">
                STAR Story <span className="text-white/40">Builder.</span>
              </h2>
              
              <p className="text-white/50 font-medium tracking-tight leading-relaxed max-w-md mb-8">
                Format your past experiences into perfect Situation, Task, Action, Result narratives. Build a robust library of behavioral answers that interviewers love.
              </p>
              
              <button 
                className="group/btn relative h-[55px] px-8 bg-yellow-500 text-black rounded-2xl flex items-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/20"
              >
                <span className="relative z-10 font-black uppercase tracking-widest text-xs">Start Building</span>
                <ArrowUpRight size={18} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Study Notes Entry Card */}
      <div className="mt-10">
        <div 
          onClick={() => { window.location.hash = 'notes'; }}
          className="rounded-[40px] p-10 bg-gradient-to-br from-[#13171d] to-black border border-blue-500/30 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer"
        >
          <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform group-hover:scale-125">
            <BookOpen size={240} className="text-blue-500" />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center pointer-events-none">
            <div className="pointer-events-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Knowledge Base</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic mb-6 leading-none">
                Study <span className="text-white/40">Notes.</span>
              </h2>
              
              <p className="text-white/50 font-medium tracking-tight leading-relaxed max-w-md mb-8">
                Access curated PDF study materials for all 26 technical and non-technical sub-skills. Download and prepare offline for your mock interviews.
              </p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); window.location.hash = 'notes'; }}
                className="group/btn relative h-[55px] px-8 bg-blue-500 rounded-2xl flex items-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20"
              >
                <span className="relative z-10 text-white font-black uppercase tracking-widest text-xs">Open Library</span>
                <ArrowUpRight size={18} className="relative z-10 text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-4 pointer-events-auto">
              {[
                { icon: BookOpen, label: "26 Sub-skills", sub: "Comprehensive" },
                { icon: Download, label: "Offline Mode", sub: "PDF Downloads" },
                { icon: Search, label: "Searchable", sub: "Quick Access" },
                { icon: Layers, label: "Categorized", sub: "Structured" }
              ].map((feature, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-colors group/feat">
                  <feature.icon size={20} className="text-blue-500 mb-3 group-hover/feat:scale-110 transition-transform" />
                  <p className="text-[11px] font-black text-white uppercase tracking-wider mb-1">{feature.label}</p>
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic">{feature.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="question-bank-container" className="pointer-events-auto mt-10">
        <div className="mb-6 px-4 flex items-end justify-between">
          <div>
            <h2 className="text-[10px] font-[900] uppercase tracking-[0.5em] text-[#5ed29c] mb-2 italic opacity-80">Repository</h2>
            <h1 className="text-2xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic">Interview <span className="text-white/40">Library.</span></h1>
          </div>
          <button 
            onClick={() => window.location.hash = 'question-bank'}
            className="group flex items-center gap-2 text-[10px] font-black text-[#5ed29c] uppercase tracking-widest italic hover:opacity-80 transition-opacity pb-2"
          >
            Open Full Bank <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="p-1 border border-white/5 rounded-[40px] bg-black shadow-2xl relative">
            <QuestionBank limit={15} showFilters={true} showHeader={false} />
            
            <div className="p-8 border-t border-white/5 flex justify-center">
              <button 
                onClick={() => window.location.hash = 'question-bank'}
                className="relative h-[55px] px-10 group active:scale-95 transition-transform"
              >
                <svg className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105 shadow-2xl shadow-[#5ed29c]/10" viewBox="0 0 184 55" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0 0H184L174 55H10L0 0Z" fill="#5ed29c" />
                </svg>
                <span className="relative z-10 flex items-center justify-center h-full text-[#070b0a] font-[900] text-[11px] uppercase tracking-[0.2em] gap-3 italic">
                   Load More Questions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );

  const renderResumeLab = () => {
    if (resumeWorkspace === 'selection') {
      const resumeCards = [
        {
          title: 'Template Maker',
          description: 'Choose from a wide range of resume templates, similar to Overleaf, covering different fields. Upload your previous resume and the AI will extract all relevant details and automatically generate a new resume in the chosen template with properly formatted information.',
          action: () => setResumeWorkspace('maker'),
          icon: <Code className="text-[#5ed29c]" />,
        },
        {
          title: 'ATS Optimizer',
          description: 'Upload your existing resume or manually enter your details. The AI will then optimize the content and create a high ATS (Applicant Tracking System) score resume automatically.',
          action: () => setResumeWorkspace('optimizer'),
          icon: <ShieldCheck className="text-[#5ed29c]" />,
        },
        {
          title: 'Templates',
          description: 'Explore a vast collection of ATS-optimized resume templates. Browse our gallery inspired by the best professional structures to find the perfect format for your job applications.',
          action: () => setResumeWorkspace('gallery'),
          icon: <Layers className="text-[#5ed29c]" />,
        },
      ];

      return (
        <div className="relative pt-6">
          <div className="mb-10">
            <div className="w-10 h-[2px] bg-[#5ed29c] mb-6" />
            <button 
              onClick={() => window.location.hash = 'dashboard'}
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Exit Workspace
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 selection:bg-white selection:text-black relative z-10 font-rubik">
            {resumeCards.map((card, idx) => (
              <div 
                key={card.title} 
                className="bg-[#161a20] rounded-[36px] p-10 border border-white/5 flex flex-col justify-between group h-[500px] hover:bg-[#1a1f26] hover:border-white/10 transition-all duration-700 relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-white/20 transition-colors bg-white/[0.02]">
                    {card.icon}
                  </div>
                  <p className="text-[9px] font-[900] uppercase tracking-[0.4em] text-white/30 mb-3">
                    {idx === 0 ? 'Template Workspace' : idx === 1 ? 'Optimizer Workspace' : 'Gallery Workspace'}
                  </p>
                  <h3 className="text-4xl md:text-5xl font-[900] text-white group-hover:text-[#5ed29c] transition-colors uppercase tracking-tighter mb-6 italic leading-[0.9]">{card.title}</h3>
                  <p className="text-[12px] md:text-[13px] font-medium leading-relaxed text-white/40 tracking-tight pr-4">
                    {card.description}
                  </p>
                </div>

                <button 
                  onClick={card.action}
                  className="relative z-10 w-full py-5 rounded-[20px] border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-4 group/btn mt-8"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 group-hover/btn:text-white transition-colors">
                    Enter Workspace
                  </span>
                  <ArrowRight size={12} className="text-[#5ed29c]/50 group-hover/btn:text-[#5ed29c] group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (resumeWorkspace === 'maker') {
      return <LaTeXResumeBuilder onExit={() => setResumeWorkspace('selection')} initialTemplate={templateInput} />;
    }

    if (resumeWorkspace === 'optimizer') {
      return <AtsOptimizer onExit={() => setResumeWorkspace('selection')} />;
    }

    if (resumeWorkspace === 'gallery') {
      return (
        <div className="space-y-12 pb-20 selection:bg-white selection:text-black pt-6">
          <div className="mb-10">
            <div className="w-10 h-[2px] bg-[#5ed29c] mb-6" />
            <button 
              onClick={() => setResumeWorkspace('selection')}
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Exit Workspace
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
               <div className="space-y-1">
                 <button className="w-full text-left px-4 py-2 bg-[#5ed29c]/10 text-[#5ed29c] font-black text-xs uppercase tracking-widest rounded-lg">All</button>
                 <button className="w-full text-left px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors font-black text-xs uppercase tracking-widest rounded-lg">Templates</button>
                 <button className="w-full text-left px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors font-black text-xs uppercase tracking-widest rounded-lg">Examples</button>
               </div>

               <div>
                 <p className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Related Tags</p>
                 <div className="space-y-1">
                   {['Cover Letter', 'Math', 'Software', 'University', 'Formal letters', 'Assignments', 'Academic'].map(tag => (
                     <button key={tag} className="w-full text-left px-4 py-1.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors font-bold text-[11px] tracking-wider rounded-lg">
                       {tag}
                     </button>
                   ))}
                 </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
               <div className="mb-10">
                 <h2 className="text-3xl md:text-4xl font-[900] text-white tracking-tighter italic mb-4">
                   Make a great first impression with our popular LaTeX templates for CVs and résumés.
                 </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allTemplates.map((template: any) => (
                   <div key={template.id} className="group bg-[#161a20] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col">
                      <div className="aspect-[1/1.2] bg-[#1a1f26] relative border-b border-white/5 flex items-center justify-center object-cover">
                         <img src={template.image} alt={template.title} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity" />

                         {template.badge && (
                           <div className="absolute top-4 left-4 px-2 py-1 bg-[#5ed29c]/20 border border-[#5ed29c]/30 text-[#5ed29c] text-[9px] font-black uppercase tracking-widest rounded shadow-lg backdrop-blur-md">
                             {template.badge}
                           </div>
                         )}

                         {/* Hover Overlay Action */}
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                           <button onClick={() => { setTemplateInput(template.id); setResumeWorkspace('maker'); }} className="px-6 py-2 bg-[#5ed29c] hover:bg-[#5ed29c]/80 text-black font-black text-[11px] uppercase tracking-widest rounded-lg transition-colors">
                             Open as Template
                           </button>
                         </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-[14px] font-[900] text-white tracking-widest uppercase mb-3 line-clamp-2">{template.title}</h3>
                        <p className="text-[12px] text-white/50 italic leading-relaxed line-clamp-3 mb-4 flex-1">
                          {template.description}
                        </p>
                      </div>
                   </div>
                 ))}
               </div>

               {/* Pagination */}
               <div className="mt-12 flex justify-center items-center gap-2">
                 <button className="w-10 h-10 rounded-lg bg-[#5ed29c]/10 border border-[#5ed29c]/20 text-[#5ed29c] font-black flex items-center justify-center">1</button>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40 font-black flex items-center justify-center transition-colors">2</button>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40 font-black flex items-center justify-center transition-colors">3</button>
                 <span className="text-white/40 px-2">...</span>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40 font-black flex items-center justify-center transition-colors">36</button>
                 <button className="px-4 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40 font-black text-[11px] uppercase tracking-widest flex items-center justify-center transition-colors">Next</button>
               </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderAssessment = () => {
    if (startAssessment) {
      return (
        <ProctoredAssessment
          testMode={startAssessment as 'field' | 'skills'}
          onBack={() => setStartAssessment(false)}
          onComplete={(results: any) => {
            const mode = startAssessment;
            setStartAssessment(false);
            
            if (user && typeof user === 'object') {
              const updates: any = {};
              if (mode === 'field') {
                updates.isFieldTestComplete = true;
                updates.fieldAssessmentResults = {
                  ...results,
                  completedAt: new Date().toISOString()
                };
              }
              if (mode === 'skills') {
                updates.isSkillTestComplete = true;
                updates.skillAssessmentResults = {
                  ...results,
                  completedAt: new Date().toISOString()
                };
              }
              
              // Local state check for dual completion
              const isFieldDone = mode === 'field' || user.isFieldTestComplete;
              const isSkillDone = mode === 'skills' || user.isSkillTestComplete;
              
              if (isFieldDone && isSkillDone) {
                updates.isAssessmentComplete = true;
                setShowFullRecommendations(true);
              }
              
              updates.lastAssessmentAt = new Date().toISOString();
              
              // Sync to backend
              completeAssessmentAsync(updates);
            }
            
            showSuccess(`${mode === 'field' ? 'Stage 1' : 'Stage 2'} Assessment Completed!`);
          }}
        />
      );
    }

    const isLocked = !!user?.isAssessmentLocked;
    const unlockDate = user?.assessmentUnlockDate ? new Date(user.assessmentUnlockDate) : null;

    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 selection:bg-white selection:text-black font-rubik">
        <div className="rounded-[40px] p-10 md:p-14 bg-black border border-[#5ed29c]/20 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5ed29c]/30 to-transparent" />
          
          <p className="text-[11px] font-[900] uppercase tracking-[0.5em] text-[#5ed29c] mb-10 opacity-60">Operational Studio</p>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic leading-none">Skill <span className="text-white/30">Signal.</span></h2>
            {isLocked && (
              <span className="flex items-center gap-3 px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-[11px] font-[900] text-amber-500 uppercase tracking-widest italic animate-pulse">
                <Lock size={14} /> LOCKED
              </span>
            )}
          </div>
          
          {isLocked ? (
            <div className="mb-10">
              <p className="text-[17px] font-medium tracking-tight leading-relaxed text-amber-500/30 mb-8 italic max-w-sm">
                Terminals offline. Neural calibration in sync. Signal restoration required for access.
              </p>
              <div className="inline-block p-8 bg-amber-500/5 border border-amber-500/10 rounded-[32px]">
                <p className="text-[11px] font-[900] text-amber-500/30 uppercase tracking-[0.4em] mb-2 italic">Sync Window</p>
                <p className="text-3xl font-[900] text-white uppercase tracking-tighter">{unlockDate?.toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-[17px] font-medium tracking-tight leading-relaxed text-white/20 mb-12 max-w-md italic">
               Launch your proctored assessment in high-fidelity obsidian matrix.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => !isLocked && setStartAssessment('field')}
                disabled={isLocked}
                className={`relative h-[65px] px-10 group active:scale-95 transition-transform ${isLocked ? 'opacity-20 cursor-not-allowed grayscale' : ''}`}
              >
                {!isLocked && (
                  <svg className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 0H184L174 65H10L0 0Z" fill="#5ed29c" />
                  </svg>
                )}
                {isLocked && <div className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-2xl" />}
                <span className={`relative z-10 flex items-center justify-center h-full ${isLocked ? 'text-white/40' : 'text-black'} font-[900] text-[12px] uppercase tracking-[0.2em] gap-3 italic`}>
                  {isFieldComplete ? 'Retake Stage 1' : 'Launch Stage 1'} <ArrowRight size={18} />
                </span>
              </button>
              
              <button 
                onClick={() => !isLocked && setStartAssessment('skills')}
                disabled={isLocked || !isFieldComplete}
                className={`relative h-[65px] px-10 group active:scale-95 border rounded-[12px] transition-all hover:bg-[#5ed29c]/10 ${isLocked || !isFieldComplete ? 'opacity-10 cursor-not-allowed grayscale bg-white/5 border-white/10' : 'bg-transparent border-[#5ed29c]/40 text-[#5ed29c]'}`}
              >
                <span className={`relative z-10 flex items-center justify-center h-full font-[900] text-[12px] uppercase tracking-[0.2em] gap-3 italic`}>
                  {isSkillComplete ? 'Retake Stage 2' : 'Launch Stage 2'} <ArrowRight size={18} />
                </span>
              </button>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={() => setShowFullRecommendations(true)}
              className="group flex items-center gap-3 text-[11px] text-white font-[900] uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-all italic"
            >
              Analyze Records <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>


        <div className="rounded-[40px] p-10 md:p-14 bg-black border border-white/5 shadow-2xl relative overflow-hidden">
          <p className="text-[11px] font-[900] uppercase tracking-[0.5em] text-white/10 mb-10 italic">Diagnostics</p>
          <div className="grid gap-6 sm:grid-cols-2 mb-12">
            <div className="bg-white/[0.01] border border-white/5 rounded-[32px] p-8">
              <p className="text-[10px] font-[900] uppercase tracking-[0.2em] text-[#5ed29c] mb-2 italic opacity-60">Result</p>
              <p className="text-6xl font-[900] text-white uppercase tracking-tighter italic">{formatVal(user?.testResults?.score || 0)}%</p>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-[32px] p-8">
              <p className="text-[10px] font-[900] uppercase tracking-[0.2em] text-white/5 mb-2 italic">Neural State</p>
              <p className="text-4xl font-[900] text-white uppercase tracking-tighter italic opacity-80">{user?.isAssessmentComplete ? 'ACTIVE' : 'IDLE'}</p>
            </div>
          </div>
          {user?.testResults?.sectionResults?.length ? (
            <div className="space-y-6">
              {user.testResults.sectionResults.map((section) => (
                <SkillBar key={section.name} skill={section.name} level={section.score} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-[40px]">
               <p className="text-[12px] font-black italic text-white/5 uppercase tracking-[0.4em]">Grid Offline.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Target company handlers moved to dedicated Companies workspace.

  const renderOpportunities = () => {
    if (opportunitiesWorkspace === 'selection') {
      return (
        <div className="relative">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 selection:bg-white selection:text-black relative z-10">
            {shellCards.map((card, idx) => (
              <GlassCard 
                key={card.title} 
                className="rounded-[40px] p-10 bg-[#0a0c10]/40 border-white/5 flex flex-col justify-between group h-[400px] hover:bg-white/5 transition-all duration-700 relative overflow-hidden backdrop-blur-3xl"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
                  <Sparkles size={120} className="text-white" />
                </div>
                
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:border-white/20 transition-colors">
                    {idx === 0 ? <Zap className="text-blue-400" /> : idx === 1 ? <Target className="text-emerald-400" /> : idx === 2 ? <Activity className="text-amber-400" /> : <Bot className="text-purple-400" />}
                  </div>
                  <p className="text-[10px]  font-[900] uppercase tracking-[0.4em] text-white/20 mb-6">{card.title} Workspace</p>
                  <h3 className="text-3xl  font-[900] text-white uppercase tracking-tighter mb-4 italic group-hover:text-blue-400 transition-colors">{card.title}</h3>
                  <p className="text-[13px]  font-medium leading-relaxed text-white/30 italic group-hover:text-white/50 transition-colors">{card.description}</p>
                </div>

                <button 
                  onClick={card.action}
                  className="relative h-14 w-full group/btn overflow-hidden rounded-2xl border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-5 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center h-full text-[10px]  font-black uppercase tracking-[0.2em] text-white/60 group-hover/btn:text-white transition-colors gap-3">
                    Enter Workspace <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setOpportunitiesWorkspace('selection')}
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-all  font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Exit Workspace
          </button>
          
          <div className="flex gap-4">
            <h2 className="text-xl  font-[900] text-white uppercase tracking-tighter italic">
              {opportunitiesWorkspace} <span className="text-white/20">Module.</span>
            </h2>
          </div>
        </div>

        {opportunitiesWorkspace === 'jobs' && (
          <div className="space-y-6">
            {/* Headers and list start */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-[900] uppercase tracking-[0.5em] text-white/30 mb-2">Live Opportunity Grid</p>
                <h3 className="text-3xl font-[900] text-white uppercase tracking-tighter italic">
                  Matched <span className="text-blue-400">Openings.</span>
                </h3>
              </div>
              <GlassButton 
                onClick={() => window.location.hash = 'jobs'}
                className="text-[10px] font-black uppercase tracking-widest"
              >
                Open Full Workspace
              </GlassButton>
            </div>

            {dashboardJobsLoading ? (
              <div className="py-20 flex justify-center">
                <ThinkingLoader loadingText="Synchronizing with Global Hiring Tracker..." />
              </div>
            ) : dashboardJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardJobs.map((job) => (
                  <GlassCard 
                    key={job._id}
                    className="p-6 border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-black text-white uppercase tracking-tight text-lg group-hover:text-blue-400 transition-colors">{job.title}</h4>
                          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{job.company?.name || 'Venture Capital'}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                        {job.workMode}
                      </span>
                    </div>
                    
                    <p className="text-[13px] font-medium text-white/50 leading-relaxed italic mb-6 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">
                          <MapPin size={12} />
                          {job.locations?.[0]?.city || 'Hybrid'}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">
                          <Briefcase size={12} />
                          {job.jobType?.replace('_', ' ')}
                        </div>
                      </div>
                      <button 
                        onClick={() => window.location.hash = 'jobs'}
                        className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                      >
                        Apply Now <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                <p className="text-[11px] font-black text-white/20 uppercase tracking-widest italic">No matching job signals detected in your current radius.</p>
              </div>
            )}
          </div>
        )}

        {/* The sub-workspace views for companies, apps, and network are now handle by full pages. 
            Keeping the 'jobs' lite view for quick dashboard check if needed, but it also has an 'Open Full Workspace' button. */}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="pb-20">
      <SettingsForm />
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#0a0c10]  text-white overflow-x-hidden selection:bg-white selection:text-black">
      <div className="fixed inset-0 bg-[#0a0c10] -z-50" />
      
      {/* Glassmorphism dashboard lock overlay for new users */}
      {!isFullyQualified && !startAssessment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[40px]">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              logout();
              window.location.hash = 'landing';
            }}
            className="fixed left-8 top-8 z-[110] inline-flex items-center gap-4 text-white/60 hover:text-white transition-all uppercase font-bold tracking-widest text-[11px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing
          </motion.button>

          <div className="max-w-xl w-full mx-4">
             <div className="glass-panel rounded-[40px] p-12 text-center border border-white/10 shadow-2xl bg-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                
                <div className="mb-8 relative inline-flex">
                   <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                   <div className="relative w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white animate-pulse" />
                   </div>
                </div>

                <h2 className="text-4xl  font-[900] text-white tracking-tighter uppercase italic mb-4">
                   Terminal <span className="text-blue-400">Locked.</span>
                </h2>
                <p className="text-[15px]  font-semibold text-white/50 leading-relaxed mb-10 max-w-sm mx-auto">
                   Complete the <span className="text-white">Prepzo Tactical Assessment</span> suite to unlock your career engine.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-10">
                   {/* Stage 1 Progress Card */}
                   <div className={`p-6 rounded-3xl border transition-all ${isFieldComplete ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex items-center justify-between mb-4">
                         <p className="text-[10px]  font-black text-white/40 uppercase tracking-widest">Stage 01</p>
                         {isFieldComplete ? <CheckCircle className="w-4 h-4 text-green-400" /> : <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                      </div>
                      <h3 className={`text-lg  font-[900] uppercase italic ${isFieldComplete ? 'text-green-400' : 'text-white'}`}>Field Core Assessment</h3>
                      <p className="text-[11px]  font-bold text-white/30 uppercase mt-1 tracking-widest">60 Curated Placement Questions</p>
                      {!isFieldComplete && (
                         <button 
                            onClick={() => { setDashboardTab('assessment'); setStartAssessment('field'); }}
                            className="mt-6 w-full py-4 bg-white text-black  font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98]"
                         >
                            Initialize Stage 1
                         </button>
                      )}
                   </div>

                   {/* Stage 2 Progress Card */}
                   <div className={`p-6 rounded-3xl border transition-all ${isSkillComplete ? 'bg-green-500/10 border-green-500/30' : (isFieldComplete ? 'bg-white/5 border-white/10' : 'opacity-40 grayscale border-white/5')}`}>
                      <div className="flex items-center justify-between mb-4">
                         <p className="text-[10px]  font-black text-white/40 uppercase tracking-widest">Stage 02</p>
                         {isSkillComplete ? <CheckCircle className="w-4 h-4 text-green-400" /> : <div className={`w-2 h-2 rounded-full ${isFieldComplete ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-white/10'}`} />}
                      </div>
                      <h3 className={`text-lg  font-[900] uppercase italic ${isSkillComplete ? 'text-green-400' : 'text-white'}`}>Skill Precision Test</h3>
                      <p className="text-[11px]  font-bold text-white/30 uppercase mt-1 tracking-widest">10 Questions per Selected Expertise</p>
                      {isFieldComplete && !isSkillComplete && (
                         <button 
                            onClick={() => { setDashboardTab('assessment'); setStartAssessment('skills'); }}
                            className="mt-6 w-full py-4 bg-amber-500 text-black  font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-amber-600 transition-all active:scale-[0.98]"
                         >
                            Initialize Stage 2
                         </button>
                      )}
                   </div>
                </div>

                <p className="text-[9px]  font-black text-white/20 uppercase tracking-[0.4em] italic leading-relaxed">
                   AI-GENERATED • PLACEMENT-READY • PROCTORED SECURE
                </p>
             </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px] opacity-20" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-white/5 blur-[150px] opacity-20" />
      </div>

      {!startAssessment ? (
        <div className="flex w-full">
          <main className="min-w-0 flex-1 relative z-10 flex flex-col bg-[#0a0c10]">
            <div className="absolute inset-0 w-full h-full bg-[#0a0c10] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <GridBeam className="absolute inset-0" />

            <header className="sticky top-0 z-30 px-6 py-6 flex items-center justify-between pointer-events-none font-rubik">
              <div className="flex items-center gap-6 pointer-events-auto">
                <div className="flex flex-col">
                  <h2 className="text-xl font-[900] uppercase tracking-[0.2em] text-white italic leading-none">
                    {activeTab === 'home' ? 'Cockpit' : activeTab === 'resume' ? 'Resume Lab' : activeTab === 'assessment' ? 'Skill Signal' : activeTab}
                  </h2>
                  <p className="text-[9px] font-[900] text-[#5ed29c] uppercase tracking-[0.3em] mt-1 italic opacity-40">Satellite .01</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pointer-events-auto">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-[900] text-white uppercase tracking-[0.1em] leading-none">{user?.fullName}</p>
                  <p className="text-[9px] font-[900] text-white/20 uppercase tracking-[0.2em] mt-1 italic">{user?.targetRole || 'Engineer'}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-[900] text-white text-xs uppercase shadow-lg shadow-[#5ed29c]/5">
                  {user?.fullName?.charAt(0)}
                </div>
              </div>
            </header>
            
            <div className="relative z-10 mx-auto w-full max-w-7xl space-y-12 px-6 pb-32">
              {activeTab === 'home' && (
                <div className="pointer-events-auto">
                    {renderHome()}
                </div>
              )}
              {activeTab === 'resume' && (
                <div className="pointer-events-auto">
                    {renderResumeLab()}
                </div>
              )}
              {activeTab === 'assessment' && (
                <div data-assessment-section className="pointer-events-auto">
                  {renderAssessment()}
                </div>
              )}
              {activeTab === 'opportunities' && (
                <div className="pointer-events-auto">
                    {renderOpportunities()}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="pointer-events-auto">
                    {renderSettings()}
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl mx-auto">
            {renderAssessment()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
