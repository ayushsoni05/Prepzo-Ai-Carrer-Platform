import React, { useState } from 'react';
import { motion as motionFramer, AnimatePresence as AnimatePresenceFramer } from 'framer-motion';
import { Trophy, ArrowLeft, Upload, FileText, Code, PieChart as PieIcon, Activity, Sparkles, ShieldAlert, Cpu, CheckCircle, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ActivityCalendar } from 'react-activity-calendar';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

const COLORS = ['#a855f7', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6', '#f43f5e'];

export const GithubReconstructor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragOver(true);
    } else if (e.type === 'dragleave') {
      setDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.zip')) {
        setFile(droppedFile);
      } else {
        showError('Please upload a .zip repository archive only.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.endsWith('.zip')) {
        setFile(selectedFile);
      } else {
        showError('Please select a .zip file.');
      }
    }
  };

  const startAnalysis = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('repository', file);

    try {
      const response = await api.post('/github/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data?.success) {
        setResults(response.data.data);
        showSuccess('Repository analyzed successfully!');
        
        // Check if Git Architect was newly added to badges
        const finalBadges = response.data.data.badges || [];
        if (finalBadges.includes('Git Architect')) {
          setNewBadge('Git Architect');
          setShowBadgeModal(true);
        }
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to analyze repository zip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('game-lobby')}
            className="p-3 bg-[#13171d] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
          </button>
          <div>
            <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">GitHub <span className="text-purple-400">Reconstructor.</span></h1>
            <p className="text-xs text-white/40 font-medium tracking-wide">Tally repository statistics, languages, and timelines to prove codebase authorship.</p>
          </div>
        </div>

        {/* Dynamic Display */}
        {!results ? (
          <motionFramer.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-[#13171d] border border-white/5 rounded-[35px] p-8 md:p-12 text-center space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/5 blur-[50px] rounded-full" />
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-[900] uppercase tracking-tight">Upload Codebase Zip</h2>
              <p className="text-xs text-white/40 leading-relaxed font-medium">Upload a zipped folder of your repository. We will parse it locally in-memory to extract commits metadata, lines of code, and structure.</p>
            </div>

            {/* Drag-drop window */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-10 transition-colors cursor-pointer relative ${dragOver ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 bg-black/20 hover:border-white/20'}`}
              onClick={() => document.getElementById('repo-file-picker')?.click()}
            >
              <input 
                type="file" 
                id="repo-file-picker" 
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="space-y-3">
                <FileText className="w-10 h-10 text-white/20 mx-auto" />
                {file ? (
                  <div>
                    <p className="text-sm font-bold text-purple-400 break-all">{file.name}</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase mt-1">Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Drag & drop or click to browse</p>
                )}
              </div>
            </div>

            {file && (
              <button
                onClick={startAnalysis}
                disabled={loading}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-600/20 active:scale-95 transition-all rounded-xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                {loading ? 'Reconstructing Workspace...' : 'Start Reconstruction'}
              </button>
            )}
          </motionFramer.div>
        ) : (
          <motionFramer.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Language charts + Risks */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Language chart */}
              <motionFramer.div 
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#13171d]/85 backdrop-blur-md border border-white/5 hover:border-purple-500/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
                <div className="flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-[900] uppercase tracking-wider text-purple-400">Language Breakdown</h2>
                </div>
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.languages}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {results.languages.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#13171d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#ffffff', fontSize: '12px', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom list description */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {results.languages.slice(0, 4).map((lang: any, i: number) => (
                    <div key={lang.name} className="flex items-center gap-2.5 text-xs font-bold">
                      <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-white/50">{lang.name}:</span>
                      <span className="text-white font-medium">{lang.value} files</span>
                    </div>
                  ))}
                </div>
              </motionFramer.div>

              {/* Security scan alerts */}
              <motionFramer.div 
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#13171d]/85 backdrop-blur-md border border-white/5 hover:border-red-500/20 rounded-3xl p-6 space-y-4 shadow-xl hover:shadow-red-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <h2 className="text-lg font-[900] uppercase tracking-wider text-red-400">Security & Quality Audit</h2>
                </div>
                {results.securityRisks?.length > 0 ? (
                  <div className="space-y-3">
                    {results.securityRisks.map((risk: string, i: number) => (
                      <div key={i} className="p-3.5 bg-red-500/5 border border-red-500/10 rounded-2xl text-xs font-bold text-red-400 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{risk}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <p>No immediate security anomalies detected in analyzed files.</p>
                  </div>
                )}
              </motionFramer.div>

            </div>

            {/* Right Column: Code Stats + Calendar */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Metric Card row */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Files Analyzed', val: results.totalFiles, sub: 'Boilerplate ignored', color: 'text-purple-400' },
                  { label: 'Lines of Code', val: results.totalLines.toLocaleString(), sub: 'Raw Code Count', color: 'text-blue-400' },
                  { label: 'Auth Strength', val: `${results.authorshipStrength}%`, sub: 'Complexity density', color: 'text-emerald-400' }
                ].map((stat, idx) => (
                  <motionFramer.div 
                    key={idx} 
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="bg-[#13171d]/85 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-3xl p-5 relative overflow-hidden shadow-lg transition-all duration-300"
                  >
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{stat.label}</p>
                    <p className={`text-2xl font-[900] ${stat.color} italic tracking-tighter mt-1`}>{stat.val}</p>
                    <p className="text-[9px] font-bold text-white/20 mt-1 uppercase italic">{stat.sub}</p>
                  </motionFramer.div>
                ))}
              </div>

              {/* Enhanced Authorship Proof Indicator Card */}
              <motionFramer.div 
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#13171d]/85 backdrop-blur-md border border-white/5 hover:border-emerald-500/20 rounded-[30px] p-6 space-y-5 relative overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Verified Authorship Quality</h3>
                    <p className="text-lg font-black text-white">Authorship Strength Index</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
                    results.authorshipStrength >= 75 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : results.authorshipStrength >= 40 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    {results.authorshipStrength >= 75 ? 'Definitive Proof' : results.authorshipStrength >= 40 ? 'Moderate Proof' : 'Weak Proof'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-black/45 h-3 rounded-full overflow-hidden border border-white/5 p-0.5 relative">
                    <motionFramer.div 
                      className={`h-full rounded-full ${
                        results.authorshipStrength >= 75 
                          ? 'bg-gradient-to-r from-emerald-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                          : results.authorshipStrength >= 40 
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                            : 'bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${results.authorshipStrength}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-white/30 uppercase italic">
                    <span>Low Signal</span>
                    <span>Accredited Developer Codebase ({results.authorshipStrength}%)</span>
                    <span>High Signal</span>
                  </div>
                </div>
              </motionFramer.div>

              {/* GitHub Timeline Heatmap */}
              <motionFramer.div 
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-[#13171d]/85 backdrop-blur-md border border-white/5 hover:border-emerald-500/20 rounded-[30px] p-6 space-y-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ed29c]/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#5ed29c]" />
                    <h2 className="text-lg font-[900] uppercase tracking-wider text-[#5ed29c]">Reconstructed Git Activity</h2>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-[#5ed29c]/10 text-[#5ed29c] rounded-full border border-[#5ed29c]/20">timeline map</span>
                </div>
                <div className="flex justify-center bg-black/25 border border-white/5 rounded-2xl p-6 overflow-x-auto custom-scrollbar">
                  <ActivityCalendar 
                    data={results.timeline} 
                    theme={{
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    labels={{
                      totalCount: 'Reconstructed {{count}} modifications across history',
                    }}
                  />
                </div>
              </motionFramer.div>

              {/* XP Payout information */}
              <motionFramer.div 
                whileHover={{ scale: 1.01 }}
                className="p-6 rounded-[30px] bg-gradient-to-r from-purple-950/20 via-black/40 to-black border border-purple-500/20 flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/10 animate-pulse" />
                    <Sparkles className="w-6 h-6 text-purple-400 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">Reconstruction Payout</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase mt-0.5">Authorship proof logged to GameStats</p>
                  </div>
                </div>
                <p className="text-2xl font-[900] text-purple-400 italic tracking-tighter animate-bounce">+{results.xpEarned} XP</p>
              </motionFramer.div>

              {/* Redo action button */}
              <button
                onClick={() => {
                  setResults(null);
                  setFile(null);
                }}
                className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 rounded-2xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95 shadow-md"
              >
                Analyze Another Repository
              </button>

            </div>
          </motionFramer.div>
        )}

      </div>

      {/* Badge Achievement Modal */}
      <AnimatePresenceFramer>
        {showBadgeModal && (
          <motionFramer.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motionFramer.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#13171d] border border-white/10 rounded-[35px] max-w-lg w-full p-10 relative overflow-hidden space-y-6 shadow-2xl text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500" />
              <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Badge <span className="text-yellow-500">Unlocked!</span></h2>
              <p className="text-sm text-white/60 leading-relaxed font-medium">You have been awarded the exclusive title:</p>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl inline-flex items-center gap-3 text-yellow-400">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-black uppercase tracking-wider">{newBadge}</span>
              </div>
              <p className="text-xs text-white/30 italic">Awarded for analyzing over 3,000 lines of verified codebase repository.</p>
              <button
                onClick={() => setShowBadgeModal(false)}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                Awesome
              </button>
            </motionFramer.div>
          </motionFramer.div>
        )}
      </AnimatePresenceFramer>

    </div>
  );
};
export default GithubReconstructor;
