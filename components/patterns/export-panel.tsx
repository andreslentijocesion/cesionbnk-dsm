/**
 * ExportPanel — Data export dialog with format, date range, and column selection
 * Factoring-ready: exportar cartera, facturas, reportes, cedentes a PDF/Excel/CSV.
 * @layer patterns
 */
import { useState } from "react";
import { Download, FileText, FileDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

export type ExportFormat = "csv" | "pdf";

export interface ExportColumn {
  id: string;
  label: string;
  /** Selected by default */
  defaultSelected?: boolean;
}

export interface ExportPanelProps {
  title?: string;
  columns?: ExportColumn[];
  formats?: ExportFormat[];
  /** Called with chosen format and selected column ids */
  onExport?: (format: ExportFormat, columns: string[]) => void;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger button label */
  triggerLabel?: string;
  /** Show as a standalone trigger button */
  showTrigger?: boolean;
}

const formatMeta: Record<ExportFormat, { label: string; icon: React.ElementType; color: string }> = {
  csv:  { label: "CSV",       icon: FileDown,        color: "text-info-on-subtle" },
  pdf:  { label: "PDF",       icon: FileText,        color: "text-destructive" },
};

export function ExportPanel({
  title = "Exportar datos",
  columns = [],
  formats = ["csv", "pdf"],
  onExport,
  open: controlledOpen,
  onOpenChange,
  triggerLabel = "Exportar",
  showTrigger = true,
}: ExportPanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>("csv");
  const [selectedCols, setSelectedCols] = useState<string[]>(
    columns.filter((c) => c.defaultSelected !== false).map((c) => c.id)
  );

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const toggleCol = (id: string) =>
    setSelectedCols((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const handleExport = () => {
    onExport?.(format, selectedCols);
    setOpen(false);
  };

  return (
    <>
      {showTrigger && (
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Download className="h-4 w-4 mr-2" />
          {triggerLabel}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Format selection */}
            <div className="space-y-2">
              <Label>Formato</Label>
              <div className="grid grid-cols-3 gap-2">
                {formats.map((f) => {
                  const meta = formatMeta[f];
                  const Icon = meta.icon;
                  const selected = format === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm transition-colors",
                        selected
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                      )}
                    >
                      <Icon className={cn("h-6 w-6", selected ? meta.color : "text-muted-foreground")} />
                      <span className={cn("font-medium", selected && "text-foreground")}>{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column selection */}
            {columns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Columnas</Label>
                  <div className="flex gap-2">
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setSelectedCols(columns.map((c) => c.id))}
                    >
                      Todas
                    </button>
                    <span className="text-xs text-muted-foreground">·</span>
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setSelectedCols([])}
                    >
                      Ninguna
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {columns.map((col) => {
                    const sel = selectedCols.includes(col.id);
                    return (
                      <button
                        key={col.id}
                        onClick={() => toggleCol(col.id)}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                          sel
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:bg-muted/40"
                        )}
                      >
                        {col.label}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedCols.length} de {columns.length} columnas seleccionadas
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleExport} disabled={columns.length > 0 && selectedCols.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Descargar {formatMeta[format].label}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
