import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Trophy, 
  Users, 
  BookOpen, 
  LogOut,
  Briefcase,
  Layers,
  School,
  GraduationCap,
  Info,
  HelpCircle,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  year: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onLogout, year, isOpen, onClose }) => {
  const { t } = useLanguage();
  const isY1Y2 = year <= 2;
  const isY4 = year === 4;

  const NAV_ITEMS = [
    { id: 'overview', label: t('side.home'), icon: LayoutDashboard },
    { id: 'triad', label: t('side.triad'), icon: Layers },
    { 
      id: 'matching', 
      label: isY4 ? t('side.industry') : (isY1Y2 ? t('side.big_bro') : t('side.matching')), 
      icon: isY4 ? Briefcase : Users 
    },
    { id: 'faculty', label: t('side.faculty'), icon: School },
    { id: 'alumni', label: t('side.alumni'), icon: GraduationCap },
    { id: 'excursions', label: t('side.excursions'), icon: Compass },
    { id: 'badges', label: t('side.badges'), icon: Trophy },
    { id: 'library', label: t('side.library'), icon: BookOpen },
    { id: 'divider-1', label: t('side.platform'), type: 'divider' },
    { id: 'search', label: t('side.search'), icon: Search },
    { id: 'notifications', label: t('nav.notifications'), icon: Bell },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
    { id: 'divider-2', label: t('side.faq'), type: 'divider' },
    { id: 'about', label: t('side.about'), icon: Info },
    { id: 'faq', label: t('side.faq'), icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-primary border-r border-primary/20 p-4 overflow-y-auto">
      <div className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl shadow-lg ring-4 ring-white/10">S</div>
          <div className="flex flex-col">
            <span className="font-black text-white leading-none tracking-tight">Strathmore</span>
            <span className="text-[10px] text-secondary font-black tracking-widest uppercase">University</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          if (item.type === 'divider') {
            return (
              <div key={item.id} className="pt-4 pb-2 px-4">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</span>
              </div>
            );
          }

          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                if (onClose) onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left",
                isActive 
                  ? "bg-white text-primary shadow-xl scale-[1.02]" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "text-white/50")} />
              <span className="font-bold truncate text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/50 hover:bg-red-500/20 hover:text-red-100 transition-all text-left group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-sm">{t('side.sign_out')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
          <SheetContent side="left" className="p-0 w-72 border-none bg-primary">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <aside className={cn(
        "hidden lg:block h-full flex-shrink-0 transition-all duration-300",
        isOpen ? "w-72" : "w-0 overflow-hidden"
      )}>
        <SidebarContent />
      </aside>
    </>
  );
};