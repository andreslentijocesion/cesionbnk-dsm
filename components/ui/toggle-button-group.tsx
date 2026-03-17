import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";

interface ToggleButtonGroupOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleButtonGroupProps {
  options: ToggleButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  variant?: "default" | "primary";
}

export function ToggleButtonGroup({
  options,
  value,
  onChange,
  className,
  buttonClassName,
  variant = "default",
}: ToggleButtonGroupProps) {
  const getButtonClasses = (isActive: boolean) => {
    if (variant === "primary") {
      return cn(
        "flex-1 h-7 rounded text-xs gap-2 transition-all",
        isActive
          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          : "text-muted-foreground hover:bg-muted",
        buttonClassName
      );
    }
    
    return cn(
      "flex-1 text-xs font-medium py-1.5 rounded-sm transition-all",
      isActive
        ? "bg-primary text-secondary shadow-sm"
        : "text-muted-foreground hover:text-secondary",
      buttonClassName
    );
  };

  return (
    <div className={cn("flex rounded-md border p-1 bg-muted", className)}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <Button
            key={option.value}
            size="sm"
            variant="ghost"
            className={getButtonClasses(isActive)}
            onClick={() => onChange(option.value)}
          >
            {isActive && <Check className="h-3 w-3" />}
            {option.icon}
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}