/**
 * OperationStatusPipeline — Visual step-by-step pipeline for factoring operations.
 * Shows current stage, completed stages, and pending stages with optional timestamps.
 * Supports horizontal and vertical orientations.
 * @layer patterns
 */
import { Check, X } from "lucide-react";
import { cn } from "../ui/utils";

export type StageStatus = "completed" | "active" | "pending" | "rejected" | "skipped";

export interface PipelineStage {
  id: string;
  label: string;
  description?: string;
  status: StageStatus;
  date?: string;
  /** Optional sub-label shown below date */
  actor?: string;
}

export interface OperationStatusPipelineProps {
  stages: PipelineStage[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const statusStyles: Record<StageStatus, { circle: string; label: string; connector: string }> = {
  completed: {
    circle: "bg-primary border-primary text-primary-foreground",
    label: "text-foreground font-medium",
    connector: "bg-primary",
  },
  active: {
    circle: "bg-background border-primary text-primary ring-4 ring-primary/20",
    label: "text-primary font-semibold",
    connector: "bg-border",
  },
  pending: {
    circle: "bg-background border-border text-muted-foreground",
    label: "text-muted-foreground",
    connector: "bg-border",
  },
  rejected: {
    circle: "bg-destructive border-destructive text-destructive-foreground",
    label: "text-destructive font-medium",
    connector: "bg-border",
  },
  skipped: {
    circle: "bg-muted border-border text-muted-foreground",
    label: "text-muted-foreground line-through",
    connector: "bg-border",
  },
};

function StageIcon({ status, index }: { status: StageStatus; index: number }) {
  if (status === "completed") return <Check className="size-3.5 .5" />;
  if (status === "rejected")  return <X className="size-3.5 .5" />;
  return <span className="text-xs font-bold">{index + 1}</span>;
}

export function OperationStatusPipeline({
  stages,
  orientation = "horizontal",
  className,
}: OperationStatusPipelineProps) {
  const isHorizontal = orientation === "horizontal";

  if (isHorizontal) {
    return (
      <div className={cn("w-full overflow-x-auto", className)}>
        <div className="flex items-start min-w-max px-2 py-4">
          {stages.map((stage, i) => {
            const styles = statusStyles[stage.status];
            const isLast = i === stages.length - 1;

            return (
              <div key={stage.id} className="flex items-start">
                {/* Stage node */}
                <div className="flex flex-col items-center gap-2 min-w-[80px] max-w-[100px]">
                  <div
                    className={cn(
                      "size-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                      styles.circle,
                    )}
                  >
                    <StageIcon status={stage.status} index={i} />
                  </div>
                  <div className="text-center">
                    <p className={cn("text-xs leading-tight", styles.label)}>{stage.label}</p>
                    {stage.date && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{stage.date}</p>
                    )}
                    {stage.actor && (
                      <p className="text-xs text-muted-foreground leading-tight">{stage.actor}</p>
                    )}
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="flex items-center mt-4 flex-1 min-w-[24px] max-w-[48px]">
                    <div
                      className={cn(
                        "h-0.5 w-full transition-colors",
                        stages[i + 1]?.status === "pending" || stages[i + 1]?.status === "skipped"
                          ? "bg-border"
                          : stage.status === "completed"
                          ? "bg-primary"
                          : "bg-border",
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical
  return (
    <div className={cn("space-y-0", className)}>
      {stages.map((stage, i) => {
        const styles = statusStyles[stage.status];
        const isLast = i === stages.length - 1;

        return (
          <div key={stage.id} className="flex gap-4">
            {/* Left: circle + connector */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "size-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                  styles.circle,
                )}
              >
                <StageIcon status={stage.status} index={i} />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[24px] transition-colors",
                    stage.status === "completed" ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>

            {/* Right: content */}
            <div className={cn("pb-5 min-w-0 flex-1", isLast && "pb-0")}>
              <p className={cn("text-sm leading-tight mt-1", styles.label)}>{stage.label}</p>
              {stage.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
              )}
              {(stage.date || stage.actor) && (
                <p className="text-xs text-muted-foreground mt-1">
                  {[stage.date, stage.actor].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
