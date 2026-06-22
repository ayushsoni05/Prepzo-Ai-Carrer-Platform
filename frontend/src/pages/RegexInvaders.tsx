import React, { useState, useEffect, useRef } from 'react';
import { Target, Heart, Award, Home, RotateCcw, Play, ShieldAlert, Sparkles } from 'lucide-react';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import toast from 'react-hot-toast';

interface Invader {
  id: string;
  text: string;
  x: number;
  y: number;
  speed: number;
  width: number;
  isObjective: boolean; // True if this text matches the level's target type
}

interface Level {
  id: number;
  name: string;
  objective: string;
  targetDescription: string;
  targets: string[];
  distractors: string[];
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Numbers & Digits',
    objective: 'Match exact 3-digit numbers (e.g., 100 to 999)',
    targetDescription: 'Write a regex that matches exactly 3 digits. Example: ^\\d{3}$',
    targets: ['123', '456', '789', '999', '500'],
    distractors: ['12', 'abc', '1234', '9.9', '0']
  },
  {
    id: 2,
    name: 'Phone Format',
    objective: 'Match US phone formats (e.g., 123-456-7890)',
    targetDescription: 'Write a regex matching 3 digits, a dash, 3 digits, a dash, and 4 digits. Example: ^\\d{3}-\\d{3}-\\d{4}$',
    targets: ['123-456-7890', '999-000-1111', '555-555-5555'],
    distractors: ['1234567890', '123-4567', 'abc-def-ghij']
  },
  {
    id: 3,
    name: 'Email Handles',
    objective: 'Match standard email formats (e.g. user@domain.com)',
    targetDescription: 'Write a basic email matching regex. Example: ^[a-z0-9]+@[a-z]+\\.[a-z]{2,3}$',
    targets: ['ayush@test.com', 'user@domain.org', 'coder@code.in'],
    distractors: ['ayush@test', 'ayush.com', '@domain.com', 'abc@.com']
  },
  {
    id: 4,
    name: 'IP Addresses',
    objective: 'Match standard IPv4 addresses (e.g., 192.168.1.1)',
    targetDescription: 'Write a simplified regex for four numbers separated by dots. Example: ^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$',
    targets: ['192.168.1.1', '10.0.0.1', '255.255.255.0'],
    distractors: ['192.168.1', '192.168.1.256.1', 'abc.def.ghi.jkl']
  }
];

export const RegexInvaders = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [levelIdx, setLevelIdx] = useState(0);
  const [regexInput, setRegexInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'victory'>('start');
  const [earnedXp, setEarnedXp] = useState(0);

  // Gameplay lists
  const invadersRef = useRef<Invader[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const currentLevel = LEVELS[levelIdx];

  useEffect(() => {
    if (gameState !== 'playing') return;

    // Start game elements
    spawnInvaders();
    const loop = () => {
      updateGame();
      drawGame();
      animationFrameIdRef.current = requestAnimationFrame(loop);
    };
    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [gameState, levelIdx]);

  const spawnInvaders = () => {
    const level = LEVELS[levelIdx];
    const newInvaders: Invader[] = [];
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 800;

    // Spawn 3 targets and 2 distractors
    const list = [
      ...level.targets.map(text => ({ text, isObjective: true })),
      ...level.distractors.map(text => ({ text, isObjective: false }))
    ];

    // Shuffle list
    list.sort(() => Math.random() - 0.5);

    list.forEach((item, idx) => {
      newInvaders.push({
        id: Math.random().toString(),
        text: item.text,
        x: Math.floor(Math.random() * (width - 150)) + 50,
        y: -30 - (idx * 80), // Cascade starting positions
        speed: 0.8 + (levelIdx * 0.2), // Speed increases with levels
        width: item.text.length * 10 + 40,
        isObjective: item.isObjective
      });
    });

    invadersRef.current = newInvaders;
  };

  const updateGame = () => {
    const invaders = invadersRef.current;
    const canvas = canvasRef.current;
    const height = canvas ? canvas.height : 500;

    for (let i = invaders.length - 1; i >= 0; i--) {
      const inv = invaders[i];
      inv.y += inv.speed;

      // Check if it reached the bottom
      if (inv.y > height - 10) {
        if (inv.isObjective) {
          // Player missed a mandatory target -> lose a life
          setLives(prev => {
            const nextLives = prev - 1;
            if (nextLives <= 0) {
              endGame(false);
            }
            return nextLives;
          });
          toast.error(`Target "${inv.text}" breached security!`);
        }
        invaders.splice(i, 1);
      }
    }

    // If all targets are clear, level is won!
    const activeObjectives = invaders.filter(inv => inv.isObjective);
    if (activeObjectives.length === 0 && invaders.length === 0) {
      handleLevelComplete();
    }
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw Invaders
    const invaders = invadersRef.current;
    invaders.forEach(inv => {
      // Card Frame
      ctx.fillStyle = inv.isObjective ? 'rgba(94, 210, 156, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      ctx.strokeStyle = inv.isObjective ? '#5ed29c' : '#3b82f6';
      ctx.lineWidth = 1.5;
      
      // Rounded Card Drawing
      const radius = 12;
      ctx.beginPath();
      ctx.roundRect(inv.x - inv.width / 2, inv.y - 18, inv.width, 36, radius);
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(inv.text, inv.x, inv.y);
    });

    // Draw bottom barrier
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 5);
    ctx.lineTo(canvas.width, canvas.height - 5);
    ctx.stroke();
  };

  const handleLevelComplete = () => {
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);

    const nextLvl = levelIdx + 1;
    if (nextLvl < LEVELS.length) {
      setLevelIdx(nextLvl);
      toast.success(`Level ${levelIdx + 1} Complete! Advancing to ${LEVELS[nextLvl].name}`);
    } else {
      endGame(true);
    }
  };

  const handleFireCannon = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing') return;

    if (!regexInput.trim()) return;

    try {
      // Build regular expression safely
      const regex = new RegExp(regexInput);
      const invaders = invadersRef.current;
      let hitCount = 0;
      let penaltyCount = 0;

      for (let i = invaders.length - 1; i >= 0; i--) {
        const inv = invaders[i];
        
        // Check if regex matches the text
        if (regex.test(inv.text)) {
          if (inv.isObjective) {
            // Success hit!
            hitCount++;
            invaders.splice(i, 1);
            setScore(prev => prev + 100);
          } else {
            // Collateral damage -> hit a friendly block
            penaltyCount++;
            invaders.splice(i, 1);
            setLives(prev => {
              const nextLives = prev - 1;
              if (nextLives <= 0) {
                endGame(false);
              }
              return nextLives;
            });
          }
        }
      }

      if (hitCount > 0) {
        toast.success(`Boom! Neutralized ${hitCount} target(s).`);
        setRegexInput('');
      } else if (penaltyCount > 0) {
        toast.error('Collateral Damage! You matched a friendly block.');
      } else {
        toast.error('Miss! No targets matched that regular expression.');
      }

    } catch (err) {
      toast.error('Invalid Regex syntax. Check your brackets or operators.');
    }
  };

  const endGame = async (victory: boolean) => {
    setGameState(victory ? 'victory' : 'gameover');
    if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);

    try {
      const response = await api.post('/games/regex/report', {
        score,
        level: levelIdx + 1
      });
      setEarnedXp(response.data?.data?.earnedXp || 0);
    } catch (err) {
      console.error('Failed to report regex outcome', err);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setLevelIdx(0);
    setRegexInput('');
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 px-6 pb-20 font-rubik flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* Game Lobby Panel / Overlay */}
        {gameState === 'start' && (
          <div className="bg-[#13171d] border border-white/5 rounded-[40px] p-10 text-center max-w-lg mx-auto shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <Target className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Regex Invaders</h2>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              Defend your firewall! Formulate matching JavaScript regular expressions to shoot down incoming data packets before they breach your security lines.
            </p>
            <button
              onClick={() => setGameState('playing')}
              className="w-full py-4 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              Launch Cannon
            </button>
          </div>
        )}

        {/* Gameplay Panels */}
        {gameState === 'playing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Play Area Canvas (Left 2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#13171d] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl">
                <canvas 
                  ref={canvasRef} 
                  width={600} 
                  height={450} 
                  className="w-full h-auto aspect-[4/3] block bg-[#0d1117]" 
                />
              </div>

              {/* Input Controller */}
              <form onSubmit={handleFireCannon} className="flex gap-4">
                <input 
                  type="text" 
                  value={regexInput}
                  onChange={(e) => setRegexInput(e.target.value)}
                  placeholder="Type JS Regex pattern (e.g., ^\d{3}$)..." 
                  className="flex-1 px-5 py-4 bg-[#13171d] border border-white/5 rounded-2xl text-white outline-none focus:border-emerald-500/30 transition-all font-mono text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-[900] uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  Fire
                </button>
              </form>
            </div>

            {/* Sidebar Level & Info (Right 1 col) */}
            <div className="space-y-6">
              {/* Level Objectives */}
              <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Active Level {currentLevel.id}</p>
                  <h3 className="text-xl font-[900] text-emerald-400">{currentLevel.name}</h3>
                </div>

                <div className="p-4 bg-black/30 border border-white/5 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-yellow-400">
                    <ShieldAlert className="w-4 h-4" />
                    Target Objective:
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-bold">{currentLevel.objective}</p>
                </div>

                <div className="text-xs text-white/50 leading-relaxed font-medium bg-white/[0.01] p-4 border border-white/5 rounded-2xl">
                  <span className="font-bold text-white block mb-1">Tip:</span>
                  {currentLevel.targetDescription}
                </div>
              </div>

              {/* Status Stats Panel */}
              <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-xs font-bold text-white/40 uppercase">Shield Health:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500 animate-pulse' : 'text-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Match Score</p>
                  <p className="text-2xl font-[900] text-emerald-400 italic">{score}</p>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Level Index</p>
                  <p className="text-2xl font-[900] text-blue-400 italic">{levelIdx + 1} / 4</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* End Game Outcome Panel */}
        {(gameState === 'gameover' || gameState === 'victory') && (
          <div className="bg-[#13171d] border border-white/5 rounded-[40px] p-10 text-center max-w-lg mx-auto shadow-2xl space-y-8">
            <div>
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-4xl font-[900] uppercase tracking-tighter italic">
                {gameState === 'victory' ? (
                  <span className="text-emerald-400">Perfect Clear!</span>
                ) : (
                  <span className="text-red-500">Shield Failed</span>
                )}
              </h2>
              <p className="text-sm font-bold text-white/40 uppercase tracking-widest mt-2">Regex Invaders Complete</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 bg-black/25 border border-white/5 p-6 rounded-2xl">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total Score</p>
                <p className="text-2xl font-[900] text-emerald-400 italic">{score} pts</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Max Level</p>
                <p className="text-2xl font-[900] text-blue-400 italic">Level {levelIdx + 1}</p>
              </div>
            </div>

            {/* XP Award Alert */}
            {earnedXp > 0 && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl text-emerald-400 flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Congratulations! Earned +{earnedXp} XP</span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={restartGame}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2 text-white"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Run
              </button>
              <button
                onClick={() => navigateTo('game-lobby')}
                className="flex-1 py-4 bg-white text-black hover:bg-gray-200 font-[900] uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Lobby Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
