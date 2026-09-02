import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../context/LanguageContext';

/**
 * LiveAnnouncer component provides an ARIA live region (role="status", aria-live="polite")
 * for screen readers to announce runtime state changes such as theme modes,
 * color palettes, font size scaling, low contrast mode, and language switches.
 */
export const LiveAnnouncer: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string>('');
  const isInitialMount = useRef(true);

  let mode = 'light';
  let palette = 'default';
  let fontSizeOffset = 0;
  let isLowContrast = false;

  try {
    const theme = useTheme();
    mode = theme.mode;
    palette = theme.palette;
    fontSizeOffset = theme.fontSizeOffset;
    isLowContrast = theme.isLowContrast;
  } catch {
    // Graceful fallback outside ThemeProvider
  }

  let language: 'de' | 'en' = 'de';
  try {
    const lang = useLanguage();
    language = lang.language;
  } catch {
    // Graceful fallback outside LanguageProvider
  }

  // Announce language change
  useEffect(() => {
    if (isInitialMount.current) return;
    const msg = language === 'de' ? 'Sprache auf Deutsch geändert' : 'Language switched to English';
    setAnnouncement(msg);
  }, [language]);

  // Announce theme mode change
  useEffect(() => {
    if (isInitialMount.current) return;
    const modeNames = {
      light: language === 'de' ? 'Hell' : 'Light',
      sepia: language === 'de' ? 'Sepia' : 'Sepia',
      dark: language === 'de' ? 'Dunkel' : 'Dark',
    };
    const modeLabel = modeNames[mode as keyof typeof modeNames] || mode;
    const msg = language === 'de' ? `Farbmodus geändert zu: ${modeLabel}` : `Theme mode switched to: ${modeLabel}`;
    setAnnouncement(msg);
  }, [mode, language]);

  // Announce palette change
  useEffect(() => {
    if (isInitialMount.current) return;
    const msg =
      language === 'de'
        ? `Farbpalette geändert zu: ${palette}`
        : `Theme palette changed to: ${palette}`;
    setAnnouncement(msg);
  }, [palette, language]);

  // Announce font scale offset change
  useEffect(() => {
    if (isInitialMount.current) return;
    const size = 14 + fontSizeOffset;
    const msg =
      language === 'de'
        ? `Schriftgröße geändert: ${size} Pixel (${fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}px)`
        : `Font size updated: ${size} pixels (${fontSizeOffset >= 0 ? `+${fontSizeOffset}` : fontSizeOffset}px)`;
    setAnnouncement(msg);
  }, [fontSizeOffset, language]);

  // Announce low contrast mode change
  useEffect(() => {
    if (isInitialMount.current) return;
    const msg = isLowContrast
      ? language === 'de'
        ? 'Reduzierter Kontrast aktiviert'
        : 'Low contrast mode enabled'
      : language === 'de'
      ? 'Standardkontrast wiederhergestellt'
      : 'Standard contrast restored';
    setAnnouncement(msg);
  }, [isLowContrast, language]);

  // Mark initial mount as complete
  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      data-testid="a11y-live-region"
    >
      {announcement}
    </div>
  );
};

export default LiveAnnouncer;
