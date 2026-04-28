import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import {
  PageLayout,
  SplitLayout,
  StackLayout,
  SectionLayout,
} from "../components/ui/PageLayout";
import { GridShowcase } from "../components/ui/GridShowcase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Separator } from "../components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Settings,
  Filter,
  BarChart3,
  ArrowUpRight,
  Activity,
} from "lucide-react";

/* ── Helpers for demos ── */

function DemoBox({
  label,
  className,
  h = "h-24",
}: {
  label: string;
  className?: string;
  h?: string;
}) {
  return (
    <div
      className={`${h} rounded-lg border-2 border-dashed border-primary bg-card flex items-center justify-center text-sm text-muted-foreground ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

function MiniKpiCard({
  title,
  value,
  change,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          <span className="text-primary">{change}</span> vs previous month
        </p>
      </CardContent>
    </Card>
  );
}

function MiniFilterPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Filter className="size-4" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Status</label>
          <Select defaultValue="all">
            <SelectTrigger className="mt-1 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pendiente">Pending</SelectItem>
              <SelectItem value="aprobada">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Date from</label>
          <Input type="date" className="mt-1 h-8" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Date to</label>
          <Input type="date" className="mt-1 h-8" />
        </div>
        <Separator />
        <Button variant="outline" size="sm" className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}

function MiniTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Recent Operations</CardTitle>
        <CardDescription>Last 5 financial operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[
            { id: "OP-4635", client: "Grupo Aval", amount: "$125M", status: "Approved" },
            { id: "OP-4636", client: "Ecopetrol", amount: "$89M", status: "Pending" },
            { id: "OP-4637", client: "Bancolombia", amount: "$210M", status: "Disbursed" },
            { id: "OP-4638", client: "ISA Group", amount: "$67M", status: "Pending" },
            { id: "OP-4639", client: "Nutresa", amount: "$145M", status: "Approved" },
          ].map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground tabular-nums">{row.id}</span>
                <span className="text-sm">{row.client}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums font-medium">{row.amount}</span>
                <Badge
                  variant={
                    row.status === "Approved"
                      ? "success-soft-outline"
                      : row.status === "Pending"
                        ? "warning-soft-outline"
                        : "info-soft-outline"
                  }
                  className="text-[11px]"
                >
                  {row.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MiniSettingsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="size-5" />
          Operation Settings
        </CardTitle>
        <CardDescription>
          General parameters for new operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Base rate (%)</label>
            <Input defaultValue="12.5" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Spread (%)</label>
            <Input defaultValue="2.3" className="mt-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Max term (days)</label>
          <Input defaultValue="180" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Max amount ($M)</label>
          <Input defaultValue="500" className="mt-1" />
        </div>
        <Separator />
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════ */

const code = `import {
  PageLayout,
  SplitLayout,
  StackLayout,
  SectionLayout,
} from "@/components/ui/PageLayout";
import { GridShowcase } from "@/components/ui/GridShowcase";

// Dashboard: constrained + KPIs + split (table + sidebar)
<PageLayout variant="constrained">
  <StackLayout gap="relaxed">
    <SectionLayout title="Summary" description="Period KPIs">
      <GridShowcase columns={4} gap="sm">
        <KpiCard />
        <KpiCard />
        <KpiCard />
        <KpiCard />
      </GridShowcase>
    </SectionLayout>

    <SplitLayout ratio="sidebar-right" stickyPanel="right">
      <TableComponent />
      <FilterPanel />
    </SplitLayout>
  </StackLayout>
</PageLayout>

// Settings: narrow + stacked sections with dividers
<PageLayout variant="narrow">
  <StackLayout gap="relaxed" dividers>
    <SectionLayout title="General">...</SectionLayout>
    <SectionLayout title="Notifications">...</SectionLayout>
    <SectionLayout title="Security">...</SectionLayout>
  </StackLayout>
</PageLayout>`;

export function LayoutShowcasePage() {
  const [activeVariant, setActiveVariant] = useState<string>("constrained");

  return (
    <ComponentShowcase
      title="Page Layout"
      description="Layout Primitives system that constrains content width, organizes panels and sections. Solves the problem of content spanning the full screen without control. Composable with GridShowcase."
      category="Layout"
      atomicLevel="Pattern"
      preview={
        <div className="w-full space-y-4">
          {/* Interactive demo: width variants */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Variant:</span>
            {(["full", "constrained", "narrow", "prose"] as const).map((v) => (
              <Button
                key={v}
                variant={activeVariant === v ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setActiveVariant(v)}
              >
                {v}
              </Button>
            ))}
          </div>

          <div className="border rounded-lg bg-card p-4 overflow-hidden">
            <PageLayout variant={activeVariant as any}>
              <div className="rounded-lg border-2 border-dashed border-primary bg-card p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Content with <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">variant=&quot;{activeVariant}&quot;</code>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeVariant === "full" && "No restriction — takes 100% width"}
                  {activeVariant === "constrained" && "max-w-7xl (1280px) — ideal for dashboards"}
                  {activeVariant === "narrow" && "max-w-3xl (768px) — ideal for forms"}
                  {activeVariant === "prose" && "max-w-prose (65ch) — ideal for text"}
                </p>
              </div>
            </PageLayout>
          </div>
        </div>
      }
      code={code}
      props={[
        { name: "variant", type: '"full" | "constrained" | "narrow" | "prose"', default: '"constrained"', description: "Maximum width constraint for content" },
        { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"none"', description: "Horizontal padding" },
        { name: "centered", type: "boolean", default: "true", description: "Center content horizontally" },
        { name: "ratio", type: '"equal" | "sidebar-left" | "sidebar-right" | "aside-left" | "aside-right"', description: "SplitLayout ratio between panels" },
        { name: "gap", type: '"sm" | "md" | "lg" (Split) / "compact" | "default" | "relaxed" | "spacious" (Stack)', description: "Spacing between elements" },
        { name: "stickyPanel", type: '"left" | "right" | "none"', default: '"none"', description: "Panel that stays fixed on scroll (SplitLayout)" },
        { name: "dividers", type: "boolean", default: "false", description: "Add separators between sections (StackLayout)" },
        { name: "title", type: "string", description: "Section title (SectionLayout)" },
        { name: "description", type: "string", description: "Section description (SectionLayout)" },
        { name: "action", type: "ReactNode", description: "Action slot to the right of the title (SectionLayout)" },
      ]}
      examples={[
        {
          title: "Dashboard Pattern — constrained + KPIs + Split",
          description:
            "Most common pattern in CESIONBNK: KPIs in grid above, main table + filter panel below. Content constrained to max-w-7xl.",
          preview: (
            <div className="w-full">
              <PageLayout variant="constrained">
                <StackLayout gap="relaxed">
                  <SectionLayout
                    title="Financial Dashboard"
                    description="Current period summary"
                    action={
                      <Button variant="outline" size="sm" className="gap-1">
                        <BarChart3 className="size-3.5 .5" />
                        Export
                      </Button>
                    }
                  >
                    <GridShowcase columns={4} gap="sm">
                      <MiniKpiCard title="Operations" value="142" change="+12%" icon={FileText} />
                      <MiniKpiCard title="Disbursements" value="$8.2B" change="+8.5%" icon={DollarSign} />
                      <MiniKpiCard title="Clients" value="38" change="+3" icon={Users} />
                      <MiniKpiCard title="Average Rate" value="14.2%" change="-0.3%" icon={TrendingUp} />
                    </GridShowcase>
                  </SectionLayout>

                  <SplitLayout ratio="sidebar-right" stickyPanel="right" gap="md">
                    <MiniTable />
                    <MiniFilterPanel />
                  </SplitLayout>
                </StackLayout>
              </PageLayout>
            </div>
          ),
          code: `<PageLayout variant="constrained">
  <StackLayout gap="relaxed">
    <SectionLayout title="Dashboard" description="Summary" action={<Button>Export</Button>}>
      <GridShowcase columns={4} gap="sm">
        <KpiCard /><KpiCard /><KpiCard /><KpiCard />
      </GridShowcase>
    </SectionLayout>

    <SplitLayout ratio="sidebar-right" stickyPanel="right">
      <OperationsTable />
      <FilterPanel />
    </SplitLayout>
  </StackLayout>
</PageLayout>`,
        },
        {
          title: "Settings Pattern — narrow + stacked sections + dividers",
          description:
            "For settings and forms. Width constrained to max-w-3xl with divided sections. Content never stretches on wide screens.",
          preview: (
            <div className="w-full bg-card rounded-lg p-6">
              <PageLayout variant="narrow">
                <StackLayout gap="relaxed" dividers>
                  <SectionLayout title="Operation Parameters" description="Basic settings for new operations">
                    <MiniSettingsForm />
                  </SectionLayout>

                  <SectionLayout
                    title="Notifications"
                    description="How to receive system alerts"
                    action={<Badge variant="info-soft-outline">3 active</Badge>}
                  >
                    <Card>
                      <CardContent className="pt-6 space-y-3">
                        {["Email on operation creation", "Push on approval", "SMS on disbursement"].map(
                          (item) => (
                            <div key={item} className="flex items-center justify-between py-2">
                              <span className="text-sm">{item}</span>
                              <Badge variant="success-soft-outline" className="text-[11px]">
                                Active
                              </Badge>
                            </div>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </SectionLayout>

                  <SectionLayout title="Danger Zone" description="Irreversible actions">
                    <Card className="border-destructive/30">
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Delete configuration</p>
                          <p className="text-xs text-muted-foreground">
                            This action cannot be undone
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </SectionLayout>
                </StackLayout>
              </PageLayout>
            </div>
          ),
          code: `<PageLayout variant="narrow">
  <StackLayout gap="relaxed" dividers>
    <SectionLayout title="Parameters" description="Basic config">
      <SettingsForm />
    </SectionLayout>
    <SectionLayout title="Notifications" action={<Badge variant="neutral">3 active</Badge>}>
      <NotificationList />
    </SectionLayout>
    <SectionLayout title="Danger Zone">
      <DangerZone />
    </SectionLayout>
  </StackLayout>
</PageLayout>`,
        },
        {
          title: "SplitLayout — All Ratios",
          description:
            "5 available ratios for organizing two panels. All collapse to 1 column on mobile.",
          preview: (
            <div className="w-full space-y-6">
              {(
                [
                  ["equal", "50% / 50%"],
                  ["sidebar-left", "33% / 67%"],
                  ["sidebar-right", "67% / 33%"],
                  ["aside-left", "~25% / ~75%"],
                  ["aside-right", "~75% / ~25%"],
                ] as const
              ).map(([ratio, desc]) => (
                <div key={ratio} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                      {ratio}
                    </code>
                    <span className="text-xs text-muted-foreground">{desc}</span>
                  </div>
                  <SplitLayout ratio={ratio as any} gap="sm">
                    <DemoBox label="Panel A" h="h-16" />
                    <DemoBox label="Panel B" h="h-16" />
                  </SplitLayout>
                </div>
              ))}
            </div>
          ),
          code: `<SplitLayout ratio="equal">
  <PanelA />
  <PanelB />
</SplitLayout>

<SplitLayout ratio="sidebar-right" stickyPanel="right">
  <MainContent />
  <Sidebar />
</SplitLayout>

<SplitLayout ratio="aside-left">
  <NavigationMenu />
  <Content />
</SplitLayout>`,
        },
        {
          title: "StackLayout — Gaps & Dividers",
          description:
            "4 spacing levels and divider option. Ideal for sequential content pages.",
          preview: (
            <div className="w-full">
              <Tabs defaultValue="gaps">
                <TabsList className="grid w-full grid-cols-2 max-w-lg">
                  <TabsTrigger value="gaps">Gaps</TabsTrigger>
                  <TabsTrigger value="dividers">With Dividers</TabsTrigger>
                </TabsList>

                <TabsContent value="gaps" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(["compact", "default", "relaxed", "spacious"] as const).map((gap) => (
                      <div key={gap} className="space-y-2">
                        <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{gap}</code>
                        <div className="border rounded-lg p-3">
                          <StackLayout gap={gap}>
                            <DemoBox label="Section 1" h="h-10" />
                            <DemoBox label="Section 2" h="h-10" />
                            <DemoBox label="Section 3" h="h-10" />
                          </StackLayout>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="dividers" className="mt-4">
                  <PageLayout variant="narrow">
                    <StackLayout gap="relaxed" dividers>
                      <SectionLayout title="Section A" description="First section with bottom separator">
                        <DemoBox label="Content A" h="h-16" />
                      </SectionLayout>
                      <SectionLayout title="Section B" description="Second section visually separated">
                        <DemoBox label="Content B" h="h-16" />
                      </SectionLayout>
                      <SectionLayout title="Section C" description="Third section with divider">
                        <DemoBox label="Content C" h="h-16" />
                      </SectionLayout>
                    </StackLayout>
                  </PageLayout>
                </TabsContent>
              </Tabs>
            </div>
          ),
          code: `// Without dividers
<StackLayout gap="relaxed">
  <Section />
  <Section />
</StackLayout>

// With dividers
<StackLayout gap="relaxed" dividers>
  <SectionLayout title="A">...</SectionLayout>
  <SectionLayout title="B">...</SectionLayout>
</StackLayout>`,
        },
        {
          title: "Real Composition — Operation Detail",
          description:
            "Real example: operation detail page using PageLayout + SplitLayout + StackLayout + SectionLayout + GridShowcase together.",
          preview: (
            <div className="w-full bg-card rounded-lg p-4">
              <PageLayout variant="constrained">
                <StackLayout gap="relaxed">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-semibold">OP-4635</h2>
                        <Badge variant="success-soft-outline">Approved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Grupo Aval S.A. — NIT 860.002.964-4
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">History</Button>
                      <Button size="sm">Disburse</Button>
                    </div>
                  </div>

                  {/* KPIs */}
                  <GridShowcase columns={4} gap="sm">
                    <MiniKpiCard title="Invoices" value="12" change="+3" icon={FileText} />
                    <MiniKpiCard title="Total Value" value="$125M" change="+15%" icon={DollarSign} />
                    <MiniKpiCard title="Disbursement" value="$118M" change="95%" icon={ArrowUpRight} />
                    <MiniKpiCard title="Avg Days" value="45" change="-5d" icon={Activity} />
                  </GridShowcase>

                  {/* Split: main + aside */}
                  <SplitLayout ratio="sidebar-right" gap="md">
                    <StackLayout gap="default">
                      <SectionLayout title="Invoices" action={<Badge variant="info-soft-outline">12 invoices</Badge>}>
                        <MiniTable />
                      </SectionLayout>
                    </StackLayout>

                    <StackLayout gap="default">
                      <SectionLayout title="Summary">
                        <Card>
                          <CardContent className="pt-6 space-y-3">
                            {[
                              ["Client", "Grupo Aval S.A."],
                              ["Payers", "3 payers"],
                              ["Date", "09/02/2026"],
                              ["Rate", "14.2%"],
                              ["Commission", "$1.2M"],
                            ].map(([label, value]) => (
                              <div key={label} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{label}</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </SectionLayout>

                      <SectionLayout title="Timeline">
                        <Card>
                          <CardContent className="pt-6 space-y-2">
                            {[
                              { step: "Created", time: "09:15", done: true },
                              { step: "Validated", time: "10:30", done: true },
                              { step: "Approved", time: "14:22", done: true },
                              { step: "Disbursement", time: "—", done: false },
                            ].map((s) => (
                              <div key={s.step} className="flex items-center gap-3">
                                <div
                                  className={`size-2 rounded-full ${s.done ? "bg-primary" : "bg-muted-foreground/30"}`}
                                />
                                <span className={`text-sm ${s.done ? "" : "text-muted-foreground"}`}>
                                  {s.step}
                                </span>
                                <span className="text-xs text-muted-foreground ml-auto tabular-nums">
                                  {s.time}
                                </span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </SectionLayout>
                    </StackLayout>
                  </SplitLayout>
                </StackLayout>
              </PageLayout>
            </div>
          ),
          code: `<PageLayout variant="constrained">
  <StackLayout gap="relaxed">
    <OperationHeader />

    <GridShowcase columns={4} gap="sm">
      <KpiCard /><KpiCard /><KpiCard /><KpiCard />
    </GridShowcase>

    <SplitLayout ratio="sidebar-right">
      <SectionLayout title="Invoices">
        <InvoiceTable />
      </SectionLayout>

      <StackLayout gap="default">
        <SectionLayout title="Summary">
          <SummaryCard />
        </SectionLayout>
        <SectionLayout title="Timeline">
          <TimelineCard />
        </SectionLayout>
      </StackLayout>
    </SplitLayout>
  </StackLayout>
</PageLayout>`,
        },
      ]}
    />
  );
}