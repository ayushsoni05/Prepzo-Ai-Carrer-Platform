import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { Play, Loader2, Trophy, Swords, XCircle, CheckCircle2, Terminal, BrainCircuit, RefreshCw, Cpu, Activity } from 'lucide-react';
import Editor from '@monaco-editor/react';

export const BattleArena = () => {
  const { matchStatus, opponent, opponentProgress, sendProgress, submitBattle, winnerSocketId, resetState } = useSocketStore();
  const { user } = useAuthStore();
  
  // Dummy problem for MVP
  const problem = {
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Example 1:**\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\n```\n\n**Constraints:**\n- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- `-10^9 <= target <= 10^9`",
    difficulty: "Easy"
  };

  const [code, setCode] = useState("function twoSum(nums, target) {\n  // Write your code here\n  \n}");
  const [language, setLanguage] = useState("javascript");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number, total: number, stdout: string, error: string } | null>(null);
  const [aiFeedback, setAiFeedback] = useState<{ score: string, timeComplexity: string, spaceComplexity: string, feedback: string } | null>(null);

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
          language: language === 'javascript' ? 'javascript' : language === 'python' ? 'python' : 'cpp',
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
          <div className="flex items-center gap-4 bg-black/50 px-4 py-2 rounded-lg border border-white/5 w-[200px]">
            <img src={opponent?.avatar} className="w-6 h-6 rounded-full border border-red-500" />
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 transition-all duration-300 ease-out" style={{ width: `${opponentProgress}%` }} />
            </div>
          </div>
          <button onClick={handleExit} className="text-[10px] text-white/30 hover:text-white font-bold uppercase tracking-widest transition-colors">Surrender</button>
        </div>
      </header>

      {/* Main 3-Panel Arena */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Panel 1: Problem Statement (25%) */}
        <div className="w-[25%] border-r border-white/10 bg-[#161a20]/50 flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <Activity className="text-white/40 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Mission Briefing</span>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-black bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-md uppercase tracking-widest">
                {problem.difficulty}
              </span>
            </div>
            <h2 className="text-3xl font-[900] uppercase italic tracking-tighter mb-4">{problem.title}</h2>
            <div className="prose prose-invert prose-sm max-w-none text-white/70">
              {problem.description.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line.startsWith('```') || line.startsWith('-') || line.startsWith('**') ? <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 rounded text-[#5ed29c]">$1</code>')}} /> : line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Code Editor & Console (50%) */}
        <div className="flex-1 flex flex-col bg-[#0a0c10] border-r border-white/10">
          <div className="h-12 border-b border-white/5 flex items-center px-4 bg-[#161a20]">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black/50 border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded outline-none"
            >
              <option value="javascript">JavaScript (Node)</option>
              <option value="python">Python 3</option>
              <option value="cpp">C++ (GCC)</option>
            </select>
          </div>
          
          {/* Monaco Editor */}
          <div className="flex-1 relative pt-2">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                roundedSelection: false,
                scrollbar: { useShadows: false, verticalScrollbarSize: 8 }
              }}
            />
          </div>

          {/* Console / Output */}
          <div className="h-[250px] border-t border-white/10 bg-[#161a20] flex flex-col">
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-black/20">
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

        {/* Panel 3: Senior AI Reviewer (25%) */}
        <div className="w-[25%] bg-[#161a20] flex flex-col shrink-0">
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
