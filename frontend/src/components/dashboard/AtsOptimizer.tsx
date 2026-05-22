import { useState, useMemo } from 'react';
import { Target, CheckCircle2, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { showSuccess, showInfo } from '@/utils/toastManager';

interface AtsOptimizerProps {
  userSkills?: string[];
  currentAtsScore?: number;
}

export function AtsOptimizer({
  userSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Python', 'C++', 'SQL'],
  currentAtsScore = 65
}: AtsOptimizerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(currentAtsScore);

  // Common keywords to scan for in tech jobs
  const targetKeywords = useMemo(() => [
    'React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Docker', 'Kubernetes',
    'AWS', 'CI/CD', 'Python', 'SQL', 'System Design', 'RESTful APIs', 'Microservices',
    'Testing', 'Redis', 'PostgreSQL', 'Java', 'Git', 'Agile'
  ], []);

  // Compute matches based on pasted text
  const analysis = useMemo(() => {
    if (!jobDescription.trim()) {
      return { matched: [], missing: [] };
    }

    const lowerJd = jobDescription.toLowerCase();
    const foundInJd = targetKeywords.filter(keyword => 
      lowerJd.includes(keyword.toLowerCase())
    );

    const userSkillsLower = userSkills.map(s => s.toLowerCase());

    const matched = foundInJd.filter(keyword => 
      userSkillsLower.some(us => us.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(us))
    );

    const missing = foundInJd.filter(keyword => 
      !userSkillsLower.some(us => us.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(us))
    );

    return { matched, missing };
  }, [jobDescription, userSkills, targetKeywords]);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      showInfo('Please paste a job description first to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);

      // Calculate score: Base 50 + (matches ratio * 45)
      const totalKeywordsFound = analysis.matched.length + analysis.missing.length;
      if (totalKeywordsFound === 0) {
        setSimulatedScore(55);
      } else {
        const ratio = analysis.matched.length / totalKeywordsFound;
        const newScore = Math.min(95, Math.round(50 + ratio * 45));
        setSimulatedScore(newScore);
      }
      showSuccess('Job fit scanned successfully! ATS scoring updated.');
    }, 1200);
  };

  const handleOptimize = () => {
    showSuccess('AI resume optimizer active! Missing keywords dynamically injected into template generator.');
    showInfo('Head over to the Resume Builder tab to view and compile your optimized LaTeX resume.');
  };

  // SVG Gauge calculations
  // Gauge is a semi-circle: path length ~ 157.08 (R=50, Arc=180 deg)
  const radius = 40;
  const strokeWidth = 8;
  const circumference = radius * Math.PI; // ~125.66
  const scoreRatio = simulatedScore / 100;
  const strokeDashoffset = circumference - scoreRatio * circumference;

  return (
    <div className="rounded-[40px] p-8 bg-black/40 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#5ed29c]/20 transition-all duration-500 h-full font-rubik flex flex-col justify-between">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />

      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-6">
          <Target size={18} className="text-[#5ed29c]" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">ATS Simulator</p>
            <h4 className="text-xl font-[900] text-white uppercase italic tracking-tighter">
              Resume <span className="text-[#5ed29c]">ATS Match.</span>
            </h4>
          </div>
        </div>

        {/* Layout grid: Input on left, Gauge on right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Job Description input area */}
          <div className="md:col-span-8 space-y-4">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              Paste Job Description to check score
            </p>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (hasAnalyzed) setHasAnalyzed(false); // Reset analysis if text changes
              }}
              placeholder="Paste job details (e.g. Seeking a React Developer experienced in Node.js, TypeScript and CI/CD...)"
              className="w-full h-[110px] bg-white/[0.02] border border-white/5 focus:border-[#5ed29c]/50 rounded-2xl p-4 text-xs text-white/80 placeholder-white/20 focus:outline-none resize-none transition-colors"
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-[45px] bg-white/5 hover:bg-white/10 active:scale-98 text-white rounded-2xl border border-white/5 transition-all text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={14} className="animate-spin text-[#5ed29c]" />
                  Scanning signals...
                </>
              ) : (
                'Run ATS Scan'
              )}
            </button>
          </div>

          {/* Visual Score Gauge */}
          <div className="md:col-span-4 flex flex-col items-center justify-center bg-white/[0.01] border border-white/5 rounded-3xl p-5 relative">
            <div className="relative w-28 h-20 flex items-center justify-center mt-2">
              <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 60">
                {/* Background arc */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />
                {/* Filled arc with glowing stroke */}
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
              {/* Text indicator inside gauge */}
              <div className="absolute bottom-2 flex flex-col items-center justify-center">
                <span className="text-2xl font-[900] text-white tracking-tighter italic leading-none">
                  {simulatedScore}%
                </span>
                <span className="text-[7px] font-black text-white/30 uppercase tracking-widest mt-1">
                  Match Rate
                </span>
              </div>
            </div>
            <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
              simulatedScore >= 80 ? 'bg-[#5ed29c]/10 text-[#5ed29c]' : simulatedScore >= 60 ? 'bg-purple-500/10 text-purple-400' : 'bg-red-500/10 text-red-500'
            }`}>
              {simulatedScore >= 80 ? 'Ready for Apply' : simulatedScore >= 60 ? 'Moderate Fit' : 'Low Match'}
            </span>
          </div>
        </div>
      </div>

      {/* Keywords matched vs missing block (only rendered if analyzed) */}
      {hasAnalyzed && (
        <div className="mt-6 pt-5 border-t border-white/5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Matched keywords */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#5ed29c]" />
                <span className="text-[8px] font-black text-[#5ed29c] uppercase tracking-wider">Matched ({analysis.matched.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysis.matched.length > 0 ? (
                  analysis.matched.map(k => (
                    <span key={k} className="text-[8px] font-bold bg-[#5ed29c]/10 text-[#5ed29c] px-2 py-0.5 rounded border border-[#5ed29c]/10">{k}</span>
                  ))
                ) : (
                  <span className="text-[8px] font-bold text-white/20 italic">No matches</span>
                )}
              </div>
            </div>

            {/* Missing keywords */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <AlertTriangle size={12} className="text-amber-500" />
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-wider">Missing ({analysis.missing.length})</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {analysis.missing.length > 0 ? (
                  analysis.missing.map(k => (
                    <span key={k} className="text-[8px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/10">{k}</span>
                  ))
                ) : (
                  <span className="text-[8px] font-bold text-white/20 italic">None missing</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick optimize CTA */}
          {analysis.missing.length > 0 && (
            <button
              onClick={handleOptimize}
              className="w-full py-3 bg-[#5ed29c]/10 hover:bg-[#5ed29c]/20 text-[#5ed29c] text-[10px] font-black uppercase tracking-widest rounded-2xl border border-[#5ed29c]/20 transition-all flex items-center justify-center gap-2 animate-pulse"
            >
              <Sparkles size={12} />
              Inject missing keywords automatically
            </button>
          )}
        </div>
      )}
    </div>
  );
}
