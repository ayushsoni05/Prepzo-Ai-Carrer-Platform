import React from 'react';
import ThinkingLoader from '@/components/ui/loading';
export default function ATSOptimizer() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center">
      <ThinkingLoader loadingText="Deploying ATS Match Optimizer..." />
    </div>
  );
}
