import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, ArrowLeft, Clock, Zap, Shield, CheckCircle2, XCircle, Star, Sparkles, ChevronRight } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface Round {
  type: 'dsa' | 'behavioral' | 'system-design';
  question: string;
  options: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
}

interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  league: string;
  weeklyXp: number;
  totalXp: number;
  freezesAvailable: number;
  totalSprintsCompleted: number;
}

const MOCK_SPRINT = {
  rounds: [
    { type: 'dsa' as const, question: 'What is the worst-case time complexity of lookup in a hash table?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], difficulty: 'medium', xpReward: 25 },
    { type: 'behavioral' as const, question: 'Using the STAR method, which element describes the actual actions and steps you personally took?', options: ['Situation', 'Task', 'Action', 'Result'], difficulty: 'easy', xpReward: 25 },
    { type: 'system-design' as const, question: 'Which component is primarily responsible for distributing incoming application traffic across a group of servers?', options: ['Web Server', 'Database Index', 'Load Balancer', 'Reverse Proxy'], difficulty: 'easy', xpReward: 25 }
  ]
};

const MOCK_STREAK: StreakStats = {
  currentStreak: 7,
  longestStreak: 15,
  league: 'Gold',
  weeklyXp: 425,
  totalXp: 2150,
  freezesAvailable: 1,
  totalSprintsCompleted: 23
};

export const DailySprint: React.FC = () => {
  const [viewState, setViewState] = useState<'loading' | 'ready' | 'sprint' | 'result-feedback' | 'results'>('loading');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [streakStats, setStreakStats] = useState<StreakStats>(MOCK_STREAK);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [xpEarned, setXpEarned] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string; correctAnswer: number } | null>(null);
  const [resultsBreakdown, setResultsBreakdown] = useState<boolean[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const fetchSprintData = async () => {
    try {
      const [sprintRes, streakRes] = await Promise.all([
        api.get('/api/sprint/today'),
        api.get('/api/sprint/streak')
      ]);
      if (sprintRes.data?.success && sprintRes.data.data?.rounds) {
        setRounds(sprintRes.data.data.rounds);
      } else {
        setRounds(MOCK_SPRINT.rounds);
      }
      if (streakRes.data?.success && streakRes.data.data) {
        setStreakStats(streakRes.data.data);
      }
      setViewState('ready');
    } catch (err) {
      console.warn("Using mock data as fallback for DailySprint APIs:", err);
      setRounds(MOCK_SPRINT.rounds);
      setStreakStats(MOCK_STREAK);
      setViewState('ready');
    }
  };

  useEffect(() => {
    fetchSprintData();
  }, []);

  const startSprint = () => {
    setCurrentRoundIdx(0);
    setXpEarned(0);
    setResultsBreakdown([]);
    setViewState('sprint');
    startRound(0);
  };

  const startRound = (index: number) => {
    setSelectedOption(null);
    setFeedback(null);
    setTimeLeft(90);
    startTimeRef.current = Date.now();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeOut = () => {
    submitAnswer(-1); // Submit incorrect code for timeout
  };

  const submitAnswer = async (optionIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(optionIndex);

    const timeTakenMs = Date.now() - startTimeRef.current;

    try {
      setViewState('result-feedback');
      const submitRes = await api.post('/api/sprint/submit', {
        roundIndex: currentRoundIdx,
        answer: optionIndex,
        timeTakenMs
      });

      if (submitRes.data?.success) {
        const { correct, explanation, correctAnswer, xpEarned: roundXp } = submitRes.data.data;
        setFeedback({ correct, explanation, correctAnswer });
        setXpEarned(prev => prev + roundXp);
        setResultsBreakdown(prev => [...prev, correct]);
      } else {
        throw new Error('API submission error');
      }
    } catch (err) {
      console.warn("Falling back to local answer validation for mock mode:", err);
      // Local check using mock logic
      const isCorrect = optionIndex === 2 || (currentRoundIdx === 1 && optionIndex === 2) || (currentRoundIdx === 2 && optionIndex === 2);
      const correctAns = currentRoundIdx === 0 ? 2 : (currentRoundIdx === 1 ? 2 : 2);
      const mockExplanation = "This option represents the accurate industry standard answer for this category.";
      
      setFeedback({ correct: isCorrect, explanation: mockExplanation, correctAnswer: correctAns });
      const points = isCorrect ? 25 : 0;
      setXpEarned(prev => prev + points);
      setResultsBreakdown(prev => [...prev, isCorrect]);
    }

    setTimeout(() => {
      if (currentRoundIdx < 2) {
        const nextIdx = currentRoundIdx + 1;
        setCurrentRoundIdx(nextIdx);
        setViewState('sprint');
        startRound(nextIdx);
      } else {
        // Refresh streak stats before showing results
        api.get('/api/sprint/streak').then(res => {
          if (res.data?.success && res.data.data) {
            setStreakStats(res.data.data);
          }
        }).catch(() => {});
        setViewState('results');
      }
    }, 3200);
  };

  const useStreakFreeze = async () => {
    try {
      const res = await api.post('/api/sprint/freeze');
      if (res.data?.success) {
        setStreakStats(res.data.data);
        showSuccess('Streak Freeze activated successfully!');
      }
    } catch (err) {
      showError('Failed to use streak freeze.');
    }
  };

  // SVG Circular Timer stroke calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 90) * circumference;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dsa': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'behavioral': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'system-design': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'text-white/50 bg-white/5 border-white/10';
    }
  };

  const getLeagueColor = (league: string) => {
    switch (league) {
      case 'Diamond': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Platinum': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'Gold': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'Silver': return 'text-gray-300 border-gray-400/30 bg-gray-400/10';
      default: return 'text-amber-600 border-amber-700/30 bg-amber-700/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-orange-400">
              <Flame className="w-5 h-5 fill-current animate-pulse" />
              <span className="font-bold">{streakStats.currentStreak} Day Streak</span>
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-sm font-semibold capitalize ${getLeagueColor(streakStats.league)}`}>
              {streakStats.league} League
            </div>
          </div>
        </div>

        <AnPresence mode="wait">
          {viewState === 'loading' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white/60">Assembling today's challenge sprint...</p>
            </motion.div>
          )}

          {viewState === 'ready' && (
            <motion.div 
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex flex-col items-center text-center py-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
                  <Flame className="w-12 h-12 text-white fill-current animate-bounce" />
                </div>

                <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Daily Sprint Challenge</h1>
                <p className="text-white/60 max-w-md mb-8">
                  Keep your placement streak alive! Solve 3 timed questions spanning DSA, Behavioral, and System Design concepts.
                </p>

                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-lg mb-8">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mb-1" />
                    <span className="text-xs text-white/40 mb-1">Weekly XP</span>
                    <span className="text-xl font-bold">{streakStats.weeklyXp}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <Star className="w-6 h-6 text-purple-400 mb-1" />
                    <span className="text-xs text-white/40 mb-1">Total XP</span>
                    <span className="text-xl font-bold">{streakStats.totalXp}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan-400 mb-1" />
                    <span className="text-xs text-white/40 mb-1">Longest Streak</span>
                    <span className="text-xl font-bold">{streakStats.longestStreak} days</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                  <button
                    onClick={startSprint}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    <span>Start Sprint</span>
                  </button>

                  {streakStats.freezesAvailable > 0 ? (
                    <button
                      onClick={useStreakFreeze}
                      className="w-full sm:w-auto px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-semibold text-white/80 hover:text-white transition-all duration-200"
                    >
                      Use Streak Freeze ({streakStats.freezesAvailable})
                    </button>
                  ) : (
                    <div className="text-sm text-white/40 py-2">
                      No Streak Freezes available
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {(viewState === 'sprint' || viewState === 'result-feedback') && rounds[currentRoundIdx] && (
            <motion.div 
              key="sprint"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Question & Options Side */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                  {/* Round meta details */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-white/40">ROUND {currentRoundIdx + 1} OF 3</span>
                    <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getTypeColor(rounds[currentRoundIdx].type)}`}>
                      {rounds[currentRoundIdx].type}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold leading-relaxed mb-8">
                    {rounds[currentRoundIdx].question}
                  </h2>

                  {/* Options List */}
                  <div className="space-y-4">
                    {rounds[currentRoundIdx].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrectAnswer = feedback?.correctAnswer === idx;
                      const isWrongChoice = isSelected && !feedback?.correct;

                      let borderClass = "border-white/5 hover:border-white/20 bg-white/5";
                      let glowClass = "";

                      if (viewState === 'result-feedback') {
                        if (isCorrectAnswer) {
                          borderClass = "border-green-500/50 bg-green-500/10 text-green-300";
                          glowClass = "shadow-lg shadow-green-500/10";
                        } else if (isWrongChoice) {
                          borderClass = "border-red-500/50 bg-red-500/10 text-red-300";
                          glowClass = "shadow-lg shadow-red-500/10";
                        } else {
                          borderClass = "border-white/5 opacity-40 bg-transparent";
                        }
                      } else if (isSelected) {
                        borderClass = "border-purple-500 bg-purple-500/10 text-purple-300";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={viewState === 'result-feedback'}
                          onClick={() => submitAnswer(idx)}
                          className={`w-full text-left p-5 rounded-2xl border font-medium flex items-center justify-between transition-all duration-200 ${borderClass} ${glowClass}`}
                        >
                          <span>{option}</span>
                          {viewState === 'result-feedback' && isCorrectAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                          )}
                          {viewState === 'result-feedback' && isWrongChoice && (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation Banner */}
                {viewState === 'result-feedback' && feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border ${feedback.correct ? 'bg-green-500/5 border-green-500/20 text-green-300/90' : 'bg-red-500/5 border-red-500/20 text-red-300/90'}`}
                  >
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-1">
                      {feedback.correct ? 'Correct! +25 XP' : 'Incorrect'}
                    </h4>
                    <p className="text-sm leading-relaxed">{feedback.explanation}</p>
                  </motion.div>
                )}
              </div>

              {/* Timer & Progress Side */}
              <div className="space-y-6">
                <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center py-10">
                  <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className="stroke-white/5 fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        className={`fill-none transition-all duration-1000 ${timeLeft < 15 ? 'stroke-red-500' : 'stroke-purple-500'}`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-2xl font-bold flex items-center gap-1">
                      <Clock className="w-5 h-5 text-white/40" />
                      <span className={timeLeft < 15 ? 'text-red-400 animate-pulse font-extrabold' : ''}>{timeLeft}s</span>
                    </div>
                  </div>
                  <span className="text-sm text-white/40 uppercase tracking-wider">Round Time Remaining</span>
                </div>

                {/* Rounds track checklist */}
                <div className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/60">Sprint Progress</h3>
                  <div className="space-y-3">
                    {[0, 1, 2].map((idx) => {
                      const isActive = currentRoundIdx === idx;
                      const isDone = resultsBreakdown[idx] !== undefined;
                      const isCorrect = resultsBreakdown[idx] === true;

                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm ${
                            isDone 
                              ? isCorrect 
                                ? 'bg-green-500/10 border-green-500/40 text-green-400' 
                                : 'bg-red-500/10 border-red-500/40 text-red-400'
                              : isActive 
                                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                                : 'border-white/5 text-white/20'
                          }`}>
                            {isDone ? (isCorrect ? '✓' : '✗') : idx + 1}
                          </div>
                          <span className={`text-sm ${isActive ? 'text-white font-semibold' : isDone ? 'text-white/60' : 'text-white/25'}`}>
                            {idx === 0 ? 'DSA Algorithms' : idx === 1 ? 'Behavioral Interview' : 'System Architecture'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewState === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-purple-400" />
              </div>

              <h2 className="text-3xl font-extrabold mb-2">Sprint Completed!</h2>
              <p className="text-white/60 mb-8">Here's your performance breakdown from today's challenge.</p>

              {/* Score Display */}
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center">
                  <Sparkles className="w-5 h-5 text-yellow-400 mb-1" />
                  <span className="text-xs text-white/40">Total XP Earned</span>
                  <span className="text-2xl font-bold text-yellow-400">{xpEarned} XP</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center">
                  <Flame className="w-5 h-5 text-orange-400 mb-1" />
                  <span className="text-xs text-white/40">New Streak</span>
                  <span className="text-2xl font-bold text-orange-400">{streakStats.currentStreak} Days</span>
                </div>
              </div>

              {/* Question list checklist */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto mb-8">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/40">Round Outcomes</h3>
                <div className="space-y-3">
                  {rounds.map((round, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        {resultsBreakdown[idx] ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-sm font-medium capitalize">{round.type} Round</span>
                      </div>
                      <span className="text-xs text-white/40">Difficulty: {round.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <button
                  onClick={startSprint}
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-all duration-200"
                >
                  Retry Challenge
                </button>
                <button
                  onClick={() => navigateTo('dashboard')}
                  className="w-full sm:w-auto px-8 py-3 bg-purple-600 rounded-xl font-bold hover:bg-purple-700 transition-all duration-200"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnPresence>
      </div>
    </div>
  );
};

export default DailySprint;
