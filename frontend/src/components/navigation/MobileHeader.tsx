import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface MobileHeaderProps {
  onLogout: () => void;
  user?: { fullName: string };
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onLogout, user }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 z-[45] md:hidden">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
          <div className="w-4 h-4 bg-[#0a0c10] rotate-45" />
        </div>
        <span className="text-white font-bold text-sm tracking-tight uppercase">Prepzo</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white font-black uppercase tracking-widest">{user?.fullName.split(' ')[0]}</span>
          <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Active Node</span>
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
