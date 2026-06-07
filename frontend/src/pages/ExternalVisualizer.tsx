import React from 'react';
import { navigateTo } from '@/utils/navigation';
import { ChevronLeft, Cpu, Globe } from 'lucide-react';
import { AlgorithmVisualizer } from '../components/visualizer/AlgorithmVisualizer';

export const ExternalVisualizer: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const urlParam = searchParams.get('url');

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0c10] font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      {/* Header */}
      <div className="h-16 shrink-0 border-b border-white/5 bg-black flex items-center px-6 z-20 gap-4">
        <button onClick={() => navigateTo('coding-lab')} className="text-white/40 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <Cpu size={16} className="text-[#5ed29c]" />
          <h1 className="text-sm font-[900] text-white italic tracking-tight">External Problem Visualizer</h1>
        </div>
        <div className="ml-auto text-xs text-white/40 font-mono truncate max-w-sm flex items-center gap-2">
          <Globe size={12} /> {urlParam}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-4">
         <div className="h-full rounded-2xl border border-white/5 overflow-hidden">
            <AlgorithmVisualizer problemText="" url={urlParam || undefined} />
         </div>
      </div>
    </div>
  );
};

export default ExternalVisualizer;
