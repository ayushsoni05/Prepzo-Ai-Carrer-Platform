import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Flag, Zap, Trophy, ArrowRight, ArrowLeft, Save, Copy, CheckCircle2, LayoutTemplate } from 'lucide-react';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { showSuccess } from '@/utils/toastManager';

type StarStep = 'intro' | 'situation' | 'task' | 'action' | 'result' | 'review';

interface StarData {
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

const STEPS: { id: StarStep; title: string; icon: any; description: string; placeholder: string }[] = [
  {
    id: 'situation',
    title: 'Situation',
    icon: Target,
    description: 'Set the scene and provide context. What was the background? Who was involved?',
    placeholder: 'e.g., During my time as a junior developer at XYZ Corp, our main application was experiencing severe performance degradation...'
  },
  {
    id: 'task',
    title: 'Task',
    icon: Flag,
    description: 'Describe the challenge or responsibility. What needed to be done?',
    placeholder: 'e.g., I was assigned to lead a task force to identify the bottlenecks and reduce API response times by at least 30%...'
  },
  {
    id: 'action',
    title: 'Action',
    icon: Zap,
    description: 'Explain exactly what YOU did. What skills did you use?',
    placeholder: 'e.g., I implemented Redis caching for high-frequency database queries, refactored the ORM calls, and set up a robust monitoring system using Datadog...'
  },
  {
    id: 'result',
    title: 'Result',
    icon: Trophy,
    description: 'Share the outcome. Quantify your impact if possible.',
    placeholder: 'e.g., As a result, average API response times dropped by 55%, reducing server load and increasing customer retention by 12% in Q3.'
  }
];

export const StarStoryBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StarStep>('intro');
  const [data, setData] = useState<StarData>({
    title: '',
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [copied, setCopied] = useState(false);

  const handleNext = () => {
    if (currentStep === 'intro') {
      if (!data.title.trim()) {
        setData({ ...data, title: 'Untitled Story' });
      }
      setCurrentStep('situation');
    } else if (currentStep === 'situation') setCurrentStep('task');
    else if (currentStep === 'task') setCurrentStep('action');
    else if (currentStep === 'action') setCurrentStep('result');
    else if (currentStep === 'result') setCurrentStep('review');
  };

  const handleBack = () => {
    if (currentStep === 'situation') setCurrentStep('intro');
    else if (currentStep === 'task') setCurrentStep('situation');
    else if (currentStep === 'action') setCurrentStep('task');
    else if (currentStep === 'result') setCurrentStep('action');
    else if (currentStep === 'review') setCurrentStep('result');
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);
  const progress = currentStep === 'intro' ? 0 : currentStep === 'review' ? 100 : ((currentStepIndex + 1) / STEPS.length) * 100;

  const copyToClipboard = () => {
    const story = `**${data.title}**\n\n**Situation:** ${data.situation}\n\n**Task:** ${data.task}\n\n**Action:** ${data.action}\n\n**Result:** ${data.result}`;
    navigator.clipboard.writeText(story);
    setCopied(true);
    showSuccess('Story copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (currentStep === 'intro') {
      return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#5ed29c]/10 flex items-center justify-center border border-[#5ed29c]/20">
              <LayoutTemplate className="w-12 h-12 text-[#5ed29c]" />
            </div>
          </div>
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-[900] text-white uppercase italic tracking-tighter">
              Name Your Story
            </h2>
            <p className="text-white/40 italic">
              Give this behavioral story a title to remember it by (e.g., "The Database Migration" or "Conflict with PM").
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter a memorable title..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#5ed29c]/50 transition-colors text-center text-xl font-bold"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        </div>
      );
    }

    if (currentStep === 'review') {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-[900] text-white uppercase italic tracking-tighter text-[#5ed29c]">
              Story Complete
            </h2>
            <p className="text-white/40 italic">Review your STAR story below.</p>
          </div>

          <div className="grid gap-6">
            {STEPS.map((step) => {
              const value = data[step.id as keyof StarData];
              return (
                <div key={step.id} className="p-6 bg-black/40 border border-white/5 rounded-[24px] relative group hover:border-[#5ed29c]/30 transition-colors">
                  <div className="flex gap-4">
                    <div className="p-3 bg-white/5 rounded-xl h-fit">
                      <step.icon className="w-6 h-6 text-[#5ed29c]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-white/50 uppercase tracking-[0.2em] mb-2">{step.title}</h4>
                      <p className="text-white text-lg leading-relaxed">{value || <span className="text-white/20 italic">No content provided.</span>}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-8 py-4 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-2xl hover:scale-105 transition-all"
            >
              {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy Story'}
            </button>
            <button
              onClick={() => {
                setData({ title: '', situation: '', task: '', action: '', result: '' });
                setCurrentStep('intro');
                showSuccess('Started new story');
              }}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-[900] uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-white/10"
            >
              <Save size={20} />
              Save & Start New
            </button>
          </div>
        </div>
      );
    }

    const currentStepData = STEPS[currentStepIndex];
    const Icon = currentStepData.icon;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#5ed29c]/10 flex items-center justify-center border border-[#5ed29c]/20">
              <Icon className="w-8 h-8 text-[#5ed29c]" />
            </div>
            <div>
              <h2 className="text-4xl font-[900] text-white uppercase italic tracking-tighter">
                {currentStepData.title}
              </h2>
              <p className="text-[#5ed29c]/80 text-sm font-medium tracking-wide">
                {currentStepData.description}
              </p>
            </div>
          </div>

          <textarea
            value={data[currentStepData.id as keyof StarData] as string}
            onChange={(e) => setData({ ...data, [currentStepData.id]: e.target.value })}
            placeholder={currentStepData.placeholder}
            className="w-full h-64 bg-black/50 border border-white/10 rounded-3xl p-8 text-lg text-white placeholder-white/20 focus:outline-none focus:border-[#5ed29c]/50 focus:bg-black transition-all resize-none"
            autoFocus
          />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] pt-24 px-6 pb-20 relative font-rubik overflow-hidden selection:bg-[#5ed29c] selection:text-black">
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBeam className="w-full h-full" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-[#5ed29c] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.4em]">Behavioral Prep</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] text-white uppercase tracking-tighter italic">
              STAR Story <span className="text-white/30">Builder.</span>
            </h1>
          </div>
        </div>

        <div className="p-8 md:p-14 border border-white/5 bg-[#0a0c10]/80 backdrop-blur-2xl rounded-[40px] shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
          {/* Progress Bar */}
          {currentStep !== 'intro' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-[#5ed29c]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center py-8">
            {renderContent()}
          </div>

          {/* Navigation Footer */}
          <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 'intro'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/40 font-bold uppercase tracking-widest text-xs hover:text-white hover:bg-white/5 transition-all disabled:opacity-0"
            >
              <ArrowLeft size={16} /> Back
            </button>
            
            {currentStep !== 'review' && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-[#5ed29c] text-black font-[900] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
              >
                {currentStep === 'intro' ? 'Start Builder' : 'Next Step'} <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarStoryBuilder;
