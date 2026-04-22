import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Shield, ArrowLeft, FileText } from 'lucide-react';
import { Boxes } from '../components/ui/background-boxes';
import { InterviewSession } from '../components/interview/InterviewSession';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';

export const InterviewPage: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const { user } = useAuthStore();
  const { resumeAnalysis } = useAppStore();

  const hasResume = !!(resumeAnalysis || user?.resumeText);

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
    <div className="relative min-h-screen w-full bg-[#0a0c10] overflow-hidden selection:bg-[#5ed29c] selection:text-[#0a0c10]">
      <div className="absolute inset-0 z-0">
        <Boxes />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c10]/50 to-[#0a0c10] pointer-events-none" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto space-y-12 font-rubik">
        {/* Navigation */}
        <button 
          onClick={() => window.location.hash = 'dashboard'}
          className="group flex items-center gap-3 text-white/20 hover:text-[#5ed29c] transition-all font-black uppercase tracking-[0.4em] text-[10px]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Exit Environment
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#5ed29c] animate-pulse" />
                <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.5em] italic">Stage 3 Verification</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-[900] text-white uppercase tracking-tighter leading-[0.8] italic">
               AI Mock<br/>
               <span className="text-white/20">Interview.</span>
             </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="px-8 py-6 rounded-[32px] bg-[#161a20] border border-white/5 backdrop-blur-3xl shadow-2xl">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 text-center">Session Clock</p>
                <p className="text-4xl font-[900] text-white tracking-tighter italic">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </p>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {!isStarted ? (
            <div className="grid gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="p-12 md:p-24 text-center rounded-[60px] border border-white/5 bg-[#161a20]/40 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:opacity-10 transition-opacity duration-700 rotate-12">
                   <Bot size={400} className="text-[#5ed29c]" />
                </div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                   <div className="w-24 h-24 bg-[#5ed29c]/10 rounded-[32px] flex items-center justify-center mx-auto mb-12 border border-[#5ed29c]/20 shadow-[0_0_50px_rgba(94,210,156,0.15)] group-hover:scale-110 transition-transform duration-500">
                      <Sparkles size={40} className="text-[#5ed29c]" />
                   </div>
                   
                   <h2 className="text-4xl md:text-6xl font-[900] text-white uppercase tracking-tighter mb-10 italic">Ready to Sync?</h2>
                   
                   <p className="text-xl text-white/40 mb-14 leading-relaxed font-medium tracking-tight italic">
                     Prepzo's AI Recruiter will analyze your parsed resume data to generate a specific 5-question mock session. Ensure you are in a quiet environment.
                   </p>

                   {hasResume ? (
                     <button 
                        onClick={() => setIsStarted(true)}
                        className="group/btn relative w-full h-[80px] active:scale-95 transition-all"
                     >
                        <svg className="absolute inset-0 w-full h-full drop-shadow-2xl transition-transform group-hover/btn:scale-[1.02]" viewBox="0 0 400 80" preserveAspectRatio="none" fill="none">
                           <path d="M0 0H400L385 80H15L0 0Z" fill="#5ed29c" />
                        </svg>
                        <span className="relative z-10 flex items-center justify-center h-full text-[#0a0c10] font-rubik font-[900] text-xl uppercase tracking-[0.2em] italic">
                           Launch AI Environment <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" />
                        </span>
                     </button>
                   ) : (
                     <div className="space-y-8 p-10 rounded-[40px] bg-red-500/5 border border-red-500/20 backdrop-blur-md">
                        <div className="flex items-center justify-center gap-4 text-red-500">
                           <Shield size={24} />
                           <p className="font-[900] uppercase tracking-[0.4em] text-sm italic">Resume Signal Missing</p>
                        </div>
                        <p className="text-white/40 text-lg italic tracking-tight">You need to upload and analyze your resume before the AI can generate personalized interview questions.</p>
                        <button 
                          onClick={() => window.location.hash = 'resume'}
                          className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                        >
                          <FileText size={18} className="inline mr-3" /> Go to Resume Lab
                        </button>
                     </div>
                   )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { title: "Voice Active", desc: "Speak naturally, AI listens", icon: Bot },
                   { title: "Deep Analysis", desc: "Resume-specific probing", icon: Shield },
                   { title: "STAR Evaluation", desc: "Metric-based scoring", icon: Sparkles }
                 ].map((item, i) => (
                   <div key={i} className="p-10 rounded-[48px] bg-[#161a20] border border-white/5 hover:border-[#5ed29c]/20 transition-all group/item shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover/item:bg-[#5ed29c] group-hover/item:text-[#0a0c10] transition-all duration-500">
                        <item.icon size={28} className="transition-transform group-hover/item:scale-110" />
                      </div>
                      <h4 className="text-xl font-[900] text-white uppercase tracking-tight mb-4 italic">{item.title}</h4>
                      <p className="text-white/30 text-[15px] font-bold uppercase tracking-wide leading-relaxed italic">{item.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-700">
               <InterviewSession onComplete={(results) => console.log('Interview Complete:', results)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
