import { navigateTo } from '@/utils/navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Play, Building2, TrendingUp, CheckCircle2, ChevronLeft, Trophy, UserCircle, Swords, Globe, History, Crown, Cpu } from 'lucide-react';
import { getCodingProblems, CodingProblem } from '@/api/codingLab';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import { MatchmakingModal } from '@/components/multiplayer/MatchmakingModal';

export const CodingLabHub: React.FC = () => {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [isMatchmakingOpen, setIsMatchmakingOpen] = useState(false);
  const [visualizeUrl, setVisualizeUrl] = useState('');
  
  const { user } = useAuthStore();
  const { allRooms, getAllRooms, isConnected, connect } = useSocketStore();

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

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getCodingProblems();
        setProblems(data);
      } catch (err) {
        console.error('Failed to load coding problems:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();

    const solved = JSON.parse(localStorage.getItem('coding-lab-solved') || '[]');
    setSolvedIds(solved);
  }, []);

  const allCompanies = Array.from(new Set(problems.flatMap(p => p.companyTags)));

  const filteredProblems = problems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
    if (selectedCompany && !p.companyTags.includes(selectedCompany)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0c10] pt-24 px-6 pb-20 relative font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <GridBeam className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <button 
              onClick={() => navigateTo('dashboard')} 
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> Back to Dashboard
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#5ed29c] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.4em]">Technical Prep</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter italic">
              Coding <span className="text-white/30">Lab.</span>
            </h1>
            <p className="mt-4 text-white/40 italic max-w-xl">Master data structures and algorithms with company-specific challenges. Train for the "Hard" interviews in our interactive IDE.</p>
          </div>
          
          <div className="flex flex-col gap-4">
             {/* Gamification Links */}
             <div className="flex gap-4 w-full">
                <button 
                  onClick={() => navigateTo('find-match')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-red-500/20 to-red-600/5 border border-red-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/30 transition-colors shadow-lg shadow-red-500/10 group backdrop-blur-md"
                >
                  <Swords size={16} className="text-red-500 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Find Match</span>
                </button>
                <button 
                  onClick={() => navigateTo('leaderboard')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500/30 transition-colors shadow-lg shadow-yellow-500/10 group backdrop-blur-md"
                >
                  <Trophy size={16} className="text-yellow-500 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                  <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Leaderboard</span>
                </button>
                <button 
                  onClick={() => {
                    const profileId = user?._id || user?.id;
                    if (profileId) {
                      navigateTo(`portfolio/${profileId}`);
                    } else {
                      alert('Please sign in to view your profile');
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors shadow-lg shadow-blue-500/10 group backdrop-blur-md"
                >
                  <UserCircle size={16} className="text-blue-500 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">My Profile</span>
                </button>
             </div>
             
             <div className="flex gap-4 w-full">
                <button 
                  onClick={() => navigateTo('tournaments')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-500/30 transition-colors shadow-lg shadow-purple-500/10 group backdrop-blur-md"
                >
                  <Crown size={16} className="text-purple-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Tournaments</span>
                </button>
                <button 
                  onClick={() => navigateTo('battle-history')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 border border-indigo-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500/30 transition-colors shadow-lg shadow-indigo-500/10 group backdrop-blur-md"
                >
                  <History size={16} className="text-indigo-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">History</span>
                </button>
             </div>
             
             <div className="flex gap-4 w-full">
                <button 
                  onClick={() => navigateTo('create-battle')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-[#5ed29c]/20 to-[#5ed29c]/5 border border-[#5ed29c]/50 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5ed29c]/30 transition-colors shadow-[0_0_15px_rgba(94,210,156,0.2)] group backdrop-blur-md"
                >
                  <Swords size={16} className="text-[#5ed29c] group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(94,210,156,0.8)]" />
                  <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest italic">Custom Battle</span>
                </button>
                <button 
                  onClick={() => navigateTo('shadow-interview')}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition-colors shadow-lg shadow-emerald-500/10 group backdrop-blur-md"
                >
                  <Cpu size={16} className="text-emerald-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI Voice Interview</span>
                </button>
             </div>

             <div className="px-6 py-4 rounded-2xl bg-[#0a0c10] border border-white/5 shadow-2xl flex items-center gap-4">
                <Code2 className="text-[#5ed29c]" />
                <div>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Total Problems</p>
                   <p className="text-2xl font-[900] text-white italic">{problems.length}</p>
                </div>
             </div>
             
             {problems.length > 0 && (
               <div className="px-6 py-4 rounded-2xl bg-[#0a0c10] border border-white/5 shadow-2xl flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                   <p className="text-[9px] font-black text-[#5ed29c] uppercase tracking-[0.3em]">Your Progress</p>
                   <p className="text-xs font-[900] text-white">{solvedIds.length} <span className="text-white/30 text-[10px]">/ {problems.length}</span></p>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-[#5ed29c] transition-all duration-1000 ease-out" 
                     style={{ width: `${Math.min(100, Math.max(0, (solvedIds.length / problems.length) * 100))}%` }}
                   />
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* External Algorithm Visualizer */}
        <div className="bg-gradient-to-r from-[#5ed29c]/10 to-transparent border border-[#5ed29c]/20 rounded-[32px] p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h3 className="text-lg font-black text-[#5ed29c] italic uppercase tracking-widest mb-2 flex items-center gap-2">
              <Cpu size={20} /> AI Algorithm Visualizer
            </h3>
            <p className="text-white/60 text-xs">Got a problem from LeetCode or HackerRank? Paste the link here to generate a step-by-step visual explanation.</p>
          </div>
          <div className="flex-1 w-full flex gap-3">
            <input
              type="text"
              placeholder="PASTE PROBLEM URL..."
              value={visualizeUrl}
              onChange={(e) => setVisualizeUrl(e.target.value)}
              className="flex-1 bg-[#0a0c10] border border-white/10 rounded-xl py-3 px-4 text-[11px] font-[900] text-white placeholder:text-white/20 focus:outline-none focus:border-[#5ed29c]/50 transition-all uppercase italic tracking-widest"
            />
            <button
              onClick={() => {
                if(visualizeUrl) navigateTo(`external-visualizer?url=${encodeURIComponent(visualizeUrl)}`);
              }}
              className="px-6 py-3 bg-[#5ed29c] text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform whitespace-nowrap"
            >
              Visualize
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border border-white/5 bg-black/40 backdrop-blur-xl rounded-[32px] flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#5ed29c] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="SEARCH PROBLEMS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0c10] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-[11px] font-[900] text-white placeholder:text-white/10 focus:outline-none focus:border-[#5ed29c]/30 transition-all uppercase italic tracking-widest"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex bg-[#0a0c10] rounded-xl border border-white/5 p-1">
              {['Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                  className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedDifficulty === diff ? 'bg-[#5ed29c] text-black shadow-lg shadow-[#5ed29c]/20' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="relative group min-w-[200px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Building2 size={14} className="text-white/20" />
              </div>
              <select
                value={selectedCompany || ''}
                onChange={(e) => setSelectedCompany(e.target.value || null)}
                className="w-full appearance-none bg-[#0a0c10] border border-white/5 rounded-xl py-4 pl-10 pr-10 text-[11px] font-[900] text-white focus:outline-none focus:border-[#5ed29c]/30 transition-all uppercase italic tracking-widest cursor-pointer"
              >
                <option value="">ALL COMPANIES</option>
                {allCompanies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Live Public Lobbies */}
        <div className="bg-[#161a20] border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Globe size={150} />
          </div>
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <h2 className="text-2xl font-[900] text-white uppercase tracking-tight italic">Live Public Lobbies</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {allRooms.filter(r => r.mode === 'public').length === 0 ? (
              <div className="col-span-full py-12 text-center border border-white/5 bg-white/[0.02] rounded-2xl">
                <Globe className="w-12 h-12 text-white/10 mx-auto mb-4" />
                <p className="text-sm font-bold text-white/40 uppercase tracking-widest">No Active Public Lobbies</p>
                <p className="text-xs text-white/20 mt-2">Create one to challenge the community!</p>
              </div>
            ) : (
              allRooms.filter(r => r.mode === 'public').map(lobby => (
                <div key={lobby.roomId} className="bg-[#0a0c10] border border-white/10 rounded-2xl p-6 hover:border-[#5ed29c]/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Hosted By</p>
                      <p className="font-[900] text-white">{lobby.hostUser?.fullName || 'Anonymous'}</p>
                    </div>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black uppercase tracking-widest text-[#5ed29c]">Public</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Mission Objective</p>
                    <p className="text-sm font-bold text-blue-400 truncate">
                      {lobby.problems?.length === 1 
                        ? (problems.find(p => p.id === lobby.problems[0])?.title || 'Custom Problem')
                        : `${lobby.problems?.length || 0} Problems`}
                    </p>
                    <p className="text-[10px] font-bold text-white/60 mt-1">{lobby.timeLimit || 0} Minutes Limit</p>
                  </div>
                  <button 
                    onClick={() => navigateTo(`battle/invite/${lobby.roomId}`)}
                    className="w-full py-3 bg-white/5 hover:bg-[#5ed29c] hover:text-black border border-white/10 text-white font-[900] uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg group-hover:shadow-[#5ed29c]/20"
                  >
                    Join Battle
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-black/40 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Status</th>
                  <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Title</th>
                  <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Acceptance</th>
                  <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Difficulty</th>
                  <th className="py-6 px-8 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Companies</th>
                  <th className="py-6 px-8 text-right text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="w-8 h-8 border-2 border-[#5ed29c]/30 border-t-[#5ed29c] rounded-full animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <p className="text-white/30 italic uppercase tracking-widest text-xs font-bold">No problems found matching criteria</p>
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => (
                    <motion.tr 
                      key={problem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-6 px-8">
                        <CheckCircle2 size={18} className={`transition-colors ${solvedIds.includes(problem.id) ? 'text-[#5ed29c]' : 'text-white/10 group-hover:text-white/20'}`} />
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-lg font-[900] text-white italic hover:text-[#5ed29c] cursor-pointer transition-colors" onClick={() => navigateTo(`playground?id=${problem.id}`)}>
                          {problem.title}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2 text-white/60 font-bold">
                          <TrendingUp size={14} className="text-[#5ed29c]/50" />
                          {problem.acceptanceRate}%
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                          problem.difficulty === 'Easy' ? 'text-green-400 border-green-400/20 bg-green-400/5' :
                          problem.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' :
                          'text-red-400 border-red-400/20 bg-red-400/5'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex flex-wrap gap-2">
                          {problem.companyTags.map(tag => (
                            <span key={tag} className="text-[9px] font-black text-white/40 bg-white/5 px-2 py-1 rounded uppercase tracking-wider border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <button
                          onClick={() => navigateTo(`playground?id=${problem.id}`)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
                        >
                          <Play size={14} className="fill-black" /> Solve
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MatchmakingModal 
        isOpen={isMatchmakingOpen} 
        onClose={() => setIsMatchmakingOpen(false)} 
      />
    </div>
  );
};

export default CodingLabHub;
