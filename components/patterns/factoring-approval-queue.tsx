/* eslint-disable */
import { useState, useMemo } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Progress } from "../ui/Progress";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  CheckCircle2, XCircle, Search, Clock, Eye,
  ChevronLeft, ChevronRight, RefreshCw,
} from "lucide-react";
import { cn, formatCOP } from "../../lib/utils";
import { toast } from "sonner";
import { FactoringOperationDetail, FactoringRecord as DetailRecord } from "./factoring-operation-detail";
import { FactoringQueueRecord } from "./types/factoring.types";
import { mockApprovalQueue } from "./mocks/factoring-approval-queue.mock";

const PAGE_SIZE = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const priorityConfig: Record<string, { label: string; color: string; bg: string }> = {
  alta:  { label: "Alta",  color: "text-destructive", bg: "bg-destructive/10" },
  media: { label: "Media", color: "text-warning",     bg: "bg-warning/10"     },
  baja:  { label: "Baja",  color: "text-success",     bg: "bg-success/10"     },
};

const riskConfig: Record<string, { label: string; color: string }> = {
  bajo:  { label: "Bajo",  color: "text-success"     },
  medio: { label: "Medio", color: "text-warning"     },
  alto:  { label: "Alto",  color: "text-destructive" },
};

// ─── Score Bar ────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <Progress
        value={score}
        className="h-1.5 flex-1 bg-muted"
        indicatorClassName={score >= 80 ? "bg-success" : score >= 65 ? "bg-warning" : "bg-destructive"}
      />
      <span className={cn("text-[10px] font-bold tabular-nums w-5 text-right",
        score >= 80 ? "text-success-on-subtle" : score >= 65 ? "text-warning-on-subtle" : "text-destructive-on-subtle"
      )}>
        {score}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function FactoringApprovalQueue() {
  const [data, setData] = useState<FactoringQueueRecord[]>(mockApprovalQueue);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<FactoringQueueRecord | null>(null);

  // Filtering
  const filteredData = useMemo(() => {
    return data.filter(r =>
      r.cedente.toLowerCase().includes(search.toLowerCase()) ||
      r.deudor.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === paginatedData.length ? [] : paginatedData.map(r => r.id));
  };

  const handleApprove = (id: string) => {
    toast.success(`Operación ${id} aprobada.`);
    setData(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = (id: string) => {
    toast.error(`Operación ${id} rechazada.`);
    setData(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cola de Aprobación</h2>
          <p className="text-muted-foreground text-sm">Operaciones radicadas pendientes de análisis y decisión.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
          <Clock className="size-3.5" /> Tiempo medio: <span className="text-foreground ml-1">4.2 horas</span>
        </div>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar operación..."
                className="pl-9 h-9 text-xs"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              />
            </div>
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 text-[10px] uppercase font-bold text-success">Aprobar Masivo</Button>
                <Button size="sm" variant="outline" className="h-8 text-[10px] uppercase font-bold text-destructive">Rechazar</Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setData(mockApprovalQueue)} className="text-xs">
              <RefreshCw className="size-3.5 mr-1.5" /> Reset Demo
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10">
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Folio / Prioridad</TableHead>
                <TableHead className="text-xs uppercase tracking-wider">Cedente / Pagador</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wider">Valor Nominal</TableHead>
                <TableHead className="text-center text-xs uppercase tracking-wider">Score / Riesgo</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wider">Radicación</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wider">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center">
                    <p className="text-muted-foreground text-sm font-medium">No hay operaciones que coincidan con la búsqueda.</p>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((rec) => {
                  const prio = priorityConfig[rec.priority];
                  const risk = riskConfig[rec.riesgo];
                  return (
                    <TableRow key={rec.id} className="hover:bg-muted/5 group">
                      <TableCell className="px-4">
                        <Checkbox
                          checked={selectedIds.includes(rec.id)}
                          onCheckedChange={() => toggleSelect(rec.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-mono text-[11px] font-bold text-primary">{rec.id}</p>
                          <Badge variant="outline" className={cn("text-[9px] h-4 px-1 py-0 border-none font-bold uppercase", prio.color, prio.bg)}>
                            {prio.label}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5 max-w-[200px]">
                          <p className="text-xs font-bold text-foreground truncate">{rec.cedente}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{rec.deudor}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-foreground tabular-nums">{formatCOP(rec.valorNominal)}</p>
                          <p className="text-[10px] text-muted-foreground tabular-nums">{rec.plazo}d · {rec.tasaSugerida}%</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          <ScoreBar score={rec.scoreCredito} />
                          <span className={cn("text-[9px] font-bold uppercase", risk.color)}>Riesgo {risk.label}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-foreground">{rec.fechaRadicacion}</p>
                          <p className={cn("text-[10px] font-semibold", rec.diasEnCola > 3 ? "text-destructive" : "text-muted-foreground")}>
                            En cola: {rec.diasEnCola}d
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" className="size-8" onClick={() => setSelectedRecord(rec)}>
                            <Eye className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="size-8 text-success hover:text-success hover:bg-success/10" onClick={() => handleApprove(rec.id)}>
                            <CheckCircle2 className="size-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="size-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleReject(rec.id)}>
                            <XCircle className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between p-4 border-t bg-muted/5">
          <p className="text-xs text-muted-foreground font-medium">Analista: <span className="text-foreground">Todos</span></p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                className="size-7"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-3.5" />
              </Button>
              <span className="text-[10px] font-bold mx-2">Página {currentPage} de {totalPages || 1}</span>
              <Button
                variant="outline"
                size="icon-sm"
                className="size-7"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Reusing Detail Component */}
      {selectedRecord && (
        <FactoringOperationDetail
          record={{
            id: selectedRecord.id,
            cedente: selectedRecord.cedente,
            deudor: selectedRecord.deudor,
            valorNominal: selectedRecord.valorNominal,
            valorDesembolsado: selectedRecord.valorNominal * 0.95,
            fechaVencimiento: "2025-06-01",
            status: "aprobado",
            diasRestantes: 60,
            _cobradoPct: 0
          } as unknown as DetailRecord}
          open={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}
