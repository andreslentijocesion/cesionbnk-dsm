/**
 * RiskIndicator — Credit risk scorecard with gauge, level badge, factors and trend.
 * Designed for factoring: displays cedente/debtor risk assessment.
 * @layer patterns
 */
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";

export type RiskLevel = "bajo" | "medio" | "alto" | "crítico";
export type RiskTrend = "up" | "down" | "neutral";

export interface RiskFactor {
  label: string;
  value: string;
  impact: "positive" | "negative" | "neutral";
}

export interface RiskIndicatorProps {
  /** Credit score 0–1000 (e.g. DICOM-style) */
  score: number;
  level: RiskLevel;
  trend?: RiskTrend;
  /** Short description of the score source */
  source?: string;
  /** Last update date */
  updatedAt?: string;
  factors?: RiskFactor[];
  className?: string;
  /** Compact card vs full card */
  variant?: "default" | "compact";
}

const levelConfig: Record<RiskLevel, {
  label: string;
  color: string;
  bg: string;
  gauge: string;
  arc: number; // fill percentage of gauge (0-100)
}> = {
  bajo:    { label: "Riesgo bajo",    color: "text-success",     bg: "bg-success/10",     gauge: "stroke-success",     arc: 85 },
  medio:   { label: "Riesgo medio",   color: "text-warning",     bg: "bg-warning/10",     gauge: "stroke-warning",     arc: 60 },
  alto:    { label: "Riesgo alto",    color: "text-caution",     bg: "bg-caution-subtle",  gauge: "stroke-caution",     arc: 35 },
  crítico: { label: "Riesgo crítico", color: "text-destructive", bg: "bg-destructive/10", gauge: "stroke-destructive", arc: 15 },
};

const impactIcon = {
  positive: <CheckCircle2 className="size-3.5 .5 text-success flex-shrink-0" />,
  negative: <AlertTriangle className="size-3.5 .5 text-destructive flex-shrink-0" />,
  neutral:  <Info className="size-3.5 .5 text-muted-foreground flex-shrink-0" />,
};

function GaugeArc({ score, level }: { score: number; level: RiskLevel }) {
  const cfg = levelConfig[level];
  // SVG half-circle gauge
  const r = 54;
  const cx = 64;
  const cy = 68;
  const circumference = Math.PI * r; // half circle
  const offset = circumference * (1 - Math.min(1000, Math.max(0, score)) / 1000);

  return (
    <div className="relative flex items-end justify-center">
      <svg width="128" height="80" viewBox="0 0 128 80" className="overflow-visible">
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          strokeWidth="10"
          stroke="currentColor"
          className="text-muted/60"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          strokeWidth="10"
          className={cfg.gauge}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {/* Score text */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <span className={cn("text-3xl font-bold tabular-nums leading-none", cfg.color)}>
          {score}
        </span>
        <span className="text-2xs text-muted-foreground mt-0.5">/ 1000</span>
      </div>
    </div>
  );
}

function TrendIcon({ trend }: { trend: RiskTrend }) {
  if (trend === "up")   return <TrendingUp  className="size-4 text-success" />;
  if (trend === "down") return <TrendingDown className="size-4 text-destructive" />;
  return <Minus className="size-4 text-muted-foreground" />;
}

export function RiskIndicator({
  score,
  level,
  trend,
  source,
  updatedAt,
  factors,
  className,
  variant = "default",
}: RiskIndicatorProps) {
  const cfg = levelConfig[level];

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 rounded-lg border bg-card p-3", className)}>
        <div className={cn("size-10 rounded-full flex items-center justify-center flex-shrink-0", cfg.bg)}>
          <span className={cn("text-sm font-bold", cfg.color)}>{score}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className={cn("text-sm font-semibold", cfg.color)}>{cfg.label}</p>
            {trend && <TrendIcon trend={trend} />}
          </div>
          {(source || updatedAt) && (
            <p className="text-xs text-muted-foreground truncate">
              {[source, updatedAt].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border bg-card shadow-sm", className)}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Indicador de riesgo</p>
            {source && <p className="text-xs text-muted-foreground mt-0.5">{source}</p>}
          </div>
          <div className="flex items-center gap-1.5">
            {trend && <TrendIcon trend={trend} />}
            <Badge
              variant="outline"
              className={cn("text-xs", level === "bajo" && "border-success text-success-on-subtle", level === "medio" && "border-warning text-warning", level === "alto" && "border-caution text-caution-on-subtle", level === "crítico" && "border-destructive text-destructive")}
            >
              {cfg.label}
            </Badge>
          </div>
        </div>

        {/* Gauge */}
        <div className="mt-2 flex justify-center">
          <GaugeArc score={score} level={level} />
        </div>

        {updatedAt && (
          <p className="text-center text-xs text-muted-foreground mt-1">Actualizado: {updatedAt}</p>
        )}
      </div>

      {/* Factors */}
      {factors && factors.length > 0 && (
        <div className="px-5 py-4 space-y-2.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Factores</p>
          {factors.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {impactIcon[f.impact]}
                <span className="text-sm text-foreground truncate">{f.label}</span>
              </div>
              <span className={cn(
                "text-xs font-medium flex-shrink-0",
                f.impact === "positive" ? "text-success" : f.impact === "negative" ? "text-destructive" : "text-muted-foreground",
              )}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
