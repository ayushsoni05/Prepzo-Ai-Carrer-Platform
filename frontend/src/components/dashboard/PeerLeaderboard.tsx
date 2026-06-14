import { useMemo, useState, useEffect } from 'react';
import { Trophy, Users, Star } from 'lucide-react';

interface PeerLeaderboardProps {
  collegeName?: string;
  currentUserScore?: number;
  currentUserName?: string;
  userPercentile?: number;
}

export function PeerLeaderboard({
  collegeName = 'Chitkara University',
  currentUserScore = 78.89,
  currentUserName = 'Ayush Soni',
  userPercentile = 8.18
}: PeerLeaderboardProps) {
  const displayCollege = collegeName || 'Chitkara University';

  // Construct dynamic leaderboard entries containing current user
  const [peers, setPeers] = useState([
    { name: 'Aditya Verma', score: 94.2, badge: 'Algorithmic Master', isCurrentUser: false, avatar: '12' },
    { name: 'Ananya Roy', score: 89.6, badge: 'Full Stack Architect', isCurrentUser: false, avatar: '18' },
    { name: currentUserName, score: currentUserScore, badge: 'System Designer', isCurrentUser: true, avatar: '05' },
    { name: 'Rohit Mehta', score: 74.5, badge: 'DevOps Specialist', isCurrentUser: false, avatar: '24' },
    { name: 'Simran Kaur', score: 68.2, badge: 'Rising Star', isCurrentUser: false, avatar: '33' }
  ]);

  // Sync props to state for current user
  useEffect(() => {
    setPeers(prev => prev.map(p => p.isCurrentUser ? { ...p, name: currentUserName, score: currentUserScore } : p));
  }, [currentUserName, currentUserScore]);

  // Simulate real-time score updates to make the board interactive and alive in real time
  useEffect(() => {
    const timer = setInterval(() => {
      setPeers(prev => {
        const randIdx = Math.floor(Math.random() * prev.length);
        const target = prev[randIdx];
        if (target.isCurrentUser) return prev; // Do not update current user
        
        // Increase their score by a small value between 0.1 and 1.5
        const increment = parseFloat((Math.random() * 1.4 + 0.1).toFixed(2));
        const newScore = parseFloat(Math.min(100, target.score + increment).toFixed(2));
        
        return prev.map((p, idx) => idx === randIdx ? { ...p, score: newScore } : p);
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const entries = useMemo(() => {
    return [...peers].sort((a, b) => b.score - a.score).map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));
  }, [peers]);

  return (
    <div className="rounded-[40px] p-8 bg-[#161a20] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#5ed29c]/20 transition-all duration-500 font-rubik h-full flex flex-col">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#5ed29c]/5 blur-[80px] rounded-full" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Users size={12} className="text-[#5ed29c]" />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">Campus Standings</p>
            </div>
            <h4 className="text-xl font-[900] text-white uppercase italic tracking-tighter">
              Peer <span className="text-[#5ed29c]">Leaderboard.</span>
            </h4>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-right">
            <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Campus Grid</p>
            <p className="text-[9px] font-bold text-white/70 uppercase max-w-[200px] sm:max-w-none leading-tight">{displayCollege}</p>
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
                      <p className={`text-[11px] font-black uppercase tracking-wider ${peer.isCurrentUser ? 'text-[#5ed29c]' : 'text-white'} truncate max-w-[100px]`}>
                        {peer.name}
                      </p>
                      {peer.isCurrentUser && (
                        <span className="text-[7px] font-black bg-[#5ed29c]/20 text-[#5ed29c] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
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

        {/* Fancy Campus Analytics Widget (Fills remaining height) */}
        <div className="mt-auto pt-8">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 italic mb-4">Campus Analytics</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mb-1">Total Analyzed</p>
              <p className="text-xl font-black text-white italic tracking-tighter">1,432</p>
            </div>
            <div className="bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-2xl p-4">
              <p className="text-[8px] font-bold text-[#5ed29c]/70 uppercase tracking-widest mb-1">Your Percentile</p>
              <p className="text-xl font-black text-[#5ed29c] italic tracking-tighter">Top {userPercentile.toFixed(2)}%</p>
            </div>
          </div>
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
