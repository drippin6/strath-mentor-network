import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Globe,
  Briefcase,
  Monitor,
  Heart,
  Scale,
  Zap,
  BookOpen,
  Send
} from 'lucide-react';
import { ExploreProjectsDialog } from './ExploreProjectsDialog';
import { useLanguage } from '@/contexts/LanguageContext';

export const FacultyConnect: React.FC = () => {
  const { t } = useLanguage();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const FACULTIES = [
    { 
      name: t('faculty.sbs'), 
      abbr: 'SBS', 
      icon: Briefcase, 
      color: 'bg-blue-500', 
      count: 120, 
      desc: t('faculty.sbs_desc') 
    },
    { 
      name: t('faculty.scit'), 
      abbr: 'SCIT', 
      icon: Monitor, 
      color: 'bg-green-500', 
      count: 85, 
      desc: t('faculty.scit_desc') 
    },
    { 
      name: t('faculty.sls'), 
      abbr: 'SLS', 
      icon: Scale, 
      color: 'bg-maroon-600', 
      count: 45, 
      desc: t('faculty.sls_desc') 
    },
    { 
      name: t('faculty.shss'), 
      abbr: 'SHSS', 
      icon: Heart, 
      color: 'bg-orange-500', 
      count: 60, 
      desc: t('faculty.shss_desc') 
    },
    { 
      name: t('faculty.ims'), 
      abbr: 'IMS', 
      icon: Zap, 
      color: 'bg-indigo-600', 
      count: 30, 
      desc: t('faculty.ims_desc') 
    },
    { 
      name: t('faculty.sth'), 
      abbr: 'STH', 
      icon: Globe, 
      color: 'bg-yellow-600', 
      count: 40, 
      desc: t('faculty.sth_desc') 
    }
  ];

  const handleConnect = (facultyName: string) => {
    toast.success(`${t('faculty.connect')} request sent to ${facultyName} mentors!`, {
      description: 'You will be notified once a mentor accepts your request.',
      icon: <Send className="w-4 h-4 text-green-500" />
    });
  };

  const handleForum = () => {
    toast.info(`${t('faculty.forum')}...`, {
      description: "Join the conversation across all departments.",
      icon: <BookOpen className="w-4 h-4 text-primary" />
    });
  };

  const handleGlobalChat = () => {
    toast.info(`${t('faculty.global_chat')}...`, {
      description: "Real-time communication with students and faculty.",
      icon: <MessageSquare className="w-4 h-4 text-primary" />
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-primary mb-2">{t('faculty.title')}</h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">{t('faculty.desc')}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="rounded-xl font-bold border-gray-200 w-full sm:w-auto hover:bg-gray-50 active:scale-95 transition-all"
            onClick={handleForum}
          >
             {t('faculty.forum')}
          </Button>
          <Button 
            className="bg-primary text-white rounded-xl font-bold px-6 w-full sm:w-auto hover:bg-primary/90 active:scale-95 transition-all"
            onClick={handleGlobalChat}
          >
             <MessageSquare className="w-4 h-4 mr-2" /> {t('faculty.global_chat')}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FACULTIES.map((faculty, i) => (
          <Card key={i} className="group hover:shadow-xl transition-all border-none shadow-sm rounded-3xl overflow-hidden bg-white">
            <div className={`h-2 ${faculty.color}`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${faculty.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <faculty.icon size={28} />
                </div>
                <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px]">
                  {faculty.abbr}
                </Badge>
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{faculty.name}</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium line-clamp-2">{faculty.desc}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Users size={16} />
                  <span>{t('faculty.mentors_count').replace('{count}', faculty.count.toString())}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/80 hover:bg-primary/5 font-black p-0 group-hover:px-2 transition-all"
                  onClick={() => handleConnect(faculty.abbr)}
                >
                  {t('faculty.connect')} <ArrowUpRight size={16} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="relative rounded-[2rem] md:rounded-[3xl] overflow-hidden bg-primary p-8 md:p-12 text-white shadow-2xl">
         <div className="absolute inset-0 opacity-20">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/faculty-connect-bg-7391eac1-1770917751366.webp" 
              alt="Faculty Background" 
              className="w-full h-full object-cover" 
            />
         </div>
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-4">{t('faculty.research_hub')}</h2>
              <p className="text-white/80 font-medium max-w-xl mx-auto lg:mx-0">
                {t('faculty.research_desc')}
              </p>
            </div>
            <Button 
              className="w-full lg:w-auto bg-secondary text-primary font-black px-10 py-7 rounded-2xl text-lg hover:bg-secondary/90 transition-all shadow-xl whitespace-nowrap active:scale-95"
              onClick={() => setIsProjectsOpen(true)}
            >
               {t('faculty.explore_projects')}
            </Button>
         </div>
      </section>

      <ExploreProjectsDialog 
        open={isProjectsOpen} 
        onOpenChange={setIsProjectsOpen} 
      />
    </div>
  );
};