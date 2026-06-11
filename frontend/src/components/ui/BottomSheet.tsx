import React, { useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  theme?: 'light' | 'dark';
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  theme = 'dark', 
  children 
}) => {
  const dragControls = useDragControls();
  const isDark = theme === 'dark';

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragEnd = (event: any, info: any) => {
    // If dragged down by more than 120px or dragged down with speed
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false} // Only drag using the handle/header for control
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            className={`fixed bottom-0 left-0 right-0 max-h-[88vh] rounded-t-[32px] shadow-[0_-15px_40px_rgba(0,0,0,0.3)] z-[100] flex flex-col overflow-hidden ${
              isDark 
                ? 'bg-[#0c0f14] border-t border-white/5 text-white' 
                : 'bg-white border-t border-gray-200 text-gray-900'
            }`}
          >
            {/* Drag Handle Area */}
            <div
              className="py-3 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
            </div>

            {/* Header */}
            {title && (
              <div className={`px-6 pb-4 flex items-center justify-between border-b ${
                isDark ? 'border-white/5' : 'border-gray-100'
              }`}>
                <h3 className={`text-base font-black uppercase tracking-tight ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
