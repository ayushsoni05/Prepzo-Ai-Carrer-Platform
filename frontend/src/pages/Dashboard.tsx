import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Activity,
  ArrowRight,
  Bot,
  FileText,
  ShieldCheck,
  Sparkles,
  Target,
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  TrendingUp,
  Download,
  Zap,
  Award,
  Shield,
  Brain,

  Upload,
  Lock,
  CheckCircle,
  Building2,
  MapPin,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { showSuccess, showError, showInfo } from '@/utils/toastManager';
import { jsPDF } from 'jspdf';
import { GlassButton, GlassCard } from '@/components/ui/GlassCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { CircularProgress, SkillBar } from '@/components/ui/CircularProgress';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import QuickInsightsWidget from '@/components/recommendations/QuickInsightsWidget';
import AIRecommendationsPanel from '@/components/recommendations/AIRecommendationsPanel';
import { ProctoredAssessment } from '@/components/assessment/ProctoredAssessment';
import { uploadApi, type ResumeInfo } from '@/api/auth';
import { ResumeRenderer } from '@/components/resume/ResumeRenderer';
import ThinkingLoader from '@/components/ui/loading';
import allTemplates from '@/data/templates.json';
import { Boxes } from '@/components/ui/background-boxes';



type DashboardTab = 'overview' | 'resume' | 'assessment' | 'opportunities' | 'settings';





const resumeRoleOptions = [
  { value: 'Backend Developer', label: 'Backend Developer', color: 'from-green-500 to-teal-500' },
  { value: 'Frontend Developer', label: 'Frontend Developer', color: 'from-cyan-500 to-blue-500' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer', color: 'from-violet-500 to-purple-500' },
  { value: 'Software Engineer', label: 'Software Engineer', color: 'from-purple-500 to-indigo-500' },
  { value: 'Data Scientist', label: 'Data Scientist', color: 'from-orange-500 to-red-500' },
  { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer', color: 'from-pink-500 to-rose-500' },
];

const demoJDOptions = [
  { value: 'backend_node', label: 'Backend Developer — Node.js', color: 'from-green-500 to-teal-500' },
  { value: 'frontend_react', label: 'Frontend Developer — React', color: 'from-cyan-500 to-blue-500' },
  { value: 'fullstack_web', label: 'Full Stack Developer', color: 'from-violet-500 to-purple-500' },
  { value: 'ml_engineer', label: 'Machine Learning Engineer', color: 'from-pink-500 to-rose-500' },
];

const templateOptions = [
  { value: 'Standard Professional ATS', label: 'Standard ATS (Classic)' },
  { value: 'Modern Creative', label: 'Modern Creative Template' },
  { value: 'Executive Leadership', label: 'Executive Leadership' },
  { value: 'Minimalist Tech', label: 'Minimalist Tech Layout' },
  { value: 'AltaCV Modern', label: 'AltaCV Modern Design' },
  { value: 'Jakes Resume', label: 'Jake\'s ATS Resume' },
  { value: 'Simple Hipster', label: 'Simple Hipster Sidebar' },
  { value: 'MBZUAI Academic', label: 'MBZUAI Academic Clean' }
];

const demoJDs = [
  {
    id: 'backend_node',
    label: 'Backend Developer - Node.js',
    role: 'Backend Developer',
    description:
      'Looking for a Backend Developer with strong experience in Node.js, REST APIs, MongoDB, Docker, and microservices architecture. Experience with API security, performance optimization, and cloud deployment is preferred.',
  },
  {
    id: 'frontend_react',
    label: 'Frontend Developer - React',
    role: 'Frontend Developer',
    description:
      'Looking for a Frontend Developer with expertise in React, TypeScript, performance optimization, responsive UI, and accessibility. Experience with testing frameworks and component architecture is required.',
  },
  {
    id: 'fullstack_web',
    label: 'Full Stack Developer',
    role: 'Full Stack Developer',
    description:
      'Seeking a Full Stack Developer with React, Node.js, API development, SQL/NoSQL databases, CI/CD, and cloud deployment experience. Strong debugging and system design fundamentals are expected.',
  },
  {
    id: 'ml_engineer',
    label: 'Machine Learning Engineer',
    role: 'Machine Learning Engineer',
    description:
      'Hiring an ML Engineer with Python, PyTorch or TensorFlow, model serving, feature engineering, MLOps pipelines, Docker, and monitoring experience. Data processing and experimentation rigor is important.',
  },
];

export function Dashboard() {
  const { user, updateUser, completeAssessmentAsync } = useAuthStore();
  const {
    dashboardTab,
    setDashboardTab,
    resumeAnalysis,
    atsHistory,
    resumeAnalysisLoading,
    analyzeResume,
    loadResumeAnalysisFromBackend,
    generatedResume,
    resumeGenerationLoading,
    generateResume,
    showFullRecommendations,
    setShowFullRecommendations
  } = useAppStore();
  const [startAssessment, setStartAssessment] = useState<false | 'field' | 'skills'>(false);
  const [resumeTextInput, setResumeTextInput] = useState('');
  const [resumeRoleInput, setResumeRoleInput] = useState(user?.targetRole || '');
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [templateInput, setTemplateInput] = useState('Standard Professional ATS');
  const [selectedDemoJD, setSelectedDemoJD] = useState('');
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [resumeWorkspace, setResumeWorkspace] = useState<'selection' | 'maker' | 'ats' | 'gallery'>('selection');
  const [opportunitiesWorkspace, setOpportunitiesWorkspace] = useState<'selection' | 'jobs' | 'companies' | 'applications' | 'network'>('selection');
  const [isResumeUploading, setIsResumeUploading] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [dashboardJobs, setDashboardJobs] = useState<Job[]>([]);
  const [dashboardJobsLoading, setDashboardJobsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format helper for 2 decimal places
  const formatVal = (val: any) => {
    if (val === undefined || val === null) return '0';
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return '0';
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  useEffect(() => {
    const loadResumeInfo = async () => {
      try {
        const info = await uploadApi.getResumeInfo();
        setResumeInfo(info);
      } catch {
        setResumeInfo(null);
      }
    };

    void loadResumeInfo();
    void loadResumeAnalysisFromBackend();
  }, []);

  useEffect(() => {
    setResumeRoleInput(user?.targetRole || '');
  }, [user?.targetRole]);

  useEffect(() => {
    if (!selectedDemoJD) {
      return;
    }
    const selected = demoJDs.find((item) => item.id === selectedDemoJD);
    if (!selected) {
      return;
    }
    setResumeRoleInput(selected.role);
    setJobDescriptionInput(selected.description);
  }, [selectedDemoJD]);

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

  const activeTab = (dashboardTab as DashboardTab) || 'overview';
  const readinessScore = user?.placementReadinessScore || 68.42;
  const atsScore = resumeAnalysis?.overallScore ?? user?.atsScore ?? 0;
  const interviewScore = user?.interviewScore || 72.15;
  const skillsScore = user?.skillsMatchedScore || 74.88;

  const skillBars = useMemo(() => {
    const technologies = user?.knownTechnologies?.slice(0, 4) || ['React', 'Node.js', 'System Design', 'Problem Solving'];
    return technologies.map((skill, index) => ({
      skill,
      level: Math.max(55, Math.min(94, readinessScore - 8 + index * 7.25)),
    }));
  }, [readinessScore, user?.knownTechnologies]);

  const focusAreas = user?.skillGaps?.length ? user.skillGaps.slice(0, 4) : ['System design', 'Mock interviews', 'Resume positioning', 'SQL fluency'];
  const strengths = user?.strengths?.length ? user.strengths.slice(0, 3) : ['Fast learner', 'Product mindset', 'Communication'];

  const progressChecklist = useMemo(
    () => [
      { label: 'Profile completed', done: !!user?.isOnboarded },
      { label: 'Resume uploaded', done: !!resumeInfo?.resumeUrl },
      { label: 'ATS analyzed', done: !!resumeAnalysis },
      { label: 'Assessment completed', done: !!user?.isAssessmentComplete },
    ],
    [resumeAnalysis, resumeInfo?.resumeUrl, user?.isAssessmentComplete, user?.isOnboarded]
  );

  const recentActivity = useMemo(
    () => [
      {
        title: user?.isAssessmentComplete ? 'Assessment completed' : 'Assessment pending',
        subtitle: user?.isAssessmentComplete ? 'Your score is recorded in dashboard analytics.' : 'Take your first test to unlock deeper recommendations.',
      },
      {
        title: resumeAnalysis ? 'ATS analysis updated' : 'ATS analysis not started',
        subtitle: resumeAnalysis ? `Latest ATS score: ${formatVal(resumeAnalysis.overallScore || atsScore)}%` : 'Run Resume Lab checker to generate keyword and fit insights.',
      },
      {
        title: 'Placement workspace connected',
        subtitle: 'Jobs, companies, applications, and network are available from the left panel.',
      },
    ],
    [atsScore, resumeAnalysis, user?.isAssessmentComplete]
  );

  const shellCards = [
    {
      title: 'Jobs',
      description: 'Track role-matched openings with cleaner filters and calmer surfaces.',
      action: () => setOpportunitiesWorkspace('jobs'),
    },
    {
      title: 'Companies',
      description: 'Company prep, hiring signals, and target lists in a premium workspace.',
      action: () => setOpportunitiesWorkspace('companies'),
    },
    {
      title: 'Applications',
      description: 'Review application status, momentum, and next actions in one view.',
      action: () => setOpportunitiesWorkspace('applications'),
    },
    {
      title: 'Network',
      description: 'Stay connected to peers, mentors, and warm opportunities.',
      action: () => setOpportunitiesWorkspace('network'),
    },
  ];

  const keywordLens = resumeAnalysis?.keywordAnalysis;
  const skillGapAnalysis = resumeAnalysis?.skillGapAnalysis;
  const recruiterSimulation = resumeAnalysis?.recruiterSimulation;
  const linkedinOptimization = resumeAnalysis?.linkedinOptimization;
  const ranking = resumeAnalysis?.resumeRanking;
  const interviewSuccess = resumeAnalysis?.interviewSuccess;
  const scoreSimulation = resumeAnalysis?.scoreSimulation;
  const rewriteLines = resumeAnalysis?.resumeRewrite?.beforeAfterPairs || resumeAnalysis?.improvedLines || [];
  const atsTrend = (atsHistory || []).slice(0, 8).reverse();

  const isFieldComplete = !!user?.isFieldTestComplete;
  const isSkillComplete = !!user?.isSkillTestComplete;
  const isFullyQualified = isFieldComplete && isSkillComplete;

  // Force assessment tab if not qualified
  useEffect(() => {
    if (!isFullyQualified && dashboardTab !== 'assessment') {
      setDashboardTab('assessment');
    }
  }, [isFullyQualified, dashboardTab]);

  const exportAtsReportPdf = () => {
    if (!isFullyQualified) {
      showError('Complete both assessment stages to unlock ATS reports.');
      return;
    }
    if (!resumeAnalysis) {
      showError('Run ATS analysis first to export report.');
      return;
    }

    const doc = new jsPDF();
    let y = 16;
    const lineHeight = 7;
    const pageWidth = 180;

    const addWrapped = (label: string, content: string) => {
      if (y > 275) {
        doc.addPage();
        y = 16;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(label, 14, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(content || '-', pageWidth);
      doc.text(lines, 14, y);
      y += lines.length * lineHeight + 2;
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Prepzo AI Resume ATS Optimization Report', 14, y);
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student: ${user?.fullName || 'Student'}`, 14, y);
    y += 6;
    doc.text(`Target Role: ${resumeAnalysis.targetRoleUsed || user?.targetRole || 'Software Engineer'}`, 14, y);
    y += 6;
    doc.text(`ATS Score: ${formatVal(resumeAnalysis.overallScore || 0)}/100`, 14, y);
    y += 10;

    addWrapped('Keyword Match Analysis', `Matched: ${(keywordLens?.matchedKeywords || []).join(', ')}\nMissing: ${(keywordLens?.missingKeywords || []).join(', ')}`);
    addWrapped('Skill Gap Detection', (skillGapAnalysis?.missingSkills || []).join(', '));
    addWrapped('AI Recommendations', [
      ...(resumeAnalysis.aiRecommendations?.skillsToLearn || []).slice(0, 4).map((s) => `Learn: ${s}`),
      ...(resumeAnalysis.aiRecommendations?.projectsToBuild || []).slice(0, 3).map((s) => `Build: ${s}`),
    ].join('\n'));
    addWrapped('Recruiter Simulation', `Strengths: ${(recruiterSimulation?.strengths || []).join(', ')}\nConcerns: ${(recruiterSimulation?.concerns || []).join(', ')}\nRecommendation: ${recruiterSimulation?.recommendation || ''}`);
    addWrapped('Interview Success Probability', `${formatVal(interviewSuccess?.probability || 0)}%`);
    addWrapped('ATS Score Simulation', `Current: ${formatVal(scoreSimulation?.currentScore || resumeAnalysis.overallScore || 0)}%\nExpected: ${formatVal(scoreSimulation?.expectedScoreAfterImprovements || resumeAnalysis.overallScore || 0)}%`);
    addWrapped('LinkedIn Optimization Headline', linkedinOptimization?.optimizedHeadline || '-');

    doc.save(`prepzo-ats-report-${Date.now()}.pdf`);
  };

  const renderOverview = () => (
    <div className="space-y-10 selection:bg-white selection:text-black">
      {/* Row 1: Welcome + Mentor, side by side, equal width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <GlassCard className="rounded-[32px] md:rounded-[40px] p-6 md:p-10 h-full flex flex-col justify-between bg-[#161a20]/40 border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Bot size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-6 md:mb-8">Career Cockpit</p>
            <h1 className="text-3xl md:text-5xl  font-[900] text-white uppercase tracking-tighter leading-[0.9] italic mb-6 md:mb-8">
              Welcome back,<br/>
              <span className="text-white/40">{user?.fullName?.split(' ')[0] || 'there'}.</span>
            </h1>
            <p className="max-w-xl text-[15px]  font-medium tracking-tight leading-relaxed text-white/50 mb-10">
              Prepzo has synchronized your AI mentor, readiness scores, and placement signals into your personal command center.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => setDashboardTab('assessment')}
                className="relative h-[55px] px-8 group active:scale-95 transition-transform"
              >
                <svg className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0 0H184L174 65H10L0 0Z" fill="white" />
                </svg>
                <span className="relative z-10 flex items-center justify-center h-full text-[#161a20]  font-[800] text-sm uppercase tracking-widest gap-2">
                  Continue Prep <ArrowRight size={16} />
                </span>
              </button>
              
              <button 
                onClick={() => setShowFullRecommendations(true)}
                className="text-[12px] text-white  font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                Open AI Career Recommendation
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="rounded-[32px] md:rounded-[40px] p-6 md:p-10 h-full flex flex-col justify-between bg-[#161a20]/40 border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles size={80} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-6 md:mb-8">AI Mentor Signal</p>
            <h2 className="text-2xl md:text-3xl  font-[900] text-white uppercase tracking-tight mb-6 md:mb-8 italic">Mentor Surface</h2>
            <p className="text-[15px]  font-medium tracking-tight leading-relaxed text-white/50 mb-10">Your floating mentor stays available across pages with context-aware logic and role-based guidance.</p>
            
            <div className="grid grid-cols-1 gap-4">
              {['Build system design roadmap', 'Coach me for frontend interview'].map((prompt) => (
                <div key={prompt} className="bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-[13px]  font-bold text-white/40 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer">
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Readiness', value: readinessScore, icon: TrendingUp },
          { label: 'ATS Fit', value: atsScore, icon: FileText },
          { label: 'Interview', value: interviewScore, icon: Bot },
          { label: 'Skill Match', value: skillsScore, icon: Sparkles },
        ].map((metric) => (
          <GlassCard key={metric.label} className="rounded-[32px] p-8 border-white/5 bg-[#161a20]/40 backdrop-blur-2xl">
            <div className="flex justify-between items-start mb-10">
              <metric.icon size={20} className="text-white/20" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-code-green bg-code-green/10 px-2 py-0.5 rounded">Verified</span>
            </div>
            <p className="text-4xl  font-[900] text-white tracking-tighter leading-none mb-4">{formatVal(metric.value)}<span className="text-lg opacity-30 italic">%</span></p>
            <p className="text-[10px]  font-black uppercase tracking-[0.2em] text-white/30">{metric.label} SIGNAL</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <GlassCard className="rounded-2xl p-6 xl:col-span-12">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <CircularProgress value={readinessScore} label="Launch score" color="purple" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">Signals</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text)]">Progress that feels tangible</h3>
              </div>
              {skillBars.map((item, index) => (
                <SkillBar key={item.skill} skill={item.skill} level={item.level} delay={index * 0.08} />
              ))}
            </div>
          </div>
        </GlassCard>

      </div>

      <QuickInsightsWidget onViewFull={() => setShowFullRecommendations(true)} />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <GlassCard className="rounded-[24px] md:rounded-[32px] p-6 md:p-8 xl:col-span-7 bg-[#161a20]/60 border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="text-[9px] md:text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-2">Strength Map</p>
              <h3 className="text-xl md:text-2xl  font-[900] text-white uppercase tracking-tight italic">Top Levers</h3>
            </div>
            <Sparkles className="h-5 w-5 text-white/20" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {strengths.map((item) => (
              <div key={item} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <p className="text-[13px]  font-black text-white uppercase tracking-widest mb-3">{item}</p>
                <p className="text-[12px]  font-medium leading-relaxed text-white/40 italic">Signal strength verified through assessment metrics.</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="rounded-[32px] p-8 xl:col-span-5 bg-[#161a20]/60 border-white/5">
          <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-8">Focus Areas</p>
          <div className="grid gap-3">
            {focusAreas.map((item, index) => (
              <div key={item} className="bg-white/5 border border-white/5 flex items-center justify-between rounded-2xl px-6 py-4 group hover:bg-white/10 transition-colors">
                <div>
                  <p className="text-[13px]  font-black text-white uppercase tracking-widest">{item}</p>
                  <p className="text-[10px]  font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Priority Lane {index + 1}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Checklist section */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <GlassCard className="rounded-[32px] p-8 xl:col-span-5 bg-[#161a20]/60 border-white/5">
          <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-8">Progress Checklist</p>
          <div className="grid gap-3">
            {progressChecklist.map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/5 flex items-center justify-between rounded-2xl px-6 py-4">
                <span className="text-[11px]  font-black text-white/40 uppercase tracking-widest">{item.label}</span>
                {item.done ? (
                  <span className="inline-flex items-center gap-2 text-code-green">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-white/10 italic">
                    <CircleDashed className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Locked</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="rounded-[32px] p-8 xl:col-span-7 bg-[#161a20]/60 border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-2">Recent activity</p>
              <h3 className="text-2xl  font-[900] text-white uppercase tracking-tight italic">Working Timeline</h3>
            </div>
            <Activity className="h-5 w-5 text-white/20" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recentActivity.map((event, index) => (
              <div key={event.title} className="bg-white/5 border border-white/5 rounded-2xl p-5 group hover:bg-white/10 transition-colors">
                <p className="text-[13px]  font-black text-white uppercase tracking-widest mb-2">{event.title}</p>
                <p className="text-[12px]  font-medium leading-relaxed text-white/40 italic">{event.subtitle}</p>
                <p className="text-[9px]  font-bold text-white/10 uppercase tracking-[0.2em] mt-4">Signal Event {index + 1}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderResumeLab = () => {
    if (resumeWorkspace === 'maker') {
      return (
        <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setResumeWorkspace('selection')}
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all  font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Exit Workspace
            </button>
            <div className="flex gap-4">
               <span className="text-[10px]  font-black text-white/20 uppercase tracking-[0.4em]">AI Generation Active</span>
            </div>
          </div>

          {/* AI RESUME MAKER CONTENT */}
          <div className="lg:col-span-12">
            <GlassCard className="rounded-[40px] p-8 md:p-12 bg-[#161a20]/60 border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} />
              </div>
              
              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-4 text-[10px]  font-[900] uppercase tracking-[0.4em] text-code-green mb-8">
                  <Bot size={20} strokeWidth={2.5} />
                  AI Generation Engine
                </div>
                
                <h3 className="text-3xl md:text-5xl  font-[900] text-white uppercase tracking-tighter mb-8 leading-none italic">
                  Resume <span className="text-white/40">Maker.</span>
                </h3>
                
                <p className="text-[16px] md:text-[18px] text-white/50 mb-12  leading-relaxed max-w-2xl font-medium tracking-tight">
                  Leverage Prepzo's neural engine to generate high-fidelity, professional resumes from your profile data. Optimized for target roles and elite placements.
                </p>

                <div className="grid gap-8 md:grid-cols-3 mb-12">
                   <div className="space-y-4">
                      <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30">Target Role</p>
                      <SearchableDropdown
                        value={resumeRoleInput}
                        onChange={setResumeRoleInput}
                        options={resumeRoleOptions}
                        placeholder="Select Role"
                        icon={Target}
                        searchable={false}
                      />
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30">Job Context (Optional)</p>
                      <SearchableDropdown
                        value={selectedDemoJD}
                        onChange={setSelectedDemoJD}
                        options={demoJDOptions}
                        placeholder="Select Demo JD"
                        icon={FileText}
                        searchable={false}
                      />
                   </div>
                   <div className="space-y-4">
                      <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30">Source Data</p>
                      <div className="flex gap-2 h-[42px]">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isResumeUploading}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-xs  font-bold text-white/60"
                        >
                          {isResumeUploading ? <ThinkingLoader /> : <Upload className="w-4 h-4" />}
                          {resumeInfo?.resumeUrl ? 'Update Resume' : 'Upload Resume'}
                        </button>
                        {resumeInfo?.resumeUrl && (
                          <div className="px-4 bg-code-green/10 border border-code-green/20 rounded-xl flex items-center justify-center text-code-green">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsResumeUploading(true);
                          try {
                            await uploadApi.uploadResume(file);
                            const info = await uploadApi.getResumeInfo();
                            setResumeInfo(info);
                            showSuccess('Resume uploaded successfully! AI will now extract this data.');
                          } catch {
                            showError('Failed to upload resume');
                          } finally {
                            setIsResumeUploading(false);
                          }
                        }}
                      />
                   </div>
                </div>

                {/* VISUAL TEMPLATE GALLERY */}
                <div className="mb-12">
                  <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-6">Architectural Layout</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {templateOptions.map((template) => (
                      <button
                        key={template.value}
                        onClick={() => setTemplateInput(template.value)}
                        className={`group relative h-48 rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-4 ${
                          templateInput === template.value 
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]' 
                            : 'border-white/5 bg-[#161a20]/80 hover:bg-white/5 hover:border-white/20'
                        }`}
                      >
                        {/* Abstract mini-resume wireframe */}
                        <div className={`w-16 h-20 rounded-lg mb-5 flex flex-col gap-1.5 p-2 transition-all duration-500 ${
                          templateInput === template.value 
                            ? 'bg-indigo-950/40 border-2 border-indigo-500/50 scale-110 shadow-lg' 
                            : 'bg-black/40 border border-white/10 group-hover:scale-105 group-hover:border-white/20'
                        }`}>
                           {/* Header */}
                           <div className={`h-2 rounded-sm w-full opacity-80 ${['Modern Creative', 'AltaCV Modern'].includes(template.value) ? 'bg-emerald-400' : template.value === 'MBZUAI Academic' ? 'bg-blue-600' : 'bg-indigo-400'}`} />
                           {/* Body lines */}
                           <div className="h-1 rounded-sm w-2/3 bg-white/30 mt-1" />
                           <div className="h-1 rounded-sm w-full bg-white/20" />
                           <div className="h-1 rounded-sm w-5/6 bg-white/20" />
                           {/* Multi-column layouts depending on template logic */}
                           <div className="flex gap-1 mt-1.5 flex-1">
                             <div className={`h-full rounded-sm ${['Minimalist Tech', 'Jakes Resume'].includes(template.value) ? 'w-1/2 bg-white/10' : template.value === 'Simple Hipster' ? 'w-1/3 bg-slate-500' : 'w-1/3 bg-white/20'}`} />
                             <div className={`h-full rounded-sm ${['Executive Leadership', 'MBZUAI Academic', 'Jakes Resume'].includes(template.value) ? 'w-full bg-indigo-400/20' : 'w-2/3 bg-white/10'}`} />
                           </div>
                        </div>

                        <p className={`text-[10px]  font-black uppercase tracking-widest text-center px-2 leading-relaxed ${
                            templateInput === template.value ? 'text-indigo-300' : 'text-white/50'
                        }`}>
                          {template.label}
                        </p>
                        
                        {templateInput === template.value && (
                          <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature List */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {[
                    { icon: Shield, label: "ATS Guard", sub: "Anti-rejection logic" },
                    { icon: Zap, label: "Neural Flow", sub: "Natural phrasing" },
                    { icon: Award, label: "Impact Sync", sub: "Outcome-driven data" },
                    { icon: Brain, label: "Core Mapping", sub: "Skill alignment" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <item.icon className="w-5 h-5 text-indigo-400 mb-2" />
                      <p className="text-[11px]  font-black text-white uppercase tracking-wider">{item.label}</p>
                      <p className="text-[9px]  text-white/40 uppercase tracking-widest italic">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* AI Output Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-[32px] blur-sm opacity-50"></div>
                  <GlassCard className="relative p-8 border-white/5 bg-[#161a20]/40 min-h-[600px] flex flex-col rounded-[32px] backdrop-blur-3xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <h3 className="text-sm  font-black text-white/60 uppercase tracking-widest">Live Preview</h3>
                      </div>
                      {generatedResume && (
                        <button
                          onClick={() => {
                             const doc = new jsPDF();
                             doc.setFont('helvetica', 'normal');
                             doc.setFontSize(10);
                             const lines = doc.splitTextToSize(generatedResume.markdown, 180);
                             doc.text(lines, 14, 20);
                             doc.save(`${user?.fullName || 'Candidate'}_AI_Resume.pdf`);
                          }}
                          className="group/btn px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-xs  font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-all flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          Export PDF
                        </button>
                      )}
                    </div>

                    <div className="flex-1 overflow-auto max-h-[700px] custom-scrollbar rounded-xl bg-white/5 border border-white/10 p-6 flex flex-col justify-start">
                      {generatedResume ? (
                        <div className="w-full transform scale-[0.9] origin-top">
                          <ResumeRenderer 
                             data={generatedResume.resume_data} 
                             markdownFallback={generatedResume.markdown} 
                             template={templateInput} 
                          />
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                              <Brain className="w-8 h-8 text-white/10" />
                           </div>
                           <p className="text-[11px]  font-black text-white/20 uppercase tracking-[0.3em] font-black italic">Waiting for signal...</p>
                           <p className="text-[9px]  font-black text-white/10 uppercase tracking-widest mt-2 max-w-[200px]">Configure your target role and hit generate to craft your professional identity.</p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </div>

                <div className="relative group mt-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <button
                    disabled={resumeGenerationLoading || resumeAnalysisLoading}
                    onClick={async () => {
                      const role = resumeRoleInput || user?.targetRole || 'Software Engineer';
                      
                      try {
                        if (resumeInfo?.resumeUrl && !resumeAnalysis) {
                          showInfo('Extracting deep components from previous resume...');
                          await analyzeResume('', role, undefined);
                          showSuccess('Extraction complete. Compiling specific architectural layout.');
                        }
                        
                        await generateResume(role, jobDescriptionInput || undefined, templateInput);
                        showSuccess('Resume analyzed successfully!');
                      } catch (error: any) {
                        showError(error.response?.data?.message || 'Resume analysis failed');
                      }
                    }}
                    className="relative w-full py-4 px-8 bg-[#000000] border border-white/10 rounded-xl text-white  font-black uppercase tracking-widest hover:border-indigo-500/50 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    {resumeGenerationLoading ? (
                      <>
                        <ThinkingLoader />
                        <span>Assembling Identity...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-blue-400" />
                        <span>Generate AI Resume</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      );
    }

    if (resumeWorkspace === 'ats') {
      return (
        <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setResumeWorkspace('selection')}
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all  font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Exit Workspace
            </button>
            <div className="flex gap-4">
              <GlassButton variant="secondary" onClick={exportAtsReportPdf} className="rounded-xl px-6 text-[10px] font-black">
                Export Report
              </GlassButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-8">
              <GlassCard className="rounded-[40px] p-8 md:p-12 bg-[#161a20]/60 border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-4 text-[10px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-8">
                  <FileText size={20} />
                  Deep Scan Engine
                </div>

                <h3 className="text-3xl md:text-5xl  font-[900] text-white uppercase tracking-tighter mb-8 italic">
                  ATS Score <span className="text-white/40">Checker.</span>
                </h3>

                <div className="space-y-6">
                  <textarea
                    value={resumeTextInput}
                    onChange={(event) => setResumeTextInput(event.target.value)}
                    placeholder="Paste resume content for deep ATS validation..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white/60  font-medium min-h-[200px] focus:outline-none focus:border-white/30 transition-colors"
                  />

                  <textarea
                    value={jobDescriptionInput}
                    onChange={(event) => setJobDescriptionInput(event.target.value)}
                    placeholder="Paste Job Description for role-match analysis (optional)..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white/60  font-medium min-h-[120px] focus:outline-none focus:border-white/30 transition-colors"
                  />

                  <div className="flex flex-wrap gap-4">
                    <GlassButton
                      variant="primary"
                      disabled={resumeAnalysisLoading || isResumeUploading}
                      onClick={async () => {
                        const hasText = resumeTextInput.trim().length > 0;
                        const role = resumeRoleInput || user?.targetRole || 'Software Engineer';
                        if (!hasText && !resumeInfo?.resumeUrl) {
                          showError('Input resume text or upload a file first.');
                          return;
                        }
                        showInfo('Analyzing resume...');
                        try {
                          await analyzeResume(resumeTextInput, role, jobDescriptionInput || undefined);
                          showSuccess('Resume analyzed successfully!');
                        } catch (error: any) {
                          showError(error.response?.data?.message || 'Resume analysis failed');
                        }
                      }}
                      className="h-[55px] px-10 rounded-xl"
                    >
                      {resumeAnalysisLoading ? 'Analyzing Signal...' : 'Run Deep Scan'}
                    </GlassButton>
                    
                    <GlassButton variant="secondary" onClick={() => fileInputRef.current?.click()} className="h-[55px] px-10 rounded-xl border-white/10">
                      {isResumeUploading ? 'Uploading...' : 'Upload Existing Resume'}
                    </GlassButton>
                    
                    {/* The ATS Optimization Generator Hook */}
                     <GlassButton 
                      variant="primary" 
                      disabled={resumeGenerationLoading}
                      onClick={async () => {
                        setTemplateInput('Standard Professional ATS');
                        setResumeWorkspace('maker');
                        const role = resumeRoleInput || user?.targetRole || 'Software Engineer';
                        showInfo('Optimizing structural syntax for ATS compliance...');
                        try {
                           await generateResume(role, jobDescriptionInput || undefined, 'Standard Professional ATS');
                           showSuccess('Optimization complete!');
                        } catch {
                           showError('Auto-generation failed. Check neural link.');
                        }
                      }}
                      className="h-[55px] px-10 rounded-xl bg-code-green/10 text-code-green hover:bg-code-green/20 border border-code-green/30 ml-auto"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {resumeGenerationLoading ? 'Reconstructing Layout...' : 'Generate High ATS Resume'}
                    </GlassButton>

                    <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setIsResumeUploading(true);
                      try {
                        await uploadApi.uploadResume(file);
                        showSuccess('Resume uploaded! You can now analyze or auto-optimize.');
                      } catch { showError('Upload failed.'); }
                      finally { setIsResumeUploading(false); }
                    }} />
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { label: 'ATS Signal', value: formatVal(atsScore), unit: '%' },
                  { label: 'Success Prob', value: formatVal(interviewSuccess?.probability || 0), unit: '%' },
                  { label: 'Global Rank', value: ranking?.percentile ? 100 - ranking.percentile : 100, unit: '', prefix: 'Top ' },
                ].map((stat) => ( stat && (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-[32px] p-8 text-left">
                    <p className="text-[10px]  font-[900] uppercase tracking-widest text-white/20 mb-4">{stat.label}</p>
                    <p className="text-4xl  font-[900] text-white tracking-tighter italic">
                      {stat.prefix}{stat.value}<span className="text-lg opacity-40 ml-1">{stat.unit}</span>
                    </p>
                  </div>
                )))}
              </div>
              
              <GlassCard className="rounded-[32px] p-8 bg-[#161a20]/60 border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30">Keyword Delta</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-code-green" />
                    <span className="text-[9px] font-black uppercase text-code-green tracking-widest">Live Sync</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[12px]  font-[900] text-white uppercase tracking-widest mb-4">Matched Signals</p>
                    <div className="flex flex-wrap gap-2">
                      {(keywordLens?.matchedKeywords?.slice(0, 12) || []).map(k => (
                        <span key={k} className="bg-code-green/10 border border-code-green/30 text-code-green text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[12px]  font-[900] text-white/40 uppercase tracking-widest mb-4">Missing Gaps</p>
                    <div className="flex flex-wrap gap-2">
                      {(keywordLens?.missingKeywords?.slice(0, 12) || []).map(k => (
                        <span key={k} className="bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider italic">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <GlassCard className="rounded-[32px] p-8 bg-[#161a20]/60 border-white/5">
                <p className="text-[10px]  font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">Score History</p>
                <div className="flex h-40 items-end gap-2 mb-6">
                  {atsTrend.map((point, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div 
                          className="w-full bg-white/5 group-hover:bg-white/10 transition-colors rounded-t-lg relative"
                          style={{ height: `${Math.max(10, (point.score || 0))}%` }}
                        >
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-20" />
                        </div>
                        <span className="text-[9px] font-black text-white/20 italic">{formatVal(point.score)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px]  font-medium italic text-white/30 text-center">Historical ATS movement across versions.</p>
              </GlassCard>

              <GlassCard className="rounded-[32px] p-8 bg-[#161a20]/60 border-white/5">
                  <p className="text-[10px]  font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">AI Rewrite Delta</p>
                  <div className="space-y-4">
                    {rewriteLines.slice(0, 4).map((line, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                          <p className="text-[10px]  font-[900] uppercase text-white/20 mb-3 tracking-widest">Impact Layer {i+1}</p>
                          <p className="text-[13px]  font-black text-white uppercase tracking-tight leading-snug italic line-clamp-2">
                              "{line.improved}"
                          </p>
                        </div>
                    ))}
                  </div>
              </GlassCard>
              
              <GlassCard className="rounded-[32px] p-8 bg-[#161a20]/60 border-white/5">
                  <p className="text-[10px]  font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">Recruiter Sentiment</p>
                  <div className="space-y-4">
                    {recruiterSimulation?.strengths?.slice(0, 3).map((s, i) => (
                      <div key={i} className="flex items-center gap-4 text-code-green">
                          <ShieldCheck size={14} className="opacity-40" />
                          <span className="text-[11px]  font-black uppercase tracking-widest leading-none">{s}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[12px]  font-medium leading-relaxed text-white/40 italic">
                          {recruiterSimulation?.recommendation || "Maintain consistent technical signal across all sections."}
                        </p>
                    </div>
                  </div>
              </GlassCard>
            </div>
          </div>
        </div>
      );
    }

    if (resumeWorkspace === 'gallery') {
      return (
        <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setResumeWorkspace('selection')}
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all  font-black uppercase tracking-[0.3em] text-[10px]"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Exit Workspace
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 space-y-8 hidden md:block">
               <div className="space-y-1">
                 <button className="w-full text-left px-4 py-2 bg-indigo-500/10 text-indigo-400  font-black text-xs uppercase tracking-widest rounded-lg">All</button>
                 <button className="w-full text-left px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors  font-black text-xs uppercase tracking-widest rounded-lg">Templates</button>
                 <button className="w-full text-left px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors  font-black text-xs uppercase tracking-widest rounded-lg">Examples</button>
               </div>

               <div>
                 <p className="px-4 text-[10px]  font-black text-white/20 uppercase tracking-[0.3em] mb-4">Related Tags</p>
                 <div className="space-y-1">
                   {['Cover Letter', 'Math', 'Software', 'University', 'Formal letters', 'Assignments', 'Academic'].map(tag => (
                     <button key={tag} className="w-full text-left px-4 py-1.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors  font-bold text-[11px] tracking-wider rounded-lg">
                       {tag}
                     </button>
                   ))}
                 </div>
               </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
               <div className="mb-10">
                 <h2 className="text-3xl md:text-4xl  font-[900] text-white tracking-tighter italic mb-4">
                   Make a great first impression with our popular LaTeX templates for CVs and résumés.
                 </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {allTemplates.map((template: any) => (
                   <div key={template.id} className="group bg-[#1a1c23] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col">
                      <div className="aspect-[1/1.2] bg-[#22252a] relative border-b border-white/5 flex items-center justify-center object-cover">
                         {/* Render actual image scraped from Overleaf */}
                         <img src={template.image} alt={template.title} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity" />

                         {template.badge && (
                           <div className="absolute top-4 left-4 px-2 py-1 bg-code-green/20 border border-code-green/30 text-code-green text-[9px]  font-black uppercase tracking-widest rounded shadow-lg backdrop-blur-md">
                             {template.badge}
                           </div>
                         )}

                         {/* Hover Overlay Action */}
                         <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                           <button onClick={() => { setTemplateInput(template.title); setResumeWorkspace('maker'); }} className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white  font-black text-[11px] uppercase tracking-widest rounded-lg transition-colors">
                             Open as Template
                           </button>
                         </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-[14px]  font-[900] text-white tracking-widest uppercase mb-3 line-clamp-2">{template.title}</h3>
                        <p className="text-[12px]  text-white/50 italic leading-relaxed line-clamp-3 mb-4 flex-1">
                          {template.description}
                        </p>
                      </div>
                   </div>
                 ))}
               </div>

               {/* Pagination */}
               <div className="mt-12 flex justify-center items-center gap-2">
                 <button className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400  font-black flex items-center justify-center">1</button>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40  font-black flex items-center justify-center transition-colors">2</button>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40  font-black flex items-center justify-center transition-colors">3</button>
                 <span className="text-white/40 px-2">...</span>
                 <button className="w-10 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40  font-black flex items-center justify-center transition-colors">36</button>
                 <button className="px-4 h-10 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/5 text-white/40  font-black text-[11px] uppercase tracking-widest flex items-center justify-center transition-colors">Next</button>
               </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12 pb-20 selection:bg-white selection:text-black">
        {/* Workspace Selection Header */}
        <div className="text-center md:text-left">
          <p className="text-[11px]  font-[900] uppercase tracking-[0.6em] text-white/20 mb-4">Command Center</p>
          <h2 className="text-4xl md:text-7xl  font-[900] tracking-tighter text-white uppercase leading-[0.85] italic mb-12">
            Resume <span className="text-white/40">Lab.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* AI Resume Maker Workspace Card */}
          <div
            onClick={() => setResumeWorkspace('maker')}
            className="cursor-pointer bg-gradient-to-b from-[#2a2d36] to-[#1c1e24] shadow-2xl border border-white/5 rounded-3xl p-8 md:p-10 transition-transform hover:-translate-y-1 flex flex-col min-h-[380px]"
          >
             <p className="text-[11px]  font-black text-gray-400 uppercase tracking-[0.2em] mb-10">
                TEMPLATE WORKSPACE
             </p>
             
             <h3 className="text-4xl md:text-5xl  font-[900] text-white uppercase italic mb-8">
                TEMPLATE MAKER
             </h3>
             
             <p className="text-[15px]  font-semibold text-gray-400 italic leading-relaxed mb-auto max-w-sm">
                Choose from a wide range of resume templates, similar to Overleaf, covering different fields. Upload your previous resume and the AI will extract all relevant details and automatically generate a new resume in the chosen template with properly formatted information.
             </p>
             
             <div className="mt-12 flex items-center gap-3 text-white  font-black uppercase tracking-widest text-[12px]">
                ENTER WORKSPACE <ArrowRight className="w-4 h-4" />
             </div>
          </div>

          {/* ATS Score Checker Workspace Card */}
          <div
            onClick={() => setResumeWorkspace('ats')}
            className="cursor-pointer bg-gradient-to-b from-[#2a2d36] to-[#1c1e24] shadow-2xl border border-white/5 rounded-3xl p-8 md:p-10 transition-transform hover:-translate-y-1 flex flex-col min-h-[380px]"
          >
             <p className="text-[11px]  font-black text-gray-400 uppercase tracking-[0.2em] mb-10">
                OPTIMIZER WORKSPACE
             </p>
             
             <h3 className="text-4xl md:text-5xl  font-[900] text-white uppercase italic mb-8">
                ATS OPTIMIZER
             </h3>
             
             <p className="text-[15px]  font-semibold text-gray-400 italic leading-relaxed mb-auto max-w-sm">
                Upload your existing resume or manually enter your details. The AI will then optimize the content and create a high ATS (Applicant Tracking System) score resume automatically.
             </p>
             
             <div className="mt-12 flex items-center gap-3 text-white  font-black uppercase tracking-widest text-[12px]">
                ENTER WORKSPACE <ArrowRight className="w-4 h-4" />
             </div>
          </div>

          {/* Template Gallery Card */}
          <div
            onClick={() => setResumeWorkspace('gallery')}
            className="cursor-pointer bg-gradient-to-b from-[#2a2d36] to-[#1c1e24] shadow-2xl border border-white/5 rounded-3xl p-8 md:p-10 transition-transform hover:-translate-y-1 flex flex-col min-h-[380px]"
          >
             <p className="text-[11px]  font-black text-gray-400 uppercase tracking-[0.2em] mb-10">
                GALLERY WORKSPACE
             </p>
             
             <h3 className="text-4xl md:text-5xl  font-[900] text-white uppercase italic mb-8">
                TEMPLATES
             </h3>
             
             <p className="text-[15px]  font-semibold text-gray-400 italic leading-relaxed mb-auto max-w-sm">
                Explore a vast collection of ATS-optimized resume templates. Browse our gallery inspired by the best professional structures to find the perfect format for your job applications.
             </p>
             
             <div className="mt-12 flex items-center gap-3 text-white  font-black uppercase tracking-widest text-[12px]">
                ENTER WORKSPACE <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        </div>
      </div>
    );
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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 selection:bg-white selection:text-black">
        <GlassCard className="rounded-[40px] p-10 bg-[#161a20]/60 border-white/5 relative overflow-hidden group">
          <p className="text-[11px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-8">Assessment Studio</p>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl  font-[900] text-white uppercase tracking-tight italic">Skill Signal</h2>
            {isLocked && (
              <span className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest">
                <Lock size={12} /> Locked
              </span>
            )}
          </div>
          
          {isLocked ? (
            <div className="mb-10">
              <p className="text-[15px]  font-medium tracking-tight leading-relaxed text-amber-500/80 mb-6 italic">
                Strategic cool-down active. Your neural pathways are processing the recent assessment. You can retake the test starting {unlockDate?.toLocaleDateString()} at {unlockDate?.toLocaleTimeString()}.
              </p>
              <div className="inline-block p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                <p className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.3em] mb-1">Available On</p>
                <p className="text-xl font-black text-white">{unlockDate?.toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <p className="text-[15px]  font-medium tracking-tight leading-relaxed text-white/50 mb-10"> Launch your proctored assessment inside redesigned obsidian panels with smoother motion and legible progress cues.</p>
          )}

          <div className="flex flex-wrap items-center gap-10">
            <div className="flex gap-4">
              <button 
                onClick={() => !isLocked && setStartAssessment('field')}
                disabled={isLocked}
                className={`relative h-[55px] px-8 group active:scale-95 transition-transform text-white ${isLocked ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
              >
                {!isLocked && (
                  <svg className="absolute inset-0 w-full h-full transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 0H184L174 65H10L0 0Z" fill="white" />
                  </svg>
                )}
                {isLocked && <div className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-xl" />}
                <span className={`relative z-10 flex items-center justify-center h-full ${isLocked ? 'text-white/40' : 'text-[#161a20]'} font-[800] text-xs uppercase tracking-widest gap-2`}>
                  {isFieldComplete ? 'Retake Stage 1' : 'Launch Field Test'} <ArrowRight size={16} />
                </span>
              </button>
              
              <button 
                onClick={() => !isLocked && setStartAssessment('skills')}
                disabled={isLocked || !isFieldComplete}
                className={`relative h-[55px] px-8 group active:scale-95 transition-transform text-white rounded-lg transition-all ${isLocked || !isFieldComplete ? 'opacity-40 cursor-not-allowed grayscale bg-white/5 border-white/10' : 'bg-indigo-500/20 border border-indigo-400/30 hover:bg-indigo-500/40'}`}
              >
                <span className={`relative z-10 flex items-center justify-center h-full ${isLocked || !isFieldComplete ? 'text-white/40' : 'text-indigo-300'} font-[800] text-xs uppercase tracking-widest gap-2`}>
                  {isSkillComplete ? 'Retake Stage 2' : 'Launch Skills Test'} <ArrowRight size={16} />
                </span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowFullRecommendations(true)}
              className="text-[12px] text-white  font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              Review AI Recommendations
            </button>
          </div>
        </GlassCard>


        <GlassCard className="rounded-[32px] p-10 bg-[#161a20]/60 border-white/5">
          <p className="text-[11px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-10">Current Status</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-[10px]  font-black uppercase tracking-[0.2em] text-white/20 mb-2">Assessment Score</p>
              <p className="text-4xl  font-[900] text-white uppercase tracking-tighter italic">{formatVal(user?.testResults?.score || 0)}%</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-[10px]  font-black uppercase tracking-[0.2em] text-white/20 mb-2">Completion</p>
              <p className="text-2xl  font-[900] text-white uppercase tracking-tighter italic">{user?.isAssessmentComplete ? 'Active' : 'Pending'}</p>
            </div>
          </div>
          {user?.testResults?.sectionResults?.length ? (
            <div className="mt-10 space-y-4">
              {user.testResults.sectionResults.map((section) => (
                <SkillBar key={section.name} skill={section.name} level={section.score} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-[13px]  font-medium italic text-white/20 uppercase tracking-widest">Take assessment to unlock deeper signals.</p>
          )}
        </GlassCard>
      </div>
    );
  };

  const handleAddCompany = async () => {
    if (!newCompanyName.trim()) return;
    
    const currentCompanies = user?.preferredCompanies || [];
    if (currentCompanies.includes(newCompanyName.trim())) {
      showInfo('Company already in your target list.');
      return;
    }

    try {
      await updateUser({
        preferredCompanies: [...currentCompanies, newCompanyName.trim()]
      });
      setNewCompanyName('');
      showSuccess(`${newCompanyName} added to target list.`);
    } catch {
      showError('Failed to update target companies.');
    }
  };

  const handleRemoveCompany = async (name: string) => {
    try {
      await updateUser({
        preferredCompanies: (user?.preferredCompanies || []).filter(c => c !== name)
      });
      showSuccess(`${name} removed from target list.`);
    } catch {
      showError('Failed to update target companies.');
    }
  };

  const renderOpportunities = () => {
    if (opportunitiesWorkspace === 'selection') {
      return (
        <div className="relative">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 selection:bg-white selection:text-black relative z-10">
            {shellCards.map((card, idx) => (
              <GlassCard 
                key={card.title} 
                className="rounded-[40px] p-10 bg-[#161a20]/40 border-white/5 flex flex-col justify-between group h-[400px] hover:bg-white/5 transition-all duration-700 relative overflow-hidden backdrop-blur-3xl"
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
                      <a 
                        href={job.applicationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                      >
                        Apply Now <ArrowUpRight size={12} />
                      </a>
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

        {opportunitiesWorkspace === 'companies' && (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <GlassCard className="rounded-[40px] p-10 md:p-16 bg-[#161a20]/60 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <p className="text-[11px]  font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">Intelligence Layer</p>
                <h3 className="text-4xl md:text-6xl  font-[900] text-white uppercase tracking-tighter mb-10 italic">
                  Company <span className="text-emerald-400">Tracker.</span>
                </h3>

                <div className="max-w-2xl space-y-10">
                  <div className="relative group">
                    <input 
                      type="text"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCompany()}
                      placeholder="Enter target company name (e.g. Google, NVIDIA)..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg  font-bold placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 transition-all"
                    />
                    <button 
                      onClick={handleAddCompany}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-12 px-8 bg-emerald-500 text-[#161a20]  font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-emerald-400 active:scale-95 transition-all"
                    >
                      Add Signal
                    </button>
                  </div>

                  <div className="pt-10 border-t border-white/5">
                    <p className="text-[10px]  font-black uppercase tracking-[0.3em] text-white/20 mb-8">Active Targets</p>
                    <div className="flex flex-wrap gap-4">
                      {user?.preferredCompanies && user.preferredCompanies.length > 0 ? (
                        user.preferredCompanies.map((company) => (
                          <div 
                            key={company}
                            className="group relative px-8 py-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all flex items-center gap-6"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            <span className="text-lg  font-black text-white uppercase tracking-tighter italic">{company}</span>
                            <button 
                              onClick={() => handleRemoveCompany(company)}
                              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"
                            >
                              <ArrowRight size={14} className="rotate-45" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="w-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                          <p className="text-[11px]  font-black text-white/20 uppercase tracking-widest italic">No companies tracked yet. Start monitoring common targets.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {['applications', 'network'].includes(opportunitiesWorkspace) && (
          <div className="h-[600px] flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10">
               <Bot className="w-10 h-10 text-white/20 animate-pulse" />
            </div>
            <h3 className="text-3xl  font-[900] text-white uppercase tracking-tighter italic mb-4">Workspace <span className="text-white/40">Empty.</span></h3>
            <p className="text-[13px]  font-medium text-white/30 uppercase tracking-widest max-w-sm mx-auto">
              You haven't initiated any {opportunitiesWorkspace} signals yet. Your progress will appear here in real-time.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 selection:bg-white selection:text-black">
      <GlassCard className="rounded-[32px] p-10 xl:col-span-5 bg-[#161a20]/60 border-white/5">
        <p className="text-[11px]  font-[900] uppercase tracking-[0.4em] text-white/30 mb-8">Appearance</p>
        <h2 className="text-3xl  font-[900] text-white uppercase tracking-tight mb-8 italic">Theme Signal</h2>
        <p className="text-[15px]  font-medium tracking-tight leading-relaxed text-white/50 mb-10">Switch instantly between light and dark glass themes with smooth transitions across the entire platform.</p>
        <div className="mt-8">
          <ThemeToggle />
        </div>
      </GlassCard>

      <GlassCard className="rounded-[32px] p-10 xl:col-span-7 bg-[#161a20]/60 border-white/5">
        <div className="flex items-center gap-8 mb-10">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-3xl">
            <span className="text-3xl  font-[900] text-white">{user?.fullName?.charAt(0) || 'U'}</span>
          </div>
          <div>
            <h3 className="text-2xl  font-[900] text-white uppercase tracking-tighter italic">{user?.fullName || 'Student'}</h3>
            <p className="text-[11px]  font-black text-white/40 uppercase tracking-[0.3em] mt-2">{user?.targetRole || 'Software Engineer'}</p>
          </div>
        </div>
        <p className="text-[10px]  font-[900] uppercase tracking-[0.3em] text-white/30 mb-8">Profile Summary</p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['College', user?.collegeName || ''],
            ['Degree', user?.degree || ''],
          ].map(([label, value]) => (
            <div key={label} className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <p className="text-[10px]  font-black uppercase tracking-[0.22em] text-white/20 mb-2">{label}</p>
              <p className="text-[13px]  font-black text-white uppercase tracking-widest">{value || 'Not set'}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#161a20]  text-white overflow-x-hidden selection:bg-white selection:text-black">
      <div className="fixed inset-0 bg-[#161a20] -z-50" />
      {/* Glassmorphism dashboard lock overlay for new users */}
      {!isFullyQualified && !startAssessment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[40px]">
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

      {/* Mobile Bottom Navigation */}
      {!startAssessment && (
        <MobileNav
          active={activeTab}
          onNavigate={(id: string) => {
            if (id === 'mentor') setShowFullRecommendations(true);
            else if (id === 'jobs') setDashboardTab('opportunities');
            else setDashboardTab(id as DashboardTab);
          }}
          badgeMap={atsScore > 0 ? { jobs: atsScore } : {}}
          lockedItems={!isFullyQualified ? ['overview', 'resume', 'jobs', 'settings'] : []}
        />
      )}

      {/* Desktop Sidebar and Main Layout */}
      {!startAssessment ? (
        <div className="hidden md:flex">
          <Sidebar
            active={activeTab}
            onNavigate={(id: string) => {
              if (id === 'mentor') setShowFullRecommendations(true);
              else if (id === 'jobs') setDashboardTab('opportunities');
              else setDashboardTab(id as DashboardTab);
            }}
            badgeMap={atsScore > 0 ? { jobs: atsScore } : {}}
            lockedItems={!isFullyQualified ? ['overview', 'resume', 'opportunities', 'settings'] : []}
          />
          <main className="min-w-0 flex-1 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 flex flex-col bg-slate-950">
            <div className="absolute inset-0 w-full h-full bg-slate-950 z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />

            <header className="sticky top-0 z-30 px-6 py-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-6 pointer-events-auto">
                <h2 className="text-xl  font-[900] uppercase tracking-[0.2em] text-white italic">
                  {activeTab === 'overview' ? 'Cockpit' : activeTab === 'resume' ? 'Resume Lab' : activeTab === 'assessment' ? 'Skill Signal' : activeTab}
                </h2>
                <div className="h-4 w-[1px] bg-white/10" />
                <p className="text-[10px]  font-black text-white/30 uppercase tracking-[0.2em]">Prepzo Satellite .01</p>
              </div>
              
              <div className="flex items-center gap-4 pointer-events-auto">
                <div className="text-right hidden sm:block">
                  <p className="text-[12px]  font-[900] text-white uppercase tracking-widest leading-none">{user?.fullName}</p>
                  <p className="text-[9px]  font-black text-white/20 uppercase tracking-[0.2em] mt-1 italic">{user?.targetRole || 'Software Engineer'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center  font-[900] text-white text-[13px] uppercase">
                  {user?.fullName?.charAt(0)}
                </div>
              </div>
            </header>
            
            <div className="relative z-10 mx-auto w-full max-w-7xl space-y-12 px-6 pb-32 pointer-events-none">
              {activeTab === 'overview' && (
                <div className="pointer-events-auto">
                    {renderOverview()}
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

      {/* AI Mentor Panel */}
      {!startAssessment && showFullRecommendations && <AIRecommendationsPanel onClose={() => setShowFullRecommendations(false)} />}
    </div>
  );
}

export default Dashboard;
