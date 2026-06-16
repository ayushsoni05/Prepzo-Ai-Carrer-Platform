import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Shield, Award, RotateCcw, AlertTriangle, ArrowLeft, Play, Sparkles, Heart, Zap, Cpu } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';
import confetti from 'canvas-confetti';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const DOMAIN_QUESTIONS: Record<string, Question[]> = {
  'Computer Science & IT': [
    { question: 'Which data structure utilizes Last-In-First-Out (LIFO)?', options: ['Queue', 'Stack', 'Linked List'], correctIndex: 1 },
    { question: 'What is the average time complexity of Quick Sort?', options: ['O(N log N)', 'O(N^2)', 'O(N)'], correctIndex: 0 },
    { question: 'Which protocol operates at the Application Layer?', options: ['TCP', 'IP', 'HTTP'], correctIndex: 2 },
    { question: 'What does ACID stand for in DBMS?', options: ['Atomicity, Consistency, Isolation, Durability', 'Algorithm, Cache, Index, Directory', 'Active, Concurrent, Independent, Distributed'], correctIndex: 0 },
    { question: 'Which component is used to manage HTTP requests in microservices?', options: ['Database Router', 'API Gateway', 'Load Balancer'], correctIndex: 1 },
    { question: 'What is the main purpose of DNS in networking?', options: ['Encryping traffic', 'Translating domains to IPs', 'Monitoring bandwidth'], correctIndex: 1 },
    { question: 'Which programming paradigm uses functions as first-class citizens?', options: ['Object-Oriented', 'Procedural', 'Functional'], correctIndex: 2 }
  ],
  'Business Administration & Finance': [
    { question: 'What ratio measures a company\'s short-term liquidity?', options: ['Current Ratio', 'Debt-to-Equity', 'ROI'], correctIndex: 0 },
    { question: 'Which marketing mix represents the "4 Ps"?', options: ['Product, Price, Place, Promotion', 'Plan, Process, People, Profit', 'Position, Public, Platform, Performance'], correctIndex: 0 },
    { question: 'What is the cost of the next best alternative foregone?', options: ['Marginal Cost', 'Opportunity Cost', 'Sunk Cost'], correctIndex: 1 },
    { question: 'What valuation model estimates asset returns based on risk?', options: ['DCF', 'CAPM', 'Black-Scholes'], correctIndex: 1 },
    { question: 'Which type of market structure has a single seller?', options: ['Monopoly', 'Oligopoly', 'Perfect Competition'], correctIndex: 0 },
    { question: 'What does SWOT stand for in strategic planning?', options: ['Sales, Waste, Orders, Taxes', 'Strengths, Weaknesses, Opportunities, Threats', 'Systems, Workflows, Operations, Targets'], correctIndex: 1 },
    { question: 'What is the primary goal of corporate financial management?', options: ['Maximize employee count', 'Maximize shareholder wealth', 'Minimize tax rates'], correctIndex: 1 }
  ],
  'Mechanical & Structural Eng': [
    { question: 'Which law states that stress is directly proportional to strain?', options: ['Hooke\'s Law', 'Newton\'s Second Law', 'Bernoulli\'s Principle'], correctIndex: 0 },
    { question: 'What is the thermodynamic cycle of a standard gasoline engine?', options: ['Rankine Cycle', 'Carnot Cycle', 'Otto Cycle'], correctIndex: 2 },
    { question: 'What property describes a material\'s resistance to scratching?', options: ['Toughness', 'Hardness', 'Ductility'], correctIndex: 1 },
    { question: 'Which ratio relates lateral strain to axial strain?', options: ['Poisson\'s Ratio', 'Young\'s Modulus', 'Shear Modulus'], correctIndex: 0 },
    { question: 'What is the heat transfer mechanism through direct contact?', options: ['Convection', 'Conduction', 'Radiation'], correctIndex: 1 },
    { question: 'What fluid behavior has constant viscosity regardless of stress?', options: ['Newtonian', 'Non-Newtonian', 'Thixotropic'], correctIndex: 0 },
    { question: 'Which structure is designed to transfer loads across a span using triangles?', options: ['Truss', 'Beam', 'Cantilever'], correctIndex: 0 }
  ],
  'Electrical & Electronics Eng': [
    { question: 'What electronic component restricts current flow?', options: ['Resistor', 'Capacitor', 'Inductor'], correctIndex: 0 },
    { question: 'Which theorem simplifies a complex circuit to a voltage source and series resistor?', options: ['Norton\'s Theorem', 'Thevenin\'s Theorem', 'Superposition Theorem'], correctIndex: 1 },
    { question: 'What semiconductor device acts as a one-way switch for current?', options: ['Transistor', 'Diode', 'Op-Amp'], correctIndex: 1 },
    { question: 'Which law relates voltage, current, and resistance?', options: ['Kirchhoff\'s Law', 'Ohm\'s Law', 'Faraday\'s Law'], correctIndex: 1 },
    { question: 'What component stores energy in an electric field?', options: ['Capacitor', 'Inductor', 'Transformer'], correctIndex: 0 },
    { question: 'What type of signal varies continuously in amplitude and time?', options: ['Digital', 'Analog', 'Binary'], correctIndex: 1 },
    { question: 'Which logic gate outputs true only if both inputs are true?', options: ['OR Gate', 'AND Gate', 'XOR Gate'], correctIndex: 1 }
  ],
  'Healthcare & Biotech': [
    { question: 'What molecule carries genetic instructions in living organisms?', options: ['RNA', 'Protein', 'DNA'], correctIndex: 2 },
    { question: 'Which organ is primarily responsible for pumping blood?', options: ['Lung', 'Heart', 'Kidney'], correctIndex: 1 },
    { question: 'What class of drugs is used to treat bacterial infections?', options: ['Antivirals', 'Antibiotics', 'Vaccines'], correctIndex: 1 },
    { question: 'What is the powerhouse of the eukaryotic cell?', options: ['Mitochondria', 'Ribosome', 'Nucleus'], correctIndex: 0 },
    { question: 'Which protein carries oxygen in the blood?', options: ['Insulin', 'Hemoglobin', 'Collagen'], correctIndex: 1 },
    { question: 'What is the process of cell division resulting in two identical cells?', options: ['Meiosis', 'Mitosis', 'Synthesis'], correctIndex: 1 },
    { question: 'Which vitamin is synthesized when skin is exposed to sunlight?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D'], correctIndex: 2 }
  ]
};

// ── 3D Spaceship mesh ─────────────────────────────────────────────────────────
function PlayerShip({ lane }: { lane: number }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Smooth transition between lanes
    const targetX = (lane - 1) * 3.2; // lane values: 0 (left), 1 (center), 2 (right)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.18);
    // Subtle hover/wobble effect
    meshRef.current.position.y = Math.sin(t * 5) * 0.1;
    meshRef.current.rotation.z = -(meshRef.current.position.x - targetX) * 0.25; // Roll while moving
  });

  return (
    <group ref={meshRef} position={[0, 0, 4]}>
      {/* Ship body */}
      <mesh castShadow>
        <coneGeometry args={[0.6, 2, 5]} />
        <meshStandardMaterial 
          color="#818cf8" 
          emissive="#6366f1" 
          emissiveIntensity={0.5} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
      {/* Thruster exhaust glow */}
      <mesh position={[0, -1.1, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#f472b6" />
      </mesh>
    </group>
  );
}

// ── 3D Gates & Obstacles ──────────────────────────────────────────────────────
interface Item {
  id: string;
  type: 'gate' | 'obstacle';
  z: number;
  lane: number; // 0, 1, 2
  color: string;
  isCorrectLane?: boolean;
}

function GameItems({ items, playerLane, onCollision }: { items: Item[], playerLane: number, onCollision: (item: Item) => void }) {
  const itemsRef = useRef<THREE.Group>(null);
  const hitRecord = useRef<Record<string, boolean>>({});

  useFrame(() => {
    // Check collision dynamically (at z near ship, z around 3.5 - 4.5)
    items.forEach((item) => {
      if (item.z > 3.4 && item.z < 4.6) {
        if (!hitRecord.current[item.id]) {
          if (item.lane === playerLane) {
            hitRecord.current[item.id] = true;
            onCollision(item);
          }
        }
      }
    });
  });

  return (
    <group ref={itemsRef}>
      {items.map((item) => {
        const xPos = (item.lane - 1) * 3.2;
        return (
          <group key={item.id} position={[xPos, 0, item.z]}>
            {item.type === 'gate' ? (
              // Knowledge Gate Portal Ring
              <mesh>
                <torusGeometry args={[1.2, 0.15, 8, 24]} />
                <meshStandardMaterial 
                  color={item.color}
                  emissive={item.color} 
                  emissiveIntensity={0.8}
                  roughness={0.1}
                />
              </mesh>
            ) : (
              // Red Obstacle Cube
              <mesh>
                <boxGeometry args={[1.1, 1.1, 1.1]} />
                <meshStandardMaterial 
                  color="#ef4444" 
                  emissive="#ef4444" 
                  emissiveIntensity={0.8} 
                  roughness={0.2}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// ── 3D Ground Grid ──────────────────────────────────────────────────────────
function RoadGrid({ hyperdrive }: { hyperdrive: boolean }) {
  const gridRef1 = useRef<THREE.GridHelper>(null);
  const gridRef2 = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = hyperdrive ? 25 : 12;
    const offset = -(t * speed) % 10;
    if (gridRef1.current) gridRef1.current.position.z = offset + 5;
    if (gridRef2.current) gridRef2.current.position.z = offset - 5;
  });

  const color = hyperdrive ? '#fbbf24' : '#6366f1';

  return (
    <>
      <gridHelper 
        ref={gridRef1} 
        args={[30, 15, color, '#1e293b']} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, -1.5, 0]} 
      />
      <gridHelper 
        ref={gridRef2} 
        args={[30, 15, color, '#1e293b']} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, -1.5, -10]} 
      />
    </>
  );
}

export const DomainRunner3D = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [selectedDomain, setSelectedDomain] = useState<string>('Computer Science & IT');
  const [highScore, setHighScore] = useState<number>(0);
  
  // Game state variables
  const [score, setScore] = useState(0);
  const [shield, setShield] = useState(100);
  const [streak, setStreak] = useState(0);
  const [hyperdrive, setHyperdrive] = useState(false);
  
  // Questions tracking
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [laneAnswers, setLaneAnswers] = useState<string[]>(['', '', '']);
  const [correctLane, setCorrectLane] = useState<number>(1);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const [lane, setLane] = useState<number>(1); // 0: Left, 1: Center, 2: Right
  const [items, setItems] = useState<Item[]>([]);
  const itemsRef = useRef<Item[]>([]);
  const gameLoopIntervalRef = useRef<number | null>(null);

  // Fetch High Scores on Start
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/games/stats');
        if (res.data?.success && res.data.data) {
          const stats = res.data.data;
          setHighScore(stats.domainRunner3D?.highScore || 0);
          // Set initial domain based on profile
          if (stats.user?.fieldOfStudy && DOMAIN_QUESTIONS[stats.user.fieldOfStudy]) {
            setSelectedDomain(stats.user.fieldOfStudy);
          }
        }
      } catch (err) {
        console.error('Failed to fetch initial stats', err);
      }
    };
    fetchStats();
  }, []);

  // Handle Lane Navigation Keyboard Inputs
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setLane((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setLane((prev) => Math.min(2, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Set up dynamic questions and answers
  const loadNextQuestion = (domain: string, index: number) => {
    const questions = DOMAIN_QUESTIONS[domain];
    const nextIdx = index % questions.length;
    const q = questions[nextIdx];
    setCurrentQuestion(q);
    setQIndex(nextIdx);

    // Shuffle options into lanes
    const optionIndexes = [0, 1, 2];
    // We want to map each option index to one of the lanes (0, 1, 2)
    // Find where the correct answer maps
    const optionsMap = [...q.options];
    setLaneAnswers(optionsMap);
    setCorrectLane(q.correctIndex);
  };

  // Main game loop logic to move items
  useEffect(() => {
    if (gameState !== 'playing') return;

    // Spawn initial items
    spawnBatch();

    const gameSpeed = hyperdrive ? 0.9 : 0.5;
    gameLoopIntervalRef.current = window.setInterval(() => {
      // 1. Move items closer
      setItems((prevItems) => {
        const moved = prevItems
          .map((item) => ({ ...item, z: item.z + gameSpeed }))
          .filter((item) => item.z < 8); // remove items that went past
        
        itemsRef.current = moved;

        // If no gates are in queue, spawn a new batch
        const hasGatesAhead = moved.some(item => item.type === 'gate' && item.z < 0);
        if (!hasGatesAhead && moved.length <= 2) {
          spawnBatch();
        }
        
        return moved;
      });
    }, 16); // ~60fps movement loop

    return () => {
      if (gameLoopIntervalRef.current) clearInterval(gameLoopIntervalRef.current);
    };
  }, [gameState, hyperdrive, qIndex]);

  // Spawns a set of gates and optional obstacle
  const spawnBatch = () => {
    // Generate new gates at z = -45
    const zPos = -45;
    const batchId = Math.random().toString(36).substring(2, 9);
    
    // Select current question info
    const questions = DOMAIN_QUESTIONS[selectedDomain];
    const q = questions[qIndex];

    const newItems: Item[] = [];

    // Spawn 3 gates corresponding to the 3 options
    for (let i = 0; i < 3; i++) {
      const isCorrect = i === q.correctIndex;
      newItems.push({
        id: `gate-${batchId}-${i}`,
        type: 'gate',
        z: zPos,
        lane: i,
        color: isCorrect ? '#10b981' : '#f472b6', // Green for correct, Pink for incorrect
        isCorrectLane: isCorrect
      });
    }

    // Occasional obstacle spawns slightly ahead (z = -30) in a random lane
    if (Math.random() > 0.4) {
      const obstacleLane = Math.floor(Math.random() * 3);
      newItems.push({
        id: `obs-${batchId}`,
        type: 'obstacle',
        z: zPos + 15, // Closer to ship initially than the gates
        lane: obstacleLane,
        color: '#ef4444'
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  // Check collision with gate or obstacle
  const handleCollision = (item: Item) => {
    if (item.type === 'obstacle') {
      // Hit obstacle
      setShield((prev) => {
        const next = Math.max(0, prev - 25);
        if (next <= 0) endGame();
        return next;
      });
      setStreak(0);
      setHyperdrive(false);
      triggerFeedback('COLLISION! -25 Shield', false);
    } else if (item.type === 'gate') {
      if (item.isCorrectLane) {
        // Correct Answer!
        setScore((prev) => prev + 100);
        setStreak((prev) => {
          const next = prev + 1;
          if (next >= 5) {
            setHyperdrive(true);
            triggerFeedback('HYPERDRIVE ENGAGED! +200', true);
            confetti({ particleCount: 40, spread: 60, colors: ['#fbbf24', '#f59e0b'] });
          } else {
            triggerFeedback('CORRECT! +100', true);
          }
          return next;
        });
        
        // Progress to next question
        setTimeout(() => {
          loadNextQuestion(selectedDomain, qIndex + 1);
        }, 300);
      } else {
        // Wrong Answer
        setShield((prev) => {
          const next = Math.max(0, prev - 20);
          if (next <= 0) endGame();
          return next;
        });
        setStreak(0);
        setHyperdrive(false);
        triggerFeedback('WRONG ANSWER! -20 Shield', false);
        
        // Push question ahead anyway after delay
        setTimeout(() => {
          loadNextQuestion(selectedDomain, qIndex + 1);
        }, 500);
      }
    }
  };

  const triggerFeedback = (text: string, success: boolean) => {
    setFeedback({ text, success });
    setTimeout(() => setFeedback(null), 1500);
  };

  const startGame = () => {
    setScore(0);
    setShield(100);
    setStreak(0);
    setHyperdrive(false);
    setLane(1);
    setItems([]);
    setFeedback(null);
    loadNextQuestion(selectedDomain, 0);
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('gameover');
    if (gameLoopIntervalRef.current) clearInterval(gameLoopIntervalRef.current);
  };

  const saveScore = async () => {
    try {
      const res = await api.post('/domain-runner/report', {
        score,
        domain: selectedDomain
      });

      if (res.data?.success) {
        const { earnedXp } = res.data.data;
        showSuccess(`Run reported! Gained +${earnedXp} XP`);
        if (score > highScore) setHighScore(score);
        setGameState('start');
      }
    } catch (err) {
      showError('Failed to save score. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-20 px-4 pb-12 relative overflow-hidden font-rubik">
      {/* Dynamic Background Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-radial-at-c from-purple-900/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-120px)] justify-between relative z-10">
        {/* START SCREEN */}
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
            >
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-3xl mb-6 flex items-center justify-center">
                <Compass className="w-12 h-12 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
              </div>

              <h1 className="text-4xl md:text-6xl font-[900] uppercase tracking-tighter italic mb-4">
                Domain Runner <span className="text-purple-400">3D.</span>
              </h1>
              <p className="text-white/40 text-sm font-medium tracking-tight mb-8 max-w-md italic leading-relaxed">
                Test your knowledge in your domain of study. Steer the ship through correct portal answers while avoiding dangerous space obstacles!
              </p>

              {/* Selector */}
              <div className="w-full bg-[#13171d] border border-white/5 rounded-3xl p-6 mb-8 text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Select Learning Domain
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(DOMAIN_QUESTIONS).map((domainName) => (
                    <button
                      key={domainName}
                      onClick={() => setSelectedDomain(domainName)}
                      className={`p-3.5 rounded-2xl border text-xs font-black uppercase tracking-wider text-left transition-all flex items-center justify-between ${selectedDomain === domainName ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-black/20 border-white/5 text-white/60 hover:border-white/10'}`}
                    >
                      <span>{domainName}</span>
                      {selectedDomain === domainName && <Sparkles className="w-4 h-4 text-purple-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Score Banner */}
              <div className="flex items-center gap-6 mb-8 bg-[#161a20] border border-white/10 rounded-2xl px-6 py-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Personal Best</span>
                </div>
                <span className="text-xl font-[900] text-yellow-400">{highScore} pts</span>
              </div>

              <div className="flex gap-4 w-full max-w-sm">
                <button
                  onClick={() => navigateTo('game-lobby')}
                  className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Lobby
                </button>
                <button
                  onClick={startGame}
                  className="flex-[2] py-4 bg-white text-black hover:bg-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-black" /> Launch ship
                </button>
              </div>
            </motion.div>
          )}

          {/* ACTIVE GAMEPLAY */}
          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col relative"
            >
              {/* HUD / Score bar */}
              <div className="flex items-center justify-between p-4 bg-[#13171d]/60 border border-white/5 rounded-2xl backdrop-blur-md mb-4 relative z-20">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/40">Shield:</span>
                  </div>
                  <div className="w-32 bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${shield > 50 ? 'bg-emerald-500' : shield > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${shield}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Multiplier</p>
                    <p className={`text-base font-black ${hyperdrive ? 'text-yellow-400' : 'text-purple-400'}`}>{streak}x</p>
                  </div>
                  <div className="text-right border-l border-white/10 pl-6">
                    <p className="text-[9px] font-black uppercase tracking-wider text-white/30">Score</p>
                    <p className="text-base font-[900] text-white">{score}</p>
                  </div>
                </div>
              </div>

              {/* 3D Canvas Container */}
              <div className="flex-1 bg-black/40 border border-white/5 rounded-[30px] relative overflow-hidden h-[380px] min-h-[300px]">
                <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 1.5, 8], fov: 60 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} />
                  <directionalLight 
                    position={[0, 10, 0]} 
                    intensity={1.0} 
                    castShadow 
                    shadow-mapSize={[1024, 1024]} 
                  />
                  <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1.5} />
                  <PlayerShip lane={lane} />
                  <GameItems 
                    items={items} 
                    playerLane={lane} 
                    onCollision={handleCollision} 
                  />
                  <RoadGrid hyperdrive={hyperdrive} />
                </Canvas>

                {/* Question overlay panel */}
                {currentQuestion && (
                  <div className="absolute top-4 left-4 right-4 bg-black/80 border border-white/10 p-5 rounded-2xl text-center backdrop-blur-md relative z-10">
                    <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                      {selectedDomain}
                    </span>
                    <h2 className="text-sm md:text-base font-[900] tracking-tight mt-2">{currentQuestion.question}</h2>
                  </div>
                )}

                {/* Answers / Lanes UI Overlay */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                  {laneAnswers.map((answer, index) => {
                    const isLaneActive = lane === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setLane(index)}
                        className={`py-3.5 px-3 rounded-xl border text-center transition-all ${isLaneActive ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-black/70 border-white/10 text-white/60 hover:bg-black/90'} focus:outline-none`}
                      >
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                          {index === 0 ? 'LEFT [A / ←]' : index === 1 ? 'CENTER [S / ↓]' : 'RIGHT [D / →]'}
                        </p>
                        <p className="text-xs font-black uppercase tracking-wider truncate">{answer || '...'}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Indicator */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 20 }}
                      className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none z-30`}
                    >
                      <div className={`px-6 py-4 rounded-3xl border flex items-center gap-3 shadow-2xl ${feedback.success ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
                        {feedback.success ? <Zap className="w-6 h-6 animate-bounce" /> : <AlertTriangle className="w-6 h-6" />}
                        <span className="text-sm font-black uppercase tracking-widest">{feedback.text}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Instructions and Back Button */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/30 font-bold uppercase tracking-wider">
                <span>Steer using arrow keys or A/D keys</span>
                <button 
                  onClick={endGame}
                  className="hover:text-white transition-all outline-none"
                >
                  Abort Mission
                </button>
              </div>
            </motion.div>
          )}

          {/* GAME OVER MODAL */}
          {gameState === 'gameover' && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center"
            >
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-3xl mb-6">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>

              <h1 className="text-4xl font-[900] uppercase tracking-tighter italic mb-2">
                System <span className="text-red-500">Crashed.</span>
              </h1>
              <p className="text-white/40 text-xs font-medium tracking-tight mb-8">
                Your ship sustained critical damage. Shields depleted.
              </p>

              {/* Stats Box */}
              <div className="w-full bg-[#13171d] border border-white/5 rounded-3xl p-6 mb-8 text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Domain Selected</span>
                  <span className="text-xs font-black uppercase tracking-wider text-purple-400">{selectedDomain}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">Score Achieved</span>
                  <span className="text-base font-black text-white">{score} pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-white/40">XP Estimate</span>
                  <span className="text-sm font-black text-emerald-400">+{Math.max(10, Math.min(150, Math.floor(score * 0.5)))} XP</span>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setGameState('start')}
                  className="flex-1 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={saveScore}
                  className="flex-[2] py-4 bg-white text-black hover:bg-gray-200 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-black" /> Save & Exit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
