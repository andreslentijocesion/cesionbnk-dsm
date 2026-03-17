import { LineChart, Line } from "recharts";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SafeChartContainer } from "../ui/safe-chart-container";

/**
 * 🔒 ADVANCED COMPONENT - Sparkline
 *
 * Minimalist trend chart for KPIs.
 * Shows trend without axes or labels, just the data line.
 *
 * Location: /components/advanced/sparkline.tsx
 * Category: Data Visualization - Medium Priority
 * Usage: Dashboards, metric cards, trend indicators
 */

export interface SparklineData {
  value: number;
}

interface SparklineProps {
  data: SparklineData[];
  color?: string;
  height?: number;
  showTrend?: boolean;
  title?: string;
  value?: string | number;
  change?: number;
  changeLabel?: string;
}

export function Sparkline({
  data,
  color = "var(--primary)",
  height = 60,
  showTrend = true,
  title,
  value,
  change,
  changeLabel = "vs last period",
}: SparklineProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === null) return null;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === null) return "text-muted-foreground";
    return change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-muted-foreground";
  };

  if (title || value !== undefined) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-2">
          {title && <div className="text-sm text-muted-foreground">{title}</div>}
          {value !== undefined && <div className="font-bold">{value}</div>}
          {change !== undefined && showTrend && (
            <div className={`flex items-center gap-1.5 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">{change > 0 ? "+" : ""}{change}%</span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          )}
          <SafeChartContainer width="100%" height={height} minHeight={`${height}px`} loadingPlaceholder={null}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </SafeChartContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <SafeChartContainer width="100%" height={height} minHeight={`${height}px`} loadingPlaceholder={null}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </SafeChartContainer>
  );
}
