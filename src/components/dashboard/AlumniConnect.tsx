import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  MapPin, 
  Briefcase,
  Users,
  Award,
  MessageCircle,
  Filter,
  Globe,
  Mail,
  Linkedin,
  Quote,
  X,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { supabase, registerMentor } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

interface Alumnus {
  id: number;
  name: string;
  year: number;
  company: string;
  role: string;
  location: string;
  image: string;
  bio: string;
  skills: string[];
  email: string;
  linkedin: string;
}

const ALUMNI_DATA: Alumnus[] = [
  { 
    id: 1, 
    name: 'Grace Muli', 
    year: 2023, 
    company: 'Safaricom PLC', 
    role: 'Data Scientist', 
    location: 'Nairobi', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
    bio: 'Passionate about leveraging data to solve complex business problems in the telecommunications sector. Class of 2023 Valedictorian.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    email: 'grace.muli@alumni.strathmore.edu',
    linkedin: 'linkedin.com/in/gracemuli'
  },
  { 
    id: 2, 
    name: 'Brian Koech', 
    year: 2021, 
    company: 'Google', 
    role: 'Software Engineer', 
    location: 'Dublin', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brian',
    bio: 'Building scalable infrastructure at Google. Always happy to mentor students interested in big tech and distributed systems.',
    skills: ['Go', 'Kubernetes', 'GCP', 'Java'],
    email: 'brian.koech@google.com',
    linkedin: 'linkedin.com/in/briankoech'
  },
  { 
    id: 3, 
    name: 'Sarah Omondi', 
    year: 2018, 
    company: 'Standard Chartered', 
    role: 'Investment Analyst', 
    location: 'Nairobi', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Experienced in financial modeling and asset management. Strathmore Finance Society Alumna.',
    skills: ['Financial Modeling', 'Excel', 'Bloomberg Terminal', 'CFA'],
    email: 'sarah.o@stanchart.com',
    linkedin: 'linkedin.com/in/sarahomondi'
  },
  { 
    id: 4, 
    name: 'Kevin Otieno', 
    year: 2015, 
    company: 'Deloitte', 
    role: 'Audit Manager', 
    location: 'London', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    bio: 'Specializing in external audit for financial institutions. Currently based in Deloitte London office.',
    skills: ['Audit', 'Taxation', 'IFRS', 'Team Leadership'],
    email: 'kotieno@deloitte.co.uk',
    linkedin: 'linkedin.com/in/kevinotieno'
  },
  { 
    id: 5, 
    name: 'Maria Santos', 
    year: 2010, 
    company: 'UNICEF', 
    role: 'Project Coordinator', 
    location: 'Geneva', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    bio: 'Dedicated to humanitarian aid and sustainable development projects across the globe.',
    skills: ['Project Management', 'Public Policy', 'Grant Writing', 'Advocacy'],
    email: 'msantos@unicef.org',
    linkedin: 'linkedin.com/in/mariasantos'
  },
  { 
    id: 6, 
    name: 'Lucas Sang', 
    year: 2005, 
    company: 'SBM Bank', 
    role: 'Head of Operations', 
    location: 'Nairobi', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    bio: 'Veteran in the banking industry with over 15 years of experience in operations and risk management.',
    skills: ['Strategic Planning', 'Risk Management', 'Banking Ops', 'Compliance'],
    email: 'l.sang@sbmbank.co.ke',
    linkedin: 'linkedin.com/in/lucassang'
  },
  { 
    id: 7, 
    name: 'Achieng L.', 
    year: 2004, 
    company: 'Entrepreneur', 
    role: 'Founder, TechNexus', 
    location: 'Lagos', 
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Achieng',
    bio: 'Passionate about building the African tech ecosystem. Investor and mentor to several fintech startups.',
    skills: ['Entrepreneurship', 'Venture Capital', 'Growth Strategy', 'Product Design'],
    email: 'achieng@technexus.africa',
    linkedin: 'linkedin.com/in/achiengl'
  },
];

export const AlumniConnect: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumnus | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    expertise: '',
    company: '',
    role: '',
    years_of_experience: '',
    linkedin_url: '',
    bio: ''
  });

  const years = Array.from({ length: 2024 - 2004 + 1 }, (_, i) => 2004 + i).reverse();

  const filteredAlumni = ALUMNI_DATA.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          alumnus.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'all' || alumnus.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  const handleRegisterMentor = () => {
    setIsRegistering(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await registerMentor({
        ...formData,
        user_id: user?.id,
        years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : undefined
      });

      toast.success("Registration successful!", {
        description: "Your application has been received. We will contact you shortly.",
      });
      setIsRegistering(false);
      setFormData({
        full_name: '',
        email: '',
        expertise: '',
        company: '',
        role: '',
        years_of_experience: '',
        linkedin_url: '',
        bio: ''
      });
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "An error occurred while submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessage = (name: string) => {
    toast.info(`Opening chat with ${name}...`);
  };

  const handleRequestMentorship = (name: string) => {
    toast.success(`Request sent to ${name}!`, {
      description: "They will review your profile and get back to you soon.",
    });
    setSelectedAlumnus(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="relative rounded-[2.5rem] overflow-hidden bg-accent p-10 md:p-16 text-white min-h-[350px] flex flex-col justify-end shadow-2xl shadow-primary/10">
         <div className="absolute inset-0">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/alumni-connect-bg-0295a8db-1770917751805.webp" 
              alt="Alumni Background" 
              className="w-full h-full object-cover opacity-40" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-transparent" />
         </div>
         <div className="relative z-10">
            <Badge className="bg-secondary text-primary font-black mb-6 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-lg border-none">
              {t('alumni.hero_badge')}
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none">{t('alumni.hero_title')}</h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl leading-relaxed">
              {t('alumni.hero_desc')}
            </p>
         </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <Input 
            placeholder={t('alumni.search_placeholder')}
            className="pl-14 h-16 rounded-2xl border-gray-100 focus-visible:ring-primary shadow-none text-base bg-gray-50/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <Button 
              variant={selectedYear === 'all' ? 'default' : 'ghost'}
              onClick={() => setSelectedYear('all')}
              className={`rounded-xl font-bold whitespace-nowrap h-12 px-6 transition-all ${selectedYear === 'all' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
            >
              {t('alumni.all_years')}
            </Button>
            {years.slice(0, 3).map(year => (
              <Button 
                key={year}
                variant={selectedYear === year ? 'default' : 'ghost'}
                onClick={() => setSelectedYear(year)}
                className={`rounded-xl font-bold h-12 px-6 transition-all ${selectedYear === year ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
              >
                {year}
              </Button>
            ))}
          </div>
          <div className="relative">
            <select 
              className="appearance-none pl-6 pr-12 h-16 bg-white border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 text-gray-700 shadow-sm cursor-pointer"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            >
               <option value="all">{t('alumni.full_history')}</option>
               {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <Filter size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlumni.map((alumnus) => (
          <Card key={alumnus.id} className="group hover:shadow-2xl transition-all duration-300 border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-white flex flex-col">
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-md transform group-hover:scale-110 transition-transform duration-500 bg-gray-100">
                  <img src={alumnus.image} alt={alumnus.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{alumnus.name}</h3>
                  <Badge variant="outline" className="mt-1 bg-primary/5 text-primary border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                    {t('alumni.class_of').replace('{year}', alumnus.year.toString())}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-1 bg-gray-50/50 p-5 rounded-3xl">
                <div className="flex items-start gap-4 text-sm font-bold text-gray-700">
                  <div className="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <span className="leading-tight py-1">{alumnus.role} <br/><span className="text-primary text-xs font-black uppercase">@{alumnus.company}</span></span>
                </div>
                <div className="flex items-start gap-4 text-sm font-medium text-gray-500">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <span className="py-1">{alumnus.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-auto">
                <Button 
                  onClick={() => setSelectedAlumnus(alumnus)}
                  className="w-full sm:flex-1 bg-primary text-white font-black rounded-2xl h-14 hover:bg-gray-900 transition-all text-sm shadow-lg shadow-primary/10 active:scale-95"
                >
                   {t('alumni.view_profile')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleMessage(alumnus.name)}
                  className="w-full sm:w-14 h-14 rounded-2xl border-gray-100 text-primary hover:bg-primary/5 transition-all flex items-center justify-center active:scale-95 shadow-sm"
                >
                   <MessageCircle size={22} className="shrink-0" />
                   <span className="sm:hidden ml-2 font-bold">{t('alumni.message')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[3rem] border border-gray-100 shadow-sm">
           <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <Users size={48} className="text-gray-200" />
           </div>
           <h3 className="text-2xl font-black text-gray-900">{t('alumni.no_alumni')}</h3>
           <p className="text-gray-500 max-w-xs mx-auto mt-2 font-medium">{t('alumni.no_alumni_desc')}</p>
           <Button 
             variant="link" 
             onClick={() => {setSearchQuery(''); setSelectedYear('all');}} 
             className="mt-4 text-primary font-black hover:no-underline"
            >
             {t('matching.clear_filters')}
           </Button>
        </div>
      )}

      <footer className="bg-[#0F172A] rounded-[3rem] p-10 md:p-16 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-32 -mb-32" />
         
         <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-secondary to-orange-400 rounded-[2rem] flex items-center justify-center text-primary shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <Award size={44} />
            </div>
            <div>
               <h4 className="text-3xl font-black text-white mb-3 tracking-tight">{t('alumni.register_mentor_title')}</h4>
               <p className="text-gray-400 font-medium max-w-md text-lg leading-relaxed">
                 {t('alumni.register_mentor_desc')}
               </p>
            </div>
         </div>
         <Button 
           onClick={handleRegisterMentor}
           className="w-full lg:w-auto bg-secondary text-primary font-black hover:bg-white hover:scale-105 rounded-2xl px-12 h-16 text-xl transition-all shadow-xl shadow-secondary/20 relative z-10 active:scale-95"
          >
            {t('alumni.register_mentor_button')}
         </Button>
      </footer>

      <Dialog open={!!selectedAlumnus} onOpenChange={() => setSelectedAlumnus(null)}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[2.5rem] bg-white">
          {selectedAlumnus && (
            <div className="flex flex-col relative max-h-[90vh]">
              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-white hover:bg-gray-100 rounded-full px-4 py-2 text-primary shadow-lg transition-all text-xs font-black uppercase tracking-widest border border-gray-100"
              >
                <ChevronLeft size={16} />
                <span>{t('alumni.back_to_alumni')}</span>
              </button>

              <button 
                onClick={() => setSelectedAlumnus(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="h-40 bg-accent shrink-0 relative">
                 <img 
                    src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/alumni-connect-bg-0295a8db-1770917751805.webp" 
                    className="w-full h-full object-cover opacity-30"
                    alt=""
                 />
                 <div className="absolute -bottom-16 left-8">
                    <div className="w-32 h-32 rounded-[2.5rem] border-[6px] border-white shadow-xl overflow-hidden bg-white">
                       <img src={selectedAlumnus.image} alt={selectedAlumnus.name} className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>
              
              <div className="pt-20 px-8 pb-8 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">{selectedAlumnus.name}</h2>
                    <p className="text-primary font-bold mt-1">{selectedAlumnus.role} at {selectedAlumnus.company}</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-600 border-none font-black px-4 py-2 rounded-xl">
                    {t('alumni.class_of').replace('{year}', selectedAlumnus.year.toString())}
                  </Badge>
                </div>

                <div className="bg-gray-50 p-6 rounded-[2rem] mb-8 relative">
                  <Quote size={24} className="text-primary/10 absolute top-4 right-4" />
                  <p className="text-gray-600 font-medium leading-relaxed italic">
                    "{selectedAlumnus.bio}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-black text-gray-400">Email</p>
                      <p className="text-sm font-bold text-gray-700 truncate">{selectedAlumnus.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Linkedin size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] uppercase font-black text-gray-400">LinkedIn</p>
                      <p className="text-sm font-bold text-gray-700 truncate">{selectedAlumnus.linkedin}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">{t('alumni.expertise_title')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumnus.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="bg-primary/5 text-primary border-none font-bold py-2 px-4 rounded-xl">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleRequestMentorship(selectedAlumnus.name)}
                    className="flex-1 bg-primary text-white font-black h-16 rounded-2xl shadow-lg shadow-primary/20 hover:bg-gray-900 active:scale-95 transition-all"
                  >
                    {t('alumni.request_mentorship')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedAlumnus(null)}
                    className="flex-1 h-16 rounded-2xl border-gray-100 text-gray-500 font-bold hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    {t('alumni.back_to_alumni')}
                  </Button>
                  <Button variant="outline" className="w-16 h-16 rounded-2xl border-gray-100 text-primary hover:bg-primary/5 active:scale-95 hidden sm:flex items-center justify-center">
                    <Globe size={24} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mentor Registration Dialog */}
      <Dialog open={isRegistering} onOpenChange={setIsRegistering}>
        <DialogContent className="sm:max-w-[600px] p-8 rounded-[2.5rem] bg-white overflow-y-auto max-h-[90vh] no-scrollbar">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black text-gray-900 tracking-tight">{t('alumni.register_mentor_button')}</DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
              {t('alumni.register_mentor_desc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-black uppercase text-gray-400">{t('login.full_name')}</Label>
                <Input 
                  id="full_name" 
                  required 
                  placeholder="e.g. John Doe"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-black uppercase text-gray-400">{t('login.university_email')}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder="e.g. john@alumni.strathmore.edu"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expertise" className="text-sm font-black uppercase text-gray-400">{t('alumni.expertise_title')}</Label>
              <Input 
                id="expertise" 
                required 
                placeholder="e.g. Fintech, Data Science, Audit"
                className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-black uppercase text-gray-400">{t('login.admin_gateway')}</Label>
                <Input 
                  id="company" 
                  placeholder="e.g. Google"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-black uppercase text-gray-400">{t('settings.role_title')}</Label>
                <Input 
                  id="role" 
                  placeholder="e.g. Software Engineer"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="years_of_experience" className="text-sm font-black uppercase text-gray-400">Years of Experience</Label>
                <Input 
                  id="years_of_experience" 
                  type="number"
                  placeholder="e.g. 5"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.years_of_experience}
                  onChange={(e) => setFormData({...formData, years_of_experience: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin_url" className="text-sm font-black uppercase text-gray-400">LinkedIn URL</Label>
                <Input 
                  id="linkedin_url" 
                  placeholder="linkedin.com/in/username"
                  className="h-12 rounded-xl bg-gray-50 border-none focus:ring-primary"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-black uppercase text-gray-400">Professional Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about your professional journey..."
                className="min-h-[100px] rounded-xl bg-gray-50 border-none focus:ring-primary resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-primary text-white font-black h-14 rounded-2xl shadow-lg shadow-primary/20 hover:bg-gray-900 active:scale-95 transition-all"
              >
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : t('login.register')}
              </Button>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsRegistering(false)}
                className="sm:w-32 h-14 rounded-2xl border-gray-100 text-gray-500 font-bold hover:bg-gray-50 active:scale-95 transition-all"
              >
                {t('login.back_to_selection').split(' ')[0]}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};