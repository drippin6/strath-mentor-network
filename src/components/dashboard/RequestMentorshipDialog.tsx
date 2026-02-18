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
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserCheck, Clock, Target, MessageSquare, Video, MapPin } from 'lucide-react';

const formSchema = z.object({
  mentorName: z.string(),
  preferredTime: z.string().min(2, { message: 'Preferred time is required' }),
  areaOfInterest: z.string().min(5, { message: 'Please specify your area of interest' }),
  goals: z.string().min(10, { message: 'Please describe your goals for this mentorship' }),
  urgency: z.string().min(1, { message: 'Please select urgency level' }),
  meetingPreference: z.string().min(1, { message: 'Please select meeting preference' }),
});

interface RequestMentorshipDialogProps {
  children: React.ReactNode;
  mentorName: string;
}

export const RequestMentorshipDialog: React.FC<RequestMentorshipDialogProps> = ({ children, mentorName }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentorName: mentorName,
      preferredTime: '',
      areaOfInterest: '',
      goals: '',
      urgency: 'medium',
      meetingPreference: 'digital',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(`Mentorship request sent to ${mentorName}. Expect a response within 48 hours.`);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#800000]">Request Mentorship</DialogTitle>
          <DialogDescription>
            Connect with <span className="font-semibold text-[#800000]">{mentorName}</span> to accelerate your growth.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock size={14} className="text-[#D4AF37]" /> Preferred Time
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Wed afternoons" {...field} className="focus-visible:ring-[#800000]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Target size={14} className="text-[#D4AF37]" /> Urgency
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-[#800000]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low - General Guidance</SelectItem>
                        <SelectItem value="medium">Medium - Project/Help</SelectItem>
                        <SelectItem value="high">High - Urgent Advice</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="meetingPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#D4AF37]" /> Meeting Format
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus-visible:ring-[#800000]">
                        <SelectValue placeholder="How would you like to meet?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="physical">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>Physical (On-campus)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="digital">
                        <div className="flex items-center gap-2">
                          <Video size={14} />
                          <span>Digital (Zoom/Meet/Teams)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-[#D4AF37]" /> Primary Area of Interest
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Python for Data Science" {...field} className="focus-visible:ring-[#800000]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you hope to achieve?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your learning objectives..." 
                      className="min-h-[100px] focus-visible:ring-[#800000]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-[#800000] hover:bg-[#600000] text-white flex items-center gap-2"
              >
                <UserCheck size={16} /> Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};