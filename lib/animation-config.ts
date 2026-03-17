/**
 * ANIMATION CONFIGURATION
 * Centralized animation and transition configuration.
 * Single source of truth for durations, easings, and variants.
 */

// ============================================
// DURATIONS (in seconds)
// ============================================
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// ============================================
// EASING FUNCTIONS
// ============================================
export const EASING = {
  // Standard easings
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  
  // Custom easings (smoother)
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.4, 0, 0.6, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// ============================================
// MOTION VARIANTS (Motion)
// ============================================

/**
 * Fade In/Out
 */
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Fade + Scale (for modals, popovers)
 */
export const fadeScaleVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Slide from Right (for drawers, sidebars)
 */
export const slideFromRightVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
};

/**
 * Slide from Left
 */
export const slideFromLeftVariants = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

/**
 * Slide from Bottom (for sheets, toasts)
 */
export const slideFromBottomVariants = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
};

/**
 * Slide from Top
 */
export const slideFromTopVariants = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "-100%" },
};

/**
 * Page Transition (fade + slight slide)
 */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Stagger Children (for lists)
 */
export const staggerContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

// ============================================
// TRANSITION CONFIGS
// ============================================
export const transitionConfig = {
  fast: {
    duration: ANIMATION_DURATION.fast,
    ease: EASING.smooth,
  },
  normal: {
    duration: ANIMATION_DURATION.normal,
    ease: EASING.smooth,
  },
  slow: {
    duration: ANIMATION_DURATION.slow,
    ease: EASING.smooth,
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 15,
  },
} as const;

// ============================================
// LOADING STATES
// ============================================
export const LOADING_DELAYS = {
  immediate: 0,      // No delay
  short: 300,        // 300ms - for quick actions
  normal: 500,       // 500ms - standard delay
  long: 1000,        // 1s - for slow operations
} as const;

// ============================================
// SKELETON ANIMATION
// ============================================
export const skeletonPulseVariants = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  },
};

// ============================================
// UTILITY: Detect reduced motion preference
// ============================================
export const shouldReduceMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get transition config respecting user preferences
 */
export const getTransition = (config: keyof typeof transitionConfig) => {
  if (shouldReduceMotion()) {
    return { duration: 0.01 }; // Nearly instant
  }
  return transitionConfig[config];
};

/**
 * Get variants respecting user preferences
 */
export const getVariants = <T extends Record<string, any>>(variants: T): T => {
  if (shouldReduceMotion()) {
    // Return only the final state without animation
    return {
      initial: variants.animate,
      animate: variants.animate,
      exit: variants.animate,
    } as unknown as T;
  }
  return variants;
};