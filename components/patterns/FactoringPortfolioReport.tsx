/**
 * FactoringPortfolioReport — Exportable portfolio report with date filters,
 * summary KPIs, monthly charts, and detailed operations table.
 */
import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "../ui/DropdownMenu";
import {
  FileText, Download, RefreshCw, TrendingUp, TrendingDown,
  ChevronDown, ChevronLeft, ChevronRight, Calendar, BarChart2, Filter, Printer,
  CheckCircle2, Clock, AlertTriangle, XCircle,
} from "lucide-react";

const PAGE_SIZE = 10;

// ─── Types ──────────────────────────────────────────────────────────────────

type ReportStatus = "cobrada" | "vigente" | "vencida" | "en_mora";

interface ReportRecord {
  id: string;
  folio: string;
  cedente: string;
  deudor: string;
  sector: string;
  fechaDesembolso: string;
  fechaVencimiento: string;
  nominal: number;
  desembolso: number;
  tasa: number;
  plazo: number;
  descuento: number;
  status: ReportStatus;
  diasMora?: number;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const MOCK_RECORDS: ReportRecord[] = [
  { id: "1",  folio: "FCT-2024-001", cedente: "Textiles del Norte S.A.S", deudor: "Almacenes Éxito",        sector: "Retail",        fechaDesembolso: "2024-01-10", fechaVencimiento: "2024-04-10", nominal: 48000000,  desembolso: 45120000,  tasa: 2.0, plazo: 90,  descuento: 2880000,  status: "cobrada" },
  { id: "2",  folio: "FCT-2024-002", cedente: "Industrias Metálicas JR",  deudor: "Grupo Argos",           sector: "Construcción",  fechaDesembolso: "2024-01-18", fechaVencimiento: "2024-03-18", nominal: 95000000,  desembolso: 89775000,  tasa: 1.8, plazo: 60,  descuento: 5225000,  status: "cobrada" },
  { id: "3",  folio: "FCT-2024-003", cedente: "Agro Pacífico Ltda.",       deudor: "Carrefour Colombia",   sector: "Agro",          fechaDesembolso: "2024-02-05", fechaVencimiento: "2024-05-05", nominal: 32000000,  desembolso: 30240000,  tasa: 1.9, plazo: 90,  descuento: 1760000,  status: "cobrada" },
  { id: "4",  folio: "FCT-2024-004", cedente: "Tech Solutions S.A.S",      deudor: "Bancolombia",          sector: "Tecnología",    fechaDesembolso: "2024-02-20", fechaVencimiento: "2024-05-20", nominal: 120000000, desembolso: 114720000, tasa: 1.5, plazo: 90,  descuento: 5280000,  status: "cobrada" },
  { id: "5",  folio: "FCT-2024-005", cedente: "Constructora Andina",       deudor: "Cemex Colombia",       sector: "Construcción",  fechaDesembolso: "2024-03-01", fechaVencimiento: "2024-05-30", nominal: 75000000,  desembolso: 70875000,  tasa: 1.8, plazo: 90,  descuento: 4125000,  status: "cobrada" },
  { id: "6",  folio: "FCT-2024-006", cedente: "Textiles del Norte S.A.S", deudor: "Falabella Colombia",    sector: "Retail",        fechaDesembolso: "2024-03-15", fechaVencimiento: "2024-06-13", nominal: 56000000,  desembolso: 52640000,  tasa: 2.1, plazo: 90,  descuento: 3360000,  status: "cobrada" },
  { id: "7",  folio: "FCT-2024-007", cedente: "Logística Rápida S.A.",     deudor: "DHL Colombia",         sector: "Logística",     fechaDesembolso: "2024-04-02", fechaVencimiento: "2024-07-01", nominal: 41000000,  desembolso: 38745000,  tasa: 1.8, plazo: 90,  descuento: 2255000,  status: "cobrada" },
  { id: "8",  folio: "FCT-2024-008", cedente: "Pharma Norte S.A.S",        deudor: "Audifarma",            sector: "Salud",         fechaDesembolso: "2024-04-10", fechaVencimiento: "2024-07-09", nominal: 88000000,  desembolso: 84480000,  tasa: 1.6, plazo: 90,  descuento: 3520000,  status: "cobrada" },
  { id: "9",  folio: "FCT-2024-009", cedente: "Industrias Metálicas JR",  deudor: "Pacific Rubiales",     sector: "Energía",       fechaDesembolso: "2024-05-05", fechaVencimiento: "2024-08-03", nominal: 145000000, desembolso: 138850000, tasa: 1.7, plazo: 90,  descuento: 6150000,  status: "cobrada" },
  { id: "10", folio: "FCT-2024-010", cedente: "Agro Pacífico Ltda.",       deudor: "Corabastos",           sector: "Agro",          fechaDesembolso: "2024-05-20", fechaVencimiento: "2024-08-18", nominal: 29000000,  desembolso: 27695000,  tasa: 1.5, plazo: 90,  descuento: 1305000,  status: "cobrada" },
  { id: "11", folio: "FCT-2024-011", cedente: "Constructora Andina",       deudor: "Ecopetrol",            sector: "Energía",       fechaDesembolso: "2024-06-03", fechaVencimiento: "2024-09-01", nominal: 210000000, desembolso: 203175000, tasa: 1.1, plazo: 90,  descuento: 6825000,  status: "vigente" },
  { id: "12", folio: "FCT-2024-012", cedente: "Tech Solutions S.A.S",      deudor: "Claro Colombia",       sector: "Tecnología",    fechaDesembolso: "2024-06-12", fechaVencimiento: "2024-09-10", nominal: 67000000,  desembolso: 64320000,  tasa: 1.6, plazo: 90,  descuento: 2680000,  status: "vigente" },
  { id: "13", folio: "FCT-2024-013", cedente: "Logística Rápida S.A.",     deudor: "Avianca",              sector: "Logística",     fechaDesembolso: "2024-06-20", fechaVencimiento: "2024-09-18", nominal: 38000000,  desembolso: 36480000,  tasa: 1.6, plazo: 90,  descuento: 1520000,  status: "vigente" },
  { id: "14", folio: "FCT-2024-014", cedente: "Pharma Norte S.A.S",        deudor: "Sanitas",              sector: "Salud",         fechaDesembolso: "2024-07-01", fechaVencimiento: "2024-09-29", nominal: 54000000,  desembolso: 52380000,  tasa: 1.0, plazo: 90,  descuento: 1620000,  status: "vigente" },
  { id: "15", folio: "FCT-2024-015", cedente: "Textiles del Norte S.A.S", deudor: "Homecenter",            sector: "Retail",        fechaDesembolso: "2024-05-15", fechaVencimiento: "2024-07-14", nominal: 42000000,  desembolso: 39690000,  tasa: 1.8, plazo: 60,  descuento: 2310000,  status: "vencida", diasMora: 8  },
  { id: "16", folio: "FCT-2024-016", cedente: "Industrias Metálicas JR",  deudor: "Acerías Paz del Río",  sector: "Construcción",  fechaDesembolso: "2024-04-20", fechaVencimiento: "2024-06-19", nominal: 78000000,  desembolso: 74100000,  tasa: 1.5, plazo: 60,  descuento: 3900000,  status: "en_mora", diasMora: 42 },
  { id: "17", folio: "FCT-2024-017", cedente: "Agro Pacífico Ltda.",       deudor: "Supertiendas Olímpica",sector: "Retail",        fechaDesembolso: "2024-03-10", fechaVencimiento: "2024-05-09", nominal: 31000000,  desembolso: 29760000,  tasa: 1.6, plazo: 60,  descuento: 1240000,  status: "en_mora", diasMora: 78 },
];

const MONTHLY_DATA = [
  { mes: "Ene", desembolsos: 143120000, cobros: 0,         operaciones: 2 },
  { mes: "Feb", desembolsos: 144960000, cobros: 143120000, operaciones: 2 },
  { mes: "Mar", desembolsos: 91385000,  cobros: 144960000, operaciones: 2 },
  { mes: "Abr", desembolsos: 123225000, cobros: 91385000,  operaciones: 2 },
  { mes: "May", desembolsos: 166545000, cobros: 123225000, operaciones: 2 },
  { mes: "Jun", desembolsos: 304175000, cobros: 166545000, operaciones: 3 },
  { mes: "Jul", desembolsos: 52380000,  cobros: 304175000, operaciones: 1 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_META: Record<ReportStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  cobrada: { label: "Cobrada", color: "text-success-on-subtle",     bg: "bg-success-subtle",     icon: <CheckCircle2 className="size-3.5 .5 text-success-on-subtle" /> },
  vigente: { label: "Vigente", color: "text-info-on-subtle",        bg: "bg-info-subtle",         icon: <Clock className="size-3.5 .5 text-info-on-subtle" /> },
  vencida: { label: "Vencida", color: "text-warning-on-subtle",     bg: "bg-warning-subtle",      icon: <AlertTriangle className="size-3.5 .5 text-warning-on-subtle" /> },
  en_mora: { label: "En Mora", color: "text-destructive-on-subtle", bg: "bg-destructive-subtle",  icon: <XCircle className="size-3.5 .5 text-destructive-on-subtle" /> },
};

function StatusBadge({ status }: { status: ReportStatus }) {
  const m = STATUS_META[status];
  return (
    <Badge variant="outline" className="text-xs gap-1">
      {m.icon}{m.label}
    </Badge>
  );
}

function KpiCard({ label, value, sub, trend, icon }: { label: string; value: string; sub?: string; trend?: number; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
            {trend !== undefined && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? "text-success-on-subtle" : "text-destructive"}`}>
                {trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {trend >= 0 ? "+" : ""}{trend}% vs período anterior
              </div>
            )}
          </div>
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringPortfolioReport() {
  const [periodo, setPeriodo] = useState<string>("2024-H1");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [sortCol, setSortCol] = useState<keyof ReportRecord>("fechaDesembolso");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const sectors = useMemo(() => ["all", ...Array.from(new Set(MOCK_RECORDS.map(r => r.sector)))], []);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return MOCK_RECORDS
      .filter(r => statusFilter === "all" || r.status === statusFilter)
      .filter(r => sectorFilter === "all" || r.sector === sectorFilter)
      .sort((a, b) => {
        const va = a[sortCol] as string | number;
        const vb = b[sortCol] as string | number;
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [statusFilter, sectorFilter, sortCol, sortDir]);

  const summary = useMemo(() => {
    const total = filtered.reduce((s, r) => s + r.nominal, 0);
    const desembolsado = filtered.reduce((s, r) => s + r.desembolso, 0);
    const descuento = filtered.reduce((s, r) => s + r.descuento, 0);
    const cobradas = filtered.filter(r => r.status === "cobrada").length;
    const mora = filtered.filter(r => r.status === "en_mora").reduce((s, r) => s + r.nominal, 0);
    return { total, desembolsado, descuento, cobradas, mora, count: filtered.length };
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const toggleSort = (col: keyof ReportRecord) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const SortHead = ({ col, children }: { col: keyof ReportRecord; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer select-none whitespace-nowrap"
      onClick={() => toggleSort(col)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortCol === col && <span className="text-xs text-primary">{sortDir === "asc" ? "↑" : "↓"}</span>}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Reporte de Cartera
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Análisis detallado de operaciones por período</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="w-[160px] h-9 text-sm">
              <Calendar className="size-3.5 .5 mr-1.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-H1">2024 — Ene a Jun</SelectItem>
              <SelectItem value="2024-Q3">2024 — Trim III</SelectItem>
              <SelectItem value="2024-Q4">2024 — Trim IV</SelectItem>
              <SelectItem value="2024-full">2024 — Año completo</SelectItem>
              <SelectItem value="custom">Personalizado…</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="size-3.5 .5" /> Actualizar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="gap-1.5">
                <Download className="size-3.5 .5" /> Exportar <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2"><FileText className="size-4" /> Exportar CSV</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Printer className="size-4" /> Imprimir reporte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          label="Total cartera nominal"
          value={COP.format(summary.total)}
          sub={`${summary.count} operaciones`}
          trend={12}
          icon={<BarChart2 className="size-4" />}
        />
        <KpiCard
          label="Total desembolsado"
          value={COP.format(summary.desembolsado)}
          sub={`${((summary.desembolsado / summary.total) * 100).toFixed(1)}% del nominal`}
          icon={<TrendingUp className="size-4" />}
        />
        <KpiCard
          label="Ingresos por descuento"
          value={COP.format(summary.descuento)}
          sub={`Yield promedio: ${((summary.descuento / summary.desembolsado) * 100).toFixed(2)}%`}
          trend={5}
          icon={<TrendingUp className="size-4" />}
        />
        <KpiCard
          label="Cartera en mora"
          value={COP.format(summary.mora)}
          sub={`${filtered.filter(r => r.status === "en_mora").length} operaciones`}
          trend={-3}
          icon={<AlertTriangle className="size-4" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Monthly bar chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Desembolsos vs Cobros Mensuales</CardTitle>
            <CardDescription className="text-xs">Flujo de capital por mes (COP millones)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: "0.6875rem", fill: "var(--muted-foreground)" }} />
                <YAxis tickFormatter={v => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: "0.625rem", fill: "var(--muted-foreground)" }} />
                <ReTooltip
                  formatter={(v: number, name: string) => [COP.format(v), name === "desembolsos" ? "Desembolsos" : "Cobros"]}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.75rem" }}
                />
                <Legend wrapperStyle={{ fontSize: "0.6875rem" }} />
                <Bar dataKey="desembolsos" name="Desembolsos" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="cobros" name="Cobros" fill="var(--chart-2)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Operations count line */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Operaciones por Mes</CardTitle>
            <CardDescription className="text-xs">Volumen de operaciones radicadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MONTHLY_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="mes" tick={{ fontSize: "0.6875rem", fill: "var(--muted-foreground)" }} />
                <YAxis allowDecimals={false} tick={{ fontSize: "0.625rem", fill: "var(--muted-foreground)" }} />
                <ReTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.75rem" }} />
                <Line type="monotone" dataKey="operaciones" name="Operaciones" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-3)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status breakdown */}
      <Card>
        <CardContent className="pt-5 pb-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(["cobrada", "vigente", "vencida", "en_mora"] as ReportStatus[]).map(s => {
              const count = MOCK_RECORDS.filter(r => r.status === s).length;
              const pct = Math.round((count / MOCK_RECORDS.length) * 100);
              const val = MOCK_RECORDS.filter(r => r.status === s).reduce((a, r) => a + r.nominal, 0);
              return (
                <div key={s} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={s} />
                    <span className="text-xs font-semibold text-foreground">{count} ops</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{pct}% del total</span>
                    <span>{COP.format(val)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters + table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Filter className="size-4 text-muted-foreground" />
              Detalle de Operaciones
              <Badge variant="outline" className="text-xs font-normal ml-1">{filtered.length} registros</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-[140px] text-sm"><SelectValue placeholder="Estado" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="cobrada">Cobrada</SelectItem>
                  <SelectItem value="vigente">Vigente</SelectItem>
                  <SelectItem value="vencida">Vencida</SelectItem>
                  <SelectItem value="en_mora">En Mora</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="h-9 w-[140px] text-sm"><SelectValue placeholder="Sector" /></SelectTrigger>
                <SelectContent>
                  {sectors.map(s => (
                    <SelectItem key={s} value={s}>{s === "all" ? "Todos los sectores" : s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 text-xs">
                <SortHead col="folio">Folio</SortHead>
                <SortHead col="cedente">Cedente</SortHead>
                <SortHead col="deudor">Deudor</SortHead>
                <SortHead col="sector">Sector</SortHead>
                <SortHead col="fechaDesembolso">Desembolso</SortHead>
                <SortHead col="fechaVencimiento">Vencimiento</SortHead>
                <SortHead col="nominal">Nominal</SortHead>
                <SortHead col="tasa">Tasa</SortHead>
                <SortHead col="descuento">Descuento</SortHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map(r => (
                <TableRow key={r.id} className="text-xs hover:bg-muted/40">
                  <TableCell className="font-mono text-xs text-primary font-medium">{r.folio}</TableCell>
                  <TableCell className="max-w-[140px] truncate font-medium">{r.cedente}</TableCell>
                  <TableCell className="max-w-[140px] truncate text-muted-foreground">{r.deudor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{r.sector}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.fechaDesembolso}</TableCell>
                  <TableCell className="text-muted-foreground">{r.fechaVencimiento}</TableCell>
                  <TableCell className="font-medium">{COP.format(r.nominal)}</TableCell>
                  <TableCell className="text-right">{r.tasa.toFixed(1)}% MV</TableCell>
                  <TableCell className="text-right text-success-on-subtle font-medium">{COP.format(r.descuento)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <StatusBadge status={r.status} />
                      {r.diasMora && (
                        <span className="text-xs text-destructive-on-subtle font-medium">+{r.diasMora}d</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {filtered.length} operaciones · Total nominal: <strong className="text-foreground">{COP.format(summary.total)}</strong>
            {" · "}Ingresos: <strong className="text-success-on-subtle">{COP.format(summary.descuento)}</strong>
            {" · "}página {safePage} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline" size="icon" className="size-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="size-3.5 .5" />
            </Button>
            <Button
              variant="outline" size="icon" className="size-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="size-3.5 .5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
