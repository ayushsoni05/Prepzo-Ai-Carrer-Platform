import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Code2, Flame, Mail, ChevronRight, X, Building, Users } from 'lucide-react';
import api from '../api/axios';

export const RecruiterDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get('/recruiters/candidates');
        setCandidates(response.data.data.candidates);
      } catch (error) {
        console.error('Failed to fetch candidates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Recruiter Portal</h1>
              <p className="text-sm text-gray-500">Discover verified tech talent</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              Saved Profiles
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Recruiter" alt="Recruiter" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, role, or skill..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-2 font-medium hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Role</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">XP & Rank</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Top Skills</th>
                  <th className="py-4 px-6 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400">Loading candidates...</td>
                  </tr>
                ) : candidates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400">No candidates found matching criteria.</td>
                  </tr>
                ) : (
                  candidates.map((candidate: any) => (
                    <tr key={candidate._id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => setSelectedCandidate(candidate)}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={candidate.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.fullName}`} 
                            alt="" 
                            className="w-10 h-10 rounded-full border border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{candidate.fullName}</p>
                            <p className="text-xs text-gray-500">{candidate.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {candidate.targetRole || 'Software Engineer'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm font-semibold">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {candidate.xp || 0}
                          </div>
                          {candidate.streak > 0 && (
                            <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                              <Flame className="w-3 h-3" />
                              {candidate.streak}d
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {candidate.knownTechnologies?.slice(0, 3).map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-600 uppercase">
                              {tech}
                            </span>
                          ))}
                          {candidate.knownTechnologies?.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-medium text-gray-500">
                              +{candidate.knownTechnologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
