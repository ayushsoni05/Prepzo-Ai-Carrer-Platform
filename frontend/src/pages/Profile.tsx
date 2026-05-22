import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActivityCalendar from 'react-activity-calendar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, Code2, Flame, Award, Loader2, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

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
        const res = await fetch(`http://localhost:5000/api/users/portfolio/${userId}`);
        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
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
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        {/* Profile Header */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <img 
            src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
            alt={profile.fullName}
            className="w-32 h-32 rounded-full border-4 border-gray-700"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{profile.fullName}</h1>
            <p className={`text-lg font-semibold ${rank.color} mb-4`}>{rank.title} Developer</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total XP</p>
                  <p className="font-bold text-white">{profile.xp.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Current Streak</p>
                  <p className="font-bold text-white">{profile.streak} Days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Code2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Problems Solved</p>
                  <p className="font-bold text-white">{profile.stats.totalSolved}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> 
                Badges Earned
              </h2>
              {profile.badges.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {profile.badges.map((b, i) => (
                    <div key={i} className="bg-gray-700/50 p-4 rounded-xl text-center border border-gray-600 hover:border-purple-500 transition-colors">
                      <div className="w-10 h-10 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                        <Award className="w-6 h-6 text-purple-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-200">{b.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No badges earned yet. Keep solving!</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Overview */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Solving Stats</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48">
                  {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }} 
                          itemStyle={{ color: '#fff' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 border-4 border-dashed border-gray-700 rounded-full">
                      No Data
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-emerald-400 font-medium">Easy</span>
                    <span className="text-white font-bold">{profile.stats.easy}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-yellow-400 font-medium">Medium</span>
                    <span className="text-white font-bold">{profile.stats.medium}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                    <span className="text-red-400 font-medium">Hard</span>
                    <span className="text-white font-bold">{profile.stats.hard}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl overflow-x-auto">
              <h2 className="text-xl font-bold text-white mb-6">Contribution Activity</h2>
              <div className="min-w-[700px]">
                <ActivityCalendar 
                  data={heatmapData} 
                  theme={{
                    light: ['#1f2937', '#064e3b', '#047857', '#10b981', '#34d399'],
                    dark: ['#1f2937', '#064e3b', '#047857', '#10b981', '#34d399'],
                  }}
                  colorScheme="dark"
                  labels={{
                    totalCount: `{{count}} submissions in the last 6 months`,
                  }}
                />
              </div>
            </div>

            {/* Recent Problems */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4">Recent Submissions</h2>
              {profile.recentProblems.length > 0 ? (
                <div className="space-y-3">
                  {profile.recentProblems.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-700/30 hover:bg-gray-700/50 transition-colors rounded-xl border border-gray-600/50">
                      <div>
                        <p className="font-semibold text-white capitalize">{p.problemId.replace(/-/g, ' ')}</p>
                        <p className="text-xs text-gray-400">{new Date(p.solvedAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        p.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {p.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No recent activity.</p>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
