/**
 * CreditScoreCard — Debtor credit evaluation panel
 * Shows score, limit, behavior history, risk classification, and key metrics.
 * @layer patterns
 */
import { TrendingUp, TrendingDown, Minus, ShieldCheck, ShieldAlert, ShieldX, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { cn } from "../../lib/utils";

export type RiskLevel = "bajo" | "medio" | "alto" | "critico";

export interface CreditMetric {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

export interface CreditScoreCardProps {
  /** Debtor name */
  name: string;
  /** NIT / Tax ID */
  nit?: string;
  /** Industry */
  industry?: string;
  /** Score 0–1000 */
  score: number;
  /** Maximum credit limit */
  limitAmount: string;
  /** Currently used credit */
  usedAmount: string;
  riskLevel: RiskLevel;
  /** Last update date */
  updatedAt?: string;
  metrics?: CreditMetric[];
  /** Optional alert message */
  alert?: string;
  className?: string;
}

const riskConfig: Record<RiskLevel, {
  label: string;
  color: string;
  bg: string;
  bar: string;
  icon: React.ElementType;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
}> = {
  bajo:    { label: "Bajo",    color: "text-success-on-subtle",   bg: "bg-success-subtle",   bar: "var(--success)",     icon: ShieldCheck,  badgeVariant: "outline" },
  medio:   { label: "Medio",   color: "text-warning-on-subtle",   bg: "bg-warning-subtle",   bar: "var(--warning)",     icon: ShieldAlert,  badgeVariant: "outline" },
  alto:    { label: "Alto",    color: "text-caution-on-subtle",   bg: "bg-caution-subtle",   bar: "var(--caution)",     icon: ShieldAlert,  badgeVariant: "outline" },
  critico: { label: "Crítico", color: "text-destructive",                      bg: "bg-destructive/10",                bar: "var(--destructive)", icon: ShieldX,      badgeVariant: "outline" },
};

function ScoreArc({ score }: { score: number }) {
  // SVG semi-circle gauge 0–1000
  const pct = Math.min(Math.max(score / 1000, 0), 1);
  const r = 54;
  const cx = 70;
  const cy = 70;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;


  const color =
    score >= 700 ? "var(--success)" :
    score >= 500 ? "var(--warning)" :
    score >= 300 ? "var(--kpi-orange)" : "var(--destructive)";

  const toXY = (angle: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  const start = toXY(startAngle);
  const end = toXY(endAngle);
  const fill = toXY(startAngle + pct * Math.PI);

  return (
    <svg width="140" height="90" viewBox="0 0 140 90">
      {/* Track */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="var(--border)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Value */}
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${fill.x} ${fill.y}`}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Score text */}
      <text x={cx} y={cy + 2} textAnchor="middle" style={{ fontSize: "1.375rem", fontWeight: 700, fill: "var(--foreground)" }}>
        {score}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: "0.625rem", fill: "var(--muted-foreground)" }}>
        de 1000
      </text>
    </svg>
  );
}

const trendIcon = (t?: "up" | "down" | "neutral") =>
  t === "up" ? TrendingUp : t === "down" ? TrendingDown : Minus;

const trendColor = (t?: "up" | "down" | "neutral") =>
  t === "up" ? "text-success-on-subtle" :
  t === "down" ? "text-destructive" : "text-muted-foreground";

export function CreditScoreCard({
  name, nit, industry, score, limitAmount, usedAmount,
  riskLevel, updatedAt, metrics = [], alert, className,
}: CreditScoreCardProps) {
  const cfg = riskConfig[riskLevel];
  const RiskIcon = cfg.icon;

  return (
    <Card
      className={cn("border-b-4 border-b-transparent [background-clip:padding-box,border-box] [background-origin:border-box]", className)}
      style={{
        "--risk-color": cfg.bar,
        backgroundImage: `linear-gradient(var(--card), var(--card)), linear-gradient(to right, var(--risk-color), color-mix(in srgb, var(--risk-color) 15%, black))`,
      } as React.CSSProperties}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">{name}</CardTitle>
            {nit && <p className="text-xs text-muted-foreground mt-0.5">NIT {nit}</p>}
            {industry && <p className="text-xs text-muted-foreground">{industry}</p>}
          </div>
          <div className={cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5", cfg.bg)}>
            <RiskIcon className={cn("size-4", cfg.color)} />
            <span className={cn("text-xs font-semibold", cfg.color)}>Riesgo {cfg.label}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Score + Limit */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center">
            <ScoreArc score={score} />
            <p className="text-xs text-muted-foreground -mt-1">Score crediticio</p>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Límite aprobado</p>
              <p className="text-lg font-bold text-foreground">{limitAmount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Utilizado</p>
              <p className="text-base font-semibold text-foreground">{usedAmount}</p>
            </div>
            {/* Usage bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Uso del cupo</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, Math.round((parseFloat(usedAmount.replace(/[^0-9.]/g, "")) / parseFloat(limitAmount.replace(/[^0-9.]/g, ""))) * 100))}%`,
                    backgroundColor: cfg.bar,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {alert && (
          <div className="flex gap-2 items-start rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
            <AlertCircle className="size-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs text-destructive">{alert}</p>
          </div>
        )}

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => {
              const TIcon = trendIcon(m.trend);
              return (
                <div key={m.label} className="rounded-md bg-muted/40 px-3 py-2">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <p className="text-sm font-semibold text-foreground">{m.value}</p>
                    {m.trend && (
                      <TIcon className={cn("size-3", trendColor(m.trend))} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {updatedAt && (
          <p className="text-xs text-muted-foreground text-right">Actualizado: {updatedAt}</p>
        )}
      </CardContent>
    </Card>
  );
}
