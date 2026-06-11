import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap,
  CheckCircle,
  Users,
  Bot,
  ShieldCheck,
  FileSearch,
  Briefcase,
  TrendingUp,
  Rocket,
  Award,
  BarChart3,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
} from 'lucide-react';
import { PrepzoHero } from '@/components/landing/PrepzoHero';
import { PrepzoNavbar } from '@/components/landing/PrepzoNavbar';
import { getPublicStats, PublicStats } from '@/api/public';
import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Boxes } from '@/components/ui/background-boxes';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

/* ── Journey Steps ───────────────────────────────────────── */
const prepzoJourney = [
  { step: '01', title: 'Join the Nest', desc: 'Secure your place in the Prepzo ecosystem and connect your professional profile.' },
  { step: '02', title: 'Signal Assessment', desc: 'Take dynamic, AI-proctored evaluations to baseline your true technical skill.' },
  { step: '03', title: 'ATS Deep Scan', desc: 'Our analyzers deconstruct your resume and map it directly to industry-standard roles.' },
  { step: '04', title: 'AI Orchestration', desc: 'Your personal mentor designs a hyper-tailored study and interview prep roadmap.' },
  { step: '05', title: 'Verified Placement', desc: 'Apply to top-tier roles with your verified assessment scores and standing.' },
];

/* ── Features ────────────────────────────────────────────── */
const storyFeatures = [
  {
    id: 'mentor',
    eyebrow: 'AI Mentor',
    title: 'A mentor that knows where you\'re stuck before you say a word.',
    description:
      'Prepzo\'s AI reads your assessment scores, resume gaps, and current dashboard tab — then opens a conversation already tailored to your next move. Not scripted. Not generic.',
    icon: Bot,
    color: '#5ed29c',
    highlights: [
      'Context memory across every session',
      'Role-aware study plans and prep paths',
      'Hint mode during live assessments',
    ],
    visual: (
      <div className="relative w-full h-full flex flex-col gap-3 p-2">
        <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-code-green animate-pulse" />
            <span className="text-[10px] text-code-green font-black uppercase tracking-widest">Live Sync: Assessment Session</span>
        </div>
        {[
          { role: 'ai',   text: 'I see your React score dropped to 62%. Want to focus on useEffect?' },
          { role: 'user', text: 'Yes, and also interview tips for frontend roles.' },
          { role: 'ai',   text: 'Perfect. Prepped a 2-day plan. Here\'s a concept map.' },
        ].map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, x: msg.role === 'ai' ? -20 : 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18, duration: 0.6 }}
            className={`px-5 py-4 rounded-[22px] text-[13px] backdrop-blur-xl ${
              msg.role === 'ai'
                ? 'self-start max-w-[85%] bg-white/5 text-white/80 border border-white/10 shadow-lg'
                : 'self-end max-w-[75%] bg-code-green/20 text-code-green border border-code-green/30 shadow-green-900/10'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: 'assessment',
    eyebrow: 'Skill Signal',
    title: 'Dynamic questions. Real signals. Never the same paper twice.',
    description:
      'Every assessment draws from a hybrid pool — curated questions plus AI-generated ones unique to your session. Your readiness score reflects genuine skill, not memorized answers.',
    icon: ShieldCheck,
    color: '#38bdf8',
    highlights: [
      'AI-generated questions unique to each session',
      'Section-by-section skill heat map',
      'Proctored with live focus monitoring',
    ],
    visual: (
      <div className="relative p-2 space-y-4 h-full flex flex-col justify-center">
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
              <div className="text-[10px] text-code-green font-bold bg-code-green/10 px-2 py-1 rounded">PROCTORED</div>
          </div>
          <p className="text-[10px] text-white/30 mb-4 uppercase tracking-[0.3em] font-bold">React Assessment — Signal #742</p>
          <p className="text-[15px] font-bold text-white mb-6 leading-snug">What cleanup does useEffect return when a subscription is active?</p>
          {['A cleanup function (unsubscribe)', 'A promise rejection handler', 'The previous state value', 'Nothing (null)'].map((opt, i) => (
            <div
              key={i}
              className={`mb-3 px-5 py-4 rounded-[18px] text-[13px] font-bold transition-all ${
                i === 0
                  ? 'bg-code-green/10 border border-code-green/50 text-code-green'
                  : 'bg-white/5 border border-white/5 text-white/30'
              }`}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'resume',
    eyebrow: 'ATS Command Center',
    title: 'ATS feedback rendered as a high-fidelity command room.',
    description:
      'Upload your resume and get a role-matched keyword gap analysis, ATS score, and an ordered list of improvements — all in one narrative surface instead of scattered widgets.',
    icon: FileSearch,
    color: '#10b981',
    highlights: [
      'Keyword gap heatmap per target role',
      'ATS score with section breakdown',
      'Prioritized rewrite suggestions',
    ],
    visual: (
      <div className="p-2 space-y-5 h-full flex flex-col justify-center">
        <div className="bg-white/5 border border-white/10 p-8 rounded-[36px] flex items-center justify-between backdrop-blur-md shadow-2xl">
          <div className="text-left">
            <p className="text-[11px] text-white/30 uppercase tracking-[0.4em] mb-2 font-black">ATS Signal Score</p>
            <p className="text-5xl font-[900] text-white italic tracking-tighter leading-none">82<span className="text-xl text-code-green italic">%</span></p>
          </div>
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-[6px] border-code-green/10" />
            <div className="absolute inset-0 w-20 h-20 rounded-full border-[6px] border-code-green border-r-transparent animate-spin-slow rotate-45" />
          </div>
        </div>
        <div className="space-y-3">
            {[
              { label: 'Cloud Architecture Match', pct: 91, status: 'Strong' },
              { label: 'System Design Patterns', pct: 34, status: 'Gap' },
              { label: 'Production Runtime Exp', pct: 72, status: 'Average' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[24px] hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] text-white/60 uppercase font-black tracking-widest">{item.label}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${item.pct > 80 ? 'text-code-green bg-code-green/10' : item.pct > 50 ? 'text-yellow-500 bg-yellow-500/10' : 'text-red-500 bg-red-500/10'}`}>
                        {item.status}
                    </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.pct}%` }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        className={`h-full rounded-full ${item.pct > 80 ? 'bg-code-green' : item.pct > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                    />
                </div>
              </div>
            ))}
        </div>
      </div>
    ),
  },
  {
    id: 'jobs',
    eyebrow: 'Verified Job Radar',
    title: 'Apply with verified signals. Stand out before they click your PDF.',
    description:
      'Every application carries your live assessment scores. Recruiters see your verified skill proof directly linked to job applications through Prepzo.',
    icon: Briefcase,
    color: '#f59e0b',
    highlights: [
      'Skill-verified apply badge per job',
      'AI job match score based on profile',
      '1-click apply using verified data',
    ],
    visual: (
      <div className="p-2 space-y-4 h-full flex flex-col justify-center">
        {[
          { company: 'Zomato', role: 'Staff Frontend Engineer', match: 94, tech: 'React, Next.js, Node' },
          { company: 'Razorpay', role: 'SDE III — Platform', match: 78, tech: 'Golang, AWS, K8s' },
          { company: 'CRED', role: 'Frontend Architect', match: 82, tech: 'React, Swift, Animation' },
        ].map((job, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[28px] flex items-center justify-between backdrop-blur-sm group hover:bg-white/10 transition-all cursor-default">
            <div className="text-left">
              <p className="text-[13px] font-black text-white uppercase tracking-tight mb-1">{job.company}</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{job.role}</p>
              <p className="mt-2 text-[9px] text-code-green/60 font-medium uppercase tracking-tighter">{job.tech}</p>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-black text-code-green italic tracking-tighter leading-none">{job.match}%</span>
                    <BarChart3 size={14} className="text-code-green/40" />
                </div>
                <p className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em]">MATCH SIGNAL</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

/* ── Platform Edge ────────────────────────────────────────── */
const platformEdge = [
  { icon: Zap,         title: 'Readiness Score', desc: 'One live number mapping assessment, resume, and activity into recruiter-visible proof.', size: 'full' },
  { icon: Users,       title: 'Peer Benchmark',  desc: 'See how you rank against peers anonymously at the same experience level.', size: 'md' },
  { icon: Award,       title: 'AI Mock Interview', desc: 'Webcam + mic simulation with real-time delivery and logic evaluation.', size: 'md' },
  { icon: Rocket,      title: 'Skill Graph Export', desc: 'A shareable visual verification of your skills built specifically for LinkedIn.', size: 'full' },
];

const simSteps = [
  {
    step: '01',
    label: 'JOIN NEST',
    title: 'Join the Nest',
    desc: 'Connect your professional profile and baseline your details.',
  },
  {
    step: '02',
    label: 'ASSESSMENT',
    title: 'Signal Assessment',
    desc: 'Take dynamic, AI-proctored evaluations to verify your coding skills.',
  },
  {
    step: '03',
    label: 'ATS SCAN',
    title: 'ATS Deep Scan',
    desc: 'Analyze your resume keyword gaps and map them to target roles.',
  },
  {
    step: '04',
    label: 'AI MENTOR',
    title: 'AI Orchestration',
    desc: 'Receive a personalized study roadmap from your AI mentor.',
  },
  {
    step: '05',
    label: 'PLACEMENT',
    title: 'Verified Placement',
    desc: 'Apply directly to verified roles with your verified skill signals.',
  },
];

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stats, setStats] = useState<PublicStats | null>(null);
  const { setGlobalLoading } = useAppStore();

  const [simViewMode, setSimViewMode] = useState<'video' | 'simulator'>('video');
  const [activeSimStep, setActiveSimStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Video player states
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  // Onboarding simulator states
  const [nestStep, setNestStep] = useState(0);
  const [mockName, setMockName] = useState('');
  const [mockRole, setMockRole] = useState('');

  // Code Playground simulator states
  const [codeStep, setCodeStep] = useState(0);
  const [mockCode, setMockCode] = useState('');

  // ATS scanner simulator states
  const [scanStep, setScanStep] = useState(0);
  const [mockAtsScore, setMockAtsScore] = useState(0);

  // AI Mentor simulator states
  const [mentorText, setMentorText] = useState('');

  // Job applying simulator states
  const [applyStep, setApplyStep] = useState(0);

  // Auto-advance loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveSimStep(prev => (prev + 1) % 5);
    }, 9500); // switch step every 9.5 seconds
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Step 0: Onboarding animation trigger
  useEffect(() => {
    if (activeSimStep !== 0) return;
    setNestStep(0);
    setMockName('');
    setMockRole('');
    
    let t1 = setTimeout(() => {
      let nameStr = 'Ayush Soni';
      let i = 0;
      let interval = setInterval(() => {
        setMockName(nameStr.substring(0, i + 1));
        i++;
        if (i >= nameStr.length) {
          clearInterval(interval);
          setNestStep(1);
        }
      }, 70);
    }, 400);

    return () => {
      clearTimeout(t1);
    };
  }, [activeSimStep]);

  useEffect(() => {
    if (activeSimStep !== 0 || nestStep !== 1) return;
    let t2 = setTimeout(() => {
      let roleStr = 'Frontend Developer';
      let i = 0;
      let interval = setInterval(() => {
        setMockRole(roleStr.substring(0, i + 1));
        i++;
        if (i >= roleStr.length) {
          clearInterval(interval);
          setNestStep(2);
        }
      }, 70);
    }, 300);
    return () => clearTimeout(t2);
  }, [activeSimStep, nestStep]);

  useEffect(() => {
    if (activeSimStep !== 0 || nestStep !== 2) return;
    let t3 = setTimeout(() => {
      setNestStep(3);
    }, 1200);
    return () => clearTimeout(t3);
  }, [activeSimStep, nestStep]);

  // Step 1: Code playground animation trigger
  useEffect(() => {
    if (activeSimStep !== 1) return;
    setCodeStep(0);
    setMockCode('');
    
    const codeStr = `def binary_search(arr, val):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == val:
            return mid
        elif arr[mid] < val:
            left = mid + 1
        else:
            right = mid - 1
    return -1`;
    
    let i = 0;
    let interval = setInterval(() => {
      setMockCode(codeStr.substring(0, i + 1));
      i++;
      if (i >= codeStr.length) {
        clearInterval(interval);
        setCodeStep(1);
      }
    }, 12);

    return () => {
      clearInterval(interval);
    };
  }, [activeSimStep]);

  useEffect(() => {
    if (activeSimStep !== 1 || codeStep !== 1) return;
    let t = setTimeout(() => {
      setCodeStep(2);
    }, 1200);
    return () => clearTimeout(t);
  }, [activeSimStep, codeStep]);

  // Step 2: ATS scanner animation trigger
  useEffect(() => {
    if (activeSimStep !== 2) return;
    setScanStep(0);
    setMockAtsScore(0);

    let t = setTimeout(() => {
      setScanStep(1);
      let count = 0;
      let interval = setInterval(() => {
        count += 2;
        setMockAtsScore(count);
        if (count >= 88) {
          clearInterval(interval);
        }
      }, 20);
    }, 1800); // scan for 1.8s

    return () => {
      clearTimeout(t);
    };
  }, [activeSimStep]);

  // Step 3: AI Mentor animation trigger
  useEffect(() => {
    if (activeSimStep !== 3) return;
    setMentorText('');
    
    let msg = "Welcome Ayush. I reviewed your search algorithm score (96%). However, your state hooks module has a 34% gap. I've compiled a 2-day lesson roadmap below to help you prep for CRED's interview.";
    let i = 0;
    let interval = setInterval(() => {
      setMentorText(msg.substring(0, i + 1));
      i++;
      if (i >= msg.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [activeSimStep]);

  // Step 4: Placement Apply reset
  useEffect(() => {
    if (activeSimStep !== 4) return;
    setApplyStep(0);
  }, [activeSimStep]);

  const handleApplyClick = () => {
    setApplyStep(1);
    setTimeout(() => {
      setApplyStep(2);
    }, 1500);
  };

  const handleTabClick = (index: number) => {
    setActiveSimStep(index);
    setIsAutoPlaying(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total) {
      setProgress((current / total) * 100);
    }
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    videoRef.current.currentTime = clickPercent * videoRef.current.duration;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      void videoRef.current.requestFullscreen();
    }
  };

  const renderSimVisual = () => {
    switch (activeSimStep) {
      case 0: // Onboarding Form
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 font-mono text-xs text-white/80">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] text-code-green font-bold uppercase tracking-widest">NEST PROFILE SETUP</span>
                <span className="text-[10px] text-white/30">ID: PRZ-9982</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/35 text-[9px] uppercase tracking-widest mb-1.5">Full Name</label>
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-[42px] flex items-center text-white font-bold">
                    {mockName}
                    {nestStep === 0 && <span className="w-1.5 h-4 bg-code-green ml-1 animate-pulse" />}
                  </div>
                </div>

                <div>
                  <label className="block text-white/35 text-[9px] uppercase tracking-widest mb-1.5">Target Role</label>
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-[42px] flex items-center text-white font-bold">
                    {mockRole}
                    {nestStep === 1 && <span className="w-1.5 h-4 bg-code-green ml-1 animate-pulse" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <button className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-500 border ${
                nestStep >= 3 
                  ? 'bg-code-green/10 border-code-green/40 text-code-green'
                  : nestStep >= 2
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 animate-pulse'
                    : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                {nestStep >= 3 ? '✓ Profile Synced & Active' : nestStep >= 2 ? 'Connecting Signals...' : 'Configure Uplink'}
              </button>
              
              {nestStep >= 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-code-green/5 border border-code-green/10 rounded-2xl"
                >
                  <CheckCircle size={16} className="text-code-green" />
                  <p className="text-[10px] leading-relaxed text-white/55 text-left">
                    College network verified: IIT Delhi nodes online.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        );

      case 1: // Coding Playground
        return (
          <div className="w-full h-full flex flex-col justify-between font-mono text-[11px] md:text-xs">
            {/* Editor Header */}
            <div className="bg-white/5 border-b border-white/10 px-6 py-3 flex justify-between items-center text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5ed29c]" />
                <span className="font-bold text-white/80">binary_search.py</span>
              </div>
              <span>Python 3.10</span>
            </div>

            {/* Code Body */}
            <div className="flex-1 p-6 text-white/80 overflow-y-auto leading-relaxed h-[220px]">
              <pre className="whitespace-pre-wrap select-none text-left">
                {mockCode}
                {codeStep === 0 && <span className="w-1.5 h-4 bg-code-green inline-block ml-0.5 align-middle animate-pulse" />}
              </pre>
            </div>

            {/* Console Output */}
            <div className="border-t border-white/10 bg-black/40 p-5 space-y-2 text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">COCKPIT CONSOLE</span>
                {codeStep >= 1 && (
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    codeStep === 2 ? 'text-code-green bg-code-green/10' : 'text-yellow-500 bg-yellow-500/10'
                  }`}>
                    {codeStep === 2 ? 'SUCCESS' : 'RUNNING'}
                  </span>
                )}
              </div>
              
              {codeStep >= 1 && (
                <div className="space-y-1 text-white/50 text-[10px] text-left">
                  <p className="text-white/35">$ python -m pytest tests.py</p>
                  <p className="text-code-green">✓ Test Case 1: Search value found at index 4</p>
                  {codeStep >= 2 && (
                    <>
                      <p className="text-code-green">✓ Test Case 2: Target not in array returns -1</p>
                      <p className="text-code-green font-bold">✓ All 10 hidden performance test cases passed</p>
                      <p className="text-white font-bold pt-1">SCORE: 96/100 (ELITE SIGNAL)</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 2: // ATS Deep Scan
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-1">
              {/* Mock Resume Document with Laser Sweep */}
              <div className="relative border border-white/10 bg-white/5 rounded-[20px] p-6 h-[240px] flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Horizontal Neon Scanline */}
                {scanStep === 0 && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-code-green to-transparent shadow-[0_0_12px_#5ed29c] z-10"
                  />
                )}
                
                <div className="space-y-3">
                  <div className="w-1/2 h-3 bg-white/20 rounded-full" />
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-2.5 bg-white/20 rounded-full" />
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-2/3 h-2.5 bg-white/20 rounded-full" />
                  <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                </div>
              </div>

              {/* Scan Results */}
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[9px] text-white/35 font-bold uppercase tracking-widest block mb-1">ATS SCANNED SCORE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-rubik font-[900] text-white italic tracking-tighter">
                      {mockAtsScore}
                    </span>
                    <span className="text-xl text-code-green font-rubik font-bold italic">%</span>
                  </div>
                </div>

                {scanStep >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <span className="text-[9px] text-white/35 font-bold uppercase tracking-widest block">TELEMETRY KEYWORDS</span>
                    <div className="space-y-2 text-[10px]">
                      <div className="flex items-center justify-between p-2.5 bg-code-green/10 border border-code-green/20 rounded-xl">
                        <span className="text-code-green font-bold">✓ React / Next.js</span>
                        <span className="text-white/40 uppercase text-[8px] font-black">MATCHED</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <span className="text-yellow-500 font-bold">! System Design Gaps</span>
                        <span className="text-white/40 uppercase text-[8px] font-black">2 GAPS FOUND</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        );

      case 3: // AI Mentor
        return (
          <div className="w-full h-full flex flex-col justify-between font-mono text-xs">
            {/* Chat Box */}
            <div className="p-6 border-b border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-code-green/10 border border-code-green/20 flex items-center justify-center shrink-0">
                <Bot size={20} className="text-code-green" />
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white uppercase text-[10px] tracking-wider">AI Mentor Uplink</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-code-green animate-pulse" />
                </div>
                <p className="text-[11px] leading-relaxed text-white/60">
                  {mentorText}
                  {mentorText.length < 180 && <span className="w-1 h-3 bg-code-green inline-block ml-0.5 animate-pulse" />}
                </p>
              </div>
            </div>

            {/* Generated Milestones */}
            <div className="p-6 md:p-8 space-y-4 bg-black/30">
              <span className="text-[9px] text-white/35 font-bold uppercase tracking-widest block text-left">CALIBRATED ROADMAP</span>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: 'React Core', status: 'done', desc: 'Score: 96%' },
                  { title: 'State Hooks', status: 'active', desc: 'Study 2 Days' },
                  { title: 'Performance', status: 'locked', desc: 'CRED assessment' }
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-2xl border text-left ${
                    item.status === 'done'
                      ? 'bg-code-green/5 border-code-green/20'
                      : item.status === 'active'
                        ? 'bg-white/5 border-code-green animate-pulse'
                        : 'bg-white/5 border-white/5 opacity-40'
                  }`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'done' ? 'text-code-green' : item.status === 'active' ? 'text-white' : 'text-white/40'
                    }`}>{item.title}</p>
                    <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Placements
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 font-mono text-xs">
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 flex items-center justify-between backdrop-blur-md shadow-2xl relative overflow-hidden text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-code-green bg-code-green/10 px-2 py-0.5 rounded font-bold">VERIFIED</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest">94% MATCH SCORE</span>
                  </div>
                  <h4 className="text-xl font-rubik font-[900] text-white uppercase tracking-tight">Staff Frontend Engineer</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Razorpay • Bengaluru</p>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Briefcase size={22} className="text-white/60" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <button 
                onClick={handleApplyClick}
                disabled={applyStep !== 0}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-500 border ${
                  applyStep === 2
                    ? 'bg-code-green/15 border-code-green/40 text-code-green cursor-default'
                    : applyStep === 1
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 animate-pulse'
                      : 'bg-white text-[#161a20] border-white hover:bg-white/90 hover:scale-[1.01] active:scale-95 cursor-pointer'
                }`}
              >
                {applyStep === 2 
                  ? '✓ Application Submitted with Verified Signals' 
                  : applyStep === 1 
                    ? 'Transmitting Skill Signals...' 
                    : '1-Click Apply'}
              </button>
              
              {applyStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-code-green/5 border border-code-green/10 rounded-2xl"
                >
                  <CheckCircle size={16} className="text-code-green" />
                  <p className="text-[10px] leading-relaxed text-white/55 text-left">
                    Your verified 96% BinarySearch score and 88% ATS resume signals have been pushed directly to the recruiter's command room dashboard.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    // Force dark theme on landing page by default
    const originalTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    
    return () => {
      // Restore the original theme when leaving landing page
      if (originalTheme) {
        document.documentElement.setAttribute('data-theme', originalTheme);
        document.body.setAttribute('data-theme', originalTheme);
      }
    };
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPublicStats();
        setStats(data);
      } finally {
        setGlobalLoading(false);
      }
    };
    fetchStats();
  }, [setGlobalLoading]);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
            delay: i * 0.05,
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const heroMetrics = [
    { value: stats ? `${stats.readinessSignal}%` : '92%',  label: 'Placement readiness transparency', icon: TrendingUp },
    { value: stats ? stats.mentorGuidance : '1:1',  label: 'AI mentor guidance feel',          icon: Bot },
    { value: stats ? `${stats.students}+` : '1.2k+',   label: 'Verified students enrolled',      icon: Users },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-code-dark selection:bg-code-green selection:text-code-dark overflow-x-hidden relative">
      <div className="absolute inset-0 w-full h-full bg-[#0a0c10] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      <PrepzoNavbar onNavigate={onNavigate} />
      
      <main>
        <PrepzoHero onNavigate={onNavigate} />


        {/* ── Metrics ─────────────────────────────────── */}
        <section className="relative z-40 -mt-16 px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-3">
                {heroMetrics.map((m, i) => (
                    <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                        className="bg-[#161a20] border border-white/5 backdrop-blur-3xl flex flex-col justify-between rounded-[40px] px-6 py-7 md:px-10 md:py-9 hover:border-white/30 transition-all group shadow-2xl relative overflow-hidden"
                    >
                        <m.icon className="h-7 w-7 text-white mb-8 group-hover:scale-110 transition-transform" />
                        <p className="text-5xl font-rubik font-[900] text-white tracking-tighter leading-none mb-4">{m.value}</p>
                        <p className="text-[12px] font-rubik uppercase tracking-[0.2em] text-white/30 font-bold leading-relaxed max-w-[140px]">{m.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* ── Cinematic Platform Tour Visual Simulator & Video Toggle Deck ─── */}
        <section className="relative z-40 max-w-7xl mx-auto mt-40 px-6 animate-fade-in" data-reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[10px] md:text-[11px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-4">
              Cockpit Uplink
            </p>
            <h2 className="text-4xl md:text-7xl font-rubik font-[900] tracking-tighter text-white uppercase leading-[0.9] mb-8">
              See the engine<br />in <span className="text-white/40">real time.</span>
            </h2>
            <p className="text-[15px] md:text-[17px] leading-relaxed text-white/55 font-rubik font-medium tracking-tight mb-10 max-w-2xl mx-auto">
              Explore our interactive simulator to test features, or watch a walkthrough video of your actual cockpit sections.
            </p>

            {/* Toggle Switcher */}
            <div className="inline-flex p-1 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-2xl">
              <button
                onClick={() => setSimViewMode('video')}
                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer ${
                  simViewMode === 'video' 
                    ? 'bg-white text-[#161a20] shadow-xl font-black' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Watch Video Tour
              </button>
              <button
                onClick={() => setSimViewMode('simulator')}
                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer ${
                  simViewMode === 'simulator' 
                    ? 'bg-white text-[#161a20] shadow-xl font-black' 
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Play Simulator
              </button>
            </div>
          </div>

          {simViewMode === 'video' ? (
            /* Custom Video Player Tour View */
            <div className="relative aspect-video rounded-[40px] border border-white/5 bg-black overflow-hidden group shadow-[0_20px_60px_rgba(94,210,156,0.12)] max-w-5xl mx-auto">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent pointer-events-none z-10" />

              <video
                ref={videoRef}
                poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"
                loop
                muted={isMuted}
                playsInline
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01]"
                onClick={handlePlayPause}
              >
                {/* Fallbacks: checks if locally recorded tour is available, otherwise falls back to static CloudFront tour */}
                <source src="/prepzo-tour.mp4" type="video/mp4" />
                <source src="/prepzo-tour.webm" type="video/webm" />
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_180444_a1a13b6a-9f4a-4a2c-8f1a-6a54f67e5005.mp4" type="video/mp4" />
              </video>

              {!isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 z-20 cursor-pointer"
                  onClick={handlePlayPause}
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play size={32} fill="white" className="ml-1" />
                  </motion.div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col gap-4">
                <div 
                  className="h-1.5 w-full bg-white/10 rounded-full cursor-pointer overflow-hidden relative group/timeline"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-code-green rounded-full transition-all duration-100 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button onClick={handlePlayPause} className="text-white hover:text-code-green transition-colors cursor-pointer">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button onClick={handleMuteToggle} className="text-white hover:text-code-green transition-colors flex items-center gap-2 cursor-pointer">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      <span className="text-[10px] font-rubik font-bold uppercase tracking-widest text-white/50 hover:text-code-green">
                        {isMuted ? 'Muted' : 'Unmuted'}
                      </span>
                    </button>
                    <div className="text-[11px] font-mono text-white/40 tracking-wider">
                      {currentTime} <span className="text-white/20">/</span> {duration}
                    </div>
                  </div>
                  <button onClick={handleFullscreen} className="text-white hover:text-code-green transition-colors cursor-pointer">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Simulator Tab View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
              <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                <div className="space-y-3 text-left">
                  {simSteps.map((s, index) => {
                    const isActive = activeSimStep === index;
                    return (
                      <button
                        key={s.step}
                        onClick={() => handleTabClick(index)}
                        className={`w-full text-left p-5 rounded-[28px] border transition-all duration-300 flex items-start gap-4 group cursor-pointer ${
                          isActive
                            ? 'bg-[#161a20] border-code-green/30 shadow-[0_4px_24px_rgba(94,210,156,0.06)]'
                            : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`text-xs font-mono font-bold leading-none py-1 px-2.5 rounded-lg border ${
                          isActive
                            ? 'bg-code-green/10 border-code-green/20 text-code-green'
                            : 'bg-white/5 border-white/5 text-white/30 group-hover:text-white/55 transition-colors'
                        }`}>
                          {s.step}
                        </div>
                        <div>
                          <h4 className={`text-sm font-rubik font-bold uppercase tracking-wide leading-tight mb-1.5 transition-colors ${
                            isActive ? 'text-white font-black' : 'text-white/50 group-hover:text-white/70 font-black'
                          }`}>
                            {s.label}
                          </h4>
                          <p className="text-[11px] leading-normal text-white/35 font-medium">
                            {s.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between px-5 py-3 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-mono text-white/30 uppercase tracking-widest leading-none">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-code-green animate-pulse' : 'bg-white/20'}`} />
                    <span>{isAutoPlaying ? 'Auto-Advancing demo' : 'Manual Exploration'}</span>
                  </div>
                  {isAutoPlaying && (
                    <button onClick={() => setIsAutoPlaying(false)} className="text-white/50 hover:text-code-green cursor-pointer">
                      Pause
                    </button>
                  )}
                  {!isAutoPlaying && (
                    <button onClick={() => setIsAutoPlaying(true)} className="text-white/55 hover:text-code-green cursor-pointer">
                      AutoPlay
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 bg-[#0c0e12] border border-white/5 rounded-[40px] flex flex-col overflow-hidden relative shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:border-white/10 transition-all duration-500 group min-h-[440px] md:min-h-[460px]">
                <div className="h-12 border-b border-white/5 bg-[#0a0c10] px-6 flex items-center justify-between shrink-0">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 group-hover:bg-red-500/80 transition-colors" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/80 transition-colors" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors" />
                  </div>
                  
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase">
                    SIMULATION DECK // STEP_{activeSimStep + 1}
                  </span>
                  
                  <div className="w-16" />
                </div>

                <div className="flex-1 relative z-10 flex flex-col justify-between">
                  {renderSimVisual()}
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />
              </div>
            </div>
          )}
        </section>

        {/* ── Feature Story Sections ───────────────────────── */}
        <section className="mx-auto mt-40 max-w-7xl px-6 space-y-40">
          {storyFeatures.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={feature.id}
                id={feature.id}
                data-reveal
                className={`grid items-center gap-20 lg:grid-cols-2 ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}
              >
                {/* Description panel */}
                <div className="relative text-left">
                  <div className="flex items-center gap-4 text-[13px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-10">
                    <feature.icon size={24} strokeWidth={2.5} />
                    {feature.eyebrow}
                  </div>
                  <h2 className="text-4xl md:text-7xl font-rubik font-[900] leading-[0.9] md:leading-[0.95] tracking-tighter text-white uppercase mb-6 md:mb-10">
                    {feature.title}
                  </h2>
                  <p className="text-[19px] md:text-[21px] leading-relaxed text-white/50 mb-14 max-w-xl font-rubik font-medium tracking-tight">
                    {feature.description}
                  </p>
                  <div className="space-y-6">
                    {feature.highlights.map(h => (
                      <div key={h} className="flex items-center gap-6 text-white text-opacity-80">
                        <CheckCircle size={22} className="text-white shrink-0" />
                        <span className="text-[15px] font-rubik font-[900] uppercase tracking-widest leading-none">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual preview */}
                <div className="bg-[#161a20] border border-white/5 overflow-hidden rounded-[80px] p-8 md:p-12 flex flex-col justify-center relative min-h-[480px] shadow-[0_0_100px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all duration-700">
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white to-transparent group-hover:opacity-10 transition-opacity pointer-events-none" />
                  <div className="relative z-10 w-full scale-105 group-hover:scale-[1.08] transition-transform duration-1000 ease-out">
                    {feature.visual}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Journey ─────────────────────────────────────── */}
        <section className="mx-auto mt-20 md:mt-40 max-w-7xl px-6 md:px-12 py-16 md:py-24 bg-[#161a20] rounded-[40px] md:rounded-[80px] border border-white/5">
            <div className="text-center mb-16 md:mb-24">
                <p className="text-[10px] md:text-[11px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-4 md:mb-6 uppercase">The Prepzo Pipeline</p>
                <h2 className="text-3xl md:text-6xl font-rubik font-[900] tracking-tighter text-white uppercase leading-[0.85]">
                    From Assessment<br/>to <span className="text-white/60">Access.</span>
                </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-5">
                {prepzoJourney.map((j) => (
                    <div key={j.step} className="group flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="text-5xl font-rubik font-[900] text-white/5 mb-6 group-hover:text-white/10 transition-colors">{j.step}</div>
                        <h3 className="text-lg font-rubik font-bold text-white uppercase tracking-tight mb-4">{j.title}</h3>
                        <p className="text-[13px] text-white/30 font-rubik font-bold uppercase leading-relaxed tracking-wide">{j.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ── Platform Edge Bento ──────────────────────────── */}
        <section className="mx-auto mt-40 max-w-7xl px-6" id="roadmap">
          <div className="mb-12 md:mb-28 text-center px-4">
            <p className="text-[10px] md:text-[11px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-6 md:mb-8">VERIFIED EDGE</p>
            <h2 className="text-4xl md:text-9xl font-rubik font-[900] tracking-tighter text-white uppercase leading-[0.85] md:leading-[0.8]">
              Built different.<br />
              <span className="text-white/40">Proven different.</span>
            </h2>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-12 auto-rows-[280px]">
            {platformEdge.map((edge) => (
              <div
                key={edge.title}
                data-reveal
                className={`
                    ${edge.size === 'full' ? 'md:col-span-8' : 'md:col-span-4'}
                    bg-[#161a20] border border-white/5 flex flex-col justify-between rounded-[48px] p-12 hover:bg-[#1c2128] hover:border-white/20 transition-all group shadow-2xl relative overflow-hidden
                `}
              >
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <edge.icon size={220} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                    <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white group-hover:bg-white group-hover:text-[#161a20] transition-all duration-700">
                        <edge.icon size={32} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-rubik font-[900] text-white uppercase tracking-tight mb-5 leading-none">{edge.title}</h3>
                </div>
                <p className="relative z-10 text-[14px] leading-relaxed text-white/30 font-rubik font-bold uppercase tracking-[0.1em] max-w-sm">
                    {edge.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────── */}
        <section className="mx-auto mt-20 md:mt-40 mb-20 md:mb-32 max-w-7xl px-4 md:px-6">
          <div className="bg-white rounded-[60px] md:rounded-[100px] p-12 sm:p-24 md:p-48 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_120px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]" />
            <p className="relative z-10 text-[12px] md:text-[15px] font-rubik font-[900] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[#161a20]/40 mb-8 md:mb-12">SECURE THE SIGNAL</p>
            <h2 className="relative z-10 text-4xl sm:text-6xl md:text-[140px] font-rubik font-[900] tracking-tighter text-[#161a20] uppercase leading-[0.8] mb-12 md:mb-20 max-w-7xl">
                Ready to <span className="text-[#161a20]/40">secure</span><br/> the role?
            </h2>
            
            <div className="relative z-10 flex flex-col sm:flex-row gap-10">
                <button 
                  onClick={() => onNavigate('signup')}
                  className="relative w-[184px] h-[65px] group active:scale-95 transition-transform"
                >
                  <svg className="absolute inset-0 w-full h-full drop-shadow-xl transition-transform group-hover:scale-105" viewBox="0 0 184 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H184L174 65H10L0 0Z" fill="#161a20" />
                  </svg>
                  <span className="relative z-10 flex items-center justify-center h-full text-white font-rubik font-[800] text-[18px] uppercase tracking-wide">
                    Create Account
                  </span>
                </button>

                <button 
                  onClick={() => onNavigate('login')}
                  className="relative w-[184px] h-[65px] group active:scale-95 transition-transform opacity-60 hover:opacity-100"
                >
                  <span className="relative z-10 flex items-center justify-center h-full text-[#161a20] font-rubik font-[800] text-[18px] uppercase tracking-wide">
                    Sign In
                  </span>
                </button>
            </div>

            <p className="relative z-10 mt-16 text-[11px] text-[#161a20] font-rubik font-[900] uppercase tracking-[0.4em] opacity-40">
                Prepzo is the final layer between you and your career.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-48 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
              <div className="space-y-10">
                  <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                          <div className="w-6 h-6 bg-[#161a20] rotate-45" />
                      </div>
                      <span className="text-white font-rubik font-[900] text-[32px] tracking-tight uppercase">Prepzo</span>
                  </div>
                  <p className="text-[14px] text-white/30 font-rubik font-medium max-w-sm leading-relaxed tracking-tight">
                    The ultra-high fidelity signal platform for elite tech placements. AI proctored, verified data, and direct recruiter access.
                  </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 md:gap-32">
                <div className="space-y-6">
                    <p className="text-[11px] text-white/20 font-rubik font-[900] uppercase tracking-[0.4em]">Signal</p>
                    <div className="flex flex-col gap-4">
                        <a href="#mentor" className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors">AI Mentor</a>
                        <a href="#assessment" className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors">Assessment</a>
                        <a href="#resume" className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors">ATS Scan</a>
                    </div>
                </div>
                <div className="space-y-6">
                    <p className="text-[11px] text-white/20 font-rubik font-[900] uppercase tracking-[0.4em]">Connect</p>
                    <div className="flex flex-col gap-4">
                        <a onClick={() => onNavigate('login')} className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors cursor-pointer">Log In</a>
                        <a onClick={() => onNavigate('signup')} className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors cursor-pointer">Register</a>
                        <a href="#roadmap" className="text-sm font-rubik font-bold text-white/50 hover:text-white transition-colors">Roadmap</a>
                    </div>
                </div>
              </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
              <p className="text-[11px] text-white/20 font-rubik font-[900] tracking-[0.3em] uppercase">
                © PREPZO TECHNOLOGY GROUP. ALL RIGHTS RESERVED.
              </p>
              <div className="flex gap-10">
                <div className="text-[10px] text-white/10 font-rubik font-bold uppercase tracking-[0.2em]">Privacy System</div>
                <div className="text-[10px] text-white/10 font-rubik font-bold uppercase tracking-[0.2em]">Security Protocol</div>
              </div>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;
