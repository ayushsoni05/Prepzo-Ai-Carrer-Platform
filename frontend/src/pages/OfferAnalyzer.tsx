import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, FileText, ChevronRight, BarChart3, 
  DollarSign, Briefcase, Sparkles, AlertTriangle, Play 
} from 'lucide-react';
import { parseOfferLetter, OfferData } from '@/api/offer';
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
    } catch (err: any) {
      setError(err.message || 'Failed to analyze offer.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calculate TC over 4 years
  const getChartData = () => {
    if (!offerData) return [];
    
    const data = [];
    let unvestedEquity = offerData.equity_amount;
    const yearlyVest = offerData.equity_amount / (offerData.vesting_years || 4);
    
    // Calculate simulated equity value per share
    // This is a simplified model. We assume the total "amount" is either the total value or total shares.
    // Let's assume equity_amount is total shares for this simulation.
    const impliedSharePrice = exitValuation / 10000000; // Dummy cap table math
    const equityValuePerShare = Math.max(0, impliedSharePrice - (offerData.strike_price || 0));
    const yearlyEquityValue = yearlyVest * equityValuePerShare;

    for (let year = 1; year <= 4; year++) {
      let bonus = year === 1 ? (offerData.sign_on_bonus || 0) + (offerData.target_bonus || 0) : (offerData.target_bonus || 0);
      
      // Handle cliff
      let vestedThisYear = 0;
      if (year * 12 >= offerData.cliff_months) {
        if (year === 1 && offerData.cliff_months === 12) {
           vestedThisYear = yearlyVest;
        } else if (year * 12 > offerData.cliff_months) {
           vestedThisYear = yearlyVest;
        }
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

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-y-auto pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Calculator size={32} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-4xl font-[900] uppercase tracking-tighter italic">
              Offer & Equity <span className="text-emerald-500">Analyzer</span>
            </h1>
            <p className="text-white/50 font-medium">
              Don't leave money on the table. Paste your offer and simulate your true RSUs/Options value.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Input Panel */}
          <div className="bg-[#13171d] rounded-[30px] p-8 border border-white/5 shadow-2xl flex flex-col h-full">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={20} className="text-emerald-500" /> Raw Offer Text
            </h2>
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
                <div className="h-[300px] w-full mt-4">
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
      </div>
    </div>
  );
}
