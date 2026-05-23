import { useMemo } from 'react';
import { Trophy, Users, Star } from 'lucide-react';

interface PeerLeaderboardProps {
  collegeName?: string;
  currentUserScore?: number;
  currentUserName?: string;
}

export function PeerLeaderboard({
  collegeName = 'Chitkara University',
  currentUserScore = 78.89,
  currentUserName = 'Ayush Soni'
}: PeerLeaderboardProps) {
  const displayCollege = collegeName || 'Chitkara University';

  // Construct dynamic leaderboard entries containing current user
  const entries = useMemo(() => {
    const defaultPeers = [
      { name: 'Aditya Verma', score: 94.2, badge: 'Algorithmic Master', isCurrentUser: false, rank: 1, avatar: '12' },
      { name: 'Ananya Roy', score: 89.6, badge: 'Full Stack Architect', isCurrentUser: false, rank: 2, avatar: '18' },
      { name: currentUserName, score: currentUserScore, badge: 'System Designer', isCurrentUser: true, rank: 3, avatar: '05' },
      { name: 'Rohit Mehta', score: 74.5, badge: 'DevOps Specialist', isCurrentUser: false, rank: 4, avatar: '24' },
      { name: 'Simran Kaur', score: 68.2, badge: 'Rising Star', isCurrentUser: false, rank: 5, avatar: '33' }
    ];

    // Sort based on score dynamically
    return defaultPeers.sort((a, b) => b.score - a.score).map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));
  }, [currentUserName, currentUserScore]);

  return (
    <div className="rounded-[40px] p-8 bg-[#161a20] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#5ed29c]/20 transition-all duration-500 font-rubik">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#5ed29c]/5 blur-[80px] rounded-full" />

      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Users size={12} className="text-[#5ed29c]" />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">Institution Pulse</p>
            </div>
            <h4 className="text-xl font-[900] text-white uppercase italic tracking-tighter">
              Peer <span className="text-[#5ed29c]">Leaderboard.</span>
            </h4>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-right">
            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Campus Grid</p>
            <p className="text-[9px] font-bold text-white/70 uppercase max-w-[150px] truncate">{displayCollege}</p>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-3">
          {entries.map((peer) => {
            const isTop3 = peer.rank <= 3;
            const rankIconColor = 
              peer.rank === 1 ? 'text-amber-400' : 
              peer.rank === 2 ? 'text-slate-300' : 
              peer.rank === 3 ? 'text-amber-600' : 'text-white/20';

            return (
              <div
                key={peer.name}
                className={`flex items-center justify-between p-3.5 rounded-3xl transition-all duration-300 ${
                  peer.isCurrentUser
                    ? 'bg-gradient-to-r from-[#5ed29c]/10 to-transparent border border-[#5ed29c]/30 shadow-[0_0_15px_rgba(94,210,156,0.1)] relative'
                    : 'bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
              >
                {/* Profile info & Rank */}
                <div className="flex items-center gap-3">
                  {/* Rank identifier */}
                  <div className="w-6 flex items-center justify-center font-black italic text-xs text-white/30">
                    {isTop3 ? (
                      <Trophy size={14} className={rankIconColor} />
                    ) : (
                      peer.rank
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative w-8 h-8 rounded-full border border-white/10 bg-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${peer.avatar}`} 
                      alt={peer.name} 
                      className={`w-full h-full object-cover ${peer.isCurrentUser ? 'opacity-80' : 'opacity-40'}`} 
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className={`text-[11px] font-black uppercase tracking-wider ${peer.isCurrentUser ? 'text-[#5ed29c]' : 'text-white'}`}>
                        {peer.name}
                      </p>
                      {peer.isCurrentUser && (
                        <span className="text-[7px] font-black bg-[#5ed29c]/20 text-[#5ed29c] px-1.5 py-0.5 rounded uppercase tracking-wider">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest italic">
                      {peer.badge}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-[12px] font-black text-white italic tracking-tighter">
                    {peer.score.toFixed(2)}
                  </p>
                  <p className="text-[7px] font-bold text-white/20 uppercase tracking-wider">
                    Readiness
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer statistics */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-white/30 uppercase tracking-[0.2em] italic">
          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-400" />
            Ranked Top 20% on campus
          </div>
          <div>
            Last calculated hourly
          </div>
        </div>
      </div>
    </div>
  );
}
