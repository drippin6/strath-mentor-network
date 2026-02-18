import React from 'react';
import { Eye, User, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ImpersonationToolbarProps {
  targetUser: {
    name: string;
    role: string;
    year: number;
  };
  onExit: () => void;
}

const ImpersonationToolbar: React.FC<ImpersonationToolbarProps> = ({ targetUser, onExit }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-600 text-white h-12 flex items-center px-4 shadow-xl border-b border-amber-700/50">
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Eye size={18} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest opacity-80">Impersonation Mode:</span>
            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full">
              <User size={12} />
              <span className="text-sm font-bold">{targetUser.name}</span>
              <Badge className="bg-white text-amber-700 hover:bg-white text-[10px] font-black px-1.5 py-0 h-4 uppercase">
                Year {targetUser.year}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold">
            <ShieldAlert size={14} className="text-amber-200" />
            <span>Sensitive actions are disabled in view-only mode.</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 font-black text-xs uppercase tracking-wider"
            onClick={onExit}
          >
            <X size={16} className="mr-2" />
            Exit View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImpersonationToolbar;