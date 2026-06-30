import React, { useState } from 'react';
import { ArrowLeft, Play, Cpu, Server, Database, Plus, RefreshCw } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

export default function SystemSimulator() {
  const [servers, setServers] = useState(1);
  const [dbInstances, setDbInstances] = useState(1);
  const [load, setLoad] = useState(10); // requests per sec in thousands
  const [running, setRunning] = useState(false);

  const calculatedThroughput = Math.min(servers * 8, load);
  const dbLoad = calculatedThroughput / dbInstances;
  const health = dbLoad > 8 ? 'critical' : dbLoad > 5 ? 'warning' : 'healthy';

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

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00ff9d]/10 rounded-2xl border border-[#00ff9d]/20 text-[#00ff9d]">
              <Cpu size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">System Design Topology Simulator</h1>
              <p className="text-white/40 text-sm">Visualize traffic flows, simulate server nodes, and calculate bottleneck factors</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl min-h-[400px] flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight">Network Topology Canvas</h3>
              <div className="flex items-center justify-around py-10 bg-black/40 border border-white/5 rounded-2xl relative min-h-[200px]">
                {/* Traffic Generator */}
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <RefreshCw className={running ? "animate-spin w-6 h-6" : "w-6 h-6"} />
                  </div>
                  <span className="block text-[10px] font-black uppercase text-white/45 tracking-wider">Clients ({load}k RPS)</span>
                </div>

                <div className="h-0.5 w-16 bg-white/10" />

                {/* Servers */}
                <div className="text-center space-y-2">
                  <div className="flex gap-2 justify-center">
                    {Array.from({ length: Math.min(3, servers) }).map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-emerald-500/10 text-[#00ff9d] border border-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Server className="w-6 h-6" />
                      </div>
                    ))}
                    {servers > 3 && <div className="text-xs self-center font-bold text-white/50">+{servers - 3}</div>}
                  </div>
                  <span className="block text-[10px] font-black uppercase text-white/45 tracking-wider">Servers ({servers} nodes)</span>
                </div>

                <div className="h-0.5 w-16 bg-white/10" />

                {/* Database */}
                <div className="text-center space-y-2">
                  <div className="flex gap-2 justify-center">
                    {Array.from({ length: Math.min(3, dbInstances) }).map((_, i) => (
                      <div key={i} className={`w-12 h-12 border rounded-xl flex items-center justify-center ${health === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-500' : health === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                        <Database className="w-6 h-6" />
                      </div>
                    ))}
                    {dbInstances > 3 && <div className="text-xs self-center font-bold text-white/50">+{dbInstances - 3}</div>}
                  </div>
                  <span className="block text-[10px] font-black uppercase text-white/45 tracking-wider">DB instances</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setRunning(!running)}
              className={`w-full mt-8 py-4 font-black uppercase tracking-widest text-[12px] rounded-2xl transition-all flex items-center justify-center gap-2 ${running ? 'bg-red-500 text-white' : 'bg-[#00ff9d] text-[#0a0c10]'}`}
            >
              <Play className="w-4 h-4" />
              {running ? 'Halt Simulation' : 'Execute Simulation Run'}
            </button>
          </div>

          <div className="bg-white/5 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight">Diagnostics</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Web App Server Count</label>
                <div className="flex items-center justify-between bg-black/40 border border-white/5 p-2 rounded-xl">
                  <button onClick={() => setServers(s => Math.max(1, s - 1))} className="px-3 py-1 font-black bg-white/5 rounded">-</button>
                  <span className="font-bold">{servers}</span>
                  <button onClick={() => setServers(s => s + 1)} className="px-3 py-1 font-black bg-white/5 rounded">+</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Database Cluster Size</label>
                <div className="flex items-center justify-between bg-black/40 border border-white/5 p-2 rounded-xl">
                  <button onClick={() => setDbInstances(s => Math.max(1, s - 1))} className="px-3 py-1 font-black bg-white/5 rounded">-</button>
                  <span className="font-bold">{dbInstances}</span>
                  <button onClick={() => setDbInstances(s => s + 1)} className="px-3 py-1 font-black bg-white/5 rounded">+</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Client Traffic Level</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={load}
                  onChange={(e) => setLoad(Number(e.target.value))}
                  className="w-full accent-[#00ff9d] bg-white/5 h-2 rounded-lg"
                />
                <span className="block text-right text-xs mt-1 font-bold text-white/40">{load}k RPS</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Simulation Status</span>
                <span className={running ? "text-[#00ff9d] font-bold" : "text-white/20"}>{running ? 'RUNNING' : 'IDLE'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Request Processing Rate</span>
                <span className="font-bold">{calculatedThroughput}k RPS</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">DB Server Health Status</span>
                <span className={`font-bold ${health === 'critical' ? 'text-red-500' : health === 'warning' ? 'text-yellow-500' : 'text-[#00ff9d]'}`}>
                  {health.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
