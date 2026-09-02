/**
 * Bilingual Language Context & Provider
 * Manages language state ('de' | 'en'), localStorage persistence, DOM html lang attribute sync, and reactive translation dictionaries.
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Language, TranslationDictionary, LanguageContextType } from '../types/i18n';
import { translationsDe } from '../data/translationsDe';
import { translationsEn } from '../data/translationsEn';

export const LANGUAGE_STORAGE_KEY = 'mu_lang_pref';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'de';
  }
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'de' || stored === 'en') {
      return stored;
    }
  } catch {
    // Fallback on storage access error (e.g. sandboxed iframe or private browsing)
  }
  return 'de';
}

export interface LanguageProviderProps {
  children?: React.ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage === 'de' || initialLanguage === 'en') {
      return initialLanguage;
    }
    return getInitialLanguage();
  });

  const syncDomAndStorage = useCallback((lang: Language) => {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('lang', lang);
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch {
        // Gracefully ignore storage write error (e.g. SecurityError, QuotaExceededError)
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    const safeLang: Language = (lang === 'de' || lang === 'en') ? lang : 'de';
    setLanguageState(safeLang);
    syncDomAndStorage(safeLang);
  }, [syncDomAndStorage]);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang: Language = prev === 'de' ? 'en' : 'de';
      syncDomAndStorage(nextLang);
      return nextLang;
    });
  }, [syncDomAndStorage]);

  useEffect(() => {
    syncDomAndStorage(language);
  }, [language, syncDomAndStorage]);

  const dict: TranslationDictionary = useMemo(() => {
    return language === 'en' ? translationsEn : translationsDe;
  }, [language]);

  const t = useMemo(() => {
    const tLookup = (key: string): string => {
      const parts = key.split('.');
      let current: any = dict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return key;
        }
      }
      return typeof current === 'string' ? current : key;
    };
    return Object.assign(tLookup, dict) as TranslationDictionary;
  }, [dict]);

  const contextValue: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t
  }), [language, setLanguage, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
