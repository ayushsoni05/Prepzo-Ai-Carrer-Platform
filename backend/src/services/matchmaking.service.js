import crypto from 'crypto';

class MatchmakingService {
  constructor() {
    this.queue = [];
    this.activeMatches = new Map(); // roomId -> Match Details
  }

  // Add user to the matchmaking queue
  joinQueue(user, socketId) {
    // Check if user is already in queue
    const existingIndex = this.queue.findIndex(p => p.user.id === user.id);
    if (existingIndex !== -1) {
      this.queue[existingIndex].socketId = socketId; // Update socket ID just in case
      return false; // Already in queue
    }

    const player = {
      user: {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        elo: user.elo || 1000
      },
      socketId,
      joinedAt: Date.now()
    };

    this.queue.push(player);
    return true;
  }

  // Remove user from queue
  leaveQueue(userId) {
    const initialLength = this.queue.length;
    this.queue = this.queue.filter(p => p.user.id !== userId);
    return this.queue.length < initialLength;
  }

  // Find a match for players
  // In a real app this runs in a loop, but we can just check whenever someone joins
  findMatches() {
    const matches = [];
    
    // Sort queue by ELO
    this.queue.sort((a, b) => a.user.elo - b.user.elo);

    let i = 0;
    while (i < this.queue.length - 1) {
      const p1 = this.queue[i];
      const p2 = this.queue[i + 1];

      // Match criteria: ELO diff <= 200, or time in queue > 30s
      const eloDiff = Math.abs(p1.user.elo - p2.user.elo);
      const timeWait = Math.max(Date.now() - p1.joinedAt, Date.now() - p2.joinedAt);

      if (eloDiff <= 200 || timeWait > 30000) {
        // Create match
        const roomId = crypto.randomUUID();
        const match = {
          roomId,
          players: [p1, p2],
          status: 'starting',
          createdAt: Date.now()
        };

        this.activeMatches.set(roomId, match);
        matches.push(match);

        // Remove from queue
        this.queue.splice(i, 2);
      } else {
        i++;
      }
    }

    return matches;
  }

  getMatch(roomId) {
    return this.activeMatches.get(roomId);
  }

  endMatch(roomId) {
    return this.activeMatches.delete(roomId);
  }
}

export const matchmakingService = new MatchmakingService();
