import * as React from "react";
import { cn } from "./utils";

export interface GridShowcaseProps {
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function GridShowcase({
  title,
  description,
  columns = 2,
  gap = "md",
  children,
  className,
}: GridShowcaseProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 lg:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className={cn("grid", gridClasses[columns], gapClasses[gap])}>
        {children}
      </div>
    </div>
  );
}