import React from 'react';
import { NavItem } from './NavItem';
import { Home, FileText, Brain, Briefcase, Settings, Lock, Terminal } from 'lucide-react';

interface MobileNavProps {
  active: string;
  onNavigate: (id: string) => void;
  badgeMap?: Record<string, string | number>;
  lockedItems?: string[];
}

const navItems = [
  { label: 'Home', icon: Home, id: 'home' },
  { label: 'Resume', icon: FileText, id: 'resume' },
  { label: 'Assessment', icon: Brain, id: 'assessment' },
  { label: 'Jobs', icon: Briefcase, id: 'jobs' },
  { label: 'Coding Lab', icon: Terminal, id: 'coding-lab' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ active, onNavigate, badgeMap, lockedItems = [] }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] flex md:hidden justify-around items-center p-3 rounded-[32px] backdrop-blur-2xl bg-[#0a0c10]/70 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-50 animate-in fade-in slide-in-from-bottom-8 duration-700 ring-1 ring-white/5">
    {navItems.map((item) => {
      const isLocked = lockedItems.includes(item.id);
      return (
        <NavItem
          key={item.id}
          icon={isLocked ? Lock : item.icon}
          label={item.label}
          active={active === item.id}
          onClick={() => !isLocked && onNavigate(item.id)}
          badge={!isLocked ? badgeMap?.[item.id] as string | number : undefined}
          showLabel={false}
          className={isLocked ? 'opacity-30 grayscale' : ''}
        />
      );
    })}
  </div>
);
