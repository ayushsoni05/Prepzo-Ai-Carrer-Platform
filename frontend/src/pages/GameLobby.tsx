import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, Star, ShieldAlert, Award, Sparkles, Layout, Flame, BrainCircuit, Target, Code } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';

export const GameLobby = () => {
  const [stats, setStats] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leaderboardRes] = await Promise.all([
          api.get('/games/stats'),
          api.get('/games/leaderboard')
        ]);
        setStats(statsRes.data?.data);
        setLeaderboard(leaderboardRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch game stats/leaderboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const games = [
    {
      id: 'trivia',
      title: 'CS Trivia Sprint',
      description: 'Rapid-fire 1v1 CS fundamentals duel testing OS, DBMS, OOPs, and Networks. Speed yields bonus points!',
      icon: <BrainCircuit className="w-8 h-8 text-purple-400 animate-pulse" />,
      xpReward: '+10 XP / Answer, +50 XP / Win',
      difficulty: 'Medium',
      route: 'trivia-sprint',
      active: true,
      stats: stats ? `${stats.trivia?.won} Wins / ${stats.trivia?.played} Played` : '0 Wins / 0 Played'
    },
    {
      id: 'regex',
      title: 'Regex Invaders',
      description: 'Arcade shooter to master Regular Expressions. Write matching regex patterns to shoot down descending text enemies.',
      icon: <Target className="w-8 h-8 text-emerald-400 animate-bounce" />,
      xpReward: '+20 XP / Level, +Score/10 XP',
      difficulty: 'Hard',
      route: 'regex-invaders',
      active: true,
      stats: stats ? `High Score: ${stats.regexInvaders?.highScore} (Lvl ${stats.regexInvaders?.maxLevelReached})` : 'High Score: 0'
    },
    {
      id: 'codegolf',
      title: 'AI Code-Golf Duel',
      description: 'The ultimate compression duel. Write the shortest possible functional code matching unit tests.',
      icon: <Code className="w-8 h-8 text-blue-400" />,
      xpReward: 'Based on compression efficiency',
      difficulty: 'Expert',
      route: '#',
      active: false,
      stats: 'Phase 2 Coming Soon'
    },
    {
      id: 'cyber',
      title: 'Fix the Hack Sandbox',
      description: 'Play as a Cyber Guard. Identify and secure vulnerable code (XSS, SQLi, CSRF) before systems get breached.',
      icon: <ShieldAlert className="w-8 h-8 text-red-400" />,
      xpReward: '+50 XP / Successful Patch',
      difficulty: 'Medium',
      route: '#',
      active: false,
      stats: 'Phase 2 Coming Soon'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Hero Banner */}
        <div className="relative overflow-hidden rounded-[40px] p-10 md:p-14 bg-black border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Trophy size={220} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-7xl font-[900] text-white uppercase tracking-tighter italic mb-4">
                Playground <span className="text-white/40">Arena.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium tracking-tight max-w-2xl italic leading-relaxed">
                Elevate your technical skills and CS fundamentals through interactive, gamified placement prep challenges. Earn XP, unlock badges, and dominate the standings.
              </p>
            </div>
            {stats && (
              <div className="bg-[#161a20] border border-white/10 rounded-3xl p-6 flex items-center gap-5 shrink-0 shadow-lg">
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Earned</p>
                  <p className="text-2xl font-[900] text-purple-400">{stats.xp} XP</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Games Grid (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-[900] uppercase tracking-wider text-[#5ed29c] italic pl-2">Available Mini-Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <div 
                  key={game.id}
                  className={`bg-[#13171d] border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] transition-all relative overflow-hidden group ${game.active ? 'hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]' : 'opacity-60'}`}
                >
                  {/* Neon Glow on Hover */}
                  {game.active && (
                    <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all duration-300 pointer-events-none" />
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        {game.icon}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${game.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : game.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {game.difficulty}
                      </span>
                    </div>

                    <h3 className="text-xl font-[900] tracking-tight mb-2">{game.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed font-medium mb-4">{game.description}</p>
                  </div>

                  <div>
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs font-bold text-white/40 mb-5">
                      <span>{game.xpReward}</span>
                      <span className="text-white/60">{game.stats}</span>
                    </div>

                    {game.active ? (
                      <button 
                        onClick={() => navigateTo(game.route)}
                        className="w-full py-3.5 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        Play Now
                      </button>
                    ) : (
                      <button 
                        disabled
                        className="w-full py-3.5 bg-white/5 border border-white/5 text-white/30 font-[900] uppercase tracking-widest text-xs rounded-xl cursor-not-allowed"
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges Box */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-[900] uppercase tracking-wider italic">Your Achievements</h2>
              </div>
              {stats?.badges?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {stats.badges.map((badge: string, i: number) => (
                    <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-400 shadow-md">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-wider">{badge}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40 font-medium italic">No badges unlocked yet. Compete in mini-games to unlock exclusive titles!</p>
              )}
            </div>
          </div>

          {/* Leaderboard (Right 1 column) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-[900] uppercase tracking-wider text-[#5ed29c] italic pl-2">Top Arena Players</h2>
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 shadow-2xl flex flex-col min-h-[500px]">
              {loading ? (
                <div className="flex-1 flex items-center justify-center text-white/40 font-bold uppercase tracking-widest">Calculating Standings...</div>
              ) : leaderboard.length > 0 ? (
                <div className="space-y-4">
                  {leaderboard.map((player: any, idx: number) => (
                    <div 
                      key={player._id} 
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${idx === 0 ? 'bg-yellow-500/5 border-yellow-500/20' : idx === 1 ? 'bg-slate-400/5 border-slate-400/20' : idx === 2 ? 'bg-amber-600/5 border-amber-600/20' : 'bg-black/10 border-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-[900] w-5 text-center ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-amber-600' : 'text-white/30'}`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-[900] text-sm text-white/95">{player.user?.fullName || 'Anonymous Coder'}</p>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{player.user?.targetRole || 'Software Engineer'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-[900] text-purple-400">{player.xp} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-white/40 font-bold uppercase tracking-widest">Lobby is currently empty</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
