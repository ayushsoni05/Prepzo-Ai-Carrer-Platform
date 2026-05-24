import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, ShieldAlert, Globe, Lock, Clock, BookOpen, KeyRound, ChevronRight, ArrowLeft } from 'lucide-react';
import { useSocketStore } from '@/store/socketStore';

export const CreateBattle = () => {
  const navigate = useNavigate();
  const { socket } = useSocketStore();
  
  const [mode, setMode] = useState<'public' | 'private'>('public');
  const [problemId, setProblemId] = useState('two-sum');
  const [timeLimit, setTimeLimit] = useState(15);
  const [pin, setPin] = useState('');
  
  const [isCreating, setIsCreating] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<{ roomId: string, isPrivate: boolean } | null>(null);
  
  // Host Approval State
  const [joinRequest, setJoinRequest] = useState<{ guestName: string, guestId: string } | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const problems = [
    { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy' },
    { id: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'Easy' },
    { id: 'lru-cache', title: 'LRU Cache', difficulty: 'Medium' },
    { id: 'merge-k-lists', title: 'Merge K Sorted Lists', difficulty: 'Hard' }
  ];

  const handleCreate = () => {
    if (mode === 'private' && pin.length !== 4) {
      alert("Please enter a 4-digit PIN for private rooms.");
      return;
    }
    
    setIsCreating(true);
    
    // Simulate Room Creation
    setTimeout(() => {
      const generatedRoomId = `room_${Math.random().toString(36).substring(2, 9)}`;
      
      // Real implementation would emit:
      // socket.emit('create_custom_room', { mode, problemId, timeLimit, pin });
      
      setIsCreating(false);
      setCreatedRoom({ roomId: generatedRoomId, isPrivate: mode === 'private' });
      
      // Simulate receiving a join request after 6 seconds of waiting
      setTimeout(() => {
        setJoinRequest({ guestName: 'Ayush Soni', guestId: 'user_123' });
      }, 6000);
      
    }, 1000);
  };

  const handleCopyLink = () => {
    if (createdRoom) {
      const inviteUrl = `${window.location.origin}/#/battle/invite/${createdRoom.roomId}`;
      navigator.clipboard.writeText(inviteUrl);
      alert("Invite link copied to clipboard!");
    }
  };

  const handleAcceptRequest = () => {
    setJoinRequest(null);
    setHasStarted(true);
    setTimeout(() => {
      navigate('/battle');
    }, 2000);
  };

  const handleDeclineRequest = () => {
    setJoinRequest(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5ed29c]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <button 
          onClick={() => navigate('/coding-lab')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Lab
        </button>

        {!createdRoom ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#161a20] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
              <Swords size={120} className="text-white" />
            </div>

            <h1 className="text-4xl font-[900] uppercase tracking-tighter italic mb-2 relative z-10">Configure Battle</h1>
            <p className="text-sm text-white/40 font-bold mb-10 relative z-10">Set up a custom arena to challenge the community or a friend.</p>

            <div className="space-y-8 relative z-10">
              {/* Room Mode Selection */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block">Visibility Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setMode('public')}
                    className={`p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${mode === 'public' ? 'bg-[#5ed29c]/10 border-[#5ed29c]/50' : 'bg-[#0a0c10] border-white/5 hover:border-white/20'}`}
                  >
                    <Globe className={`w-6 h-6 mb-3 ${mode === 'public' ? 'text-[#5ed29c]' : 'text-white/40'}`} />
                    <p className={`font-[900] uppercase tracking-widest text-sm mb-1 ${mode === 'public' ? 'text-white' : 'text-white/60'}`}>Public Match</p>
                    <p className="text-[10px] text-white/40 font-medium">Broadcasted to the live lobbies board. Anyone can join instantly.</p>
                  </button>
                  <button 
                    onClick={() => setMode('private')}
                    className={`p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${mode === 'private' ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#0a0c10] border-white/5 hover:border-white/20'}`}
                  >
                    <Lock className={`w-6 h-6 mb-3 ${mode === 'private' ? 'text-purple-400' : 'text-white/40'}`} />
                    <p className={`font-[900] uppercase tracking-widest text-sm mb-1 ${mode === 'private' ? 'text-white' : 'text-white/60'}`}>Private Match</p>
                    <p className="text-[10px] text-white/40 font-medium">Hidden from public. Requires invite link and PIN.</p>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {mode === 'private' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                      <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-3 block flex items-center gap-2">
                        <KeyRound size={14} /> Security PIN
                      </label>
                      <input 
                        type="text" 
                        maxLength={4}
                        placeholder="4-Digit PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#0a0c10] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-center tracking-[0.5em] text-xl outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Problem Selection */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block flex items-center gap-2">
                  <BookOpen size={14} /> Mission Objective
                </label>
                <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {problems.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setProblemId(p.id)}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${problemId === p.id ? 'bg-blue-500/10 border border-blue-500/30' : 'hover:bg-white/5 border border-transparent'}`}
                    >
                      <span className={`font-bold text-sm ${problemId === p.id ? 'text-blue-400' : 'text-white'}`}>{p.title}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                        p.difficulty === 'Easy' ? 'text-[#5ed29c] border-[#5ed29c]/20 bg-[#5ed29c]/10' :
                        p.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' :
                        'text-red-400 border-red-400/20 bg-red-400/10'
                      }`}>
                        {p.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Limit */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block flex items-center gap-2">
                  <Clock size={14} /> Time Limit
                </label>
                <div className="flex items-center gap-4 bg-[#0a0c10] p-4 rounded-2xl border border-white/5">
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    step="5"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                    className="flex-1 accent-[#5ed29c]"
                  />
                  <span className="font-mono font-bold text-[#5ed29c] min-w-[60px] text-right">{timeLimit} min</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleCreate}
                disabled={isCreating}
                className={`w-full py-5 rounded-2xl font-[900] uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
                  mode === 'public' 
                    ? 'bg-[#5ed29c] hover:bg-[#4bc18a] text-black shadow-[0_0_20px_rgba(94,210,156,0.2)]'
                    : 'bg-purple-500 hover:bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                }`}
              >
                {isCreating ? 'Deploying Arena...' : mode === 'public' ? 'Launch Public Lobby' : 'Create Secure Room'}
                {!isCreating && <ChevronRight size={18} />}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161a20] border border-white/5 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden"
          >
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 border-4 ${createdRoom.isPrivate ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-[#5ed29c]/10 border-[#5ed29c] text-[#5ed29c]'}`}>
              {createdRoom.isPrivate ? <Lock size={40} /> : <Globe size={40} />}
            </div>
            <h1 className="text-3xl font-[900] uppercase tracking-tighter italic mb-4">Lobby Deployed</h1>
            
            {createdRoom.isPrivate ? (
              <div className="space-y-6 mb-8">
                <p className="text-white/40 text-sm font-medium">Your private room is ready. Share this link with your opponent.</p>
                <div className="bg-[#0a0c10] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/60 truncate pr-4">{`${window.location.origin}/#/battle/invite/${createdRoom.roomId}`}</span>
                  <button onClick={handleCopyLink} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors shrink-0">Copy Link</button>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 inline-block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1">Room PIN</p>
                  <p className="font-mono text-2xl tracking-[0.5em] text-white">{pin}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-8">
                <p className="text-white/40 text-sm font-medium">Your public room is live on the Lobbies Board. Waiting for a challenger.</p>
              </div>
            )}

            {joinRequest && !hasStarted && (
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute inset-x-4 bottom-4 bg-[#0a0c10] border-2 border-blue-500/50 rounded-2xl p-6 shadow-[0_0_40px_rgba(59,130,246,0.3)] z-50 text-left"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
                    <ShieldAlert className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-[900] uppercase tracking-tighter italic">Access Request</h3>
                    <p className="text-xs text-white/60 font-medium mt-1">
                      <strong className="text-white">{joinRequest.guestName}</strong> is waiting in the lobby.
                      {createdRoom.isPrivate && <span className="text-[#5ed29c] ml-1">(Correct PIN Entered)</span>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleDeclineRequest} className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-[900] uppercase tracking-widest text-[10px] rounded-xl transition-colors">Decline</button>
                  <button onClick={handleAcceptRequest} className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-[900] uppercase tracking-widest text-[10px] rounded-xl transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]">Accept & Drop In</button>
                </div>
              </motion.div>
            )}

            {hasStarted && (
              <div className="absolute inset-0 bg-[#161a20] z-50 flex flex-col items-center justify-center p-8">
                 <div className="w-24 h-24 bg-[#5ed29c]/10 border-2 border-[#5ed29c] rounded-full flex items-center justify-center mb-6">
                   <Swords className="w-12 h-12 text-[#5ed29c] animate-pulse" />
                 </div>
                 <h2 className="text-3xl font-[900] uppercase tracking-tighter italic text-[#5ed29c] mb-2">Match Starting!</h2>
                 <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Routing to Battle Arena...</p>
              </div>
            )}
            
            <button 
              onClick={() => {
                // Manual fallback for demo purposes
                navigate(`/battle`);
              }}
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-[900] uppercase tracking-widest text-xs transition-colors"
            >
              Enter Match Manually
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
