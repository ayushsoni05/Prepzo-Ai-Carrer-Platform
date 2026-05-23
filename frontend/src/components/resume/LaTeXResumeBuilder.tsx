import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Bot, Download, FileCode, Sparkles, Target,
  Play, AlertTriangle, CheckCircle2, Copy, Eye, Code,
  ChevronRight, Loader2, FileText, Zap, Upload, FileUp, Check
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { compileLatex, generateLatexResume, saveLatexSource, getLatexSource } from '@/api/latexResume';
import { useConfirm } from '@/hooks/useConfirm';
import { uploadApi } from '@/api/auth';
import api from '@/api/axios';
import { latexTemplates, getTemplateById, defaultTemplateId } from '@/data/latexTemplates';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { GlassCard } from '@/components/ui/GlassCard';
import { showSuccess, showError } from '@/utils/toastManager';
import CodeMirror from '@uiw/react-codemirror';
import { stex } from '@codemirror/legacy-modes/mode/stex';
import { StreamLanguage } from '@codemirror/language';
import { oneDark } from '@codemirror/theme-one-dark';
const roleOptions = [
  { value: 'Backend Developer', label: 'Backend Developer', color: 'from-green-500 to-teal-500' },
  { value: 'Frontend Developer', label: 'Frontend Developer', color: 'from-cyan-500 to-blue-500' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer', color: 'from-violet-500 to-purple-500' },
  { value: 'Software Engineer', label: 'Software Engineer', color: 'from-purple-500 to-indigo-500' },
  { value: 'Data Scientist', label: 'Data Scientist', color: 'from-orange-500 to-red-500' },
  { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer', color: 'from-pink-500 to-rose-500' },
];

const prePopulateTemplate = (source: string, templateId: string, user: any): string => {
  if (!source) return '';

  const clean = (val?: string) => {
    if (!val) return '';
    // Escape standard LaTeX special characters
    return val
      .replace(/\\/g, '\\\\')
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/[{}]/g, '\\$&');
  };

  const name = clean(user?.fullName) || 'John Doe';
  const email = clean(user?.email) || 'john.doe@example.com';
  const phone = clean(user?.phone) || '123-456-7890';
  const linkedin = clean(user?.linkedin) || 'johndoe';
  const github = clean(user?.github) || 'johndoe';
  const location = clean(user?.location) || 'City, State';
  const summary = clean(user?.resumeAnalysis?.extractedData?.summary) || 'A motivated professional.';

  let educationItems = '';
  let experienceItems = '';
  let projectItems = '';
  let skillsItems = '';

  if (templateId === 'jakes-resume') {
    educationItems = '\\resumeSubheading{University}{Location}{Degree}{Date}';
    experienceItems = '\\resumeSubheading{Company}{Location}{Role}{Date}';
    projectItems = '\\resumeProjectHeading{Project}{Date}';
    skillsItems = '\\textbf{Skills}: JavaScript, Node.js, React';
  } else if (templateId === 'clean-ats') {
    educationItems = '\\textbf{University} \\hfill Date \\\\ Degree \\hfill GPA: 4.0 \\\\';
    experienceItems = '\\textbf{Company} \\hfill Date \\\\ Role \\hfill Location \\\\';
    projectItems = '\\textbf{Project} \\hfill Date \\\\ A cool web application \\\\';
    skillsItems = '\\textbf{Skills}: JavaScript, Node.js, React';
  } else if (templateId === 'modern-two-col') {
    educationItems = '\\textbf{University} \\\\ Degree \\\\';
    experienceItems = '\\textbf{Company} \\\\ Role \\\\';
    projectItems = '\\textbf{Project} \\\\ A cool web application \\\\';
    skillsItems = 'JavaScript, Node.js, React';
  } else if (templateId === 'academic-cv') {
    educationItems = '\\textbf{University} \\hfill Date \\\\ Degree \\\\';
    experienceItems = '\\textbf{Company} \\hfill Date \\\\ Role \\\\';
    projectItems = '\\textbf{Project} \\hfill Date \\\\ A cool web application \\\\';
    skillsItems = 'JavaScript, Node.js, React';
  } else if (templateId === 'deedy-cv') {
    educationItems = '\\textbf{University} \\\\ Degree \\\\';
    experienceItems = '\\textbf{Company} \\\\ Role \\\\';
    projectItems = '\\textbf{Project} \\\\ A cool web application \\\\';
    skillsItems = 'JavaScript, Node.js, React';
  } else {
    educationItems = '\\textbf{University} \\hfill Date \\\\ Degree \\\\';
    experienceItems = '\\textbf{Company} \\hfill Date \\\\ Role \\\\';
    projectItems = '\\textbf{Project} \\hfill Date \\\\ A cool web application \\\\';
    skillsItems = 'JavaScript, Node.js, React';
  }

  return source
    .replace(/{{NAME}}/g, name)
    .replace(/{{EMAIL}}/g, email)
    .replace(/{{PHONE}}/g, phone)
    .replace(/{{LINKEDIN}}/g, linkedin)
    .replace(/{{GITHUB}}/g, github)
    .replace(/{{LOCATION}}/g, location)
    .replace(/{{SUMMARY}}/g, summary)
    .replace(/{{EDUCATION_ITEMS}}/g, educationItems)
    .replace(/{{EXPERIENCE_ITEMS}}/g, experienceItems)
    .replace(/{{PROJECT_ITEMS}}/g, projectItems)
    .replace(/{{SKILLS_ITEMS}}/g, skillsItems);
};

export function LaTeXResumeBuilder({ onExit }: { onExit?: () => void } = {}) {
  const { user } = useAuthStore();
  const { resumeAnalysis, setDashboardTab } = useAppStore();
  const confirm = useConfirm();

  // State
  const [latexSource, setLatexSource] = useState('');
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplateId);
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineer');
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationError, setCompilationError] = useState<string | null>(null);
  const [compilationLog, setCompilationLog] = useState('');
  const [activePanel, setActivePanel] = useState<'editor' | 'preview'>('editor');
  const [showLog, setShowLog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  
  // AI Resume Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [wizardJd, setWizardJd] = useState('');
  const [wizardRole, setWizardRole] = useState(user?.targetRole || 'Software Engineer');
  const [wizardTemplate, setWizardTemplate] = useState(selectedTemplate);
  const [wizardLoadingText, setWizardLoadingText] = useState('');
  const [wizardError, setWizardError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [extractedDetails, setExtractedDetails] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasExistingResume, setHasExistingResume] = useState(false);
  const [existingResumeName, setExistingResumeName] = useState<string | null>(null);
  const [useExisting, setUseExisting] = useState(false);
  const compileTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hasLoadedInitial = useRef(false);

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

  // Check for existing resume when wizard is opened
  useEffect(() => {
    if (showWizard) {
      const checkExisting = async () => {
        try {
          const res = await uploadApi.getResumeInfo();
          if (res.resumeUrl) {
            setHasExistingResume(true);
            setExistingResumeName(res.originalName || 'your stored resume');
          } else {
            setHasExistingResume(false);
            setExistingResumeName(null);
          }
        } catch {
          setHasExistingResume(false);
          setExistingResumeName(null);
        }
      };
      checkExisting();
      // Reset wizard flow states
      setWizardStep(1);
      setUploadedFile(null);
      setExtractedDetails(null);
      setUseExisting(false);
      setWizardError(null);
    }
  }, [showWizard]);

  // Load saved source on mount
  useEffect(() => {
    if (hasLoadedInitial.current) return;

    const loadSaved = async () => {
      try {
        const res = await getLatexSource();
        if (res.success && res.data.latexSource) {
          setLatexSource(res.data.latexSource);
          setSelectedTemplate(res.data.templateId || defaultTemplateId);
          hasLoadedInitial.current = true;
          handleCompile(res.data.latexSource);
          return;
        }
      } catch { /* no saved source */ }

      // If no saved source on disk/DB, check if we have parsed resume details to populate
      const dataToUse = resumeAnalysis?.extractedData;
      if (dataToUse && (
        (dataToUse.education && dataToUse.education.length > 0) ||
        (dataToUse.experience && dataToUse.experience.length > 0) ||
        (dataToUse.projects && dataToUse.projects.length > 0) ||
        (dataToUse.skills && dataToUse.skills.length > 0)
      )) {
        setIsTemplateLoading(true);
        try {
          const genRes = await generateLatexResume(defaultTemplateId, targetRole, undefined, dataToUse);
          if (genRes.success && genRes.data.latex) {
            setLatexSource(genRes.data.latex);
            setSelectedTemplate(defaultTemplateId);
            hasLoadedInitial.current = true;
            handleCompile(genRes.data.latex);
            return;
          }
        } catch (err) {
          console.error('Failed to pre-populate default template on mount:', err);
        } finally {
          setIsTemplateLoading(false);
        }
      }

      // Default: load first template with placeholder data
      const t = getTemplateById(defaultTemplateId);
      if (t) {
        setLatexSource(prePopulateTemplate(t.source, defaultTemplateId, user));
        hasLoadedInitial.current = true;
      }
    };
    loadSaved();
  }, [user, resumeAnalysis, handleCompile, targetRole]);

  // Auto-compile on source change (debounced 2s)
  const handleSourceChange = (val: string) => {
    setLatexSource(val);
    setHasUnsaved(true);
    if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    compileTimerRef.current = setTimeout(() => handleCompile(val), 2000);
  };

  // Generate with AI - Open Wizard Modal
  const handleGenerate = () => {
    // Reset wizard state
    setWizardStep(1);
    setUploadedFile(null);
    setWizardJd('');
    setWizardRole(targetRole);
    setWizardTemplate(selectedTemplate);
    setWizardLoadingText('');
    setWizardError(null);
    setShowWizard(true);
  };

  // Handle uploading and parsing resume (Step 1 -> Extracted Details)
  const handleParseResume = async () => {
    setIsParsing(true);
    setWizardError(null);
    try {
      if (uploadedFile) {
        // Upload new resume
        await uploadApi.uploadResume(uploadedFile);
      }
      
      // Parse resume details (either the newly uploaded or the existing one)
      const res = await api.post('/resume/analyze', {
        targetRole: wizardRole,
      });
      
      if (res.data.success && res.data.data?.analysis) {
        setExtractedDetails(res.data.data.analysis.extractedData);
      } else {
        throw new Error('Could not parse resume data.');
      }
    } catch (err: any) {
      console.error('Resume parsing error:', err);
      const errMsg = err.response?.data?.message || err.message || 'Failed to parse resume.';
      setWizardError(errMsg);
    } finally {
      setIsParsing(false);
    }
  };

  // Run AI LaTeX Generation & Compilation (Step 3 -> Workspace Editor)
  const handleGenerateResume = async () => {
    setIsGenerating(true);
    setWizardError(null);
    setWizardLoadingText('Generating ATS-optimized LaTeX source...');
    try {
      // 1. Generate LaTeX — pass freshly extracted data so backend doesn't rely on stale DB
      const genRes = await generateLatexResume(wizardTemplate, wizardRole, wizardJd, extractedDetails || undefined);
      if (!genRes.success || !genRes.data.latex) {
        throw new Error('AI generation failed to return LaTeX code.');
      }
      
      // Set the generated LaTeX in editor
      setLatexSource(genRes.data.latex);
      setSelectedTemplate(wizardTemplate);
      setTargetRole(wizardRole);
      setHasUnsaved(true);

      // Close the wizard modal directly
      setShowWizard(false);

      // 2. Trigger LaTeX compile in workspace so user sees live preview
      handleCompile(genRes.data.latex);
      
      showSuccess('Resume code generated and filled into editor!');
    } catch (err: any) {
      console.error('Wizard generation error:', err);
      const errMsg = err.response?.data?.message || err.message || 'An error occurred during AI generation.';
      setWizardError(errMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Load template
  const handleSelectTemplate = async (id: string) => {
    // If the user has made manual edits and hasn't saved, warn them
    if (hasUnsaved) {
      const confirmChange = await confirm({
        title: 'Unsaved Changes',
        description: 'You have unsaved changes in the editor. Changing the template will regenerate the LaTeX source and overwrite your manual changes. Do you want to proceed?',
        confirmText: 'Proceed',
        cancelText: 'Cancel',
        variant: 'destructive'
      });
      if (!confirmChange) return;
    }

    setSelectedTemplate(id);
    const t = getTemplateById(id);
    if (!t) return;

    const dataToUse = extractedDetails || resumeAnalysis?.extractedData;

    // Check if we have actual extracted profile details to populate
    if (dataToUse && (
      (dataToUse.education && dataToUse.education.length > 0) ||
      (dataToUse.experience && dataToUse.experience.length > 0) ||
      (dataToUse.projects && dataToUse.projects.length > 0) ||
      (dataToUse.skills && dataToUse.skills.length > 0)
    )) {
      setIsTemplateLoading(true);
      try {
        const genRes = await generateLatexResume(id, targetRole, undefined, dataToUse);
        if (genRes.success && genRes.data.latex) {
          setLatexSource(genRes.data.latex);
          setHasUnsaved(true);
          // Auto-compile new LaTeX source so the preview panel matches
          handleCompile(genRes.data.latex);
          showSuccess(`Switched to ${t.name} template!`);
          return;
        }
      } catch (err: any) {
        console.error('Failed to populate template via backend:', err);
        showError('Could not populate template details automatically. Falling back to default format.');
      } finally {
        setIsTemplateLoading(false);
      }
    }

    // Default fallback (client-side pre-population with empty/default items)
    setLatexSource(prePopulateTemplate(t.source, id, user));
    setHasUnsaved(true);
    setPdfBase64(null);
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
          onClick={() => {
            if (onExit) onExit();
            else window.location.hash = 'dashboard';
          }}
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
            className="h-[46px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" /> Generate with AI
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
            <div className="flex-1 relative overflow-auto custom-scrollbar" style={{ minHeight: '600px' }}>
              {isTemplateLoading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Updating Editor...</p>
                </div>
              )}
              <CodeMirror
                value={latexSource}
                height="100%"
                theme={oneDark}
                extensions={[StreamLanguage.define(stex)]}
                onChange={(val) => handleSourceChange(val)}
                className="text-[13px] font-mono h-full"
                basicSetup={{
                  lineNumbers: true,
                  highlightActiveLineGutter: true,
                  highlightSpecialChars: true,
                  history: true,
                  foldGutter: true,
                  drawSelection: true,
                  dropCursor: true,
                  allowMultipleSelections: true,
                  indentOnInput: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  rectangularSelection: true,
                  crosshairCursor: true,
                  highlightActiveLine: true,
                  highlightSelectionMatches: true,
                  closeBracketsKeymap: true,
                  defaultKeymap: true,
                  searchKeymap: true,
                  historyKeymap: true,
                  foldKeymap: true,
                  completionKeymap: true,
                  lintKeymap: true,
                }}
              />
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
              {isTemplateLoading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-[#5ed29c] animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Recompiling Preview...</p>
                </div>
              )}
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
      {/* AI Resume Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-[#0a0c10]/95 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl p-6 md:p-8 space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-wider text-white">AI Resume Builder</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest italic">Create high-ATS LaTeX resume in 3 steps</p>
                </div>
              </div>
              {wizardStep !== 4 && (
                <button
                  onClick={() => setShowWizard(false)}
                  className="text-white/45 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Step Progress Tracker */}
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/30 border-b border-white/5 pb-4">
              {[
                { step: 1, label: 'Upload' },
                { step: 2, label: 'JD & Role' },
                { step: 3, label: 'Template' }
              ].map((s) => (
                <div
                  key={s.step}
                  className={`flex items-center gap-2 ${
                    wizardStep === s.step
                      ? 'text-indigo-400'
                      : wizardStep > s.step
                      ? 'text-emerald-400'
                      : 'text-white/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    wizardStep === s.step
                      ? 'border-indigo-400 bg-indigo-400/10'
                      : wizardStep > s.step
                      ? 'border-emerald-400 bg-emerald-400/10'
                      : 'border-white/10'
                  }`}>
                    {wizardStep > s.step ? <Check className="w-3 h-3 text-emerald-400" /> : s.step}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Error Message */}
            {wizardError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-wider">Error Occurred</p>
                  <p className="text-xs text-white/60 leading-relaxed">{wizardError}</p>
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="min-h-[250px] flex flex-col justify-center">
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Step 1: Upload or reuse your resume</p>
                  
                  {isParsing ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
                      <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-indigo-500/20 animate-ping absolute" />
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center relative z-10">
                          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Parsing Resume</p>
                        <p className="text-sm font-bold text-white">Extracting details & running ATS analysis...</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">Our AI is reading education, experience, and projects...</p>
                      </div>
                    </div>
                  ) : extractedDetails ? (
                    <div className="space-y-4">
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-[24px] space-y-4">
                        <div className="flex items-center gap-3 text-emerald-400">
                          <CheckCircle2 className="w-5 h-5 shrink-0" />
                          <div className="text-left">
                            <p className="text-xs font-black uppercase tracking-wider">Parsing Complete!</p>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest">AI successfully extracted details from your resume. Verify below before continuing.</p>
                          </div>
                        </div>

                        {/* Comprehensive Extracted Data Display */}
                        <div className="space-y-3 pt-2 text-left max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                          {/* Education */}
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[9px] text-emerald-400/70 uppercase tracking-widest mb-2 font-black">Education ({extractedDetails.education?.length || 0})</p>
                            {extractedDetails.education?.length > 0 ? extractedDetails.education.map((edu: any, idx: number) => (
                              <div key={idx} className="mb-2 last:mb-0">
                                <p className="text-[11px] text-white font-bold">{edu.degree || edu.qualification}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</p>
                                <p className="text-[10px] text-white/50">{edu.institution || edu.school}{edu.location ? ` — ${edu.location}` : ''}</p>
                                {(edu.gpa || edu.cgpa || edu.startDate || edu.endDate) && (
                                  <p className="text-[9px] text-white/30">{edu.gpa || edu.cgpa ? `GPA: ${edu.gpa || edu.cgpa}` : ''}{edu.startDate || edu.endDate ? ` | ${edu.startDate || ''} – ${edu.endDate || 'Present'}` : ''}</p>
                                )}
                              </div>
                            )) : <p className="text-[10px] text-white/30 italic">No education data found</p>}
                          </div>

                          {/* Experience */}
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[9px] text-indigo-400/70 uppercase tracking-widest mb-2 font-black">Work Experience ({extractedDetails.experience?.length || 0})</p>
                            {extractedDetails.experience?.length > 0 ? extractedDetails.experience.map((exp: any, idx: number) => (
                              <div key={idx} className="mb-2 last:mb-0">
                                <p className="text-[11px] text-white font-bold">{exp.title || exp.role || exp.position} {exp.company ? `at ${exp.company}` : ''}</p>
                                <p className="text-[10px] text-white/50">{exp.location || ''}{exp.startDate || exp.endDate ? ` | ${exp.startDate || ''} – ${exp.endDate || 'Present'}` : ''}</p>
                                {Array.isArray(exp.description) && exp.description.slice(0, 3).map((bullet: string, bi: number) => (
                                  <p key={bi} className="text-[9px] text-white/40 pl-3 mt-0.5">• {bullet}</p>
                                ))}
                                {typeof exp.description === 'string' && <p className="text-[9px] text-white/40 pl-3 mt-0.5">• {exp.description}</p>}
                              </div>
                            )) : <p className="text-[10px] text-white/30 italic">No experience data found</p>}
                          </div>

                          {/* Projects */}
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[9px] text-purple-400/70 uppercase tracking-widest mb-2 font-black">Projects ({extractedDetails.projects?.length || 0})</p>
                            {extractedDetails.projects?.length > 0 ? extractedDetails.projects.map((proj: any, idx: number) => (
                              <div key={idx} className="mb-2 last:mb-0">
                                <p className="text-[11px] text-white font-bold">{proj.name || proj.title}{proj.technologies ? ` — ${Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}` : ''}</p>
                                {Array.isArray(proj.description) && proj.description.slice(0, 2).map((bullet: string, bi: number) => (
                                  <p key={bi} className="text-[9px] text-white/40 pl-3 mt-0.5">• {bullet}</p>
                                ))}
                                {typeof proj.description === 'string' && <p className="text-[9px] text-white/40 pl-3 mt-0.5">• {proj.description}</p>}
                              </div>
                            )) : <p className="text-[10px] text-white/30 italic">No project data found</p>}
                          </div>

                          {/* Skills */}
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[9px] text-amber-400/70 uppercase tracking-widest mb-2 font-black">Skills ({extractedDetails.skills?.length || 0})</p>
                            {extractedDetails.skills?.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {extractedDetails.skills.map((skill: string, idx: number) => (
                                  <span key={idx} className="text-[9px] bg-white/10 border border-white/5 text-white/70 px-2 py-0.5 rounded-md font-medium">{skill}</span>
                                ))}
                              </div>
                            ) : <p className="text-[10px] text-white/30 italic">No skills data found</p>}
                          </div>

                          {/* Certifications (if any) */}
                          {extractedDetails.certifications?.length > 0 && (
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                              <p className="text-[9px] text-teal-400/70 uppercase tracking-widest mb-2 font-black">Certifications ({extractedDetails.certifications.length})</p>
                              {extractedDetails.certifications.map((cert: any, idx: number) => (
                                <p key={idx} className="text-[10px] text-white/60">• {typeof cert === 'string' ? cert : cert.name || cert.title}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          onClick={() => {
                            setExtractedDetails(null);
                            setUploadedFile(null);
                            setUseExisting(false);
                          }}
                          className="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                        >
                          Re-upload
                        </button>
                        <button
                          onClick={() => setWizardStep(2)}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all flex items-center gap-2"
                        >
                          Continue <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {hasExistingResume && (
                        <div className={`p-4 rounded-2xl border transition-all ${
                          useExisting
                            ? 'border-indigo-500/40 bg-indigo-500/5'
                            : 'border-white/5 bg-[#0a0c10]/40'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                              <FileText className="w-8 h-8 text-indigo-400 shrink-0" />
                              <div className="text-left min-w-0">
                                <p className="text-xs font-black uppercase tracking-wider text-white">Use Stored Resume</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest truncate max-w-[200px] sm:max-w-xs">{existingResumeName}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setUseExisting(true);
                                setUploadedFile(null);
                              }}
                              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                                useExisting
                                  ? 'bg-indigo-500 text-white shadow-lg'
                                  : 'bg-white/5 hover:bg-white/10 text-white/60'
                              }`}
                            >
                              {useExisting ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="relative">
                        {hasExistingResume && (
                          <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-white/5" />
                            <span className="px-3 text-[9px] font-black text-white/20 uppercase tracking-widest">Or Upload New</span>
                            <div className="flex-grow border-t border-white/5" />
                          </div>
                        )}

                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              setUploadedFile(e.dataTransfer.files[0]);
                              setUseExisting(false);
                            }
                          }}
                          className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all ${
                            uploadedFile
                              ? 'border-indigo-500/40 bg-indigo-500/5'
                              : 'border-white/10 hover:border-white/20 bg-white/5'
                          }`}
                        >
                          <input
                            type="file"
                            id="wizard-file"
                            accept=".pdf,.docx,.doc"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadedFile(e.target.files[0]);
                                setUseExisting(false);
                              }
                            }}
                          />
                          <label htmlFor="wizard-file" className="cursor-pointer flex flex-col items-center gap-3">
                            {uploadedFile ? (
                              <>
                                <FileUp className="w-10 h-10 text-indigo-400" />
                                <p className="text-sm font-black text-white uppercase tracking-tight">{uploadedFile.name}</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-10 h-10 text-white/30" />
                                <p className="text-sm font-black text-white uppercase tracking-tight">Drag & drop your resume here</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                                  Supports PDF, DOC, DOCX up to 10MB
                                </p>
                                <span className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-colors">
                                  Browse Files
                                </span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleParseResume}
                          disabled={!uploadedFile && !useExisting}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all flex items-center gap-2"
                        >
                          Upload & Parse Resume <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Step 2: Role & Job Description</p>
                  
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Target Role</label>
                    <SearchableDropdown
                      value={wizardRole}
                      onChange={setWizardRole}
                      options={roleOptions}
                      placeholder="Select Target Role"
                      icon={Target}
                      searchable={false}
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Job Description (Optional)</label>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-wider">Tailors keywords for ATS</span>
                    </div>
                    <textarea
                      value={wizardJd}
                      onChange={(e) => setWizardJd(e.target.value)}
                      placeholder="Paste target job description here to optimize resume bullet points and key skills matching..."
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white placeholder-white/20 focus:border-indigo-500 focus:outline-none transition-colors custom-scrollbar resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all flex items-center gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                isGenerating ? (
                  <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
                    <div className="relative flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-indigo-500/20 animate-ping absolute" />
                      <div className="w-16 h-16 rounded-full border border-indigo-500/40 animate-pulse absolute" />
                      <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center relative z-10">
                        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                      </div>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">AI Generation Active</p>
                      <p className="text-sm font-bold text-white leading-relaxed">{wizardLoadingText}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Please don't close this window, this may take a moment...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Step 3: Select Resume Template</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                      {latexTemplates.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setWizardTemplate(t.id)}
                          className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-4 h-32 ${
                            wizardTemplate === t.id
                              ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]'
                              : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          {/* Mini wireframe */}
                          <div className={`w-10 h-14 rounded-md mb-3 flex flex-col gap-0.5 p-1 transition-all ${
                            wizardTemplate === t.id
                              ? 'border border-white/40 scale-105 shadow-md' : 'border border-white/10'
                          }`} style={{ borderColor: wizardTemplate === t.id ? t.accent : undefined }}>
                            <div className="h-1 rounded-sm w-full" style={{ background: t.accent, opacity: 0.8 }} />
                            <div className="h-0.5 rounded-sm w-2/3 bg-white/30" />
                            <div className="h-0.5 rounded-sm w-full bg-white/20" />
                            <div className="h-0.5 rounded-sm w-5/6 bg-white/15" />
                          </div>
                          <p className={`text-[8px] font-black uppercase tracking-widest text-center leading-relaxed ${wizardTemplate === t.id ? 'text-indigo-300' : 'text-white/50'}`}>
                            {t.name}
                          </p>
                          {t.badge && (
                            <span className="absolute top-1 right-1 text-[6px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                              style={{ background: `${t.accent}20`, color: t.accent }}>
                              {t.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setWizardStep(2)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleGenerateResume}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 animate-pulse" /> Generate Resume
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
