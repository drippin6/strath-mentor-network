import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, GraduationCap, Briefcase, Home, Compass, UserCircle, FolderKanban, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RequestMentorshipDialog } from './RequestMentorshipDialog';
import { ExploreProjectsDialog } from './ExploreProjectsDialog';
import { COURSES } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

type MentorType = 'student' | 'staff' | 'alumni' | 'professional';

interface Mentor {
  id: string;
  name: string;
  course: string;
  year: string;
  type: MentorType;
  skills: string[];
  badges: string[];
  description: string;
  avatar: string;
  strength: string;
}

const MOCK_AVATARS = [
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/mentor-male-1-b716fe4c-1770898625825.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/mentor-female-1-f678ffde-1770898625471.webp',
  'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/mentor-general-1-7958fb01-1770898630742.webp'
];

const MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Faith Chebet',
    course: 'Bachelor of Commerce (BCom)',
    year: '4th Year',
    type: 'student',
    skills: ['Accounting', 'Financial Modeling', 'Public Speaking'],
    badges: ['Goal Crusher', 'Connector'],
    description: 'Specializing in finance with a passion for helping peers navigate complex accounting concepts.',
    avatar: MOCK_AVATARS[1],
    strength: 'Academic excellence and time management.'
  },
  {
    id: '2',
    name: 'Mark Kamau',
    course: 'Bachelor of Science in Computer Science',
    year: '3rd Year',
    type: 'student',
    skills: ['Python', 'Data Structures', 'UI/UX Design'],
    badges: ['Knowledge Seeker', 'Tech Innovator'],
    description: 'Tech enthusiast who loves mentoring junior students in coding and project development.',
    avatar: MOCK_AVATARS[0],
    strength: 'Technical projects and internship preparation.'
  },
  {
    id: '3',
    name: 'Anita Wangari',
    course: 'Bachelor of Laws (LLB)',
    year: '5th Year',
    type: 'student',
    skills: ['Research', 'Legal Writing', 'Debate'],
    badges: ['Public Speaker', 'Leader'],
    description: 'Final year law student focused on corporate law and moot court competitions.',
    avatar: MOCK_AVATARS[1],
    strength: 'Critical thinking and research methodology.'
  },
  {
    id: '4',
    name: 'John Doe',
    course: 'Bachelor of Science in Informatics and Computer Science',
    year: '2nd Year',
    type: 'student',
    skills: ['Networking', 'Cybersecurity', 'Linux'],
    badges: ['Quick Learner'],
    description: 'Passionate about cybersecurity and ethical hacking.',
    avatar: MOCK_AVATARS[0],
    strength: 'Practical lab skills and networking basics.'
  },
  {
    id: '5',
    name: 'Sarah Omondi',
    course: 'Bachelor of Science in Finance',
    year: '4th Year',
    type: 'student',
    skills: ['Investment', 'Risk Management'],
    badges: ['Financial Guru'],
    description: 'Expert in stock market trends and wealth management.',
    avatar: MOCK_AVATARS[1],
    strength: 'Portfolio analysis and market research.'
  },
  {
    id: '6',
    name: 'Lucas Sang',
    course: 'Bachelor of Business Information Technology (BBIT)',
    year: 'Grad Alumni',
    type: 'alumni',
    skills: ['ERP Systems', 'SQL', 'Project Management'],
    badges: ['Industry Leader'],
    description: 'Working professional offering career transition advice.',
    avatar: MOCK_AVATARS[2],
    strength: 'Corporate networking and interview skills.'
  },
  {
    id: '7',
    name: 'David Otieno',
    course: 'Bachelor of Science in Financial Economics',
    year: '3rd Year',
    type: 'student',
    skills: ['Econometrics', 'Stata', 'Excel'],
    badges: ['Data Wizard'],
    description: 'Love exploring data to find economic trends.',
    avatar: MOCK_AVATARS[0],
    strength: 'Statistical analysis and economic modeling.'
  },
  {
    id: '13',
    name: 'Dr. Caroline Mutoko',
    course: 'Faculty of Humanities and Social Sciences',
    year: 'Senior Lecturer',
    type: 'staff',
    skills: ['Curriculum Design', 'Academic Research', 'Mentorship'],
    badges: ['Expert Educator'],
    description: 'Dedicated to helping students achieve academic excellence and research depth.',
    avatar: MOCK_AVATARS[1],
    strength: 'Academic guidance and research methodology.'
  },
  {
    id: '14',
    name: 'Eng. Patrick Njoroge',
    course: 'Industry Professional',
    year: '10+ Years Exp',
    type: 'professional',
    skills: ['Structural Engineering', 'Leadership', 'Project Execution'],
    badges: ['Industry Titan'],
    description: 'Professional engineer with extensive experience in the Kenyan construction sector.',
    avatar: MOCK_AVATARS[0],
    strength: 'Career pathing and industry insights.'
  },
  {
    id: '8',
    name: 'Brenda Juma',
    course: 'Bachelor of Arts in International Studies',
    year: '4th Year',
    type: 'student',
    skills: ['Diplomacy', 'Foreign Languages', 'Negotiation'],
    badges: ['Global Citizen'],
    description: 'Aspiring diplomat with experience in Model UN.',
    avatar: MOCK_AVATARS[1],
    strength: 'Conflict resolution and intercultural communication.'
  },
  {
    id: '9',
    name: 'Peter Mwangi',
    course: 'Bachelor of Business Science in Actuarial Science',
    year: '3rd Year',
    type: 'student',
    skills: ['Calculus', 'Insurance', 'Probability'],
    badges: ['Math Pro'],
    description: 'Helping students bridge the gap between theory and actuarial practice.',
    avatar: MOCK_AVATARS[0],
    strength: 'Mathematical foundations and exam prep.'
  },
  {
    id: '15',
    name: 'Prof. Silas Omolo',
    course: 'School of Computing and Engineering Sciences',
    year: 'Dean of Students',
    type: 'staff',
    skills: ['Soft Skills', 'Leadership', 'Ethics'],
    badges: ['Visionary Leader'],
    description: 'Guiding students to be responsible and ethical leaders in the tech industry.',
    avatar: MOCK_AVATARS[0],
    strength: 'Holistic development and ethical leadership.'
  },
  {
    id: '16',
    name: 'Mercy Achieng',
    course: 'Alumni Network - Strathmore',
    year: 'Alumna 2018',
    type: 'alumni',
    skills: ['Marketing', 'Brand Management', 'Startups'],
    badges: ['Entrepreneur'],
    description: 'Sharing my journey from a student to a successful marketing entrepreneur.',
    avatar: MOCK_AVATARS[1],
    strength: 'Startup scaling and digital marketing.'
  }
];

interface MatchingPortalProps {
  year?: number;
  shyMode?: boolean;
  onBack?: () => void;
  onExplore?: () => void;
}

export const MatchingPortal: React.FC<MatchingPortalProps> = ({ year = 1, shyMode, onBack, onExplore }) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const filteredMentors = useMemo(() => {
    return MENTORS.filter(mentor => {
      // Search filter
      const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase()) || 
                           mentor.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      // Course filter
      const matchesCourse = selectedCourses.length === 0 || selectedCourses.includes(mentor.course);

      // Year-based matching logic
      let matchesYearRequirement = true;
      if (year === 1 || year === 2) {
        matchesYearRequirement = mentor.type === 'student';
      } else if (year === 3) {
        matchesYearRequirement = ['student', 'staff', 'alumni'].includes(mentor.type);
      } else if (year >= 4) {
        matchesYearRequirement = ['alumni', 'professional'].includes(mentor.type);
      }

      return matchesSearch && matchesCourse && matchesYearRequirement;
    });
  }, [search, selectedCourses, year]);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
                <Home size={20} className="text-gray-500" />
              </Button>
            )}
            <div>
              <h2 className="text-3xl font-black text-gray-900">{t('matching.title')}</h2>
              <p className="text-gray-500 font-medium">
                {year >= 4 ? t('matching.industry_experts') : t('matching.big_bro_sis')}
              </p>
              <Badge variant="outline" className="mt-2 bg-primary/5 text-primary border-primary/20">
                {t('matching.year_access').replace('{year}', year.toString())}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button 
              onClick={onExplore}
              variant="secondary"
              className="bg-primary/5 hover:bg-primary/10 text-primary font-bold border-none flex items-center gap-2 rounded-xl transition-all h-10 px-4"
            >
              <Compass size={18} />
              {t('dash.explore_activities')}
            </Button>
            <Button 
              onClick={() => setIsProjectsOpen(true)}
              variant="secondary"
              className="bg-secondary/10 hover:bg-secondary/20 text-primary font-bold border-none flex items-center gap-2 rounded-xl transition-all h-10 px-4"
            >
              <FolderKanban size={18} />
              {t('matching.active_projects')}
            </Button>
            <Button 
              onClick={() => setIsProjectsOpen(true)}
              variant="outline"
              className="border-primary/20 text-primary font-bold flex items-center gap-2 rounded-xl transition-all h-10 px-4 hover:bg-primary/5"
            >
              <PlusCircle size={18} />
              {t('matching.propose_project')}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder={t('matching.search_placeholder')}
              className="pl-9 py-6 rounded-xl border-gray-100 shadow-sm focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 flex items-center gap-2 px-6 rounded-xl border-gray-100 shadow-sm hover:bg-gray-50 transition-all">
                <Filter className="w-4 h-4" />
                {t('matching.filter')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 max-h-[400px] overflow-y-auto p-2">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-black text-gray-400 uppercase">{t('matching.filter_course')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {COURSES.map(course => (
                <DropdownMenuCheckboxItem
                  key={course}
                  checked={selectedCourses.includes(course)}
                  onCheckedChange={() => toggleCourse(course)}
                  className="rounded-lg text-sm"
                >
                  {course}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredMentors.map((mentor) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={mentor.id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-6">
                <Avatar className="w-20 h-20 border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                  <AvatarImage src={mentor.avatar} className="object-cover" />
                  <AvatarFallback className="bg-primary text-white font-bold">{mentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">{mentor.name}</h3>
                    {mentor.type !== 'student' && (
                       <Badge variant="secondary" className="bg-gold/10 text-gold-700 text-[8px] uppercase font-black px-1.5 py-0 border-none">
                         {mentor.type}
                       </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs font-bold text-secondary mt-1 uppercase tracking-tighter">
                    {mentor.type === 'student' ? <GraduationCap className="w-3 h-3 mr-1" /> : <UserCircle className="w-3 h-3 mr-1" />}
                    {mentor.year}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{mentor.course}</p>
                </div>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">"{mentor.description}"</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Star className="w-3 h-3 text-secondary" />
                    {t('matching.achieved_badges')}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.badges.map(badge => (
                      <Badge key={badge} variant="secondary" className="bg-secondary/10 text-primary hover:bg-secondary/20 border-none text-[10px] font-bold py-1">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Briefcase className="w-3 h-3 text-primary" />
                    {t('matching.core_skills')}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-[10px] font-bold border-gray-100">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t mt-auto">
                  <p className="text-xs text-primary font-bold">
                    {t('matching.strength')} <span className="text-gray-600 font-medium italic">{mentor.strength}</span>
                  </p>
                </div>

                <RequestMentorshipDialog mentorName={mentor.name}>
                  <Button className="w-full bg-primary hover:bg-primary/90 py-6 rounded-2xl font-bold shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-all">
                    {t('matching.request_mentorship')}
                  </Button>
                </RequestMentorshipDialog>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 animate-in fade-in zoom-in-95">
          <p className="text-gray-500 font-medium">{t('matching.no_mentors')}</p>
          <Button variant="link" onClick={() => { setSearch(''); setSelectedCourses([]); }} className="text-primary font-bold">
            {t('matching.clear_filters')}
          </Button>
        </div>
      )}

      <ExploreProjectsDialog 
        open={isProjectsOpen} 
        onOpenChange={setIsProjectsOpen}
      />
    </div>
  );
};