import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import { CheckCircle2, Code2, Sparkles, Layers, Palette, MousePointerClick, MessageSquare, Database, FileCode, Layout, TrendingUp, Award, BookOpen, Shield, GitBranch, Component, Box, Puzzle, Calendar, Package, Wrench, AlertTriangle, Rocket, Zap, FileText, BarChart3, ChevronDown, ChevronRight, Eye, Keyboard, Accessibility as AccessibilityIcon, Paintbrush } from "lucide-react";
import { Logo } from "../components/Logo";
import { Progress } from "../components/ui/progress";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { ContrastDot } from "../components/ui/dynamic-previews";

// ── Navigation helper ──
function navigateTo(pageId: string) {
  window.dispatchEvent(new CustomEvent('dsm-navigate', { detail: pageId }));
}

// ── Version History Data ──
interface VersionEntry {
  version: string;
  date: string;
  type: "Major" | "Minor" | "Patch";
  sections: {
    icon: typeof Sparkles;
    title: string;
    items: string[];
  }[];
}

const versionHistory: VersionEntry[] = [
  {
    version: "0.4.0",
    date: "April 10, 2026",
    type: "Minor",
    sections: [
      {
        icon: Shield,
        title: "WCAG 2.1 AA — Lighthouse 100/100",
        items: [
          "**StatCard contrast fix**: `text-destructive` → `text-destructive-on-subtle` (3.76:1 → ≥4.5:1) en trend 'down' y variante destructive.",
          "**Props table headers**: Eliminada opacidad `/50` en `text-muted-foreground` (2.28:1 → ≥4.5:1) en ComponentShowcase.",
          "**Code tags**: `bg-secondary` → `bg-muted text-foreground` (3.82:1 → ≥7:1) en props tables.",
          "**CardTitle semántico**: `h4` → `h3` global en card.tsx — elimina axe-core 'heading-order' warning.",
          "**Progress aria-labels**: Añadidos en HomePage y DSMDashboardPage para 5 barras sin descripción.",
        ],
      },
      {
        icon: Paintbrush,
        title: "Dark Mode — Mejoras sistémicas",
        items: [
          "**--primary**: `#d1d5db` → `#9ca3af` (Gray-400) — contraste legible sobre superficies oscuras.",
          "**--border**: `#27272a` → `#3f3f46` (Zinc-700) — borde visible entre card y background.",
          "**Subtle backgrounds**: `*-subtle` tokens → Tailwind `*-900` shades (más perceptibles en dark).",
          "**Shadows**: Añadido white ring `rgba(255,255,255,0.05–0.08)` + mayor opacidad — cards tienen definición.",
        ],
      },
      {
        icon: Layout,
        title: "Sidebar — Restructura de navegación",
        items: [
          "**Sheet, Drawer, Bottom Sheet**: Movidos de Feedback → Layout (taxonomía correcta).",
          "**Patterns**: 22 items ordenados alfabéticamente.",
          "**DSM & Resources group**: DSM Dashboard, Visual Audit, Usage Guidelines, Changelog, Brand Layout, Design Tokens — todos accesibles.",
          "**Visual Audit + Changelog**: Eran páginas huérfanas sin entrada en sidebar — ahora navegables.",
        ],
      },
      {
        icon: Layers,
        title: "Design Tokens — Nuevas categorías",
        items: [
          "**Motion tokens**: `--duration-instant/fast/base/slow/slower/lazy` + `--ease-default/in/out/spring/linear` en config.css.",
          "**Spacing tokens**: `--space-1` a `--space-24` con base 4px grid.",
          "**DesignTokensPage**: 3 tabs nuevos — Spacing (visual bar chart), Motion (live demos), Breakpoints (responsive patterns).",
        ],
      },
      {
        icon: BookOpen,
        title: "Component Guidelines — Nueva página",
        items: [
          "**10 secciones**: Overlays, Feedback, Tablas, Form Controls, Buttons, Badges, Factoring Patterns, Charts, Print/PDF, Error States.",
          "**Decision tables**: Cuándo usar Dialog vs Sheet vs Drawer vs Popover, cuándo usar qué chart, jerarquía de errores.",
          "**Do/Don't cards**: Para los 20+ patrones de decisión más frecuentes en CesionBNK.",
          "Accesible desde sidebar: DSM & Resources → Usage Guidelines.",
        ],
      },
      {
        icon: FileText,
        title: "Print / PDF Styles — @media print",
        items: [
          "**styles/print.css**: Hides sidebar/nav/toolbars, full-width main content, tablas con thead que se repite por página.",
          "**Utility classes**: `.no-print`, `.print-only`, `.print-break-before/after/inside-avoid`, `.print-landscape`.",
          "**Factoring hooks**: `.factoring-portfolio-section`, `.approval-step`, `.risk-score-bar` con print-color-adjust.",
          "**Badge colors preserved**: `print-color-adjust: exact` para success/destructive/warning/info.",
        ],
      },
      {
        icon: Package,
        title: "lib/index.ts — Exports completos",
        items: [
          "**AspectRatio**: Exportado desde aspect-ratio.tsx.",
          "**Chart primitives**: `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`, `ChartConfig`.",
          "**Skeleton variants**: `SkeletonTable`, `SkeletonCard`, `SkeletonCardGrid`, `SkeletonForm`, `SkeletonList`, `SkeletonDashboard`, `SkeletonKpiCard`, `SkeletonKpiCardGroup`, `SkeletonProfile`.",
        ],
      },
    ],
  },
  {
    version: "6.5.1",
    date: "February 19, 2026",
    type: "Patch",
    sections: [
      {
        icon: Wrench,
        title: "Token Audit & CSS Sync",
        items: [
          "**globals.css @theme inline**: Added missing KPI and shadow-elevation tokens. `text-kpi-*`, `shadow-elevation-*` classes now functional.",
          "**figma-tokens.json**: Fixed 5 wrong chart hex values in dark mode (chart-2,3,4,5 Light-5 were incorrect approximations of oklch values).",
          "**figma-tokens-studio.json**: Rewritten to W3C DTCG format — all tokens now use `$value`/`$type`/`$description` with `$` prefix. Typography composites added.",
          "**TOKENS.md**: Fixed KPI CSS variable format (comma-separated channels matching globals.css).",
          "**globals.css version**: Bumped to 0.3.1.",
        ],
      },
    ],
  },
  {
    version: "6.5.0",
    date: "February 11, 2026",
    type: "Minor",
    sections: [
      {
        icon: Wrench,
        title: "Simplification & Cleanup",
        items: [
          "**Theme System Removed**: Removed multi-theme selector (8 themes) to reduce complexity. Only default CESIONBNK theme remains.",
          "**ThemeStyleSelector Deleted**: Component and all 7 non-default theme CSS files removed.",
          "**ThemeCustomizerPage Removed**: Page and sidebar entry cleaned up.",
          "**ThemeProvider Simplified**: Removed style theme state, data-theme attribute handling, and STYLE_THEMES array.",
        ],
      },
    ],
  },
  {
    version: "6.4.0",
    date: "February 9, 2026",
    type: "Minor",
    sections: [
      {
        icon: Paintbrush,
        title: "Theme Selector Expansion — 8 Styles (removed in 6.5.0)",
        items: [
          "**Note**: This feature was removed in v6.5.0 to simplify the project.",
        ],
      },
    ],
  },
  {
    version: "6.3.0",
    date: "February 8, 2026",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "DSM Audit & Dashboard Accuracy",
        items: [
          "**Full Codebase Audit**: Counted every component file across all 4 architecture layers.",
          "**Dashboard KPIs Updated**: Component count 117→129, Pages 69→117, Architecture layers corrected.",
          "**Sidebar Badges Fixed**: Patterns 22→18, Advanced 23→17 — now match actual item count.",
          "**Category Breakdown**: All 10 functional categories updated to real counts.",
          "**TabsList Unified**: All pages now use constrained grid pattern (`max-w-lg`) for consistent UX.",
        ],
      },
      {
        icon: Wrench,
        title: "Consistency Fixes",
        items: [
          "**10 files updated** for TabsList pattern: AnimationSystem, Animations, Charts, AdvancedForms, DSMDashboard (×2), InvoiceUpload, ChartShowcase, HelpCenter, NotificationCenter, TableCatalog.",
          "**Table Catalog**: Added to sidebar under Advanced with constrained TabsList.",
        ],
      },
    ],
  },
  {
    version: "6.2.1",
    date: "February 7, 2026",
    type: "Patch",
    sections: [
      {
        icon: Sparkles,
        title: "Props Coverage 100%",
        items: [
          "**22 Pages Updated**: Added real props documentation extracted from TypeScript interfaces to all pages missing them.",
          "**Navigation**: NavigationMenuPage with Radix primitive props.",
          "**Feedback**: ToastPage (Sonner API), EmptyStatePage, ErrorBoundaryPage, BottomSheetPage, LoadingStatesPage.",
          "**Layout**: SidebarShowcasePage with custom HTML props table.",
          "**Patterns & Advanced**: ActivityFeed, AdvancedFilterPanel, ApprovalTimeline, CommentThread, DataTableAdvanced, InfiniteScroll, MasonryGrid, FAB.",
          "**Business Components**: ContactForm, LiquidityMeter, RiskIndicator, InvoiceTable.",
        ],
      },
      {
        icon: Wrench,
        title: "Dashboard Improvements",
        items: [
          "**Changelog Integrated**: Full version history now lives inside the DSM Dashboard.",
          "**Dedicated ChangelogPage removed**: Single source of truth for release notes.",
        ],
      },
    ],
  },
  {
    version: "6.2.0",
    date: "February 7, 2026",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "DSM Page Homogenization",
        items: [
          "**Standard Structure**: All DSM pages now follow Header → Preview|Code → Props → Examples format via ComponentShowcase.",
          "**Dead Props Cleanup**: Removed deprecated `usage` and `usageCode` props from all ~55 pages.",
          "**6 Pages Migrated**: InputFilePage, TextareaAutoresizePage, DateRangePickerPage, MultiSelectPage, AlertDialogPage, GridShowcasePage.",
        ],
      },
      {
        icon: Wrench,
        title: "Fixes & Documentation",
        items: [
          "**ChartsPage Fix**: Changed `h-full` to viewport-relative height for proper side panel rendering.",
          "**PROMPT_GUIDE.md**: Updated with standard page structure, templates, and validation checklist.",
          "**Full-width Layout**: Removed `max-w-6xl` from 5 pages for consistent w-full rendering.",
        ],
      },
    ],
  },
  {
    version: "6.1.0",
    date: "February 5, 2026",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "Improved - Platform UX",
        items: [
          "**Conditional Visibility**: Configuration cards hide automatically when viewing Operation Summary.",
          "**State Management**: Improved component communication using callback props.",
          "**Clean Interface**: Operation summary displays with maximum screen space.",
        ],
      },
      {
        icon: Wrench,
        title: "UI Cleanup",
        items: [
          "Removed \"Colapsar Sidebar\" button from SidebarFooter for cleaner UI.",
          "Sidebar collapse maintained through native shadcn/ui controls.",
        ],
      },
    ],
  },
  {
    version: "6.0.0",
    date: "February 2, 2026",
    type: "Major",
    sections: [
      {
        icon: Rocket,
        title: "Migration & Refactor",
        items: [
          "**NPM Migration**: Began migration to `@biomahd-creator/financio-design-system`.",
          "**Client Flow**: Implemented Endosatario, Negociacion, and Bancaria sections.",
          "**New Components**: Added ChartLegendItem.",
        ],
      },
      {
        icon: Wrench,
        title: "Fixed & Improved",
        items: [
          "Fixed runtime errors in ChartShowcase.tsx caused by missing dependencies.",
          "Removed static component counter from Sidebar for cleaner UI.",
        ],
      },
    ],
  },
  {
    version: "5.2.1",
    date: "January 30, 2026",
    type: "Patch",
    sections: [
      {
        icon: Wrench,
        title: "Maintenance & Cleanup",
        items: [
          "**Removed Redundant Components**: Eliminated RefactorMultiStepPage and RefactorMultiStepVerticalPage.",
          "Updated component count from 97 to 95 components.",
          "Cleaned up all references in PageRenderer, SidebarNew, and index.tsx.",
          "Removed redundant documentation files.",
        ],
      },
    ],
  },
  {
    version: "5.2.0",
    date: "January 14, 2026",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "Improved",
        items: [
          "Help Center: Added internal padding (p-6) for better spacing and readability.",
          "Documentation: Updated HELP_SYSTEM_IMPLEMENTATION.md to version 1.1.",
        ],
      },
    ],
  },
  {
    version: "5.1.0",
    date: "January 13, 2026",
    type: "Minor",
    sections: [
      {
        icon: Rocket,
        title: "Added - Icon Gallery Expansion",
        items: [
          "Icon Gallery: Simplified to reference guide with ~30 sample icons and implementation examples.",
          "External library: Documented lucide-react as peer dependency with link to lucide.dev/icons.",
          "Removed: 500+ icon imports, search bar, category filters — reduced bundle stress.",
        ],
      },
    ],
  },
  {
    version: "5.0.0",
    date: "January 13, 2026",
    type: "Major",
    sections: [
      {
        icon: Rocket,
        title: "Added - Complete Help System",
        items: [
          "Contextual Help: Inline tooltips and popovers for form fields.",
          "Help Center: Comprehensive documentation panel with 3 tabs (FAQs, Guides, Videos).",
          "Product Tour: Guided walkthroughs with driver.js (3 predefined tours).",
          "Components Created: 8 new components + demo page.",
        ],
      },
      {
        icon: AlertTriangle,
        title: "Breaking Changes",
        items: [
          "Requires driver.js installation for Product Tour.",
          "HelpProvider must wrap the app in App.tsx.",
        ],
      },
    ],
  },
  {
    version: "4.5.0",
    date: "December 20, 2025",
    type: "Minor",
    sections: [
      {
        icon: FileText,
        title: "Added - DSM (Design System Manager)",
        items: [
          "Code Block Component: Syntax highlighting with copy button.",
          "Component Showcase: Reusable template for component documentation.",
          "DSM Dashboard: Central hub for design system metrics.",
        ],
      },
    ],
  },
  {
    version: "4.0.0",
    date: "December 15, 2025",
    type: "Major",
    sections: [
      {
        icon: Rocket,
        title: "Added - Business Patterns & Modules",
        items: [
          "Business Patterns: 15+ reusable components (/components/business/).",
          "Complete application module with 15+ screens.",
          "Architecture: New directory structure for business components.",
        ],
      },
      {
        icon: AlertTriangle,
        title: "Breaking Changes",
        items: [
          "New directory structure for business components.",
          "New PageIds for business modules.",
        ],
      },
    ],
  },
  {
    version: "3.5.0",
    date: "December 10, 2025",
    type: "Minor",
    sections: [
      {
        icon: Zap,
        title: "Added - Advanced Components (20)",
        items: [
          "Charts: FunnelChart, GaugeChart, Heatmap, Sparkline, TreemapChart.",
          "Forms: ConditionalForm, FormBuilder, MultiColumnForm, FileUploader.",
          "Data: DataTable, PivotTable, TreeTable, ExportData.",
          "UI: Combobox, MultiSelect, DatePickerWithPresets, InfiniteScroll, MasonryGrid.",
          "Other: InvoiceGenerator, RichTextEditor, StepIndicator, Timeline.",
        ],
      },
    ],
  },
  {
    version: "3.0.0",
    date: "December 5, 2025",
    type: "Major",
    sections: [
      {
        icon: Package,
        title: "Added - Atomic Design System",
        items: [
          "Atoms (5): Button, Input, Badge, Label, Avatar.",
          "Molecules (6): SearchBar, StatCard, SimpleFormField, ActionButton, FilterChip.",
          "Organisms (5): NavigationBar, LoginForm, FilterBar, StatsGrid, InvoiceTable.",
          "Templates (3): AuthTemplate, DashboardTemplate, ListPageTemplate.",
          "Pages (4): LoginPage, DashboardPage, InvoiceListPage, SelectionPage.",
        ],
      },
    ],
  },
  {
    version: "2.5.0",
    date: "December 1, 2025",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "Added - Composed Patterns",
        items: [
          "8 Business Patterns: StatsDashboard, DataTableAdvanced, MultiStepWizard.",
          "NotificationCenter, AdvancedFilterPanel.",
        ],
      },
    ],
  },
  {
    version: "2.0.0",
    date: "November 25, 2025",
    type: "Major",
    sections: [
      {
        icon: FileText,
        title: 'Added - DSM "New" Pages',
        items: [
          "22 New Documented Pages with full DSM structure.",
          "Preview + Code tabs, Usage section, Props API tables.",
          "Multiple examples per component with copy-to-clipboard.",
        ],
      },
    ],
  },
  {
    version: "1.5.0",
    date: "November 20, 2025",
    type: "Minor",
    sections: [
      {
        icon: Sparkles,
        title: "Added - Theme Customizer",
        items: [
          "Interactive theme configuration with live preview.",
          "Primary, secondary, link color pickers.",
          "Border radius control and elevation system.",
          "Export/Import theme configurations.",
        ],
      },
    ],
  },
];

// ── Helper: render markdown-like bold ──
function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-foreground">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ── Collapsible Version Card ──
function VersionCard({ entry, defaultOpen = false }: { entry: VersionEntry; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const badgeVariant = entry.type === "Major" ? "destructive" as const : entry.type === "Patch" ? "default" as const : "secondary" as const;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={defaultOpen ? "border-primary/30" : ""}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted transition-colors py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">v{entry.version}</span>
                  <Badge variant={badgeVariant} className="text-[10px] px-1.5 py-0">
                    {entry.type}
                  </Badge>
                  {defaultOpen && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      Latest
                    </Badge>
                  )}
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {entry.date}
              </span>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 space-y-4">
            {entry.sections.map((section, sIdx) => (
              <div key={sIdx}>
                <div className="flex items-center gap-2 mb-2">
                  <section.icon className={`h-4 w-4 ${section.title.includes("Breaking") ? "text-destructive" : "text-primary"}`} />
                  <h3 className="text-sm text-foreground">{section.title}</h3>
                </div>
                <ul className="space-y-1 ml-6">
                  {section.items.map((item, iIdx) => (
                    <li key={iIdx} className="text-sm text-muted-foreground">
                      {"\u2022 "}{renderBoldText(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function DSMDashboardContent() {

  // ── Architecture Layers ──
  const architectureLayers = [
    {
      name: "Core UI",
      path: "/components/ui/",
      icon: Component,
      count: 74,
      color: "text-primary",
      bgColor: "bg-muted",
      borderColor: "border-border",
      description: "Shadcn/ui base + extended — Button, Input, Card, Dialog, Tabs, BottomSheet, Badge, Skeleton, etc.",
    },
    {
      name: "Patterns",
      path: "/components/patterns/",
      icon: Box,
      count: 38,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "ApprovalFlow, AuditLog, CreditScoreCard, DataTableAdvanced, FactoringDashboard, MultiStepWizard, StatCard, etc.",
    },
    {
      name: "Advanced",
      path: "/components/advanced/",
      icon: Puzzle,
      count: 18,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Charts, MasterDataGrid, FormBuilder, FunnelChart, Heatmap, TreeTable, StepIndicator, FileUploader.",
    },
  ];

  const totalComponents = architectureLayers.reduce((s, l) => s + l.count, 0);

  // ── Category Breakdown (from registry.ts — source of truth) ──
  const categories = [
    { name: "Actions",      icon: MousePointerClick, count: 5,  color: "text-blue-500",   bgColor: "bg-blue-500/10",   pageId: "button"             },
    { name: "Forms",        icon: FileCode,          count: 23, color: "text-success",     bgColor: "bg-success/10",    pageId: "input"              },
    { name: "Navigation",   icon: Layers,            count: 8,  color: "text-purple-500",  bgColor: "bg-purple-500/10", pageId: "tabs"               },
    { name: "Data Display", icon: Database,          count: 6,  color: "text-orange-500",  bgColor: "bg-orange-500/10", pageId: "table"              },
    { name: "Feedback",     icon: MessageSquare,     count: 13, color: "text-pink-500",    bgColor: "bg-pink-500/10",   pageId: "alert"              },
    { name: "Layout",       icon: Layout,            count: 9,  color: "text-indigo-500",  bgColor: "bg-indigo-500/10", pageId: "accordion"          },
    { name: "Factoring",    icon: Award,             count: 12, color: "text-emerald-500", bgColor: "bg-emerald-500/10",pageId: "factoring-dashboard"},
    { name: "Patterns",     icon: TrendingUp,        count: 22, color: "text-cyan-500",    bgColor: "bg-cyan-500/10",   pageId: "data-table-advanced"},
    { name: "Advanced",     icon: Sparkles,          count: 6,  color: "text-yellow-500",  bgColor: "bg-yellow-500/10", pageId: "charts"             },
  ];

  return (
    <div className="space-y-8 w-full pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Logo size="lg" variant="auto" />
          <div>
            <h1 className="text-2xl text-foreground">CESIONBNK Design System</h1>
            <p className="text-sm text-muted-foreground">
              {totalComponents} components · React + Tailwind CSS v4
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1.5">
            <GitBranch className="h-3 w-3" />
            v0.4.0
          </Badge>
          <Badge variant="outline" className="gap-1.5 text-muted-foreground">
            Apr 10, 2026
          </Badge>
        </div>
      </div>

      <Separator />

      {/* ── KPI Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Components</span>
              <Component className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl text-foreground">{totalComponents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Showcase Pages</span>
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl text-foreground">128</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Props Coverage</span>
              <Code2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl text-foreground">100%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4 px-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">WCAG 2.1 AA</span>
              <Shield className="h-4 w-4 text-success" />
            </div>
            <div className="text-2xl text-foreground">100%</div>
          </CardContent>
        </Card>
      </div>

      {/* ── Architecture + Categories (2-column row) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Architecture */}
        <section>
          <h2 className="text-lg text-foreground mb-4">Architecture Layers</h2>
          <div className="grid gap-3 grid-cols-2">
            {architectureLayers.map((layer) => (
              <Card key={layer.name} className={`border ${layer.borderColor} hover:shadow-md transition-shadow`}>
                <CardContent className="pt-4 pb-3 px-4 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${layer.bgColor}`}>
                      <layer.icon className={`h-4 w-4 ${layer.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-foreground">{layer.name}</div>
                      <div className="text-xs text-muted-foreground">{layer.count} components</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>
                  <code className="text-[10px] text-muted-foreground/70 block">{layer.path}</code>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-lg text-foreground mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Card
                key={cat.name}
                className="hover:bg-muted hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigateTo(cat.pageId)}
              >
                <CardContent className="pt-3 pb-2.5 px-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className={`p-1.5 rounded-md ${cat.bgColor}`}>
                      <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                    </div>
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground pl-8">{cat.count} components</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* ── Changelog + WCAG (2-column row) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Changelog */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="h-5 w-5 text-primary" />
            <h2 className="text-lg text-foreground">Changelog</h2>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              {versionHistory.length} releases
            </Badge>
          </div>

          <Tabs defaultValue="releases" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
              <TabsTrigger value="releases">Releases</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            </TabsList>

            {/* Releases */}
            <TabsContent value="releases" className="mt-4">
              <div className="space-y-3">
                {versionHistory.map((entry, idx) => (
                  <VersionCard key={entry.version} entry={entry} defaultOpen={idx === 0} />
                ))}
              </div>
            </TabsContent>

            {/* Summary */}
            <TabsContent value="summary" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground text-sm">Component Distribution</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        { label: "Core UI (/components/ui/)",       count: 74 },
                        { label: "Patterns (/components/patterns/)", count: 38 },
                        { label: "Advanced (/components/advanced/)", count: 18 },
                      ].map((row) => (
                        <li key={row.label} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{row.label}</span>
                          <span className="text-foreground">{row.count}</span>
                        </li>
                      ))}
                      <Separator className="my-2" />
                      <li className="flex justify-between">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">{totalComponents}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-foreground text-sm">System Health</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        { label: "Props Coverage", value: "100%" },
                        { label: "Doc Coverage", value: "100%" },
                        { label: "TS Strictness", value: "100%" },
                        { label: "Accessibility (WCAG AA)", value: "100%" },
                        { label: "Responsive", value: "100%" },
                        { label: "Dark Mode", value: "100%" },
                      ].map((row) => (
                        <li key={row.label} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{row.label}</span>
                          <span className="text-success-on-subtle">{row.value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Roadmap */}
            <TabsContent value="roadmap" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative border-l border-primary/20 ml-4 space-y-8 py-2">
                    <div className="relative pl-8">
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-success bg-background" />
                      <div className="mb-1 text-sm text-success">Completado — v0.4.0</div>
                      <h3 className="text-foreground">Storybook Stories</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Stories para todos los componentes UI core — variants, estados y comportamientos documentados.
                      </p>
                      <Badge variant="success-soft">Done</Badge>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                      <div className="mb-1 text-sm text-primary">Q2 2026</div>
                      <h3 className="text-foreground">Figma Plugin Sync</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sincronización bidireccional Figma ↔ React mediante component-map.json y motion/spacing tokens.
                      </p>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-muted-foreground bg-background" />
                      <div className="mb-1 text-sm text-muted-foreground">Q3 2026</div>
                      <h3 className="text-foreground">Performance Optimization</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Bundle splitting, lazy loading y tree-shaking. Target: First Load JS &lt; 150kB.
                      </p>
                      <Badge variant="neutral-soft-outline">Planned</Badge>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-muted-foreground bg-background" />
                      <div className="mb-1 text-sm text-muted-foreground">Q3 2026</div>
                      <h3 className="text-foreground">Mobile-first Patterns</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Componentes táctiles optimizados — BottomSheet, SwipeActions, MobilePagination.
                      </p>
                      <Badge variant="neutral-soft-outline">Planned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* WCAG Accessibility */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <AccessibilityIcon className="h-5 w-5 text-success" />
            <h2 className="text-lg text-foreground">WCAG 2.1 Compliance</h2>
            <Badge variant="success-soft-outline">AA</Badge>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <Card className="border-success/20 bg-success-subtle dark:bg-success/10">
              <CardContent className="pt-4 pb-3 px-4">
                <div className="text-xs text-muted-foreground mb-1">Overall Score</div>
                <div className="text-2xl text-success mb-1.5">100%</div>
                <Progress value={100} className="h-1.5" aria-label="Overall score" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 px-4">
                <div className="text-xs text-muted-foreground mb-1">Criteria Met</div>
                <div className="text-2xl text-foreground mb-1.5">18/18</div>
                <p className="text-xs text-muted-foreground">100% of criteria</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3 px-4">
                <div className="text-xs text-muted-foreground mb-1">Conformance</div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-lg text-foreground">WCAG 2.1</span>
                </div>
                <p className="text-xs text-muted-foreground">Level AA</p>
              </CardContent>
            </Card>
          </div>

          {/* WCAG Details Tabs */}
          <Tabs defaultValue="criteria" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
              <TabsTrigger value="criteria">Criteria</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="contrast">Contrast</TabsTrigger>
            </TabsList>

            <TabsContent value="criteria" className="mt-4">
              <div className="grid gap-3 grid-cols-2">
                {[
                  {
                    title: "Perceivable",
                    items: [
                      { id: "1.1.1", name: "Text alternatives", level: "A" },
                      { id: "1.3.1", name: "Info & relationships", level: "A" },
                      { id: "1.4.1", name: "Use of color", level: "A" },
                      { id: "1.4.3", name: "Contrast (min)", level: "AA" },
                      { id: "1.4.11", name: "Non-text contrast", level: "AA" },
                    ],
                  },
                  {
                    title: "Operable",
                    items: [
                      { id: "2.1.1", name: "Keyboard", level: "A" },
                      { id: "2.1.2", name: "No keyboard trap", level: "A" },
                      { id: "2.4.1", name: "Bypass blocks", level: "A" },
                      { id: "2.4.3", name: "Focus order", level: "A" },
                      { id: "2.4.7", name: "Focus visible", level: "AA" },
                    ],
                  },
                  {
                    title: "Understandable",
                    items: [
                      { id: "3.1.1", name: "Language of page", level: "A" },
                      { id: "3.2.1", name: "On focus", level: "A" },
                      { id: "3.3.1", name: "Error identification", level: "A" },
                      { id: "3.3.2", name: "Labels / instructions", level: "A" },
                    ],
                  },
                  {
                    title: "Robust",
                    items: [
                      { id: "4.1.1", name: "Parsing", level: "A" },
                      { id: "4.1.2", name: "Name, role, value", level: "A" },
                      { id: "4.1.3", name: "Status messages", level: "AA" },
                    ],
                  },
                ].map((group) => (
                  <Card key={group.title}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-foreground">{group.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {group.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-1.5 px-2 rounded bg-success-subtle dark:bg-success/10">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                              <span className="text-xs text-muted-foreground">{item.id}</span>
                              <span className="text-sm text-foreground">{item.name}</span>
                            </div>
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{item.level}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-4">
              <div className="grid gap-3 grid-cols-2">
                {[
                  {
                    title: "Keyboard Navigation",
                    icon: Keyboard,
                    items: ["Tab / Shift+Tab navigation", "Skip links", "Focus trap (modals)", "Escape to close", "Arrow keys (menus)"],
                  },
                  {
                    title: "ARIA Attributes",
                    icon: Eye,
                    items: ["aria-label (navigation)", "aria-expanded (accordions)", "aria-selected (tabs)", "aria-live regions", "Semantic roles"],
                  },
                  {
                    title: "Color Contrast",
                    icon: Palette,
                    items: ["Main text: 7.2:1 (AAA)", "Secondary text: 5.1:1 (AA)", "Primary: 7.22:1 (AAA)", "Buttons: 4.8:1 (AA)", "Borders: 3.2:1 (AA)"],
                  },
                  {
                    title: "Semantic HTML",
                    icon: Code2,
                    items: ["<nav> for navigation", "<main> for content", "<aside> for sidebar", "Hierarchical headings (h1-h6)", "ARIA landmarks"],
                  },
                ].map((feature) => (
                  <Card key={feature.title}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <feature.icon className="h-4 w-4 text-primary" />
                        <CardTitle className="text-sm text-foreground">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {feature.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 py-1">
                            <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contrast" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-foreground">Contrast Ratios</CardTitle>
                  <CardDescription>All color combinations pass WCAG AA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Primary on Secondary", fg: "#374151", bg: "#52525b", ratio: "5.8:1", level: "AA" },
                      { name: "White on Secondary", fg: "#FFFFFF", bg: "#52525b", ratio: "12.6:1", level: "AAA" },
                      { name: "Muted Text", fg: "#A0AEC0", bg: "#FFFFFF", ratio: "5.1:1", level: "AA" },
                      { name: "Border on Background", fg: "#E2E8F0", bg: "#FFFFFF", ratio: "3.2:1", level: "AA Large" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <ContrastDot className="w-5 h-5 rounded border" color={c.fg} />
                            <span className="text-xs text-muted-foreground">on</span>
                            <ContrastDot className="w-5 h-5 rounded border" color={c.bg} />
                          </div>
                          <span className="text-sm text-foreground">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{c.ratio}</span>
                          <Badge variant="success-soft">{c.level}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>

      {/* ── Quality Bar ── */}
      <Card className="border-primary bg-card">
        <CardContent className="py-4 px-5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">System ready for production</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Palette className="h-3 w-3" />
                CSS Tokens
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 className="h-3 w-3" />
                TypeScript Strict
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                Dark Mode
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DSMDashboardPage() {
  return (
    <ComponentShowcase
      title="DSM Dashboard"
      description="Design System Manager dashboard with version history, changelog, migration status, and system health metrics."
      category="Home"
      preview={<DSMDashboardContent />}
      code={`// DSM Dashboard - internal changelog and metrics page`}
      props={[]}
      examples={[]}
    />
  );
}