import React, { createContext, useContext, useState, useEffect } from 'react';

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

export const ThemeProvider: React.FC<{ children: React.ReactNode; forcedTheme?: Theme }> = ({ children, forcedTheme }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (forcedTheme) {
      return;
    }

    // Check for saved theme and default to dark for strongest visual presentation
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, [forcedTheme]);

  useEffect(() => {
    const activeTheme = forcedTheme ?? theme;

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
