import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Settings, Shield, Mail, Smartphone, Eye, Calendar, Sparkles, 
  Trash2, CheckCircle2, ChevronRight, X, Clock, Flame, Award, Briefcase, Zap, Info
} from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

interface NotificationType {
  _id: string;
  title: string;
  message: string;
  category: 'jobs' | 'connections' | 'engagement' | 'system' | 'ai';
  type: string;
  isRead: boolean;
  groupedCount?: number;
  createdAt: string;
  relatedEntities?: {
    job?: string;
    post?: string;
  };
}

interface NotificationPreference {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

interface UserPreferences {
  streakReminders: NotificationPreference;
  jobMatches: NotificationPreference;
  leaderboardAlerts: NotificationPreference;
  aiInsights: NotificationPreference;
}

export const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Detailed notification settings
  const [preferences, setPreferences] = useState<UserPreferences>({
    streakReminders: { email: true, push: true, inApp: true },
    jobMatches: { email: true, push: true, inApp: true },
    leaderboardAlerts: { email: false, push: false, inApp: true },
    aiInsights: { email: true, push: true, inApp: true }
  });

  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscribed, setPushSubscribed] = useState(false);

  // Fetch notifications list
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      if (res.data?.success) {
        setNotifications(res.data.data.docs || res.data.data);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
      toast.error('Could not fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  // Fetch count & user preference details
  const fetchMetadata = async () => {
    try {
      const [countRes, userRes] = await Promise.all([
        api.get('/notifications/unread-count'),
        api.get('/api/users/profile') // or get user details including settings
      ]);

      if (countRes.data?.success) {
        setUnreadCount(countRes.data.data);
      }

      if (userRes.data?.data?.settings?.notificationPreferences) {
        setPreferences(userRes.data.data.settings.notificationPreferences);
      }
    } catch (err) {
      console.error('Failed to load notification meta details:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchMetadata();
    
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setPushSupported(true);
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          setPushSubscribed(!!sub);
        });
      });
    }

    // Connect Server-Sent Events (SSE) for real-time alerts
    const sseUrl = `${api.defaults.baseURL || ''}/notifications/stream`;
    const eventSource = new EventSource(sseUrl, { withCredentials: true });

    eventSource.onmessage = (event) => {
      try {
        const newNotif = JSON.parse(event.data);
        setNotifications((prev) => [newNotif, ...prev]);
        setUnreadCount((c) => c + 1);
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-slate-900 border border-purple-500/30 shadow-lg rounded-2xl pointer-events-auto flex p-4 ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Bell className="h-10 w-10 text-purple-400 bg-purple-500/10 p-2 rounded-xl" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-white">{newNotif.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{newNotif.message}</p>
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="bg-transparent rounded-md inline-flex text-slate-500 hover:text-white focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ));
      } catch (err) {
        console.error('Error parsing SSE event data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('SSE connection encountered an issue, retrying...', err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await api.put(`/notifications/${id}/read`);
      if (res.data?.success) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((c) => Math.max(0, c - 1));
        toast.success('Marked as read');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to mark read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const res = await api.put('/notifications/read-all');
      if (res.data?.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success('All marked as read');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await api.delete(`/notifications/${id}`);
      if (res.data?.success) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
        fetchMetadata();
        toast.success('Notification deleted');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await api.delete('/notifications/clear-all');
      if (res.data?.success) {
        setNotifications([]);
        setUnreadCount(0);
        toast.success('Cleared all notifications');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePreference = async (
    category: keyof UserPreferences,
    channel: keyof NotificationPreference
  ) => {
    const updatedPrefs = { ...preferences };
    updatedPrefs[category][channel] = !updatedPrefs[category][channel];
    setPreferences(updatedPrefs);

    try {
      await api.put('/notifications/preferences', { preferences: updatedPrefs });
      toast.success('Notification channels updated');
    } catch (err) {
      console.error('Failed to save preference settings:', err);
      toast.error('Settings save failed');
    }
  };

  // Register push notifications
  const handleTogglePushSubscription = async () => {
    if (!pushSupported) return;

    try {
      if (pushSubscribed) {
        // Unsubscribe
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          await sub.unsubscribe();
          await api.post('/notifications/push-unsubscribe', { endpoint: sub.endpoint });
          setPushSubscribed(false);
          toast.success('Browser notifications disabled');
        }
      } else {
        // Subscribe
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          toast.error('Permission not granted for notifications');
          return;
        }

        const reg = await navigator.serviceWorker.ready;
        // Simplified fallback configuration for demonstration
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BEl62iC79X77us62iC79X77us_dummyKey_replace_in_prod'
        });

        await api.post('/notifications/push-subscribe', { subscription: sub });
        setPushSubscribed(true);
        toast.success('Subscribed to push notifications!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update browser push settings');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'jobs':
        return <Briefcase className="h-5 w-5 text-emerald-400" />;
      case 'connections':
        return <Award className="h-5 w-5 text-sky-400" />;
      case 'engagement':
        return <Flame className="h-5 w-5 text-orange-400" />;
      case 'ai':
        return <Sparkles className="h-5 w-5 text-indigo-400" />;
      default:
        return <Bell className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-white pt-24 px-4 sm:px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl shadow-inner">
                <Bell className="h-7 w-7 text-purple-400" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Notification Center
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Stay in the loop with real-time career updates, leaderboard metrics, and personalized AI notifications.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md p-1 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'notifications'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Alerts
              {unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Settings className="h-3.5 w-3.5 inline mr-1.5" />
              Settings
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'notifications' ? (
            <motion.div
              key="notifications-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Controls bar */}
              {notifications.length > 0 && (
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 font-medium">
                    Showing {notifications.length} recent updates
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition"
                    >
                      Mark all as read
                    </button>
                    <span className="text-slate-600">|</span>
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-slate-400 hover:text-red-400 font-semibold transition"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}

              {/* List */}
              {loading ? (
                <div className="text-center py-20">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-purple-500 border-purple-500/20 mx-auto" />
                  <p className="text-slate-400 mt-4 text-sm">Aggregating alerts...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-24 bg-white/[0.02] border border-dashed border-white/[0.05] rounded-3xl">
                  <CheckCircle2 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-300">You're all caught up!</h3>
                  <p className="text-slate-500 text-sm mt-1">No new alerts or suggestions found.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif._id}
                      layout
                      className={`relative overflow-hidden group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                        notif.isRead
                          ? 'bg-slate-950/20 border-slate-900 text-slate-300'
                          : 'bg-gradient-to-r from-purple-950/10 to-slate-950/40 border-purple-900/30 text-white hover:border-purple-500/20'
                      }`}
                    >
                      {/* Unread Glow Ribbon */}
                      {!notif.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-pink-500 shadow-md" />
                      )}

                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${notif.isRead ? 'bg-slate-900' : 'bg-purple-950/30 border border-purple-500/10'}`}>
                        {getCategoryIcon(notif.category)}
                      </div>

                      {/* Text details */}
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold truncate">{notif.title}</h4>
                          {notif.groupedCount && notif.groupedCount > 1 && (
                            <span className="px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full font-bold">
                              Bundled ({notif.groupedCount})
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 font-medium ml-auto flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(notif.createdAt).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-center">
                        {!notif.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notif._id)}
                            className="p-2 text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition"
                            title="Mark read"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notif._id)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="settings-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid gap-8"
            >
              {/* Browser Push Registration Card */}
              {pushSupported && (
                <div className="bg-gradient-to-br from-purple-950/20 to-slate-900/40 border border-purple-500/20 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-purple-500/15 rounded-2xl h-fit">
                      <Smartphone className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Browser Push Subscriptions</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-lg">
                        Enable native OS push alerts so you never miss urgent AI insights, challenge releases, or recruiter matching status updates.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleTogglePushSubscription}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition duration-300 whitespace-nowrap ${
                      pushSubscribed
                        ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    }`}
                  >
                    {pushSubscribed ? 'Subscribed' : 'Subscribe to Push'}
                  </button>
                </div>
              )}

              {/* Channel Granular Matrix */}
              <div className="bg-[#0a0c11] border border-white/[0.04] p-6 rounded-3xl shadow-xl space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-200">Alert Category Subscriptions</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Control which channels we use to message you for each major alert category.
                  </p>
                </div>

                <div className="border border-white/[0.05] rounded-2xl overflow-hidden divide-y divide-white/[0.05]">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 bg-white/[0.02] p-4 text-xs font-semibold text-slate-400">
                    <div>Category</div>
                    <div className="text-center">Email</div>
                    <div className="text-center">Browser Push</div>
                    <div className="text-center">In-App Feed</div>
                  </div>

                  {/* Rows */}
                  {(Object.keys(preferences) as Array<keyof UserPreferences>).map((categoryKey) => {
                    const rowNames = {
                      streakReminders: 'Streak & Challenges',
                      jobMatches: 'Job Matches & Placements',
                      leaderboardAlerts: 'Leaderboard & Competition',
                      aiInsights: 'AI Prep Analytics'
                    };

                    const rowInfo = preferences[categoryKey];

                    return (
                      <div key={categoryKey} className="grid grid-cols-4 items-center p-4 text-sm hover:bg-white/[0.01] transition duration-200">
                        <div className="font-semibold text-slate-300 text-xs">
                          {rowNames[categoryKey]}
                        </div>
                        {/* Email toggle */}
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={rowInfo.email}
                            onChange={() => handleTogglePreference(categoryKey, 'email')}
                            className="w-4 h-4 text-purple-600 rounded bg-slate-900 border-slate-800 focus:ring-purple-500"
                          />
                        </div>
                        {/* Push toggle */}
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={rowInfo.push}
                            onChange={() => handleTogglePreference(categoryKey, 'push')}
                            className="w-4 h-4 text-purple-600 rounded bg-slate-900 border-slate-800 focus:ring-purple-500"
                          />
                        </div>
                        {/* InApp toggle */}
                        <div className="flex justify-center">
                          <input
                            type="checkbox"
                            checked={rowInfo.inApp}
                            onChange={() => handleTogglePreference(categoryKey, 'inApp')}
                            className="w-4 h-4 text-purple-600 rounded bg-slate-900 border-slate-800 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationCenter;
