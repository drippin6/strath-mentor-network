import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Smartphone, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface AdminMFAProps {
  onVerify: () => void;
  onBack: () => void;
  email: string;
}

const AdminMFA: React.FC<AdminMFAProps> = ({ onVerify, onBack, email }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }

    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      if (code === '123456') { // Mock code for testing
        toast.success("MFA Verified. Accessing Admin HQ.");
        onVerify();
      } else {
        toast.error("Invalid verification code. Please try again.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-md w-full animate-in fade-in zoom-in duration-300 relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="p-4 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-full mb-6 mt-4">
        <Smartphone size={32} />
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin MFA Required</h2>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Sensitive student data requires extra security. We've sent a 6-digit code to 
          <span className="font-bold text-slate-900 dark:text-white ml-1">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="w-full space-y-6">
        <div className="flex justify-center gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            className="text-center text-3xl font-black tracking-[0.5em] h-16 bg-slate-50 border-2 focus:border-indigo-500"
            autoFocus
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-slate-400 font-medium">
          Didn't receive a code? <button type="button" className="text-indigo-600 hover:underline">Resend Code</button>
        </p>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-center gap-2">
        <ShieldCheck size={16} className="text-green-500" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Grade Security</span>
      </div>
    </div>
  );
};

export default AdminMFA;