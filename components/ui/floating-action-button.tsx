import React from "react";
import { cn } from "./utils";
import { Button, ButtonProps } from "./button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface FloatingActionButtonProps extends ButtonProps {
  icon?: React.ElementType;
  label?: string; // For tooltip
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function FloatingActionButton({
  icon: Icon = Plus,
  label,
  position = "bottom-right",
  className,
  ...props
}: FloatingActionButtonProps) {
  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-right": "fixed top-6 right-6",
    "top-left": "fixed top-6 left-6",
  };

  const ButtonComponent = (
    <Button
      className={cn(
        "h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
        positionClasses[position],
        className
      )}
      {...props}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );

  if (label) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{ButtonComponent}</TooltipTrigger>
          <TooltipContent side="left">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return ButtonComponent;
}