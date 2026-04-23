import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { Dashboard } from '@/pages/Dashboard';
import { AdminPanel } from '@/pages/AdminPanel';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { GlobalAIMentor } from '@/components/mentor/GlobalAIMentor';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';

import { JobsPage } from '@/pages/JobsPage';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { NetworkPage } from '@/pages/NetworkPage';
import TetrisDemo from '@/pages/TetrisDemo';
import { MobileNav } from '@/components/navigation/MobileNav';
import { InterviewPage } from '@/pages/InterviewPage';
import ThinkingLoader from '@/components/ui/loading';
import { Boxes } from '@/components/ui/background-boxes';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'admin' | 'onboarding' | 'jobs' | 'companies' | 'applications' | 'network' | 'tetris-demo' | 'resume' | 'settings' | 'assessment' | 'ai-interview';

// Get initial page from URL hash or default to 'landing'
const getPageFromHash = (): Page => {
  const hash = window.location.hash.slice(1) as Page;
  const validPages: Page[] = ['landing', 'login', 'signup', 'dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'tetris-demo', 'resume', 'settings', 'assessment', 'ai-interview'];
  return validPages.includes(hash) ? hash : 'landing';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authValidated, setAuthValidated] = useState(false);
  const initRef = useRef(false);
  const { isAuthenticated, user, fetchUser } = useAuthStore();
  const { isGlobalLoading, globalLoadingText, setGlobalLoading, loadResumeAnalysisFromBackend, darkMode } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Fetch user data on app initialization (with guard against React Strict Mode double-call)
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    
    const initializeAuth = async () => {
      // Only validate session if user is trying to access a protected page
      const protectedPages = ['dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'resume', 'settings', 'assessment'];
      const isOnProtectedPage = protectedPages.includes(currentPage);
      
      // Safety check: if we think we're authenticated but have no token, sync state
      const hasToken = !!localStorage.getItem('prepzo-token');
      
      if (isOnProtectedPage && isAuthenticated && hasToken) {
        try {
          // Validate session via HTTP-only cookies
          const validatedUser = await fetchUser();
          // If fetchUser returns null, the session is invalid (401 was returned)
          if (!validatedUser) {
            // Don't load resume data - auth failed
            setCurrentPage('landing');
            window.location.hash = 'landing';
            setAuthValidated(false);
          } else {
            // Auth validated successfully
            setAuthValidated(true);
          }
        } catch {
          // On error, trust persisted auth state - don't redirect
          // fetchUser already handles 401 by calling logout()
          setAuthValidated(false);
        }
      } else if ((isOnProtectedPage && !isAuthenticated) || (isAuthenticated && !hasToken)) {
        // Not authenticated and trying to access protected page OR
        // State says authenticated but token is missing physically
        if (isAuthenticated && !hasToken) {
          // Sync state to not-authenticated if token is missing
          useAuthStore.getState().logout();
        }
        
        if (isOnProtectedPage) {
          setCurrentPage('landing');
          window.location.hash = 'landing';
        }
        setAuthValidated(false);
      } else if (['landing', 'login', 'signup'].includes(currentPage) && isAuthenticated && hasToken) {
        // Authenticated user on public page - redirect to dashboard
        setCurrentPage('dashboard');
        window.location.hash = 'dashboard';
        setAuthValidated(true);
      } else {
        // Not on protected page, no validation needed
        setAuthValidated(isAuthenticated && hasToken);
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
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      if (newPage !== currentPage) {
        setGlobalLoading(true, `Routing to ${newPage.replace('-', ' ')}...`);
        setTimeout(() => {
          setCurrentPage(newPage);
          // Safety timeout to hide loader if the new page doesn't signal readiness
          setTimeout(() => setGlobalLoading(false), 2000);
        }, 400);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, setGlobalLoading]);

  // Redirect based on auth state after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    if (!isAuthenticated) {
      // If not authenticated and on protected page, redirect to landing
      if ([
        'dashboard',
        'admin',
        'onboarding',
        'jobs',
        'companies',
        'applications',
        'network',
        'resume',
        'settings',
        'assessment',
        'ai-interview',
      ].includes(currentPage)) {
        handleNavigate('landing');
      }
    } else {
      // If authenticated and on landing/login/signup, redirect to dashboard
      if (['landing', 'login', 'signup'].includes(currentPage)) {
        handleNavigate('dashboard');
      }
    }
  }, [isInitialized, isAuthenticated, currentPage]);

  const handleNavigate = (page: string) => {
    const newPage = page as Page;
    if (newPage === currentPage) return;

    const labels: Record<string, string> = {
      dashboard: 'Syncing Workspace Node',
      jobs: 'Scanning Opportunity Grid',
      companies: 'Analyzing Market Pulse',
      applications: 'Tracking Signal Streams',
      network: 'Connecting Neural Links',
      assessment: 'Evaluating Skill Vectors',
      'ai-interview': 'Initializing AI Interrogator',
      landing: 'Returning to Base',
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
      window.location.hash = newPage;
      
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
        <Boxes />
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

  const isWorkspacePage = ['dashboard', 'jobs', 'companies', 'applications', 'network', 'resume', 'settings', 'assessment', 'ai-interview'].includes(currentPage);

  return (
    <div className="page-shell overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--panel-strong)',
            color: 'var(--text)',
            border: '1px solid var(--panel-border)',
            backdropFilter: 'blur(18px)',
            boxShadow: 'var(--shadow)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <AnimatePresence mode="wait">
        {isGlobalLoading ? (
          <motion.div
            key="global-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0c10] bg-opacity-95 backdrop-blur-xl"
          >
            {/* Grid background for premium feel */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            
            <ThinkingLoader loadingText={globalLoadingText} />
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full"
          >
            {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
            {currentPage === 'login' && <AuthPage mode="login" onNavigate={handleNavigate} />}
            {currentPage === 'signup' && <AuthPage mode="signup" onNavigate={handleNavigate} />}
            
            {/* Workspace Pages wrapped in MainLayout */}
            {isWorkspacePage && (
              <div className="flex h-screen overflow-hidden bg-[#0a0c10] relative">
                <Sidebar 
                  active={getSidebarActiveId(currentPage)} 
                  onNavigate={(id) => handleNavigate(id === 'opportunities' ? 'jobs' : id === 'home' ? 'dashboard' : id)}
                  lockedItems={!isFullyQualified ? ['home', 'resume', 'opportunities', 'settings'] : []}
                />
                <main className="flex-1 h-full overflow-y-auto overflow-x-hidden custom-scrollbar pb-24 md:pb-0">
                  {(currentPage === 'dashboard' || currentPage === 'resume' || currentPage === 'settings' || currentPage === 'assessment') && <Dashboard />}
                  {currentPage === 'jobs' && <JobsPage />}
                  {currentPage === 'companies' && <CompaniesPage />}
                  {currentPage === 'applications' && <ApplicationsPage />}
                  {currentPage === 'network' && <NetworkPage />}
                  {currentPage === 'ai-interview' && <InterviewPage />}
                </main>
                <MobileNav
                  active={getSidebarActiveId(currentPage)}
                  onNavigate={(id) => handleNavigate(id === 'opportunities' ? 'jobs' : id === 'home' ? 'dashboard' : id)}
                  lockedItems={!isFullyQualified ? ['home', 'resume', 'opportunities', 'settings'] : []}
                />
              </div>
            )}

            {currentPage === 'admin' && <AdminPanel onNavigate={handleNavigate} />}
            {currentPage === 'onboarding' && <OnboardingPage onNavigate={handleNavigate} />}
            {currentPage === 'tetris-demo' && <TetrisDemo />}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Prepzo AI Mentor - Available on all authenticated pages (ChatGPT-style) */}
      {authValidated && isAuthenticated && ['dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network'].includes(currentPage) && (
        <GlobalAIMentor />
      )}
    </div>
  );
}
