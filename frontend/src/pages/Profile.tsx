import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActivityCalendar } from 'react-activity-calendar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, Code2, Flame, Award, Loader2, ChevronLeft } from 'lucide-react';
import api from '../api/axios';
import { GridBeam } from '@/components/ui/background-grid-beam';

interface ProfileData {
  fullName: string;
  avatar: string;
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
  // Extract userId from hash since we use custom hash routing: #portfolio/123
  const hash = window.location.hash.split('?')[0];
  const userId = hash.startsWith('#portfolio/') ? hash.replace('#portfolio/', '') : hash.replace('#/portfolio/', '');
  
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline">Go Back</button>
      </div>
    );
  }

  const rank = getRank(profile.xp);

  const pieData = [
    { name: 'Easy', value: profile.stats.easy, color: '#10B981' },
    { name: 'Medium', value: profile.stats.medium, color: '#F59E0B' },
    { name: 'Hard', value: profile.stats.hard, color: '#EF4444' },
  ].filter(d => d.value > 0);

  // Generate heatmap data for the last 6 months
  const heatmapData = [];
  const today = new Date();
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Count problems solved on this day
    const count = profile.solvedProblems.filter(p => p.solvedAt.startsWith(dateStr)).length;
    heatmapData.push({
      date: dateStr,
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-rubik selection:bg-[#5ed29c] selection:text-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <GridBeam className="w-full h-full" />
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 text-[10px] font-black uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {/* Profile Header */}
        <div className="bg-[#161a20] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl mb-12 flex flex-col md:flex-row items-center md:items-start gap-10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute top-0 right-0 p-6">
              <div className="text-[10px] text-[#5ed29c] font-bold bg-[#5ed29c]/10 px-3 py-1.5 rounded uppercase tracking-[0.3em]">Verified Profile</div>
          </div>
          <img 
            src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
            alt={profile.fullName}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-[#0a0c10] shadow-2xl z-10 relative"
          />
          <div className="flex-1 text-center md:text-left z-10 relative">
            <h1 className="text-4xl md:text-6xl font-[900] text-white uppercase tracking-tighter italic mb-2">{profile.fullName}</h1>
            <p className={`text-[12px] font-black uppercase tracking-[0.4em] ${rank.color} mb-8`}>{rank.title} Developer</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#0a0c10] border border-white/5 shadow-inner rounded-2xl">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Total XP</p>
                  <p className="text-2xl font-[900] text-white italic">{profile.xp.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#0a0c10] border border-white/5 shadow-inner rounded-2xl">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Current Streak</p>
                  <p className="text-2xl font-[900] text-white italic">{profile.streak} Days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#0a0c10] border border-white/5 shadow-inner rounded-2xl">
                  <Code2 className="w-6 h-6 text-[#5ed29c]" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Problems Solved</p>
                  <p className="text-2xl font-[900] text-white italic">{profile.stats.totalSolved}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column */}
          <div className="space-y-10">
            {/* Badges */}
            <div className="bg-[#161a20] rounded-[36px] p-8 border border-white/5 shadow-2xl hover:border-white/20 transition-all group overflow-hidden relative">
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Award size={180} />
              </div>
              <h2 className="text-2xl font-[900] text-white mb-8 flex items-center gap-3 uppercase tracking-tight italic relative z-10">
                <Award className="w-6 h-6 text-[#5ed29c]" /> 
                Badges Earned
              </h2>
              {profile.badges.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {profile.badges.map((b, i) => (
                    <div key={i} className="bg-[#0a0c10] p-5 rounded-2xl text-center border border-white/5 hover:border-[#5ed29c]/50 transition-colors">
                      <div className="w-12 h-12 mx-auto bg-[#5ed29c]/10 rounded-full flex items-center justify-center mb-3">
                        <Award className="w-6 h-6 text-[#5ed29c]" />
                      </div>
                      <p className="text-[11px] font-[900] uppercase tracking-widest text-white/80">{b.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-center py-4 text-[10px] uppercase font-bold tracking-widest">No badges earned yet.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Stats Overview */}
            <div className="bg-[#161a20] rounded-[36px] p-8 border border-white/5 shadow-2xl hover:border-white/20 transition-all">
              <h2 className="text-2xl font-[900] text-white mb-8 uppercase tracking-tight italic">Solving Signals</h2>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-48 h-48">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: '#fff', fontWeight: 900, textTransform: 'uppercase' }} 
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 border-[4px] border-dashed border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">
                      No Data
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#0a0c10] border border-white/5 rounded-[20px]">
                    <span className="text-emerald-400 font-black uppercase tracking-widest text-[11px]">Easy</span>
                    <span className="text-white font-[900] text-xl">{profile.stats.easy}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#0a0c10] border border-white/5 rounded-[20px]">
                    <span className="text-yellow-400 font-black uppercase tracking-widest text-[11px]">Medium</span>
                    <span className="text-white font-[900] text-xl">{profile.stats.medium}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#0a0c10] border border-white/5 rounded-[20px]">
                    <span className="text-red-400 font-black uppercase tracking-widest text-[11px]">Hard</span>
                    <span className="text-white font-[900] text-xl">{profile.stats.hard}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-[#161a20] rounded-[36px] p-8 border border-white/5 shadow-2xl hover:border-white/20 transition-all overflow-x-auto">
              <h2 className="text-2xl font-[900] text-white mb-10 uppercase tracking-tight italic">Activity Signal Grid</h2>
              <div className="min-w-[750px]">
                <ActivityCalendar 
                  data={heatmapData} 
                  theme={{
                    light: ['#0a0c10', '#064e3b', '#047857', '#10b981', '#5ed29c'],
                    dark: ['#0a0c10', '#064e3b', '#047857', '#10b981', '#5ed29c'],
                  }}
                  colorScheme="dark"
                  labels={{
                    totalCount: `{{count}} submissions in the last 6 months`,
                  }}
                  blockRadius={4}
                  blockMargin={6}
                  blockSize={14}
                  fontSize={12}
                />
              </div>
            </div>

            {/* Recent Problems */}
            <div className="bg-[#161a20] rounded-[36px] p-8 border border-white/5 shadow-2xl hover:border-white/20 transition-all">
              <h2 className="text-2xl font-[900] text-white mb-8 uppercase tracking-tight italic">Recent Output</h2>
              {profile.recentProblems.length > 0 ? (
                <div className="space-y-4">
                  {profile.recentProblems.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-[#0a0c10] hover:bg-white/[0.02] transition-colors rounded-[24px] border border-white/5 group">
                      <div>
                        <p className="font-[900] text-[15px] text-white uppercase italic tracking-tight group-hover:text-[#5ed29c] transition-colors">{p.problemId.replace(/-/g, ' ')}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">{new Date(p.solvedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        p.difficulty === 'Easy' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' :
                        p.difficulty === 'Medium' ? 'bg-yellow-500/5 text-yellow-400 border-yellow-500/20' :
                        'bg-red-500/5 text-red-400 border-red-500/20'
                      }`}>
                        {p.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-center py-4 text-[10px] uppercase font-bold tracking-widest">No recent output detected.</p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
