import { HelpCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

interface ContextualHelpProps {
  /**
   * Quick help text shown in tooltip on hover
   */
  quickHelp?: string;
  
  /**
   * Detailed help shown in popover on click
   */
  detailedHelp?: string;
  
  /**
   * Optional title for the detailed help popover
   */
  title?: string;
  
  /**
   * Show only tooltip (no popover icon)
   */
  tooltipOnly?: boolean;
  
  /**
   * Show only popover (no tooltip icon)
   */
  popoverOnly?: boolean;
  
  /**
   * Custom icon size
   */
  iconSize?: "sm" | "md" | "lg";
}

export function ContextualHelp({
  quickHelp,
  detailedHelp,
  title,
  tooltipOnly = false,
  popoverOnly = false,
  iconSize = "sm",
}: ContextualHelpProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const iconClass = `${sizeClasses[iconSize]} text-muted-foreground hover:text-foreground transition-colors cursor-help`;

  // Only tooltip
  if (tooltipOnly && quickHelp) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
              aria-label="Help information"
            >
              <Info className={iconClass} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <p className="text-xs">{quickHelp}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Only popover
  if (popoverOnly && detailedHelp) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-colors"
            aria-label="Show detailed help"
          >
            <HelpCircle className={iconClass} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          {title && (
            <h4 className="font-semibold text-sm mb-2 text-foreground">
              {title}
            </h4>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {detailedHelp}
          </p>
        </PopoverContent>
      </Popover>
    );
  }

  // Both tooltip and popover (default)
  return (
    <div className="inline-flex items-center gap-1.5">
      {/* Tooltip for quick help */}
      {quickHelp && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                aria-label="Quick help"
              >
                <Info className={iconClass} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">{quickHelp}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Popover for detailed help */}
      {detailedHelp && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-colors"
              aria-label="Show detailed help"
            >
              <HelpCircle className={iconClass} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            {title && (
              <h4 className="font-semibold text-sm mb-2 text-foreground">
                {title}
              </h4>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {detailedHelp}
            </p>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
