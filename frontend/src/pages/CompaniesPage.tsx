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
  Heart,
  Zap,
  Award,
  ArrowUpRight,
  TrendingUp,
  X,
} from 'lucide-react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { companiesApi, Company, CompanySearchParams } from '@/api/companies';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

export function CompaniesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  const { setGlobalLoading } = useAppStore();

  // Search state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  // Companies state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
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
      setGlobalLoading(false);
    }
  }, [searchQuery, selectedIndustry, selectedCity, hiringOnly, page, setGlobalLoading]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  // Load featured and hiring companies
  useEffect(() => {
    const loadExtra = async () => {
      try {
        const [featuredRes] = await Promise.all([
          companiesApi.getFeaturedCompanies(),
        ]);
        
        if (featuredRes.success) setFeaturedCompanies(featuredRes.data);
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
    <div className="min-h-screen bg-[#f3f2ef] selection:bg-[#057642] selection:text-gray-900 overflow-x-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full bg-[#f3f2ef] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <GridBeam className="absolute inset-0" />

      <div className="relative z-10 bg-white/80 backdrop-blur-3xl pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <GlassCard className="mt-12 p-2 border-gray-300 shadow-2xl relative z-20">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, industry, or stack"
                  className="w-full pl-14 pr-4 py-5 bg-transparent border-none text-gray-900 text-[15px] font-bold placeholder-white/20 focus:ring-0 transition-all font-rubik"
                />
              </div>
              <div className="md:w-64 relative border-t md:border-t-0 md:border-l border-gray-200 py-2 md:py-0">
                <select
                  value={selectedIndustry}
                  onChange={(e) => {
                    setSelectedIndustry(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-full pl-6 pr-10 py-5 bg-transparent border-none text-gray-900 text-[15px] font-bold placeholder-white/20 focus:ring-0 transition-all font-rubik appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#f3f2ef]">All Industries</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#f3f2ef]">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 p-1">
                <button 
                  type="button"
                  onClick={() => {
                    setHiringOnly(!hiringOnly);
                    setPage(1);
                  }}
                  className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-3 ${
                    hiringOnly
                      ? 'bg-[#057642]/10 border-[#057642] text-[#057642]'
                      : 'bg-white border-gray-200 border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-[12px] font-black uppercase tracking-widest hidden sm:inline">Hiring Only</span>
                </button>
                <button 
                  type="submit"
                  className="px-10 py-4 rounded-2xl bg-[#057642] text-[#0a0c10] font-rubik font-[900] text-[14px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-md"
                >
                  Search
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Market Stats Sidebar Style Overview */}
        {!searchQuery && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            <div className="lg:col-span-8">
               <div className="flex items-center gap-4 text-[13px] font-rubik font-[900] uppercase tracking-[0.4em] text-[#057642] mb-10">
                  <Award size={20} />
                  Featured Companies
               </div>
               <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                  {featuredCompanies.map((company) => (
                    <FeaturedCompanyCard
                      key={company._id}
                      company={company}
                      onClick={() => setSelectedCompany(company)}
                    />
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 bg-white border-gray-2000 border border-gray-200 rounded-[48px] p-10 backdrop-blur-xl">
               <div className="flex items-center gap-4 text-[11px] font-rubik font-[900] uppercase tracking-[0.4em] text-gray-500 mb-8">
                  <TrendingUp size={18} />
                  Market Insights
               </div>
               <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-4xl font-rubik font-[900] text-gray-900 tracking-tighter mb-2 italic">34</p>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Total Companies</p>
                    </div>
                    <div>
                      <p className="text-4xl font-rubik font-[900] text-[#057642] tracking-tighter mb-2 italic">12</p>
                      <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Actively Hiring</p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-gray-200">
                     <p className="text-[13px] font-rubik font-bold text-gray-500 leading-relaxed italic">
                       " The ecosystem is expanding. Major pivots detected in AI research and FinTech sectors. "
                     </p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#057642] animate-pulse" />
            <p className="text-[12px] font-rubik font-[900] uppercase tracking-[0.3em] text-gray-500">
              {loading ? 'Loading Companies...' : `${total} COMPANIES FOUND`}
            </p>
          </div>
        </div>

        {/* Company Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <ThinkingLoader loadingText="Loading Companies" />
          </div>
        ) : companies.length === 0 ? (
          <div className="bg-white/20 border border-gray-200 rounded-[40px] p-24 text-center backdrop-blur-xl">
            <Building2 className="w-16 h-16 text-gray-900/10 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4">No companies found</h3>
            <p className="text-gray-500 font-rubik font-bold uppercase text-[13px] tracking-wide">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {companies.map((company, idx) => (
                <motion.div
                  key={company._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.8 }}
                >
                  <CompanyCard
                    company={company}
                    onFollow={(e) => handleFollowCompany(company._id, e)}
                    onClick={() => setSelectedCompany(company)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination - Show only if results > limit */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-20">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-8 py-5 rounded-3xl bg-white border-gray-200 border border-gray-200 text-[14px] font-semibold text-gray-600 text-gray-900 disabled:opacity-20 transition-all hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="px-10 py-5 rounded-3xl bg-[#f3f2ef] border border-gray-200 flex items-center">
              <span className="text-[14px] font-semibold text-gray-600 text-[#057642]">
                PAGE {page} <span className="text-gray-900/10 mx-3">/</span> {totalPages}
              </span>
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-8 py-5 rounded-3xl bg-white border-gray-200 border border-gray-200 text-[14px] font-semibold text-gray-600 text-gray-900 disabled:opacity-20 transition-all hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Suggest Company */}
        <div className="mt-32 text-center py-20 border-t border-gray-200">
          <p className="text-[14px] font-rubik font-bold text-gray-500 uppercase tracking-[0.5em] mb-8">Missing a Company?</p>
          <button 
            onClick={() => navigate('/companies/suggest')}
            className="px-12 py-5 rounded-full bg-white text-[#0a0c10] font-black text-[14px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            Suggest a Company
          </button>
        </div>
      </div>

      {/* Company Detail Modal/BottomSheet */}
      <AnimatePresence>
        {selectedCompany && (
          <CompanyDetailModal
            company={selectedCompany}
            onClose={() => setSelectedCompany(null)}
            onFollow={(e) => handleFollowCompany(selectedCompany._id, e)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FeaturedCompanyCard({
  company,
  onClick,
}: {
  company: Company;
  onClick: () => void;
}) {
  return (
    <div
      className="group relative min-w-[280px] bg-white/40 border border-gray-200 rounded-[28px] p-6 transition-all hover:bg-gray-50 hover:border-[#057642]/30 cursor-pointer overflow-hidden shadow-2xl"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowUpRight size={20} className="text-[#057642]" />
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="w-16 h-16 bg-[#f3f2ef] border border-gray-300 rounded-[20px] flex items-center justify-center overflow-hidden p-2 group-hover:border-[#057642]/20 transition-colors">
          {company?.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-900/10" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-rubik font-[900] text-gray-900 uppercase tracking-tight group-hover:text-[#057642] transition-colors">{company?.name}</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{company?.industry}</p>
        </div>
      </div>
      
      <p className="text-gray-500 text-[13px] leading-relaxed font-medium tracking-tight mb-6 line-clamp-2 italic font-rubik">
        "{company.shortDescription || company.description}"
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
           <Star className="w-4 h-4 text-[#057642] fill-[#057642]" />
           <span className="text-[13px] font-black text-gray-900">{company.ratings?.overall?.toFixed(1) || '4.8'}</span>
        </div>
        {company.hiringStatus === 'actively_hiring' && (
          <div className="flex items-center gap-2 px-3 py-1 bg-[#057642]/10 border border-[#057642]/20 rounded-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-[#057642] animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-widest text-[#057642]">Hiring</span>
          </div>
        )}
      </div>
    </div>
  );
}


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
    <div
      className="group relative bg-white/40 border border-gray-200 rounded-[28px] p-6 transition-all hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.01] cursor-pointer shadow-2xl backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowUpRight size={20} className="text-[#057642]" />
      </div>

      <div className="flex items-start gap-6 mb-8">
        <div className="w-16 h-16 bg-[#f3f2ef] border border-gray-300 rounded-[24px] flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-2 group-hover:border-[#057642]/30 transition-colors">
          {company?.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-900/10" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
             <h3 className="text-xl font-rubik font-[900] text-gray-900 uppercase tracking-tighter truncate leading-tight group-hover:text-[#057642] transition-colors">
               {company.name}
             </h3>
             {company.companyType && (
               <span className="text-[8px] font-black uppercase tracking-widest text-[#057642] bg-[#057642]/10 px-1.5 py-0.5 rounded">
                  {company.companyType}
               </span>
             )}
          </div>
          <p className="text-[14px] font-semibold text-gray-600 text-gray-500">{company.industry}</p>
        </div>
      </div>

      <p className="text-gray-500 text-[14px] leading-relaxed font-medium tracking-tight mb-8 line-clamp-2 max-w-2xl font-rubik italic">
         " {company.shortDescription || company.description} "
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="flex items-center gap-3">
            <MapPin size={14} className="text-[#057642]/40" />
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">{company.headquarters.city}</span>
         </div>
         <div className="flex items-center gap-3">
            <Users size={14} className="text-[#057642]/40" />
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">{company.companySize}</span>
         </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0c10] bg-white border-gray-200 flex items-center justify-center overflow-hidden">
                   <Users size={10} className="text-gray-400" />
                </div>
              ))}
           </div>
           <span className="text-[12px] font-normal text-gray-500 text-gray-400">{company.followerCount || 0} Followers</span>
        </div>
        
        <button
          onClick={onFollow}
          className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
            company.isFollowing 
              ? 'bg-[#057642] border-[#057642] text-[#0a0c10]' 
              : 'bg-white border-gray-200 border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Heart size={18} className={company.isFollowing ? 'fill-current' : ''} />
        </button>
      </div>
    </div>
  );
}

function CompanyDetailModal({
  company,
  onClose,
  onFollow,
}: {
  company: Company;
  onClose: () => void;
  onFollow: (e: React.MouseEvent) => void;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const detailContent = (
    <div className="space-y-6 text-left pb-6 font-rubik text-gray-800 dark:text-gray-200">
      {/* Header Info */}
      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-2">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain rounded-lg" />
          ) : (
            <Building2 size={32} className="text-gray-400" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">{company.name}</h2>
          <p className="text-[#057642] font-bold uppercase tracking-widest text-[12px] mt-1">{company.industry}</p>
        </div>
      </div>

      {/* Stats Block */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase">Headquarters</p>
          <p className="text-gray-900 text-xs font-bold truncate">{company.headquarters?.city || 'Unknown'}</p>
        </div>
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase">Company Size</p>
          <p className="text-gray-900 text-xs font-bold truncate">{company.companySize || 'Unknown'}</p>
        </div>
        <div className="mt-2">
          <p className="text-[9px] font-black text-gray-400 uppercase">Hiring Status</p>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
            company.hiringStatus === 'actively_hiring' ? 'text-[#057642] bg-[#057642]/10' : 'text-gray-400 bg-gray-100'
          }`}>
            {company.hiringStatus === 'actively_hiring' ? 'Actively Hiring' : 'Not Hiring'}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-[9px] font-black text-gray-400 uppercase">Overall Rating</p>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-sm font-black">{company.ratings?.overall?.toFixed(1) || '4.8'}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <section>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#057642] mb-2">Company Overview</h4>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{company.description}</p>
      </section>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onFollow}
          className={`flex-[2] py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 border ${
            company.isFollowing 
              ? 'bg-[#057642] border-[#057642] text-white shadow-lg' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Heart size={16} className={company.isFollowing ? 'fill-current' : ''} />
          {company.isFollowing ? 'Following' : 'Follow Node'}
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 rounded-xl bg-gray-100 border border-gray-200 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <BottomSheet isOpen={true} onClose={onClose} title="Company Intel">
        {detailContent}
      </BottomSheet>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl max-h-[85vh] bg-white border border-gray-200 rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative"
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">COMPANY METADATA</p>
            <h2 className="text-2xl font-rubik font-[900] text-gray-900 uppercase tracking-tighter">Company Details</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-150 transition-all border border-gray-200">
            <X className="w-5 h-5 text-gray-900" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {detailContent}
        </div>
      </motion.div>
    </div>
  );
}
