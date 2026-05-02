import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ClientLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  /** Custom background class for the body */
  bodyClassName?: string;
  /** Make header sticky */
  stickyHeader?: boolean;
}

export function ClientLayout({
  header,
  footer,
  children,
  bodyClassName,
  stickyHeader = true,
}: ClientLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      {header && (
        <div
          className={cn(
            "z-30 transition-all duration-300",
            stickyHeader && "sticky top-0"
          )}
        >
          {header}
        </div>
      )}

      {/* Body */}
      <main
        data-slot="client-main"
        className={cn("flex-1", bodyClassName)}
      >
        {children}
      </main>

      {/* Footer */}
      {footer && <div className="z-20">{footer}</div>}
    </div>
  );
}
