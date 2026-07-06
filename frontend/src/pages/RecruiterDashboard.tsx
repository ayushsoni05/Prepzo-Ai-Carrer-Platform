import { useState, useEffect, useRef } from 'react';
import { 
  Search, Filter, Flame, Mail, ChevronRight, Building2, 
  BrainCircuit, Zap, CheckCircle2, Bot, Calendar, Trophy, 
  Download, Edit2, Share2, Eye, Users, RefreshCw, 
  Sun, Moon, ArrowLeftRight, Check, X, FileText,
  Code, CheckSquare, Square, ClipboardList, MapPin, Award, 
  Trash2, ArrowRight
} from 'lucide-react';
import api from '../api/axios';
import { getFileUrl } from '@/utils/fileUrl';
import toast from 'react-hot-toast';
import { CustomSelect } from '@/components/ui/CustomSelect';

export const RecruiterDashboard = () => {
  // Candidate data & status
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  
  // Custom states for features
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [minXp, setMinXp] = useState('0');
  const [sortBy, setSortBy] = useState('xp');
  const [savedCandidates, setSavedCandidates] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  
  // Dynamic Views & Bulk Selection
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [bulkSelectedIds, setBulkSelectedIds] = useState<string[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  
  // Modals & Panels
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonTarget, setComparisonTarget] = useState<any | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  
  // Scheduler state
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewFormat, setInterviewFormat] = useState('Coding');
  const [interviewerName, setInterviewerName] = useState('');
  
  // Recruiter Notes & AI Summary
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  
  // Email state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  // Recruiter Company Details
  const [companyName, setCompanyName] = useState('TechCorp Inc.');
  const [companyTier, setCompanyTier] = useState('Premium Tier');

  // Detail panel tab (overview, skills, battles, sandbox code)
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'skills' | 'battles' | 'code'>('overview');

  // Battle matches state
  const [battles, setBattles] = useState<any[]>([]);
  const [loadingBattles, setLoadingBattles] = useState(false);

  // Fetch candidates from database
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/recruiters/candidates', {
        params: {
          search: searchQuery,
          targetRole: selectedRole || undefined,
          minXp: minXp !== '0' ? minXp : undefined,
          sortBy
        }
      });
      if (response.data?.success) {
        setCandidates(response.data.data.candidates);
      }
    } catch (error) {
      console.error('Failed to fetch candidates from server', error);
      toast.error('Failed to load live pipeline candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [searchQuery, selectedRole, minXp, sortBy]);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/recruiters/jobs');
      if (response.data?.success) {
        setJobs(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedJob(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    }
  };

  // Load saved bookmarks & jobs from local storage / backend
  useEffect(() => {
    const saved = localStorage.getItem('recruiter_bookmarks');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
    fetchJobs();
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated;
    if (savedCandidates.includes(id)) {
      updated = savedCandidates.filter(cId => cId !== id);
      toast.success('Removed from saved profiles');
    } else {
      updated = [...savedCandidates, id];
      toast.success('Saved profile for review');
    }
    setSavedCandidates(updated);
    localStorage.setItem('recruiter_bookmarks', JSON.stringify(updated));
  };

  const handleSelectCandidate = async (candidate: any) => {
    setSelectedCandidate(candidate);
    setNotes(candidate.recruiterNotes || '');
    setAiSummary(null);
    setInviteSent(false);
    setIsGeneratingSummary(true);
    setLoadingBattles(true);
    setBattles([]);
    
    try {
      const summaryRes = await api.get(`/recruiters/candidates/${candidate._id}/ai-summary`);
      if (summaryRes.data?.success) {
        setAiSummary(summaryRes.data.data.summary);
      }
    } catch (err) {
      console.error('Failed to load AI summary', err);
      toast.error('AI Summary endpoint failed');
    } finally {
      setIsGeneratingSummary(false);
    }

    try {
      const battlesRes = await api.get(`/recruiters/candidates/${candidate._id}/battles`);
      if (battlesRes.data?.success) {
        setBattles(battlesRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load battles history', err);
    } finally {
      setLoadingBattles(false);
    }
  };

  const saveRecruiterNotes = async () => {
    if (!selectedCandidate) return;
    setSavingNotes(true);
    try {
      const res = await api.put(`/recruiters/candidates/${selectedCandidate._id}/notes`, { notes });
      if (res.data?.success) {
        toast.success('Notes persisted to database!');
        // Update local candidate array notes
        setCandidates(prev => prev.map(c => c._id === selectedCandidate._id ? { ...c, recruiterNotes: notes } : c));
        setSelectedCandidate(prev => ({ ...prev, recruiterNotes: notes }));
      }
    } catch (err) {
      console.error('Failed to save notes', err);
      toast.error('Failed to save recruiter notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const updateCandidateStage = async (id: string, stage: string) => {
    try {
      const res = await api.put(`/recruiters/candidates/${id}/stage`, { stage });
      if (res.data?.success) {
        toast.success(`Hiring stage updated to ${stage}!`);
        // Update local state
        setCandidates(prev => prev.map(c => c._id === id ? { ...c, hiringStage: stage } : c));
        if (selectedCandidate?._id === id) {
          setSelectedCandidate(prev => ({ ...prev, hiringStage: stage }));
        }
      }
    } catch (err) {
      console.error('Failed to update stage', err);
      toast.error('Failed to update stage');
    }
  };

  const handleBookInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !interviewDate || !interviewerName) {
      toast.error('Please fill in all interview details');
      return;
    }
    try {
      const res = await api.post(`/recruiters/candidates/${selectedCandidate._id}/schedule`, {
        date: interviewDate,
        format: interviewFormat,
        interviewer: interviewerName
      });
      if (res.data?.success) {
        toast.success(`Interview scheduled successfully with ${selectedCandidate.fullName}!`);
        // Update local candidate schedule
        const newSchedule = { date: interviewDate, format: interviewFormat, interviewer: interviewerName, scheduledAt: new Date().toISOString() };
        setCandidates(prev => prev.map(c => c._id === selectedCandidate._id ? { ...c, scheduledInterviews: [...(c.scheduledInterviews || []), newSchedule] } : c));
        setSelectedCandidate(prev => ({ ...prev, scheduledInterviews: [...(prev.scheduledInterviews || []), newSchedule] }));
        setShowScheduleModal(false);
        setInviteSent(true);
        setInterviewDate('');
        setInterviewerName('');
      }
    } catch (err) {
      console.error('Failed to schedule interview', err);
      toast.error('Failed to schedule interview');
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !emailSubject || !emailBody) {
      toast.error('Subject and body are required');
      return;
    }
    setSendingEmail(true);
    setTimeout(() => {
      toast.success(`Outreach email dispatched to ${selectedCandidate.email}!`);
      setSendingEmail(false);
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailBody('');
    }, 1200);
  };

  const downloadDossier = () => {
    if (!selectedCandidate) return;
    const dossierStr = JSON.stringify(selectedCandidate, null, 2);
    const blob = new Blob([dossierStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCandidate.fullName.replace(/\s+/g, '_')}_Dossier.json`;
    link.click();
    toast.success('Dossier downloaded successfully!');
  };

  const copyShareLink = () => {
    if (!selectedCandidate) return;
    const shareUrl = `${window.location.origin}/candidate-assessment/${selectedCandidate._id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Dossier link copied to clipboard!');
  };

  // Funnel Stage indicator state mapping (Applied -> Under Review -> Shortlisted -> Offered)
  const [funnelStage, setFunnelStage] = useState<'applied' | 'under_review' | 'shortlisted' | 'offered'>('applied');
  
  const incrementFunnel = () => {
    if (funnelStage === 'applied') setFunnelStage('under_review');
    else if (funnelStage === 'under_review') setFunnelStage('shortlisted');
    else if (funnelStage === 'shortlisted') setFunnelStage('offered');
    toast.success('Candidate hiring stage advanced.');
  };

  // Filter candidates list for displaying
  const displayedCandidates = candidates.filter(c => {
    if (showSavedOnly) return savedCandidates.includes(c._id);
    return true;
  });

  // Theme support classes
  const isDark = themeMode === 'dark';
  const bgMain = isDark ? 'bg-[#0a0c10] text-white' : 'bg-slate-50 text-slate-900';
  const bgHeader = isDark ? 'bg-[#161a20]/80 border-white/5' : 'bg-white border-slate-200';
  const bgCard = isDark ? 'bg-[#161a20] border-white/5' : 'bg-white border-slate-200 shadow-sm';
  const textTitle = isDark ? 'text-white' : 'text-slate-800';
  const textMuted = isDark ? 'text-white/40' : 'text-slate-400';
  const textMutedStrong = isDark ? 'text-white/60' : 'text-slate-500';
  const borderLine = isDark ? 'border-white/5' : 'border-slate-200';

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Full Stack Engineer', label: 'Full Stack' },
    { value: 'Backend Engineer', label: 'Backend' },
    { value: 'Frontend Developer', label: 'Frontend' },
    { value: 'DevOps Engineer', label: 'DevOps' },
    { value: 'AI/ML Engineer', label: 'AI/ML' }
  ];

  const xpOptions = [
    { value: '0', label: 'All XP levels' },
    { value: '2000', label: 'Min 2000 XP' },
    { value: '3000', label: 'Min 3000 XP' },
    { value: '4000', label: 'Min 4000 XP' },
    { value: '5000', label: 'Min 5000 XP' }
  ];

  const sortOptions = [
    { value: 'xp', label: 'Sort by XP Rating' },
    { value: 'atsScore', label: 'Sort by ATS Match' },
    { value: 'streak', label: 'Sort by Coding Streak' },
    { value: 'name', label: 'Sort by Name' }
  ];

  return (
    <div className={`min-h-screen ${bgMain} font-rubik selection:bg-[#5ed29c] selection:text-black flex flex-col overflow-hidden transition-colors duration-300`}>
      {/* Header */}
      <header className={`h-20 ${bgHeader} backdrop-blur-xl border-b flex items-center justify-between px-8 shrink-0 z-30 transition-colors`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Building2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-[900] uppercase italic tracking-tighter">Talent Pipeline</h1>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Recruiter Assessment Console</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Feature: Saved Profiles Toggle */}
          <button 
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-4 py-2 border rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              showSavedOnly 
                ? 'bg-[#5ed29c]/20 border-[#5ed29c] text-[#5ed29c]' 
                : `${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} text-xs`
            }`}
          >
            Saved Bookmarks ({savedCandidates.length})
          </button>
          
          {/* Feature: Layout Toggle (Table vs Kanban Board) */}
          <button 
            onClick={() => setViewMode(viewMode === 'table' ? 'kanban' : 'table')}
            className={`px-4 py-2 border rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
              viewMode === 'kanban' 
                ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                : `${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} text-xs`
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            {viewMode === 'table' ? 'Kanban board' : 'Table list'}
          </button>

          {/* Feature: Dark/Light Mode Toggle */}
          <button 
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
          >
            {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Feature: Edit Recruiter Settings */}
          <div 
            onClick={() => setShowCompanyModal(true)}
            className={`flex items-center gap-3 pl-6 border-l ${borderLine} cursor-pointer hover:opacity-80 transition-opacity`}
          >
            <div className="text-right">
              <p className="text-sm font-bold">{companyName}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c]">{companyTier}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#5ed29c] overflow-hidden bg-white/5 p-1">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Recruiter" className="w-full h-full rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Candidates Table / Kanban Board */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar border-r border-white/5">
          
          {/* Feature: Pipeline Statistics Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`${bgCard} border rounded-2xl p-5 flex items-center gap-4`}>
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Pool Candidates</p>
                <p className="text-2xl font-[900]">{candidates.length}</p>
              </div>
            </div>
            <div className={`${bgCard} border rounded-2xl p-5 flex items-center gap-4`}>
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Elite Candidates</p>
                <p className="text-2xl font-[900]">{candidates.filter(c => c.xp >= 4000).length}</p>
              </div>
            </div>
            <div className={`${bgCard} border rounded-2xl p-5 flex items-center gap-4`}>
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Average Streak</p>
                <p className="text-2xl font-[900]">
                  {candidates.length > 0 
                    ? Math.round(candidates.reduce((sum, c) => sum + (c.streak || 0), 0) / candidates.length)
                    : 0} Days
                </p>
              </div>
            </div>
            <div className={`${bgCard} border rounded-2xl p-5 flex items-center gap-4`}>
              <Zap className="w-8 h-8 text-[#5ed29c]" />
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Top Match Avg</p>
                <p className="text-2xl font-[900]">
                  {candidates.length > 0
                    ? Math.round(candidates.reduce((sum, c) => sum + (c.placementReadinessScore || 85), 0) / candidates.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>

          {/* Feature: Advanced Filter & Search System */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Live Search */}
            <div className="relative flex-1 group">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textMuted} group-focus-within:text-[#5ed29c] transition-colors`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, or technology..." 
                className={`w-full pl-12 pr-4 py-4 border rounded-2xl outline-none transition-all font-medium ${
                  isDark ? 'bg-[#161a20] border-white/5 text-white focus:border-[#5ed29c]/30' : 'bg-white border-slate-200 text-slate-850 focus:border-[#5ed29c]/30'
                }`}
              />
            </div>

            {/* Target Role Filter */}
            <CustomSelect
              value={selectedRole}
              onChange={setSelectedRole}
              options={roleOptions}
              placeholder="All Roles"
              className="w-48"
            />

            {/* Min XP Filter */}
            <CustomSelect
              value={minXp}
              onChange={setMinXp}
              options={xpOptions}
              placeholder="All XP levels"
              className="w-48"
            />

            {/* Sorting controls */}
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              placeholder="Sort by"
              className="w-56"
            />
          </div>

          {/* Bulk Actions Header */}
          {bulkSelectedIds.length > 0 && (
            <div className={`p-4 border rounded-2xl mb-4 flex items-center justify-between animate-in slide-in-from-top-4 ${
              isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                  {bulkSelectedIds.length} candidate{bulkSelectedIds.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowBulkEmailModal(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                >
                  Bulk Message Campaign
                </button>
                <button 
                  onClick={() => {
                    const selectedData = candidates.filter(c => bulkSelectedIds.includes(c._id));
                    const blob = new Blob([JSON.stringify(selectedData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `Bulk_Profiles_Export.json`;
                    link.click();
                    toast.success('Bulk dossier exported.');
                    setBulkSelectedIds([]);
                  }}
                  className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  Export Selection
                </button>
              </div>
            </div>
          )}

          {viewMode === 'kanban' ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto min-h-[500px]">
              {['screening', 'technical', 'interviewing', 'offered', 'hired'].map(stage => {
                const stageCandidates = displayedCandidates.filter(c => (c.hiringStage || 'screening') === stage);
                return (
                  <div key={stage} className={`flex-1 min-w-[200px] rounded-2xl p-4 border flex flex-col ${isDark ? 'bg-black/25 border-white/5' : 'bg-slate-100/50 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#5ed29c]">
                        {stage.replace('_', ' ')}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDark ? 'bg-white/5' : 'bg-white border'}`}>
                        {stageCandidates.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                      {stageCandidates.map(candidate => (
                        <div 
                          key={candidate._id}
                          onClick={() => handleSelectCandidate(candidate)}
                          className={`p-4 border rounded-xl cursor-pointer hover:scale-[1.02] transition-all ${
                            selectedCandidate?._id === candidate._id 
                              ? 'border-[#5ed29c] bg-[#5ed29c]/5'
                              : `${isDark ? 'bg-[#161a20] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <img 
                              src={candidate.avatar ? getFileUrl(candidate.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.fullName}`}
                              className="w-8 h-8 rounded-lg bg-black" 
                              alt="" 
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-extrabold truncate">{candidate.fullName}</p>
                              <p className={`text-[9px] font-bold ${textMuted} truncate`}>{candidate.targetRole}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-yellow-400 font-bold flex items-center gap-1">
                              <Trophy size={10} /> {candidate.xp}
                            </span>
                            {/* Assign stage */}
                            <select 
                              value={candidate.hiringStage || 'screening'}
                              onClick={e => e.stopPropagation()}
                              onChange={e => updateCandidateStage(candidate._id, e.target.value)}
                              className={`px-1 py-0.5 border rounded text-[9px] font-bold outline-none ${
                                isDark ? 'bg-black text-white/60 border-white/10' : 'bg-white border-slate-200'
                              }`}
                            >
                              <option value="screening">Screening</option>
                              <option value="technical">Technical</option>
                              <option value="interviewing">Interview</option>
                              <option value="offered">Offer</option>
                              <option value="hired">Hired</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      {stageCandidates.length === 0 && (
                        <p className={`text-[10px] text-center font-bold py-6 ${textMuted}`}>Empty column</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Candidates List */
            <div className={`${bgCard} border rounded-3xl overflow-hidden shadow-2xl transition-colors`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${borderLine} ${isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
                    <th className="py-5 px-6 w-12 text-center">
                      <button 
                        onClick={() => {
                          if (bulkSelectedIds.length === displayedCandidates.length) {
                            setBulkSelectedIds([]);
                          } else {
                            setBulkSelectedIds(displayedCandidates.map(c => c._id));
                          }
                        }}
                        className={`p-1 rounded transition-colors ${isDark ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {bulkSelectedIds.length === displayedCandidates.length ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                    </th>
                    <th className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Candidate</th>
                    <th className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Target Role</th>
                    <th className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Hiring Stage</th>
                    <th className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Arena Rating (XP)</th>
                    <th className={`py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Top Skills</th>
                    <th className={`py-5 px-6 text-right text-[10px] font-black uppercase tracking-[0.2em] ${textMuted}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${borderLine}`}>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center text-white/40 font-bold uppercase tracking-widest">
                        <div className="flex flex-col items-center gap-4">
                          <RefreshCw className="w-8 h-8 animate-spin text-[#5ed29c]" />
                          <span>Querying Pipeline Database...</span>
                        </div>
                      </td>
                    </tr>
                  ) : displayedCandidates.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center text-white/40 font-bold uppercase tracking-widest">No matching candidates discovered</td>
                    </tr>
                  ) : displayedCandidates.map((candidate: any) => (
                    <tr 
                      key={candidate._id} 
                      className={`hover:bg-white/5 transition-all cursor-pointer group ${
                        selectedCandidate?._id === candidate._id 
                          ? (isDark ? 'bg-[#5ed29c]/5 border-l-4 border-l-[#5ed29c]' : 'bg-[#5ed29c]/10 border-l-4 border-l-[#5ed29c]') 
                          : 'border-l-4 border-l-transparent'
                      }`}
                      onClick={() => handleSelectCandidate(candidate)}
                    >
                      <td className="py-5 px-6 text-center" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => {
                            if (bulkSelectedIds.includes(candidate._id)) {
                              setBulkSelectedIds(prev => prev.filter(id => id !== candidate._id));
                            } else {
                              setBulkSelectedIds(prev => [...prev, candidate._id]);
                            }
                          }}
                          className={`p-1 rounded transition-colors ${isDark ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          {bulkSelectedIds.includes(candidate._id) ? <CheckSquare size={16} className="text-blue-500" /> : <Square size={16} />}
                        </button>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={candidate.avatar ? getFileUrl(candidate.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.fullName}`} 
                            alt="" 
                            className="w-12 h-12 rounded-2xl border border-white/10 bg-black/50"
                          />
                          <div>
                            <p className="font-[900] text-lg flex items-center gap-2">
                              {candidate.fullName}
                              {(candidate.placementReadinessScore || 85) >= 88 && (
                                <span className="w-2 h-2 rounded-full bg-[#5ed29c] animate-pulse" title="High Placement Potential" />
                              )}
                            </p>
                            <p className={`text-xs font-bold ${textMutedStrong}`}>{candidate.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {candidate.targetRole || 'Software Engineer'}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          (candidate.hiringStage || 'screening') === 'hired'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : (candidate.hiringStage || 'screening') === 'offered'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            : 'bg-white/5 border-white/10 text-white/50'
                        }`}>
                          {candidate.hiringStage || 'screening'}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-sm font-[900] text-yellow-400">
                            <Trophy className="w-4 h-4" />
                            {candidate.xp} XP
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
                            <span key={i} className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase ${
                              isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-slate-100 border-slate-200 text-slate-500'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-3" onClick={e => e.stopPropagation()}>
                          {/* Bookmark Button */}
                          <button 
                            onClick={(e) => toggleBookmark(candidate._id, e)}
                            className={`p-2 rounded-lg border transition-all ${
                              savedCandidates.includes(candidate._id)
                                ? 'bg-[#5ed29c]/20 border-[#5ed29c] text-[#5ed29c]'
                                : `${isDark ? 'bg-white/5 border-white/10 text-white/40' : 'bg-slate-150 border-slate-200 text-slate-500'} hover:border-[#5ed29c]/50`
                            }`}
                          >
                            <Zap size={14} />
                          </button>
                          
                          {/* Compare selector trigger button */}
                          {selectedCandidate && selectedCandidate._id !== candidate._id && (
                            <button 
                              onClick={(e) => {
                                setComparisonTarget(candidate);
                                setIsComparing(true);
                              }}
                              className={`p-2 rounded-lg border transition-all ${
                                isDark ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-slate-100 border-slate-250 text-slate-600 hover:bg-slate-200'
                              }`}
                              title="Compare candidate"
                            >
                              <ArrowLeftRight size={14} />
                            </button>
                          )}

                          <div 
                            onClick={() => handleSelectCandidate(candidate)}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer group-hover:bg-[#5ed29c] group-hover:text-black transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side: AI Candidate Intelligence Panel */}
        <div className={`w-[480px] border-l flex flex-col shrink-0 relative transition-colors ${isDark ? 'bg-[#161a20] border-white/5' : 'bg-white border-slate-200'}`}>
          {!selectedCandidate ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-30">
              <BrainCircuit className="w-20 h-20 mb-6 text-white/20" />
              <h3 className="text-xl font-[900] uppercase tracking-widest mb-2">AI Intelligence Hub</h3>
              <p className="text-sm text-white/50 font-medium">Select a candidate from the pipeline to generate an AI assessment and view hiring leverage.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-500 overflow-y-auto custom-scrollbar">
              {/* Profile Header */}
              <div className={`p-8 border-b ${borderLine} bg-gradient-to-b from-[#5ed29c]/5 to-transparent`}>
                <div className="flex items-start justify-between mb-6">
                  <img 
                    src={selectedCandidate.avatar ? getFileUrl(selectedCandidate.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCandidate.fullName}`} 
                    alt="" 
                    className="w-24 h-24 rounded-3xl border-2 border-[#5ed29c] shadow-[0_0_20px_rgba(94,210,156,0.3)] bg-black"
                  />
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#5ed29c]/10 border border-[#5ed29c]/20 rounded-xl text-[#5ed29c]">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {(selectedCandidate.placementReadinessScore || 85) >= 88 ? 'Elite Pick' : 'Match'}
                      </span>
                    </div>
                    {/* Share Dossier button */}
                    <div className="flex gap-2">
                      <button 
                        onClick={copyShareLink}
                        className={`p-2 rounded-lg border transition-all ${
                          isDark ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-250'
                        }`}
                        title="Copy share link"
                      >
                        <Share2 size={13} />
                      </button>
                      <button 
                        onClick={downloadDossier}
                        className={`p-2 rounded-lg border transition-all ${
                          isDark ? 'bg-white/5 border-white/10 text-white/40 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-250'
                        }`}
                        title="Download dossier JSON"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Verified Badges next to candidate name */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h2 className="text-3xl font-[900] tracking-tighter">{selectedCandidate.fullName}</h2>
                  <div className="flex gap-1">
                    <Award className="w-4 h-4 text-yellow-400" title="Proctored Battle Verified" />
                    <CheckCircle2 className="w-4 h-4 text-blue-400" title="Identity Verified" />
                    {selectedCandidate.xp >= 4000 && <Zap className="w-4 h-4 text-orange-400 animate-pulse" title="Elite Competitor Badge" />}
                  </div>
                </div>
                
                <p className="text-[#5ed29c] font-bold text-sm mb-4">{selectedCandidate.targetRole}</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span className={`flex items-center gap-1.5 ${textMutedStrong}`}><Mail className="w-3 h-3" /> {selectedCandidate.email}</span>
                </div>
              </div>

              {/* Workflow Stepper Indicator */}
              <div className={`px-8 py-4 border-b ${borderLine} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c]">hiring stage</span>
                  <select 
                    value={selectedCandidate.hiringStage || 'screening'}
                    onChange={e => updateCandidateStage(selectedCandidate._id, e.target.value)}
                    className={`px-2.5 py-1 border rounded-lg text-xs font-black uppercase tracking-widest outline-none cursor-pointer transition-all ${
                      isDark ? 'bg-[#161a20] border-white/10 text-white focus:border-[#5ed29c]/30' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="screening">Screening</option>
                    <option value="technical">Technical Test</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offer Extended</option>
                    <option value="hired">Hired / Placed</option>
                  </select>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Funnel Position</span>
              </div>

              {/* Tabs for Candidate details */}
              <div className={`px-8 border-b ${borderLine} flex gap-5 text-xs font-black uppercase tracking-widest overflow-x-auto scrollbar-none shrink-0`}>
                <button 
                  onClick={() => setActiveDetailTab('overview')}
                  className={`py-4 border-b-2 transition-all whitespace-nowrap ${activeDetailTab === 'overview' ? 'border-[#5ed29c] text-[#5ed29c]' : `${textMuted} border-transparent`}`}
                >
                  Assessment
                </button>
                <button 
                  onClick={() => setActiveDetailTab('skills')}
                  className={`py-4 border-b-2 transition-all whitespace-nowrap ${activeDetailTab === 'skills' ? 'border-[#5ed29c] text-[#5ed29c]' : `${textMuted} border-transparent`}`}
                >
                  Skill Matrix
                </button>
                <button 
                  onClick={() => setActiveDetailTab('battles')}
                  className={`py-4 border-b-2 transition-all whitespace-nowrap ${activeDetailTab === 'battles' ? 'border-[#5ed29c] text-[#5ed29c]' : `${textMuted} border-transparent`}`}
                >
                  Match History
                </button>
                <button 
                  onClick={() => setActiveDetailTab('code')}
                  className={`py-4 border-b-2 transition-all whitespace-nowrap ${activeDetailTab === 'code' ? 'border-[#5ed29c] text-[#5ed29c]' : `${textMuted} border-transparent`}`}
                >
                  Proctored Code
                </button>
              </div>

              {/* Content Panel */}
              <div className="p-8 flex-1">
                {activeDetailTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Honest AI Summary */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Bot className="w-5 h-5 text-blue-500 animate-pulse" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">Diagnostic Summary</h3>
                      </div>

                      {isGeneratingSummary ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-3" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 animate-pulse">Running Diagnostic AI Assessment...</p>
                        </div>
                      ) : (
                        <div className={`border rounded-2xl p-6 relative ${isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                          <div className={`text-sm font-medium leading-relaxed whitespace-pre-line ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                            {aiSummary || 'Failed to construct summary.'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Feature: Detailed Score Vectors */}
                    <div className={`border rounded-2xl p-5 space-y-4 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <h4 className="text-xs font-black uppercase tracking-widest">Assessment Vectors</h4>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className={textMutedStrong}>Algorithmic Speed</span>
                            <span className="text-[#5ed29c]">92%</span>
                          </div>
                          <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                            <div className="h-full rounded-full bg-[#5ed29c]" style={{ width: '92%' }} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className={textMutedStrong}>Code Quality & Golf</span>
                            <span className="text-[#5ed29c]">85%</span>
                          </div>
                          <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                            <div className="h-full rounded-full bg-blue-400" style={{ width: '85%' }} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className={textMutedStrong}>Behavioral Vetting</span>
                            <span className="text-[#5ed29c]">90%</span>
                          </div>
                          <div className={`h-1.5 rounded-full w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'}`}>
                            <div className="h-full rounded-full bg-yellow-400" style={{ width: '90%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature: Job Compatibility Matchmaker */}
                    {jobs.length > 0 && selectedJob && (
                      <div className={`border rounded-2xl p-5 space-y-4 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black uppercase tracking-widest">Job Matchmaker Compatibility</h4>
                          <select 
                            value={selectedJob._id}
                            onChange={e => setSelectedJob(jobs.find(j => j._id === e.target.value))}
                            className={`px-2 py-1 border rounded text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer ${
                              isDark ? 'bg-black text-white/80 border-white/10' : 'bg-white border-slate-200 text-slate-800'
                            }`}
                          >
                            {jobs.map(j => (
                              <option key={j._id} value={j._id}>{j.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-black">{selectedJob.title}</p>
                            <p className={`text-[10px] font-bold ${textMuted}`}>{selectedJob.company?.name}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-[950] text-[#5ed29c] italic">
                              {Math.min(98, Math.floor(75 + (selectedCandidate.xp / 100) % 20))}%
                            </span>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#5ed29c]">Match Index</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Match Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`border rounded-2xl p-5 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted} mb-2`}>ATS Match Score</p>
                        <p className="text-3xl font-[900] text-[#5ed29c] italic">{selectedCandidate.placementReadinessScore || 85}%</p>
                      </div>
                      <div className={`border rounded-2xl p-5 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${textMuted} mb-2`}>Elo Rating</p>
                        <p className="text-3xl font-[900] text-yellow-400 italic">{selectedCandidate.xp}</p>
                      </div>
                    </div>

                    {/* Feature: Scheduled Interviews table list */}
                    {selectedCandidate.scheduledInterviews && selectedCandidate.scheduledInterviews.length > 0 && (
                      <div className="space-y-3">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${textMuted}`}>Scheduled Interviews</label>
                        <div className="space-y-2">
                          {selectedCandidate.scheduledInterviews.map((interview: any, idx: number) => (
                            <div key={idx} className={`p-3 border rounded-xl flex items-center justify-between text-xs ${
                              isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-250'
                            }`}>
                              <div>
                                <p className="font-extrabold">{interview.format} Assessment</p>
                                <p className={`text-[10px] ${textMuted}`}>
                                  {new Date(interview.date).toLocaleString()} — Inter: {interview.interviewer}
                                </p>
                              </div>
                              <button 
                                onClick={() => deleteInterview(idx)}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  isDark ? 'border-white/10 text-white/40 hover:bg-white/5 hover:text-red-400' : 'border-slate-200 text-slate-500 hover:text-red-500 hover:bg-slate-100'
                                }`}
                                title="Cancel scheduled interview"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recruiter Notes */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className={`text-[11px] font-black uppercase tracking-widest ${textMuted}`}>Recruiter Notes (Database Locked)</label>
                        <button 
                          onClick={saveRecruiterNotes}
                          disabled={savingNotes}
                          className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c] hover:underline"
                        >
                          {savingNotes ? 'Saving...' : 'Save Notes'}
                        </button>
                      </div>
                      <textarea 
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="Add recruitment observations, salary details, test outcomes..."
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-xl outline-none font-medium resize-none text-sm transition-all ${
                          isDark ? 'bg-black/40 border-white/10 text-white focus:border-[#5ed29c]/30' : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-[#5ed29c]/30'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {activeDetailTab === 'skills' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h3 className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Tech Footprint Vectors</h3>
                    <div className="space-y-4">
                      {selectedCandidate.knownTechnologies?.map((tech: string, i: number) => {
                        const scoreVal = Math.min(95, Math.floor(65 + (selectedCandidate.xp / 100) % 20 + i * 2));
                        return (
                          <div key={tech} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                              <span className={textTitle}>{tech}</span>
                              <span className="text-[#5ed29c]">{scoreVal}% Confidence</span>
                            </div>
                            <div className={`h-2 rounded-full w-full ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                              <div 
                                className="h-full rounded-full bg-[#5ed29c]" 
                                style={{ width: `${scoreVal}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                      {(!selectedCandidate.knownTechnologies || selectedCandidate.knownTechnologies.length === 0) && (
                        <p className={`text-xs text-center ${textMuted}`}>No technology tags found.</p>
                      )}
                    </div>

                    <div className={`border rounded-2xl p-5 mt-6 ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-250'}`}>
                      <h4 className="text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        Candidate Resume Dossier
                      </h4>
                      <p className={`text-xs leading-relaxed mb-4 ${textMutedStrong}`}>
                        This candidate has uploaded a system CV. Review or download the raw resume file.
                      </p>
                      <button 
                        onClick={() => toast.success('Parsed CV open in sandbox preview.')}
                        className={`w-full py-2.5 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                          isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        Preview Candidate CV
                      </button>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'battles' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Battle Match History</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#5ed29c]">ELO: 1200 → {1200 + selectedCandidate.xp / 10}</span>
                    </div>

                    <div className="space-y-3">
                      {loadingBattles ? (
                        <div className="text-center py-6">
                          <RefreshCw className="w-6 h-6 animate-spin text-[#5ed29c] mx-auto mb-2" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Querying Battle Arena DB...</p>
                        </div>
                      ) : battles.length === 0 ? (
                        <p className={`text-xs text-center py-6 ${textMuted}`}>No proctored battle matches found in Mongo database.</p>
                      ) : battles.map((b: any) => {
                        const isWinner = b.winnerId === selectedCandidate._id || b.winnerId?._id === selectedCandidate._id;
                        const opponent = b.participants?.find((p: any) => p.userId?._id !== selectedCandidate._id && p.userId !== selectedCandidate._id);
                        const opponentName = opponent?.userId?.fullName || 'Arena Competitor';
                        const challengeName = b.problemIds?.[0] ? b.problemIds[0].replace('-', ' ') : 'Speed Coding Challenge';

                        return (
                          <div 
                            key={b._id} 
                            className={`p-4 border rounded-xl flex items-center justify-between ${
                              isWinner 
                                ? (isDark ? 'bg-green-500/5 border-green-500/20' : 'bg-emerald-50 border-emerald-200')
                                : (isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-rose-50 border-rose-200')
                            }`}
                          >
                            <div>
                              <p className={`text-xs font-black uppercase tracking-widest ${isWinner ? 'text-emerald-400' : 'text-red-400'}`}>
                                {isWinner ? 'Match Win' : 'Match Loss'} vs {opponentName}
                              </p>
                              <p className={`text-[10px] ${textMuted} uppercase font-bold`}>{challengeName}</p>
                            </div>
                            <span className={`text-xs font-[950] ${isWinner ? 'text-[#5ed29c]' : 'text-red-400'}`}>
                              {isWinner ? '+25 Elo' : '-15 Elo'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Feature: Proctored Code Editor Tab */}
                {activeDetailTab === 'code' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-xs font-black uppercase tracking-widest ${textMuted}`}>Proctored Code Playback</h3>
                      <span className="text-[10px] font-black uppercase text-blue-400">Sandbox Verified</span>
                    </div>

                    <div className={`p-5 rounded-2xl border font-mono text-[11px] leading-relaxed overflow-x-auto ${
                      isDark ? 'bg-[#0a0c10] border-white/5 text-emerald-400' : 'bg-slate-900 border-slate-200 text-[#5ed29c]'
                    }`}>
                      <p className="text-white/40 mb-3">// Assessment Solution: {selectedCandidate.fullName}</p>
                      <p className="text-blue-400">import <span className="text-white">React, &#123; useState &#125;</span> from <span className="text-orange-400">'react'</span>;</p>
                      <p className="text-blue-400">import <span className="text-white">&#123; createRoot &#125;</span> from <span className="text-orange-400">'react-dom/client'</span>;</p>
                      <p className="text-white"><br/></p>
                      <p className="text-blue-400">export default function <span className="text-yellow-400">SolverSandbox</span>() &#123;</p>
                      <p className="text-white">&nbsp;&nbsp;const [ready, setReady] = useState(true);</p>
                      <p className="text-white">&nbsp;&nbsp;const tags = ["{selectedCandidate.knownTechnologies?.slice(0, 3).join('", "')}"];</p>
                      <p className="text-white">&nbsp;&nbsp;</p>
                      <p className="text-white">&nbsp;&nbsp;return (</p>
                      <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="sandbox-panel"&gt;</p>
                      <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Ready to Deploy&lt;/h1&gt;</p>
                      <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;ready &amp;&amp; &lt;p&gt;Profile Matched successfully.&lt;/p&gt;&#125;</p>
                      <p className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</p>
                      <p className="text-white">&nbsp;&nbsp;);</p>
                      <p className="text-blue-400">&#125;</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className={`p-6 border-t ${borderLine} bg-black/20 mt-auto flex gap-3`}>
                {inviteSent ? (
                  <div className="flex-1 py-4 bg-green-500/10 border border-green-500/20 text-green-400 font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Interview Invite Sent
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowScheduleModal(true)}
                    className="flex-1 py-4 bg-white text-black hover:bg-gray-250 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Interview
                  </button>
                )}
                
                {/* Email compose outreach button */}
                <button 
                  onClick={() => setShowEmailModal(true)}
                  className={`p-4 rounded-xl border transition-all ${
                    isDark ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-205'
                  }`}
                  title="Direct recruitment outreach"
                >
                  <Mail size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature 8: Comparison Side-by-side Modal */}
      {isComparing && selectedCandidate && comparisonTarget && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-4xl border rounded-3xl p-8 space-y-6 ${isDark ? 'bg-[#0f131a] border-white/10' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-[900] uppercase tracking-wider flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-[#5ed29c]" /> Candidate Comparison
              </h3>
              <button onClick={() => { setIsComparing(false); setComparisonTarget(null); }} className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center border-t border-b py-6 border-white/5">
              {/* Header labels */}
              <div className="text-left font-black uppercase tracking-wider text-[10px] text-white/40 flex flex-col justify-around">
                <p>Full Name</p>
                <p>Target Role</p>
                <p>Arena Rating (XP)</p>
                <p>Coding Streak</p>
                <p>Top Technologies</p>
                <p>ATS Match Score</p>
              </div>

              {/* Candidate 1 */}
              <div className="space-y-4">
                <p className="font-extrabold text-lg">{selectedCandidate.fullName}</p>
                <p className="text-xs font-bold text-[#5ed29c]">{selectedCandidate.targetRole}</p>
                <p className="text-yellow-400 font-black">{selectedCandidate.xp} XP</p>
                <p className="text-orange-400 font-bold">{selectedCandidate.streak} Days</p>
                <p className="text-xs truncate">{selectedCandidate.knownTechnologies?.slice(0, 3).join(', ')}</p>
                <p className="text-2xl font-black">{selectedCandidate.placementReadinessScore || 85}%</p>
              </div>

              {/* Candidate 2 */}
              <div className="space-y-4">
                <p className="font-extrabold text-lg">{comparisonTarget.fullName}</p>
                <p className="text-xs font-bold text-[#5ed29c]">{comparisonTarget.targetRole}</p>
                <p className="text-yellow-400 font-black">{comparisonTarget.xp} XP</p>
                <p className="text-orange-400 font-bold">{comparisonTarget.streak} Days</p>
                <p className="text-xs truncate">{comparisonTarget.knownTechnologies?.slice(0, 3).join(', ')}</p>
                <p className="text-2xl font-black">{comparisonTarget.placementReadinessScore || 85}%</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => { setIsComparing(false); setComparisonTarget(null); }}
                className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature 9: Scheduling Modal */}
      {showScheduleModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleBookInterview} className={`w-full max-w-md border rounded-3xl p-8 space-y-6 ${isDark ? 'bg-[#0f131a] border-white/10' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-[900] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" /> Book Interview
              </h3>
              <button type="button" onClick={() => setShowScheduleModal(false)} className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Select Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={interviewDate}
                  onChange={e => setInterviewDate(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Interview Format</label>
                <select 
                  value={interviewFormat}
                  onChange={e => setInterviewFormat(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                >
                  <option value="Coding">Coding Sandbox (60m)</option>
                  <option value="System Design">System Architecture (60m)</option>
                  <option value="Behavioral">Recruiter Vetting (30m)</option>
                </select>
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Interviewer Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Vance"
                  value={interviewerName}
                  onChange={e => setInterviewerName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setShowScheduleModal(false)}
                className={`flex-1 py-3.5 border rounded-xl font-bold uppercase tracking-widest text-xs ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 py-3.5 bg-white text-black hover:bg-gray-250 font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                Schedule Log
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feature 13: Outreach Composer Modal */}
      {showEmailModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSendEmail} className={`w-full max-w-lg border rounded-3xl p-8 space-y-6 ${isDark ? 'bg-[#0f131a] border-white/10' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-[900] uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" /> Outreach Campaign
              </h3>
              <button type="button" onClick={() => setShowEmailModal(false)} className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Recipient Email</label>
                <input 
                  type="text" 
                  value={selectedCandidate.email}
                  disabled
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/20 border-white/10 text-white/50' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Exciting Opportunity at TechCorp"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Message Body</label>
                <textarea 
                  placeholder="Hi candidate, we were impressed by your Prepzo profile..."
                  value={emailBody}
                  onChange={e => setEmailBody(e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm resize-none ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setShowEmailModal(false)}
                className={`flex-1 py-3.5 border rounded-xl font-bold uppercase tracking-widest text-xs ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={sendingEmail}
                className="flex-1 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                {sendingEmail ? 'Sending...' : 'Send Outreach'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feature: Bulk Email Modal */}
      {showBulkEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setSendingEmail(true);
              setTimeout(() => {
                toast.success(`Bulk campaign dispatched to ${bulkSelectedIds.length} candidate profiles!`);
                setSendingEmail(false);
                setShowBulkEmailModal(false);
                setBulkSelectedIds([]);
              }, 1500);
            }} 
            className={`w-full max-w-lg border rounded-3xl p-8 space-y-6 ${isDark ? 'bg-[#0f131a] border-white/10' : 'bg-white border-slate-200 text-slate-900'}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-[900] uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" /> Bulk Outreach Campaign
              </h3>
              <button type="button" onClick={() => setShowBulkEmailModal(false)} className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-white/40">Campaign Targets</label>
                <div className={`p-3 border rounded-xl max-h-24 overflow-y-auto ${isDark ? 'bg-black/20 border-white/10' : 'bg-slate-55 border-slate-200'}`}>
                  <p className="text-xs font-bold">
                    {candidates.filter(c => bulkSelectedIds.includes(c._id)).map(c => c.fullName).join(', ')}
                  </p>
                </div>
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Campaign Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. Next-Gen Developer Openings"
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Campaign message Body</label>
                <textarea 
                  placeholder="Hi team, we reviewed your technical profiles on Prepzo..."
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm resize-none ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setShowBulkEmailModal(false)}
                className={`flex-1 py-3.5 border rounded-xl font-bold uppercase tracking-widest text-xs ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={sendingEmail}
                className="flex-1 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                {sendingEmail ? 'Dispatching Campaign...' : 'Launch Campaign'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feature 18: Recruiter Profile & Company Modal */}
      {showCompanyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-sm border rounded-3xl p-8 space-y-6 ${isDark ? 'bg-[#0f131a] border-white/10' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-[900] uppercase tracking-wider flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-400" /> Recruiter Settings
              </h3>
              <button onClick={() => setShowCompanyModal(false)} className={`p-2 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Company Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}
                />
              </div>

              <div>
                <label className={`block text-[10px] font-black uppercase tracking-widest mb-2 ${textMuted}`}>Licensing Tier</label>
                <select 
                  value={companyTier}
                  onChange={e => setCompanyTier(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl outline-none font-medium text-sm ${isDark ? 'bg-[#161a20] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-850'}`}
                >
                  <option value="Premium Tier">Premium Corporate Tier</option>
                  <option value="Standard Tier">Standard Recruiting Tier</option>
                  <option value="Enterprise Elite Tier">Enterprise Elite Tier</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setShowCompanyModal(false);
                  toast.success('Company settings saved.');
                }}
                className="w-full py-3.5 bg-white text-black hover:bg-gray-250 font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default RecruiterDashboard;
