/**
 * AgingReport — Portfolio aging analysis (días de mora)
 * Shows overdue invoice distribution: current + 4 buckets (1-30, 31-60, 61-90, +90 days).
 * @layer patterns
 */
import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { cn } from "../../lib/utils";

export interface AgingBucket {
  /** e.g. "Al día", "1–30 días", "31–60 días", "61–90 días", "+90 días" */
  label: string;
  /** Total amount in the bucket (CLP millions or any unit) */
  amount: number;
  /** Number of invoices */
  count: number;
  /** Risk level affects color */
  risk: "ok" | "low" | "medium" | "high" | "critical";
}

interface AgingReportProps {
  buckets: AgingBucket[];
  /** Unit label for amounts, e.g. "M COP" */
  unit?: string;
  className?: string;
}

const riskMeta: Record<AgingBucket["risk"], { bar: string; badge: string; variant: "outline" }> = {
  ok:       { bar: "var(--primary)",     badge: "Al día",  variant: "outline" },
  low:      { bar: "var(--info)",        badge: "Bajo",    variant: "outline" },
  medium:   { bar: "var(--warning)",     badge: "Medio",   variant: "outline" },
  high:     { bar: "var(--kpi-orange)",  badge: "Alto",    variant: "outline" },
  critical: { bar: "var(--destructive)", badge: "Crítico", variant: "outline" },
};

const fmt = (n: number) =>
  n >= 1000
    ? `$${(n / 1000).toFixed(1)}B`
    : `$${n.toFixed(0)}M`;

export function AgingReport({ buckets, unit = "M COP", className }: AgingReportProps) {
  const total = useMemo(() => buckets.reduce((s, b) => s + b.amount, 0), [buckets]);
  const totalCount = useMemo(() => buckets.reduce((s, b) => s + b.count, 0), [buckets]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {buckets.map((b) => {
          const meta = riskMeta[b.risk];
          const pct = total > 0 ? ((b.amount / total) * 100).toFixed(1) : "0.0";
          return (
            <Card
              key={b.label}
              className="border-b-4 border-b-transparent [background-clip:padding-box,border-box] [background-origin:border-box]"
              style={{
                "--risk-color": meta.bar,
                backgroundImage: `linear-gradient(var(--card), var(--card)), linear-gradient(to right, var(--risk-color), color-mix(in srgb, var(--risk-color) 15%, black))`,
              } as React.CSSProperties}
            >
              <CardContent className="pt-4 pb-3 px-4">
                <p className="text-xs text-muted-foreground mb-1">{b.label}</p>
                <p className="text-lg font-bold text-foreground">{fmt(b.amount)}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{b.count} facturas</span>
                  <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Distribución por tramo ({unit}) — {totalCount} facturas · {fmt(total)} total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={buckets} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: "0.6875rem", fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: "0.6875rem", fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}M`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value}M`, "Monto"]}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  fontSize: "0.75rem",
                }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {buckets.map((b) => (
                  <Cell key={b.label} fill={riskMeta[b.risk].bar} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detail table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Tramo</TableHead>
                  <TableHead className="text-xs text-right">Facturas</TableHead>
                  <TableHead className="text-xs text-right">Monto</TableHead>
                  <TableHead className="text-xs text-right">% Cartera</TableHead>
                  <TableHead className="text-xs text-right">Riesgo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buckets.map((b) => {
                  const meta = riskMeta[b.risk];
                  const pct = total > 0 ? ((b.amount / total) * 100).toFixed(1) : "0.0";
                  return (
                    <TableRow key={b.label}>
                      <TableCell className="font-medium text-foreground">{b.label}</TableCell>
                      <TableCell className="text-right text-muted-foreground font-mono tabular-nums">{b.count}</TableCell>
                      <TableCell className="text-right font-medium text-foreground font-mono tabular-nums">{fmt(b.amount)}</TableCell>
                      <TableCell className="text-right text-muted-foreground font-mono tabular-nums">{pct}%</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={meta.variant} className="text-xs">{meta.badge}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="font-semibold bg-muted/20">
                  <TableCell className="text-foreground">Total</TableCell>
                  <TableCell className="text-right text-foreground font-mono tabular-nums">{totalCount}</TableCell>
                  <TableCell className="text-right text-foreground font-mono tabular-nums">{fmt(total)}</TableCell>
                  <TableCell className="text-right text-foreground">100%</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
