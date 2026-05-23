import { useState, useMemo } from 'react';
import { Target, CheckCircle2, AlertTriangle, Sparkles, Loader2, ArrowLeft, FileText, ShieldCheck } from 'lucide-react';
import { showSuccess, showInfo } from '@/utils/toastManager';

interface AtsOptimizerProps {
  userSkills?: string[];
  currentAtsScore?: number;
  onExit?: () => void;
  children?: React.ReactNode;
}

export function AtsOptimizer({
  userSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Python', 'C++', 'SQL'],
  currentAtsScore = 65,
  onExit,
  children
}: AtsOptimizerProps) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(currentAtsScore);

  // Mock data for the detailed UI
  const atsTrend = [
    { score: 45 }, { score: 52 }, { score: 68 }, { score: 65 }, 
    { score: 78 }, { score: 82 }, { score: 85 }, { score: simulatedScore }
  ];

  const rewriteLines = [
    { improved: "Engineered scalable microservices using Node.js and Docker, improving system resilience by 40%." },
    { improved: "Spearheaded frontend migration to React, achieving a 25% reduction in page load times." },
    { improved: "Orchestrated CI/CD pipelines via GitHub Actions, decreasing deployment friction." }
  ];

  const recruiterSimulation = {
    strengths: ["Strong technical foundation", "Demonstrated impact", "Consistent progression"],
    recommendation: "Ensure action verbs lead every bullet point and metrics are quantified where possible."
  };

  const targetKeywords = useMemo(() => [
    'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Docker', 'Kubernetes',
    'AWS', 'CI/CD', 'Python', 'SQL', 'System Design', 'RESTful APIs', 'Microservices',
    'Testing', 'Redis', 'PostgreSQL', 'Java', 'Git', 'Agile'
  ], []);

  const analysis = useMemo(() => {
    if (!jobDescription.trim() && !resumeText.trim()) {
      return { matched: [], missing: [] };
    }

    const lowerJd = jobDescription.toLowerCase();
    const lowerResume = resumeText.toLowerCase();
    const combinedText = lowerJd + " " + lowerResume;
    
    const foundInText = targetKeywords.filter(keyword => 
      combinedText.includes(keyword.toLowerCase())
    );

    const userSkillsLower = userSkills.map(s => s.toLowerCase());

    const matched = foundInText.filter(keyword => 
      userSkillsLower.some(us => us.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(us))
    );

    const missing = targetKeywords.filter(keyword => 
      !matched.includes(keyword) && combinedText.includes(keyword.toLowerCase())
    );

    // If JD is empty but we have some matches from User Skills vs Resume Text
    if (!jobDescription.trim() && missing.length === 0 && matched.length === 0) {
        return { matched: userSkills.slice(0, 5), missing: ['AWS', 'Docker', 'CI/CD'] };
    }

    return { matched, missing };
  }, [jobDescription, resumeText, userSkills, targetKeywords]);

  const handleAnalyze = () => {
    if (!jobDescription.trim() && !resumeText.trim()) {
      showInfo('Please paste resume content or a job description to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);

      const totalKeywordsFound = analysis.matched.length + analysis.missing.length;
      if (totalKeywordsFound === 0) {
        setSimulatedScore(Math.floor(Math.random() * 20) + 60);
      } else {
        const ratio = analysis.matched.length / Math.max(1, totalKeywordsFound);
        const newScore = Math.min(98, Math.round(50 + ratio * 48));
        setSimulatedScore(newScore);
      }
      showSuccess('Deep scan complete! ATS scoring updated.');
    }, 1500);
  };

  const handleOptimize = () => {
    showSuccess('AI resume optimizer active! Missing keywords dynamically injected.');
  };

  const formatVal = (val: number) => Math.round(val).toString();

  // Gauge calculations
  const radius = 40;
  const strokeWidth = 8;
  const circumference = radius * Math.PI; 
  const scoreRatio = simulatedScore / 100;
  const strokeDashoffset = circumference - scoreRatio * circumference;

  return (
    <div className="space-y-12 pb-20 selection:bg-white selection:text-black pt-6 font-rubik">
      <div className="flex items-center justify-between mb-6">
        {onExit ? (
          <button 
            onClick={onExit}
            className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Exit Workspace
          </button>
        ) : <div />}
        <div className="flex gap-4">
          <button onClick={() => showSuccess('Exporting Report...')} className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        {/* Left Column */}
        <div className="space-y-8 flex flex-col">
          <div className="rounded-[40px] p-8 md:p-12 bg-[#161a20] border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-4 text-[10px] font-[900] uppercase tracking-[0.4em] text-white/30 mb-8">
              <FileText size={20} className="text-[#5ed29c]" />
              Deep Scan Engine
            </div>

            <h3 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter mb-8 italic">
              ATS Score <span className="text-[#5ed29c]">Checker.</span>
            </h3>

            <div className="space-y-6">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume content for deep ATS validation..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white/80 font-medium min-h-[200px] focus:outline-none focus:border-[#5ed29c]/50 transition-colors text-xs"
              />

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste Job Description for role-match analysis (optional)..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white/80 font-medium min-h-[120px] focus:outline-none focus:border-[#5ed29c]/50 transition-colors text-xs"
              />

              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="h-[55px] px-10 bg-[#5ed29c] hover:bg-[#5ed29c]/90 text-black rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Analyzing Signal...
                    </>
                  ) : 'Run Deep Scan'}
                </button>

                <button
                  onClick={handleOptimize}
                  className="h-[55px] px-10 bg-[#5ed29c]/10 text-[#5ed29c] hover:bg-[#5ed29c]/20 border border-[#5ed29c]/30 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center gap-2 ml-auto"
                >
                  <Sparkles size={16} /> Auto Optimize
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: 'ATS Signal', value: formatVal(simulatedScore), unit: '%' },
              { label: 'Success Prob', value: formatVal(Math.min(99, simulatedScore + 5)), unit: '%' },
              { label: 'Global Rank', value: simulatedScore > 80 ? '5' : simulatedScore > 60 ? '15' : '30', unit: '', prefix: 'Top ' },
            ].map((stat) => ( stat && (
              <div key={stat.label} className="bg-[#161a20] border border-white/5 rounded-[32px] p-8 text-left shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ed29c]/5 rounded-full blur-3xl group-hover:bg-[#5ed29c]/10 transition-colors"></div>
                <p className="text-[10px] font-[900] uppercase tracking-widest text-white/20 mb-4 relative z-10">{stat.label}</p>
                <p className="text-4xl font-[900] text-white tracking-tighter italic relative z-10 group-hover:text-[#5ed29c] transition-colors">
                  {stat.prefix}{stat.value}<span className="text-lg opacity-40 ml-1">{stat.unit}</span>
                </p>
              </div>
            )))}
          </div>

          <div className="rounded-[32px] p-8 bg-[#161a20] border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[10px] font-[900] uppercase tracking-[0.3em] text-white/30">Keyword Delta</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5ed29c] animate-pulse" />
                <span className="text-[9px] font-black uppercase text-[#5ed29c] tracking-widest">Live Sync</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[12px] font-[900] text-white uppercase tracking-widest mb-4">Matched Signals</p>
                <div className="flex flex-wrap gap-2">
                  {hasAnalyzed ? analysis.matched.length > 0 ? analysis.matched.map(k => (
                    <span key={k} className="bg-[#5ed29c]/10 border border-[#5ed29c]/30 text-[#5ed29c] text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider">
                      {k}
                    </span>
                  )) : <span className="text-white/20 text-xs italic font-bold">No matches found.</span> : <span className="text-white/20 text-xs italic font-bold">Run scan to view matches.</span>}
                </div>
              </div>
              
              <div>
                <p className="text-[12px] font-[900] text-white/40 uppercase tracking-widest mb-4">Missing Gaps</p>
                <div className="flex flex-wrap gap-2">
                  {hasAnalyzed ? analysis.missing.length > 0 ? analysis.missing.map(k => (
                    <span key={k} className="bg-white/5 border border-white/10 text-white/30 text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider italic">
                      {k}
                    </span>
                  )) : <span className="text-[#5ed29c]/50 text-xs italic font-bold">No missing keywords!</span> : <span className="text-white/20 text-xs italic font-bold">Run scan to view gaps.</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-8 flex flex-col">
          {/* Visual Gauge */}
          <div className="rounded-[32px] p-8 bg-[#161a20] border border-white/5 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5ed29c]/5 blur-[50px] rounded-full"></div>
             <p className="text-[10px] font-[900] uppercase tracking-[0.5em] text-white/30 mb-8 self-start w-full text-left">Match Simulator</p>
             <div className="relative w-40 h-28 flex items-center justify-center mt-2">
              <svg className="w-full h-full transform -rotate-180 drop-shadow-2xl" viewBox="0 0 100 60">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={strokeWidth} strokeLinecap="round" />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={simulatedScore >= 80 ? '#5ed29c' : simulatedScore >= 60 ? '#a855f7' : '#ef4444'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute bottom-2 flex flex-col items-center justify-center">
                <span className="text-4xl font-[900] text-white tracking-tighter italic leading-none">
                  {simulatedScore}%
                </span>
              </div>
            </div>
            <span className={`mt-4 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${
              simulatedScore >= 80 ? 'bg-[#5ed29c]/10 text-[#5ed29c] border border-[#5ed29c]/20' : simulatedScore >= 60 ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {simulatedScore >= 80 ? 'Ready for Apply' : simulatedScore >= 60 ? 'Moderate Fit' : 'Low Match'}
            </span>
          </div>

          <div className="rounded-[32px] p-8 bg-[#161a20] border border-white/5 shadow-xl">
            <p className="text-[10px] font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">Score History</p>
            <div className="flex h-40 items-end gap-2 mb-6">
              {atsTrend.map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      className="w-full bg-white/5 group-hover:bg-[#5ed29c] transition-colors rounded-t-lg relative"
                      style={{ height: `${Math.max(10, (point.score || 0))}%` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[9px] font-black text-white/20 italic group-hover:text-[#5ed29c] transition-colors">{formatVal(point.score)}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-medium italic text-white/30 text-center">Historical ATS movement across versions.</p>
          </div>

          <div className="rounded-[32px] p-8 bg-[#161a20] border border-white/5 shadow-xl">
              <p className="text-[10px] font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">AI Rewrite Delta</p>
              <div className="space-y-4">
                {rewriteLines.map((line, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                      <p className="text-[10px] font-[900] uppercase text-[#5ed29c] mb-3 tracking-widest">Impact Layer {i+1}</p>
                      <p className="text-[12px] font-black text-white/80 uppercase tracking-tight leading-snug italic line-clamp-3">
                          "{line.improved}"
                      </p>
                    </div>
                ))}
              </div>
          </div>
          
          <div className="rounded-[32px] p-8 bg-[#161a20] border border-white/5 shadow-xl">
              <p className="text-[10px] font-[900] uppercase tracking-[0.5em] text-white/30 mb-8">Recruiter Sentiment</p>
              <div className="space-y-4">
                {recruiterSimulation.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 text-[#5ed29c]">
                      <ShieldCheck size={14} className="opacity-60" />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{s}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/5">
                    <p className="text-[11px] font-medium leading-relaxed text-white/50 italic">
                      {recruiterSimulation.recommendation}
                    </p>
                </div>
              </div>
          </div>
        </div>

        {/* Right Column (Injected PeerLeaderboard) */}
        {children && (
          <div className="space-y-8 flex flex-col h-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
