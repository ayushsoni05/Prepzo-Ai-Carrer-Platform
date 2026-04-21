import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Search,
  BookOpen,
  Trophy,
  Zap,
  Target,
  Brain,
  Timer,
  ChevronDown
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Boxes } from '@/components/ui/background-boxes';
import questionsData from '../data/interview_questions_bank.json';

interface Question {
  id: string;
  question: string;
  difficulty: string;
  expectedAnswer: string;
  keywords: string[];
}

interface SkillCategory {
  skillName: string;
  questions: Question[];
}

export const InterviewPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(90);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse data
  const data = questionsData.questionsBank;
  const technicalSkills = data.technicalSkills as Record<string, SkillCategory>;
  const nonTechnicalSkills = data.nonTechnicalSkills as Record<string, SkillCategory>;
  const fieldSpecific = data.fieldSpecific as Record<string, SkillCategory>;

  const allSkills = {
    ...technicalSkills,
    ...nonTechnicalSkills,
    ...fieldSpecific
  };

  const skillKeys = Object.keys(allSkills).filter(key => 
    key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    allSkills[key].skillName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSkillData = selectedSkill ? allSkills[selectedSkill] : null;
  const currentQuestion = currentSkillData ? currentSkillData.questions[currentQuestionIndex] : null;

  const startChallenge = useCallback(() => {
    setTimer(90);
    setIsTimerActive(true);
    setShowAnswer(false);
  }, []);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, timer]);

  const handleNext = () => {
    if (currentSkillData && currentQuestionIndex < currentSkillData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      startChallenge();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      startChallenge();
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white overflow-hidden relative selection:bg-code-green selection:text-black">
      <div className="absolute inset-0 w-full h-full z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      {/* Header */}
      <header className="relative z-50 px-8 py-8 flex items-center justify-between border-b border-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-8">
           <button 
             onClick={() => onNavigate('dashboard')}
             className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
           >
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             Exit To Home
           </button>
           <div className="h-4 w-[1px] bg-white/10" />
           <div className="flex items-center gap-4">
              <BookOpen size={18} className="text-code-green" />
              <h2 className="text-sm font-[900] uppercase tracking-[0.4em] italic">Interview Series <span className="text-white/20">.01</span></h2>
           </div>
        </div>
        
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-3 group">
              <Trophy size={16} className="text-white/20 group-hover:text-yellow-500 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Accuracy: 94%</span>
           </div>
           <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-[900] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Pro Mode
           </button>
        </div>
      </header>

      <div className="relative z-10 flex h-[calc(100vh-97px)]">
        {/* Navigation Sidebar */}
        <aside className="w-[320px] border-r border-white/5 bg-[#161a20]/40 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Find Skill Layer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-code-green/50 transition-colors"
              />
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between cursor-pointer group"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">Skill Categories</p>
                <ChevronDown size={14} className={`text-white/20 transition-transform ${isCategoryOpen ? '' : '-rotate-90'}`} />
              </div>

              {isCategoryOpen && (
                <div className="grid gap-2">
                  {skillKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedSkill(key);
                        setCurrentQuestionIndex(0);
                        setIsTimerActive(false);
                      }}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${
                        selectedSkill === key 
                        ? 'bg-code-green/10 border-code-green/30 text-code-green' 
                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-widest">
                          {allSkills[key].skillName}
                        </span>
                        <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 ${selectedSkill === key ? 'opacity-100' : ''}`} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-[#0a0c10]/40">
          <AnimatePresence mode="wait">
            {!selectedSkill ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
              >
                <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mb-10 border border-white/10">
                   <Target size={40} className="text-white/20" />
                </div>
                <h3 className="text-4xl font-[900] text-white uppercase tracking-tighter mb-6 italic">Select your <span className="text-white/30">Target.</span></h3>
                <p className="text-lg text-white/40 font-medium tracking-tight leading-relaxed">
                  Choose a technical or non-technical domain from the sidebar to begin your timed practice session. Each question is precision-calibrated for high-stakes placements.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key={`${selectedSkill}-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-12 pb-24"
              >
                {/* Question Info */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="px-3 py-1 rounded bg-code-green/10 border border-code-green/20 text-code-green text-[9px] font-black uppercase tracking-[0.2em]">
                        {currentQuestion?.difficulty}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        {currentQuestionIndex + 1} of {currentSkillData?.questions.length} Questions
                      </span>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${timer < 15 ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-white/40'}`}>
                        <Timer size={18} />
                        <span className="text-lg font-black tracking-tighter w-12 text-center">{formatTimer(timer)}</span>
                      </div>
                   </div>
                </div>

                {/* Question Card */}
                <GlassCard className="rounded-[40px] p-12 md:p-16 border-white/5 bg-[#161a20]/60 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Brain size={120} />
                   </div>
                   
                   <div className="relative z-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10">Challenge Question</p>
                      <h2 className="text-4xl md:text-5xl font-[900] text-white uppercase tracking-tighter leading-[1.1] mb-12 italic">
                        {currentQuestion?.question}
                      </h2>

                      {!isTimerActive && timer === 90 && (
                        <button 
                          onClick={startChallenge}
                          className="bg-white text-[#161a20] px-10 py-5 rounded-3xl text-sm font-[900] uppercase tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl"
                        >
                          Start Timer <Zap size={18} />
                        </button>
                      )}

                      {isTimerActive && (
                        <p className="text-lg text-white/40 font-medium tracking-tight leading-relaxed max-w-2xl">
                          The timer is active. Formulate your answer clearly, focusing on key technical concepts and structured logic.
                        </p>
                      )}

                      {!isTimerActive && timer < 90 && (
                        <div className="space-y-12">
                           <button 
                             onClick={() => setShowAnswer(!showAnswer)}
                             className={`px-10 py-5 rounded-3xl text-sm font-[900] uppercase tracking-widest transition-all ${
                               showAnswer 
                               ? 'bg-code-green/20 border border-code-green/40 text-code-green' 
                               : 'bg-white/10 border border-white/10 text-white select-none shadow-xl hover:bg-white/20'
                             }`}
                           >
                             {showAnswer ? 'Hide Assessment' : 'Show Verified Answer'}
                           </button>

                           <AnimatePresence>
                             {showAnswer && (
                               <motion.div 
                                 initial={{ opacity: 0, height: 0 }}
                                 animate={{ opacity: 1, height: 'auto' }}
                                 exit={{ opacity: 0, height: 0 }}
                                 className="overflow-hidden"
                               >
                                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 space-y-10">
                                     <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-code-green mb-6">Expert Rationale</p>
                                        <p className="text-xl text-white/80 font-medium tracking-tight leading-relaxed italic">
                                          "{currentQuestion?.expectedAnswer}"
                                        </p>
                                     </div>

                                     <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6">Critical Keywords</p>
                                        <div className="flex flex-wrap gap-3">
                                          {currentQuestion?.keywords.map(kw => (
                                            <span key={kw} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                              {kw}
                                            </span>
                                          ))}
                                        </div>
                                     </div>
                                  </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                        </div>
                      )}
                   </div>
                </GlassCard>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between">
                   <button 
                     onClick={handlePrev}
                     disabled={currentQuestionIndex === 0}
                     className="flex items-center gap-3 text-white/20 hover:text-white disabled:opacity-0 transition-all font-black uppercase tracking-[0.3em] text-[10px]"
                   >
                     <ChevronLeft size={20} /> Previous Phase
                   </button>

                   <div className="flex gap-1.5">
                      {currentSkillData?.questions.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            idx === currentQuestionIndex ? 'w-8 bg-code-green' : 'w-1.5 bg-white/10'
                          }`}
                        />
                      ))}
                   </div>

                   <button 
                     onClick={handleNext}
                     disabled={!currentSkillData || currentQuestionIndex === currentSkillData.questions.length - 1}
                     className="flex items-center gap-3 text-white/20 hover:text-white disabled:opacity-0 transition-all font-black uppercase tracking-[0.3em] text-[10px]"
                   >
                     Next Phase <ChevronRight size={20} />
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default InterviewPage;
