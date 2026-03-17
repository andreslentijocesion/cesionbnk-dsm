import { useEffect, useState } from "react";
import { Route, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useHelp } from "./HelpProvider";
import type { TourStep } from "./tourSteps";

// Note: driver.js needs to be installed: npm install driver.js
// Import will be done dynamically to avoid SSR issues

interface ProductTourProps {
  /**
   * Tour steps to display
   */
  steps: TourStep[];
  
  /**
   * Unique identifier for this tour (used for localStorage)
   */
  tourId: string;
  
  /**
   * Auto-start tour on first visit
   */
  autoStart?: boolean;
  
  /**
   * Show manual trigger button
   */
  showButton?: boolean;
  
  /**
   * Button text
   */
  buttonText?: string;
  
  /**
   * Button variant
   */
  buttonVariant?: "default" | "outline" | "ghost";
  
  /**
   * Callback when tour completes
   */
  onComplete?: () => void;
}

export function ProductTour({
  steps,
  tourId,
  autoStart = false,
  showButton = true,
  buttonText = "Start Tour",
  buttonVariant = "outline",
  onComplete,
}: ProductTourProps) {
  const { setCurrentTourActive } = useHelp();
  const [isLoading, setIsLoading] = useState(false);
  const storageKey = `tour-completed-${tourId}`;

  useEffect(() => {
    // Auto-start tour on first visit
    if (autoStart) {
      const hasSeenTour = localStorage.getItem(storageKey);
      if (!hasSeenTour) {
        // Delay to ensure DOM is ready
        setTimeout(() => {
          startTour();
        }, 1000);
      }
    }
  }, [autoStart, storageKey]);

  const startTour = async () => {
    try {
      setIsLoading(true);
      setCurrentTourActive(true);

      // Dynamic import to avoid SSR issues
      const { driver } = await import("driver.js");
      
      // Import CSS
      await import("driver.js/dist/driver.css");

      const driverObj = driver({
        showProgress: true,
        steps: steps.map((step) => ({
          element: step.element,
          popover: {
            ...step.popover,
            // Ensure proper positioning
            side: step.popover.side || "bottom",
            align: step.popover.align || "start",
          },
        })),
        nextBtnText: "Next →",
        prevBtnText: "← Previous",
        doneBtnText: "Got it!",
        popoverClass: "driver-popover-custom",
        overlayColor: "rgba(0, 0, 0, 0.75)",
        smoothScroll: true,
        animate: true,
        allowClose: true,
        onDestroyed: () => {
          // Mark tour as completed
          localStorage.setItem(storageKey, "true");
          setCurrentTourActive(false);
          setIsLoading(false);
          
          // Call completion callback
          if (onComplete) {
            onComplete();
          }
        },
        onDeselected: () => {
          setCurrentTourActive(false);
          setIsLoading(false);
        },
      });

      driverObj.drive();
    } catch (error) {
      console.error("Error loading tour:", error);
      setIsLoading(false);
      setCurrentTourActive(false);
    }
  };

  const resetTour = () => {
    localStorage.removeItem(storageKey);
    startTour();
  };

  if (!showButton) {
    // Return an empty span instead of null so FGCmp2 always has a DOM node (Cause 6 fix)
    return <span className="hidden" />;
  }

  return (
    <Button
      variant={buttonVariant}
      size="sm"
      onClick={resetTour}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Route className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      <span>{buttonText}</span>
    </Button>
  );
}