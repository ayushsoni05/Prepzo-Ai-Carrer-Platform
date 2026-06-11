import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, ArrowLeft } from 'lucide-react';

interface MobileHeaderProps {
  onLogout: () => void;
  user?: { fullName: string };
  currentPage: string;
  onNavigate: (page: string) => void;
}

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Home Node',
  jobs: 'Prepzo Jobs',
  companies: 'Companies',
  applications: 'Applications',
  network: 'Neural Network',
  community: 'Lounge',
  'placement-accelerator': 'Accelerator',
  'ai-interview': 'AI Interview',
  notes: 'Prep Notes',
  'note-detail': 'Reading Note',
  'question-bank': 'Prep Bank',
  'offer-analyzer': 'Analyzer',
  resume: 'Resume Builder',
  settings: 'Settings',
  'admin-applications': 'Admin Portal',
};

const BACK_NAV_MAPPING: Record<string, string> = {
  'note-detail': 'notes',
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onLogout, user, currentPage, onNavigate }) => {
  const backTarget = BACK_NAV_MAPPING[currentPage];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-[45] md:hidden">
      <div className="flex items-center gap-3">
        {backTarget ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate(backTarget)}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white"
          >
            <ArrowLeft size={16} />
          </motion.button>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
            <div className="w-4 h-4 bg-[#0a0c10] rotate-45" />
          </div>
        )}
        <span className="text-white font-black text-[13px] tracking-tight uppercase">
          {PAGE_TITLES[currentPage] || 'Prepzo'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white font-black uppercase tracking-widest">
            {user?.fullName ? user.fullName.split(' ')[0] : 'Node'}
          </span>
          <span className="text-[8px] text-[#00ff9d] font-bold uppercase tracking-widest">
            Active Node
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onLogout}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white"
        >
          <LogOut size={16} />
        </motion.button>
      </div>
    </div>
  );
};
