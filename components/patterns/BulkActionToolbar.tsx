/**
 * BulkActionToolbar — Floating toolbar that appears when rows are selected
 * Shows selection count and configurable action buttons.
 * Factoring-ready: aprobar lote, enviar recordatorios, exportar selección.
 * @layer patterns
 */
import { X, type LucideIcon } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../ui/utils";

export interface BulkAction {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "destructive" | "secondary";
  onClick: (selectedIds: string[]) => void;
  /** Disable if selection count doesn't meet this minimum */
  minSelection?: number;
}

export interface BulkActionToolbarProps {
  /** IDs of selected rows */
  selectedIds: string[];
  /** Total rows in table (for "select all" context) */
  totalCount?: number;
  actions: BulkAction[];
  onClearSelection: () => void;
  /** Entity label for the count badge, e.g. "operación" */
  entityLabel?: string;
  className?: string;
}

export function BulkActionToolbar({
  selectedIds,
  totalCount,
  actions,
  onClearSelection,
  entityLabel = "elemento",
  className,
}: BulkActionToolbarProps) {
  const count = selectedIds.length;

  if (count === 0) return null;

  const plural = count === 1 ? entityLabel : `${entityLabel}s`;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-2 rounded-xl border border-border bg-card shadow-xl px-4 py-2.5",
        "animate-in slide-in-from-bottom-4 duration-200",
        className
      )}
    >
      {/* Count */}
      <div className="flex items-center gap-2 pr-3 border-r border-border">
        <Badge variant="outline" className="text-xs font-bold tabular-nums">
          {count}
        </Badge>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {plural} seleccionado{count !== 1 ? "s" : ""}
          {totalCount ? ` de ${totalCount}` : ""}
        </span>
        <button
          onClick={onClearSelection}
          className="text-muted-foreground hover:text-foreground transition-colors rounded-sm p-0.5 ml-1"
          title="Limpiar selección"
        >
          <X className="size-3.5 .5" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {actions.map((action) => {
          const Icon = action.icon;
          const disabled = action.minSelection !== undefined && count < action.minSelection;
          return (
            <Button
              key={action.id}
              variant={action.variant ?? "outline"}
              size="sm"
              className="h-8 text-xs"
              disabled={disabled}
              onClick={() => action.onClick(selectedIds)}
            >
              {Icon && <Icon className="size-3.5 .5 mr-1.5" />}
              {action.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
