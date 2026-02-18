import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Layout,
  MapPin,
  Briefcase,
  ArrowRight,
  MessageSquare,
  Info,
  ExternalLink,
  Home,
  Layers,
  Headphones,
  School,
  HelpCircle,
  GraduationCap,
  Globe,
  Settings as SettingsIcon,
  Zap,
  Target,
  Sparkles,
  Search as SearchIcon,
  Bell
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MatchingPortal } from './MatchingPortal';
import { BadgeRoom } from './BadgeRoom';
import { ExcursionFeed } from './ExcursionFeed';
import { LearningLibrary } from './LearningLibrary';
import { SocialDiscussions } from './SocialDiscussions';
import { ContactOfficeDialog } from './ContactOfficeDialog';
import { AboutMentoring } from './AboutMentoring';
import { FacultyConnect } from './FacultyConnect';
import { AlumniConnect } from './AlumniConnect';
import { SupportFAQ } from './SupportFAQ';
import { TriadSection } from './TriadSection';
import { Settings } from './Settings';
import { SearchPortal } from './SearchPortal';
import { NotificationsCenter } from './NotificationsCenter';
import { IMAGES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RequestMentorshipDialog } from './RequestMentorshipDialog';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardProps {
  academicYear: number;
  shyMode: boolean;
  initialView?: string;
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ academicYear, shyMode, initialView, userName = 'John' }) => {
  const { t } = useLanguage();
  
  const getDefaultView = () => {
    if (initialView) return initialView;
    if (academicYear === 3) return 'triad';
    if (academicYear === 4) return 'alumni';
    return 'overview';
  };

  const [view, setView] = useState(getDefaultView());

  useEffect(() => {
    if (initialView) setView(initialView);
  }, [initialView]);

  const allNavButtons = [
    { id: 'overview', label: t('dash.home'), icon: Home, years: [1, 2, 3, 4] },
    { id: 'matching', label: t('dash.peer_matcher'), icon: Users, years: [1, 2] },
    { id: 'triad', label: t('dash.triad_pod'), icon: Layers, years: [3] },
    { id: 'alumni', label: t('dash.flash_mentoring'), icon: GraduationCap, years: [4] },
    { id: 'faculty', label: t('dash.faculty'), icon: School, years: [1, 2, 3, 4] },
    { id: 'excursions', label: t('dash.excursions'), icon: MapPin, years: [1, 2, 3, 4] },
    { id: 'library', label: t('dash.library'), icon: BookOpen, years: [1, 2, 3, 4] },
    { id: 'discussions', label: t('dash.social'), icon: MessageSquare, years: [1, 2, 3, 4] },
    { id: 'badges', label: t('dash.badges'), icon: Award, years: [1, 2, 3, 4] },
    { id: 'settings', label: t('dash.settings'), icon: SettingsIcon, years: [1, 2, 3, 4] },
    { id: 'faq', label: t('dash.support'), icon: HelpCircle, years: [1, 2, 3, 4] },
  ];

  const navButtons = allNavButtons.filter(btn => btn.years.includes(academicYear));

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <Badge className="bg-secondary text-primary font-black mb-4 px-4 py-1.5 rounded-full border-none">
                {t('dash.year_dashboard').replace('{year}', academicYear.toString())}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                {t('dash.welcome_back')}, {shyMode ? 'Peer' : userName}! {shyMode && <span className="text-sm font-normal opacity-70 ml-2">{t('dash.shy_mode_active')}</span>}
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
                {academicYear <= 2 ? t('dash.welcome_desc_y1y2') : 
                 academicYear === 3 ? t('dash.welcome_desc_y3') :
                 t('dash.welcome_desc_y4')}
              </p>
            </div>
            
            <ContactOfficeDialog>
              <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-2xl px-6 py-6 h-auto flex items-center gap-3 font-bold transition-all hover:scale-105 active:scale-95">
                <Headphones size={20} className="text-secondary" />
                {t('dash.contact_office')}
              </Button>
            </ContactOfficeDialog>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button 
              onClick={() => {
                if (academicYear === 3) setView('triad');
                else if (academicYear === 4) setView('alumni');
                else setView('matching');
              }}
              className="w-full sm:w-auto bg-secondary text-primary font-black py-6 px-10 rounded-2xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-3 shadow-2xl group text-base"
            >
              {academicYear >= 3 ? (academicYear === 3 ? t('dash.action_y3') : t('dash.action_y4')) : t('dash.action_y1y2')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => setView('excursions')}
              className="w-full sm:w-auto bg-transparent border-white/30 text-white font-bold py-6 px-8 rounded-2xl hover:bg-white/10 transition-all text-base"
            >
              {t('dash.explore_activities')}
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-yellow-50 border-yellow-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10"><Sparkles size={40} /></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-yellow-400 text-yellow-900 border-none text-[10px]">{t('dash.latest_update')}</Badge>
            </div>
            <p className="font-bold text-yellow-900 leading-tight">
              {t('dash.update_msg')}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-indigo-50 border-indigo-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10"><Target size={40} /></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-indigo-400 text-white border-none text-[10px]">{t('dash.program_value')}</Badge>
            </div>
            <p className="font-bold text-indigo-900 leading-tight">
              {t('dash.value_msg')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[ 
          { label: t('dash.growth_progress'), value: '68%', icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: t('dash.mentor_matches'), value: '3 Active', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
          { label: t('dash.upcoming_events'), value: '2 This Week', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
          { label: t('dash.badges_earned'), value: '12', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layout className="text-primary" />
                {t('dash.milestone_tracker')}
              </h2>
              <span className="text-primary font-bold">42%</span>
            </div>
            <Progress value={42} className="h-3 bg-gray-100 mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[ 
                { title: t('dash.milestone_item1'), status: t('dash.milestone_status_completed'), time: '2 days ago', statusRaw: 'Completed' },
                { title: t('dash.milestone_item2'), status: t('dash.milestone_status_inprogress'), time: 'Tomorrow, 2PM', statusRaw: 'In Progress' },
                { title: t('dash.milestone_item3'), status: t('dash.milestone_status_pending'), time: 'Not started', statusRaw: 'Pending' },
                { title: t('dash.milestone_item4'), status: t('dash.milestone_status_booked'), time: 'Friday, 6PM', statusRaw: 'Booked' }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-transparent hover:border-secondary transition-all group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${task.statusRaw === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-400'}`}>
                    {task.statusRaw === 'Completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{task.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black">{task.time}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] capitalize">{task.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              {t('dash.quick_actions')}
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-xs h-11 border-primary/20 text-slate-700 hover:bg-primary/5 transition-all font-bold rounded-xl"
                onClick={() => setView('library')}
              >
                <BookOpen size={16} className="mr-2 text-primary" />
                {t('dash.quick_success')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-xs h-11 border-primary/20 text-slate-700 hover:bg-primary/5 transition-all font-bold rounded-xl"
                onClick={() => setView('excursions')}
              >
                <MapPin size={16} className="mr-2 text-secondary" />
                {t('dash.quick_excursion')}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">{t('dash.learning_budget')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-gray-500">{t('dash.credits_title')}</span>
                <span className="text-xs font-bold">12 / 20</span>
              </div>
              <Progress value={60} className="h-1.5 bg-slate-100" />
              <p className="text-[10px] text-slate-400 leading-tight italic">
                {t('dash.credits_desc').replace('{year}', academicYear.toString())}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4 md:p-0">
      <div className="flex flex-wrap gap-2 md:gap-3 bg-white p-2 md:p-4 rounded-2xl border border-gray-100 shadow-sm relative z-30 overflow-x-auto no-scrollbar">
        {navButtons.map((btn) => (
          <Button 
            key={btn.id}
            variant={view === btn.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setView(btn.id)}
            className={`flex-none sm:flex-none flex items-center justify-center gap-2 rounded-xl transition-all h-12 md:h-10 ${view === btn.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <btn.icon size={16} />
            <span className="font-bold text-xs md:text-sm">{btn.label}</span>
          </Button>
        ))}
      </div>

      <div className="flex-1 min-h-[calc(100vh-280px)]">
        {view === 'overview' && renderOverview()}
        {view === 'matching' && <MatchingPortal year={academicYear} shyMode={shyMode} onExplore={() => setView('excursions')} />}
        {view === 'badges' && <BadgeRoom />}
        {view === 'excursions' && <ExcursionFeed />}
        {view === 'library' && <LearningLibrary onBack={() => setView('overview')} />}
        {view === 'discussions' && <SocialDiscussions onBack={() => setView('overview')} />}
        {view === 'about' && <AboutMentoring />}
        {view === 'faculty' && <FacultyConnect />}
        {view === 'alumni' && <AlumniConnect />}
        {view === 'faq' && <SupportFAQ />}
        {view === 'triad' && <TriadSection year={academicYear} />}
        {view === 'settings' && <Settings year={academicYear} shyMode={shyMode} />}
        {view === 'search' && <SearchPortal onNavigate={setView} />}
        {view === 'notifications' && <NotificationsCenter />}
      </div>

      <footer className="mt-12 -mx-4 md:-mx-8 p-8 md:p-12 bg-[#0F172A] text-white rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <img src={IMAGES.logo} alt="Strathmore" className="h-10 mb-8 brightness-0 invert opacity-80" />
              <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
                The Mentoring and Services Excellence dashboard is designed to foster a culture of guidance, professional growth, and peer support within the Strathmore community.
              </p>
            </div>
            <div>
              <h4 className="font-black text-secondary mb-6 uppercase tracking-widest text-sm">Platform</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setView('about')} className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('side.about')}</button></li>
                <li><button onClick={() => setView('faculty')} className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('side.faculty')}</button></li>
                <li><button onClick={() => setView('alumni')} className="text-sm text-gray-400 hover:text-secondary transition-colors">{t('side.alumni')}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-secondary mb-6 uppercase tracking-widest text-sm">Support</h4>
              <ul className="space-y-3">
                <li><button onClick={() => setView('faq')} className="text-sm text-gray-400 hover:text-secondary">{t('nav.support')}</button></li>
                <li>
                  <ContactOfficeDialog>
                     <button className="text-sm text-gray-400 hover:text-secondary transition-all">{t('dash.contact_office')}</button>
                  </ContactOfficeDialog>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-xs text-gray-500 font-medium">© {new Date().getFullYear()} Strathmore University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};