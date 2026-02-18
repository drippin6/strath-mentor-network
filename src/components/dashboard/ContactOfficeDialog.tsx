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
import { Send, User, IdCard, Mail, MessageSquare, Headphones } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  studentId: z.string().min(5, { message: 'Valid Student ID is required' }),
  email: z.string().email({ message: 'Valid Strathmore email is required' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Please provide more details about your matter' }),
});

interface ContactOfficeDialogProps {
  children: React.ReactNode;
}

export const ContactOfficeDialog: React.FC<ContactOfficeDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      studentId: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success('Your message has been sent to the Mentoring Office. We will get back to you soon.');
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border-none shadow-2xl">
        <DialogHeader>
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Headphones className="text-primary" size={24} />
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-black text-primary">Contact Mentoring Office</DialogTitle>
          <DialogDescription className="text-gray-500 font-medium">
            Please fill out the form below to address your concerns or inquiries.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <User size={16} className="text-secondary" /> Full Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
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
                    <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                      <IdCard size={16} className="text-secondary" /> Student ID
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <Mail size={16} className="text-secondary" /> Email Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="student@strathmore.edu" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 font-bold text-gray-700">
                    <MessageSquare size={16} className="text-secondary" /> Subject
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="What is this regarding?" {...field} className="h-12 rounded-xl border-gray-100 focus-visible:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">Matter at Hand</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your request or concern in detail..." 
                      className="min-h-[120px] rounded-xl border-gray-100 focus-visible:ring-primary resize-none" 
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
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 transition-all text-base flex items-center justify-center gap-2"
              >
                <Send size={18} /> Submit Inquiry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};