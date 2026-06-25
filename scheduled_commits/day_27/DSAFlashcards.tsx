import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Layers, Zap, Star } from 'lucide-react';
import { navigateTo } from '@/utils/navigation';

const CARDS = [
  { id: 1, pattern: 'Sliding Window', description: 'Used for arrays or lists to find subsegments meeting requirements.', complexity: 'O(n) Time, O(1) Space', sample: 'Maximum Sum Subarray of size K' },
  { id: 2, pattern: 'Two Pointers', description: 'Uses two indexes to iterate through elements until they meet.', complexity: 'O(n) Time, O(1) Space', sample: 'Pair with Target Sum in sorted array' },
  { id: 3, pattern: 'Fast & Slow Pointers', description: 'Also known as Hare & Tortoise algorithm, uses pointers moving at different speeds.', complexity: 'O(n) Time, O(1) Space', sample: 'Linked List Cycle Detection' },
  { id: 4, pattern: 'Merge Intervals', description: 'Deals with overlapping intervals to combine, divide, or compare ranges.', complexity: 'O(n log n) Time, O(n) Space', sample: 'Calendar meeting scheduling' }
];

export default function DSAFlashcards() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);

  const card = CARDS[currentIdx];

  const handleNext = (correct: boolean) => {
    if (correct) setScore(s => s + 25);
    setFlipped(false);
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % CARDS.length);
    }, 150);
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

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#00ff9d]/10 rounded-2xl border border-[#00ff9d]/20 text-[#00ff9d]">
              <Layers size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">DSA Pattern Flashcards</h1>
              <p className="text-white/40 text-sm">Master recurring algorithmic code structures via spaced repetition</p>
            </div>
          </div>
          <div className="bg-black/40 border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-2">
            <Zap className="text-yellow-400 w-5 h-5 fill-yellow-400" />
            <span className="font-bold">{score} XP</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div 
            onClick={() => setFlipped(!flipped)}
            className="w-full max-w-xl h-80 bg-white/5 border border-white/5 rounded-[40px] flex items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden backdrop-blur-xl shadow-2xl transition-all hover:scale-[1.02]"
          >
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff9d]">Pattern {card.id}/{CARDS.length}</span>
                  <h2 className="text-4xl font-black uppercase tracking-tight">{card.pattern}</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-wider">Tap card to reveal definition</p>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-lg leading-relaxed text-white/80 font-sans">{card.description}</p>
                  <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <span className="block text-[9px] font-black uppercase text-white/30 tracking-widest">Complexity</span>
                      <span className="text-xs text-[#00ff9d] font-bold">{card.complexity}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-black uppercase text-white/30 tracking-widest">Typical Problem</span>
                      <span className="text-xs text-white/70 font-bold">{card.sample}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 mt-8 w-full max-w-xl justify-center">
            <button
              onClick={() => handleNext(false)}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white text-xs font-black uppercase tracking-widest transition-all"
            >
              Need Review
            </button>
            <button
              onClick={() => handleNext(true)}
              className="px-8 py-4 bg-[#00ff9d] text-[#0a0c10] hover:scale-105 active:scale-95 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-[#00ff9d]/20"
            >
              <Star size={14} className="fill-current" />
              Mastered (+25 XP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
