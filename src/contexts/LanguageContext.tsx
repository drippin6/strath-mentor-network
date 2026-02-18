import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { DEFAULT_LANGUAGE } from '@/lib/constants';

// Define the shape of our translations
type Translations = Record<string, string>;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('user_language') || DEFAULT_LANGUAGE;
  });
  
  const [translations, setTranslations] = useState<Translations>(() => {
    // We could potentially seed with en.json if we had it bundled, but let's stick to fetching
    return {};
  });
  const [isLoading, setIsLoading] = useState(true);
  const cache = useRef<Record<string, Translations>>({});

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('user_language', lang);
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadTranslations = async () => {
      // Check cache first
      if (cache.current[language]) {
        if (isMounted) {
          setTranslations(cache.current[language]);
          setIsLoading(false);
        }
        return;
      }

      try {
        // Use a relative path that works in both dev and prod
        // Add a timestamp to avoid cache issues during development or if files change
        const response = await fetch(`/locales/${language}.json?v=${new Date().getTime()}`);
        
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            cache.current[language] = data;
            setTranslations(data);
          }
        } else {
          console.warn(`Translation file for ${language} not found, falling back to English.`);
          if (language !== 'en') {
            const fallbackResponse = await fetch(`/locales/en.json?v=${new Date().getTime()}`);
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              if (isMounted) {
                cache.current['en'] = fallbackData;
                setTranslations(fallbackData);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const t = useCallback((key: string): string => {
    if (!translations[key]) {
      // If we are currently loading and have no translations yet, return the key
      // but we could also return a placeholder like "..."
      return key;
    }
    return translations[key];
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};