/**
 * Motion configuration with reduced-motion support
 * Uses Framer Motion's built-in useReducedMotion hook for React components
 * This file provides non-hook utilities for contexts outside components
 */

/** Check if user prefers reduced motion (non-hook, for server/utility use) */
export const shouldReduceMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Standard spring transition used across the app */
export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

/** Container animation variants (stagger children) */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/** Item animation variants (slide up + fade in) */
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springTransition,
  },
};

/** Card animation variants (slide up from further) */
export const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

/** Floating animation for background decorative elements */
export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};
