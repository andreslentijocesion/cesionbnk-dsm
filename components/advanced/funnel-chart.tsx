import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingDown } from "lucide-react";

export interface FunnelStage {
  name: string;
  value: number;
  color?: string;
  description?: string;
}

interface FunnelChartProps {
  data: FunnelStage[];
  title?: string;
  description?: string;
  height?: number;
  showPercentages?: boolean;
  showDropoff?: boolean;
  colors?: string[];
}

const DEFAULT_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function FunnelChart({
  data, title, description, height = 400,
  showPercentages = true, showDropoff = true, colors = DEFAULT_COLORS,
}: FunnelChartProps) {
  if (!data || data.length === 0) return <div className="min-h-[100px]" />;

  const maxValue = Math.max(...data.map((d) => d.value));
  const totalValue = data[0].value;

  const getConversionRate = (currentValue: number) => ((currentValue / totalValue) * 100).toFixed(1);
  const getDropoffRate = (currentIndex: number) => {
    if (currentIndex === 0) return null;
    const previousValue = data[currentIndex - 1].value;
    const currentValue = data[currentIndex].value;
    return (((previousValue - currentValue) / previousValue) * 100).toFixed(1);
  };

  const content = (
    <div className="space-y-4">
      {data.map((stage, index) => {
        const widthPercentage = (stage.value / maxValue) * 100;
        const color = stage.color || colors[index % colors.length];
        const conversionRate = getConversionRate(stage.value);
        const dropoffRate = getDropoffRate(index);

        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div
                  className="relative rounded-md transition-all hover:opacity-90 cursor-pointer group"
                  style={{ "--funnel-width": `${widthPercentage}%`, "--funnel-height": `${height / data.length}px`, "--funnel-color": color, "--funnel-offset": `${(100 - widthPercentage) / 2}%` } as React.CSSProperties}
                  data-funnel-width={widthPercentage}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center px-4">
                      <p className="font-semibold text-sm md:text-base truncate">{stage.name}</p>
                      <p className="text-xs md:text-sm opacity-90">
                        {stage.value.toLocaleString()}
                        {showPercentages && <span className="ml-2">({conversionRate}%)</span>}
                      </p>
                    </div>
                  </div>
                  {stage.description && (
                    <div className="absolute left-1/2 -translate-x-1/2 -top-14 bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border z-10 whitespace-nowrap">
                      <p className="text-sm">{stage.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showDropoff && dropoffRate && index < data.length - 1 && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">{dropoffRate}% drop-off</span>
                <span>({(data[index].value - data[index + 1].value).toLocaleString()} lost)</span>
              </div>
            )}
          </div>
        );
      })}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Started</p>
            <p className="font-bold">{data[0].value.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="font-bold">{data[data.length - 1].value.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <p className="font-bold text-green-600">{((data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Drop-off</p>
            <p className="font-bold text-red-600">{(data[0].value - data[data.length - 1].value).toLocaleString()}</p>
          </div>
        </div>
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
            <Badge variant="secondary">{data.length} stages</Badge>
          </div>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }
  return content;
}
