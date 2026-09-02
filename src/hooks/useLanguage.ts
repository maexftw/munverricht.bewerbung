/**
 * Custom React Hook for accessing Language State and Translations
 * Maximilian Unverricht Digital Résumé & Portfolio
 */

import { useLanguage as useLangContext } from '../context/LanguageContext';
import type { LanguageContextType } from '../types/i18n';

export function useLanguage(): LanguageContextType {
  return useLangContext();
}

export default useLanguage;
