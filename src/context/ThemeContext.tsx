'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isThemeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: 'light' | 'dark' = 'dark'; // ⚡ پیش‌فرض دارک

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(DEFAULT_THEME);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
    const initialTheme = storedTheme || DEFAULT_THEME;

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(initialTheme);

    setTheme(initialTheme);
    setIsThemeLoaded(true);

    // ⚡ اگر هیچ چیزی در localStorage نبود، پیش‌فرض را ذخیره کن
    if (!storedTheme) {
      localStorage.setItem(THEME_STORAGE_KEY, initialTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove(prev);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  if (!isThemeLoaded) return <div className="theme-loading" />;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
