import React, { useState, useEffect } from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { useAuthStore } from '@/store/authStore';
import { Play, Loader2, ArrowLeft, ArrowRight, Activity, Cpu } from 'lucide-react';
import api from '@/api/axios';

interface VisualizerStep {
  stepTitle: string;
  description: string;
  mermaidSyntax: string;
}

interface VisualizerData {
  problemSummary: string;
  optimalAlgorithmName: string;
  timeComplexity: string;
  spaceComplexity: string;
  steps: VisualizerStep[];
}

interface AlgorithmVisualizerProps {
  problemText?: string;
  problemId?: string;
  url?: string;
}

export const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ problemText, problemId, url }) => {
  const [data, setData] = useState<VisualizerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { token } = useAuthStore();

  const generateVisualization = async () => {
    if (!problemText && !url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/ai/visualization/visualize', {
        problemText,
        problemId,
        url
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setData(response.data.data);
        setCurrentStep(0);
      } else {
        setError(response.data.message || 'Failed to generate visualization');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'An error occurred while generating visualization');
    } finally {
      setLoading(false);
    }
  };

  if (!data && !loading && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#0a0c10]">
        <Activity size={48} className="text-[#5ed29c] mb-4 opacity-50" />
        <h3 className="text-xl font-black text-white italic uppercase tracking-widest mb-2">AI Algorithm Visualizer</h3>
        <p className="text-white/40 text-sm mb-6 max-w-sm">Generate a step-by-step visual explanation of the optimal algorithm to solve this problem.</p>
        <button
          onClick={generateVisualization}
          className="px-6 py-3 bg-[#5ed29c]/10 text-[#5ed29c] border border-[#5ed29c]/20 hover:bg-[#5ed29c]/20 hover:scale-105 transition-all font-black text-xs uppercase tracking-widest rounded-xl flex items-center gap-2"
        >
          <Cpu size={16} /> Generate Visualization
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#0a0c10]">
        <Loader2 size={40} className="text-[#5ed29c] animate-spin mb-4" />
        <p className="text-[#5ed29c] font-black text-xs uppercase tracking-widest animate-pulse">AI is analyzing the problem...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#0a0c10]">
        <p className="text-red-500 font-bold text-sm mb-4">{error}</p>
        <button
          onClick={generateVisualization}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  const currentStepData = data.steps[currentStep];

  return (
    <div className="flex flex-col h-full bg-[#0a0c10] text-white">
      {/* Header Info */}
      <div className="p-4 border-b border-white/5 space-y-3 shrink-0">
        <h2 className="text-lg font-black italic uppercase tracking-tight text-[#5ed29c]">{data.optimalAlgorithmName}</h2>
        <p className="text-sm text-white/70 leading-relaxed">{data.problemSummary}</p>
        <div className="flex items-center gap-4 pt-2">
          <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">Time</span>
            <span className="text-xs font-mono font-bold text-blue-300">{data.timeComplexity}</span>
          </div>
          <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-0.5">Space</span>
            <span className="text-xs font-mono font-bold text-purple-300">{data.spaceComplexity}</span>
          </div>
        </div>
      </div>

      {/* Visualizer Area */}
      <div className="flex-1 min-h-0 relative overflow-hidden bg-black/40">
        <div className="absolute inset-0 p-4">
          {currentStepData && currentStepData.mermaidSyntax && (
            <MermaidDiagram chart={currentStepData.mermaidSyntax} />
          )}
        </div>
      </div>

      {/* Step Info & Controls */}
      <div className="p-4 border-t border-white/5 bg-[#13171d] shrink-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
            Step {currentStep + 1} of {data.steps.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentStep(prev => Math.min(data.steps.length - 1, prev + 1))}
              disabled={currentStep === data.steps.length - 1}
              className="p-2 rounded-lg bg-[#5ed29c]/10 text-[#5ed29c] hover:bg-[#5ed29c]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1">{currentStepData?.stepTitle || 'Step Details'}</h4>
          <p className="text-xs text-white/60 leading-relaxed">{currentStepData?.description}</p>
        </div>
      </div>
    </div>
  );
};
