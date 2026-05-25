import { navigateTo } from '@/utils/navigation';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Lock, Globe, ChevronLeft } from 'lucide-react';
import { useSocketStore } from '@/store/socketStore';
import { useAuthStore } from '@/store/authStore';
import { GridBeam } from '@/components/ui/background-grid-beam';

export const FindMatch = () => {
  const navigate = useNavigate();
  const { allRooms, getAllRooms, isConnected, connect } = useSocketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isConnected && user) {
      connect(user);
    }
  }, [isConnected, user, connect]);

  useEffect(() => {
    if (isConnected) {
      getAllRooms();
    }
  }, [isConnected, getAllRooms]);

  return (
    <div className="min-h-screen bg-[#0a0c10] pt-24 px-6 pb-20 relative font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <GridBeam className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => navigateTo('coding-lab')} 
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors w-fit text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <ChevronLeft size={16} /> Back to Coding Lab
          </button>
          <div className="flex items-center gap-3">
            <Swords className="text-red-500" size={24} />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Battle Lobbies</span>
          </div>
          <h1 className="text-5xl font-[900] text-white uppercase tracking-tighter italic">
            Find <span className="text-white/30">Match.</span>
          </h1>
          <p className="mt-2 text-white/40 italic max-w-xl">Browse active battles created by the community. Join a public match instantly or enter a PIN for private lobbies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRooms.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-white/5 bg-white/[0.02] rounded-2xl">
              <Globe className="w-16 h-16 text-white/10 mx-auto mb-6" />
              <p className="text-base font-[900] text-white/40 uppercase tracking-widest">No Active Battles Found</p>
              <p className="text-sm text-white/20 mt-2">Go back and create your own to challenge others!</p>
            </div>
          ) : (
            allRooms.map(lobby => (
              <div key={lobby.roomId} className="bg-[#161a20] border border-white/10 rounded-3xl p-6 hover:border-red-500/50 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-black/50 shrink-0">
                        <img src={lobby.hostUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${lobby.hostUser?.fullName}`} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Host</p>
                        <p className="font-[900] text-sm text-white truncate max-w-[120px]">{lobby.hostUser?.fullName || 'Anonymous'}</p>
                      </div>
                    </div>
                    {lobby.mode === 'private' ? (
                      <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-purple-400">
                        <Lock size={10} /> Private
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-[#5ed29c]/10 border border-[#5ed29c]/30 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#5ed29c]">
                        <Globe size={10} /> Public
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 flex items-center gap-2">Mission</p>
                      <p className="text-sm font-bold text-white truncate">
                        {lobby.problems?.length === 1 ? '1 Challenge Selected' : `${lobby.problems?.length || 0} Challenges`}
                      </p>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1 flex items-center gap-2">Time Limit</p>
                      <p className="text-sm font-bold text-white truncate">{lobby.timeLimit || 0} Minutes</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigateTo(`battle/invite/${lobby.roomId}`)}
                  className="w-full py-4 bg-white/5 hover:bg-red-500 hover:text-white border border-white/10 text-white font-[900] uppercase tracking-widest text-[11px] rounded-2xl transition-all shadow-lg group-hover:shadow-red-500/20 group-hover:border-red-500/50 flex items-center justify-center gap-2"
                >
                  <Swords size={14} className="group-hover:animate-pulse" />
                  Join Battle
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
