import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Map, Target, CheckCircle2, Lock, Play, Trash2, ChevronDown, ChevronUp, Plus, Sparkles, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface Task {
  title: string;
  description: string;
  completed: boolean;
  linkedFeature: string;
  linkedUrl: string;
}

interface Milestone {
  weekRange: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  tasks: Task[];
}

interface RoadmapData {
  _id: string;
  targetCompany: string;
  targetRole: string;
  totalWeeks: number;
  currentWeek: number;
  milestones: Milestone[];
}

const MOCK_ROADMAP: RoadmapData = {
  _id: 'mock-1',
  targetCompany: 'Google',
  targetRole: 'Software Engineer',
  totalWeeks: 16,
  currentWeek: 4,
  milestones: [
    {
      weekRange: 'Week 1-3',
      title: 'DSA Foundation',
      description: 'Master core data structures and algorithms patterns.',
      status: 'completed',
      tasks: [
        { title: 'Arrays & Strings Patterns', description: 'Complete 30 window/pointer problems', completed: true, linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'Linked Lists & Monotonic Stacks', description: 'Understand pointer manipulations and stacks', completed: true, linkedFeature: 'Interactive Playground', linkedUrl: '/playground' },
        { title: 'Binary Search Concepts', description: 'Practice boundary and monotonic binary search variations', completed: true, linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      weekRange: 'Week 4-6',
      title: 'Advanced DSA & Graphs',
      description: 'Dynamic programming, trees, and graph algorithms.',
      status: 'in-progress',
      tasks: [
        { title: 'Trees & DFS/BFS traversals', description: 'Binary search tree validation and level order traversals', completed: true, linkedFeature: 'Interactive Playground', linkedUrl: '/playground' },
        { title: 'Graph BFS/DFS Cycle Detection', description: 'Apply graph search algorithms to dependency mapping', completed: false, linkedFeature: 'Code Golf', linkedUrl: '/code-golf' },
        { title: 'Dynamic Programming LCS', description: 'Study LCS, edit distance, and alignment DP variations', completed: false, linkedFeature: 'Code Golf', linkedUrl: '/code-golf' }
      ]
    },
    {
      weekRange: 'Week 7-9',
      title: 'System Design & Distributed Scalability',
      description: 'Caching, horizontal scaling, microservices, databases.',
      status: 'locked',
      tasks: [
        { title: 'Caching & Database Indexes', description: 'Sub-millisecond Redis caches and SQL B-Tree index structures', completed: false, linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' },
        { title: 'Consistent Hashing & Load Balancers', description: 'Scalable data partitioning designs', completed: false, linkedFeature: 'System Whiteboard', linkedUrl: '/whiteboard' }
      ]
    },
    {
      weekRange: 'Week 10-12',
      title: 'Google Company Track & Behavioral Prep',
      description: 'Prepare company specific questions and Googliness fit.',
      status: 'locked',
      tasks: [
        { title: 'Google Interview Track', description: 'Work through Google tracks dashboard', completed: false, linkedFeature: 'Company Tracks', linkedUrl: '/company-tracks' },
        { title: 'STAR Behavioral Stories', description: 'Map 8 standard stories to Google values', completed: false, linkedFeature: 'STAR Story Builder', linkedUrl: '/star-story-builder' }
      ]
    }
  ]
};

export const CareerRoadmap: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  
  // Generator Form state
  const [targetCompany, setTargetCompany] = useState('Google');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [totalWeeks, setTotalWeeks] = useState(12);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [generating, setGenerating] = useState(false);

  // Accordion state
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([0, 1]);

  const fetchActiveRoadmap = async () => {
    try {
      const res = await api.get('/api/roadmap/active');
      if (res.data?.success && res.data.data) {
        setRoadmap(res.data.data);
        // Expand the first in-progress or active milestone
        const inProgressIdx = res.data.data.milestones.findIndex((m: any) => m.status === 'in-progress');
        if (inProgressIdx !== -1) {
          setExpandedMilestones([inProgressIdx]);
        }
      } else {
        setRoadmap(null);
      }
    } catch (err) {
      console.warn("Using fallback mock data for active roadmap:", err);
      setRoadmap(MOCK_ROADMAP);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveRoadmap();
  }, []);

  const handleCreateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await api.post('/api/roadmap/generate', {
        targetCompany,
        targetRole,
        totalWeeks,
        currentLevel
      });

      if (res.data?.success && res.data.data) {
        setRoadmap(res.data.data);
        setExpandedMilestones([0]);
        showSuccess('Your customized roadmap has been generated!');
      }
    } catch (err) {
      showError('Failed to generate roadmap. Loading fallback mock roadmap...');
      setRoadmap(MOCK_ROADMAP);
      setExpandedMilestones([0, 1]);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTask = async (milestoneIdx: number, taskIdx: number, currentCompleted: boolean) => {
    if (!roadmap) return;
    
    // Optimistic UI Update
    const updatedMilestones = [...roadmap.milestones];
    const task = updatedMilestones[milestoneIdx].tasks[taskIdx];
    task.completed = !currentCompleted;

    // Check if entire milestone completed
    const allDone = updatedMilestones[milestoneIdx].tasks.every(t => t.completed);
    if (allDone) {
      updatedMilestones[milestoneIdx].status = 'completed';
      const nextMilestone = updatedMilestones[milestoneIdx + 1];
      if (nextMilestone && nextMilestone.status === 'locked') {
        nextMilestone.status = 'in-progress';
      }
    } else {
      updatedMilestones[milestoneIdx].status = 'in-progress';
    }

    setRoadmap({ ...roadmap, milestones: updatedMilestones });

    try {
      const res = await api.patch(`/api/roadmap/${roadmap._id}/progress`, {
        milestoneIndex: milestoneIdx,
        taskIndex: taskIdx,
        completed: !currentCompleted
      });
      if (res.data?.success && res.data.data) {
        setRoadmap(res.data.data);
      }
    } catch (err) {
      console.warn("Failed syncing task progress to backend in mock mode:", err);
    }
  };

  const handleDeleteRoadmap = async () => {
    if (!roadmap) return;
    if (!window.confirm("Are you sure you want to delete your active roadmap? All completed task history will be reset.")) return;

    try {
      await api.delete(`/api/roadmap/${roadmap._id}`);
      setRoadmap(null);
      showSuccess("Roadmap deleted.");
    } catch (err) {
      // In mock mode, just clear it locally
      setRoadmap(null);
      showSuccess("Roadmap deleted (local mock).");
    }
  };

  const toggleMilestoneAccordion = (idx: number) => {
    if (expandedMilestones.includes(idx)) {
      setExpandedMilestones(expandedMilestones.filter(i => i !== idx));
    } else {
      setExpandedMilestones([...expandedMilestones, idx]);
    }
  };

  const getStatusNodeStyles = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-500 text-black';
      case 'in-progress': return 'border-purple-500 bg-[#0a0c10] text-purple-400 shadow-md shadow-purple-500/20 ring-4 ring-purple-500/15 animate-pulse';
      default: return 'border-white/10 bg-white/5 text-white/35';
    }
  };

  // Stats calculation
  const totalTasks = roadmap?.milestones.reduce((acc, m) => acc + m.tasks.length, 0) || 0;
  const completedTasks = roadmap?.milestones.reduce((acc, m) => acc + m.tasks.filter(t => t.completed).length, 0) || 0;
  const percentCompleted = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-2 text-purple-400">
            <Map className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">PREPZO NAVIGATION</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60">Assembling roadmap data...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!roadmap ? (
              // generator view
              <motion.div
                key="generator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
                <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Generate Your Career Roadmap</h1>
                <p className="text-white/60 mb-8 text-sm">
                  Let AI construct a tailored week-by-week preparation guide focused entirely on landing your target placement role.
                </p>

                <form onSubmit={handleCreateRoadmap} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Target Company</label>
                      <select
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 focus:outline-none transition-colors duration-200"
                      >
                        {['Google', 'Amazon', 'Microsoft', 'Meta', 'Flipkart', 'Razorpay', 'Stripe', 'Atlassian'].map(c => (
                          <option key={c} value={c} className="bg-[#12161a]">{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Target Role</label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        required
                        placeholder="e.g. Frontend Engineer"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 focus:outline-none transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Weeks Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Roadmap Duration</label>
                      <span className="text-purple-400 font-extrabold">{totalWeeks} Weeks</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="24"
                      value={totalWeeks}
                      onChange={(e) => setTotalWeeks(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-white/30 px-1">
                      <span>4 Weeks (Crash course)</span>
                      <span>24 Weeks (Master track)</span>
                    </div>
                  </div>

                  {/* Level Cards Selector */}
                  <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase font-bold tracking-wider">Your Current Level</label>
                    <div className="grid grid-cols-3 gap-4">
                      {([
                        { key: 'beginner', title: 'Beginner', desc: 'New to DSA & systems' },
                        { key: 'intermediate', title: 'Intermediate', desc: 'Familiar, needs polish' },
                        { key: 'advanced', title: 'Advanced', desc: 'Strong, ready for mocks' }
                      ] as const).map(lvl => {
                        const active = currentLevel === lvl.key;
                        return (
                          <button
                            type="button"
                            key={lvl.key}
                            onClick={() => setCurrentLevel(lvl.key)}
                            className={`p-4 rounded-2xl border text-left flex flex-col transition-all duration-200 ${
                              active 
                                ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/5' 
                                : 'border-white/5 bg-white/5 hover:border-white/10'
                            }`}
                          >
                            <span className="font-bold text-sm mb-1">{lvl.title}</span>
                            <span className="text-[10px] text-white/40 leading-snug">{lvl.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={generating}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <span>{generating ? 'Mapping Path...' : 'Generate Roadmap'}</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              // Timeline Roadmap View
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Header Stats Bar */}
                <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black">{roadmap.targetCompany} Preparation Track</h2>
                    <p className="text-white/55 text-sm font-medium">{roadmap.targetRole} • Week {roadmap.currentWeek} of {roadmap.totalWeeks}</p>
                  </div>

                  {/* Progress Ring or Bar */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:w-48">
                      <div className="flex justify-between text-xs text-white/40 mb-1">
                        <span>Overall Roadmap Progress</span>
                        <span>{percentCompleted}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${percentCompleted}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleDeleteRoadmap}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all duration-200 shrink-0"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div className="relative pl-8 sm:pl-10 space-y-6">
                  {/* Vertical connecting line */}
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10 pointer-events-none" />

                  {roadmap.milestones.map((milestone, mIdx) => {
                    const expanded = expandedMilestones.includes(mIdx);
                    const isLocked = milestone.status === 'locked';

                    return (
                      <div key={mIdx} className="relative space-y-3">
                        {/* Timeline Bullet Node */}
                        <div 
                          onClick={() => !isLocked && toggleMilestoneAccordion(mIdx)}
                          className={`absolute -left-8 sm:-left-10 w-4 h-4 rounded-full border-2 transform translate-x-1.5 translate-y-3 cursor-pointer z-10 flex items-center justify-center text-[10px] ${getStatusNodeStyles(milestone.status)}`}
                        >
                          {milestone.status === 'completed' && '✓'}
                        </div>

                        {/* Milestone Accordion Header */}
                        <div 
                          onClick={() => !isLocked && toggleMilestoneAccordion(mIdx)}
                          className={`p-5 rounded-2xl border bg-black/40 backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            expanded 
                              ? 'border-purple-500/30 shadow-md shadow-purple-500/5' 
                              : isLocked
                                ? 'border-white/5 opacity-50 cursor-not-allowed'
                                : 'border-white/5 hover:border-white/10'
                          }`}
                        >
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-purple-400 font-extrabold uppercase tracking-wider">{milestone.weekRange}</span>
                              {milestone.status === 'completed' && (
                                <span className="text-[10px] bg-green-500/15 border border-green-500/25 px-2 py-0.5 rounded-full text-green-400 font-bold uppercase tracking-wider">Done</span>
                              )}
                            </div>
                            <h3 className="font-extrabold text-base">{milestone.title}</h3>
                            <p className="text-white/50 text-xs leading-normal">{milestone.description}</p>
                          </div>

                          <div className="text-white/40 shrink-0">
                            {isLocked ? (
                              <Lock className="w-5 h-5 text-white/30" />
                            ) : expanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {/* Accordion Content Tasks */}
                        <AnimatePresence>
                          {expanded && !isLocked && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 space-y-3"
                            >
                              {milestone.tasks.map((task, tIdx) => (
                                <div 
                                  key={tIdx} 
                                  className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-start gap-4 transition-all duration-200"
                                >
                                  {/* Custom Checkbox */}
                                  <button
                                    onClick={() => handleToggleTask(mIdx, tIdx, task.completed)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-150 ${
                                      task.completed 
                                        ? 'border-green-500 bg-green-500 text-black' 
                                        : 'border-white/20 bg-white/5 hover:border-white/40'
                                    }`}
                                  >
                                    {task.completed && <CheckCircle2 className="w-4 h-4 text-black stroke-[3px]" />}
                                  </button>

                                  <div className="flex-1 space-y-1">
                                    <span className={`font-bold text-sm leading-snug ${task.completed ? 'line-through text-white/40' : ''}`}>
                                      {task.title}
                                    </span>
                                    <p className="text-xs text-white/50 leading-relaxed">{task.description}</p>
                                  </div>

                                  {/* Go To Feature Link */}
                                  <button
                                    onClick={() => navigateTo(task.linkedUrl.replace('/', ''))}
                                    className="px-3.5 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-all duration-200 shrink-0 self-center"
                                  >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>{task.linkedFeature}</span>
                                  </button>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default CareerRoadmap;
