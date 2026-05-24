import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert, KeyRound, Loader2, CheckCircle2, ChevronRight, Swords, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const JoinBattle = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // Extract roomId from hash (e.g., #/battle/invite/room_xyz123)
  const hash = window.location.hash;
  const roomId = hash.split('invite/')[1]?.split('?')[0];

  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'pin_required' | 'waiting_host' | 'accepted' | 'declined'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate checking if room exists and if it's private
    setStatus('checking');
    setTimeout(() => {
      // Simulate that room is found and requires a PIN
      setStatus('pin_required');
    }, 1500);
  }, [roomId]);

  const handleJoin = () => {
    if (status === 'pin_required' && pin.length !== 4) {
      setError('Please enter a valid 4-digit PIN.');
      return;
    }
    
    setError(null);
    setStatus('waiting_host');

    // Simulate waiting for host approval
    setTimeout(() => {
      // Simulate host accepting
      setStatus('accepted');
      
      // Route to battle arena after a brief celebration
      setTimeout(() => {
        window.location.hash = 'battle';
      }, 2000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#5ed29c]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <button 
          onClick={() => window.location.hash = 'coding-lab'}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Lab
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
                      setError(null);
                    }}
                    className="w-full bg-transparent text-white font-mono text-center tracking-[1em] text-3xl outline-none placeholder:text-white/10"
                  />
                </div>
                {error && <p className="text-red-400 text-xs font-bold">{error}</p>}

                <button 
                  onClick={handleJoin}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                >
                  <KeyRound size={16} /> Request Entry
                </button>
              </div>
            </motion.div>
          )}

          {status === 'waiting_host' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 bg-[#5ed29c]/20 rounded-full animate-ping" />
                <div className="relative bg-[#161a20] w-full h-full border-2 border-[#5ed29c] rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8 text-[#5ed29c] animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-[900] uppercase tracking-tighter italic mb-2">Awaiting Host</h2>
              <p className="text-xs text-white/40 font-bold leading-relaxed px-4">
                PIN accepted. We have pinged the host to approve your entry. Waiting for them to click accept...
              </p>
            </motion.div>
          )}

          {status === 'accepted' && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-8">
              <div className="w-24 h-24 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic mb-2 text-green-400">Entry Granted!</h2>
              <p className="text-xs text-white/40 font-bold">Synchronizing arena... Prepare for battle!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
