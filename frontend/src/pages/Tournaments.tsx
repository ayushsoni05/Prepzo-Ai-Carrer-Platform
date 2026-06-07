import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, Users, Crown, ChevronRight, Activity, Calendar } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export const Tournaments = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingTournaments = [
    { id: '1', name: 'Global Algo-Rumble', date: 'Oct 15, 2026', participants: 64, prize: '10,000 XP', status: 'Registration Open' },
    { id: '2', name: 'Dynamic Programming Decathlon', date: 'Oct 22, 2026', participants: 32, prize: '5,000 XP', status: 'Upcoming' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-[900] uppercase tracking-tighter italic flex items-center gap-4">
              <Trophy className="text-[#5ed29c]" size={40} />
              Tournaments
            </h1>
            <p className="text-white/50 font-medium mt-2">Compete in massive brackets for glory and XP.</p>
          </div>
          <button 
            onClick={() => navigateTo('battle-arena')}
            className="px-6 py-3 bg-[#5ed29c] hover:bg-[#4bc18a] text-black font-[900] uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(94,210,156,0.3)] hover:shadow-[0_0_30px_rgba(94,210,156,0.5)] flex items-center gap-2"
          >
            <Swords size={20} /> 1v1 Battle
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 font-black uppercase tracking-widest text-sm rounded-lg transition-colors ${activeTab === 'upcoming' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 font-black uppercase tracking-widest text-sm rounded-lg transition-colors ${activeTab === 'past' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            Past Champions
          </button>
        </div>

        {/* Content */}
        {activeTab === 'upcoming' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTournaments.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#161a20] border border-white/5 hover:border-[#5ed29c]/50 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ed29c]/5 rounded-bl-full -z-10 group-hover:bg-[#5ed29c]/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <Crown className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-[900] text-xl uppercase tracking-tight">{t.name}</h3>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t.status}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <Calendar className="text-white/30 w-4 h-4 mb-1" />
                    <p className="text-xs font-bold text-white/70">{t.date}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <Users className="text-white/30 w-4 h-4 mb-1" />
                    <p className="text-xs font-bold text-white/70">{t.participants} Slots</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-[#5ed29c]/20">
                    <Trophy className="text-[#5ed29c]/50 w-4 h-4 mb-1" />
                    <p className="text-xs font-bold text-[#5ed29c]">{t.prize}</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-white/5 group-hover:bg-[#5ed29c] group-hover:text-black border border-white/10 group-hover:border-transparent rounded-xl font-[900] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  Register Now <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-[#161a20] border border-white/5 rounded-2xl p-12 text-center">
            <Activity className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-[900] uppercase tracking-widest text-white/30 mb-2">No Past Tournaments</h3>
            <p className="text-white/40">The arena is fresh. Become the first champion.</p>
          </div>
        )}
      </div>
    </div>
  );
};
