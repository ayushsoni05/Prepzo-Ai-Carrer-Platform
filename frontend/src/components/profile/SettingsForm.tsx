import { useState } from 'react';
import { 
  User, 
  ShieldAlert, 
  Bell, 
  Lock, 
  Eye, 
  Database,
  Monitor,
  Settings,
  Smartphone,
  Globe,
  Save,
  Trash2,
  LogOut,
  Megaphone
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ThinkingLoader } from '@/components/ui/loading';
import toast from 'react-hot-toast';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { navigateTo } from '@/utils/navigation';

export function SettingsForm() {
  const { user, updateProfileAsync, logoutAsync } = useAuthStore();
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to terminate your current session?')) {
      try {
        await logoutAsync();
        toast.success('Neural session terminated');
        navigateTo('landing');
      } catch (error) {
        toast.error('Failed to terminate session');
      }
    }
  };
  
  const [settings, setSettings] = useState({
    profileVisibility: user?.settings?.profileVisibility ?? true,
    networkVisibility: user?.settings?.networkVisibility ?? true,
    emailAlerts: user?.settings?.emailAlerts ?? true,
    pushNotifications: user?.settings?.pushNotifications ?? false,
    dataTelemetry: user?.settings?.dataTelemetry ?? true,
    twoFactorAuth: user?.settings?.twoFactorAuth ?? false,
    targetedAds: user?.settings?.targetedAds ?? false,
    autoplayVideos: user?.settings?.autoplayVideos ?? true,
    language: user?.settings?.language || 'English'
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfileAsync({ settings });
      toast.success('Settings synchronized successfully');
    } catch (error: any) {
      toast.error(error.message || 'Synchronization failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('WARNING: This will permanently delete your account and all associated data. This action cannot be undone. Are you absolutely sure?')) {
      toast.error('Account deletion requested. Please contact support to finalize.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32 font-rubik">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="text-[11px] font-[900] uppercase tracking-[0.4em] text-[#5ed29c] mb-4">Command Center</p>
          <h1 className="text-4xl md:text-6xl font-[900] text-white uppercase tracking-tighter italic leading-[0.85]">Settings <span className="text-white/20">Matrix</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="bg-[#5ed29c] text-[#0a0c10] px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#5ed29c]/10"
          >
            {loading ? <ThinkingLoader /> : <Save size={16} />}
            <span className="font-[900] uppercase tracking-widest text-[11px]">Save Changes</span>
          </button>
        </div>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="col-span-1">
            <TabsList className="flex flex-col w-full h-auto bg-transparent items-start gap-2 border-l-2 border-white/10 rounded-none p-0 ml-2 pl-4">
              <TabsTrigger value="preferences" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><User className="w-4 h-4 mr-3" /> Account Prefs</TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><Lock className="w-4 h-4 mr-3" /> Sign in & Security</TabsTrigger>
              <TabsTrigger value="visibility" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><Eye className="w-4 h-4 mr-3" /> Visibility</TabsTrigger>
              <TabsTrigger value="privacy" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><ShieldAlert className="w-4 h-4 mr-3" /> Data Privacy</TabsTrigger>
              <TabsTrigger value="advertising" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><Megaphone className="w-4 h-4 mr-3" /> Advertising Data</TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start py-3 text-xs uppercase tracking-widest font-black data-[state=active]:text-[#5ed29c] data-[state=active]:bg-transparent"><Bell className="w-4 h-4 mr-3" /> Notifications</TabsTrigger>
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="col-span-1 md:col-span-3">
            
            <TabsContent value="preferences" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Monitor size={20} /></div>
                    Account Preferences
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Manage your UI and site preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white">Visual Theme</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Toggle between light and dark modes</p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Language</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Select the language you use on the platform</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#5ed29c] uppercase tracking-widest bg-[#5ed29c]/10 px-3 py-1 rounded-full">{settings.language}</span>
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, autoplayVideos: !settings.autoplayVideos})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Autoplay Videos</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Automatically play videos on your feed</p>
                    </div>
                    <Switch checked={settings.autoplayVideos} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400"><Lock size={20} /></div>
                    Sign in & Security
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Manage your account access and sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Email Addresses</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Add or remove email addresses on your account</p>
                    </div>
                    <span className="text-[10px] font-bold text-white/50">{user?.email}</span>
                  </div>
                  
                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Change Password</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Choose a unique password to protect your account</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#5ed29c] uppercase tracking-widest">Update</span>
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Two-Step Verification</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Activate this feature for enhanced account security</p>
                    </div>
                    <Switch checked={settings.twoFactorAuth} />
                  </div>

                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Where you're signed in</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">See your active sessions across devices</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-white/30" />
                      <span className="text-[10px] font-bold text-white/50">1 Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Eye size={20} /></div>
                    Visibility
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Control who sees your profile and network activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, profileVisibility: !settings.profileVisibility})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Profile Viewing Options</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Choose whether you're visible or viewing in private mode</p>
                    </div>
                    <Switch checked={settings.profileVisibility} />
                  </div>
                  
                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, networkVisibility: !settings.networkVisibility})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Connections Visibility</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Choose who can see your connections</p>
                    </div>
                    <Switch checked={settings.networkVisibility} />
                  </div>
                  
                  <Separator className="bg-white/5" />
                  
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Edit your public profile</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Choose how your profile appears to non-logged-in members</p>
                    </div>
                    <Globe className="w-4 h-4 text-white/30" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400"><ShieldAlert size={20} /></div>
                    Data Privacy
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Manage how we use your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, dataTelemetry: !settings.dataTelemetry})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Usage Telemetry</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Allow system to collect anonymous usage data to improve AI</p>
                    </div>
                    <Switch checked={settings.dataTelemetry} />
                  </div>
                  
                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Get a copy of your data</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Download your connections, posts, and profile data</p>
                    </div>
                    <Database className="w-4 h-4 text-white/30" />
                  </div>

                  <div className="pt-8 mt-4 border-t border-red-500/20">
                    <h3 className="text-[12px] font-black text-red-500 uppercase tracking-widest mb-4">Danger Zone</h3>
                    <button 
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center justify-between p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-colors group"
                    >
                      <div className="text-left">
                        <Label className="text-[12px] font-black uppercase tracking-widest text-red-500 cursor-pointer">Delete Account</Label>
                        <p className="text-[10px] font-medium text-red-400/50 uppercase tracking-widest mt-1">Permanently erase all neural records and history</p>
                      </div>
                      <Trash2 className="w-5 h-5 text-red-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advertising" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400"><Megaphone size={20} /></div>
                    Advertising Data
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Control what data we use to show you ads</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, targetedAds: !settings.targetedAds})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Targeted Advertising</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Use my profile data for personalized ads on partner sites</p>
                    </div>
                    <Switch checked={settings.targetedAds} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 m-0">
              <Card className="bg-[#161a20] border-white/5 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl uppercase tracking-tighter italic">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Bell size={20} /></div>
                    Notifications
                  </CardTitle>
                  <CardDescription className="uppercase tracking-widest text-[10px]">Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Email Notifications</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Receive digests and alerts via email</p>
                    </div>
                    <Switch checked={settings.emailAlerts} />
                  </div>
                  
                  <Separator className="bg-white/5" />

                  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer" onClick={() => setSettings({...settings, pushNotifications: !settings.pushNotifications})}>
                    <div className="space-y-1">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-white cursor-pointer">Push Notifications</Label>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">Receive alerts in your browser</p>
                    </div>
                    <Switch checked={settings.pushNotifications} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </div>
        </div>
      </Tabs>
    </div>
  );
}
