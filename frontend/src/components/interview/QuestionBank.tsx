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

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    let questions = allSkills[selectedSkill]?.questions || [];
    
    if (searchQuery) {
      questions = questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedLevel) {
      questions = questions.filter(q => q.difficulty.toLowerCase() === selectedLevel.toLowerCase());
    }
    
    return questions;
  }, [allSkills, selectedSkill, searchQuery, selectedLevel]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

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
    if (currentQuestionIndex < filteredQuestions.length - 1) {
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

  if (!currentQuestion && filteredQuestions.length === 0) {
    return (
      <div className="p-12 text-center border border-white/5 bg-black rounded-[32px] font-rubik">
        <AlertCircle className="mx-auto mb-6 text-[#5ed29c]/20" size={48} />
        <h3 className="text-xl font-[900] text-white mb-2 uppercase tracking-widest italic">No Questions Found</h3>
        <p className="text-white/30 mb-8 italic">Neural net returned zero results. Try different parameters.</p>
        <button 
          onClick={() => {setSearchQuery(''); setSelectedSkill(skillOptions[0]); setSelectedLevel(null); setCurrentQuestionIndex(0);}}
          className="px-8 py-3 bg-[#5ed29c] text-black font-[900] text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform italic"
        >
          Reset Signal
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 font-rubik">
      {/* Search and Filter Row */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
        <div className="relative w-full xl:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#5ed29c] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="FILTER REPOSITORY..."
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentQuestionIndex(0);}}
            className="w-full bg-[#0a0c10] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-[900] text-white placeholder:text-white/10 focus:outline-none focus:border-[#5ed29c]/30 transition-all uppercase italic tracking-widest"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          {/* Custom Dropdown */}
          <div className="relative w-full sm:w-72">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-[#0a0c10] border border-white/5 rounded-2xl text-[11px] font-[900] text-white uppercase tracking-widest italic group hover:border-[#5ed29c]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Filter size={14} className="text-[#5ed29c]/60" />
                <span>{allSkills[selectedSkill]?.name || 'SELECT DOMAIN'}</span>
              </div>
              <ChevronRight size={14} className={`text-white/20 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-[100] mt-2 w-full bg-black border border-[#5ed29c]/20 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="max-h-[300px] overflow-y-auto py-2">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        onClick={() => {
                          setSelectedSkill(skill);
                          setCurrentQuestionIndex(0);
                          resetQuestion();
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-4 text-left text-[10px] font-[900] uppercase tracking-widest italic transition-colors hover:bg-[#5ed29c]/10 ${selectedSkill === skill ? 'text-[#5ed29c] bg-[#5ed29c]/5' : 'text-white/40'}`}
                      >
                        {allSkills[skill].name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
              <button 
                key={lvl} 
                onClick={() => {
                  setSelectedLevel(selectedLevel === lvl ? null : lvl);
                  setCurrentQuestionIndex(0);
                }}
                className={`px-5 py-3 rounded-xl border text-[9px] font-[900] uppercase tracking-widest italic transition-all ${selectedLevel === lvl ? 'bg-[#5ed29c] border-[#5ed29c] text-black shadow-lg shadow-[#5ed29c]/20' : 'bg-[#0a0c10] border-white/5 text-white/20 hover:border-white/20'}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="relative p-8 md:p-14 bg-black border border-[#5ed29c]/20 rounded-[40px] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5ed29c]/30 to-transparent" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
          {/* Progress & Timer Column */}
          <div className="flex flex-col items-center gap-8 w-full lg:w-40 shrink-0">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-white/5"
                />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="#5ed29c" 
                  strokeWidth="2"
                  strokeDasharray="282.7"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 282.7 - (282.7 * timeLeft) / 90 }}
                  className="drop-shadow-[0_0_8px_rgba(94,210,156,0.5)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-[900] tracking-tighter italic ${timeLeft < 20 ? 'text-red-400 animate-pulse' : 'text-[#5ed29c]'}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic">SEC</span>
              </div>
            </div>

            <button 
              onClick={toggleTimer}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-all font-[900] uppercase tracking-widest text-[9px] italic border ${isTimerRunning ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20' : 'bg-[#5ed29c]/10 border-[#5ed29c]/30 text-[#5ed29c] hover:bg-[#5ed29c]/20'}`}
            >
              {isTimerRunning ? 'STOP' : 'START'}
            </button>
            
            <div className="text-center">
              <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em] mb-1 italic">Pointer</p>
              <p className="text-2xl font-[900] text-white tracking-tighter italic">
                {currentQuestionIndex + 1}<span className="text-sm opacity-20 mx-1">/</span>{filteredQuestions.length}
              </p>
            </div>
          </div>

          {/* Question Content Column */}
          <div className="flex-1 space-y-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#5ed29c]/60 mb-6 flex items-center gap-2 italic">
                <BookOpen size={14} /> {allSkills[selectedSkill].name}
              </p>
              <h2 className="text-2xl md:text-5xl font-[900] text-white leading-[1.1] tracking-tight italic">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentQuestion.keywords.map((kw, i) => (
                <span key={i} className="px-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg text-[9px] font-black text-white/30 uppercase tracking-widest italic">
                  #{kw}
                </span>
              ))}
            </div>

            <div className="pt-10 border-t border-white/5">
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="group flex items-center gap-3 text-white/20 hover:text-[#5ed29c] transition-all font-[900] uppercase tracking-[0.4em] text-[10px] italic"
              >
                {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                {showAnswer ? 'Hide Analysis' : 'Show Analysis'}
              </button>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="mt-8 p-8 md:p-10 rounded-[32px] bg-[#0a0c10] border border-[#5ed29c]/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#5ed29c]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5ed29c] mb-6 flex items-center gap-2 italic">
                      <Sparkles size={14} /> Master Reference
                    </p>
                    <p className="text-[16px] md:text-[18px] leading-relaxed text-white/70 font-medium tracking-tight italic">
                      {currentQuestion.expectedAnswer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Floating Actions */}
        <div className="absolute bottom-8 right-10 flex gap-4">
          <button 
            onClick={prevQuestion} 
            disabled={currentQuestionIndex === 0}
            className="w-14 h-14 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center disabled:opacity-5 hover:bg-white/5 transition-all text-white/40 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextQuestion} 
            disabled={currentQuestionIndex === filteredQuestions.length - 1}
            className="w-14 h-14 bg-[#5ed29c]/10 border border-[#5ed29c]/30 rounded-2xl flex items-center justify-center disabled:opacity-5 hover:bg-[#5ed29c]/20 transition-all text-[#5ed29c]"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

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
