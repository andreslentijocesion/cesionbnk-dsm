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
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "../ui/DropdownMenu";
import {
  Download, TrendingUp,
  ChevronDown, ChevronLeft, ChevronRight, Calendar, BarChart2, Filter, Printer,
  CheckCircle2, Clock, AlertTriangle, XCircle, Activity,
} from "lucide-react";
import { formatCOP } from "../../lib/utils";
import { MOCK_RECORDS, MONTHLY_DATA } from "./mocks/factoring-portfolio-report.mock";

const PAGE_SIZE = 10;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_META: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  cobrada: { label: "Cobrada", color: "text-success-on-subtle",     bg: "bg-success-subtle",     icon: <CheckCircle2 className="size-3.5 .5 text-success-on-subtle" /> },
  vigente: { label: "Vigente", color: "text-info-on-subtle",        bg: "bg-info-subtle",         icon: <Clock className="size-3.5 .5 text-info-on-subtle" /> },
  vencida: { label: "Vencida", color: "text-warning-on-subtle",     bg: "bg-warning-subtle",      icon: <AlertTriangle className="size-3.5 .5 text-warning-on-subtle" /> },
  en_mora: { label: "En Mora", color: "text-destructive-on-subtle", bg: "bg-destructive-subtle",  icon: <XCircle className="size-3.5 .5 text-destructive-on-subtle" /> },
};

function StatusBadge({ status }: { status: string }) {
  const m = STATUS_META[status] || STATUS_META.vigente;
  return (
    <Badge variant="outline" className="text-xs gap-1 whitespace-nowrap">
      {m.icon}{m.label}
    </Badge>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function FactoringPortfolioReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filtering logic
  const filteredRecords = useMemo(() => {
    return MOCK_RECORDS.filter(r => statusFilter === "all" || r.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRecords.slice(start, start + PAGE_SIZE);
  }, [filteredRecords, currentPage]);

  // Totals
  const totals = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => ({
      nominal: acc.nominal + (curr.nominal ?? 0),
      desembolso: acc.desembolso + (curr.desembolso ?? 0),
      descuento: acc.descuento + (curr.descuento ?? 0),
      count: acc.count + 1
    }), { nominal: 0, desembolso: 0, descuento: 0, count: 0 });
  }, [filteredRecords]);

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <BarChart2 className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Reporte de Portafolio</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Enero 2024 – Julio 2024
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 size-4" /> Imprimir
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="mr-2 size-4" /> Exportar <ChevronDown className="ml-2 size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Exportar como Excel (.xlsx)</DropdownMenuItem>
              <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
              <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Widgets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Nominal</p>
              <TrendingUp className="size-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCOP(totals.nominal, true)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success font-semibold">+14.2%</span> vs periodo anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Desembolsado</p>
              <CheckCircle2 className="size-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCOP(totals.desembolso, true)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCOP(totals.descuento, true)} descuento total
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tasa Promedio</p>
              <Activity className="size-4 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-foreground">1.72%</p>
            <p className="text-xs text-muted-foreground mt-1">
              Efectiva mensual (EM)
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mora Cartera</p>
              <AlertTriangle className="size-4 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">5.8%</p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-destructive font-semibold">+2.1%</span> mora {">"} 30 días
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Tendencia Mensual</CardTitle>
            <CardDescription className="text-xs">Desembolsos vs Cobros acumulados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis 
                    dataKey="mes" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                    tickFormatter={(v) => `$${v/1000000}M`}
                  />
                  <ReTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="desembolsos" name="Desembolsos" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cobros" name="Cobros" fill="var(--success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Volumen de Operaciones</CardTitle>
            <CardDescription className="text-xs">Cantidad de facturas transadas por mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MONTHLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis 
                    dataKey="mes" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <ReTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="operaciones" 
                    name="Operaciones" 
                    stroke="var(--secondary)" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "var(--secondary)" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Detalle de Operaciones</CardTitle>
              <CardDescription className="text-xs">Total: {filteredRecords.length} facturas filtradas</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-background border rounded-lg px-3 py-1.5">
                <Filter className="size-3.5 text-muted-foreground" />
                <select 
                  className="text-xs bg-transparent outline-none border-none focus:ring-0 cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                >
                  <option value="all">Todos los estados</option>
                  <option value="cobrada">Cobrada</option>
                  <option value="vigente">Vigente</option>
                  <option value="vencida">Vencida</option>
                  <option value="en_mora">En Mora</option>
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20 hover:bg-muted/20">
                  <TableHead className="w-[120px]">Folio</TableHead>
                  <TableHead>Cedente / Deudor</TableHead>
                  <TableHead className="text-right">Vencimiento</TableHead>
                  <TableHead className="text-right">Valor Nominal</TableHead>
                  <TableHead className="text-right">Desembolso</TableHead>
                  <TableHead className="text-center">Plazo</TableHead>
                  <TableHead className="text-right">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRecords.map((rec) => (
                  <TableRow key={rec.id} className="hover:bg-muted/10 group">
                    <TableCell className="font-mono text-xs font-semibold text-primary">{rec.folio}</TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-foreground">{rec.cedente}</p>
                        <p className="text-[10px] text-muted-foreground">{rec.deudor}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs tabular-nums">{rec.fechaVencimiento}</TableCell>
                    <TableCell className="text-right text-xs font-bold tabular-nums">{formatCOP(rec.nominal ?? 0)}</TableCell>
                    <TableCell className="text-right text-xs font-medium tabular-nums">{formatCOP(rec.desembolso ?? 0)}</TableCell>
                    <TableCell className="text-center text-xs tabular-nums">{rec.plazo}d</TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={rec.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t bg-muted/10">
            <p className="text-xs text-muted-foreground">
              Mostrando {((currentPage - 1) * PAGE_SIZE) + 1} a {Math.min(currentPage * PAGE_SIZE, filteredRecords.length)} de {filteredRecords.length}
            </p>
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="icon"
                    className="size-8 text-xs"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
