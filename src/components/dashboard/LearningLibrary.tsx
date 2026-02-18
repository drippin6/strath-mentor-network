import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Video, 
  FileText, 
  Download, 
  ExternalLink, 
  Home, 
  Filter, 
  Star,
  Clock,
  ArrowRight,
  Bookmark,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const RESOURCES = [
  { id: 1, title: 'Effective Communication 101', type: 'Video', duration: '12 min', category: 'Soft Skills', featured: true },
  { id: 2, title: 'Leadership Fundamentals', type: 'PDF', size: '2.4 MB', category: 'Leadership', featured: true },
  { id: 3, title: 'Time Management Workshop', type: 'Article', duration: '5 min read', category: 'Productivity', featured: false },
  { id: 4, title: 'Networking Strategies', type: 'Video', duration: '18 min', category: 'Career', featured: false },
  { id: 5, title: 'Financial Literacy Module', type: 'PDF', size: '3.1 MB', category: 'Finance', featured: false },
  { id: 6, title: 'Critical Thinking Skills', type: 'Article', duration: '8 min read', category: 'Soft Skills', featured: false },
  { id: 7, title: 'Emotional Intelligence', type: 'Video', duration: '15 min', category: 'Soft Skills', featured: false },
  { id: 8, title: 'Project Management Basics', type: 'PDF', size: '1.8 MB', category: 'Leadership', featured: false },
];

const CATEGORIES = ['All', 'Soft Skills', 'Leadership', 'Productivity', 'Career', 'Finance'];

interface LearningLibraryProps {
  onBack?: () => void;
}

export const LearningLibrary: React.FC<LearningLibraryProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const filteredResources = RESOURCES.filter(res => {
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = RESOURCES.filter(res => res.featured);

  const handleOpenResource = (resource: typeof RESOURCES[0]) => {
    const action = resource.type === 'Video' ? 'Opening video player for' : 'Opening document viewer for';
    toast.success(`${action}: ${resource.title}`, {
      description: "You're now accessing this learning resource.",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
    });
  };

  const handleDownloadResource = (resource: typeof RESOURCES[0]) => {
    toast.success(`Starting download: ${resource.title}`, {
      description: `Saving ${resource.size || 'file'} to your device.`,
    });
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        toast.info("Removed from bookmarks");
        return prev.filter(bid => bid !== id);
      } else {
        toast.success("Added to bookmarks");
        return [...prev, id];
      }
    });
  };

  const handleRequestTopic = () => {
    toast.message("Request Topic", {
      description: "The topic request form has been sent to the administration office.",
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="flex items-center gap-4 w-full xl:w-auto">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100 shrink-0">
              <Home size={20} className="text-gray-500" />
            </Button>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-black text-gray-900 leading-tight truncate">{t('lib.title')}</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">{t('lib.subtitle')}</p>
          </div>
        </div>
        <div className="relative w-full xl:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          <Input 
            placeholder={t('lib.search_placeholder')} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 md:h-14 rounded-2xl border-gray-100 bg-white focus-visible:ring-primary shadow-sm text-sm md:text-base w-full" 
          />
        </div>
      </header>

      {/* Categories for Mobile - Improved Horizontal Scroll */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sticky top-16 bg-gray-50/80 backdrop-blur-sm z-10">
        {CATEGORIES.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full whitespace-nowrap px-6 ${
              activeCategory === cat ? 'bg-primary border-primary' : 'bg-white border-gray-200 text-gray-600'
            }`}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters for Desktop */}
        <aside className="hidden lg:block space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[2rem] sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Filter size={14} /> {t('lib.categories')}
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-accent/10 border border-accent/20 rounded-[2rem] p-6">
            <h3 className="font-bold text-accent mb-2">{t('lib.help_title')}</h3>
            <p className="text-xs text-gray-500 mb-4">{t('lib.help_desc')}</p>
            <Button 
              variant="link" 
              className="p-0 text-accent font-bold text-xs h-auto flex items-center gap-1"
              onClick={handleRequestTopic}
            >
              {t('lib.request_topic')} <ArrowRight size={12} />
            </Button>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-10">
          {activeCategory === 'All' && !searchQuery && (
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
                <Star className="text-secondary fill-secondary" size={20} />
                {t('lib.featured_title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featured.map((res) => (
                  <Card key={res.id} className="relative overflow-hidden group border-none shadow-xl bg-primary text-white rounded-[2rem] transition-transform hover:-translate-y-1 duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <CardContent className="p-6 md:p-8 relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-2xl bg-white/10">
                          {res.type === 'Video' ? <Video size={24} /> : <FileText size={24} />}
                        </div>
                        <Badge className="bg-secondary text-primary border-none text-[10px] font-bold uppercase">Featured</Badge>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black mb-2 leading-tight">{res.title}</h3>
                      <p className="text-white/70 text-sm font-medium mb-6 flex items-center gap-2">
                        <Clock size={14} /> {res.duration || res.size}
                      </p>
                      <Button 
                        className="w-full bg-white text-primary font-bold hover:bg-gray-100 rounded-xl h-12 shadow-lg"
                        onClick={() => handleOpenResource(res)}
                      >
                        {res.type === 'Video' ? t('lib.watch_now') : t('lib.read_now')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-xl font-bold text-gray-900">{t('lib.all_resources').replace('{count}', filteredResources.length.toString())}</h2>
              <div className="lg:hidden">
                <Badge variant="outline" className="border-gray-200 text-gray-500 font-medium">{activeCategory}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <div key={res.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-primary/5 transition-colors text-gray-400 group-hover:text-primary">
                      {res.type === 'Video' ? <Video size={20} /> : res.type === 'PDF' ? <FileText size={20} /> : <BookOpen size={20} />}
                    </div>
                    <button 
                      className={`transition-colors p-1 ${bookmarkedIds.includes(res.id) ? 'text-secondary' : 'text-gray-300 hover:text-secondary'}`}
                      onClick={() => toggleBookmark(res.id)}
                    >
                      <Bookmark size={18} fill={bookmarkedIds.includes(res.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <Badge variant="outline" className="w-fit mb-3 bg-gray-50/50 border-none text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {res.category}
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors flex-1 line-clamp-2">{res.title}</h3>
                  <p className="text-xs text-gray-400 mb-6 font-medium flex items-center gap-1.5">
                    {res.type} &bull; {res.duration || res.size}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <button 
                      className="text-[10px] font-black text-primary flex items-center gap-1.5 hover:underline uppercase tracking-widest"
                      onClick={() => res.type === 'PDF' ? handleDownloadResource(res) : handleOpenResource(res)}
                    >
                      {res.type === 'PDF' ? <><Download size={14} /> {t('lib.download')}</> : <><ExternalLink size={14} /> {t('lib.open')}</>}
                    </button>
                    <span className="text-[10px] font-bold text-gray-300">2.4k Views</span>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 mx-2">
                <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{t('lib.no_resources')}</h3>
                <p className="text-gray-500 text-sm">{t('lib.no_resources_desc')}</p>
                <Button variant="ghost" className="mt-4 text-primary font-bold" onClick={() => {setSearchQuery(''); setActiveCategory('All');}}>
                  {t('lib.clear_filters')}
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};