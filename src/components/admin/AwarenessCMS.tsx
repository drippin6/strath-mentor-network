import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, StickyNote, Plus, Play, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

const AwarenessCMS: React.FC = () => {
  const [videos, setVideos] = useState([
    { id: 1, title: 'The Power of Active Listening', url: '#', active: true, date: '2024-03-15' },
    { id: 2, title: 'Defining Your Future Ready Path', url: '#', active: false, date: '2024-03-10' },
  ]);

  const [stickers, setStickers] = useState([
    { id: 1, text: 'Remember to log your weekly triad goals!', color: 'bg-yellow-200' },
    { id: 2, text: 'Upcoming Excursion: Karura Forest Hike!', color: 'bg-green-200' },
  ]);

  const handleToggleActive = (id: number) => {
    setVideos(videos.map(v => v.id === id ? { ...v, active: !v.active } : v));
    toast.success('Video visibility updated');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Awareness Video CMS</CardTitle>
            <CardDescription>Upload and rotate program value proposition clips.</CardDescription>
          </div>
          <Button size="sm" className="bg-indigo-600">
            <Plus size={16} className="mr-2" /> Upload
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {videos.map(video => (
              <div key={video.id} className="flex items-center space-x-4 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="relative w-24 h-16 rounded overflow-hidden bg-slate-100">
                  <img 
                    src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/awareness-video-thumbnail-f4cb0cd7-1771073018667.webp" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={16} className="text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{video.title}</p>
                  <p className="text-xs text-slate-500">Uploaded {video.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant={video.active ? "default" : "outline"}
                    className={video.active ? "bg-green-600" : ""}
                    onClick={() => handleToggleActive(video.id)}
                  >
                    {video.active ? 'Active' : 'Draft'}
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Digital Sticker Notes</CardTitle>
            <CardDescription>Manage the sticky notes displayed on student dashboards.</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Plus size={16} className="mr-2" /> New Note
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stickers.map(sticker => (
              <div key={sticker.id} className={`${sticker.color} p-4 rounded-lg shadow-sm border border-slate-300/50 flex flex-col justify-between h-32`}>
                <p className="text-sm font-medium text-slate-800 leading-tight">
                  "{sticker.text}"
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-600">
                    <Edit size={14} />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AwarenessCMS;