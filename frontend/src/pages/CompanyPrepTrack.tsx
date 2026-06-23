import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Award, Clock, DollarSign, Lightbulb, CheckCircle2, ChevronRight, Layout, Play, Lock } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface Stage {
  name: string;
  duration: string;
  description: string;
}

interface InterviewFormat {
  totalRounds: number;
  rounds: Stage[];
}

interface Task {
  title: string;
  description: string;
  linkedFeature: string;
  linkedUrl: string;
}

interface Phase {
  title: string;
  description: string;
  tasks: Task[];
}

interface TrackDetail {
  _id: string;
  company: string;
  slug: string;
  logo: string;
  tier: string;
  difficulty: string;
  avgSalary: string;
  interviewFormat: InterviewFormat;
  phases: Phase[];
  tips: string[];
}

interface TrackSummary {
  company: string;
  slug: string;
  logo: string;
  tier: string;
  difficulty: string;
  avgSalary: string;
  phasesCount: number;
}

interface CompletedTask {
  phaseIndex: number;
  taskIndex: number;
}

const MOCK_TRACKS: TrackSummary[] = [
  { company: 'Google', slug: 'google', logo: '/logos/google.svg', tier: 'FAANG', difficulty: 'Very Hard', avgSalary: '$180k-$350k', phasesCount: 3 },
  { company: 'Amazon', slug: 'amazon', logo: '/logos/amazon.svg', tier: 'FAANG', difficulty: 'Hard', avgSalary: '$160k-$320k', phasesCount: 3 },
  { company: 'Microsoft', slug: 'microsoft', logo: '/logos/microsoft.svg', tier: 'Big Tech', difficulty: 'Medium', avgSalary: '$150k-$300k', phasesCount: 3 },
  { company: 'Meta', slug: 'meta', logo: '/logos/meta.svg', tier: 'FAANG', difficulty: 'Hard', avgSalary: '$170k-$340k', phasesCount: 3 },
  { company: 'Flipkart', slug: 'flipkart', logo: '/logos/flipkart.svg', tier: 'Indian Giants', difficulty: 'Hard', avgSalary: '₹25L-₹60L', phasesCount: 3 },
  { company: 'Razorpay', slug: 'razorpay', logo: '/logos/razorpay.svg', tier: 'Indian Giants', difficulty: 'Medium', avgSalary: '₹20L-₹45L', phasesCount: 3 },
  { company: 'Stripe', slug: 'stripe', logo: '/logos/stripe.svg', tier: 'Product', difficulty: 'Very Hard', avgSalary: '$190k-$380k', phasesCount: 3 },
  { company: 'Atlassian', slug: 'atlassian', logo: '/logos/atlassian.svg', tier: 'Product', difficulty: 'Medium', avgSalary: '$150k-$290k', phasesCount: 3 }
];

const MOCK_DETAIL: TrackDetail = {
  _id: 'mock-det-1',
  company: 'Google',
  slug: 'google',
  logo: '/logos/google.svg',
  tier: 'FAANG',
  difficulty: 'Very Hard',
  avgSalary: '$180k-$350k',
  interviewFormat: {
    totalRounds: 5,
    rounds: [
      { name: 'Phone Screen', duration: '45 min', description: 'Algorithmic assessment on a shared doc. Expect one medium/hard question.' },
      { name: 'Coding Onsite 1', duration: '45 min', description: 'Advanced graph, tree, or sliding window coding round.' },
      { name: 'Coding Onsite 2', duration: '45 min', description: 'Algorithmic coding. Speed, edge cases, and optimizations are critical.' },
      { name: 'System Design', duration: '45 min', description: 'Design Google Maps, GMail, or YouTube architecture. Focus on horizontal scale.' },
      { name: 'Googliness & Leadership', duration: '30 min', description: 'STAR behavior questions assessing alignment to core values.' }
    ]
  },
  phases: [
    {
      title: 'Phase 1: Foundations & DSA Patterns',
      description: 'Master segment trees, heaps, sliding window, and graph theory patterns.',
      tasks: [
        { title: 'Sliding Window Patterns', description: 'Complete 30 window problems', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'Graph BFS/DFS Cycle detection', description: 'Solve cycle and topological sort tasks', linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      title: 'Phase 2: Scalable Distributed Systems',
      description: 'Caching, horizontal sharding, webhooks, consistent hashing.',
      tasks: [
        { title: 'Redis Cache Architecture', description: 'Design cache eviction write strategies', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Design URL Shortener', description: 'Horizontal sharding designs', linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    }
  ],
  tips: [
    'Google values clean, bug-free code. Talk out loud constantly.',
    'Discuss time and space complexity before writing a single line.',
    'Test edge cases (empty strings, zero elements, integer overflows).'
  ]
};

export const CompanyPrepTrack: React.FC = () => {
  const [tracks, setTracks] = useState<TrackSummary[]>(MOCK_TRACKS);
  const [selectedTrack, setSelectedTrack] = useState<TrackDetail | null>(null);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchTracks = async () => {
    try {
      const res = await api.get('/api/company-track');
      if (res.data?.success && res.data.data?.length > 0) {
        setTracks(res.data.data);
      } else {
        setTracks(MOCK_TRACKS);
      }
    } catch (err) {
      console.warn("Using fallback mock data for company tracks list:", err);
      setTracks(MOCK_TRACKS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleSelectTrack = async (slug: string) => {
    setLoadingDetail(true);
    try {
      const [detailRes, progressRes] = await Promise.all([
        api.get(`/api/company-track/${slug}`),
        api.get(`/api/company-track/${slug}/progress`)
      ]);

      if (detailRes.data?.success && detailRes.data.data) {
        setSelectedTrack(detailRes.data.data);
      } else {
        setSelectedTrack(MOCK_DETAIL);
      }

      if (progressRes.data?.success && progressRes.data.data) {
        setCompletedTasks(progressRes.data.data.completedTasks || []);
      } else {
        setCompletedTasks([]);
      }
    } catch (err) {
      console.warn("Using local detail mock mappings for selection:", err);
      // Map correctly based on selected slug
      const selectedItem = tracks.find(t => t.slug === slug);
      setSelectedTrack({
        ...MOCK_DETAIL,
        company: selectedItem?.company || 'Google',
        slug: selectedItem?.slug || 'google',
        tier: selectedItem?.tier || 'FAANG',
        difficulty: selectedItem?.difficulty || 'Very Hard',
        avgSalary: selectedItem?.avgSalary || '$180k-$350k'
      });
      setCompletedTasks([]);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleToggleTask = async (phaseIndex: number, taskIndex: number) => {
    if (!selectedTrack) return;

    const isCompleted = completedTasks.some(
      ct => ct.phaseIndex === phaseIndex && ct.taskIndex === taskIndex
    );

    // Optimistically update
    let updated: CompletedTask[];
    if (isCompleted) {
      updated = completedTasks.filter(
        ct => !(ct.phaseIndex === phaseIndex && ct.taskIndex === taskIndex)
      );
    } else {
      updated = [...completedTasks, { phaseIndex, taskIndex }];
    }
    setCompletedTasks(updated);

    try {
      await api.patch(`/api/company-track/${selectedTrack.slug}/progress`, {
        phaseIndex,
        taskIndex
      });
    } catch (err) {
      console.warn("Mock progress tracking only. Progression not saved:", err);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Very Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Hard': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-green-400 bg-green-500/10 border-green-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => selectedTrack ? setSelectedTrack(null) : navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{selectedTrack ? 'Back to Tracks' : 'Back to Dashboard'}</span>
          </button>
          
          <div className="flex items-center gap-2 text-purple-400">
            <Briefcase className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Company Prep Journeys</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60">Fetching company profiles...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedTrack ? (
              // Company List Dashboard
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="max-w-xl">
                  <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Interview Prep Tracks</h1>
                  <p className="text-white/60 text-sm">
                    Select a target tier company to practice specific algorithms and structures tailored to their standard loops.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tracks.map((t) => (
                    <div 
                      key={t.slug}
                      onClick={() => handleSelectTrack(t.slug)}
                      className="bg-black/40 backdrop-blur-md border border-white/5 hover:border-purple-500/20 hover:scale-[1.01] rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer relative group"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xl">
                            {t.company.charAt(0)}
                          </div>
                          
                          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(t.difficulty)}`}>
                            {t.difficulty}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-lg leading-snug group-hover:text-purple-400 transition-colors duration-150">
                            {t.company}
                          </h3>
                          <span className="text-xs text-white/40 font-semibold">{t.tier} Tier</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 mt-6 pt-4 flex justify-between items-center text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{t.avgSalary}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-purple-400 transition-colors duration-150" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // Detailed Company Track page
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Phases Timeline & Tasks checklist */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Detailed Hero banner */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-3xl">
                        {selectedTrack.company.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-black">{selectedTrack.company} Prep Track</h2>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-white/40 font-semibold">{selectedTrack.tier}</span>
                          <span className="text-white/20">•</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${getDifficultyColor(selectedTrack.difficulty)}`}>{selectedTrack.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="text-xs text-white/40 uppercase font-bold tracking-wider">Salary Estimate</span>
                      <p className="text-lg font-extrabold text-cyan-400">{selectedTrack.avgSalary}</p>
                    </div>
                  </div>

                  {/* Weeks Phases Checklist */}
                  <div className="space-y-6 pl-2">
                    {selectedTrack.phases.map((phase, pIdx) => (
                      <div key={pIdx} className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-4">
                        <div>
                          <h3 className="font-extrabold text-base text-purple-400">{phase.title}</h3>
                          <p className="text-xs text-white/50 leading-relaxed mt-0.5">{phase.description}</p>
                        </div>

                        <div className="space-y-3">
                          {phase.tasks.map((task, tIdx) => {
                            const isDone = completedTasks.some(
                              ct => ct.phaseIndex === pIdx && ct.taskIndex === tIdx
                            );

                            return (
                              <div 
                                key={tIdx} 
                                className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-4"
                              >
                                <button
                                  onClick={() => handleToggleTask(pIdx, tIdx)}
                                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-150 ${
                                    isDone 
                                      ? 'border-green-500 bg-green-500 text-black' 
                                      : 'border-white/20 bg-white/5 hover:border-white/40'
                                  }`}
                                >
                                  {isDone && <CheckCircle2 className="w-4 h-4 text-black stroke-[3px]" />}
                                </button>

                                <div className="flex-1 space-y-1">
                                  <span className={`font-bold text-sm leading-snug ${isDone ? 'line-through text-white/40' : ''}`}>
                                    {task.title}
                                  </span>
                                  <p className="text-xs text-white/50 leading-relaxed">{task.description}</p>
                                </div>

                                <button
                                  onClick={() => navigateTo(task.linkedUrl.replace('/', ''))}
                                  className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 font-semibold rounded-xl text-xs flex items-center gap-1 transition-all duration-200 shrink-0 self-center"
                                >
                                  <Play className="w-2.5 h-2.5 fill-current" />
                                  <span>{task.linkedFeature}</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Format rounds, Tips */}
                <div className="space-y-6">
                  {/* Interview format rounds */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Layout className="w-4 h-4 text-purple-400" />
                      <span>Standard Loops ({selectedTrack.interviewFormat.totalRounds} Rounds)</span>
                    </h3>

                    <div className="space-y-4">
                      {selectedTrack.interviewFormat.rounds.map((round, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-normal">
                          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white/60 shrink-0">
                            {idx + 1}
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-bold text-white/95">{round.name} ({round.duration})</span>
                            <p className="text-white/50 text-[11px] leading-relaxed">{round.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips from Insiders */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <span>Insider Preparation Tips</span>
                    </h3>

                    <ul className="space-y-3">
                      {selectedTrack.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-white/70 leading-normal">
                          <span className="text-yellow-400 font-extrabold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CompanyPrepTrack;
