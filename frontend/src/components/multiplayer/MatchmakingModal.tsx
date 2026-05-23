import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { Swords, X, Loader2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MatchmakingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MatchmakingModal = ({ isOpen, onClose }: MatchmakingModalProps) => {
  const { matchStatus, opponent, findMatch, cancelMatch, resetState } = useSocketStore();
  const { user } = useAuthStore();
  
  // Use location hash for navigation since we use HashRouter in App.tsx
  const handleNavigateToBattle = () => {
    window.location.hash = 'battle';
    onClose();
  };

  useEffect(() => {
    if (isOpen && user && matchStatus === 'idle') {
      findMatch({
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        elo: 1200 // Mock default ELO for now
      });
    }

    if (matchStatus === 'in_battle') {
      handleNavigateToBattle();
    }

    // Cleanup on unmount or close
    return () => {
      if (!isOpen && matchStatus === 'searching') {
        cancelMatch(user?.id || '');
      }
    };
  }, [isOpen, matchStatus, user]);

  const handleCancel = () => {
    cancelMatch(user?.id || '');
    resetState();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {matchStatus === 'matched' ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl h-[60vh] flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-pulse" />
              
              <h1 className="text-6xl md:text-8xl font-[900] text-white uppercase italic tracking-tighter mb-12 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]">
                Match Found
              </h1>
              
              <div className="flex items-center gap-12 md:gap-32 w-full justify-center relative">
                {/* User */}
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <img src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName}`} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white mb-4 shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                  <span className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">{user?.fullName.split(' ')[0]}</span>
                  <span className="text-sm text-white/50 font-bold tracking-widest mt-1">ELO 1200</span>
                </motion.div>

                {/* VS Badge */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-black z-10"
                >
                  <span className="text-3xl font-[900] text-white italic">VS</span>
                </motion.div>

                {/* Opponent */}
                <motion.div 
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex flex-col items-center"
                >
                  <img src={opponent?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${opponent?.fullName}`} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-500 mb-4 shadow-[0_0_30px_rgba(255,0,0,0.5)]" />
                  <span className="text-xl md:text-2xl font-bold text-red-500 uppercase tracking-wider">{opponent?.fullName.split(' ')[0]}</span>
                  <span className="text-sm text-white/50 font-bold tracking-widest mt-1">ELO {opponent?.elo || 1200}</span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#161a20] border border-white/10 rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Radar Animation Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[400px] h-[400px] rounded-full border border-[#5ed29c] animate-[ping_3s_ease-out_infinite]" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-[#5ed29c] animate-[ping_3s_ease-out_infinite_500ms]" />
                <div className="absolute w-[200px] h-[200px] rounded-full border border-[#5ed29c] animate-[ping_3s_ease-out_infinite_1000ms]" />
              </div>

              <button 
                onClick={handleCancel}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10 py-8">
                <div className="w-20 h-20 bg-[#5ed29c]/20 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-[#5ed29c] animate-ping opacity-20" />
                  <Zap className="w-10 h-10 text-[#5ed29c] animate-pulse" />
                </div>
                
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">Scanning Matrix</h2>
                <p className="text-white/40 text-sm font-medium tracking-wide mb-8">
                  Searching for an opponent near your skill level...
                </p>

                <div className="flex items-center gap-2 text-[#5ed29c] font-bold text-sm tracking-widest uppercase bg-[#5ed29c]/10 px-6 py-3 rounded-full">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Estimated wait: 0:15
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
