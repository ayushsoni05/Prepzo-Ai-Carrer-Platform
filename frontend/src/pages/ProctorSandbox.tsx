import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ArrowLeft, RefreshCw, Trophy, Sparkles, ShieldCheck, Terminal, AlertTriangle, HelpCircle, Eye, Copy, RefreshCw as ResetIcon } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

export const ProctorSandbox = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [trustScore, setTrustScore] = useState(100);
  const [flags, setFlags] = useState<any>({
    tabSwitches: 0,
    copyPastes: 0,
    illegalKeys: 0,
    inactivity: 0
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [userCode, setUserCode] = useState('// Write a function to check if a string is a palindrome\nfunction isPalindrome(str) {\n  \n}');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  // Initialize camera stream
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(mediaStream);
        setCameraPermission('granted');
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        addLog('[CAMERA] Webcam stream successfully mapped. Gaze analyzer active.');
      } catch (err: any) {
        setCameraPermission('denied');
        addLog('[CAMERA_ERROR] Failed to gain camera permissions. Proctoring systems will flag missing camera stream.');
      }
    };
    
    enableCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  };

  // Event listeners for Proctoring
  useEffect(() => {
    // 1. Tab defocus / Tab switch detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setFlags((prev: any) => ({ ...prev, tabSwitches: prev.tabSwitches + 1 }));
        setTrustScore((prev) => Math.max(0, prev - 15));
        addLog('[PROCTOR_FLAG] CRITICAL: Tab focus loss detected (tab switched or minimized). Trust score decreased.');
        showError('Tab Switch Detected! Proctor has flagged this action.');
      }
    };

    const handleWindowBlur = () => {
      setFlags((prev: any) => ({ ...prev, tabSwitches: prev.tabSwitches + 1 }));
      setTrustScore((prev) => Math.max(0, prev - 10));
      addLog('[PROCTOR_FLAG] WARNING: Browser focus blurred. (Cursor clicked outside exam layout).');
    };

    // 2. Clipboard tracking (Copy & Paste blocks)
    const handleCopy = (e: ClipboardEvent) => {
      setFlags((prev: any) => ({ ...prev, copyPastes: prev.copyPastes + 1 }));
      setTrustScore((prev) => Math.max(0, prev - 8));
      addLog('[PROCTOR_FLAG] WARNING: Text copy detected. Clipboard operations are restricted.');
    };

    const handlePaste = (e: ClipboardEvent) => {
      setFlags((prev: any) => ({ ...prev, copyPastes: prev.copyPastes + 1 }));
      setTrustScore((prev) => Math.max(0, prev - 12));
      addLog('[PROCTOR_FLAG] CRITICAL: Text paste detected inside browser viewport. Integrity flagged.');
      showError('Paste Operation Flagged!');
    };

    // 3. Illegal keyboard shortcut detection (Alt+Tab, Alt+F4, Ctrl+C, Ctrl+V, PrintScreen)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for illegal keys
      if (e.key === 'Alt' || e.key === 'Control' || e.key === 'Meta' || e.key === 'PrintScreen' || e.key === 'Escape') {
        setFlags((prev: any) => ({ ...prev, illegalKeys: prev.illegalKeys + 1 }));
        setTrustScore((prev) => Math.max(0, prev - 5));
        addLog(`[PROCTOR_FLAG] WARNING: Illegal modifier key pressed: "${e.key}".`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    window.addEventListener('keydown', handleKeyDown);

    // Initial logs
    addLog('[SYS_INFO] Proctoring sandbox active. All browser tab focuses and clipboard states are being logged.');

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const resetSandbox = () => {
    setTrustScore(100);
    setFlags({
      tabSwitches: 0,
      copyPastes: 0,
      illegalKeys: 0,
      inactivity: 0
    });
    setLogs([]);
    addLog('[RESET] Proctoring statistics and logs reset.');
  };

  const submitExam = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/proctor/report', {
        trustScore
      });

      if (response.data?.success) {
        setXpEarned(response.data.data.earnedXp);
        const originalBadges = response.data.data.stats?.badges || [];
        setUnlockedBadges(originalBadges);
        setShowOutcomeModal(true);
        showSuccess('Compliance log reported successfully!');
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to submit proctor score.');
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
              <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">Proctor <span className="text-[#00ff9d]">Sandbox.</span></h1>
              <p className="text-xs text-white/40 font-medium tracking-wide">Train your behavioral discipline to avoid triggering automated placement exams.</p>
            </div>
          </div>
          
          <button 
            onClick={resetSandbox}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <ResetIcon className="w-3.5 h-3.5" />
            Reset Logs
          </button>
        </div>

        {/* Dashboard layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Camera + Telemetry Logs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Camera feed panel */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 relative overflow-hidden">
              <div className="absolute top-3 left-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Gaze Tracker Stream</span>
              </div>

              <div className="w-full h-56 bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 relative">
                {cameraPermission === 'granted' ? (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <ShieldAlert className="w-10 h-10 text-white/20 mx-auto" />
                    <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Webcam stream locked / blocked</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Meter */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 relative overflow-hidden">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-white/40">Proctor Trust Score</h2>
                <p className={`text-4xl font-[900] italic tracking-tighter ${trustScore > 75 ? 'text-[#00ff9d]' : trustScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>{trustScore}%</p>
              </div>
              
              <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden border border-white/5 mb-4">
                <motion.div 
                  className={`h-full rounded-full ${trustScore > 75 ? 'bg-[#00ff9d]' : trustScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  animate={{ width: `${trustScore}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Tab Swits', count: flags.tabSwitches, color: 'text-red-400' },
                  { label: 'Clipboards', count: flags.copyPastes, color: 'text-yellow-400' },
                  { label: 'Illegal Keys', count: flags.illegalKeys, color: 'text-orange-400' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/30 border border-white/5 rounded-2xl p-3 text-center">
                    <p className="text-[9px] font-black text-white/30 uppercase">{item.label}</p>
                    <p className={`text-lg font-black mt-1 ${item.color}`}>{item.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs Terminal */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Terminal className="w-5 h-5 text-[#00ff9d]" />
                <h2 className="text-sm font-black uppercase tracking-wider text-white/40">Event Log Stream</h2>
              </div>
              <div className="h-44 bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-[#00ff9d] overflow-y-auto space-y-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-white/20 italic">Waiting for events logs... Try pressing Alt, Copying, or Switching tabs.</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={log.includes('[PROCTOR_FLAG] CRITICAL') ? 'text-red-500 font-bold' : log.includes('WARNING') ? 'text-yellow-400' : ''}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right panel: Exam sandbox */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mock coding test */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-purple-400">Mock Exam Question</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Task active</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Task: Palindrome Validator</h3>
                <p className="text-xs text-white/50 leading-relaxed font-medium">Write a function that checks if an alphanumeric string is identical forwards and backwards. Try to look up solutions or switch tabs to see how the proctor logs and rates your focus.</p>
              </div>

              <div className="relative rounded-2xl bg-black border border-white/5 p-4">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-60 bg-transparent text-white font-mono text-sm leading-relaxed outline-none border-none resize-none focus:ring-0 custom-scrollbar"
                  spellCheck="false"
                />
              </div>

              <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-xs font-medium text-white/40 leading-relaxed flex gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <p>Focus Training: Keep your cursor inside the text area, don't use shortcut modifiers, and avoid switching tabs to complete the exam with a perfect score.</p>
              </div>

              <button
                onClick={submitExam}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#00ff9d] text-black hover:bg-emerald-400 shadow-xl shadow-[#00ff9d]/10 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Submit Exam Log
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Outcome Report Card Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#13171d] border border-white/10 rounded-[35px] max-w-lg w-full p-10 relative overflow-hidden space-y-6 shadow-2xl text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00ff9d]" />
              <div className="w-20 h-20 bg-[#00ff9d]/10 border border-[#00ff9d]/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-10 h-10 text-[#00ff9d]" />
              </div>
              
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Compliance <span className="text-[#00ff9d]">Report.</span></h2>
              
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-3 text-left">
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>Proctor Trust Score</span>
                  <span className={`font-black ${trustScore > 75 ? 'text-[#00ff9d]' : 'text-red-400'}`}>{trustScore}%</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="space-y-1.5 text-[11px] font-bold text-white/50">
                  <p>• Tab defocus/switch flags: <span className="text-white font-black">{flags.tabSwitches}</span></p>
                  <p>• Clipboard copy/paste flags: <span className="text-white font-black">{flags.copyPastes}</span></p>
                  <p>• Illegal keys shortcut flags: <span className="text-white font-black">{flags.illegalKeys}</span></p>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between text-sm font-black text-[#00ff9d] uppercase tracking-wider">
                  <span>XP Gained</span>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              {/* Tips for preparation */}
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-left text-xs space-y-2">
                <p className="font-black text-white/80 uppercase">💡 Proctoring Compliance tips:</p>
                <ul className="list-disc pl-4 space-y-1 text-white/50 font-bold">
                  <li>Disable operating system notifications before entering assessments.</li>
                  <li>Do not use Alt+Tab or system hotkeys during exams.</li>
                  <li>Always keep your gaze centered on the browser viewport.</li>
                </ul>
              </div>

              {/* Show Honor Code Champion badge unlock */}
              {unlockedBadges.includes('Honor Code Champion') && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center gap-3 text-yellow-400 max-w-sm mx-auto">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-black uppercase tracking-wider">New Badge Unlocked!</p>
                    <p className="font-bold text-yellow-400/60 mt-0.5">Honor Code Champion (100% Trust Score)</p>
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
export default ProctorSandbox;
