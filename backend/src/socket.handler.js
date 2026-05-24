import { matchmakingService } from './services/matchmaking.service.js';

export const initializeSockets = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 New socket connection: ${socket.id}`);

    // Join Matchmaking Queue
    socket.on('join_queue', (userData) => {
      // userData should contain { id, fullName, avatar, elo }
      const joined = matchmakingService.joinQueue(userData, socket.id);
      
      if (joined) {
        socket.emit('queue_joined', { status: 'waiting' });
        
        // Trigger a match check
        const newMatches = matchmakingService.findMatches();
        
        newMatches.forEach(match => {
          // Notify both players
          match.players.forEach(p => {
            const opponent = match.players.find(opp => opp.user.id !== p.user.id);
            
            // Make socket join the room
            const playerSocket = io.sockets.sockets.get(p.socketId);
            if (playerSocket) {
              playerSocket.join(match.roomId);
              playerSocket.emit('match_found', {
                roomId: match.roomId,
                opponent: opponent.user
              });
            }
          });
        });
      }
    });

    // Leave Queue
    socket.on('leave_queue', (userId) => {
      matchmakingService.leaveQueue(userId);
      socket.emit('queue_left');
    });

    // Custom Rooms
    socket.on('get_public_rooms', () => {
      socket.emit('public_rooms_update', matchmakingService.getPublicRooms());
    });

    socket.on('create_custom_room', (config) => {
      // config: { roomId, mode, pin, problems, timeLimit, hostUser }
      matchmakingService.createCustomRoom(config.roomId, {
        hostSocketId: socket.id,
        hostUser: config.hostUser,
        mode: config.mode,
        pin: config.pin,
        problems: config.problems,
        timeLimit: config.timeLimit,
        createdAt: Date.now()
      });

      socket.join(config.roomId);
      socket.emit('custom_room_created', { roomId: config.roomId });

      if (config.mode === 'public') {
        io.emit('public_rooms_update', matchmakingService.getPublicRooms());
      }
    });

    // Battle Actions
    socket.on('code_change', ({ roomId, progress }) => {
      // Broadcast typing progress to the opponent in the same room
      socket.to(roomId).emit('opponent_progress', { progress });
    });

    socket.on('battle_submit', ({ roomId, success, testCasesPassed, totalTestCases }) => {
      socket.to(roomId).emit('opponent_submit', { success, testCasesPassed, totalTestCases });
      
      if (success) {
        // Handle battle end (user won)
        io.to(roomId).emit('battle_ended', { winnerSocketId: socket.id, reason: 'completed' });
        matchmakingService.endMatch(roomId);
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
      // Remove from queue if they disconnect
      // This requires iterating the queue, which we can add to MatchmakingService if needed
      // A simple O(N) cleanup:
      matchmakingService.queue = matchmakingService.queue.filter(p => p.socketId !== socket.id);
      
      // If they were in an active match, they forfeit
      for (const [roomId, match] of matchmakingService.activeMatches.entries()) {
        const player = match.players.find(p => p.socketId === socket.id);
        if (player) {
          // Other player wins by default
          socket.to(roomId).emit('battle_ended', { winnerSocketId: 'opponent', reason: 'disconnect' });
          matchmakingService.endMatch(roomId);
        }
      }

      // Cleanup custom rooms they hosted
      let publicRoomRemoved = false;
      for (const [roomId, room] of matchmakingService.customRooms.entries()) {
        if (room.hostSocketId === socket.id) {
          if (room.mode === 'public') publicRoomRemoved = true;
          matchmakingService.removeCustomRoom(roomId);
        }
      }
      if (publicRoomRemoved) {
        io.emit('public_rooms_update', matchmakingService.getPublicRooms());
      }
    });
  });
};
