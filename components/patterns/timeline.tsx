/**
 * Timeline — Vertical activity/event timeline
 * Factoring-ready: operation status history, approval steps, audit trail.
 * @layer patterns
 */
import { type LucideIcon, CheckCircle2, Clock, XCircle, AlertCircle, Circle } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export type TimelineStatus = "completed" | "current" | "pending" | "error" | "warning";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: TimelineStatus;
  icon?: LucideIcon;
  /** Optional badge label */
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const statusConfig: Record<TimelineStatus, { icon: LucideIcon; dotClass: string; iconClass: string }> = {
  completed: { icon: CheckCircle2, dotClass: "bg-primary border-primary",     iconClass: "text-primary-foreground" },
  current:   { icon: Clock,        dotClass: "bg-secondary border-secondary", iconClass: "text-secondary-foreground" },
  pending:   { icon: Circle,       dotClass: "bg-muted border-border",        iconClass: "text-muted-foreground" },
  error:     { icon: XCircle,      dotClass: "bg-destructive border-destructive", iconClass: "text-destructive-foreground" },
  warning:   { icon: AlertCircle,  dotClass: "bg-warning border-warning", iconClass: "text-warning-foreground" },
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("relative", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const status = item.status ?? "pending";
        const cfg = statusConfig[status];
        const Icon = item.icon ?? cfg.icon;

        return (
          <li key={item.id} className="relative flex gap-4">
            {/* Line + Dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-8 flex-shrink-0 items-center justify-center rounded-full border-2",
                  cfg.dotClass
                )}
              >
                <Icon className={cn("size-4", cfg.iconClass)} />
              </div>
              {!isLast && (
                <div className="mt-1 w-0.5 flex-1 bg-border min-h-[1.5rem]" />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6 flex-1 min-w-0", isLast && "pb-0")}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      status === "pending" ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant ?? "secondary"} className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                {item.timestamp && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">{item.timestamp}</span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
