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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, Users, BookOpen, Info } from 'lucide-react';
import { ACTIVITY_BOOKING_TITLE } from '@/lib/constants';

const formSchema = z.object({
  activityType: z.string().min(1, { message: "Please select an activity type" }),
  activityName: z.string().min(2, {
    message: "Activity name must be at least 2 characters.",
  }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  expectedParticipants: z.string().min(1, { message: "Expected participants is required" }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface ActivityBookingDialogProps {
  children: React.ReactNode;
}

export const ActivityBookingDialog: React.FC<ActivityBookingDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityType: '',
      activityName: '',
      date: '',
      time: '',
      location: '',
      expectedParticipants: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(`Booking request for "${values.activityName}" submitted successfully!`);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border-none">
        <DialogHeader>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="text-primary w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-black text-primary">
            {ACTIVITY_BOOKING_TITLE}
          </DialogTitle>
          <DialogDescription className="text-gray-500 font-medium text-base">
            Organize a new activity or workshop for the community.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Activity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-gray-100 focus:ring-primary">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="networking">Networking Event</SelectItem>
                        <SelectItem value="mentorship">Mentorship Session</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">Activity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Finance 101" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <Calendar size={16} className="text-secondary" /> Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <Clock size={16} className="text-secondary" /> Time
                    </FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <MapPin size={16} className="text-secondary" /> Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Physical room or Link" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <Users size={16} className="text-secondary" /> Expected Count
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="20" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <Info size={16} className="text-secondary" /> Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about this activity..." 
                      className="min-h-[100px] rounded-xl border-gray-100 focus-visible:ring-primary resize-none" 
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
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 transition-all text-lg"
              >
                Submit Booking Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};