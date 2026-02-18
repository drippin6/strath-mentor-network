import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  Users, 
  MapPin, 
  BookOpen, 
  ChevronRight,
  Command,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchResult {
  id: string;
  type: 'mentor' | 'event' | 'resource' | 'faculty';
  title: string;
  subtitle: string;
  category: string;
  link: string;
}

interface SearchPortalProps {
  onNavigate?: (view: string) => void;
}

const MOCK_RESULTS: SearchResult[] = [
  { id: '1', type: 'mentor', title: 'Dr. John Kamau', subtitle: 'Finance Department', category: 'Professional', link: 'faculty' },
  { id: '2', type: 'event', title: 'Silicon Savannah Tour', subtitle: 'Friday, 10:00 AM', category: 'Excursion', link: 'excursions' },
  { id: '3', type: 'resource', title: 'Career Pathfinding Guide', subtitle: 'PDF Document', category: 'Library', link: 'library' },
  { id: '4', type: 'faculty', title: 'Office of Student Affairs', subtitle: 'Student Center, 2nd Floor', category: 'Support', link: 'faq' },
  { id: '5', type: 'mentor', title: 'Jane Mwangi', subtitle: 'BCom Year 4 - High Honors', category: 'Peer Match', link: 'matching' },
];

export const SearchPortal: React.FC<SearchPortalProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.length > 2) {
      setIsSearching(true);
      try {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name, role, year')
          .or(`full_name.ilike.%${val}%,role.ilike.%${val}%`)
          .limit(5);

        const supabaseResults: SearchResult[] = (profiles || []).map(p => ({
          id: p.id,
          type: p.role === 'faculty' ? 'faculty' : 'mentor',
          title: p.full_name || 'Anonymous User',
          subtitle: p.role === 'student' ? `Year ${p.year} Student` : `${p.role} Member`,
          category: p.role === 'student' ? 'Peer Match' : 'Professional',
          link: p.role === 'student' ? 'matching' : 'faculty'
        }));

        const filteredMock = MOCK_RESULTS.filter(r => 
          r.title.toLowerCase().includes(val.toLowerCase()) || 
          r.category.toLowerCase().includes(val.toLowerCase())
        );

        const combined = [...supabaseResults, ...filteredMock].slice(0, 8);
        setResults(combined);
      } catch (err) {
        console.error('Search error:', err);
        const filtered = MOCK_RESULTS.filter(r => 
          r.title.toLowerCase().includes(val.toLowerCase()) || 
          r.category.toLowerCase().includes(val.toLowerCase())
        );
        setResults(filtered);
      } finally {
        setIsSearching(false);
      }
    } else {
      setResults([]);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mentor': return <Users className="text-blue-500" size={18} />;
      case 'event': return <MapPin className="text-orange-500" size={18} />;
      case 'resource': return <BookOpen className="text-green-500" size={18} />;
      case 'faculty': return <User className="text-purple-500" size={18} />;
      default: return <Search className="text-slate-400" size={18} />;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onNavigate) {
      onNavigate(result.link);
    } else {
      toast.info(`Navigating to ${result.title}...`);
    }
  };

  const tags = [
    { label: t('search.tag_mentors'), value: 'Peer Mentors' },
    { label: t('search.tag_faculty'), value: 'Faculty' },
    { label: t('search.tag_library'), value: 'Library' },
    { label: t('search.tag_excursions'), value: 'Excursions' },
  ];

  const recentSearches = [
    { title: t('search.recent_faq'), category: 'Support', link: 'faq' },
    { title: t('search.recent_peer'), category: 'Matching', link: 'matching' },
    { title: t('search.recent_flash'), category: 'Alumni', link: 'alumni' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Command size={14} />
          {t('search.unified_portal')}
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('search.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">
          {t('search.subtitle')}
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-focus-within:bg-primary/30 transition-all opacity-0 group-focus-within:opacity-100" />
          <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 shadow-xl focus-within:border-primary transition-all">
            <Search className="text-slate-400 mr-4" size={24} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t('search.placeholder')}
              className="bg-transparent border-none focus:ring-0 text-xl w-full placeholder:text-slate-300 font-medium text-slate-700 dark:text-slate-200 outline-none"
              autoFocus
            />
            {isSearching && (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin ml-4" />
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag.value} 
              variant="secondary" 
              className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-colors border-none font-bold text-[10px] uppercase tracking-wider"
              onClick={() => handleSearch(tag.value)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4 pb-20">
        <AnimatePresence mode="popLayout">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {results.map((result, idx) => (
                <motion.div
                  key={result.id + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card 
                    className="hover:border-primary/50 transition-all cursor-pointer group overflow-hidden border-2 border-transparent"
                    onClick={() => handleResultClick(result)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          {getIcon(result.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-white">{result.title}</h4>
                            <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter h-4">
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">{result.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {t('search.view_details')}
                        <ArrowRight size={14} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : query.length > 2 && !isSearching ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('search.no_results')}</h3>
              <p className="text-sm text-slate-500">{t('search.no_results_desc')}</p>
            </div>
          ) : query.length === 0 && (
            <div className="space-y-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} />
                {t('search.recent')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentSearches.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/20 cursor-pointer group transition-all"
                    onClick={() => onNavigate && onNavigate(item.link)}
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.title}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};