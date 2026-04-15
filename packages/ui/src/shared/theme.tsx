import React, { createContext, useContext, useMemo, useState } from 'react';
import { DARK_THEME, LIGHT_THEME } from './constants';

export type ThemeMode = 'light' | 'dark';

export type DesignTheme = typeof LIGHT_THEME | typeof DARK_THEME;

interface ThemeContextValue {
  theme: DesignTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface UIThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export function UIThemeProvider({
  children,
  defaultMode = 'light',
}: UIThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const value = useMemo<ThemeContextValue>(() => {
    const theme = mode === 'dark' ? DARK_THEME : LIGHT_THEME;
    return {
      theme,
      mode,
      setMode,
      toggleTheme: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useUITheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useUITheme must be used within UIThemeProvider');
  }
  return context;
}
