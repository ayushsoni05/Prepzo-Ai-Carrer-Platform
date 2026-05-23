import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export const GlobalBreadcrumb = () => {
  const [pathSegments, setPathSegments] = useState<{label: string, hash: string}[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.slice(1);
      if (hash.startsWith('/')) hash = hash.slice(1);
      const basePath = hash.split('?')[0];

      if (!basePath || basePath === 'landing' || basePath === 'login' || basePath === 'signup') {
        setPathSegments([]);
        return;
      }

      const segments: {label: string, hash: string}[] = [];
      const role = useAuthStore.getState().user?.role;
      const homeHash = role === 'recruiter' ? 'recruiter-dashboard' : 'dashboard';
      const homeLabel = 'Home';

      // Always start with Home
      segments.push({ label: homeLabel, hash: homeHash });
      
      if (basePath !== homeHash) {
        if (['jobs', 'companies', 'applications', 'network'].includes(basePath)) {
          segments.push({ label: 'Opportunities', hash: 'jobs' });
        }
        
        if (basePath === 'jobs') segments.push({ label: 'Jobs', hash: 'jobs' });
        else if (basePath === 'companies') segments.push({ label: 'Companies', hash: 'companies' });
        else if (basePath === 'applications') segments.push({ label: 'Applications', hash: 'applications' });
        else if (basePath === 'network') segments.push({ label: 'Network', hash: 'network' });
        else if (basePath === 'resume') segments.push({ label: 'Resume', hash: 'resume' });
        else if (basePath === 'settings') segments.push({ label: 'Settings', hash: 'settings' });
        else if (basePath === 'assessment') segments.push({ label: 'Assessment', hash: 'assessment' });
        else if (basePath === 'ai-interview') segments.push({ label: 'Interviews', hash: 'ai-interview' });
        else if (basePath === 'question-bank') segments.push({ label: 'Library', hash: 'question-bank' });
        else if (basePath === 'notes') segments.push({ label: 'Notes', hash: 'notes' });
        else if (basePath === 'note-detail') segments.push({ label: 'Notes', hash: 'notes' }, { label: 'Detail', hash });
        else if (basePath.startsWith('portfolio')) segments.push({ label: 'Portfolio', hash: basePath });
        else if (basePath === 'coding-lab') segments.push({ label: 'Coding Lab', hash: 'coding-lab' });
        else if (basePath === 'battle') segments.push({ label: 'Battle Arena', hash: 'battle' });
        else if (basePath === 'leaderboard') segments.push({ label: 'Leaderboard', hash: 'leaderboard' });
        else {
          const label = basePath.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          segments.push({ label, hash: basePath });
        }
      }
      setPathSegments(segments);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (pathSegments.length === 0) return null;

  return (
    <div className="w-full px-6 md:px-12 pt-8 hidden md:flex items-center gap-3 font-medium text-[14px] z-10 relative">
      {pathSegments.map((seg, idx) => {
        const isLast = idx === pathSegments.length - 1;
        const isFirst = idx === 0;
        return (
          <div key={idx} className="flex items-center gap-3">
            <button 
              onClick={() => window.location.hash = seg.hash}
              className={`flex items-center gap-2 hover:opacity-100 transition-opacity tracking-wide ${isLast ? 'text-white' : 'text-[#8b949e]'}`}
            >
              {isFirst && <Home size={16} strokeWidth={2} className="relative -top-[1px]" />}
              <span>{seg.label}</span>
            </button>
            {!isLast && <span className="text-[#30363d] select-none text-lg leading-none relative -top-[1px]">/</span>}
          </div>
        );
      })}
    </div>
  );
};
