import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Bot, Download, FileCode, Sparkles, Target,
  Play, AlertTriangle, CheckCircle2, Copy, Eye, Code,
  ChevronRight, Loader2, FileText, Zap
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { compileLatex, generateLatexResume, saveLatexSource, getLatexSource } from '@/api/latexResume';
import { latexTemplates, getTemplateById, defaultTemplateId, type LaTeXTemplate } from '@/data/latexTemplates';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { GlassCard } from '@/components/ui/GlassCard';
import { showSuccess, showError, showInfo } from '@/utils/toastManager';

const roleOptions = [
  { value: 'Backend Developer', label: 'Backend Developer', color: 'from-green-500 to-teal-500' },
  { value: 'Frontend Developer', label: 'Frontend Developer', color: 'from-cyan-500 to-blue-500' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer', color: 'from-violet-500 to-purple-500' },
  { value: 'Software Engineer', label: 'Software Engineer', color: 'from-purple-500 to-indigo-500' },
  { value: 'Data Scientist', label: 'Data Scientist', color: 'from-orange-500 to-red-500' },
  { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer', color: 'from-pink-500 to-rose-500' },
];

export function LaTeXResumeBuilder() {
  const { user } = useAuthStore();
  const { setDashboardTab } = useAppStore();

  // State
  const [latexSource, setLatexSource] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplateId);
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer');
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [compilationError, setCompilationError] = useState<string | null>(null);
  const [compilationLog, setCompilationLog] = useState('');
  const [activePanel, setActivePanel] = useState<'editor' | 'preview'>('editor');
  const [showLog, setShowLog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const compileTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Load saved source on mount
  useEffect(() => {
    const loadSaved = async () => {
      try {
        const res = await getLatexSource();
        if (res.success && res.data.latexSource) {
          setLatexSource(res.data.latexSource);
          setSelectedTemplate(res.data.templateId || defaultTemplateId);
          return;
        }
      } catch { /* no saved source */ }
      // Default: load first template
      const t = getTemplateById(defaultTemplateId);
      if (t) setLatexSource(t.source);
    };
    loadSaved();
  }, []);

  // Compile LaTeX
  const handleCompile = useCallback(async (source?: string) => {
    const src = source || latexSource;
    if (!src.trim()) { showError('No LaTeX source to compile'); return; }
    setIsCompiling(true);
    setCompilationError(null);
    try {
      const res = await compileLatex(src);
      if (res.success && res.data.pdf) {
        setPdfBase64(res.data.pdf);
        setCompilationLog(res.data.log || '');
        setCompilationError(null);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Compilation failed';
      setCompilationError(msg);
      setCompilationLog(err.response?.data?.data?.log || '');
    } finally {
      setIsCompiling(false);
    }
  }, [latexSource]);

  // Auto-compile on source change (debounced 2s)
  const handleSourceChange = (val: string) => {
    setLatexSource(val);
    setHasUnsaved(true);
    if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    compileTimerRef.current = setTimeout(() => handleCompile(val), 2000);
  };

  // Generate with AI
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await generateLatexResume(selectedTemplate, targetRole);
      if (res.success && res.data.latex) {
        setLatexSource(res.data.latex);
        setHasUnsaved(true);
        showSuccess('AI generated your LaTeX resume!');
        if (res.data.tips?.length) {
          showInfo(res.data.tips[0]);
        }
        // Auto-compile
        setTimeout(() => handleCompile(res.data.latex), 500);
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'AI generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  // Load template
  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    const t = getTemplateById(id);
    if (t) {
      setLatexSource(t.source);
      setHasUnsaved(true);
      setPdfBase64(null);
    }
  };

  // Save
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveLatexSource(latexSource, selectedTemplate);
      setHasUnsaved(false);
      showSuccess('LaTeX source saved!');
    } catch { showError('Failed to save'); }
    finally { setIsSaving(false); }
  };

  // Download PDF
  const downloadPdf = () => {
    if (!pdfBase64) return;
    const byteChars = atob(pdfBase64);
    const byteArr = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteArr[i] = byteChars.charCodeAt(i);
    const blob = new Blob([byteArr], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user?.fullName || 'Resume'}_LaTeX.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download .tex
  const downloadTex = () => {
    const blob = new Blob([latexSource], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user?.fullName || 'Resume'}.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy source
  const copySource = () => {
    navigator.clipboard.writeText(latexSource);
    showSuccess('LaTeX source copied!');
  };

  const pdfDataUrl = pdfBase64 ? `data:application/pdf;base64,${pdfBase64}` : null;

  return (
    <div className="space-y-8 pb-20 selection:bg-white selection:text-black font-rubik">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDashboardTab('home')}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-[10px]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Exit Workspace
        </button>
        <div className="flex items-center gap-3">
          {hasUnsaved && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
              Save
            </button>
          )}
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">LaTeX Engine</span>
        </div>
      </div>

      {/* Title */}
      <GlassCard className="rounded-[40px] p-8 md:p-12 bg-[#0a0c10]/60 border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
          <FileCode size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-[10px] font-[900] uppercase tracking-[0.4em] text-[#5ed29c] mb-6">
            <Bot size={20} strokeWidth={2.5} />
            LaTeX Compilation Engine
          </div>
          <h3 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter mb-6 leading-none italic">
            Resume <span className="text-white/40">Builder.</span>
          </h3>
          <p className="text-[16px] text-white/50 leading-relaxed max-w-2xl font-medium tracking-tight">
            Write LaTeX code or let AI generate it. See the compiled PDF in real-time. Download publication-quality resumes.
          </p>
        </div>
      </GlassCard>

      {/* Template Gallery */}
      <div>
        <p className="text-[10px] font-[900] uppercase tracking-[0.3em] text-white/30 mb-6">Select Template</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {latexTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTemplate(t.id)}
              className={`group relative rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-5 h-44 ${
                selectedTemplate === t.id
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]'
                  : 'border-white/5 bg-[#0a0c10]/80 hover:bg-white/5 hover:border-white/20'
              }`}
            >
              {/* Mini wireframe */}
              <div className={`w-14 h-18 rounded-lg mb-4 flex flex-col gap-1 p-2 transition-all ${
                selectedTemplate === t.id
                  ? 'border-2 scale-110 shadow-lg' : 'border border-white/10 group-hover:scale-105'
              }`} style={{ borderColor: selectedTemplate === t.id ? t.accent : undefined, background: selectedTemplate === t.id ? `${t.accent}15` : '#000000aa' }}>
                <div className="h-1.5 rounded-sm w-full" style={{ background: t.accent, opacity: 0.8 }} />
                <div className="h-1 rounded-sm w-2/3 bg-white/30 mt-0.5" />
                <div className="h-1 rounded-sm w-full bg-white/20" />
                <div className="h-1 rounded-sm w-5/6 bg-white/15" />
                <div className="flex gap-0.5 mt-auto">
                  <div className="h-2 rounded-sm w-1/3 bg-white/10" />
                  <div className="h-2 rounded-sm w-2/3 bg-white/10" />
                </div>
              </div>
              <p className={`text-[9px] font-black uppercase tracking-widest text-center leading-relaxed ${selectedTemplate === t.id ? 'text-indigo-300' : 'text-white/50'}`}>
                {t.name}
              </p>
              {t.badge && (
                <span className="absolute top-2 right-2 text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${t.accent}20`, color: t.accent }}>
                  {t.badge}
                </span>
              )}
              {selectedTemplate === t.id && (
                <div className="absolute top-2 left-2 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <p className="text-[10px] font-[900] uppercase tracking-[0.3em] text-white/30">Target Role</p>
          <SearchableDropdown value={targetRole} onChange={setTargetRole} options={roleOptions} placeholder="Select Role" icon={Target} searchable={false} />
        </div>
        <div className="space-y-3 flex flex-col justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="h-[46px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate with AI</>}
          </button>
        </div>
        <div className="space-y-3 flex flex-col justify-end">
          <button
            onClick={() => handleCompile()}
            disabled={isCompiling || !latexSource.trim()}
            className="h-[46px] bg-[#5ed29c]/10 border border-[#5ed29c]/30 hover:bg-[#5ed29c]/20 rounded-xl text-[#5ed29c] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isCompiling ? <><Loader2 className="w-4 h-4 animate-spin" /> Compiling...</> : <><Play className="w-4 h-4" /> Compile PDF</>}
          </button>
        </div>
      </div>

      {/* Mobile panel toggle */}
      <div className="flex md:hidden gap-2">
        <button onClick={() => setActivePanel('editor')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activePanel === 'editor' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-white/5 text-white/40 border border-white/5'}`}>
          <Code size={14} /> Editor
        </button>
        <button onClick={() => setActivePanel('preview')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activePanel === 'preview' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/40 border border-white/5'}`}>
          <Eye size={14} /> Preview
        </button>
      </div>

      {/* Split Pane: Editor + Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ minHeight: 700 }}>
        {/* Editor */}
        <div className={`${activePanel !== 'editor' ? 'hidden md:block' : ''}`}>
          <div className="rounded-[28px] border border-white/5 bg-[#0a0c10]/80 overflow-hidden h-full flex flex-col">
            {/* Editor header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">resume.tex</span>
              </div>
              <div className="flex gap-2">
                <button onClick={copySource} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-all" title="Copy source">
                  <Copy size={14} />
                </button>
                <button onClick={downloadTex} className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-all" title="Download .tex">
                  <Download size={14} />
                </button>
              </div>
            </div>
            {/* Code area */}
            <div className="flex-1 relative">
              <textarea
                ref={editorRef}
                value={latexSource}
                onChange={(e) => handleSourceChange(e.target.value)}
                className="w-full h-full min-h-[600px] bg-transparent text-[13px] text-emerald-300/90 font-mono p-5 resize-none outline-none custom-scrollbar leading-relaxed"
                style={{ tabSize: 2, caretColor: '#5ed29c' }}
                spellCheck={false}
                placeholder="% Paste or write your LaTeX code here..."
              />
              {/* Line numbers overlay effect */}
              <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={`${activePanel !== 'preview' ? 'hidden md:block' : ''}`}>
          <div className="rounded-[28px] border border-white/5 bg-[#0a0c10]/80 overflow-hidden h-full flex flex-col">
            {/* Preview header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${pdfBase64 ? 'bg-emerald-500 animate-pulse' : isCompiling ? 'bg-amber-500 animate-pulse' : 'bg-white/20'}`} />
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                  {isCompiling ? 'Compiling...' : pdfBase64 ? 'Live Preview' : 'No Output'}
                </span>
              </div>
              <div className="flex gap-2">
                {pdfBase64 && (
                  <button onClick={downloadPdf} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-all flex items-center gap-2">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                )}
                <button onClick={() => setShowLog(!showLog)} className={`p-1.5 rounded-lg hover:bg-white/10 transition-all ${showLog ? 'text-amber-400' : 'text-white/30 hover:text-white'}`} title="Toggle log">
                  <FileText size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative min-h-[600px]">
              {showLog ? (
                <div className="p-4 h-full overflow-auto custom-scrollbar">
                  <pre className="text-[11px] font-mono text-white/40 whitespace-pre-wrap">{compilationLog || 'No compilation log yet.'}</pre>
                </div>
              ) : compilationError ? (
                <div className="p-8 flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="text-[11px] font-black text-red-400 uppercase tracking-[0.2em] mb-3">Compilation Error</p>
                  <p className="text-[11px] text-white/40 max-w-sm leading-relaxed">{compilationError}</p>
                  <button onClick={() => setShowLog(true)} className="mt-4 text-[10px] font-black text-amber-400 uppercase tracking-widest hover:underline">
                    View Full Log
                  </button>
                </div>
              ) : pdfDataUrl ? (
                <iframe
                  src={pdfDataUrl}
                  className="w-full h-full min-h-[600px] bg-white rounded-b-[28px]"
                  title="PDF Preview"
                />
              ) : isCompiling ? (
                <div className="flex flex-col items-center justify-center h-full gap-6">
                  <Loader2 className="w-12 h-12 text-[#5ed29c] animate-spin" />
                  <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Compiling LaTeX...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-white/10" />
                  </div>
                  <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.3em] italic">Waiting for compilation...</p>
                  <p className="text-[9px] font-black text-white/10 uppercase tracking-widest mt-2 max-w-[240px]">
                    Write LaTeX code or generate with AI, then compile to see the PDF preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: 'Live Compile', sub: 'Auto-recompiles on edit' },
          { icon: Bot, label: 'AI Powered', sub: 'Neural template fill' },
          { icon: FileCode, label: 'Full LaTeX', sub: 'Complete .tex control' },
          { icon: Download, label: 'Export', sub: 'PDF & .tex download' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <item.icon className="w-5 h-5 text-indigo-400 mb-2" />
            <p className="text-[11px] font-black text-white uppercase tracking-wider">{item.label}</p>
            <p className="text-[9px] text-white/40 uppercase tracking-widest italic">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
