import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Star, Loader2, ArrowLeft } from 'lucide-react';

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
    case 0: return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
    case 1: return 'bg-gray-300/20 text-gray-300 border-gray-300/50';
    case 2: return 'bg-orange-600/20 text-orange-500 border-orange-600/50';
    default: return 'bg-gray-800 text-gray-400 border-gray-700';
  }
};

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/leaderboard/global');
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={() => window.location.hash = 'coding-lab'}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Coding Lab
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Global Leaderboard
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Compete with developers worldwide. Solve problems, earn XP, and climb the ranks to showcase your algorithmic mastery.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20 text-gray-400 bg-gray-800 rounded-2xl border border-gray-700">
            No users on the leaderboard yet. Be the first to solve a problem!
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Top 3 Podium (Desktop only) */}
            <div className="hidden md:flex justify-center items-end gap-6 mb-12 h-64">
              {users[1] && (
                <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <img src={users[1].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[1].fullName}`} alt="" className="w-20 h-20 rounded-full border-4 border-gray-400 z-10 bg-gray-800" />
                  <div className="w-32 bg-gradient-to-t from-gray-800 to-gray-700 h-32 rounded-t-lg border-t-4 border-gray-400 flex flex-col items-center justify-start pt-4 relative -mt-4 shadow-xl">
                    <Medal className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="font-bold text-white text-center px-2 truncate w-full">{users[1].fullName.split(' ')[0]}</span>
                    <span className="text-sm text-gray-400 font-semibold">{users[1].xp} XP</span>
                  </div>
                </div>
              )}
              
              {users[0] && (
                <div className="flex flex-col items-center animate-fade-in-up z-20">
                  <Trophy className="w-12 h-12 text-yellow-500 mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                  <img src={users[0].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[0].fullName}`} alt="" className="w-24 h-24 rounded-full border-4 border-yellow-500 z-10 bg-gray-800" />
                  <div className="w-36 bg-gradient-to-t from-yellow-900/40 to-yellow-600/20 h-40 rounded-t-lg border-t-4 border-yellow-500 flex flex-col items-center justify-start pt-4 relative -mt-4 shadow-[0_-10px_30px_rgba(234,179,8,0.15)]">
                    <span className="font-bold text-white text-center px-2 truncate w-full text-lg">{users[0].fullName.split(' ')[0]}</span>
                    <span className="text-sm text-yellow-500 font-bold">{users[0].xp} XP</span>
                  </div>
                </div>
              )}

              {users[2] && (
                <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <img src={users[2].avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${users[2].fullName}`} alt="" className="w-20 h-20 rounded-full border-4 border-orange-600 z-10 bg-gray-800" />
                  <div className="w-32 bg-gradient-to-t from-gray-800 to-orange-900/20 h-24 rounded-t-lg border-t-4 border-orange-600 flex flex-col items-center justify-start pt-4 relative -mt-4 shadow-xl">
                    <Medal className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="font-bold text-white text-center px-2 truncate w-full">{users[2].fullName.split(' ')[0]}</span>
                    <span className="text-sm text-orange-400 font-semibold">{users[2].xp} XP</span>
                  </div>
                </div>
              )}
            </div>

            {/* List */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-700 text-gray-400 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold w-24 text-center">Rank</th>
                    <th className="px-6 py-4 font-semibold">Coder</th>
                    <th className="px-6 py-4 font-semibold hidden sm:table-cell">Streak</th>
                    <th className="px-6 py-4 font-semibold text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-700/30 transition-colors group">
                      <td className="px-6 py-4 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-sm border ${getRankColors(index)}`}>
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/portfolio/${user._id}`} className="flex items-center gap-4">
                          <img 
                            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`} 
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full border border-gray-600 group-hover:border-blue-500 transition-colors bg-gray-800"
                          />
                          <div>
                            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">{user.fullName}</p>
                            {user.badges.length > 0 && (
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-500" /> {user.badges.length} Badges
                              </p>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Flame className={`w-4 h-4 ${user.streak > 0 ? 'text-orange-500' : 'text-gray-600'}`} />
                          <span className={`font-medium ${user.streak > 0 ? 'text-orange-200' : 'text-gray-500'}`}>
                            {user.streak} Days
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-white text-lg tracking-tight">
                          {user.xp.toLocaleString()}
                        </span>
                        <span className="text-xs text-blue-400 ml-1 font-bold">XP</span>
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
