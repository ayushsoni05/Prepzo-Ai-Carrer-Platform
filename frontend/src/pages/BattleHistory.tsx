import React from 'react';
import { motion } from 'framer-motion';
import { History, Target, Zap, Trophy, Shield, Play } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export const BattleHistory = () => {
  // Mock data for MVP
  const stats = {
    elo: 1450,
    winRate: 68,
    totalBattles: 42,
    rank: 'Gold III'
  };

  const pastBattles = [
    { id: 'b1', date: 'Oct 10, 2026', opponent: 'Alex Chen', result: 'win', eloChange: '+24', problem: 'Two Sum' },
    { id: 'b2', date: 'Oct 09, 2026', opponent: 'Sarah J.', result: 'loss', eloChange: '-12', problem: 'LRU Cache' },
    { id: 'b3', date: 'Oct 08, 2026', opponent: 'Max T.', result: 'win', eloChange: '+18', problem: 'Valid Parentheses' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-[900] uppercase tracking-tighter italic flex items-center gap-4">
              <History className="text-purple-400" size={40} />
              Battle History
            </h1>
            <p className="text-white/50 font-medium mt-2">Track your ranking and review past performances.</p>
          </div>
          <button 
            onClick={() => navigateTo('battle-arena')}
            className="px-6 py-3 bg-[#5ed29c] hover:bg-[#4bc18a] text-black font-[900] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(94,210,156,0.3)] flex items-center gap-2"
          >
            <Play size={20} className="fill-black" /> Enter Arena
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#161a20] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-purple-400" size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50">Current Rank</h3>
            </div>
            <p className="text-3xl font-[900] text-purple-400 italic">{stats.rank}</p>
          </div>
          <div className="bg-[#161a20] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-yellow-400" size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50">ELO Rating</h3>
            </div>
            <p className="text-3xl font-[900] text-yellow-400 italic">{stats.elo}</p>
          </div>
          <div className="bg-[#161a20] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-blue-400" size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50">Win Rate</h3>
            </div>
            <p className="text-3xl font-[900] text-blue-400 italic">{stats.winRate}%</p>
          </div>
          <div className="bg-[#161a20] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="text-[#5ed29c]" size={20} />
              <h3 className="text-xs font-black uppercase tracking-widest text-white/50">Total Battles</h3>
            </div>
            <p className="text-3xl font-[900] text-[#5ed29c] italic">{stats.totalBattles}</p>
          </div>
        </div>

        {/* History List */}
        <div className="bg-[#161a20] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-black/20">
            <h2 className="text-lg font-[900] uppercase tracking-widest">Recent Matches</h2>
          </div>
          <div className="divide-y divide-white/5">
            {pastBattles.map((battle, i) => (
              <motion.div 
                key={battle.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${battle.result === 'win' ? 'border-[#5ed29c]/20 bg-[#5ed29c]/10 text-[#5ed29c]' : 'border-red-500/20 bg-red-500/10 text-red-500'}`}>
                    {battle.result === 'win' ? 'W' : 'L'}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">vs {battle.opponent}</h4>
                    <p className="text-xs font-medium text-white/40 uppercase tracking-widest">{battle.problem} • {battle.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className={`font-mono font-bold text-lg ${battle.result === 'win' ? 'text-[#5ed29c]' : 'text-red-500'}`}>
                      {battle.eloChange} ELO
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white/5 group-hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors border border-white/10">
                    Review Code
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
