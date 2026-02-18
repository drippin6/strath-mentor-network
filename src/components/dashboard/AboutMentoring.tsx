import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target, 
  Lightbulb, 
  ChevronRight,
  ShieldCheck,
  Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutMentoring: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] bg-gradient-to-br from-primary to-maroonLight p-8 md:p-16 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-24 -mb-24 blur-2xl" />
        
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-secondary text-primary font-black mb-6 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">
            {t('about.hero_badge')}
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            {t('about.hero_title').replace('{span}', '')} <span className="text-secondary">{t('about.hero_span')}</span>
          </h1>
          <p className="text-base md:text-xl text-white/90 font-medium leading-relaxed">
            {t('about.hero_desc')}
          </p>
        </div>
      </section>

      {/* The New Model Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-primary flex items-center gap-3">
            <Lightbulb className="text-secondary w-8 h-8" />
            {t('about.model_title')}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t('about.model_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: t('about.peer_mentoring'), desc: t('about.peer_mentoring_desc'), icon: Users },
              { title: t('about.industry_coaching'), desc: t('about.industry_coaching_desc'), icon: Target },
              { title: t('about.academic_advising'), desc: t('about.academic_advising_desc'), icon: ShieldCheck },
              { title: t('about.values_growth'), desc: t('about.values_growth_desc'), icon: Heart },
            ].map((item, i) => (
              <Card key={i} className="border-none bg-white shadow-sm hover:shadow-md transition-all rounded-2xl">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-3 text-primary">
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 opacity-10">
             <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/07492fd9-ad9c-4a0e-9a1a-257ae70b3ed1/success-framework-img-72c95974-1770917751375.webp" alt="Pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Creator" />
              </div>
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-widest">{t('about.creator_label')}</p>
                <h3 className="text-xl font-bold text-gray-900">John Strathmore</h3>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl italic text-gray-700 font-medium leading-relaxed mb-6">
              {t('about.creator_quote')}
            </blockquote>
            <Button className="w-full sm:w-auto bg-primary text-white font-bold rounded-xl px-6 h-12">
              {t('dash.contact_office')}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Framework */}
      <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4">{t('about.framework_title')}</h2>
          <p className="text-gray-500 font-medium">{t('about.framework_desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            { step: '01', title: t('about.step1_title'), desc: t('about.step1_desc') },
            { step: '02', title: t('about.step2_title'), desc: t('about.step2_desc') },
            { step: '03', title: t('about.step3_title'), desc: t('about.step3_desc') },
            { step: '04', title: t('about.step4_title'), desc: t('about.step4_desc') },
          ].map((item, i) => (
            <div key={i} className="relative p-6 rounded-3xl bg-gray-50 hover:bg-primary transition-all group group-hover:text-white">
              <span className="text-5xl font-black text-primary/10 group-hover:text-white/20 transition-colors absolute top-4 right-6">{item.step}</span>
              <h3 className="text-xl font-bold mb-3 mt-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-secondary/10 rounded-[2rem] p-8 md:p-16 text-center border-2 border-dashed border-secondary/30">
        <h3 className="text-2xl md:text-4xl font-black text-primary mb-4">{t('about.cta_title')}</h3>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto text-base md:text-lg font-medium">{t('about.cta_desc')}</p>
        <Button className="w-full sm:w-auto bg-primary text-white font-black py-8 px-12 rounded-2xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all text-xl shadow-2xl shadow-primary/20">
           {t('about.cta_button')} <ChevronRight className="ml-2 w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};