import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  Play,
  Loader2,
  Mic,
  MicOff,
  Send,
  Brain,
  Cpu,
  ChevronLeft,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { navigateTo } from '@/utils/navigation';
import { useSpeech } from '@/hooks/useSpeech';
import { useAuthStore } from '@/store/authStore';
import { codingProblems, CodingProblem } from '@/api/codingLab';
import {
  startShadowInterview,
  sendShadowInterviewMessage,
  completeShadowInterview,
  ShadowInterviewSession
} from '@/api/shadowInterview';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ShadowInterview: React.FC = () => {
  const { speak, startListening, stopListening, isListening, transcript, isSpeaking } = useSpeech();
  // Session initialized below

  // Lobby state
  const [inLobby, setInLobby] = useState(true);
  const [selectedProblemId, setSelectedProblemId] = useState('two-sum');
  const [selectedRecruiter, setSelectedRecruiter] = useState<'heather' | 'fred'>('fred');
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript');

  // Active Session state
  const [session, setSession] = useState<ShadowInterviewSession | null>(null);
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [code, setCode] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessingStep, setIsProcessingStep] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  
  // Real-time metrics and coaching
  const [coachingTip, setCoachingTip] = useState<string>('Explain your logic out loud before writing code.');
  const [currentEval, setCurrentEval] = useState<any>({ correctness: 'pending', timeComplexity: 'N/A', spaceComplexity: 'N/A' });
  const [showScorecard, setShowScorecard] = useState(false);

  // Chat container ref for scrolling
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.conversationHistory]);

  // lobby details derived dynamically

  // Commencement
  const handleCommence = async () => {
    try {
      const startData = await startShadowInterview(selectedProblemId, selectedRecruiter);
      setSession(startData.session);
      setActiveProblem(startData.problem);
      
      // Load starter code
      const starter = startData.problem.starterCode[selectedLanguage] || '// Write your solution here\n';
      setCode(starter);

      setInLobby(false);

      // Play greeting
      const greeting = startData.session.conversationHistory[0]?.text || '';
      if (greeting && !isMuted) {
        speak(greeting);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to initialize shadow interview.');
    }
  };

  // Speech Recognition Sync
  const [speechBuffer, setSpeechBuffer] = useState('');
  useEffect(() => {
    if (transcript) {
      setSpeechBuffer(transcript);
    }
  }, [transcript]);

  // Handle message transmission
  const handleSendMessage = async () => {
    if (!session || isProcessingStep) return;

    const messageContent = isTypingMode ? textInput : speechBuffer;
    if (!messageContent.trim()) {
      toast.error('Please say or type something first.');
      return;
    }

    if (isListening) stopListening();

    setIsProcessingStep(true);
    setTextInput('');
    setSpeechBuffer('');

    try {
      const stepData = await sendShadowInterviewMessage(session._id!, messageContent, code);
      setSession(stepData.session);
      setCoachingTip(stepData.coachingTip);
      setCurrentEval(stepData.evaluation);

      // Play recruiter voice response
      const nextMessage = stepData.session.conversationHistory[stepData.session.conversationHistory.length - 1]?.text;
      if (nextMessage && !isMuted) {
        speak(nextMessage, () => {
          // Restart listening automatically after speaking if not typing mode
          if (!isTypingMode) {
            startListening();
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit step explanation.');
    } finally {
      setIsProcessingStep(false);
    }
  };

  // Complete Interview & Run Evaluation
  const handleCompleteInterview = async () => {
    if (!session) return;
    setIsFinishing(true);

    if (isListening) stopListening();

    try {
      const finalSession = await completeShadowInterview(session._id!, code);
      setSession(finalSession);
      setShowScorecard(true);
    } catch (error) {
      console.error(error);
      toast.error('Failed to complete interview audit.');
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0c10] text-white overflow-hidden font-rubik">
      
      {/* ── LOBBY MODE ── */}
      <AnimatePresence>
        {inLobby && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#0a0c10] flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            {/* Header */}
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-12">
              <button 
                onClick={() => navigateTo('coding-lab')}
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
              >
                <ChevronLeft size={16} /> Back to Lab
              </button>
              <div className="flex items-center gap-3">
                <Cpu size={16} className="text-emerald-400" />
                <h1 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">AI Technical Sandbox</h1>
              </div>
            </div>

            {/* Selection Grid */}
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 my-auto">
              
              {/* Left Side: Setup */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] italic">Voice Sandbox</span>
                  <h1 className="text-4xl md:text-6xl font-[900] uppercase tracking-tighter italic leading-none mt-2">
                    Shadow <span className="text-white/20">Recruiter.</span>
                  </h1>
                  <p className="text-white/40 text-sm mt-4 italic max-w-lg">
                    Simulate real-time whiteboarding and coding interviews. Write code in the editor while verbally walking through your solutions. The AI Recruiter will ask follow-up questions and evaluate your technical correctness alongside your communication style.
                  </p>
                </div>

                {/* Form Controls */}
                <div className="space-y-6">
                  {/* Select Problem */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Select Coding Challenge</label>
                    <Select
                      value={selectedProblemId}
                      onValueChange={(value) => setSelectedProblemId(value)}
                    >
                      <SelectTrigger className="w-full px-5 py-6 bg-[#161a20] border border-white/5 rounded-2xl text-white font-medium focus:border-emerald-500/30 outline-none transition-all cursor-pointer h-auto">
                        <SelectValue placeholder="Select Coding Challenge" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#161a20] border border-white/5 rounded-2xl text-white shadow-2xl">
                        {codingProblems.map(p => (
                          <SelectItem key={p.id} value={p.id} className="py-3 focus:bg-emerald-500/10 focus:text-emerald-400">
                            {p.title} ({p.difficulty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Programming Language</label>
                    <div className="grid grid-cols-4 gap-3">
                      {(['javascript', 'python', 'cpp', 'java'] as const).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`py-3 px-4 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all
                            ${selectedLanguage === lang 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/5' 
                              : 'bg-[#161a20] border-white/5 hover:bg-white/5 text-white/60 hover:text-white'
                            }`}
                        >
                          {lang === 'cpp' ? 'C++' : lang}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Recruiter Deck */}
              <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-[40px] bg-black border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Brain size={120} className="text-emerald-500" />
                </div>
                
                <div className="space-y-6 relative z-10">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Select Interview Personality</label>
                  
                  {/* Option Fred */}
                  <div 
                    onClick={() => setSelectedRecruiter('fred')}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300
                      ${selectedRecruiter === 'fred'
                        ? 'bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]'
                        : 'bg-[#161a20]/40 border-white/5 hover:border-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-emerald-400">
                        FF
                      </div>
                      <div>
                        <h4 className="font-[900] text-lg">Flexible Fred</h4>
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Normal Difficulty</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-3 italic leading-relaxed">
                      "Warm, collaborative startup lead. Focuses on logical thinking and offers hints if you get stuck."
                    </p>
                  </div>

                  {/* Option Heather */}
                  <div 
                    onClick={() => setSelectedRecruiter('heather')}
                    className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300
                      ${selectedRecruiter === 'heather'
                        ? 'bg-red-500/5 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)]'
                        : 'bg-[#161a20]/40 border-white/5 hover:border-white/10'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg text-red-400">
                        HH
                      </div>
                      <div>
                        <h4 className="font-[900] text-lg">Hardball Heather</h4>
                        <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Hard Difficulty</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-3 italic leading-relaxed">
                      "Strict, elite tech manager. Demands optimal complexity, handles corner cases aggressively, and probes code defects."
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCommence}
                  className="w-full mt-10 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 border border-emerald-400/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-3"
                >
                  <Play size={16} fill="white" /> Commence Technical Duel
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN INTERACTIVE RUNNING ENVIRONMENT ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Section: Monaco Code Editor + Problem Details */}
        <div className="flex-1 flex flex-col border-r border-white/5 bg-[#0a0c10]">
          
          {/* Editor Header Bar */}
          <div className="h-16 shrink-0 border-b border-white/5 px-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setInLobby(true)} 
                className="text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <h2 className="font-[900] text-lg uppercase italic tracking-tighter">
                {activeProblem?.title || 'Coding Challenge'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-emerald-400">
              <Cpu size={12} /> {selectedLanguage === 'cpp' ? 'C++' : selectedLanguage} Mode
            </div>
          </div>

          {/* Problem description panel / Monaco editor */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Description Tab */}
            <div className="w-full md:w-80 border-r border-white/5 flex flex-col overflow-y-auto p-6 space-y-6 bg-black/40">
              <div>
                <span className="text-[9px] font-black text-[#5ed29c] uppercase tracking-widest bg-[#5ed29c]/10 border border-[#5ed29c]/20 px-2.5 py-1 rounded-md">
                  {activeProblem?.difficulty || 'Easy'}
                </span>
                <h3 className="text-xl font-[900] text-white uppercase italic tracking-tighter mt-3">Problem Statement</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed font-medium whitespace-pre-wrap">
                {activeProblem?.description}
              </p>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col relative bg-[#13171d]">
              <Editor
                height="100%"
                language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'java' ? 'java' : selectedLanguage}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  cursorBlinking: 'smooth',
                  padding: { top: 16 },
                  scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section: AI Recruiter Console + Spoken dialogue */}
        <div className="w-full md:w-[480px] shrink-0 flex flex-col bg-[#0d0f14] relative border-l border-white/5">
          
          {/* Recruiter HUD Header */}
          <div className="h-16 shrink-0 border-b border-white/5 px-6 flex items-center justify-between bg-black/35 z-20">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-500 animate-ping' : 'bg-white/20'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Recruiter Dialogue</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="p-2 bg-white/5 border border-white/5 rounded-xl text-white/60 hover:text-white transition-colors"
                title={isMuted ? 'Unmute AI voice' : 'Mute AI voice'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button
                onClick={handleCompleteInterview}
                disabled={isFinishing}
                className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-[#5ed29c] transition-all font-black text-[10px] uppercase tracking-widest rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/5 disabled:opacity-50"
              >
                {isFinishing && <Loader2 size={10} className="animate-spin" />}
                Complete Duel
              </button>
            </div>
          </div>

          {/* Chat transcript feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/10">
            {session?.conversationHistory.map((h, i) => (
              <div key={i} className={`flex flex-col ${h.sender === 'candidate' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/30">
                    {h.sender === 'candidate' ? 'You' : session.recruiterPersonality === 'heather' ? 'Heather (AI)' : 'Fred (AI)'}
                  </span>
                </div>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium leading-relaxed
                  ${h.sender === 'candidate' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 rounded-tr-none' 
                    : 'bg-[#161a20] border border-white/5 text-white/80 rounded-tl-none'
                  }`}
                >
                  {h.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Coach insights / Complexity HUD */}
          <div className="px-6 py-4 bg-black/40 border-t border-white/5 space-y-4">
            {/* Complexity Stats */}
            <div className="grid grid-cols-3 gap-2 bg-[#13171d] p-3 rounded-2xl border border-white/5">
              <div className="text-center border-r border-white/5">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Correctness</span>
                <span className="text-xs font-black uppercase text-emerald-400 mt-1 block tracking-wider">{currentEval.correctness}</span>
              </div>
              <div className="text-center border-r border-white/5">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Time Complexity</span>
                <span className="text-xs font-black uppercase text-indigo-400 mt-1 block tracking-wider">{currentEval.timeComplexity}</span>
              </div>
              <div className="text-center">
                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Space Complexity</span>
                <span className="text-xs font-black uppercase text-purple-400 mt-1 block tracking-wider">{currentEval.spaceComplexity}</span>
              </div>
            </div>

            {/* AI Coach Suggestion */}
            <div className="bg-[#5ed29c]/5 border border-[#5ed29c]/20 p-4 rounded-3xl flex items-start gap-3 relative overflow-hidden">
              <div className="p-2 bg-[#5ed29c]/10 rounded-xl text-[#5ed29c] shrink-0">
                <Brain size={14} />
              </div>
              <div>
                <h5 className="text-[9px] font-black text-[#5ed29c] uppercase tracking-widest block">Prepzo AI Coach</h5>
                <p className="text-xs text-white/70 mt-1 leading-relaxed font-medium italic">"{coachingTip}"</p>
              </div>
            </div>
          </div>

          {/* Input Panel (Wave visualizer, recording options) */}
          <div className="p-6 bg-[#13171d] border-t border-white/5 space-y-4 shrink-0">
            {/* Audio Waveform Animation (Simulated) */}
            <div className="h-10 flex items-center justify-center gap-1.5 bg-black/35 rounded-2xl border border-white/5 relative overflow-hidden">
              {isSpeaking || isListening ? (
                Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-full ${isListening ? 'bg-emerald-400' : 'bg-indigo-400'}`}
                    animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                    transition={{ repeat: Infinity, duration: 0.8 + i * 0.05, ease: 'easeInOut' }}
                  />
                ))
              ) : (
                <span className="text-[10px] font-black text-white/25 uppercase tracking-widest">Awaiting voice transmission...</span>
              )}
            </div>

            {/* Subtitles text overlay of what is being recorded */}
            {!isTypingMode && speechBuffer && (
              <p className="text-xs text-[#5ed29c] font-black tracking-tight italic bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 animate-pulse">
                Recording: "{speechBuffer}"
              </p>
            )}

            {/* Dynamic Controls */}
            <div className="flex gap-4 items-center">
              {isTypingMode ? (
                <div className="flex-1 flex gap-2 relative group">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your explanation here..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-4 bg-black border border-white/5 rounded-2xl text-sm text-white focus:border-emerald-500/30 outline-none transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessingStep}
                    className="p-4 bg-emerald-500 text-[#0a0c10] border border-emerald-400/20 rounded-2xl hover:bg-emerald-400 transition-colors flex items-center justify-center shrink-0 disabled:opacity-50"
                  >
                    {isProcessingStep ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    disabled={isProcessingStep}
                    className={`flex-1 py-4 px-6 rounded-2xl border font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2
                      ${isListening 
                        ? 'bg-red-500/10 border-red-500/30 text-red-500 shadow-lg shadow-red-500/5 animate-pulse'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-[#5ed29c] hover:bg-emerald-500/20'
                      }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={14} /> Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic size={14} /> Tap to Talk
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={isProcessingStep || !speechBuffer.trim()}
                    className="px-6 py-4 bg-[#5ed29c] text-black border border-[#5ed29c]/20 hover:bg-[#5ed29c]/80 transition-all font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isProcessingStep ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={12} /> Send Pitch
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Toggle Modes */}
            <div className="flex justify-between items-center px-1">
              <button
                onClick={() => setIsTypingMode(!isTypingMode)}
                className="text-[9px] font-black text-white/30 hover:text-white transition-colors uppercase tracking-widest italic"
              >
                {isTypingMode ? 'Use Voice Input' : 'Type Response Instead'}
              </button>
              <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                WPM: {session?.speechMetrics?.wordsPerMinute || 0} • Fillers: {session?.speechMetrics?.fillerWordsCount || 0}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── DIAGNOSTICS SCORECARD MODAL ── */}
      <AnimatePresence>
        {showScorecard && session && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0c10]/98 backdrop-blur-2xl p-6"
          >
            <div className="max-w-3xl w-full bg-[#13171d] border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl flex flex-col gap-8">
              
              {/* Radial glow backgrounds */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px]" />

              {/* Title Header */}
              <div className="text-center space-y-2 relative z-10">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <Award size={36} />
                </div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] italic">Interview Completed</span>
                <h2 className="text-3xl md:text-5xl font-[900] uppercase italic tracking-tighter text-white mt-2">Evaluation Report</h2>
              </div>

              {/* Grid: Double Ring Gauges */}
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto w-full relative z-10">
                {/* Technical Accuracy Card */}
                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    {/* Ring Path */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" strokeWidth="6" stroke="rgba(255,255,255,0.05)" fill="transparent" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        strokeWidth="6" 
                        stroke="#10b880" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - (session.overallEvaluation.codeScore || 50) / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-2xl font-[900] text-white italic">{session.overallEvaluation.codeScore}%</span>
                  </div>
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Code Purity</span>
                </div>

                {/* Verbal Communication Card */}
                <div className="p-6 rounded-3xl bg-black/40 border border-white/5 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 flex items-center justify-center mb-4">
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" strokeWidth="6" stroke="rgba(255,255,255,0.05)" fill="transparent" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        strokeWidth="6" 
                        stroke="#6366f1" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - (session.overallEvaluation.communicationScore || 50) / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-2xl font-[900] text-white italic">{session.overallEvaluation.communicationScore}%</span>
                  </div>
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Speech Mastery</span>
                </div>
              </div>

              {/* Metrics Breakdown (Filler Words / WPM) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto w-full relative z-10 bg-black/20 p-4 rounded-3xl border border-white/5">
                <div className="text-center p-2">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Speech Velocity</span>
                  <span className="text-lg font-black text-white mt-1 block">{session.speechMetrics.wordsPerMinute} WPM</span>
                </div>
                <div className="text-center p-2 border-l border-white/5">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Verbal Crutches</span>
                  <span className="text-lg font-black text-white mt-1 block">{session.speechMetrics.fillerWordsCount} instances</span>
                </div>
                <div className="text-center p-2 border-l border-white/5">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Silence Gaps</span>
                  <span className="text-lg font-black text-white mt-1 block">{session.speechMetrics.silenceGaps} detected</span>
                </div>
                <div className="text-center p-2 border-l border-white/5">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Recruiter Tone</span>
                  <span className="text-lg font-black text-[#5ed29c] mt-1 block uppercase tracking-wide">
                    {session.recruiterPersonality === 'heather' ? 'Hardball' : 'Flexible'}
                  </span>
                </div>
              </div>

              {/* Detailed Evaluation Feedback Paragraph */}
              <div className="bg-[#161a20]/80 p-6 rounded-3xl border border-white/5 max-h-48 overflow-y-auto custom-scrollbar relative z-10 text-sm text-white/60 leading-relaxed font-medium">
                <h4 className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest mb-3">AI Diagnostic Summary</h4>
                {session.overallEvaluation.feedbackSummary}
              </div>

              {/* Return CTA */}
              <button
                onClick={() => navigateTo('coding-lab')}
                className="w-full max-w-sm mx-auto py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 border border-emerald-400/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2 relative z-10"
              >
                Return to Coding Hub
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ShadowInterview;
