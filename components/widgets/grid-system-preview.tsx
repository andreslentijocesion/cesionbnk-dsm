/**
 * GridSystemPreview Component
 *
 * BUSINESS PATTERN: Grid system visualization without inline styles
 *
 * DO NOT MODIFY without consulting: /components/widgets/WIDGETS_ARCHITECTURE.md
 * Part of the modular system without inline styles
 */

import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface GridSystemPreviewProps {
  device: string;
  columns: number;
  gutter: string;
  margin: string;
}

export function GridSystemPreview({
  device,
  columns,
  gutter,
  margin,
}: GridSystemPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{device}</h4>
          <p className="text-sm text-muted-foreground">
            {columns} columns · Gutter {gutter} · Margin {margin}
          </p>
        </div>
        <Badge>{columns} cols</Badge>
      </div>

      {/* Visual Grid Representation */}
      <div
        className={cn(
          "grid gap-3 p-6 bg-muted/30 rounded-lg border border-border",
          columns === 12 && "grid-cols-12",
          columns === 6 && "grid-cols-6",
          columns === 4 && "grid-cols-4"
        )}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-primary/20 border-2 border-primary/40 rounded flex items-center justify-center"
          >
            <span className="text-xs font-mono text-muted-foreground">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
