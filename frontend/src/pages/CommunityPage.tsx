import React, { useState } from 'react';
import { NetworkPage } from './NetworkPage';
import { CompaniesPage } from './CompaniesPage';
import { Users, Building2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function CommunityPage() {
  const [activeView, setActiveView] = useState<'network' | 'companies'>('network');

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex flex-col relative overflow-hidden">
      {/* Global Community Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 pt-4 pb-0 md:pl-[100px] flex justify-center md:justify-start px-4">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveView('network')}
            className={`pb-4 flex items-center gap-2 relative transition-colors ${
              activeView === 'network' ? 'text-[#057642]' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Activity size={18} />
            <span className="font-rubik font-bold uppercase tracking-widest text-[12px]">Feed & Network</span>
            {activeView === 'network' && (
              <motion.div
                layoutId="community-nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642]"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveView('companies')}
            className={`pb-4 flex items-center gap-2 relative transition-colors ${
              activeView === 'companies' ? 'text-[#057642]' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Building2 size={18} />
            <span className="font-rubik font-bold uppercase tracking-widest text-[12px]">Companies</span>
            {activeView === 'companies' && (
              <motion.div
                layoutId="community-nav-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057642]"
              />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area - We pad top to account for the sticky nav */}
      <div className="flex-1 pt-16">
        {activeView === 'network' ? <NetworkPage /> : <CompaniesPage />}
      </div>
    </div>
  );
}
