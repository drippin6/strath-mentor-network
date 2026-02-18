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
import { toast } from 'sonner';
import { Ticket, Utensils, Info } from 'lucide-react';

const formSchema = z.object({
  activityName: z.string(),
  dietaryRequirements: z.string().optional(),
  motivation: z.string().min(10, { message: 'Please share why you want to attend this activity' }),
  phoneNumber: z.string().min(10, { message: 'Valid phone number is required for coordination' }),
});

interface ReserveSpotDialogProps {
  children: React.ReactNode;
  activityName: string;
}

export const ReserveSpotDialog: React.FC<ReserveSpotDialogProps> = ({ children, activityName }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityName: activityName,
      dietaryRequirements: '',
      motivation: '',
      phoneNumber: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(`Spot reserved for ${activityName}! Check your email for confirmation.`);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-[95vw] rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-black text-primary">Reserve Your Spot</DialogTitle>
          <DialogDescription className="text-gray-500 font-medium">
            Secure your place at the <span className="text-secondary font-bold">{activityName}</span> event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4 md:py-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <Ticket size={16} className="text-secondary" /> Contact Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0700 000 000" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dietaryRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <Utensils size={16} className="text-secondary" /> Dietary Requirements (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="None, Vegetarian, Halal, etc." {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <Info size={16} className="text-secondary" /> Why do you want to join?
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your interest in this activity..." 
                      className="min-h-[120px] rounded-xl border-gray-100 focus-visible:ring-primary resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2 sm:pt-4">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 transition-all text-base"
              >
                Confirm Reservation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};