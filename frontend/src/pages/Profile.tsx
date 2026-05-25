import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { Code2, Flame, Award, Loader2, ChevronLeft, MapPin, Briefcase, Calendar, ExternalLink, Linkedin, Github, Edit2, Save, X, Upload, Trash2, FileText, Target, CalendarDays, Zap, GraduationCap } from 'lucide-react';
import api from '../api/axios';
import { uploadApi } from '@/api/auth';
import { getFileUrl } from '@/utils/fileUrl';
import { GridBeam } from '@/components/ui/background-grid-beam';
import Tilt from 'react-parallax-tilt';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

interface Project {
  title: string;
  description?: string;
  link?: string;
  technologies?: string[];
}

interface ProfileData {
  fullName: string;
  avatar: string;
  bio?: string;
  location?: string;
  coverPhoto?: string;
  targetRole?: string;
  linkedin?: string;
  github?: string;
  experiences?: Experience[];
  portfolioProjects?: Project[];
  knownTechnologies?: string[];
  skillRatings?: Record<string, number>;
  collegeName?: string;
  degree?: string;
  fieldOfStudy?: string;
  yearOfStudy?: string;
  cgpa?: string;
  expectedCtc?: string;
  placementTimeline?: string;
  xp: number;
  streak: number;
  badges: { name: string; earnedAt: string }[];
  solvedProblems: { problemId: string; difficulty: string; solvedAt: string }[];
  stats: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
  };
  recentProblems: { problemId: string; difficulty: string; solvedAt: string }[];
}

const getRank = (xp: number) => {
  if (xp < 100) return { title: 'Novice', color: 'text-gray-400' };
  if (xp < 500) return { title: 'Apprentice', color: 'text-green-400' };
  if (xp < 1000) return { title: 'Specialist', color: 'text-blue-400' };
  if (xp < 2500) return { title: 'Expert', color: 'text-purple-400' };
  return { title: 'Master', color: 'text-yellow-400' };
};

const SkillSlider = ({ skill, value, onChange }: { skill: string, value: number, onChange: (val: number) => void }) => (
  <div className="group">
    <div className="flex items-center justify-between mb-3">
      <label className="text-[13px] font-black uppercase tracking-tight text-white/70 group-hover:text-[#5ed29c] transition-colors">{skill}</label>
      <span className="text-[12px] font-black text-[#5ed29c] italic">{value}/10</span>
    </div>
    <div className="relative">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none bg-white/5 accent-[#5ed29c] cursor-pointer"
      />
    </div>
  </div>
);

const Profile = () => {
  const hash = window.location.pathname.split('?')[0];
  const userIdFromUrl = hash.startsWith('#portfolio/') ? hash.replace('#portfolio/', '') : hash.replace('#/portfolio/', '') || hash.replace('/portfolio/', '');
  
  const navigate = useNavigate();
  const { user, updateProfileAsync } = useAuthStore();
  
  // If no userId in URL, or it matches current user, it's their own profile
  const isOwnProfile = !userIdFromUrl || userIdFromUrl === user?.id || userIdFromUrl === 'portfolio';
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile && user) {
          // Use logged in user data, mapping it to ProfileData format
          const mappedProfile: any = {
            ...user,
            xp: user.xp || 0,
            streak: user.streak || 0,
            badges: user.badges || [],
            solvedProblems: user.solvedProblems || [],
            stats: user.stats || { totalSolved: 0, easy: 0, medium: 0, hard: 0 },
            recentProblems: user.recentProblems || [],
          };
          setProfile(mappedProfile);
          setFormData(mappedProfile);
        } else if (userIdFromUrl && userIdFromUrl !== 'portfolio') {
          const res = await api.get(`/users/portfolio/${userIdFromUrl}`);
          if (res.data.success) {
            setProfile(res.data.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userIdFromUrl, user, isOwnProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#5ed29c] animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col items-center justify-center font-rubik">
        <h2 className="text-2xl font-[900] uppercase italic tracking-widest mb-4">Profile Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-[#5ed29c] hover:underline font-bold uppercase tracking-widest text-xs">Return</button>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateProfileAsync(formData);
      setProfile({ ...profile, ...formData });
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handleImageUpload = async (file: File, type: 'avatar' | 'coverPhoto') => {
    setUploading(true);
    try {
      const response = await uploadApi.uploadImage(file);
      if (response.success && response.imageUrl) {
        setFormData((prev: any) => ({ ...prev, [type]: response.imageUrl }));
        toast.success(`${type === 'avatar' ? 'Profile' : 'Cover'} photo uploaded`);
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const addExperience = () => setFormData({...formData, experiences: [...(formData.experiences || []), { company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }]});
  const removeExperience = (index: number) => {
    const newExps = [...formData.experiences];
    newExps.splice(index, 1);
    setFormData({...formData, experiences: newExps});
  };
  const updateExperience = (index: number, field: string, value: any) => {
    const newExps = [...formData.experiences];
    newExps[index] = { ...newExps[index], [field]: value };
    setFormData({...formData, experiences: newExps});
  };

  const addProject = () => setFormData({...formData, portfolioProjects: [...(formData.portfolioProjects || []), { title: '', description: '', link: '', technologies: [] }]});
  const removeProject = (index: number) => {
    const newProjs = [...formData.portfolioProjects];
    newProjs.splice(index, 1);
    setFormData({...formData, portfolioProjects: newProjs});
  };
  const updateProject = (index: number, field: string, value: any) => {
    const newProjs = [...formData.portfolioProjects];
    newProjs[index] = { ...newProjs[index], [field]: value };
    setFormData({...formData, portfolioProjects: newProjs});
  };

  const rank = getRank(profile.xp);
  const heatmapData: any[] = [];
  const today = new Date();
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = profile.solvedProblems?.filter(p => p.solvedAt.startsWith(dateStr)).length || 0;
    heatmapData.push({
      date: dateStr,
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4
    });
  }

  const formatMonthYear = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black pb-20 relative">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none fixed">
        <GridBeam className="w-full h-full" />
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 relative z-10 space-y-8">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          {isOwnProfile && (
            <div>
              {editMode ? (
                <div className="flex gap-2">
                  <button onClick={() => { setFormData(profile); setEditMode(false); }} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-black uppercase tracking-widest transition-colors">
                    <X size={14} /> Cancel
                  </button>
                  <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#5ed29c] text-black hover:bg-[#5ed29c]/90 rounded-lg text-xs font-black uppercase tracking-widest transition-colors shadow-lg shadow-[#5ed29c]/20">
                    <Save size={14} /> Save Profile
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-black uppercase tracking-widest transition-colors">
                  <Edit2 size={14} /> Edit Profile
                </button>
              )}
            </div>
          )}
        </div>

        {/* 1. Hero / Header Section */}
        <div className="bg-[#161a20] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
          {/* Cover Photo */}
          <div className="h-64 md:h-80 w-full relative group">
            <div className="absolute inset-0 bg-[#0a0c10]/20" />
            {(editMode ? formData.coverPhoto : profile.coverPhoto) ? (
              <img 
                src={getFileUrl(editMode ? formData.coverPhoto : profile.coverPhoto!)} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-900/20 to-[#0a0c10] border-b border-white/5" />
            )}
            
            {editMode && (
              <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full backdrop-blur-sm hover:bg-black transition-colors cursor-pointer">
                <label htmlFor="cover-upload" className="cursor-pointer flex items-center gap-2 px-2 text-xs font-black uppercase tracking-widest text-white">
                  <Upload size={16} /> {uploading ? 'Uploading...' : 'Change Cover'}
                </label>
                <input type="file" id="cover-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'coverPhoto')} />
              </div>
            )}
          </div>
          
          <div className="px-6 md:px-10 pb-10 relative">
            {/* Avatar */}
            <div className="absolute -top-20 md:-top-24 left-4 md:left-8 group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0a0c10] overflow-hidden bg-[#11141a] shadow-2xl relative">
                <img 
                  src={(editMode ? formData.avatar : profile.avatar) ? getFileUrl(editMode ? formData.avatar : profile.avatar!) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover"
                />
                {editMode && (
                  <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm">
                    <Upload size={24} className="text-white" />
                  </label>
                )}
                <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-20 md:pt-28">
              <div className="flex-1 w-full max-w-2xl">
                {editMode ? (
                  <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Full Name</Label>
                        <Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                      </div>
                      <div>
                        <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Target Role / Headline</Label>
                        <Input value={formData.targetRole} onChange={(e) => setFormData({...formData, targetRole: e.target.value})} />
                      </div>
                      <div>
                        <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Location</Label>
                        <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                      </div>
                      <div>
                        <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">LinkedIn URL</Label>
                        <Input value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                      </div>
                      <div>
                        <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">GitHub URL</Label>
                        <Input value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl md:text-5xl font-[900] text-white tracking-tight">{profile.fullName}</h1>
                    <p className="text-lg text-white/80 font-medium mt-1">{profile.targetRole || 'Software Engineer'}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/50 font-medium">
                      {profile.location && (
                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.location}</span>
                      )}
                      {profile.experiences && profile.experiences.length > 0 && (
                        <span className="flex items-center gap-1.5"><Briefcase size={16} /> {profile.experiences[0]?.company}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {!editMode && profile.linkedin && (
                  <a href={profile.linkedin.includes('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white hover:text-[#0a66c2]">
                    <Linkedin size={20} />
                  </a>
                )}
                {!editMode && profile.github && (
                  <a href={profile.github.includes('http') ? profile.github : `https://${profile.github}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white hover:text-gray-400">
                    <Github size={20} />
                  </a>
                )}
                <div className={`px-4 py-2.5 rounded-xl border flex flex-col items-center justify-center ${rank.title === 'Master' ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-[#5ed29c]/20 bg-[#5ed29c]/10'}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${rank.color}`}>{rank.title} Rank</span>
                  <span className="text-sm font-bold text-white mt-0.5">{profile.xp?.toLocaleString() || 0} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left / 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            {(profile.bio || editMode) && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-lg font-[900] text-white mb-4 uppercase tracking-widest">About</h2>
                {editMode ? (
                  <textarea 
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#5ed29c] transition-colors"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Summarize your professional background..."
                    maxLength={500}
                  />
                ) : (
                  <p className="text-white/70 leading-relaxed text-sm whitespace-pre-wrap">{profile.bio}</p>
                )}
              </div>
            )}

            {/* Experience */}
            {(profile.experiences?.length || editMode) && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-[900] text-white uppercase tracking-widest">Experience</h2>
                  {editMode && (
                    <button onClick={addExperience} className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest hover:underline">+ Add Role</button>
                  )}
                </div>
                
                <div className="space-y-8">
                  {editMode ? (
                    formData.experiences?.map((exp: any, index: number) => (
                      <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-xl relative group">
                        <button onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div><Label className="uppercase tracking-widest text-[10px] text-white/50">Company</Label><Input value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} /></div>
                          <div><Label className="uppercase tracking-widest text-[10px] text-white/50">Role</Label><Input value={exp.role} onChange={(e) => updateExperience(index, 'role', e.target.value)} /></div>
                          <div><Label className="uppercase tracking-widest text-[10px] text-white/50">Start Date</Label><Input type="month" value={exp.startDate} onChange={(e) => updateExperience(index, 'startDate', e.target.value)} /></div>
                          <div>
                            <Label className="uppercase tracking-widest text-[10px] text-white/50">End Date</Label>
                            <div className="flex items-center gap-4">
                              <Input type="month" value={exp.endDate} disabled={exp.isCurrent} onChange={(e) => updateExperience(index, 'endDate', e.target.value)} className="flex-1" />
                              <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white/70">
                                <input type="checkbox" checked={exp.isCurrent} onChange={(e) => updateExperience(index, 'isCurrent', e.target.checked)} className="accent-[#5ed29c]" />
                                Current
                              </label>
                            </div>
                          </div>
                        </div>
                        <Label className="uppercase tracking-widest text-[10px] text-white/50">Description</Label>
                        <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#5ed29c] transition-colors" value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)} />
                      </div>
                    ))
                  ) : (
                    profile.experiences?.map((exp, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {i !== profile.experiences!.length - 1 && <div className="absolute top-10 bottom-[-2rem] left-5 w-[2px] bg-white/10" />}
                        <div className="w-10 h-10 shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center z-10">
                          <Briefcase size={18} className="text-white/50" />
                        </div>
                        <div className="flex-1 pb-4">
                          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                          <p className="text-[#5ed29c] font-medium text-sm mb-1">{exp.company}</p>
                          <p className="text-xs text-white/40 flex items-center gap-1.5 mb-3 font-medium">
                            <Calendar size={12} />
                            {formatMonthYear(exp.startDate)} - {exp.isCurrent ? 'Present' : formatMonthYear(exp.endDate || '')}
                          </p>
                          {exp.description && <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Academic */}
            {(profile.collegeName || editMode) && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-lg font-[900] text-white mb-6 uppercase tracking-widest">Education</h2>
                {editMode ? (
                  <div className="space-y-4">
                    <CollegeDropdown value={formData.collegeName} onChange={(val) => setFormData({...formData, collegeName: val})} />
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Degree</Label><SearchableDropdown value={formData.degree} onChange={(val) => setFormData({...formData, degree: val, fieldOfStudy: ''})} options={degreeOptions} placeholder="Degree" icon={FileText as any} /></div>
                      <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Field</Label><SearchableDropdown value={formData.fieldOfStudy} onChange={(val) => setFormData({...formData, fieldOfStudy: val})} options={getFieldsOfStudyByDegree(formData.degree)} placeholder="Field" icon={Target as any} searchable /></div>
                      <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Year</Label><SearchableDropdown value={formData.yearOfStudy} onChange={(val) => setFormData({...formData, yearOfStudy: val})} options={yearOfStudyOptions} placeholder="Year" icon={CalendarDays as any} /></div>
                      <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">GPA</Label><Input value={formData.cgpa} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} placeholder="e.g. 3.8/4.0" /></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 relative">
                    <div className="w-10 h-10 shrink-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center z-10">
                      <GraduationCap size={18} className="text-white/50" />
                    </div>
                    <div className="flex-1 pb-4">
                      <h3 className="text-lg font-bold text-white">{profile.collegeName}</h3>
                      <p className="text-[#5ed29c] font-medium text-sm mb-1">{profile.degree} in {profile.fieldOfStudy}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1.5 mb-3 font-medium">Year: {profile.yearOfStudy} • GPA: {profile.cgpa}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Projects */}
            {(profile.portfolioProjects?.length || editMode) && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-[900] text-white uppercase tracking-widest">Projects</h2>
                  {editMode && (
                    <button onClick={addProject} className="text-[10px] font-black text-[#5ed29c] uppercase tracking-widest hover:underline">+ Add Project</button>
                  )}
                </div>
                
                {editMode ? (
                  <div className="space-y-6">
                    {formData.portfolioProjects?.map((proj: any, index: number) => (
                      <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-xl relative group">
                        <button onClick={() => removeProject(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div><Label className="uppercase tracking-widest text-[10px] text-white/50">Title</Label><Input value={proj.title} onChange={(e) => updateProject(index, 'title', e.target.value)} /></div>
                          <div><Label className="uppercase tracking-widest text-[10px] text-white/50">Link</Label><Input value={proj.link} onChange={(e) => updateProject(index, 'link', e.target.value)} /></div>
                        </div>
                        <div className="mb-4">
                          <Label className="uppercase tracking-widest text-[10px] text-white/50">Technologies (comma separated)</Label>
                          <Input value={(proj.technologies || []).join(', ')} onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t.length > 0))} />
                        </div>
                        <div>
                          <Label className="uppercase tracking-widest text-[10px] text-white/50">Description</Label>
                          <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#5ed29c] transition-colors" value={proj.description} onChange={(e) => updateProject(index, 'description', e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.portfolioProjects?.map((proj, i) => (
                      <div key={i} className="bg-[#0a0c10] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white text-base">{proj.title}</h3>
                          {proj.link && (
                            <a href={proj.link.includes('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#5ed29c] transition-colors p-1">
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-white/60 mb-4 flex-1 line-clamp-3">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {proj.technologies.slice(0, 4).map((tech, j) => (
                              <span key={j} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 text-white/70 rounded border border-white/5">
                                {tech}
                              </span>
                            ))}
                            {proj.technologies.length > 4 && (
                              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 text-white/40">+{proj.technologies.length - 4}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar (Right / 1 Col) */}
          <div className="space-y-8">
            
            {/* Skills */}
            {(profile.knownTechnologies?.length || editMode) && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Skills & Expertise</h2>
                {editMode ? (
                  <div className="space-y-6">
                    <div>
                      <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Tech Stack</Label>
                      <TechnologySelector 
                        value={(formData.knownTechnologies || []).join(', ')}
                        onChange={(techs) => setFormData({...formData, knownTechnologies: techs.split(',').map(t => t.trim()).filter(t => t.length > 0)})}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Expertise Calibration (1-10)</Label>
                      {Object.entries(formData.skillRatings || {}).map(([skill, value]) => (
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
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {profile.knownTechnologies?.map((tech, i) => (
                        <span key={i} className="text-xs font-medium px-3 py-1.5 bg-white/5 text-white/90 rounded-lg border border-white/10 hover:border-white/30 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {profile.skillRatings && Object.keys(profile.skillRatings).length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        {Object.entries(profile.skillRatings).slice(0, 5).map(([skill, val]) => (
                          <div key={skill} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                              <span className="text-white/70">{skill}</span>
                              <span className="text-[#5ed29c]">{val}/10</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-[#5ed29c] rounded-full" style={{ width: `${(val / 10) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Preferences (Only visible in edit mode) */}
            {editMode && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Career Trajectory</h2>
                <div className="space-y-4">
                  <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Target Role</Label><SearchableDropdown value={formData.targetRole} onChange={(val) => setFormData({...formData, targetRole: val})} options={getTargetRolesByField(formData.fieldOfStudy)} placeholder="Target Role" icon={Briefcase as any} /></div>
                  <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Expected CTC</Label><SearchableDropdown value={formData.expectedCtc} onChange={(val) => setFormData({...formData, expectedCtc: val})} options={expectedCtcOptions} placeholder="CTC" icon={Zap as any} /></div>
                  <div><Label className="uppercase tracking-widest text-[10px] text-[#5ed29c]">Timeline</Label><SearchableDropdown value={formData.placementTimeline} onChange={(val) => setFormData({...formData, placementTimeline: val})} options={placementTimelineOptions} placeholder="Timeline" icon={CalendarDays as any} /></div>
                </div>
              </div>
            )}

            {/* Gamification / Activity */}
            {!editMode && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Coding Activity</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-2xl text-center">
                    <Code2 className="w-5 h-5 text-[#5ed29c] mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{profile.stats?.totalSolved || 0}</p>
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Solved</p>
                  </div>
                  <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-2xl text-center">
                    <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{profile.streak || 0}</p>
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Streak</p>
                  </div>
                </div>

                <div className="w-full flex justify-center overflow-x-auto mb-8">
                  <div className="scale-75 origin-center">
                    <ActivityCalendar 
                      data={heatmapData} 
                      theme={{
                        light: ['#0a0c10', '#064e3b', '#047857', '#10b981', '#5ed29c'],
                        dark: ['#0a0c10', '#064e3b', '#047857', '#10b981', '#5ed29c'],
                      }}
                      colorScheme="dark"
                      blockRadius={4}
                      blockMargin={4}
                      blockSize={10}
                    />
                  </div>
                </div>

                {profile.recentProblems && profile.recentProblems.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Recent Output</h3>
                    <div className="space-y-2">
                      {profile.recentProblems.slice(0,3).map((p, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-xs font-bold text-white/80 truncate max-w-[140px]">{p.problemId.replace(/-/g, ' ')}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${
                            p.difficulty === 'Easy' ? 'text-emerald-400' :
                            p.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {p.difficulty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Badges */}
            {!editMode && profile.badges && profile.badges.length > 0 && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Badges Earned</h2>
                <div className="grid grid-cols-2 gap-3">
                  {profile.badges.map((b, i) => (
                    <Tilt key={i} glareEnable={true} glareMaxOpacity={0.1} scale={1.05}>
                      <div className="bg-[#0a0c10] p-4 h-full rounded-2xl text-center border border-white/5">
                        <Award className="w-5 h-5 text-[#5ed29c] mx-auto mb-2" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/70">{b.name}</p>
                      </div>
                    </Tilt>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
