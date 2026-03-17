import { useState, useCallback, useEffect, useRef } from "react";
import { useLoading } from "../components/providers/LoadingProvider";
import { LOADING_DELAYS } from "../lib/animation-config";

/**
 * HOOK: useLoadingState
 * Manages local loading states with delay and cleanup support
 * 
 * @example
 * const { isLoading, startLoading, stopLoading } = useLoadingState();
 */

interface UseLoadingStateOptions {
  delay?: number; // Delay before showing the loading (avoids flashes)
  minDuration?: number; // Minimum loading duration (prevents flickering)
  onStart?: () => void;
  onEnd?: () => void;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { delay = LOADING_DELAYS.short, minDuration = 500, onStart, onEnd } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  const startTimeRef = useRef<number | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const minDurationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    onStart?.();

    // If there's a delay, wait before showing
    if (delay > 0) {
      delayTimerRef.current = setTimeout(() => {
        setShowLoading(true);
        startTimeRef.current = Date.now();
      }, delay);
    } else {
      setShowLoading(true);
      startTimeRef.current = Date.now();
    }
  }, [delay, onStart]);

  const stopLoading = useCallback(() => {
    // If still in the delay, cancel
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
      setIsLoading(false);
      onEnd?.();
      return;
    }

    // Calculate elapsed time
    const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : minDuration;
    const remaining = Math.max(0, minDuration - elapsed);

    // Wait for the minimum duration
    minDurationTimerRef.current = setTimeout(() => {
      setShowLoading(false);
      setIsLoading(false);
      startTimeRef.current = null;
      onEnd?.();
    }, remaining);
  }, [minDuration, onEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (minDurationTimerRef.current) clearTimeout(minDurationTimerRef.current);
    };
  }, []);

  return {
    isLoading,
    showLoading,
    startLoading,
    stopLoading,
  };
}

/**
 * HOOK: useGlobalLoading
 * Uses the global LoadingProvider
 */
export function useGlobalLoading() {
  const { showLoading, hideLoading, isLoading } = useLoading();

  const startGlobalLoading = useCallback((message?: string) => {
    showLoading(message, "overlay");
  }, [showLoading]);

  const stopGlobalLoading = useCallback(() => {
    hideLoading();
  }, [hideLoading]);

  return {
    isGlobalLoading: isLoading,
    startGlobalLoading,
    stopGlobalLoading,
  };
}

/**
 * HOOK: useAsyncOperation
 * Executes an async operation with automatic loading
 * 
 * @example
 * const { execute, isLoading } = useAsyncOperation();
 * await execute(async () => {
 *   await fetchData();
 * });
 */
export function useAsyncOperation<T = void>(options: UseLoadingStateOptions = {}) {
  const { isLoading, startLoading, stopLoading } = useLoadingState(options);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (operation: () => Promise<T>) => {
      try {
        setError(null);
        startLoading();
        const result = await operation();
        setData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const reset = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  };
}