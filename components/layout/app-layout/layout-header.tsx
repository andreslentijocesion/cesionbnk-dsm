import * as React from "react";
import { cn } from "../../../lib/utils";

export interface LayoutHeaderProps {
  /** Left slot — typically logo / brand */
  logo?: React.ReactNode;
  /** Center slot — typically main navigation */
  nav?: React.ReactNode;
  /** Right slot — typically user menu / actions */
  actions?: React.ReactNode;
  /** Make the header visually transparent (for hero sections) */
  transparent?: boolean;
  /** Additional class overrides */
  className?: string;
  children?: React.ReactNode;
}

export function LayoutHeader({
  logo,
  nav,
  actions,
  transparent = false,
  className,
  children,
}: LayoutHeaderProps) {
  return (
    <header
      data-slot="layout-header"
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-4 px-6",
        "border-b border-border",
        transparent
          ? "bg-transparent"
          : "bg-background",
        "transition-colors duration-200",
        className
      )}
    >
      {children ?? (
        <>
          {/* Left: Logo */}
          {logo && <div className="flex shrink-0 items-center gap-2">{logo}</div>}

          {/* Center: Nav */}
          {nav && (
            <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
              {nav}
            </nav>
          )}

          {/* Right: Actions */}
          {actions && (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          )}
        </>
      )}
    </header>
  );
}
