import { HelpCircle } from "lucide-react";
import { useHelp } from "./HelpProvider";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

/**
 * Floating help button (similar to Intercom/Zendesk)
 * Positioned fixed at bottom-right corner
 */
export function HelpButton() {
  const { toggleHelpCenter } = useHelp();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleHelpCenter}
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
            aria-label="Open help center"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="text-xs">Need help? Click here</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
