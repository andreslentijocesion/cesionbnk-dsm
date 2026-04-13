import { useState, useEffect } from "react";
import { PageId } from "./components/types/PageId";
import { PageRenderer } from "./components/PageRenderer";
import { DSMSidebarNav } from "./components/DSMSidebarNav";
import { Button } from "./components/ui/button";
import { Logo } from "./components/Logo";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "./components/providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import { HelpProvider } from "./components/help/HelpProvider";
import { HelpCenter } from "./components/help/HelpCenter";
import { HelpButton } from "./components/help/HelpButton";
import { LoadingProvider } from "./components/providers/LoadingProvider";
import { TransitionProvider } from "./components/providers/TransitionProvider";
import { LoadingOverlay } from "./components/ui/loading-overlay";
import {
  AdminLayout,
  LayoutHeader,
  LayoutFooter,
} from "./components/patterns/app-layout";
import { ALL_PAGE_LABELS } from "./components/registry";
import "./styles/tour.css";

/**
 * App.tsx - Main Entry Point
 *
 * ARCHITECTURE:
 * - DSM (Design System Manager) showcase only
 * - Providers: Theme, Help, Loading, Transition
 * - Layout: AdminLayout del DSM (eat your own dog food)
 * - Accessibility: WCAG 2.1 AA compliant
 * - English only
 * - Single tenant: CESIONBNK
 *
 * Page labels are derived from registry.ts — do NOT add them here manually.
 */

// Re-use the registry's label map (auto-updated when registry.ts changes)
const PAGE_LABELS = ALL_PAGE_LABELS;

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [activePage, setActivePage] = useState<PageId>(() => {
    const saved = localStorage.getItem("dsm-active-page");
    return (saved as PageId) || "home";
  });

  useEffect(() => {
    localStorage.setItem("dsm-active-page", activePage);
  }, [activePage]);

  // Listen for custom navigation events from child components
  useEffect(() => {
    const handler = (e: Event) => {
      const pageId = (e as CustomEvent<PageId>).detail;
      if (pageId) setActivePage(pageId);
    };
    window.addEventListener("dsm-navigate", handler);
    return () => window.removeEventListener("dsm-navigate", handler);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen w-full">
      {/* Accessibility: Live Regions */}
      <div
        id="live-region-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div
        id="live-region-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      />

      <AdminLayout
        stickyHeader
        collapsible
        sidebarWidth={260}
        sidebarCollapsedWidth={56}
        sidebarHeader={
          <Logo size="md" variant="auto" className="flex-shrink-0" />
        }
        header={
          <LayoutHeader
            logo={
              <div className="flex items-center gap-4 pl-10 md:pl-0">
                <div className="hidden md:block">
                  <h1 className="font-bold text-foreground">
                    CESIONBNK Design System
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Design System Manager
                  </p>
                </div>
              </div>
            }
            actions={
              <div className="flex items-center gap-2">
                {/* Page ID indicator — for auditing */}
                {activePage !== "home" && (
                  <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground select-text">
                    <span className="text-foreground font-medium">
                      {PAGE_LABELS[activePage] ?? activePage}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <code className="font-mono text-xs text-primary bg-muted px-1 py-0.5 rounded">
                      {activePage}
                    </code>
                  </div>
                )}

                {/* Help System */}
                <HelpCenter variant="header" />

                {/* Toggle Theme */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                  aria-label={
                    theme === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"
                  }
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            }
          />
        }
        sidebar={
          <DSMSidebarNav
            activePage={activePage}
            onPageChange={setActivePage}
          />
        }
        footer={
          <LayoutFooter
            left={
              <div className="flex items-center gap-3">
                <Logo size="sm" variant="auto" />
                <span>Built with React, Tailwind CSS v4 & Atomic Design</span>
              </div>
            }
            right={
              <div className="flex items-center gap-2 text-xs">
                <span>CESIONBNK Theme</span>
                <span>·</span>
                <span>WCAG 2.1 AA</span>
                <span>·</span>
                <span>Atomic Design</span>
              </div>
            }
          />
        }
        bodyClassName="flex flex-col gap-4 p-4 pt-0 md:p-8 md:pt-6 bg-card"
      >
        <div id="main-content" role="main">
          <PageRenderer pageId={activePage} />
        </div>
      </AdminLayout>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HelpProvider>
        <LoadingProvider>
          <TransitionProvider>
            <div className="relative min-h-screen">
              <Toaster />
              <AppContent />
              <LoadingOverlay />
              <HelpButton />
            </div>
          </TransitionProvider>
        </LoadingProvider>
      </HelpProvider>
    </ThemeProvider>
  );
}