import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import {
  pageTransitionVariants,
  fadeVariants,
  fadeScaleVariants,
  getTransition,
  getVariants,
} from "../../lib/animation-config";

/**
 * PAGE TRANSITION WRAPPER
 * Wrapper that applies transition animations to pages/views
 */

interface PageTransitionProps {
  children: ReactNode;
  variant?: "page" | "fade" | "scale";
  className?: string;
  id?: string;
}

export function PageTransition({ 
  children, 
  variant = "page", 
  className = "",
  id,
}: PageTransitionProps) {
  const variantMap = {
    page: pageTransitionVariants,
    fade: fadeVariants,
    scale: fadeScaleVariants,
  };

  const selectedVariants = getVariants(variantMap[variant]);

  return (
    <motion.div
      id={id}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={selectedVariants}
      transition={getTransition("normal")}
    >
      {children}
    </motion.div>
  );
}

/**
 * ANIMATED PRESENCE WRAPPER
 * Wrapper for AnimatePresence with standard configuration
 */
interface AnimatedPresenceWrapperProps {
  children: ReactNode;
  mode?: "wait" | "sync" | "popLayout";
}

export function AnimatedPresenceWrapper({ 
  children, 
  mode = "wait" 
}: AnimatedPresenceWrapperProps) {
  return (
    <AnimatePresence mode={mode}>
      {children}
    </AnimatePresence>
  );
}

/**
 * FADE IN VIEW
 * Component that fades in when entering the viewport
 */
interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInView({ children, className = "", delay = 0 }: FadeInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        ...getTransition("normal"),
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * STAGGER CONTAINER
 * Container for animating children with stagger effect
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ 
  children, 
  className = "", 
  staggerDelay = 0.05 
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * STAGGER ITEM
 * Individual item in a StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={getTransition("fast")}
    >
      {children}
    </motion.div>
  );
}