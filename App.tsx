import { useState, useEffect } from "react";
import { PageId } from "./components/types/PageId";
import { 
  PageRenderer, 
  DSMSidebarNav, 
  Logo, 
  AdminLayout, 
  LayoutHeader, 
  LayoutFooter 
} from "./components/layout";
import { Button } from "./components/ui/Button";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "./components/providers/ThemeProvider";
import { ThemeSwitcher } from "./components/ui/ThemeSwitcher";
import { Toaster } from "./components/ui/Sonner";
import { HelpProvider } from "./components/help/HelpProvider";
import { HelpCenter } from "./components/help/HelpCenter";
import { HelpButton } from "./components/help/HelpButton";
import { LoadingProvider } from "./components/providers/LoadingProvider";
import { TransitionProvider } from "./components/providers/TransitionProvider";
import { LoadingOverlay } from "./components/ui/LoadingOverlay";
import { ALL_PAGE_LABELS } from "./components/registry";
import "./styles/tour.css";

function AppContent() {
  const { theme, toggleTheme, designTheme } = useTheme();
  const [activePage, setActivePage] = useState<PageId>(() => {
    return (localStorage.getItem("dsm-active-page") as PageId) || "home";
  });

  useEffect(() => {
    localStorage.setItem("dsm-active-page", activePage);
  }, [activePage]);

  useEffect(() => {
    const handleNavigate = (e: any) => {
      const pageId = e.detail;
      if (pageId) setActivePage(pageId);
    };
    window.addEventListener("dsm-navigate", handleNavigate);
    return () => window.removeEventListener("dsm-navigate", handleNavigate);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div id="live-region-polite" role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
      <div id="live-region-assertive" role="alert" aria-live="assertive" aria-atomic="true" className="sr-only" />

      <AdminLayout
        stickyHeader
        sidebarWidth={260}
        sidebarCollapsedWidth={56}
        header={
          <LayoutHeader
            logo={
              <div className="flex items-center gap-4 pl-10 md:pl-0">
                <Logo size="md" variant="auto" className="flex-shrink-0" />
                <div className="hidden md:block">
                  <h1 className="font-bold text-foreground">CESIONBNK Design System</h1>
                  <p className="text-xs text-muted-foreground">Design System Manager</p>
                </div>
              </div>
            }
            actions={
              <div className="flex items-center gap-2">
                {activePage !== "home" && (
                  <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground select-text">
                    <span className="text-foreground font-medium">{ALL_PAGE_LABELS[activePage] ?? activePage}</span>
                    <span className="text-muted-foreground">·</span>
                    <code className="font-mono text-xs text-primary bg-muted px-1 py-0.5 rounded">{activePage}</code>
                  </div>
                )}
                <HelpButton  />
                <ThemeSwitcher />
                <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full">
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            }
          />
        }
        sidebar={<DSMSidebarNav activePage={activePage} onPageChange={setActivePage} />}
        footer={
          <LayoutFooter
            left={<div className="flex items-center gap-3"><Logo size="sm" variant="auto" /><span>Built with React, Tailwind CSS v4 & Atomic Design</span></div>}
            right={<div className="flex items-center gap-2 text-xs capitalize"><span>{designTheme} Theme</span><span>·</span><span>WCAG 2.1 AA</span><span>·</span><span>Atomic Design</span></div>}
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
    <ThemeProvider >
      <HelpProvider>
        <LoadingProvider>
          <TransitionProvider>
            <div className="relative min-h-screen">
              <Toaster />
              <AppContent />
              <LoadingOverlay />
              <HelpCenter />
            </div>
          </TransitionProvider>
        </LoadingProvider>
      </HelpProvider>
    </ThemeProvider>
  );
}
