import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[1100] flex items-center gap-2 px-4 py-2 bg-[#111111]/90 backdrop-blur-sm border border-blue-500/30 rounded text-neutral-200 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all group"
          aria-label="Zum Seitenanfang springen"
        >
          <span className="mono text-[10px] uppercase tracking-widest hidden sm:block">
            [Zum Seitenanfang]
          </span>
          <ChevronUp className="w-4 h-4 text-blue-500 group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
