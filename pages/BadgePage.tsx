import { ComponentShowcase } from "../components/ui/component-showcase";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Check, X, AlertCircle, Clock, Star, Zap,
  TrendingUp, ShoppingCart, Info, Shield,
  CircleDot, ArrowUpRight, FileCheck, Ban,
} from "lucide-react";

export function BadgePage() {
  return (
    <ComponentShowcase
      title="Badge"
      description="Displays a badge or a component that looks like a badge. Includes base and semantic variants in 3 intensity levels: Solid, Outline, and Soft."
      category="Data Display"
      atomicLevel="Atom"

      // Main Preview
      preview={
        <div className="flex flex-col gap-6">
          {/* ── Base ── */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Base Variants</p>
            <div className="flex flex-wrap gap-3">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>

          <Separator />

          {/* ── Semantic Solid ── */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Semantic — Solid</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
              <Badge variant="destructive">
                <X className="h-3 w-3" />
                Rejected
              </Badge>
              <Badge variant="warning">
                <AlertCircle className="h-3 w-3" />
                Pending
              </Badge>
              <Badge variant="info">
                <Info className="h-3 w-3" />
                In Review
              </Badge>
            </div>
          </div>

          <Separator />

          {/* ── Semantic Outline ── */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Semantic — Outline</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success-outline">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
              <Badge variant="destructive-outline">
                <X className="h-3 w-3" />
                Rejected
              </Badge>
              <Badge variant="warning-outline">
                <Clock className="h-3 w-3" />
                Pending
              </Badge>
              <Badge variant="info-outline">
                <Info className="h-3 w-3" />
                In Review
              </Badge>
            </div>
          </div>

          <Separator />

          {/* ── Semantic Soft ── */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Semantic — Soft</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success-soft">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
              <Badge variant="destructive-soft">
                <X className="h-3 w-3" />
                Rejected
              </Badge>
              <Badge variant="warning-soft">
                <AlertCircle className="h-3 w-3" />
                Pending
              </Badge>
              <Badge variant="info-soft">
                <Info className="h-3 w-3" />
                In Review
              </Badge>
            </div>
          </div>

          <Separator />

          {/* ── Semantic Soft-Outline ── */}
          <div>
            <p className="text-xs text-muted-foreground mb-3">Semantic — Soft Outline</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success-soft-outline">
                <Check className="h-3 w-3" />
                Approved
              </Badge>
              <Badge variant="destructive-soft-outline">
                <X className="h-3 w-3" />
                Rejected
              </Badge>
              <Badge variant="warning-soft-outline">
                <AlertCircle className="h-3 w-3" />
                Pending
              </Badge>
              <Badge variant="info-soft-outline">
                <Info className="h-3 w-3" />
                In Review
              </Badge>
            </div>
          </div>
        </div>
      }

      // Main Code
      code={`import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Info } from "lucide-react";

export function BadgeSemanticDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* Solid */}
      <div className="flex gap-3">
        <Badge variant="success"><Check /> Approved</Badge>
        <Badge variant="destructive"><X /> Rejected</Badge>
        <Badge variant="warning"><AlertCircle /> Pending</Badge>
        <Badge variant="info"><Info /> In Review</Badge>
      </div>
      {/* Outline */}
      <div className="flex gap-3">
        <Badge variant="success-outline">Approved</Badge>
        <Badge variant="destructive-outline">Rejected</Badge>
        <Badge variant="warning-outline">Pending</Badge>
        <Badge variant="info-outline">In Review</Badge>
      </div>
      {/* Soft */}
      <div className="flex gap-3">
        <Badge variant="success-soft">Approved</Badge>
        <Badge variant="destructive-soft">Rejected</Badge>
        <Badge variant="warning-soft">Pending</Badge>
        <Badge variant="info-soft">In Review</Badge>
      </div>
    </div>
  );
}`}

      // Props Documentation
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "outline" | "neutral" | "destructive" | "success" | "warning" | "info" | "destructive-outline" | "success-outline" | "warning-outline" | "info-outline" | "destructive-soft" | "success-soft" | "warning-soft" | "info-soft" | "success-soft-outline" | "destructive-soft-outline" | "warning-soft-outline" | "info-soft-outline"',
          default: '"default"',
          description: "Visual style of the badge. Solid = solid background + white text. Outline = colored border + colored text. Soft = muted background + colored text.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the badge",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Badge content (text, icons, etc.)",
          required: true,
        },
      ]}

      // Examples
      examples={[
        {
          title: "Operation Status (Cessiones)",
          description: "Semantic badges applied to the cessiones operations flow.",
          preview: (
            <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <span className="text-sm">OP-2024-001 — Cencosud S.A.</span>
                <Badge variant="success">
                  <FileCheck className="h-3 w-3" />
                  Approved
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OP-2024-002 — Falabella Retail</span>
                <Badge variant="warning-soft">
                  <Clock className="h-3 w-3" />
                  Under Review
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OP-2024-003 — SMU Corp.</span>
                <Badge variant="destructive-outline">
                  <Ban className="h-3 w-3" />
                  Rejected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">OP-2024-004 — Ripley S.A.</span>
                <Badge variant="info-soft">
                  <ArrowUpRight className="h-3 w-3" />
                  In Assignment
                </Badge>
              </div>
            </div>
          ),
          code: `<Badge variant="success"><FileCheck /> Approved</Badge>
<Badge variant="warning-soft"><Clock /> Under Review</Badge>
<Badge variant="destructive-outline"><Ban /> Rejected</Badge>
<Badge variant="info-soft"><ArrowUpRight /> In Assignment</Badge>`,
        },
        {
          title: "Intensity Comparison",
          description: "Each semantic color in its 4 visual intensity levels: Solid, Outline, Soft, and Soft Outline.",
          preview: (
            <div className="space-y-4">
              {/* Success row */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-20">Success</span>
                <Badge variant="success">Solid</Badge>
                <Badge variant="success-outline">Outline</Badge>
                <Badge variant="success-soft">Soft</Badge>
                <Badge variant="success-soft-outline">Soft Outline</Badge>
              </div>
              {/* Destructive row */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-20">Destructive</span>
                <Badge variant="destructive">Solid</Badge>
                <Badge variant="destructive-outline">Outline</Badge>
                <Badge variant="destructive-soft">Soft</Badge>
                <Badge variant="destructive-soft-outline">Soft Outline</Badge>
              </div>
              {/* Warning row */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-20">Warning</span>
                <Badge variant="warning">Solid</Badge>
                <Badge variant="warning-outline">Outline</Badge>
                <Badge variant="warning-soft">Soft</Badge>
                <Badge variant="warning-soft-outline">Soft Outline</Badge>
              </div>
              {/* Info row */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-20">Info</span>
                <Badge variant="info">Solid</Badge>
                <Badge variant="info-outline">Outline</Badge>
                <Badge variant="info-soft">Soft</Badge>
                <Badge variant="info-soft-outline">Soft Outline</Badge>
              </div>
            </div>
          ),
          code: `{/* Each color × 4 intensities */}
<Badge variant="success">Solid</Badge>
<Badge variant="success-outline">Outline</Badge>
<Badge variant="success-soft">Soft</Badge>
<Badge variant="success-soft-outline">Soft Outline</Badge>

<Badge variant="destructive">Solid</Badge>
<Badge variant="destructive-outline">Outline</Badge>
<Badge variant="destructive-soft">Soft</Badge>
<Badge variant="destructive-soft-outline">Soft Outline</Badge>

<Badge variant="warning">Solid</Badge>
<Badge variant="warning-outline">Outline</Badge>
<Badge variant="warning-soft">Soft</Badge>
<Badge variant="warning-soft-outline">Soft Outline</Badge>

<Badge variant="info">Solid</Badge>
<Badge variant="info-outline">Outline</Badge>
<Badge variant="info-soft">Soft</Badge>
<Badge variant="info-soft-outline">Soft Outline</Badge>`,
        },
        {
          title: "With Icons",
          description: "Badges with Lucide React icons for greater visual context.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">
                <Check className="h-3 w-3" />
                Completed
              </Badge>
              <Badge variant="destructive">
                <X className="h-3 w-3" />
                Error
              </Badge>
              <Badge variant="warning">
                <AlertCircle className="h-3 w-3" />
                Warning
              </Badge>
              <Badge variant="info">
                <Info className="h-3 w-3" />
                Information
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3" />
                Pending
              </Badge>
              <Badge variant="neutral">
                <Shield className="h-3 w-3" />
                Archived
              </Badge>
            </div>
          ),
          code: `<Badge variant="success"><Check /> Completed</Badge>
<Badge variant="destructive"><X /> Error</Badge>
<Badge variant="warning"><AlertCircle /> Warning</Badge>
<Badge variant="info"><Info /> Information</Badge>
<Badge variant="outline"><Clock /> Pending</Badge>
<Badge variant="neutral"><Shield /> Archived</Badge>`,
        },
        {
          title: "Status Indicators",
          description: "Badges to show statuses with animated indicator dot.",
          preview: (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm w-20">Online:</span>
                <Badge variant="success-soft" className="gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm w-20">Warning:</span>
                <Badge variant="warning-soft" className="gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                  Degraded
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm w-20">Offline:</span>
                <Badge variant="destructive-soft" className="gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                  Down
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm w-20">Maint.:</span>
                <Badge variant="info-soft" className="gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  Maintenance
                </Badge>
              </div>
            </div>
          ),
          code: `<Badge variant="success-soft" className="gap-1.5">
  <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
  Active
</Badge>
<Badge variant="warning-soft" className="gap-1.5">
  <span className="h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-400" />
  Degraded
</Badge>`,
        },
        {
          title: "Notification Badges",
          description: "Badges to show notification counters.",
          preview: (
            <div className="flex flex-wrap gap-6">
              <div className="relative inline-block">
                <ShoppingCart className="h-6 w-6" />
                <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </div>
              <div className="relative inline-block">
                <Star className="h-6 w-6" />
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  9
                </Badge>
              </div>
              <div className="relative inline-block">
                <Zap className="h-6 w-6" />
                <Badge variant="info" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  5
                </Badge>
              </div>
              <div className="relative inline-block">
                <TrendingUp className="h-6 w-6" />
                <Badge variant="success" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  <CircleDot className="h-3 w-3" />
                </Badge>
              </div>
            </div>
          ),
          code: `<div className="relative inline-block">
  <ShoppingCart className="h-6 w-6" />
  <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
    3
  </Badge>
</div>`,
        },
        {
          title: "Tag System",
          description: "Badges as removable tags using soft variant.",
          preview: (
            <div className="flex flex-wrap gap-2">
              <Badge variant="info-soft" className="gap-1.5 pr-1">
                React
                <button className="ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-500/30 p-0.5 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <Badge variant="success-soft" className="gap-1.5 pr-1">
                TypeScript
                <button className="ml-1 rounded-full hover:bg-green-200 dark:hover:bg-green-500/30 p-0.5 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <Badge variant="warning-soft" className="gap-1.5 pr-1">
                Tailwind
                <button className="ml-1 rounded-full hover:bg-amber-200 dark:hover:bg-amber-500/30 p-0.5 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
              <Badge variant="neutral" className="gap-1.5 pr-1">
                Radix
                <button className="ml-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 p-0.5 transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          ),
          code: `<Badge variant="info-soft" className="gap-1.5 pr-1">
  React
  <button className="rounded-full hover:bg-blue-200 dark:hover:bg-blue-500/30 p-0.5">
    <X className="h-3 w-3" />
  </button>
</Badge>`,
        },
      ]}
    />
  );
}