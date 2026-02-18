import React, { useState } from 'react';
import { Calendar, MapPin, Users, Home, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ReserveSpotDialog } from './ReserveSpotDialog';
import { COURSES } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

const EXCURSIONS = [
  {
    id: '1',
    title: 'Nairobi Tech Hub Tour',
    category: 'Industry Visit',
    date: 'Feb 20, 2026',
    time: '09:00 AM',
    location: 'iHub, Senteu Plaza',
    capacity: '15/20',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/nairobi-tech-hub-tour-8bbe0438-1771006801811.webp',
    description: 'Explore the heart of Nairobi tech ecosystem and meet industry leaders.'
  },
  {
    id: '2',
    title: 'Alumni Networking Dinner',
    category: 'Social',
    date: 'Feb 22, 2026',
    time: '06:30 PM',
    location: 'Strathmore University Hall',
    capacity: '45/50',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/alumni-networking-dinner-c4848e95-1771006800072.webp',
    description: 'A formal evening to connect with successful alumni across various industries.'
  },
  {
    id: '3',
    title: 'Financial Literacy Workshop',
    category: 'Academic',
    date: 'March 05, 2026',
    time: '02:00 PM',
    location: 'SBS Auditorium',
    capacity: '120/150',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/financial-literacy-workshop-430b5709-1771006800969.webp',
    description: 'Master the basics of personal finance and investment strategies.'
  },
  {
    id: '4',
    title: 'Career Fair 2026',
    category: 'Networking',
    date: 'March 12, 2026',
    time: '10:00 AM',
    location: 'Main Campus Green',
    capacity: 'Unlimited',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/career-fair-2026-b21842e2-1771006801284.webp',
    description: 'Connect with top employers from Kenya and beyond.'
  },
  {
    id: '5',
    title: 'Coding Bootcamp Intensive',
    category: 'Skill Building',
    date: 'March 18, 2026',
    time: '08:00 AM',
    location: '@iLabAfrica Lab 3',
    capacity: '25/30',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/coding-bootcamp-intensive-bc9dfa0d-1771006801292.webp',
    description: 'A deep dive into modern React 19 and backend integration techniques.'
  },
  {
    id: '6',
    title: 'Sustainability Campus Walk',
    category: 'Environment',
    date: 'March 25, 2026',
    time: '11:00 AM',
    location: 'Student Center Plaza',
    capacity: '50/50',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/sustainability---green-campus-walk-d8c2990c-1771006801186.webp',
    description: "Learn about Strathmore's green initiatives and solar energy projects."
  },
  {
    id: '7',
    title: 'Cultural Exchange Festival',
    category: 'Culture',
    date: 'April 02, 2026',
    time: '12:00 PM',
    location: 'Main Sports Ground',
    capacity: '300/500',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/cultural-exchange-festival-3ab72b6e-1771006808053.webp',
    description: 'Celebrate diversity with traditional food, music, and dance from across Africa.'
  }
];

interface ExcursionFeedProps {
  onBack?: () => void;
}

export const ExcursionFeed: React.FC<ExcursionFeedProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) ? prev.filter(c => c !== course) : [...prev, course]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section>
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
                <Home size={20} className="text-gray-500" />
              </Button>
            )}
            <div>
              <h2 className="text-3xl font-black text-gray-900">{t('excursions.title')}</h2>
              <p className="text-gray-500 font-medium">{t('excursions.desc')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 flex items-center gap-2 px-6 rounded-xl border-gray-100 shadow-sm hover:bg-gray-50 transition-all w-full md:w-auto font-bold">
                  <Filter className="w-4 h-4 text-primary" />
                  {t('excursions.filter_label')}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 max-h-[400px] overflow-y-auto p-2 border-gray-100 shadow-xl">
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-black text-gray-400 uppercase">{t('excursions.filter_title')}</DropdownMenuLabel>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EXCURSIONS.map((excursion) => (
            <Card key={excursion.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all flex flex-col group rounded-3xl">
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={excursion.image} 
                  alt={excursion.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-6 right-6 bg-secondary text-primary font-black px-4 py-1.5 rounded-full border-none">
                  {excursion.category}
                </Badge>
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="text-xs font-black uppercase tracking-widest text-secondary mb-1">{excursion.time}</p>
                   <h3 className="text-2xl font-bold">{excursion.title}</h3>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{excursion.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-500 flex-grow py-4">
                <div className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  {excursion.date}
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  {excursion.location}
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  {t('excursions.spots_filled').replace('{count}', excursion.capacity)}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <ReserveSpotDialog activityName={excursion.title}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 transition-all text-base">
                    {t('excursions.book_now')}
                  </Button>
                </ReserveSpotDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};