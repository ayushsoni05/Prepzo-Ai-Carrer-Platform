import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clear, Sparkles, ShieldCheck, Terminal, AlertTriangle, HelpCircle, PenTool, Square, Circle, Type, Eye, Trash2, Cpu, Users } from 'lucide-react';
import { io } from 'socket.io-client';
import api from '../api/axios';
import { navigateTo } from '@/utils/navigation';
import { showSuccess, showError } from '@/utils/toastManager';

export const SystemWhiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const socketRef = useRef<any>(null);

  const [tool, setTool] = useState<'pen' | 'rect' | 'circle' | 'text'>('pen');
  const [color, setColor] = useState('#ffffff');
  const [isDrawing, setIsDrawing] = useState(false);
  const [roomId] = useState('system-design-main-room'); // Default room
  
  const [auditsCount, setAuditsCount] = useState(0);
  const [auditReport, setAuditReport] = useState<string[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [peerConnected, setPeerConnected] = useState(false);

  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);

  // Canvas context initialization & Socket connection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Support high-resolution displays
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = 3;
    contextRef.current = context;

    // Connect to Socket.io backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const socket = io(backendUrl, {
      withCredentials: true
    });
    socketRef.current = socket;

    socket.emit('join_whiteboard', { roomId });

    socket.on('peer_joined_whiteboard', () => {
      setPeerConnected(true);
      showSuccess('Peer joined collaborative whiteboard session!');
    });

    socket.on('draw_line_update', ({ x1, y1, x2, y2, color: peerColor, tool: peerTool }) => {
      drawRemote(x1, y1, x2, y2, peerColor, peerTool);
    });

    socket.on('clear_whiteboard_update', () => {
      clearLocalCanvas();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Update canvas color when state changes
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
    }
  }, [color]);

  const drawRemote = (x1: number, y1: number, x2: number, y2: number, peerColor: string, peerTool: string) => {
    const context = contextRef.current;
    if (!context) return;

    context.strokeStyle = peerColor;
    context.beginPath();
    
    if (peerTool === 'pen') {
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    } else if (peerTool === 'rect') {
      context.strokeRect(x1, y1, x2 - x1, y2 - y1);
    } else if (peerTool === 'circle') {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      context.arc(x1, y1, radius, 0, 2 * Math.PI);
      context.stroke();
    }
    context.strokeStyle = color; // Reset to local color
  };

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    
    if (tool === 'text') {
      const text = prompt('Enter text node:');
      if (text && contextRef.current) {
        contextRef.current.fillStyle = color;
        contextRef.current.font = '14px font-mono';
        contextRef.current.fillText(text, offsetX, offsetY);
        
        // Broadcast text node drawing
        socketRef.current.emit('draw_line', {
          roomId,
          data: { x1: offsetX, y1: offsetY, x2: offsetX, y2: offsetY, color, tool: 'text' }
        });
      }
      return;
    }

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;

    // Draw only on pen tool continuously. For shapes, we draw on mouse up to keep it clean.
    if (tool === 'pen') {
      const canvas = canvasRef.current;
      const x1 = offsetX; // Simplified tracking
      const y1 = offsetY; // Just draw directly
      
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();

      // Broadcast coordinate update
      socketRef.current.emit('draw_line', {
        roomId,
        data: { x1: offsetX, y1: offsetY, x2: offsetX, y2: offsetY, color, tool: 'pen' }
      });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearLocalCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearWhiteboard = () => {
    clearLocalCanvas();
    socketRef.current.emit('clear_whiteboard', { roomId });
    showSuccess('Whiteboard cleared.');
  };

  // Simulated AI Architect Auditor audits system architectures
  const runAIAudit = async () => {
    setIsAuditing(true);
    setAuditReport(['[SYS_INFO] Fetching architectural nodes configurations...', '[AUDIT] Initializing AI Architect Audit Co-Pilot...']);
    
    const auditsList = [
      [
        `[AUDIT_FAIL] Single Point of Failure (SPOF) detected at Database node.`,
        `[RECOMMENDATION] Introduce a Master-Slave replication setup or Read Replicas to secure database availability.`,
        `[AUDIT_WARN] High Write operations rate without queue buffer.`,
        `[RECOMMENDATION] Add an Apache Kafka or RabbitMQ event queue before database queries controller.`
      ],
      [
        `[AUDIT_FAIL] Read latency bottleneck identified at Web Application instance.`,
        `[RECOMMENDATION] Introduce a Redis Cache node before checking DB queries to lower query response latencies.`,
        `[AUDIT_INFO] Scalability index: 68/100. Horizontal auto-scaler check passed.`
      ],
      [
        `[AUDIT_FAIL] Insecure transmission vector detected. Raw HTTP channels configured.`,
        `[RECOMMENDATION] Enforce HTTPS termination TLS certs at AWS Application Load Balancer (ALB).`,
        `[AUDIT_SUCCESS] System availability score: 99.999% with multi-region failovers.`
      ]
    ];

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedAudit = auditsList[auditsCount % auditsList.length];
    setAuditReport(prev => [...prev, ...selectedAudit, '[AUDIT_COMPLETED] AI audit complete. Recommendations logged.']);
    setAuditsCount(prev => prev + 1);
    setIsAuditing(false);
    showSuccess('AI Architecture Audit completed!');
  };

  const submitWhiteboardResult = async () => {
    if (auditsCount === 0) {
      showError('Please run at least one AI Architecture Audit before submitting!');
      return;
    }

    try {
      const response = await api.post('/api/whiteboard/report', {
        audits: auditsCount
      });

      if (response.data?.success) {
        setXpEarned(response.data.data.earnedXp);
        const originalBadges = response.data.data.stats?.badges || [];
        setUnlockedBadges(originalBadges);
        setShowOutcomeModal(true);
        showSuccess('System Design Whiteboard stats logged.');
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to submit whiteboard results.');
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
              <h1 className="text-3xl font-[900] uppercase tracking-tighter italic">System <span className="text-purple-400">Whiteboard.</span></h1>
              <p className="text-xs text-white/40 font-medium tracking-wide">Draw high-availability system designs and trigger AI bottleneck audits.</p>
            </div>
          </div>

          {/* Connection status */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#13171d] border border-white/5 rounded-2xl text-xs font-bold text-white/50">
            {peerConnected ? (
              <>
                <Users className="w-4 h-4 text-[#00ff9d]" />
                <span>Multiplayer Active (Peer connected)</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
                <span>AI Architect Co-Pilot Active</span>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Canvas */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Canvas Toolbar */}
            <div className="bg-[#13171d] border border-white/5 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {[
                  { id: 'pen', icon: PenTool, label: 'Pen' },
                  { id: 'rect', icon: Square, label: 'Rectangle' },
                  { id: 'circle', icon: Circle, label: 'Circle' },
                  { id: 'text', icon: Type, label: 'Text' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTool(item.id as any)}
                    className={`p-2.5 rounded-xl border transition-all ${tool === item.id ? 'bg-purple-500 border-purple-500 text-white' : 'bg-black/45 border-white/5 text-white/40 hover:text-white'}`}
                    title={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Colors */}
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
                {['#ffffff', '#a855f7', '#10b981', '#f43f5e', '#f59e0b', '#3b82f6'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-5 h-5 rounded-full border transition-all ${color === c ? 'border-white scale-110' : 'border-transparent scale-100 hover:scale-105'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <button
                onClick={clearWhiteboard}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-xs font-black uppercase text-red-400 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear Board
              </button>
            </div>

            {/* Canvas Board */}
            <div className="rounded-[30px] border border-white/5 bg-[#13171d] h-[480px] overflow-hidden relative shadow-2xl">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full cursor-crosshair bg-black/45"
              />
            </div>

          </div>

          {/* Right panel: AI Audit */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* AI Auditor Console */}
            <div className="bg-[#13171d] border border-white/5 rounded-[30px] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <h2 className="text-sm font-black uppercase tracking-wider text-white/40">Architect Audit Logs</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Audits: {auditsCount}</span>
              </div>

              <div className="h-64 bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-[#00ff9d] overflow-y-auto space-y-2.5 custom-scrollbar">
                {auditReport.length === 0 ? (
                  <div className="text-white/20 italic">Place design components (Load Balancer, Web application server, Database instance) on board and click "Audit Architecture".</div>
                ) : (
                  auditReport.map((log, i) => (
                    <div key={i} className={log.includes('[AUDIT_FAIL]') ? 'text-red-500 font-bold' : log.includes('[RECOMMENDATION]') ? 'text-yellow-400 font-bold' : log.includes('AUDIT_COMPLETED') ? 'text-emerald-400 font-bold font-black' : ''}>
                      {log}
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={runAIAudit}
                  disabled={isAuditing}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 shadow-xl shadow-purple-600/10 active:scale-95 transition-all rounded-xl font-[900] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  {isAuditing ? 'Analyzing architecture...' : 'Audit Architecture'}
                </button>

                <button
                  onClick={submitWhiteboardResult}
                  className="w-full py-4 bg-[#00ff9d] text-black hover:bg-emerald-400 shadow-xl shadow-[#00ff9d]/5 rounded-xl font-[900] uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Submit Design Session
                </button>
              </div>
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
                <ShieldCheck className="w-10 h-10 text-purple-400" />
              </div>
              
              <h2 className="text-3xl font-[900] uppercase tracking-tighter italic">Session <span className="text-purple-400">Completed!</span></h2>
              
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-3 max-w-sm mx-auto text-left">
                <div className="flex justify-between text-xs font-bold text-white/50 uppercase">
                  <span>Architecture Audits</span>
                  <span className="text-white font-black">{auditsCount} run</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex justify-between text-sm font-black text-purple-400 uppercase tracking-wider">
                  <span>XP Gained</span>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              {/* Show System Architect badge unlock */}
              {unlockedBadges.includes('System Architect') && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center gap-3 text-yellow-400 max-w-sm mx-auto">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <div className="text-left text-xs">
                    <p className="font-black uppercase tracking-wider">New Badge Unlocked!</p>
                    <p className="font-bold text-yellow-400/60 mt-0.5">System Architect (Analyzed 4 system diagrams)</p>
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
export default SystemWhiteboard;
