import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Clock, Zap, ArrowRight, Home, Brain, Sparkles, Award, Play, 
  HelpCircle, Users, Check, X, LogOut, DollarSign, ShieldCheck, 
  Server, TrendingUp, Settings, Cpu, Dna, ArrowLeft, RotateCcw
} from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: string;
  explanation?: string;
}

const LADDER_VALUES = [
  { level: 15, money: '$1,000,000', milestone: true },
  { level: 14, money: '$500,000', milestone: false },
  { level: 13, money: '$250,000', milestone: false },
  { level: 12, money: '$125,000', milestone: false },
  { level: 11, money: '$64,000', milestone: false },
  { level: 10, money: '$32,000', milestone: true },
  { level: 9, money: '$16,000', milestone: false },
  { level: 8, money: '$8,000', milestone: false },
  { level: 7, money: '$4,000', milestone: false },
  { level: 6, money: '$2,000', milestone: false },
  { level: 5, money: '$1,000', milestone: true },
  { level: 4, money: '$500', milestone: false },
  { level: 3, money: '$300', milestone: false },
  { level: 2, money: '$200', milestone: false },
  { level: 1, money: '$100', milestone: false }
];

const TRIVIA_DECKS = [
  {
    id: 'cs',
    category: 'Computer Science',
    title: 'Computer Science',
    icon: <Server className="w-8 h-8 text-blue-400" />,
    description: 'OS kernels, relational databases, object-oriented paradigms, and network OSI models.',
    colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 'finance',
    category: 'Business & Finance',
    title: 'Business & Finance',
    icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
    description: 'Portfolio frontiers, asset diversification, option pricing, and central bank systems.',
    colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'me',
    category: 'Mechanical Engineering',
    title: 'Mechanical Engineering',
    icon: <Settings className="w-8 h-8 text-amber-400" />,
    description: 'Stress-strain elastic boundaries, flywheel smoothings, viscosities, and Rankine cycles.',
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
  {
    id: 'ee',
    category: 'Electrical Engineering',
    title: 'Electrical Engineering',
    icon: <Cpu className="w-8 h-8 text-purple-400" />,
    description: 'Kirchhoff node laws, electromagnetic induction, binary sum/carry, and switching snubbers.',
    colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 'biotech',
    category: 'Healthcare & Biotech',
    title: 'Healthcare & Biotech',
    icon: <Dna className="w-8 h-8 text-rose-400" />,
    description: 'Cell structures, double-helix genetic stores, polymerase PCRs, and clinical drug phases.',
    colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  }
];

export const TriviaSprint = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Selection states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [lockState, setLockState] = useState<'idle' | 'selected' | 'locked'>('idle');
  const [isAnswered, setIsAnswered] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  // Lifelines usage
  const [used5050, setUsed5050] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [usedAICopilot, setUsedAICopilot] = useState(false);

  // Lifelines active data
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [audienceData, setAudienceData] = useState<number[] | null>(null);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [aiCopilotCharacter, setAiCopilotCharacter] = useState<{ name: string; avatar: string; text: string } | null>(null);
  const [showCopilotModal, setShowCopilotModal] = useState(false);

  // Final stats
  const [earnedXp, setEarnedXp] = useState(0);
  const [stats, setStats] = useState<any>(null);

  // Sound/haptics effect
  const [screenShake, setScreenShake] = useState(false);

  // Countdown timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger game start for category
  const handleSelectCategory = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
    setCurrentIdx(0);
    setSelectedOption(null);
    setLockState('idle');
    setIsAnswered(false);
    setCashedOut(false);
    setIsGameCompleted(false);
    setSecondsLeft(30);
    setUsed5050(false);
    setUsedAudience(false);
    setUsedAICopilot(false);
    setEliminatedOptions([]);
    setAudienceData(null);
    setAiCopilotCharacter(null);

    try {
      const response = await api.get(`/games/trivia/questions?limit=15&category=${encodeURIComponent(category)}`);
      if (response.data?.data?.length > 0) {
        setQuestions(response.data.data);
      } else {
        toast.error(`No questions available in database for ${category}.`);
        setSelectedCategory(null);
      }
    } catch (err) {
      console.error('Failed to load questions', err);
      toast.error('Error connecting to game servers.');
      setSelectedCategory(null);
    } finally {
      setLoading(false);
    }
  };

  // Main Timer Countdown loop
  useEffect(() => {
    if (!selectedCategory || loading || isGameCompleted || isAnswered || cashedOut) return;

    if (secondsLeft === 0) {
      handleTimeOut();
      return;
    }

    timerRef.current = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsLeft, loading, isGameCompleted, isAnswered, cashedOut, selectedCategory]);

  // Handle timeout (counts as wrong answer)
  const handleTimeOut = () => {
    setIsAnswered(true);
    setLockState('locked');
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
    toast.error('Time expired! Lock-in failure.');
    completeGame(currentIdx, false);
  };

  // Click option
  const handleSelectOption = (optIdx: number) => {
    if (isAnswered || lockState === 'locked') return;
    setSelectedOption(optIdx);
    setLockState('selected');
  };

  // Lock in Answer
  const handleLockIn = () => {
    if (selectedOption === null || lockState !== 'selected') return;
    
    setLockState('locked');
    setIsAnswered(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    const currentQ = questions[currentIdx];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      const isMilestone = [4, 9, 14].includes(currentIdx);
      if (isMilestone) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
        toast.success(`Milestone Cleared! Safe haven secured!`, { icon: '🎉' });
      } else {
        toast.success('Correct answer! Moving up the ladder.');
      }

      if (currentIdx === 14) {
        setTimeout(() => {
          completeGame(15, false);
        }, 1200);
      }
    } else {
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 500);
      toast.error('Incorrect answer! Game Over.');
      setTimeout(() => {
        completeGame(currentIdx, false);
      }, 1200);
    }
  };

  // Walk Away / Cash Out
  const handleCashOut = () => {
    if (isAnswered || currentIdx === 0) return;
    completeGame(currentIdx, true);
  };

  // Submit outcome to backend
  const completeGame = async (score: number, walkedAway: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsGameCompleted(true);
    if (walkedAway) {
      setCashedOut(true);
    }

    try {
      const response = await api.post('/games/trivia/report', {
        score,
        cashedOut: walkedAway
      });
      if (response.data?.success) {
        setEarnedXp(response.data.data.earnedXp);
        setStats(response.data.data.stats);
      }
    } catch (err) {
      console.error('Failed to report millionaire outcome', err);
    }
  };

  // Move to next question
  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setSelectedOption(null);
      setLockState('idle');
      setIsAnswered(false);
      setSecondsLeft(30);
      setEliminatedOptions([]);
      setAudienceData(null);
      setAiCopilotCharacter(null);
    }
  };

  // --- LIFELINES IMPLEMENTATION ---
  
  // 50:50 Lifeline
  const handle5050 = () => {
    if (used5050 || isAnswered || lockState === 'locked') return;
    setUsed5050(true);
    
    const currentQ = questions[currentIdx];
    const correctIdx = currentQ.correctAnswer;
    
    const wrongIndices = [0, 1, 2, 3].filter(idx => idx !== correctIdx);
    wrongIndices.sort(() => Math.random() - 0.5);
    
    setEliminatedOptions([wrongIndices[0], wrongIndices[1]]);
    
    if (selectedOption !== null && wrongIndices.slice(0, 2).includes(selectedOption)) {
      setSelectedOption(null);
      setLockState('idle');
    }
    toast.success('50:50 Lifeline activated. Two wrong options removed.');
  };

  // Ask the Audience Lifeline
  const handleAskAudience = () => {
    if (usedAudience || isAnswered || lockState === 'locked') return;
    setUsedAudience(true);

    const currentQ = questions[currentIdx];
    const correctIdx = currentQ.correctAnswer;
    const diff = currentQ.difficulty;

    let correctPercent = 40;
    if (diff === 'Easy') {
      correctPercent = Math.floor(Math.random() * 16) + 70; // 70-85%
    } else if (diff === 'Medium') {
      correctPercent = Math.floor(Math.random() * 16) + 50; // 50-65%
    } else {
      correctPercent = Math.floor(Math.random() * 14) + 35; // 35-48%
    }

    const remaining = 100 - correctPercent;
    let votes = [0, 0, 0, 0];
    votes[correctIdx] = correctPercent;

    const otherIndices = [0, 1, 2, 3].filter(idx => idx !== correctIdx);
    const p1 = Math.floor(Math.random() * (remaining - 2));
    const p2 = Math.floor(Math.random() * (remaining - p1 - 1));
    const p3 = remaining - p1 - p2;

    votes[otherIndices[0]] = p1;
    votes[otherIndices[1]] = p2;
    votes[otherIndices[2]] = p3;

    if (eliminatedOptions.length > 0) {
      let sumShift = 0;
      eliminatedOptions.forEach(optIdx => {
        sumShift += votes[optIdx];
        votes[optIdx] = 0;
      });
      const activeWrongIdx = [0, 1, 2, 3].find(idx => idx !== correctIdx && !eliminatedOptions.includes(idx));
      if (activeWrongIdx !== undefined) {
        votes[activeWrongIdx] += sumShift;
      }
    }

    setAudienceData(votes);
    setShowAudienceModal(true);
    toast.success('Audience poll gathered.');
  };

  // Consult AI Mentor Lifeline
  const handleAICopilot = () => {
    if (usedAICopilot || isAnswered || lockState === 'locked') return;
    setUsedAICopilot(true);

    const currentQ = questions[currentIdx];
    const correctOptionText = currentQ.options[currentQ.correctAnswer];
    const optionLetters = ['A', 'B', 'C', 'D'];
    const correctLetter = optionLetters[currentQ.correctAnswer];

    // Determine character based on category
    let charName = "Agent Sarah";
    let charAvatar = "🕵️‍♀️";

    if (currentQ.category === 'OS' || currentQ.category === 'Computer Science' || currentQ.category === 'DBMS' || currentQ.category === 'OOPs' || currentQ.category === 'Networks') {
      charName = "Agent Sarah";
      charAvatar = "🕵️‍♀️";
    } else if (currentQ.category === 'Business & Finance') {
      charName = "Marcus Sterling";
      charAvatar = "💼";
    } else if (currentQ.category === 'Mechanical Engineering') {
      charName = "Elena Rostova";
      charAvatar = "🔧";
    } else if (currentQ.category === 'Electrical Engineering') {
      charName = "Commander Vance";
      charAvatar = "🎖️";
    } else {
      charName = "Dr. Clara Vance";
      charAvatar = "🧬";
    }

    const hints = [
      `My logs confirm that Option [${correctLetter}] ("${correctOptionText}") is the correct specification. You can lock that in safely.`,
      `Let me analyze the protocols... yes, Option [${correctLetter}] matches standard conventions. "${correctOptionText}" is the answer.`,
      `I'm 95% confident that the answer is Option [${correctLetter}] ("${correctOptionText}") based on my telemetry calculations.`,
      `Under pressure, the correct choice is clearly Option [${correctLetter}]: "${correctOptionText}".`
    ];

    const hintText = hints[Math.floor(Math.random() * hints.length)];
    setAiCopilotCharacter({ name: charName, avatar: charAvatar, text: hintText });
    setShowCopilotModal(true);
    toast.success(`${charName} is online to help.`);
  };

  // --- RENDERING CATEGORY DECK SELECTOR ---
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-[#02050e] bg-gradient-to-br from-[#02050e] via-[#091126] to-[#01040a] text-white pt-24 px-6 pb-20 font-rubik flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full space-y-12">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigateTo('games')} 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} /> Back to Lobby
            </button>
          </div>

          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent uppercase italic">
              Who Wants To Be A Millionaire
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">
              Test your proficiency in major academic disciplines. Select your field of study, answer 15 progressive technical questions, employ your lifelines wisely, and secure the Grand Prize!
            </p>
          </div>

          {/* Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRIVIA_DECKS.map((deck) => (
              <div 
                key={deck.id}
                className="bg-[#13171d]/60 border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[280px] transition-all relative overflow-hidden group hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]"
              >
                <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all duration-300 pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 border rounded-2xl ${deck.colorClass}`}>
                      {deck.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                      15 Levels
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight mb-2 text-white">{deck.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-medium mb-4">{deck.description}</p>
                </div>

                <div>
                  <button 
                    onClick={() => handleSelectCategory(deck.category)}
                    className="w-full py-3 bg-white text-black hover:bg-amber-400 hover:text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-amber-500/10"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Launch Arena
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02050e] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-widest text-amber-400 animate-pulse">Entering Millionaire Arena...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const optionLetters = ['A', 'B', 'C', 'D'];

  const getSafeHavenMoney = () => {
    if (currentIdx >= 10) return '$32,000';
    if (currentIdx >= 5) return '$1,000';
    return '$0';
  };

  return (
    <div className={`min-h-screen bg-[#02050e] bg-gradient-to-br from-[#02050e] via-[#091126] to-[#01040a] text-white pt-24 px-4 md:px-8 pb-16 font-rubik flex flex-col items-center justify-center transition-all ${screenShake ? 'animate-shake' : ''}`}>
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Game Workspace (Question, Lifelines, Options) */}
        <div className="flex-1 flex flex-col justify-between bg-black/40 border border-white/5 backdrop-blur-md rounded-[40px] p-6 md:p-8 shadow-2xl relative">
          
          {!isGameCompleted ? (
            <div className="space-y-8 flex-1 flex flex-col justify-between">
              
              {/* Workspace Header: Lifelines & Timer */}
              <div className="flex justify-between items-center flex-wrap gap-4">
                
                {/* Back to selector */}
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Quit Field
                </button>

                {/* Lifelines Group */}
                <div className="flex gap-3">
                  <button 
                    disabled={used5050 || isAnswered}
                    onClick={handle5050}
                    className={`px-4 py-2 border rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      used5050 
                        ? 'border-red-500/20 text-red-500/35 bg-red-950/5 cursor-not-allowed line-through' 
                        : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    }`}
                  >
                    <span>50:50</span>
                  </button>
                  
                  <button 
                    disabled={usedAudience || isAnswered}
                    onClick={handleAskAudience}
                    className={`px-4 py-2 border rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      usedAudience 
                        ? 'border-red-500/20 text-red-500/35 bg-red-950/5 cursor-not-allowed line-through' 
                        : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    }`}
                  >
                    <Users size={12} />
                    <span>Audience</span>
                  </button>

                  <button 
                    disabled={usedAICopilot || isAnswered}
                    onClick={handleAICopilot}
                    className={`px-4 py-2 border rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      usedAICopilot 
                        ? 'border-red-500/20 text-red-500/35 bg-red-950/5 cursor-not-allowed line-through' 
                        : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    }`}
                  >
                    <HelpCircle size={12} />
                    <span>AI Mentor</span>
                  </button>
                </div>

                {/* Circular Countdown Timer */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl font-mono text-sm font-black">
                    <Clock size={14} className="text-amber-400" />
                    <span className={secondsLeft <= 8 ? 'text-rose-500 animate-ping font-bold' : 'text-white'}>
                      {secondsLeft}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Question Display */}
              <div className="text-center space-y-4 my-6">
                <div className="flex items-center justify-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    {selectedCategory} Level {currentIdx + 1} ({currentQuestion.difficulty})
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-relaxed max-w-2xl mx-auto text-white">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {currentQuestion.options.map((opt, idx) => {
                  const isEliminated = eliminatedOptions.includes(idx);
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === currentQuestion.correctAnswer;
                  
                  if (isEliminated) {
                    return (
                      <div 
                        key={idx} 
                        className="p-5 rounded-2xl border border-white/5 bg-black/20 opacity-10 cursor-not-allowed select-none min-h-[64px]"
                      />
                    );
                  }

                  let cardStyle = 'border-white/10 bg-white/[0.02] hover:border-amber-500/40 hover:bg-white/[0.05] cursor-pointer';
                  if (isSelected) {
                    cardStyle = 'border-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(212,175,55,0.2)] text-amber-300 scale-[1.01]';
                  }

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
                    } else {
                      cardStyle = 'border-white/5 opacity-30 cursor-not-allowed';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-5 rounded-2xl border text-sm font-bold transition-all relative flex items-center justify-between group overflow-hidden select-none min-h-[64px] ${cardStyle}`}
                    >
                      {/* Audience Vote percentage bar indicator */}
                      {audienceData && (
                        <div 
                          className="absolute inset-y-0 left-0 bg-blue-500/10 transition-all duration-1000 z-0"
                          style={{ width: `${audienceData[idx]}%` }}
                        />
                      )}

                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black border transition-all ${
                          isSelected ? 'border-amber-400 bg-amber-500/20 text-amber-300' : 'border-white/10 bg-white/5 text-white/40'
                        }`}>
                          {optionLetters[idx]}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      <div className="relative z-10 flex items-center gap-2">
                        {audienceData && (
                          <span className="text-[10px] font-black font-mono text-blue-400 bg-blue-950/40 border border-blue-500/20 px-2 py-0.5 rounded-lg">
                            {audienceData[idx]}%
                          </span>
                        )}
                        {isAnswered && isCorrectAnswer && (
                          <Check className="w-5 h-5 text-emerald-400" />
                        )}
                        {isAnswered && isSelected && !isCorrectAnswer && (
                          <X className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Suspense Confirmation Panel */}
              <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Cash Out button */}
                <button
                  disabled={isAnswered || currentIdx === 0}
                  onClick={handleCashOut}
                  className={`px-5 py-3 border font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2 ${
                    isAnswered || currentIdx === 0
                      ? 'border-white/5 text-white/10 cursor-not-allowed'
                      : 'border-amber-500/20 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/20 text-amber-400'
                  }`}
                >
                  <DollarSign size={14} /> Walk Away ({LADDER_VALUES[LADDER_VALUES.length - currentIdx]?.money || '$0'})
                </button>

                {/* Final Answer Prompter */}
                <AnimatePresence mode="wait">
                  {lockState === 'selected' && !isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-3 w-full md:w-auto"
                    >
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider animate-pulse mr-2 italic">Is that your final answer?</span>
                      <button 
                        onClick={() => { setSelectedOption(null); setLockState('idle'); }}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
                      >
                        Change
                      </button>
                      <button 
                        onClick={handleLockIn}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-lg hover:shadow-amber-500/20 text-black font-black uppercase tracking-wider text-xs rounded-xl hover:scale-[1.03] transition-all"
                      >
                        Lock In
                      </button>
                    </motion.div>
                  )}

                  {isAnswered && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full md:w-auto flex justify-end"
                    >
                      {selectedOption === currentQuestion.correctAnswer ? (
                        <button
                          onClick={handleNext}
                          className="px-6 py-3.5 bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2 hover:scale-[1.02]"
                        >
                          <span>Next Level</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-xs font-black uppercase tracking-widest text-rose-500">Eliminated</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          ) : (
            
            /* End Screen */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-8 py-8"
            >
              <div>
                <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Trophy className="w-10 h-10 text-amber-400" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                  {currentIdx === 15 ? (
                    <span className="text-amber-400 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">MILLIONAIRE WINNER</span>
                  ) : cashedOut ? (
                    <span className="text-blue-400">Safe Cash Out</span>
                  ) : (
                    <span className="text-rose-500">Eliminated</span>
                  )}
                </h2>
                <p className="text-xs font-black text-white/40 uppercase tracking-widest mt-2">
                  {selectedCategory} Arena Results
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 bg-black/25 border border-white/5 p-6 rounded-3xl max-w-md w-full">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Final Prize</p>
                  <p className="text-2xl font-black text-amber-400 italic">
                    {currentIdx === 15 ? '$1,000,000' : cashedOut ? LADDER_VALUES[LADDER_VALUES.length - currentIdx]?.money : getSafeHavenMoney()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Safe Havens</p>
                  <p className="text-xs font-black text-white/60 mt-2">
                    {currentIdx >= 10 ? 'Milestone 2 Secured' : currentIdx >= 5 ? 'Milestone 1 Secured' : 'None'}
                  </p>
                </div>
                <div className="col-span-2 border-t border-white/5 pt-4 mt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Questions Solved</p>
                  <p className="text-lg font-bold">{currentIdx} / 15 Levels</p>
                </div>
              </div>

              {/* Reward Claim Banner */}
              {earnedXp > 0 && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl text-emerald-400 flex items-center justify-center gap-3 max-w-md w-full shadow-lg">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">Payout secured: +{earnedXp} XP awarded</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Change Field
                </button>
                <button
                  onClick={() => navigateTo('game-lobby')}
                  className="px-8 py-4 bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" /> Lobby Arena
                </button>
              </div>

            </motion.div>
          )}

        </div>

        {/* Right Side: Progressive Money Ladder Sidebar */}
        <div className="w-full lg:w-72 bg-black/40 border border-white/5 backdrop-blur-md rounded-[40px] p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-3">Money Ladder</h3>
            <div className="space-y-1 font-mono">
              {LADDER_VALUES.map((row) => {
                const isActive = row.level === currentIdx + 1;
                const isCleared = row.level < currentIdx + 1;
                
                let textColor = 'text-white/40';
                if (isActive) {
                  textColor = 'text-amber-400 font-black';
                } else if (isCleared) {
                  textColor = 'text-emerald-400/70 font-semibold';
                } else if (row.milestone) {
                  textColor = 'text-amber-400/50 font-bold';
                }

                let rowBg = '';
                if (isActive) {
                  rowBg = 'bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(212,175,55,0.05)]';
                } else {
                  rowBg = 'border border-transparent';
                }

                return (
                  <div 
                    key={row.level}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all ${rowBg} ${textColor}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-right font-black opacity-40">{row.level}</span>
                      {row.milestone ? (
                        <ShieldCheck size={12} className={isActive ? 'text-amber-400' : isCleared ? 'text-emerald-400' : 'text-amber-400/40'} />
                      ) : (
                        <span className="w-3" />
                      )}
                      <span>{row.money}</span>
                    </div>
                    {isActive && (
                      <span className="text-[8px] font-black uppercase tracking-widest bg-amber-400 text-black px-1.5 py-0.5 rounded">ACTIVE</span>
                    )}
                    {isCleared && (
                      <Check size={12} className="text-emerald-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 pt-4 text-[10px] text-white/30 space-y-1 leading-relaxed">
            <p className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex shrink-0" />
              <span>Milestones ($1k / $32k) act as safety nets.</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-400 flex shrink-0" />
              <span>Cashing out retains maximum XP gains.</span>
            </p>
          </div>
        </div>

      </div>

      {/* AI Mentor Copilot Modal */}
      <AnimatePresence>
        {showCopilotModal && aiCopilotCharacter && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#13171d] border border-amber-500/20 rounded-[32px] max-w-md w-full p-6 space-y-6 shadow-2xl relative"
            >
              {/* Character Header */}
              <div className="flex gap-4 items-start border-b border-white/5 pb-4">
                <span className="text-4xl p-2 bg-white/5 rounded-2xl">{aiCopilotCharacter.avatar}</span>
                <div>
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-widest">{aiCopilotCharacter.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/30">AI Expert Assistant</p>
                </div>
              </div>

              {/* Character Advice Bubble */}
              <div className="bg-black/40 border border-white/5 p-4 rounded-2xl text-xs text-white/80 leading-relaxed italic">
                "{aiCopilotCharacter.text}"
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowCopilotModal(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:shadow-lg text-black font-black uppercase tracking-widest text-xs rounded-xl transition-all"
              >
                Return to Arena
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ask the Audience modal chart view */}
      <AnimatePresence>
        {showAudienceModal && audienceData && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#13171d] border border-white/5 rounded-[32px] max-w-md w-full p-6 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Audience Polling Results</h4>
                  <p className="text-[10px] text-white/40 font-mono">Consensus metrics compiled from peers</p>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <div className="space-y-4 py-2">
                {audienceData.map((pct, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-black">
                      <span className="text-white/60">Option [{optionLetters[idx]}]</span>
                      <span className="text-blue-400 font-mono">{pct}%</span>
                    </div>
                    <div className="w-full h-3 bg-black/35 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowAudienceModal(false)}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all"
              >
                Return to Arena
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
