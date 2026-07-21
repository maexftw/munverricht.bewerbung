import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { IconButton } from '@astryxdesign/core/IconButton';

type ScrollToTopProps = { language?: 'de' | 'en' };

const ScrollToTop: React.FC<ScrollToTopProps> = ({ language = 'de' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const label = language === 'de' ? 'Zum Seitenanfang springen' : 'Back to top';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-[1100]"
        >
          <IconButton
            label={label}
            tooltip={label}
            variant="secondary"
            icon={<ChevronUp aria-hidden="true" />}
            onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;