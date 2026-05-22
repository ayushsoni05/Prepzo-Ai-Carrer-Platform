import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { Play, RotateCcw, ChevronLeft, CheckCircle2, XCircle, Layout, Info, Lightbulb, Building2, Send, ChevronDown } from 'lucide-react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { getCodingProblemById, CodingProblem } from '@/api/codingLab';

const LANGUAGE_EXTENSIONS: Record<string, any> = {
  javascript: javascript({ jsx: true }),
  python: python(),
  cpp: cpp(),
  java: java()
};

export const InteractivePlayground: React.FC = () => {
  const location = useLocation();

  // Extract ID from URL hash manually since App.tsx uses custom hash routing
  const hash = window.location.hash;
  const problemId = hash.includes('?id=') ? hash.split('?id=')[1].split('&')[0] : null;

  const [problem, setProblem] = useState<CodingProblem | null>(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');
  const [code, setCode] = useState('');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'testcases' | 'result'>('testcases');
  const [testResults, setTestResults] = useState<{ id: string, passed: boolean, output: string, expected: string, input: string, isHidden?: boolean }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            starterCode: { javascript: '// Write your solution here\\n', python: '# Write your solution here\\n', cpp: '// Write your solution here\\n', java: '// Write your solution here\\n' },
            testCases: []
          });
          setCode('// Write your solution here\\n');
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

    // Simulate network delay for container execution
    setTimeout(() => {
      if (isSubmit) setIsSubmitting(false);
      else setIsRunning(false);

      let testCasesToRun = problem.testCases;
      if (!isSubmit) {
        testCasesToRun = problem.testCases.filter(tc => !tc.isHidden);
      }

      if (language === 'javascript') {
        const results = testCasesToRun.map((tc) => {
          let outputStr = '';
          let passed = false;
          try {
            // Very naive execution for frontend mockup
            // We expect the user to have written a function, we will evaluate it and then call it
            // This is purely for demonstration purposes.
            const userCode = code;
            
            // For a real app, this would be sent to a sandboxed backend!
            // We are mocking execution by appending a call to the function based on the input
            // Assuming the function name is the first function definition found
            const funcNameMatch = userCode.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
            const varFuncNameMatch = userCode.match(/var\s+([a-zA-Z0-9_]+)\s*=\s*function/);
            
            let fnName = '';
            if (funcNameMatch) fnName = funcNameMatch[1];
            else if (varFuncNameMatch) fnName = varFuncNameMatch[1];

            if (fnName) {
              // Construct executable string: code + "\n return fnName(...input);"
              // Since input is a JSON string of arguments like '[ [2,7,11,15], 9 ]', we parse it and spread it
              const executionFn = new Function(`
                ${userCode}
                try {
                  const args = JSON.parse('${tc.input}');
                  const res = ${fnName}(...args);
                  return JSON.stringify(res);
                } catch(e) {
                  return "Error: " + e.message;
                }
              `);
              
              outputStr = executionFn();
              
              // Remove whitespace for comparison
              passed = outputStr?.replace(/\\s+/g, '') === tc.expectedOutput.replace(/\\s+/g, '');
            } else {
              outputStr = 'Error: Could not find function definition to execute.';
            }
          } catch (err: any) {
            outputStr = `Execution Error: ${err.message}`;
          }

          return {
            id: tc.id,
            input: tc.input,
            expected: tc.expectedOutput,
            output: outputStr || 'undefined',
            passed,
            isHidden: tc.isHidden
          };
        });
        
        setTestResults(results);

        if (isSubmit && results.every(r => r.passed)) {
          const solved = JSON.parse(localStorage.getItem('coding-lab-solved') || '[]');
          if (!solved.includes(problem.id)) {
            solved.push(problem.id);
            localStorage.setItem('coding-lab-solved', JSON.stringify(solved));
          }
        }
      } else {
        // Mock non-JS languages
        const results = testCasesToRun.map(tc => ({
          id: tc.id,
          input: tc.input,
          expected: tc.expectedOutput,
          output: tc.expectedOutput, // Mock success
          passed: true,
          isHidden: tc.isHidden
        }));
        setTestResults(results);

        if (isSubmit && results.every(r => r.passed)) {
          const solved = JSON.parse(localStorage.getItem('coding-lab-solved') || '[]');
          if (!solved.includes(problem.id)) {
            solved.push(problem.id);
            localStorage.setItem('coding-lab-solved', JSON.stringify(solved));
          }
        }
      }
    }, 1500);
  };

  if (loading) {
    return <div className="h-screen bg-[#0a0c10] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#5ed29c] border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center font-rubik text-center p-6">
        <Layout className="w-16 h-16 text-[#5ed29c] mb-6" />
        <h1 className="text-4xl font-[900] text-white uppercase italic tracking-tighter mb-4">Problem Not Found</h1>
        <button onClick={() => window.location.hash = 'coding-lab'} className="px-8 py-4 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform">Return to Hub</button>
      </div>
    );
  }

  const allPassed = testResults && testResults.every(r => r.passed);

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0c10] font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-white/5 bg-black flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.hash = 'coding-lab'} className="text-white/40 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-[900] text-white italic tracking-tight">{problem.title}</h1>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
              problem.difficulty === 'Easy' ? 'text-green-400 bg-green-400/10' :
              problem.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
              'text-red-400 bg-red-400/10'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => executeCode(false)}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white/70 font-[900] text-[10px] uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all disabled:opacity-50"
          >
            {isRunning ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Play size={12} />}
            Run
          </button>
          <button
            onClick={() => executeCode(true)}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-[#5ed29c] text-black font-[900] text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#5ed29c]/90 transition-all disabled:opacity-50"
          >
            {isSubmitting ? <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Send size={12} />}
            Submit
          </button>
        </div>
      </div>

      {/* Main Resizable Area */}
      <div className="flex-1 overflow-hidden p-2">
        <PanelGroup orientation="horizontal" className="h-full rounded-2xl overflow-hidden border border-white/5 bg-black">
          {/* Left Panel: Description */}
          <Panel defaultSize={35} minSize={25} className="bg-[#0a0c10] flex flex-col">
            <div className="h-12 border-b border-white/5 flex items-center px-4 bg-white/[0.02]">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] flex items-center gap-2">
                <Info size={14} /> Description
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
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
          </Panel>

          <PanelResizeHandle className="w-1 bg-white/5 hover:bg-[#5ed29c]/50 transition-colors cursor-col-resize" />

          {/* Right Panel Group: Editor + Terminal */}
          <Panel defaultSize={65}>
            <PanelGroup orientation="vertical">
              {/* Editor Pane */}
              <Panel defaultSize={60} minSize={30} className="bg-[#1e1e1e] flex flex-col relative">
                <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-[#1e1e1e]">
                  <div className="relative">
                    <button 
                      onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all text-white/70 text-xs font-bold uppercase tracking-widest"
                    >
                      {language === 'cpp' ? 'C++' : language} <ChevronDown size={14} className={`transition-transform \${languageDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {languageDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setLanguageDropdownOpen(false)} />
                        <div className="absolute top-full left-0 mt-2 w-32 bg-[#13171d] border border-[#5ed29c]/20 rounded-xl shadow-2xl shadow-black overflow-hidden z-50 py-1 backdrop-blur-xl">
                          {(['javascript', 'python', 'cpp', 'java'] as const).map((l) => (
                            <button
                              key={l}
                              onClick={() => handleLanguageChange(l)}
                              className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#5ed29c]/10 transition-colors \${language === l ? 'text-[#5ed29c] bg-[#5ed29c]/5' : 'text-white/60 hover:text-white'}`}
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
                <div className="flex-1 overflow-hidden">
                  <CodeMirror
                    value={code}
                    height="100%"
                    theme={vscodeDark}
                    extensions={[LANGUAGE_EXTENSIONS[language]]}
                    onChange={(value) => setCode(value)}
                    className="h-full text-sm"
                    basicSetup={{
                      lineNumbers: true,
                      foldGutter: true,
                      highlightActiveLine: true
                    }}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-white/5 hover:bg-[#5ed29c]/50 transition-colors cursor-row-resize" />

              {/* Terminal Pane */}
              <Panel defaultSize={40} minSize={20} className="bg-[#0a0c10] flex flex-col">
                <div className="h-10 border-b border-white/5 flex items-center px-2 bg-white/[0.02]">
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

                <div className="flex-1 overflow-y-auto p-4">
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
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default InteractivePlayground;
