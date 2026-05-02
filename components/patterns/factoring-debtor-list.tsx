 
/* eslint-disable */
import { useState, useMemo } from "react";
import { MasterDataGrid } from "../advanced/master-data-grid";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Progress } from "../ui/Progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Sparkline } from "../advanced/sparkline";
import {
  MoreHorizontal, ArrowUp, ArrowDown, ArrowUpDown,
  TrendingUp, TrendingDown, Shield, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { cn } from "../../lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────



type RiskRating = "AAA" | "AA" | "A" | "BBB" | "BB" | "B";
type DebtorStatus = "activo" | "observacion" | "restringido";

interface DebtorRecord {
  id: string;
  nombre: string;
  nit: string;
  sector: string;
  ciudad: string;
  exposicionTotal: number;
  limiteExposicion: number;
  exposicionPct: number;
  tasaPago: number;
  diasPromPago: number;
  operacionesActivas: number;
  calificacion: RiskRating;
  status: DebtorStatus;
  tendencia: number;
  facturasVencidas: number;
  spark: { value: number }[];
}

const makeSpark = (base: number, dir: 1 | -1 = 1) =>
  Array.from({ length: 8 }, (_, i) => ({ value: base + dir * (i / 8) * base * 0.25 + Math.sin(i) * base * 0.08 }));

const mockDebtors: DebtorRecord[] = [
  {
    id: "DEU-001", nombre: "Ecopetrol S.A.", nit: "899.999.068-1",
    sector: "Energía", ciudad: "Bogotá D.C.",
    exposicionTotal: 665_000_000, limiteExposicion: 1_200_000_000, exposicionPct: 55,
    tasaPago: 99.1, diasPromPago: 28, operacionesActivas: 3,
    calificacion: "AAA", status: "activo", tendencia: +9.2, facturasVencidas: 0,
    spark: makeSpark(66, 1),
  },
  {
    id: "DEU-002", nombre: "Avianca S.A.", nit: "890.100.127-3",
    sector: "Transporte", ciudad: "Bogotá D.C.",
    exposicionTotal: 340_000_000, limiteExposicion: 600_000_000, exposicionPct: 57,
    tasaPago: 98.4, diasPromPago: 31, operacionesActivas: 2,
    calificacion: "AA", status: "activo", tendencia: +3.1, facturasVencidas: 0,
    spark: makeSpark(34, 1),
  },
  {
    id: "DEU-003", nombre: "Almacenes Éxito S.A.", nit: "800.176.883-4",
    sector: "Retail", ciudad: "Medellín",
    exposicionTotal: 277_500_000, limiteExposicion: 500_000_000, exposicionPct: 56,
    tasaPago: 95.7, diasPromPago: 38, operacionesActivas: 4,
    calificacion: "AA", status: "activo", tendencia: +1.8, facturasVencidas: 0,
    spark: makeSpark(27, 1),
  },
  {
    id: "DEU-004", nombre: "Compensar EPS", nit: "860.007.760-5",
    sector: "Salud", ciudad: "Bogotá D.C.",
    exposicionTotal: 145_000_000, limiteExposicion: 300_000_000, exposicionPct: 48,
    tasaPago: 97.2, diasPromPago: 35, operacionesActivas: 1,
    calificacion: "A", status: "activo", tendencia: +4.5, facturasVencidas: 0,
    spark: makeSpark(14, 1),
  },
  {
    id: "DEU-005", nombre: "Banco de Bogotá S.A.", nit: "860.034.313-6",
    sector: "Financiero", ciudad: "Bogotá D.C.",
    exposicionTotal: 185_000_000, limiteExposicion: 400_000_000, exposicionPct: 46,
    tasaPago: 100, diasPromPago: 22, operacionesActivas: 1,
    calificacion: "AAA", status: "activo", tendencia: +6.3, facturasVencidas: 0,
    spark: makeSpark(18, 1),
  },
  {
    id: "DEU-006", nombre: "Almacenes La 14 S.A.", nit: "800.084.515-7",
    sector: "Retail", ciudad: "Cali",
    exposicionTotal: 95_000_000, limiteExposicion: 200_000_000, exposicionPct: 48,
    tasaPago: 88.3, diasPromPago: 52, operacionesActivas: 1,
    calificacion: "BBB", status: "observacion", tendencia: -2.4, facturasVencidas: 1,
    spark: makeSpark(9, -1),
  },
  {
    id: "DEU-007", nombre: "Rappi Colombia S.A.S.", nit: "901.234.000-8",
    sector: "Tecnología", ciudad: "Bogotá D.C.",
    exposicionTotal: 143_000_000, limiteExposicion: 250_000_000, exposicionPct: 57,
    tasaPago: 91.5, diasPromPago: 44, operacionesActivas: 1,
    calificacion: "A", status: "activo", tendencia: +11.2, facturasVencidas: 0,
    spark: makeSpark(14, 1),
  },
  {
    id: "DEU-008", nombre: "Arturo Calle S.A.S.", nit: "860.403.000-9",
    sector: "Moda", ciudad: "Medellín",
    exposicionTotal: 58_000_000, limiteExposicion: 120_000_000, exposicionPct: 48,
    tasaPago: 79.0, diasPromPago: 67, operacionesActivas: 1,
    calificacion: "BB", status: "observacion", tendencia: -5.1, facturasVencidas: 2,
    spark: makeSpark(5, -1),
  },
];

const calificacionConfig: Record<RiskRating, { color: string; bg: string }> = {
  AAA: { color: "text-success",         bg: "bg-success/10" },
  AA:  { color: "text-success",         bg: "bg-success/10" },
  A:   { color: "text-primary",         bg: "bg-primary/10" },
  BBB: { color: "text-warning",         bg: "bg-warning/10" },
  BB:  { color: "text-warning",         bg: "bg-warning/10" },
  B:   { color: "text-destructive",     bg: "bg-destructive/10" },
};

const statusCfg: Record<DebtorStatus, { label: string; variant: "outline" }> = {
  activo:       { label: "Activo",       variant: "outline" },
  observacion:  { label: "Observación",  variant: "outline" },
  restringido:  { label: "Restringido",  variant: "outline" },
};

type SortKey = "nombre" | "exposicionTotal" | "tasaPago" | "diasPromPago" | "tendencia";

function SortHead({ col, label, sortKey, sortDir, onSort, className }: {
  col: SortKey; label: string; sortKey: SortKey | null; sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void; className?: string;
}) {
  const active = sortKey === col;
  return (
    <TableHead className={cn("cursor-pointer select-none whitespace-nowrap text-xs", className)} onClick={() => onSort(col)}>
      <span className="inline-flex items-center gap-1 group">
        {label}
        {active && sortDir === "asc"  ? <ArrowUp className="size-3 text-primary" /> :
         active && sortDir === "desc" ? <ArrowDown className="size-3 text-primary" /> :
         <ArrowUpDown className="size-3 text-muted-foreground/40 group-hover:text-muted-foreground" />}
      </span>
    </TableHead>
  );
}

export function FactoringDebtorList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>("exposicionTotal");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sectors = [...new Set(mockDebtors.map((d) => d.sector))].sort();

  const filtered = useMemo(() => {
    let rows = mockDebtors.filter((d) => {
      const q = search.toLowerCase();
      const matchSearch = !q || d.nombre.toLowerCase().includes(q) || d.nit.includes(q) || d.sector.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || d.status === statusFilter;
      const matchSector = sectorFilter === "all" || d.sector === sectorFilter;
      return matchSearch && matchStatus && matchSector;
    });
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = a[sortKey]; const bv = b[sortKey];
        if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
        return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
      });
    }
    return rows;
  }, [search, statusFilter, sectorFilter, sortKey, sortDir]);

  const totalExposicion = mockDebtors.reduce((s, d) => s + d.exposicionTotal, 0);
  const totalActivos = mockDebtors.filter(d => d.status === "activo").length;
  const conVencidas = mockDebtors.filter(d => d.facturasVencidas > 0).length;

  const rows = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <MasterDataGrid
      title="Gestión de Deudores"
      description="Exposición crediticia por pagador, calificación de riesgo y comportamiento de pago"
      searchQuery={search}
      onSearchChange={(v: string) => { setSearch(v); setPage(1); }}
      searchPlaceholder="Buscar por nombre, NIT, sector..."
      filterOptions={[
        {
          label: "Estado",
          value: statusFilter,
          options: [
            { label: "Todos", value: "all" },
            { label: "Activo",      value: "activo" },
            { label: "Observación", value: "observacion" },
            { label: "Restringido", value: "restringido" },
          ],
        },
        {
          label: "Sector",
          value: sectorFilter,
          options: [
            { label: "Todos los sectores", value: "all" },
            ...sectors.map((s) => ({ label: s, value: s })),
          ],
        },
      ]}
      onFilterChange={(label: string, v: string) => {
        if (label === "Estado") setStatusFilter(v);
        else setSectorFilter(v);
        setPage(1);
      }}
      onResetFilters={() => { setStatusFilter("all"); setSectorFilter("all"); setSearch(""); setPage(1); }}
      showExport showRefresh showViewOptions={false}
      currentPage={page} totalPages={Math.ceil(filtered.length / itemsPerPage)} onPageChange={setPage}
      totalItems={filtered.length} itemsPerPage={itemsPerPage} startIndex={(page - 1) * itemsPerPage}
      toolbarActions={
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><CheckCircle2 className="size-3 text-success" />{totalActivos} activos</span>
          <span className="flex items-center gap-1"><AlertTriangle className="size-3 text-warning" />{conVencidas} con mora</span>
          <span className="flex items-center gap-1"><Shield className="size-3 text-primary" />
            Exp. total: {new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(totalExposicion)}
          </span>
        </div>
      }
    >
      <div className="overflow-x-auto border-t">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs min-w-[200px]">Deudor</TableHead>
              <TableHead className="text-xs">Sector</TableHead>
              <TableHead className="text-xs text-center">Calificación</TableHead>
              <SortHead col="exposicionTotal" label="Exposición" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} className="text-right" />
              <TableHead className="text-xs min-w-[120px]">Límite usado</TableHead>
              <SortHead col="tasaPago" label="Tasa pago" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <SortHead col="diasPromPago" label="Días prom." sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <TableHead className="text-xs">Ops. activas</TableHead>
              <SortHead col="tendencia" label="Tendencia" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
              <TableHead className="text-xs">Estado</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-sm text-muted-foreground">
                  No se encontraron deudores con los filtros aplicados.
                </TableCell>
              </TableRow>
            )}
            {rows.map((d) => {
              const calCfg = calificacionConfig[d.calificacion];
              return (
                <TableRow key={d.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className={cn("size-7 rounded-lg flex items-center justify-center flex-shrink-0 text-2xs font-bold", calCfg.bg, calCfg.color)}>
                        {d.calificacion}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{d.nombre}</p>
                        <p className="text-xs text-muted-foreground font-mono">{d.nit}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs">{d.sector}</p>
                    <p className="text-xs text-muted-foreground">{d.ciudad}</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn("text-sm font-bold", calCfg.color)}>{d.calificacion}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-xs font-mono font-semibold tabular-nums">
                      {new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(d.exposicionTotal)}
                    </div>
                    <div className="h-6 mt-0.5">
                      <Sparkline data={d.spark} color={d.tendencia >= 0 ? "var(--primary)" : "var(--destructive)"} height={24} showTrend={false} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-[100px] space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{d.ciudad.split(" ")[0]}</span>
                        <span className={cn("font-semibold", d.exposicionPct >= 80 ? "text-warning" : "text-foreground")}>{d.exposicionPct}%</span>
                      </div>
                      <Progress value={d.exposicionPct} className="h-1.5 bg-muted" indicatorClassName={d.exposicionPct >= 80 ? "bg-warning" : "bg-primary"} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn("text-xs font-semibold tabular-nums",
                      d.tasaPago >= 95 ? "text-success" : d.tasaPago >= 85 ? "text-warning" : "text-destructive"
                    )}>
                      {d.tasaPago.toFixed(1)}%
                    </span>
                    {d.facturasVencidas > 0 && (
                      <p className="text-xs text-destructive">{d.facturasVencidas} en mora</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={cn("text-xs tabular-nums font-medium",
                      d.diasPromPago <= 30 ? "text-success" : d.diasPromPago <= 45 ? "text-warning" : "text-destructive"
                    )}>
                      {d.diasPromPago}d
                    </span>
                  </TableCell>
                  <TableCell className="text-xs tabular-nums font-medium">{d.operacionesActivas}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {d.tendencia >= 0
                        ? <TrendingUp className="size-3.5 .5 text-success" />
                        : <TrendingDown className="size-3.5 .5 text-destructive" />}
                      <span className={cn("text-xs font-semibold tabular-nums", d.tendencia >= 0 ? "text-success" : "text-destructive")}>
                        {d.tendencia > 0 ? "+" : ""}{d.tendencia}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusCfg[d.status].variant} className="text-xs whitespace-nowrap">
                      {statusCfg[d.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">{d.id}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs">Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Ver operaciones</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Enviar recordatorio</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs text-warning">Poner en observación</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs text-destructive">Restringir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </MasterDataGrid>
  );
}
