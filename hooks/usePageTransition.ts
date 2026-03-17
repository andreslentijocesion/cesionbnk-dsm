import { useEffect, useCallback } from "react";
import { useTransition } from "../components/providers/TransitionProvider";

/**
 * HOOK: usePageTransition
 * Facilitates page transition management
 * 
 * @example
 * const { triggerPageChange } = usePageTransition();
 * triggerPageChange("home", "dashboard", "slide");
 */

interface UsePageTransitionOptions {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
  duration?: number; // in ms
}

export function usePageTransition(options: UsePageTransitionOptions = {}) {
  const { startTransition, endTransition, isTransitioning } = useTransition();
  const { onTransitionStart, onTransitionEnd, duration = 300 } = options;

  const triggerPageChange = useCallback(
    (
      from: string,
      to: string,
      type: "fade" | "slide" | "scale" | "none" = "fade",
      direction: "forward" | "backward" | "none" = "forward"
    ) => {
      // Start callback
      onTransitionStart?.();

      // Start transition
      startTransition(from, to, type, direction);

      // End transition after duration
      setTimeout(() => {
        endTransition();
        onTransitionEnd?.();
      }, duration);
    },
    [startTransition, endTransition, onTransitionStart, onTransitionEnd, duration]
  );

  return {
    triggerPageChange,
    isTransitioning,
  };
}

/**
 * HOOK: usePageEnter
 * Executes a function when the page enters (mounts).
 * Useful for analytics, scroll to top, etc.
 */
export function usePageEnter(callback: () => void, pageName?: string) {
  useEffect(() => {
    callback();
    
    // Announce page change for screen readers
    if (pageName) {
      const liveRegion = document.getElementById("live-region-polite");
      if (liveRegion) {
        liveRegion.textContent = `Navigated to ${pageName}`;
      }
    }
  }, [callback, pageName]);
}

/**
 * HOOK: useScrollToTop
 * Automatically scrolls to top when the component mounts
 */
export function useScrollToTop(smooth = true) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [smooth]);
}