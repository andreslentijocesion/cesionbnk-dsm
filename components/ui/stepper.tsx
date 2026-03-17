/**
 * Stepper — Step indicator for multi-step flows
 * Supports horizontal and vertical orientation, with completed/current/pending/error states.
 * @layer atoms
 */
import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "./utils";

export type StepStatus = "completed" | "current" | "pending" | "error";

export interface Step {
  id: string;
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  /** If provided, controls which step is active (0-indexed) */
  activeStep?: number;
  className?: string;
}

const dotStyles: Record<StepStatus, string> = {
  completed: "bg-primary border-primary text-primary-foreground",
  current:   "bg-background border-primary text-primary ring-4 ring-primary/20",
  pending:   "bg-background border-border text-muted-foreground",
  error:     "bg-destructive border-destructive text-destructive-foreground",
};

const labelStyles: Record<StepStatus, string> = {
  completed: "text-foreground",
  current:   "text-foreground font-semibold",
  pending:   "text-muted-foreground",
  error:     "text-destructive",
};

const lineStyles: Record<StepStatus, string> = {
  completed: "bg-primary",
  current:   "bg-border",
  pending:   "bg-border",
  error:     "bg-destructive",
};

function resolveStatus(step: Step, index: number, activeStep?: number): StepStatus {
  if (step.status) return step.status;
  if (activeStep === undefined) return "pending";
  if (index < activeStep) return "completed";
  if (index === activeStep) return "current";
  return "pending";
}

export function Stepper({ steps, orientation = "horizontal", activeStep, className }: StepperProps) {
  if (orientation === "vertical") {
    return (
      <ol className={cn("flex flex-col", className)}>
        {steps.map((step, i) => {
          const status = resolveStatus(step, i, activeStep);
          const isLast = i === steps.length - 1;
          return (
            <li key={step.id} className="flex gap-3">
              {/* Dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                    dotStyles[status]
                  )}
                >
                  {status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : status === "error" ? (
                    <X className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {!isLast && (
                  <div className={cn("mt-1 w-0.5 flex-1 transition-colors", lineStyles[status])} style={{ minHeight: "1.5rem" }} />
                )}
              </div>
              {/* Label */}
              <div className={cn("pb-6 pt-1 flex-1 min-w-0", isLast && "pb-0")}>
                <p className={cn("text-sm leading-tight", labelStyles[status])}>{step.label}</p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  // Horizontal
  return (
    <ol className={cn("flex items-start", className)}>
      {steps.map((step, i) => {
        const status = resolveStatus(step, i, activeStep);
        const isLast = i === steps.length - 1;
        return (
          <li key={step.id} className={cn("flex items-start", !isLast && "flex-1")}>
            {/* Dot + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                  dotStyles[status]
                )}
              >
                {status === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : status === "error" ? (
                  <X className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <div className="text-center max-w-[80px]">
                <p className={cn("text-xs leading-tight", labelStyles[status])}>{step.label}</p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{step.description}</p>
                )}
              </div>
            </div>
            {/* Connector line */}
            {!isLast && (
              <div className="mt-4 flex-1 mx-2">
                <div className={cn("h-0.5 w-full transition-colors", lineStyles[status])} />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
