import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Settings, 
  Terminal as TerminalIcon, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Rss, 
  Search, 
  Clock, 
  Check, 
  Trash2, 
  Plus, 
  Activity, 
  Briefcase, 
  Building2, 
  Bell, 
  RefreshCw,
  Eye,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard, GlassButton } from '../ui/GlassCard';
import * as jobAutomationApi from '../../api/jobAutomation';
import type { 
  JobAutomationLog, 
  JobAutomationConfig, 
  JobAutomationLogEntry 
} from '../../api/jobAutomation';

export const JobAutomationPanel: React.FC = () => {
  // Config & Status States
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<JobAutomationConfig | null>(null);
  const [latestLog, setLatestLog] = useState<JobAutomationLog | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'console' | 'history' | 'config'>('console');
  
  // History Logs States
  const [logsList, setLogsList] = useState<JobAutomationLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingLogs, setLoadingLogs] = useState(false);
  
  // Inputs States
  const [newRss, setNewRss] = useState('');
  const [newQuery, setNewQuery] = useState('');
  const [savingConfig, setSavingConfig] = useState(false);
  const [triggering, setTriggering] = useState(false);
  
  // Selected Log for detail modal
  const [selectedLog, setSelectedLog] = useState<JobAutomationLog | null>(null);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatusPoll, 5000); // Poll status every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeSubTab === 'history') {
      fetchLogs();
    }
  }, [activeSubTab, page]);

  useEffect(() => {
    if (activeSubTab === 'console' && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [latestLog?.logs, activeSubTab]);

  const fetchStatus = async () => {
    try {
      const data = await jobAutomationApi.getAutomationStatus();
      setIsRunning(data.isRunning);
      setConfig(data.config);
      setLatestLog(data.latestLog);
    } catch (err) {
      console.error('Failed to load status:', err);
      toast.error('Failed to fetch system status.');
    }
  };

  const fetchStatusPoll = async () => {
    try {
      const data = await jobAutomationApi.getAutomationStatus();
      setIsRunning(data.isRunning);
      setLatestLog(data.latestLog);
    } catch (err) {
      // Quiet fail on polling to prevent noisy toasts
    }
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const data = await jobAutomationApi.getAutomationLogs({ page, limit: 10 });
      setLogsList(data.logs);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      toast.error('Failed to fetch historical logs.');
    } finally {
      setLoadingLogs(false);
    }
  };

  const triggerRun = async () => {
    if (isRunning) return;
    setTriggering(true);
    try {
      const res = await jobAutomationApi.triggerAutomation();
      toast.success(res.message || 'Scraper run triggered!');
      setIsRunning(true);
      setActiveSubTab('console');
      fetchStatus();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to trigger run.');
    } finally {
      setTriggering(false);
    }
  };

  const saveConfig = async (updatedConfig: Partial<JobAutomationConfig>) => {
    if (!config) return;
    setSavingConfig(true);
    try {
      const data = await jobAutomationApi.updateAutomationConfig(updatedConfig);
      setConfig(data);
      toast.success('Configuration updated!');
    } catch (err) {
      toast.error('Failed to update configuration.');
    } finally {
      setSavingConfig(false);
    }
  };

  // Add RSS Feed Link
  const handleAddRss = () => {
    if (!newRss.trim() || !config) return;
    if (!newRss.startsWith('http')) {
      toast.error('Please enter a valid URL.');
      return;
    }
    if (config.rssFeeds.includes(newRss.trim())) {
      toast.error('Feed URL already exists.');
      return;
    }
    const updatedFeeds = [...config.rssFeeds, newRss.trim()];
    saveConfig({ rssFeeds: updatedFeeds });
    setNewRss('');
  };

  // Delete RSS Feed Link
  const handleDeleteRss = (index: number) => {
    if (!config) return;
    const updatedFeeds = config.rssFeeds.filter((_, i) => i !== index);
    saveConfig({ rssFeeds: updatedFeeds });
  };

  // Add Search Query
  const handleAddQuery = () => {
    if (!newQuery.trim() || !config) return;
    if (config.searchQueries.includes(newQuery.trim())) {
      toast.error('Query already exists.');
      return;
    }
    const updatedQueries = [...config.searchQueries, newQuery.trim()];
    saveConfig({ searchQueries: updatedQueries });
    setNewQuery('');
  };

  // Delete Search Query
  const handleDeleteQuery = (index: number) => {
    if (!config) return;
    const updatedQueries = config.searchQueries.filter((_, i) => i !== index);
    saveConfig({ searchQueries: updatedQueries });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20">
            <Loader2 className="animate-spin" size={12} /> Running
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
            <CheckCircle size={12} /> Success
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20">
            <XCircle size={12} /> Failed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-emerald-400 animate-pulse" size={24} />
            Job Automation Engine
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Automated system to search, AI-parse, notify, and clean up job opportunities daily.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassButton
            onClick={fetchStatus}
            className="flex items-center gap-2 text-zinc-300 hover:text-white"
          >
            <RefreshCw size={16} />
            Refresh Status
          </GlassButton>

          <GlassButton
            onClick={triggerRun}
            disabled={isRunning || triggering}
            className={`flex items-center gap-2 font-bold ${
              isRunning 
                ? 'border-amber-500/20 text-amber-400 cursor-not-allowed bg-amber-400/5' 
                : 'border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 bg-emerald-500/5'
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Executing...
              </>
            ) : (
              <>
                <Play size={16} />
                Trigger Scraper Now
              </>
            )}
          </GlassButton>
        </div>
      </div>

      {/* Stats and Current State Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center gap-4">
          <div className="bg-emerald-400/10 p-3 rounded-lg border border-emerald-400/20 text-emerald-400">
            <Activity size={24} />
          </div>
          <div>
            <div className="text-zinc-400 text-xs font-medium">Status</div>
            <div className="text-white font-bold text-lg mt-0.5">
              {isRunning ? 'Scraping & Parsing' : 'Idle'}
            </div>
            <div className="text-zinc-500 text-xs mt-0.5">
              {isRunning ? 'System active' : 'Waiting for cron'}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="bg-blue-400/10 p-3 rounded-lg border border-blue-400/20 text-blue-400">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="text-zinc-400 text-xs font-medium">Last Run - Added</div>
            <div className="text-white font-bold text-lg mt-0.5">
              {latestLog ? `${latestLog.jobsAddedCount} Jobs` : '--'}
            </div>
            <div className="text-zinc-500 text-xs mt-0.5">
              {latestLog ? `Scraped: ${latestLog.jobsFoundCount}` : '--'}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="bg-purple-400/10 p-3 rounded-lg border border-purple-400/20 text-purple-400">
            <Bell size={24} />
          </div>
          <div>
            <div className="text-zinc-400 text-xs font-medium">Notifications Sent</div>
            <div className="text-white font-bold text-lg mt-0.5">
              {latestLog ? `${latestLog.notificationsSentCount} Alerts` : '--'}
            </div>
            <div className="text-zinc-500 text-xs mt-0.5">
              {latestLog ? 'Matched by preferences' : '--'}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-red-400">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-zinc-400 text-xs font-medium">Expired Jobs Cleared</div>
            <div className="text-white font-bold text-lg mt-0.5">
              {latestLog ? `${latestLog.jobsExpiredClosedCount} Closed` : '--'}
            </div>
            <div className="text-zinc-500 text-xs mt-0.5">
              {latestLog ? 'Status set to closed' : '--'}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tabs selectors */}
      <div className="flex border-b border-zinc-800 gap-6">
        <button
          onClick={() => setActiveSubTab('console')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeSubTab === 'console' ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <TerminalIcon size={16} /> Console Terminal
          </span>
          {activeSubTab === 'console' && (
            <motion.div layoutId="subTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeSubTab === 'history' ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Clock size={16} /> Run History Logs
          </span>
          {activeSubTab === 'history' && (
            <motion.div layoutId="subTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('config')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeSubTab === 'config' ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="flex items-center gap-2">
            <Settings size={16} /> Scraper Config
          </span>
          {activeSubTab === 'config' && (
            <motion.div layoutId="subTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* Console Terminal */}
          {activeSubTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
                <span>SYSTEM STDOUT / SCRAPER TERMINAL LOGS</span>
                <span>Active Run: {latestLog?.startTime ? new Date(latestLog.startTime).toLocaleString() : '--'}</span>
              </div>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-4 font-mono text-xs text-emerald-400/90 h-[450px] overflow-y-auto space-y-2 scrollbar-thin shadow-inner">
                {latestLog && latestLog.logs && latestLog.logs.length > 0 ? (
                  latestLog.logs.map((log: JobAutomationLogEntry, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 hover:bg-zinc-900/30 py-0.5 rounded transition-colors px-1">
                      <span className="text-zinc-600 select-none">
                        [{new Date(log.timestamp).toLocaleTimeString()}]
                      </span>
                      <span className="flex-1 whitespace-pre-wrap">{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-600 text-center py-20 font-sans italic">
                    No run logs found in terminal. Click "Trigger Scraper Now" to run.
                  </div>
                )}
                <div ref={consoleEndRef} />
              </div>
            </motion.div>
          )}

          {/* Run History Logs */}
          {activeSubTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {loadingLogs ? (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-500 gap-3">
                  <Loader2 className="animate-spin text-emerald-400" size={32} />
                  <span>Fetching history...</span>
                </div>
              ) : logsList.length === 0 ? (
                <div className="bg-zinc-900/30 border border-zinc-850 p-12 text-center text-zinc-500 rounded-xl">
                  No automation run history found.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-zinc-850 text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                            <th className="px-6 py-4">Start Time</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Found / Added</th>
                            <th className="px-6 py-4 text-center">Alerts</th>
                            <th className="px-6 py-4 text-center">Expired Closed</th>
                            <th className="px-6 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                          {logsList.map((log: JobAutomationLog) => {
                            const durationMs = log.endTime 
                              ? new Date(log.endTime).getTime() - new Date(log.startTime).getTime() 
                              : 0;
                            const durationSec = durationMs > 0 ? (durationMs / 1000).toFixed(1) + 's' : '--';
                            
                            return (
                              <tr key={log._id} className="hover:bg-zinc-800/10 text-sm text-zinc-300">
                                <td className="px-6 py-4 font-medium text-white">
                                  {new Date(log.startTime).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-zinc-500">{durationSec}</td>
                                <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                                <td className="px-6 py-4 text-center font-semibold text-zinc-100">
                                  {log.jobsFoundCount} / {log.jobsAddedCount}
                                </td>
                                <td className="px-6 py-4 text-center text-emerald-400/90 font-semibold">
                                  {log.notificationsSentCount}
                                </td>
                                <td className="px-6 py-4 text-center text-red-400/90">
                                  {log.jobsExpiredClosedCount}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button
                                    onClick={() => setSelectedLog(log)}
                                    className="text-emerald-400 hover:text-emerald-300 bg-emerald-400/5 border border-emerald-400/20 hover:bg-emerald-400/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto transition-all text-xs"
                                  >
                                    <Eye size={12} /> View Full Logs
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-1">
                      <div className="text-zinc-500 text-xs">
                        Page {page} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <GlassButton
                          disabled={page === 1}
                          onClick={() => setPage(p => p - 1)}
                          className="px-3 py-1.5"
                        >
                          Prev
                        </GlassButton>
                        <GlassButton
                          disabled={page === totalPages}
                          onClick={() => setPage(p => p + 1)}
                          className="px-3 py-1.5"
                        >
                          Next
                        </GlassButton>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Config Settings */}
          {activeSubTab === 'config' && config && (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Left Column: Toggles */}
              <div className="space-y-6">
                <GlassCard className="p-6 space-y-6">
                  <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Settings size={18} className="text-emerald-400" />
                    General Settings
                  </h3>
                  
                  {/* Automated Job Run Switch */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm">Automated Scraper Job</div>
                      <div className="text-zinc-500 text-xs mt-0.5">Scrapes and indexes new jobs automatically every 24 hours.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.isEnabled}
                        onChange={(e) => saveConfig({ isEnabled: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-white border border-zinc-700"></div>
                    </label>
                  </div>

                  {/* Auto Approve Switch */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm">Auto-Publish Scraped Jobs</div>
                      <div className="text-zinc-500 text-xs mt-0.5">Publish jobs immediately (Status: Active). Disabled means saving as Drafts.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={config.autoApproveJobs}
                        onChange={(e) => saveConfig({ autoApproveJobs: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-white border border-zinc-700"></div>
                    </label>
                  </div>

                  {/* Max Jobs Limit */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-white font-semibold text-sm">Max Jobs per Scrape Run</label>
                      <span className="text-emerald-400 font-bold text-sm">{config.maxJobsPerRun}</span>
                    </div>
                    <p className="text-zinc-500 text-xs">Caps the maximum number of new job postings parsed per run to conserve API key limits.</p>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={config.maxJobsPerRun}
                      onChange={(e) => setConfig({ ...config, maxJobsPerRun: parseInt(e.target.value) })}
                      onMouseUp={() => saveConfig({ maxJobsPerRun: config.maxJobsPerRun })}
                      onTouchEnd={() => saveConfig({ maxJobsPerRun: config.maxJobsPerRun })}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                </GlassCard>

                {/* Search Queries List */}
                <GlassCard className="p-6 space-y-4">
                  <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Search size={18} className="text-emerald-400" />
                    Web Search Queries
                  </h3>
                  <p className="text-zinc-500 text-xs">Dynamic search queries entered daily into search engines (e.g., DuckDuckGo) to discover job details.</p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add search query (e.g. Node intern startup)..."
                      className="bg-zinc-950 border border-zinc-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500/50 flex-1 w-full"
                      value={newQuery}
                      onChange={(e) => setNewQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddQuery()}
                    />
                    <GlassButton
                      onClick={handleAddQuery}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg"
                    >
                      <Plus size={16} />
                    </GlassButton>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1">
                    {config.searchQueries.map((query, index) => (
                      <div key={index} className="flex items-center justify-between bg-zinc-950/60 border border-zinc-850 p-2.5 rounded-lg text-xs text-zinc-300">
                        <span className="font-mono">{query}</span>
                        <button
                          onClick={() => handleDeleteQuery(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded transition-all"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Right Column: RSS Feeds */}
              <GlassCard className="p-6 space-y-4 h-fit">
                <h3 className="text-md font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Rss size={18} className="text-emerald-400" />
                  RSS Feed URL Sources
                </h3>
                <p className="text-zinc-500 text-xs">Structured job board feeds queried daily. These are extremely reliable sources of small and big jobs.</p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add XML/RSS Feed URL link..."
                    className="bg-zinc-950 border border-zinc-800 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500/50 flex-1 w-full"
                    value={newRss}
                    onChange={(e) => setNewRss(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddRss()}
                  />
                  <GlassButton
                    onClick={handleAddRss}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg"
                  >
                    <Plus size={16} />
                  </GlassButton>
                </div>

                <div className="max-h-[350px] overflow-y-auto space-y-2 pr-1">
                  {config.rssFeeds.map((feed, index) => (
                    <div key={index} className="flex items-center justify-between bg-zinc-950/60 border border-zinc-850 p-2.5 rounded-lg text-xs text-zinc-300">
                      <span className="font-mono truncate mr-4 flex-1">{feed}</span>
                      <button
                        onClick={() => handleDeleteRss(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded transition-all shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
          >
            {/* Modal Header */}
            <div className="bg-zinc-850 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h3 className="text-white font-bold text-md">Execution Run Details</h3>
                <p className="text-zinc-400 text-xs mt-0.5">ID: {selectedLog._id}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-1.5 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-950/45 p-4 rounded-xl border border-zinc-800/40">
                <div className="text-center border-r border-zinc-850/50">
                  <div className="text-zinc-500 text-xs uppercase">Found</div>
                  <div className="text-white text-md font-bold mt-0.5">{selectedLog.jobsFoundCount}</div>
                </div>
                <div className="text-center border-r border-zinc-850/50">
                  <div className="text-zinc-500 text-xs uppercase">Added</div>
                  <div className="text-emerald-400 text-md font-bold mt-0.5">{selectedLog.jobsAddedCount}</div>
                </div>
                <div className="text-center border-r border-zinc-850/50">
                  <div className="text-zinc-500 text-xs uppercase">Companies</div>
                  <div className="text-blue-400 text-md font-bold mt-0.5">{selectedLog.companiesCreatedCount}</div>
                </div>
                <div className="text-center">
                  <div className="text-zinc-500 text-xs uppercase">Closed</div>
                  <div className="text-red-400 text-md font-bold mt-0.5">{selectedLog.jobsExpiredClosedCount}</div>
                </div>
              </div>

              {/* Status & Timing Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-300">
                <div>
                  <span className="text-zinc-500 text-xs block">Start Time</span>
                  {new Date(selectedLog.startTime).toLocaleString()}
                </div>
                <div>
                  <span className="text-zinc-500 text-xs block">End Time</span>
                  {selectedLog.endTime ? new Date(selectedLog.endTime).toLocaleString() : 'In Progress'}
                </div>
                {selectedLog.error && (
                  <div className="col-span-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg flex gap-2 items-start">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-0.5">Execution Failure Details:</span>
                      {selectedLog.error}
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable logs list */}
              <div className="space-y-1">
                <div className="text-zinc-500 text-xs">CHRONOLOGICAL STEP LOGS</div>
                <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 font-mono text-xs text-zinc-300 h-64 overflow-y-auto space-y-1.5 scrollbar-thin">
                  {selectedLog.logs && selectedLog.logs.length > 0 ? (
                    selectedLog.logs.map((log: JobAutomationLogEntry, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-zinc-600 select-none">
                          [{new Date(log.timestamp).toLocaleTimeString()}]
                        </span>
                        <span>{log.message}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-600 text-center py-20 italic">No log entries.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-zinc-850/50 px-6 py-4 flex justify-end gap-2 border-t border-zinc-800">
              <GlassButton
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 font-semibold text-white bg-zinc-800 hover:bg-zinc-750"
              >
                Close Details
              </GlassButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default JobAutomationPanel;
