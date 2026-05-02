import { Button } from "../ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "ghost",
}: ActionButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} size="icon" onClick={onClick}>
            <Icon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
