/**
 * Applications Page
 * Track and manage job applications
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Building2,
  MapPin,
  AlertCircle,
  FileText,
  Video,
  Award,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Zap,
  X,
} from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassCard';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { applicationsApi, Application, ApplicationStatus } from '@/api/applications';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';
import { BottomSheet } from '@/components/ui/BottomSheet';


// Status configurations
const statusConfig: Record<ApplicationStatus, {
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
}> = {
  applied: { label: 'Applied', icon: FileText, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  viewed: { label: 'Viewed', icon: Eye, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
  under_review: { label: 'Under Review', icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  shortlisted: { label: 'Shortlisted', icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20' },
  interview_scheduled: { label: 'Interview', icon: Calendar, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  interview_completed: { label: 'Interview Done', icon: Video, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' },
  offer_extended: { label: 'Offer Received', icon: Award, color: 'text-emerald-400', bgColor: 'bg-emerald-500/20' },
  offer_accepted: { label: 'Accepted', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-500/30' },
  offer_declined: { label: 'Declined', icon: XCircle, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/20' },
  withdrawn: { label: 'Withdrawn', icon: XCircle, color: 'text-gray-400', bgColor: 'bg-gray-500/20' },
  on_hold: { label: 'On Hold', icon: AlertCircle, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
};

export function ApplicationsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { setGlobalLoading } = useAppStore();

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalApplications: number;
    statusBreakdown: Record<string, number>;
  } | null>(null);
  
  // Filter state
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | ''>('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Mobile drawer state
  const [selectedAppForSheet, setSelectedAppForSheet] = useState<Application | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthenticated, navigate]);

  // Load applications
  const loadApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await applicationsApi.getApplications({
        status: selectedStatus || undefined,
        page,
        limit: 20,
      });
      
      if (response.success) {
        setApplications(response.data.applications);
        setStats(response.data.stats);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  }, [selectedStatus, page, setGlobalLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications();
    }
  }, [loadApplications, isAuthenticated]);

  // Handle withdraw
  const handleWithdraw = async (applicationId: string) => {
    if (!confirm('Are you sure you want to withdraw this application?')) {
      return;
    }

    try {
      const response = await applicationsApi.withdrawApplication(applicationId);
      if (response.success) {
        toast.success('Application withdrawn');
        loadApplications();
      }
    } catch (error) {
      toast.error('Failed to withdraw application');
    }
  };

  // Internal statistics calculate nodes
  const getActiveRate = () => {
    if (!stats?.statusBreakdown) return 0;
    const active = ['applied', 'viewed', 'under_review', 'shortlisted', 'interview_scheduled', 'interview_completed'];
    const activeCount = active.reduce((sum, status) => sum + (stats.statusBreakdown[status] || 0), 0);
    return stats.totalApplications > 0 ? Math.round((activeCount / stats.totalApplications) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] selection:bg-[#00ff9d] selection:text-[#0a0c10] overflow-x-hidden relative">
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full bg-[#0a0c10] z-0 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <GridBeam className="absolute inset-0" />

      {/* Header / Hero Section */}
      <div className="relative z-10 border-b border-white/5 bg-[#0a0c10]/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 text-left">
          <div className="flex items-center gap-4 text-[13px] font-rubik font-[900] uppercase tracking-[0.5em] text-white/40 mb-8">
            <TrendingUp size={20} strokeWidth={2.5} />
            Application Console
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-7xl font-rubik font-[900] leading-[0.95] tracking-tighter text-white uppercase mb-6">
                Live Status <br/>
                <span className="text-white/40">Propagation.</span>
              </h1>
              <p className="text-[18px] md:text-[21px] leading-relaxed text-white/50 font-rubik font-medium tracking-tight max-w-xl">
                Real-time tracking of your recruitment signals. Monitor every pulse from review to onboarding.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-[#0a0c10] border border-white/5 p-6 rounded-[32px] min-w-[200px]">
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">
                    <Zap size={14} className="text-[#00ff9d]" />
                    Efficiency Rating
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-4xl font-rubik font-[900] text-white">{getActiveRate()}%</span>
                    <div className="w-12 h-12">
                       <CircularProgress value={getActiveRate()} size={48} strokeWidth={4} />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Stats Overview - Premium Blocks */}
        {stats && (
          <div className="flex md:grid md:grid-cols-4 gap-6 mb-16 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0">
            <div className="snap-center shrink-0 w-[85vw] md:w-auto bg-[#0a0c10]/50 border border-white/5 p-10 rounded-[48px] backdrop-blur-xl group hover:border-[#00ff9d]/30 transition-all">
              <p className="text-6xl font-rubik font-[900] text-white tracking-tighter mb-4 italic group-hover:scale-110 transition-transform origin-left">{stats.totalApplications}</p>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-white/20" />
                 <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Total Nodes</p>
              </div>
            </div>
            
            <div className="snap-center shrink-0 w-[85vw] md:w-auto bg-[#0a0c10]/50 border border-white/5 p-10 rounded-[48px] backdrop-blur-xl group hover:border-[#00ff9d]/30 transition-all">
              <p className="text-6xl font-rubik font-[900] text-[#00ff9d] tracking-tighter mb-4 italic group-hover:scale-110 transition-transform origin-left">{stats.statusBreakdown['shortlisted'] || 0}</p>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[#00ff9d]" />
                 <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Shortlisted</p>
              </div>
            </div>
            
            <div className="snap-center shrink-0 w-[85vw] md:w-auto bg-[#0a0c10]/50 border border-white/5 p-10 rounded-[48px] backdrop-blur-xl group hover:border-[#00ff9d]/30 transition-all">
              <p className="text-6xl font-rubik font-[900] text-white tracking-tighter mb-4 italic group-hover:scale-110 transition-transform origin-left">{stats.statusBreakdown['interview_scheduled'] || 0}</p>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-purple-500" />
                 <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Active Interviews</p>
              </div>
            </div>
            
            <div className="snap-center shrink-0 w-[85vw] md:w-auto bg-[#00ff9d] p-10 rounded-[48px] group hover:scale-[1.02] transition-all shadow-2xl shadow-[#00ff9d]/20">
              <p className="text-6xl font-rubik font-[900] text-[#0a0c10] tracking-tighter mb-4 italic">{stats.statusBreakdown['offer_extended'] || 0}</p>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[#0a0c10]" />
                 <p className="text-[10px] uppercase font-black tracking-[0.3em] text-[#0a0c10]/40">Offers Extracted</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs - Premium Glass Chips */}
        <div className="flex flex-wrap gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => {
              setSelectedStatus('');
              setPage(1);
            }}
            className={`px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all border ${
              selectedStatus === ''
                ? 'bg-[#00ff9d] text-[#0a0c10] border-[#00ff9d]'
                : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
            }`}
          >
            All Signal ({stats?.totalApplications || 0})
          </button>
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = stats?.statusBreakdown[status] || 0;
            if (count === 0) return null;
            
            return (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status as ApplicationStatus);
                  setPage(1);
                }}
                className={`px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all border flex items-center gap-3 ${
                  selectedStatus === status
                    ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-[#00ff9d]'
                    : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10'
                }`}
              >
                <config.icon className="w-4 h-4" />
                <span>{config.label}</span>
                <span className="opacity-40">[{count}]</span>
              </button>
            );
          })}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <ThinkingLoader loadingText="Retrieving History" />
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-[#0a0c10]/20 border border-white/5 rounded-[40px] p-24 text-center backdrop-blur-xl">
            <Briefcase className="w-16 h-16 text-white/10 mx-auto mb-8" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
              {selectedStatus ? 'No history detected' : 'No activity logged'}
            </h3>
            <p className="text-white/30 font-rubik font-bold uppercase text-[13px] tracking-wide mb-10">
              {selectedStatus
                ? 'Try a different signal filter'
                : 'Start applying to jobs to initiate tracking'}
            </p>
            <button 
              onClick={() => navigate('/jobs')}
              className="px-12 py-5 rounded-full bg-white text-[#0a0c10] font-black text-[14px] uppercase tracking-widest hover:scale-105 transition-all"
            >
              Browse Opportunity Grid
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {applications.map((app, idx) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.8 }}
                >
                  <ApplicationCard
                    application={app}
                    onView={() => setSelectedAppForSheet(app)}
                    onWithdraw={() => handleWithdraw(app._id)}
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

      {/* Application Detail Modal/BottomSheet */}
      <AnimatePresence>
        {selectedAppForSheet && (
          <ApplicationDetailModal
            application={selectedAppForSheet}
            onClose={() => setSelectedAppForSheet(null)}
            onWithdraw={() => handleWithdraw(selectedAppForSheet._id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ApplicationCard({
  application,
  onView,
  onWithdraw,
}: {
  application: Application;
  onView: () => void;
  onWithdraw: () => void;
}) {
  const config = statusConfig[application.status];
  const StatusIcon = config.icon;
  
  const canWithdraw = ['applied', 'viewed', 'under_review', 'shortlisted'].includes(
    application.status
  );

  // Check for upcoming interview
  const upcomingInterview = application.interviews?.find(
    (i) => i.status === 'scheduled' && new Date(i.date) > new Date()
  );

  if (!application?.job) {
    return (
      <div className="bg-[#0a0c10]/20 border border-white/5 rounded-[32px] p-8 md:p-10 text-left backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 bg-red-400/10 px-2.5 py-1 rounded">
            Node Offline
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/5 px-2.5 py-1 rounded">
            Applied {new Date(application.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-rubik font-[900] text-white/60 uppercase tracking-tight mb-2">
          Job Posting Unavailable
        </h3>
        <p className="text-white/30 text-sm font-medium font-rubik">
          This career opportunity has been archived, expired, or deleted from the opportunity grid.
        </p>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-[#0a0c10]/40 border border-white/5 rounded-[32px] p-8 md:p-10 transition-all hover:bg-[#1c2128] hover:border-white/20 hover:scale-[1.01] cursor-pointer shadow-2xl backdrop-blur-sm overflow-hidden"
      onClick={onView}
    >
      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
         <ArrowUpRight size={24} className="text-[#00ff9d]" />
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Company Logo - Premium Style */}
          <div className="w-20 h-20 bg-[#0a0c10] border border-white/10 rounded-[24px] flex items-center justify-center overflow-hidden shrink-0 shadow-lg p-2 group-hover:border-[#00ff9d]/30 transition-colors">
            {application?.company?.logo ? (
              <img
                src={application.company.logo}
                alt={application.company.name}
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <Building2 className="w-10 h-10 text-white/10" />
            )}
          </div>

          {/* Application Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
               <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded border flex items-center gap-2 ${config.color} ${config.bgColor} border-white/10`}>
                 <StatusIcon size={12} />
                 {config.label}
               </span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/5 px-2.5 py-1 rounded">
                  Applied {new Date(application.createdAt).toLocaleDateString()}
               </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-rubik font-[900] text-white uppercase tracking-tight mb-2 group-hover:text-[#00ff9d] transition-colors leading-[1.1]">
              {application.job?.title || 'Untitled Role'}
            </h3>
            
            <div className="flex items-center gap-3 mb-6">
               <p className="text-[15px] font-rubik font-bold text-white/50 tracking-tight">{application?.company?.name || 'Unknown Company'}</p>
               <span className="w-1 h-1 rounded-full bg-white/10" />
               <p className="text-[14px] font-rubik font-bold text-white/30 tracking-tight flex items-center gap-2">
                 <MapPin size={14} />
                 {application.job?.locations?.[0]?.city || 'Remote'}
               </p>
            </div>

            {/* Upcoming Interview Alert - Premium Banner */}
            {upcomingInterview && (
              <div className="inline-flex items-center gap-4 bg-purple-500/10 border border-purple-500/20 px-6 py-3 rounded-2xl mb-8">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div className="flex items-center gap-2">
                   <span className="text-[11px] font-black uppercase tracking-widest text-purple-300">Next Transmission:</span>
                   <span className="text-[11px] font-bold text-white tracking-tight">
                     {upcomingInterview.round} on {new Date(upcomingInterview.date).toLocaleDateString()}
                   </span>
                </div>
              </div>
            )}

            {/* Progress Timeline - Narrative Style */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
              {application.statusHistory?.slice(-4).map((history: { status: ApplicationStatus }, idx: number) => {
                const historyConfig = statusConfig[history.status];
                const HistoryIcon = historyConfig?.icon || Clock;
                
                return (
                  <div key={idx} className="flex items-center shrink-0">
                    {idx > 0 && <div className="w-4 h-px bg-white/10" />}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl">
                      <HistoryIcon size={12} className={historyConfig?.color || 'text-white/20'} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${historyConfig?.color || 'text-white/20'}`}>
                        {historyConfig?.label || history.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Match Signal / Action Section */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-10 md:min-w-[120px]">
          <div className="text-right">
             <div className="flex items-center gap-3 mb-2 justify-end">
                <span className="text-4xl font-rubik font-[900] text-[#00ff9d] italic leading-none">{application.matchScore?.overall || 85}%</span>
                <BarChart3 size={20} className="text-[#00ff9d]/40" />
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">EXTRACTED MATCH</p>
          </div>

          <div className="flex gap-4">
             {canWithdraw && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWithdraw();
                  }}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-black uppercase tracking-widest text-red-400/40 hover:bg-red-500/10 hover:text-red-400 transition-all"
                >
                  Withdraw
               </button>
             )}
             <button className="w-12 h-12 rounded-2xl bg-white text-[#0a0c10] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/5">
                <ArrowUpRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationDetailModal({
  application,
  onClose,
  onWithdraw,
}: {
  application: Application;
  onClose: () => void;
  onWithdraw: () => void;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const config = statusConfig[application.status] || { label: application.status, icon: Clock, color: 'text-white/40', bgColor: 'bg-white/5' };
  const StatusIcon = config.icon;

  const canWithdraw = ['applied', 'viewed', 'under_review', 'shortlisted'].includes(
    application.status
  );

  const detailContent = (
    <div className="space-y-6 text-left pb-6 font-rubik">
      {/* Header Info */}
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 p-2">
          {application.company?.logo ? (
            <img src={application.company.logo} alt={application.company.name} className="w-full h-full object-contain rounded-lg" />
          ) : (
            <Building2 size={24} className="text-white/20" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight leading-tight">{application.job?.title || 'Untitled Role'}</h2>
          <p className="text-[#00ff9d] font-bold uppercase tracking-widest text-[12px] mt-1">{application.company?.name}</p>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-3 bg-white/5 rounded-2xl p-4 border border-white/5">
        <div>
          <p className="text-[9px] font-black text-white/20 uppercase">Location</p>
          <p className="text-white text-xs font-bold truncate">{application.job?.locations?.[0]?.city || 'Remote'}</p>
        </div>
        <div>
          <p className="text-[9px] font-black text-white/20 uppercase">Contract</p>
          <p className="text-white text-xs font-bold capitalize truncate">{application.job?.jobType?.replace('_', ' ') || 'Full Time'}</p>
        </div>
        <div className="mt-2">
          <p className="text-[9px] font-black text-white/20 uppercase">Compensation</p>
          <p className="text-white text-xs font-bold truncate">
            {application.job?.salary?.min ? `${(application.job.salary.min/1000).toFixed(0)}k` : ''} - {application.job?.salary?.max ? `${(application.job.salary.max/1000).toFixed(0)}k` : 'Competitive'}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-[9px] font-black text-white/20 uppercase">AI Match</p>
          <p className="text-[#00ff9d] text-sm font-black">{application.matchScore?.overall || 85}%</p>
        </div>
      </div>

      {/* Timeline Section */}
      {application.statusHistory && application.statusHistory.length > 0 && (
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff9d] mb-4">Transmission Timeline</h4>
          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {application.statusHistory.map((h: any, i: number) => {
              const hConfig = statusConfig[h.status as ApplicationStatus] || { label: h.status, icon: Clock, color: 'text-white/40', bgColor: 'bg-white/5' };
              const HIcon = hConfig.icon;
              return (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-[#0a0c10] border border-white/10 flex items-center justify-center text-white/40">
                    <HIcon size={12} className={hConfig.color} />
                  </div>
                  <div>
                    <h5 className={`font-bold text-xs uppercase tracking-wide ${hConfig.color}`}>{hConfig.label}</h5>
                    <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mt-0.5">{new Date(h.changedAt).toLocaleString()}</p>
                    {h.note && <p className="text-white/50 text-xs mt-1 italic">" {h.note} "</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Interviews Section */}
      {application.interviews && application.interviews.length > 0 && (
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff9d] mb-3">Interview Schedule</h4>
          <div className="space-y-3">
            {application.interviews.map((item: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{item.round}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    item.status === 'scheduled' ? 'text-purple-400 bg-purple-500/10' :
                    item.status === 'completed' ? 'text-[#00ff9d] bg-[#00ff9d]/10' : 'text-red-400 bg-red-400/10'
                  }`}>{item.status}</span>
                </div>
                <p className="text-[11px] text-white/40 font-semibold uppercase tracking-widest">
                  {new Date(item.date).toLocaleString()}
                </p>
                {item.notes && <p className="text-xs text-white/60 italic mt-1">"{item.notes}"</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Job Description (Brief) */}
      <section>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff9d] mb-2">Job Description Summary</h4>
        <p className="text-white/60 text-xs leading-relaxed line-clamp-4">{application.job?.description}</p>
      </section>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-white/5">
        {canWithdraw && (
          <button
            onClick={() => {
              onWithdraw();
              onClose();
            }}
            className="flex-1 py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition-all"
          >
            Withdraw Application
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 py-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-black uppercase tracking-widest text-white/40 hover:bg-white/10 transition-all"
        >
          Close Detail
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <BottomSheet isOpen={true} onClose={onClose} title="Application Detail">
        {detailContent}
      </BottomSheet>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0a0c10]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl max-h-[85vh] bg-[#0c0f14] border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-2xl relative"
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">TRANSMISSION METADATA</p>
            <h2 className="text-2xl font-rubik font-[900] text-white uppercase tracking-tighter">Application Details</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/5">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {detailContent}
        </div>
      </motion.div>
    </div>
  );
}

