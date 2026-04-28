/**
 * AppLayoutPage — Showcase for ClientLayout & AdminLayout
 * Demonstrates both layout shells: ClientLayout (customer-facing) and AdminLayout without sidebar (admin).
 */
import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  ClientLayout,
  AdminLayout,
  LayoutHeader,
  LayoutFooter,
} from "../components/patterns/app-layout";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  Bell,
  Search,
} from "lucide-react";

/* ── Demo: Client Layout ── */
function ClientLayoutDemo() {
  return (
    <div className="border border-border rounded-[var(--radius)] overflow-hidden h-[420px] w-full">
      <ClientLayout
        stickyHeader
        header={
          <LayoutHeader
            logo={
              <span className="text-primary font-medium">CESIONBNK</span>
            }
            nav={
              <>
                <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-[var(--radius)] hover:bg-accent">
                  Home
                </a>
                <a href="#" className="px-3 py-2 text-sm text-primary transition-colors rounded-[var(--radius)] bg-muted">
                  Dashboard
                </a>
                <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-[var(--radius)] hover:bg-accent">
                  About
                </a>
                <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-[var(--radius)] hover:bg-accent">
                  Contact
                </a>
              </>
            }
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm">Sign In</Button>
              </div>
            }
          />
        }
        footer={
          <LayoutFooter
            left={<span>&copy; 2026 CESIONBNK. All rights reserved.</span>}
            right={
              <div className="flex gap-4">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              </div>
            }
          />
        }
        bodyClassName="p-6"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-foreground">Welcome to CESIONBNK</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Client-facing layout: header, scrollable body, and footer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Operations", "Invoices", "Reports"].map((title) => (
              <div
                key={title}
                className="rounded-[var(--radius)] border border-border bg-card p-6 hover-lift"
              >
                <h4 className="text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your {title.toLowerCase()} efficiently.
                </p>
              </div>
            ))}
          </div>
          <div className="h-32 rounded-[var(--radius)] border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
            Scrollable body area
          </div>
        </div>
      </ClientLayout>
    </div>
  );
}

/* ── Demo: Admin Layout (no sidebar) ── */
function AdminNoSidebarDemo() {
  return (
    <div className="border border-border rounded-[var(--radius)] overflow-hidden h-[420px] w-full">
      <AdminLayout
        stickyHeader
        header={
          <LayoutHeader
            logo={
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">C</span>
                </div>
                <span className="text-foreground font-medium">CESIONBNK</span>
              </div>
            }
            nav={
              <>
                <a href="#" className="px-3 py-2 text-sm text-primary transition-colors rounded-[var(--radius)] bg-muted">
                  Overview
                </a>
                <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-[var(--radius)] hover:bg-accent">
                  Analytics
                </a>
                <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors rounded-[var(--radius)] hover:bg-accent">
                  Settings
                </a>
              </>
            }
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs text-primary">
                  JD
                </div>
              </div>
            }
          />
        }
        footer={
          <LayoutFooter
            left={<span>CESIONBNK Admin v0.3.0</span>}
            right={<span>Full-width mode</span>}
          />
        }
        bodyClassName="p-6"
      >
        <div className="space-y-4">
          <h2 className="text-foreground">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Full-width content area with header navigation. No sidebar — navigation lives in the header.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Operations", "Clients", "Reports"].map((title) => (
              <div
                key={title}
                className="rounded-[var(--radius)] border border-border bg-card p-6 hover-lift"
              >
                <h4 className="text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your {title.toLowerCase()} efficiently.
                </p>
              </div>
            ))}
          </div>
          <div className="h-32 rounded-[var(--radius)] border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm">
            Scrollable body area
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

/* ── Main Page ── */
export function AppLayoutPage() {
  return (
    <ComponentShowcase
      title="App Layouts"
      description="Two full-page shell layouts for CESIONBNK. ClientLayout provides Header + Body + Footer for customer-facing pages. AdminLayout (without sidebar) provides the same structure with admin context for internal dashboards."
      category="Layout"
      atomicLevel="Pattern"
      preview={
        <div className="w-full space-y-8">
          {/* ClientLayout Demo */}
          <div className="space-y-2">
            <h3 className="text-foreground">ClientLayout</h3>
            <p className="text-sm text-muted-foreground">Header + Body + Footer (customer-facing)</p>
            <ClientLayoutDemo />
          </div>

          <Separator />

          {/* AdminLayout Demo (no sidebar) */}
          <div className="space-y-2">
            <h3 className="text-foreground">AdminLayout</h3>
            <p className="text-sm text-muted-foreground">Header + Body + Footer (admin/internal). Full-width content with navigation in the header.</p>
            <AdminNoSidebarDemo />
          </div>
        </div>
      }
      code={`import {
  ClientLayout,
  AdminLayout,
  LayoutHeader,
  LayoutFooter,
} from "@/components/patterns/app-layout";

// ── Client Layout ──
<ClientLayout
  stickyHeader
  header={<LayoutHeader logo={<Logo />} nav={<NavLinks />} actions={<UserMenu />} />}
  footer={<LayoutFooter left={<span>© 2026</span>} right={<LegalLinks />} />}
>
  {/* Body content */}
</ClientLayout>

// ── Admin Layout (no sidebar) ──
<AdminLayout
  stickyHeader
  header={<LayoutHeader logo={<Logo />} nav={<AdminNav />} actions={<UserMenu />} />}
  footer={<LayoutFooter left={<span>v0.3.0</span>} />}
>
  {/* Full-width body content */}
</AdminLayout>`}
      props={[
        { name: "header", type: "ReactNode", description: "Header element (use LayoutHeader or custom)" },
        { name: "footer", type: "ReactNode", description: "Footer element (use LayoutFooter or custom)" },
        { name: "stickyHeader", type: "boolean", default: "true", description: "Stick header to top on scroll" },
        { name: "stickyFooter", type: "boolean", default: "false", description: "Stick footer to bottom" },
        { name: "bodyClassName", type: "string", description: "Additional classes for body wrapper" },
      ]}
      examples={[
        {
          title: "LayoutHeader with transparent mode",
          description: "Transparent header for hero sections or landing pages.",
          preview: (
            <div className="w-full rounded-[var(--radius)] overflow-hidden border border-border bg-gradient-to-br from-primary/20 to-secondary/20">
              <LayoutHeader
                transparent
                logo={<span className="text-primary font-medium">CESIONBNK</span>}
                nav={
                  <>
                    <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground">Home</a>
                    <a href="#" className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground">About</a>
                  </>
                }
                actions={<Button size="sm">Get Started</Button>}
              />
            </div>
          ),
          code: `<LayoutHeader
  transparent
  logo={<span>CESIONBNK</span>}
  nav={<NavLinks />}
  actions={<Button>Get Started</Button>}
/>`,
        },
        {
          title: "LayoutFooter with three slots",
          description: "Footer with left, center, and right content areas.",
          preview: (
            <div className="w-full rounded-[var(--radius)] overflow-hidden border border-border">
              <LayoutFooter
                left={<span>© 2026 CESIONBNK</span>}
                center={<span>Built with Financio DS</span>}
                right={
                  <div className="flex gap-3">
                    <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                    <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                  </div>
                }
              />
            </div>
          ),
          code: `<LayoutFooter
  left={<span>© 2026 CESIONBNK</span>}
  center={<span>Built with Financio DS</span>}
  right={<LegalLinks />}
/>`,
        },
      ]}
    />
  );
}