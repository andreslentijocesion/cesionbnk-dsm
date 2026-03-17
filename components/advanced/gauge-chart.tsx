import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface GaugeChartProps {
  value: number;
  max?: number;
  title?: string;
  description?: string;
  label?: string;
  color?: string;
  size?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  thresholds?: { low: number; medium: number; high: number };
}

export function GaugeChart({
  value, max = 100, title, description, label,
  color = "var(--primary)", size = 200,
  showPercentage = true, showLabel = true,
  thresholds = { low: 33, medium: 66, high: 100 },
}: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColor = () => {
    if (color) return color;
    if (percentage <= thresholds.low) return "var(--destructive)";
    if (percentage <= thresholds.medium) return "var(--warning)";
    return "var(--success)";
  };

  const gaugeColor = getColor();
  const emptyColor = "var(--muted)";
  const data = [{ name: "value", value: percentage }, { name: "empty", value: 100 - percentage }];

  const getStatus = () => {
    if (percentage <= thresholds.low) return { label: "Low", variant: "destructive" as const };
    if (percentage <= thresholds.medium) return { label: "Medium", variant: "default" as const };
    return { label: "High", variant: "default" as const };
  };

  const status = getStatus();

  const content = (
    <div className="relative flex flex-col items-center justify-center min-w-0" style={{ minHeight: `${size * 0.7}px` }}>
      <PieChart width={size} height={Math.round(size * 0.6)}>
        <Pie data={data} cx="50%" cy="90%" startAngle={180} endAngle={0} innerRadius={size * 0.25} outerRadius={size * 0.35} dataKey="value" stroke="none">
          <Cell fill={gaugeColor} />
          <Cell fill={emptyColor} />
        </Pie>
      </PieChart>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 text-center">
        {showPercentage && (
          <div className="font-bold" style={{ "--gauge-font-size": `${size * 0.12}px` } as React.CSSProperties} data-gauge-size={size}>
            {Math.round(percentage)}%
          </div>
        )}
        {showLabel && label && <div className="text-sm text-muted-foreground mt-1">{label}</div>}
      </div>
    </div>
  );

  if (title || description) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center">{content}</CardContent>
      </Card>
    );
  }
  return content;
}
