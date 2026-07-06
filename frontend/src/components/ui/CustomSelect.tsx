import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select...',
  className = '',
  disabled = false
}: CustomSelectProps) {
  const { darkMode } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  // Text color variables
  const textLabel = darkMode ? 'text-white/40' : 'text-slate-400';
  const textMain = darkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 border rounded-2xl font-medium transition-all flex justify-between items-center text-left disabled:opacity-50 disabled:cursor-not-allowed ${
          darkMode 
            ? 'bg-[#0c0f16] border-white/10 text-white hover:border-[#00ff9d]/30 focus:border-[#00ff9d]/30' 
            : 'bg-white border-slate-200 text-slate-900 hover:border-[#00ff9d]/30 focus:border-[#00ff9d]/30'
        }`}
      >
        <span className={selectedOption ? textMain : (darkMode ? 'text-white/30' : 'text-slate-400')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`text-white/40 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className={`absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-2xl border shadow-2xl z-50 backdrop-blur-xl ${
          darkMode ? 'bg-[#0f131a]/95 border-white/10 text-white custom-scrollbar' : 'bg-white border-slate-200 text-slate-900 custom-scrollbar'
        }`}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-6 py-3.5 cursor-pointer text-[10px] font-black uppercase tracking-widest transition-colors ${
                opt.value === value 
                  ? (darkMode ? 'bg-[#00ff9d]/10 text-[#00ff9d]' : 'bg-emerald-500/10 text-emerald-600') 
                  : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
