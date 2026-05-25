import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { 
  Briefcase, Calendar, ExternalLink, Linkedin, Github, Edit2, Save, X, Upload, 
  Trash2, FileText, Target, CalendarDays, Zap, GraduationCap, MapPin, Search, 
  Home, Users, Briefcase as JobsIcon, MessageSquare, Bell, MoreHorizontal, Plus
} from 'lucide-react';
import api from '../api/axios';
import { uploadApi } from '@/api/auth';
import { getFileUrl } from '@/utils/fileUrl';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  SearchableDropdown, degreeOptions, yearOfStudyOptions, placementTimelineOptions, 
  expectedCtcOptions, getFieldsOfStudyByDegree, getTargetRolesByField
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

const formatMonthYear = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Top LinkedIn-style Navbar
const LinkedInNavbar = ({ user, onNavigate }: { user: any, onNavigate: (path: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] bg-[#1d2226] border-b border-white/10 z-50 flex items-center px-4 md:px-24">
      <div className="flex items-center gap-2 mr-4">
        <div className="w-8 h-8 bg-[#0a66c2] rounded flex items-center justify-center font-bold text-white tracking-tighter">
          in
        </div>
        <div className="hidden md:flex items-center bg-[#38434f] rounded pl-3 pr-2 py-1.5 focus-within:w-[280px] w-[240px] transition-all">
          <Search size={14} className="text-white/70" />
          <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm text-white ml-2 w-full placeholder:text-white/60" />
        </div>
      </div>
      
      <div className="flex-1 flex justify-center md:justify-start gap-1 md:gap-8 ml-0 md:ml-12">
        <div className="flex flex-col items-center justify-center text-white/60 hover:text-white cursor-pointer px-3" onClick={() => onNavigate('dashboard')}>
          <Home size={24} className="mb-0.5" />
          <span className="text-[10px] hidden md:block">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/60 hover:text-white cursor-pointer px-3" onClick={() => onNavigate('network')}>
          <Users size={24} className="mb-0.5" />
          <span className="text-[10px] hidden md:block">My Network</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/60 hover:text-white cursor-pointer px-3" onClick={() => onNavigate('jobs')}>
          <JobsIcon size={24} className="mb-0.5" />
          <span className="text-[10px] hidden md:block">Jobs</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/60 hover:text-white cursor-pointer px-3 opacity-50">
          <MessageSquare size={24} className="mb-0.5" />
          <span className="text-[10px] hidden md:block">Messaging</span>
        </div>
        <div className="flex flex-col items-center justify-center text-white/60 hover:text-white cursor-pointer px-3 opacity-50">
          <Bell size={24} className="mb-0.5" />
          <span className="text-[10px] hidden md:block">Notifications</span>
        </div>
        
        <div className="flex flex-col items-center justify-center text-white border-b-2 border-white cursor-pointer px-3 hidden md:flex">
          <img src={user?.avatar ? getFileUrl(user.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName}`} alt="me" className="w-6 h-6 rounded-full mb-0.5" />
          <span className="text-[10px] flex items-center">Me ▼</span>
        </div>
      </div>
    </nav>
  );
};

const Profile = () => {
  const hash = window.location.pathname.split('?')[0];
  const userIdFromUrl = hash.startsWith('/profile/') ? hash.replace('/profile/', '') : '';
  
  const navigate = useNavigate();
  const { user, updateProfileAsync } = useAuthStore();
  
  const isOwnProfile = !userIdFromUrl || userIdFromUrl === user?.id;
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile && user) {
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
        } else if (userIdFromUrl) {
          const res = await api.get(`/users/profile/${userIdFromUrl}`);
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
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0a66c2] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Profile Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="text-[#0a66c2] hover:underline font-bold">Return Home</button>
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

  // Gamification Heatmap Data
  const heatmapData: any[] = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
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

  return (
    <div className="min-h-screen bg-[#000000] text-white/90 font-sans pb-20">
      <LinkedInNavbar user={user} onNavigate={(path) => navigate(`/${path}`)} />
      
      <main className="max-w-6xl mx-auto px-4 md:px-0 pt-20 flex flex-col md:flex-row gap-6">
        
        {/* LEFT COLUMN: Main Profile Content */}
        <div className="flex-1 w-full md:w-[70%] space-y-4">
          
          {/* 1. Intro Card */}
          <div className="bg-[#1b1f23] rounded-lg border border-white/10 overflow-hidden relative">
            {/* Cover Photo */}
            <div className="h-48 w-full relative bg-[#38434f]">
              {(editMode ? formData.coverPhoto : profile.coverPhoto) && (
                <img 
                  src={getFileUrl(editMode ? formData.coverPhoto : profile.coverPhoto!)} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              )}
              {editMode && (
                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black transition">
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <Upload size={16} className="text-white" />
                  </label>
                  <input type="file" id="cover-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'coverPhoto')} />
                </div>
              )}
            </div>

            {/* Avatar & Edit controls */}
            <div className="px-6 pb-6 relative">
              <div className="absolute -top-[90px] left-6">
                <div className="w-[152px] h-[152px] rounded-full border-4 border-[#1b1f23] overflow-hidden bg-[#000000] relative group">
                  <img 
                    src={(editMode ? formData.avatar : profile.avatar) ? getFileUrl(editMode ? formData.avatar : profile.avatar!) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                    alt={profile.fullName} 
                    className="w-full h-full object-cover"
                  />
                  {editMode && (
                    <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                      <Upload size={24} className="text-white" />
                    </label>
                  )}
                  <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')} />
                </div>
              </div>

              {isOwnProfile && (
                <div className="flex justify-end pt-4">
                  {editMode ? (
                    <div className="flex gap-2">
                      <button onClick={() => { setFormData(profile); setEditMode(false); }} className="px-4 py-1.5 rounded-full hover:bg-white/10 text-white font-medium text-sm transition border border-white/20">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-1.5 rounded-full bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-sm transition">Save</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 text-white transition">
                      <Edit2 size={20} className="text-white/70" />
                    </button>
                  )}
                </div>
              )}

              <div className={isOwnProfile && !editMode ? "mt-4" : "mt-20"}>
                {editMode ? (
                  <div className="space-y-4 max-w-xl">
                    <Input className="bg-[#38434f] border-none text-white h-10" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" />
                    <Input className="bg-[#38434f] border-none text-white h-10" value={formData.targetRole} onChange={(e) => setFormData({...formData, targetRole: e.target.value})} placeholder="Headline" />
                    <Input className="bg-[#38434f] border-none text-white h-10" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Location" />
                  </div>
                ) : (
                  <>
                    <h1 className="text-[24px] font-semibold text-white leading-tight">{profile.fullName}</h1>
                    <p className="text-base text-white/90 mt-1">{profile.targetRole || 'Software Engineer'}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-white/60">
                      {profile.location && <span>{profile.location}</span>}
                      {profile.location && <span>•</span>}
                      <span className="text-[#71b7fb] font-semibold cursor-pointer hover:underline">Contact info</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#71b7fb] font-semibold text-sm cursor-pointer hover:underline">500+ connections</span>
                    </div>
                  </>
                )}

                {!editMode && (
                  <div className="flex items-center gap-2 mt-4">
                    <button className="bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full px-4 py-1.5 text-sm transition">
                      Open to
                    </button>
                    <button className="border border-[#0a66c2] text-[#71b7fb] hover:bg-[#0a66c2]/10 font-semibold rounded-full px-4 py-1.5 text-sm transition">
                      Add profile section
                    </button>
                    <button className="border border-white/40 text-white/80 hover:bg-white/10 hover:border-white/60 font-semibold rounded-full px-4 py-1.5 text-sm transition">
                      More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. About Card */}
          {(profile.bio || editMode) && (
            <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-6 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">About</h2>
                {isOwnProfile && !editMode && (
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={20} className="text-white/70" /></button>
                )}
              </div>
              {editMode ? (
                <textarea 
                  className="w-full h-32 bg-[#38434f] border-none rounded-lg p-3 text-sm text-white focus:outline-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Summarize your professional background..."
                />
              ) : (
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
              )}
            </div>
          )}

          {/* 3. Experience Card */}
          <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Experience</h2>
              {isOwnProfile && !editMode && (
                <div className="flex gap-2">
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Plus size={24} className="text-white/70" /></button>
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={20} className="text-white/70" /></button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {editMode ? (
                <>
                  {formData.experiences?.map((exp: any, index: number) => (
                    <div key={index} className="p-4 bg-[#38434f] rounded-lg relative">
                      <button onClick={() => {
                        const newExps = [...formData.experiences];
                        newExps.splice(index, 1);
                        setFormData({...formData, experiences: newExps});
                      }} className="absolute top-4 right-4 text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Input className="bg-[#1b1f23] border-none text-white h-10" placeholder="Title/Role" value={exp.role} onChange={(e) => { const ne = [...formData.experiences]; ne[index].role = e.target.value; setFormData({...formData, experiences: ne}); }} />
                        <Input className="bg-[#1b1f23] border-none text-white h-10" placeholder="Company Name" value={exp.company} onChange={(e) => { const ne = [...formData.experiences]; ne[index].company = e.target.value; setFormData({...formData, experiences: ne}); }} />
                        <Input type="month" className="bg-[#1b1f23] border-none text-white h-10" value={exp.startDate} onChange={(e) => { const ne = [...formData.experiences]; ne[index].startDate = e.target.value; setFormData({...formData, experiences: ne}); }} />
                        <div className="flex gap-2 items-center">
                          <Input type="month" className="bg-[#1b1f23] border-none text-white h-10" disabled={exp.isCurrent} value={exp.endDate} onChange={(e) => { const ne = [...formData.experiences]; ne[index].endDate = e.target.value; setFormData({...formData, experiences: ne}); }} />
                          <label className="text-xs text-white flex items-center gap-1"><input type="checkbox" checked={exp.isCurrent} onChange={(e) => { const ne = [...formData.experiences]; ne[index].isCurrent = e.target.checked; setFormData({...formData, experiences: ne}); }} /> Current</label>
                        </div>
                      </div>
                      <textarea className="w-full h-20 bg-[#1b1f23] border-none rounded-lg p-3 text-sm text-white" placeholder="Description..." value={exp.description} onChange={(e) => { const ne = [...formData.experiences]; ne[index].description = e.target.value; setFormData({...formData, experiences: ne}); }} />
                    </div>
                  ))}
                  <button onClick={() => setFormData({...formData, experiences: [...(formData.experiences || []), { company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }]})} className="text-[#71b7fb] font-semibold text-sm hover:underline">+ Add Experience</button>
                </>
              ) : (
                profile.experiences?.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      {/* Simulating company logo, or fallback */}
                      <Briefcase className="text-gray-400" size={24} />
                    </div>
                    <div className="flex-1 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-white/90">{exp.company}</p>
                      <p className="text-xs text-white/60 mt-0.5">
                        {formatMonthYear(exp.startDate)} - {exp.isCurrent ? 'Present' : formatMonthYear(exp.endDate || '')}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-white/90 mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. Education Card */}
          <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Education</h2>
              {isOwnProfile && !editMode && (
                <div className="flex gap-2">
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Plus size={24} className="text-white/70" /></button>
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={20} className="text-white/70" /></button>
                </div>
              )}
            </div>

            {editMode ? (
              <div className="space-y-4 max-w-xl">
                <CollegeDropdown value={formData.collegeName} onChange={(val) => setFormData({...formData, collegeName: val})} />
                <div className="grid grid-cols-2 gap-4">
                  <SearchableDropdown value={formData.degree} onChange={(val) => setFormData({...formData, degree: val, fieldOfStudy: ''})} options={degreeOptions} placeholder="Degree" />
                  <SearchableDropdown value={formData.fieldOfStudy} onChange={(val) => setFormData({...formData, fieldOfStudy: val})} options={getFieldsOfStudyByDegree(formData.degree)} placeholder="Field of Study" searchable />
                  <SearchableDropdown value={formData.yearOfStudy} onChange={(val) => setFormData({...formData, yearOfStudy: val})} options={yearOfStudyOptions} placeholder="Graduation Year" />
                  <Input className="bg-[#38434f] border-none text-white h-10" value={formData.cgpa} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} placeholder="GPA (e.g. 3.8/4.0)" />
                </div>
              </div>
            ) : (
              profile.collegeName && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0 shadow-sm">
                    <GraduationCap className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{profile.collegeName}</h3>
                    <p className="text-sm text-white/90">{profile.degree}, {profile.fieldOfStudy}</p>
                    <p className="text-xs text-white/60 mt-0.5">Expected Graduation: {profile.yearOfStudy} {profile.cgpa && `• GPA: ${profile.cgpa}`}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* 5. Skills Card */}
          <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Skills</h2>
              {isOwnProfile && !editMode && (
                <div className="flex gap-2">
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Plus size={24} className="text-white/70" /></button>
                  <button onClick={() => setEditMode(true)} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={20} className="text-white/70" /></button>
                </div>
              )}
            </div>

            {editMode ? (
              <TechnologySelector 
                value={(formData.knownTechnologies || []).join(', ')}
                onChange={(techs) => setFormData({...formData, knownTechnologies: techs.split(',').map(t => t.trim()).filter(t => t.length > 0)})}
              />
            ) : (
              <div className="space-y-4">
                {profile.knownTechnologies?.map((tech, i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-sm font-semibold text-white">{tech}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-white/20" />
                        <div className="w-5 h-5 rounded-full bg-white/30" />
                      </div>
                      <span className="text-xs text-white/60">Endorsed by {Math.floor(Math.random() * 10) + 1} connections</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebars */}
        <div className="w-full md:w-[30%] space-y-4 hidden md:block">
          
          <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white hover:text-[#71b7fb] cursor-pointer">Profile language</h3>
                <p className="text-xs text-white/60">English</p>
              </div>
              <Edit2 size={16} className="text-white/70 cursor-pointer" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-white hover:text-[#71b7fb] cursor-pointer">Public profile & URL</h3>
                <p className="text-xs text-white/60 break-all">{window.location.origin}/profile/{profile._id}</p>
              </div>
              <Edit2 size={16} className="text-white/70 cursor-pointer shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Users size={64} />
             </div>
             <h3 className="text-sm font-semibold text-white mb-4">People you may know</h3>
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-3">
                   <img src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-12 h-12 rounded-full border border-white/10" />
                   <div>
                     <h4 className="text-sm font-semibold text-white hover:underline cursor-pointer">Sample User {i}</h4>
                     <p className="text-xs text-white/60 line-clamp-2">Software Engineer at Tech Corp</p>
                     <button className="mt-1 px-3 py-1 rounded-full border border-white/60 text-white/80 text-xs font-semibold hover:bg-white/10 hover:border-white transition">
                       Connect
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Gamification / Activity Integration (styled natively) */}
          {!editMode && profile.stats && (
            <div className="bg-[#1b1f23] rounded-lg border border-white/10 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Recent Platform Activity</h3>
              <div className="mb-4">
                <p className="text-xs text-white/60 mb-1">Coding Streak</p>
                <div className="flex items-center gap-2">
                  <Zap className="text-amber-400" size={16} />
                  <span className="text-sm font-semibold text-white">{profile.streak || 0} days</span>
                </div>
              </div>
              <div className="w-full flex justify-center scale-90 origin-left">
                <ActivityCalendar 
                  data={heatmapData} 
                  theme={{
                    light: ['#222222', '#004182', '#0a66c2', '#71b7fb', '#ffffff'],
                    dark: ['#222222', '#004182', '#0a66c2', '#71b7fb', '#ffffff'],
                  }}
                  colorScheme="dark"
                  hideColorLegend
                  hideMonthLabels
                  blockSize={8}
                />
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Profile;
