import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { Play, RotateCcw, ChevronLeft, Terminal, CheckCircle2, XCircle, Layout } from 'lucide-react';
import { InterviewQuestion } from '@/api/questionBank';

const LANGUAGE_EXTENSIONS: Record<string, any> = {
  javascript: javascript({ jsx: true }),
  python: python(),
  cpp: cpp()
};

const DEFAULT_CODE: Record<string, string> = {
  javascript: 'function solve() {\n  // Write your code here\n  \n}\n\n// Test your solution\nconsole.log(solve());',
  python: 'def solve():\n    # Write your code here\n    pass\n\n# Test your solution\nprint(solve())',
  cpp: '#include <iostream>\nusing namespace std;\n\nvoid solve() {\n    // Write your code here\n}\n\nint main() {\n    solve();\n    return 0;\n}'
};

export const InteractivePlayground: React.FC = () => {
  const location = useLocation();
  const question = location.state?.question as InterviewQuestion | undefined;

  const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
  const [code, setCode] = useState(DEFAULT_CODE['javascript']);
  const [output, setOutput] = useState<string>('System initialized. Ready to execute code.');
  const [isRunning, setIsRunning] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');

  useEffect(() => {
    // If no question is provided via state, show a default message or handle it
    if (!question) {
      console.warn("No question loaded. Navigating to question bank might be needed.");
    }
  }, [question]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'javascript' | 'python' | 'cpp';
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    setOutput('System initialized. Ready to execute code.');
    setTestStatus('idle');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestStatus('running');
    setOutput('Executing in isolated container...\n');
    
    // Simulate execution delay
    setTimeout(() => {
      setIsRunning(false);
      
      // Extremely basic evaluation simulation for JavaScript only
      if (language === 'javascript') {
        try {
          // Note: using Function constructor is just for basic frontend simulation
          let logs: string[] = [];
          const mockConsole = {
            log: (...args: any[]) => logs.push(args.join(' ')),
            error: (...args: any[]) => logs.push('ERROR: ' + args.join(' ')),
            warn: (...args: any[]) => logs.push('WARN: ' + args.join(' '))
          };

          // Try to safely evaluate (Mockup purposes ONLY)
          const executionFn = new Function('console', `
            try {
              ${code}
            } catch(e) {
              console.error(e.message);
            }
          `);
          
          executionFn(mockConsole);
          
          if (logs.length > 0) {
            setOutput(logs.join('\n'));
            // Very naive check for success
            if (logs.some(l => l.includes('ERROR'))) setTestStatus('failed');
            else setTestStatus('success');
          } else {
            setOutput('Code executed successfully with no output.');
            setTestStatus('success');
          }
        } catch (err: any) {
          setOutput(`Execution Error:\n${err.message}`);
          setTestStatus('failed');
        }
      } else {
        // Mock success for other languages
        setOutput('Code executed successfully. (Simulated output for non-JS languages)');
        setTestStatus('success');
      }
    }, 1500);
  };

  const resetCode = () => {
    setCode(DEFAULT_CODE[language]);
    setOutput('System initialized. Ready to execute code.');
    setTestStatus('idle');
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center font-rubik text-center p-6">
        <Layout className="w-16 h-16 text-[#5ed29c] mb-6" />
        <h1 className="text-4xl font-[900] text-white uppercase italic tracking-tighter mb-4">No Question Selected</h1>
        <p className="text-white/40 mb-8 max-w-md">Please navigate to the Question Bank and select a question to solve in the playground.</p>
        <button 
          onClick={() => window.location.hash = 'question-bank'}
          className="px-8 py-4 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
        >
          Go to Question Bank
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0c10] font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      {/* Header */}
      <div className="h-20 shrink-0 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#5ed29c] bg-[#5ed29c]/10 px-2 py-0.5 rounded">
                {question.difficulty}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                {question.subSkill || 'General Coding'}
              </span>
            </div>
            <h1 className="text-lg font-[900] text-white italic tracking-tight">{question.question}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="appearance-none bg-[#0a0c10] border border-white/10 text-white text-xs font-bold uppercase tracking-widest pl-4 pr-10 py-3 rounded-xl focus:outline-none focus:border-[#5ed29c]/50 cursor-pointer"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-xl hover:bg-[#5ed29c]/90 transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <Play size={16} className="fill-black" />
            )}
            Run Code
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Question Details */}
        <div className="w-1/3 shrink-0 border-r border-white/5 bg-[#0a0c10] flex flex-col relative z-10">
          <div className="p-8 overflow-y-auto h-full space-y-8">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Problem Description</h2>
              <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed max-w-none">
                <p className="text-lg font-medium">{question.question}</p>
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-[#5ed29c]/10 rounded-3xl space-y-4">
              <h3 className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.4em]">Expected Resolution</h3>
              <p className="text-sm text-white/50 leading-relaxed italic border-l-2 border-[#5ed29c]/30 pl-4 py-1">
                {question.answer}
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor & Terminal */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          {/* Editor Area */}
          <div className="flex-1 relative">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={resetCode}
                className="p-2 bg-black/40 border border-white/10 rounded-lg text-white/40 hover:text-white hover:bg-black/60 transition-all backdrop-blur-sm"
                title="Reset Code"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <CodeMirror
              value={code}
              height="100%"
              theme={vscodeDark}
              extensions={[LANGUAGE_EXTENSIONS[language]]}
              onChange={(value) => setCode(value)}
              className="h-full text-base"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true
              }}
            />
          </div>

          {/* Terminal / Output Area */}
          <div className="h-64 shrink-0 bg-black border-t border-white/5 flex flex-col">
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-3 bg-[#0a0c10]">
              <Terminal size={14} className="text-white/40" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Console Output</span>
              
              {testStatus !== 'idle' && testStatus !== 'running' && (
                <div className={`ml-auto flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${testStatus === 'success' ? 'bg-[#5ed29c]/10 text-[#5ed29c]' : 'bg-red-500/10 text-red-500'}`}>
                  {testStatus === 'success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {testStatus === 'success' ? 'Execution Passed' : 'Execution Failed'}
                </div>
              )}
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Running tests...
                </div>
              ) : (
                <pre className={`whitespace-pre-wrap ${testStatus === 'failed' ? 'text-red-400' : 'text-[#5ed29c]/80'}`}>
                  {output}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
