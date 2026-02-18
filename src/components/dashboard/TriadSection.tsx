import React, { useState } from 'react';
import { 
  Layers, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  Info,
  Star,
  Zap,
  Lock,
  CheckCircle2,
  FolderKanban,
  PlusCircle
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RequestMentorshipDialog } from './RequestMentorshipDialog';
import { ProfileViewDialog } from './ProfileViewDialog';
import { ExploreProjectsDialog } from './ExploreProjectsDialog';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface TriadSectionProps {
  year?: number;
}

export const TriadSection: React.FC<TriadSectionProps> = ({ year = 3 }) => {
  const { t } = useLanguage();
  const isEligible = year >= 3;
  const [isAttendanceConfirmed, setIsAttendanceConfirmed] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProposeMode, setIsProposeMode] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>(['Academic Excellence']);

  const handleConfirmAttendance = () => {
    setIsAttendanceConfirmed(true);
    toast.success(t('triad.attendance_confirmed'), {
      description: "You've successfully confirmed your attendance for the Triad meeting on Oct 24th.",
      duration: 4000,
    });
  };

  const toggleFocusArea = (area: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const openProjects = (propose = false) => {
    setIsProposeMode(propose);
    setIsProjectsOpen(true);
  };

  if (!isEligible) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <Lock className="text-gray-400 w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">{t('triad.restricted_title')}</h2>
        <p className="text-gray-500 max-w-lg mb-8 text-lg font-medium leading-relaxed">
          {t('triad.restricted_desc').replace('{span}', t('triad.restricted_span'))}
        </p>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm max-w-md w-full">
          <p className="text-sm text-gray-600 mb-0">
            {t('triad.current_status')} <Badge variant="secondary" className="ml-2">{t('login.year_short')}{year} Student</Badge>
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>{t('triad.progress_to_y3')}</span>
              <span>{Math.min((year / 3) * 100, 100).toFixed(0)}%</span>
            </div>
            <Progress value={(year / 3) * 100} className="h-2 bg-gray-50" />
          </div>
        </div>
      </div>
    );
  }

  const members = [
    {
      role: 'Peer Mentor',
      name: 'Grace Wambui',
      year: '4th Year',
      status: 'Active',
      icon: Users,
      color: 'bg-blue-500',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/grace-wambui-profile-b9f65b0f-1771096547859.webp',
      description: 'Senior student guide specializing in Computer Science, helping juniors navigate complex coursework and campus leadership opportunities.'
    },
    {
      role: 'Alumni Mentor',
      name: 'Lucas Sang',
      year: 'Class of 2022',
      status: 'Active',
      icon: GraduationCap,
      color: 'bg-secondary',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/lucas-sang-profile-36c2aaa2-1771096547591.webp',
      description: 'Software Engineer at Safaricom with a passion for FinTech. Providing industry insights and resume optimization for graduating seniors.'
    },
    {
      role: 'Industry Professional',
      name: 'Dr. Kevin Otieno',
      year: 'Deloitte',
      status: 'Matching...',
      icon: Briefcase,
      color: 'bg-accent',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/dr--kevin-otieno-profile-a29a4cd0-1771096547492.webp',
      description: 'Strategic consultant with over 15 years of experience in digital transformation. Offering high-level professional standards and networking.'
    }
  ];

  const focusAreas = [
    'Academic Excellence',
    'Career Readiness',
    'Technical Mastery',
    'Soft Skills',
    'Networking',
    'Research'
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2 md:px-0">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
            <Layers className="text-primary w-8 h-8" />
            {t('triad.title')}
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mt-2">
            {t('triad.desc')}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              onClick={() => openProjects(false)}
              className="bg-primary/5 hover:bg-primary/10 text-primary font-bold border-none flex items-center gap-2 rounded-xl transition-all h-10 px-4"
            >
              <FolderKanban size={16} />
              {t('triad.active_projects')}
            </Button>
            <Button 
              onClick={() => openProjects(true)}
              variant="outline"
              className="border-primary/20 text-primary font-bold flex items-center gap-2 rounded-xl transition-all h-10 px-4 hover:bg-primary/5"
            >
              <PlusCircle size={16} />
              {t('triad.propose_project')}
            </Button>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full font-bold flex items-center gap-2 whitespace-nowrap self-start md:self-center">
          <Zap size={14} />
          {t('triad.optimal_support')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {members.map((member, i) => (
          <Card key={i} className="group hover:shadow-2xl transition-all border-none shadow-sm rounded-[2rem] overflow-hidden bg-white flex flex-col">
            <div className={`h-2 ${member.color}`} />
            <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden border-4 border-gray-50 shadow-md">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <Badge variant={member.status === 'Active' ? 'default' : 'outline'} className={member.status === 'Active' ? 'bg-green-500 hover:bg-green-600 border-none text-white' : 'text-gray-400 border-gray-200'}>
                  {member.status}
                </Badge>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <member.icon size={16} className="text-gray-400" />
                  <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest">{member.role}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-primary transition-colors truncate">{member.name}</h3>
                <p className="text-xs sm:text-sm font-bold text-primary/70">{member.year}</p>
              </div>

              <p className="text-sm text-gray-500 mb-8 leading-relaxed flex-1">
                {member.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 mt-auto">
                <RequestMentorshipDialog mentorName={member.name}>
                  <Button className="w-full sm:flex-1 bg-gray-900 text-white font-bold rounded-2xl h-12 sm:h-14 hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-gray-200 text-sm sm:text-base">
                    <span className="truncate">{member.status === 'Active' ? t('alumni.message') : t('faculty.connect')}</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform shrink-0" />
                  </Button>
                </RequestMentorshipDialog>
                <ProfileViewDialog member={member}>
                  <Button variant="outline" className="w-full sm:flex-1 px-4 sm:px-6 h-12 sm:h-14 rounded-2xl border-gray-100 text-primary hover:bg-primary/5 transition-all font-bold whitespace-nowrap text-sm sm:text-base">
                    {t('alumni.view_profile')}
                  </Button>
                </ProfileViewDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-[2rem] bg-[#0F172A] text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-secondary" />
              {t('triad.goals_title')}
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Academic Excellence (Peer)', progress: 85 },
                { label: 'Career Readiness (Alumni)', progress: 40 },
                { label: 'Technical Mastery (Professional)', progress: 15 }
              ].map((goal, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
                    <span className="truncate mr-2">{goal.label}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-1.5 sm:h-2 bg-white/10" />
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t('triad.focus_areas')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {focusAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleFocusArea(area)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left group/area ${
                      selectedFocusAreas.includes(area) 
                        ? 'bg-primary/20 border-primary/50 text-primary' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold">{area}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      selectedFocusAreas.includes(area) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                      <CheckCircle2 size={14} className="text-primary fill-primary/10" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-none shadow-sm rounded-[2rem] bg-white p-6 sm:p-8 border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">{t('triad.next_meeting')}</h3>
          <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[1.5rem] bg-gray-50 border border-gray-100">
            <div className="text-center px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
              <span className="block text-[10px] font-black text-gray-400 uppercase">Oct</span>
              <span className="block text-xl sm:text-2xl font-black text-primary">24</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Collaborative Feedback Session</h4>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Users size={14} /> {t('triad.full_triad_present')}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-primary/10 text-primary border-none text-[10px] px-2">2:00 PM</Badge>
                <Badge className="bg-secondary/10 text-primary border-none text-[10px] px-2">Virtual Hall</Badge>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleConfirmAttendance}
            disabled={isAttendanceConfirmed}
            className={`w-full mt-6 font-black h-12 sm:h-14 md:h-16 rounded-2xl transition-all text-sm sm:text-base px-4 shadow-lg flex items-center justify-center gap-2 ${
              isAttendanceConfirmed 
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-200 cursor-default' 
                : 'bg-secondary text-primary hover:bg-secondary/90 shadow-secondary/10'
            }`}
          >
            {isAttendanceConfirmed ? (
              <>
                <CheckCircle2 size={20} />
                {t('triad.attendance_confirmed')}
              </>
            ) : (
              t('triad.confirm_attendance')
            )}
          </Button>
        </Card>
      </div>

      <div className="bg-primary/5 rounded-[2rem] p-6 sm:p-10 border border-primary/10">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
            <Info size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{t('triad.about_title')}</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {t('triad.about_desc')}
            </p>
          </div>
        </div>
      </div>

      <ExploreProjectsDialog 
        open={isProjectsOpen} 
        onOpenChange={setIsProjectsOpen}
      />
    </div>
  );
};