import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { GlassCard, GlassButton } from '../components/ui/GlassCard';
import { Boxes } from '../components/ui/background-boxes';
import { QuestionBank } from '../components/interview/QuestionBank'; 

export const InterviewPage: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour for full mock session

  useEffect(() => {
    let timer: any;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0c10] overflow-hidden p-6 md:p-12">
      <div className="absolute inset-0 z-0">
        <Boxes />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic flex items-center gap-4">
              AI Mock Interview <Bot className="text-blue-500" size={40} />
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-4 flex items-center gap-2">
              <Shield size={12} /> Proctoring Enabled & AI Character Active
            </p>
          </div>
          
          <GlassCard className="px-6 py-4 flex items-center gap-6 border-white/5 bg-white/5">
            <div className="text-center">
              <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Session Timer</p>
              <p className="text-2xl font-black text-white tracking-tighter">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Feature selection or placeholder */}
        <div className="grid grid-cols-1 gap-12">
          {!isStarted ? (
            <GlassCard className="p-12 text-center max-w-2xl mx-auto border-white/5 bg-[#161a20]/40">
              <Sparkles size={60} className="mx-auto mb-8 text-blue-500 opacity-50" />
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Ready to start?</h2>
              <p className="text-white/50 mb-10 leading-relaxed font-medium">
                The AI recruiter will analyze your resume and ask personalized questions. Ensure your microphone is ready.
              </p>
              <GlassButton 
                onClick={() => setIsStarted(true)}
                className="w-full py-6 text-lg font-black uppercase tracking-widest bg-blue-500/20 border-blue-500/30"
              >
                Launch AI Environment <ArrowRight className="ml-2" />
              </GlassButton>
            </GlassCard>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
               {/* Rendering Question Bank as a substitute until full logic is ready */}
               <QuestionBank />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
