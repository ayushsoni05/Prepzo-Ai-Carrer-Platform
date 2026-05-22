import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Star, Loader2, ChevronLeft } from 'lucide-react';
import api from '../api/axios';

interface LeaderboardUser {
  _id: string;
  fullName: string;
  avatar: string;
  xp: number;
  streak: number;
  badges: { name: string }[];
}

const getRankColors = (index: number) => {
  switch (index) {
    case 0: return 'bg-[#5ed29c]/10 text-[#5ed29c] border-[#5ed29c]/30 shadow-[0_0_15px_rgba(94,210,156,0.3)]';
    case 1: return 'bg-white/10 text-white border-white/30';
    case 2: return 'bg-white/5 text-white/60 border-white/10';
    default: return 'bg-[#0a0c10] text-white/30 border-white/5';
  }
};

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/users/leaderboard/global');
        if (res.data.success) {
          setUsers(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black relative overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0c10] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #5ed29c 0%, transparent 50%)' }} />

      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <button 
          onClick={() => window.location.hash = 'coding-lab'}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Coding Lab
        </button>

        <div className="text-center mb-20">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#5ed29c] mb-6">Verified Edge</p>
          <h1 className="text-5xl md:text-7xl font-[900] text-white flex flex-col items-center justify-center gap-2 mb-6 tracking-tighter uppercase italic leading-[0.85]">
            <Trophy className="w-16 h-16 text-[#5ed29c] mb-4 drop-shadow-[0_0_20px_rgba(94,210,156,0.6)]" />
            Global <span className="text-white/40">Leaderboard</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-[13px] font-bold uppercase tracking-widest leading-relaxed mt-8">
            Compete with developers worldwide. Solve problems, earn XP, and climb the ranks to showcase your algorithmic mastery.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-[#5ed29c] animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-white/30 bg-[#161a20] rounded-[40px] border border-white/5 font-black uppercase tracking-widest text-[12px]">
            No users on the leaderboard yet. Be the first to solve a problem!
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Top 3 Podium (Desktop only) */}
            <div className="hidden md:flex justify-center items-end gap-6 mb-16 h-72">
              {users[1] && (
                <div className="flex flex-col items-center animate-fade-in-up group" style={{ animationDelay: '100ms' }}>
                  <img src={users[1].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[1].fullName}`} alt="" className="w-20 h-20 rounded-full border-[4px] border-white z-10 bg-[#0a0c10] shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                  <div className="w-36 bg-[#161a20] h-36 rounded-t-[32px] border border-white/20 border-b-0 flex flex-col items-center justify-start pt-8 relative -mt-6 shadow-2xl">
                    <Medal className="w-8 h-8 text-white mb-3" />
                    <span className="font-[900] text-white uppercase italic tracking-tight text-center px-2 truncate w-full">{users[1].fullName.split(' ')[0]}</span>
                    <span className="text-[10px] text-white/60 font-black uppercase tracking-widest mt-1">{users[1].xp} XP</span>
                  </div>
                </div>
              )}
              
              {users[0] && (
                <div className="flex flex-col items-center animate-fade-in-up z-20 group">
                  <div className="absolute -top-16 opacity-50 blur-2xl rounded-full w-32 h-32 bg-[#5ed29c] pointer-events-none" />
                  <Trophy className="w-12 h-12 text-[#5ed29c] mb-4 drop-shadow-[0_0_15px_rgba(94,210,156,0.8)] relative z-30" />
                  <img src={users[0].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[0].fullName}`} alt="" className="w-24 h-24 rounded-full border-[6px] border-[#5ed29c] z-10 bg-[#0a0c10] shadow-[0_0_30px_rgba(94,210,156,0.3)] group-hover:scale-110 transition-transform duration-500" />
                  <div className="w-40 bg-gradient-to-t from-[#0a0c10] to-[#5ed29c]/20 h-44 rounded-t-[36px] border-t-4 border-l border-r border-[#5ed29c] flex flex-col items-center justify-start pt-8 relative -mt-6 shadow-[0_-10px_40px_rgba(94,210,156,0.2)]">
                    <span className="font-[900] text-white uppercase italic tracking-tight text-center px-2 truncate w-full text-xl">{users[0].fullName.split(' ')[0]}</span>
                    <span className="text-[11px] text-[#5ed29c] font-black uppercase tracking-widest mt-1">{users[0].xp} XP</span>
                  </div>
                </div>
              )}

              {users[2] && (
                <div className="flex flex-col items-center animate-fade-in-up group" style={{ animationDelay: '200ms' }}>
                  <img src={users[2].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[2].fullName}`} alt="" className="w-20 h-20 rounded-full border-[4px] border-white/50 z-10 bg-[#0a0c10] shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                  <div className="w-36 bg-[#161a20] h-28 rounded-t-[32px] border border-white/10 border-b-0 flex flex-col items-center justify-start pt-8 relative -mt-6 shadow-2xl">
                    <Medal className="w-8 h-8 text-white/50 mb-3" />
                    <span className="font-[900] text-white uppercase italic tracking-tight text-center px-2 truncate w-full">{users[2].fullName.split(' ')[0]}</span>
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">{users[2].xp} XP</span>
                  </div>
                </div>
              )}
            </div>

            {/* List */}
            <div className="bg-[#161a20] rounded-[48px] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] w-24 text-center">Rank</th>
                    <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Coder</th>
                    <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hidden sm:table-cell">Streak</th>
                    <th className="py-6 px-8 text-right text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Total XP</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <td className="py-5 px-8 text-center">
                        <div className={`w-10 h-10 mx-auto rounded-[12px] flex items-center justify-center font-[900] text-lg italic ${getRankColors(index)}`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-5 px-8">
                        <Link to={`#portfolio/${user._id}`} className="flex items-center gap-5">
                          <img 
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`} 
                            alt={user.fullName}
                            className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-[#5ed29c] transition-colors bg-[#0a0c10]"
                          />
                          <div>
                            <p className="font-[900] text-white text-[15px] uppercase tracking-tight italic group-hover:text-[#5ed29c] transition-colors">{user.fullName}</p>
                            {user.badges.length > 0 && (
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                                <Star className="w-3 h-3 text-[#5ed29c]" /> {user.badges.length} Badges
                              </p>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="py-5 px-8 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Flame className={`w-4 h-4 ${user.streak > 0 ? 'text-orange-500' : 'text-white/10'}`} />
                          <span className={`text-[11px] font-black uppercase tracking-widest ${user.streak > 0 ? 'text-orange-400' : 'text-white/30'}`}>
                            {user.streak} Days
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-8 text-right">
                        <span className="font-[900] text-white text-2xl tracking-tighter italic">
                          {user.xp.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#5ed29c] font-black uppercase tracking-[0.2em] ml-2">XP</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
