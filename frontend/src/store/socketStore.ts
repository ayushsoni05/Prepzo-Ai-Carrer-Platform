import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  matchStatus: 'idle' | 'searching' | 'matched' | 'in_battle' | 'ended';
  roomId: string | null;
  opponent: any | null;
  opponentProgress: number;
  winnerSocketId: string | null;
  
  connect: (userData: any) => void;
  disconnect: () => void;
  findMatch: (userData: any) => void;
  cancelMatch: (userId: string) => void;
  sendProgress: (progress: number) => void;
  submitBattle: (success: boolean, passed: number, total: number) => void;
  resetState: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  matchStatus: 'idle',
  roomId: null,
  opponent: null,
  opponentProgress: 0,
  winnerSocketId: null,

  connect: (userData) => {
    if (get().socket) return; // Already connected

    const socketUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    const newSocket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      set({ isConnected: true });
    });

    newSocket.on('disconnect', () => {
      set({ isConnected: false, matchStatus: 'idle', roomId: null, opponent: null });
    });

    // Matchmaking events
    newSocket.on('queue_joined', () => {
      set({ matchStatus: 'searching' });
    });

    newSocket.on('queue_left', () => {
      set({ matchStatus: 'idle' });
    });

    newSocket.on('match_found', (data: { roomId: string, opponent: any }) => {
      set({ 
        matchStatus: 'matched', 
        roomId: data.roomId, 
        opponent: data.opponent 
      });
      
      // Auto transition to battle after a short delay for the VS screen
      setTimeout(() => {
        if (get().matchStatus === 'matched') {
          set({ matchStatus: 'in_battle' });
        }
      }, 3000);
    });

    // Battle events
    newSocket.on('opponent_progress', (data: { progress: number }) => {
      set({ opponentProgress: data.progress });
    });

    newSocket.on('battle_ended', (data: { winnerSocketId: string, reason: string }) => {
      set({ 
        matchStatus: 'ended', 
        winnerSocketId: data.winnerSocketId 
      });
    });

    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  findMatch: (userData) => {
    const { socket } = get();
    if (socket) {
      socket.emit('join_queue', userData);
    }
  },

  cancelMatch: (userId) => {
    const { socket } = get();
    if (socket) {
      socket.emit('leave_queue', userId);
    }
  },

  sendProgress: (progress) => {
    const { socket, roomId } = get();
    if (socket && roomId) {
      socket.emit('code_change', { roomId, progress });
    }
  },

  submitBattle: (success, passed, total) => {
    const { socket, roomId } = get();
    if (socket && roomId) {
      socket.emit('battle_submit', { roomId, success, testCasesPassed: passed, totalTestCases: total });
    }
  },

  resetState: () => {
    set({
      matchStatus: 'idle',
      roomId: null,
      opponent: null,
      opponentProgress: 0,
      winnerSocketId: null
    });
  }
}));
