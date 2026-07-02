import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Check, Sparkles, Flame, Target, Brain, ExternalLink } from 'lucide-react';
import api from '../../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications', {
        params: { category: activeCategory !== 'all' ? activeCategory : undefined }
      });
      if (response.data?.success) {
        setNotifications(response.data.data.notifications || []);
        setUnreadCount(response.data.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to load notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll unread count every 30 seconds for real-time signaling
    const interval = setInterval(async () => {
      try {
        const countRes = await api.get('/notifications/unread-count');
        if (countRes.data?.success) {
          setUnreadCount(countRes.data.data.count);
        }
      } catch (e) {}
    }, 30000);
    return () => clearInterval(interval);
  }, [activeCategory]);

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.put(`/notifications/${id}/read`);
      if (res.data?.success) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      showError('Failed to mark notification as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await api.put('/notifications/read-all');
      if (res.data?.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
        showSuccess('All notifications marked as read');
      }
    } catch (err) {
      showError('Failed to update notifications');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.delete(`/notifications/${id}`);
      if (res.data?.success) {
        setNotifications(prev => prev.filter(n => n._id !== id));
        fetchNotifications();
      }
    } catch (err) {
      showError('Failed to delete notification');
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await api.delete('/notifications/clear-all');
      if (res.data?.success) {
        setNotifications([]);
        setUnreadCount(0);
        showSuccess('Notification tray cleared');
      }
    } catch (err) {
      showError('Failed to clear notifications');
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'assessment_reminder':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'new_job_match':
        return <Target className="w-4 h-4 text-[#5ed29c]" />;
      case 'ai_recommendation':
        return <Brain className="w-4 h-4 text-purple-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          fetchNotifications();
        }}
        className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center relative hover:border-white/30 transition-all cursor-pointer shadow-lg shadow-black/50"
      >
        <Bell className="w-4 h-4 text-white/75 hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border border-[#0a0c10] flex items-center justify-center text-[8px] font-black text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Tray */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-80 sm:w-[400px] bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 font-rubik"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Diagnostics Tray</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">Real-time career signals</p>
                </div>
                <div className="flex gap-2">
                  {notifications.length > 0 && (
                    <>
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[9px] font-black uppercase tracking-wider text-[#5ed29c] hover:opacity-80 transition-opacity cursor-pointer bg-white/5 px-2 py-1 rounded"
                      >
                        Read All
                      </button>
                      <button
                        onClick={handleClearAll}
                        className="text-[9px] font-black uppercase tracking-wider text-red-400 hover:opacity-80 transition-opacity cursor-pointer bg-white/5 px-2 py-1 rounded"
                      >
                        Clear
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-1 p-2 bg-white/5 border-b border-white/5 overflow-x-auto">
                {['all', 'ai', 'jobs', 'system'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shrink-0 transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="max-h-[350px] overflow-y-auto divide-y divide-white/5">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-white/30 flex flex-col items-center gap-2">
                    <Sparkles className="w-5 h-5 opacity-40 animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest">No Signals Active</span>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif._id}
                      onClick={() => {
                        if (notif.actionUrl) {
                          setIsOpen(false);
                          navigateTo(notif.actionUrl);
                        }
                      }}
                      className={`p-4 flex gap-3 transition-colors cursor-pointer relative group ${
                        notif.isRead ? 'hover:bg-white/5 opacity-60' : 'bg-white/[0.02] hover:bg-white/5'
                      }`}
                    >
                      {/* Unread side tag */}
                      {!notif.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-500" />
                      )}

                      {/* Icon */}
                      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getNotifIcon(notif.type)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-[11px] font-bold text-white block ${notif.isRead ? 'font-medium' : 'font-extrabold'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[8px] text-white/20 shrink-0 font-medium">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/60 mt-1 leading-normal">
                          {notif.message}
                        </p>
                        {notif.actionUrl && (
                          <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-[#5ed29c] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Execute Node <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-center shrink-0">
                        {!notif.isRead && (
                          <button
                            onClick={(e) => handleMarkAsRead(notif._id, e)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(notif._id, e)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
