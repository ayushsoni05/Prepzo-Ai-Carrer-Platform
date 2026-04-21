import { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Target, 
  Code, 
  Upload, 
  Save, 
  Trash2, 
  Globe, 
  Linkedin, 
  Github, 
  Phone,
  FileText,
  Briefcase,
  Zap,
  Star,
  CalendarDays,
  Clock
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { uploadApi } from '@/api/auth';
import { GlassCard, GlassButton } from '@/components/ui/GlassCard';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { 
  SearchableDropdown, 
  degreeOptions, 
  yearOfStudyOptions, 
  placementTimelineOptions, 
  expectedCtcOptions,
  getFieldsOfStudyByDegree,
  getTargetRolesByField
} from '@/components/ui/SearchableDropdown';
import { CollegeDropdown } from '@/components/ui/CollegeDropdown';
import { TechnologySelector } from '@/components/ui/TechnologySelector';
import ThinkingLoader from '@/components/ui/loading';
import toast from 'react-hot-toast';

interface SkillSliderProps {
  skill: string;
  value: number;
  onChange: (val: number) => void;
}

const SkillSlider = ({ skill, value, onChange }: SkillSliderProps) => (
  <div className="group">
    <div className="flex items-center justify-between mb-3">
      <label className="text-[13px] font-black uppercase tracking-tight text-white/70 group-hover:text-[#00ff9d] transition-colors">{skill}</label>
      <span className="text-[12px] font-black text-[#00ff9d] italic">{value}/10</span>
    </div>
    <div className="relative">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none bg-white/5 accent-[#00ff9d] cursor-pointer"
      />
    </div>
  </div>
);

export function SettingsForm() {
  const { user, updateProfileAsync } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    collegeName: user?.collegeName || '',
    degree: user?.degree || '',
    fieldOfStudy: user?.fieldOfStudy || '',
    yearOfStudy: user?.yearOfStudy || '',
    cgpa: user?.cgpa || '',
    targetRole: user?.targetRole || '',
    expectedCtc: user?.expectedCtc || '',
    placementTimeline: user?.placementTimeline || '',
    knownTechnologies: user?.knownTechnologies || [],
    skillRatings: user?.skillRatings || {}
  });

  // Derived options
  const fieldOptions = getFieldsOfStudyByDegree(formData.degree);
  const roleOptions = getTargetRolesByField(formData.fieldOfStudy);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfileAsync(formData);
      toast.success('Neural profile synchronized successfully');
    } catch (error: any) {
      toast.error(error.message || 'Synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await uploadApi.uploadResume(file);
      await updateProfileAsync({ resumeUrl: response.resumeUrl });
      toast.success('Resume node uploaded and mapped');
    } catch (error: any) {
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your resume node?')) return;
    try {
      await uploadApi.deleteResume();
      await updateProfileAsync({ resumeUrl: undefined });
      toast.success('Resume node purged');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#00ff9d] mb-4">Command Center</p>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Settings <span className="text-white/20">Matrix</span></h1>
        </div>
        <GlassButton 
          onClick={handleSave} 
          disabled={loading}
          className="bg-[#00ff9d] text-[#0a0c10] px-10 py-5 rounded-2xl flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#00ff9d]/10"
        >
          {loading ? <ThinkingLoader /> : <Save size={20} />}
          <span className="font-black uppercase tracking-widest text-[13px]">Sync Profile</span>
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Appearance Section */}
        <div className="lg:col-span-12">
          <GlassCard className="p-8 rounded-[32px] border-white/5 bg-[#161a20]/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className="text-white/40" size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">System Appearance</h3>
                  <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest mt-1">Switch between light and dark glass themes</p>
               </div>
            </div>
            <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
               <ThemeToggle />
            </div>
          </GlassCard>
        </div>

        {/* Left Column: Personal & Academic */}
        <div className="lg:col-span-7 space-y-8">
          {/* Personal Identity */}
          <GlassCard className="p-10 rounded-[40px] border-white/5 bg-[#161a20]/40 backdrop-blur-3xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                <User className="text-[#00ff9d]" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Identity Node</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-[#00ff9d]/50 focus:ring-0 transition-all"
                  placeholder="Enter your system name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Phone Vector</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-[#00ff9d]/50 focus:ring-0 transition-all"
                    placeholder="Physical contact ID"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">LinkedIn Bridge</label>
                <div className="relative">
                  <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text" 
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-[#00ff9d]/50 focus:ring-0 transition-all"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">GitHub Repository</label>
                <div className="relative">
                  <Github className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text" 
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-[#00ff9d]/50 focus:ring-0 transition-all"
                    placeholder="github.com/username"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Academic Node */}
          <GlassCard className="p-10 rounded-[40px] border-white/5 bg-[#161a20]/40">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                <GraduationCap className="text-[#00ff9d]" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Academic Backbone</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">University / Institute</label>
                <CollegeDropdown 
                  value={formData.collegeName}
                  onChange={(val) => setFormData({...formData, collegeName: val})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Degree Program</label>
                  <SearchableDropdown 
                    value={formData.degree}
                    onChange={(val) => setFormData({...formData, degree: val, fieldOfStudy: ''})}
                    options={degreeOptions}
                    placeholder="Select qualification"
                    icon={FileText}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Field of Intelligence</label>
                  <SearchableDropdown 
                    value={formData.fieldOfStudy}
                    onChange={(val) => setFormData({...formData, fieldOfStudy: val})}
                    options={fieldOptions}
                    placeholder="Select specialization"
                    icon={Target}
                    searchable={true}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Study Cycle</label>
                  <SearchableDropdown 
                    value={formData.yearOfStudy}
                    onChange={(val) => setFormData({...formData, yearOfStudy: val})}
                    options={yearOfStudyOptions}
                    placeholder="Current year"
                    icon={CalendarDays as any}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">GPA Signal (0-10)</label>
                  <input 
                    type="text" 
                    value={formData.cgpa}
                    onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold"
                    placeholder="Current academic score"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Career & Resume */}
        <div className="lg:col-span-5 space-y-8">
          {/* Career Vector */}
          <GlassCard className="p-10 rounded-[40px] border-white/5 bg-[#161a20]/40">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                <Briefcase className="text-[#00ff9d]" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Career Vector</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Target Command Role</label>
                <SearchableDropdown 
                  value={formData.targetRole}
                  onChange={(val) => setFormData({...formData, targetRole: val})}
                  options={roleOptions}
                  placeholder="The role you seek"
                  icon={Briefcase}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Expected Compensation (LPA)</label>
                <SearchableDropdown 
                  value={formData.expectedCtc}
                  onChange={(val) => setFormData({...formData, expectedCtc: val})}
                  options={expectedCtcOptions}
                  placeholder="Value of expertise"
                  icon={Zap}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Placement Window</label>
                <SearchableDropdown 
                  value={formData.placementTimeline}
                  onChange={(val) => setFormData({...formData, placementTimeline: val})}
                  options={placementTimelineOptions}
                  placeholder="Deployment timeline"
                  icon={Clock as any}
                />
              </div>
            </div>
          </GlassCard>

          {/* Resume Blueprint */}
          <GlassCard className="p-10 rounded-[40px] border-white/5 bg-[#161a20]/40">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                <FileText className="text-[#00ff9d]" size={24} />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Resume Blueprint</h2>
            </div>

            {user?.resumeUrl ? (
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00ff9d]/10 flex items-center justify-center">
                      <FileText className="text-[#00ff9d]" size={20} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-white uppercase">Primary Blueprint</p>
                      <p className="text-[10px] font-bold text-white/30 uppercase mt-1">Mapped Successfully</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleResumeDelete}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <a 
                  href={user.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-xl border border-[#00ff9d]/20 bg-[#00ff9d]/5 text-[#00ff9d] text-center font-black text-[11px] uppercase tracking-widest hover:bg-[#00ff9d]/10 transition-all"
                >
                  View Current Link
                </a>
              </div>
            ) : (
              <div className="p-10 border-2 border-dashed border-white/10 rounded-[40px] text-center">
                <div className="mb-6 mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Upload className="text-white/20" size={32} />
                </div>
                <h4 className="text-white font-black uppercase tracking-tight mb-2">No Blueprint Detected</h4>
                <p className="text-white/30 text-[11px] font-bold uppercase mb-8">Upload your resume to calibrate recommendations</p>
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleResumeUpload(file);
                  }}
                />
                <label 
                  htmlFor="resume-upload"
                  className="px-8 py-4 bg-white text-[#0a0c10] rounded-2xl font-black text-[11px] uppercase tracking-widest cursor-pointer hover:bg-[#00ff9d] transition-all inline-block"
                >
                  {uploading ? <ThinkingLoader /> : 'Upload Blueprint'}
                </label>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Bottom Full-Width: Skill Matrix */}
        <div className="lg:col-span-12">
          <GlassCard className="p-10 rounded-[40px] border-white/5 bg-[#161a20]/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center">
                  <Code className="text-[#00ff9d]" size={24} />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Signal Expertise Matrix</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-3">
                    <Zap size={14} className="text-[#00ff9d]" /> Core Stack
                  </h3>
                  <TechnologySelector 
                    value={formData.knownTechnologies.join(', ')}
                    onChange={(techs) => setFormData({...formData, knownTechnologies: techs.split(',').map(t => t.trim()).filter(t => t.length > 0)})}
                  />
                </div>
              </div>

              <div className="space-y-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 flex items-center gap-3">
                  <Star size={14} className="text-[#00ff9d]" /> Power Ratings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  {Object.entries(formData.skillRatings).map(([skill, value]) => (
                    <SkillSlider 
                      key={skill}
                      skill={skill}
                      value={value as number}
                      onChange={(val) => {
                        setFormData({
                          ...formData,
                          skillRatings: { ...formData.skillRatings, [skill]: val }
                        });
                      }}
                    />
                  ))}
                  {Object.keys(formData.skillRatings).length === 0 && (
                     <div className="col-span-full py-10 text-center border border-white/5 rounded-3xl">
                        <p className="text-[11px] font-black text-white/20 uppercase tracking-widest italic italic">Initialize onboarding to generate skill maps.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
