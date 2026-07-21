import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme as AstryxTheme } from '@astryxdesign/core';
import { munverrichtPortfolioTheme } from './astryx/munverricht-portfolio';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: React.ReactNode;
  forcedTheme?: Theme;
  withAstryx?: boolean;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, forcedTheme, withAstryx = false }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (forcedTheme || typeof window === 'undefined') return forcedTheme ?? 'dark';
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  });

  const activeTheme = forcedTheme ?? theme;

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', activeTheme);

    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('--bg-color', '#050505');
      document.documentElement.style.setProperty('--text-color', '#e5e5e5');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
    }
    
    // Save theme preference
    if (!forcedTheme) {
      localStorage.setItem('theme', activeTheme);
    }
  }, [forcedTheme, theme]);

  const toggleTheme = () => {
    if (forcedTheme) {
      return;
    }

    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const content = (
    <ThemeContext.Provider value={{ theme: activeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

  return withAstryx ? (
    <AstryxTheme theme={munverrichtPortfolioTheme} mode={activeTheme}>
      {content}
    </AstryxTheme>
  ) : content;
};

export default ThemeProvider;
