import React, { createContext, useContext, useState, useRef } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-2";

interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

const ConfirmContext = createContext<(options: ConfirmOptions) => Promise<boolean>>(() => Promise.resolve(false));

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = (options: ConfirmOptions) => {
    setOptions(options);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const handleClose = (value: boolean) => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(value);
      resolveRef.current = null;
    }
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {isOpen && (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className="hidden" />
          <DialogOverlay isDismissable={true} isOpen={isOpen} onOpenChange={(open) => {
            if (!open) handleClose(false);
          }}>
            <DialogContent role="alertdialog" className="sm:max-w-[425px]">
              {() => (
                <div className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>{options.title || 'Are you sure?'}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    {options.description || 'This action cannot be undone.'}
                  </DialogDescription>
                  <DialogFooter className="mt-4 gap-2 flex items-center justify-end">
                    <button
                      onClick={() => handleClose(false)}
                      className="h-10 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      {options.cancelText || 'Cancel'}
                    </button>
                    <button
                      onClick={() => handleClose(true)}
                      className={`h-10 px-4 rounded-xl text-white text-xs font-bold transition-all cursor-pointer ${
                        options.variant === 'destructive'
                          ? 'bg-red-600 hover:bg-red-500'
                          : 'bg-indigo-600 hover:bg-indigo-500'
                      }`}
                    >
                      {options.confirmText || 'Confirm'}
                    </button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </DialogOverlay>
        </DialogTrigger>
      )}
    </ConfirmContext.Provider>
  );
};
