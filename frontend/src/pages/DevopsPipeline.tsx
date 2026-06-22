import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Terminal, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

interface ActionCard {
  id: string;
  label: string;
  expectedStage: 'build' | 'test' | 'scan' | 'deploy';
  sub: string;
}

const ACTION_CARDS: ActionCard[] = [
  { id: 'install', label: 'npm install', expectedStage: 'build', sub: 'Install node dependencies' },
  { id: 'build', label: 'npm run build', expectedStage: 'build', sub: 'Compile Vite frontend assets' },
  { id: 'docker', label: 'docker build', expectedStage: 'build', sub: 'Bundle app in container' },
  { id: 'test', label: 'npm run test:unit', expectedStage: 'test', sub: 'Run unit test suite validations' },
  { id: 'scan', label: 'run-snyk-scan', expectedStage: 'scan', sub: 'Audit codebase for dependencies CVEs' },
  { id: 'vercel', label: 'deploy-to-vercel', expectedStage: 'deploy', sub: 'Deploy assets to Vercel hosting' },
  { id: 'ecs', label: 'push-to-ecs', expectedStage: 'deploy', sub: 'Push container to AWS ECS clusters' }
];

export const DevopsPipeline = () => {
  const [pipeline, setPipeline] = useState<{
    build: string[];
    test: string[];
    scan: string[];
    deploy: string[];
  }>({
    build: [],
    test: [],
    scan: [],
    deploy: []
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [pipelinePassed, setPipelinePassed] = useState<boolean | null>(null);
  
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  const applyTemplate = (type: 'vercel' | 'docker') => {
    if (type === 'vercel') {
      setPipeline({
        build: ['install', 'build'],
        test: ['test'],
        scan: ['scan'],
        deploy: ['vercel']
      });
    } else {
      setPipeline({
        build: ['install', 'docker'],
        test: ['test'],
        scan: ['scan'],
        deploy: ['ecs']
      });
    }
    setLogs(['[SYS] Applied pipeline template. Click "Run Pipeline" to execute build logs.']);
    setPipelinePassed(null);
  };

  const handleAssignAction = (cardId: string, stage: 'build' | 'test' | 'scan' | 'deploy') => {
    setPipeline(prev => {
      // Remove from any other stage first to avoid duplicates
      const cleanBuild = prev.build.filter(id => id !== cardId);
      const cleanTest = prev.test.filter(id => id !== cardId);
      const cleanScan = prev.scan.filter(id => id !== cardId);
      const cleanDeploy = prev.deploy.filter(id => id !== cardId);

      const updated = {
        build: cleanBuild,
        test: cleanTest,
        scan: cleanScan,
        deploy: cleanDeploy
      };

      updated[stage] = [...updated[stage], cardId];
      return updated;
    });
    setPipelinePassed(null);
  };

  const handleClearStage = (stage: 'build' | 'test' | 'scan' | 'deploy') => {
    setPipeline(prev => ({
      ...prev,
      [stage]: []
    }));
    setPipelinePassed(null);
  };

  const executePipeline = async () => {
    setIsRunning(true);
    setLogs(['[CI/CD Engine] Triggering commit pipeline webhook...', '[1/4] INITIALIZING BUILD STAGE...']);
    setPipelinePassed(null);

    const steps = [
      // 1. Build Stage
      () => {
        if (pipeline.build.length === 0) {
          throw new Error('BUILD FAILED: No tasks configured in Build stage.');
        }
        if (!pipeline.build.includes('install')) {
          throw new Error('BUILD FAILED: Cannot build workspace. Dependency tree missing. (sh: vite: command not found).');
        }
        if (pipeline.build.includes('build') && pipeline.build.indexOf('install') > pipeline.build.indexOf('build')) {
          throw new Error('BUILD FAILED: npm run build failed. Required modules in node_modules not yet downloaded.');
        }
        return ['[BUILD] npm install completed in 2.3s.', '[BUILD] Compiled assets successfully in 4.1s. Code size: 230kB.'];
      },
      // 2. Test Stage
      () => {
        if (pipeline.test.length === 0) {
          throw new Error('TEST STAGE FAILED: Pipeline rules require unit test suite validations prior to deployment.');
        }
        if (!pipeline.test.includes('test')) {
          throw new Error('TEST STAGE FAILED: Invalid test action configured.');
        }
        return ['[TEST] npm run test:unit initialized.', '[TEST] 14/14 unit tests passed. (100% logic coverage).'];
      },
      // 3. Scan Stage
      () => {
        if (pipeline.scan.length === 0) {
          throw new Error('SECURITY SCAN FAILED: Blocked by security policy. Vulnerability scans (Snyk) must run before deployments.');
        }
        return ['[SECURITY] run-snyk-scan initialized.', '[SECURITY] Checked 143 dependencies. 0 CVEs found. Security checks clean.'];
      },
      // 4. Deploy Stage
      () => {
        if (pipeline.deploy.length === 0) {
          throw new Error('DEPLOY FAILED: No target environment defined for deployment.');
        }
        const deployTarget = pipeline.deploy[0];
        if (deployTarget === 'vercel') {
          return ['[DEPLOY] Transmitting assets to Vercel edge networks...', '[DEPLOY] Live url established: http://prepzo-app-v3.vercel.app'];
        } else if (deployTarget === 'ecs') {
          return ['[DEPLOY] Pushing container to AWS ECS Elastic Registry...', '[DEPLOY] Container deployed on cluster instance ecs-prep-node-1.'];
        }
        throw new Error('DEPLOY FAILED: Unsupported deployment endpoint.');
      }
    ];

    let currentLogs: string[] = [];
    let failed = false;

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      try {
        const stepLogs = steps[i]();
        currentLogs = [...currentLogs, ...stepLogs];
        setLogs(prev => [...prev, ...stepLogs]);
        if (i < 3) {
          setLogs(prev => [...prev, `[${i + 2}/4] INITIALIZING ${['TEST', 'SECURITY SCAN', 'DEPLOY'][i]} STAGE...`]);
        }
      } catch (err: any) {
        setLogs(prev => [...prev, `[CRITICAL_ERROR] ${err.message}`, '[CI/CD Engine] PIPELINE STATUS: FAILED']);
        failed = true;
        break;
      }
    }

    setIsRunning(false);
    const success = !failed;
    setPipelinePassed(success);

    if (success) {
      setLogs(prev => [...prev, '[SUCCESS] All pipeline checks passed. Deployed successfully!', '[CI/CD Engine] PIPELINE STATUS: PASSED']);
      showSuccess('Pipeline compiled and deployed successfully!');
    } else {
      showError('Pipeline execution failed.');
    }

    // Report outcome to backend
    try {
      const response = await api.post('/devops/report', { success });
      if (response.data?.success) {
        setXpEarned(response.data.data.earnedXp);
        const originalBadges = response.data.data.stats?.badges || [];
        setUnlockedBadges(originalBadges);
        if (success) {
          // Delay opening modal slightly to let user read success logs
          setTimeout(() => {
            setShowOutcomeModal(true);
          }, 1500);
        }
      }
    } catch (err) {
      console.error('Failed to report devops outcome', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigateTo('game-lobby')}
              className="p-3 bg-[#13171d] border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </button>
            <div>
              <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">DevOps <span className="text-purple-400">Maestro.</span></h1>
              <p className="text-xs text-white/40 font-medium tracking-wide">Design a secure CI/CD pipeline template and deploy without triggering audit issues.</p>
            </div>
          </div>

          {/* Templates Select */}
          <div className="flex gap-3">
            <button
              onClick={() => applyTemplate('vercel')}
              className="px-4 py-2 bg-[#13171d] hover:bg-white/5 border border-white/5 hover:border-purple-500/30 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
            >
              Vercel Frontend Template
            </button>
            <button
              onClick={() => applyTemplate('docker')}
              className="px-4 py-2 bg-[#13171d] hover:bg-white/5 border border-white/5 hover:border-purple-500/30 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
            >
              AWS ECS Docker Template
            </button>
          </div>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Actions selection + stages */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Pipeline Stage Nodes */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/5 blur-[55px] rounded-full" />
              
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <Layers className="w-5 h-5 text-purple-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-purple-400">CI/CD Pipeline Canvas</h2>
              </div>

              {/* Stages row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(['build', 'test', 'scan', 'deploy'] as const).map((stage) => {
                  const items = pipeline[stage];
                  return (
                    <div key={stage} className="bg-black/35 border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[200px]">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-black uppercase tracking-widest text-white/55">{stage}</span>
                          <button 
                            onClick={() => handleClearStage(stage)}
                            className="text-[9px] font-black text-red-400/60 hover:text-red-400 uppercase tracking-wider outline-none"
                          >
                            Clear
                          </button>
                        </div>

                        <div className="space-y-3.5">
                          {items.length === 0 ? (
                            <div className="h-24 rounded-xl border border-dashed border-white/10 flex items-center justify-center p-3 text-center">
                              <span className="text-[10px] font-bold text-white/20 uppercase">Drop action here</span>
                            </div>
                          ) : (
                            items.map((cardId) => {
                              const card = ACTION_CARDS.find(c => c.id === cardId);
                              return (
                                <div key={cardId} className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl">
                                  <p className="text-xs font-black text-white">{card?.label}</p>
                                  <p className="text-[8px] font-medium text-white/40 leading-relaxed mt-0.5">{card?.sub}</p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configured Actions catalog */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-white/40">DevOps Toolchain</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {ACTION_CARDS.map((card) => {
                  return (
                    <div key={card.id} className="p-4 bg-black/20 border border-white/5 hover:border-purple-500/30 rounded-2xl space-y-3 transition-colors">
                      <div>
                        <p className="text-xs font-black text-white">{card.label}</p>
                        <p className="text-[9px] font-medium text-white/40 mt-1 leading-relaxed">{card.sub}</p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                        <select
                          onChange={(e) => {
                            if (e.target.value) handleAssignAction(card.id, e.target.value as any);
                          }}
                          className="w-full bg-[#1c232d] border border-white/10 text-[9px] font-black uppercase rounded-lg px-2 py-1 outline-none text-white/60 hover:text-white cursor-pointer"
                          defaultValue=""
                        >
                          <option value="" disabled>Deploy to...</option>
                          <option value="build">Stage: Build</option>
                          <option value="test">Stage: Test</option>
                          <option value="scan">Stage: Scan</option>
                          <option value="deploy">Stage: Deploy</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right panel: Terminal execution */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CI/CD Console Log */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#00ff9d]" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white/40">CI/CD Console output</h2>
                </div>
                {pipelinePassed === true ? (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">Success</span>
                ) : pipelinePassed === false ? (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">Failed</span>
                ) : null}
              </div>

              <div className="h-96 bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-[#00ff9d] overflow-y-auto space-y-2.5 custom-scrollbar">
                {logs.length === 0 ? (
                  <div className="text-white/20 italic">No logs generated. Assign actions to pipeline stages and click "Run Pipeline" to build.</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={log.includes('CRITICAL_ERROR') || log.includes('STATUS: FAILED') ? 'text-red-500 font-bold' : log.includes('STATUS: PASSED') || log.includes('SUCCESS') ? 'text-emerald-400 font-bold font-black' : ''}>
                      {log}
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={executePipeline}
                disabled={isRunning}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-600/10 active:scale-95 transition-all rounded-xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                {isRunning ? 'Deploying Build...' : 'Run Pipeline'}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Outcome Modal */}
      <AnimatePresence>
        {showOutcomeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#13171d] border border-white/10 rounded-[35px] max-w-lg w-full p-10 relative overflow-hidden space-y-6 shadow-2xl text-center"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-purple-500" />
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Pipeline <span className="text-purple-400">Deployed!</span></h2>
              
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-3 max-w-sm mx-auto text-left">
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>Build Status</span>
                  <span className="text-emerald-400 font-black">Passed</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between text-sm font-black text-purple-400 uppercase tracking-wider">
                  <span>XP Gained</span>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              {/* Show DevOps Maestro badge unlock */}
              {unlockedBadges.includes('DevOps Maestro') && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center gap-3 text-yellow-400 max-w-sm mx-auto">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-black uppercase tracking-wider">New Badge Unlocked!</p>
                    <p className="font-bold text-yellow-400/60 mt-0.5">DevOps Maestro (Passed 3 builds)</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setShowOutcomeModal(false);
                  navigateTo('game-lobby');
                }}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                Return to Lobby
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default DevopsPipeline;
