import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, FileText, ChevronRight, BarChart3, 
  DollarSign, Briefcase, Sparkles, AlertTriangle, Play,
  Upload, Mic, MicOff, Send, Volume2, VolumeX, TrendingUp,
  Brain, User, Heart, ShieldAlert, CheckCircle, MessageSquare,
  RotateCcw, Compass, ArrowRight, UserCheck
} from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import toast from 'react-hot-toast';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { parseOfferLetter, OfferData, startNegotiation, sendNegotiationMessage, completeNegotiation } from '@/api/offer';
import { useSpeech } from '@/hooks/useSpeech';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function OfferAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive Simulation State
  const [exitValuation, setExitValuation] = useState<number>(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Negotiation States
  const [selectedPersonality, setSelectedPersonality] = useState<'heather' | 'fred'>('heather');
  const [isNegotiationLoading, setIsNegotiationLoading] = useState(false);
  const [session, setSession] = useState<any | null>(null);
  const [userMsg, setUserMsg] = useState('');
  const [isSendingMsg, setIsSendingMsg] = useState(false);
  const [recruiterVoice, setRecruiterVoice] = useState(false);
  const [coachOpen, setCoachOpen] = useState(true);

  // Speech Recognition Hook
  const { isListening, transcript, startListening, stopListening, speak } = useSpeech();

  // Sync speech input to user message box
  useEffect(() => {
    if (transcript) {
      setUserMsg(transcript);
    }
  }, [transcript]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      setError(null);
      
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
        const pdfDoc = await loadingTask.promise;
        let fullText = '';
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        setInputText(fullText);
      } else if (file.type === 'text/plain') {
        const text = await file.text();
        setInputText(text);
      } else {
        setError('Unsupported file format. Please upload a PDF or TXT file.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to extract text from file: ' + (err.message || 'Unknown error'));
    } finally {
      setIsAnalyzing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      setError('Please paste your offer letter text.');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await parseOfferLetter(inputText);
      setOfferData(data);
      // Set exit valuation slightly higher than current to show a default scenario
      setExitValuation(data.current_valuation ? data.current_valuation * 2 : 1000000000);
      toast.success('Offer parsed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze offer.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Negotiation Handlers
  const handleStartNegotiation = async () => {
    if (!offerData) return;
    try {
      setIsNegotiationLoading(true);
      const newSession = await startNegotiation(offerData, selectedPersonality);
      setSession(newSession);
      toast.success('Simulation Arena Initialized!');
      if (recruiterVoice) {
        speak(newSession.chatHistory[0].content);
      }
    } catch (err: any) {
      toast.error('Failed to start simulation: ' + (err.message || 'Unknown error'));
    } finally {
      setIsNegotiationLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!session || !userMsg.trim()) return;
    try {
      setIsSendingMsg(true);
      stopListening();
      const updatedSession = await sendNegotiationMessage(session._id || session.id, userMsg);
      setSession(updatedSession);
      setUserMsg('');
      toast.success('Counter-proposal sent');
      
      // Voice feedback
      if (recruiterVoice && updatedSession.chatHistory.length > 0) {
        const lastMsg = updatedSession.chatHistory[updatedSession.chatHistory.length - 1];
        if (lastMsg.role === 'recruiter') {
          speak(lastMsg.content);
        }
      }
    } catch (err: any) {
      toast.error('Failed to send proposal: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSendingMsg(false);
    }
  };

  const handleCompleteNegotiation = async (status: 'accepted' | 'rejected') => {
    if (!session) return;
    try {
      const completedSession = await completeNegotiation(session._id || session.id, status);
      setSession(null);
      if (status === 'accepted') {
        toast.success('Deal finalized! Compensation package updated.', { duration: 6000 });
        setOfferData(completedSession.currentOffer);
      } else {
        toast.error('Proposal declined. Negotiation simulation closed.');
      }
    } catch (err: any) {
      toast.error('Failed to finalize: ' + (err.message || 'Unknown error'));
    }
  };

  const handleUseCoachHint = () => {
    if (session?.coachSample) {
      setUserMsg(session.coachSample);
    } else {
      toast.error('No coach suggestions available yet. Send a message first!');
    }
  };

  // Calculate TC over 4 years
  const getChartData = () => {
    if (!offerData) return [];
    
    const data = [];
    const yearlyVest = offerData.equity_amount / (offerData.vesting_years || 4);
    const impliedSharePrice = exitValuation / 10000000; // Dummy cap table math
    const equityValuePerShare = Math.max(0, impliedSharePrice - (offerData.strike_price || 0));

    for (let year = 1; year <= 4; year++) {
      let bonus = year === 1 ? (offerData.sign_on_bonus || 0) + (offerData.target_bonus || 0) : (offerData.target_bonus || 0);
      
      // Handle cliff
      let vestedThisYear = 0;
      if (year * 12 >= (offerData.cliff_months || 12)) {
        vestedThisYear = yearlyVest;
      }

      data.push({
        name: `Year ${year}`,
        Base: offerData.base_salary || 0,
        Bonus: bonus,
        Equity: vestedThisYear * equityValuePerShare || 0,
      });
    }
    return data;
  };

  const chartData = getChartData();

  // Get active session metrics
  const originalTC = session ? (session.originalOffer.base_salary * 4) + session.originalOffer.sign_on_bonus + session.originalOffer.equity_amount : 0;
  const currentTC = session ? (session.currentOffer.base_salary * 4) + session.currentOffer.sign_on_bonus + session.currentOffer.equity_amount : 0;
  const netTCIncrease = currentTC - originalTC;

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-y-auto pt-24">
      <div className="max-w-7xl mx-auto space-y-8 pb-16">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-pulse">
            <Calculator size={32} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-4xl font-[900] uppercase tracking-tighter italic">
              Offer & Equity <span className="text-emerald-500">Analyzer</span>
            </h1>
            <p className="text-white/50 font-medium">
              Don't leave money on the table. Paste your offer, simulate your true RSUs value, and practice negotiating with AI recruiters.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="bg-[#13171d] rounded-[30px] p-8 border border-white/5 shadow-2xl flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
                <FileText size={20} className="text-emerald-500" /> Raw Offer Text
              </h2>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                <Upload size={14} className="text-emerald-500" />
                Upload PDF/TXT
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                accept=".pdf,.txt" 
                className="hidden" 
              />
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your entire offer letter here. Our AI will automatically extract base salary, sign-on bonuses, strike prices, RSUs, vesting schedules, and cliffs..."
              className="w-full flex-1 bg-black/50 border border-white/10 rounded-2xl p-6 text-sm font-mono text-white/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none resize-none mb-6 min-h-[300px]"
            />
            
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full h-14 bg-emerald-500 text-black font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles size={20} />
                </motion.div>
              ) : (
                <>
                  <Play size={20} className="fill-black" />
                  Analyze Offer
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="bg-[#13171d] rounded-[30px] p-8 border border-white/5 shadow-2xl flex flex-col">
            {!offerData ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                <BarChart3 size={80} className="mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Awaiting Data</h3>
                <p className="max-w-sm">Paste your offer letter and click analyze to see your 4-year compensation projection.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-black border border-white/5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">Base Salary</p>
                    <p className="text-xl font-bold text-emerald-400">${offerData.base_salary?.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black border border-white/5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">Sign-on Bonus</p>
                    <p className="text-xl font-bold text-white">${offerData.sign_on_bonus?.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black border border-white/5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">Equity Type</p>
                    <p className="text-xl font-bold text-purple-400">{offerData.equity_type}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black border border-white/5">
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/40 mb-1">Strike Price</p>
                    <p className="text-xl font-bold text-white">${offerData.strike_price}</p>
                  </div>
                </div>

                {/* Equity Simulator */}
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-500 mb-1">Exit Valuation Simulator</h3>
                      <p className="text-xs text-white/50">Slide to see how IPO/Acquisition changes your equity value.</p>
                    </div>
                    <div className="text-2xl font-black text-white">${(exitValuation / 1000000).toFixed(0)}M</div>
                  </div>
                  <input 
                    type="range" 
                    min="10000000" 
                    max="10000000000" 
                    step="10000000"
                    value={exitValuation}
                    onChange={(e) => setExitValuation(Number(e.target.value))}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-white/30 uppercase mt-2">
                    <span>$10M (Startup)</span>
                    <span>$10B (Unicorn)</span>
                  </div>
                </div>

                {/* TC Chart */}
                <div className="h-[280px] w-full mt-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-6">4-Year Total Compensation (TC)</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis dataKey="name" stroke="#ffffff50" tick={{ fill: '#ffffff50', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                      <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                      <Bar dataKey="Base" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="Bonus" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="Equity" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE SALARY NEGOTIATION SIMULATOR SECTION */}
        {/* ========================================================================= */}
        {offerData && (
          <div className="bg-[#13171d] rounded-[30px] p-8 border border-white/5 shadow-2xl space-y-6">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <Brain className="text-emerald-500 animate-pulse" size={24} />
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-wider italic">
                    AI Salary <span className="text-emerald-500">Negotiator</span>
                  </h2>
                  <p className="text-xs text-white/40 font-mono">Arena Status: Operational // Groq Engine Online</p>
                </div>
              </div>
              
              {session && (
                <div className="flex items-center gap-4 bg-black/40 border border-white/5 px-4 py-2 rounded-2xl font-mono text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Sim
                  </span>
                  <div className="h-4 w-px bg-white/10" />
                  <button 
                    onClick={() => setRecruiterVoice(!recruiterVoice)}
                    className={`flex items-center gap-1 hover:text-emerald-400 transition-colors ${recruiterVoice ? 'text-emerald-500' : 'text-white/40'}`}
                  >
                    {recruiterVoice ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    Recruiter Voice
                  </button>
                </div>
              )}
            </div>

            {/* Simulation Setup (No active session) */}
            {!session && (
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                
                {/* Heather Selector */}
                <div 
                  onClick={() => setSelectedPersonality('heather')}
                  className={`relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 bg-black/40 ${
                    selectedPersonality === 'heather' 
                      ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                      : 'border-white/5 opacity-55 hover:opacity-85'
                  }`}
                >
                  <div className="absolute top-4 right-4 bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    High Difficulty
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                      <User size={24} className="text-red-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-white">Hardball Heather</h3>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Strict enterprise recruiter. Uses anchor bias, demands verified data-backed details, and will rescind the offer if you push aggressively without rationale.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px] text-white/40">
                        <span>Max Raise Base: +15%</span>
                        <span>•</span>
                        <span>Rescission Risk: High</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fred Selector */}
                <div 
                  onClick={() => setSelectedPersonality('fred')}
                  className={`relative p-6 rounded-2xl cursor-pointer border transition-all duration-300 bg-black/40 ${
                    selectedPersonality === 'fred' 
                      ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'border-white/5 opacity-55 hover:opacity-85'
                  }`}
                >
                  <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Normal Difficulty
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <User size={24} className="text-emerald-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-white">Flexible Fred</h3>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Friendly startup talent partner. Open-minded, highly receptive to equity increases, and focuses on candidate alignment. Safe for collaborative practice.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px] text-white/40">
                        <span>Max Raise Equity: +50%</span>
                        <span>•</span>
                        <span>Rescission Risk: Low</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Setup */}
                <div className="md:col-span-2 pt-4">
                  <button
                    onClick={handleStartNegotiation}
                    disabled={isNegotiationLoading}
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-teal-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
                  >
                    {isNegotiationLoading ? (
                      <span className="flex items-center gap-2 font-black">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="shrink-0">
                          <RotateCcw size={16} />
                        </motion.div>
                        BOOTING SIMULATOR...
                      </span>
                    ) : (
                      <>
                        <Brain size={18} />
                        Launch Negotiation Arena
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

            {/* Simulation Active Interface */}
            {session && (
              <div className="grid lg:grid-cols-3 gap-6 pt-2">
                
                {/* Left Side: Stats Tracker & Sentiment Gauge (2 columns width) */}
                <div className="lg:col-span-2 space-y-6 flex flex-col">
                  
                  {/* Gauge & Personality Info */}
                  <div className="grid md:grid-cols-2 gap-4 bg-black/30 p-5 rounded-2xl border border-white/5">
                    
                    {/* Recruiter Identity */}
                    <div className="space-y-2 border-r border-white/5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                          session.personality === 'heather' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {session.personality.slice(0,1)}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">Opponent Recruiter</p>
                          <h4 className="font-bold text-white capitalize">{session.personality === 'heather' ? 'Hardball Heather' : 'Flexible Fred'}</h4>
                        </div>
                      </div>
                      <p className="text-xs text-white/50 font-mono leading-relaxed">
                        {session.personality === 'heather' 
                          ? 'Willing to countersign, but expects a solid justification. Demanding base raises is highly risky here.'
                          : 'Receptive to adjustments in RSU grants and sign-on incentives. Open to collaborative dialogue.'}
                      </p>
                    </div>

                    {/* Sentiment Bar */}
                    <div className="flex flex-col justify-center pl-0 md:pl-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono">Employer Sentiment</span>
                        <span className={`text-xs font-black font-mono ${
                          session.sentiment > 65 ? 'text-emerald-400' : session.sentiment > 35 ? 'text-yellow-400' : 'text-red-400 animate-pulse'
                        }`}>
                          {session.sentiment}%
                        </span>
                      </div>
                      
                      {/* Thermometer Progress track */}
                      <div className="w-full h-3.5 bg-black rounded-full overflow-hidden border border-white/5 p-[1px] relative">
                        <motion.div 
                          className={`h-full rounded-full ${
                            session.sentiment > 65 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : session.sentiment > 35 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-gradient-to-r from-red-600 to-red-500'
                          }`}
                          style={{ width: `${session.sentiment}%` }}
                          animate={{ width: `${session.sentiment}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-[10px] text-white/40 mt-2 font-mono flex items-center gap-1">
                        <AlertTriangle size={11} />
                        {session.sentiment > 65 
                          ? 'Negotiating status: Good. Proceed with confidence.'
                          : session.sentiment > 30
                          ? 'Warning: Sentiment is dipping. Provide reasoning/data.'
                          : 'Critical: Rescission Risk is active. Apologize or tone down demands!'}
                      </p>
                    </div>
                  </div>

                  {/* Compensation Table Comparison */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 overflow-x-auto">
                    <h3 className="text-xs font-black uppercase tracking-widest text-white/40 font-mono mb-4 flex items-center gap-1.5">
                      <TrendingUp size={12} className="text-emerald-500" />
                      Simulation Ledger
                    </h3>
                    
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 pb-2">
                          <th className="pb-2 font-black uppercase">Stat</th>
                          <th className="pb-2 font-black uppercase">Initial Offer</th>
                          <th className="pb-2 font-black uppercase">Current Negotiated</th>
                          <th className="pb-2 font-black uppercase text-right">delta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-2.5 font-bold">Base Salary</td>
                          <td className="py-2.5">${session.originalOffer.base_salary.toLocaleString()}</td>
                          <td className="py-2.5 text-emerald-400 font-bold">${session.currentOffer.base_salary.toLocaleString()}</td>
                          <td className="py-2.5 text-right text-emerald-400 font-bold">
                            {session.currentOffer.base_salary > session.originalOffer.base_salary 
                              ? `+$${(session.currentOffer.base_salary - session.originalOffer.base_salary).toLocaleString()}`
                              : '--'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold">Sign-on Bonus</td>
                          <td className="py-2.5">${session.originalOffer.sign_on_bonus.toLocaleString()}</td>
                          <td className="py-2.5 text-emerald-400 font-bold">${session.currentOffer.sign_on_bonus.toLocaleString()}</td>
                          <td className="py-2.5 text-right text-emerald-400 font-bold">
                            {session.currentOffer.sign_on_bonus > session.originalOffer.sign_on_bonus 
                              ? `+$${(session.currentOffer.sign_on_bonus - session.originalOffer.sign_on_bonus).toLocaleString()}`
                              : '--'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold">Equity Amount ({session.originalOffer.equity_type})</td>
                          <td className="py-2.5">${session.originalOffer.equity_amount.toLocaleString()}</td>
                          <td className="py-2.5 text-purple-400 font-bold">${session.currentOffer.equity_amount.toLocaleString()}</td>
                          <td className="py-2.5 text-right text-purple-400 font-bold">
                            {session.currentOffer.equity_amount > session.originalOffer.equity_amount 
                              ? `+$${(session.currentOffer.equity_amount - session.originalOffer.equity_amount).toLocaleString()}`
                              : '--'}
                          </td>
                        </tr>
                        <tr className="bg-white/[0.02] border-t border-emerald-500/20">
                          <td className="py-3 pl-2 font-black uppercase text-emerald-500">4-Year Total Package</td>
                          <td className="py-3 font-bold">${originalTC.toLocaleString()}</td>
                          <td className="py-3 text-emerald-400 font-black">${currentTC.toLocaleString()}</td>
                          <td className="py-3 pr-2 text-right text-emerald-400 font-black">
                            {netTCIncrease > 0 ? `+$${netTCIncrease.toLocaleString()}` : '--'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Chat Console Feed */}
                  <div className="flex-1 bg-black/60 rounded-2xl border border-white/5 flex flex-col overflow-hidden min-h-[350px] max-h-[450px]">
                    
                    {/* Message stream */}
                    <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs custom-scrollbar">
                      {session.chatHistory.map((h: any, i: number) => {
                        const isUser = h.role === 'candidate';
                        return (
                          <div 
                            key={i} 
                            className={`flex flex-col max-w-[85%] ${
                              isUser ? 'ml-auto items-end' : 'mr-auto items-start'
                            }`}
                          >
                            <div className="text-[9px] uppercase font-black tracking-wider text-white/30 mb-1 flex items-center gap-1">
                              {isUser ? <User size={10} /> : <UserCheck size={10} />}
                              {isUser ? 'You' : session.personality === 'heather' ? 'Heather' : 'Fred'}
                            </div>
                            <div className={`p-4 rounded-2xl leading-relaxed border ${
                              isUser 
                                ? 'bg-emerald-500/5 text-emerald-300 border-emerald-500/20 rounded-tr-none' 
                                : 'bg-white/5 text-white/80 border-white/10 rounded-tl-none'
                            }`}>
                              {h.content}
                            </div>
                            {h.tactic && (
                              <span className="mt-1 text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Tactic: {h.tactic}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      {isSendingMsg && (
                        <div className="flex flex-col items-start max-w-[85%] mr-auto">
                          <span className="text-[9px] uppercase font-black text-white/30 mb-1">Recruiter is reviewing pitch...</span>
                          <div className="bg-white/5 text-white/40 border border-white/10 p-4 rounded-2xl rounded-tl-none animate-pulse">
                            Typing proposal updates...
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input tray */}
                    <div className="p-4 border-t border-white/5 bg-black/40 flex items-center gap-2">
                      <button
                        onClick={isListening ? stopListening : startListening}
                        className={`p-3 rounded-xl border transition-colors shrink-0 ${
                          isListening 
                            ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse' 
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                        }`}
                        title={isListening ? "Stop listening" : "Dictate your counter-proposal"}
                      >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                      
                      <input
                        type="text"
                        value={userMsg}
                        onChange={(e) => setUserMsg(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        disabled={isSendingMsg || session.status !== 'active'}
                        placeholder={session.status === 'active' ? "Propose counter numbers or provide rationale..." : "Simulation complete."}
                        className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-white/20 outline-none focus:border-emerald-500/50"
                      />

                      <button
                        onClick={handleSendMessage}
                        disabled={isSendingMsg || !userMsg.trim() || session.status !== 'active'}
                        className="p-3 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl transition-colors shrink-0 disabled:opacity-50"
                      >
                        <Send size={16} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Right Side Panel: AI Coach & Tactics Deck */}
                <div className="space-y-6">
                  
                  {/* AI Coach Drawer */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.05)] flex flex-col h-full space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="text-purple-500 shrink-0" size={16} />
                        <h4 className="font-bold text-xs uppercase tracking-wider text-purple-400 font-mono">Prepzo Coach</h4>
                      </div>
                      <span className="text-[9px] font-black uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-mono">
                        Real-time Help
                      </span>
                    </div>

                    {/* Coach tip box */}
                    <div className="bg-black/50 p-4 rounded-xl border border-white/5 space-y-3 font-mono text-xs">
                      <p className="text-[10px] font-black uppercase text-white/30">Strategic Advice:</p>
                      <p className="text-white/80 leading-relaxed">
                        {session.chatHistory[session.chatHistory.length - 1]?.coachingTip || 
                          "To secure a raise, explain your skills, market numbers, or other options. Heather is strict; Fred is open to equity."}
                      </p>
                    </div>

                    {/* Hint Generation */}
                    <div className="space-y-2 pt-2">
                      <p className="font-mono text-[9px] uppercase font-black text-white/30">Coach suggested reply:</p>
                      {session.coachSample ? (
                        <div className="bg-purple-950/20 border border-purple-950/40 p-4 rounded-xl font-mono text-xs text-purple-200/90 leading-relaxed italic select-all cursor-pointer">
                          "{session.coachSample}"
                        </div>
                      ) : (
                        <div className="text-[11px] text-white/40 italic font-mono p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                          A suggestion will be generated after the recruiter's next reply.
                        </div>
                      )}
                      
                      {session.coachSample && (
                        <button
                          onClick={handleUseCoachHint}
                          className="w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl font-mono font-black text-[10px] uppercase tracking-widest text-purple-400 transition-colors"
                        >
                          Use suggestion
                        </button>
                      )}
                    </div>

                    {/* Tactics used summary */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <h5 className="font-mono text-[10px] uppercase font-black text-white/30">Tactics Detected:</h5>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {session.tacticsUsed.length > 0 ? (
                          session.tacticsUsed.map((t: string, i: number) => (
                            <span 
                              key={i} 
                              className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono"
                            >
                              {t}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-white/30 italic font-mono">None identified yet.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Tray */}
                  <div className="bg-black/30 p-5 rounded-2xl border border-white/5 flex flex-col gap-3">
                    <p className="font-mono text-[10px] uppercase font-black text-white/40">Decision Center</p>
                    
                    {session.status === 'active' ? (
                      <>
                        <button
                          onClick={() => handleCompleteNegotiation('accepted')}
                          className="w-full h-11 bg-emerald-500 text-black font-black uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition-colors"
                        >
                          <CheckCircle size={14} />
                          Accept Current Offer
                        </button>
                        <button
                          onClick={() => handleCompleteNegotiation('rejected')}
                          className="w-full h-11 bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-white font-black uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all"
                        >
                          <ShieldAlert size={14} />
                          Reject & Walk Away
                        </button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-xl border font-mono text-xs text-center font-bold ${
                          session.status === 'rescinded' 
                            ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                            : session.status === 'accepted'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 border-white/10 text-white/50'
                        }`}>
                          {session.status === 'rescinded' 
                            ? 'OFFER RESCINDED BY EMPLOYER' 
                            : `SESSION COMPLETE: ${session.status.toUpperCase()}`}
                        </div>
                        <button
                          onClick={() => setSession(null)}
                          className="w-full h-11 bg-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-xl flex items-center justify-center gap-1.5 hover:bg-white/15 transition-colors"
                        >
                          <RotateCcw size={14} />
                          Restart Simulation
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
