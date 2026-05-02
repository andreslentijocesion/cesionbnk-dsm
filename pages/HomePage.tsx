import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Progress } from "../components/ui/Progress"
import { Separator } from "../components/ui/Separator"
import {
  CheckCircle2,
  Package,
  Palette,
  Layers,
  Accessibility,
  Code2,
  Zap,
  Shield,
  Sparkles,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react"
import { Logo } from "../components/layout/logo"
import { ComponentShowcase } from "../components/ui/ComponentShowcase"

import { BRAND_INFO } from "../lib/constants"

export function HomePageContent() {
  const stats = [
    { label: "Total Components", value: "130",  icon: Package,     color: "text-primary"  },
    { label: "DSM Migration",     value: "100%", icon: Sparkles,    color: "text-success-on-subtle" },
    { label: "Showcase Pages",    value: "128",  icon: CheckCircle2,color: "text-success"   },
    { label: "WCAG AA",           value: "100%", icon: Accessibility,color: "text-success"  },
  ];

  const features = [
    {
      icon: Palette,
      title: "Design Tokens",
      description: `W3C DTCG-compliant token system with ${BRAND_INFO.name} brand colors ${BRAND_INFO.primaryColor} (Slate) and ${BRAND_INFO.secondaryColor} (Zinc). Single Source of Truth in globals.css.`,
      badge: "Active",
    },
    {
      icon: Accessibility,
      title: "WCAG 2.1 AA Compliant",
      description: "100% Lighthouse score — WCAG 2.1 AA compliant. All interactive components support keyboard navigation and screen readers.",
      badge: "Verified",
    },
    {
      icon: Layers,
      title: "Atomic Design",
      description: "3-layer architecture: Core UI (74) · Patterns (38) · Advanced (18). Each layer builds on the previous.",
      badge: "Implemented",
    },
    {
      icon: Code2,
      title: "shadcn/ui Base",
      description: `48 official shadcn/ui components extended with ${BRAND_INFO.name}-specific variants, custom props and business patterns.`,
      badge: "Stable",
    },
    {
      icon: Zap,
      title: "Light / Dark Mode",
      description: `Full theme support via CSS custom properties. Primary (${BRAND_INFO.primaryColor}) and ring remain constant — only surfaces and neutral tones shift.`,
      badge: "Live",
    },
    {
      icon: Shield,
      title: `${BRAND_INFO.fontFamily} Typography`,
      description: `Exclusive ${BRAND_INFO.fontFamily} typeface with 0.025em global letter-spacing, 1.5 line-height default and 11 predefined type scales.`,
      badge: "System",
    },
  ];

  const techStack = [
    { name: "React 18",      version: "18.x"   },
    { name: "TypeScript",    version: "5.x"    },
    { name: "Tailwind CSS",  version: "4.0"    },
    { name: "shadcn/ui",     version: "Latest" },
    { name: "Radix UI",      version: "Latest" },
    { name: "Recharts",      version: "2.x"    },
    { name: "Motion",        version: "Latest" },
  ];

  const progress = {
    shadcn:        100, // 48/48 official shadcn/ui
    patterns:      100, // 38/38 patterns
    advanced:      100, // 18/18 advanced
    accessibility: 100, // WCAG AA — Lighthouse 100/100
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Logo size="lg" variant="light" />
            <Badge variant="default" className="text-xs px-3 py-1">v0.4.0</Badge>
            <Badge variant="success-soft" className="gap-1">
              <Sparkles className="size-3" />
              DSM 100%
            </Badge>
          </div>
          <h1>Design System Manager</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6 font-light">
            Complete design system for {BRAND_INFO.name} platform — built with React,
            Tailwind CSS v4 and shadcn/ui. Focused on accessibility, consistency and scalability.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="gap-2">
              <Activity className="size-3" />
              Last updated: April 2026
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Users className="size-3" />
              Atomic Design · 3 Layers
            </Badge>
            <Badge variant="outline" className="gap-2">
              <TrendingUp className="size-3" />
              130 Components · 128 Pages
            </Badge>
          </div>
        </div>
        <div className="absolute top-0 right-0 size-64 bg-muted rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 size-48 bg-muted rounded-full blur-3xl -z-0" />
      </div>

      {/* ── Stats ── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <stat.icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Implementation Status ── */}
      <Card className="shadow-elevation-1">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <CardTitle>Implementation Status</CardTitle>
          </div>
          <CardDescription>Current progress across all architecture layers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Official shadcn/ui Components</span>
              <span className="font-semibold">{progress.shadcn}%</span>
            </div>
            <Progress value={progress.shadcn} className="h-2" aria-label="shadcn/ui components" />
            <p className="text-xs text-muted-foreground">48/48 components implemented</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Patterns (38 components)</span>
              <span className="font-semibold">{progress.patterns}%</span>
            </div>
            <Progress value={progress.patterns} className="h-2" aria-label="Pattern components" />
            <p className="text-xs text-muted-foreground">38/38 patterns complete — ApprovalFlow, AuditLog, DataTableAdvanced, etc.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Advanced Components (18 components)</span>
              <span className="font-semibold">{progress.advanced}%</span>
            </div>
            <Progress value={progress.advanced} className="h-2" aria-label="Advanced components" />
            <p className="text-xs text-muted-foreground">18/18 advanced components — Charts, MasterDataGrid, FormBuilder, etc.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">WCAG 2.1 AA — Lighthouse 100/100</span>
              <span className="font-semibold">{progress.accessibility}%</span>
            </div>
            <Progress value={progress.accessibility} className="h-2" aria-label="WCAG 2.1 AA accessibility" />
            <p className="text-xs text-muted-foreground">Lighthouse 100/100 — todos los criterios AA verificados</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Features ── */}
      <div>
        <div className="mb-6">
          <h2 className="mb-2">Key Features</h2>
          <p className="text-muted-foreground">Foundations and pillars of the Design System</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-muted">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <Badge variant="neutral-soft-outline">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Tech Stack + WCAG ── */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-elevation-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="size-5 text-chart-2" />
              <CardTitle>Tech Stack</CardTitle>
            </div>
            <CardDescription>Libraries and frameworks used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{tech.name}</span>
                  <Badge variant="outline" className="text-xs">{tech.version}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elevation-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-success" />
              <CardTitle>WCAG Heuristics</CardTitle>
            </div>
            <CardDescription>Accessibility standards compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Color Contrast", desc: "Ratios above 4.5:1 for normal text and 3:1 for large text" },
              { title: "Keyboard Navigation", desc: "All interactive components accessible via Tab/Enter/Escape" },
              { title: "Screen Readers", desc: "ARIA labels and semantic roles in all components" },
              { title: "Focus Visible", desc: `Focus ring (${BRAND_INFO.primaryColor}) clearly visible in light and dark mode` },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <ComponentShowcase
      title={`${BRAND_INFO.name} Design System`}
      description="130 components · 128 showcase pages · Core UI, Patterns, and Advanced layers."
      category="Home"
      preview={<HomePageContent />}
      code={`// DSM Home — navigate using the sidebar to explore all 130 components across 128 pages`}
      props={[]}
      examples={[]}
    />
  );
}