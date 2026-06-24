import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { Dashboard } from '@/pages/Dashboard';
import { AdminPanel } from '@/pages/AdminPanel';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { GlobalAIMentor } from '@/components/mentor/GlobalAIMentor';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useSocketStore } from '@/store/socketStore';
import { ArrowLeft } from 'lucide-react';

import { JobsPage } from '@/pages/JobsPage';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { NetworkPage } from '@/pages/NetworkPage';
import { CommunityPage } from '@/pages/CommunityPage';
import OfferAnalyzer from '@/pages/OfferAnalyzer';
import TetrisDemo from '@/pages/TetrisDemo';
import { QuestionBankPage } from '@/pages/QuestionBankPage';
import { MobileNav } from '@/components/navigation/MobileNav';
import { MobileHeader } from '@/components/navigation/MobileHeader';
import TailwindAwesomeDemo from '@/pages/TailwindAwesomeDemo';
import Sidebar from '@/components/navigation/Sidebar';
import { GlobalBreadcrumb } from '@/components/navigation/Breadcrumb';
import { InterviewPage } from '@/pages/InterviewPage';
import ThinkingLoader from '@/components/ui/loading';
import { GridBeam } from '@/components/ui/background-grid-beam';
import { NotesLibrary } from '@/pages/NotesLibrary';
import { NoteDetail } from '@/pages/NoteDetail';
import { NotFound } from '@/components/ui/not-found-2';
import { PdfReaderPage } from '@/pages/PdfReaderPage';
import { InteractivePlayground } from '@/pages/InteractivePlayground';
import { StarStoryBuilder } from '@/pages/StarStoryBuilder';
import { CodingLabHub } from '@/pages/CodingLabHub';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import { RecruiterDashboard } from '@/pages/RecruiterDashboard';
import { BattleArena } from '@/pages/BattleArena';
import { CreateBattle } from '@/pages/CreateBattle';
import { JoinBattle } from '@/pages/JoinBattle';
import { FindMatch } from '@/pages/FindMatch';
import { Tournaments } from '@/pages/Tournaments';
import { BattleHistory } from '@/pages/BattleHistory';
import { ExternalVisualizer } from '@/pages/ExternalVisualizer';
import PlacementAccelerator from '@/pages/PlacementAccelerator';
import { JobApplicationForm } from '@/pages/JobApplicationForm';
import { AdminApplicationsPage } from '@/pages/AdminApplicationsPage';
import { ShadowInterview } from '@/pages/ShadowInterview';
import { GameLobby } from '@/pages/GameLobby';
import { TriviaSprint } from '@/pages/TriviaSprint';
import { RegexInvaders } from '@/pages/RegexInvaders';
import { CodeGolf } from '@/pages/CodeGolf';
import { CyberDefense } from '@/pages/CyberDefense';
import { GithubReconstructor } from '@/pages/GithubReconstructor';
import { ProctorSandbox } from '@/pages/ProctorSandbox';
import { DevopsPipeline } from '@/pages/DevopsPipeline';
import { SystemWhiteboard } from '@/pages/SystemWhiteboard';
import { GridQuest } from '@/pages/GridQuest';
import { VisualPuzzleHost } from '@/pages/VisualPuzzleHost';
import { DailySprint } from '@/pages/DailySprint';
import { PlacementDNA } from '@/pages/PlacementDNA';
import { CareerRoadmap } from '@/pages/CareerRoadmap';
import { InterviewReplayTheater } from '@/pages/InterviewReplayTheater';
import { CompanyPrepTrack } from '@/pages/CompanyPrepTrack';
import { LiveCodingRoom } from '@/pages/LiveCodingRoom';



const PageTransition = ({ children, pageKey }: { children: React.ReactNode, pageKey: string }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      key={pageKey}
      initial={isMobile ? { x: '100%', opacity: 0.9 } : { opacity: 0, y: 20 }}
      animate={isMobile ? { x: 0, opacity: 1 } : { opacity: 1, y: 0 }}
      exit={isMobile ? { x: '-20%', opacity: 0.6 } : { opacity: 0, y: -20 }}
      transition={{ 
        duration: isMobile ? 0.35 : 0.4, 
        ease: isMobile ? [0.32, 0.94, 0.6, 1] : [0.22, 1, 0.36, 1] 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'recruiter-dashboard' | 'admin' | 'onboarding' | 'jobs' | 'companies' | 'applications' | 'network' | 'community' | 'placement-accelerator' | 'tetris-demo' | 'resume' | 'settings' | 'assessment' | 'ai-interview' | 'tailwind-awesome' | 'notes' | 'note-detail' | 'question-bank' | 'reader' | 'playground' | 'coding-lab' | 'star-builder' | 'profile' | 'leaderboard' | 'battle' | 'create-battle' | 'join-battle' | 'find-match' | 'tournaments' | 'battle-history' | 'external-visualizer' | 'offer-analyzer' | 'job-apply' | 'admin-applications' | 'shadow-interview' | 'game-lobby' | 'trivia-sprint' | 'regex-invaders' | 'code-golf' | 'cyber-defense' | 'github-reconstructor' | 'proctor-sandbox' | 'devops-pipeline' | 'system-whiteboard' | 'grid-quest' | 'visual-puzzles' | 'daily-sprint' | 'placement-dna' | 'career-roadmap' | 'replay-theater' | 'company-track' | 'coding-room' | '404';

// Get initial page from URL path or default to 'landing'
const getPageFromPath = (): Page => {
  let path = window.location.pathname;
  if (!path || path === '/') return 'landing';
  
  // Remove leading slash
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  
  // Allow parameters or search queries (if any)
  const pageName = path.split('?')[0];
  
  if (pageName.startsWith('profile/')) return 'profile';
  if (pageName.startsWith('battle/invite/')) return 'join-battle';
  
  const validPages: Page[] = ['landing', 'login', 'signup', 'dashboard', 'recruiter-dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'community', 'placement-accelerator', 'tetris-demo', 'resume', 'settings', 'assessment', 'ai-interview', 'tailwind-awesome', 'notes', 'note-detail', 'question-bank', 'reader', 'playground', 'coding-lab', 'star-builder', 'profile', 'leaderboard', 'battle', 'create-battle', 'join-battle', 'find-match', 'tournaments', 'battle-history', 'external-visualizer', 'offer-analyzer', 'job-apply', 'admin-applications', 'shadow-interview', 'game-lobby', 'trivia-sprint', 'regex-invaders', 'code-golf', 'cyber-defense', 'github-reconstructor', 'proctor-sandbox', 'devops-pipeline', 'system-whiteboard', 'grid-quest', 'visual-puzzles', 'daily-sprint', 'placement-dna', 'career-roadmap', 'replay-theater', 'company-track', 'coding-room'];
  return validPages.includes(pageName as Page) ? (pageName as Page) : '404';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath());
  const [isInitialized, setIsInitialized] = useState(false);
  const [authValidated, setAuthValidated] = useState(false);
  const initRef = useRef(false);
  const { isAuthenticated, user, fetchUser } = useAuthStore();
  const { isGlobalLoading, globalLoadingText, setGlobalLoading, loadResumeAnalysisFromBackend, darkMode } = useAppStore();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      connect(user);
    } else if (!isAuthenticated) {
      disconnect();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle social login token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('prepzo-token', token);
      // Clean up the URL (remove token from query)
      window.history.replaceState({}, document.title, window.location.pathname);
      
      const reinitAuth = async () => {
        try {
          setGlobalLoading(true, 'Authenticating with Google...');
          const validatedUser = await fetchUser();
          if (validatedUser) {
            toast.success(`Welcome back, ${validatedUser.fullName.split(' ')[0]}!`);
            setAuthValidated(true);
            
            // Navigate based on state
            const targetDashboard = (validatedUser.role === 'admin' || validatedUser.role === 'superadmin')
              ? 'admin'
              : (validatedUser.role === 'recruiter' ? 'recruiter-dashboard' : 'dashboard');
            handleNavigate(targetDashboard);
          }
        } catch (error) {
          toast.error('Google login failed. Please try again.');
        } finally {
          setGlobalLoading(false);
        }
      };
      reinitAuth();
    }
  }, []);

  // Handle auth token expiration event from axios interceptor
  useEffect(() => {
    const handleAuthExpired = () => {
      useAuthStore.getState().logout();
      handleNavigate('landing');
      toast.error('Session expired. Please log in again.');
      setAuthValidated(false);
    };
    window.addEventListener('auth-token-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-token-expired', handleAuthExpired);
  }, [currentPage]);

  // Fetch user data on app initialization (with guard against React Strict Mode double-call)
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    
    const initializeAuth = async () => {
      const protectedPages = ['dashboard', 'recruiter-dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'community', 'placement-accelerator', 'resume', 'settings', 'assessment', 'ai-interview', 'notes', 'note-detail', 'question-bank', 'reader', 'playground', 'coding-lab', 'star-builder', 'profile', 'leaderboard', 'battle', 'create-battle', 'join-battle', 'find-match', 'tournaments', 'battle-history', 'offer-analyzer', 'job-apply', 'admin-applications', 'shadow-interview', 'game-lobby', 'trivia-sprint', 'regex-invaders', 'code-golf', 'cyber-defense', 'github-reconstructor', 'proctor-sandbox', 'devops-pipeline', 'system-whiteboard', 'grid-quest', 'visual-puzzles', 'daily-sprint', 'placement-dna', 'career-roadmap', 'replay-theater', 'company-track', 'coding-room'];
      const isOnProtectedPage = protectedPages.includes(currentPage);
      
      const publicAuthPages = ['landing', 'login', 'signup'];
      const isOnPublicAuthPage = publicAuthPages.includes(currentPage);
      
      const hasToken = !!localStorage.getItem('prepzo-token');
      
      if (hasToken) {
        try {
          // Validate session and fetch latest user info
          const validatedUser = await fetchUser();
          if (validatedUser) {
            setAuthValidated(true);
            // Redirect authenticated users trying to access login/signup/landing to dashboard
            if (isOnPublicAuthPage) {
              const targetDashboard = validatedUser.role === 'recruiter' ? 'recruiter-dashboard' : 'dashboard';
              setCurrentPage(targetDashboard);
              window.history.replaceState({}, '', `/${targetDashboard}`);
            }
          } else {
            setAuthValidated(false);
            if (isOnProtectedPage) {
              setCurrentPage('landing');
              window.history.replaceState({}, '', '/landing');
            }
          }
        } catch {
          // On network error, trust persisted auth state but set validated based on persisted state
          setAuthValidated(isAuthenticated && hasToken);
        }
      } else {
        // No token physically present, so clean up state if needed
        if (isAuthenticated) {
          useAuthStore.getState().logout();
        }
        if (isOnProtectedPage) {
          setCurrentPage('landing');
          window.history.replaceState({}, '', '/landing');
        }
        setAuthValidated(false);
      }
      setIsInitialized(true);
    };
    initializeAuth();
  }, []);

  // Load user-specific resume analysis when authenticated AND validated
  useEffect(() => {
    if (isInitialized && authValidated && isAuthenticated && user) {
      loadResumeAnalysisFromBackend();
    }
  }, [isInitialized, authValidated, isAuthenticated, user]);

  // Track previous auth state to detect new logins (not persisted/initial state)
  const prevAuthRef = useRef<{ isAuthenticated: boolean; user: typeof user; initialized: boolean }>({ 
    isAuthenticated, 
    user,
    initialized: false 
  });
  
  // Update authValidated when user logs in (detect transition from false to true)
  useEffect(() => {
    // Only handle auth state changes after initialization
    if (!isInitialized) return;
    
    // Skip the first run after initialization - this is likely persisted state
    if (!prevAuthRef.current.initialized) {
      prevAuthRef.current = { isAuthenticated, user, initialized: true };
      return;
    }
    
    const wasAuthenticated = prevAuthRef.current.isAuthenticated;
    
    // User just logged in (transition from not-authenticated to authenticated)
    if (!wasAuthenticated && isAuthenticated && user) {
      setAuthValidated(true);
    }
    
    // User logged out
    if (wasAuthenticated && !isAuthenticated) {
      setAuthValidated(false);
    }
    
    // Update ref for next comparison
    prevAuthRef.current = { isAuthenticated, user, initialized: true };
  }, [isInitialized, isAuthenticated, user]);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const newPage = getPageFromPath();
      if (newPage !== currentPage) {
        setGlobalLoading(true, `Routing to ${newPage.replace('-', ' ')}...`);
        
        // Fix: Sync dashboard tab state when navigating via browser back/forward or manual hash change
        if (['dashboard', 'resume', 'settings', 'assessment'].includes(newPage)) {
          const { setDashboardTab } = useAppStore.getState();
          if (newPage === 'resume') setDashboardTab('resume');
          else if (newPage === 'settings') setDashboardTab('settings');
          else if (newPage === 'assessment') setDashboardTab('assessment');
          else if (newPage === 'dashboard') setDashboardTab('home');
        }

        setTimeout(() => {
          setCurrentPage(newPage);
          // Safety timeout to hide loader if the new page doesn't signal readiness
          setTimeout(() => setGlobalLoading(false), 2000);
        }, 400);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, setGlobalLoading]);

  // Redirect based on auth state and role permissions after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    if (!isAuthenticated) {
      // If not authenticated and on protected page, redirect to landing
      const protectedPages = [
        'dashboard', 'recruiter-dashboard', 'admin', 'onboarding', 'jobs', 
        'companies', 'applications', 'network', 'community', 'placement-accelerator', 
        'resume', 'settings', 'assessment', 'ai-interview', 'notes', 'note-detail', 
        'question-bank', 'reader', 'playground', 'coding-lab', 'star-builder', 
        'profile', 'leaderboard', 'battle', 'create-battle', 'join-battle', 
        'find-match', 'tournaments', 'battle-history', 'offer-analyzer', 
        'job-apply', 'admin-applications', 'shadow-interview', 'external-visualizer',
        'game-lobby', 'trivia-sprint', 'regex-invaders', 'code-golf', 'cyber-defense', 'github-reconstructor', 'proctor-sandbox', 'devops-pipeline', 'system-whiteboard', 'grid-quest', 'visual-puzzles'
      ];
      if (protectedPages.includes(currentPage)) {
        handleNavigate('landing');
      }
    } else {
      // Enforce role-based page protections
      const adminPages = ['admin', 'admin-applications'];
      const recruiterPages = ['recruiter-dashboard'];
      const studentPages = [
        'dashboard', 'onboarding', 'assessment', 'resume', 'placement-accelerator', 
        'offer-analyzer', 'ai-interview', 'playground', 'star-builder', 
        'coding-lab', 'jobs', 'companies', 'applications', 'network', 
        'community', 'notes', 'note-detail', 'question-bank', 'reader', 
        'battle', 'create-battle', 'join-battle', 'find-match', 'tournaments', 
        'battle-history', 'job-apply', 'shadow-interview', 'game-lobby', 
        'trivia-sprint', 'regex-invaders', 'code-golf', 'cyber-defense', 'github-reconstructor', 'proctor-sandbox', 'devops-pipeline', 'system-whiteboard', 'grid-quest', 'visual-puzzles'
      ];

      const userRole = user?.role || 'student';

      if (adminPages.includes(currentPage) && userRole !== 'admin' && userRole !== 'superadmin') {
        const home = userRole === 'recruiter' ? 'recruiter-dashboard' : 'dashboard';
        handleNavigate(home);
        toast.error('Access denied: Admin permissions required.');
      } else if (recruiterPages.includes(currentPage) && userRole !== 'recruiter') {
        const home = (userRole === 'admin' || userRole === 'superadmin') ? 'admin' : 'dashboard';
        handleNavigate(home);
        toast.error('Access denied: Recruiter access only.');
      } else if (studentPages.includes(currentPage) && userRole === 'recruiter') {
        handleNavigate('recruiter-dashboard');
        toast.error('Access denied: Student access only.');
      } else if (['login', 'signup'].includes(currentPage)) {
        const home = (userRole === 'admin' || userRole === 'superadmin') 
          ? 'admin' 
          : userRole === 'recruiter' 
            ? 'recruiter-dashboard' 
            : 'dashboard';
        handleNavigate(home);
      }
    }
  }, [isInitialized, isAuthenticated, currentPage, user]);

  const handleNavigate = (page: string) => {
    const newPage = page as Page;
    if (newPage === currentPage) return;

    const labels: Record<string, string> = {
      dashboard: 'Syncing Workspace Node',
      jobs: 'Scanning Opportunity Grid',
      companies: 'Analyzing Market Pulse',
      applications: 'Tracking Signal Streams',
      network: 'Connecting Neural Links',
      'placement-accelerator': 'Engaging Placement Protocol',
      assessment: 'Evaluating Skill Vectors',
      'ai-interview': 'Initializing AI Interrogator',
      landing: 'Returning to Base',
      'game-lobby': 'Entering Placement Playground',
      'code-golf': 'Loading Code-Golf Arena',
      'cyber-defense': 'Accessing Cyber-Defense Sandbox',
      'devops-pipeline': 'Configuring DevOps Sandbox',
      'system-whiteboard': 'Connecting Whiteboard Coordinates',
      'grid-quest': 'Loading Grid Alignment Cells',
      'visual-puzzles': 'Configuring Visual Simulation Cells',
    };

    setGlobalLoading(true, labels[newPage] || `Transmitting to ${newPage}...`);
    
    // Artificial delay to show premium loader and ensure smooth transition
    setTimeout(() => {
      // Navigation logic
      if (['dashboard', 'resume', 'settings', 'assessment'].includes(newPage)) {
        const { setDashboardTab } = useAppStore.getState();
        if (newPage === 'resume') setDashboardTab('resume');
        else if (newPage === 'settings') setDashboardTab('settings');
        else if (newPage === 'assessment') setDashboardTab('assessment');
        else if (newPage === 'dashboard') setDashboardTab('home');
      }

      setCurrentPage(newPage);
      if (window.location.pathname !== `/${newPage}`) {
        window.history.pushState({}, '', `/${newPage}`);
      }
      
      // We don't hide the loader here; we let the target page signal readiness
      // But we add a safety timeout just in case
      setTimeout(() => {
        setGlobalLoading(false);
      }, 3000); 
    }, 500);
  };

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0c10] relative overflow-hidden">
        <GridBeam className="absolute inset-0" />
        <ThinkingLoader 
          loadingText="Synchronizing Environment" 
        />
      </div>
    );
  }

  // Map current page to sidebar active ID
  const getSidebarActiveId = (page: Page) => {
    if (page === 'dashboard') return 'home';
    if (['jobs', 'companies', 'applications', 'network'].includes(page)) return 'opportunities';
    return page;
  };

  const isFieldComplete = user?.isFieldTestComplete;
  const isSkillComplete = user?.isSkillTestComplete;
  const isFullyQualified = isFieldComplete && isSkillComplete;

  const isWorkspacePage = ['dashboard', 'jobs', 'companies', 'applications', 'network', 'community', 'placement-accelerator', 'offer-analyzer', 'resume', 'settings', 'assessment', 'ai-interview', 'notes', 'note-detail', 'question-bank', 'admin-applications', 'game-lobby', 'trivia-sprint', 'regex-invaders', 'code-golf', 'cyber-defense', 'github-reconstructor', 'proctor-sandbox', 'devops-pipeline', 'system-whiteboard', 'grid-quest', 'visual-puzzles', 'daily-sprint', 'placement-dna', 'career-roadmap', 'replay-theater', 'company-track', 'coding-room'].includes(currentPage);

  return (
    <div className="page-shell overflow-x-hidden">
      <Toaster position="top-right">
        {(t) => (
          <div
            className={`
              ${t.visible ? 'animate-enter opacity-100 translate-y-0 scale-100' : 'animate-leave opacity-0 -translate-y-4 scale-95'}
              flex items-center justify-between max-w-sm w-full shadow-2xl bg-[#0a0c10] border border-white/10 min-h-[48px] rounded-lg pointer-events-auto transition-all duration-300 overflow-hidden relative group
            `}
          >
            {/* left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${t.type === 'error' ? 'bg-red-500' : t.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />

            {/* icon + text */}
            <div className="flex flex-1 items-center px-4 py-3 pl-6">
              {t.type === 'success' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500 shrink-0">
                  <path d="M11.95 16.5h.1" style={{ fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.95 }} />
                  <path d="M3 12a9 9 0 0 1 9-9h0a9 9 0 0 1 9 9h0a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9m9 0V7" style={{ fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }} />
                </svg>
              ) : t.type === 'error' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 shrink-0">
                   <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 shrink-0">
                   <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              )}
              <p className="text-[13px] font-medium text-white/90 ml-3 tracking-wide break-words">
                {resolveValue(t.message, t)}
              </p>
            </div>

            {/* close button */}
            <button
              onClick={() => toast.dismiss(t.id)}
              type="button"
              aria-label="close"
              className="active:scale-90 transition-all p-3 text-white/40 hover:text-white shrink-0 outline-none"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </Toaster>

      {/* Page Content - always rendered */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && <PageTransition pageKey="landing"><LandingPage onNavigate={handleNavigate} /></PageTransition>}
          {currentPage === 'login' && <PageTransition pageKey="login"><AuthPage mode="login" onNavigate={handleNavigate} /></PageTransition>}
          {currentPage === 'signup' && <PageTransition pageKey="signup"><AuthPage mode="signup" onNavigate={handleNavigate} /></PageTransition>}
          
          {currentPage === 'job-apply' && (
            <PageTransition pageKey="job-apply">
              <JobApplicationForm 
                jobId={new URLSearchParams(window.location.search).get('jobId') || ''} 
                onClose={() => handleNavigate('jobs')} 
              />
            </PageTransition>
          )}
          {/* Workspace Pages wrapped in MainLayout */}
          {isWorkspacePage && (
            <PageTransition pageKey="workspace">
              <div className="flex h-[100dvh] overflow-hidden bg-[#0a0c10] relative">
                {currentPage === 'dashboard' && (
                  <Sidebar 
                    active={getSidebarActiveId(currentPage)} 
                    onNavigate={(id) => handleNavigate(id === 'opportunities' ? 'jobs' : id === 'home' ? 'dashboard' : id)}
                    lockedItems={!isFullyQualified ? ['home', 'resume', 'opportunities', 'settings'] : []}
                  />
                )}
                <main className="flex-1 h-full overflow-y-auto overflow-x-hidden custom-scrollbar pb-32 md:pb-0 pt-16 md:pt-0">
                  <MobileHeader 
                    user={user || undefined}
                    onLogout={() => {
                      useAuthStore.getState().logout();
                      handleNavigate('landing');
                    }}
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                  />
                  {['jobs', 'companies', 'applications', 'network', 'notes', 'note-detail', 'question-bank', 'offer-analyzer', 'placement-accelerator', 'profile', 'leaderboard'].includes(currentPage) && (
                    <div className="px-6 pt-4 md:px-8 flex items-center justify-between border-b border-white/5 pb-3">
                      <button
                        onClick={() => handleNavigate('dashboard')}
                        className="flex items-center gap-2 text-white/50 hover:text-white py-1.5 px-3.5 bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all hover:bg-white/10"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Dashboard</span>
                      </button>
                    </div>
                  )}
                  <div className="hidden md:block">
                    <GlobalBreadcrumb />
                  </div>
                  {(currentPage === 'dashboard' || currentPage === 'resume' || currentPage === 'settings' || currentPage === 'assessment') && <Dashboard />}
                  {currentPage === 'jobs' && <JobsPage />}
                  {currentPage === 'companies' && <CompaniesPage />}
                  {currentPage === 'applications' && <ApplicationsPage />}
                  {currentPage === 'network' && <NetworkPage />}
                  {currentPage === 'community' && <CommunityPage />}
                  {currentPage === 'placement-accelerator' && <PlacementAccelerator />}
                  {currentPage === 'ai-interview' && <InterviewPage />}
                  {currentPage === 'notes' && <NotesLibrary />}
                   {currentPage === 'note-detail' && <NoteDetail />}
                  {currentPage === 'question-bank' && <QuestionBankPage />}
                  {currentPage === 'offer-analyzer' && <OfferAnalyzer />}
                  {currentPage === 'admin-applications' && <AdminApplicationsPage />}
                  {currentPage === 'game-lobby' && <GameLobby />}
                  {currentPage === 'trivia-sprint' && <TriviaSprint />}
                  {currentPage === 'regex-invaders' && <RegexInvaders />}
                  {currentPage === 'code-golf' && <CodeGolf />}
                  {currentPage === 'cyber-defense' && <CyberDefense />}
                  {currentPage === 'github-reconstructor' && <GithubReconstructor />}
                  {currentPage === 'proctor-sandbox' && <ProctorSandbox />}
                  {currentPage === 'devops-pipeline' && <DevopsPipeline />}
                  {currentPage === 'system-whiteboard' && <SystemWhiteboard />}
                  {currentPage === 'grid-quest' && <GridQuest />}
                  {currentPage === 'visual-puzzles' && <VisualPuzzleHost />}
                  {currentPage === 'daily-sprint' && <DailySprint />}
                  {currentPage === 'placement-dna' && <PlacementDNA />}
                  {currentPage === 'career-roadmap' && <CareerRoadmap />}
                  {currentPage === 'replay-theater' && <InterviewReplayTheater />}
                  {currentPage === 'company-track' && <CompanyPrepTrack />}
                  {currentPage === 'coding-room' && <LiveCodingRoom />}
                </main>
                {currentPage === 'dashboard' && (
                  <MobileNav
                    active={getSidebarActiveId(currentPage)}
                    onNavigate={(id) => handleNavigate(id === 'opportunities' ? 'jobs' : id === 'home' ? 'dashboard' : id)}
                    lockedItems={!isFullyQualified ? ['home', 'resume', 'opportunities', 'settings'] : []}
                  />
                )}
              </div>
            </PageTransition>
          )}

          {currentPage === 'recruiter-dashboard' && <PageTransition pageKey="recruiter"><RecruiterDashboard /></PageTransition>}
          {currentPage === 'admin' && <PageTransition pageKey="admin"><AdminPanel onNavigate={handleNavigate} /></PageTransition>}
          {currentPage === 'onboarding' && <PageTransition pageKey="onboarding"><OnboardingPage onNavigate={handleNavigate} /></PageTransition>}
          {currentPage === 'tetris-demo' && <PageTransition pageKey="tetris"><TetrisDemo /></PageTransition>}
          {currentPage === 'tailwind-awesome' && <PageTransition pageKey="tailwind"><TailwindAwesomeDemo /></PageTransition>}
          {currentPage === 'coding-lab' && <PageTransition pageKey="coding-lab"><CodingLabHub /></PageTransition>}
          {currentPage === 'playground' && <PageTransition pageKey="playground"><InteractivePlayground /></PageTransition>}
          {currentPage === 'profile' && <PageTransition pageKey="profile"><Profile /></PageTransition>}
          {currentPage === 'leaderboard' && <PageTransition pageKey="leaderboard"><Leaderboard /></PageTransition>}
          {currentPage === 'star-builder' && <PageTransition pageKey="star"><StarStoryBuilder /></PageTransition>}
          {currentPage === 'reader' && <PageTransition pageKey="reader"><PdfReaderPage /></PageTransition>}
          {currentPage === 'create-battle' && <PageTransition pageKey="create-battle"><CreateBattle /></PageTransition>}
          {currentPage === 'join-battle' && <PageTransition pageKey="join-battle"><JoinBattle /></PageTransition>}
          {currentPage === 'find-match' && <PageTransition pageKey="find-match"><FindMatch /></PageTransition>}
          {currentPage === 'battle' && <PageTransition pageKey="battle"><BattleArena /></PageTransition>}
          {currentPage === 'tournaments' && <PageTransition pageKey="tournaments"><Tournaments /></PageTransition>}
          {currentPage === 'battle-history' && <PageTransition pageKey="battle-history"><BattleHistory /></PageTransition>}
          {currentPage === 'external-visualizer' && <PageTransition pageKey="external-visualizer"><ExternalVisualizer /></PageTransition>}
          {currentPage === 'shadow-interview' && <PageTransition pageKey="shadow-interview"><ShadowInterview /></PageTransition>}
          {currentPage === '404' && <PageTransition pageKey="404"><NotFound onNavigate={handleNavigate} /></PageTransition>}
        </AnimatePresence>
      </div>

      {/* Global Loading Overlay - rendered ON TOP of content, never blocks mounting */}
      <AnimatePresence>
        {isGlobalLoading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0c10]/98 backdrop-blur-2xl"
          >
            {/* Animated grid background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <GridBeam className="absolute inset-0" />
            </div>
              {/* Radial glow behind loader */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px]" />
            
            <ThinkingLoader loadingText={globalLoadingText} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Prepzo AI Mentor - Available on all authenticated pages (ChatGPT-style) */}
      {authValidated && isAuthenticated && ['dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'admin-applications'].includes(currentPage) && (
        <GlobalAIMentor />
      )}
    </div>
  );
}
