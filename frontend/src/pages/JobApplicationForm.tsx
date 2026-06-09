/**
 * Job Application Form
 * Workday-style multi-step application form with resume parsing auto-fill.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  User,
  GraduationCap,
  Briefcase,
  Code,
  Clock,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Trash2,
  Loader2,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { applicationsApi, ApplicationFormData } from '@/api/applications';
import { jobsApi } from '@/api/jobs';
import { useAppStore } from '@/store/appStore';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'resume', label: 'Resume', icon: Upload },
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills & Links', icon: Code },
  { id: 'availability', label: 'Availability', icon: Clock },
  { id: 'cover', label: 'Cover Letter', icon: FileText },
  { id: 'review', label: 'Review & Submit', icon: CheckCircle2 },
];

interface JobApplicationFormProps {
  jobId: string;
  onClose: () => void;
}

export function JobApplicationForm({ jobId, onClose }: JobApplicationFormProps) {
  const { darkMode } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState<ApplicationFormData>(({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      alternatePhone: '',
      dateOfBirth: '',
      gender: undefined,
      address: { street: '', city: '', state: '', pincode: '', country: 'India' },
    },
    education: [{ degree: '', field: '', institution: '', university: '', graduationYear: new Date().getFullYear(), cgpa: undefined }],
    workExperience: [],
    skills: [],
    links: { linkedin: '', github: '', portfolio: '', other: '' },
    availability: { noticePeriod: 'Immediate', preferredJoiningDate: '', expectedSalary: undefined, willingToRelocate: false },
    additionalInfo: { howDidYouHear: '', whyThisRole: '', additionalNotes: '' },
  }));

  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobsApi.getJob(jobId);
        if (res.success) setJob(res.data.job);
      } catch (err) {
        toast.error('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchJob();
    } else {
      setLoading(false);
    }
  }, [jobId]);

  const handleResumeUpload = async (file: File) => {
    setResumeFile(file);
    setParsing(true);
    const parseToast = toast.loading('Parsing resume & extracting profile details...');
    try {
      const res = await applicationsApi.parseResume(file);
      if (res.success && res.data) {
        toast.success('Resume parsed successfully! Auto-filled fields.', { id: parseToast });
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            fullName: res.data.personalInfo?.fullName || prev.personalInfo.fullName,
            email: res.data.personalInfo?.email || prev.personalInfo.email,
            phone: res.data.personalInfo?.phone || prev.personalInfo.phone,
            address: {
              ...prev.personalInfo.address,
              city: res.data.personalInfo?.address?.city || prev.personalInfo.address?.city,
              state: res.data.personalInfo?.address?.state || prev.personalInfo.address?.state,
            }
          },
          education: res.data.education && res.data.education.length > 0 ? res.data.education : prev.education,
          workExperience: res.data.workExperience && res.data.workExperience.length > 0 ? res.data.workExperience : prev.workExperience,
          skills: res.data.skills && res.data.skills.length > 0 ? res.data.skills : prev.skills,
          links: {
            ...prev.links,
            linkedin: res.data.links?.linkedin || prev.links.linkedin,
            github: res.data.links?.github || prev.links.github,
          },
          additionalInfo: {
            ...prev.additionalInfo,
            whyThisRole: res.data.additionalInfo?.whyThisRole || prev.additionalInfo.whyThisRole,
          }
        }));
        // Move to step 1 (Personal Info) after successful auto-fill
        setCurrentStep(1);
      } else {
        toast.error('Could not extract data from resume. Please enter details manually.', { id: parseToast });
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to parse resume';
      toast.error(`${msg}. Please enter details manually.`, { id: parseToast });
    } finally {
      setParsing(false);
    }
  };

  const updatePersonalInfo = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const updateAddress = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        address: { ...prev.personalInfo.address, [field]: value },
      },
    }));
  };

  const updateEducation = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const edu = [...prev.education];
      edu[index] = { ...edu[index], [field]: value };
      return { ...prev, education: edu };
    });
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', field: '', institution: '', university: '', graduationYear: new Date().getFullYear(), cgpa: undefined }],
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const exp = [...prev.workExperience];
      exp[index] = { ...exp[index], [field]: value };
      return { ...prev, workExperience: exp };
    });
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { companyName: '', jobTitle: '', startDate: '', endDate: '', isCurrent: false, description: '', location: '' }],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({ ...prev, workExperience: prev.workExperience.filter((_, i) => i !== index) }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error('Please confirm your information is accurate');
      return;
    }
    setSubmitting(true);
    try {
      const res = await applicationsApi.applyForJob({
        jobId,
        formData,
        coverLetter: formData.additionalInfo.whyThisRole,
      });
      if (res.success) {
        toast.success('Application submitted successfully!');
        if (job?.applicationLink) {
          setTimeout(() => {
            window.open(job.applicationLink, '_blank');
            onClose();
          }, 1500);
        } else {
          setTimeout(() => onClose(), 2000);
        }
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to submit application';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    // Basic validation
    if (currentStep === 1) {
      const { fullName, email, phone } = formData.personalInfo;
      if (!fullName.trim() || !email.trim() || !phone.trim()) {
        toast.error('Please fill in all required fields (*)');
        return;
      }
    }
    if (currentStep === 2) {
      const missing = formData.education.some(edu => !edu.degree.trim() || !edu.field.trim() || !edu.institution.trim());
      if (missing) {
        toast.error('Please fill in all education entry fields');
        return;
      }
    }
    setCurrentStep(prev => Math.min(STEPS.length - 1, prev + 1));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));
  const goToStep = (step: number) => {
    // Basic validation guard
    if (step > currentStep) {
      if (currentStep === 1) {
        const { fullName, email, phone } = formData.personalInfo;
        if (!fullName.trim() || !email.trim() || !phone.trim()) {
          toast.error('Please fill in all required fields (*)');
          return;
        }
      }
    }
    setCurrentStep(step);
  };
  
  const completionPercentage = Math.round(((currentStep + 1) / STEPS.length) * 100);

  // Theme class mappings
  const bgMain = darkMode ? 'bg-[#0a0c10]' : 'bg-slate-50';
  const textMain = darkMode ? 'text-white' : 'text-slate-900';
  const textMuted = darkMode ? 'text-white/40' : 'text-slate-500';
  const textMutedStrong = darkMode ? 'text-white/60' : 'text-slate-700';
  const textLabel = darkMode ? 'text-white/30' : 'text-slate-400';
  const borderCol = darkMode ? 'border-white/5' : 'border-slate-200';
  
  const bgSidebar = darkMode ? 'bg-[#0c0f16]' : 'bg-white';
  const bgTopbar = darkMode ? 'bg-[#0a0c10]/95' : 'bg-white/95';
  
  const bgCard = darkMode ? 'bg-[#0c0f16]' : 'bg-white shadow-sm border border-slate-200/60';
  
  // Custom button styling for navigation
  const btnSecondary = darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm';
  const btnClose = darkMode ? 'bg-white/5 hover:bg-white/10 text-white/40' : 'bg-slate-100 hover:bg-slate-200 text-slate-500';

  if (loading) {
    return (
      <div className={`fixed inset-0 z-[100] flex items-center justify-center ${bgMain}`}>
        <Loader2 className="w-8 h-8 text-[#00ff9d] animate-spin" />
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden flex flex-col font-sans ${bgMain} ${textMain}`}>
      {/* Top Bar */}
      <div className={`border-b px-6 py-4 flex items-center justify-between backdrop-blur-xl ${bgTopbar} ${borderCol}`}>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${btnClose}`}>
            <X size={20} />
          </button>
          <div>
            <h1 className={`text-lg font-black uppercase tracking-tight ${textMain}`}>{job?.title || 'Apply for Job'}</h1>
            <p className="text-[12px] text-[#00ff9d] font-bold uppercase tracking-widest">{job?.company?.name || 'Prepzo Partner'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`text-[12px] font-black uppercase tracking-widest ${textLabel}`}>{completionPercentage}% Complete</div>
          <div className={`w-32 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-slate-200'}`}>
            <div className="h-full bg-[#00ff9d] rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Step Sidebar */}
        <div className={`w-72 border-r p-6 overflow-y-auto hidden lg:block ${bgSidebar} ${borderCol}`}>
          <div className="space-y-2">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(idx)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all text-left ${
                    isActive ? 'bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d]'
                    : isCompleted ? `${darkMode ? 'text-white/60 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'}`
                    : `${darkMode ? 'text-white/20 hover:bg-white/5' : 'text-slate-300 hover:bg-slate-100'}`
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#00ff9d]/20' : isCompleted ? (darkMode ? 'bg-white/10' : 'bg-slate-100') : (darkMode ? 'bg-white/5' : 'bg-slate-50')}`}>
                    {isCompleted ? <CheckCircle2 size={16} className="text-[#00ff9d]" /> : <Icon size={16} />}
                  </div>
                  <span className="text-[13px] font-bold uppercase tracking-tight">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Form Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

                {/* Step 0: Resume Upload */}
                {currentStep === 0 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Upload Resume</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Upload your resume to auto-fill the form, or skip to fill manually.</p>
                    </div>
                    {parsing ? (
                      <div className={`border-2 border-dashed rounded-[32px] p-20 text-center flex flex-col items-center justify-center gap-4 ${darkMode ? 'border-[#00ff9d]/20 bg-[#00ff9d]/5' : 'border-[#00ff9d]/30 bg-emerald-500/5'}`}>
                        <Loader2 className="w-12 h-12 text-[#00ff9d] animate-spin" />
                        <p className={`font-bold ${textMain}`}>Scanning and analyzing resume...</p>
                        <p className={`text-sm ${textMuted}`}>Our AI is parsing your education, experience, and contact details.</p>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-[32px] p-16 text-center hover:border-[#00ff9d]/30 transition-all cursor-pointer ${darkMode ? 'border-white/10 bg-[#0c0f16]' : 'border-slate-200 bg-white shadow-sm'}`}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                        onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files[0]; if (file) handleResumeUpload(file); }}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <Upload className={`w-12 h-12 mx-auto mb-4 ${textMuted}`} />
                        <p className={`font-bold mb-2 ${textMain}`}>{resumeFile ? resumeFile.name : 'Drag & drop your resume here'}</p>
                        <p className={`text-sm ${textMuted}`}>PDF, DOCX • Max 5MB</p>
                        <input id="resume-upload" type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleResumeUpload(file); }} />
                      </div>
                    )}
                    {resumeFile && !parsing && (
                      <div className={`border rounded-2xl p-4 flex items-center justify-between ${darkMode ? 'bg-[#00ff9d]/10 border-[#00ff9d]/20' : 'bg-emerald-500/5 border-[#00ff9d]/30'}`}>
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-[#00ff9d]" />
                          <span className={`font-bold ${textMain}`}>{resumeFile.name}</span>
                        </div>
                        <button onClick={() => setResumeFile(null)} className={`hover:text-red-500 transition-colors ${textMuted}`}><X size={18} /></button>
                      </div>
                    )}
                    <p className={`text-sm text-center ${textLabel}`}>You can skip this step and fill in all details manually.</p>
                  </div>
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Personal Information</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Tell us about yourself</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Full Name *" value={formData.personalInfo.fullName} onChange={(v) => updatePersonalInfo('fullName', v)} placeholder="John Doe" />
                      <InputField label="Email *" value={formData.personalInfo.email} onChange={(v) => updatePersonalInfo('email', v)} placeholder="john@example.com" type="email" />
                      <InputField label="Phone *" value={formData.personalInfo.phone} onChange={(v) => updatePersonalInfo('phone', v)} placeholder="+91 9876543210" />
                      <InputField label="Alternate Phone" value={formData.personalInfo.alternatePhone || ''} onChange={(v) => updatePersonalInfo('alternatePhone', v)} placeholder="Optional" />
                      <InputField label="Date of Birth" value={formData.personalInfo.dateOfBirth || ''} onChange={(v) => updatePersonalInfo('dateOfBirth', v)} type="date" />
                      <div>
                        <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Gender</label>
                        <select value={formData.personalInfo.gender || ''} onChange={(e) => updatePersonalInfo('gender', e.target.value || undefined)} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all appearance-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0a0c10]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`}>
                          <option value="" className={darkMode ? 'bg-[#0a0c10]' : 'bg-white'}>Prefer not to say</option>
                          <option value="male" className={darkMode ? 'bg-[#0a0c10]' : 'bg-white'}>Male</option>
                          <option value="female" className={darkMode ? 'bg-[#0a0c10]' : 'bg-white'}>Female</option>
                          <option value="other" className={darkMode ? 'bg-[#0a0c10]' : 'bg-white'}>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-[13px] font-black uppercase tracking-widest mb-4 ${textMutedStrong}`}>Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2"><InputField label="Street" value={formData.personalInfo.address?.street || ''} onChange={(v) => updateAddress('street', v)} placeholder="123 Main St" /></div>
                        <InputField label="City" value={formData.personalInfo.address?.city || ''} onChange={(v) => updateAddress('city', v)} placeholder="Mumbai" />
                        <InputField label="State" value={formData.personalInfo.address?.state || ''} onChange={(v) => updateAddress('state', v)} placeholder="Maharashtra" />
                        <InputField label="Pincode" value={formData.personalInfo.address?.pincode || ''} onChange={(v) => updateAddress('pincode', v)} placeholder="400001" />
                        <InputField label="Country" value={formData.personalInfo.address?.country || 'India'} onChange={(v) => updateAddress('country', v)} placeholder="India" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Education */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Education</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Add your educational background</p>
                    </div>
                    {formData.education.map((edu, idx) => (
                      <div key={idx} className={`border rounded-[28px] p-6 space-y-6 relative ${bgCard}`}>
                        {formData.education.length > 1 && (
                          <button onClick={() => removeEducation(idx)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><Trash2 size={14} /></button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Degree *" value={edu.degree} onChange={(v) => updateEducation(idx, 'degree', v)} placeholder="B.Tech" />
                          <InputField label="Field of Study *" value={edu.field} onChange={(v) => updateEducation(idx, 'field', v)} placeholder="Computer Science" />
                          <InputField label="Institution / College *" value={edu.institution} onChange={(v) => updateEducation(idx, 'institution', v)} placeholder="IIT Bombay" />
                          <InputField label="University" value={edu.university || ''} onChange={(v) => updateEducation(idx, 'university', v)} placeholder="University name" />
                          <InputField label="Graduation Year *" value={String(edu.graduationYear)} onChange={(v) => updateEducation(idx, 'graduationYear', parseInt(v) || 0)} type="number" placeholder="2024" />
                          <InputField label="CGPA" value={edu.cgpa ? String(edu.cgpa) : ''} onChange={(v) => updateEducation(idx, 'cgpa', parseFloat(v) || undefined)} type="number" placeholder="8.5" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addEducation} className={`w-full py-4 rounded-2xl border border-dashed font-bold uppercase tracking-widest text-[13px] hover:border-[#00ff9d]/50 hover:text-[#00ff9d] transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-white/10 text-white/30' : 'border-slate-300 text-slate-400 bg-white shadow-sm'}`}>
                      <Plus size={18} /> Add Another Degree
                    </button>
                  </div>
                )}

                {/* Step 3: Work Experience */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Work Experience</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Add your work experience (optional for freshers)</p>
                    </div>
                    {formData.workExperience.map((exp, idx) => (
                      <div key={idx} className={`border rounded-[28px] p-6 space-y-6 relative ${bgCard}`}>
                        <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20"><Trash2 size={14} /></button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Company Name *" value={exp.companyName} onChange={(v) => updateExperience(idx, 'companyName', v)} placeholder="Google" />
                          <InputField label="Job Title *" value={exp.jobTitle} onChange={(v) => updateExperience(idx, 'jobTitle', v)} placeholder="Software Engineer" />
                          <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(idx, 'startDate', v)} placeholder="e.g. 2022-06" />
                          <InputField label="End Date" value={exp.endDate || ''} onChange={(v) => updateExperience(idx, 'endDate', v)} placeholder="e.g. 2024-05" disabled={exp.isCurrent} />
                          <InputField label="Location" value={exp.location || ''} onChange={(v) => updateExperience(idx, 'location', v)} placeholder="Bangalore" />
                          <div className="flex items-center gap-3 pt-8">
                            <input type="checkbox" checked={exp.isCurrent} onChange={(e) => updateExperience(idx, 'isCurrent', e.target.checked)} className={`w-5 h-5 rounded bg-white/5 border-white/20 text-[#00ff9d] focus:ring-[#00ff9d]/30 ${darkMode ? '' : 'border-slate-300'}`} />
                            <span className={`text-sm font-medium ${textMutedStrong}`}>Currently working here</span>
                          </div>
                        </div>
                        <div>
                          <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Description</label>
                          <textarea value={exp.description || ''} onChange={(e) => updateExperience(idx, 'description', e.target.value)} placeholder="Describe your responsibilities..." rows={3} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all resize-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0a0c10]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`} />
                        </div>
                      </div>
                    ))}
                    <button onClick={addExperience} className={`w-full py-4 rounded-2xl border border-dashed font-bold uppercase tracking-widest text-[13px] hover:border-[#00ff9d]/50 hover:text-[#00ff9d] transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-white/10 text-white/30' : 'border-slate-300 text-slate-400 bg-white shadow-sm'}`}>
                      <Plus size={18} /> Add Work Experience
                    </button>
                    {formData.workExperience.length === 0 && <p className={`text-sm text-center ${textLabel}`}>No experience? No problem — just skip this step!</p>}
                  </div>
                )}

                {/* Step 4: Skills & Links */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Skills & Links</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Your technical skills and online profiles</p>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Skills</label>
                      <div className="flex gap-3">
                        <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Type a skill and press Enter" className={`flex-1 px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0c0f16]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`} />
                        <button onClick={addSkill} className={`px-6 py-4 rounded-2xl font-bold transition-all border ${darkMode ? 'bg-[#00ff9d]/10 border-[#00ff9d]/30 text-[#00ff9d] hover:bg-[#00ff9d]/20' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20'}`}>Add</button>
                      </div>
                      {job?.requiredSkills?.length > 0 && (
                        <div className="mt-4">
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${textLabel}`}>Required for this role:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.requiredSkills.map((s: any, i: number) => {
                                const skillName = typeof s === 'string' ? s : s.skill;
                                const isAdded = formData.skills.includes(skillName);
                                return (
                                  <button key={i} onClick={() => !isAdded && setFormData(prev => ({ ...prev, skills: [...prev.skills, skillName] }))} className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all ${isAdded ? 'bg-[#00ff9d]/20 border border-[#00ff9d]/30 text-[#00ff9d]' : (darkMode ? 'bg-white/5 border-white/10 text-white/40 hover:border-[#00ff9d]/30 hover:text-[#00ff9d]' : 'bg-slate-100 border-slate-200 text-slate-500 hover:border-[#00ff9d]/30 hover:text-[#00ff9d]')}`}>
                                    {isAdded ? '✓ ' : '+ '}{skillName}
                                  </button>
                                );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.skills.map((skill) => (
                          <span key={skill} className={`px-4 py-2 rounded-xl text-[13px] font-bold flex items-center gap-2 border ${darkMode ? 'bg-[#00ff9d]/10 border-[#00ff9d]/20 text-[#00ff9d]' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700'}`}>
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-red-500"><X size={14} /></button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className={`text-[13px] font-black uppercase tracking-widest ${textMutedStrong}`}>Online Profiles</h3>
                      <InputField label="LinkedIn" value={formData.links.linkedin || ''} onChange={(v) => setFormData(prev => ({ ...prev, links: { ...prev.links, linkedin: v } }))} placeholder="https://linkedin.com/in/username" />
                      <InputField label="GitHub" value={formData.links.github || ''} onChange={(v) => setFormData(prev => ({ ...prev, links: { ...prev.links, github: v } }))} placeholder="https://github.com/username" />
                      <InputField label="Portfolio" value={formData.links.portfolio || ''} onChange={(v) => setFormData(prev => ({ ...prev, links: { ...prev.links, portfolio: v } }))} placeholder="https://yourportfolio.com" />
                    </div>
                  </div>
                )}

                {/* Step 5: Availability */}
                {currentStep === 5 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Availability</h2>
                      <p className={`font-medium ${textMutedStrong}`}>When can you start?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Notice Period</label>
                        <select value={formData.availability.noticePeriod} onChange={(e) => setFormData(prev => ({ ...prev, availability: { ...prev.availability, noticePeriod: e.target.value } }))} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all appearance-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0a0c10]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`}>
                          <option value="Immediate">Immediate</option>
                          <option value="15 days">15 Days</option>
                          <option value="1 month">1 Month</option>
                          <option value="2 months">2 Months</option>
                          <option value="3 months">3 Months</option>
                        </select>
                      </div>
                      <InputField label="Preferred Joining Date" value={formData.availability.preferredJoiningDate || ''} onChange={(v) => setFormData(prev => ({ ...prev, availability: { ...prev.availability, preferredJoiningDate: v } }))} type="date" />
                      <InputField label="Expected Salary (Annual ₹)" value={formData.availability.expectedSalary ? String(formData.availability.expectedSalary) : ''} onChange={(v) => setFormData(prev => ({ ...prev, availability: { ...prev.availability, expectedSalary: parseInt(v) || undefined } }))} type="number" placeholder="e.g. 800000" />
                      <div className="flex items-center gap-3 pt-8">
                        <input type="checkbox" checked={formData.availability.willingToRelocate} onChange={(e) => setFormData(prev => ({ ...prev, availability: { ...prev.availability, willingToRelocate: e.target.checked } }))} className={`w-5 h-5 rounded bg-white/5 border-white/20 text-[#00ff9d] focus:ring-[#00ff9d]/30 ${darkMode ? '' : 'border-slate-300'}`} />
                        <span className={`text-sm font-medium ${textMutedStrong}`}>Willing to relocate</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Cover Letter */}
                {currentStep === 6 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Cover Letter</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Tell us why you're excited about this role</p>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Why This Role? *</label>
                      <textarea value={formData.additionalInfo.whyThisRole || ''} onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: { ...prev.additionalInfo, whyThisRole: e.target.value } }))} placeholder="I'm excited about this opportunity because..." rows={6} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all resize-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0c0f16]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`} />
                    </div>
                    <div>
                      <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>How Did You Hear About This Position?</label>
                      <select value={formData.additionalInfo.howDidYouHear || ''} onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: { ...prev.additionalInfo, howDidYouHear: e.target.value } }))} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all appearance-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0a0c10]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`}>
                        <option value="">Select...</option>
                        <option value="Prepzo Platform">Prepzo Platform</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Referral">Referral</option>
                        <option value="Company Website">Company Website</option>
                        <option value="Job Fair">Job Fair</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>Additional Notes</label>
                      <textarea value={formData.additionalInfo.additionalNotes || ''} onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: { ...prev.additionalInfo, additionalNotes: e.target.value } }))} placeholder="Anything else you'd like us to know?" rows={3} className={`w-full px-6 py-4 border rounded-2xl font-medium focus:border-[#00ff9d]/30 focus:ring-0 transition-all resize-none ${darkMode ? 'bg-white/5 border-white/10 text-white bg-[#0c0f16]' : 'bg-white border-slate-200 text-slate-900 bg-white'}`} />
                    </div>
                  </div>
                )}

                {/* Step 7: Review & Submit */}
                {currentStep === 7 && (
                  <div className="space-y-8">
                    <div>
                      <h2 className={`text-3xl font-black uppercase tracking-tighter mb-2 ${textMain}`}>Review & Submit</h2>
                      <p className={`font-medium ${textMutedStrong}`}>Review your application before submitting</p>
                    </div>
                    <div className={`border rounded-[28px] p-6 flex items-center gap-6 ${darkMode ? 'bg-[#00ff9d]/5 border-[#00ff9d]/20' : 'bg-emerald-500/5 border-emerald-500/20 shadow-sm'}`}>
                      <div className={`w-16 h-16 border rounded-2xl flex items-center justify-center ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                        {job?.company?.logo ? <img src={job.company.logo} alt="" className="w-10 h-10 object-contain" /> : <Building2 size={24} className={textLabel} />}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black ${textMain}`}>{job?.title}</h3>
                        <p className="text-[#00ff9d] font-bold text-sm">{job?.company?.name} • {job?.locations?.[0]?.city || 'Remote'}</p>
                      </div>
                    </div>

                    <ReviewSection title="Personal Info" onEdit={() => goToStep(1)}>
                      <p className={`font-bold ${textMain}`}>{formData.personalInfo.fullName || '—'}</p>
                      <p className={textMutedStrong}>{formData.personalInfo.email} • {formData.personalInfo.phone}</p>
                      {formData.personalInfo.address?.city && <p className={textMuted}>{formData.personalInfo.address.city}, {formData.personalInfo.address.state}</p>}
                    </ReviewSection>

                    <ReviewSection title="Education" onEdit={() => goToStep(2)}>
                      {formData.education.map((edu, idx) => (
                        <div key={idx} className="mb-2">
                          <p className={`font-bold ${textMain}`}>{edu.degree} in {edu.field}</p>
                          <p className={textMutedStrong}>{edu.institution} • {edu.graduationYear}{edu.cgpa ? ` • CGPA: ${edu.cgpa}` : ''}</p>
                        </div>
                      ))}
                    </ReviewSection>

                    {formData.workExperience.length > 0 && (
                      <ReviewSection title="Experience" onEdit={() => goToStep(3)}>
                        {formData.workExperience.map((exp, idx) => (
                          <div key={idx} className="mb-2">
                            <p className={`font-bold ${textMain}`}>{exp.jobTitle} at {exp.companyName}</p>
                            <p className={textMutedStrong}>{exp.location}{exp.isCurrent ? ' • Current' : ''}</p>
                          </div>
                        ))}
                      </ReviewSection>
                    )}

                    <ReviewSection title="Skills" onEdit={() => goToStep(4)}>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map(s => <span key={s} className={`px-3 py-1 rounded-lg text-sm font-bold border ${darkMode ? 'bg-[#00ff9d]/10 border-[#00ff9d]/20 text-[#00ff9d]' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700'}`}>{s}</span>)}
                        {formData.skills.length === 0 && <p className={textMuted}>No skills added</p>}
                      </div>
                    </ReviewSection>

                    <ReviewSection title="Availability" onEdit={() => goToStep(5)}>
                      <p className={textMain}>Notice Period: {formData.availability.noticePeriod}</p>
                      {formData.availability.expectedSalary && <p className={textMutedStrong}>Expected: ₹{formData.availability.expectedSalary?.toLocaleString('en-IN')}/year</p>}
                      <p className={textMuted}>Relocate: {formData.availability.willingToRelocate ? 'Yes' : 'No'}</p>
                    </ReviewSection>

                    <div className={`border rounded-2xl p-6 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <label className="flex items-start gap-4 cursor-pointer">
                        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className={`w-5 h-5 rounded bg-white/5 border-white/20 text-[#00ff9d] focus:ring-[#00ff9d]/30 mt-0.5 ${darkMode ? '' : 'border-slate-300'}`} />
                        <span className={`text-sm leading-relaxed ${textMutedStrong}`}>I confirm that the information provided is accurate and complete. I understand that any false statements may result in the withdrawal of my application.</span>
                      </label>
                    </div>

                    {job?.applicationLink && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-center gap-3">
                        <ArrowUpRight size={18} className="text-blue-400" />
                        <p className="text-blue-300 text-sm">After submission, you'll be redirected to the company's official job page.</p>
                      </div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`border-t px-6 py-4 flex items-center justify-between backdrop-blur-xl ${bgTopbar} ${borderCol}`}>
        <button onClick={currentStep === 0 ? onClose : prevStep} className={`px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[13px] transition-all flex items-center gap-2 ${btnSecondary}`}>
          <ChevronLeft size={18} /> {currentStep === 0 ? 'Cancel' : 'Back'}
        </button>
        <div className={`lg:hidden text-[12px] font-black uppercase tracking-widest ${textLabel}`}>Step {currentStep + 1} of {STEPS.length}</div>
        {currentStep === STEPS.length - 1 ? (
          <button onClick={handleSubmit} disabled={submitting || !agreed} className="px-10 py-4 rounded-2xl bg-[#00ff9d] text-[#0a0c10] font-black uppercase tracking-widest text-[13px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2">
            {submitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        ) : (
          <button onClick={nextStep} className="px-10 py-4 rounded-2xl bg-[#00ff9d] text-[#0a0c10] font-black uppercase tracking-widest text-[13px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
            Next <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder = '', type = 'text', disabled = false }: {
  label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; disabled?: boolean;
}) {
  const { darkMode } = useAppStore();
  const textLabel = darkMode ? 'text-white/30' : 'text-slate-400';
  const textInput = darkMode ? 'text-white' : 'text-slate-900';
  const bgInput = darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200';
  return (
    <div>
      <label className={`block text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${textLabel}`}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        className={`w-full px-6 py-4 border rounded-2xl font-medium placeholder-white/20 focus:border-[#00ff9d]/30 focus:ring-0 transition-all disabled:opacity-50 ${bgInput} ${textInput}`} />
    </div>
  );
}

function ReviewSection({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit: () => void }) {
  const { darkMode } = useAppStore();
  const textLabel = darkMode ? 'text-white/40' : 'text-slate-400';
  const bgSection = darkMode ? 'border-white/5 bg-[#0c0f16]' : 'bg-white border-slate-200/80 shadow-sm';
  return (
    <div className={`border rounded-[20px] p-6 ${bgSection}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-[12px] font-black uppercase tracking-widest ${textLabel}`}>{title}</h3>
        <button onClick={onEdit} className="text-[#00ff9d] hover:underline text-[12px] font-bold uppercase tracking-wider">Edit</button>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
