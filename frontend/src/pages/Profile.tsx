import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { Code2, Flame, Award, Loader2, ChevronLeft, MapPin, Briefcase, Calendar, ExternalLink, Linkedin, Github } from 'lucide-react';
import api from '../api/axios';
import { getFileUrl } from '@/utils/fileUrl';
import { GridBeam } from '@/components/ui/background-grid-beam';
import Tilt from 'react-parallax-tilt';

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

const Profile = () => {
  const hash = window.location.pathname.split('?')[0];
  const userId = hash.startsWith('#portfolio/') ? hash.replace('#portfolio/', '') : hash.replace('#/portfolio/', '') || hash.replace('/portfolio/', '');
  
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/portfolio/${userId}`);
        if (res.data.success) {
          setProfile(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

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

  const rank = getRank(profile.xp);

  const heatmapData = [];
  const today = new Date();
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const count = profile.solvedProblems.filter(p => p.solvedAt.startsWith(dateStr)).length;
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
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-2 text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {/* 1. Hero / Header Section */}
        <div className="bg-[#161a20] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl relative">
          {/* Cover Photo */}
          <div className="h-64 md:h-80 w-full relative">
            <div className="absolute inset-0 bg-[#0a0c10]/20" /> {/* Slight overlay */}
            {profile.coverPhoto ? (
              <img 
                src={getFileUrl(profile.coverPhoto)} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-900/20 to-[#0a0c10] border-b border-white/5" />
            )}
          </div>
          
          <div className="px-6 md:px-10 pb-10 relative">
            {/* Avatar */}
            <div className="absolute -top-20 md:-top-24 left-4 md:left-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0a0c10] overflow-hidden bg-[#11141a] shadow-2xl relative">
                <img 
                  src={profile.avatar ? getFileUrl(profile.avatar) : `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-20 md:pt-28">
              <div>
                <h1 className="text-3xl md:text-5xl font-[900] text-white tracking-tight">{profile.fullName}</h1>
                <p className="text-lg text-white/80 font-medium mt-1 max-w-2xl">{profile.targetRole || 'Software Engineer'}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/50 font-medium">
                  {profile.location && (
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.location}</span>
                  )}
                  {profile.experiences && profile.experiences.length > 0 && (
                    <span className="flex items-center gap-1.5"><Briefcase size={16} /> {profile.experiences[0]?.company}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {profile.linkedin && (
                  <a href={profile.linkedin.includes('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white hover:text-[#0a66c2]">
                    <Linkedin size={20} />
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github.includes('http') ? profile.github : `https://${profile.github}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white hover:text-gray-400">
                    <Github size={20} />
                  </a>
                )}
                <div className={`px-4 py-2.5 rounded-xl border flex flex-col items-center justify-center ${rank.title === 'Master' ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-[#5ed29c]/20 bg-[#5ed29c]/10'}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${rank.color}`}>{rank.title} Rank</span>
                  <span className="text-sm font-bold text-white mt-0.5">{profile.xp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left / 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About */}
            {profile.bio && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-lg font-[900] text-white mb-4 uppercase tracking-widest">About</h2>
                <p className="text-white/70 leading-relaxed text-sm whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            {/* Experience */}
            {profile.experiences && profile.experiences.length > 0 && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-lg font-[900] text-white mb-8 uppercase tracking-widest">Experience</h2>
                <div className="space-y-8">
                  {profile.experiences.map((exp, i) => (
                    <div key={i} className="flex gap-4 relative">
                      {i !== profile.experiences!.length - 1 && (
                        <div className="absolute top-10 bottom-[-2rem] left-5 w-[2px] bg-white/10" />
                      )}
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
                        {exp.description && (
                          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {profile.portfolioProjects && profile.portfolioProjects.length > 0 && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-lg font-[900] text-white mb-6 uppercase tracking-widest">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.portfolioProjects.map((proj, i) => (
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
              </div>
            )}

          </div>

          {/* Sidebar (Right / 1 Col) */}
          <div className="space-y-8">
            
            {/* Skills */}
            {(profile.knownTechnologies?.length || 0) > 0 && (
              <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
                <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Skills & Expertise</h2>
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
              </div>
            )}

            {/* Gamification / Activity */}
            <div className="bg-[#161a20] rounded-[24px] p-8 border border-white/5 shadow-xl">
              <h2 className="text-sm font-[900] text-white mb-6 uppercase tracking-widest">Coding Activity</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-2xl text-center">
                  <Code2 className="w-5 h-5 text-[#5ed29c] mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{profile.stats.totalSolved}</p>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Solved</p>
                </div>
                <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-2xl text-center">
                  <Flame className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{profile.streak}</p>
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

              {profile.recentProblems.length > 0 && (
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

            {/* Badges */}
            {profile.badges.length > 0 && (
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
