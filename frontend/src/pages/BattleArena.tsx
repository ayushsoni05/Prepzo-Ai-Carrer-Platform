import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { Play, Loader2, Trophy, Swords, XCircle, CheckCircle2, Terminal, BrainCircuit, RefreshCw, Cpu, Activity, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { codingProblems } from '@/api/codingLab';

export const BattleArena = () => {
  const { matchStatus, opponent, opponentProgress, sendProgress, submitBattle, winnerSocketId, resetState, timeLimit, problems } = useSocketStore();
  const { user } = useAuthStore();
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLimit) {
      setTimeLeft(timeLimit * 60); // timeLimit is in minutes
    } else {
      setTimeLeft(30 * 60); // Default to 30 mins
    }
  }, [timeLimit]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  
  const currentProblemIds = problems && problems.length > 0 ? problems : ['two-sum'];
  const activeProblems = currentProblemIds.map(id => codingProblems.find(p => p.id === id)).filter(Boolean) as any[];
  
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const currentProblem = activeProblems.length > 0 ? activeProblems[currentProblemIndex] : codingProblems[0];

  const [language, setLanguage] = useState("javascript");
  
  // Use starter code for the current language and problem
  const [code, setCode] = useState(() => currentProblem.starterCode[language as keyof typeof currentProblem.starterCode] || "function solution() {\n  // Write your code here\n  \n}");

  // Update code when problem or language changes
  useEffect(() => {
    if (currentProblem && currentProblem.starterCode && currentProblem.starterCode[language as keyof typeof currentProblem.starterCode]) {
      setCode(currentProblem.starterCode[language as keyof typeof currentProblem.starterCode]);
    }
  }, [currentProblem, language]);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number, total: number, stdout: string, error: string } | null>(null);
  const [aiFeedback, setAiFeedback] = useState<{ score: string, timeComplexity: string, spaceComplexity: string, feedback: string } | null>(null);

  const languages = [
    { id: 'javascript', label: 'JavaScript (Node)' },
    { id: 'python', label: 'Python 3' },
    { id: 'cpp', label: 'C++ (GCC)' },
    { id: 'java', label: 'Java' },
    { id: 'go', label: 'Go' },
    { id: 'rust', label: 'Rust' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'csharp', label: 'C#' }
  ];

  // Sync progress
  useEffect(() => {
    const progress = Math.min(100, (code.length / 100) * 100);
    sendProgress(progress);
  }, [code]);

  useEffect(() => {
    if (matchStatus === 'idle') {
      window.location.hash = 'coding-lab';
    }
  }, [matchStatus]);

  const handleRunCode = async () => {
    setIsExecuting(true);
    setTestResults(null);
    setAiFeedback(null);
    
    try {
      // For MVP: Wrap the user's code with the test case execution logic
      const testHarness = `
${code}

// Test cases
try {
  let passed = 0;
  const tests = [
    { nums: [2,7,11,15], target: 9, expected: [0,1] },
    { nums: [3,2,4], target: 6, expected: [1,2] },
    { nums: [3,3], target: 6, expected: [0,1] }
  ];
  
  for(let i=0; i<tests.length; i++) {
    const res = twoSum(tests[i].nums, tests[i].target);
    if(Array.isArray(res) && res.sort().join(',') === tests[i].expected.join(',')) {
      console.log('Test ' + (i+1) + ': Passed');
      passed++;
    } else {
      console.log('Test ' + (i+1) + ': Failed (Expected ' + tests[i].expected + ', got ' + res + ')');
    }
  }
  console.log('---RESULT_DELIMITER---');
  console.log(passed);
} catch (e) {
  console.error(e.message);
}
      `;

      const response = await fetch('https://emacs.ch/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language,
          version: '*', // Uses latest available version
          files: [{ content: testHarness }]
        })
      });

      const data = await response.json();
      const output = data.run.stdout + (data.run.stderr ? "\n" + data.run.stderr : "");
      
      let passedCount = 0;
      let errorMsg = data.run.stderr || "";
      
      if (output.includes('---RESULT_DELIMITER---')) {
         const parts = output.split('---RESULT_DELIMITER---');
         passedCount = parseInt(parts[1].trim()) || 0;
      } else if (!output.includes('Passed')) {
         errorMsg = output || "Syntax Error or Execution Timeout";
      }

      const isSuccess = passedCount === 3;
      
      setTestResults({ 
        passed: passedCount, 
        total: 3,
        stdout: output.split('---RESULT_DELIMITER---')[0].trim(),
        error: errorMsg
      });
      
      if (isSuccess) {
        handleAIReview(code);
        submitBattle(true, 5, 5);
      }
    } catch (error) {
      setTestResults({
        passed: 0,
        total: 3,
        stdout: "",
        error: "Failed to connect to execution engine."
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleAIReview = (submittedCode: string) => {
    setIsReviewing(true);
    // Simulate Gemini AI Code Review
    setTimeout(() => {
      setIsReviewing(false);
      setAiFeedback({
        score: "A-",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
        feedback: "Your solution passes all test cases, but it uses a brute-force approach with nested loops. A Senior Engineer would optimize this using a HashMap to achieve O(n) time complexity by storing the complements as you iterate. Good job on keeping space complexity low, though!"
      });
    }, 2500);
  };

  const handleExit = () => {
    resetState();
    window.location.hash = 'coding-lab';
  };

  if (matchStatus === 'ended') {
    const isWinner = winnerSocketId !== 'opponent' && winnerSocketId !== null && winnerSocketId !== undefined;
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center font-rubik relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-[#161a20] border border-white/10 rounded-[40px] p-12 text-center max-w-lg w-full relative z-10"
        >
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 border-4 ${isWinner ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-red-500/20 border-red-500 text-red-500'}`}>
            {isWinner ? <Trophy size={40} /> : <XCircle size={40} />}
          </div>
          <h1 className="text-4xl font-[900] text-white uppercase italic tracking-tighter mb-2">
            {isWinner ? 'Victory!' : 'Defeat'}
          </h1>
          <p className="text-white/40 font-bold tracking-widest uppercase text-sm mb-8">
            {isWinner ? 'You out-coded your opponent.' : 'Your opponent was faster.'}
          </p>
          <button onClick={handleExit} className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase tracking-widest rounded-xl transition-colors">
            Return to Lab
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col font-rubik text-white selection:bg-[#5ed29c] selection:text-black">
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-[#161a20] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center border border-red-500/30">
            <Swords className="text-red-500" size={16} />
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase tracking-widest text-white/50">Ranked Match</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 animate-pulse">Live Battle</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="bg-[#161a20] px-4 py-1.5 rounded-xl border border-[#5ed29c]/30 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${timeLeft < 60 ? 'bg-red-500 animate-ping' : 'bg-[#5ed29c] animate-pulse'}`} />
            <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-[#5ed29c]'}`}>{formatTime(timeLeft)}</span>
          </div>

          <div className="flex items-center gap-4 bg-black/50 px-4 py-2 rounded-lg border border-white/5 w-[200px]">
            <img src={opponent?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${opponent?.id || 'opponent'}`} className="w-6 h-6 rounded-full border border-red-500 bg-[#161a20]" />
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 transition-all duration-300 ease-out" style={{ width: `${opponentProgress}%` }} />
            </div>
          </div>
          <button onClick={handleExit} className="text-[10px] text-white/30 hover:text-white font-bold uppercase tracking-widest transition-colors">Surrender</button>
        </div>
      </header>

      {/* Main 3-Panel Arena */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Panel 1: Problem Statement (35%) */}
        <div className="w-[35%] border-r border-white/10 bg-[#161a20]/50 flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <Activity className="text-white/40 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Mission Briefing</span>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="mb-6 flex items-center justify-between">
              <span className="px-3 py-1 bg-[#5ed29c]/10 text-[#5ed29c] border border-[#5ed29c]/20 text-[10px] font-black uppercase tracking-widest rounded-full">
                {currentProblem.difficulty || 'EASY'}
              </span>
              {activeProblems.length > 1 && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentProblemIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentProblemIndex === 0}
                    className="p-1 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 rounded transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-bold text-white/40 self-center">{currentProblemIndex + 1}/{activeProblems.length}</span>
                  <button 
                    onClick={() => setCurrentProblemIndex(prev => Math.min(activeProblems.length - 1, prev + 1))}
                    disabled={currentProblemIndex === activeProblems.length - 1}
                    className="p-1 bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 rounded transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-[900] uppercase tracking-tighter italic mb-6">
              {currentProblem.title || 'Challenge'}
            </h2>
            <div 
              className="text-white/70 font-medium whitespace-pre-wrap text-[13px] leading-relaxed [&_p]:my-1 [&_p:empty]:hidden [&_pre]:mt-1 [&_pre]:mb-3 [&_pre]:p-3 [&_pre]:bg-white/5 [&_pre]:rounded-xl [&_pre]:text-white/90 [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-4 [&_strong]:text-white" 
              dangerouslySetInnerHTML={{ __html: (currentProblem.description || currentProblem.questionText || '').replace(/<p>\s*&nbsp;\s*<\/p>/g, '') }}
            />
          </div>
        </div>

        {/* Panel 2: Code Editor & Console (flex-1) */}
        <div className="flex-1 flex flex-col bg-[#0a0c10] border-r border-white/10">
          <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#161a20]">
            <div className="relative z-50">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="bg-[#0a0c10] border border-[#5ed29c]/30 text-[#5ed29c] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg outline-none flex items-center justify-between w-48 hover:border-[#5ed29c]/60 hover:bg-[#5ed29c]/10 transition-colors"
              >
                {languages.find(l => l.id === language)?.label}
                <ChevronDown size={14} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-full bg-[#161a20] border border-[#5ed29c]/30 rounded-lg shadow-xl overflow-hidden"
                  >
                    {languages.map(lang => (
                      <div 
                        key={lang.id}
                        onClick={() => { setLanguage(lang.id); setCode(currentProblem.starterCode?.[lang.id] || ""); setIsLangDropdownOpen(false); }}
                        className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors ${language === lang.id ? 'bg-[#5ed29c]/20 text-[#5ed29c]' : 'text-white hover:bg-[#5ed29c]/10 hover:text-[#5ed29c]'}`}
                      >
                        {lang.label}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="flex-1 relative pt-2">
            <Editor
              height="100%"
              language={language === 'csharp' ? 'csharp' : language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                lineHeight: 24,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
              }}
            />
          </div>

          {/* Execution Console */}
          <div className="h-[400px] bg-[#161a20] border-t border-white/5 flex flex-col">
            <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-black/20">
              <Terminal className="text-white/40 w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Execution Console</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-xs">
              {isExecuting ? (
                <div className="flex items-center gap-2 text-[#5ed29c]/70 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Compiling and running test cases...
                </div>
              ) : testResults ? (
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 font-bold uppercase tracking-widest ${testResults.passed === testResults.total ? 'text-[#5ed29c]' : 'text-red-500'}`}>
                    {testResults.passed === testResults.total ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    Tests: {testResults.passed}/{testResults.total} Passed
                  </div>
                  {testResults.error && (
                    <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded">
                      {testResults.error}
                    </div>
                  )}
                  <div className="text-white/60 whitespace-pre-wrap leading-relaxed">
                    {testResults.stdout}
                  </div>
                </div>
              ) : (
                <div className="text-white/20 italic">Ready to execute code...</div>
              )}
            </div>
            <div className="h-14 border-t border-white/5 flex items-center justify-end px-4 gap-4">
              <button onClick={handleRunCode} disabled={isExecuting} className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-[900] uppercase tracking-widest rounded-lg transition-colors disabled:opacity-50 text-[10px]">
                Run Sample Tests
              </button>
              <button onClick={handleRunCode} disabled={isExecuting} className="px-8 py-2.5 bg-[#5ed29c] hover:bg-[#4bc18a] text-black font-[900] uppercase tracking-widest rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-[11px] shadow-[0_0_15px_rgba(94,210,156,0.2)]">
                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play size={14} className="fill-black" />} Submit Code
              </button>
            </div>
          </div>
        </div>

        {/* Panel 3: Senior AI Reviewer (30%) */}
        <div className="w-[30%] bg-[#161a20] flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-purple-500/5">
            <BrainCircuit className="text-purple-400 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Senior AI Code Review</span>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
            {!testResults ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
                <Cpu size={48} className="mb-4 text-white/20" />
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">Awaiting Submission</p>
                <p className="text-[10px] text-white/40 mt-2">Submit your code to receive a Senior Engineer critique on Time/Space complexity.</p>
              </div>
            ) : isReviewing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 relative mb-6">
                  <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin" />
                  <BrainCircuit className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={24} />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-purple-400 animate-pulse">Analyzing Architecture...</p>
              </div>
            ) : aiFeedback ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Architecture Grade</span>
                  <span className={`text-3xl font-[900] italic ${aiFeedback.score.includes('A') ? 'text-[#5ed29c]' : 'text-amber-400'}`}>{aiFeedback.score}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Time Complexity</p>
                    <p className="text-sm font-mono text-amber-400 font-bold">{aiFeedback.timeComplexity}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Space Complexity</p>
                    <p className="text-sm font-mono text-[#5ed29c] font-bold">{aiFeedback.spaceComplexity}</p>
                  </div>
                </div>

                <div className="p-5 bg-purple-500/10 border border-purple-500/20 rounded-2xl relative">
                  <div className="absolute -top-3 left-4 bg-[#161a20] px-2 text-[8px] font-black uppercase tracking-widest text-purple-400">Senior Feedback</div>
                  <p className="text-sm text-purple-100/80 leading-relaxed font-medium">
                    {aiFeedback.feedback}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
};
