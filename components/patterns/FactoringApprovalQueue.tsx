/* eslint-disable */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";

import { Checkbox } from "../ui/Checkbox";
import { Progress } from "../ui/Progress";
import { Input } from "../ui/Input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  CheckCircle2, XCircle, Search, Clock, DollarSign,
  AlertTriangle, FileText, ChevronDown, ChevronUp, Eye,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 10;
import { cn } from "../ui/utils";
import { toast } from "sonner";
import { FactoringOperationDetail, FactoringRecord } from "./FactoringOperationDetail";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

type Priority = "alta" | "media" | "baja";
type RiskLevel = "bajo" | "medio" | "alto";

interface QueueRecord {
  id: string;
  cedente: string;
  nitCedente: string;
  deudor: string;
  valorNominal: number;
  tasaSugerida: number;
  plazo: number;
  fechaRadicacion: string;
  diasEnCola: number;
  priority: Priority;
  riesgo: RiskLevel;
  scoreCredito: number;
  analista: string;
}

const mockQueue: QueueRecord[] = [
  {
    id: "FCT-2025-009", cedente: "Alimentos del Pacífico S.A.", nitCedente: "900.871.234-5",
    deudor: "Grupo Éxito S.A.", valorNominal: 320_000_000, tasaSugerida: 1.9, plazo: 60,
    fechaRadicacion: "2025-03-04", diasEnCola: 3, priority: "alta", riesgo: "bajo",
    scoreCredito: 87, analista: "M. Rodríguez",
  },
  {
    id: "FCT-2025-010", cedente: "Tecnología Andes S.A.S.", nitCedente: "901.234.567-8",
    deudor: "Ecopetrol S.A.", valorNominal: 480_000_000, tasaSugerida: 1.7, plazo: 90,
    fechaRadicacion: "2025-03-03", diasEnCola: 4, priority: "alta", riesgo: "bajo",
    scoreCredito: 92, analista: "C. Vargas",
  },
  {
    id: "FCT-2025-011", cedente: "Distribuidora Centro S.A.", nitCedente: "800.345.678-9",
    deudor: "Almacenes La 14 S.A.", valorNominal: 95_000_000, tasaSugerida: 2.3, plazo: 45,
    fechaRadicacion: "2025-03-05", diasEnCola: 2, priority: "media", riesgo: "medio",
    scoreCredito: 71, analista: "M. Rodríguez",
  },
  {
    id: "FCT-2025-012", cedente: "Confecciones Bogotá Ltda.", nitCedente: "830.456.789-0",
    deudor: "Arturo Calle S.A.S.", valorNominal: 58_000_000, tasaSugerida: 2.6, plazo: 30,
    fechaRadicacion: "2025-03-06", diasEnCola: 1, priority: "baja", riesgo: "medio",
    scoreCredito: 68, analista: "A. Torres",
  },
  {
    id: "FCT-2025-013", cedente: "Logística Express S.A.S.", nitCedente: "901.567.890-1",
    deudor: "Rappi Colombia S.A.S.", valorNominal: 143_000_000, tasaSugerida: 2.1, plazo: 60,
    fechaRadicacion: "2025-03-02", diasEnCola: 5, priority: "alta", riesgo: "bajo",
    scoreCredito: 79, analista: "C. Vargas",
  },
];

const priorityConfig: Record<Priority, { label: string; color: string; bg: string }> = {
  alta:  { label: "Alta",  color: "text-destructive", bg: "bg-destructive/10" },
  media: { label: "Media", color: "text-warning",     bg: "bg-warning/10"     },
  baja:  { label: "Baja",  color: "text-success",     bg: "bg-success/10"     },
};

const riskConfig: Record<RiskLevel, { label: string; color: string }> = {
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
      <span className={cn(
        "text-xs font-semibold tabular-nums w-6",
        score >= 80 ? "text-success" : score >= 65 ? "text-warning" : "text-destructive"
      )}>{score}</span>
    </div>
  );
}

// ─── Summary KPIs ─────────────────────────────────────────────────────────────

function QueueKpis({ data }: { data: QueueRecord[] }) {
  const total = data.length;
  const totalValue = data.reduce((s, r) => s + r.valorNominal, 0);
  const altas = data.filter((r) => r.priority === "alta").length;
  const avgDays = Math.round(data.reduce((s, r) => s + r.diasEnCola, 0) / data.length);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "En cola",         value: `${total} ops`,     icon: <Clock className="size-4 text-primary" />,      bg: "bg-primary/10" },
        { label: "Valor total",     value: new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(totalValue), icon: <DollarSign className="size-4 text-secondary" />, bg: "bg-secondary/10" },
        { label: "Prioridad alta",  value: `${altas} ops`,     icon: <AlertTriangle className="size-4 text-destructive" />, bg: "bg-destructive/10" },
        { label: "Días prom. cola", value: `${avgDays} días`,  icon: <FileText className="size-4 text-muted-foreground" />, bg: "bg-muted" },
      ].map((k) => (
        <Card key={k.label} className="border shadow-sm">
          <CardContent className="p-3 flex items-center gap-3">
            <div className={cn("size-8 rounded-lg flex items-center justify-center flex-shrink-0", k.bg)}>
              {k.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.label}</p>
              <p className="text-sm font-bold tabular-nums">{k.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringApprovalQueue() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [detailRecord, setDetailRecord] = useState<FactoringRecord | null>(null);
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});
  const [currentPage, setCurrentPage] = useState(1);

  const rows = mockQueue
    .filter((r) => {
      const q = search.toLowerCase();
      return !q || r.cedente.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.deudor.toLowerCase().includes(q);
    })
    .sort((a, b) => sortDir === "desc" ? b.valorNominal - a.valorNominal : a.valorNominal - b.valorNominal)
    .filter((r) => !decisions[r.id]);

  const toggleAll = () => {
    if (selected.size === rows.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(rows.map((r) => r.id)));
    }
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const decide = (ids: string[], decision: "approved" | "rejected") => {
    const next = { ...decisions };
    ids.forEach((id) => (next[id] = decision));
    setDecisions(next);
    setSelected(new Set());
    if (ids.length === 1) {
      decision === "approved"
        ? toast.success("Operación aprobada")
        : toast.error("Operación rechazada");
    } else {
      decision === "approved"
        ? toast.success(`${ids.length} operaciones aprobadas`)
        : toast.error(`${ids.length} operaciones rechazadas`);
    }
  };

  const openDetail = (r: QueueRecord) => {
    setDetailRecord({
      id: r.id, cedente: r.cedente, deudor: r.deudor,
      valorNominal: r.valorNominal, valorDesembolsado: 0,
      tasaDescuento: r.tasaSugerida, fechaInicio: r.fechaRadicacion,
      fechaVencimiento: new Date(new Date(r.fechaRadicacion).getTime() + r.plazo * 86_400_000).toISOString().split("T")[0],
      diasRestantes: r.plazo, cobradoPct: 0, status: "aprobado",
    });
  };

  const processed = Object.keys(decisions).length;
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageRows = rows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <QueueKpis data={mockQueue} />

      {/* Main card */}
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Cola de aprobación</CardTitle>
              <CardDescription className="text-xs">
                {rows.length} operaciones pendientes · {processed > 0 && `${processed} procesadas en esta sesión`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 .5 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  aria-label="Buscar operaciones"
                  className="pl-8 h-9 w-48 text-sm"
                  value={search}
                  onChange={(e: any) => setSearch(e.target.value)}
                />
              </div>
              {selected.size > 0 && (
                <>
                  <Button size="sm" className="h-9 bg-success hover:bg-success/90" onClick={() => decide([...selected], "approved")}>
                    <CheckCircle2 className="size-3.5 .5 mr-1" /> Aprobar ({selected.size})
                  </Button>
                  <Button size="sm" variant="destructive" className="h-9" onClick={() => decide([...selected], "rejected")}>
                    <XCircle className="size-3.5 .5 mr-1" /> Rechazar ({selected.size})
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-10 px-4">
                  <Checkbox
                    checked={rows.length > 0 && selected.size === rows.length}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="text-xs whitespace-nowrap">Prioridad</TableHead>
                <TableHead className="text-xs">Folio</TableHead>
                <TableHead className="text-xs min-w-[160px]">Cedente</TableHead>
                <TableHead className="text-xs">Deudor</TableHead>
                <TableHead
                  className="text-xs text-right cursor-pointer select-none whitespace-nowrap"
                  onClick={() => setSortDir((d) => d === "desc" ? "asc" : "desc")}
                >
                  <span className="inline-flex items-center gap-1">
                    Valor nominal
                    {sortDir === "desc" ? <ChevronDown className="size-3" /> : <ChevronUp className="size-3" />}
                  </span>
                </TableHead>
                <TableHead className="text-xs">Tasa / Plazo</TableHead>
                <TableHead className="text-xs">Score</TableHead>
                <TableHead className="text-xs">Riesgo</TableHead>
                <TableHead className="text-xs whitespace-nowrap">Días en cola</TableHead>
                <TableHead className="text-xs">Analista</TableHead>
                <TableHead className="text-right text-xs w-28">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="size-8 text-success" />
                      <p className="text-sm font-medium">Cola vacía — todas las operaciones procesadas</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((r) => {
                  const pCfg = priorityConfig[r.priority];
                  const rCfg = riskConfig[r.riesgo];
                  return (
                    <TableRow key={r.id} className={cn("transition-colors", selected.has(r.id) && "bg-primary/5")}>
                      <TableCell className="px-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggleOne(r.id)} />
                      </TableCell>
                      <TableCell>
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", pCfg.color, pCfg.bg)}>
                          {pCfg.label}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                      <TableCell>
                        <div className="text-sm font-medium leading-tight">{r.cedente}</div>
                        <div className="text-xs text-muted-foreground">{r.nitCedente}</div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{r.deudor}</TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">{COP(r.valorNominal)}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        <span>{r.tasaSugerida}% MV</span>
                        <span className="text-muted-foreground"> · {r.plazo}d</span>
                      </TableCell>
                      <TableCell><ScoreBar score={r.scoreCredito} /></TableCell>
                      <TableCell className={cn("text-xs font-semibold", rCfg.color)}>{rCfg.label}</TableCell>
                      <TableCell>
                        <span className={cn("text-xs tabular-nums font-medium", r.diasEnCola >= 4 ? "text-destructive" : r.diasEnCola >= 2 ? "text-warning" : "text-muted-foreground")}>
                          {r.diasEnCola}d
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.analista}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost" size="icon" className="size-7"
                            aria-label="Ver detalle de operación"
                            onClick={() => openDetail(r)}
                          >
                            <Eye className="size-3.5 .5" />
                          </Button>
                          <Button
                            size="icon" className="size-7 bg-success/10 hover:bg-success/20 text-success border-0"
                            variant="outline"
                            aria-label="Aprobar operación"
                            onClick={() => decide([r.id], "approved")}
                          >
                            <CheckCircle2 className="size-3.5 .5" />
                          </Button>
                          <Button
                            size="icon" className="size-7 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0"
                            variant="outline"
                            aria-label="Rechazar operación"
                            onClick={() => decide([r.id], "rejected")}
                          >
                            <XCircle className="size-3.5 .5" />
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

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {rows.length} operaciones · página {safePage} de {totalPages}
            {processed > 0 && ` · ${processed} procesadas en esta sesión`}
          </span>
          <div className="flex items-center gap-1">
            {processed > 0 && (
              <Button variant="ghost" size="sm" className="text-xs h-8 mr-2" onClick={() => setDecisions({})}>
                Restablecer sesión
              </Button>
            )}
            <Button
              variant="outline" size="icon" className="size-8"
              aria-label="Página anterior"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="size-3.5 .5" />
            </Button>
            <Button
              variant="outline" size="icon" className="size-8"
              aria-label="Página siguiente"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="size-3.5 .5" />
            </Button>
          </div>
        </div>
      </Card>

      <FactoringOperationDetail
        record={detailRecord}
        open={!!detailRecord}
        onClose={() => setDetailRecord(null)}
      />
    </div>
  );
}
