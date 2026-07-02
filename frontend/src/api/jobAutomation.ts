import api from './axios';

export interface JobAutomationLogEntry {
  timestamp: string;
  message: string;
}

export interface JobAutomationLog {
  _id: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'success' | 'failed';
  jobsFoundCount: number;
  jobsAddedCount: number;
  companiesCreatedCount: number;
  jobsExpiredClosedCount: number;
  notificationsSentCount: number;
  logs: JobAutomationLogEntry[];
  error?: string;
  createdAt: string;
}

export interface JobAutomationConfig {
  isEnabled: boolean;
  autoApproveJobs: boolean;
  maxJobsPerRun: number;
  searchQueries: string[];
  rssFeeds: string[];
  lastRunTime?: string;
}

export interface AutomationStatus {
  isRunning: boolean;
  config: JobAutomationConfig;
  latestLog: JobAutomationLog | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const getAutomationStatus = async (): Promise<AutomationStatus> => {
  const response = await api.get('/admin/job-automation/status');
  return response.data.data;
};

export const triggerAutomation = async (): Promise<{ success: boolean; message: string }> => {
  const response = await api.post('/admin/job-automation/trigger');
  return response.data;
};

export const getAutomationLogs = async (params: {
  page: number;
  limit: number;
}): Promise<{ logs: JobAutomationLog[]; pagination: Pagination }> => {
  const response = await api.get('/admin/job-automation/logs', { params });
  return response.data.data;
};

export const getAutomationConfig = async (): Promise<JobAutomationConfig> => {
  const response = await api.get('/admin/job-automation/config');
  return response.data.data;
};

export const updateAutomationConfig = async (
  config: Partial<JobAutomationConfig>
): Promise<JobAutomationConfig> => {
  const response = await api.put('/admin/job-automation/config', config);
  return response.data.data;
};
