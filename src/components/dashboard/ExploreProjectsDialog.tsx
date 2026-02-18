import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FolderKanban, 
  Users, 
  Calendar, 
  ArrowRight,
  Search,
  Zap,
  Microscope,
  Cpu,
  CheckCircle2,
  Send,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  faculty: string;
  team: string;
  deadline: string;
  status: 'Open' | 'In Progress' | 'Completed';
  icon: React.ElementType;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI-Driven Agricultural Optimization',
    faculty: 'SCIT',
    team: '4 Members',
    deadline: 'Oct 2024',
    status: 'Open',
    icon: Cpu,
    color: 'text-green-500'
  },
  {
    id: '2',
    title: 'SME Resilience in Post-Pandemic Africa',
    faculty: 'SBS',
    team: '3 Members',
    deadline: 'Dec 2024',
    status: 'In Progress',
    icon: Zap,
    color: 'text-blue-500'
  },
  {
    id: '3',
    title: 'Blockchain for Transparent Governance',
    faculty: 'SLS',
    team: '5 Members',
    deadline: 'Nov 2024',
    status: 'Open',
    icon: FolderKanban,
    color: 'text-maroon-600'
  },
  {
    id: '4',
    title: 'Sustainable Urban Development Study',
    faculty: 'SHSS',
    team: '2 Members',
    deadline: 'Sept 2024',
    status: 'Completed',
    icon: Microscope,
    color: 'text-orange-500'
  }
];

interface ExploreProjectsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExploreProjectsDialog: React.FC<ExploreProjectsDialogProps> = ({ open, onOpenChange }) => {
  const [showProposeForm, setShowProposeForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProjectClick = (project: Project) => {
    toast.info(`Project: ${project.title}`, {
      description: `Joining request sent to the ${project.faculty} Faculty coordinator.`,
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />
    });
  };

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowProposeForm(false);
      toast.success("Project Proposal Submitted!", {
        description: "The Research Office will review your proposal and respond within 5 business days.",
        icon: <Send className="w-4 h-4 text-primary" />
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden rounded-[2.5rem] border-none shadow-2xl p-0 flex flex-col bg-white">
        <div className="bg-primary p-8 text-white relative shrink-0">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black mb-2 flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-secondary" />
              Research Projects
            </DialogTitle>
            <DialogDescription className="text-white/70 text-base font-medium">
              Explore and join collaborative cross-faculty research initiatives.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 flex items-center bg-white/10 rounded-xl p-3 border border-white/20">
            <Search className="w-5 h-5 text-white/50 mr-3" />
            <input 
              type="text" 
              placeholder="Search by faculty, project or skill..." 
              className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6">
          {showProposeForm ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">Propose New Project</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowProposeForm(false)} className="rounded-full">
                  <X size={20} className="text-gray-400" />
                </Button>
              </div>
              
              <form onSubmit={handleProposeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Project Title</label>
                  <input 
                    required 
                    className="w-full h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="Enter a descriptive title..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Faculty Focus</label>
                  <select className="w-full h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    <option>SCIT (Computing)</option>
                    <option>SBS (Business)</option>
                    <option>SLS (Law)</option>
                    <option>IMS (Mathematics)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Description & Objectives</label>
                  <textarea 
                    required 
                    rows={4} 
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" 
                    placeholder="What do you hope to achieve?"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowProposeForm(false)}
                    className="flex-1 h-14 rounded-2xl font-bold border-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-2 bg-primary text-white font-black h-14 px-8 rounded-2xl hover:bg-gray-900 transition-all shadow-lg text-base"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Active Projects</h4>
                <Badge variant="secondary" className="bg-gray-100 text-gray-500 font-bold uppercase text-[10px]">
                  {PROJECTS.length} Initiatives
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => handleProjectClick(project)}
                    className="group border border-gray-100 rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all bg-white cursor-pointer relative"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${project.color}`}>
                        <project.icon size={20} />
                      </div>
                      <Badge className={`${project.status === 'Open' ? 'bg-green-500' : project.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-400'} text-white border-none text-[10px] font-black`}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <h5 className="font-bold text-gray-900 mb-1 line-clamp-1">{project.title}</h5>
                    <p className="text-[10px] text-primary font-black uppercase tracking-wider mb-4">{project.faculty} Faculty</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                          <Users size={12} />
                          {project.team}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                          <Calendar size={12} />
                          {project.deadline}
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => setShowProposeForm(true)}
                className="w-full mt-6 bg-secondary text-primary font-black h-14 rounded-2xl hover:bg-secondary/90 transition-all shadow-lg text-base"
              >
                Propose a New Project
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};