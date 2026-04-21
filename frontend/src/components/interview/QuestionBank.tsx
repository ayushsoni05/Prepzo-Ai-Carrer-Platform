import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Timer, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  AlertCircle,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { GlassCard, GlassButton } from '../ui/GlassCard';
import questionsData from '../../data/interview_questions_bank.json';

interface Question {
  id: string;
  question: string;
  difficulty: string;
  expectedAnswer: string;
  keywords: string[];
}


export const QuestionBank: React.FC = () => {
  // Flatten questions from the JSON structure
  const allSkills = useMemo(() => {
    const bank = (questionsData as any).questionsBank;
    const skills: Record<string, { name: string; questions: Question[] }> = {};
    
    // Process Technical Skills
    if (bank.technicalSkills) {
      Object.entries(bank.technicalSkills).forEach(([key, data]: [string, any]) => {
        skills[key] = {
          name: data.skillName || data.fieldName || key,
          questions: data.questions || []
        };
      });
    }
    
    // Process Non-Technical Skills if they exist
    if (bank.nonTechnicalSkills) {
      Object.entries(bank.nonTechnicalSkills).forEach(([key, data]: [string, any]) => {
        skills[key] = {
          name: data.skillName || data.fieldName || key,
          questions: data.questions || []
        };
      });
    }
    
    return skills;
  }, []);

  const skillOptions = useMemo(() => Object.keys(allSkills), [allSkills]);

  const [selectedSkill, setSelectedSkill] = useState<string>(skillOptions[0] || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentQuestions = useMemo(() => {
    const questions = allSkills[selectedSkill]?.questions || [];
    if (!searchQuery) return questions;
    return questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [allSkills, selectedSkill, searchQuery]);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  
  const resetQuestion = useCallback(() => {
    setTimeLeft(90);
    setIsTimerRunning(false);
    setShowAnswer(false);
  }, []);

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestion();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetQuestion();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return (
      <GlassCard className="p-12 text-center border-white/5 bg-[#161a20]/40">
        <AlertCircle className="mx-auto mb-6 text-white/20" size={48} />
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">No Questions Found</h3>
        <p className="text-white/40 mb-8">Try selecting a different skill or clearing your search.</p>
        <GlassButton onClick={() => {setSearchQuery(''); setSelectedSkill(skillOptions[0]);}}>
          Reset Filters
        </GlassButton>
      </GlassCard>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentQuestionIndex(0);}}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl whitespace-nowrap">
            <Filter size={14} className="text-white/40" />
            <select 
              value={selectedSkill}
              onChange={(e) => {setSelectedSkill(e.target.value); setCurrentQuestionIndex(0); resetQuestion();}}
              className="bg-transparent text-xs font-bold text-white uppercase tracking-widest focus:outline-none cursor-pointer"
            >
              {skillOptions.map(skill => (
                <option key={skill} value={skill} className="bg-[#161a20] text-white underline-none">
                  {allSkills[skill].name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />
          
          <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
            {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
              <span key={lvl} className={`px-3 py-1 rounded-full border ${currentQuestion.difficulty === lvl ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-white/30'}`}>
                {lvl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <GlassCard className="relative overflow-hidden p-8 md:p-12 border-white/5 bg-[#161a20]/20 backdrop-blur-3xl shadow-2xl">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[120px] rounded-full -ml-32 -mb-32" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
          {/* Progress & Timer Column */}
          <div className="flex flex-col items-center gap-6 w-full md:w-32 shrink-0">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  className="text-white/5"
                />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  strokeDasharray="282.7"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 282.7 - (282.7 * timeLeft) / 90 }}
                  className={`${timeLeft < 20 ? 'text-red-500/50' : timeLeft < 45 ? 'text-yellow-500/50' : 'text-blue-500/50'}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black tracking-tighter ${timeLeft < 20 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Remaining</span>
              </div>
            </div>

            <button 
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black uppercase tracking-widest text-[9px] border ${isTimerRunning ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20' : 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'}`}
            >
              {isTimerRunning ? 'Pause' : 'Start Timer'}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Question</p>
              <p className="text-xl font-black text-white/60 tracking-tighter">
                {currentQuestionIndex + 1}<span className="text-sm opacity-30 mx-1">/</span>{currentQuestions.length}
              </p>
            </div>
          </div>

          {/* Question Content Column */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4 flex items-center gap-2">
                <BookOpen size={12} /> {allSkills[selectedSkill].name} Theory
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-[1.1] tracking-tight selection:bg-blue-500">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentQuestion.keywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  #{kw}
                </span>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
              >
                {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                {showAnswer ? 'Hide Solution' : 'Reveal Expected Answer'}
              </button>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                      <Sparkles size={12} className="text-yellow-500" /> AI Recommended Response
                    </p>
                    <p className="text-[15px] leading-relaxed text-white/80 font-medium tracking-tight">
                      {currentQuestion.expectedAnswer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Floating Actions */}
        <div className="absolute bottom-6 right-8 flex gap-3">
          <GlassButton 
            onClick={prevQuestion} 
            disabled={currentQuestionIndex === 0}
            className="w-12 h-12 !p-0 rounded-2xl flex items-center justify-center disabled:opacity-20"
          >
            <ChevronLeft size={20} />
          </GlassButton>
          <GlassButton 
            onClick={nextQuestion} 
            disabled={currentQuestionIndex === currentQuestions.length - 1}
            className="w-12 h-12 !p-0 rounded-2xl flex items-center justify-center disabled:opacity-20 bg-blue-500/20 border-blue-500/30"
          >
            <ChevronRight size={20} />
          </GlassButton>
        </div>
      </GlassCard>

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
        <div className="flex items-center gap-2">
          <Trophy size={14} /> Total Mastery: {Math.round((currentQuestionIndex / currentQuestions.length) * 100)}%
        </div>
        <div className="w-1 h-1 rounded-full bg-white/10" />
        <div className="flex items-center gap-2">
          <Timer size={14} /> Recommended Pace: 1.5m / q
        </div>
      </div>
    </div>
  );
};
