import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Flame, Mail, ChevronRight, X, Building2, BrainCircuit, Zap, CheckCircle2, Bot, Calendar } from 'lucide-react';
import api from '../api/axios';
import { getFileUrl } from '@/utils/fileUrl';

export const RecruiterDashboard = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    // For MVP, if the API fails, we use high-quality dummy data
    const fetchCandidates = async () => {
      try {
        const response = await api.get('/recruiters/candidates');
        if (response.data?.data?.candidates?.length > 0) {
           setCandidates(response.data.data.candidates);
        } else {
           loadDummyData();
        }
      } catch (error) {
        console.error('Failed to fetch candidates, loading dummy data', error);
        loadDummyData();
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const loadDummyData = () => {
    setCandidates([
      { _id: '1', fullName: 'Ayush Soni', email: 'ayush@example.com', targetRole: 'Full Stack Engineer', xp: 4500, streak: 12, knownTechnologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'], atsScore: 94, battleArenaRank: 'Top 5%' },
      { _id: '2', fullName: 'Sarah Chen', email: 'sarah@example.com', targetRole: 'Frontend Developer', xp: 3200, streak: 8, knownTechnologies: ['React', 'Next.js', 'Tailwind', 'Framer Motion'], atsScore: 88, battleArenaRank: 'Top 12%' },
      { _id: '3', fullName: 'James Wilson', email: 'james@example.com', targetRole: 'Backend Engineer', xp: 5100, streak: 21, knownTechnologies: ['Python', 'Django', 'AWS', 'Docker', 'Go'], atsScore: 91, battleArenaRank: 'Top 8%' },
      { _id: '4', fullName: 'Priya Patel', email: 'priya@example.com', targetRole: 'AI/ML Engineer', xp: 2800, streak: 3, knownTechnologies: ['Python', 'TensorFlow', 'PyTorch', 'SQL'], atsScore: 85, battleArenaRank: 'Top 18%' },
    ]);
  };

  const handleSelectCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setAiSummary(null);
    setInviteSent(false);
    setIsGeneratingSummary(true);
    
    // Simulate AI Summary Generation
    setTimeout(() => {
      setAiSummary(`Why hire ${candidate.fullName.split(' ')[0]}?\n\n- Elite Coder: Ranked in the ${candidate.battleArenaRank} of the Battle Arena.\n- Perfect Match: ${candidate.atsScore}% ATS Match for your open positions.\n- Tech Stack: Highly proficient in ${candidate.knownTechnologies.slice(0, 3).join(', ')}.\n- Reliability: Currently on a ${candidate.streak}-day coding streak indicating high consistency.`);
      setIsGeneratingSummary(false);
    }, 1500);
  };

  const handleInstaBook = () => {
    setInviteSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black flex flex-col overflow-hidden">
      {/* Premium Header */}
      <header className="h-20 bg-[#161a20]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] uppercase italic tracking-tighter">Talent Pipeline</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Recruiter Monopoly Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all">
            Saved Profiles
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right">
              <p className="text-sm font-bold">TechCorp Inc.</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c]">Premium Tier</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#5ed29c] overflow-hidden bg-white/5 p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter" alt="Recruiter" className="w-full h-full rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Candidates Table */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar border-r border-white/5">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#5ed29c] transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, role, or skill..." 
                className="w-full pl-12 pr-4 py-4 bg-[#161a20] border border-white/5 rounded-2xl text-white placeholder-white/20 focus:border-[#5ed29c]/30 focus:bg-[#161a20]/80 outline-none transition-all font-medium"
              />
            </div>
            <button className="px-6 py-4 bg-[#161a20] border border-white/5 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:border-white/10 transition-all text-white/70 hover:text-white">
              <Filter className="w-4 h-4" />
              Smart Filters
            </button>
          </div>

          {/* Candidates List */}
          <div className="bg-[#161a20] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/20">
                  <th className="py-5 px-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Candidate</th>
                  <th className="py-5 px-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Target Role</th>
                  <th className="py-5 px-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Arena Rank</th>
                  <th className="py-5 px-6 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Top Skills</th>
                  <th className="py-5 px-6 text-right text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-white/40 font-bold uppercase tracking-widest">Scanning network...</td>
                  </tr>
                ) : candidates.map((candidate: any) => (
                  <tr 
                    key={candidate._id} 
                    className={`hover:bg-white/5 transition-all cursor-pointer group ${selectedCandidate?._id === candidate._id ? 'bg-[#5ed29c]/5 border-l-4 border-l-[#5ed29c]' : 'border-l-4 border-l-transparent'}`}
                    onClick={() => handleSelectCandidate(candidate)}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={candidate.avatar ? getFileUrl(candidate.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.fullName}`} 
                          alt="" 
                          className="w-12 h-12 rounded-2xl border border-white/10 bg-black/50"
                        />
                        <div>
                          <p className="font-[900] text-lg">{candidate.fullName}</p>
                          <p className="text-xs text-white/40 font-bold">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {candidate.targetRole || 'Software Engineer'}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-sm font-[900] text-yellow-400">
                          <Trophy className="w-4 h-4" />
                          {candidate.battleArenaRank}
                        </div>
                        {candidate.streak > 0 && (
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-400">
                            <Flame className="w-3 h-3" />
                            {candidate.streak} Day Streak
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex flex-wrap gap-2">
                        {candidate.knownTechnologies?.slice(0, 3).map((tech: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-white/60 uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ml-auto group-hover:bg-[#5ed29c] group-hover:text-black transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: AI Candidate Intelligence Panel */}
        <div className="w-[450px] bg-[#161a20] border-l border-white/5 flex flex-col shrink-0 relative">
          {!selectedCandidate ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-30">
              <BrainCircuit className="w-20 h-20 mb-6 text-white/20" />
              <h3 className="text-xl font-[900] uppercase tracking-widest mb-2">AI Intelligence Hub</h3>
              <p className="text-sm text-white/50 font-medium">Select a candidate from the pipeline to generate an AI assessment and view hiring leverage.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500">
              {/* Profile Header */}
              <div className="p-8 border-b border-white/5 bg-gradient-to-b from-[#5ed29c]/5 to-transparent">
                <div className="flex items-start justify-between mb-6">
                  <img 
                    src={selectedCandidate.avatar ? getFileUrl(selectedCandidate.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCandidate.fullName}`} 
                    alt="" 
                    className="w-24 h-24 rounded-3xl border-2 border-[#5ed29c] shadow-[0_0_20px_rgba(94,210,156,0.3)] bg-black"
                  />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-xl text-[#5ed29c]">
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Top Pick</span>
                  </div>
                </div>
                <h2 className="text-3xl font-[900] tracking-tighter mb-1">{selectedCandidate.fullName}</h2>
                <p className="text-[#5ed29c] font-bold text-sm mb-4">{selectedCandidate.targetRole}</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {selectedCandidate.email}</span>
                </div>
              </div>

              {/* AI Summary Section */}
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400">AI Candidate Summary</h3>
                </div>

                {isGeneratingSummary ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 relative mb-4">
                      <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin" />
                      <BrainCircuit className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={20} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 animate-pulse">Analyzing Profile Data...</p>
                  </div>
                ) : (
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 relative">
                    <div className="prose prose-invert prose-sm">
                      {aiSummary?.split('\\n').map((line, i) => (
                        <p key={i} className="mb-2 text-purple-100/80 leading-relaxed font-medium">
                          {line.startsWith('-') ? <span className="flex gap-3"><span className="text-purple-400 mt-1">•</span>{line.substring(2)}</span> : <strong className="text-purple-300 font-bold block mb-4">{line}</strong>}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Match Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">ATS Match Score</p>
                    <p className="text-3xl font-[900] text-[#5ed29c] italic">{selectedCandidate.atsScore}%</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Arena Rating</p>
                    <p className="text-3xl font-[900] text-yellow-400 italic">{selectedCandidate.xp}</p>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-white/5 bg-black/20 mt-auto">
                {inviteSent ? (
                  <div className="w-full py-4 bg-green-500/10 border border-green-500/20 text-green-400 font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Interview Invite Sent
                  </div>
                ) : (
                  <button 
                    onClick={handleInstaBook}
                    className="w-full py-4 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <Calendar className="w-4 h-4" />
                    Insta-Book Interview
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
