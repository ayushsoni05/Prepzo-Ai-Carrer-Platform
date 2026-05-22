import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Play, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { getCodingProblems, CodingProblem } from '@/api/codingLab';
import { GridBeam } from '@/components/ui/background-grid-beam';

export const CodingLabHub: React.FC = () => {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#5ed29c] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.4em]">Technical Prep</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter italic">
              Coding <span className="text-white/30">Lab.</span>
            </h1>
            <p className="mt-4 text-white/40 italic max-w-xl">Master data structures and algorithms with company-specific challenges. Train for the "Hard" interviews in our interactive IDE.</p>
          </div>
          
          <div className="flex gap-4">
             <div className="px-6 py-4 rounded-2xl bg-[#0a0c10] border border-white/5 shadow-2xl flex items-center gap-4">
                <Code2 className="text-[#5ed29c]" />
                <div>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Total Problems</p>
                   <p className="text-2xl font-[900] text-white italic">{problems.length}</p>
                </div>
             </div>
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
                        <CheckCircle2 size={18} className="text-white/10 group-hover:text-white/20" />
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-lg font-[900] text-white italic hover:text-[#5ed29c] cursor-pointer transition-colors" onClick={() => window.location.hash = `playground?id=${problem.id}`}>
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
                          onClick={() => window.location.hash = `playground?id=${problem.id}`}
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
    </div>
  );
};

export default CodingLabHub;
