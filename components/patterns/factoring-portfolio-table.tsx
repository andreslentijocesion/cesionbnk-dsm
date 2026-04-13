import { useState, useMemo } from "react";
import { FactoringOperationDetail, FactoringRecord as DetailRecord } from "./factoring-operation-detail";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ProgressWithRange } from "../ui/progress-with-range";
import { MasterDataGrid } from "../advanced/master-data-grid";
import { Sparkline, SparklineData } from "../advanced/sparkline";
import {
  MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown,
  TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type FactoringStatus =
  | "aprobado"
  | "desembolsado"
  | "en-cobro"
  | "cobrado"
  | "vencido"
  | "rechazado";

interface FactoringRecord {
  id: string;
  cedente: string;
  deudor: string;
  valorNominal: number;
  valorDesembolsado: number;
  tasaDescuento: number;
  fechaInicio: string;
  fechaVencimiento: string;
  diasRestantes: number;
  _cobradoPct: number;
  status: FactoringStatus;
}

type SortKey = "cedente" | "valorNominal" | "fechaVencimiento" | "diasRestantes" | "_cobradoPct";
type SortDir = "asc" | "desc";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockData: FactoringRecord[] = [
  {
    id: "FCT-2025-001", cedente: "Construcciones Andina S.A.", deudor: "Banco de Bogotá S.A.",
    valorNominal: 185_000_000, valorDesembolsado: 175_750_000, tasaDescuento: 1.8,
    fechaInicio: "2025-01-15", fechaVencimiento: "2025-03-15", diasRestantes: 8,
    _cobradoPct: 82, status: "en-cobro",
  },
  {
    id: "FCT-2025-002", cedente: "Textiles del Valle Ltda.", deudor: "Almacenes Éxito S.A.",
    valorNominal: 92_500_000, valorDesembolsado: 87_875_000, tasaDescuento: 2.1,
    fechaInicio: "2025-01-20", fechaVencimiento: "2025-04-20", diasRestantes: 44,
    _cobradoPct: 45, status: "desembolsado",
  },
  {
    id: "FCT-2025-003", cedente: "Industrias Cóndor S.A.S.", deudor: "Avianca S.A.",
    valorNominal: 340_000_000, valorDesembolsado: 323_000_000, tasaDescuento: 1.5,
    fechaInicio: "2024-12-01", fechaVencimiento: "2025-03-01", diasRestantes: -6,
    _cobradoPct: 100, status: "cobrado",
  },
  {
    id: "FCT-2025-004", cedente: "Agropecuaria Los Llanos S.A.", deudor: "Grupo Nutresa S.A.",
    valorNominal: 78_000_000, valorDesembolsado: 74_100_000, tasaDescuento: 2.4,
    fechaInicio: "2025-01-08", fechaVencimiento: "2025-02-28", diasRestantes: -8,
    _cobradoPct: 0, status: "vencido",
  },
  {
    id: "FCT-2025-005", cedente: "Servicios TI Colombia S.A.S.", deudor: "Ecopetrol S.A.",
    valorNominal: 520_000_000, valorDesembolsado: 494_000_000, tasaDescuento: 1.6,
    fechaInicio: "2025-02-01", fechaVencimiento: "2025-05-01", diasRestantes: 55,
    _cobradoPct: 20, status: "desembolsado",
  },
  {
    id: "FCT-2025-006", cedente: "Distribuidora Norte S.A.", deudor: "Terpel S.A.",
    valorNominal: 145_000_000, valorDesembolsado: 0, tasaDescuento: 2.0,
    fechaInicio: "2025-03-01", fechaVencimiento: "2025-06-01", diasRestantes: 86,
    _cobradoPct: 0, status: "aprobado",
  },
  {
    id: "FCT-2025-007", cedente: "Muebles Roble S.A.S.", deudor: "Ikea Colombia S.A.",
    valorNominal: 55_000_000, valorDesembolsado: 52_250_000, tasaDescuento: 2.8,
    fechaInicio: "2025-01-10", fechaVencimiento: "2025-03-10", diasRestantes: 3,
    _cobradoPct: 95, status: "en-cobro",
  },
  {
    id: "FCT-2025-008", cedente: "Pharma Colombia Ltda.", deudor: "Compensar EPS",
    valorNominal: 210_000_000, valorDesembolsado: 0, tasaDescuento: 0,
    fechaInicio: "2025-02-15", fechaVencimiento: "2025-05-15", diasRestantes: 69,
    _cobradoPct: 0, status: "rechazado",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

const statusConfig: Record<FactoringStatus, {
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

const progressColor = (pct: number, status: FactoringStatus) => {
  if (status === "cobrado") return "bg-success";
  if (status === "vencido") return "bg-destructive";
  if (pct >= 80) return "bg-warning";
  return "bg-primary";
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function InlineProgress({ record }: { record: FactoringRecord }) {
  const { fechaInicio, fechaVencimiento, status } = record;
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

function DaysRemainingBadge({ days, status }: { days: number; status: FactoringStatus }) {
  if (status === "cobrado") return <span className="text-xs text-success font-medium">✓ Cobrado</span>;
  if (status === "rechazado") return <span className="text-xs text-muted-foreground">—</span>;
  if (status === "aprobado") return <span className="text-xs text-muted-foreground">{days}d</span>;
  if (days < 0) return (
    <span className="text-xs font-medium text-destructive">{Math.abs(days)}d vencido</span>
  );
  if (days <= 7) return (
    <span className="text-xs font-medium text-warning">{days}d</span>
  );
  return <span className="text-xs text-muted-foreground tabular-nums">{days}d</span>;
}

function ActionMenu({ record }: { record: FactoringRecord }) {
  const actions: Record<FactoringStatus, { label: string; destructive?: boolean }[]> = {
    aprobado:     [{ label: "Ver detalle" }, { label: "Desembolsar" }, { label: "Rechazar", destructive: true }],
    desembolsado: [{ label: "Ver detalle" }, { label: "Registrar pago" }, { label: "Marcar cobrado" }],
    "en-cobro":   [{ label: "Ver detalle" }, { label: "Registrar cobro" }, { label: "Marcar vencido", destructive: true }],
    cobrado:      [{ label: "Ver detalle" }, { label: "Descargar soporte" }],
    vencido:      [{ label: "Ver detalle" }, { label: "Iniciar gestión cobranza" }, { label: "Marcar cobrado" }],
    rechazado:    [{ label: "Ver detalle" }, { label: "Reactivar" }],
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">{record.id}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions[record.status].map((a) => (
          <DropdownMenuItem
            key={a.label}
            className={cn(a.destructive && "text-destructive focus:text-destructive")}
          >
            {a.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── KPI Strip ────────────────────────────────────────────────────────────────

const sparkSeed = (base: number, len = 8): SparklineData[] =>
  Array.from({ length: len }, (_, i) => ({
    value: base + Math.sin(i * 0.9) * base * 0.12 + (i / len) * base * 0.15,
  }));

function KpiStrip({ data }: { data: FactoringRecord[] }) {
  const active   = data.filter((r) => ["desembolsado", "en-cobro"].includes(r.status));
  const cobrado  = data.filter((r) => r.status === "cobrado");
  const vencido  = data.filter((r) => r.status === "vencido");
  const aprobado = data.filter((r) => r.status === "aprobado");

  const totalActivo   = active.reduce((s, r) => s + r.valorNominal, 0);
  const totalCobrado  = cobrado.reduce((s, r) => s + r.valorNominal, 0);
  const totalVencido  = vencido.reduce((s, r) => s + r.valorNominal, 0);
  const totalAprobado = aprobado.reduce((s, r) => s + r.valorNominal, 0);

  const kpis = [
    {
      label: "Portafolio activo",
      value: COP(totalActivo),
      change: +8.3,
      icon: <DollarSign className="h-4 w-4 text-primary" />,
      spark: sparkSeed(totalActivo / 1e6),
      color: "var(--primary)",
    },
    {
      label: "Por desembolsar",
      value: COP(totalAprobado),
      change: +12.1,
      icon: <Clock className="h-4 w-4 text-secondary" />,
      spark: sparkSeed(totalAprobado / 1e6),
      color: "var(--secondary)",
    },
    {
      label: "Cobrado (acum.)",
      value: COP(totalCobrado),
      change: +5.7,
      icon: <CheckCircle2 className="h-4 w-4 text-success" />,
      spark: sparkSeed(totalCobrado / 1e6),
      color: "var(--success)",
    },
    {
      label: "Vencido",
      value: COP(totalVencido),
      change: -2.1,
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
      spark: sparkSeed(totalVencido / 1e6),
      color: "var(--destructive)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border-b">
      {kpis.map((k) => (
        <div key={k.label} className="bg-background px-4 pt-3 pb-2 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{k.label}</span>
            {k.icon}
          </div>
          <div className="font-semibold text-sm text-foreground font-mono tabular-nums leading-tight">
            {k.value}
          </div>
          <div className="flex items-center gap-1">
            {k.change > 0
              ? <TrendingUp className="h-3 w-3 text-success" />
              : <TrendingDown className="h-3 w-3 text-destructive" />}
            <span className={cn("text-xs font-medium font-mono tabular-nums", k.change > 0 ? "text-success" : "text-destructive")}>
              {k.change > 0 ? "+" : ""}{k.change}%
            </span>
            <span className="text-xs text-muted-foreground">vs mes anterior</span>
          </div>
          <div className="h-8 -mx-1">
            <Sparkline data={k.spark} color={k.color} height={32} showTrend={false} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Sortable Header ──────────────────────────────────────────────────────────

function SortableHead({
  col, label, sortKey, sortDir, onSort, className,
}: {
  col: SortKey; label: string; sortKey: SortKey | null; sortDir: SortDir;
  onSort: (k: SortKey) => void; className?: string;
}) {
  const active = sortKey === col;
  return (
    <TableHead
      className={cn("cursor-pointer select-none whitespace-nowrap", className)}
      onClick={() => onSort(col)}
    >
      <span className="inline-flex items-center gap-1 text-xs group">
        {label}
        {active && sortDir === "asc"  && <ArrowUp className="h-3 w-3 text-primary" />}
        {active && sortDir === "desc" && <ArrowDown className="h-3 w-3 text-primary" />}
        {!active && <ArrowUpDown className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />}
      </span>
    </TableHead>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringPortfolioTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>("fechaVencimiento");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedRecord, setSelectedRecord] = useState<DetailRecord | null>(null);
  const itemsPerPage = 6;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let rows = mockData.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.cedente.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.deudor.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        let av: number | string = a[sortKey];
        let bv: number | string = b[sortKey];
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const rows = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <MasterDataGrid
      title="Portafolio de Factoring"
      description="Gestión de facturas cedidas, desembolsos y cobranza"
      searchQuery={search}
      onSearchChange={(v) => { setSearch(v); setPage(1); }}
      searchPlaceholder="Buscar cedente, folio, deudor..."
      filterOptions={[
        {
          label: "Estado",
          value: statusFilter,
          options: [
            { label: "Todos los estados", value: "all" },
            { label: "Aprobado",     value: "aprobado" },
            { label: "Desembolsado", value: "desembolsado" },
            { label: "En cobro",     value: "en-cobro" },
            { label: "Cobrado",      value: "cobrado" },
            { label: "Vencido",      value: "vencido" },
            { label: "Rechazado",    value: "rechazado" },
          ],
        },
      ]}
      onFilterChange={(_, v) => { setStatusFilter(v); setPage(1); }}
      onResetFilters={() => { setStatusFilter("all"); setSearch(""); setPage(1); }}
      showRefresh
      showExport
      showViewOptions={false}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      totalItems={filtered.length}
      itemsPerPage={itemsPerPage}
      startIndex={startIndex}
    >
      {/* KPI Strip */}
      <KpiStrip data={mockData} />

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="whitespace-nowrap text-xs w-[100px]">Folio</TableHead>
              <SortableHead col="cedente" label="Cedente" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="min-w-[180px] text-xs" />
              <TableHead className="text-xs whitespace-nowrap">Deudor</TableHead>
              <SortableHead col="valorNominal" label="Valor nominal" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="text-right text-xs" />
              <TableHead className="text-xs whitespace-nowrap">Tasa</TableHead>
              <SortableHead col="_cobradoPct" label="Emisión / Vencimiento" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="min-w-[160px] text-xs" />
              <SortableHead col="diasRestantes" label="Días" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="text-xs" />
              <TableHead className="text-xs">Estado</TableHead>
              <TableHead className="text-right text-xs w-10">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10 text-muted-foreground text-sm">
                  No se encontraron registros con los filtros aplicados.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setSelectedRecord(r as unknown as DetailRecord)}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                  <TableCell>
                    <div className="text-sm font-medium leading-tight">{r.cedente}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{r.deudor}</TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums">
                    {COP(r.valorNominal)}
                  </TableCell>
                  <TableCell className="text-sm font-mono tabular-nums text-muted-foreground">
                    {r.tasaDescuento > 0 ? `${r.tasaDescuento}% MV` : "—"}
                  </TableCell>
                  <TableCell>
                    <InlineProgress record={r} />
                  </TableCell>
                  <TableCell>
                    <DaysRemainingBadge days={r.diasRestantes} status={r.status} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[r.status].variant} className="whitespace-nowrap text-xs">
                      {statusConfig[r.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionMenu record={r} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </MasterDataGrid>

      <FactoringOperationDetail
        record={selectedRecord}
        open={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
}
