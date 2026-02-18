import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Minus, 
  MessageCircle, 
  Mail, 
  Phone, 
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ContactOfficeDialog } from './ContactOfficeDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQS = [
  {
    question: "What is the new mentorship model at Strathmore?",
    answer: "The new model is a holistic, 360-degree approach that combines peer mentoring, industry coaching, and academic advising. It focuses on character development, professional growth, and social responsibility."
  },
  {
    question: "How do I get matched with a mentor?",
    answer: "You can request a mentor through the 'Matching Portal' on your dashboard. Depending on your year of study, you'll be matched with either a peer mentor (Big Brother/Sister) or an industry professional."
  },
  {
    question: "Is mentorship mandatory?",
    answer: "While not 'mandatory' in the traditional sense, participation in the mentorship program is highly encouraged and linked to specific university growth milestones and the Graduate Excellence Badge."
  },
  {
    question: "How often should I meet with my mentor?",
    answer: "We recommend meeting at least once a month. However, the frequency can be adjusted based on your needs and your mentor's availability. Consistent communication is key."
  },
  {
    question: "What should I do if my mentor is unresponsive?",
    answer: "If you haven't heard from your mentor for over two weeks despite attempts to contact them, please use the 'Contact Office' feature on the dashboard to alert the Mentoring Office."
  },
  {
    question: "Can I change my mentor?",
    answer: "Yes, if you feel the match is not working out after at least two sessions, you can request a reassignment through the Mentoring Office portal."
  },
  {
    question: "What is the Success Framework?",
    answer: "The Success Framework is a 4-step roadmap (Discovery, Connection, Action, Impact) designed to guide your personal and professional development throughout your four years at Strathmore."
  }
];

export const SupportFAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="text-primary w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">{t('support.title')}</h1>
        <p className="text-gray-500 font-medium text-lg">
          {t('support.desc')}
        </p>
      </header>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, i) => (
          <div 
            key={i} 
            className={`rounded-2xl border transition-all overflow-hidden ${openIndex === i ? 'border-primary shadow-md bg-white' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>
                {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="px-6 pb-6 pt-0">
                <p className="text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
               <Mail size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{t('support.email_title')}</h4>
            <p className="text-sm text-gray-500 mb-4">{t('support.email_desc')}</p>
            <a href="mailto:mentorship@strathmore.edu" className="text-primary font-black text-sm hover:underline">mentorship@strathmore.edu</a>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
               <Phone size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{t('support.call_title')}</h4>
            <p className="text-sm text-gray-500 mb-4">{t('support.call_desc')}</p>
            <span className="text-primary font-black text-sm">+254 703 034 000</span>
         </div>

         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
               <MessageCircle size={24} />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{t('support.chat_title')}</h4>
            <p className="text-sm text-gray-500 mb-4">{t('support.chat_desc')}</p>
            <ContactOfficeDialog>
               <Button variant="outline" className="rounded-xl font-bold border-primary text-primary hover:bg-primary hover:text-white h-10">
                  {t('support.open_ticket')}
               </Button>
            </ContactOfficeDialog>
         </div>
      </div>

      <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <h3 className="text-2xl font-black mb-2">{t('support.still_questions')}</h3>
               <p className="text-white/80 font-medium">{t('support.still_questions_desc')}</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-sm font-bold text-white/60">
                  <Clock size={16} /> {t('support.response_time')}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};