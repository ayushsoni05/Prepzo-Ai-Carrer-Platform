import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Send, Copy, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export default function CoverLetterGenerator() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !company) return;
    setLoading(true);
    
    // Simulate premium AI generation
    setTimeout(() => {
      const sampleLetter = `Dear Hiring Team at ${company},

I am writing to express my enthusiastic interest in the ${jobTitle} position at your company. With my background in software engineering, frontend mastery, and building high-performance web applications, I am confident that I can deliver immediate value to your technical objectives.

Prepzo has equipped me with real-world project simulations, including machine coding challenges, system design optimizations, and clean code principles. I am eager to apply my expertise to solve the complex engineering problems faced by ${company}.

Thank you for your time and consideration. I look forward to discussing how my skills align with your current requirements.

Sincerely,
[Your Name]`;
      setGeneratedLetter(sampleLetter);
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <FileText size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">AI Cover Letter Matcher</h1>
            <p className="text-white/40 text-sm">Generate tailored, high-converting cover letters instantly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="text-emerald-400 w-5 h-5" /> Job Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:border-emerald-500/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:border-emerald-500/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-white/40 mb-2">Job Description (Optional)</label>
                <textarea
                  rows={4}
                  placeholder="Paste job details for hyper-specific keyword matching..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:border-emerald-500/30 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-400 text-[#0a0c10] font-black uppercase tracking-widest text-[12px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                {loading ? 'Analyzing Profile...' : 'Generate Letter'}
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Generated Result</h2>
              {generatedLetter && (
                <button
                  onClick={handleCopy}
                  className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 text-emerald-400 transition-all flex items-center gap-2 text-[11px] uppercase tracking-wider font-black"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            {generatedLetter ? (
              <pre className="text-white/70 font-sans whitespace-pre-wrap leading-relaxed text-sm flex-1 overflow-y-auto bg-black/20 p-5 rounded-2xl border border-white/5">
                {generatedLetter}
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-white/20">
                <FileText className="w-12 h-12 mb-4" />
                <p className="text-sm font-bold uppercase tracking-wider">No cover letter generated yet</p>
                <p className="text-xs max-w-xs mt-1">Fill in parameters and tap generate to kickstart your application</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
