import React from "react";
import { cn } from "./utils";
import { Button, ButtonProps } from "./button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface SplitAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface SplitButtonProps extends ButtonProps {
  label: string;
  actions: SplitAction[];
  onMainAction: () => void;
}

export function SplitButton({
  label,
  actions,
  onMainAction,
  className,
  variant = "default",
  size = "default",
  disabled,
  ...props
}: SplitButtonProps) {
  return (
    <div className={cn("inline-flex -space-x-px rounded-md shadow-sm", className)}>
      <Button
        className="rounded-r-none focus:z-10"
        variant={variant}
        size={size}
        onClick={onMainAction}
        disabled={disabled}
        {...props}
      >
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-l-none border-l border-l-primary-foreground/20 px-2 focus:z-10"
            variant={variant}
            size={size}
            disabled={disabled}
            aria-label="Select action"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}