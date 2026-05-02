import * as React from "react";
import { cn } from "../../../lib/utils";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Badge } from "../../ui/badge";


/* ═══════════════════════════════════════════════════════════════
   Sidebar Containers
   ═══════════════════════════════════════════════════════════════ */

export interface LayoutSidebarNavProps {
  children: React.ReactNode;
  className?: string;
}

/** Container for sidebar navigation groups */
export function LayoutSidebarNav({ children, className }: LayoutSidebarNavProps) {
  return (
    <nav
      data-slot="layout-sidebar-nav"
      className={cn("flex flex-1 flex-col gap-2 overflow-y-auto py-4 px-3", className)}
    >
      {children}
    </nav>
  );
}

export interface LayoutSidebarGroupProps {
  /** Optional label for the group */
  label?: string;
  children: React.ReactNode;
  className?: string;
}

/** Labeled group of sidebar items */
export function LayoutSidebarGroup({
  label,
  children,
  className,
}: LayoutSidebarGroupProps) {
  return (
    <div data-slot="layout-sidebar-group" className={cn("space-y-1", className)}>
      {label && (
        <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Collapsible Sidebar Group
   ═══════════════════════════════════════════════════════════════ */

export interface LayoutSidebarCollapsibleGroupProps {
  label: string;
  icon?: LucideIcon;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LayoutSidebarCollapsibleGroup({
  label,
  icon: Icon,
  count,
  defaultOpen = false,
  children,
  className,
}: LayoutSidebarCollapsibleGroupProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div data-slot="layout-sidebar-collapsible" className={cn("space-y-1", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-4 shrink-0" />}
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          {count !== undefined && count > 0 && (
            <Badge variant="secondary" className="h-4 px-1 text-[10px]">
              {count}
            </Badge>
          )}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200",
              isOpen ? "rotate-0" : "-rotate-90"
            )}
          />
        </div>
      </button>
      {isOpen && <div className="ml-4 space-y-1 border-l border-border pl-2">{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Sidebar Item
   ═══════════════════════════════════════════════════════════════ */

export interface LayoutSidebarItemProps {
  /** Label for the nav item */
  label: string;
  /** Lucide icon */
  icon?: LucideIcon;
  /** Item is currently active */
  active?: boolean;
  /** Item has notification badge */
  count?: number;
  /** Click handler */
  onClick?: () => void;
  /** Additional class overrides */
  className?: string;
}

/** Single nav item (link/button) for the sidebar */
export function LayoutSidebarItem({
  label,
  icon: Icon,
  active = false,
  count,
  onClick,
  className,
}: LayoutSidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="size-4 shrink-0" />}
        <span className="truncate">{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <Badge
          variant={active ? "outline" : "secondary"}
          className={cn("h-4 px-1 text-[10px]", active && "border-primary-foreground/50 text-primary-foreground")}
        >
          {count}
        </Badge>
      )}
    </button>
  );
}
