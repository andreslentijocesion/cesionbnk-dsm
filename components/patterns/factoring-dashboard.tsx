import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { SafeChartContainer } from "../ui/safe-chart-container";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle,
  CheckCircle2, FileText, Users, RefreshCw, Download, ArrowUpRight,
  ChevronRight, Activity,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number, short = false) => {
  if (short) {
    if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`;
    if (v >= 1_000_000)     return `$${(v / 1_000_000).toFixed(0)}M`;
    return `$${(v / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);
};

const portfolioEvolution = [
  { mes: "Sep", desembolsado: 1_820, cobrado: 1_650, vencido: 120 },
  { mes: "Oct", desembolsado: 2_100, cobrado: 1_900, vencido: 95  },
  { mes: "Nov", desembolsado: 1_950, cobrado: 1_820, vencido: 140 },
  { mes: "Dic", desembolsado: 2_380, cobrado: 2_100, vencido: 80  },
  { mes: "Ene", desembolsado: 2_750, cobrado: 2_400, vencido: 110 },
  { mes: "Feb", desembolsado: 3_120, cobrado: 2_750, vencido: 90  },
  { mes: "Mar", desembolsado: 3_480, cobrado: 2_980, vencido: 78  },
];

const operacionesPorEstado = [
  { name: "Cobrado",      value: 38, color: "var(--success)" },
  { name: "En cobro",     value: 27, color: "var(--warning)" },
  { name: "Desembolsado", value: 20, color: "var(--secondary)" },
  { name: "Aprobado",     value: 9,  color: "var(--primary)" },
  { name: "Vencido",      value: 6,  color: "var(--destructive)" },
];

const topCedentes = [
  { nombre: "Servicios TI Colombia S.A.S.", nit: "900.123.456-1", operaciones: 12, valor: 520_000_000, cobradoPct: 68, tendencia: +14 },
  { nombre: "Construcciones Andina S.A.",   nit: "800.234.567-2", operaciones: 9,  valor: 370_000_000, cobradoPct: 82, tendencia: +6  },
  { nombre: "Industrias Cóndor S.A.S.",     nit: "890.345.678-3", operaciones: 7,  valor: 340_000_000, cobradoPct: 100, tendencia: +2 },
  { nombre: "Textiles del Valle Ltda.",      nit: "800.456.789-4", operaciones: 5,  valor: 185_000_000, cobradoPct: 45, tendencia: -3  },
];

const topDeudores = [
  { nombre: "Ecopetrol S.A.",        sector: "Energía",    valor: 520_000_000, riesgo: "bajo" },
  { nombre: "Avianca S.A.",          sector: "Transporte", valor: 340_000_000, riesgo: "bajo" },
  { nombre: "Almacenes Éxito S.A.",  sector: "Retail",     valor: 185_000_000, riesgo: "medio" },
  { nombre: "Compensar EPS",         sector: "Salud",      valor: 145_000_000, riesgo: "bajo" },
  { nombre: "Banco de Bogotá S.A.",  sector: "Financiero", valor: 92_500_000,  riesgo: "bajo" },
];

const actividadReciente = [
  { tipo: "cobro",       desc: "FCT-2025-003 cobrado en su totalidad",              tiempo: "hace 2h",   monto: 340_000_000 },
  { tipo: "desembolso",  desc: "FCT-2025-005 desembolsado a Servicios TI Colombia", tiempo: "hace 5h",   monto: 494_000_000 },
  { tipo: "aprobacion",  desc: "FCT-2025-006 aprobado por comité de crédito",       tiempo: "hace 1d",   monto: 145_000_000 },
  { tipo: "vencimiento", desc: "FCT-2025-004 entró en estado vencido",              tiempo: "hace 2d",   monto: 78_000_000  },
  { tipo: "nueva",       desc: "FCT-2025-008 radicado por Pharma Colombia Ltda.",   tiempo: "hace 3d",   monto: 210_000_000 },
];

const agingData = [
  { rango: "Al día",     dias: "0d",    operaciones: 27, valor: 1_970_000_000, color: "bg-success" },
  { rango: "1–15 días",  dias: "1–15",  operaciones: 8,  valor: 490_000_000,   color: "bg-primary" },
  { rango: "16–30 días", dias: "16–30", operaciones: 4,  valor: 210_000_000,   color: "bg-warning" },
  { rango: "31–60 días", dias: "31–60", operaciones: 3,  valor: 145_000_000,   color: "bg-warning" },
  { rango: ">60 días",   dias: ">60",   operaciones: 2,  valor: 78_000_000,    color: "bg-destructive" },
];

const riesgoConfig: Record<string, string> = {
  bajo:  "text-success",
  medio: "text-warning",
  alto:  "text-destructive",
};

const actividadConfig = {
  cobro:       { icon: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,     bg: "bg-success/10" },
  desembolso:  { icon: <DollarSign className="h-3.5 w-3.5 text-primary" />,       bg: "bg-primary/10" },
  aprobacion:  { icon: <FileText className="h-3.5 w-3.5 text-secondary" />,       bg: "bg-secondary/10" },
  vencimiento: { icon: <AlertTriangle className="h-3.5 w-3.5 text-destructive" />, bg: "bg-destructive/10" },
  nueva:       { icon: <Activity className="h-3.5 w-3.5 text-muted-foreground" />, bg: "bg-muted" },
};

// ─── KPI Card ──────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, change, icon, accent }: {
  label: string; value: string; sub?: string; change?: number;
  icon: React.ReactNode; accent: string;
}) {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">{label}</p>
            <p className="text-2xl font-bold text-foreground tabular-nums leading-none">{value}</p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {change >= 0
                  ? <TrendingUp className="h-3.5 w-3.5 text-success" />
                  : <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
                <span className={cn("text-xs font-semibold", change >= 0 ? "text-success" : "text-destructive")}>
                  {change >= 0 ? "+" : ""}{change}%
                </span>
                <span className="text-xs text-muted-foreground">vs mes anterior</span>
              </div>
            )}
          </div>
          <div className={cn("p-2.5 rounded-lg flex-shrink-0", accent)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-xs space-y-1.5 min-w-[160px]">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full inline-block" style={{ background: p.color }} />
            <span className="text-muted-foreground capitalize">{p.name}</span>
          </div>
          <span className="font-medium tabular-nums">${p.value}M</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export function FactoringDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const totalPortafolio = 2_605_000_000;
  const totalCobrado    = 1_155_000_000;
  const totalVencido    =    78_000_000;
  const totalOperaciones = 44;

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Dashboard Factoring</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Marzo 2025 · Actualizado hace 5 minutos</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5 gap-0.5">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  period === p ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >{p}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Actualizar
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Exportar
          </Button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard
          label="Portafolio activo"
          value={COP(totalPortafolio, true)}
          sub={`${totalOperaciones} operaciones`}
          change={+12.4}
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          accent="bg-primary/10"
        />
        <KpiCard
          label="Cobrado (mes)"
          value={COP(totalCobrado, true)}
          sub={`${Math.round((totalCobrado / totalPortafolio) * 100)}% del portafolio`}
          change={+8.7}
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
          accent="bg-success/10"
        />
        <KpiCard
          label="Operaciones activas"
          value="35"
          sub="9 por vencer en 7 días"
          change={+5.1}
          icon={<Clock className="h-5 w-5 text-secondary" />}
          accent="bg-secondary/10"
        />
        <KpiCard
          label="Cartera vencida"
          value={COP(totalVencido, true)}
          sub={`${((totalVencido / totalPortafolio) * 100).toFixed(1)}% del portafolio`}
          change={-2.3}
          icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
          accent="bg-destructive/10"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Area Chart — Evolución del portafolio */}
        <Card className="xl:col-span-2 border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Evolución del portafolio</CardTitle>
                <CardDescription className="text-xs">Desembolsado vs cobrado (COP millones)</CardDescription>
              </div>
              <Badge variant="secondary-soft-outline" className="text-xs">Últimos 7 meses</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-2 pb-3">
            <SafeChartContainer width="100%" height={220} minHeight="220px">
              <AreaChart data={portfolioEvolution} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradDesembolsado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--secondary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCobrado" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} width={52} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="desembolsado" name="Desembolsado" stroke="var(--secondary)" strokeWidth={2} fill="url(#gradDesembolsado)" dot={false} />
                <Area type="monotone" dataKey="cobrado"      name="Cobrado"      stroke="var(--success)" strokeWidth={2} fill="url(#gradCobrado)" dot={false} />
              </AreaChart>
            </SafeChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart — Por estado */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle>Operaciones por estado</CardTitle>
            <CardDescription className="text-xs">{totalOperaciones} operaciones totales</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-3">
            <SafeChartContainer width="100%" height={170} minHeight="170px">
              <PieChart>
                <Pie
                  data={operacionesPorEstado}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={78}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {operacionesPorEstado.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, name: string) => [`${v} ops`, name]}
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                />
              </PieChart>
            </SafeChartContainer>
            <div className="space-y-1.5 mt-1">
              {operacionesPorEstado.map((e) => (
                <div key={e.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                    <span className="text-xs text-muted-foreground">{e.name}</span>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-foreground">{e.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Aging Analysis */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle>Análisis de vencimiento</CardTitle>
            <CardDescription className="text-xs">Distribución por días de vencimiento</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {agingData.map((row) => {
              const total = agingData.reduce((s, r) => s + r.valor, 0);
              const pct = Math.round((row.valor / total) * 100);
              return (
                <div key={row.rango} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">{row.rango}</span>
                      <span className="text-muted-foreground">· {row.operaciones} ops</span>
                    </div>
                    <span className="font-mono text-foreground tabular-nums">{COP(row.valor, true)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={pct} className="h-1.5 flex-1 bg-muted" indicatorClassName={row.color} />
                    <span className="text-xs text-muted-foreground w-7 text-right tabular-nums">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top Cedentes */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top cedentes</CardTitle>
                <CardDescription className="text-xs">Por valor de portafolio</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground px-2">
                Ver todos <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {topCedentes.map((c) => (
              <div key={c.nit} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate leading-tight">{c.nombre}</p>
                    <p className="text-xs text-muted-foreground">{c.operaciones} ops · {COP(c.valor, true)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {c.tendencia > 0
                    ? <TrendingUp className="h-3 w-3 text-success" />
                    : <TrendingDown className="h-3 w-3 text-destructive" />}
                  <span className={cn("text-xs font-semibold tabular-nums", c.tendencia > 0 ? "text-success" : "text-destructive")}>
                    {c.tendencia > 0 ? "+" : ""}{c.tendencia}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividad reciente */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription className="text-xs">Últimos movimientos del portafolio</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {actividadReciente.map((a, i) => {
                const cfg = actividadConfig[a.tipo as keyof typeof actividadConfig];
                return (
                  <div key={i} className="flex gap-2.5">
                    <div className={cn("h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", cfg.bg)}>
                      {cfg.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-foreground leading-snug">{a.desc}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-muted-foreground">{a.tiempo}</span>
                        <span className="text-xs font-mono text-muted-foreground tabular-nums">{COP(a.monto, true)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator className="mt-3 mb-2" />
            <Button variant="ghost" size="sm" className="w-full h-7 text-xs text-muted-foreground">
              Ver historial completo <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ── Deudores Row ── */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Concentración por deudor</CardTitle>
              <CardDescription className="text-xs">Exposición crediticia por pagador — top 5</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2">
            {topDeudores.map((d) => {
              const total = topDeudores.reduce((s, r) => s + r.valor, 0);
              const pct = (d.valor / total) * 100;
              return (
                <div key={d.nombre} className="flex items-center gap-4">
                  <div className="w-40 flex-shrink-0">
                    <p className="text-sm font-medium text-foreground truncate">{d.nombre}</p>
                    <p className="text-xs text-muted-foreground">{d.sector}</p>
                  </div>
                  <Progress value={pct} className="flex-1 h-2 bg-muted" indicatorClassName="bg-primary" />
                  <span className="text-xs tabular-nums text-muted-foreground w-16 text-right">{COP(d.valor, true)}</span>
                  <span className={cn("text-xs font-medium w-12 text-right", riesgoConfig[d.riesgo])}>
                    {d.riesgo}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
