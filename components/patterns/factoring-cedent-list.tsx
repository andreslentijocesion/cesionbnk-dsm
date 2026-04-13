import { useState } from "react";
import { MasterDataGrid } from "../advanced/master-data-grid";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sparkline } from "../advanced/sparkline";
import {
  MoreHorizontal, TrendingUp, TrendingDown, ArrowUpDown,
  ArrowUp, ArrowDown, Building2, CheckCircle2, AlertTriangle,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

type CedentStatus = "activo" | "suspendido" | "en-revision";

interface CedentRecord {
  id: string;
  nombre: string;
  nit: string;
  sector: string;
  ciudad: string;
  operacionesActivas: number;
  operacionesTotales: number;
  valorPortafolio: number;
  tasaCobro: number;
  facturasVencidas: number;
  limiteCredito: number;
  creditoUsado: number;
  status: CedentStatus;
  tendencia: number;
  fechaVinculacion: string;
  analista: string;
  spark: { value: number }[];
}

const makeSpark = (base: number) =>
  Array.from({ length: 8 }, (_, i) => ({
    value: base + Math.sin(i * 1.1) * base * 0.15 + (i / 8) * base * 0.2,
  }));

const mockCedents: CedentRecord[] = [
  {
    id: "CED-001", nombre: "Servicios TI Colombia S.A.S.", nit: "900.123.456-1",
    sector: "Tecnología", ciudad: "Bogotá D.C.",
    operacionesActivas: 12, operacionesTotales: 34, valorPortafolio: 520_000_000,
    tasaCobro: 96.4, facturasVencidas: 0, limiteCredito: 800_000_000, creditoUsado: 65,
    status: "activo", tendencia: +14.2, fechaVinculacion: "2022-03-15", analista: "C. Vargas",
    spark: makeSpark(52),
  },
  {
    id: "CED-002", nombre: "Construcciones Andina S.A.", nit: "800.234.567-2",
    sector: "Construcción", ciudad: "Medellín",
    operacionesActivas: 9, operacionesTotales: 28, valorPortafolio: 370_000_000,
    tasaCobro: 91.2, facturasVencidas: 1, limiteCredito: 600_000_000, creditoUsado: 62,
    status: "activo", tendencia: +6.1, fechaVinculacion: "2021-08-22", analista: "M. Rodríguez",
    spark: makeSpark(37),
  },
  {
    id: "CED-003", nombre: "Industrias Cóndor S.A.S.", nit: "890.345.678-3",
    sector: "Manufactura", ciudad: "Cali",
    operacionesActivas: 7, operacionesTotales: 19, valorPortafolio: 340_000_000,
    tasaCobro: 100, facturasVencidas: 0, limiteCredito: 500_000_000, creditoUsado: 68,
    status: "activo", tendencia: +2.3, fechaVinculacion: "2023-01-10", analista: "A. Torres",
    spark: makeSpark(34),
  },
  {
    id: "CED-004", nombre: "Textiles del Valle Ltda.", nit: "800.456.789-4",
    sector: "Textil", ciudad: "Pereira",
    operacionesActivas: 5, operacionesTotales: 12, valorPortafolio: 185_000_000,
    tasaCobro: 78.5, facturasVencidas: 2, limiteCredito: 300_000_000, creditoUsado: 62,
    status: "en-revision", tendencia: -3.1, fechaVinculacion: "2022-11-05", analista: "M. Rodríguez",
    spark: makeSpark(18),
  },
  {
    id: "CED-005", nombre: "Agropecuaria Los Llanos S.A.", nit: "800.567.890-5",
    sector: "Agropecuario", ciudad: "Villavicencio",
    operacionesActivas: 0, operacionesTotales: 8, valorPortafolio: 78_000_000,
    tasaCobro: 62.0, facturasVencidas: 3, limiteCredito: 200_000_000, creditoUsado: 39,
    status: "suspendido", tendencia: -18.5, fechaVinculacion: "2023-04-20", analista: "A. Torres",
    spark: makeSpark(7),
  },
  {
    id: "CED-006", nombre: "Distribuidora Norte S.A.", nit: "900.678.901-6",
    sector: "Comercio", ciudad: "Barranquilla",
    operacionesActivas: 3, operacionesTotales: 9, valorPortafolio: 145_000_000,
    tasaCobro: 88.9, facturasVencidas: 0, limiteCredito: 250_000_000, creditoUsado: 58,
    status: "activo", tendencia: +5.4, fechaVinculacion: "2023-07-14", analista: "C. Vargas",
    spark: makeSpark(14),
  },
];

const statusCfg: Record<CedentStatus, {
  label: string;
  variant: "outline";
}> = {
  activo:       { label: "Activo",       variant: "outline" },
  "en-revision":{ label: "En revisión",  variant: "outline" },
  suspendido:   { label: "Suspendido",   variant: "outline" },
};

type SortKey = "nombre" | "valorPortafolio" | "tasaCobro" | "creditoUsado" | "tendencia";

// ─── Header Letter Avatar ──────────────────────────────────────────────────────

function LetterAvatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
      <span className="text-2xs font-bold text-primary">{initials}</span>
    </div>
  );
}

// ─── Credit Bar ───────────────────────────────────────────────────────────────

function CreditBar({ used, limit, pct }: { used: number; limit: number; pct: number }) {
  return (
    <div className="min-w-[100px] space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{COP(used * limit / 100).replace("COP ", "$")}</span>
        <span className={cn("font-semibold tabular-nums", pct >= 80 ? "text-warning" : "text-foreground")}>{pct}%</span>
      </div>
      <Progress value={pct} className="h-1.5 bg-muted" indicatorClassName={pct >= 80 ? "bg-warning" : "bg-primary"} />
    </div>
  );
}

// ─── Sortable Head ─────────────────────────────────────────────────────────────

function SortableHead({ col, label, sortKey, sortDir, onSort, className }: {
  col: SortKey; label: string; sortKey: SortKey | null; sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void; className?: string;
}) {
  const active = sortKey === col;
  return (
    <TableHead className={cn("cursor-pointer select-none whitespace-nowrap text-xs", className)} onClick={() => onSort(col)}>
      <span className="inline-flex items-center gap-1 group">
        {label}
        {active && sortDir === "asc"  && <ArrowUp className="h-3 w-3 text-primary" />}
        {active && sortDir === "desc" && <ArrowDown className="h-3 w-3 text-primary" />}
        {!active && <ArrowUpDown className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />}
      </span>
    </TableHead>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringCedentList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>("valorPortafolio");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(1);
  };

  const filtered = mockCedents
    .filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = !q || c.nombre.toLowerCase().includes(q) || c.nit.includes(q) || c.sector.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const av = a[sortKey]; const bv = b[sortKey];
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const rows = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Summary KPIs
  const activos    = mockCedents.filter((c) => c.status === "activo").length;
  const enRevision = mockCedents.filter((c) => c.status === "en-revision").length;
  const suspendidos= mockCedents.filter((c) => c.status === "suspendido").length;

  return (
    <MasterDataGrid
      title="Gestión de Cedentes"
      description="Directorio de empresas cedentes con límites de crédito y estado de portafolio"
      searchQuery={search}
      onSearchChange={(v) => { setSearch(v); setPage(1); }}
      searchPlaceholder="Buscar por nombre, NIT, sector..."
      filterOptions={[
        {
          label: "Estado",
          value: statusFilter,
          options: [
            { label: "Todos", value: "all" },
            { label: "Activo",       value: "activo" },
            { label: "En revisión",  value: "en-revision" },
            { label: "Suspendido",   value: "suspendido" },
          ],
        },
      ]}
      onFilterChange={(_, v) => { setStatusFilter(v); setPage(1); }}
      onResetFilters={() => { setStatusFilter("all"); setSearch(""); setPage(1); }}
      newActionLabel="Nuevo cedente"
      onNewAction={() => {}}
      newActionIcon={<Building2 className="h-4 w-4" />}
      showExport showRefresh showViewOptions={false}
      currentPage={page} totalPages={totalPages} onPageChange={setPage}
      totalItems={filtered.length} itemsPerPage={itemsPerPage}
      startIndex={(page - 1) * itemsPerPage}
      toolbarActions={
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" />{activos} activos</span>
          <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-warning" />{enRevision} revisión</span>
          <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-destructive" />{suspendidos} suspendidos</span>
        </div>
      }
    >
      <div className="overflow-x-auto border-t">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs min-w-[200px]">Cedente</TableHead>
              <TableHead className="text-xs">Sector · Ciudad</TableHead>
              <SortableHead col="valorPortafolio" label="Portafolio" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="text-right" />
              <SortableHead col="tasaCobro" label="Tasa cobro" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortableHead col="creditoUsado" label="Límite usado" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="min-w-[120px]" />
              <TableHead className="text-xs whitespace-nowrap">Ops. activas</TableHead>
              <SortableHead col="tendencia" label="Tendencia" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <TableHead className="text-xs">Analista</TableHead>
              <TableHead className="text-xs">Estado</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                  No se encontraron cedentes con los filtros aplicados.
                </TableCell>
              </TableRow>
            )}
            {rows.map((c) => (
              <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <LetterAvatar name={c.nombre} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate leading-tight">{c.nombre}</p>
                      <p className="text-xs text-muted-foreground font-mono">{c.nit}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-foreground">{c.sector}</p>
                  <p className="text-xs text-muted-foreground">{c.ciudad}</p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-xs font-mono font-semibold tabular-nums">
                    {new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(c.valorPortafolio)}
                  </div>
                  <div className="h-6 -mr-1 mt-0.5">
                    <Sparkline data={c.spark} color={c.tendencia >= 0 ? "var(--success)" : "var(--destructive)"} height={24} showTrend={false} />
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "text-xs font-semibold tabular-nums",
                    c.tasaCobro >= 90 ? "text-success" :
                    c.tasaCobro >= 75 ? "text-warning" : "text-destructive"
                  )}>
                    {c.tasaCobro.toFixed(1)}%
                  </span>
                  {c.facturasVencidas > 0 && (
                    <p className="text-xs text-destructive">{c.facturasVencidas} vencida{c.facturasVencidas > 1 ? "s" : ""}</p>
                  )}
                </TableCell>
                <TableCell>
                  <CreditBar
                    used={c.creditoUsado}
                    limit={c.limiteCredito}
                    pct={c.creditoUsado}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">{c.operacionesActivas}</span>
                    <span className="text-xs text-muted-foreground">/ {c.operacionesTotales} total</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {c.tendencia >= 0
                      ? <TrendingUp className="h-3.5 w-3.5 text-success" />
                      : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                    <span className={cn("text-xs font-semibold tabular-nums", c.tendencia >= 0 ? "text-success" : "text-destructive")}>
                      {c.tendencia > 0 ? "+" : ""}{c.tendencia}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{c.analista}</TableCell>
                <TableCell>
                  <Badge variant={statusCfg[c.status].variant} className="text-xs whitespace-nowrap">
                    {statusCfg[c.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">{c.id}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-xs">Ver perfil</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Ver operaciones</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs">Ajustar límite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {c.status === "activo"
                        ? <DropdownMenuItem className="text-xs text-warning">Poner en revisión</DropdownMenuItem>
                        : <DropdownMenuItem className="text-xs text-success">Reactivar</DropdownMenuItem>}
                      <DropdownMenuItem className="text-xs text-destructive">Suspender</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MasterDataGrid>
  );
}
