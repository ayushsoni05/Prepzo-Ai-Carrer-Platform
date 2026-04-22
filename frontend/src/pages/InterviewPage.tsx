import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, ArrowRight, Shield, ArrowLeft, FileText } from 'lucide-react';
import { GlassCard, GlassButton } from '../components/ui/GlassCard';
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
    <div className="relative min-h-screen w-full bg-[#0a0c10] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Boxes />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto space-y-10 selection:bg-[#5ed29c] selection:text-black font-rubik">
        {/* Navigation */}
        <button 
          onClick={() => window.location.hash = 'dashboard'}
          className="group flex items-center gap-3 text-white/30 hover:text-[#5ed29c] transition-all font-black uppercase tracking-[0.4em] text-[10px]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Exit Environment
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
             <div className="px-3 py-1 bg-[#5ed29c]/5 border border-[#5ed29c]/10 rounded-full w-fit">
                <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest italic opacity-60">High Fidelity Simulation</span>
             </div>
             <h1 className="text-4xl md:text-7xl font-[900] text-white uppercase tracking-tighter leading-[0.8] italic">
               AI Mock<br/>
               <span className="text-white/20">Interview.</span>
             </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="px-6 py-4 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 text-center">Session Clock</p>
                <p className="text-3xl font-[900] text-white tracking-tighter italic">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </p>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {!isStarted ? (
            <div className="grid gap-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <GlassCard className="p-12 md:p-20 text-center border-[#5ed29c]/20 bg-[#13171d]/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Bot size={180} className="text-[#5ed29c]" />
                </div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                   <div className="w-20 h-20 bg-[#5ed29c]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#5ed29c]/20 shadow-[0_0_40px_rgba(94,210,156,0.1)]">
                      <Sparkles size={32} className="text-[#5ed29c]" />
                   </div>
                   
                   <h2 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter mb-8 italic">Ready to Sync?</h2>
                   
                   <p className="text-lg text-white/40 mb-12 leading-relaxed font-medium tracking-tight italic">
                     Prepzo's AI Recruiter will analyze your parsed resume data to generate a specific 5-question mock session. Ensure you are in a quiet environment.
                   </p>

                   {hasResume ? (
                     <GlassButton 
                        onClick={() => setIsStarted(true)}
                        className="w-full py-6 text-sm font-black uppercase tracking-[0.3em] bg-[#5ed29c] text-black border-none hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#5ed29c]/20"
                     >
                        Launch AI Environment <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                     </GlassButton>
                   ) : (
                     <div className="space-y-6 p-8 rounded-[32px] bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center justify-center gap-3 text-red-400">
                           <Shield size={20} />
                           <p className="font-black uppercase tracking-widest text-xs">Resume Signal Missing</p>
                        </div>
                        <p className="text-white/30 text-sm italic">You need to upload and analyze your resume before the AI can generate personalized interview questions.</p>
                        <GlassButton 
                          onClick={() => window.location.hash = 'resume'}
                          className="w-full py-4 bg-white/5 border-white/10 text-white/60 text-xs font-black uppercase tracking-widest"
                        >
                          <FileText size={16} className="mr-2" /> Go to Resume Lab
                        </GlassButton>
                     </div>
                   )}
                </div>
              </GlassCard>

              <div className="grid md:grid-cols-3 gap-6">
                 {[
                   { title: "Voice Active", desc: "Speak naturally, AI listens", icon: Bot },
                   { title: "Deep Analysis", desc: "Resume-specific probing", icon: Shield },
                   { title: "STAR Evaluation", desc: "Metric-based scoring", icon: Sparkles }
                 ].map((item, i) => (
                   <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <item.icon size={24} className="text-[#5ed29c] mb-6" />
                      <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2 italic">{item.title}</h4>
                      <p className="text-white/30 text-sm font-medium italic">{item.desc}</p>
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
