import { navigateTo } from '@/utils/navigation';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { Play, RotateCcw, ChevronLeft, CheckCircle2, XCircle, Layout, Info, Lightbulb, Building2, Send, ChevronDown, Code, Terminal } from 'lucide-react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { getCodingProblemById, CodingProblem } from '@/api/codingLab';
import { generateTranspiledPayload } from '../utils/generateTranspiledPayload';
import { SubmissionsTab, Submission } from '../components/SubmissionsTab';
import { createSubmission, getSubmissionsByProblem } from '../api/submissions';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { AlgorithmVisualizer } from '../components/visualizer/AlgorithmVisualizer';

const LANGUAGE_EXTENSIONS: Record<string, any> = {
  javascript: javascript({ jsx: true }),
  python: python(),
  cpp: cpp(),
  java: java()
};

export const InteractivePlayground: React.FC = () => {
  const location = useLocation();

  // Extract ID from URL query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const problemId = searchParams.get('id');

  const [problem, setProblem] = useState<CodingProblem | null>(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [code, setCode] = useState('');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  
  const [leftActiveTab, setLeftActiveTab] = useState<'description' | 'submissions' | 'visualize'>('description');
  const [activeTab, setActiveTab] = useState<'testcases' | 'result'>('testcases');
  const [testResults, setTestResults] = useState<{ id: string, passed: boolean, output: string, expected: string, input: string, isHidden?: boolean }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  // Mobile navigation states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileTab, setMobileTab] = useState<'description' | 'editor' | 'console'>('description');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (problemId && leftActiveTab === 'submissions') {
      setLoadingSubmissions(true);
      getSubmissionsByProblem(problemId)
        .then(data => setSubmissions(data))
        .catch(err => console.error(err))
        .finally(() => setLoadingSubmissions(false));
    }
  }, [problemId, leftActiveTab]);

  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemId) {
        // Fallback: check if we navigated here from Question Bank with state
        const stateQuestion = location.state?.question;
        if (stateQuestion) {
          setProblem({
            id: stateQuestion._id || 'custom-question',
            title: stateQuestion.skill || 'Technical Question',
            description: stateQuestion.question,
            difficulty: ['advanced', 'hard'].includes(stateQuestion.difficulty?.toLowerCase()) ? 'Hard' : ['intermediate', 'medium'].includes(stateQuestion.difficulty?.toLowerCase()) ? 'Medium' : 'Easy',
            acceptanceRate: 100,
            companyTags: ['Practice'],
            hints: [stateQuestion.answer],
            starterCode: { javascript: '// Write your solution here\n', python: '# Write your solution here\n', cpp: '// Write your solution here\n', java: '// Write your solution here\n' },
            testCases: []
          });
          setCode('// Write your solution here\n');
        }
        setLoading(false);
        return;
      }
      try {
        const data = await getCodingProblemById(problemId);
        if (data) {
          setProblem(data);
          setCode(data.starterCode[language]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId, language]);

  const handleLanguageChange = (lang: 'javascript' | 'python' | 'cpp' | 'java') => {
    setLanguage(lang);
    setTestResults(null);
    setLanguageDropdownOpen(false);
    if (problem) {
      setCode(problem.starterCode[lang]);
    }
  };

  const executeCode = async (isSubmit: boolean) => {
    if (!problem) return;
    
    if (isSubmit) setIsSubmitting(true);
    else setIsRunning(true);
    
    setActiveTab('result');
    setTestResults(null);

    // Switch to console tab on mobile to display the run feedback immediately
    if (isMobile) {
      setMobileTab('console');
    }

    // Give UI time to show loading state
    setTimeout(async () => {
      let testCasesToRun = problem.testCases;
      if (!isSubmit) {
        testCasesToRun = problem.testCases.filter(tc => !tc.isHidden);
      }

      try {
        const wrapperCode = generateTranspiledPayload(language, code, testCasesToRun);

        // Judge0 Language IDs
        const langMap: Record<string, number> = {
          javascript: 63,
          python: 71,
          cpp: 54,
          java: 62
        };

        const res = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language_id: langMap[language] || 63,
            source_code: wrapperCode
          })
        });
        
        const data = await res.json();
        
        let output = 'Error executing code';
        if (data.stdout) output = data.stdout;
        else if (data.stderr) output = data.stderr;
        else if (data.compile_output) output = data.compile_output;
        else if (data.message) output = data.message;
        
        // Parse output
        const outputs = output.split('---SPLIT---').slice(1).map((s: string) => s.trim());
        
        const results = testCasesToRun.map((tc, idx) => {
          // If outputs is empty, it means the code crashed (compilation error, syntax error, etc.)
          // before reaching the execution loop. In this case, we output the raw error message.
          const outStr = outputs.length > 0 ? (outputs[idx] || 'undefined') : output.trim();
          const passed = outputs.length > 0 && outStr.replace(/\s+/g, '') === tc.expectedOutput.replace(/\s+/g, '');
          
          return {
            id: tc.id,
            input: tc.input,
            expected: tc.expectedOutput,
            output: outStr,
            passed,
            isHidden: tc.isHidden
          };
        });
        
        setTestResults(results);
        if (isSubmit) {
          const testCasesPassed = results.filter(r => r.passed).length;
          const status = results.every(r => r.passed) ? 'Accepted' : 'Wrong Answer';
          
          try {
            const submitResponse = await createSubmission({
              problemId: problem.id,
              language,
              code,
              status,
              testCasesPassed,
              totalTestCases: testCasesToRun.length,
              difficulty: problem.difficulty
            });

            // Fire intense confetti on Accepted
            if (status === 'Accepted') {
              const duration = 3 * 1000;
              const animationEnd = Date.now() + duration;
              const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
              
              const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
              
              const interval: any = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                  return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
              }, 250);
            }

            // Handle Gamification popups
            if (submitResponse?.gamification) {
              const g = submitResponse.gamification;
              toast.success(`+${g.xpGained} XP Earned! Total: ${g.newTotalXp} XP`);
              if (g.newStreak > 1) {
                toast(`🔥 ${g.newStreak} Day Streak! Keep it up!`, { icon: '🔥' });
              }
              if (g.newBadges && g.newBadges.length > 0) {
                g.newBadges.forEach((b: string) => {
                  toast(`🏆 Badge Unlocked: ${b}!`, { icon: '🏆' });
                });
              }
            }
          } catch(e) {
            console.error('Failed to save submission', e);
          }

          if (results.every(r => r.passed)) {
            const solved = JSON.parse(localStorage.getItem('coding-lab-solved') || '[]');
            if (!solved.includes(problem.id)) {
              solved.push(problem.id);
              localStorage.setItem('coding-lab-solved', JSON.stringify(solved));
            }
          }
        }

      } catch (err: any) {
        console.error(err);
        setTestResults(testCasesToRun.map(tc => ({
          id: tc.id, input: tc.input, expected: tc.expectedOutput, output: 'Compiler Offline / API Error', passed: false, isHidden: tc.isHidden
        })));
      } finally {
        if (isSubmit) setIsSubmitting(false);
        else setIsRunning(false);
      }
    }, 500);
  };

  if (loading) {
    return <div className="h-screen bg-[#0a0c10] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#5ed29c] border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center font-rubik text-center p-6">
        <Layout className="w-16 h-16 text-[#5ed29c] mb-6" />
        <h1 className="text-4xl font-[900] text-white uppercase italic tracking-tighter mb-4">Problem Not Found</h1>
        <button onClick={() => navigateTo('coding-lab')} className="px-8 py-4 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform">Return to Hub</button>
      </div>
    );
  }

  const allPassed = testResults && testResults.every(r => r.passed);

  // Reusable sub-containers
  const leftPanelContent = (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0c10]">
      <div className="h-10 border-b border-white/5 flex items-center px-2 bg-white/[0.02] shrink-0">
        <button 
          onClick={() => setLeftActiveTab('description')}
          className={`px-4 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${leftActiveTab === 'description' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40 hover:text-white/70'}`}
        >
          <Info size={14} /> Description
        </button>
        <button 
          onClick={() => setLeftActiveTab('submissions')}
          className={`px-4 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${leftActiveTab === 'submissions' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40 hover:text-white/70'}`}
        >
          Submissions
        </button>
        <button 
          onClick={() => setLeftActiveTab('visualize')}
          className={`px-4 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${leftActiveTab === 'visualize' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40 hover:text-white/70'}`}
        >
          Visualize
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {leftActiveTab === 'description' && (
          <div className="space-y-8 p-2">
            <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-code:text-[#5ed29c]">
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            </div>
        
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                <Building2 size={14} /> Company Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.companyTags.map(tag => (
                  <span key={tag} className="text-[9px] font-black text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {problem.hints.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Lightbulb size={14} /> Hints
                </h3>
                <div className="space-y-2">
                  {problem.hints.map((hint, i) => (
                    <div key={i} className="p-3 bg-[#5ed29c]/5 border border-[#5ed29c]/10 rounded-lg text-sm text-[#5ed29c]/80 italic">
                      {hint}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {leftActiveTab === 'submissions' && (
          <div className="h-full -m-4">
            <SubmissionsTab submissions={submissions} loading={loadingSubmissions} />
          </div>
        )}

        {leftActiveTab === 'visualize' && (
          <div className="h-full -m-4">
            <AlgorithmVisualizer problemText={problem.description} problemId={problem.id} />
          </div>
        )}
      </div>
    </div>
  );

  const editorContent = (
    <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e] relative">
      <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-[#1e1e1e] shrink-0">
        <div className="relative">
          <button 
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all text-white/70 text-xs font-bold uppercase tracking-widest"
          >
            {language === 'cpp' ? 'C++' : language} <ChevronDown size={14} className={`transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {languageDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLanguageDropdownOpen(false)} />
              <div className="absolute top-full left-0 mt-2 w-32 bg-[#13171d] border border-[#5ed29c]/20 rounded-xl shadow-2xl shadow-black overflow-hidden z-50 py-1 backdrop-blur-xl">
                {(['javascript', 'python', 'cpp', 'java'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#5ed29c]/10 transition-colors ${language === l ? 'text-[#5ed29c] bg-[#5ed29c]/5' : 'text-white/60 hover:text-white'}`}
                  >
                    {l === 'cpp' ? 'C++' : l}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button onClick={() => setCode(problem.starterCode[language])} className="text-white/30 hover:text-white" title="Reset Code">
          <RotateCcw size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-hidden relative min-h-0">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={[LANGUAGE_EXTENSIONS[language]]}
          onChange={(value) => setCode(value)}
          className="h-full text-sm absolute inset-0"
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true
          }}
        />
      </div>
    </div>
  );

  const consoleContent = (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0c10]">
      <div className="h-10 border-b border-white/5 flex items-center px-2 bg-white/[0.02] shrink-0">
        <button 
          onClick={() => setActiveTab('testcases')}
          className={`px-4 h-full text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'testcases' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40 hover:text-white/70'}`}
        >
          Testcases
        </button>
        <button 
          onClick={() => setActiveTab('result')}
          className={`px-4 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'result' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40 hover:text-white/70'}`}
        >
          Test Result
          {testResults && (
            allPassed ? <CheckCircle2 size={12} className="text-green-500" /> : <XCircle size={12} className="text-red-500" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {activeTab === 'testcases' && (
          <div className="space-y-4">
            {problem.testCases.filter(tc => !tc.isHidden).map((tc, idx) => (
              <div key={tc.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] font-black text-white/30 uppercase mb-2 tracking-widest">Case {idx + 1}</p>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2 bg-black/50 rounded text-white/70">
                    <span className="text-white/30 select-none">Input: </span> {tc.input}
                  </div>
                  <div className="p-2 bg-black/50 rounded text-white/70">
                    <span className="text-white/30 select-none">Expected: </span> {tc.expectedOutput}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'result' && (
          <div className="space-y-4">
            {isRunning || isSubmitting ? (
              <div className="flex items-center gap-3 text-[#5ed29c] animate-pulse p-4">
                <div className="w-4 h-4 border-2 border-[#5ed29c]/30 border-t-[#5ed29c] rounded-full animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest">Evaluating...</span>
              </div>
            ) : !testResults ? (
              <div className="text-white/30 text-xs italic p-4">Run or Submit code to see results.</div>
            ) : (
              <>
                <h3 className={`text-xl font-bold italic mb-4 ${allPassed ? 'text-green-500' : 'text-red-500'}`}>
                  {allPassed ? 'Accepted' : 'Wrong Answer'}
                </h3>
                {testResults.map((res, idx) => (
                  <div key={res.id} className={`p-4 rounded-xl border ${res.passed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {res.passed ? <CheckCircle2 size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                        {res.isHidden ? 'Hidden Test Case' : `Case ${idx + 1}`}
                      </span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="p-2 bg-black/50 rounded text-white/70">
                        <span className="text-white/30 select-none">Input: </span> {res.isHidden ? <span className="italic text-white/40">Hidden...</span> : res.input}
                      </div>
                      <div className="p-2 bg-black/50 rounded text-white/70">
                        <span className="text-white/30 select-none">Output: </span> <span className={res.passed ? 'text-green-400' : 'text-red-400'}>{res.isHidden ? <span className="italic text-white/40">Hidden...</span> : res.output}</span>
                      </div>
                      {!res.passed && (
                        <div className="p-2 bg-black/50 rounded text-white/70">
                          <span className="text-white/30 select-none">Expected: </span> <span className="text-green-400">{res.isHidden ? <span className="italic text-white/40">Hidden...</span> : res.expected}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0c10] font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-white/5 bg-black flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button onClick={() => navigateTo('coding-lab')} className="text-white/40 hover:text-white transition-colors shrink-0">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h1 className="text-xs sm:text-sm font-[900] text-white italic tracking-tight truncate max-w-[120px] sm:max-w-[240px] md:max-w-none">
              {problem.title}
            </h1>
            <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ${
              problem.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
              problem.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
              'text-red-400 bg-red-400/10'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => executeCode(false)}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/5 text-white/70 font-[900] text-[9px] sm:text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isRunning ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play size={12} />}
            Run
          </button>
          <button
            onClick={() => executeCode(true)}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#5ed29c] text-black font-[900] text-[9px] sm:text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#5ed29c]/90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Send size={12} />}
            Submit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden p-2 min-h-0 flex flex-col">
        {isMobile ? (
          <div className="flex-1 flex flex-col min-h-0 bg-black rounded-2xl border border-white/5 overflow-hidden">
            {/* Mobile Tab Switcher */}
            <div className="h-12 border-b border-white/5 flex bg-white/[0.01] shrink-0">
              <button 
                onClick={() => setMobileTab('description')}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${mobileTab === 'description' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40'}`}
              >
                <Info size={12} /> Description
              </button>
              <button 
                onClick={() => setMobileTab('editor')}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${mobileTab === 'editor' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40'}`}
              >
                <Code size={12} /> Editor
              </button>
              <button 
                onClick={() => setMobileTab('console')}
                className={`flex-1 h-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${mobileTab === 'console' ? 'text-[#5ed29c] border-b-2 border-[#5ed29c]' : 'text-white/40'}`}
              >
                <Terminal size={12} /> Console
              </button>
            </div>
            
            {/* Mobile Active Tab Content */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
              {mobileTab === 'description' && leftPanelContent}
              {mobileTab === 'editor' && editorContent}
              {mobileTab === 'console' && consoleContent}
            </div>
          </div>
        ) : (
          <PanelGroup orientation="horizontal" className="h-full rounded-2xl overflow-hidden border border-white/5 bg-black">
            {/* Left Panel: Description & Submissions */}
            <Panel defaultSize={35} minSize={25} className="bg-[#0a0c10] flex flex-col">
              {leftPanelContent}
            </Panel>

            <PanelResizeHandle className="w-1 bg-white/5 hover:bg-[#5ed29c]/50 transition-colors cursor-col-resize shrink-0" />

            {/* Right Panel Group: Editor + Terminal */}
            <Panel defaultSize={65} className="flex flex-col">
              <PanelGroup orientation="vertical">
                {/* Editor Pane */}
                <Panel defaultSize={60} minSize={30} className="bg-[#1e1e1e] flex flex-col relative">
                  {editorContent}
                </Panel>

                <PanelResizeHandle className="h-1 bg-white/5 hover:bg-[#5ed29c]/50 transition-colors cursor-row-resize shrink-0" />

                {/* Terminal Pane */}
                <Panel defaultSize={40} minSize={20} className="bg-[#0a0c10] flex flex-col">
                  {consoleContent}
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        )}
      </div>
    </div>
  );
};

export default InteractivePlayground;
