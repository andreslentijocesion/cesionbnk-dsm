 
import React from "react";
import { CheckCircle, Circle, Minus } from "lucide-react";
import { Progress } from "../ui/Progress";
import { cn } from "../ui/utils";

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "compact" | "minimal";
  showProgress?: boolean;
  showLabels?: boolean;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function StepIndicator({
  steps, currentStep,
  orientation = "horizontal", variant = "default",
  showProgress = true, showLabels = true,
  clickable = false, onStepClick, className,
}: StepIndicatorProps) {
  const progress = (currentStep / (steps.length - 1)) * 100;

  const handleStepClick = (index: number) => {
    if (clickable && onStepClick && index <= currentStep) onStepClick(index);
  };

  if (variant === "minimal") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const canClick = clickable && index <= currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!canClick}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 transition-all",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isActive && "border-primary bg-background text-primary scale-110",
                    !isActive && !isCompleted && "border-muted bg-background text-muted-foreground",
                    canClick && "cursor-pointer hover:scale-110", !canClick && "cursor-not-allowed"
                  )}
                >
                  {isCompleted ? <CheckCircle className="size-4" /> : <Circle className="size-4" />}
                </button>
                {index < steps.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-2 transition-colors", index < currentStep ? "bg-primary" : "bg-muted")} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (orientation === "horizontal") {
    return (
      <div className={cn("space-y-4 md:space-y-6", className)}>
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="flex items-center justify-between gap-1 md:gap-2">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const canClick = clickable && index <= currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col gap-1.5 md:gap-2 flex-1 items-center min-w-0">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!canClick}
                    className={cn(
                      "flex size-8 md:size-10 md: items-center justify-center rounded-full border-2 transition-all flex-shrink-0",
                      isCompleted && "border-primary bg-primary text-primary-foreground",
                      isActive && "border-primary bg-background text-primary ring-2 md:ring-4 ring-primary/20",
                      !isActive && !isCompleted && "border-muted bg-background text-muted-foreground",
                      canClick && "cursor-pointer hover:scale-110", !canClick && "cursor-not-allowed"
                    )}
                  >
                    {step.icon ? (
                      isCompleted ? <CheckCircle className="size-4 md:size-5 md:" /> : (
                        <div className="flex items-center justify-center [&>svg]:size-4 [&>svg]: md:[&>svg]:size-5 md:[&>svg]:">{step.icon}</div>
                      )
                    ) : <span className="font-semibold text-xs md:text-sm">{index + 1}</span>}
                  </button>
                  {showLabels && (
                    <div className="text-center w-full min-w-0 px-0.5">
                      <p className={cn("text-xs md:text-sm font-medium truncate md:whitespace-normal", (isActive || isCompleted) ? "text-foreground" : "text-muted-foreground")}>
                        {step.title}
                      </p>
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center justify-center flex-shrink-0 w-4 md:w-8 mx-0.5 md:mx-2">
                    <Minus className={cn("h-3 md:h-5 w-full transition-colors", index < currentStep ? "text-primary" : "text-muted")} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const canClick = clickable && index <= currentStep;
        return (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(index)}
                disabled={!canClick}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-background text-primary ring-4 ring-primary/20",
                  !isActive && !isCompleted && "border-muted bg-background text-muted-foreground",
                  canClick && "cursor-pointer hover:scale-110", !canClick && "cursor-not-allowed"
                )}
              >
                {step.icon ? (isCompleted ? <CheckCircle className="size-5" /> : step.icon) : <span className="font-semibold">{index + 1}</span>}
              </button>
              {index < steps.length - 1 && (
                <div className={cn("w-0.5 h-16 my-1 transition-colors", index < currentStep ? "bg-primary" : "bg-muted")} />
              )}
            </div>
            {showLabels && (
              <div className="flex-1 pb-8">
                <p className={cn("font-medium", (isActive || isCompleted) ? "text-foreground" : "text-muted-foreground")}>{step.title}</p>
                {step.description && <p className="text-sm text-muted-foreground mt-1">{step.description}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
