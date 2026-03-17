import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

/**
 * LOADING PROVIDER
 * Global context for managing loading states across the application
 * Allows showing/hiding loading overlays in a centralized manner
 */

interface LoadingState {
  isLoading: boolean;
  message?: string;
  type?: "spinner" | "skeleton" | "overlay";
}

interface LoadingContextType {
  loadingState: LoadingState;
  showLoading: (message?: string, type?: LoadingState["type"]) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: undefined,
    type: "overlay",
  });

  const showLoading = useCallback((message?: string, type: LoadingState["type"] = "overlay") => {
    setLoadingState({
      isLoading: true,
      message,
      type,
    });
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      message: undefined,
      type: "overlay",
    });
  }, []);

  const value: LoadingContextType = {
    loadingState,
    showLoading,
    hideLoading,
    isLoading: loadingState.isLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Hook to use the loading context
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}