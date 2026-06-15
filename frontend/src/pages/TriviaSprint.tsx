import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Zap, ArrowRight, Home, Brain, Sparkles, Award, Play } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import toast from 'react-hot-toast';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: string;
  explanation?: string;
}

export const TriviaSprint = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  // Match statistics
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [playerCorrectCount, setPlayerCorrectCount] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  // Simulated AI Opponent State
  const [botState, setBotState] = useState<'thinking' | 'answered' | 'idle'>('thinking');
  const [botCorrect, setBotCorrect] = useState(false);
  const botTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interval for question countdown
  useEffect(() => {
    if (loading || isGameCompleted || isAnswered) return;

    if (secondsLeft === 0) {
      handleTimeOut();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, loading, isGameCompleted, isAnswered]);

  // Fetch questions on start
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/games/trivia/questions?limit=5');
        if (response.data?.data?.length > 0) {
          setQuestions(response.data.data);
          startBotSimulation(0);
        } else {
          toast.error('No questions available.');
          navigateTo('game-lobby');
        }
      } catch (err) {
        console.error('Failed to load questions', err);
        toast.error('Error connecting to game servers.');
        navigateTo('game-lobby');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();

    return () => {
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
    };
  }, []);

  // Simulate bot opponent behavior
  const startBotSimulation = (questionIdx: number) => {
    if (botTimerRef.current) clearTimeout(botTimerRef.current);
    setBotState('thinking');
    setBotCorrect(false);

    // Bot takes between 3 and 10 seconds to answer
    const botThinkingTime = Math.floor(Math.random() * 7000) + 3000;

    botTimerRef.current = setTimeout(() => {
      // Bot has an 80% accuracy
      const isBotCorrect = Math.random() < 0.8;
      setBotCorrect(isBotCorrect);
      setBotState('answered');

      if (isBotCorrect) {
        // Calculate bot score: base 100 + speed bonus
        const botSecondsLeft = Math.max(1, 15 - Math.round(botThinkingTime / 1000));
        const botSpeedBonus = botSecondsLeft * 10;
        setBotScore(prev => prev + 100 + botSpeedBonus);
      }
    }, botThinkingTime);
  };

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedOption(-1); // Mark as incorrect/timed out
    // Move forward slightly delayed
  };

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optIdx);
    setIsAnswered(true);

    const currentQuestion = questions[currentIdx];
    const isCorrect = optIdx === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Calculate score: base 100 + speed bonus (10 pts per second left)
      const speedBonus = secondsLeft * 10;
      const points = 100 + speedBonus;
      setPlayerScore(prev => prev + points);
      setPlayerCorrectCount(prev => prev + 1);
      toast.success(`Correct! +${points} pts`);
    } else {
      toast.error('Incorrect answer!');
    }
  };

  const handleNext = () => {
    const nextIdx = currentIdx + 1;
    if (nextIdx < questions.length) {
      setCurrentIdx(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);
      setSecondsLeft(15);
      startBotSimulation(nextIdx);
    } else {
      completeGame();
    }
  };

  const completeGame = async () => {
    setIsGameCompleted(true);
    if (botTimerRef.current) clearTimeout(botTimerRef.current);
    
    const won = playerScore > botScore;
    
    try {
      const response = await api.post('/games/trivia/report', {
        score: playerCorrectCount,
        won
      });
      setEarnedXp(response.data?.data?.earnedXp || 0);
    } catch (err) {
      console.error('Failed to report trivia outcome', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-[#5ed29c]/20 border-t-[#5ed29c] rounded-full animate-spin mb-4" />
        <p className="text-xs font-black uppercase tracking-widest text-[#5ed29c] animate-pulse">Syncing trivia sandbox...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full">
        {!isGameCompleted ? (
          <div className="space-y-8">
            {/* Live Scoreboards Header */}
            <div className="grid grid-cols-2 gap-6">
              {/* Player Score */}
              <div className="bg-[#13171d] border border-white/5 rounded-3xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden bg-white/5 p-1">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Player" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-[900]">You</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Player</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-[900] text-blue-400 italic">{playerScore} pts</p>
                </div>
              </div>

              {/* Bot Score */}
              <div className="bg-[#13171d] border border-white/5 rounded-3xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden bg-white/5 p-1">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bot" alt="" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-[900]">PrepBot</p>
                      <span className="text-[8px] font-black uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded">AI</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      {botState === 'thinking' ? (
                        <span className="text-yellow-400 animate-pulse">Thinking...</span>
                      ) : (
                        <span className="text-[#5ed29c]">Answered</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-[900] text-purple-400 italic">{botScore} pts</p>
                </div>
              </div>
            </div>

            {/* Main Question Card */}
            <div className="bg-[#13171d] border border-white/5 rounded-[40px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Category Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                  <Brain className="w-4 h-4 text-[#5ed29c]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c]">Category: {currentQuestion.category}</span>
                </div>

                {/* Circular Countdown Timer */}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/40" />
                  <span className={`text-sm font-[900] ${secondsLeft <= 5 ? 'text-red-500 animate-ping' : 'text-white'}`}>
                    {secondsLeft}s
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-xl md:text-2xl font-[900] tracking-tight leading-relaxed mb-8">
                {currentIdx + 1}. {currentQuestion.question}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = idx === currentQuestion.correctAnswer;
                  
                  let buttonStyle = 'border-white/5 hover:border-white/20 bg-black/20';
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonStyle = 'border-green-500/50 bg-green-500/10 text-green-400';
                    } else if (isSelected) {
                      buttonStyle = 'border-red-500/50 bg-red-500/10 text-red-400';
                    } else {
                      buttonStyle = 'border-white/5 opacity-55';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-5 rounded-2xl border text-sm font-bold transition-all relative flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrectAnswer && (
                        <Zap className="w-4 h-4 text-green-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Text */}
              {isAnswered && currentQuestion.explanation && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-5 bg-white/[0.02] border border-white/5 rounded-2xl"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c] mb-1">Concept Explanation</p>
                  <p className="text-xs text-white/60 leading-relaxed font-medium">{currentQuestion.explanation}</p>
                </motion.div>
              )}

              {/* Action Button */}
              {isAnswered && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>{currentIdx === questions.length - 1 ? 'Finish Match' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* End Game Outcome Overlay */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#13171d] border border-white/5 rounded-[40px] p-10 text-center shadow-2xl space-y-8 max-w-lg mx-auto"
          >
            <div>
              <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-4xl font-[900] uppercase tracking-tighter italic">
                {playerScore > botScore ? (
                  <span className="text-[#5ed29c]">Victory!</span>
                ) : playerScore < botScore ? (
                  <span className="text-red-500">Defeat</span>
                ) : (
                  <span className="text-white">Draw</span>
                )}
              </h2>
              <p className="text-sm font-bold text-white/40 uppercase tracking-widest mt-2">CS Trivia Sprint Completed</p>
            </div>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-2 gap-4 bg-black/25 border border-white/5 p-6 rounded-2xl">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Your Score</p>
                <p className="text-2xl font-[900] text-blue-400 italic">{playerScore} pts</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">PrepBot Score</p>
                <p className="text-2xl font-[900] text-purple-400 italic">{botScore} pts</p>
              </div>
              <div className="col-span-2 border-t border-white/5 pt-4 mt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Correct Answers</p>
                <p className="text-lg font-bold">{playerCorrectCount} / 5 Questions</p>
              </div>
            </div>

            {/* XP Award Alert */}
            {earnedXp > 0 && (
              <div className="bg-[#5ed29c]/5 border border-[#5ed29c]/20 p-5 rounded-2xl text-[#5ed29c] flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">Congratulations! Earned +{earnedXp} XP</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigateTo('game-lobby')}
                className="flex-1 py-4 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Lobby Hub
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
