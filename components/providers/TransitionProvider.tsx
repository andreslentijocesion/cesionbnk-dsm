import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

/**
 * TRANSITION PROVIDER
 * Global context for managing transitions between pages/views
 * Coordinates entry/exit animations
 */

type TransitionDirection = "forward" | "backward" | "none";
type TransitionType = "fade" | "slide" | "scale" | "none";

interface TransitionState {
  isTransitioning: boolean;
  direction: TransitionDirection;
  type: TransitionType;
  from?: string;
  to?: string;
}

interface TransitionContextType {
  transitionState: TransitionState;
  startTransition: (from: string, to: string, type?: TransitionType, direction?: TransitionDirection) => void;
  endTransition: () => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionProviderProps {
  children: ReactNode;
  defaultType?: TransitionType;
}

export function TransitionProvider({ children, defaultType = "fade" }: TransitionProviderProps) {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    direction: "none",
    type: defaultType,
  });

  const startTransition = useCallback(
    (
      from: string,
      to: string,
      type: TransitionType = defaultType,
      direction: TransitionDirection = "forward"
    ) => {
      setTransitionState({
        isTransitioning: true,
        direction,
        type,
        from,
        to,
      });
    },
    [defaultType]
  );

  const endTransition = useCallback(() => {
    setTransitionState((prev) => ({
      ...prev,
      isTransitioning: false,
    }));
  }, []);

  const value: TransitionContextType = {
    transitionState,
    startTransition,
    endTransition,
    isTransitioning: transitionState.isTransitioning,
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

/**
 * Hook to use the transition context
 */
export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}