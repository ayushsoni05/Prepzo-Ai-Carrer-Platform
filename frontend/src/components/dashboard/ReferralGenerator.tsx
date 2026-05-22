import { useState } from 'react';
import { Send, Copy, Check, Sparkles, Briefcase, Building2, UserCheck, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { showSuccess, showInfo } from '@/utils/toastManager';

export function ReferralGenerator() {
  const { user } = useAuthStore();
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState(user?.targetRole || '');
  const [contactType, setContactType] = useState<'recruiter' | 'engineer' | 'alumni'>('recruiter');
  const [tone, setTone] = useState<'confident' | 'humble' | 'direct' | 'creative'>('confident');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePitchText = () => {
    const userName = user?.fullName || 'there';
    const userCollege = user?.collegeName || 'Chitkara University';
    const userSkills = user?.knownTechnologies?.slice(0, 4).join(', ') || 'React, Node.js, and Python';
    const targetCompany = company.trim() || 'your company';
    const targetPosition = position.trim() || 'Software Engineering roles';

    const greeting = contactType === 'recruiter' 
      ? `Dear Hiring Team at ${targetCompany},`
      : contactType === 'alumni'
      ? `Hi [Name], I noticed we both graduated from ${userCollege}!`
      : `Hi [Name], hope you are doing well!`;

    let body = '';
    
    if (contactType === 'recruiter') {
      switch (tone) {
        case 'confident':
          body = `I'm reaching out because I'm highly interested in the ${targetPosition} role at ${targetCompany}. As a graduate of ${userCollege} skilled in ${userSkills}, I have built multiple production-ready systems and excelled in algorithmic assessments. I'm confident my background aligns perfectly with your team's current engineering goals.`;
          break;
        case 'humble':
          body = `I recently came across the ${targetPosition} opening at ${targetCompany} and wanted to reach out. I'm a graduate of ${userCollege} with hands-on experience in ${userSkills}. I have been practicing extensively on key development workflows and would love to learn if my background could be a fit for your engineering team.`;
          break;
        case 'direct':
          body = `I'm interested in the ${targetPosition} role at ${targetCompany}. I recently graduated from ${userCollege} with core expertise in ${userSkills}. Given my background in technical problem solving, I'd appreciate the opportunity to discuss how I can contribute to your engineering team.`;
          break;
        case 'creative':
          body = `I've been tracking ${targetCompany}'s latest technical developments and am inspired by the products you build. I'm a developer from ${userCollege} specializing in ${userSkills}, and I'd love to bring my unique blend of software engineering skills to the ${targetPosition} position on your team.`;
          break;
      }
    } else if (contactType === 'alumni') {
      switch (tone) {
        case 'confident':
          body = `I see you're working as an engineer at ${targetCompany}. As a fellow graduate of ${userCollege} specializing in ${userSkills}, I've been preparing for the ${targetPosition} role and would love to connect. I am eager to learn about your path from campus to corporate and see if you would be open to referring me for this position.`;
          break;
        case 'humble':
          body = `I am a fellow alumnus from ${userCollege} and noticed your profile. I am looking to break into ${targetCompany} as a ${targetPosition}. With my background in ${userSkills}, I'd be incredibly grateful to get a few minutes of your time to hear about your experience and potentially get your guidance or a referral.`;
          break;
        case 'direct':
          body = `I see you also graduated from ${userCollege} and are now at ${targetCompany}. I'm applying for the ${targetPosition} role and would appreciate your guidance on the application process. If you feel my profile is solid, I would be very grateful for a referral.`;
          break;
        case 'creative':
          body = `Greeting from a fellow ${userCollege} alumnus! I love what you are building at ${targetCompany}. I'm currently expanding my skill set in ${userSkills} and applying for the ${targetPosition} role. I'd love to chat briefly about your journey and how to make my application stand out.`;
          break;
      }
    } else { // engineer
      switch (tone) {
        case 'confident':
          body = `I'm reaching out because I'm applying for the ${targetPosition} role at ${targetCompany} and admire the engineering culture you've built. I'm a developer skilled in ${userSkills} and believe my technical foundation would add immediate value to your current workflows.`;
          break;
        case 'humble':
          body = `I noticed your work on the engineering team at ${targetCompany}. I'm a developer with experience in ${userSkills} and am very interested in the ${targetPosition} role. I'd appreciate any insights you could share about the technical challenges your team is currently solving.`;
          break;
        case 'direct':
          body = `I'm a software developer with experience in ${userSkills}. I noticed the open ${targetPosition} position on your team at ${targetCompany} and would love to ask you a couple of quick questions about the technical stack and team dynamics.`;
          break;
        case 'creative':
          body = `I love how ${targetCompany} approaches engineering at scale. As a developer specializing in ${userSkills}, I've built projects that solve similar challenges. I would love to connect to discuss technical engineering and learn more about the ${targetPosition} role.`;
          break;
      }
    }

    const signoff = `Best regards,\n${userName}\nPortfolio/Resume: [Link]`;

    return `${greeting}\n\n${body}\n\n${signoff}`;
  };

  const handleGenerate = () => {
    if (!company.trim()) {
      showInfo('Please enter a target company name.');
      return;
    }

    setIsGenerating(true);
    setCopied(false);
    
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPitch(generatePitchText());
      showSuccess('AI Outreach pitch generated successfully!');
    }, 1000);
  };

  const handleCopy = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    showSuccess('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[40px] p-8 bg-black/40 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-[#5ed29c]/20 transition-all duration-500 font-rubik flex flex-col justify-between">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-6">
          <Send size={18} className="text-[#5ed29c]" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">Networking Outreach</p>
            <h4 className="text-xl font-[900] text-white uppercase italic tracking-tighter">
              AI Referral <span className="text-[#5ed29c]">Pitch Generator.</span>
            </h4>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left Panel */}
          <div className="lg:col-span-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                  Target Company
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-white/30">
                    <Building2 size={14} />
                  </span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe"
                    className="w-full h-[40px] bg-white/[0.02] border border-white/5 focus:border-[#5ed29c]/50 rounded-xl pl-9 pr-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                  Position
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-white/30">
                    <Briefcase size={14} />
                  </span>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full h-[40px] bg-white/[0.02] border border-white/5 focus:border-[#5ed29c]/50 rounded-xl pl-9 pr-4 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Select Contact Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                Contact Person Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'recruiter', label: 'HR / Recruiter' },
                  { id: 'engineer', label: 'Tech Lead / Engineer' },
                  { id: 'alumni', label: 'College Alumni' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContactType(type.id as any)}
                    className={`h-[36px] rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                      contactType === type.id
                        ? 'bg-[#5ed29c]/10 border-[#5ed29c]/30 text-[#5ed29c]'
                        : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Tone */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                Outreach Tone
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'confident', label: 'Bold' },
                  { id: 'humble', label: 'Humble' },
                  { id: 'direct', label: 'Direct' },
                  { id: 'creative', label: 'Creative' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id as any)}
                    className={`h-[36px] rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                      tone === t.id
                        ? 'bg-[#5ed29c]/10 border-[#5ed29c]/30 text-[#5ed29c]'
                        : 'bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-[45px] bg-[#5ed29c] hover:bg-[#5ed29c]/90 disabled:bg-[#5ed29c]/50 text-black active:scale-98 rounded-2xl transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(94,210,156,0.2)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Synthesizing pitch...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Generate Referral Pitch
                </>
              )}
            </button>
          </div>

          {/* Generated Output Display: Right Panel */}
          <div className="lg:col-span-6 flex flex-col h-full min-h-[220px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                Generated Outreach Script
              </span>
              {generatedPitch && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#5ed29c] hover:opacity-80 transition-opacity"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied' : 'Copy Pitch'}
                </button>
              )}
            </div>

            <div className="relative flex-1 w-full min-h-[180px] bg-white/[0.01] border border-white/5 rounded-2xl p-5 overflow-hidden flex flex-col justify-between">
              {generatedPitch ? (
                <pre className="text-xs text-white/80 whitespace-pre-wrap font-mono leading-relaxed h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                  {generatedPitch}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full py-8 text-white/20">
                  <UserCheck size={28} className="mb-2 opacity-50" />
                  <p className="text-[10px] font-black uppercase tracking-widest italic">Outreach Generator Standby</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider max-w-[250px] mt-1">Select company and parameters to render your networking pitch.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
