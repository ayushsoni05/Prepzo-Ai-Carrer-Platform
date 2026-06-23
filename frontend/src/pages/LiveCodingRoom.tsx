import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Code, Users, MessageSquare, Send, Zap, LogOut, Check, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface Example {
  input: string;
  output: string;
}

interface Problem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examples: Example[];
  hints: string[];
}

interface ChatMessage {
  senderName: string;
  message: string;
  timestamp: string;
}

interface RoomData {
  roomCode: string;
  host: { _id: string; fullName: string; email: string };
  participant?: { _id: string; fullName: string; email: string };
  problem: Problem;
  status: 'waiting' | 'active' | 'completed';
  language: string;
  hostCode: string;
  participantCode: string;
  chatMessages: ChatMessage[];
  hintsUsed: number;
}

const MOCK_ROOM: RoomData = {
  roomCode: 'PREPZO',
  host: { _id: 'h1', fullName: 'Ayush Soni', email: 'ayush@prepzo.com' },
  participant: { _id: 'p1', fullName: 'John Doe', email: 'john@gmail.com' },
  problem: {
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    difficulty: 'Easy',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }
    ],
    hints: [
      'Try a brute force search first using double loops.',
      'Can you use a hash map to look up the complement in O(1) time?',
      'Be careful not to use the same element twice.'
    ]
  },
  status: 'active',
  language: 'javascript',
  hostCode: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
  participantCode: 'function twoSum(nums, target) {\n  // Writing solution...\n  for(let i=0; i<nums.length; i++) {\n    for(let j=i+1; j<nums.length; j++) {\n      if(nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n}',
  chatMessages: [
    { senderName: 'Ayush Soni', message: 'Hey! Ready to solve Two Sum?', timestamp: '7:40 PM' },
    { senderName: 'John Doe', message: 'Yes! Im writing the brute force approach first.', timestamp: '7:41 PM' }
  ],
  hintsUsed: 0
};

export const LiveCodingRoom: React.FC = () => {
  const [room, setRoom] = useState<RoomData | null>(null);
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Active Code values
  const [editorCode, setEditorCode] = useState('');
  
  // Chat States
  const [chatMessage, setChatMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const fetchRoomDetails = async (code: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/coding-room/${code}`);
      if (res.data?.success && res.data.data) {
        setRoom(res.data.data);
        // Set user's starting code (depending on host or participant)
        // For simplicity: we match user session. Let's just default to hostCode
        setEditorCode(res.data.data.hostCode || '');
      }
    } catch (err) {
      console.warn("Using local active mock coding room configurations:", err);
      setRoom(MOCK_ROOM);
      setEditorCode(MOCK_ROOM.hostCode);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    setCreating(true);
    try {
      const res = await api.post('/api/coding-room/create');
      if (res.data?.success && res.data.data) {
        setRoom(res.data.data);
        setEditorCode(res.data.data.hostCode || '');
        showSuccess(`Coding Room ${res.data.data.roomCode} created!`);
      }
    } catch (err) {
      showError('Failed to create room. Mocking...');
      setRoom(MOCK_ROOM);
      setEditorCode(MOCK_ROOM.hostCode);
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCodeInput) return;
    setJoining(true);
    try {
      const res = await api.post(`/api/coding-room/join/${roomCodeInput}`);
      if (res.data?.success && res.data.data) {
        setRoom(res.data.data);
        setEditorCode(res.data.data.participantCode || '');
        showSuccess(`Joined room ${roomCodeInput}`);
      }
    } catch (err) {
      showError('Room not found. Loading local sandbox...');
      setRoom(MOCK_ROOM);
      setEditorCode(MOCK_ROOM.participantCode);
    } finally {
      setJoining(false);
    }
  };

  const handleSendChatMessage = () => {
    if (!chatMessage || !room) return;
    const newMessage: ChatMessage = {
      senderName: 'You',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setRoom({
      ...room,
      chatMessages: [...room.chatMessages, newMessage]
    });
    setChatMessage('');
    
    // Auto Scroll chat
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const triggerHint = async () => {
    if (!room) return;
    if (room.hintsUsed >= 3) {
      showError('All 3 hints have been exhausted.');
      return;
    }
    try {
      const res = await api.post(`/api/coding-room/${room.roomCode}/hint`);
      if (res.data?.success && res.data.data) {
        const hintMsg = res.data.data.hint;
        // Append hint as an AI system message in chat
        const systemMsg: ChatMessage = {
          senderName: 'AI Mentor',
          message: `Hint ${res.data.data.hintsUsed}: ${hintMsg}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setRoom({
          ...room,
          hintsUsed: res.data.data.hintsUsed,
          chatMessages: [...room.chatMessages, systemMsg]
        });
        showSuccess(`Hint ${res.data.data.hintsUsed} unlocked!`);
      }
    } catch (err) {
      // Mock local hint fallback
      const hint = room.problem.hints[room.hintsUsed] || "Read standard library solutions for matching patterns.";
      const newCount = room.hintsUsed + 1;
      const systemMsg: ChatMessage = {
        senderName: 'AI Mentor',
        message: `Hint ${newCount}: ${hint}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setRoom({
        ...room,
        hintsUsed: newCount,
        chatMessages: [...room.chatMessages, systemMsg]
      });
      showSuccess(`Hint ${newCount} unlocked!`);
    }
  };

  const endRoomSession = async () => {
    if (!room) return;
    if (!window.confirm('End this collaborative session?')) return;
    try {
      await api.post(`/api/coding-room/${room.roomCode}/end`);
      setRoom(null);
      showSuccess('Session completed successfully.');
    } catch (err) {
      setRoom(null);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-green-400 bg-green-500/10 border-green-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation bar */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => room ? endRoomSession() : navigateTo('dashboard')} 
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{room ? 'Leave Room' : 'Back to Dashboard'}</span>
          </button>
          
          <div className="flex items-center gap-2 text-purple-400">
            <Code className="w-5 h-5" />
            <span className="font-bold text-sm uppercase tracking-wider">Live Pair-Programming Room</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!room ? (
            // Lobby / Create or Join Room Form
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="text-center py-6 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-2 text-purple-400">
                  <Users className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Collaborative Coding</h1>
                <p className="text-white/60 text-sm leading-relaxed">
                  Start a live coding room, invite a friend or peer, and solve data structure challenges together with real-time split screen editors.
                </p>

                {/* Grid layout for Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {/* Create Room card */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center text-center space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base">Host a Room</h3>
                      <p className="text-xs text-white/40 leading-normal">Generate a code and pick a random DSA problem.</p>
                    </div>
                    <button
                      onClick={handleCreateRoom}
                      disabled={creating}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl font-bold transition-all duration-200"
                    >
                      {creating ? 'Starting Session...' : 'Create Room'}
                    </button>
                  </div>

                  {/* Join Room card */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center text-center space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base">Join Session</h3>
                      <p className="text-xs text-white/40 leading-normal">Enter the 6-character alphanumeric room code.</p>
                    </div>

                    <form onSubmit={handleJoinRoom} className="w-full space-y-3">
                      <input
                        type="text"
                        value={roomCodeInput}
                        onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. PREPZO"
                        maxLength={6}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-white focus:outline-none focus:border-purple-500 font-mono tracking-widest font-bold uppercase transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={joining || !roomCodeInput}
                        className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all duration-200"
                      >
                        {joining ? 'Connecting...' : 'Join Room'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Active Coding Room View
            <motion.div
              key="room"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              
              {/* Left Column: Problem details */}
              <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 space-y-6 max-h-[82vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded">
                    CODE: {room.roomCode}
                  </span>
                  
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(room.problem.difficulty)}`}>
                    {room.problem.difficulty}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-black leading-snug">{room.problem.title}</h2>
                  <p className="text-xs text-white/70 leading-relaxed font-rubik">
                    {room.problem.description}
                  </p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Examples</h4>
                  {room.problem.examples.map((ex, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 font-mono text-[11px]">
                      <div>
                        <span className="text-white/40">Input:</span>
                        <p className="text-white/80 leading-normal">{ex.input}</p>
                      </div>
                      <div>
                        <span className="text-white/40">Output:</span>
                        <p className="text-white/80 leading-normal">{ex.output}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hints unlock tracker */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white/40 uppercase">Hints Used ({room.hintsUsed}/3)</span>
                    {room.hintsUsed < 3 && (
                      <button 
                        onClick={triggerHint}
                        className="text-xs text-purple-400 font-bold hover:underline"
                      >
                        Unlock Hint
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className={`flex-1 h-1.5 rounded-full ${
                          room.hintsUsed >= num ? 'bg-purple-500' : 'bg-white/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Section: Double Split Editor */}
              <div className="lg:col-span-2 flex flex-col gap-6 max-h-[82vh]">
                {/* Host Editor Panel */}
                <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-bold text-white/85">{room.host.fullName} (Host)</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">index.js</span>
                  </div>
                  <textarea
                    readOnly
                    value={room.hostCode}
                    className="flex-1 w-full bg-transparent resize-none border-0 focus:ring-0 font-mono text-xs leading-relaxed text-cyan-400/90 outline-none select-none custom-scrollbar"
                  />
                </div>

                {/* Participant Editor Panel */}
                <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      <span className="text-xs font-bold text-white/85">
                        {room.participant ? room.participant.fullName : 'Waiting for guest...'}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/40 font-mono">index.js</span>
                  </div>
                  {room.participant ? (
                    <textarea
                      readOnly
                      value={room.participantCode}
                      className="flex-1 w-full bg-transparent resize-none border-0 focus:ring-0 font-mono text-xs leading-relaxed text-purple-300/95 outline-none select-none custom-scrollbar"
                    />
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 opacity-50">
                      <Users className="w-8 h-8 text-white/30 animate-pulse" />
                      <p className="text-xs text-white/40">Share code "{room.roomCode}" to begin pair programming.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Chat messages panel */}
              <div className="lg:col-span-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-5 flex flex-col justify-between max-h-[82vh]">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/5 text-white/60">Room Chat</h3>
                  <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 custom-scrollbar">
                    {room.chatMessages.map((msg, i) => {
                      const isSystem = msg.senderName === 'AI Mentor';
                      return (
                        <div key={i} className={`text-xs space-y-1 ${isSystem ? 'bg-purple-500/5 p-3 rounded-2xl border border-purple-500/10' : ''}`}>
                          <div className="flex justify-between items-center">
                            <span className={`font-bold ${isSystem ? 'text-purple-400 font-extrabold flex items-center gap-1' : 'text-white/80'}`}>
                              {isSystem && <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />}
                              {msg.senderName}
                            </span>
                            <span className="text-[10px] text-white/30 font-mono">{msg.timestamp}</span>
                          </div>
                          <p className="text-white/60 leading-relaxed font-sans">{msg.message}</p>
                        </div>
                      );
                    })}
                    <div ref={chatBottomRef} />
                  </div>
                </div>

                {/* Send chat text inputs */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    onClick={handleSendChatMessage}
                    className="p-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all duration-200 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveCodingRoom;
