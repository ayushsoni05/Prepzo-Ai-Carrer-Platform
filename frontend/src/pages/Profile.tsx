import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { 
  Briefcase, Calendar, ExternalLink, Linkedin, Github, Edit2, Save, X, Upload, 
  Trash2, FileText, Target, CalendarDays, Zap, GraduationCap, MapPin, Search, 
  Home, Users, Briefcase as JobsIcon, MessageSquare, Bell, MoreHorizontal, Plus,
  Award, Eye, BarChart2
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

// Modal Component
const Modal = ({ isOpen, onClose, title, children, onSave, isSaving = false }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1d2226] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-[#e9e9e9]">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-[#e9e9e9] transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-[#e9e9e9]">
          {children}
        </div>
        {onSave && (
          <div className="p-4 border-t border-white/10 flex justify-end">
            <button 
              onClick={onSave}
              disabled={isSaving}
              className="bg-[#0a66c2] hover:bg-[#004182] disabled:opacity-50 text-white font-bold px-4 py-1.5 rounded-full transition"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Top LinkedIn-style Navbar
const LinkedInNavbar = ({ user, onNavigate }: { user: any, onNavigate: (path: string) => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] bg-[#1d2226] border-b border-[#38434f] z-50 flex items-center px-4 md:px-24">
      <div className="flex items-center gap-2 mr-4">
        <div className="w-[34px] h-[34px] bg-[#0a66c2] rounded-[3px] flex items-center justify-center font-bold text-white text-[20px] tracking-tighter cursor-pointer" onClick={() => onNavigate('dashboard')}>
          in
        </div>
        <div className="hidden md:flex items-center bg-[#38434f] rounded pl-3 pr-2 py-1.5 focus-within:w-[280px] w-[240px] transition-all ml-1">
          <Search size={14} className="text-[#e9e9e9]" />
          <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm text-[#e9e9e9] ml-2 w-full placeholder:text-[#e9e9e9]/70 font-medium" />
        </div>
      </div>
      
      <div className="flex-1 flex justify-center md:justify-start gap-1 md:gap-8 ml-0 md:ml-[15%]">
        <div className="flex flex-col items-center justify-center text-[#8c96a1] hover:text-[#e9e9e9] cursor-pointer px-3 transition-colors" onClick={() => onNavigate('dashboard')}>
          <Home size={24} className="mb-0.5" fill="currentColor" strokeWidth={0} />
          <span className="text-[12px] hidden md:block">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#8c96a1] hover:text-[#e9e9e9] cursor-pointer px-3 transition-colors" onClick={() => onNavigate('network')}>
          <Users size={24} className="mb-0.5" fill="currentColor" strokeWidth={0} />
          <span className="text-[12px] hidden md:block">My Network</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#8c96a1] hover:text-[#e9e9e9] cursor-pointer px-3 transition-colors" onClick={() => onNavigate('jobs')}>
          <JobsIcon size={24} className="mb-0.5" fill="currentColor" strokeWidth={0} />
          <span className="text-[12px] hidden md:block">Jobs</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#8c96a1] hover:text-[#e9e9e9] cursor-pointer px-3 opacity-50 transition-colors">
          <MessageSquare size={24} className="mb-0.5" fill="currentColor" strokeWidth={0} />
          <span className="text-[12px] hidden md:block">Messaging</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#8c96a1] hover:text-[#e9e9e9] cursor-pointer px-3 opacity-50 transition-colors">
          <Bell size={24} className="mb-0.5" fill="currentColor" strokeWidth={0} />
          <span className="text-[12px] hidden md:block">Notifications</span>
        </div>
        
        <div className="flex flex-col items-center justify-center text-[#e9e9e9] border-b-[3px] border-[#e9e9e9] cursor-pointer px-3 hidden md:flex h-[52px]">
          <img src={user?.avatar ? getFileUrl(user.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName}`} alt="me" className="w-6 h-6 rounded-full mb-0.5" />
          <span className="text-[12px] flex items-center">Me ▼</span>
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
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0a66c2] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#000000] text-[#e9e9e9] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-4">Profile Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="text-[#0a66c2] hover:underline font-bold">Return Home</button>
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
        style: { background: '#333', color: '#fff' }
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
          style: { background: '#333', color: '#fff' }
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
    <div className="min-h-screen bg-[#000000] text-[#e9e9e9] font-sans pb-20">
      <LinkedInNavbar user={user} onNavigate={(path) => navigate(`/${path}`)} />
      
      <main className="max-w-[1128px] mx-auto px-4 md:px-0 pt-[76px] flex flex-col md:flex-row gap-6">
        
        {/* LEFT COLUMN: Main Profile Content */}
        <div className="flex-1 w-full md:w-[73%] space-y-2">
          
          {/* 1. Intro Card */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] overflow-hidden relative">
            {/* Cover Photo */}
            <div className="h-[201px] w-full relative bg-[#38434f]">
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
              <div className="w-[152px] h-[152px] rounded-full border-4 border-[#1d2226] overflow-hidden bg-[#000000] relative group shadow-sm">
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
                <button onClick={() => openModal('intro')} className="p-2 rounded-full hover:bg-white/10 transition">
                  <Edit2 size={24} className="text-[#e9e9e9]" />
                </button>
              </div>
            )}

            <div className="px-6 pb-6 mt-[70px]">
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-semibold leading-tight hover:underline cursor-pointer">{profile.fullName}</h1>
                {profile.pronouns && <span className="text-[14px] text-[#8c96a1] font-normal">({profile.pronouns})</span>}
              </div>
              <p className="text-[16px] text-[#e9e9e9] mt-1 pr-16">{profile.headline || 'Add a headline'}</p>
              
              <div className="flex items-center gap-2 mt-1 text-[14px] text-[#8c96a1]">
                {profile.location && <span>{profile.location}</span>}
                {profile.location && <span>•</span>}
                <span className="text-[#70b5f9] font-semibold cursor-pointer hover:underline">Contact info</span>
              </div>
              
              <div className="mt-2 text-[14px]">
                <span className="text-[#70b5f9] font-semibold cursor-pointer hover:underline">500+ connections</span>
              </div>

              {isOwnProfile && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <button className="bg-[#0a66c2] hover:bg-[#004182] text-white font-semibold rounded-full px-4 py-1.5 text-[15px] transition">
                    Open to
                  </button>
                  <button className="border border-[#70b5f9] text-[#70b5f9] hover:bg-[#70b5f9]/10 hover:border-[2px] hover:-m-[1px] font-semibold rounded-full px-4 py-1.5 text-[15px] transition box-border">
                    Add profile section
                  </button>
                  <button className="border border-[#e9e9e9] text-[#e9e9e9] hover:bg-white/10 hover:border-[2px] hover:-m-[1px] font-semibold rounded-full px-4 py-1.5 text-[15px] transition box-border">
                    More
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Analytics (Private) */}
          {isOwnProfile && (
            <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9] mb-1">Analytics</h2>
              <div className="flex items-center gap-2 text-[14px] text-[#8c96a1] mb-4">
                <Eye size={16} /> <span className="font-semibold">Private to you</span>
              </div>
              <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
                <div className="min-w-[150px] p-2">
                  <div className="flex items-center gap-2 text-[#e9e9e9] font-semibold text-[16px]">
                    <Users size={20} /> 342 profile views
                  </div>
                  <p className="text-[12px] text-[#8c96a1] mt-1">Discover who's viewed your profile.</p>
                </div>
                <div className="min-w-[150px] p-2 border-l border-[#38434f]">
                  <div className="flex items-center gap-2 text-[#e9e9e9] font-semibold text-[16px]">
                    <BarChart2 size={20} /> 1.2k post impressions
                  </div>
                  <p className="text-[12px] text-[#8c96a1] mt-1">Check out who's engaging with your posts.</p>
                </div>
                <div className="min-w-[150px] p-2 border-l border-[#38434f]">
                  <div className="flex items-center gap-2 text-[#e9e9e9] font-semibold text-[16px]">
                    <Search size={20} /> 45 search appearances
                  </div>
                  <p className="text-[12px] text-[#8c96a1] mt-1">See how often you appear in search results.</p>
                </div>
              </div>
            </div>
          )}

          {/* About Card */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">About</h2>
              {isOwnProfile && (
                <button onClick={() => openModal('about')} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={24} className="text-[#e9e9e9]" /></button>
              )}
            </div>
            {profile.bio ? (
              <p className="text-[14px] text-[#e9e9e9] leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
            ) : (
              isOwnProfile && <p className="text-[14px] text-[#8c96a1]">You haven't added a summary yet. Let connections know your professional background.</p>
            )}
            
            {profile.knownTechnologies && profile.knownTechnologies.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#38434f]">
                <p className="text-[14px] font-semibold mb-2">Top skills</p>
                <div className="flex items-center gap-2 text-[14px] text-[#e9e9e9]">
                  <Target size={16} /> <span>{profile.knownTechnologies.slice(0, 3).join(' • ')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Activity Feed placeholder */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">Activity</h2>
              {isOwnProfile && (
                <button className="border border-[#e9e9e9] text-[#e9e9e9] hover:bg-white/10 hover:border-[2px] hover:-m-[1px] font-semibold rounded-full px-4 py-1.5 text-[15px] transition box-border">
                  Create a post
                </button>
              )}
            </div>
            <p className="text-[14px] text-[#70b5f9] font-semibold hover:underline cursor-pointer mb-4">500+ followers</p>
            
            {/* Mock Post */}
            <div className="border-t border-[#38434f] pt-4 mt-2">
              <div className="flex gap-2 text-[12px] text-[#8c96a1] mb-2">
                <span className="font-semibold text-[#e9e9e9]">{profile.fullName}</span> posted this • 1d
              </div>
              <p className="text-[14px] mb-2">Just hit a {profile.streak || 0}-day coding streak! Constantly learning and building new things everyday. 🚀 #coding #development</p>
            </div>
            <div className="border-t border-[#38434f] mt-4 pt-3 flex justify-center">
              <button className="text-[16px] font-semibold text-[#8c96a1] hover:bg-white/5 w-full py-1.5 rounded transition flex items-center justify-center gap-2">
                Show all activity →
              </button>
            </div>
          </div>

          {/* Experience Card */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">Experience</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => {
                    setFormData({...profile, currentExperience: { company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }});
                    setEditIndex(-1);
                    setActiveModal('experience');
                  }} className="p-2 rounded-full hover:bg-white/10 transition"><Plus size={24} className="text-[#e9e9e9]" /></button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {profile.experiences?.length ? profile.experiences.map((exp, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Vertical Line for timeline (if multiple roles at same company, usually implemented but omitted here for simplicity unless grouped) */}
                  <div className="w-[48px] h-[48px] bg-white flex items-center justify-center shrink-0 overflow-hidden">
                     <Briefcase className="text-[#1d2226]" size={24} />
                  </div>
                  <div className="flex-1 pb-6 border-b border-[#38434f] last:border-0 last:pb-0 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#e9e9e9]">{exp.role}</h3>
                        <p className="text-[14px] text-[#e9e9e9]">{exp.company}</p>
                        <p className="text-[14px] text-[#8c96a1]">
                          {formatMonthYear(exp.startDate)} - {exp.isCurrent ? 'Present' : formatMonthYear(exp.endDate || '')}
                        </p>
                      </div>
                      {isOwnProfile && (
                        <button onClick={() => {
                          setFormData({...profile, currentExperience: exp});
                          setEditIndex(i);
                          setActiveModal('experience');
                        }} className="p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition">
                          <Edit2 size={24} className="text-[#e9e9e9]" />
                        </button>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-[14px] text-[#e9e9e9] mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                    )}
                  </div>
                </div>
              )) : (
                <p className="text-[14px] text-[#8c96a1]">No experience added yet.</p>
              )}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">Education</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => openModal('education')} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={24} className="text-[#e9e9e9]" /></button>
                </div>
              )}
            </div>
            
            {profile.collegeName ? (
              <div className="flex gap-4">
                <div className="w-[48px] h-[48px] bg-white flex items-center justify-center shrink-0">
                  <GraduationCap className="text-[#1d2226]" size={28} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#e9e9e9]">{profile.collegeName}</h3>
                  <p className="text-[14px] text-[#e9e9e9]">{profile.degree}, {profile.fieldOfStudy}</p>
                  <p className="text-[14px] text-[#8c96a1] mt-0.5">{profile.yearOfStudy}</p>
                  {profile.cgpa && <p className="text-[14px] text-[#8c96a1] mt-0.5">Grade: {profile.cgpa}</p>}
                </div>
              </div>
            ) : (
              <p className="text-[14px] text-[#8c96a1]">No education added yet.</p>
            )}
          </div>

          {/* Licenses & Certifications */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">Licenses & certifications</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => {
                    setFormData({...profile, currentCert: { name: '', issuer: '', issueDate: '', credentialId: '', credentialUrl: '' }});
                    setEditIndex(-1);
                    setActiveModal('certification');
                  }} className="p-2 rounded-full hover:bg-white/10 transition"><Plus size={24} className="text-[#e9e9e9]" /></button>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {profile.certifications?.length ? profile.certifications.map((cert, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-[48px] h-[48px] bg-white flex items-center justify-center shrink-0">
                    <Award className="text-[#1d2226]" size={28} />
                  </div>
                  <div className="flex-1 pb-6 border-b border-[#38434f] last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#e9e9e9]">{cert.name}</h3>
                        <p className="text-[14px] text-[#e9e9e9]">{cert.issuer}</p>
                        <p className="text-[14px] text-[#8c96a1]">Issued {formatMonthYear(cert.issueDate)}</p>
                        {cert.credentialId && <p className="text-[14px] text-[#8c96a1] mt-1">Credential ID {cert.credentialId}</p>}
                        {cert.credentialUrl && (
                          <button onClick={() => window.open(cert.credentialUrl, '_blank')} className="mt-2 border border-[#8c96a1] text-[#8c96a1] hover:bg-white/10 hover:border-[2px] hover:-m-[1px] font-semibold rounded-full px-4 py-1 text-[15px] transition box-border">
                            Show credential
                          </button>
                        )}
                      </div>
                      {isOwnProfile && (
                        <button onClick={() => {
                          setFormData({...profile, currentCert: cert});
                          setEditIndex(i);
                          setActiveModal('certification');
                        }} className="p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition">
                          <Edit2 size={24} className="text-[#e9e9e9]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-[14px] text-[#8c96a1]">No certifications added yet.</p>
              )}
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-[#e9e9e9]">Skills</h2>
              {isOwnProfile && (
                <div className="flex gap-2">
                  <button onClick={() => openModal('skills')} className="p-2 rounded-full hover:bg-white/10 transition"><Edit2 size={24} className="text-[#e9e9e9]" /></button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {profile.knownTechnologies?.map((tech, i) => (
                <div key={i} className="border-b border-[#38434f] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-[16px] font-semibold text-[#e9e9e9]">{tech}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex -space-x-2">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-6 h-6 rounded-full border border-[#1d2226]" />
                      <img src={`https://i.pravatar.cc/150?u=${i+20}`} className="w-6 h-6 rounded-full border border-[#1d2226]" />
                    </div>
                    <span className="text-[14px] text-[#8c96a1]">Endorsed by {Math.floor(Math.random() * 10) + 2} connections</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebars */}
        <div className="w-full md:w-[27%] space-y-4 hidden md:block">
          
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-5">
            <div className="flex justify-between items-start border-b border-[#38434f] pb-4 mb-4">
              <div>
                <h3 className="text-[16px] font-semibold text-[#e9e9e9] hover:text-[#70b5f9] hover:underline cursor-pointer">Profile language</h3>
                <p className="text-[14px] text-[#8c96a1] mt-1">English</p>
              </div>
              <Edit2 size={20} className="text-[#8c96a1] cursor-pointer" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[16px] font-semibold text-[#e9e9e9] hover:text-[#70b5f9] hover:underline cursor-pointer">Public profile & URL</h3>
                <p className="text-[14px] text-[#8c96a1] break-all mt-1">{window.location.origin}/profile/{profile._id}</p>
              </div>
              <Edit2 size={20} className="text-[#8c96a1] cursor-pointer shrink-0 ml-2" />
            </div>
          </div>

          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-5 relative overflow-hidden">
             <h3 className="text-[16px] font-semibold text-[#e9e9e9] mb-4">People you may know</h3>
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-3">
                   <img src={`https://i.pravatar.cc/150?u=${i + 30}`} className="w-12 h-12 rounded-full border border-[#38434f]" />
                   <div>
                     <h4 className="text-[15px] font-semibold text-[#e9e9e9] hover:underline cursor-pointer">Sample User {i}</h4>
                     <p className="text-[12px] text-[#8c96a1] line-clamp-2 mt-0.5">Software Engineer at Tech Corp</p>
                     <button className="mt-2 px-4 py-1 rounded-full border border-[#e9e9e9] text-[#e9e9e9] text-[15px] font-semibold hover:bg-white/10 hover:border-[2px] hover:-m-[1px] transition box-border">
                       Connect
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Gamification / Activity Integration */}
          <div className="bg-[#1d2226] rounded-xl border border-[#38434f] p-5">
            <h3 className="text-[16px] font-semibold text-[#e9e9e9] mb-4">Platform Activity</h3>
            <div className="mb-4">
              <p className="text-[14px] text-[#8c96a1] mb-1">Coding Streak</p>
              <div className="flex items-center gap-2">
                <Zap className="text-amber-400" size={16} />
                <span className="text-[14px] font-semibold text-[#e9e9e9]">{profile.streak || 0} days</span>
              </div>
            </div>
            <div className="w-full flex justify-center scale-[0.85] origin-left">
              <ActivityCalendar 
                data={heatmapData} 
                theme={{
                  light: ['#1d2226', '#004182', '#0a66c2', '#70b5f9', '#ffffff'],
                  dark: ['#1d2226', '#004182', '#0a66c2', '#70b5f9', '#ffffff'],
                }}
                colorScheme="dark"
                hideColorLegend
                hideMonthLabels
                blockSize={9}
                blockMargin={2}
              />
            </div>
          </div>
        </div>

      </main>

      {/* MODALS */}

      {/* Edit Intro Modal */}
      <Modal isOpen={activeModal === 'intro'} onClose={closeModal} title="Edit intro" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">First name*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px] transition-all px-2" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Pronouns</Label>
            <SearchableDropdown value={formData.pronouns || ''} onChange={(val) => setFormData({...formData, pronouns: val})} options={[{value:'He/Him', label:'He/Him'}, {value:'She/Her', label:'She/Her'}, {value:'They/Them', label:'They/Them'}]} placeholder="Please select" />
            <p className="text-xs text-[#8c96a1]">Let others know how to refer to you.</p>
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Headline*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px] transition-all px-2" value={formData.headline || ''} onChange={(e) => setFormData({...formData, headline: e.target.value})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Industry*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px] transition-all px-2" value={formData.industry || ''} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-2">Location</h3>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">City, State</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px] transition-all px-2" value={formData.location || ''} onChange={(e) => setFormData({...formData, location: e.target.value})} />
          </div>
        </div>
      </Modal>

      {/* Edit About Modal */}
      <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="Edit about" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-1">
          <Label className="text-[#8c96a1] text-xs">Description</Label>
          <textarea 
            className="w-full min-h-[150px] bg-transparent border border-[#e9e9e9] rounded-sm p-2 text-sm text-[#e9e9e9] hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px] outline-none transition-all"
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
        // We use a trick here: we save to formData but we need to trigger the actual API call.
        const finalData = {...formData, experiences: newExps};
        setIsSaving(true);
        updateProfileAsync(finalData).then(() => {
          setProfile({...profile, ...finalData});
          closeModal();
          toast.success('Experience saved');
        }).catch(err => toast.error(err.message)).finally(() => setIsSaving(false));
      }} isSaving={isSaving}>
        <div className="space-y-5">
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Title*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px]" value={formData.currentExperience?.role || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, role: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Company name*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2] focus:border-[2px]" value={formData.currentExperience?.company || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, company: e.target.value}})} />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="isCurrent" className="w-4 h-4 rounded border-gray-300" checked={formData.currentExperience?.isCurrent || false} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, isCurrent: e.target.checked}})} />
            <label htmlFor="isCurrent" className="text-sm">I am currently working in this role</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[#8c96a1] text-xs">Start date*</Label>
              <Input type="month" className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm" value={formData.currentExperience?.startDate || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, startDate: e.target.value}})} />
            </div>
            <div className="space-y-1">
              <Label className="text-[#8c96a1] text-xs">End date{!formData.currentExperience?.isCurrent && '*'}</Label>
              <Input type="month" disabled={formData.currentExperience?.isCurrent} className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm disabled:opacity-50" value={formData.currentExperience?.endDate || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, endDate: e.target.value}})} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Description</Label>
            <textarea className="w-full min-h-[100px] bg-transparent border border-[#e9e9e9] rounded-sm p-2 text-sm text-[#e9e9e9] outline-none" value={formData.currentExperience?.description || ''} onChange={(e) => setFormData({...formData, currentExperience: {...formData.currentExperience, description: e.target.value}})} />
          </div>
        </div>
        {editIndex > -1 && (
          <div className="mt-8 pt-4 border-t border-[#38434f]">
            <button onClick={() => {
              const newExps = [...formData.experiences];
              newExps.splice(editIndex, 1);
              const finalData = {...formData, experiences: newExps};
              setIsSaving(true);
              updateProfileAsync(finalData).then(() => {
                setProfile({...profile, ...finalData});
                closeModal();
                toast.success('Experience deleted');
              }).finally(() => setIsSaving(false));
            }} className="text-[#8c96a1] hover:text-[#e9e9e9] font-semibold transition">Delete experience</button>
          </div>
        )}
      </Modal>

      {/* Edit Education Modal */}
      <Modal isOpen={activeModal === 'education'} onClose={closeModal} title="Edit education" onSave={handleSave} isSaving={isSaving}>
        <div className="space-y-5">
           <CollegeDropdown value={formData.collegeName} onChange={(val) => setFormData({...formData, collegeName: val})} />
           <div className="space-y-1">
             <Label className="text-[#8c96a1] text-xs">Degree</Label>
             <SearchableDropdown value={formData.degree} onChange={(val) => setFormData({...formData, degree: val, fieldOfStudy: ''})} options={degreeOptions} placeholder="Ex: Bachelor's" />
           </div>
           <div className="space-y-1">
             <Label className="text-[#8c96a1] text-xs">Field of study</Label>
             <SearchableDropdown value={formData.fieldOfStudy} onChange={(val) => setFormData({...formData, fieldOfStudy: val})} options={getFieldsOfStudyByDegree(formData.degree)} placeholder="Ex: Business" searchable />
           </div>
           <div className="space-y-1">
             <Label className="text-[#8c96a1] text-xs">Graduation Year</Label>
             <SearchableDropdown value={formData.yearOfStudy} onChange={(val) => setFormData({...formData, yearOfStudy: val})} options={yearOfStudyOptions} placeholder="Year" />
           </div>
           <div className="space-y-1">
             <Label className="text-[#8c96a1] text-xs">Grade</Label>
             <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.cgpa || ''} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} />
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
            <Label className="text-[#8c96a1] text-xs">Name*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.currentCert?.name || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, name: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Issuing organization*</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.currentCert?.issuer || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, issuer: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Issue date</Label>
            <Input type="month" className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.currentCert?.issueDate || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, issueDate: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Credential ID</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.currentCert?.credentialId || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, credentialId: e.target.value}})} />
          </div>
          <div className="space-y-1">
            <Label className="text-[#8c96a1] text-xs">Credential URL</Label>
            <Input className="bg-transparent border-[#e9e9e9] text-[#e9e9e9] h-8 rounded-sm hover:border-[2px] focus:border-[#0a66c2]" value={formData.currentCert?.credentialUrl || ''} onChange={(e) => setFormData({...formData, currentCert: {...formData.currentCert, credentialUrl: e.target.value}})} />
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
