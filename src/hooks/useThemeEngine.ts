import { useEffect, useState, useCallback } from 'react';
import { PALETTES } from '@/lib/constants';

export type ThemeMode = 'manual' | 'auto' | 'time-based';

export const useThemeEngine = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme_mode') as ThemeMode) || 'manual';
  });

  const [currentPaletteId, setCurrentPaletteId] = useState(() => {
    return localStorage.getItem('current_palette_id') || PALETTES[0].id;
  });

  const applyTheme = useCallback((paletteId: string) => {
    const palette = PALETTES.find(p => p.id === paletteId) || PALETTES[0];
    
    document.documentElement.style.setProperty('--primary', palette.primary);
    document.documentElement.style.setProperty('--secondary', palette.secondary);
    document.documentElement.style.setProperty('--accent', palette.accent);
    
    // Add light versions (opacity 10%)
    document.documentElement.style.setProperty('--primary-light', `${palette.primary}1a`);
    document.documentElement.style.setProperty('--secondary-light', `${palette.secondary}1a`);
    document.documentElement.style.setProperty('--accent-light', `${palette.accent}1a`);
    
    setCurrentPaletteId(paletteId);
    localStorage.setItem('current_palette_id', paletteId);
  }, []);

  const randomizeTheme = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PALETTES.length);
    applyTheme(PALETTES[randomIndex].id);
  }, [applyTheme]);

  // Automated cycling logic
  useEffect(() => {
    if (themeMode !== 'auto') return;

    // Change theme every 1 hour (for demo purposes let's do 10 minutes if we wanted, but let's stick to a reasonable "automated" feel)
    // Actually, let's make it change every time the app loads if 'auto', or have a slow interval.
    const interval = setInterval(() => {
      randomizeTheme();
    }, 1000 * 60 * 30); // Every 30 minutes

    return () => clearInterval(interval);
  }, [themeMode, randomizeTheme]);

  // Time-based logic
  useEffect(() => {
    if (themeMode !== 'time-based') return;

    const updateTimeTheme = () => {
      const hour = new Date().getHours();
      let selectedId = PALETTES[0].id;

      if (hour >= 6 && hour < 12) {
        selectedId = 'strathmore-vibrant'; // Morning
      } else if (hour >= 12 && hour < 18) {
        selectedId = 'strathmore-classic'; // Afternoon
      } else if (hour >= 18 && hour < 22) {
        selectedId = 'nature-heritage'; // Evening
      } else {
        selectedId = 'royal-navy'; // Night
      }

      applyTheme(selectedId);
    };

    updateTimeTheme();
    const interval = setInterval(updateTimeTheme, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [themeMode, applyTheme]);

  const toggleThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    localStorage.setItem('theme_mode', mode);
  };

  // Initial apply
  useEffect(() => {
    if (themeMode === 'manual') {
      applyTheme(currentPaletteId);
    }
  }, []);

  return {
    themeMode,
    currentPaletteId,
    toggleThemeMode,
    randomizeTheme,
    applyTheme,
    palettes: PALETTES
  };
};