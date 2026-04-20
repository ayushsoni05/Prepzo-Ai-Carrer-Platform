/**
 * Jobs Page
 * Main job search and listing page
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Building2,
  Bookmark,
  BookmarkCheck,
  X,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  Bot,
  ChevronRight,
} from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassCard';
import { Boxes } from '@/components/ui/background-boxes';
import { useAuthStore } from '@/store/authStore';
import { jobsApi, Job, JobSearchParams, JobFilters } from '@/api/jobs';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

export function JobsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  
  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [hiringCompanies, setHiringCompanies] = useState<any[]>([]);
  
  // Filters state
  const [filters, setFilters] = useState<JobFilters | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    experienceLevel?: string;
    jobType?: string;
    workMode?: string;
    skills?: string[];
    salaryMin?: number;
    salaryMax?: number;
  }>({});
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Load filters
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await jobsApi.getFilters();
        if (response.success) {
          setFilters(response.data);
        }
      } catch (error) {
        console.error('Failed to load filters:', error);
      }
    };
    loadFilters();
  }, []);

  // Load jobs
  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params: JobSearchParams = {
        search: searchQuery || undefined,
        location: location || undefined,
        page,
        limit: 100,
        ...selectedFilters,
        skills: selectedFilters.skills?.join(','),
      };

      const response = await jobsApi.searchJobs(params);
      if (response.success) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.pagination.pages);
        setTotal(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, location, page, selectedFilters]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Load recommendations, trending, urgent, and hiring companies
  useEffect(() => {
    const loadExtra = async () => {
      try {
        const { companiesApi } = await import('@/api/companies');
        const [hiringRes] = await Promise.all([
          companiesApi.getHiringCompanies(),
        ]);
        
        if (hiringRes.success) setHiringCompanies(hiringRes.data);

        if (isAuthenticated) {
          const recsRes = await jobsApi.getRecommendations(5);
          if (recsRes.success) {
            setRecommendations(recsRes.data.recommendations?.map((r: { job: Job }) => r.job) || []);
          }
        }
      } catch (error) {
        console.error('Failed to load extra data:', error);
      }
    };
    loadExtra();
  }, [isAuthenticated]);


  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({
      ...(searchQuery && { q: searchQuery }),
      ...(location && { location }),
    });
    loadJobs();
  };

  // Handle save job
  const handleSaveJob = async (jobId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to save jobs');
      navigate('/auth?mode=login');
      return;
    }

    try {
      const response = await jobsApi.toggleSaveJob(jobId);
      if (response.success) {
        setJobs(prev =>
          prev.map(j =>
            j._id === jobId ? { ...j, isSaved: response.data.isSaved } : j
          )
        );
        toast.success(response.message);
      }
    } catch (error) {
      toast.error('Failed to save job');
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilters({});
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] selection:bg-[#00ff9d] selection:text-[#0a0c10] overflow-x-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0c10] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      {/* Header / Hero Section */}
      <div className="relative z-10 border-b border-white/5 bg-[#161a20]/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-left">
          <div className="flex items-center gap-4 text-[13px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-8">
            <TrendingUp size={20} strokeWidth={2.5} />
            Transmission Hub
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-7xl font-rubik font-[900] leading-[0.95] tracking-tighter text-white uppercase mb-6">
                Map the <br/>
                <span className="text-white/40">Opportunity Grid.</span>
              </h1>
              <p className="text-[18px] md:text-[21px] leading-relaxed text-white/50 font-rubik font-medium tracking-tight max-w-xl">
                Real-time scanning of 142+ active career nodes. Bridge your potential to the ecosystem pulse.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated && (
                <GlassButton
                  onClick={() => navigate('/jobs/saved')}
                  className="px-8 py-4 h-auto bg-white/5 hover:bg-white/10"
                >
                   <Bookmark className="w-5 h-5 text-[#00ff9d]" />
                   <span className="text-[14px] font-black uppercase tracking-widest ml-3">Saved Nodes</span>
                </GlassButton>
              )}
            </div>
          </div>

          {/* Search Console - Integrated */}
          <form onSubmit={handleSearch} className="mt-12 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00ff9d] transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full pl-16 pr-8 py-5 bg-[#0a0c10]/50 border border-white/5 rounded-[24px] text-white placeholder-white/20 focus:border-[#00ff9d]/30 focus:bg-[#0a0c10] transition-all font-rubik font-medium"
              />
            </div>
            <div className="md:w-72 relative group">
              <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#00ff9d] transition-colors" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-16 pr-8 py-5 bg-[#0a0c10]/50 border border-white/5 rounded-[24px] text-white placeholder-white/20 focus:border-[#00ff9d]/30 focus:bg-[#0a0c10] transition-all font-rubik font-medium"
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="px-10 py-5 rounded-[24px] bg-[#00ff9d] text-[#0a0c10] font-black uppercase tracking-widest text-[13px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#00ff9d]/10"
              >
                Scan Grid
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(true)}
                className="px-6 py-5 rounded-[24px] bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <Filter size={18} />
                {Object.keys(selectedFilters).length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#00ff9d] text-[#0a0c10] text-[10px] font-black flex items-center justify-center">
                    {Object.keys(selectedFilters).length}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content - Job Listings */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                <p className="text-[12px] font-rubik font-[900] uppercase tracking-[0.3em] text-white/40">
                  {loading ? 'Scanning Opportunity Grid...' : `${total} NODES DETECTED`}
                </p>
              </div>
              {Object.keys(selectedFilters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-white/40 hover:text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Reset Params
                </button>
              )}
            </div>

            {/* Job Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <ThinkingLoader loadingText="Matching Opportunities" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-[#161a20]/20 border border-white/5 rounded-[40px] p-20 text-center backdrop-blur-xl">
                <Briefcase className="w-16 h-16 text-white/10 mx-auto mb-8" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">No nodes found</h3>
                <p className="text-white/30 font-rubik font-bold uppercase text-[13px] tracking-wide">Try adjusting your signal filters</p>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {jobs.map((job, idx) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.8, ease: 'easeOut' }}
                    >
                      <JobCard
                        job={job}
                        onSave={() => handleSaveJob(job._id)}
                        onClick={() => navigate(`/jobs/${job._id}`)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination - Show only if results > limit */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-16">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-[12px] font-black uppercase tracking-widest text-white disabled:opacity-20 transition-all hover:bg-white/10"
                >
                  Previous
                </button>
                <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center">
                  <span className="text-[12px] font-black uppercase tracking-widest text-[#00ff9d]">
                    Layer {page} <span className="text-white/20 mx-2">/</span> {totalPages}
                  </span>
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-[12px] font-black uppercase tracking-widest text-white disabled:opacity-20 transition-all hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Recommendations & Trending */}
          <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
            {/* Hiring Signal Container */}
            <div className="bg-[#161a20] border border-white/5 rounded-[48px] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 text-[11px] font-rubik font-[900] uppercase tracking-[0.4em] text-white/30 mb-10">
                  <TrendingUp size={18} />
                  Market Pulse
                </div>

                <div className="space-y-10">
                  {/* Hiring Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-rubik font-[900] text-white tracking-tighter mb-2 italic">34+</p>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">Top Companies</p>
                    </div>
                    <div>
                      <p className="text-4xl font-rubik font-[900] text-[#00ff9d] tracking-tighter mb-2 italic">75+</p>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">New Openings</p>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  {isAuthenticated && recommendations.length > 0 && (
                    <div className="space-y-6 pt-10 border-t border-white/5">
                      <div className="flex items-center justify-between">
                         <h3 className="text-[13px] font-black text-white uppercase tracking-widest">Recommended</h3>
                         <Bot size={16} className="text-[#00ff9d]" />
                      </div>
                      <div className="space-y-4">
                        {recommendations.slice(0, 3).map((job) => (
                          <div
                            key={job._id}
                            onClick={() => navigate(`/jobs/${job._id}`)}
                            className="bg-white/5 border border-white/5 p-5 rounded-[24px] hover:bg-white/10 transition-all cursor-pointer group/item"
                          >
                            <h4 className="font-bold text-white text-[13px] uppercase tracking-tight mb-1 group-hover/item:text-[#00ff9d] transition-colors line-clamp-1">
                              {job.title}
                            </h4>
                            <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{job.company.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hiring Companies */}
                  {hiringCompanies.length > 0 && (
                    <div className="space-y-6 pt-10 border-t border-white/5">
                      <div className="flex items-center justify-between">
                         <h3 className="text-[13px] font-black text-white uppercase tracking-widest">Leading Hiring</h3>
                         <Building2 size={16} className="text-[#00ff9d]" />
                      </div>
                      <div className="space-y-4">
                        {hiringCompanies.slice(0, 4).map((company) => (
                          <div
                            key={company._id}
                            onClick={() => navigate(`/companies/${company.slug}`)}
                            className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
                          >
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              {company.logo ? (
                                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                              ) : (
                                <Building2 size={24} className="text-white/10" />
                              )}
                            </div>
                            <div className="min-w-0">
                               <p className="text-[13px] font-bold text-white uppercase tracking-tighter truncate">{company.name}</p>
                               <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] text-[#00ff9d] font-black uppercase tracking-widest">Hiring</span>
                                  <span className="text-[9px] text-white/20">• {company.industry}</span>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <FiltersModal
            filters={filters}
            selectedFilters={selectedFilters}
            onClose={() => setShowFilters(false)}
            onApply={(newFilters) => {
              setSelectedFilters(newFilters);
              setPage(1);
              setShowFilters(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Job Card Component
function JobCard({
  job,
  onSave,
  onClick,
}: {
  job: Job;
  onSave: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative bg-[#161a20]/40 border border-white/5 rounded-[32px] p-8 md:p-10 transition-all hover:bg-[#1c2128] hover:border-white/20 hover:scale-[1.01] cursor-pointer shadow-2xl backdrop-blur-sm overflow-hidden"
      onClick={onClick}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowUpRight size={24} className="text-[#00ff9d]" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Company Logo - Premium Style */}
          <div className="w-20 h-20 bg-[#161a20] border border-white/10 rounded-[24px] flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-2 group-hover:border-[#00ff9d]/30 transition-colors">
            {job.company.logo ? (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <Building2 className="w-10 h-10 text-white/10" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff9d] bg-[#00ff9d]/10 px-2.5 py-1 rounded">
                Verified Slot
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/5 px-2.5 py-1 rounded">
                 {job.jobType.replace('_', ' ')}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-rubik font-[900] text-white uppercase tracking-tight mb-2 group-hover:text-[#00ff9d] transition-colors leading-[1.1]">
              {job.title}
            </h3>
            
            <div className="flex items-center gap-3 mb-6">
               <p className="text-[15px] font-rubik font-bold text-white/50 tracking-tight">{job.company.name}</p>
               <span className="w-1 h-1 rounded-full bg-white/10" />
               <p className="text-[14px] font-rubik font-bold text-white/30 tracking-tight flex items-center gap-2">
                 <MapPin size={14} />
                 {job.locations?.[0]?.city || 'Remote'}
               </p>
            </div>

            {/* Description Preview - High Class Narrative */}
            <p className="text-white/40 text-[15px] leading-relaxed font-medium tracking-tight mb-8 line-clamp-2 max-w-2xl font-rubik italic">
              " {job.description} "
            </p>

            {/* Tags / Badges */}
            <div className="flex flex-wrap gap-3">
              {job.requiredSkills?.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/5 border border-white/5 text-white/60 text-[11px] font-black uppercase tracking-widest rounded-full group-hover:border-white/10 transition-all hover:bg-[#00ff9d]/10 hover:text-[#00ff9d]"
                >
                  {typeof skill === 'string' ? skill : skill.skill}
                </span>
              ))}
              {job.requiredSkills && job.requiredSkills.length > 4 && (
                <span className="px-4 py-2 text-white/20 text-[11px] font-black uppercase tracking-widest">
                  + {job.requiredSkills.length - 4} More
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Match Signal / Action Section */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-10 md:min-w-[120px]">
          <div className="text-right">
             <div className="flex items-center gap-3 mb-2 justify-end">
                <span className="text-4xl font-rubik font-[900] text-[#00ff9d] italic leading-none">{Math.floor(Math.random() * 20) + 80}%</span>
                <BarChart3 size={20} className="text-[#00ff9d]/40" />
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">MATCH PROBABILITY</p>
          </div>

          <div className="flex gap-4">
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSave();
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  job.isSaved 
                    ? 'bg-[#00ff9d] border-[#00ff9d] text-[#0a0c10]' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                }`}
              >
                {job.isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
             </button>
             <button className="w-12 h-12 rounded-2xl bg-white text-[#0a0c10] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/5">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filters Modal Component
function FiltersModal({
  selectedFilters,
  onClose,
  onApply,
}: {
  filters: JobFilters | null;
  selectedFilters: Record<string, unknown>;
  onClose: () => void;
  onApply: (filters: Record<string, unknown>) => void;
}) {
  const [localFilters, setLocalFilters] = useState(selectedFilters);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0a0c10]/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#161a20] border border-white/10 rounded-[48px] w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">SIGNAL PARAMS</p>
            <h2 className="text-3xl font-rubik font-[900] text-white uppercase tracking-tighter">Refine Grid</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/5">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-10 space-y-10 overflow-y-auto flex-1 scrollbar-hide">
          {/* Experience Level */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">
              Experience Vector
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['fresher', 'entry', 'mid', 'senior', 'lead'].map((level) => (
                <button
                  key={level}
                  onClick={() => setLocalFilters({ ...localFilters, experienceLevel: level })}
                  className={`px-6 py-4 rounded-2xl border text-[13px] font-bold uppercase tracking-tight transition-all ${
                    localFilters.experienceLevel === level
                      ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-[#00ff9d]'
                      : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'
                  }`}
                >
                  {level}
                </button>
              ))}
              <button
                onClick={() => {
                  const nf = { ...localFilters };
                  delete nf.experienceLevel;
                  setLocalFilters(nf);
                }}
                className={`px-6 py-4 rounded-2xl border text-[13px] font-bold uppercase tracking-tight transition-all ${
                  !localFilters.experienceLevel
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/5 border-white/5 text-white/40'
                }`}
              >
                All Levels
              </button>
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">
              Operational Mode
            </label>
            <div className="flex gap-4">
              {['onsite', 'remote', 'hybrid'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLocalFilters({ ...localFilters, workMode: mode })}
                  className={`flex-1 px-4 py-4 rounded-2xl border text-[13px] font-bold uppercase tracking-tight transition-all ${
                    localFilters.workMode === mode
                      ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-[#00ff9d]'
                      : 'bg-white/5 border-white/5 text-white/40'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Vector */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">
              Comp Range (Annual)
            </label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.salaryMin as number || ''}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      salaryMin: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full pl-12 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white font-bold placeholder-white/10 focus:border-[#00ff9d]/30 focus:ring-0 transition-all font-rubik"
                />
              </div>
              <div className="flex-1 relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.salaryMax as number || ''}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      salaryMax: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full pl-12 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white font-bold placeholder-white/10 focus:border-[#00ff9d]/30 focus:ring-0 transition-all font-rubik"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-10 border-t border-white/5 flex gap-4 bg-[#161a20]">
          <button
            onClick={() => setLocalFilters({})}
            className="flex-1 px-8 py-5 rounded-[24px] bg-white/5 border border-white/5 text-[14px] font-black uppercase tracking-widest text-white/40 hover:bg-white/10 transition-all"
          >
            Purge Filters
          </button>
          <button
            onClick={() => onApply(localFilters)}
            className="flex-[2] px-8 py-5 rounded-[24px] bg-[#00ff9d] text-[#0a0c10] text-[14px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#00ff9d]/20"
          >
            Apply Signal
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
