import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Hash,
  Filter,
  ArrowLeft,
  Clock,
  Send,
  MoreHorizontal,
  Paperclip,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  time: string;
  isHot?: boolean;
  replies?: Message[];
}

const INITIAL_DISCUSSIONS: Discussion[] = [
  {
    id: '1',
    author: 'Grace Wambui',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
    title: 'How do we maintain honesty in the age of AI?',
    content: 'With the rise of ChatGPT and other tools, the line between assistance and plagiarism is blurring. What are your thoughts on academic integrity in 2024?',
    category: 'AcademicIntegrity',
    likes: 42,
    comments: 24,
    time: '2h ago',
    isHot: true,
    replies: [
      { id: 'r1', author: 'Dr. Kamau', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', content: 'Academic integrity is about personal growth, not just grades.', time: '1h ago', likes: 5 }
    ]
  },
  {
    id: '2',
    author: 'Kevin Otieno',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    title: 'Preparing for the Safaricom Internship',
    content: 'I just finished my interview yesterday! Here are some of the technical questions they asked for the software engineering role...',
    category: 'CareerAdvice',
    likes: 89,
    comments: 15,
    time: '5h ago',
    isHot: true,
    replies: []
  },
  {
    id: '3',
    author: 'Maria Santos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    title: 'Mental Health resources on campus',
    content: 'Does anyone know the procedure for booking a counseling session? Feeling a bit overwhelmed with the semester project load.',
    category: 'StudentLife',
    likes: 56,
    comments: 12,
    time: '1d ago',
    replies: []
  }
];

const CATEGORIES = ['All', 'AcademicIntegrity', 'CareerAdvice', 'StudentLife', 'CampusTips', 'Networking', 'General'];

interface SocialDiscussionsProps {
  onBack: () => void;
}

export const SocialDiscussions: React.FC<SocialDiscussionsProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [discussions, setDiscussions] = useState<Discussion[]>(INITIAL_DISCUSSIONS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [replyText, setReplyText] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);

  const filteredDiscussions = discussions.filter(d => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         d.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDiscussions(prev => prev.map(d => 
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    ));
    toast.success('Post liked!');
  };

  const handlePost = () => {
    const title = newTitle.trim();
    const content = newPost.trim();

    if (!title || !content) {
      toast.error('Please add both a title and some content.');
      return;
    }

    const post: Discussion = {
      id: Date.now().toString(),
      author: 'John Strathmore',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      title: title,
      content: content,
      category: activeCategory === 'All' ? 'General' : activeCategory,
      likes: 0,
      comments: 0,
      time: 'Just now',
      replies: []
    };

    setDiscussions([post, ...discussions]);
    setNewPost('');
    setNewTitle('');
    toast.success('Discussion posted successfully!');
    
    // Smooth scroll to the top of the feed to show the new post
    const feedElement = document.getElementById('discussion-feed');
    if (feedElement) {
      feedElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReply = () => {
    const text = replyText.trim();
    if (!text || !selectedDiscussion) return;

    const newReply: Message = {
      id: Date.now().toString(),
      author: 'John Strathmore',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      content: text,
      time: 'Just now',
      likes: 0
    };

    setDiscussions(prev => prev.map(d => {
      if (d.id === selectedDiscussion.id) {
        const updatedReplies = [...(d.replies || []), newReply];
        const updatedDiscussion = { 
          ...d, 
          replies: updatedReplies,
          comments: updatedReplies.length
        };
        // Update the selected discussion view too
        setSelectedDiscussion(updatedDiscussion);
        return updatedDiscussion;
      }
      return d;
    }));

    setReplyText('');
    toast.success('Reply posted!');
  };

  return (
    <div className="relative h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-500" />
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{t('social.title')}</h2>
            <p className="text-gray-500 font-medium text-sm">{t('social.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder={t('social.search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 w-64 rounded-xl border-gray-100 bg-white focus-visible:ring-primary shadow-sm"
              />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Sidebar - Categories & Trending */}
        <div className="hidden lg:flex flex-col gap-6 overflow-y-auto pr-2">
          <Card className="border-none shadow-sm bg-white rounded-2xl">
            <CardContent className="p-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{t('social.categories')}</h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-primary text-white rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} />
                <h3 className="font-bold">{t('social.trending')}</h3>
              </div>
              <div className="space-y-4">
                {['#StrathmoreSpirit', '#ExamPrep', '#Internships2024'].map(tag => (
                  <div key={tag} className="flex items-center gap-2 group cursor-pointer">
                    <Hash size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          {/* Post Creation Area */}
          <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <CardContent className="p-0">
              <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                <Input 
                  placeholder={t('social.post_title_placeholder')}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border-none bg-transparent font-bold text-lg focus-visible:ring-0 px-0 h-auto placeholder:text-gray-400"
                />
              </div>
              <div className="p-4">
                <textarea 
                  placeholder={t('social.post_content_placeholder')}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-sm bg-transparent placeholder:text-gray-400 outline-none"
                />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
                      <Paperclip size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
                      <Smile size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary transition-colors">
                      <Hash size={18} />
                    </Button>
                  </div>
                  <Button 
                    type="button"
                    onClick={handlePost}
                    disabled={!newPost.trim() || !newTitle.trim()}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
                  >
                    {t('social.post_button')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed */}
          <div id="discussion-feed" className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredDiscussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedDiscussion(discussion)}
                  className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                        <img src={discussion.avatar} alt={discussion.author} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{discussion.author}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <Clock size={10} />
                          {discussion.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       {discussion.isHot && (
                        <Badge className="bg-orange-50 text-orange-600 border-none flex items-center gap-1 text-[10px] font-bold">
                          <TrendingUp size={10} /> HOT
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {discussion.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {discussion.content}
                  </p>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-50 gap-4">
                    <div className="flex items-center gap-4">
                      <button 
                        type="button"
                        onClick={(e) => handleLike(discussion.id, e)}
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
                      >
                        <ThumbsUp size={16} />
                        {discussion.likes}
                      </button>
                      <button 
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-secondary transition-colors"
                      >
                        <MessageCircle size={16} />
                        {discussion.comments}
                      </button>
                      <button 
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-accent transition-colors"
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                    <Badge variant="outline" className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase border-none">
                      #{discussion.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredDiscussions.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <MessageSquare className="mx-auto w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">{t('social.no_discussions')}</p>
                <Button 
                  variant="link" 
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="text-primary font-bold"
                >
                  {t('matching.clear_filters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Modal / Overlay */}
      <AnimatePresence>
        {selectedDiscussion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedDiscussion(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-bold text-gray-900">{t('social.discussion_details')}</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedDiscussion(null)} className="rounded-full">
                  <Plus className="rotate-45" />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
                 <div className="flex items-start gap-4">
                    <img src={selectedDiscussion.avatar} className="w-12 h-12 rounded-full border" alt="" />
                    <div>
                       <p className="font-bold text-gray-900">{selectedDiscussion.author}</p>
                       <p className="text-xs text-gray-400 mb-4">{selectedDiscussion.time}</p>
                       <h3 className="text-xl font-black mb-3 text-primary">{selectedDiscussion.title}</h3>
                       <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedDiscussion.content}</p>
                    </div>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-gray-50">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('social.replies').replace('{count}', selectedDiscussion.comments.toString())}</h4>
                    <div className="space-y-4">
                      {selectedDiscussion.replies?.map(reply => (
                        <div key={reply.id} className="flex gap-3 bg-gray-50 p-4 rounded-2xl">
                          <img src={reply.avatar} className="w-8 h-8 rounded-full border" alt="" />
                          <div className="flex-1">
                             <div className="flex justify-between items-start">
                               <p className="text-sm font-bold text-gray-900">{reply.author}</p>
                               <p className="text-[10px] text-gray-400">{reply.time}</p>
                             </div>
                             <p className="text-sm text-gray-600 mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                      {(!selectedDiscussion.replies || selectedDiscussion.replies.length === 0) && (
                        <p className="text-center text-gray-400 py-8 italic text-sm">{t('social.no_replies')}</p>
                      )}
                    </div>
                 </div>
              </div>
              <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
                 <Input 
                   placeholder={t('social.reply_placeholder')} 
                   value={replyText}
                   onChange={(e) => setReplyText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                   className="flex-1 rounded-full bg-gray-50 border-none h-12 px-6 focus-visible:ring-1 focus-visible:ring-primary/20" 
                 />
                 <Button 
                   onClick={handleReply}
                   disabled={!replyText.trim()}
                   className="w-12 h-12 rounded-full p-0 bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all shrink-0"
                 >
                    <Send size={18} />
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};