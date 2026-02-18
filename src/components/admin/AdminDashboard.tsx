import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Wallet, 
  UserCheck, 
  BarChart3, 
  FileText,
  Award,
  Menu,
  X,
  ShieldCheck,
  Search,
  Users,
  Eye,
  Settings,
  ShieldAlert,
  History,
  Info,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';

// Sub-components
import AnalyticsHeatmap from './AnalyticsHeatmap';
import AwarenessCMS from './AwarenessCMS';
import BudgetTracker from './BudgetTracker';
import MentorVerification from './MentorVerification';
import MilestoneMonitor from './MilestoneMonitor';
import FeedbackLog from './FeedbackLog';
import CertificateIssuer from './CertificateIssuer';
import AuditTrail from './AuditTrail';
import AdminFeatureList from './AdminFeatureList';

interface AdminDashboardProps {
  onImpersonate: (year: number) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onImpersonate, onLogout }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedYearView, setSelectedYearView] = useState('1');

  const menuItems = [
    { id: 'analytics', label: t('admin.readiness_analytics'), icon: BarChart3 },
    { id: 'budget', label: t('admin.logistics_budget'), icon: Wallet },
    { id: 'verification', label: t('admin.audit'), icon: ShieldCheck },
    { id: 'audit', label: t('admin.logs'), icon: History },
    { id: 'certificates', label: t('admin.issue_certs'), icon: Award },
    { id: 'cms', label: t('admin.cms'), icon: Video },
    { id: 'feedback', label: t('admin.transformation_log'), icon: FileText },
    { id: 'features', label: t('admin.system_roadmap'), icon: Info },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-2xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Admin Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed lg:static lg:translate-x-0 z-40
        w-72 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
        transition-transform duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none
      `}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{t('admin.hq')}</h2>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.2em] font-black">{t('admin.command')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
          <div className="pb-4 mb-4 border-b border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-4">{t('admin.system_views')}</p>
             {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 ring-2 ring-indigo-50' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600'}
                `}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'group-hover:text-indigo-600'} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="pt-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-4">{t('admin.student_ui_tools')}</p>
            <div className="px-4 space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase">{t('admin.target_year')}</label>
                <Select value={selectedYearView} onValueChange={setSelectedYearView}>
                  <SelectTrigger className="h-9 font-bold text-xs bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t('login.year_1')}</SelectItem>
                    <SelectItem value="2">{t('login.year_2')}</SelectItem>
                    <SelectItem value="3">{t('login.year_3')}</SelectItem>
                    <SelectItem value="4">{t('login.year_4')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full h-10 border-indigo-100 text-indigo-700 font-bold text-[10px] uppercase tracking-wider hover:bg-indigo-50"
                onClick={() => onImpersonate(parseInt(selectedYearView))}
              >
                <Eye size={14} className="mr-2" /> {t('admin.view_as_student')}
              </Button>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50">
          <Button 
            variant="outline" 
            className="w-full justify-center font-black text-[10px] uppercase tracking-widest text-red-500 hover:text-red-600 hover:bg-red-50 h-11 border-2 border-slate-200 hover:border-red-100 transition-all" 
            onClick={onLogout}
          >
            <LogOut size={14} className="mr-2" />
            {t('admin.logout_system')}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto p-4 md:p-10 space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 font-black text-[10px] uppercase tracking-widest px-2 py-0.5 border border-indigo-200/50">
                  {t('admin.panel_title')}
                </Badge>
                <div className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HQ / {activeTab}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white tracking-tight">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-slate-500 mt-2 max-w-2xl font-medium text-sm leading-relaxed hidden sm:block">
                {t('admin.panel_desc')}
              </p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex -space-x-2 hidden sm:flex">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-right pr-2">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{t('admin.live_admins').replace('{count}', '3')}</p>
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest">{t('admin.active_monitoring')}</p>
                  </div>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 border border-slate-100 rounded-xl h-12 w-12"
                      onClick={onLogout}
                    >
                      <LogOut size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-[10px] font-bold uppercase">{t('admin.logout_system')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>

          <div className="w-full transition-all duration-300">
            {activeTab === 'analytics' && <AnalyticsHeatmap />}
            {activeTab === 'budget' && <BudgetTracker />}
            {activeTab === 'verification' && <MentorVerification />}
            {activeTab === 'audit' && <AuditTrail />}
            {activeTab === 'certificates' && <CertificateIssuer />}
            {activeTab === 'cms' && <AwarenessCMS />}
            {activeTab === 'feedback' && <FeedbackLog />}
            {activeTab === 'features' && <AdminFeatureList />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;