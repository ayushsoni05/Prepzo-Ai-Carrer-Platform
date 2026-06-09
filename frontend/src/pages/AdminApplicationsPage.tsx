/**
 * Admin Applications Page
 * Admin dashboard to view, filter, expand, and export job applications
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { applicationsApi, Application } from '@/api/applications';
import { jobsApi } from '@/api/jobs';
import { companiesApi } from '@/api/companies';
import toast from 'react-hot-toast';

export function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  // Filters state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [jobId, setJobId] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filter options lists
  const [companies, setCompanies] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [companiesRes, jobsRes] = await Promise.all([
          companiesApi.getCompanies(),
          jobsApi.searchJobs({ limit: 100 }),
        ]);
        if (companiesRes.success) setCompanies(companiesRes.data.companies || []);
        if (jobsRes.success) setJobs(jobsRes.data.jobs || []);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await applicationsApi.getAllApplicationsAdmin({
        status: status || undefined,
        companyId: companyId || undefined,
        jobId: jobId || undefined,
        search: search || undefined,
        page,
        limit: 15,
      });
      if (res.success) {
        setApplications(res.data.applications || []);
        setTotalPages(res.data.pagination?.pages || 1);
        setTotal(res.data.pagination?.total || 0);
      }
    } catch (err: any) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [status, companyId, jobId, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadApplications();
  };

  const handleExportCsv = async () => {
    setExporting(true);
    const exportToast = toast.loading('Generating export file...');
    try {
      const blob = await applicationsApi.exportApplicationsCsv({
        companyId: companyId || undefined,
        jobId: jobId || undefined,
        status: status || undefined,
      });
      
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `applications_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Applications exported successfully!', { id: exportToast });
    } catch (err) {
      toast.error('Failed to export applications', { id: exportToast });
    } finally {
      setExporting(false);
    }
  };

  const toggleExpandRow = (id: string) => {
    setExpandedAppId(prev => (prev === id ? null : id));
  };

  const handleUpdateStatus = async (appId: string, newStatus: any) => {
    const statusToast = toast.loading('Updating application status...');
    try {
      const res = await applicationsApi.updateStatus(appId, newStatus, 'Status updated via admin panel');
      if (res.success) {
        toast.success(`Application status updated to ${newStatus.replace('_', ' ')}`, { id: statusToast });
        setApplications(prev =>
          prev.map(app => (app._id === appId ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      toast.error('Failed to update status', { id: statusToast });
    }
  };

  const getStatusBadgeClass = (s: string) => {
    switch (s) {
      case 'applied':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'shortlisted':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'interview_scheduled':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'rejected':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-white/60 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#0a0c10] min-h-screen text-white font-sans">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Application Grid</h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Recruiter and placement tracking node</p>
        </div>
        <button
          onClick={handleExportCsv}
          disabled={exporting || applications.length === 0}
          className="px-6 py-4 rounded-2xl bg-[#00ff9d] hover:bg-[#00e58d] text-[#0a0c10] font-black uppercase tracking-widest text-[12px] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download size={16} />}
          Export CSV
        </button>
      </div>

      {/* Filter Toolbar */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-[#0c0f16] border border-white/5 p-6 rounded-[32px]">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search candidate name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#0a0c10] border border-white/5 rounded-xl text-white placeholder-white/20 focus:border-[#00ff9d]/30 focus:ring-0 transition-all text-sm font-medium"
          />
        </div>

        {/* Company Filter */}
        <select
          value={companyId}
          onChange={e => { setCompanyId(e.target.value); setPage(1); }}
          className="w-full px-4 py-3 bg-[#0a0c10] border border-white/5 rounded-xl text-white focus:border-[#00ff9d]/30 focus:ring-0 transition-all text-sm font-medium appearance-none"
        >
          <option value="">All Companies</option>
          {companies.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        {/* Job Filter */}
        <select
          value={jobId}
          onChange={e => { setJobId(e.target.value); setPage(1); }}
          className="w-full px-4 py-3 bg-[#0a0c10] border border-white/5 rounded-xl text-white focus:border-[#00ff9d]/30 focus:ring-0 transition-all text-sm font-medium appearance-none"
        >
          <option value="">All Job Roles</option>
          {jobs.map(j => (
            <option key={j._id} value={j._id}>{j.title}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="w-full px-4 py-3 bg-[#0a0c10] border border-white/5 rounded-xl text-white focus:border-[#00ff9d]/30 focus:ring-0 transition-all text-sm font-medium appearance-none"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="under_review">Under Review</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview_scheduled">Interview Scheduled</option>
          <option value="offer_extended">Offer Extended</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          <Filter size={16} /> Filter Grid
        </button>
      </form>

      {/* Main Grid Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-10 h-10 text-[#00ff9d] animate-spin" />
          <p className="text-white/40 uppercase tracking-widest font-black text-xs">Scanning signals...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-[#0c0f16] border border-white/5 rounded-[40px] p-20 text-center max-w-xl mx-auto">
          <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">No applications log</h3>
          <p className="text-white/30 text-sm">No applications matched the specified filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#0c0f16] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
            {/* Desktop Table Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-white/5 bg-[#10141e]/50 text-[11px] font-black uppercase tracking-widest text-white/40">
              <div className="col-span-3">Candidate</div>
              <div className="col-span-3">Target Node</div>
              <div className="col-span-2">Applied Date</div>
              <div className="col-span-1 text-center">Score</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-1"></div>
            </div>

            {/* Application Rows */}
            <div className="divide-y divide-white/5">
              {applications.map(app => {
                const isExpanded = expandedAppId === app._id;
                const applicantName = app.formData?.personalInfo?.fullName || (app.applicant as any)?.fullName || 'Anonymous';
                const applicantEmail = app.formData?.personalInfo?.email || (app.applicant as any)?.email || 'N/A';
                const score = app.matchScore?.overall || 70;

                return (
                  <div key={app._id} className="transition-all hover:bg-white/[0.01]">
                    {/* Collapsed view */}
                    <div
                      onClick={() => toggleExpandRow(app._id)}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 py-6 cursor-pointer text-sm"
                    >
                      {/* Name / Contact */}
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <User size={16} className="text-white/40" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white uppercase tracking-tight truncate">{applicantName}</p>
                          <p className="text-white/40 text-xs truncate mt-0.5">{applicantEmail}</p>
                        </div>
                      </div>

                      {/* Job Title / Company */}
                      <div className="col-span-3">
                        <p className="font-bold text-white uppercase tracking-tight truncate">{app.job?.title || 'Unknown Job'}</p>
                        <p className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest truncate mt-0.5">
                          {app.company?.name || 'Prepzo Partner'}
                        </p>
                      </div>

                      {/* Applied Date */}
                      <div className="col-span-2 text-white/60 font-medium">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }) : 'N/A'}
                      </div>

                      {/* Match Score */}
                      <div className="col-span-1 text-center font-black text-[#00ff9d] text-base">
                        {score}%
                      </div>

                      {/* Status */}
                      <div className="col-span-2 flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(app.status)}`}>
                          {app.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      {/* Expand indicator */}
                      <div className="col-span-1 flex justify-end">
                        <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-colors">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded view details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-[#07090d] border-t border-white/5 px-8 py-8"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Profile Info card */}
                            <div className="space-y-6">
                              <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d]">Candidate Bio</h4>
                              <div className="bg-[#0c0f16] border border-white/5 p-6 rounded-2xl space-y-4">
                                <div className="flex items-center gap-3 text-white/80">
                                  <User size={16} className="text-white/20" />
                                  <span className="font-semibold text-sm">{applicantName}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                  <Mail size={16} className="text-white/20" />
                                  <span className="text-sm">{applicantEmail}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                  <Phone size={16} className="text-white/20" />
                                  <span className="text-sm">{app.formData?.personalInfo?.phone || 'N/A'}</span>
                                </div>
                                {app.resumeUrl && (
                                  <div className="pt-4 border-t border-white/5 flex gap-2">
                                    <a
                                      href={app.resumeUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="px-4 py-2.5 rounded-xl bg-[#00ff9d]/10 hover:bg-[#00ff9d]/20 border border-[#00ff9d]/20 text-[#00ff9d] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                                    >
                                      <FileText size={14} /> View Resume
                                    </a>
                                  </div>
                                )}
                              </div>

                              {/* Status Action */}
                              <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d] pt-4">Stage Management</h4>
                              <div className="bg-[#0c0f16] border border-white/5 p-6 rounded-2xl">
                                <label className="block text-[10px] font-black uppercase text-white/30 tracking-widest mb-3">Update Pipeline Stage</label>
                                <select
                                  value={app.status}
                                  onChange={e => handleUpdateStatus(app._id, e.target.value as any)}
                                  className="w-full px-4 py-3 bg-[#0a0c10] border border-white/10 rounded-xl text-white text-sm font-bold focus:border-[#00ff9d]/30 focus:ring-0 transition-all appearance-none"
                                >
                                  <option value="applied">Applied</option>
                                  <option value="under_review">Under Review</option>
                                  <option value="shortlisted">Shortlisted</option>
                                  <option value="interview_scheduled">Interview Scheduled</option>
                                  <option value="offer_extended">Offer Extended</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                              </div>
                            </div>

                            {/* Details (Education, Experience, Skills) */}
                            <div className="lg:col-span-2 space-y-8">
                              {/* Education */}
                              <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d] mb-4 flex items-center gap-2">
                                  <GraduationCap size={16} /> Academic Background
                                </h4>
                                <div className="space-y-4">
                                  {app.formData?.education?.map((edu, idx) => (
                                    <div key={idx} className="bg-[#0c0f16] border border-white/5 p-5 rounded-2xl">
                                      <p className="font-bold text-white uppercase text-[13px]">{edu.degree} in {edu.field}</p>
                                      <p className="text-white/60 text-xs mt-1">{edu.institution} • Graduation: {edu.graduationYear} {edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}</p>
                                    </div>
                                  ))}
                                  {(!app.formData?.education || app.formData.education.length === 0) && (
                                    <p className="text-white/30 text-xs italic">No education logged</p>
                                  )}
                                </div>
                              </div>

                              {/* Experience */}
                              <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d] mb-4 flex items-center gap-2">
                                  <Briefcase size={16} /> Professional History
                                </h4>
                                <div className="space-y-4">
                                  {app.formData?.workExperience?.map((exp, idx) => (
                                    <div key={idx} className="bg-[#0c0f16] border border-white/5 p-5 rounded-2xl">
                                      <p className="font-bold text-white uppercase text-[13px]">{exp.jobTitle} at {exp.companyName}</p>
                                      <p className="text-[#00ff9d] text-xs font-bold uppercase tracking-wider mt-1">{exp.location || 'Remote'}</p>
                                      {exp.description && (
                                        <p className="text-white/40 text-xs mt-3 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                      )}
                                    </div>
                                  ))}
                                  {(!app.formData?.workExperience || app.formData.workExperience.length === 0) && (
                                    <p className="text-white/30 text-xs italic">Fresh Graduate / No work history logged</p>
                                  )}
                                </div>
                              </div>

                              {/* Skills & Cover Letter */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d] mb-4 flex items-center gap-2">
                                    <Code size={16} /> Skills Summary
                                  </h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {app.formData?.skills?.map((skill, idx) => (
                                      <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#00ff9d]/5 border border-[#00ff9d]/10 text-[#00ff9d] text-[11px] font-bold">
                                        {skill}
                                      </span>
                                    ))}
                                    {(!app.formData?.skills || app.formData.skills.length === 0) && (
                                      <p className="text-white/30 text-xs italic">No skills cataloged</p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-xs font-black uppercase tracking-widest text-[#00ff9d] mb-4 flex items-center gap-2">
                                    <FileText size={16} /> Motivation
                                  </h4>
                                  <div className="bg-[#0c0f16] border border-white/5 p-5 rounded-2xl min-h-[100px]">
                                    <p className="text-white/60 text-xs leading-relaxed">
                                      {app.formData?.additionalInfo?.whyThisRole || app.coverLetter || 'No cover letter / statement provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-[12px] font-black uppercase tracking-widest text-white disabled:opacity-20 transition-all hover:bg-white/10"
              >
                Previous
              </button>
              <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center text-[12px] font-black uppercase tracking-widest text-[#00ff9d]">
                Page {page} of {totalPages}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-[12px] font-black uppercase tracking-widest text-white disabled:opacity-20 transition-all hover:bg-white/10"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
