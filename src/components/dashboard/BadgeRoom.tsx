import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Star, CheckCircle2, TrendingUp, Users, Home } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface BadgeItem {
  id: string;
  name: string;
  date?: string;
  icon: React.ReactNode;
  color: string;
}

const BADGE_TEMPLATES: BadgeItem[] = [
  { id: '1', name: 'First Step', icon: <Star className="w-8 h-8" />, color: 'text-yellow-500' },
  { id: '2', name: 'Connector', icon: <Users className="w-8 h-8" />, color: 'text-blue-500' },
  { id: '3', name: 'Knowledge Seeker', icon: <Trophy className="w-8 h-8" />, color: 'text-[#800000]' },
  { id: '4', name: 'Goal Crusher', icon: <Target className="w-8 h-8" />, color: 'text-green-500' },
  { id: '5', name: 'Mentor', icon: <Users className="w-8 h-8" />, color: 'text-purple-500' },
  { id: '6', name: 'Future Ready', icon: <TrendingUp className="w-8 h-8" />, color: 'text-orange-500' },
];

interface BadgeRoomProps {
  onBack?: () => void;
}

export const BadgeRoom: React.FC<BadgeRoomProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [milestones, setMilestones] = useState([
    { id: '1', title: 'Complete Career Assessment', completed: true },
    { id: '2', title: 'Attend 3 Alumni Sessions', completed: true },
    { id: '3', title: 'Update Resume with SU Format', completed: false },
    { id: '4', title: 'Secure a Summer Internship', completed: false },
  ]);
  const [newMilestone, setNewMilestone] = useState('');

  const completedCount = milestones.filter(m => m.completed).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  // Automated Badges Logic: Unlock badges based on completed milestone count
  const badges = useMemo(() => {
    return BADGE_TEMPLATES.map((badge, index) => {
      // Logic: Unlock badge if index + 1 <= completedCount
      // This way, the more milestones you complete, the more badges you unlock
      const isUnlocked = index + 1 <= completedCount;
      return {
        ...badge,
        isUnlocked,
        date: isUnlocked ? t('badges.unlocked') : undefined
      };
    });
  }, [completedCount, t]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m);
      const prevCompleted = prev.filter(m => m.completed).length;
      const nextCompleted = updated.filter(m => m.completed).length;
      
      if (nextCompleted > prevCompleted) {
        toast.success(`Milestone completed! You've unlocked ${nextCompleted} badges so far.`);
      }
      
      return updated;
    });
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones(prev => [...prev, { id: Date.now().toString(), title: newMilestone, completed: false }]);
    setNewMilestone('');
    toast.success('Activity goal added!');
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
                <Home size={20} className="text-gray-500" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('badges.title')}</h2>
              <p className="text-gray-500">{t('badges.desc')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center gap-3 transition-all duration-500 ${
                badge.isUnlocked 
                  ? 'bg-white border-yellow-200 shadow-md ring-2 ring-yellow-400/20' 
                  : 'bg-gray-50 border-gray-100 opacity-40 grayscale'
              }`}
            >
              <div className={`p-3 rounded-full ${badge.isUnlocked ? 'bg-yellow-50' : 'bg-gray-100'}`}>
                {React.cloneElement(badge.icon as React.ReactElement<{ className?: string }>, { 
                  className: `w-8 h-8 ${badge.isUnlocked ? badge.color : 'text-gray-400'}` 
                })}
              </div>
              <div>
                <h3 className={`font-bold text-sm ${badge.isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                  {badge.name}
                </h3>
                {badge.isUnlocked && (
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">{t('badges.unlocked')}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
          <CardHeader className="bg-[#800000] text-white p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-black">{t('badges.tracker_title')}</CardTitle>
                <p className="text-red-100/80 text-sm mt-1">{t('badges.tracker_desc')}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-4xl font-black">{progress}%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  {t('badges.done').replace('{count}', completedCount.toString()).replace('{total}', milestones.length.toString())}
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-3 mt-6 bg-white/20" />
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  onClick={() => toggleMilestone(milestone.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer group ${
                    milestone.completed 
                      ? 'bg-green-50/50 border border-green-100' 
                      : 'bg-gray-50 border border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        milestone.completed 
                          ? 'bg-green-500 border-green-500 scale-110 shadow-lg shadow-green-200' 
                          : 'border-gray-300 bg-white group-hover:border-primary'
                      }`}
                    >
                      {milestone.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                    </div>
                    <span className={`font-bold transition-all ${milestone.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {milestone.title}
                    </span>
                  </div>
                  {!milestone.completed && (
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{t('badges.complete_plus')}</span>
                  )}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-gray-100">
                <div className="flex-1 relative">
                  <Input 
                    placeholder={t('badges.new_goal_placeholder')}
                    value={newMilestone}
                    onChange={(e) => setNewMilestone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                    className="h-14 rounded-2xl border-gray-200 focus:ring-primary/20 pl-4 pr-12"
                  />
                  <Target className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                </div>
                <Button 
                  onClick={addMilestone} 
                  className="h-14 px-8 bg-[#800000] hover:bg-[#600000] text-white font-black rounded-2xl shadow-lg shadow-red-900/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {t('badges.add_goal')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};