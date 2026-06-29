import React, { useState } from 'react';
import { ArrowLeft, Mic, Sparkles, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export default function STARCoach() {
  const [listening, setListening] = useState(false);
  const [phase, setPhase] = useState<'Situation' | 'Task' | 'Action' | 'Result'>('Situation');
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [transcript, setTranscript] = useState('');

  const toggleListen = () => {
    if (listening) {
      setListening(false);
      setCompletedPhases(prev => [...prev, phase]);
      // Advance phase
      if (phase === 'Situation') setPhase('Task');
      else if (phase === 'Task') setPhase('Action');
      else if (phase === 'Action') setPhase('Result');
    } else {
      setListening(true);
      setTranscript(`I was leading the frontend deployment team where we faced a significant scaling bottleneck...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00ff9d]/10 rounded-2xl border border-[#00ff9d]/20 text-[#00ff9d]">
              <Mic size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">STAR Method Audio Coach</h1>
              <p className="text-white/40 text-sm">Practice behavioral interview structures with live audio diagnostics</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff9d] bg-[#00ff9d]/10 px-3 py-1 rounded">
                  Current target phase: {phase}
                </span>
                {listening && (
                  <span className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs animate-pulse">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full" /> Recording...
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black mb-4">Prompt: "Tell me about a time you resolved a technical conflict."</h2>
              <div className="bg-black/40 border border-white/5 p-5 rounded-2xl min-h-[150px] font-sans text-white/70 leading-relaxed text-sm">
                {transcript || "Your live speech transcription will display here. Tap the microphone to start."}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={toggleListen}
                className={`p-6 rounded-full transition-all flex items-center justify-center ${listening ? 'bg-red-500 text-white animate-bounce' : 'bg-[#00ff9d] text-[#0a0c10] hover:scale-105 active:scale-95'}`}
              >
                {listening ? <Volume2 size={28} /> : <Mic size={28} />}
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-emerald-400 w-5 h-5" /> STAR Analyzer
            </h3>
            <div className="space-y-4">
              {['Situation', 'Task', 'Action', 'Result'].map((step) => (
                <div key={step} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                  <div className="flex items-center gap-3">
                    {completedPhases.includes(step) ? (
                      <CheckCircle2 className="text-[#00ff9d] w-5 h-5 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />
                    )}
                    <span className={`font-bold text-sm ${completedPhases.includes(step) ? 'text-white' : 'text-white/40'}`}>{step}</span>
                  </div>
                  {phase === step && listening && (
                    <RefreshCw className="animate-spin w-4 h-4 text-[#00ff9d]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
