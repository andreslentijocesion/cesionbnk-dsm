import * as React from "react";
import { cn } from "../../../lib/utils";

export interface LayoutFooterProps {
  /** Left content */
  left?: React.ReactNode;
  /** Center content */
  center?: React.ReactNode;
  /** Right content */
  right?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function LayoutFooter({
  left,
  center,
  right,
  className,
  children,
}: LayoutFooterProps) {
  return (
    <footer
      data-slot="layout-footer"
      className={cn(
        "flex shrink-0 items-center justify-between gap-4 px-6 py-4",
        "border-t border-border bg-background text-sm text-muted-foreground",
        "transition-colors duration-200",
        className
      )}
    >
      {children ?? (
        <>
          <div className="flex items-center gap-2">{left}</div>
          <div className="flex items-center gap-2">{center}</div>
          <div className="flex items-center gap-2">{right}</div>
        </>
      )}
    </footer>
  );
}
