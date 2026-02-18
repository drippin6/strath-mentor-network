import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Lightbulb, Users, Award } from 'lucide-react';

const MilestoneMonitor: React.FC = () => {
  const categories = [
    { name: 'Future Readiness', completed: 1240, inProgress: 850, icon: Target, color: 'text-blue-500' },
    { name: 'Academic Integration', completed: 2100, inProgress: 400, icon: Lightbulb, color: 'text-amber-500' },
    { name: 'Social Connection', completed: 1580, inProgress: 1200, icon: Users, color: 'text-indigo-500' },
    { name: 'Community Leadership', completed: 450, inProgress: 980, icon: Award, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-indigo-200 dark:border-indigo-900 overflow-hidden">
        <div className="h-48 relative overflow-hidden bg-slate-900">
           <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/milestone-monitoring-chart-12e86997-1771073018504.webp" 
            alt="Milestone Monitoring"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Anonymized Milestone Data</h3>
              <p className="text-indigo-100 text-sm">Tracking systemic student progress across the university.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cat.name}</CardTitle>
              <cat.icon className={`h-4 w-4 ${cat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cat.completed + cat.inProgress}</div>
              <p className="text-xs text-slate-500 mt-1">Total interactions logged</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span>Completed</span>
                  <span className="text-green-600">{cat.completed}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div 
                    className="bg-indigo-600 h-full rounded-full" 
                    style={{ width: `${(cat.completed / (cat.completed + cat.inProgress)) * 100}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Anonymized Student Trajectories</CardTitle>
          <CardDescription>Visualizing how students move toward being "Future Ready" over their 4-year journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between px-4 pb-4 pt-8 bg-slate-50 dark:bg-slate-900 rounded-xl relative">
             {/* Year labels */}
             <div className="absolute bottom-0 left-0 right-0 flex justify-around p-2 text-[10px] font-bold text-slate-400">
               <span>YEAR 1</span>
               <span>YEAR 2</span>
               <span>YEAR 3</span>
               <span>YEAR 4</span>
             </div>
             {/* Simple bar visualization of progress by year */}
             <div className="w-12 bg-indigo-200 dark:bg-indigo-900 rounded-t-lg h-[20%]" />
             <div className="w-12 bg-indigo-300 dark:bg-indigo-800 rounded-t-lg h-[45%]" />
             <div className="w-12 bg-indigo-500 dark:bg-indigo-700 rounded-t-lg h-[75%]" />
             <div className="w-12 bg-indigo-600 dark:bg-indigo-600 rounded-t-lg h-[95%]" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MilestoneMonitor;