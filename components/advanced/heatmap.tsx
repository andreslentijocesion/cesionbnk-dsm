import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export interface HeatmapCell {
  row: string;
  col: string;
  value: number;
  label?: string;
}

interface HeatmapProps {
  data: HeatmapCell[];
  rows: string[];
  columns: string[];
  title?: string;
  description?: string;
  colorScale?: { low: string; medium: string; high: string };
  showValues?: boolean;
  showLabels?: boolean;
  cellSize?: number;
  min?: number;
  max?: number;
}

export function Heatmap({
  data, rows, columns, title, description,
  colorScale = { low: "var(--chart-2)", medium: "var(--chart-1)", high: "var(--chart-3)" },
  showValues = true, showLabels = true, cellSize = 60, min, max,
}: HeatmapProps) {
  if (!data || data.length === 0 || !rows || rows.length === 0 || !columns || columns.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">No data available for the heatmap</p>
        </CardContent>
      </Card>
    );
  }

  const values = data.map((d) => d.value);
  const minValue = min ?? Math.min(...values);
  const maxValue = max ?? Math.max(...values);

  const getColor = (value: number) => {
    if (maxValue === minValue) return colorScale.medium;
    const normalized = (value - minValue) / (maxValue - minValue);
    if (normalized < 0.33) return colorScale.low;
    if (normalized < 0.66) return colorScale.medium;
    return colorScale.high;
  };

  const getCellData = (row: string, col: string) => data.find((d) => d.row === row && d.col === col);
  const getTextColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return normalized > 0.5 ? "var(--primary-foreground)" : "var(--foreground)";
  };

  const content = (
    <div className="overflow-x-auto">
      <div className="inline-block" style={{ "--cell-size": `${cellSize}px` } as React.CSSProperties}>
        <table className="border-collapse table-fixed">
          <thead>
            <tr>
              <th className="border border-border p-2 bg-muted w-[var(--cell-size)] h-[var(--cell-size)]"></th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border border-border p-2 text-sm font-semibold bg-muted w-[var(--cell-size)] h-[var(--cell-size)]"
                >
                  {showLabels ? col : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="border border-border p-2 text-sm font-semibold bg-muted w-[var(--cell-size)]">
                  {showLabels ? row : ""}
                </td>
                {columns.map((col) => {
                  const cellData = getCellData(row, col);
                  const value = cellData?.value ?? 0;
                  const bgColor = getColor(value);
                  const textColor = getTextColor(value);
                  return (
                    <td
                      key={`${row}-${col}`}
                      className="border border-border p-2 text-center transition-opacity hover:opacity-70 cursor-pointer w-[var(--cell-size)] h-[var(--cell-size)]"
                      style={{ backgroundColor: bgColor, color: textColor } as React.CSSProperties}
                      title={cellData?.label || `${row} - ${col}: ${value}`}
                    >
                      {showValues && <div className="text-sm font-medium">{value}</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-sm text-muted-foreground">Min: {minValue}</span>
        <div className="flex gap-1">
          <div className="w-8 h-4 rounded-sm" style={{ backgroundColor: colorScale.low } as React.CSSProperties} />
          <div className="w-8 h-4 rounded-sm" style={{ backgroundColor: colorScale.medium } as React.CSSProperties} />
          <div className="w-8 h-4 rounded-sm" style={{ backgroundColor: colorScale.high } as React.CSSProperties} />
        </div>
        <span className="text-sm text-muted-foreground">Max: {maxValue}</span>
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
            <Badge variant="outline" className="text-xs">{data.length} data points</Badge>
          </div>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }
  return content;
}