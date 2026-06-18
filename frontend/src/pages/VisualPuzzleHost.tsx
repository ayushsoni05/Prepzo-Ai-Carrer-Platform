import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Sparkles, Trophy, CheckCircle2, RotateCcw, Info, Server, TrendingUp, Settings, Cpu, Dna, ArrowRight 
} from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { VISUAL_PUZZLE_DECKS, VisualPuzzleLevel, DomainDeck } from '../data/visualGames.config';

export const VisualPuzzleHost = () => {
  const [selectedDeck, setSelectedDeck] = useState<DomainDeck | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [stats, setStats] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Fetch stats on load
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/games/stats');
        setStats(res.data?.data);
      } catch (err) {
        console.error('Failed to fetch stats', err);
      }
    };
    fetchStats();
  }, []);

  const currentLevel = selectedDeck?.levels[currentLevelIndex];

  // Initialize level state
  useEffect(() => {
    if (currentLevel) {
      setGameState({ ...currentLevel.initialState });
      setSuccess(false);
      setFeedback('');
    }
  }, [currentLevel]);

  // Real-time validation check
  useEffect(() => {
    if (currentLevel && gameState) {
      const isCorrect = currentLevel.validation(gameState);
      if (isCorrect && !success) {
        setSuccess(true);
        setFeedback('Target Alignment Achieved! Perfect configuration.');
      } else if (!isCorrect && success) {
        setSuccess(false);
      }
    }
  }, [gameState, currentLevel, success]);

  // Handle outcome submission
  const handleNextOrFinish = async () => {
    if (!selectedDeck || !currentLevel) return;

    setSaving(true);
    try {
      const res = await api.post('/visual-puzzles/report', {
        score: 100,
        levelId: currentLevel.id,
        levelCompleted: true
      });
      if (res.data?.success) {
        // Update local stats
        setStats(res.data.data.stats);
      }
    } catch (err) {
      console.error('Error reporting outcome', err);
    } finally {
      setSaving(false);
    }

    if (currentLevelIndex < selectedDeck.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      // Finished all levels in this deck!
      setFeedback(`Congratulations! You have completed the ${selectedDeck.title} Deck!`);
    }
  };

  const resetLevel = () => {
    if (currentLevel) {
      setGameState({ ...currentLevel.initialState });
      setSuccess(false);
      setFeedback('');
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Server': return <Server className="w-8 h-8" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      case 'Settings': return <Settings className="w-8 h-8" />;
      case 'Cpu': return <Cpu className="w-8 h-8" />;
      case 'Dna': return <Dna className="w-8 h-8" />;
      default: return <Sparkles className="w-8 h-8" />;
    }
  };

  if (!selectedDeck) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigateTo('games')} 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} /> Back to Lobby
            </button>
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-400 w-6 h-6 animate-pulse" />
              <span className="text-sm text-white/60 font-medium">
                Puzzles Solved: <strong className="text-white">{stats?.visualPuzzles?.completedLevels?.length || 0}</strong>
              </span>
            </div>
          </div>

          {/* Hero Banner */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Visual Puzzle Quest
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Solve interactive spatial and mathematical challenges matching your field of study. No coding required—just drag, connect, slide, and align!
            </p>
          </div>

          {/* Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISUAL_PUZZLE_DECKS.map((deck) => {
              const completedCount = deck.levels.filter(lvl => 
                stats?.visualPuzzles?.completedLevels?.includes(lvl.id)
              ).length;
              const isFullyCompleted = completedCount === deck.levels.length;

              // Color definitions matching the card icons
              let iconColorClass = "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
              if (deck.id === 'cs') iconColorClass = "text-blue-400 bg-blue-500/10 border-blue-500/20";
              else if (deck.id === 'finance') iconColorClass = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
              else if (deck.id === 'me') iconColorClass = "text-amber-400 bg-amber-500/10 border-amber-500/20";
              else if (deck.id === 'ee') iconColorClass = "text-purple-400 bg-purple-500/10 border-purple-500/20";
              else if (deck.id === 'biotech') iconColorClass = "text-rose-400 bg-rose-500/10 border-rose-500/20";

              return (
                <div 
                  key={deck.id}
                  className="bg-[#13171d] border border-white/5 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] transition-all relative overflow-hidden group hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                >
                  <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.03] transition-all duration-300 pointer-events-none" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 border rounded-2xl ${iconColorClass}`}>
                        {getIcon(deck.iconName)}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isFullyCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                        {completedCount} / {deck.levels.length} Solved
                      </span>
                    </div>

                    <h3 className="text-xl font-[900] tracking-tight mb-2 text-white">{deck.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed font-medium mb-4">{deck.description}</p>
                  </div>

                  <div>
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs font-bold text-white/40 mb-5">
                      <span>{deck.levels.length} Interactive Levels</span>
                      {isFullyCompleted ? (
                        <span className="text-emerald-400">COMPLETED</span>
                      ) : (
                        <span className="text-white/60">Ready</span>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedDeck(deck);
                        setCurrentLevelIndex(0);
                      }}
                      className="w-full py-3.5 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      Play Deck
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-4 md:px-8 pb-12 font-rubik flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col space-y-6">
        
        {/* Level Navigation Header */}
        <div className="flex justify-between items-center flex-wrap gap-4 bg-[#13171d] p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedDeck(null)} 
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{selectedDeck.title} Deck</span>
              <h2 className="text-lg font-bold">{currentLevel?.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-white/60">
              Level {currentLevelIndex + 1} of {selectedDeck.levels.length}
            </div>
            <div className="flex gap-1">
              {selectedDeck.levels.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    idx === currentLevelIndex 
                      ? 'bg-indigo-500 w-12' 
                      : idx < currentLevelIndex ? 'bg-emerald-500' : 'bg-white/5'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
          
          {/* Left Panel: Instructions & Configuration */}
          <div className="lg:col-span-5 flex flex-col space-y-6 bg-[#13171d] p-6 rounded-3xl border border-white/5 shadow-xl">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Info size={18} className="text-indigo-400" />
                Level Instructions
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {currentLevel?.objective}
              </p>
              
              <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/5 text-xs text-white/40 font-mono">
                <div className="text-white/20 uppercase font-bold tracking-wider text-[10px] mb-2">Step Guidelines:</div>
                <ul className="space-y-2">
                  {currentLevel?.layoutInfo.instructions.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-2 items-start">
                      <span className="text-indigo-400 font-bold">{sIdx + 1}.</span>
                      <span className="text-white/80">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Control Deck */}
            <div className="flex-1 flex flex-col justify-center py-6 border-t border-white/5 space-y-6">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Adjust Configuration</h3>
              
              {/* Render dynamic sliders / inputs depending on layout type */}
              {currentLevel?.layoutInfo.type === 'network' && gameState && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/60 block mb-2">{currentLevel.layoutInfo.sliderLabel}</label>
                    <input 
                      type="range"
                      min={currentLevel.layoutInfo.sliderMin}
                      max={currentLevel.layoutInfo.sliderMax}
                      step="0.05"
                      value={gameState.sliderVal}
                      onChange={(e) => setGameState({ ...gameState, sliderVal: parseFloat(e.target.value) })}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/30 mt-1">
                      <span>DB A (0%)</span>
                      <span className="text-white font-bold">{(gameState.sliderVal * 100).toFixed(0)}%</span>
                      <span>DB B (100%)</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#0a0c10] p-4 rounded-xl border border-white/5 space-y-2">
                    <span className="text-xs text-white/60 font-medium">Link Status:</span>
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span>Active Route:</span>
                      <span className={gameState.connectedTo ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                        {gameState.connectedTo === 'db-a' ? 'Database A' : gameState.connectedTo === 'db-b' ? 'Database B' : 'DISCONNECTED'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {currentLevel?.layoutInfo.type === 'finance' && gameState && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Stocks / Equity Allocation</span>
                      <span className="text-white font-bold">{gameState.equity}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={gameState.equity}
                      onChange={(e) => {
                        const eq = parseInt(e.target.value);
                        // Make sure sum can adapt or user rebalances
                        setGameState({ ...gameState, equity: eq, bonds: 100 - eq - (gameState.gold || 0) });
                      }}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  {gameState.gold !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Gold Asset Allocation</span>
                        <span className="text-white font-bold">{gameState.gold}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={gameState.gold}
                        onChange={(e) => {
                          const gd = parseInt(e.target.value);
                          setGameState({ ...gameState, gold: gd, equity: 100 - gd - gameState.bonds });
                        }}
                        className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Bonds / Fixed Income</span>
                      <span className="text-white font-bold">{gameState.bonds}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={gameState.bonds}
                      onChange={(e) => {
                        const bd = parseInt(e.target.value);
                        setGameState({ ...gameState, bonds: bd, equity: 100 - bd - (gameState.gold || 0) });
                      }}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="p-3 bg-[#0a0c10] rounded-xl border border-white/5 flex justify-between items-center text-xs">
                    <span className="text-white/30">Total Capital Allocated:</span>
                    <span className={`font-bold ${Math.abs(gameState.equity + gameState.bonds + (gameState.gold || 0) - 100) < 2 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {gameState.equity + gameState.bonds + (gameState.gold || 0)}% / 100%
                    </span>
                  </div>
                </div>
              )}

              {currentLevel?.layoutInfo.type === 'mechanical' && gameState && (
                <div className="space-y-4">
                  <span className="text-xs text-white/60 block mb-2">Available Gear Inventory:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Small Gear Tool */}
                    <div 
                      onClick={() => setGameState({ ...gameState, gearPlaced: true, gearSize: 'small' })}
                      className="p-3 bg-black/20 rounded-2xl border border-white/5 text-center cursor-pointer hover:border-amber-500/40 group transition-all"
                    >
                      <Settings className="w-8 h-8 mx-auto text-amber-500/70 group-hover:rotate-45 transition-transform" />
                      <span className="text-[10px] text-white/60 mt-1 block">12T (Small)</span>
                    </div>

                    {/* Medium Gear Tool */}
                    <div 
                      onClick={() => {
                        if (currentLevel.id === 'me-1') {
                          setGameState({ ...gameState, gearPlaced: true, gearSize: 'medium' });
                        } else {
                          // Level 2, append shaft peg
                          const pegs = [...gameState.pegsOccupied];
                          if (!pegs.includes('peg-1')) pegs.push('peg-1');
                          setGameState({ ...gameState, pegsOccupied: pegs });
                        }
                      }}
                      className="p-3 bg-black/20 rounded-2xl border border-white/5 text-center cursor-pointer hover:border-amber-500/40 group transition-all"
                    >
                      <Settings className="w-10 h-10 mx-auto text-amber-500 group-hover:rotate-45 transition-transform" />
                      <span className="text-[10px] text-white/60 mt-1 block">24T (Medium)</span>
                    </div>

                    {/* Large Gear Tool */}
                    <div 
                      onClick={() => {
                        if (currentLevel.id === 'me-1') {
                          setGameState({ ...gameState, gearPlaced: true, gearSize: 'large' });
                        } else {
                          const pegs = [...gameState.pegsOccupied];
                          if (!pegs.includes('peg-2')) pegs.push('peg-2');
                          setGameState({ ...gameState, pegsOccupied: pegs });
                        }
                      }}
                      className="p-3 bg-black/20 rounded-2xl border border-white/5 text-center cursor-pointer hover:border-amber-500/40 group transition-all"
                    >
                      <Settings className="w-12 h-12 mx-auto text-amber-600 group-hover:rotate-45 transition-transform" />
                      <span className="text-[10px] text-white/60 mt-1 block">36T (Large)</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/30 italic text-center mt-2">
                    Tip: Tap a gear to place or drag it onto the pegs in the visual board.
                  </p>
                </div>
              )}

              {currentLevel?.layoutInfo.type === 'electrical' && gameState && (
                <div className="space-y-4">
                  <span className="text-xs text-white/60 block mb-2">Gate Inventory (Logic ICs):</span>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setGameState({ ...gameState, gateType: 'AND' })}
                      className={`p-3 bg-black/20 rounded-2xl border text-center transition-all ${
                        gameState.gateType === 'AND' ? 'border-purple-500 text-purple-400' : 'border-white/5 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="text-lg font-bold font-mono">AND</div>
                      <span className="text-[9px] text-white/30">Outputs 1 if both 1</span>
                    </button>

                    <button 
                      onClick={() => setGameState({ ...gameState, gateType: 'OR' })}
                      className={`p-3 bg-black/20 rounded-2xl border text-center transition-all ${
                        gameState.gateType === 'OR' ? 'border-purple-500 text-purple-400' : 'border-white/5 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="text-lg font-bold font-mono">OR</div>
                      <span className="text-[9px] text-white/30">Outputs 1 if any 1</span>
                    </button>

                    <button 
                      onClick={() => setGameState({ ...gameState, gateType: 'XOR' })}
                      className={`p-3 bg-black/20 rounded-2xl border text-center transition-all ${
                        gameState.gateType === 'XOR' ? 'border-purple-500 text-purple-400' : 'border-white/5 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="text-lg font-bold font-mono">XOR</div>
                      <span className="text-[9px] text-white/30">Outputs 1 if diff</span>
                    </button>
                  </div>
                </div>
              )}

              {currentLevel?.layoutInfo.type === 'biotech' && gameState && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-white/60 block mb-2">{currentLevel.layoutInfo.sliderLabel}</label>
                    <input 
                      type="range"
                      min={currentLevel.layoutInfo.sliderMin}
                      max={currentLevel.layoutInfo.sliderMax}
                      value={gameState.rotation}
                      onChange={(e) => setGameState({ ...gameState, rotation: parseInt(e.target.value) })}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex justify-between text-[10px] text-white/30 mt-1">
                      <span>0°</span>
                      <span className="text-white font-bold">{gameState.rotation}°</span>
                      <span>360°</span>
                    </div>
                  </div>

                  {gameState.density !== undefined && (
                    <div>
                      <label className="text-xs text-white/60 block mb-2">Peptide Concentration density (%)</label>
                      <input 
                        type="range"
                        min="10"
                        max="100"
                        value={gameState.density}
                        onChange={(e) => setGameState({ ...gameState, density: parseInt(e.target.value) })}
                        className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                      <div className="flex justify-between text-[10px] text-white/30 mt-1">
                        <span>10%</span>
                        <span className="text-white font-bold">{gameState.density}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center gap-4">
              <button 
                onClick={resetLevel} 
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold"
              >
                <RotateCcw size={14} /> Reset
              </button>

              <button
                disabled={!success || saving}
                onClick={handleNextOrFinish}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg ${
                  success 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/20 text-white cursor-pointer hover:scale-[1.03]' 
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {saving ? 'Saving...' : 'Submit Alignment'} <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Visual Board */}
          <div className="lg:col-span-7 relative bg-[#13171d] rounded-3xl border border-white/5 shadow-2xl flex flex-col justify-center items-center overflow-hidden min-h-[400px] p-6">
            
            {/* Grid Dotted Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Dynamic Rendering of Graphics */}
            {currentLevel?.layoutInfo.type === 'network' && gameState && (
              <div className="w-full h-full max-w-lg flex flex-col justify-between items-center py-10 relative">
                
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {gameState.connectedTo === 'db-a' && (
                    <motion.path 
                      d="M 120 180 Q 250 80 380 100" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="4" 
                      strokeDasharray="6,4"
                      className="animate-pulse"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {gameState.connectedTo === 'db-b' && (
                    <motion.path 
                      d="M 120 180 Q 250 280 380 260" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="4" 
                      strokeDasharray="6,4"
                      className="animate-pulse"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </svg>

                <div className="flex w-full justify-between items-center z-10">
                  {/* Gateway Source */}
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      onClick={() => {
                        // Toggle link destination simply for accessible clicking
                        const target = gameState.connectedTo === 'db-a' ? 'db-b' : 'db-a';
                        setGameState({ ...gameState, connectedTo: target });
                      }}
                      className="w-24 h-24 rounded-2xl bg-indigo-500/10 border-2 border-indigo-500/40 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    >
                      <Server className="text-indigo-400 w-8 h-8 animate-bounce" />
                      <span className="text-[10px] font-mono tracking-tighter text-white">API Gateway</span>
                    </div>
                    <span className="text-[9px] text-white/30">Tap to connect cable</span>
                  </div>

                  {/* Target Databases */}
                  <div className="flex flex-col gap-12">
                    {/* Database A */}
                    <div 
                      onClick={() => setGameState({ ...gameState, connectedTo: 'db-a' })}
                      className={`w-28 h-20 rounded-2xl border flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ${
                        gameState.connectedTo === 'db-a'
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-black/20 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-xs font-mono">
                        <span className={`w-2 h-2 rounded-full ${currentLevel.id === 'cs-2' ? 'bg-red-500' : 'bg-emerald-400 animate-ping'}`} />
                        <span className="text-white">DB_A (Port 1)</span>
                      </div>
                      <span className="text-[9px] text-white/30">
                        {currentLevel.id === 'cs-2' ? 'OUTAGE (500 ERROR)' : 'Capacity: 50%'}
                      </span>
                    </div>

                    {/* Database B */}
                    <div 
                      onClick={() => setGameState({ ...gameState, connectedTo: 'db-b' })}
                      className={`w-28 h-20 rounded-2xl border flex flex-col justify-center items-center gap-1 cursor-pointer transition-all ${
                        gameState.connectedTo === 'db-b'
                          ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-black/20 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-white">DB_B (Port 2)</span>
                      </div>
                      <span className="text-[9px] text-white/30">Capacity: 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentLevel?.layoutInfo.type === 'finance' && gameState && (
              <div className="w-full h-full flex flex-col justify-center items-center py-6 relative">
                {/* Efficient Frontier Curve Grid */}
                <div className="w-80 h-48 bg-black/20 border border-white/5 rounded-2xl relative overflow-hidden flex justify-center items-center">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* Draw efficient frontier curved path */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path 
                      d="M 40 160 Q 160 30 300 60" 
                      fill="none" 
                      stroke="rgba(99, 102, 241, 0.4)" 
                      strokeWidth="2" 
                    />
                    
                    {/* Level targets */}
                    {currentLevel.id === 'finance-1' && (
                      <rect x="140" y="70" width="40" height="40" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1" strokeDasharray="3,2" />
                    )}

                    {currentLevel.id === 'finance-2' && (
                      <rect x="240" y="40" width="40" height="40" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1" strokeDasharray="3,2" />
                    )}
                  </svg>

                  {/* Dynamic Bouncing Portfolio Dot */}
                  {/* We map the sliders values to X/Y positions on the curve */}
                  {(() => {
                    const x = 40 + (gameState.equity * 2.6);
                    // y estimation based on curve
                    const baseRisk = (gameState.equity * 0.7) + ((gameState.gold || 0) * 0.3);
                    const y = 160 - (baseRisk * 1.1) + (gameState.bonds * 0.2);

                    return (
                      <motion.div 
                        animate={{ x: x - 6, y: y - 6 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="absolute w-4 h-4 rounded-full bg-emerald-400 border border-white shadow-[0_0_12px_#10b981]"
                      />
                    );
                  })()}

                  <div className="absolute bottom-2 left-3 text-[9px] text-white/30">Risk →</div>
                  <div className="absolute top-2 left-3 text-[9px] text-white/30">Return ↑</div>
                  <div className="absolute bottom-2 right-3 text-[9px] text-emerald-400 font-bold font-mono">
                    {currentLevel.id === 'finance-1' ? 'Target: Balanced Risk' : 'Target: Inflation Shield'}
                  </div>
                </div>

                <div className="mt-4 flex gap-6 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Stocks: {gameState.equity}%
                  </div>
                  {gameState.gold !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Gold: {gameState.gold}%
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Bonds: {gameState.bonds}%
                  </div>
                </div>
              </div>
            )}

            {currentLevel?.layoutInfo.type === 'mechanical' && gameState && (
              <div className="w-full h-full flex flex-col justify-center items-center py-6 relative">
                
                {/* SVG connection gears */}
                <div className="w-80 h-56 bg-black/20 border border-white/5 rounded-2xl relative flex justify-between items-center px-12 overflow-hidden">
                  
                  {/* Peg grid marks */}
                  <div className="absolute inset-0 flex justify-center items-center gap-16 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>

                  {/* Motor gear (Left) - Always spinning */}
                  <div className="absolute left-10 flex flex-col items-center">
                    <Settings 
                      className="w-16 h-16 text-white/20 animate-spin" 
                      style={{ animationDuration: '4s' }}
                    />
                    <span className="text-[8px] text-white/30 mt-1 font-mono">Motor (Drive)</span>
                  </div>

                  {/* Dynamic central linkage gear */}
                  {currentLevel.id === 'me-1' && (
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                      {gameState.gearPlaced ? (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="cursor-pointer"
                          onClick={() => setGameState({ ...gameState, gearPlaced: false, gearSize: '' })}
                        >
                          <Settings 
                            className={`animate-spin text-amber-500 ${
                              gameState.gearSize === 'small' ? 'w-10 h-10' : gameState.gearSize === 'medium' ? 'w-16 h-16' : 'w-24 h-24'
                            }`}
                            style={{ 
                              animationDuration: gameState.gearSize === 'medium' ? '4s' : '2.5s',
                              animationDirection: 'reverse'
                            }}
                          />
                        </motion.div>
                      ) : (
                        <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex justify-center items-center text-[10px] text-white/20">
                          Empty Peg
                        </div>
                      )}
                      <span className="text-[8px] text-white/30 mt-1 font-mono">Shaft</span>
                    </div>
                  )}

                  {currentLevel.id === 'me-2' && (
                    <div className="absolute inset-x-0 flex justify-center gap-12 z-10 pointer-events-none">
                      {/* Peg 1 */}
                      <div 
                        onClick={() => {
                          const pegs = [...gameState.pegsOccupied];
                          if (pegs.includes('peg-1')) {
                            setGameState({ ...gameState, pegsOccupied: pegs.filter(p => p !== 'peg-1') });
                          } else {
                            pegs.push('peg-1');
                            setGameState({ ...gameState, pegsOccupied: pegs });
                          }
                        }}
                        className="pointer-events-auto cursor-pointer"
                      >
                        {gameState.pegsOccupied.includes('peg-1') ? (
                          <Settings 
                            className="w-14 h-14 text-amber-500 animate-spin"
                            style={{ animationDuration: '4s', animationDirection: 'reverse' }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full border border-dashed border-white/10 flex justify-center items-center text-[8px] text-white/20">
                            Peg 1
                          </div>
                        )}
                      </div>

                      {/* Peg 2 */}
                      <div 
                        onClick={() => {
                          const pegs = [...gameState.pegsOccupied];
                          if (pegs.includes('peg-2')) {
                            setGameState({ ...gameState, pegsOccupied: pegs.filter(p => p !== 'peg-2') });
                          } else {
                            pegs.push('peg-2');
                            setGameState({ ...gameState, pegsOccupied: pegs });
                          }
                        }}
                        className="pointer-events-auto cursor-pointer"
                      >
                        {gameState.pegsOccupied.includes('peg-2') ? (
                          <Settings 
                            className="w-14 h-14 text-amber-600 animate-spin"
                            style={{ animationDuration: '4s' }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full border border-dashed border-white/10 flex justify-center items-center text-[8px] text-white/20">
                            Peg 2
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Output Gear (Right) - Spins only when validation passes */}
                  <div className="absolute right-10 flex flex-col items-center">
                    <Settings 
                      className={`w-20 h-20 text-white/20 ${success ? 'animate-spin' : ''}`} 
                      style={{ 
                        animationDuration: '6s',
                        animationDirection: currentLevel.id === 'me-2' ? 'reverse' : 'normal'
                      }}
                    />
                    <span className="text-[8px] text-white/30 mt-1 font-mono">Conveyor Belt</span>
                  </div>

                </div>
              </div>
            )}

            {currentLevel?.layoutInfo.type === 'electrical' && gameState && (
              <div className="w-full h-full flex flex-col justify-center items-center py-6 relative">
                <div className="w-96 h-56 bg-[#0a0a0a] border border-white/5 rounded-2xl relative p-4 flex flex-col justify-between">
                  
                  {/* Schematic wiring paths */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Inputs to Socket */}
                    <line x1="30" y1="60" x2="160" y2="90" stroke={gameState.inputA ? '#8b5cf6' : '#27272a'} strokeWidth="3" />
                    <line x1="30" y1="160" x2="160" y2="130" stroke={gameState.inputB ? '#8b5cf6' : '#27272a'} strokeWidth="3" />
                    
                    {/* Socket to Output */}
                    <line x1="220" y1="110" x2="330" y2="110" stroke={success ? '#10b981' : '#27272a'} strokeWidth="4" />
                  </svg>

                  {/* Input rails */}
                  <div className="flex flex-col justify-between h-40 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-950 border border-purple-500/30 flex justify-center items-center text-[10px] font-mono text-white">1</div>
                      <span className="text-[10px] text-white/30 font-mono">Gen_A (High)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded border flex justify-center items-center text-[10px] font-mono ${
                        gameState.inputB ? 'bg-purple-950 border-purple-500/30 text-white' : 'bg-white/5 border-white/10 text-white/30'
                      }`}>
                        {gameState.inputB ? '1' : '0'}
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">Gen_B ({gameState.inputB ? 'High' : 'Low'})</span>
                    </div>
                  </div>

                  {/* Empty/Filled socket box */}
                  <div 
                    onClick={() => setGameState({ ...gameState, gateType: '' })}
                    className={`absolute left-40 top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl border-2 border-dashed flex flex-col justify-center items-center cursor-pointer transition-all z-10 ${
                      gameState.gateType 
                        ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                        : 'bg-black/20 border-white/10 hover:border-purple-500/20'
                    }`}
                  >
                    {gameState.gateType ? (
                      <>
                        <span className="text-xl font-bold font-mono text-purple-400">{gameState.gateType}</span>
                        <span className="text-[8px] text-white/30">Tap to clear</span>
                      </>
                    ) : (
                      <span className="text-[9px] text-white/20 font-bold uppercase tracking-wider text-center">Place Gate</span>
                    )}
                  </div>

                  {/* LED Indicator target */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className={`w-14 h-14 rounded-full border-2 flex justify-center items-center transition-all ${
                      success 
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_#10b981]' 
                        : 'bg-black/20 border-white/5'
                    }`}>
                      <Cpu className={`w-6 h-6 ${success ? 'text-emerald-400' : 'text-white/20'}`} />
                    </div>
                    <span className="text-[9px] text-white/30 mt-2 font-mono">LED Indicator</span>
                  </div>

                </div>
              </div>
            )}

            {currentLevel?.layoutInfo.type === 'biotech' && gameState && (
              <div className="w-full h-full flex flex-col justify-center items-center py-6 relative">
                
                {/* Receptor pocket SVG */}
                <div className="w-72 h-72 bg-black/20 border border-white/5 rounded-3xl relative overflow-hidden flex justify-center items-center">
                  
                  {/* Target Active Site (Static background receptor) */}
                  <div className="absolute w-36 h-36 rounded-full bg-red-950/20 border-4 border-red-500/20 flex justify-center items-center">
                    <span className="text-[10px] text-red-400/60 font-bold uppercase tracking-wider font-mono">Virus Receptor (-)</span>
                  </div>

                  {/* Rotating Antibody molecule */}
                  <motion.div 
                    animate={{ rotate: gameState.rotation }}
                    transition={{ type: 'spring', stiffness: 80 }}
                    className={`w-32 h-32 rounded-3xl border-2 flex flex-col justify-center items-center cursor-pointer select-none transition-all ${
                      success
                        ? 'bg-rose-500/10 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-indigo-500/10 border-indigo-500/40'
                    }`}
                  >
                    <Dna className="w-10 h-10 text-indigo-400 animate-pulse" />
                    <span className="text-[9px] font-bold mt-2 font-mono uppercase text-white">Antibody (+)</span>
                    <span className="text-[8px] text-white/30">Angle: {gameState.rotation}°</span>
                  </motion.div>

                  {/* Positive charge markers on top of antibody */}
                  <div className="absolute top-4 right-4 text-[9px] text-white/30 font-mono">
                    Alignment: {success ? 'DOCKED (100%)' : 'MISALIGNED'}
                  </div>

                </div>
              </div>
            )}

            {/* Success Overlay Indicator */}
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 text-center z-20 pointer-events-none"
                >
                  <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="bg-[#13171d] border border-emerald-500/30 p-6 rounded-3xl max-w-sm space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.1)] pointer-events-auto"
                  >
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex justify-center items-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 className="text-emerald-400 w-6 h-6 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-emerald-400">Success!</h4>
                      <p className="text-white/60 text-xs">
                        The parameters are perfectly balanced. Click submit to proceed.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
};
