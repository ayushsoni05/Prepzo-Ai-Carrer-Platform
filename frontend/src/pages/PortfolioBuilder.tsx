import React, { useState } from 'react';
import { ArrowLeft, Rocket, Terminal, Layers, Laptop, Download, CheckCircle } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export default function PortfolioBuilder() {
  const [theme, setTheme] = useState<'cyberpunk' | 'minimal' | 'terminal'>('cyberpunk');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const portfolioHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Developer Portfolio</title>
  <style>
    body { background: #0a0c10; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    h1 { color: #00ff9d; font-size: 3rem; text-transform: uppercase; }
  </style>
</head>
<body>
  <div>
    <h1>My Prepzo Developer Profile</h1>
    <p>Theme: ${theme.toUpperCase()}</p>
    <p>Built with automatically aligned career nodes.</p>
  </div>
</body>
</html>`;
    const blob = new Blob([portfolioHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prepzo-portfolio-${theme}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-[#00ff9d]/10 rounded-2xl border border-[#00ff9d]/20 text-[#00ff9d]">
            <Laptop size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Cyberpunk Portfolio Generator</h1>
            <p className="text-white/40 text-sm">Generate and export an interactive portfolio website populated with your Prepzo statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Theme Selection</h2>
            <div className="space-y-4">
              <div 
                onClick={() => setTheme('cyberpunk')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${theme === 'cyberpunk' ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-white' : 'bg-black/20 border-white/5 text-white/40 hover:text-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wide">Cyberpunk Neon</span>
                  <Rocket size={18} />
                </div>
                <p className="text-xs text-white/40 mt-1">High energy layout with neon borders and grid lines</p>
              </div>

              <div 
                onClick={() => setTheme('minimal')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${theme === 'minimal' ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-white' : 'bg-black/20 border-white/5 text-white/40 hover:text-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wide">Minimalist Dark</span>
                  <Layers size={18} />
                </div>
                <p className="text-xs text-white/40 mt-1">Sleek, modern design focused on high contrast typography</p>
              </div>

              <div 
                onClick={() => setTheme('terminal')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${theme === 'terminal' ? 'bg-[#00ff9d]/10 border-[#00ff9d] text-white' : 'bg-black/20 border-white/5 text-white/40 hover:text-white'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wide">Terminal Command Line</span>
                  <Terminal size={18} />
                </div>
                <p className="text-xs text-white/40 mt-1">ASCII-driven tech design for Linux enthusiasts</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full mt-8 py-4 bg-[#00ff9d] text-[#0a0c10] font-black uppercase tracking-widest text-[12px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00ff9d]/10"
            >
              {downloaded ? <CheckCircle size={16} /> : <Download size={16} />}
              {downloaded ? 'Bundle Downloaded' : 'Generate & Download Portfolio'}
            </button>
          </div>

          <div className="bg-black/40 border border-white/5 p-8 rounded-[32px] flex items-center justify-center min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#00ff9d/5_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="z-10 text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00ff9d] bg-[#00ff9d]/10 px-3 py-1 rounded">Live Preview</span>
              <div className="bg-[#0a0c10] border border-white/5 rounded-2xl p-6 w-72 text-left font-sans shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase font-rubik">Ayush Soni</h3>
                <p className="text-xs text-[#00ff9d] font-bold">Full Stack Engineer</p>
                <p className="text-[10px] text-white/50 mt-2">Target Match Index: 92%</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-white/40">React</span>
                  <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-white/40">Node.js</span>
                  <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-white/40">Go</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
