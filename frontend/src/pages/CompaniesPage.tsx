/**
 * Companies Page
 * Company directory and search
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  MapPin,
  Building2,
  Users,
  Star,
  Briefcase,
  Heart,
  ChevronRight,
  CheckCircle,
  Zap,
  Award,
} from 'lucide-react';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/store/authStore';
import { companiesApi, Company, CompanySearchParams } from '@/api/companies';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

export function CompaniesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Companies state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [hiringCompanies, setHiringCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  
  // Filters state
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCity] = useState('');
  const [hiringOnly, setHiringOnly] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Load industries
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        const response = await companiesApi.getIndustries();
        if (response.success) {
          setIndustries(response.data);
        }
      } catch (error) {
        console.error('Failed to load industries:', error);
      }
    };
    loadIndustries();
  }, []);

  // Load companies
  const loadCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params: CompanySearchParams = {
        search: searchQuery || undefined,
        industry: selectedIndustry || undefined,
        city: selectedCity || undefined,
        hiringStatus: hiringOnly ? 'actively_hiring' : undefined,
        page,
        limit: 20,
      };

      const response = await companiesApi.getCompanies(params);
      if (response.success) {
        setCompanies(response.data.companies);
        setTotalPages(response.data.pagination.pages);
        setTotal(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Failed to load companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedIndustry, selectedCity, hiringOnly, page]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // Load featured and hiring companies
  useEffect(() => {
    const loadExtra = async () => {
      try {
        const [featuredRes, hiringRes] = await Promise.all([
          companiesApi.getFeaturedCompanies(),
          companiesApi.getHiringCompanies(),
        ]);
        
        if (featuredRes.success) setFeaturedCompanies(featuredRes.data);
        if (hiringRes.success) setHiringCompanies(hiringRes.data);
      } catch (error) {
        console.error('Failed to load extra data:', error);
      }
    };
    loadExtra();
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
    loadCompanies();
  };

  // Handle follow company
  const handleFollowCompany = async (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please login to follow companies');
      navigate('/auth?mode=login');
      return;
    }

    try {
      const response = await companiesApi.toggleFollowCompany(companyId);
      if (response.success) {
        setCompanies(prev =>
          prev.map(c =>
            c._id === companyId
              ? {
                  ...c,
                  isFollowing: response.data.isFollowing,
                  followerCount: (c.followerCount || 0) + (response.data.isFollowing ? 1 : -1),
                }
              : c
          )
        );
        toast.success(response.message);
      }
    } catch (error) {
      toast.error('Failed to follow company');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Explore Companies</h1>
            {isAuthenticated && (
              <GlassButton
                onClick={() => navigate('/companies/following')}
                className="flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Heart className="w-4 h-4" />
                Following
              </GlassButton>
            )}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name or tech stack"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>
            <select
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setPage(1);
              }}
              className="md:w-48 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:border-purple-400"
            >
              <option value="">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <GlassButton type="submit" className="bg-purple-600 hover:bg-purple-500">
              Search
            </GlassButton>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => {
                setHiringOnly(!hiringOnly);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors ${
                hiringOnly
                  ? 'bg-green-500/30 text-green-300 border border-green-500/50'
                  : 'bg-white/5 text-purple-300 border border-purple-500/30 hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Actively Hiring
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Featured Companies Carousel */}
        {featuredCompanies.length > 0 && !searchQuery && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">Featured Companies</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {featuredCompanies.map((company) => (
                <FeaturedCompanyCard
                  key={company._id}
                  company={company}
                  onClick={() => navigate(`/companies/${company.slug}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Actively Hiring Section */}
        {hiringCompanies.length > 0 && !searchQuery && !hiringOnly && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Actively Hiring</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiringCompanies.slice(0, 6).map((company) => (
                <CompanyMiniCard
                  key={company._id}
                  company={company}
                  onClick={() => navigate(`/companies/${company.slug}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-purple-300 font-medium italic">
            {loading ? 'Synchronizing Company Nodes...' : `${total} companies found`}
          </p>
        </div>

        {/* Company Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <ThinkingLoader loadingText="Discovering Ecosystems" />
          </div>
        ) : companies.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Building2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No companies found</h3>
            <p className="text-purple-300">Try adjusting your search criteria</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {companies.map((company, idx) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <CompanyCard
                    company={company}
                    onFollow={(e) => handleFollowCompany(company._id, e)}
                    onClick={() => navigate(`/companies/${company.slug}`)}
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

        {/* Suggest Company */}
        <div className="mt-12 text-center">
          <p className="text-purple-300 mb-4">Can't find a company?</p>
          <GlassButton onClick={() => navigate('/companies/suggest')}>
            Suggest a Company
          </GlassButton>
        </div>
      </div>
    </div>
  );
}

// Featured Company Card
function FeaturedCompanyCard({
  company,
  onClick,
}: {
  company: Company;
  onClick: () => void;
}) {
  return (
    <GlassCard
      className="min-w-[300px] p-6 cursor-pointer hover:border-yellow-400/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-8 h-8 text-purple-400" />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{company.name}</h3>
          <p className="text-purple-300 text-sm">{company.industry}</p>
        </div>
      </div>
      <p className="text-purple-300 text-sm line-clamp-2 mb-4">
        {company.shortDescription || company.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <Star className="w-4 h-4 fill-current" />
          {company.ratings?.overall?.toFixed(1) || 'N/A'}
        </div>
        {company.hiringStatus === 'actively_hiring' && (
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
            Hiring
          </span>
        )}
      </div>
    </GlassCard>
  );
}

// Company Mini Card
function CompanyMiniCard({
  company,
  onClick,
}: {
  company: Company;
  onClick: () => void;
}) {
  return (
    <GlassCard
      className="p-4 cursor-pointer hover:border-purple-400/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Building2 className="w-6 h-6 text-purple-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-white">{company.name}</h4>
          <p className="text-purple-300 text-sm">{company.industry}</p>
        </div>
        {company.jobCount && company.jobCount > 0 && (
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
            {company.jobCount} jobs
          </span>
        )}
      </div>
    </GlassCard>
  );
}

// Company Card
function CompanyCard({
  company,
  onFollow,
  onClick,
}: {
  company: Company;
  onFollow: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  return (
    <GlassCard
      className="p-6 cursor-pointer hover:border-purple-400/50 transition-colors"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-7 h-7 text-purple-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{company.name}</h3>
              {company.companyType && (
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30 uppercase font-bold tracking-wider">
                  {company.companyType}
                </span>
              )}
            </div>
            <p className="text-purple-300 text-sm">{company.industry}</p>
          </div>
        </div>
        <button
          onClick={onFollow}
          className={`p-2 rounded-lg transition-colors ${
            company.isFollowing
              ? 'bg-purple-500/30 text-purple-300'
              : 'hover:bg-white/10 text-purple-400'
          }`}
        >
          <Heart
            className={`w-5 h-5 ${company.isFollowing ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-purple-300 text-sm line-clamp-2 mb-4">
        {company.shortDescription || company.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-purple-400">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {company.headquarters.city}
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {company.companySize}
        </div>
        {company.ratings?.overall && (
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            {company.ratings.overall.toFixed(1)}
          </div>
        )}
      </div>

      {/* Tech Stack */}
      {company.techStack && company.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {company.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white/5 text-purple-300 text-xs rounded"
            >
              {tech}
            </span>
          ))}
          {company.techStack.length > 4 && (
            <span className="text-purple-400 text-xs">
              +{company.techStack.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-sm text-purple-400">
          {company.followerCount || 0} followers
        </div>
        <div className="flex items-center gap-2">
          {company.hiringStatus === 'actively_hiring' && (
            <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Hiring
            </span>
          )}
          <ChevronRight className="w-4 h-4 text-purple-400" />
        </div>
      </div>
    </GlassCard>
  );
}
