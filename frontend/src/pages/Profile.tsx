import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ActivityCalendarModule from 'react-activity-calendar';
const ActivityCalendarComponent = (ActivityCalendarModule as any).ActivityCalendar || (ActivityCalendarModule as any).default?.ActivityCalendar || (ActivityCalendarModule as any).default || ActivityCalendarModule;
import { 
  Briefcase, Calendar, ExternalLink, Linkedin, Github, Edit2, Save, X, Upload, 
  Trash2, FileText, Target, CalendarDays, Zap, GraduationCap, MapPin, Search, 
  Home, Users, Briefcase as JobsIcon, MessageSquare, Bell, MoreHorizontal, Plus,
  Award, Eye, BarChart2, ChevronLeft
} from 'lucide-react';
import api from '../api/axios';
import { uploadApi } from '@/api/auth';
import { getFileUrl } from '@/utils/fileUrl';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  SearchableDropdown, degreeOptions, yearOfStudyOptions, getFieldsOfStudyByDegree
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

interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface ProfileData {
  _id: string;
  fullName: string;
  avatar: string;
  pronouns?: string;
  headline?: string;
  industry?: string;
  bio?: string;
  location?: string;
  coverPhoto?: string;
  experiences?: Experience[];
  certifications?: Certification[];
  knownTechnologies?: string[];
  collegeName?: string;
  degree?: string;
  fieldOfStudy?: string;
  yearOfStudy?: string;
  cgpa?: string;
  streak: number;
  solvedProblems: { problemId: string; solvedAt: string }[];
}

const formatMonthYear = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Modal Component - Solid Colors, No Glassmorphism
const Modal = ({ isOpen, onClose, title, children, onSave, isSaving = false }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div className="bg-[#12141a] w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-zinc-300">
          {children}
        </div>
        {onSave && (
          <div className="p-4 border-t border-white/10 flex justify-end">
            <button 
              onClick={onSave}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold px-6 py-2 rounded-lg transition"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
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
  
  // Modals state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile && user) {
          const mappedProfile: any = {
            ...user,
            streak: user.streak || 0,
            solvedProblems: user.solvedProblems || [],
          };
          setProfile(mappedProfile);
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
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Profile Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="text-emerald-500 hover:underline font-bold">Return Home</button>
      </div>
    );
  }

  // --- Handlers ---
  const openModal = (modalName: string, index = -1) => {
    setFormData(JSON.parse(JSON.stringify(profile))); // Deep copy
    setEditIndex(index);
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditIndex(-1);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileAsync(formData);
      setProfile({ ...profile, ...formData });
      closeModal();
      toast.success('Profile updated successfully', {
        style: { background: '#12141a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'avatar' | 'coverPhoto') => {
    setUploading(true);
    try {
      const response = await uploadApi.uploadImage(file);
      if (response.success && response.imageUrl) {
        // Immediate save for images
        const updatedData = { ...profile, [type]: response.imageUrl };
        await updateProfileAsync(updatedData);
        setProfile(updatedData as any);
        toast.success(`${type === 'avatar' ? 'Profile' : 'Cover'} photo uploaded`, {
          style: { background: '#12141a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
        });
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
  for (let i = 120; i >= 0; i--) {
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
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans pb-20">
      
      {/* Simple Back Navigation instead of LinkedInNavbar */}
      <div className="max-w-[1128px] mx-auto px-4 md:px-0 pt-8 pb-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition font-medium"
        >
          <ChevronLeft size={20} /> Back
        </button>
      </div>

      <main className="max-w-[1128px] mx-auto px-4 md:px-0 flex flex-col md:flex-row gap-6">
        
        {/* LEFT COLUMN: Main Profile Content */}
        <div className="flex-1 w-full md:w-[73%] space-y-6">
          
          {/* 1. Intro Card - Solid styling */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 overflow-hidden relative shadow-lg">
            {/* Cover Photo */}
            <div className="h-[201px] w-full relative bg-[#1c1f26]">
              {profile.coverPhoto && (
                <img 
                  src={getFileUrl(profile.coverPhoto)} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              )}
              {isOwnProfile && (
                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black transition">
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <Upload size={16} className="text-white" />
                  </label>
                  <input type="file" id="cover-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'coverPhoto')} />
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="absolute top-[100px] left-6">
              <div className="w-[152px] h-[152px] rounded-full border-[6px] border-[#12141a] overflow-hidden bg-[#0a0c10] relative group shadow-sm">
                <img 
                  src={profile.avatar ? getFileUrl(profile.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover"
                />
                {isOwnProfile && (
                  <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                    <Upload size={24} className="text-white" />
                  </label>
                )}
                <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'avatar')} />
              </div>
            </div>

            {isOwnProfile && (
              <div className="absolute top-[220px] right-6">
                <button onClick={() => openModal('intro')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-zinc-300">
                  <Edit2 size={20} />
                </button>
              </div>
            )}

            <div className="px-8 pb-8 mt-[70px]">
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-bold tracking-tight text-white">{profile.fullName}</h1>
                {profile.pronouns && <span className="text-[14px] text-zinc-400 font-medium px-2 py-0.5 bg-white/5 rounded-md">({profile.pronouns})</span>}
              </div>
              <p className="text-[18px] text-zinc-300 mt-2 font-medium">{profile.headline || 'Add a headline'}</p>
              
              <div className="flex items-center gap-2 mt-3 text-[14px] text-zinc-400">
                {profile.location && <span>{profile.location}</span>}
                {profile.location && <span>•</span>}
                <span className="text-emerald-500 font-semibold cursor-pointer hover:underline">Contact info</span>
              </div>
              
              {isOwnProfile && (
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg px-6 py-2 transition shadow-lg shadow-emerald-500/20">
                    Open to
                  </button>
                  <button className="border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 font-bold rounded-lg px-6 py-2 transition box-border">
                    Add section
                  </button>
                  <button className="bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg px-6 py-2 transition box-border">
                    More
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Analytics (Private) */}
          {isOwnProfile && (
            <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
              <h2 className="text-[20px] font-bold text-white mb-2 tracking-tight">Analytics</h2>
              <div className="flex items-center gap-2 text-[14px] text-zinc-400 mb-6">
                <Eye size={16} /> <span className="font-semibold">Private to you</span>
              </div>
              <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-2">
                <div className="min-w-[150px] p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-white font-bold text-[18px]">
                    <Users size={20} className="text-emerald-500" /> 342
                  </div>
                  <p className="text-[13px] text-zinc-400 mt-2 font-medium">Profile views</p>
                </div>
                <div className="min-w-[150px] p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-white font-bold text-[18px]">
                    <BarChart2 size={20} className="text-purple-500" /> 1.2k
                  </div>
                  <p className="text-[13px] text-zinc-400 mt-2 font-medium">Post impressions</p>
                </div>
                <div className="min-w-[150px] p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-white font-bold text-[18px]">
                    <Search size={20} className="text-blue-500" /> 45
                  </div>
                  <p className="text-[13px] text-zinc-400 mt-2 font-medium">Search appearances</p>
                </div>
              </div>
            </div>
          )}

          {/* About Card */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-white tracking-tight">About</h2>
              {isOwnProfile && (
                <button onClick={() => openModal('about')} className="p-2 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white"><Edit2 size={20} /></button>
              )}
            </div>
            {profile.bio ? (
              <p className="text-[15px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
            ) : (
              isOwnProfile && <p className="text-[14px] text-zinc-500 italic">You haven't added a summary yet. Let connections know your professional background.</p>
            )}
            
            {profile.knownTechnologies && profile.knownTechnologies.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[14px] font-bold text-white mb-3">Top skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.knownTechnologies.slice(0, 5).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-zinc-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Experience Card */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold text-white tracking-tight">Experience</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => {
                    setFormData({...profile, currentExperience: { company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }});
                    setEditIndex(-1);
                    setActiveModal('experience');
                  }} className="p-2 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white"><Plus size={24} /></button>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {profile.experiences?.length ? profile.experiences.map((exp, i) => (
                <div key={i} className="flex gap-5 relative">
                  <div className="w-[52px] h-[52px] bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-zinc-400">
                     <Briefcase size={24} />
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/10 last:border-0 last:pb-0 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[18px] font-bold text-white tracking-tight">{exp.role}</h3>
                        <p className="text-[15px] text-zinc-300 font-medium mt-1">{exp.company}</p>
                        <p className="text-[14px] text-zinc-500 mt-1">
                          {formatMonthYear(exp.startDate)} - {exp.isCurrent ? 'Present' : formatMonthYear(exp.endDate || '')}
                        </p>
                      </div>
                      {isOwnProfile && (
                        <button onClick={() => {
                          setFormData({...profile, currentExperience: exp});
                          setEditIndex(i);
                          setActiveModal('experience');
                        }} className="p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition text-zinc-400 hover:text-white">
                          <Edit2 size={20} />
                        </button>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-[15px] text-zinc-300 mt-4 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-[14px] text-zinc-500 italic">No experience added yet.</p>
              )}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold text-white tracking-tight">Education</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => openModal('education')} className="p-2 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white"><Edit2 size={20} /></button>
                </div>
              )}
            </div>
            
            {profile.collegeName ? (
              <div className="flex gap-5">
                <div className="w-[52px] h-[52px] bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-zinc-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-white tracking-tight">{profile.collegeName}</h3>
                  <p className="text-[15px] text-zinc-300 font-medium mt-1">{profile.degree}, {profile.fieldOfStudy}</p>
                  <p className="text-[14px] text-zinc-500 mt-1">{profile.yearOfStudy}</p>
                  {profile.cgpa && <p className="text-[14px] text-zinc-400 mt-2 bg-white/5 inline-block px-3 py-1 rounded-md">Grade: {profile.cgpa}</p>}
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-zinc-500 italic">No education added yet.</p>
            )}
          </div>

          {/* Licenses & Certifications */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold text-white tracking-tight">Licenses & certifications</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => {
                    setFormData({...profile, currentCert: { name: '', issuer: '', issueDate: '', credentialId: '', credentialUrl: '' }});
                    setEditIndex(-1);
                    setActiveModal('certification');
                  }} className="p-2 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white"><Plus size={24} /></button>
                </div>
              )}
            </div>
            
            <div className="space-y-8">
              {profile.certifications?.length ? profile.certifications.map((cert, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-[52px] h-[52px] bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10 text-zinc-400">
                    <Award size={24} />
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[18px] font-bold text-white tracking-tight">{cert.name}</h3>
                        <p className="text-[15px] text-zinc-300 font-medium mt-1">{cert.issuer}</p>
                        <p className="text-[14px] text-zinc-500 mt-1">Issued {formatMonthYear(cert.issueDate)}</p>
                        {cert.credentialId && <p className="text-[13px] text-zinc-500 mt-2 font-mono">ID: {cert.credentialId}</p>}
                        {cert.credentialUrl && (
                          <button onClick={() => window.open(cert.credentialUrl, '_blank')} className="mt-4 border border-zinc-600 text-zinc-300 hover:bg-white/5 font-bold rounded-lg px-4 py-1.5 text-[14px] transition box-border">
                            Show credential
                          </button>
                        )}
                      </div>
                      {isOwnProfile && (
                        <button onClick={() => {
                          setFormData({...profile, currentCert: cert});
                          setEditIndex(i);
                          setActiveModal('certification');
                        }} className="p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition text-zinc-400 hover:text-white">
                          <Edit2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-[14px] text-zinc-500 italic">No certifications added yet.</p>
              )}
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold text-white tracking-tight">Skills</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => openModal('skills')} className="p-2 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white"><Edit2 size={20} /></button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.knownTechnologies?.map((tech, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="text-[16px] font-bold text-white">{tech}</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex -space-x-2">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-6 h-6 rounded-full border-2 border-[#12141a]" />
                      <img src={`https://i.pravatar.cc/150?u=${i+20}`} className="w-6 h-6 rounded-full border-2 border-[#12141a]" />
                    </div>
                    <span className="text-[13px] text-zinc-400 font-medium">Endorsed by {Math.floor(Math.random() * 10) + 2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebars */}
        <div className="w-full md:w-[27%] space-y-6 hidden md:block">
          
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-6 shadow-lg">
            <div className="flex justify-between items-start border-b border-white/10 pb-5 mb-5">
              <div>
                <h3 className="text-[15px] font-bold text-white">Profile language</h3>
                <p className="text-[14px] text-zinc-400 mt-1">English</p>
              </div>
              <Edit2 size={18} className="text-zinc-500 cursor-pointer hover:text-white transition" />
            </div>
            <div className="flex justify-between items-start">
              <div className="w-full overflow-hidden">
                <h3 className="text-[15px] font-bold text-white">Public profile & URL</h3>
                <p className="text-[13px] text-emerald-500 hover:underline cursor-pointer truncate mt-1 block w-full pr-4">{window.location.origin}/profile/{profile._id}</p>
              </div>
              <Edit2 size={18} className="text-zinc-500 cursor-pointer hover:text-white transition shrink-0" />
            </div>
          </div>

          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-6 relative overflow-hidden shadow-lg">
             <h3 className="text-[16px] font-bold text-white mb-5 tracking-tight">People you may know</h3>
             <div className="space-y-5">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-3">
                   <img src={`https://i.pravatar.cc/150?u=${i + 30}`} className="w-12 h-12 rounded-full border-2 border-[#12141a] shadow-sm" />
                   <div>
                     <h4 className="text-[15px] font-bold text-white hover:underline cursor-pointer">{['Alice Johnson', 'Bob Smith', 'Charlie Davis'][i-1]}</h4>
                     <p className="text-[12px] text-zinc-400 line-clamp-1 mt-0.5">Software Engineer at Tech Corp</p>
                     <button className="mt-2 px-4 py-1.5 rounded-full border border-zinc-600 text-zinc-300 text-[13px] font-bold hover:bg-white/5 transition box-border">
                       Connect
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Gamification / Activity Integration */}
          <div className="bg-[#12141a] rounded-2xl border border-white/10 p-6 shadow-lg">
            <h3 className="text-[16px] font-bold text-white mb-5 tracking-tight">Platform Activity</h3>
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[13px] text-zinc-400 font-medium">Coding Streak</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[20px] font-bold text-white">{profile.streak || 0}</span>
                  <span className="text-[14px] text-zinc-400">days</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Zap className="text-amber-400" size={20} />
              </div>
            </div>
            
            <div>
              <p className="text-[13px] text-zinc-400 font-medium mb-3">Activity Graph</p>
              <div className="w-full flex justify-center scale-[0.85] origin-left">
                {ActivityCalendarComponent && typeof ActivityCalendarComponent !== 'string' ? (
                  <ActivityCalendarComponent 
                  data={heatmapData} 
                  theme={{
                    light: ['#1c1f26', '#064e3b', '#047857', '#10b981', '#34d399'],
                    dark: ['#1c1f26', '#064e3b', '#047857', '#10b981', '#34d399'],
                  }}
                  colorScheme="dark"
                  hideColorLegend
                  hideMonthLabels
                  blockSize={9}
                  blockMargin={3}
                  blockRadius={2}
                />
                ) : (
                  <div className="text-zinc-500 text-sm py-4">Activity data currently unavailable</div>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* MODALS */}

      {/* Edit Intro Modal */}
      <Modal isOpen={activeModal === 'intro'} onClose={closeModal} title="Edit intro" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">First name*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500 transition-all px-3" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Pronouns</Label>
            <SearchableDropdown value={formData.pronouns || ''} onChange={(val) => setFormData({...formData, pronouns: val})} options={[{value:'He/Him', label:'He/Him'}, {value:'She/Her', label:'She/Her'}, {value:'They/Them', label:'They/Them'}]} placeholder="Please select" />
            <p className="text-xs text-zinc-500 mt-1">Let others know how to refer to you.</p>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Headline*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500 transition-all px-3" value={formData.headline || ''} onChange={(e) => setFormData({...formData, headline: e.target.value})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Industry*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500 transition-all px-3" value={formData.industry || ''} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
          </div>
          <h3 className="text-lg font-bold mt-8 mb-4 border-t border-white/10 pt-6">Location</h3>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">City, State</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500 transition-all px-3" value={formData.location || ''} onChange={(e) => setFormData({...formData, location: e.target.value})} />
          </div>
        </div>
      </Modal>

      {/* Edit About Modal */}
      <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="Edit about" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-2">
          <Label className="text-zinc-400 text-xs font-semibold">Description</Label>
          <textarea 
            className="w-full min-h-[200px] bg-[#1c1f26] border border-white/10 rounded-lg p-4 text-sm text-white hover:border-white/20 focus:border-emerald-500 outline-none transition-all custom-scrollbar"
            value={formData.bio || ''}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences."
          />
        </div>
      </Modal>

      {/* Edit Experience Modal */}
      <Modal isOpen={activeModal === 'experience'} onClose={closeModal} title={editIndex > -1 ? "Edit experience" : "Add experience"} onSave={() => {
        const newExps = [...(formData.experiences || [])];
        if (editIndex > -1) {
          newExps[editIndex] = formData.currentExperience;
        } else {
          newExps.push(formData.currentExperience);
        }
        setFormData({...formData, experiences: newExps});
        const finalData = {...formData, experiences: newExps};
        setIsSaving(true);
        updateProfileAsync(finalData).then(() => {
          setProfile({...profile, ...finalData});
          closeModal();
          toast.success('Experience saved', { style: { background: '#12141a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }});
        }).catch(err => toast.error(err.message)).finally(() => setIsSaving(false));
      }} isSaving={isSaving}>
        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Title*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentExperience?.role || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, role: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Company name*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentExperience?.company || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, company: e.target.value}})} />
          </div>
          <div className="flex items-center gap-3 mt-6 p-4 bg-white/5 rounded-lg border border-white/5">
            <input type="checkbox" id="isCurrent" className="w-5 h-5 rounded border-white/20 bg-transparent accent-emerald-500" checked={formData.currentExperience?.isCurrent || false} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, isCurrent: e.target.checked}})} />
            <label htmlFor="isCurrent" className="text-sm font-medium text-white cursor-pointer">I am currently working in this role</label>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs font-semibold">Start date*</Label>
              <Input type="month" className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentExperience?.startDate || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, startDate: e.target.value}})} />
            </div>
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs font-semibold">End date{!formData.currentExperience?.isCurrent && '*'}</Label>
              <Input type="month" disabled={formData.currentExperience?.isCurrent} className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500 disabled:opacity-30" value={formData.currentExperience?.endDate || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, endDate: e.target.value}})} />
            </div>
          </div>
          <div className="space-y-1 mt-6">
            <Label className="text-zinc-400 text-xs font-semibold">Description</Label>
            <textarea className="w-full min-h-[120px] bg-[#1c1f26] border border-white/10 rounded-lg p-4 text-sm text-white outline-none hover:border-white/20 focus:border-emerald-500 transition-all custom-scrollbar" value={formData.currentExperience?.description || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, description: e.target.value}})} />
          </div>
        </div>
        {editIndex > -1 && (
          <div className="mt-8 pt-6 border-t border-white/10">
            <button onClick={() => {
              const newExps = [...formData.experiences];
              newExps.splice(editIndex, 1);
              const finalData = {...formData, experiences: newExps};
              setIsSaving(true);
              updateProfileAsync(finalData).then(() => {
                setProfile({...profile, ...finalData});
                closeModal();
                toast.success('Experience deleted', { style: { background: '#12141a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }});
              }).finally(() => setIsSaving(false));
            }} className="text-red-400 hover:text-red-300 font-bold transition">Delete experience</button>
          </div>
        )}
      </Modal>

      {/* Edit Education Modal */}
      <Modal isOpen={activeModal === 'education'} onClose={closeModal} title="Edit education" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-5">
           <CollegeDropdown value={formData.collegeName} onChange={(val) => setFormData({...formData, collegeName: val})} />
           <div className="space-y-1">
             <Label className="text-zinc-400 text-xs font-semibold">Degree</Label>
             <SearchableDropdown value={formData.degree} onChange={(val) => setFormData({...formData, degree: val, fieldOfStudy: ''})} options={degreeOptions} placeholder="Ex: Bachelor's" />
           </div>
           <div className="space-y-1">
             <Label className="text-zinc-400 text-xs font-semibold">Field of study</Label>
             <SearchableDropdown value={formData.fieldOfStudy} onChange={(val) => setFormData({...formData, fieldOfStudy: val})} options={getFieldsOfStudyByDegree(formData.degree)} placeholder="Ex: Business" searchable />
           </div>
           <div className="space-y-1">
             <Label className="text-zinc-400 text-xs font-semibold">Graduation Year</Label>
             <SearchableDropdown value={formData.yearOfStudy} onChange={(val) => setFormData({...formData, yearOfStudy: val})} options={yearOfStudyOptions} placeholder="Year" />
           </div>
           <div className="space-y-1">
             <Label className="text-zinc-400 text-xs font-semibold">Grade</Label>
             <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.cgpa || ''} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} />
           </div>
        </div>
      </Modal>

      {/* Edit Certification Modal */}
      <Modal isOpen={activeModal === 'certification'} onClose={closeModal} title={editIndex > -1 ? "Edit license or certification" : "Add license or certification"} onSave={() => {
        const newCerts = [...(formData.certifications || [])];
        if (editIndex > -1) {
          newCerts[editIndex] = formData.currentCert;
        } else {
          newCerts.push(formData.currentCert);
        }
        setFormData({...formData, certifications: newCerts});
        const finalData = {...formData, certifications: newCerts};
        setIsSaving(true);
        updateProfileAsync(finalData).then(() => {
          setProfile({...profile, ...finalData});
          closeModal();
        }).finally(() => setIsSaving(false));
      }} isSaving={isSaving}>
        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Name*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentCert?.name || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, name: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Issuing organization*</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentCert?.issuer || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, issuer: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Issue date</Label>
            <Input type="month" className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentCert?.issueDate || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, issueDate: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Credential ID</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentCert?.credentialId || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, credentialId: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs font-semibold">Credential URL</Label>
            <Input className="bg-[#1c1f26] border-white/10 text-white h-10 rounded-lg hover:border-white/20 focus:border-emerald-500" value={formData.currentCert?.credentialUrl || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, credentialUrl: e.target.value}})} />
          </div>
        </div>
      </Modal>

      {/* Edit Skills Modal */}
      <Modal isOpen={activeModal === 'skills'} onClose={closeModal} title="Edit skills" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-4">
           <TechnologySelector 
             value={(formData.knownTechnologies || []).join(', ')}
             onChange={(techs) => setFormData({...formData, knownTechnologies: techs.split(',').map(t => t.trim()).filter(t => t.length > 0)})}
           />
        </div>
      </Modal>

    </div>
  );
};

export default Profile;
