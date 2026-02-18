import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Eye,
  EyeOff,
  Settings,
  LogOut,
  Palette,
  User,
  GraduationCap,
  Headphones,
  Zap,
  Sparkles,
  Menu,
  Users,
  PanelLeftClose,
  RefreshCw,
  Clock,
  Languages,
  Globe
} from 'lucide-react';
import { IMAGES, ALUMNI_HIGHLIGHTS, SUPPORTED_LANGUAGES } from '@/lib/constants';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ContactOfficeDialog } from '@/components/dashboard/ContactOfficeDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ThemeMode } from '@/hooks/useThemeEngine';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavbarProps {
  onLogout: () => void;
  userRole?: string;
  academicYear?: number;
  userName?: string;
  onNavigate?: (view: string) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  themeMode?: ThemeMode;
  onRandomizeTheme?: () => void;
  onToggleThemeMode?: (mode: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onLogout,
  userRole = 'student',
  academicYear = 1,
  userName = 'Student',
  onNavigate,
  onToggleSidebar,
  isSidebarOpen = true,
  themeMode = 'manual',
  onRandomizeTheme,
  onToggleThemeMode
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [languagePopoverOpen, setLanguagePopoverOpen] = useState(false);
  const [shyMode, setShyMode] = useState(false);
  const [currentAlumniIndex, setCurrentAlumniIndex] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlumniIndex((prev) => (prev + 1) % ALUMNI_HIGHLIGHTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRandomize = () => {
    onRandomizeTheme?.();
    toast.success(t('nav.theme_randomized'));
  };

  const handleModeSwitch = (mode: ThemeMode) => {
    onToggleThemeMode?.(mode);
    toast.success(t('nav.theme_mode_set').replace('{mode}', mode));
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setLanguagePopoverOpen(false);
    
    const langName = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name || langCode;
    setTimeout(() => {
      toast.success(t('nav.language_changed').replace('{lang}', langName));
    }, 100);
  };

  const alumni = ALUMNI_HIGHLIGHTS[currentAlumniIndex] || { name: 'Alumni', achievement: 'Success story' };
  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b-2 border-slate-100 dark:border-slate-800 z-50 px-3 md:px-6 flex items-center justify-between shadow-sm">
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary transition-colors duration-500" />
      
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "text-slate-500 hover:text-primary hover:bg-primary/5 transition-all duration-200",
            isSidebarOpen ? "bg-slate-50" : "bg-transparent"
          )}
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <PanelLeftClose size={22} /> : <Menu size={22} />}
        </Button>

        <img src={IMAGES.logo} alt="Strathmore Logo" className="h-6 md:h-8 w-auto flex-shrink-0" />
        
        <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 max-w-[200px] lg:max-w-md overflow-hidden relative group">
          <GraduationCap size={14} className="text-primary shrink-0" />
          <div className="flex flex-col min-w-0">
             <span className="text-[10px] font-black text-primary uppercase tracking-tighter truncate">{t('nav.alumni_success')}</span>
             <p className="text-[10px] text-slate-500 font-medium truncate animate-in fade-in slide-in-from-bottom-1 duration-500" key={currentAlumniIndex}>
               {alumni.name}: {alumni.achievement}
             </p>
          </div>
          <Sparkles size={10} className="absolute right-2 text-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>

        <div 
          onClick={() => onNavigate?.('search')}
          className="hidden lg:flex items-center bg-slate-50 dark:bg-slate-800 rounded-full px-4 py-2 w-full max-w-sm border border-slate-100 dark:border-slate-700 group focus-within:ring-2 focus-within:ring-primary/20 transition-all ml-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          <span className="text-sm ml-2 w-full text-slate-400 font-medium">
            {t('nav.search_placeholder')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-4 flex-shrink-0">
        <Popover open={languagePopoverOpen} onOpenChange={setLanguagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 px-2 md:px-3 text-slate-600 hover:text-primary hover:bg-primary/5 font-bold transition-all border border-transparent hover:border-primary/10 rounded-full"
            >
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden lg:inline text-xs uppercase tracking-wider">{currentLang.code}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 mr-4" align="end">
            <div className="p-2 border-b border-slate-50 mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('nav.language')}</p>
            </div>
            <div className="space-y-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                    language === lang.code 
                      ? "bg-primary/10 text-primary font-bold" 
                      : "hover:bg-slate-50 text-slate-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onNavigate?.('search')}
          className="flex items-center lg:hidden gap-2 text-slate-600 hover:text-primary hover:bg-primary/5 font-bold text-xs px-2 md:px-3"
        >
          <Search size={18} />
        </Button>

        <Button 
          variant="ghost"
          size="sm"
          onClick={() => onNavigate?.('alumni')}
          className="flex items-center gap-2 text-slate-600 hover:text-primary hover:bg-primary/5 font-bold text-xs uppercase tracking-wider px-2 md:px-3"
        >
          <Users size={18} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">{t('nav.alumni')}</span>
        </Button>

        <div className="hidden md:block">
          <ContactOfficeDialog>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group/support">
              <Headphones size={18} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:inline">{t('nav.support')}</span>
            </button>
          </ContactOfficeDialog>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="text-slate-400 hover:text-primary hover:bg-primary/5 hidden sm:flex"
          onClick={() => onNavigate?.('settings')}
        >
          <Settings size={18} />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4" align="end">
             <div className="p-4 border-b border-slate-50 font-bold text-sm flex justify-between items-center">
               <span>{t('nav.notifications')}</span>
               <button 
                onClick={() => onNavigate?.('notifications')}
                className="text-[10px] text-primary hover:underline font-black uppercase tracking-widest"
               >
                 {t('nav.view_all')}
               </button>
             </div>
             <div className="p-4 space-y-3">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Zap size={14} />
                   </div>
                   <div>
                      <p className="text-xs font-bold">New Mentorship Activity</p>
                      <p className="text-[10px] text-slate-500">Your triad pod has a new discussion topic available.</p>
                   </div>
                </div>
             </div>
          </PopoverContent>
        </Popover>

        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 md:gap-2 p-1 pl-2 pr-2 md:pr-1 rounded-full border border-slate-100 hover:border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all bg-white dark:bg-slate-900"
          >
            <div className="hidden md:flex flex-col items-end mr-1">
               <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none">{t('nav.status_online')}</span>
               <span className="text-[10px] font-bold text-slate-400">Y{academicYear} {userRole}</span>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 ring-2 ring-transparent hover:ring-primary/20 transition-all">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${shyMode ? 'shy' : userName}`} 
                alt="Profile" 
              />
            </div>
            <ChevronDown size={12} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 mb-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Year {academicYear} {userRole.toUpperCase()}</p>
                  <p className="font-bold text-slate-900 dark:text-white leading-none">{userName}</p>
                </div>

                <div className="space-y-1">
                  <button 
                    onClick={() => {
                      onNavigate?.('settings');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Settings size={16} className="text-slate-400" />
                    <span className="font-medium">{t('nav.account_settings')}</span>
                  </button>

                  <div className="px-3 py-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">{t('nav.theme_control')}</p>
                     <div className="grid grid-cols-3 gap-1">
                        <button 
                          onClick={() => handleModeSwitch('manual')}
                          className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                            themeMode === 'manual' ? "bg-primary/5 border-primary text-primary" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"
                          )}
                        >
                          <Palette size={14} />
                          <span className="text-[8px] font-bold mt-1">{t('nav.theme_manual')}</span>
                        </button>
                        <button 
                          onClick={() => handleModeSwitch('auto')}
                          className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                            themeMode === 'auto' ? "bg-primary/5 border-primary text-primary" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"
                          )}
                        >
                          <RefreshCw size={14} className={themeMode === 'auto' ? "animate-spin-slow" : ""} />
                          <span className="text-[8px] font-bold mt-1">{t('nav.theme_auto')}</span>
                        </button>
                        <button 
                          onClick={() => handleModeSwitch('time-based')}
                          className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-lg border transition-all",
                            themeMode === 'time-based' ? "bg-primary/5 border-primary text-primary" : "bg-slate-50 border-transparent text-slate-400 hover:text-slate-600"
                          )}
                        >
                          <Clock size={14} />
                          <span className="text-[8px] font-bold mt-1">{t('nav.theme_time')}</span>
                        </button>
                     </div>
                  </div>

                  <button 
                    onClick={handleRandomize}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-primary/5 group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Palette size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                      <span className="font-medium group-hover:text-primary transition-colors">{t('nav.randomize_palette')}</span>
                    </div>
                    <Sparkles size={14} className="text-secondary" />
                  </button>

                  <button 
                    onClick={() => setShyMode(!shyMode)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {shyMode ? <EyeOff size={16} className="text-primary" /> : <Eye size={16} className="text-slate-400" />}
                      <span className="font-medium">{t('nav.shy_mode')}</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${shyMode ? 'bg-primary' : 'bg-slate-200'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${shyMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                  </button>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

                  <button 
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};