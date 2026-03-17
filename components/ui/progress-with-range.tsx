"use client";

import * as React from "react";
import { Progress } from "./progress";
import { ArrowRight } from "lucide-react";
import { cn } from "./utils";

interface ProgressWithRangeProps {
  /** Current progress value (0–100) */
  value: number;
  /** Label for the start of the range (e.g. a date) */
  from: string;
  /** Label for the end of the range (e.g. a date) */
  to: string;
  /** Optional height class for the progress bar (default: "h-2") */
  barClassName?: string;
  /** Optional class for the indicator inside the progress bar */
  indicatorClassName?: string;
  /** Optional class for the outer wrapper */
  className?: string;
}

/**
 * A progress bar with start/end range labels underneath.
 * Useful for date ranges, vigencia periods, or any bounded timeline.
 *
 * @example
 * <ProgressWithRange value={75} from="27 Nov" to="27 Dic" />
 */
function ProgressWithRange({
  value,
  from,
  to,
  barClassName,
  indicatorClassName,
  className,
}: ProgressWithRangeProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Progress
        value={value}
        className={cn("h-2", barClassName)}
        indicatorClassName={indicatorClassName}
      />
      <div className="flex items-center justify-between text-xs text-foreground">
        <span>{from}</span>
        <ArrowRight className="h-3 w-3" />
        <span>{to}</span>
      </div>
    </div>
  );
}

export { ProgressWithRange };
export type { ProgressWithRangeProps };
