import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  Maximize2,
  MessageSquare,
  Minimize2,
  Send,
  Sparkles,
  User,
  X,
  Paperclip,
  FileText,
  Loader2
} from 'lucide-react';
import { chatWithMentor, getMentorStatus, uploadMentorFile, AttachedFile } from '@/api/mentor';
import { useAuthStore } from '@/store/authStore';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  attachedFile?: AttachedFile;
}

const starterPrompts = [
  'Build my interview roadmap',
  'Review my weak areas',
  'How should I improve my resume?',
  'Give me a 2-week placement plan',
];

export function GlobalAIMentor() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [queuedPrompt, setQueuedPrompt] = useState<string | null>(null);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<AttachedFile | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await getMentorStatus();
        setIsReady(status.available && status.ready);
      } catch {
        setIsReady(false);
      }
    };

    void loadStatus();
  }, []);

  useEffect(() => {
    if (!isOpen || messages.length > 0) {
      return;
    }

    const firstName = user?.fullName?.split(' ')[0] || 'there';
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi ${firstName}. I’m Prepzo AI Mentor. I can help with your ${user?.targetRole || 'career'} roadmap, interview prep, resume strategy, and placement focus areas.`,
        suggestions: starterPrompts,
      },
    ]);
  }, [isOpen, messages.length, user?.fullName, user?.targetRole]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ prompt?: string; autoSend?: boolean }>;
      const prompt = customEvent.detail?.prompt?.trim();
      if (!prompt) {
        return;
      }

      setIsOpen(true);
      setInputValue(prompt);
      if (customEvent.detail?.autoSend) {
        setQueuedPrompt(prompt);
      }
    };

    window.addEventListener('prepzo-mentor-prefill', handlePrefill as EventListener);
    return () => window.removeEventListener('prepzo-mentor-prefill', handlePrefill as EventListener);
  }, []);

  const headerLabel = useMemo(() => (isReady ? 'AI mentor online' : 'Limited mode'), [isReady]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5MB limit.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploadError(null);
    setIsUploadingFile(true);

    try {
      const response = await uploadMentorFile(file);
      if (response.success) {
        setUploadedFile({
          fileType: response.fileType,
          fileName: response.fileName,
          fileText: response.fileText,
          fileData: response.fileData,
        });
      } else {
        setUploadError('Failed to upload file.');
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.response?.data?.message || 'Error uploading file.');
    } finally {
      setIsUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const sendMessage = async (rawPrompt: string) => {
    const prompt = rawPrompt.trim();
    if (!prompt || isLoading) {
      return;
    }

    const currentFile = uploadedFile;
    setUploadedFile(null); // Clear preview instantly
    setUploadError(null);

    setMessages((current) => [
      ...current,
      {
        id: `u-${Date.now()}`,
        role: 'user',
        content: prompt,
        attachedFile: currentFile || undefined,
      },
    ]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatWithMentor(
        prompt,
        sessionId,
        {
          targetRole: user?.targetRole || 'Software Engineer',
          currentSkills: user?.knownTechnologies || [],
          learningGoals: user?.skillGaps || [],
        },
        currentFile || undefined
      );

      if (response.status === 'warming_up') {
        setMessages((current) => [
          ...current,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: response.message,
            suggestions: response.suggestions,
          },
        ]);
        return;
      }

      if (response.success) {
        if (response.sessionId) {
          setSessionId(response.sessionId);
        }

        setMessages((current) => [
          ...current,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: typeof response.message === 'string' ? response.message : 'I received a response in an unexpected format.',
            suggestions: response.suggestions,
          },
        ]);
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `e-${Date.now()}`,
          role: 'assistant',
          content: 'I hit a temporary connection issue. Ask again in a moment and I’ll pick it back up.',
          suggestions: starterPrompts.slice(0, 2),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!queuedPrompt || !isOpen || isLoading) {
      return;
    }

    void sendMessage(queuedPrompt);
    setQueuedPrompt(null);
  }, [queuedPrompt, isOpen, isLoading]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className={`fixed z-[70] ${isExpanded ? 'inset-4' : 'bottom-24 right-4 h-[640px] w-[calc(100vw-2rem)] max-w-[440px]'}`}
          >
            <div className="bg-[#0a0c10] border border-white/10 shadow-2xl backdrop-blur-xl flex h-full flex-col overflow-hidden rounded-[32px]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-code-green/10 border border-code-green/20 text-code-green shadow-lg">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-[800] uppercase tracking-widest text-white">Prepzo AI Mentor</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-code-green animate-pulse" />
                      <p className="text-[9px] font-black uppercase tracking-widest text-code-green">{headerLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setIsExpanded((value) => !value)} className="bg-white/5 border border-white/10 flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors">
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button type="button" onClick={() => setIsOpen(false)} className="bg-white/5 border border-white/10 flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5 custom-scrollbar">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'assistant' && (
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}
                    <div className={`flex max-w-[85%] flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {/* Attached File Preview inside Message Bubble */}
                      {message.attachedFile && (
                        <div className="mb-2 max-w-full">
                          {message.attachedFile.fileType === 'image' ? (
                            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg max-w-[240px]">
                              <img src={message.attachedFile.fileData} alt={message.attachedFile.fileName} className="w-full h-auto object-contain max-h-[160px]" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 max-w-[260px]">
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                <FileText className="h-4.5 w-4.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] font-bold text-white truncate">{message.attachedFile.fileName}</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/40">PDF Document</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className={`whitespace-pre-wrap rounded-[22px] px-5 py-4 text-[13px] font-medium leading-relaxed backdrop-blur-xl ${message.role === 'user' ? 'bg-code-green/20 text-code-green border border-code-green/30 shadow-green-900/10 shadow-lg' : 'bg-white/5 text-white/80 border border-white/10 shadow-lg'}`}>
                        {message.content.split('\n').map((line, i) => {
                          const parts = line.replace(/^#{1,6}\s+/, '').split('**');
                          return (
                            <p key={i} className="mb-1 last:mb-0 min-h-[0.5em]">
                              {parts.map((part, j) =>
                                j % 2 === 1 ? <strong key={j} className={message.role === 'user' ? 'text-code-green font-bold' : 'text-white/95 font-bold'}>{part}</strong> : <span key={j}>{part}</span>
                              )}
                            </p>
                          );
                        })}
                      </div>
                      {message.suggestions?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.suggestions.slice(0, 3).map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => void sendMessage(suggestion)}
                              className="rounded-full border border-code-green/30 bg-code-green/10 px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest text-code-green hover:bg-code-green/20 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {message.role === 'user' && (
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-code-green/10 border border-code-green/20 text-code-green">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-code-green text-[10px] uppercase font-bold tracking-widest animate-pulse ml-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-code-green animate-bounce" />
                    SIGNAL PROCESSING...
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="border-t border-white/10 px-4 py-4 sm:px-5">
                {!messages.length && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {starterPrompts.map((prompt) => (
                      <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-colors">
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Uploaded File Preview Badge */}
                {uploadedFile && (
                  <div className="mb-3 flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {uploadedFile.fileType === 'image' ? (
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/10">
                          <img src={uploadedFile.fileData} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                          <FileText className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-white truncate max-w-[200px]">
                          {uploadedFile.fileName}
                        </p>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">
                          {uploadedFile.fileType === 'image' ? 'Image File' : 'PDF Document'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="bg-white/5 border border-white/10 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {/* Upload Error Message */}
                {uploadError && (
                  <div className="mb-3 flex items-center justify-between gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl px-4 py-3 text-[11px] font-medium leading-relaxed">
                    <p className="flex-1">{uploadError}</p>
                    <button
                      type="button"
                      onClick={() => setUploadError(null)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <div className="bg-white/5 border border-white/10 flex items-end gap-3 rounded-[28px] p-2 focus-within:border-white/30 transition-colors">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingFile || isLoading}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 disabled:opacity-50 transition-colors flex-shrink-0"
                  >
                    {isUploadingFile ? (
                      <Loader2 className="h-4 w-4 animate-spin text-code-green" />
                    ) : (
                      <Paperclip className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                  />
                  <textarea
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void sendMessage(inputValue);
                      }
                    }}
                    rows={1}
                    placeholder="INITIATE SIGNAL..."
                    className="min-h-[56px] flex-1 resize-none bg-transparent px-3 py-3 text-[13px] font-medium tracking-wide text-white outline-none placeholder:text-white/30 placeholder:uppercase placeholder:tracking-widest placeholder:font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => void sendMessage(inputValue)}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-code-green text-[#0a0c10] shadow-lg disabled:opacity-50 transition-transform active:scale-95 flex-shrink-0"
                    disabled={!inputValue.trim() || isLoading || isUploadingFile}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((value) => !value)}
        className="fixed bottom-5 right-4 z-[68] flex items-center gap-3 rounded-full bg-code-green px-4 py-3 text-[12px] uppercase font-[900] tracking-widest text-[#0a0c10] shadow-[0_0_30px_rgba(94,210,156,0.3)]"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="hidden sm:inline">Connect to AI</span>
      </motion.button>
    </>
  );
}

export default GlobalAIMentor;
