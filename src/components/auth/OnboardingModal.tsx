import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Target, Users, BookOpen, Sparkles } from 'lucide-react';

interface MilestoneOnboardingProps {
  onComplete: () => void;
}

const milestones = [
  { id: 1, text: "Connect with a Peer Mentor", icon: Users },
  { id: 2, text: "Attend first Karura Excursion", icon: Sparkles },
  { id: 3, text: "Complete 4 leadership modules", icon: BookOpen },
  { id: 4, text: "Set 4-year growth goals", icon: Target },
];

export const MilestoneOnboarding: React.FC<MilestoneOnboardingProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to Your Journey</h2>
          <p className="text-gray-500 mt-2">Define your initial developmental milestones.</p>
        </div>

        <div className="space-y-3 mb-8">
          {milestones.map((m) => {
            const isSelected = selected.includes(m.id);
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  isSelected ? 'border-[#800000] bg-[#800000]/5' : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'bg-[#800000] border-[#800000]' : 'border-gray-300'
                }`}>
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
                <Icon size={18} className={isSelected ? 'text-[#800000]' : 'text-gray-400'} />
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>{m.text}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={onComplete}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-xl bg-[#800000] text-white font-bold transition-all disabled:opacity-50"
        >
          Begin My Transformation
        </button>
      </motion.div>
    </div>
  );
};