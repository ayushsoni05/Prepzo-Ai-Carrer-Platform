import { motion } from 'framer-motion';
import React from 'react';

interface NavItemProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
  showLabel?: boolean;
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = (props) => {
  const { icon: Icon, label, active, onClick, badge, showLabel = false, className = '' } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`relative flex flex-col items-center gap-1 cursor-pointer group select-none ${active ? 'text-white' : 'text-white/40'} ${className}`}
      onClick={onClick}
    >
      <div className={`relative p-2.5 rounded-[18px] transition-all duration-300 ${active ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>
        <Icon size={20} />
        {active && (
          <motion.div 
            layoutId="nav-glow"
            className="absolute inset-0 rounded-[18px] bg-white/5 blur-md z-[-1]"
          />
        )}
        {typeof badge !== 'undefined' && (
          <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#0a0c10]">
            {String(badge)}
          </span>
        )}
      </div>
      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all duration-200">
          {label}
        </span>
      )}
    </motion.div>
  );
};
