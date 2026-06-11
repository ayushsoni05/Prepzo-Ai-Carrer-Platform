import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Brain, Briefcase, Lock, Users } from 'lucide-react';

interface MobileNavProps {
  active: string;
  onNavigate: (id: string) => void;
  badgeMap?: Record<string, string | number>;
  lockedItems?: string[];
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'opportunities', icon: Briefcase, label: 'Jobs' },
  { id: 'assessment', icon: Brain, label: 'Skill' },
  { id: 'community', icon: Users, label: 'Social' },
  { id: 'resume', icon: FileText, label: 'Resume' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ active, onNavigate, badgeMap, lockedItems = [] }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex md:hidden justify-around items-center pt-2 pb-[calc(10px+env(safe-area-inset-bottom,0px))] px-2 backdrop-blur-3xl bg-[#0a0c10]/90 border-t border-white/5 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] z-50 ring-1 ring-white/5">
      {navItems.map((item) => {
        const isActive = active === item.id || (item.id === 'opportunities' && active === 'jobs');
        const isLocked = lockedItems.includes(item.id) || (item.id === 'opportunities' && lockedItems.includes('jobs'));

        return (
          <button
            key={item.id}
            onClick={() => !isLocked && onNavigate(item.id === 'opportunities' ? 'jobs' : item.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1 px-2 relative outline-none transition-all duration-300 ${
              isLocked ? 'opacity-35 cursor-not-allowed grayscale' : 'cursor-pointer'
            }`}
          >
            {/* Nav Icon */}
            <div className={`p-1 relative transition-transform duration-300 ${isActive ? 'scale-110' : 'hover:scale-105'}`}>
              <item.icon
                size={20}
                className={isActive ? 'text-[#00ff9d] drop-shadow-[0_0_8px_rgba(0,255,157,0.4)]' : 'text-white/40'}
              />
              {isLocked && (
                <div className="absolute -top-0.5 -right-0.5 bg-black/80 rounded-full p-0.5 border border-white/10">
                  <Lock size={8} className="text-white/60" />
                </div>
              )}
              {badgeMap?.[item.id] && !isLocked && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00ff9d] text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-lg border border-black">
                  {badgeMap[item.id]}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wide transition-colors duration-300 ${
                isActive ? 'text-[#00ff9d]' : 'text-white/30'
              }`}
            >
              {item.label}
            </span>

            {/* Dot Indicator */}
            {isActive && !isLocked && (
              <motion.div
                layoutId="mobile-nav-dot"
                className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
