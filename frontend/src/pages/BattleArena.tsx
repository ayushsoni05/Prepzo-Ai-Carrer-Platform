import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { Play, Loader2, Trophy, Swords, Zap, XCircle, CheckCircle2 } from 'lucide-react';

export const BattleArena = () => {
  const { matchStatus, opponent, opponentProgress, roomId, sendProgress, submitBattle, winnerSocketId, resetState } = useSocketStore();
  const { user } = useAuthStore();
  
  // Dummy problem for MVP
  const problem = {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy"
  };

  const [code, setCode] = useState("function twoSum(nums, target) {\n  \n}");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number, total: number } | null>(null);

  // Sync progress
  useEffect(() => {
    // In a real app we'd debounce this
    const progress = Math.min(100, (code.length / 100) * 100);
    sendProgress(progress);
  }, [code]);

  // If user navigated here without a match, kick them back
  useEffect(() => {
    if (matchStatus === 'idle') {
      window.location.hash = 'coding-lab';
    }
  }, [matchStatus]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate compilation
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate success based on some random logic or length for MVP
      const isSuccess = code.length > 50; 
      
      setTestResults({ passed: isSuccess ? 5 : 2, total: 5 });
      
      if (isSuccess) {
        submitBattle(true, 5, 5);
      }
    }, 2000);
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-xl font-bold text-white uppercase tracking-widest">ELO</span>
            <div className="flex flex-col">
              <span className="text-2xl font-[900] text-[#5ed29c]">+25</span>
              <span className="text-xs text-white/40 uppercase tracking-widest">Rating</span>
            </div>
          </div>
          
          <button 
            onClick={handleExit}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold uppercase tracking-widest rounded-xl transition-colors"
          >
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
          {/* Opponent Progress Bar */}
          <div className="flex items-center gap-4 bg-black/50 px-4 py-2 rounded-lg border border-white/5 w-[200px]">
            <img src={opponent?.avatar} className="w-6 h-6 rounded-full border border-red-500" />
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300 ease-out" 
                style={{ width: `${opponentProgress}%` }}
              />
            </div>
          </div>
          
          <button 
            onClick={() => handleExit()}
            className="text-[10px] text-white/30 hover:text-white font-bold uppercase tracking-widest transition-colors"
          >
            Surrender
          </button>
        </div>
      </header>

      {/* Main Arena */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem */}
        <div className="w-[400px] border-r border-white/10 bg-[#161a20]/50 p-6 overflow-y-auto custom-scrollbar shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-md uppercase tracking-widest">
              {problem.difficulty}
            </span>
          </div>
          <h2 className="text-3xl font-[900] uppercase italic tracking-tighter mb-4">{problem.title}</h2>
          <div className="text-sm text-white/60 leading-relaxed font-medium whitespace-pre-wrap">
            {problem.description}
          </div>
        </div>

        {/* Right: Code Editor */}
        <div className="flex-1 flex flex-col bg-[#0a0c10]">
          <div className="flex-1 relative p-4">
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-white font-mono text-sm resize-none outline-none custom-scrollbar p-4 rounded-xl border border-white/5 focus:border-[#5ed29c]/30 transition-colors"
              spellCheck={false}
            />
          </div>
          
          <div className="h-16 border-t border-white/10 bg-[#161a20] flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              {testResults && (
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${testResults.passed === testResults.total ? 'text-[#5ed29c]' : 'text-red-500'}`}>
                  {testResults.passed === testResults.total ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  Tests: {testResults.passed}/{testResults.total} Passed
                </div>
              )}
            </div>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#5ed29c] hover:bg-[#4bc18a] text-black font-[900] uppercase tracking-widest rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-xs"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play size={14} className="fill-black" />}
              Submit Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
