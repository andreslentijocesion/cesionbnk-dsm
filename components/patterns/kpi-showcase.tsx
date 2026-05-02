/**
 * KPIShowcase — Advanced KPI Dashboard
 * Self-contained with mock data. Uses Recharts for charts.
 * @layer patterns
 */
import { useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, DollarSign, FileText, Users, Clock } from "lucide-react";

const revenueData = [
  { month: "Aug", disbursed: 2100, invoices: 2800 },
  { month: "Sep", disbursed: 2450, invoices: 3100 },
  { month: "Oct", disbursed: 2200, invoices: 2900 },
  { month: "Nov", disbursed: 2700, invoices: 3400 },
  { month: "Dec", disbursed: 2350, invoices: 3000 },
  { month: "Jan", disbursed: 2900, invoices: 3600 },
  { month: "Feb", disbursed: 3100, invoices: 3850 },
];

const statusData = [
  { status: "Pending", count: 12 },
  { status: "Approved", count: 34 },
  { status: "Disbursed", count: 28 },
  { status: "Canceled", count: 6 },
];

const topMetrics = [
  {
    label: "Total Disbursed",
    value: "$3,100M",
    change: "+6.9%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-muted",
  },
  {
    label: "Active Invoices",
    value: "3,850",
    change: "+7.1%",
    trend: "up" as const,
    icon: FileText,
    color: "text-info",
    bg: "bg-muted",
  },
  {
    label: "Active Clients",
    value: "142",
    change: "+3.2%",
    trend: "up" as const,
    icon: Users,
    color: "text-secondary",
    bg: "bg-muted",
  },
  {
    label: "Avg. Processing",
    value: "1.4 days",
    change: "-12%",
    trend: "up" as const,
    icon: Clock,
    color: "text-warning",
    bg: "bg-muted",
  },
];

const recentOps = [
  { id: "OP-4635", client: "Industrias Haceb S.A.", amount: "$328M", status: "pending" },
  { id: "OP-4612", client: "Cementos Argos S.A.", amount: "$698M", status: "approved" },
  { id: "OP-4598", client: "Grupo Nutresa S.A.", amount: "$569M", status: "disbursed" },
  { id: "OP-4571", client: "Terpel S.A.", amount: "$214M", status: "disbursed" },
  { id: "OP-4560", client: "Corona S.A.", amount: "$445M", status: "canceled" },
];

const statusStyles: Record<string, string> = {
  pending:   "warning-soft-outline",
  approved:  "success-soft-outline",
  disbursed: "info-soft-outline",
  canceled:  "destructive-soft-outline",
};
const statusLabels: Record<string, string> = {
  pending: "Pending", approved: "Approved", disbursed: "Disbursed", canceled: "Canceled",
};

export function KPIShowcase() {
  const totalOps = useMemo(() => statusData.reduce((s, d) => s + d.count, 0), []);

  return (
    <div className="space-y-6">
      {/* ── Top Metrics ── */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {topMetrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-5 pb-5 px-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold">{m.value}</p>
                  <div className="flex items-center gap-1">
                    {m.trend === "up"
                      ? <TrendingUp className="size-3 text-primary" />
                      : <TrendingDown className="size-3 text-destructive" />}
                    <span className={`text-xs ${m.trend === "up" ? "text-primary" : "text-destructive"}`}>{m.change}</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`size-5 ${m.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Area Chart */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volume Trend (last 7 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gradDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradInvoices" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-info)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-info)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: "0.6875rem" }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: "0.6875rem" }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", fontSize: "0.75rem" }}
                  formatter={(v: number) => [`$${v}M`, undefined]}
                />
                <Area type="monotone" dataKey="invoices" stroke="var(--color-info)" strokeWidth={1.5} fill="url(#gradInvoices)" name="Invoices" />
                <Area type="monotone" dataKey="disbursed" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gradDisbursed)" name="Disbursed" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2 justify-end">
              <div className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-primary inline-block" /><span className="text-xs text-muted-foreground">Disbursed</span></div>
              <div className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-info inline-block" /><span className="text-xs text-muted-foreground">Invoices</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operations by Status</CardTitle>
            <p className="text-xs text-muted-foreground">{totalOps} total operations</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: "0.625rem" }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: "0.6875rem" }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", fontSize: "0.75rem" }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Operations" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Operations ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recent Operations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentOps.map((op) => (
              <div key={op.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground tabular-nums w-16">{op.id}</span>
                  <span className="text-sm">{op.client}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{op.amount}</span>
                  <Badge variant={statusStyles[op.status] as any} className="text-xs">{statusLabels[op.status]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}