import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, KeyRound, Loader2, CheckCircle2, ChevronRight, Swords, ArrowLeft, XCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';

export const JoinBattle = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { joinCustomRoom, joinError, matchStatus, isConnected, connect, resetState } = useSocketStore();
  
  // Extract roomId from hash (e.g., #/battle/invite/room_xyz123)
  const hash = window.location.hash;
  const roomId = hash.split('invite/')[1]?.split('?')[0];

  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'checking' | 'pin_required' | 'joining' | 'accepted' | 'error'>('checking');
  const [localError, setLocalError] = useState<string | null>(null);

  const attemptInitialJoin = useRef(false);

  useEffect(() => {
    if (!isConnected && user) {
      connect(user);
    }
  }, [isConnected, user, connect]);

  useEffect(() => {
    // Only attempt automatic join once we are connected and have a roomId
    if (isConnected && roomId && !attemptInitialJoin.current) {
      attemptInitialJoin.current = true;
      setStatus('checking');
      // Try joining without a pin to see if it's public
      joinCustomRoom(roomId);
    }
  }, [isConnected, roomId, joinCustomRoom]);

  // Handle Socket Errors
  useEffect(() => {
    if (joinError) {
      if (joinError === 'Invalid PIN') {
        setStatus('pin_required');
      } else {
        setStatus('error');
        setLocalError(joinError);
      }
    }
  }, [joinError]);

  // Handle Match Found Transition
  useEffect(() => {
    if (matchStatus === 'matched' || matchStatus === 'in_battle') {
      setStatus('accepted');
      setTimeout(() => {
        window.location.hash = 'battle';
      }, 1500);
    }
  }, [matchStatus]);

  const handleJoinWithPin = () => {
    if (pin.length !== 4) {
      setLocalError('Please enter a valid 4-digit PIN.');
      return;
    }
    
    setLocalError(null);
    setStatus('joining');
    joinCustomRoom(roomId, pin);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5ed29c]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <button 
          onClick={() => window.location.hash = 'find-match'}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Lobbies
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#161a20] border border-white/5 rounded-[40px] p-10 shadow-2xl relative overflow-hidden text-center"
        >
          {status === 'checking' && (
            <div className="py-8">
              <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-[900] uppercase tracking-tighter italic mb-2">Locating Arena...</h2>
              <p className="text-xs text-white/40 font-medium">Verifying invite link for {roomId}</p>
            </div>
          )}

          {status === 'pin_required' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-[900] uppercase tracking-tighter italic mb-2">Private Match</h2>
              <p className="text-xs text-white/40 font-bold mb-8">This lobby is secured. Enter the host's PIN to request entry.</p>

              <div className="space-y-6">
                <div className="bg-[#0a0c10] border border-white/10 rounded-2xl p-4">
                  <input 
                    type="text" 
                    maxLength={4}
                    placeholder="ENTER PIN"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, ''));
                      setLocalError(null);
                    }}
                    className="w-full bg-transparent text-white font-mono text-center tracking-[1em] text-3xl outline-none placeholder:text-white/10"
                  />
                </div>
                {localError && <p className="text-red-400 text-xs font-bold">{localError}</p>}

                <button 
                  onClick={handleJoinWithPin}
                  disabled={pin.length !== 4}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-400 text-white font-[900] uppercase tracking-widest text-[11px] rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <KeyRound size={14} /> Unlock Arena
                </button>
              </div>
            </motion.div>
          )}

          {status === 'joining' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
              <div className="w-16 h-16 relative mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin" />
                <Lock className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={20} />
              </div>
              <h2 className="text-xl font-[900] uppercase tracking-tighter italic mb-2">Validating...</h2>
              <p className="text-xs text-white/40 font-medium">Checking credentials securely</p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8">
              <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <XCircle size={32} />
              </div>
              <h2 className="text-2xl font-[900] uppercase tracking-tighter italic mb-2">Access Denied</h2>
              <p className="text-xs text-white/40 font-bold mb-8">{localError || "Could not join the match."}</p>
              
              <button 
                onClick={() => window.location.hash = 'find-match'}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-[900] uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/10"
              >
                Return to Lobbies
              </button>
            </motion.div>
          )}

          {status === 'accepted' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} 
              className="py-8"
            >
              <div className="w-20 h-20 bg-[#5ed29c]/10 border border-[#5ed29c]/30 rounded-full flex items-center justify-center mx-auto mb-6 text-[#5ed29c]">
                <CheckCircle2 size={40} className="drop-shadow-[0_0_10px_rgba(94,210,156,0.5)]" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic mb-2 text-white">Entry Granted</h2>
              <p className="text-[10px] text-[#5ed29c] font-black uppercase tracking-widest mb-6 animate-pulse">Initializing Battle Arena...</p>
              
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className="h-full bg-[#5ed29c]"
                />
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
