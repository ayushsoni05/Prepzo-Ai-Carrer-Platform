import { matchmakingService } from './services/matchmaking.service.js';
import Battle from './models/Battle.model.js';

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
        
        newMatches.forEach(async match => {
          // Create Battle in DB
          try {
            const battleDoc = new Battle({
              battleId: match.roomId,
              type: '1v1',
              status: 'in_progress',
              problemIds: ['two-sum'], // Default for now
              participants: match.players.map(p => ({
                userId: p.user.id,
                progress: 0,
                status: 'active'
              })),
              startTime: new Date(),
              timeLimitMinutes: 30
            });
            await battleDoc.save();
          } catch(err) {
            console.error("Failed to create battle in DB:", err);
          }

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
    socket.on('get_all_rooms', () => {
      socket.emit('all_rooms_update', matchmakingService.getAllCustomRooms());
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

      io.emit('all_rooms_update', matchmakingService.getAllCustomRooms());
    });

    socket.on('join_custom_room', ({ roomId, pin, user }) => {
      const result = matchmakingService.joinCustomRoom(roomId, user, pin, socket.id);
      
      if (!result.success) {
        socket.emit('join_error', { message: result.error });
        return;
      }

      socket.join(roomId);
      const match = result.match;
      
      // Notify both players
      match.players.forEach(p => {
        const opponent = match.players.find(opp => opp.socketId !== p.socketId);
        const playerSocket = io.sockets.sockets.get(p.socketId);
        if (playerSocket) {
          playerSocket.emit('match_found', {
            roomId: match.roomId,
            opponent: opponent?.user || null,
            timeLimit: match.timeLimit,
            problems: match.problems
          });
        }
      });

      // Update room list for everyone since a room was consumed
      io.emit('all_rooms_update', matchmakingService.getAllCustomRooms());
    });

    // Battle Actions
    socket.on('code_change', async ({ roomId, progress, userId, codeSnapshot }) => {
      // Broadcast typing progress to the opponent in the same room
      socket.to(roomId).emit('opponent_progress', { progress });
      
      // Throttle DB updates (done per ~5 progress points on client)
      if (userId) {
        try {
          await Battle.updateOne(
            { battleId: roomId, 'participants.userId': userId },
            { $set: { 
              'participants.$.progress': progress,
              ...(codeSnapshot ? { 'participants.$.codeSnapshot': codeSnapshot } : {})
            }}
          );
        } catch (err) {
           console.error("Failed to update battle progress", err);
        }
      }
    });

    socket.on('rejoin_battle', async ({ battleId, userId }) => {
      socket.join(battleId);
      try {
        const battle = await Battle.findOne({ battleId });
        if (battle && battle.status === 'in_progress') {
           const myParticipant = battle.participants.find(p => p.userId.toString() === userId);
           const opponentParticipant = battle.participants.find(p => p.userId.toString() !== userId);
           socket.emit('battle_restored', {
             timeLeft: Math.floor((battle.startTime.getTime() + battle.timeLimitMinutes * 60000 - Date.now()) / 1000),
             myProgress: myParticipant?.progress || 0,
             opponentProgress: opponentParticipant?.progress || 0,
             code: myParticipant?.codeSnapshot || '',
           });
        }
      } catch (err) {
        console.error("Failed to rejoin battle", err);
      }
    });

    socket.on('battle_submit', async ({ roomId, success, testCasesPassed, totalTestCases, userId }) => {
      socket.to(roomId).emit('opponent_submit', { success, testCasesPassed, totalTestCases });
      
      if (userId) {
        try {
          await Battle.updateOne(
            { battleId: roomId, 'participants.userId': userId },
            { $set: { 
              'participants.$.status': success ? 'submitted' : 'active',
              'participants.$.testsPassed': testCasesPassed,
              'participants.$.totalTests': totalTestCases,
              ...(success ? { 'participants.$.submittedAt': new Date() } : {})
            }}
          );
        } catch (err) {
           console.error("Failed to update battle submission", err);
        }
      }

      if (success) {
        try {
          await Battle.updateOne(
             { battleId: roomId },
             { $set: { status: 'completed', winnerId: userId, endTime: new Date() } }
          );
        } catch(e){}
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
      let roomRemoved = false;
      for (const [roomId, room] of matchmakingService.customRooms.entries()) {
        if (room.hostSocketId === socket.id) {
          roomRemoved = true;
          matchmakingService.removeCustomRoom(roomId);
        }
      }
      if (roomRemoved) {
        io.emit('all_rooms_update', matchmakingService.getAllCustomRooms());
      }
    });
  });
};
