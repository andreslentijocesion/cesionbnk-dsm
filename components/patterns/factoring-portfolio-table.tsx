import { useState, useMemo } from "react";
import { FactoringOperationDetail, FactoringRecord as DetailRecord } from "./factoring-operation-detail";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ProgressWithRange } from "../ui/ProgressWithRange";
import { MasterDataGrid } from "../advanced/master-data-grid";
import { Card, CardContent } from "../ui/Card";
import {
  MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  TrendingUp, DollarSign, Clock, AlertTriangle, Download,
} from "lucide-react";
import { cn, formatCOP } from "../../lib/utils";
import { FactoringRecord } from "./types/factoring.types";
import { mockPortfolioData } from "./mocks/factoring-portfolio-table.mock";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "cedente" | "valorNominal" | "fechaVencimiento" | "diasRestantes";
type SortDir = "asc" | "desc";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig: Record<string, {
  label: string;
  variant: "success-soft-outline" | "warning-soft-outline" | "info-soft-outline" |
           "destructive-soft-outline" | "neutral-soft-outline" | "secondary-soft-outline";
}> = {
  aprobado:     { label: "Aprobado",    variant: "info-soft-outline" },
  desembolsado: { label: "Desembolsado", variant: "secondary-soft-outline" },
  "en-cobro":   { label: "En cobro",    variant: "warning-soft-outline" },
  cobrado:      { label: "Cobrado",     variant: "success-soft-outline" },
  vencido:      { label: "Vencido",     variant: "destructive-soft-outline" },
  rechazado:    { label: "Rechazado",   variant: "neutral-soft-outline" },
};

const progressColor = (pct: number, status: string) => {
  if (status === "cobrado") return "bg-success";
  if (status === "vencido") return "bg-destructive";
  if (pct >= 80) return "bg-warning";
  return "bg-primary";
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InlineProgress({ record }: { record: FactoringRecord }) {
  const { fechaInicio = "2025-01-01", fechaVencimiento, status } = record;
  const start = new Date(fechaInicio);
  const end = new Date(fechaVencimiento);
  const totalDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000));
  const today = new Date("2025-03-07");
  const elapsed = Math.round((today.getTime() - start.getTime()) / 86_400_000);
  const timePct = Math.min(100, Math.max(0, Math.round((elapsed / totalDays) * 100)));

  const displayPct = status === "cobrado" ? 100 : timePct;
  const barColor = progressColor(timePct, status);

  const fmt = (d: Date) =>
    d.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });

  return (
    <ProgressWithRange
      value={displayPct}
      from={fmt(start)}
      to={fmt(end)}
      barClassName="h-1.5 bg-muted"
      indicatorClassName={barColor}
      className="min-w-[148px]"
    />
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function FactoringPortfolioTable() {
  const [data] = useState<FactoringRecord[]>(mockPortfolioData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "fechaVencimiento", dir: "asc" });

  const [selectedRecord, setSelectedRecord] = useState<FactoringRecord | null>(null);

  // Filter & Sort Logic
  const filteredData = useMemo(() => {
    let result = [...data];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(r =>
        r.cedente.toLowerCase().includes(s) ||
        r.deudor.toLowerCase().includes(s) ||
        r.id.toLowerCase().includes(s)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(r => r.status === statusFilter);
    }

    result.sort((a: any, b: any) => {
      const va = a[sort.key] ?? 0;
      const vb = b[sort.key] ?? 0;
      if (va < vb) return sort.dir === "asc" ? -1 : 1;
      if (va > vb) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, search, statusFilter, sort]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: SortKey) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc"
    }));
  };

  const SortIcon = ({ sKey }: { sKey: SortKey }) => {
    if (sort.key !== sKey) return <ArrowUpDown className="ml-2 size-3.5 opacity-50" />;
    return sort.dir === "asc"
      ? <ArrowUp className="ml-2 size-3.5 text-primary" />
      : <ArrowDown className="ml-2 size-3.5 text-primary" />;
  };

  // KPI Calculations
  const totalNominal = useMemo(() => filteredData.reduce((acc, r) => acc + (r.valorNominal ?? 0), 0), [filteredData]);
  const avgTasa = useMemo(() => filteredData.reduce((acc, r) => acc + (r.tasaDescuento ?? 0), 0) / (filteredData.length || 1), [filteredData]);
  const inMoraCount = useMemo(() => filteredData.filter(r => r.status === "vencido").length, [filteredData]);

  const kpis = [
    { title: "Valor Total", value: formatCOP(totalNominal, true), icon: <DollarSign className="size-4 text-primary" />, trend: "+12%" },
    { title: "Tasa Media", value: `${avgTasa.toFixed(2)}%`, icon: <TrendingUp className="size-4 text-secondary" />, trend: "-0.05%" },
    { title: "Operaciones", value: filteredData.length.toString(), icon: <Clock className="size-4 text-info" />, trend: "+4" },
    { title: "En Mora", value: inMoraCount.toString(), icon: <AlertTriangle className="size-4 text-destructive" />, trend: "-2", destructive: true },
  ];

  return (
    <div className="space-y-6">
      {/* Mini KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="border shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
                <p className="text-xl font-bold text-foreground tabular-nums">{kpi.value}</p>
              </div>
              <div className={cn("p-2 rounded-lg bg-muted/50", kpi.destructive && "bg-destructive/5")}>
                {kpi.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <MasterDataGrid
        title="Portafolio de Factoring"
        description="Gestión integral de facturas vigentes y en recaudo."
        searchQuery={search}
        onSearchChange={(v: string) => { setSearch(v); setPage(1); }}
        searchPlaceholder="Buscar por cedente, pagador o folio..."
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filteredData.length}
        toolbarActions={
          <div className="flex items-center gap-2">
            <select
              className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <option value="all">Todos los estados</option>
              <option value="aprobado">Aprobado</option>
              <option value="desembolsado">Desembolsado</option>
              <option value="en-cobro">En cobro</option>
              <option value="cobrado">Cobrado</option>
              <option value="vencido">Vencido</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" /> Exportar
            </Button>
          </div>
        }
      >
        <div className="rounded-md border border-border/60 overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[100px] text-xs uppercase tracking-wider">Folio</TableHead>
                <TableHead className="cursor-pointer hover:text-foreground transition-colors group text-xs uppercase tracking-wider" onClick={() => handleSort("cedente")}>
                  <div className="flex items-center">Participantes <SortIcon sKey="cedente" /></div>
                </TableHead>
                <TableHead className="text-right cursor-pointer hover:text-foreground transition-colors group text-xs uppercase tracking-wider" onClick={() => handleSort("valorNominal")}>
                  <div className="flex items-center justify-end">Valor <SortIcon sKey="valorNominal" /></div>
                </TableHead>
                <TableHead className="text-right cursor-pointer hover:text-foreground transition-colors group text-xs uppercase tracking-wider" onClick={() => handleSort("fechaVencimiento")}>
                  <div className="flex items-center justify-end">Vencimiento <SortIcon sKey="fechaVencimiento" /></div>
                </TableHead>
                <TableHead className="w-[200px] text-xs uppercase tracking-wider">Tiempo / Progreso</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wider">Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((rec) => (
                <TableRow key={rec.id} className="hover:bg-muted/10 group cursor-pointer transition-colors" onClick={() => setSelectedRecord(rec)}>
                  <TableCell className="font-mono text-xs font-semibold text-primary">{rec.id}</TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-foreground line-clamp-1">{rec.cedente}</p>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="neutral-soft" className="text-[9px] h-3.5 px-1 py-0 uppercase">Pagador</Badge>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{rec.deudor}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-foreground tabular-nums">{formatCOP(rec.valorNominal ?? 0)}</p>
                      <p className="text-[10px] text-muted-foreground tabular-nums">Tasa: {rec.tasaDescuento}%</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-foreground tabular-nums">{rec.fechaVencimiento}</p>
                      <p className={cn("text-[10px] font-bold uppercase",
                        (rec.diasRestantes ?? 0) < 0 ? "text-destructive" : (rec.diasRestantes ?? 0) < 15 ? "text-warning" : "text-success")}>
                        {(rec.diasRestantes ?? 0) < 0 ? `Hace ${Math.abs(rec.diasRestantes ?? 0)} días` : `En ${(rec.diasRestantes ?? 0)} días`}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <InlineProgress record={rec} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusConfig[rec.status]?.variant ?? "neutral-soft-outline"} className="text-[10px] font-bold h-5">
                      {statusConfig[rec.status]?.label ?? rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedRecord(rec)}>Ver Detalle</DropdownMenuItem>
                        <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Notificación</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Anular Operación</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MasterDataGrid>

      {/* Detail Drawer */}
      {selectedRecord && (
        <FactoringOperationDetail
          record={{
            id: selectedRecord.id,
            cedente: selectedRecord.cedente,
            deudor: selectedRecord.deudor,
            valorNominal: selectedRecord.valorNominal ?? 0,
            valorDesembolsado: selectedRecord.valorDesembolsado ?? 0,
            fechaVencimiento: selectedRecord.fechaVencimiento,
            status: selectedRecord.status === "en-cobro" ? "vigente" : "cobrada",
            diasRestantes: selectedRecord.diasRestantes ?? 0,
            _cobradoPct: selectedRecord._cobradoPct ?? 0
          } as unknown as DetailRecord}
          open={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
}
