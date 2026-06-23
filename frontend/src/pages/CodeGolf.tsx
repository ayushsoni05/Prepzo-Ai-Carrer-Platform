import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Play, RefreshCw, ArrowLeft, Code, Sparkles, AlertCircle, CheckCircle2, ShieldAlert, Cpu, Globe } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';
import Editor from '@monaco-editor/react';
import { ENV } from '../config/env';

interface Challenge {
  id: string;
  title: string;
  description: string;
  template: string;
  testCases: Array<{
    input: any[];
    expected: any;
  }>;
  aiBotTarget: number;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'reverse',
    title: 'Reverse String',
    description: 'Write a function f(s) that takes a string s and returns it reversed.',
    template: 'f = s => {\n  return s.split("").reverse().join("");\n}',
    testCases: [
      { input: ['hello'], expected: 'olleh' },
      { input: ['prepzo'], expected: 'ozperp' },
      { input: ['a'], expected: 'a' }
    ],
    aiBotTarget: 29
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz Shortener',
    description: "Write a function f(n) that returns 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, 'FizzBuzz' if divisible by 15, or n otherwise.",
    template: 'f = n => {\n  if (n % 15 === 0) return "FizzBuzz";\n  if (n % 3 === 0) return "Fizz";\n  if (n % 5 === 0) return "Buzz";\n  return n;\n}',
    testCases: [
      { input: [3], expected: 'Fizz' },
      { input: [5], expected: 'Buzz' },
      { input: [15], expected: 'FizzBuzz' },
      { input: [7], expected: 7 }
    ],
    aiBotTarget: 45
  },
  {
    id: 'arraysum',
    title: 'Array Sum',
    description: 'Write a function f(arr) that sums all numbers in an array.',
    template: 'f = arr => {\n  return arr.reduce((a, b) => a + b, 0);\n}',
    testCases: [
      { input: [[1, 2, 3]], expected: 6 },
      { input: [[-1, 1]], expected: 0 },
      { input: [[]], expected: 0 }
    ],
    aiBotTarget: 29
  }
];

export const CodeGolf = () => {
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const activeChallenge = CHALLENGES[activeChallengeIdx];
  
  const [code, setCode] = useState(activeChallenge.template);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [allPassed, setAllPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  
  // Rival Bot simulation state
  const [botCharCount, setBotCharCount] = useState(130);
  const [botStatus, setBotStatus] = useState('PrepBot is analyzing...');
  const timerRef = useRef<any>(null);
  
  // Set up timer for simulated AI rival
  useEffect(() => {
    setCode(activeChallenge.template);
    setTestResults([]);
    setAllPassed(false);
    setBotCharCount(130);
    setBotStatus('PrepBot is analyzing...');
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Simulate PrepBot compression progress over time
    let steps = 0;
    timerRef.current = setInterval(() => {
      steps += 1;
      if (steps === 1) {
        setBotStatus('PrepBot is typing baseline code...');
        setBotCharCount(95);
      } else if (steps === 2) {
        setBotStatus('PrepBot is refactoring conditionals...');
        setBotCharCount(68);
      } else if (steps === 3) {
        setBotStatus('PrepBot is applying arrow function shortcuts...');
        setBotCharCount(activeChallenge.aiBotTarget + 8);
      } else if (steps === 4) {
        setBotStatus('PrepBot completed code-golfing!');
        setBotCharCount(activeChallenge.aiBotTarget);
        clearInterval(timerRef.current);
      }
    }, 8000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeChallengeIdx]);

  const charCount = code.replace(/\s/g, '').length; // Measure character count excluding whitespace

  const runTests = async () => {
    setIsRunning(true);
    try {
      if (language === 'javascript') {
        // Run JS locally via Function sandbox
        const script = `${code}\nreturn f;`;
        const userFn = new Function(script)();
        
        if (typeof userFn !== 'function') {
          throw new Error('Your code must define a function named "f" (e.g. f = n => ...)');
        }

        const results = activeChallenge.testCases.map((tc, idx) => {
          try {
            const inputs = JSON.parse(JSON.stringify(tc.input));
            const result = userFn(...inputs);
            const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
            return {
              id: idx,
              input: JSON.stringify(tc.input[0]),
              expected: JSON.stringify(tc.expected),
              actual: JSON.stringify(result),
              passed
            };
          } catch (e: any) {
            return {
              id: idx,
              input: JSON.stringify(tc.input[0]),
              expected: JSON.stringify(tc.expected),
              actual: `Error: ${e.message}`,
              passed: false
            };
          }
        });

        setTestResults(results);
        const passedAll = results.every(r => r.passed);
        setAllPassed(passedAll);
        passedAll ? showSuccess('All unit tests passed!') : showError('Some tests failed.');
      } else {
        // Route through Judge0 for Python/C++/Java
        const langMap: Record<string, number> = {
          python: 71,
          cpp: 54,
          java: 62
        };

        // Build a wrapper that runs all test cases and prints PASS/FAIL
        let wrapperCode = code;
        if (language === 'python') {
          wrapperCode += '\nimport json\n';
          activeChallenge.testCases.forEach((tc, idx) => {
            wrapperCode += `\nresult_${idx} = f(${tc.input.map(i => JSON.stringify(i)).join(', ')})`;
            wrapperCode += `\nprint(f"TC${idx}:{json.dumps(result_${idx})}:${JSON.stringify(tc.expected)}")`;
          });
        } else {
          // For C++/Java, run as-is and check stdout
          wrapperCode = code;
        }

        const res = await fetch(`${ENV.JUDGE0_URL}?base64_encoded=false&wait=true`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language_id: langMap[language] || 71,
            source_code: wrapperCode
          })
        });
        
        const data = await res.json();
        
        if (data.stderr || data.compile_output) {
          setTestResults([{
            id: 0,
            input: 'Compilation',
            expected: 'Clean compile',
            actual: data.stderr || data.compile_output,
            passed: false
          }]);
          setAllPassed(false);
          showError('Compilation error!');
        } else if (data.stdout && language === 'python') {
          // Parse Python test case results from stdout
          const lines = data.stdout.trim().split('\n');
          const results = activeChallenge.testCases.map((tc, idx) => {
            const line = lines.find((l: string) => l.startsWith(`TC${idx}:`));
            if (line) {
              const parts = line.split(':');
              const actual = parts[1];
              const expected = parts[2];
              return {
                id: idx,
                input: JSON.stringify(tc.input[0]),
                expected,
                actual,
                passed: actual === expected
              };
            }
            return {
              id: idx,
              input: JSON.stringify(tc.input[0]),
              expected: JSON.stringify(tc.expected),
              actual: 'No output',
              passed: false
            };
          });
          setTestResults(results);
          const passedAll = results.every(r => r.passed);
          setAllPassed(passedAll);
          passedAll ? showSuccess('All unit tests passed!') : showError('Some tests failed.');
        } else {
          // Generic output check
          setTestResults([{
            id: 0,
            input: 'stdout',
            expected: 'Test output',
            actual: data.stdout || 'No output',
            passed: !!data.stdout
          }]);
          setAllPassed(!!data.stdout);
        }
      }
    } catch (err: any) {
      showError(err.message || 'Execution error');
      setTestResults([{
        id: 0,
        input: 'Execution',
        expected: 'Valid function',
        actual: err.message,
        passed: false
      }]);
      setAllPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    if (!allPassed) {
      showError('Please run and pass all test cases before submitting!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/games/golf/report', {
        charCount,
        passed: allPassed
      });

      if (response.data?.success) {
        setXpEarned(response.data.data.earnedXp);
        const originalBadges = response.data.data.stats?.badges || [];
        setUnlockedBadges(originalBadges);
        setShowOutcomeModal(true);
        showSuccess('Solution submitted successfully!');
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to submit solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('game-lobby')}
              className="p-3 bg-[#13171d] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">Code-Golf <span className="text-purple-400">Duel.</span></h1>
              <p className="text-xs text-white/40 font-medium tracking-wide">Write the shortest possible functional code to win.</p>
            </div>
          </div>

          {/* Challenge & Language Selector */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Challenge:</span>
            <select 
              value={activeChallengeIdx} 
              onChange={(e) => setActiveChallengeIdx(parseInt(e.target.value))}
              className="bg-[#13171d] border border-white/10 text-sm font-black rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:border-purple-500/30 transition-colors"
            >
              {CHALLENGES.map((c, i) => (
                <option key={c.id} value={i}>{c.title}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 ml-2">
              <Globe className="w-4 h-4 text-white/30" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-[#13171d] border border-white/10 text-sm font-black rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:border-cyan-500/30 transition-colors"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Info + Rival */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Objective details */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[40px] rounded-full" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-[900] uppercase tracking-wider text-purple-400">Challenge Details</h2>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">{activeChallenge.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-medium">{activeChallenge.description}</p>
                <div className="bg-black/30 border border-white/5 rounded-xl p-4">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1.5">Examples</p>
                  {activeChallenge.testCases.slice(0, 2).map((tc, idx) => (
                    <div key={idx} className="text-xs font-mono text-white/50 mb-1">
                      f({JSON.stringify(tc.input[0])}) <span className="text-purple-400">➔</span> {JSON.stringify(tc.expected)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rival Bot Simulator */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-[900] uppercase tracking-wider text-blue-400">PrepBot Rival</h2>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 animate-pulse">Live Duel</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-bold text-white/50">{botStatus}</p>
                  <p className="text-3xl font-[900] text-blue-400 italic tracking-tighter">{botCharCount} <span className="text-xs font-bold uppercase text-white/30">chars</span></p>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="bg-blue-500 h-full rounded-full"
                    animate={{ width: `${Math.max(10, Math.min(100, (130 - botCharCount) * 1.3))}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-[900] uppercase tracking-wider text-[#5ed29c]">Test Case Results</h2>
                <div className="space-y-3">
                  {testResults.map((tr) => (
                    <div key={tr.id} className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-mono ${tr.passed ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' : 'bg-red-500/5 border-red-500/10 text-red-400'}`}>
                      <div>
                        <p className="text-white/60">Input: <span className="text-white font-bold">{tr.input}</span></p>
                        <p className="mt-1">Expected: {tr.expected} | Got: {tr.actual}</p>
                      </div>
                      <div className="shrink-0 ml-4">
                        {tr.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right panel: Editor */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editor Console */}
            <div className="bg-[#13171d] border border-white/5 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-white/40">{language === 'javascript' ? 'JavaScript' : language === 'python' ? 'Python' : language === 'cpp' ? 'C++' : 'Java'} Console</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${language === 'javascript' ? 'bg-yellow-400' : language === 'python' ? 'bg-blue-400' : language === 'cpp' ? 'bg-cyan-400' : 'bg-orange-400'} animate-ping`} />
                    <span className="text-[10px] font-bold text-white/30 uppercase">{language === 'javascript' ? 'f is global' : language === 'python' ? 'def f(...)' : 'fn f(...)'}</span>
                  </div>
                </div>
                
                {/* Character telemetry tracker */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-white/30 uppercase">Current size (no spaces)</p>
                    <p className="text-2xl font-[900] text-purple-400 italic tracking-tighter">{charCount} <span className="text-[10px] font-black uppercase text-white/20">chars</span></p>
                  </div>
                  {allPassed && charCount <= botCharCount ? (
                    <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider">Beating Bot!</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Target: ≤{botCharCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="rounded-2xl overflow-hidden border border-white/5 min-h-[300px]">
                <Editor
                  height="300px"
                  language={language === 'cpp' ? 'cpp' : language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'gutter',
                    bracketPairColorization: { enabled: true },
                    tabSize: 2
                  }}
                />
              </div>

              {/* Play buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={runTests}
                  disabled={isRunning}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/5 active:scale-95 transition-all rounded-xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? 'Compiling...' : language === 'javascript' ? 'Run Unit Tests' : `Compile & Test (${language.toUpperCase()})`}
                </button>
                <button
                  onClick={submitSolution}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-600/20 active:scale-95 transition-all rounded-xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Submit Solution
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Elegant Outcome Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#13171d] border border-white/10 rounded-[35px] max-w-lg w-full p-10 relative overflow-hidden space-y-6 shadow-2xl text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-500" />
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Challenge <span className="text-purple-400">Completed!</span></h2>
              
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-3 max-w-sm mx-auto">
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>Your Code Size</span>
                  <span className="text-white font-black">{charCount} Chars</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>AI Rival Size</span>
                  <span className="text-blue-400 font-black">{botCharCount} Chars</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between text-sm font-black text-purple-400 uppercase tracking-wider">
                  <span>XP Gained</span>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              {/* Show Golf Champion badge unlock */}
              {unlockedBadges.includes('Golf Champion') && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center gap-3 text-yellow-400 max-w-sm mx-auto">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-black uppercase tracking-wider">New Badge Unlocked!</p>
                    <p className="font-bold text-yellow-400/60 mt-0.5">Golf Champion (Beated code under 60 chars)</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowOutcomeModal(false);
                  navigateTo('game-lobby');
                }}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                Return to Lobby
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default CodeGolf;
