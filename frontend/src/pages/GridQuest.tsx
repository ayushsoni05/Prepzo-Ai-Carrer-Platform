import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Shield, Award, RotateCcw, AlertTriangle, ArrowLeft, Play, Sparkles, Heart, Zap, Cpu, Server, Database, Layers, Activity, Truck, Key, Activity as PulseIcon, ChevronRight } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';
import confetti from 'canvas-confetti';

interface GameItem {
  id: string;
  name: string;
  icon: string; // emoji or character for simple rendering
  color: string;
  pos: { x: number; y: number }; // 1-indexed (1 to gridSize)
}

interface PuzzleLevel {
  id: number;
  title: string;
  instructions: string;
  prefix: string;
  suffix: string;
  placeholder: string;
  hint: string;
  gridSize: number;
  sources: GameItem[];
  targets: GameItem[];
  validate: (input: string) => { success: boolean; positions: { x: number; y: number }[] };
}

const DOMAIN_LEVELS: Record<string, PuzzleLevel[]> = {
  'Computer Science & IT': [
    {
      id: 1,
      title: 'Packet Routing',
      instructions: 'Align the server data packet with the target database. Use CSS Flexbox properties to justify and align items to the bottom-right. Type: justify-content: flex-end; align-items: flex-end;',
      prefix: '#grid-container {\n  display: flex;',
      suffix: '}',
      placeholder: '  justify-content: flex-start;\n  align-items: flex-start;',
      hint: 'Move the packet to the end of both axes.',
      gridSize: 3,
      sources: [{ id: 'src-1', name: 'Data Packet', icon: '📦', color: 'bg-indigo-500', pos: { x: 1, y: 1 } }],
      targets: [{ id: 'tgt-1', name: 'Database Port', icon: '🛢️', color: 'border-indigo-500/50 bg-indigo-500/10', pos: { x: 3, y: 3 } }],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const hasJustify = clean.includes('justify-content:flex-end');
        const hasAlign = clean.includes('align-items:flex-end');
        
        let x = 1;
        let y = 1;
        if (hasJustify) x = 3;
        else if (clean.includes('justify-content:center')) x = 2;
        if (hasAlign) y = 3;
        else if (clean.includes('align-items:center')) y = 2;

        return { success: hasJustify && hasAlign, positions: [{ x, y }] };
      }
    },
    {
      id: 2,
      title: 'Distributed Databases',
      instructions: 'Distribute the data packets evenly along the network channel to match the databases on the ends. Use space-between layout. Type: justify-content: space-between;',
      prefix: '#grid-container {\n  display: flex;',
      suffix: '}',
      placeholder: '  justify-content: flex-start;',
      hint: 'space-between spreads items evenly starting from the edges.',
      gridSize: 3,
      sources: [
        { id: 'src-1', name: 'Data Packet A', icon: '📦', color: 'bg-indigo-500', pos: { x: 1, y: 1 } },
        { id: 'src-2', name: 'Data Packet B', icon: '📦', color: 'bg-indigo-500', pos: { x: 1, y: 1 } }
      ],
      targets: [
        { id: 'tgt-1', name: 'Database A', icon: '🛢️', color: 'border-indigo-500/50 bg-indigo-500/10', pos: { x: 1, y: 1 } },
        { id: 'tgt-2', name: 'Database B', icon: '🛢️', color: 'border-indigo-500/50 bg-indigo-500/10', pos: { x: 3, y: 1 } }
      ],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const isCorrect = clean.includes('justify-content:space-between');
        
        let positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];
        if (isCorrect) {
          positions = [{ x: 1, y: 1 }, { x: 3, y: 1 }];
        } else if (clean.includes('justify-content:center')) {
          positions = [{ x: 2, y: 1 }, { x: 2, y: 1 }];
        } else if (clean.includes('justify-content:flex-end')) {
          positions = [{ x: 3, y: 1 }, { x: 3, y: 1 }];
        }
        return { success: isCorrect, positions };
      }
    }
  ],
  'Business Administration & Finance': [
    {
      id: 1,
      title: 'Supply Chain Routing',
      instructions: 'Allocate the supply truck to the primary distribution center. Set allocation to 100% and route to primary. Type: allocation: 100%; route: primary;',
      prefix: '#supply-dispatcher {\n  mode: direct;',
      suffix: '}',
      placeholder: '  allocation: 0%;\n  route: none;',
      hint: 'Direct the cargo directly to coordinate (3, 2).',
      gridSize: 3,
      sources: [{ id: 'src-1', name: 'Cargo Truck', icon: '🚚', color: 'bg-emerald-500', pos: { x: 1, y: 1 } }],
      targets: [{ id: 'tgt-1', name: 'Retail Center', icon: '🏪', color: 'border-emerald-500/50 bg-emerald-500/10', pos: { x: 3, y: 2 } }],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const hasAlloc = clean.includes('allocation:100%');
        const hasRoute = clean.includes('route:primary');
        
        let x = 1;
        let y = 1;
        if (hasAlloc) x = 3;
        if (hasRoute) y = 2;
        return { success: hasAlloc && hasRoute, positions: [{ x, y }] };
      }
    },
    {
      id: 2,
      title: 'Balanced Allocation',
      instructions: 'Balance routing between two market stores. Set allocation to 50/50 and route to balanced. Type: allocation: 50/50; route: balanced;',
      prefix: '#supply-dispatcher {\n  mode: split;',
      suffix: '}',
      placeholder: '  allocation: 100/0;\n  route: direct;',
      hint: 'Split the supply equally to align with both targets.',
      gridSize: 3,
      sources: [
        { id: 'src-1', name: 'Truck A', icon: '🚚', color: 'bg-emerald-500', pos: { x: 1, y: 1 } },
        { id: 'src-2', name: 'Truck B', icon: '🚚', color: 'bg-emerald-500', pos: { x: 1, y: 1 } }
      ],
      targets: [
        { id: 'tgt-1', name: 'Store East', icon: '🏪', color: 'border-emerald-500/50 bg-emerald-500/10', pos: { x: 1, y: 3 } },
        { id: 'tgt-2', name: 'Store West', icon: '🏪', color: 'border-emerald-500/50 bg-emerald-500/10', pos: { x: 3, y: 3 } }
      ],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const isCorrect = clean.includes('allocation:50/50') && clean.includes('route:balanced');
        let positions = [{ x: 1, y: 1 }, { x: 1, y: 1 }];
        if (isCorrect) {
          positions = [{ x: 1, y: 3 }, { x: 3, y: 3 }];
        }
        return { success: isCorrect, positions };
      }
    }
  ],
  'Mechanical & Structural Eng': [
    {
      id: 1,
      title: 'Bridge Load Balancing',
      instructions: 'Balance the truss bridge. Position the support pillar at coordinate (2,3) to stabilize the weight load vector. Type: support-x: 2; load: balanced;',
      prefix: '#truss-balancer {\n  brace-y: 3;',
      suffix: '}',
      placeholder: '  support-x: 1;\n  load: unstable;',
      hint: 'Set the brace and weight vector to balanced.',
      gridSize: 3,
      sources: [{ id: 'src-1', name: 'Support Pillar', icon: '🏗️', color: 'bg-amber-500', pos: { x: 1, y: 3 } }],
      targets: [{ id: 'tgt-1', name: 'Force Vector', icon: '👇', color: 'border-amber-500/50 bg-amber-500/10', pos: { x: 2, y: 3 } }],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const hasSupport = clean.includes('support-x:2');
        const hasLoad = clean.includes('load:balanced');
        
        let x = 1;
        let y = 3;
        if (hasSupport) x = 2;
        return { success: hasSupport && hasLoad, positions: [{ x, y }] };
      }
    }
  ],
  'Electrical & Electronics Eng': [
    {
      id: 1,
      title: 'Breadboard Signal Routing',
      instructions: 'Connect the voltage supply to the target LED on (3,1) with a 220 ohm resistor. Type: path: (1,1)->(3,1); resistance: 220;',
      prefix: '#signal-path {\n  voltage: 5V;',
      suffix: '}',
      placeholder: '  path: none;\n  resistance: 0;',
      hint: 'Input path vector and resistance.',
      gridSize: 3,
      sources: [{ id: 'src-1', name: 'Voltage signal', icon: '⚡', color: 'bg-cyan-500', pos: { x: 1, y: 1 } }],
      targets: [{ id: 'tgt-1', name: 'Target LED', icon: '🚨', color: 'border-cyan-500/50 bg-cyan-500/10', pos: { x: 3, y: 1 } }],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const hasPath = clean.includes('path:(1,1)->(3,1)');
        const hasResist = clean.includes('resistance:220');
        
        let x = 1;
        let y = 1;
        if (hasPath) {
          x = 3;
          y = 1;
        }
        return { success: hasPath && hasResist, positions: [{ x, y }] };
      }
    }
  ],
  'Healthcare & Biotech': [
    {
      id: 1,
      title: 'Receptor Binding Alignment',
      instructions: 'Align the antibody peptide chain with the host cell receptor located at coordinate (3,3). Set chain to A-T-G-C and bias to hydrophilic. Type: chain: A-T-G-C; polar-bias: hydrophilic;',
      prefix: '#recombination {\n  host-cell: target;',
      suffix: '}',
      placeholder: '  chain: none;\n  polar-bias: lipophilic;',
      hint: 'Match chemical chain sequence and target polar affinity.',
      gridSize: 3,
      sources: [{ id: 'src-1', name: 'Antibody Molecule', icon: '🧬', color: 'bg-rose-500', pos: { x: 1, y: 1 } }],
      targets: [{ id: 'tgt-1', name: 'Receptor Binding Site', icon: '🦠', color: 'border-rose-500/50 bg-rose-500/10', pos: { x: 3, y: 3 } }],
      validate: (input) => {
        const clean = input.replace(/\s/g, '');
        const hasChain = clean.includes('chain:A-T-G-C');
        const hasBias = clean.includes('polar-bias:hydrophilic');
        
        let x = 1;
        let y = 1;
        if (hasChain) x = 3;
        if (hasBias) y = 3;
        return { success: hasChain && hasBias, positions: [{ x, y }] };
      }
    }
  ]
};

export const GridQuest = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'victory'>('start');
  const [selectedDomain, setSelectedDomain] = useState<string>('Computer Science & IT');
  const [levelIdx, setLevelIdx] = useState(0);
  const [editorVal, setEditorVal] = useState('');
  const [completedDomains, setCompletedDomains] = useState<string[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [xp, setXp] = useState(0);
  
  // Game metrics
  const levels = DOMAIN_LEVELS[selectedDomain] || [];
  const currentLevel = levels[levelIdx];
  const [sources, setSources] = useState<GameItem[]>([]);
  const [isLevelSolved, setIsLevelSolved] = useState(false);

  // Fetch initial game stats from server
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/games/stats');
        if (res.data?.success && res.data.data) {
          const stats = res.data.data;
          setHighScore(stats.gridQuest?.highScore || 0);
          setCompletedDomains(stats.gridQuest?.completedDomains || []);
          setXp(stats.xp || 0);
          // Auto-select domain based on user profile if possible
          if (stats.user?.fieldOfStudy && DOMAIN_LEVELS[stats.user.fieldOfStudy]) {
            setSelectedDomain(stats.user.fieldOfStudy);
          }
        }
      } catch (err) {
        console.error('Failed to fetch initial stats', err);
      }
    };
    fetchStats();
  }, []);

  // Initialize level sources
  useEffect(() => {
    if (currentLevel) {
      setSources(currentLevel.sources.map(s => ({ ...s, pos: { ...s.pos } })));
      setEditorVal(currentLevel.placeholder);
      setIsLevelSolved(false);
    }
  }, [levelIdx, selectedDomain, gameState]);

  // Handle typing & validation logic
  const handleEditorChange = (value: string) => {
    setEditorVal(value);
    if (!currentLevel) return;

    const validation = currentLevel.validate(value);
    
    // Live animate coordinates of the sources based on validator response
    setSources((prevSources) => 
      prevSources.map((source, index) => {
        if (validation.positions[index]) {
          return { ...source, pos: { ...validation.positions[index] } };
        }
        return source;
      })
    );

    if (validation.success && !isLevelSolved) {
      setIsLevelSolved(true);
      confetti({ particleCount: 30, spread: 50, colors: ['#5ed29c', '#10b981'] });
      showSuccess('Perfect Alignment!');
    }
  };

  const handleNextLevel = async () => {
    if (levelIdx + 1 < levels.length) {
      setLevelIdx(prev => prev + 1);
    } else {
      // Completed the entire domain!
      const isNewCompletion = !completedDomains.includes(selectedDomain);
      let nextCompleted = [...completedDomains];
      if (isNewCompletion) {
        nextCompleted.push(selectedDomain);
        setCompletedDomains(nextCompleted);
      }

      // Calculate score based on domains completed
      const finalScore = nextCompleted.length * 100;

      try {
        const res = await api.post('/grid-quest/report', {
          score: finalScore,
          domain: selectedDomain,
          domainCompleted: true
        });

        if (res.data?.success) {
          const { earnedXp } = res.data.data;
          setXp(res.data.data.stats.xp);
          if (finalScore > highScore) setHighScore(finalScore);
          setGameState('victory');
          confetti({ particleCount: 150, spread: 80 });
        }
      } catch (err) {
        showError('Failed to save completion stats. Redirecting to start.');
        setGameState('start');
      }
    }
  };

  const startPlaying = () => {
    setLevelIdx(0);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-20 px-4 pb-12 relative overflow-hidden font-rubik">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-radial-at-c from-purple-900/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-120px)] justify-between relative z-10">
        <AnimatePresence mode="wait">
          {/* START PANEL */}
          {gameState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
            >
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl mb-6 flex items-center justify-center">
                <Layers className="w-12 h-12 text-emerald-400" />
              </div>

              <h1 className="text-4xl md:text-6xl font-[900] uppercase tracking-tighter italic mb-4">
                Grid Quest <span className="text-emerald-400">Arena.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium tracking-tight mb-8 max-w-md italic leading-relaxed">
                Configure vectors, layouts, and paths using code parameters. Guide the active elements into their target grids.
              </p>

              {/* Selector */}
              <div className="w-full bg-[#13171d] border border-white/5 rounded-3xl p-6 mb-8 text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Select Domain Puzzle Deck
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(DOMAIN_LEVELS).map((domainName) => {
                    const isCompleted = completedDomains.includes(domainName);
                    return (
                      <button
                        key={domainName}
                        onClick={() => setSelectedDomain(domainName)}
                        className={`p-3.5 rounded-2xl border text-xs font-black uppercase tracking-wider text-left transition-all flex items-center justify-between ${selectedDomain === domainName ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-black/20 border-white/5 text-white/60 hover:border-white/10'}`}
                      >
                        <span className="flex items-center gap-2">
                          {domainName}
                          {isCompleted && <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-black">SOLVED</span>}
                        </span>
                        {selectedDomain === domainName && <Sparkles className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-8 bg-[#161a20] border border-white/10 rounded-2xl px-6 py-3">
                <div className="flex items-center gap-2 border-r border-white/5 pr-8">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Best Score: {highScore}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Gained: {xp} XP</span>
                </div>
              </div>

              <div className="flex gap-4 w-full max-w-sm">
                <button
                  onClick={() => navigateTo('game-lobby')}
                  className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Lobby
                </button>
                <button
                  onClick={startPlaying}
                  className="flex-[2] py-4 bg-white text-black hover:bg-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-black" /> Enter Arena
                </button>
              </div>
            </motion.div>
          )}

          {/* ACTIVE PLAYING SCREEN */}
          {gameState === 'playing' && currentLevel && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[420px]"
            >
              {/* Left Column: Code Editor & Instructions (5 Cols) */}
              <div className="lg:col-span-5 bg-[#13171d] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mr-2">
                        {selectedDomain}
                      </span>
                      <span className="text-xs font-bold text-white/40">Level {levelIdx + 1} of {levels.length}</span>
                    </div>
                    <span className="text-sm font-black italic">{currentLevel.title}</span>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed font-medium mb-6">
                    {currentLevel.instructions}
                  </p>

                  {/* Code Block Container */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0c0f13] text-sm font-mono relative">
                    <div className="px-4 py-2 border-b border-white/5 text-[10px] text-white/30 uppercase tracking-widest flex items-center justify-between">
                      <span>Interactive Terminal</span>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-white/70">
                      <div>{currentLevel.prefix}</div>
                      <div className="pl-4 py-1.5 border-l-2 border-emerald-500 bg-emerald-500/5 rounded-r">
                        <CodeMirror
                          value={editorVal}
                          theme={vscodeDark}
                          onChange={handleEditorChange}
                          extensions={[]}
                          basicSetup={{
                            lineNumbers: false,
                            foldGutter: false,
                            highlightActiveLine: false
                          }}
                        />
                      </div>
                      <div>{currentLevel.suffix}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                  <button
                    onClick={() => setGameState('start')}
                    className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Abort
                  </button>
                  <button
                    onClick={() => alert(`Hint: ${currentLevel.hint}`)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Request Hint
                  </button>
                  {isLevelSolved && (
                    <button
                      onClick={handleNextLevel}
                      className="flex-1 py-3 bg-white text-black hover:bg-gray-200 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-lg animate-pulse"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Grid Board (7 Cols) */}
              <div className="lg:col-span-7 bg-[#13171d] border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center h-full relative min-h-[350px]">
                <div 
                  className="grid gap-2 bg-black/40 border border-white/5 p-4 rounded-3xl w-full max-w-[420px] aspect-square relative"
                  style={{
                    gridTemplateColumns: `repeat(${currentLevel.gridSize}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${currentLevel.gridSize}, minmax(0, 1fr))`
                  }}
                >
                  {/* Grid Lines/Tiles */}
                  {Array.from({ length: currentLevel.gridSize * currentLevel.gridSize }).map((_, i) => (
                    <div 
                      key={i} 
                      className="border border-white/5 bg-[#171c24]/20 rounded-2xl flex items-center justify-center text-[10px] font-black text-white/5"
                    >
                      {i + 1}
                    </div>
                  ))}

                  {/* Target zones */}
                  {currentLevel.targets.map((tgt) => (
                    <div
                      key={tgt.id}
                      className={`absolute rounded-2xl border border-dashed flex items-center justify-center text-3xl shadow-inner transition-all duration-300 ${tgt.color}`}
                      style={{
                        width: `calc((100% - ${(currentLevel.gridSize - 1) * 8}px - 32px) / ${currentLevel.gridSize})`,
                        height: `calc((100% - ${(currentLevel.gridSize - 1) * 8}px - 32px) / ${currentLevel.gridSize})`,
                        left: `calc(16px + ${(tgt.pos.x - 1)} * (100% - 32px) / ${currentLevel.gridSize})`,
                        top: `calc(16px + ${(tgt.pos.y - 1)} * (100% - 32px) / ${currentLevel.gridSize})`
                      }}
                    >
                      <span className="scale-100 animate-pulse opacity-60">{tgt.icon}</span>
                    </div>
                  ))}

                  {/* Moving Sources */}
                  {sources.map((src) => (
                    <motion.div
                      key={src.id}
                      layout
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                      className={`absolute rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/10 ${src.color}`}
                      style={{
                        width: `calc((100% - ${(currentLevel.gridSize - 1) * 8}px - 32px) / ${currentLevel.gridSize})`,
                        height: `calc((100% - ${(currentLevel.gridSize - 1) * 8}px - 32px) / ${currentLevel.gridSize})`,
                        left: `calc(16px + ${(src.pos.x - 1)} * (100% - 32px) / ${currentLevel.gridSize})`,
                        top: `calc(16px + ${(src.pos.y - 1)} * (100% - 32px) / ${currentLevel.gridSize})`
                      }}
                    >
                      <span>{src.icon}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VICTORY OVERLAY */}
          {gameState === 'victory' && (
            <motion.div
              key="victory"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center"
            >
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl mb-6">
                <Sparkles className="w-12 h-12 text-emerald-400" />
              </div>

              <h1 className="text-4xl font-[900] uppercase tracking-tighter italic mb-2">
                Domain <span className="text-emerald-400">Mastered.</span>
              </h1>
              <p className="text-white/40 text-xs font-medium tracking-tight mb-8">
                All puzzles aligned perfectly. Database reported success.
              </p>

              {/* Stats Box */}
              <div className="w-full bg-[#13171d] border border-white/5 rounded-3xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Domain Completed</span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">{selectedDomain}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Completed Count</span>
                  <span className="text-base font-black text-white">{completedDomains.length} / {Object.keys(DOMAIN_LEVELS).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Rank XP Gained</span>
                  <span className="text-sm font-black text-emerald-400">+{completedDomains.length * 100} XP</span>
                </div>
              </div>

              <button
                onClick={() => setGameState('start')}
                className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg"
              >
                Return to start
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
