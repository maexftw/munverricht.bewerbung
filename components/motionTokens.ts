import type { Transition, Variants } from 'framer-motion';

export const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motionTimings = {
  quick: 0.18,
  feedback: 0.24,
  reveal: 0.56,
  hero: 0.72,
  stagger: 0.08,
};

export const sectionViewport = { once: true, amount: 0.2 };

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    clipPath: 'inset(0 0 8% 0)',
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    filter: 'blur(0px)',
    transition: {
      duration: motionTimings.reveal,
      ease: motionEase,
    },
  },
};

export const itemReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: motionEase,
    },
  },
};

export const subtleHover = {
  y: -3,
  scale: 1.012,
  transition: { duration: motionTimings.feedback, ease: motionEase },
};

export const subtleTap = {
  scale: 0.985,
  transition: { duration: motionTimings.quick, ease: motionEase },
};

export const makeTransition = (delay = 0, duration = motionTimings.reveal): Transition => ({
  duration,
  delay,
  ease: motionEase,
});
