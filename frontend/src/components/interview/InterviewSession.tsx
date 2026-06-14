import { navigateTo } from '@/utils/navigation';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bot, Mic, MicOff, Send, CheckCircle, AlertCircle, Loader2, Clock } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { showError } from '@/utils/toastManager';
import api from '@/api/axios';

interface InterviewSessionProps {
  onComplete: (results: any) => void;
  role?: string;
  preFedQuestions?: string[];
  resumeBased?: boolean;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({ onComplete, role, preFedQuestions, resumeBased }) => {
  const { speak, startListening, stopListening, isListening, transcript, isSpeaking } = useSpeech();
  
  const [questions, setQuestions] = useState<string[]>(preFedQuestions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(preFedQuestions?.[0] || '');
  const [isSessionLoading, setIsSessionLoading] = useState(!preFedQuestions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Array<{ question: string, answer: string, feedback: any }>>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // Max 90s per answer

  const silenceTimerRef = useRef<any>(null);
  const answerTimerRef = useRef<any>(null);
  const timeLeftIntervalRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const speechEndTimerRef = useRef<any>(null);

  const apiBase = '/interview';

  const clearTimers = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (answerTimerRef.current) clearTimeout(answerTimerRef.current);
    if (timeLeftIntervalRef.current) clearInterval(timeLeftIntervalRef.current);
    if (speechEndTimerRef.current) clearTimeout(speechEndTimerRef.current);
    silenceTimerRef.current = null;
    answerTimerRef.current = null;
    timeLeftIntervalRef.current = null;
    speechEndTimerRef.current = null;
  }, []);

  const handleNext = useCallback(async (autoSubmitAnswer?: string) => {
    const finalAnswer = autoSubmitAnswer !== undefined ? autoSubmitAnswer : transcript;

    // Only block if manually clicking and no answer
    if (autoSubmitAnswer === undefined && !finalAnswer && !isListening) {
      showError('Please provide an answer first.');
      return;
    }

    if (isListening) stopListening();
    clearTimers();

    setIsSubmitting(true);
    try {
      const res = await api.post(`${apiBase}/submit`, {
        sessionId,
        questions,
        questionIndex: currentQuestionIndex,
        answer: finalAnswer || "No response provided."
      });

      if (res.data.success) {
        const evaluation = res.data.data;
        const newAnswers = [...answers, { question: currentQuestion, answer: finalAnswer || "No response.", feedback: evaluation }];
        setAnswers(newAnswers);
        
        if (evaluation.is_complete) {
          setSessionComplete(true);
          onComplete(newAnswers);
        } else {
          const nextQ = evaluation.nextQuestion;
          setCurrentQuestion(nextQ);
          setCurrentQuestionIndex(evaluation.question_number !== undefined ? evaluation.question_number - 1 : currentQuestionIndex + 1);
          
          speak(nextQ, () => {
            startListening();
          });
        }
      }
    } catch (error) {
      showError('Failed to submit answer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [transcript, isListening, questions, currentQuestionIndex, currentQuestion, answers, onComplete, speak, startListening, stopListening, clearTimers, sessionId]);

  // 1. Clock and Max Duration (90s) Timer
  useEffect(() => {
    if (isListening && !isSubmitting) {
      setTimeLeft(90);

      // 90s max answer duration
      answerTimerRef.current = setTimeout(() => {
        handleNext(); // Move forward with whatever transcript is present
      }, 90000);

      timeLeftIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (answerTimerRef.current) clearTimeout(answerTimerRef.current);
      if (timeLeftIntervalRef.current) clearInterval(timeLeftIntervalRef.current);
      answerTimerRef.current = null;
      timeLeftIntervalRef.current = null;
    };
  }, [isListening, isSubmitting, handleNext]);

  // 2. Inactivity (no speech at all) and Auto-Submit (after speaking) Timers
  useEffect(() => {
    // Clear any existing silence/auto-submit timers
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (speechEndTimerRef.current) clearTimeout(speechEndTimerRef.current);
    silenceTimerRef.current = null;
    speechEndTimerRef.current = null;

    if (isListening && !isSubmitting) {
      if (!transcript) {
        // Inactivity detection: If user hasn't started speaking within 5 seconds, auto-skip
        silenceTimerRef.current = setTimeout(() => {
          handleNext("");
        }, 5000);
      } else {
        // Auto-submit: If user has spoken and remains silent for 1 second, auto-submit response
        speechEndTimerRef.current = setTimeout(() => {
          handleNext();
        }, 1000);
      }
    }

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (speechEndTimerRef.current) clearTimeout(speechEndTimerRef.current);
    };
  }, [transcript, isListening, isSubmitting, handleNext]);

  // Auto-scroll chat history to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answers, currentQuestion]);

  const fetchQuestions = useCallback(async () => {
    if (preFedQuestions && preFedQuestions.length > 0) {
      setQuestions(preFedQuestions);
      setCurrentQuestion(preFedQuestions[0]);
      setCurrentQuestionIndex(0);
      setIsSessionLoading(false);
      
      setTimeout(() => {
        speak(preFedQuestions[0], () => {
          startListening();
        });
      }, 1000);
      return;
    }

    try {
      setIsSessionLoading(true);
      const res = await api.post(`${apiBase}/start`, resumeBased ? { resumeBased: true } : {});
      if (res.data.success) {
        const qList = res.data.data.questions;
        const firstQ = res.data.data.currentQuestion;
        const sId = res.data.data.sessionId || null;
        setQuestions(qList);
        setCurrentQuestion(firstQ);
        setCurrentQuestionIndex(0);
        setSessionId(sId);
        
        setTimeout(() => {
          speak(firstQ, () => {
            startListening();
          });
        }, 500);
      }
    } catch (error: any) {
      showError(error.response?.data?.message || 'Failed to start session.');
    } finally {
      setIsSessionLoading(false);
    }
  }, [speak, startListening, preFedQuestions, resumeBased]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isSessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <Loader2 className="w-12 h-12 text-[#5ed29c] animate-spin" />
        <p className="text-white/70 font-black uppercase tracking-[0.3em] text-xs">Initializing {role || 'AI'} Mock Environment...</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#5ed29c]/20 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-[#5ed29c]/40 shadow-[0_0_50px_rgba(94,210,156,0.25)]">
            <CheckCircle className="w-12 h-12 text-[#5ed29c]" />
          </div>
          <h2 className="text-5xl font-[900] text-white uppercase tracking-tighter italic mb-4 leading-none">Interview <span className="text-white/40">Complete.</span></h2>
          <p className="text-[#5ed29c] font-black uppercase tracking-[0.4em] text-[10px] italic">Session signals synthesized successfully.</p>
        </div>

        <div className="grid gap-8">
          {answers.map((item, i) => (
            <div key={i} className="p-10 rounded-[48px] border-2 border-white/10 bg-[#13171d] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                 <Bot size={120} />
              </div>
              <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#5ed29c] font-black italic">
                  {i + 1}
                </div>
                <div className="space-y-6 flex-1">
                  <p className="text-xl text-white font-[900] tracking-tight italic leading-tight">{item.question}</p>
                  
                  <div className="p-6 rounded-[32px] bg-black/60 border border-white/10 italic">
                    <p className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest mb-3">Your Response Signal</p>
                    <p className="text-white/80 text-lg leading-relaxed">"{item.answer}"</p>
                  </div>

                  <div className="p-6 rounded-[32px] bg-[#5ed29c]/10 border border-[#5ed29c]/30 italic">
                    <p className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest mb-3">AI Recommendation (Ideal Answer)</p>
                    <p className="text-white/60 text-lg leading-relaxed">{item.feedback.perfectAnswer}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#5ed29c]" />
                       <p className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest">AI Feedback & Insights</p>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-bold italic">
                      {item.feedback.feedback}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                   <div className="text-6xl font-[900] text-[#5ed29c] tracking-tighter italic leading-none">{item.feedback.score}<span className="text-lg opacity-40 ml-1">/10</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigateTo('dashboard')}
          className="group/btn relative w-full h-[70px] active:scale-95 transition-all mt-10"
        >
          <svg className="absolute inset-0 w-full h-full drop-shadow-xl" viewBox="0 0 800 70" preserveAspectRatio="none" fill="none">
             <path d="M0 0H800L785 70H15L0 0Z" fill="#13171d" stroke="rgba(94, 210, 156, 0.6)" strokeWidth="1.5" />
          </svg>
          <span className="relative z-10 flex items-center justify-center h-full text-[#5ed29c] font-rubik font-[900] text-sm uppercase tracking-[0.4em] italic group-hover/btn:tracking-[0.5em] transition-all">
             Return to Cockpit
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Progress & Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
           <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.5em] italic">Signal {currentQuestionIndex + 1} <span className="opacity-70">OF</span> {sessionId ? 9 : questions.length}</p>
           <div className="flex gap-2">
             {Array.from({ length: sessionId ? 9 : questions.length }).map((_, i) => (
               <div key={i} className={`h-1 w-10 rounded-full transition-all duration-700 ${i <= currentQuestionIndex ? 'bg-[#5ed29c]' : 'bg-white/15'}`} />
             ))}
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           {isListening && (
             <div className="flex items-center gap-3 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full">
                <Clock size={14} className="text-red-400" />
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest italic">{timeLeft}s remaining</span>
             </div>
           )}
           <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-white/20'}`} />
              <span className="text-[10px] font-black text-white/55 uppercase tracking-[0.3em] italic">{isSpeaking ? 'AI Output Active' : 'AI Standby'}</span>
           </div>
        </div>
      </div>

      {/* AI Character Card */}
      <div className="p-12 md:p-16 rounded-[60px] border-2 border-[#5ed29c]/40 bg-[#13171d] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.06] rotate-12">
           <Bot size={280} className="text-[#5ed29c]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-12">
           <div className="relative shrink-0 md:sticky md:top-4">
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[28px] md:rounded-[40px] border-4 ${isSpeaking ? 'border-blue-500/45 shadow-[0_0_50px_rgba(59,130,246,0.3)] scale-105' : 'border-[#5ed29c]/30'} flex items-center justify-center bg-black transition-all duration-700 overflow-hidden group`}>
                 {resumeBased ? (
                   <img src="/recruiter_sarah.png" alt="Sarah Vance" className="w-full h-full object-cover" />
                 ) : (
                   <Bot className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-500 ${isSpeaking ? 'text-blue-500' : 'text-[#5ed29c] opacity-60'}`} />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#5ed29c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {isSpeaking && (
                <div className="absolute -inset-4 rounded-[36px] md:rounded-[48px] border border-blue-500/20 animate-ping opacity-10" />
              )}
           </div>
           
           <div className="flex-1 w-full space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-b border-white/10 pb-4">
                 <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full w-fit">
                    <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest italic">
                       {resumeBased ? 'Sarah Vance • Senior Tech Recruiter' : `${role || 'AI'} Core Interface`}
                    </span>
                 </div>
                 
                 {isSpeaking && (
                   <div className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full w-fit">
                     <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mr-2">Speaking</span>
                     <div className="flex gap-0.5 items-end h-3">
                       <style>{`
                         @keyframes wave-bounce {
                           0%, 100% { height: 4px; }
                           50% { height: 12px; }
                         }
                         .voice-bar {
                           width: 2px;
                           background-color: #3b82f6;
                           animation: wave-bounce 0.8s ease-in-out infinite;
                         }
                       `}</style>
                       <div className="voice-bar" style={{ animationDelay: '0.1s' }} />
                       <div className="voice-bar" style={{ animationDelay: '0.3s' }} />
                       <div className="voice-bar" style={{ animationDelay: '0.2s' }} />
                       <div className="voice-bar" style={{ animationDelay: '0.4s' }} />
                     </div>
                   </div>
                 )}
              </div>

              {/* Scrollable Conversation History */}
              <div className="max-h-[320px] overflow-y-auto pr-2 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                 {/* Past Questions and Answers */}
                 {answers.map((item, index) => (
                   <div key={index} className="space-y-3">
                     {/* Recruiter Question */}
                     <div className="flex items-start gap-3 max-w-[85%]">
                       <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                         {resumeBased ? (
                           <img src="/recruiter_sarah.png" alt="Sarah" className="w-full h-full object-cover" />
                         ) : (
                           <Bot size={16} className="text-[#5ed29c]/60" />
                         )}
                       </div>
                       <div className="p-4 rounded-[20px] rounded-tl-none bg-[#1c232d] border border-white/15 text-white">
                         <p className="text-[10px] text-[#5ed29c] font-black uppercase tracking-wider mb-1">Sarah Vance</p>
                         <p className="font-semibold text-sm md:text-base leading-relaxed">{item.question}</p>
                       </div>
                     </div>

                     {/* Candidate Response */}
                     <div className="flex items-start gap-3 max-w-[85%] ml-auto justify-end">
                       <div className="p-4 rounded-[20px] rounded-tr-none bg-[#5ed29c]/20 border border-[#5ed29c]/40 text-white">
                         <p className="text-[10px] text-emerald-400/80 font-black uppercase tracking-wider mb-1 text-right">You (Candidate)</p>
                         <p className="font-semibold text-sm md:text-base leading-relaxed italic">"{item.answer}"</p>
                       </div>
                       <div className="w-8 h-8 rounded-lg bg-[#5ed29c]/25 border border-[#5ed29c]/50 flex items-center justify-center shrink-0 text-[#5ed29c] font-black text-[9px] italic">
                         YOU
                       </div>
                     </div>
                   </div>
                 ))}

                 {/* Current Recruiter Question */}
                 <div className="flex items-start gap-3 max-w-[85%]">
                   <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                     {resumeBased ? (
                       <img src="/recruiter_sarah.png" alt="Sarah" className="w-full h-full object-cover" />
                     ) : (
                       <Bot size={16} className="text-[#5ed29c]" />
                     )}
                   </div>
                   <div className="p-4 rounded-[20px] rounded-tl-none bg-[#1c232d] border-2 border-[#5ed29c]/30 text-white shadow-xl">
                     <p className="text-[10px] text-[#5ed29c] font-black uppercase tracking-wider mb-1">Sarah Vance</p>
                     <p className="font-bold text-sm md:text-base leading-relaxed">{currentQuestion}</p>
                   </div>
                 </div>

                 {/* Ref for scrolling */}
                 <div ref={chatEndRef} />
              </div>
           </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-8">
        <div className="relative group">
           <textarea
             value={transcript}
             readOnly
             placeholder={
               isListening
                 ? (transcript
                     ? "Recording response... (Stop speaking to auto-transmit)"
                     : "Sarah Vance is listening... Speak your answer now. (5s inactivity auto-skip)")
                 : "Awaiting recruiter cue..."
             }
             className={`w-full min-h-[240px] rounded-[48px] p-12 bg-[#13171d] border-2 ${isListening ? 'border-[#5ed29c] shadow-[0_0_40px_rgba(94,210,156,0.25)]' : 'border-white/15'} text-white font-bold text-xl focus:outline-none transition-all duration-700 italic leading-relaxed`}
           />
           <div className="absolute top-8 right-12 flex gap-4">
              {isListening ? (
                <div className="flex items-center gap-3 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full animate-pulse">
                   <div className="w-2 h-2 rounded-full bg-red-500" />
                   <span className="text-[10px] font-black text-red-500 uppercase tracking-widest italic">Live Recording</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                   <span className="text-[10px] font-black text-white/50 uppercase tracking-widest italic">Buffer Empty</span>
                </div>
              )}
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <button
             onClick={isListening ? stopListening : startListening}
             disabled={isSubmitting || isSpeaking}
             className={`w-full h-[80px] rounded-[32px] flex items-center justify-center gap-4 font-[900] uppercase tracking-[0.2em] italic transition-all duration-500 ${isListening ? 'bg-red-500/20 border border-red-500/40 text-red-500 shadow-2xl shadow-red-500/20' : 'bg-[#1c232d] border-2 border-white/15 text-white/80 hover:bg-white/10 hover:text-white'}`}
           >
             {isListening ? <><MicOff size={24} /> Terminate Input</> : <><Mic size={24} /> Initiate Microphone</>}
           </button>
        </div>
        
        {/* Hands-free mode status banner */}
        <p className="text-[11px] text-center font-black uppercase tracking-[0.3em] text-[#5ed29c]/90 animate-pulse pt-2">
          Hands-free Auto-mode Active • Recording & submissions are fully automatic
        </p>
      </div>
      
      {/* Platform Protocol */}
      <div className="flex items-center justify-center gap-12 opacity-40 group-hover:opacity-75 transition-all duration-700 pb-10">
         <div className="flex items-center gap-3"><AlertCircle size={16} /> <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Acoustic Clarity Required</span></div>
         <div className="flex items-center gap-3"><CheckCircle size={16} /> <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">STAR Method Validation</span></div>
         <div className="flex items-center gap-3"><Bot size={16} /> <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">AI Logic Evaluation Active</span></div>
      </div>
    </div>
  );
};
