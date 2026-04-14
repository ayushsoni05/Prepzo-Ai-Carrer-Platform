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
} from 'lucide-react';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { useAuthStore } from '@/store/authStore';
import { applicationsApi, Application, ApplicationStatus } from '@/api/applications';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

// Status configurations
const statusConfig: Record<ApplicationStatus, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
    }
  }, [selectedStatus, page]);

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

  // Calculate stats percentages
  const getActiveRate = () => {
    if (!stats?.statusBreakdown) return 0;
    const active = ['applied', 'viewed', 'under_review', 'shortlisted', 'interview_scheduled', 'interview_completed'];
    const activeCount = active.reduce((sum, status) => sum + (stats.statusBreakdown[status] || 0), 0);
    return stats.totalApplications > 0 ? Math.round((activeCount / stats.totalApplications) * 100) : 0;
  };

  const getResponseRate = () => {
    if (!stats?.statusBreakdown) return 0;
    const responded = ['viewed', 'under_review', 'shortlisted', 'interview_scheduled', 'interview_completed', 'offer_extended', 'rejected'];
    const respondedCount = responded.reduce((sum, status) => sum + (stats.statusBreakdown[status] || 0), 0);
    return stats.totalApplications > 0 ? Math.round((respondedCount / stats.totalApplications) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">My Applications</h1>
          <p className="text-purple-300 mt-1 md:mt-2 text-sm md:text-base">Track and manage your job applications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
            <GlassCard className="p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats.totalApplications}
              </div>
              <div className="text-purple-300 text-sm">Total Applications</div>
            </GlassCard>
            
            <GlassCard className="p-4 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {stats.statusBreakdown['shortlisted'] || 0}
              </div>
              <div className="text-purple-300 text-sm">Shortlisted</div>
            </GlassCard>
            
            <GlassCard className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {stats.statusBreakdown['interview_scheduled'] || 0}
              </div>
              <div className="text-purple-300 text-sm">Interviews</div>
            </GlassCard>
            
            <GlassCard className="p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {stats.statusBreakdown['offer_extended'] || 0}
              </div>
              <div className="text-purple-300 text-sm">Offers</div>
            </GlassCard>
          </div>
        )}

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Active Rate</h3>
                <p className="text-purple-300 text-sm">
                  Applications still in progress
                </p>
              </div>
              <CircularProgress value={getActiveRate()} size={80} />
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Response Rate</h3>
                <p className="text-purple-300 text-sm">
                  Applications with employer response
                </p>
              </div>
              <CircularProgress value={getResponseRate()} size={80} />
            </div>
          </GlassCard>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setSelectedStatus('');
              setPage(1);
            }}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors ${
              selectedStatus === ''
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-purple-300 hover:bg-white/10'
            }`}
          >
            All ({stats?.totalApplications || 0})
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
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors flex items-center gap-1 md:gap-2 ${
                  selectedStatus === status
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-purple-300 hover:bg-white/10'
                }`}
              >
                <config.icon className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{config.label}</span>
                <span className="sm:hidden">{config.label.split(' ')[0]}</span>
                ({count})
              </button>
            );
          })}
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <ThinkingLoader loadingText="Retrieving History" />
          </div>
        ) : applications.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {selectedStatus ? 'No applications with this status' : 'No applications yet'}
            </h3>
            <p className="text-purple-300 mb-6">
              {selectedStatus
                ? 'Try a different filter'
                : 'Start applying to jobs to track your progress here'}
            </p>
            <GlassButton onClick={() => navigate('/jobs')}>
              Browse Jobs
            </GlassButton>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {applications.map((application, idx) => (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <ApplicationCard
                    application={application}
                    onView={() => navigate(`/applications/${application._id}`)}
                    onWithdraw={() => handleWithdraw(application._id)}
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
  );
}

// Application Card Component
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

  return (
    <GlassCard
      className="p-6 cursor-pointer hover:border-purple-400/50 transition-colors"
      onClick={onView}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
            {application.company.logo ? (
              <img
                src={application.company.logo}
                alt={application.company.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-6 h-6 text-purple-400" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {application.job.title}
            </h3>
            <p className="text-purple-300">{application.company.name}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-purple-400">
              {application.job.locations?.[0] && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {application.job.locations[0].city}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Applied {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Upcoming Interview Alert */}
            {upcomingInterview && (
              <div className="mt-3 p-2 bg-purple-500/20 rounded-lg flex items-center gap-2 text-purple-300 text-sm">
                <Calendar className="w-4 h-4" />
                Interview: {upcomingInterview.round} on{' '}
                {new Date(upcomingInterview.date).toLocaleDateString()} at{' '}
                {new Date(upcomingInterview.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            )}
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex flex-col items-end gap-2">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${config.bgColor} ${config.color}`}
          >
            <StatusIcon className="w-4 h-4" />
            {config.label}
          </span>

          {/* Match Score */}
          {application.matchScore && (
            <span className="text-sm text-purple-400">
              {application.matchScore.overall}% match
            </span>
          )}

          {/* Withdraw Button */}
          {canWithdraw && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWithdraw();
              }}
              className="text-red-400 text-sm hover:text-red-300 transition-colors"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto">
          {application.statusHistory.slice(-4).map((history, idx) => {
            const historyConfig = statusConfig[history.status];
            const HistoryIcon = historyConfig?.icon || Clock;
            
            return (
              <div key={idx} className="flex items-center">
                {idx > 0 && <div className="w-8 h-0.5 bg-purple-500/30" />}
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded ${historyConfig?.bgColor || 'bg-white/10'}`}
                >
                  <HistoryIcon className={`w-3 h-3 ${historyConfig?.color || 'text-purple-400'}`} />
                  <span className={`text-xs ${historyConfig?.color || 'text-purple-300'}`}>
                    {historyConfig?.label || history.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
