import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import LoginPage from '@/components/auth/LoginPage';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ImpersonationToolbar from '@/components/admin/ImpersonationToolbar';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { useThemeEngine } from '@/hooks/useThemeEngine';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  role: 'student' | 'admin' | 'faculty';
  year: number;
  shyMode: boolean;
  email?: string;
  fullName?: string;
}

const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    ),
  ]);
};

const AppContent: React.FC = () => {
  const { t, isLoading: isLangLoading } = useLanguage();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [impersonatedYear, setImpersonatedYear] = useState<number | null>(null);
  const [activeView, setActiveView] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);
  
  const isFetchingProfile = useRef(false);
  const { themeMode, randomizeTheme, toggleThemeMode } = useThemeEngine();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProfile = useCallback(async (userId: string, sessionUser?: SupabaseUser) => {
    if (isFetchingProfile.current) return;
    isFetchingProfile.current = true;
    
    try {
      const query = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data, error: profileError } = (await withTimeout(
        query as any,
        5000,
        t('app.err_desc') || "Profile fetch timed out"
      )) as any;

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        const { data: authData } = await supabase.auth.getUser();
        const authUser = sessionUser || authData.user;
        
        setUser({
          id: userId,
          role: (authUser?.user_metadata?.role as any) || 'student',
          year: (authUser?.user_metadata?.year as number) || 1,
          shyMode: (authUser?.user_metadata?.shy_mode as boolean) || false,
          email: authUser?.email,
          fullName: authUser?.user_metadata?.full_name
        });
      } else if (data) {
        setUser({
          id: data.id,
          role: data.role as 'student' | 'admin' | 'faculty',
          year: data.year,
          shyMode: data.shy_mode,
          email: data.email,
          fullName: data.full_name
        });
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
      const { data: authData } = await supabase.auth.getUser();
      const authUser = sessionUser || authData.user;
      if (authUser) {
        setUser({
          id: userId,
          role: authUser.user_metadata?.role || 'student',
          year: authUser.user_metadata?.year || 1,
          shyMode: authUser.user_metadata?.shy_mode || false,
          email: authUser.email,
          fullName: authUser.user_metadata?.full_name
        });
      }
    } finally {
      isFetchingProfile.current = false;
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let mounted = true;

    const checkEmailConfirmation = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        setIsConfirmingEmail(true);
        try {
          const { error: exchangeError } = await withTimeout(
            supabase.auth.exchangeCodeForSession(code),
            10000,
            t('app.err_desc') || "Verification timed out"
          );

          if (exchangeError) {
            const { data: { session: existingSession } } = await supabase.auth.getSession();
            if (!existingSession) {
              toast.error("Authentication failed: " + exchangeError.message);
            }
          } else {
            toast.success(t('login.success_signin') || "Identity verified successfully!");
          }
        } catch (err) {
          console.error("Verification error:", err);
          toast.error(t('app.err_desc') || "Gateway communication failed. Please try again.");
        } finally {
          if (mounted) {
            setIsConfirmingEmail(false);
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        }
      }
    };

    const initAuth = async () => {
      try {
        await checkEmailConfirmation();
        const sessionResult = await withTimeout(
          supabase.auth.getSession(),
          5000,
          t('app.err_desc') || "Session retrieval timed out"
        );
        
        const currentSession = sessionResult.data.session;
        if (!mounted) return;
        
        if (currentSession) {
          setSession(currentSession);
          await fetchProfile(currentSession.user.id, currentSession.user);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('Auth state changed:', event);
      setSession(session);
      
      if (session) {
        await fetchProfile(session.user.id, session.user);
      } else {
        setUser(null);
        setSession(null);
        setLoading(false);
      }
    });

    const safetyTimeout = setTimeout(() => {
      if (mounted && (loading || isConfirmingEmail)) {
        setLoading(false);
        setIsConfirmingEmail(false);
      }
    }, 8000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, [fetchProfile, t]);

  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Force state update
      setSession(null);
      setUser(null);
      setImpersonatedYear(null);
      
      toast.success(t('nav.logout_success'));
      
      // Clear storage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('sb-' + (import.meta.env.VITE_SUPABASE_URL?.split('//')[1].split('.')[0] || '') + '-auth-token');
      
    } catch (err) {
      console.error("Logout process error:", err);
      // Fallback: clear state even if error
      setSession(null);
      setUser(null);
      setImpersonatedYear(null);
      toast.success(t('nav.logout_success'));
    }
  }, [t]);

  const startImpersonation = (year: number) => {
    setImpersonatedYear(year);
    toast.info(`Entering Impersonation Mode: Viewing Year ${year} Student UI`);
  };

  const stopImpersonation = () => {
    setImpersonatedYear(null);
    toast.success("Exited Impersonation Mode. Back to Admin HQ.");
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  if (loading || isConfirmingEmail || (isLangLoading && !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-black">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="uppercase tracking-[0.2em] text-[10px] text-primary animate-pulse font-black">
              {isConfirmingEmail ? t('app.loading_verify') : t('app.loading_auth')}
            </p>
            <p className="text-white/40 text-[8px] uppercase tracking-widest font-bold">{t('app.gateway_label')}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => {
              setLoading(false);
              setIsConfirmingEmail(false);
            }} 
            className="mt-4 text-[10px] text-white/20 hover:text-white/40 font-bold uppercase tracking-widest"
          >
            {t('app.skip_loading')}
          </Button>
        </div>
      </div>
    );
  }

  const displayYear = impersonatedYear || user?.year || 1;
  const isImpersonating = impersonatedYear !== null;
  const userName = user?.fullName || user?.email?.split('@')[0] || 'Student';

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col theme-root ${isImpersonating ? 'pt-12' : ''}`}>
      {!session ? (
        <LoginPage />
      ) : user?.role === 'admin' && !impersonatedYear ? (
        <AdminDashboard onImpersonate={startImpersonation} onLogout={handleLogout} />
      ) : (
        <>
          {isImpersonating && (
            <ImpersonationToolbar 
              targetUser={{ name: userName, role: 'student', year: displayYear }}
              onExit={stopImpersonation}
            />
          )}
          
          <Navbar 
            onLogout={handleLogout} 
            userRole={user?.role} 
            academicYear={displayYear} 
            userName={userName}
            onNavigate={handleNavigate}
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            themeMode={themeMode}
            onRandomizeTheme={randomizeTheme}
            onToggleThemeMode={toggleThemeMode}
          />

          <div className="flex flex-1 pt-16 h-screen overflow-hidden">
            <Sidebar 
              activeView={activeView} 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
              year={displayYear}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
            
            <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
              <Dashboard 
                academicYear={displayYear} 
                shyMode={user?.shyMode || false} 
                initialView={activeView} 
                userName={userName}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </LanguageProvider>
  );
};

export default App;