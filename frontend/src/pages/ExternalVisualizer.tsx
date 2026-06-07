import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { navigateTo } from '@/utils/navigation';
import { ChevronLeft, Cpu, Globe } from 'lucide-react';
import { AlgorithmVisualizer } from '../components/visualizer/AlgorithmVisualizer';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { useAuthStore } from '@/store/authStore';

export const ExternalVisualizer: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const urlParam = searchParams.get('url');

  const [scrapedText, setScrapedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchScrapedText = async () => {
      if (!urlParam) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/ai/visualization/visualize`, {
          url: urlParam
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Wait, our backend endpoint `/api/ai/visualize` actually DOES the visualization generation 
        // IF we pass `url`. We don't just get scraped text back, we get the whole visualization!
        // But the AlgorithmVisualizer component is designed to take `problemText` and call the API itself.
        // Let's adjust AlgorithmVisualizer to optionally take `initialData` or we can just render the visualizer 
        // differently here. Actually, it's easier if we pass `url` to AlgorithmVisualizer directly.
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch visualization');
      } finally {
        setLoading(false);
      }
    };
    // fetchScrapedText();
  }, [urlParam, token]);

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
