/**
 * SpacingPreview Component
 *
 * BUSINESS PATTERN: Spacing system visualization without inline styles
 *
 * DO NOT MODIFY without consulting: /components/widgets/WIDGETS_ARCHITECTURE.md
 * Part of the modular system without inline styles
 */

import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface SpacingPreviewProps {
  name: string;
  value: string;
  multiplier: string;
}

const spacingMap: Record<string, string> = {
  "4px": "w-1",
  "8px": "w-2",
  "12px": "w-3",
  "16px": "w-4",
  "24px": "w-6",
  "32px": "w-8",
  "48px": "w-12",
  "64px": "w-16",
};

export function SpacingPreview({ name, value, multiplier }: SpacingPreviewProps) {
  const widthClass = spacingMap[value] || "w-4";

  return (
    <div className="flex items-center gap-6 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="w-24">
        <p className="font-mono text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{multiplier} base</p>
      </div>
      <div className="flex-1">
        <div className={cn("h-8 bg-primary rounded", widthClass)} />
      </div>
      <div className="w-20 text-right">
        <p className="font-mono text-sm">{value}</p>
      </div>
    </div>
  );
}
