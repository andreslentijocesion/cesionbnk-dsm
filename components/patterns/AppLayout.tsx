/**
 * AppLayout — Full-page shell layouts for CESIONBNK
 *
 * Three layout modes:
 *   - ClientLayout:  Header + Body + Footer  (customer-facing)
 *   - AdminLayout:   Header + Sidebar + Body + Footer  (internal/admin)
 *   - AdminLayout (no sidebar): Header + Body + Footer with AdminLayout context
 *
 * AdminLayout sidebar features:
 *   - Collapsible to icon-only mode (desktop)
 *   - Responsive mobile drawer with backdrop
 *   - hideSidebar prop for dynamic full-width mode
 *   - hasSidebar in context for child component adaptation
 *
 * Each layout provides the structural shell; content is passed via
 * props (header, footer, sidebar) or children (body).
 *
 * Sub-components for common patterns:
 *   - LayoutHeader:                  Pre-styled header bar with logo, nav, actions slots
 *   - LayoutFooter:                  Pre-styled footer bar
 *   - LayoutSidebarNav:              Sidebar navigation container with groups
 *   - LayoutSidebarGroup:            Labeled group of nav items
 *   - LayoutSidebarCollapsibleGroup: Expandable group with chevron toggle
 *   - LayoutSidebarItem:             Single nav item (link/button)
 *
 * @layer patterns
 */
import * as React from "react";
import { cn } from "../ui/utils";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SHARED — LayoutHeader
   ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════
   SHARED — LayoutFooter
   ═══════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════
   SHARED — Sidebar sub-components
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
   Collapsible Sidebar Group — expandable section with chevron
   ═══════════════════════════════════════════════════════════════ */

export interface LayoutSidebarCollapsibleGroupProps {
  /** Section label */
  label: string;
  /** Lucide icon for the section */
  icon?: LucideIcon;
  /** Item count badge */
  count?: number;
  /** Default open state */
  defaultOpen?: boolean;
  /** Whether sidebar is in collapsed (icon-only) mode */
  collapsed?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Collapsible group of sidebar items with toggle and chevron */
export function LayoutSidebarCollapsibleGroup({
  label,
  icon: Icon,
  count,
  defaultOpen = false,
  collapsed = false,
  children,
  className,
}: LayoutSidebarCollapsibleGroupProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  // In collapsed sidebar mode, just show the icon
  if (collapsed) {
    return (
      <div className={cn("space-y-1", className)}>
        {Icon && (
          <div
            className="flex justify-center py-2"
            title={label}
          >
            <Icon className="size-5 text-muted-foreground" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div data-slot="layout-sidebar-collapsible-group" className={cn("space-y-0.5", className)}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2",
          "text-sm text-foreground/80 hover:bg-accent hover:text-foreground",
          "transition-colors duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
        aria-expanded={open}
      >
        {Icon && <Icon className="size-4 shrink-0" />}
        <span className="flex-1 truncate text-left">{label}</span>
        {count != null && (
          <span className="text-2xs text-muted-foreground tabular-nums" aria-hidden="true">{count}</span>
        )}
        <ChevronDown
          className={cn(
            "size-3.5 .5 shrink-0 text-muted-foreground/60 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="ml-4 border-l border-border/50 pl-2 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}

export interface LayoutSidebarItemProps {
  /** Display label */
  label: string;
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Whether this item is currently active */
  active?: boolean;
  /** Show collapsed mode (icon only) */
  collapsed?: boolean;
  /** Badge / indicator on the right */
  badge?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Render as link */
  href?: string;
  className?: string;
}

/** Single sidebar navigation item */
export function LayoutSidebarItem({
  label,
  icon: Icon,
  active = false,
  collapsed = false,
  badge,
  onClick,
  href,
  className,
}: LayoutSidebarItemProps) {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      data-slot="layout-sidebar-item"
      className={cn(
        "flex w-full items-center gap-3 rounded-[var(--radius)] px-3 py-2",
        "text-sm transition-colors duration-150",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-accent hover:text-foreground",
        collapsed && "justify-center px-2",
        className
      )}
    >
      {Icon && <Icon className={cn("size-5 shrink-0", active && "text-primary-foreground")} />}
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{label}</span>
          {badge && <span className="shrink-0">{badge}</span>}
        </>
      )}
    </Comp>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT LAYOUT — Header + Body + Footer
   ═══════════════════════════════════════════════════════════════ */

export interface ClientLayoutProps {
  /** Header element (use <LayoutHeader> or custom) */
  header?: React.ReactNode;
  /** Footer element (use <LayoutFooter> or custom) */
  footer?: React.ReactNode;
  /** Stick header to top on scroll */
  stickyHeader?: boolean;
  /** Stick footer to bottom */
  stickyFooter?: boolean;
  /** Body content */
  children: React.ReactNode;
  /** Body wrapper classes */
  bodyClassName?: string;
  className?: string;
}

export function ClientLayout({
  header,
  footer,
  stickyHeader = true,
  stickyFooter = false,
  children,
  bodyClassName,
  className,
}: ClientLayoutProps) {
  return (
    <div
      data-slot="client-layout"
      className={cn("flex min-h-screen flex-col bg-background", className)}
    >
      {/* Header */}
      {header && (
        <div className={cn(stickyHeader && "sticky top-0 z-40")}>{header}</div>
      )}

      {/* Body */}
      <main
        data-slot="layout-body"
        className={cn("flex-1", bodyClassName)}
      >
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <div className={cn(stickyFooter && "sticky bottom-0 z-30")}>{footer}</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADMIN LAYOUT — Header + Sidebar + Body + Footer
   ═══════════════════════════════════════════════════════════════ */

interface AdminLayoutContextValue {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  hasSidebar: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeMobileSidebar: () => void;
}

const AdminLayoutContext = React.createContext<AdminLayoutContextValue | null>(null);

/** Hook to access AdminLayout sidebar state from child components */
export function useAdminLayout() {
  const ctx = React.useContext(AdminLayoutContext);
  if (!ctx) {
    throw new Error("useAdminLayout must be used within an <AdminLayout>");
  }
  return ctx;
}

export interface AdminLayoutProps {
  /** Header element (use <LayoutHeader> or custom) */
  header?: React.ReactNode;
  /** Sidebar content (use <LayoutSidebarNav> or custom) */
  sidebar?: React.ReactNode;
  /** Footer element (use <LayoutFooter> or custom) */
  footer?: React.ReactNode;
  /** Logo/brand shown at top of sidebar */
  sidebarHeader?: React.ReactNode;
  /** Content at bottom of sidebar (e.g., user menu) */
  sidebarFooter?: React.ReactNode;
  /** Expanded sidebar width in px */
  sidebarWidth?: number;
  /** Collapsed sidebar width in px */
  sidebarCollapsedWidth?: number;
  /** Allow sidebar to collapse to icon-only mode */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Stick header to top */
  stickyHeader?: boolean;
  /** Stick footer to bottom */
  stickyFooter?: boolean;
  /** Sidebar position */
  sidebarPosition?: "left" | "right";
  /** Explicitly hide the sidebar (even if sidebar content is provided) */
  hideSidebar?: boolean;
  /** Body content */
  children: React.ReactNode;
  /** Body wrapper classes */
  bodyClassName?: string;
  className?: string;
}

export function AdminLayout({
  header,
  sidebar,
  footer,
  sidebarHeader,
  sidebarFooter,
  sidebarWidth = 260,
  sidebarCollapsedWidth = 64,
  collapsible = true,
  defaultCollapsed = false,
  stickyHeader = true,
  stickyFooter = false,
  sidebarPosition = "left",
  hideSidebar = false,
  children,
  bodyClassName,
  className,
}: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Determine if sidebar should be rendered
  const hasSidebar = !hideSidebar && Boolean(sidebar || sidebarHeader || sidebarFooter);

  // Detect mobile breakpoint
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) setMobileOpen(false);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Close mobile sidebar on Escape
  React.useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Lock body scroll when mobile sidebar is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const currentWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;

  const ctxValue = React.useMemo<AdminLayoutContextValue>(
    () => ({
      sidebarOpen: mobileOpen,
      sidebarCollapsed,
      isMobile,
      hasSidebar,
      toggleSidebar: () => {
        if (!hasSidebar) return;
        if (isMobile) {
          setMobileOpen((p) => !p);
        } else {
          setSidebarCollapsed((p) => !p);
        }
      },
      toggleCollapse: () => {
        if (!hasSidebar) return;
        setSidebarCollapsed((p) => !p);
      },
      closeMobileSidebar: () => setMobileOpen(false),
    }),
    [mobileOpen, sidebarCollapsed, isMobile, hasSidebar]
  );

  const isRight = sidebarPosition === "right";

  /* ── Sidebar panel (shared between desktop & mobile) ── */
  const sidebarPanel = (
    <div className="flex h-full flex-col">
      {/* Sidebar Header */}
      {sidebarHeader && (
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-sidebar-border px-4",
            sidebarCollapsed && !isMobile && "justify-center px-2"
          )}
        >
          {sidebarHeader}
        </div>
      )}

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {sidebar}
      </div>

      {/* Sidebar Footer */}
      {sidebarFooter && (
        <div
          className={cn(
            "shrink-0 border-t border-sidebar-border p-3",
            sidebarCollapsed && !isMobile && "flex justify-center p-2"
          )}
        >
          {sidebarFooter}
        </div>
      )}

      {/* Collapse Toggle (desktop only) */}
      {collapsible && !isMobile && (
        <button
          onClick={() => setSidebarCollapsed((p) => !p)}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-10 w-full items-center justify-center",
            "border-t border-sidebar-border",
            "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent",
            "transition-colors duration-150"
          )}
        >
          {(sidebarCollapsed ? !isRight : isRight) ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <AdminLayoutContext.Provider value={ctxValue}>
      <div
        data-slot="admin-layout"
        className={cn("flex h-screen flex-col overflow-hidden bg-background", className)}
      >
        {/* Header (full width, above sidebar + body) */}
        {header && (
          <div className={cn(stickyHeader && "sticky top-0 z-40")}>
            {/* Inject mobile hamburger into header only when sidebar exists */}
            <div className="relative">
              {/* Mobile menu button — only shown when sidebar is active */}
              {hasSidebar && (
                <button
                  onClick={() => setMobileOpen((p) => !p)}
                  aria-label="Toggle menu"
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 md:hidden",
                    "inline-flex size-9 items-center justify-center rounded-[var(--radius)]",
                    "text-foreground hover:bg-accent transition-colors",
                    isRight ? "right-4" : "left-4"
                  )}
                >
                  <Menu className="size-5" />
                </button>
              )}
              {header}
            </div>
          </div>
        )}

        {/* Body row: Sidebar + Main content */}
        <div className={cn("flex flex-1 min-h-0 overflow-hidden", hasSidebar && isRight && "flex-row-reverse")}>
          {/* ── Desktop Sidebar ── */}
          {hasSidebar && (
            <aside
              data-slot="layout-sidebar"
              className={cn(
                "hidden md:flex flex-col shrink-0",
                "bg-sidebar text-sidebar-foreground",
                "border-sidebar-border transition-[width] duration-200 ease-in-out",
                isRight ? "border-l" : "border-r"
              )}
              style={{ width: currentWidth }}
            >
              {sidebarPanel}
            </aside>
          )}

          {/* ── Mobile Sidebar Overlay ── */}
          {hasSidebar && isMobile && (
            <>
              {/* Backdrop */}
              <div
                className={cn(
                  "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200",
                  mobileOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer */}
              <aside
                className={cn(
                  "fixed top-0 z-50 h-full w-[280px]",
                  "bg-sidebar text-sidebar-foreground",
                  "shadow-elevation-4 transition-transform duration-200 ease-in-out",
                  isRight
                    ? cn("right-0", mobileOpen ? "translate-x-0" : "translate-x-full")
                    : cn("left-0", mobileOpen ? "translate-x-0" : "-translate-x-full")
                )}
              >
                {/* Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    "absolute top-4 inline-flex size-8 items-center justify-center",
                    "rounded-[var(--radius)] text-sidebar-foreground hover:bg-sidebar-accent",
                    "transition-colors",
                    isRight ? "left-4" : "right-4"
                  )}
                >
                  <X className="size-4" />
                </button>

                {sidebarPanel}
              </aside>
            </>
          )}

          {/* ── Main Content Area ── */}
          <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
            <main
              data-slot="layout-body"
              className={cn("flex-1", bodyClassName)}
            >
              {children}
            </main>

            {/* Footer */}
            {footer && (
              <div className={cn(stickyFooter && "sticky bottom-0 z-30")}>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayoutContext.Provider>
  );
}