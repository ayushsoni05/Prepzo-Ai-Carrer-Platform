import { navigateTo } from '@/utils/navigation';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ArrowLeft, Layout, Server, Layers, Database, Cloud, Briefcase, Zap, Cpu,
  FileText, UploadCloud, Check, RefreshCw, AlertCircle, Loader2 
} from 'lucide-react';
import { GridBeam } from '../components/ui/background-grid-beam';
import { InterviewSession } from '../components/interview/InterviewSession';
import { getCategories, getQuestions } from '@/api/questionBank';
import { useAuthStore } from '@/store/authStore';
import { uploadApi } from '@/api/auth';

const ICON_MAP: Record<string, any> = {
  'Computer Science & IT': Server,
  'Technical Skills': Database,
  'Management & Business': Briefcase,
  'Mechanical & Civil': Layout,
  'Electronics & Electrical': Zap,
  'Field Specific': Cpu,
  'Non-Technical Skills': Layers,
  'Cross-Functional Skills': Cloud,
  'Default': Briefcase
};

export const InterviewPage: React.FC = () => {
  const { user, fetchUser } = useAuthStore();
  const [isStarted, setIsStarted] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [sessionQuestions, setSessionQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [launching, setLaunching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for mock session

  const [isResumeMode, setIsResumeMode] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const handleResumeUpload = async (file: File) => {
    setIsUploading(true);
    setResumeError(null);
    try {
      const result = await uploadApi.uploadResume(file);
      if (result.resumeUrl) {
        await fetchUser();
      } else {
        setResumeError(result.message || 'Failed to upload resume.');
      }
    } catch (err: any) {
      console.error(err);
      setResumeError(err.response?.data?.message || 'Error uploading resume. Check file type.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    const loadCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, [fetchUser]);


  useEffect(() => {
    let timer: any;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0c10] overflow-hidden selection:bg-[#5ed29c] selection:text-[#0a0c10]">
      <div className="absolute inset-0 z-0">
        <GridBeam className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c10]/50 to-[#0a0c10] pointer-events-none" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto space-y-12 font-rubik">
        {/* Navigation */}
        <button 
          onClick={() => navigateTo('dashboard')}
          className="group flex items-center gap-3 text-white/20 hover:text-[#5ed29c] transition-all font-black uppercase tracking-[0.4em] text-[10px]"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Exit Environment
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#5ed29c] animate-pulse" />
                <span className="text-[10px] font-black text-[#5ed29c] uppercase tracking-[0.5em] italic">Stage 3 Verification</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-[900] text-white uppercase tracking-tighter leading-[0.8] italic">
               AI Mock<br/>
               <span className="text-white/20">Interview.</span>
             </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="px-8 py-6 rounded-[32px] bg-[#13171d] border-2 border-white/10 shadow-2xl">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 text-center">Session Clock</p>
                <p className="text-4xl font-[900] text-white tracking-tighter italic">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </p>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {!isStarted ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-[900] text-white uppercase tracking-tighter italic">Select Your Domain</h2>
                <p className="text-white/40 font-medium tracking-tight uppercase text-xs tracking-[0.3em]">Choose a specialization to start your simulated interview environment</p>
              </div>

              {/* Resume-based Interview Card */}
              <div 
                onClick={() => {
                  setIsResumeMode(true);
                  setSelectedCategory(null);
                }}
                className={`
                  group relative p-10 rounded-[48px] border transition-all duration-500 cursor-pointer overflow-hidden
                  ${isResumeMode ? 'bg-[#5ed29c]/10 border-[#5ed29c] shadow-[0_0_50px_rgba(94,210,156,0.15)]' : 'bg-[#13171d] border-2 border-white/10 hover:border-[#5ed29c]/50 hover:bg-[#1c232d]'}
                `}
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-start md:items-center gap-8">
                    <div className={`
                      w-20 h-20 rounded-[28px] flex items-center justify-center transition-all duration-500 shrink-0
                      ${isResumeMode ? 'bg-[#5ed29c] text-[#0a0c10]' : 'bg-[#5ed29c]/20 text-[#5ed29c] group-hover:scale-110'}
                    `}>
                      <FileText size={40} />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full ${isResumeMode ? 'bg-[#5ed29c]/20 text-[#5ed29c]' : 'bg-white/10 text-white/60'}`}>
                          PREMIUM FEATURE
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#5ed29c] animate-pulse">
                          ACTIVE CROSS-QUESTIONING
                        </span>
                      </div>
                      <h3 className={`text-3xl font-[900] uppercase italic tracking-tighter ${isResumeMode ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        Resume-based AI Mock Interview
                      </h3>
                      <p className={`text-base font-medium leading-relaxed max-w-2xl ${isResumeMode ? 'text-white/70' : 'text-white/60'}`}>
                        Upload your resume and the AI will analyze your profile, projects, and target role to conduct a realistic recruiter interview, complete with challenging follow-up (cross) questions based on your responses.
                      </p>
                    </div>
                  </div>

                  {isResumeMode && (
                    <div className="shrink-0 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center gap-3 bg-black/60 border border-white/10 px-6 py-4 rounded-3xl">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5ed29c] animate-ping" />
                        <span className="text-xs font-bold text-white/60 tracking-tight">Active State Selected</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Interface - displayed when Resume Mode is selected */}
                {isResumeMode && (
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    {/* Left: Resume status or Uploader */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-wider text-[#5ed29c] italic">Resume Profile Status</h4>
                      
                      {user?.resumeUrl ? (
                        <div className="p-6 rounded-3xl bg-[#1c232d] border border-white/15 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-[#5ed29c]/10 text-[#5ed29c] flex items-center justify-center shrink-0">
                              <Check size={24} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-white font-black truncate text-sm">{user.resumeOriginalName || 'Extracted_Resume.pdf'}</p>
                              <p className="text-white/40 text-xs mt-1">Uploaded {user.resumeUploadedAt ? new Date(user.resumeUploadedAt).toLocaleDateString() : 'recently'}</p>
                            </div>
                          </div>
                          
                          <button 
                            onClick={async () => {
                              try {
                                await uploadApi.deleteResume();
                                await fetchUser();
                              } catch (err) {
                                console.error('Failed to delete resume:', err);
                              }
                            }}
                            className="p-3 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white rounded-xl transition-all"
                            title="Upload another resume"
                          >
                            <RefreshCw size={16} />
                          </button>
                        </div>
                      ) : (
                        // Drag and drop zone
                        <div 
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragActive(true);
                          }}
                          onDragLeave={() => setIsDragActive(false)}
                          onDrop={async (e) => {
                            e.preventDefault();
                            setIsDragActive(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              await handleResumeUpload(e.dataTransfer.files[0]);
                            }
                          }}
                          className={`
                            border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300
                            ${isDragActive ? 'border-[#5ed29c] bg-[#5ed29c]/5' : 'border-white/20 bg-black/40 hover:border-[#5ed29c]/50'}
                          `}
                        >
                          <input 
                            type="file" 
                            id="resume-file-input" 
                            className="hidden" 
                            accept=".pdf,.doc,.docx"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                await handleResumeUpload(e.target.files[0]);
                              }
                            }}
                          />
                          <label htmlFor="resume-file-input" className="cursor-pointer flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                              {isUploading ? <Loader2 className="animate-spin text-[#5ed29c]" size={28} /> : <UploadCloud size={28} />}
                            </div>
                            <div className="space-y-1">
                              <p className="text-white font-bold text-sm">
                                {isUploading ? 'Extracting & Parsing Profile...' : 'Drag & drop or click to upload resume'}
                              </p>
                              <p className="text-white/40 text-xs">Supports PDF, DOC, DOCX (Max 10MB)</p>
                            </div>
                          </label>
                        </div>
                      )}
                      
                      {resumeError && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-2xl text-xs font-semibold">
                          <AlertCircle size={14} />
                          <span>{resumeError}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Launch details and Button */}
                    <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#13171d] border border-white/10">
                      <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-wider text-[#5ed29c] italic">Interview Configuration</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-white/40">Target Role:</span>
                            <span className="text-[#5ed29c]">{user?.targetRole || 'Software Engineer'}</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-white/40">Evaluation Engine:</span>
                            <span className="text-white/80">Groq (Llama 3.3 70B)</span>
                          </div>
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-white/40">Interactive Depth:</span>
                            <span className="text-white/80">3 Main Topics + 6 Cross-Questions (9 Steps Total)</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button 
                          disabled={!user?.resumeUrl || launching}
                          onClick={async () => {
                            setLaunching(true);
                            try {
                              setIsStarted(true);
                            } catch (err) {
                              console.error('Failed to launch resume interview:', err);
                            } finally {
                              setLaunching(false);
                            }
                          }}
                          className="group/btn relative w-full h-[64px] active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="absolute inset-0 w-full h-full drop-shadow-2xl transition-transform group-hover/btn:scale-[1.02]" viewBox="0 0 350 64" preserveAspectRatio="none" fill="none">
                             <path d="M0 0H350L337 64H13L0 0Z" fill="#5ed29c" />
                          </svg>
                          <span className="relative z-10 flex items-center justify-center h-full text-[#0a0c10] font-rubik font-[900] text-sm uppercase tracking-[0.2em] italic">
                             {launching ? 'Calibrating AI Recruiter...' : <>Launch Resume Interview <ArrowRight className="ml-3 group-hover/btn:translate-x-1.5 transition-transform" /></>}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Decorative blur element */}
                <div className={`
                  absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-700
                  ${isResumeMode ? 'bg-[#5ed29c]/5 opacity-100' : 'bg-[#5ed29c]/5 opacity-0 group-hover:opacity-100'}
                `} />
              </div>

              {loading ? (

                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#5ed29c]" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat) => {
                    const Icon = ICON_MAP[cat.category] || ICON_MAP['Default'];
                    const isSelected = selectedCategory?.category === cat.category;
                    
                    return (
                      <div 
                        key={cat.category}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsResumeMode(false);
                        }}
                        className={`
                          group relative p-8 rounded-[40px] border transition-all duration-500 cursor-pointer overflow-hidden
                          ${isSelected ? 'bg-[#5ed29c] border-[#5ed29c] shadow-[0_0_50px_rgba(94,210,156,0.25)]' : 'bg-[#13171d] border-2 border-white/10 hover:border-[#5ed29c]/50 hover:bg-[#1c232d]'}
                        `}
                      >
                        <div className="relative z-10 flex flex-col h-full gap-6">
                          <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
                            ${isSelected ? 'bg-[#0a0c10] text-[#5ed29c]' : 'bg-[#5ed29c]/20 text-[#5ed29c] group-hover:scale-110'}
                          `}>
                            <Icon size={32} />
                          </div>

                          <div className="space-y-2">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-[#0a0c10]/60' : 'text-[#5ed29c]'}`}>
                              REPOSITORY
                            </span>
                            <h3 className={`text-2xl font-[900] uppercase italic tracking-tighter ${isSelected ? 'text-[#0a0c10]' : 'text-white'}`}>
                              {cat.category}
                            </h3>
                          </div>

                          <p className={`text-sm font-medium leading-relaxed ${isSelected ? 'text-[#0a0c10]/70' : 'text-white/60'}`}>
                            Focus on {cat.subSkills.slice(0, 3).join(', ')} and more.
                          </p>

                          <div className={`mt-auto pt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-[#0a0c10]' : 'text-white/50'}`}>
                            {cat.subSkills.length} Sub-skills • AI Verified
                          </div>
                        </div>

                        {/* Geometric Decoration */}
                        <div className={`
                          absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] transition-opacity duration-700
                          ${isSelected ? 'bg-[#0a0c10]/20 opacity-100' : 'bg-[#5ed29c]/5 opacity-0 group-hover:opacity-100'}
                        `} />
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedCategory && (
                <div className="flex justify-center pt-8">
                  <button 
                    disabled={launching}
                    onClick={async () => {
                      setLaunching(true);
                      try {
                        const questions = await getQuestions({ category: selectedCategory.category });
                        // Randomly pick 5 questions for the session
                        const shuffled = [...questions].sort(() => 0.5 - Math.random());
                        const selected = shuffled.slice(0, 5).map(q => q.question);
                        setSessionQuestions(selected);
                        setIsStarted(true);
                      } catch (err) {
                        console.error('Failed to launch session:', err);
                      } finally {
                        setLaunching(false);
                      }
                    }}
                    className="group/btn relative w-full md:w-[400px] h-[80px] active:scale-95 transition-all"
                  >
                    <svg className="absolute inset-0 w-full h-full drop-shadow-2xl transition-transform group-hover/btn:scale-[1.02]" viewBox="0 0 400 80" preserveAspectRatio="none" fill="none">
                       <path d="M0 0H400L385 80H15L0 0Z" fill="#5ed29c" />
                    </svg>
                    <span className="relative z-10 flex items-center justify-center h-full text-[#0a0c10] font-rubik font-[900] text-xl uppercase tracking-[0.2em] italic">
                       {launching ? 'Calibrating...' : <>Launch {selectedCategory.category} <ArrowRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" /></>}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-700">
              <InterviewSession 
                role={isResumeMode ? (user?.targetRole || 'Resume Candidate') : selectedCategory?.category} 
                preFedQuestions={isResumeMode ? undefined : sessionQuestions}
                resumeBased={isResumeMode}
                onComplete={() => {
                  setIsStarted(false);
                  setIsResumeMode(false);
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
