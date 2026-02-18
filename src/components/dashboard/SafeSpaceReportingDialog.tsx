import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { ShieldAlert, Send, User, Lock, Info } from 'lucide-react';
import { SAFE_SPACE_CATEGORIES } from '@/lib/constants';

const formSchema = z.object({
  isAnonymous: z.boolean(),
  fullName: z.string().optional(),
  studentId: z.string().optional(),
  incidentType: z.string().min(1, { message: 'Please select an incident type' }),
  description: z.string().min(10, { message: 'Please provide enough detail to help us understand the situation' }),
  contactMethod: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SafeSpaceReportingDialogProps {
  children: React.ReactNode;
}

export const SafeSpaceReportingDialog: React.FC<SafeSpaceReportingDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAnonymous: false,
      fullName: '',
      studentId: '',
      incidentType: '',
      description: '',
      contactMethod: '',
    },
  });

  const isAnonymous = form.watch('isAnonymous');

  function onSubmit(values: FormValues) {
    console.log('Safe Space Report:', values);
    toast.success('Your report has been submitted securely.', {
      description: values.isAnonymous 
        ? 'Submitted anonymously. Thank you for speaking up.' 
        : 'Thank you for your report. The office will reach out to you.',
      icon: <ShieldAlert className="text-red-500" />
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <ShieldAlert className="text-[#800000] w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#800000]">Safe Space Reporting</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            A confidential channel for reporting incidents or concerns. We prioritize your safety and well-being.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <Info className="text-[#000080] w-5 h-5 flex-shrink-0" />
              <p className="text-xs text-[#000080] leading-relaxed">
                Reports are handled with extreme care by a dedicated safeguarding team. You can choose to remain completely anonymous.
              </p>
            </div>

            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 bg-gray-50/50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold flex items-center gap-2 cursor-pointer">
                      <Lock size={14} className="text-[#800000]" /> Submit Anonymously
                    </FormLabel>
                    <FormDescription className="text-[10px]">
                      Your personal details will not be recorded or visible to the review team.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {!isAnonymous && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User size={14} className="text-[#D4AF37]" /> Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="focus-visible:ring-[#800000]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User size={14} className="text-[#D4AF37]" /> Student ID
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="123456" {...field} className="focus-visible:ring-[#800000]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="incidentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incident Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-[#800000]">
                        <SelectValue placeholder="Select the type of concern" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SAFE_SPACE_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details of the Incident</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide as much detail as possible (date, location, people involved)..." 
                      className="min-h-[120px] focus-visible:ring-[#800000]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:flex-1 bg-[#800000] hover:bg-[#600000] text-white flex items-center justify-center gap-2 py-6 text-lg font-bold shadow-lg"
              >
                <Send size={18} /> Submit {isAnonymous ? 'Anonymously' : 'Report'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};