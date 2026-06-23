import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Sparkles, Clock, AlertTriangle, CheckCircle2, MessageSquare, Plus, Trash2, Video, BrainCircuit } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface FillerWord {
  word: string;
  count: number;
  timestamps: number[];
}

interface AnalysisData {
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  confidenceScore: number;
  speechPace: number; // WPM
  fillerWordCount: number;
  fillerWords: FillerWord[];
  answerStructureScore: number;
  eyeContactScore: number;
}

interface KeyMoment {
  timestamp: number;
  type: 'positive' | 'warning' | 'negative';
  description: string;
}

interface ReplayData {
  _id: string;
  title: string;
  duration: number; // in seconds
  recordingUrl: string;
  analysis?: AnalysisData;
  keyMoments?: KeyMoment[];
  createdAt: string;
}

const MOCK_REPLAYS: ReplayData[] = [
  {
    _id: 'mock-rep-1',
    title: 'Google Technical Mock (STAR method practice)',
    duration: 180,
    recordingUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    createdAt: '2026-06-20T10:00:00Z',
    analysis: {
      overallGrade: 'B',
      confidenceScore: 78,
      speechPace: 145,
      fillerWordCount: 9,
      fillerWords: [
        { word: 'like', count: 5, timestamps: [12, 45, 112, 140, 160] },
        { word: 'um', count: 3, timestamps: [24, 78, 155] },
        { word: 'ah', count: 1, timestamps: [95] }
      ],
      answerStructureScore: 82,
      eyeContactScore: 70
    },
    keyMoments: [
      { timestamp: 15, type: 'positive', description: 'Strong, confident posture and introduction.' },
      { timestamp: 45, type: 'warning', description: 'Used filler words ("like") multiple times within 10 seconds.' },
      { timestamp: 88, type: 'positive', description: 'Well-structured explanation of the task using the STAR methodology.' },
      { timestamp: 120, type: 'negative', description: 'Drifted eye contact away from the screen for longer than 10 seconds.' },
      { timestamp: 165, type: 'positive', description: 'Clear summary of project outcomes and lessons learned.' }
    ]
  }
];

export const InterviewReplayTheater: React.FC = () => {
  const [replays, setReplays] = useState<ReplayData[]>(MOCK_REPLAYS);
  const [selectedReplay, setSelectedReplay] = useState<ReplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  // Simulated Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchReplays = async () => {
    try {
      const res = await api.get('/api/replay');
      if (res.data?.success && res.data.data?.length > 0) {
        setReplays(res.data.data);
      } else {
        setReplays(MOCK_REPLAYS);
      }
    } catch (err) {
      console.warn("Using fallback mock data for replays list:", err);
      setReplays(MOCK_REPLAYS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplays();
  }, []);

  const handleSelectReplay = (replay: ReplayData) => {
    setSelectedReplay(replay);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
  };

  const togglePlayback = () => {
    if (!selectedReplay) return;
    if (isPlaying) {
      if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      videoIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= selectedReplay.duration) {
            clearInterval(videoIntervalRef.current!);
            setIsPlaying(false);
            return selectedReplay.duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
  };

  const triggerAnalysis = async (replayId: string) => {
    setAnalyzingId(replayId);
    try {
      const res = await api.post(`/api/replay/${replayId}/analyze`);
      if (res.data?.success && res.data.data) {
        const updated = replays.map(r => r._id === replayId ? res.data.data : r);
        setReplays(updated);
        if (selectedReplay?._id === replayId) {
          setSelectedReplay(res.data.data);
        }
        showSuccess('AI feedback report generated successfully!');
      }
    } catch (err) {
      showError('Failed to trigger AI review. Falling back...');
      // Locally mock the analysis for this item
      const mockResult = {
        ...MOCK_REPLAYS[0],
        _id: replayId,
        title: replays.find(r => r._id === replayId)?.title || 'My Mock Interview'
      };
      const updated = replays.map(r => r._id === replayId ? mockResult : r);
      setReplays(updated);
      if (selectedReplay?._id === replayId) {
        setSelectedReplay(mockResult);
      }
    } finally {
      setAnalyzingId(null);
    }
  };

  const deleteReplay = async (replayId: string) => {
    if (!window.confirm('Delete this recording?')) return;
    try {
      await api.delete(`/api/replay/${replayId}`);
      const filtered = replays.filter(r => r._id !== replayId);
      setReplays(filtered);
      if (selectedReplay?._id === replayId) {
        setSelectedReplay(null);
      }
      showSuccess('Recording removed.');
    } catch (err) {
      const filtered = replays.filter(r => r._id !== replayId);
      setReplays(filtered);
      if (selectedReplay?._id === replayId) {
        setSelectedReplay(null);
      }
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => selectedReplay ? setSelectedReplay(null) : navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{selectedReplay ? 'Back to Replays' : 'Back to Dashboard'}</span>
          </button>
          
          <div className="flex items-center gap-2 text-purple-400">
            <Video className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">AI Replay Theater</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/60">Entering theater lobby...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedReplay ? (
              // Replay List View
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="max-w-xl">
                  <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Mock Interview Recordings</h1>
                  <p className="text-white/60 text-sm">
                    Re-watch your mock interview video recordings with AI assessments overlayed on the exact timestamps.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {replays.map((rep) => {
                    const grade = rep.analysis?.overallGrade;
                    return (
                      <div 
                        key={rep._id}
                        className="bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200"
                      >
                        <div className="space-y-4">
                          <div className="w-full aspect-video bg-white/5 border border-white/5 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={() => handleSelectReplay(rep)}>
                            <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-200" />
                            <Play className="w-10 h-10 text-white/40 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-200" />
                            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white/80 font-bold flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(rep.duration)}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-extrabold text-base leading-snug line-clamp-2 hover:text-purple-400 cursor-pointer" onClick={() => handleSelectReplay(rep)}>
                              {rep.title}
                            </h3>
                            <span className="text-xs text-white/40">{new Date(rep.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Analysis Status Footer */}
                        <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between">
                          {rep.analysis ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                                {grade}
                              </div>
                              <span className="text-xs text-white/60 font-medium">Confidence: {rep.analysis.confidenceScore}%</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => triggerAnalysis(rep._id)}
                              disabled={analyzingId === rep._id}
                              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all duration-200"
                            >
                              <BrainCircuit className="w-3.5 h-3.5" />
                              <span>{analyzingId === rep._id ? 'Analyzing...' : 'Generate AI Review'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteReplay(rep._id)}
                            className="p-2 text-white/30 hover:text-red-400 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // Replay Interactive Theater View
              <motion.div
                key="theater"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Video Player & Key Moments */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Mock Video Container */}
                  <div className="relative aspect-video bg-black rounded-3xl border border-white/5 overflow-hidden group shadow-lg shadow-purple-500/2">
                    {/* Glowing particle mock visualizer */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#121620] to-[#080a0f]">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <Video className="w-16 h-16 text-purple-500/20 animate-pulse" />
                        <span className="text-xs text-white/30 tracking-widest font-mono">SIMULATED INTERVIEW CAMERA REPLAY</span>
                        {isPlaying && (
                          <div className="flex items-center gap-1 text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 animate-pulse">
                            <span>LIVE SPEECH TRACKER ACTIVE</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Slider Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col gap-3 opacity-90 transition-opacity duration-200">
                      
                      {/* Timeline Slider bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/60 shrink-0">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer group/bar">
                          <div 
                            style={{ width: `${(currentTime / selectedReplay.duration) * 100}%` }}
                            className="h-full bg-purple-500 rounded-full relative"
                          />
                          <input
                            type="range"
                            min="0"
                            max={selectedReplay.duration}
                            value={currentTime}
                            onChange={(e) => handleSeek(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <span className="text-xs font-mono text-white/60 shrink-0">{formatTime(selectedReplay.duration)}</span>
                      </div>

                      {/* Controls Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={togglePlayback} className="p-2 text-white hover:text-purple-400 transition-colors duration-200">
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                          </button>
                          <button onClick={() => handleSeek(0)} className="p-2 text-white/60 hover:text-white transition-colors duration-200">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-xs font-bold truncate max-w-xs">{selectedReplay.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Interactive Key Moments */}
                  {selectedReplay.keyMoments && (
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                      <h3 className="text-base font-bold mb-4">Annotated Interview Moments</h3>
                      <div className="space-y-3">
                        {selectedReplay.keyMoments.map((km, i) => {
                          const isActive = currentTime >= km.timestamp && currentTime < km.timestamp + 10;
                          
                          let icon = <CheckCircle2 className="w-4 h-4 text-green-400" />;
                          let bgColor = 'bg-white/5';
                          let borderColor = 'border-white/5';
                          
                          if (km.type === 'warning') {
                            icon = <AlertTriangle className="w-4 h-4 text-yellow-400" />;
                            if (isActive) {
                              bgColor = 'bg-yellow-500/5';
                              borderColor = 'border-yellow-500/30';
                            }
                          } else if (km.type === 'negative') {
                            icon = <AlertTriangle className="w-4 h-4 text-red-400" />;
                            if (isActive) {
                              bgColor = 'bg-red-500/5';
                              borderColor = 'border-red-500/30';
                            }
                          } else if (isActive) {
                            bgColor = 'bg-green-500/5';
                            borderColor = 'border-green-500/30';
                          }

                          return (
                            <div
                              key={i}
                              onClick={() => handleSeek(km.timestamp)}
                              className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${bgColor} ${borderColor} hover:bg-white/10`}
                            >
                              <div className="shrink-0 mt-0.5">{icon}</div>
                              <div className="flex-1 space-y-0.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-purple-400">{formatTime(km.timestamp)}</span>
                                  {isActive && <span className="text-[9px] bg-purple-500/20 text-purple-300 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">ACTIVE MOMENT</span>}
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">{km.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Review Score & Speech Analytics Panel */}
                <div className="space-y-6">
                  {selectedReplay.analysis ? (
                    <>
                      {/* Overall grade panel */}
                      <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 text-center space-y-4">
                        <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider">Overall AI Performance Review</h4>
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto text-3xl font-black">
                          {selectedReplay.analysis.overallGrade}
                        </div>
                        
                        {/* 3 primary traits stats */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                            <span className="text-lg font-bold text-cyan-400">{selectedReplay.analysis.confidenceScore}%</span>
                            <p className="text-[10px] text-white/40">Confidence</p>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                            <span className="text-lg font-bold text-purple-400">{selectedReplay.analysis.answerStructureScore}%</span>
                            <p className="text-[10px] text-white/40">Structure</p>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded-xl p-2.5">
                            <span className="text-lg font-bold text-yellow-400">{selectedReplay.analysis.eyeContactScore}%</span>
                            <p className="text-[10px] text-white/40">Eye Contact</p>
                          </div>
                        </div>
                      </div>

                      {/* Speech Pace and Filler words card */}
                      <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-6">
                        <div>
                          <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider mb-2">Speech Pace Assessment</h4>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-white">{selectedReplay.analysis.speechPace} <span className="text-xs text-white/40 font-normal">WPM</span></span>
                            <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-bold uppercase">Optimal Pace</span>
                          </div>
                          <p className="text-[11px] text-white/50 mt-1 leading-normal">Ideal pacing lies between 130-160 WPM. Your speaking tempo is optimal for conversational interviews.</p>
                        </div>

                        <div className="border-t border-white/5 pt-4">
                          <h4 className="text-xs text-white/40 uppercase font-bold tracking-wider mb-3">Filler Word Count: {selectedReplay.analysis.fillerWordCount}</h4>
                          <div className="space-y-3">
                            {selectedReplay.analysis.fillerWords.map((fw, idx) => (
                              <div key={idx} className="flex flex-col gap-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="text-white/80 font-mono">"{fw.word}"</span>
                                  <span className="text-purple-400">{fw.count} occurrences</span>
                                </div>
                                {/* Timestamps tags list */}
                                <div className="flex flex-wrap gap-1">
                                  {fw.timestamps.map((t, tIdx) => (
                                    <button
                                      key={tIdx}
                                      onClick={() => handleSeek(t)}
                                      className="px-2 py-0.5 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/30 border border-white/10 text-[9px] rounded text-white/60 font-mono transition-all duration-150"
                                    >
                                      {formatTime(t)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 text-center py-10 space-y-4">
                      <Sparkles className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
                      <h4 className="font-bold text-sm">No AI analysis reports yet</h4>
                      <p className="text-xs text-white/40 leading-normal">
                        Request AI assessment to inspect pacings, filler word alerts, structure grading, and metrics charts.
                      </p>
                      <button
                        onClick={() => triggerAnalysis(selectedReplay._id)}
                        disabled={analyzingId === selectedReplay._id}
                        className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200"
                      >
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>{analyzingId === selectedReplay._id ? 'Analyzing...' : 'Generate AI Review'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default InterviewReplayTheater;
