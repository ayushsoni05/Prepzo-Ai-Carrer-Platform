import { useState, useEffect, useRef } from 'react';
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
import ThinkingLoader from '@/components/ui/loading';
import Sidebar from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'admin' | 'onboarding' | 'jobs' | 'companies' | 'applications' | 'network' | 'tetris-demo' | 'resume' | 'settings' | 'assessment';

// Get initial page from URL hash or default to 'landing'
const getPageFromHash = (): Page => {
  const hash = window.location.hash.slice(1) as Page;
  const validPages: Page[] = ['landing', 'login', 'signup', 'dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network', 'tetris-demo', 'resume', 'settings', 'assessment'];
  return validPages.includes(hash) ? hash : 'landing';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromHash);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authValidated, setAuthValidated] = useState(false);
  const initRef = useRef(false);
  const { isAuthenticated, user, fetchUser } = useAuthStore();
  const { loadResumeAnalysisFromBackend, darkMode } = useAppStore();

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
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect based on auth state after initialization
  useEffect(() => {
    if (!isInitialized) return;
    
    // If at root URL (no hash), always show landing page without redirect
    
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
      ].includes(currentPage)) {
        handleNavigate('landing');
      }
    }
    // If authenticated, do NOT redirect from signup/login/landing to dashboard
    // Let user stay on signup/login/landing if they choose
    // Only redirect if on protected page and not authenticated
    // Dashboard navigation should be triggered after onboarding/signup, not automatically
  }, [isInitialized, isAuthenticated, user, currentPage]);

  const handleNavigate = (page: string) => {
    const newPage = page as Page;

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
  };

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0c10]">
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

  const isWorkspacePage = ['dashboard', 'jobs', 'companies', 'applications', 'network', 'resume', 'settings', 'assessment'].includes(currentPage);

  return (
    <div className="page-shell">
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

      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <AuthPage mode="login" onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <AuthPage mode="signup" onNavigate={handleNavigate} />}
      
      {/* Workspace Pages wrapped in MainLayout */}
      {isWorkspacePage && (
        <div className="flex min-h-screen">
          <Sidebar 
            active={getSidebarActiveId(currentPage)} 
            onNavigate={(id) => handleNavigate(id === 'opportunities' ? 'jobs' : id === 'home' ? 'dashboard' : id)}
            lockedItems={!isFullyQualified ? ['home', 'resume', 'opportunities', 'settings'] : []}
          />
          <main className="flex-1">
            {(currentPage === 'dashboard' || currentPage === 'resume' || currentPage === 'settings' || currentPage === 'assessment') && <Dashboard />}
            {currentPage === 'jobs' && <JobsPage />}
            {currentPage === 'companies' && <CompaniesPage />}
            {currentPage === 'applications' && <ApplicationsPage />}
            {currentPage === 'network' && <NetworkPage />}
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
      
      {/* Prepzo AI Mentor - Available on all authenticated pages (ChatGPT-style) */}
      {authValidated && isAuthenticated && ['dashboard', 'admin', 'onboarding', 'jobs', 'companies', 'applications', 'network'].includes(currentPage) && (
        <GlobalAIMentor />
      )}
    </div>
  );
}
