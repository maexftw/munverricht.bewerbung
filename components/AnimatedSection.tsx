import React from 'react';
import { motion } from 'framer-motion';
import { sectionReveal, sectionViewport } from './motionTokens';

type AnimatedSectionProps = {
  children: React.ReactNode;
  delay?: number;
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0 }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
    variants={{
      ...sectionReveal,
      visible: {
        ...sectionReveal.visible,
        transition: {
          ...sectionReveal.visible.transition,
          delay,
        },
      },
    }}
    style={{ willChange: 'transform, opacity, clip-path, filter' }}
  >
    {children}
  </motion.section>
);

export default AnimatedSection;
