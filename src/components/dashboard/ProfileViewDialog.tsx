import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Linkedin, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Clock,
  ExternalLink,
  LucideIcon,
  FolderKanban
} from 'lucide-react';
import { ExploreProjectsDialog } from './ExploreProjectsDialog';

interface ProfileViewDialogProps {
  member: {
    role: string;
    name: string;
    year: string;
    status: string;
    icon: LucideIcon;
    color: string;
    avatar: string;
    description: string;
  };
  children: React.ReactNode;
}

export const ProfileViewDialog: React.FC<ProfileViewDialogProps> = ({ member, children }) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[2rem]">
          <div className={`h-32 ${member.color} relative`}>
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="px-8 pt-16 pb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900">{member.name}</h2>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <member.icon size={14} />
                  {member.role}
                </div>
              </div>
              <Badge variant={member.status === 'Active' ? 'default' : 'outline'} className={member.status === 'Active' ? 'bg-green-500 text-white border-none' : 'text-gray-400 border-gray-200'}>
                {member.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Affiliation</span>
                <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  {member.year}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Location</span>
                <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  Nairobi, KE
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">About Mentor</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {member.description} This mentor is dedicated to fostering growth and providing actionable insights for students at Strathmore University. With a focus on practical skills and professional networking.
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setIsProjectsOpen(true)}
                className="w-full bg-secondary text-primary font-black h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/10 mb-2"
              >
                <FolderKanban size={18} />
                Explore Projects
              </Button>
              <Button className="w-full bg-gray-900 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                <Mail size={18} />
                Send Message
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 border-gray-100 rounded-xl h-12 font-bold text-gray-600 hover:bg-gray-50">
                  <Linkedin size={18} className="mr-2 text-[#0077B5]" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="flex-1 border-gray-100 rounded-xl h-12 font-bold text-gray-600 hover:bg-gray-50">
                  <ExternalLink size={18} className="mr-2" />
                  Portfolio
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <CheckCircle2 size={12} className="text-green-500" />
              Verified Mentor
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
              <Clock size={12} />
              Responds in 24h
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <ExploreProjectsDialog 
        open={isProjectsOpen} 
        onOpenChange={setIsProjectsOpen} 
      />
    </>
  );
};