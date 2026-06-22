import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { ENV } from '../config/env';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  matchStatus: 'idle' | 'searching' | 'matched' | 'in_battle' | 'ended';
  roomId: string | null;
  opponent: any | null;
  opponentProgress: number;
  winnerSocketId: string | null;
  allRooms: any[];
  joinError: string | null;
  timeLimit: number | null;
  problems: any[] | null;
  
  connect: (userData: any) => void;
  disconnect: () => void;
  findMatch: (userData: any) => void;
  cancelMatch: (userId: string) => void;
  sendProgress: (progress: number, userId?: string, codeSnapshot?: string) => void;
  submitBattle: (success: boolean, passed: number, total: number, userId?: string) => void;
  
  // Custom Room Methods
  createCustomRoom: (config: any) => void;
  getAllRooms: () => void;
  joinCustomRoom: (roomId: string, pin?: string, user?: any) => void;
  acceptJoinRequest: (guestId: string) => void;
  declineJoinRequest: (guestId: string) => void;

  rejoinBattle: (battleId: string, userId: string) => void;
  setRestoredState: (state: any) => void;

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
  allRooms: [],
  joinError: null,
  timeLimit: null,
  problems: null,

  connect: (_userData) => {
    if (get().socket) return; // Already connected

    const socketUrl = ENV.SOCKET_URL;
      
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

    newSocket.on('match_found', (data: { roomId: string, opponent: any, timeLimit?: number, problems?: any[] }) => {
      set({ 
        matchStatus: 'matched', 
        roomId: data.roomId, 
        opponent: data.opponent,
        timeLimit: data.timeLimit || null,
        problems: data.problems || null
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

    newSocket.on('battle_restored', (data: { timeLeft: number, myProgress: number, opponentProgress: number, code: string }) => {
      set({ 
        matchStatus: 'in_battle', 
        opponentProgress: data.opponentProgress,
      });
      get().setRestoredState(data);
    });

    // Custom Room Events
    newSocket.on('custom_room_created', (data: { roomId: string }) => {
      set({ roomId: data.roomId, matchStatus: 'idle' });
    });

    newSocket.on('all_rooms_update', (rooms: any[]) => {
      set({ allRooms: rooms });
    });

    newSocket.on('join_error', (data: { message: string }) => {
      set({ joinError: data.message });
    });

    newSocket.on('join_request_received', (data: { guest: any }) => {
      // Typically you'd trigger a UI modal here via an event emitter or dedicated state
      console.log('Join request from:', data.guest);
    });

    newSocket.on('join_request_accepted', (data: { roomId: string, opponent: any }) => {
      set({ 
        matchStatus: 'matched', 
        roomId: data.roomId, 
        opponent: data.opponent 
      });
      setTimeout(() => set({ matchStatus: 'in_battle' }), 3000);
    });

    newSocket.on('join_request_declined', () => {
      set({ matchStatus: 'idle' });
      alert("The host declined your join request.");
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

  sendProgress: (progress, userId, codeSnapshot) => {
    const { socket, roomId } = get();
    if (socket && roomId) {
      socket.emit('code_change', { roomId, progress, userId, codeSnapshot });
    }
  },

  submitBattle: (success, passed, total, userId) => {
    const { socket, roomId } = get();
    if (socket && roomId) {
      socket.emit('battle_submit', { roomId, success, testCasesPassed: passed, totalTestCases: total, userId });
    }
  },

  createCustomRoom: (config: any) => {
    const { socket } = get();
    if (socket) socket.emit('create_custom_room', config);
  },

  getAllRooms: () => {
    const { socket } = get();
    if (socket) socket.emit('get_all_rooms');
  },

  joinCustomRoom: (roomId, pin, user) => {
    const { socket } = get();
    set({ joinError: null });
    if (socket) socket.emit('join_custom_room', { roomId, pin, user });
  },

  acceptJoinRequest: (guestId) => {
    const { socket, roomId } = get();
    if (socket && roomId) socket.emit('accept_join_request', { roomId, guestId });
  },

  declineJoinRequest: (guestId) => {
    const { socket, roomId } = get();
    if (socket && roomId) socket.emit('decline_join_request', { roomId, guestId });
  },

  rejoinBattle: (battleId, userId) => {
    const { socket } = get();
    if (socket) {
      set({ roomId: battleId });
      socket.emit('rejoin_battle', { battleId, userId });
    }
  },

  setRestoredState: (_state) => {
    // This function will be overwritten by BattleArena.tsx to pass data up
  },

  resetState: () => {
    set({
      matchStatus: 'idle',
      roomId: null,
      opponent: null,
      opponentProgress: 0,
      winnerSocketId: null,
      joinError: null,
      timeLimit: null,
      problems: null
    });
  }
}));
