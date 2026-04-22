import React, { useState, useEffect, useCallback } from 'react';
import { Bot, Mic, MicOff, Send, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GlassCard, GlassButton } from '../ui/GlassCard';
import { useSpeech } from '@/hooks/useSpeech';
import { showError, showSuccess } from '@/utils/toastManager';
import axios from 'axios';

interface InterviewSessionProps {
  onComplete: (results: any) => void;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({ onComplete }) => {
  const { speak, startListening, stopListening, isListening, transcript, isSpeaking } = useSpeech();
  
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Array<{ question: string, answer: string, feedback: any }>>([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const apiBase = '/api/interview';

  const fetchQuestions = useCallback(async () => {
    try {
      setIsSessionLoading(true);
      const res = await axios.post(`${apiBase}/start`);
      if (res.data.success) {
        setQuestions(res.data.data.questions);
        setCurrentQuestion(res.data.data.currentQuestion);
        setCurrentQuestionIndex(0);
        
        // Speak the first question
        setTimeout(() => {
          speak(res.data.data.currentQuestion, () => {
            // Automatically start listening after question is read
            startListening();
          });
        }, 1000);
      }
    } catch (error) {
      showError('Failed to start interview session. Ensure your resume is uploaded.');
      console.error(error);
    } finally {
      setIsSessionLoading(false);
    }
  }, [speak, startListening]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNext = async () => {
    if (!transcript && !isListening) {
      showError('Please provide an answer first.');
      return;
    }

    if (isListening) stopListening();

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${apiBase}/submit`, {
        questions,
        questionIndex: currentQuestionIndex,
        answer: transcript
      });

      if (res.data.success) {
        const feedback = res.data.data.feedback;
        setAnswers([...answers, { question: currentQuestion, answer: transcript, feedback }]);
        
        if (res.data.data.complete) {
          setSessionComplete(true);
          onComplete([...answers, { question: currentQuestion, answer: transcript, feedback }]);
        } else {
          const nextQ = res.data.data.next_question;
          setCurrentQuestion(nextQ);
          setCurrentQuestionIndex(prev => prev + 1);
          
          // Speak next question
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
  };

  if (isSessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <Loader2 className="w-12 h-12 text-[#5ed29c] animate-spin" />
        <p className="text-white/40 font-black uppercase tracking-[0.3em] text-xs">AI is analyzing resume & generating questions...</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#5ed29c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#5ed29c]" />
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Interview Complete</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Session signals synthesized successfully.</p>
        </div>

        <div className="grid gap-6">
          {answers.map((item, i) => (
            <GlassCard key={i} className="p-6 border-white/5 bg-white/5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[10px] font-black text-blue-400">{i + 1}</span>
                </div>
                <div className="space-y-4 flex-1">
                  <p className="text-white font-bold tracking-tight">{item.question}</p>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Your Response</p>
                    <p className="text-white/60 text-sm italic">"{item.answer}"</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-[#5ed29c] uppercase tracking-widest">Strengths</p>
                        <ul className="text-[11px] text-white/40 space-y-1 list-disc list-inside">
                           {item.feedback.strengths.map((s: string, idx: number) => <li key={idx}>{s}</li>)}
                        </ul>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Improvements</p>
                        <ul className="text-[11px] text-white/40 space-y-1 list-disc list-inside">
                           {item.feedback.improvements.map((s: string, idx: number) => <li key={idx}>{s}</li>)}
                        </ul>
                     </div>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-black text-[#5ed29c] tracking-tighter italic">{item.feedback.score}<span className="text-xs opacity-20">/10</span></div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <GlassButton 
          onClick={() => window.location.hash = 'dashboard'}
          className="w-full py-5 bg-[#5ed29c]/20 border-[#5ed29c]/30 text-[#5ed29c] font-black uppercase tracking-widest"
        >
          Return to Cockpit
        </GlassButton>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Question {currentQuestionIndex + 1} of {questions.length}</p>
           <div className="flex gap-1">
             {questions.map((_, i) => (
               <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i <= currentQuestionIndex ? 'bg-[#5ed29c]' : 'bg-white/5'}`} />
             ))}
           </div>
        </div>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-white/10'}`} />
           <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{isSpeaking ? 'AI Speaking' : 'AI Ready'}</span>
        </div>
      </div>

      {/* AI Character Card */}
      <GlassCard className="p-10 border-[#5ed29c]/20 bg-gradient-to-br from-[#13171d] to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Bot size={120} />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="relative">
              <div className={`w-32 h-32 rounded-full border-4 ${isSpeaking ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'border-[#5ed29c]/20'} flex items-center justify-center bg-black transition-all duration-500`}>
                 <Bot size={60} className={isSpeaking ? 'text-blue-500' : 'text-[#5ed29c]'} />
              </div>
              {isSpeaking && (
                <div className="absolute -inset-2 rounded-full border border-blue-500 animate-ping opacity-20" />
              )}
           </div>
           
           <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter italic leading-tight">
                {currentQuestion}
              </h3>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest italic flex items-center justify-center md:justify-start gap-2">
                 <Sparkles size={14} className="text-blue-400" /> Professional AI Recruiter
              </p>
           </div>
        </div>
      </GlassCard>

      {/* Input Section */}
      <div className="space-y-6">
        <div className="relative group">
           <textarea
             value={transcript}
             readOnly
             placeholder={isListening ? "Listening to your response..." : "The AI is waiting for your response..."}
             className={`w-full min-h-[180px] rounded-[32px] p-8 bg-white/5 border ${isListening ? 'border-[#5ed29c] shadow-[0_0_20px_rgba(94,210,156,0.1)]' : 'border-white/10'} text-white/60 font-medium text-lg focus:outline-none transition-all duration-500 italic`}
           />
           <div className="absolute top-6 right-8 flex gap-3">
              {isListening ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full animate-pulse">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                   <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Recording</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                   <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Awaiting Signal</span>
                </div>
              )}
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
           <GlassButton
             onClick={isListening ? stopListening : startListening}
             disabled={isSubmitting || isSpeaking}
             className={`flex-1 h-[65px] rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest ${isListening ? 'bg-red-500/20 border-red-500/30 text-red-500 shadow-lg shadow-red-500/10' : 'bg-blue-500/20 border-blue-500/30 text-blue-400'}`}
           >
             {isListening ? <><MicOff size={20} /> Stop Listening</> : <><Mic size={20} /> Start Microphone</>}
           </GlassButton>
           
           <GlassButton
             onClick={handleNext}
             disabled={isSubmitting || isListening || !transcript || isSpeaking}
             className="flex-[2] h-[65px] rounded-2xl bg-[#5ed29c] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] shadow-xl shadow-[#5ed29c]/10"
           >
             {isSubmitting ? (
               <><Loader2 className="animate-spin" size={20} /> Syncing Response...</>
             ) : (
               <><Send size={20} /> {currentQuestionIndex === questions.length - 1 ? 'Finish Interview' : 'Next Question'}</>
             )}
           </GlassButton>
        </div>
      </div>
      
      {/* Tips */}
      <div className="flex items-center justify-center gap-8 opacity-30 group-hover:opacity-60 transition-opacity">
         <div className="flex items-center gap-2"><AlertCircle size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">Ensure clear audio</span></div>
         <div className="flex items-center gap-2"><CheckCircle size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">Use STAR method</span></div>
         <div className="flex items-center gap-2"><Bot size={14} /> <span className="text-[9px] font-black uppercase tracking-widest">AI will evaluate after each turn</span></div>
      </div>
    </div>
  );
};
