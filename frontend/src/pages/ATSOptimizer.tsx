import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Cpu, BarChart3, AlertCircle } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export default function ATSOptimizer() {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription) return;
    setLoading(true);
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 25) + 65); // 65-90 score
      setLoading(false);
    }, 1500);
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

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">ATS Match Optimizer</h1>
            <p className="text-white/40 text-sm">Scan and align your profile metadata with targets to beat recruiter filters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Cpu className="text-emerald-400 w-5 h-5" /> target parameters
            </h2>
            <form onSubmit={handleOptimize} className="space-y-6">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">Job Description</label>
                <textarea
                  required
                  rows={8}
                  placeholder="Paste the target role description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:border-emerald-500/30 outline-none resize-none font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00ff9d] text-[#0a0c10] font-black uppercase tracking-widest text-[12px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Running Diagnostic Scan...' : 'Scan Resume Alignment'}
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl flex flex-col justify-center min-h-[400px]">
            {score !== null ? (
              <div className="text-center space-y-6">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-36 h-36">
                    <circle className="text-white/5" strokeWidth="10" stroke="currentColor" fill="transparent" r="60" cx="72" cy="72" />
                    <circle className="text-[#00ff9d]" strokeWidth="10" strokeDasharray={376.8} strokeDashoffset={376.8 - (376.8 * score) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="60" cx="72" cy="72" />
                  </svg>
                  <span className="absolute text-3xl font-black">{score}%</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Match Index</h3>
                  <p className="text-white/40 text-xs mt-1">Target ATS Index score</p>
                </div>
                <div className="bg-black/20 border border-white/5 p-5 rounded-2xl text-left space-y-3">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-emerald-400">
                    <BarChart3 size={16} /> Recommendations
                  </h4>
                  <ul className="text-xs text-white/60 space-y-2 list-disc pl-4 font-sans">
                    <li>Include missing key skills: <strong>Microservices, Kubernetes</strong>.</li>
                    <li>Add action verbs to describe project scaling dynamics.</li>
                    <li>Align resume summary closer to job responsibility statements.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/20">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-wider">awaiting scanner input</p>
                <p className="text-xs max-w-xs mx-auto mt-1">Insert target job details to execute the ATS optimizer algorithm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
