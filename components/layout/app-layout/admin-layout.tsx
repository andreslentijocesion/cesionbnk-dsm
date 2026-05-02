import * as React from "react";
import { cn } from "../../../lib/utils";
import { Menu } from "lucide-react";
import { Button } from "../../ui/button";

// ─── Admin Layout Context ──────────────────────────────────────────────────

interface AdminLayoutContextValue {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  hasSidebar: boolean;
}

const AdminLayoutContext = React.createContext<AdminLayoutContextValue | undefined>(undefined);

export function useAdminLayout() {
  const context = React.useContext(AdminLayoutContext);
  if (context === undefined) {
    return {
      isSidebarOpen: false,
      setIsSidebarOpen: () => {},
      isSidebarCollapsed: false,
      setIsSidebarCollapsed: () => {},
      toggleSidebar: () => {},
      toggleCollapse: () => {},
      hasSidebar: false,
    };
  }
  return context;
}

// ─── Admin Layout Component ────────────────────────────────────────────────

export interface AdminLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  hideSidebar?: boolean;
  /** Sidebar width in pixels (default: 260) */
  sidebarWidth?: number;
  /** Collapsed sidebar width in pixels (default: 80) */
  sidebarCollapsedWidth?: number;
  /** Custom background class for the body */
  bodyClassName?: string;
  /** Make header sticky */
  stickyHeader?: boolean;
}

export function AdminLayout({
  header,
  sidebar,
  footer,
  children,
  hideSidebar = false,
  sidebarWidth = 260,
  sidebarCollapsedWidth = 80,
  bodyClassName,
  stickyHeader = true,
}: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const hasSidebar = !hideSidebar && !!sidebar;
  const currentSidebarWidth = isSidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;

  return (
    <AdminLayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar,
        toggleCollapse,
        hasSidebar,
      }}
    >
      <div className="flex min-h-screen w-full bg-background overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {hasSidebar && isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar Container */}
        {hasSidebar && (
          <aside
            data-slot="admin-sidebar"
            style={{ width: currentSidebarWidth }}
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
              "md:sticky md:translate-x-0",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          {header && (
            <div
              className={cn(
                "z-30 transition-all duration-300",
                stickyHeader && "sticky top-0"
              )}
            >
              <div className="flex items-center">
                {/* Mobile Menu Toggle */}
                {hasSidebar && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 md:hidden"
                    onClick={toggleSidebar}
                  >
                    <Menu className="size-5" />
                  </Button>
                )}
                <div className="flex-1">{header}</div>
              </div>
            </div>
          )}

          {/* Body */}
          <main
            data-slot="admin-main"
            className={cn("flex-1 overflow-y-auto", bodyClassName)}
          >
            {children}
          </main>

          {/* Footer */}
          {footer && <div className="z-20">{footer}</div>}
        </div>
      </div>
    </AdminLayoutContext.Provider>
  );
}
