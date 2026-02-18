import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star, MessageSquare } from 'lucide-react';

const FeedbackLog: React.FC = () => {
  const stories = [
    {
      id: 1,
      student: "A. K.",
      faculty: "Faculty of IT",
      story: "The transition from Year 2 to Year 3 was terrifying. My mentor in the Triad Pod helped me realize that 'professional' doesn't mean 'robotic'. I now have a focus for my final year project that I actually care about.",
      rating: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      student: "M. O.",
      faculty: "School of Management",
      story: "Joining the Peer-Matcher in my first month changed everything. I felt seen in a way I didn't expect at university. Finding friends who were also 'shy' made the campus feel like home.",
      rating: 5,
      date: "1 week ago"
    },
    {
      id: 3,
      student: "S. N.",
      faculty: "Law School",
      story: "The Karura Forest hike was exactly what I needed. Seeing the deans out in nature, talking about their own struggles, broke down the power distance immediately.",
      rating: 4,
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 text-indigo-600" size={20} />
            Radical Transformation Log
          </CardTitle>
          <CardDescription>Qualitative proof of impact to demonstrate value to university stakeholders.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                <Quote className="absolute top-4 right-4 text-indigo-100 dark:text-slate-800" size={48} />
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10 border-2 border-indigo-100">
                    <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">{story.student}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold">{story.student} <span className="text-xs font-normal text-slate-400">• {story.faculty}</span></h4>
                    <div className="flex space-x-0.5 mt-0.5">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
                  "{story.story}"
                </p>
                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">{story.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackLog;