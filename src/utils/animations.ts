import type { Variants } from 'framer-motion';

export const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

export const gentleSpring = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 24,
};

export const smoothEase = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

export const viewportScrollConfig = {
  once: true,
  margin: '0px',
};
