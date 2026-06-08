import { navigateTo } from '@/utils/navigation';
import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export const GlobalBreadcrumb = () => {
  const [pathSegments, setPathSegments] = useState<{label: string, path: string}[]>([]);

  useEffect(() => {
    const handlePathChange = () => {
      let path = window.location.pathname.slice(1);
      if (path.startsWith('/')) path = path.slice(1);
      const basePath = path.split('?')[0];

      if (!basePath || basePath === 'landing' || basePath === 'login' || basePath === 'signup') {
        setPathSegments([]);
        return;
      }

      const segments: {label: string, path: string}[] = [];
      const role = useAuthStore.getState().user?.role;
      const homePath = role === 'recruiter' ? 'recruiter-dashboard' : 'dashboard';
      const homeLabel = role === 'recruiter' ? 'Recruiter Dashboard' : 'Dashboard';

      // Always start with Home/Dashboard
      segments.push({ label: homeLabel, path: homePath });
      
      if (basePath !== homePath) {
        if (['jobs', 'companies', 'applications', 'network'].includes(basePath)) {
          segments.push({ label: 'Opportunities', path: 'jobs' });
        }
        
        if (basePath === 'jobs') segments.push({ label: 'Jobs', path: 'jobs' });
        else if (basePath === 'companies') segments.push({ label: 'Companies', path: 'companies' });
        else if (basePath === 'applications') segments.push({ label: 'Applications', path: 'applications' });
        else if (basePath === 'network') segments.push({ label: 'Network', path: 'network' });
        else if (basePath === 'resume') segments.push({ label: 'Resume', path: 'resume' });
        else if (basePath === 'settings') segments.push({ label: 'Settings', path: 'settings' });
        else if (basePath === 'assessment') segments.push({ label: 'Assessment', path: 'assessment' });
        else if (basePath === 'ai-interview') segments.push({ label: 'Interviews', path: 'ai-interview' });
        else if (basePath === 'question-bank') segments.push({ label: 'Library', path: 'question-bank' });
        else if (basePath === 'notes') segments.push({ label: 'Notes', path: 'notes' });
        else if (basePath === 'note-detail') segments.push({ label: 'Notes', path: 'notes' }, { label: 'Detail', path: basePath });
        else if (basePath.startsWith('portfolio')) segments.push({ label: 'Portfolio', path: basePath });
        else if (basePath === 'coding-lab') segments.push({ label: 'Coding Lab', path: 'coding-lab' });
        else if (basePath === 'battle') segments.push({ label: 'Battle Arena', path: 'battle' });
        else if (basePath === 'leaderboard') segments.push({ label: 'Leaderboard', path: 'leaderboard' });
        else if (basePath === 'offer-analyzer') segments.push({ label: 'Offer Analyzer', path: 'offer-analyzer' });
        else {
          const label = basePath.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          segments.push({ label, path: basePath });
        }
      }
      setPathSegments(segments);
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);
    // Still listen to hashchange just in case some old links use hash
    window.addEventListener('hashchange', handlePathChange);
    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('hashchange', handlePathChange);
    };
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
              onClick={() => navigateTo(seg.path)}
              className={`flex items-center gap-2 hover:opacity-100 transition-opacity tracking-wide ${isLast ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}
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
