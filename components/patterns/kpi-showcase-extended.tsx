/**
 * KPIShowcaseExtended — Standard KPI Grid
 * Self-contained with mock data. Uses StatCard and StatusKPICard patterns.
 * @layer patterns
 */
import { useState } from "react";
import { StatCard } from "./stat-card";
import { StatusKPICard } from "./status-kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  DollarSign, FileText, Users, TrendingUp,
  AlertCircle, BarChart2,
} from "lucide-react";

const statCards = [
  { title: "Total Portfolio", value: "$42.8B", change: "+8.3%", trend: "up" as const, icon: DollarSign },
  { title: "Active Invoices", value: "12,450", change: "+5.2%", trend: "up" as const, icon: FileText },
  { title: "Registered Clients", value: "348", change: "+2.1%", trend: "up" as const, icon: Users },
  { title: "Monthly Growth", value: "6.9%", change: "+1.4pp", trend: "up" as const, icon: TrendingUp },
  { title: "Avg. Disbursement", value: "$1.2B", change: "-3.1%", trend: "down" as const, icon: BarChart2 },
  { title: "Overdue Rate", value: "1.8%", change: "-0.4pp", trend: "up" as const, icon: AlertCircle },
];

const statusCards = [
  {
    title: "In Negotiation",
    subtitle: "Awaiting client confirmation",
    amount: "$8.4B",
    count: 34,
    variant: "negotiation" as const,
  },
  {
    title: "Disbursed",
    subtitle: "Processed this month",
    amount: "$3.1B",
    count: 28,
    variant: "disbursed" as const,
  },
  {
    title: "Under Review",
    subtitle: "Pending compliance check",
    amount: "$1.7B",
    count: 12,
    variant: "warning" as const,
  },
  {
    title: "Alerts",
    subtitle: "Require immediate attention",
    amount: "$0.4B",
    count: 6,
    variant: "error" as const,
  },
];

const quickStats = [
  { label: "Approval rate", value: "94.2%", badge: "success-soft-outline" },
  { label: "Avg. processing time", value: "1.4 days", badge: "info-soft-outline" },
  { label: "Payer concentration", value: "18.3%", badge: "warning-soft-outline" },
  { label: "NPL ratio", value: "0.7%", badge: "success-soft-outline" },
  { label: "Active clients", value: "5 / 5", badge: "info-soft-outline" },
  { label: "Pending approvals", value: "7", badge: "warning-soft-outline" },
];

export function KPIShowcaseExtended() {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* ── StatCards Grid ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">General Metrics</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {statCards.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              change={card.change}
              trend={card.trend}
              icon={card.icon}
            />
          ))}
        </div>
      </section>

      {/* ── StatusKPICards ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Pipeline Status</h2>
          <Separator className="flex-1" />
          {activeStatus && (
            <button
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setActiveStatus(null)}
            >
              Clear selection
            </button>
          )}
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {statusCards.map((card) => (
            <StatusKPICard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              amount={card.amount}
              count={card.count}
              variant={card.variant}
              state={activeStatus === card.title ? "active" : activeStatus ? "normal" : "normal"}
              onViewClick={() => setActiveStatus(activeStatus === card.title ? null : card.title)}
            />
          ))}
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Stats</h2>
          <Separator className="flex-1" />
        </div>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Badge variant={stat.badge as any} className="text-xs">{stat.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}