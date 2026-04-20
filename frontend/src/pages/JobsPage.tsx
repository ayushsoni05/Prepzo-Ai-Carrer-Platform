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
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  BookmarkCheck,
  X,
  TrendingUp,
  Zap,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
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
  const [trendingJobs, setTrendingJobs] = useState<Job[]>([]);
  const [urgentJobs, setUrgentJobs] = useState<Job[]>([]);
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
        limit: 20,
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
        const [trendingRes, urgentRes, hiringRes] = await Promise.all([
          jobsApi.getTrendingJobs(),
          jobsApi.getUrgentJobs(),
          companiesApi.getHiringCompanies(),
        ]);
        
        if (trendingRes.success) setTrendingJobs(trendingRes.data);
        if (urgentRes.success) setUrgentJobs(urgentRes.data);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Find Your Dream Job</h1>
            {isAuthenticated && (
              <GlassButton
                onClick={() => navigate('/jobs/saved')}
                className="flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Bookmark className="w-4 h-4" />
                Saved Jobs
              </GlassButton>
            )}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>
            <div className="md:w-64 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <GlassButton type="submit" className="flex-1 md:flex-none bg-purple-600 hover:bg-purple-500">
                Search
              </GlassButton>
              <GlassButton
                type="button"
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {Object.keys(selectedFilters).length > 0 && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {Object.keys(selectedFilters).length}
                  </span>
                )}
              </GlassButton>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Sidebar - Recommendations & Trending */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Recommendations */}
            {isAuthenticated && recommendations.length > 0 && (
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white">For You</h3>
                </div>
                <div className="space-y-3">
                  {recommendations.slice(0, 3).map((job) => (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-medium text-white text-sm line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-purple-300 text-xs">{job.company.name}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Trending Jobs */}
            {trendingJobs.length > 0 && (
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Trending</h3>
                </div>
                <div className="space-y-3">
                  {trendingJobs.slice(0, 3).map((job) => (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-medium text-white text-sm line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-purple-300 text-xs">{job.company.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-purple-400">
                        <Users className="w-3 h-3" />
                        {job.applicationCount || 0} applied
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Urgent Jobs */}
            {urgentJobs.length > 0 && (
              <GlassCard className="p-4 border-red-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">Closing Soon</h3>
                </div>
                <div className="space-y-3">
                  {urgentJobs.slice(0, 3).map((job) => (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <h4 className="font-medium text-white text-sm line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-red-400 text-xs">
                        Deadline: {new Date(job.applicationDeadline!).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Hiring Companies */}
            {hiringCompanies.length > 0 && (
              <GlassCard className="p-4 border-emerald-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">Top Hiring Companies</h3>
                </div>
                <div className="space-y-4">
                  {hiringCompanies.slice(0, 5).map((company) => (
                    <div
                      key={company._id}
                      onClick={() => navigate(`/companies/${company.slug}`)}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-white text-sm truncate">{company.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Hiring</span>
                          <span className="text-[10px] text-white/30">• {company.industry}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => navigate('/companies')}
                    className="w-full py-2 text-[11px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors border-t border-white/5 pt-4"
                  >
                    View All Companies
                  </button>
                </div>
              </GlassCard>
            )}
          </div>


          {/* Main Content - Job Listings */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-purple-300 font-medium italic">
                {loading ? 'Scanning Opportunity Grid...' : `${total} jobs found`}
              </p>
              {Object.keys(selectedFilters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Job Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <ThinkingLoader loadingText="Matching Opportunities" />
              </div>
            ) : jobs.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                <p className="text-purple-300">Try adjusting your search or filters</p>
              </GlassCard>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {jobs.map((job, idx) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.05 }}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <GlassButton
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="disabled:opacity-50"
                >
                  Previous
                </GlassButton>
                <span className="px-4 py-2 text-purple-300">
                  Page {page} of {totalPages}
                </span>
                <GlassButton
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="disabled:opacity-50"
                >
                  Next
                </GlassButton>
              </div>
            )}
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
    <GlassCard
      className="p-6 cursor-pointer hover:border-purple-400/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            {job.company.logo ? (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-6 h-6 text-purple-400" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white hover:text-purple-300 transition-colors">
              {job.title}
            </h3>
            <p className="text-purple-300">{job.company.name}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {job.locations?.[0] && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.locations[0].city}
                </span>
              )}
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                {job.jobType.replace('_', ' ')}
              </span>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                {job.experienceLevel}
              </span>
              <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                {job.workMode}
              </span>
            </div>

            {/* Description Preview */}
            <p className="text-purple-300/80 text-sm mt-3 line-clamp-2">
              {job.description}
            </p>

            {/* Salary & Posted */}
            <div className="flex items-center gap-4 mt-3 text-sm text-purple-400">
              {job.salary && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {job.salary.min?.toLocaleString()} - {job.salary.max?.toLocaleString()}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {job.isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-purple-400" />
            ) : (
              <Bookmark className="w-5 h-5 text-purple-400" />
            )}
          </button>
          <ArrowUpRight className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      {/* Skills */}
      {job.requiredSkills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
          {job.requiredSkills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white/5 text-purple-300 text-xs rounded"
            >
              {typeof skill === 'string' ? skill : skill.skill}
            </span>
          ))}
          {job.requiredSkills.length > 5 && (
            <span className="px-2 py-1 text-purple-400 text-xs">
              +{job.requiredSkills.length - 5} more
            </span>
          )}
        </div>
      )}
    </GlassCard>
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900/95 border border-purple-500/30 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Filters</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
              <X className="w-5 h-5 text-purple-400" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Experience Level
              </label>
              <select
                value={(localFilters.experienceLevel as string) || ''}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, experienceLevel: e.target.value || undefined })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
              >
                <option value="">All Levels</option>
                <option value="fresher">Fresher</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Job Type
              </label>
              <select
                value={(localFilters.jobType as string) || ''}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, jobType: e.target.value || undefined })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
              >
                <option value="">All Types</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Work Mode
              </label>
              <select
                value={(localFilters.workMode as string) || ''}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, workMode: e.target.value || undefined })
                }
                className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
              >
                <option value="">All Modes</option>
                <option value="onsite">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Salary Range (Annual)
              </label>
              <div className="flex gap-4">
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
                  className="flex-1 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
                />
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
                  className="flex-1 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <GlassButton
              onClick={() => setLocalFilters({})}
              className="flex-1"
            >
              Clear All
            </GlassButton>
            <GlassButton
              onClick={() => onApply(localFilters)}
              className="flex-1 bg-purple-600 hover:bg-purple-500"
            >
              Apply Filters
            </GlassButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
