/**
 * StatCard — Metric card for KPIs and financial stats
 * Factoring-ready: disbursed amounts, invoice counts, rates, portfolio health.
 * @layer patterns
 */
import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import { cn } from "../../lib/utils";

export interface StatCardProps {
  title: string;
  value: string;
  /** e.g. "+12.4%" or "-3.1%" */
  change?: string;
  /** Positive = green, negative = red, neutral = muted */
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  /** Optional sub-label below value */
  subtitle?: string;
  /** Highlight color for the icon area */
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
  className?: string;
}

const variantStyles: Record<NonNullable<StatCardProps["variant"]>, string> = {
  default:     "bg-muted text-muted-foreground",
  primary:     "bg-primary/10 text-primary",
  success:     "bg-success-subtle text-success-on-subtle",
  warning:     "bg-warning-subtle text-warning-on-subtle",
  destructive: "bg-destructive-subtle text-destructive-on-subtle",
};

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  subtitle,
  variant = "default",
  className,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up" ? "text-success-on-subtle" :
    trend === "down" ? "text-destructive-on-subtle" :
    "text-muted-foreground";

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</p>
            {subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
            {change && (
              <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trendColor)}>
                <TrendIcon className="size-3.5 .5 flex-shrink-0" />
                <span>{change} vs. mes anterior</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className={cn("flex-shrink-0 rounded-lg p-2.5", variantStyles[variant])}>
              <Icon className="size-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export interface StatCardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

export function StatCardGrid({ children, columns = 4 }: StatCardGridProps) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-4", colClass)}>
      {children}
    </div>
  );
}
