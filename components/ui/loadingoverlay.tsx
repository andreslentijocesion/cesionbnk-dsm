import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { fadeVariants, getTransition, getVariants } from "../../lib/animation-config";
import { useLoading } from "../providers/loadingprovider";

/**
 * LOADING OVERLAY
 * Global loading overlay that covers the entire screen
 */

interface LoadingOverlayProps {
  message?: string;
  variant?: "spinner" | "dots" | "bar";
}

export function LoadingOverlay({ 
  message = "Loading...", 
  variant = "spinner" 
}: LoadingOverlayProps) {
  const loading = useLoading();
  const loadingState = loading?.loadingState || { isLoading: false };

  return (
    <AnimatePresence>
      {loadingState.isLoading && loadingState.type === "overlay" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          variants={getVariants(fadeVariants)}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={getTransition("fast")}
        >
          <motion.div
            className="flex flex-col items-center gap-4 rounded-lg bg-card p-8 shadow-lg border"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={getTransition("normal")}
          >
            {variant === "spinner" && (
              <Loader2 className="size-12 animate-spin text-primary" />
            )}
            {variant === "dots" && <LoadingDots />}
            {variant === "bar" && <LoadingBar />}
            
            {(loadingState.message || message) && (
              <p className="text-sm text-muted-foreground">
                {loadingState.message || message}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * LOADING DOTS
 * Three-dot animation
 */
function LoadingDots() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="size-3 rounded-full bg-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/**
 * LOADING BAR
 * Indeterminate progress bar
 */
function LoadingBar() {
  return (
    <div className="relative h-2 w-64 overflow-hidden rounded-full bg-muted">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/3 bg-primary"
        animate={{
          x: ["-100%", "300%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/**
 * INLINE LOADING SPINNER
 * Small spinner for inline use
 */
interface InlineSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function InlineSpinner({ size = "md", className = "" }: InlineSpinnerProps) {
  const sizeMap = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  return (
    <Loader2 className={`animate-spin text-muted-foreground ${sizeMap[size]} ${className}`} />
  );
}

/**
 * BUTTON LOADING STATE
 * Loading state for buttons (spinner + text)
 */
interface ButtonLoadingProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function ButtonLoading({ isLoading, loadingText = "Loading...", children }: ButtonLoadingProps) {
  return (
    <span className="inline-flex items-center">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </span>
  );
}