import React, { useState } from 'react';
import { 
  User, 
  Target, 
  Calendar, 
  Building,
  AlertCircle,
  Eye,
  Settings as SettingsIcon,
  Palette,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useThemeEngine, ThemeMode } from '@/hooks/useThemeEngine';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsProps {
  year: number;
  shyMode: boolean;
}

export const Settings: React.FC<SettingsProps> = ({ year, shyMode: initialShyMode }) => {
  const { t } = useLanguage();
  const [shyMode, setShyMode] = useState(initialShyMode);
  const [isMentorRole, setIsMentorRole] = useState(year >= 3);
  const [examMode, setExamMode] = useState(false);
  const [goals, setGoals] = useState(['Social Integration', 'Academic Excellence']);
  const [faculty, setFaculty] = useState('IT');
  const [progressVisibility, setProgressVisibility] = useState('peer');
  
  const { themeMode, toggleThemeMode, randomizeTheme, currentPaletteId, applyTheme, palettes } = useThemeEngine();

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
    toast.success(`${t('settings.focus_title')} updated: ${goal}`);
  };

  const handleModeChange = (mode: ThemeMode) => {
    toggleThemeMode(mode);
    toast.success(`${t('nav.theme_control')}: ${mode.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <Badge className="bg-secondary text-primary font-black mb-4 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest border-none">
            {t('settings.user_preferences')}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3 md:gap-4">
            <SettingsIcon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            {t('settings.control_center')}
          </h1>
          <p className="text-gray-500 font-medium mt-4 max-w-xl text-sm md:text-base">
            {t('settings.header_desc')}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 leading-none">{t('settings.identity_persona')}</h2>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{t('settings.power_distance')}</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="p-5 md:p-6 rounded-[2rem] bg-gray-50 border border-gray-100 group transition-all">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{t('nav.shy_mode')}</h3>
                    {year <= 2 && <Badge className="bg-secondary text-primary text-[10px] font-black h-5 border-none">Y1/Y2 Perk</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t('settings.shy_desc')}
                  </p>
                </div>
                <Switch 
                  disabled={year > 2}
                  checked={shyMode} 
                  onCheckedChange={setShyMode} 
                />
              </div>
              {year > 2 && <p className="mt-2 text-[10px] text-orange-600 font-bold">{t('settings.shy_note')}</p>}
            </div>

            <div className="p-5 md:p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{t('settings.role_title')}</h3>
                    {year >= 3 && <Badge className="bg-primary text-white text-[10px] font-black h-5 border-none">Leadership</Badge>}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t('settings.role_desc')}
                  </p>
                </div>
                <Switch 
                  disabled={year < 3}
                  checked={isMentorRole} 
                  onCheckedChange={setIsMentorRole} 
                />
              </div>
              {year < 3 && <p className="mt-2 text-[10px] text-blue-600 font-bold italic">{t('settings.role_note')}</p>}
            </div>

            <div className="p-5 md:p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{t('settings.avail_title')}</h3>
                    <Calendar size={14} className="text-primary" />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t('settings.avail_desc')}
                  </p>
                </div>
                <Switch 
                  checked={examMode} 
                  onCheckedChange={setExamMode} 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Palette size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 leading-none">{t('settings.appearance_engine')}</h2>
              <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{t('settings.theme_desc')}</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="p-6 rounded-[2rem] bg-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-widest text-secondary">
                <Sparkles size={16} />
                {t('settings.auto_mode')}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={() => handleModeChange('manual')}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all",
                    themeMode === 'manual' 
                      ? "bg-white/10 border-white/30 text-white" 
                      : "bg-black/20 border-transparent text-gray-500 hover:bg-black/30"
                  )}
                >
                  <Palette size={20} />
                  <span className="text-xs font-bold">{t('nav.theme_manual')}</span>
                </button>
                
                <button 
                  onClick={() => handleModeChange('auto')}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all",
                    themeMode === 'auto' 
                      ? "bg-white/10 border-white/30 text-white" 
                      : "bg-black/20 border-transparent text-gray-500 hover:bg-black/30"
                  )}
                >
                  <RefreshCw size={20} className={themeMode === 'auto' ? "animate-spin-slow" : ""} />
                  <span className="text-xs font-bold">{t('nav.theme_auto')}</span>
                </button>

                <button 
                  onClick={() => handleModeChange('time-based')}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all",
                    themeMode === 'time-based' 
                      ? "bg-white/10 border-white/30 text-white" 
                      : "bg-black/20 border-transparent text-gray-500 hover:bg-black/30"
                  )}
                >
                  <Clock size={20} />
                  <span className="text-xs font-bold">{t('nav.theme_time')}</span>
                </button>
              </div>

              <p className="mt-4 text-[10px] text-gray-400 font-medium">
                {themeMode === 'manual' && t('settings.manual_info')}
                {themeMode === 'auto' && t('settings.auto_info')}
                {themeMode === 'time-based' && t('settings.time_info')}
              </p>
            </div>

            <div className="p-5 md:p-6 rounded-[2rem] bg-gray-50 border border-gray-100">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t('settings.palettes_title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {palettes.map(palette => (
                  <button 
                    key={palette.id}
                    disabled={themeMode !== 'manual'}
                    onClick={() => applyTheme(palette.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all",
                      currentPaletteId === palette.id ? "border-primary bg-white shadow-sm" : "border-gray-100 bg-white/50 hover:bg-white",
                      themeMode !== 'manual' && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.secondary }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{palette.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={randomizeTheme}
              className="w-full h-12 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <Sparkles size={18} />
              {t('nav.randomize_palette')}
            </Button>
          </div>
        </section>
      </div>

      <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Target size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 leading-none">{t('settings.milestone_calibration')}</h2>
            <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">Growth Heartbeat</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t('settings.focus_title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Social Integration', 'Academic Excellence', 'Community Service', 'Job Readiness'].map(goal => (
                <div key={goal} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer" onClick={() => handleGoalToggle(goal)}>
                  <Checkbox id={goal} checked={goals.includes(goal)} onCheckedChange={() => handleGoalToggle(goal)} />
                  <Label htmlFor={goal} className="text-sm font-bold text-gray-700 cursor-pointer">{goal}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t('settings.inst_title')}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <Building className="text-primary w-5 h-5" />
                <span className="text-sm font-bold text-gray-700">{t('settings.faculty_label')}</span>
              </div>
              <Select value={faculty} onValueChange={setFaculty}>
                <SelectTrigger className="w-full sm:w-[160px] rounded-xl border-none bg-white shadow-sm font-bold">
                  <SelectValue placeholder="Faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Law">School of Law</SelectItem>
                  <SelectItem value="IT">@iLabAfrica (IT)</SelectItem>
                  <SelectItem value="Commerce">Strathmore Business School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-3">
              <div className="flex items-center gap-3">
                <Eye className="text-secondary w-5 h-5" />
                <span className="text-sm font-bold text-gray-700">{t('settings.visibility_label')}</span>
              </div>
              <Select value={progressVisibility} onValueChange={setProgressVisibility}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-none bg-white shadow-sm font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peer">{t('settings.peer_only') || "Peer Mentor Only"}</SelectItem>
                  <SelectItem value="triad">{t('settings.triad_visibility') || "Peer + Faculty (Triad)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 bg-[#0F172A] rounded-[2rem] md:rounded-[2.5rem] gap-8 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-secondary rotate-3 shrink-0">
             <AlertCircle size={32} />
          </div>
          <div>
             <h4 className="text-xl font-bold">{t('settings.reset_title')}</h4>
             <p className="text-sm text-gray-400">{t('settings.reset_desc')}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full lg:w-auto px-10 h-14 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black transition-all active:scale-95"
          onClick={() => toast.info("Settings reset to default.")}
        >
          {t('settings.reset_defaults')}
        </Button>
      </div>
    </div>
  );
};