import React, { createContext, useContext, useState, ReactNode } from "react";

interface HelpContextType {
  isHelpCenterOpen: boolean;
  openHelpCenter: () => void;
  closeHelpCenter: () => void;
  toggleHelpCenter: () => void;
  currentTourActive: boolean;
  setCurrentTourActive: (active: boolean) => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export function HelpProvider({ children }: { children: ReactNode }) {
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [currentTourActive, setCurrentTourActive] = useState(false);

  const openHelpCenter = () => setIsHelpCenterOpen(true);
  const closeHelpCenter = () => setIsHelpCenterOpen(false);
  const toggleHelpCenter = () => setIsHelpCenterOpen(!isHelpCenterOpen);

  return (
    <HelpContext.Provider
      value={{
        isHelpCenterOpen,
        openHelpCenter,
        closeHelpCenter,
        toggleHelpCenter,
        currentTourActive,
        setCurrentTourActive,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
}

export function useHelp() {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error("useHelp must be used within a HelpProvider");
  }
  return context;
}
