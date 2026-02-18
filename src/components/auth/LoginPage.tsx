import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  UserCircle2, 
  LockKeyhole,
  Eye,
  EyeOff,
  CloudLightning,
  User,
  Shield,
  ArrowLeft,
  GraduationCap,
  IdCard,
  Languages,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IMAGES, SUPPORTED_LANGUAGES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

const withAuthTimeout = <T,>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), ms)
    ),
  ]);
};

const LoginPage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [shyMode, setShyMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'role-selection' | 'student' | 'admin'>('role-selection');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [adminLoginMethod, setAdminLoginMethod] = useState<'credentials' | 'staff-id'>('credentials');
  const [selectedYear, setSelectedYear] = useState('1');

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleSsoLogin = () => {
    setIsLoading(true);
    toast.info(t('login.sso_connecting'));
    setTimeout(() => {
      toast.error(t('login.sso_error'));
      setIsLoading(false);
    }, 1500);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    const langName = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name;
    toast.success(t('nav.language_changed').replace('{lang}', langName || ''));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let loginEmail = email;
    if (view === 'admin') {
      if (adminLoginMethod === 'staff-id') {
        if (!staffId || !password) {
          toast.error(t('login.err_admin_credentials'));
          return;
        }
        if (!staffId.startsWith('STF-')) {
          toast.error(t('login.err_staff_id_format'));
          return;
        }
        loginEmail = `${staffId.toLowerCase()}@strathmore.edu`;
      } else {
        if (!email || !password) {
          toast.error(t('login.err_admin_credentials'));
          return;
        }
      }
    } else {
      if (!email || !password) {
        toast.error(t('login.err_fill_fields'));
        return;
      }
    }

    setIsLoading(true);
    
    try {
      if (authMode === 'signin') {
        const { error } = await withAuthTimeout(
          supabase.auth.signInWithPassword({
            email: loginEmail,
            password: password,
          }),
          8000,
          t('app.err_desc')
        );

        if (error) {
          toast.error(error.message);
        } else {
          toast.success(t('login.success_signin'));
        }
      } else {
        const role = view === 'admin' ? 'admin' : 'student';
        const { error } = await withAuthTimeout(
          supabase.auth.signUp({
            email: loginEmail,
            password: password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`,
              data: {
                full_name: fullName,
                role: role,
                year: parseInt(selectedYear),
                shy_mode: shyMode,
              }
            }
          }),
          10000,
          t('app.err_desc')
        );

        if (error) {
          toast.error(error.message);
        } else {
          toast.success(t('login.success_signup'));
          setAuthMode('signin');
        }
      }
    } catch (err: any) {
      toast.error(err.message || t('login.err_unexpected'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const LanguageToggle = () => (
    <div className="absolute top-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 px-3 h-10 bg-white/90 backdrop-blur-md border-white/20 text-slate-700 hover:text-primary hover:bg-white font-bold transition-all shadow-xl rounded-2xl"
          >
            <span className="text-lg">{currentLang.flag}</span>
            <span className="text-[10px] uppercase tracking-widest">{currentLang.code}</span>
            <ChevronDown size={12} className="text-slate-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2" align="end">
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
    </div>
  );

  const RoleSelection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen p-6 relative z-10"
    >
      <div className="mb-12 text-center">
        <div className="inline-flex p-4 rounded-3xl bg-white shadow-2xl mb-6">
          <img src={IMAGES.logo} alt="Strathmore Logo" className="h-16 md:h-24 w-auto" />
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
          {t('login.welcome_title').split(' ')[0]} <span className="text-secondary">{t('login.welcome_title').split(' ')[1]}</span>
        </h1>
        <p className="text-xl text-white/90 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-sm">
          {t('login.welcome_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <button 
          onClick={() => { setView('student'); setAuthMode('signin'); }}
          className="group relative bg-white/95 backdrop-blur-md border-2 border-white/20 p-8 rounded-[2rem] text-left transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <GraduationCap size={120} className="text-primary" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <User size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t('login.student_access')}</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              {t('login.student_desc')}
            </p>
            <div className="mt-8 flex items-center text-primary font-black uppercase text-sm tracking-widest gap-2">
              {t('login.continue')} <ArrowLeft size={18} className="rotate-180" />
            </div>
          </div>
        </button>

        <button 
          onClick={() => { setView('admin'); setAuthMode('signin'); }}
          className="group relative bg-slate-900/95 backdrop-blur-md border-2 border-white/10 p-8 rounded-[2rem] text-left transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={120} className="text-accent" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              <Shield size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">{t('login.admin_access')}</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              {t('login.admin_desc')}
            </p>
            <div className="mt-8 flex items-center text-accent font-black uppercase text-sm tracking-widest gap-2">
              {t('login.continue')} <ArrowLeft size={18} className="rotate-180" />
            </div>
          </div>
        </button>
      </div>

      <p className="mt-12 text-white/60 text-sm font-medium">
        {t('login.copyright').replace('{year}', new Date().getFullYear().toString())}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 font-sans">
      <LanguageToggle />
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${IMAGES.bgLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-transparent to-accent/60 z-0" />

      <AnimatePresence mode="wait">
        {view === 'role-selection' ? (
          <RoleSelection key="role-selection" />
        ) : (
          <motion.div 
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row min-h-screen w-full relative z-10"
          >
            <div className={cn(
              "hidden lg:flex lg:w-[45%] relative items-center justify-center p-12 overflow-hidden",
              view === 'student' ? "bg-primary/20 backdrop-blur-sm" : "bg-slate-900/60 backdrop-blur-sm"
            )}>
              <div className="relative z-10 max-w-md text-white text-center lg:text-left">
                {view === 'student' ? (
                  <div className="flex flex-col items-center lg:items-start">
                    <img src={IMAGES.logo} alt="School Logo" className="h-32 w-auto mb-10 drop-shadow-2xl bg-white p-4 rounded-3xl" />
                    <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight uppercase">
                      {t('login.shape_future').split(' ').slice(0, 2).join(' ')} <br />
                      <span className="text-secondary">{t('login.shape_future').split(' ').slice(2).join(' ')}</span>
                    </h2>
                    <p className="text-xl text-white/90 font-medium mb-10">
                      {t('login.access_mentorship')}
                    </p>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[1, 2, 3, 4].map((y) => (
                        <div key={y} className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                          <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center font-black text-xs">
                            {t('login.year_short')}{y}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            {y === 1 && t('login.social_integration')}
                            {y === 2 && t('login.social_integration')}
                            {y === 3 && t('login.triad_pod')}
                            {y === 4 && t('login.flash_mentoring')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="p-6 bg-accent rounded-3xl mb-10 shadow-2xl">
                      <Shield size={64} className="text-white" />
                    </div>
                    <h2 className="text-5xl font-black mb-6 tracking-tight leading-tight uppercase">
                      {t('login.admin_gateway').split(' ')[0]} <br />
                      <span className="text-accent-foreground/50">{t('login.admin_gateway').split(' ')[1]}</span>
                    </h2>
                    <p className="text-xl text-slate-200 font-medium mb-10">
                      {t('login.admin_gateway_desc')}
                    </p>
                    <ul className="space-y-4 w-full">
                      {[1, 2, 3, 4].map(i => (
                        <li key={i} className="flex items-center gap-3 text-slate-200 text-sm font-bold uppercase tracking-widest">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                          {t(`login.admin_feature${i}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/20 relative">
                  <button 
                    onClick={() => setView('role-selection')}
                    className="absolute -top-12 left-0 flex items-center gap-2 text-white hover:text-secondary transition-colors font-bold text-sm uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} /> {t('login.back_to_selection')}
                  </button>

                  <div className="mb-10 text-center lg:text-left">
                    <div className="lg:hidden mb-6 flex justify-center">
                       <img src={IMAGES.logo} alt="School Logo" className="h-20 w-auto bg-white p-2 rounded-xl" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900">
                      {view === 'student' ? (authMode === 'signin' ? t('login.student_login') : t('login.student_reg')) : t('login.admin_login')}
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium">
                      {authMode === 'signin' ? t('login.enter_credentials') : t('login.create_account_msg')}
                    </p>
                  </div>

                  <div className="flex gap-4 mb-8 bg-slate-100 p-1 rounded-2xl">
                    <button 
                      onClick={() => setAuthMode('signin')}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                        authMode === 'signin' ? "bg-white text-primary shadow-sm" : "text-slate-400"
                      )}
                    >
                      {t('login.sign_in')}
                    </button>
                    <button 
                      onClick={() => setAuthMode('signup')}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                        authMode === 'signup' ? "bg-white text-primary shadow-sm" : "text-slate-400"
                      )}
                    >
                      {t('login.register')}
                    </button>
                  </div>

                  {view === 'student' && authMode === 'signin' && (
                    <div className="space-y-6 mb-6">
                      <Button 
                        variant="outline" 
                        className="w-full h-14 border-primary/20 bg-primary/5 hover:bg-primary hover:text-white transition-all duration-300 font-black text-xs uppercase tracking-widest rounded-2xl text-primary shadow-sm"
                        onClick={handleSsoLogin}
                        disabled={isLoading}
                      >
                        <CloudLightning className="mr-2" size={18} />
                        {t('login.sso_login')}
                      </Button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-slate-100"></span>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black">
                          <span className="bg-white px-3 text-slate-400 tracking-widest">{t('login.secondary_access')}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {view === 'admin' && (
                    <div className="space-y-6 mb-6">
                      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setAdminLoginMethod('credentials')}
                          className={cn(
                            "py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                            adminLoginMethod === 'credentials' 
                              ? "bg-white text-slate-900 shadow-sm" 
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {t('login.credentials')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdminLoginMethod('staff-id')}
                          className={cn(
                            "py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                            adminLoginMethod === 'staff-id' 
                              ? "bg-white text-slate-900 shadow-sm" 
                              : "text-slate-500 hover:text-slate-700"
                          )}
                        >
                          {t('login.staff_id')}
                        </button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleAuth} className="space-y-5">
                    {authMode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="font-black text-xs uppercase text-slate-500 tracking-widest">{t('login.full_name')}</Label>
                        <div className="relative">
                          <Input 
                            id="fullName"
                            placeholder={t('login.full_name_placeholder')}
                            className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl shadow-sm"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                          <User className="absolute left-4 top-4 text-slate-400" size={20} />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor={adminLoginMethod === 'staff-id' ? "staff-id" : "email"} className="font-black text-xs uppercase text-slate-500 tracking-widest">
                        {view === 'admin' 
                          ? (adminLoginMethod === 'staff-id' ? t('login.staff_id_number') : t('login.admin_username')) 
                          : t('login.university_email')}
                      </Label>
                      <div className="relative">
                        <Input 
                          id={adminLoginMethod === 'staff-id' ? "staff-id" : "email"} 
                          type={view === 'admin' ? 'text' : 'email'}
                          placeholder={view === 'admin' 
                            ? (adminLoginMethod === 'staff-id' ? "STF-ADMIN-123" : "admin.id") 
                            : "student@strathmore.edu"} 
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl shadow-sm"
                          value={adminLoginMethod === 'staff-id' ? staffId : email}
                          onChange={(e) => adminLoginMethod === 'staff-id' ? setStaffId(e.target.value) : setEmail(e.target.value)}
                          required
                        />
                        {view === 'admin' ? (
                          adminLoginMethod === 'staff-id' ? <IdCard className="absolute left-4 top-4 text-slate-400" size={20} /> : <Shield className="absolute left-4 top-4 text-slate-400" size={20} />
                        ) : (
                          <UserCircle2 className="absolute left-4 top-4 text-slate-400" size={20} />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="font-black text-xs uppercase text-slate-500 tracking-widest">{t('login.password')}</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          className="pl-12 h-14 bg-slate-50 border-slate-200 focus:ring-primary rounded-2xl shadow-sm"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <LockKeyhole className="absolute left-4 top-4 text-slate-400" size={20} />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {authMode === 'signup' && view === 'student' && (
                       <div className="space-y-2">
                        <Label className="font-black text-xs uppercase text-slate-500 tracking-widest">{t('login.academic_year')}</Label>
                        <Select 
                          value={selectedYear} 
                          onValueChange={setSelectedYear}
                        >
                          <SelectTrigger className="h-14 bg-slate-50 border-slate-200 rounded-2xl font-bold focus:ring-primary shadow-sm">
                            <SelectValue placeholder={t('login.academic_year')} />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-slate-200">
                            <SelectItem value="1" className="font-bold">{t('login.year_1')}</SelectItem>
                            <SelectItem value="2" className="font-bold">{t('login.year_2')}</SelectItem>
                            <SelectItem value="3" className="font-bold">{t('login.year_3')}</SelectItem>
                            <SelectItem value="4" className="font-bold">{t('login.year_4')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          id="remember" 
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-[10px] font-black text-slate-500 cursor-pointer uppercase tracking-tight">{t('login.remember_me')}</Label>
                      </div>
                      <a href="#" className="text-[10px] text-primary hover:underline font-black uppercase tracking-tight">{t('login.help_support')}</a>
                    </div>

                    {view === 'student' && (
                      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-between mb-2">
                        <div>
                          <Label htmlFor="shy-mode" className="text-xs font-black text-primary block uppercase tracking-widest">{t('login.shy_mode')}</Label>
                          <p className="text-[10px] text-primary/60 font-medium italic">{t('login.shy_mode_desc')}</p>
                        </div>
                        <Switch 
                          id="shy-mode" 
                          checked={shyMode}
                          onCheckedChange={setShyMode}
                        />
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <Button 
                        type="submit" 
                        className={cn(
                          "w-full h-14 text-white font-black uppercase tracking-widest text-xs shadow-2xl rounded-2xl transition-all duration-300 transform active:scale-[0.98]",
                          view === 'student' ? "bg-primary hover:bg-primary/90 shadow-primary/30" : "bg-accent hover:bg-accent/90 shadow-accent/30"
                        )} 
                        disabled={isLoading}
                      >
                        {isLoading ? t('login.authenticating') : 
                          authMode === 'signin' ? 
                            (view === 'admin' ? t('login.verify_access') : t('login.secure_sign_in')) : 
                            t('login.create_account')}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setView('role-selection')}
                        className="w-full h-12 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px]"
                      >
                        <ArrowLeft size={14} className="mr-2" />
                        {t('login.back_to_selection')}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;