import React, { useEffect, useState } from 'react';
import { 
  Bell, 
  Zap, 
  Users, 
  Award, 
  Calendar, 
  MessageSquare,
  Clock,
  CheckCheck,
  MoreVertical,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

interface Notification {
  id: string;
  type: 'mentorship' | 'event' | 'achievement' | 'message' | 'alert';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "mentorship",
    title: "New Triad Discussion",
    description: "Your faculty mentor Dr. Kamau posted a new goal for the week.",
    time: "2 hours ago",
    isRead: false,
    priority: "high"
  },
  {
    id: "2",
    type: "event",
    title: "Excursion Reminder",
    description: "The Innovation Hub Tour starts in 24 hours. Dont forget your ID.",
    time: "5 hours ago",
    isRead: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "achievement",
    title: "New Badge Earned!",
    description: "Congratulations! You have earned the Active Participant badge.",
    time: "1 day ago",
    isRead: true,
    priority: "low"
  },
  {
    id: "4",
    type: "message",
    title: "Message from Peer Match",
    description: "John Smith accepted your peer matching request. Say hello!",
    time: "2 days ago",
    isRead: true,
    priority: "medium"
  }
];

export const NotificationsCenter: React.FC = () => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
        toast.info("New notification received");
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setNotifications(data.map(n => ({
          ...n,
          time: n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Recently',
          isRead: n.is_read // mapping db snake_case to camelCase
        })));
      } else {
        setNotifications(MOCK_NOTIFICATIONS);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setNotifications(MOCK_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);

      if (error) throw error;

      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read (locally)");
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
      
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mentorship': return <Zap className="text-primary" size={18} />;
      case 'event': return <Calendar className="text-orange-500" size={18} />;
      case 'achievement': return <Award className="text-yellow-500" size={18} />;
      case 'message': return <MessageSquare className="text-blue-500" size={18} />;
      case 'alert': return <AlertCircle className="text-red-500" size={18} />;
      default: return <Bell className="text-slate-400" size={18} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            {t('notif.title')}
            {unreadCount > 0 && (
              <Badge className="bg-primary text-white border-none px-2 h-6 min-w-6 flex items-center justify-center font-black animate-pulse">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            {t('notif.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="rounded-xl font-bold text-xs h-10 border-slate-200 dark:border-slate-800"
          >
            <CheckCheck size={16} className="mr-2" />
            {t('notif.mark_all_read')}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
           Array.from({ length: 3 }).map((_, i) => (
             <div key={i} className="h-24 bg-slate-100 dark:bg-slate-900 rounded-2xl animate-pulse" />
           ))
        ) : notifications.length > 0 ? (
          notifications.map((notif) => (
            <Card 
              key={notif.id} 
              className={`transition-all border-none shadow-sm relative overflow-hidden group ${
                notif.isRead ? 'bg-white dark:bg-slate-900 opacity-80' : 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary'
              }`}
              onClick={() => !notif.isRead && markAsRead(notif.id)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  notif.isRead ? 'bg-slate-100 dark:bg-slate-800' : 'bg-white dark:bg-slate-900 shadow-sm'
                }`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                     <h4 className={`font-bold truncate ${notif.isRead ? 'text-slate-700' : 'text-slate-900 dark:text-white'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap ml-4 flex items-center gap-1">
                      <Clock size={10} />
                      {notif.time}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${notif.isRead ? 'text-slate-500' : 'text-slate-600 dark:text-slate-300 font-medium'}`}>
                    {notif.description}
                  </p>
                  
                  {!notif.isRead && (
                    <div className="mt-4 flex items-center gap-3">
                      <Button 
                        size="sm" 
                        className="rounded-xl h-8 px-4 text-xs font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info(`Details for: ${notif.title}`);
                        }}
                      >
                        {t('search.view_details')}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-xl h-8 px-4 text-xs font-bold text-slate-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notif.id);
                        }}
                      >
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>

                <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <ChevronRight size={20} className="text-slate-300" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200">
            <Bell size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold">{t('notif.all_caught_up')}</h3>
            <p className="text-slate-500">{t('notif.no_new')}</p>
          </div>
        )}
      </div>

      <div className="text-center py-10">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {t('notif.end')}
        </p>
      </div>
    </div>
  );
};