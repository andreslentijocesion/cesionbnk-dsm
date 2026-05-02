import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { SafeChartContainer } from "../ui/safechartcontainer";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, AlertTriangle,
  CheckCircle2, FileText, RefreshCw, Download,
  ChevronRight, Activity,
} from "lucide-react";
import { cn, formatCOP } from "../../lib/utils";
import {
  portfolioEvolution,
  operacionesPorEstado,
  topCedentes,
  topDeudores,
  actividadReciente,
  agingData,
} from "./mocks/factoring-dashboard.mock";

// ─── Config ──────────────────────────────────────────────────────────────────

const actividadConfig = {
  cobro:       { icon: <CheckCircle2 className="size-3.5 .5 text-success" />,     bg: "bg-success/10" },
  desembolso:  { icon: <DollarSign className="size-3.5 .5 text-primary" />,       bg: "bg-primary/10" },
  aprobacion:  { icon: <FileText className="size-3.5 .5 text-secondary" />,       bg: "bg-secondary/10" },
  vencimiento: { icon: <AlertTriangle className="size-3.5 .5 text-destructive" />, bg: "bg-destructive/10" },
  nueva:       { icon: <Activity className="size-3.5 .5 text-muted-foreground" />, bg: "bg-muted" },
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
                  ? <TrendingUp className="size-3.5 .5 text-success" />
                  : <TrendingDown className="size-3.5 .5 text-destructive" />}
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

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg shadow-lg p-3 text-xs space-y-1.5 min-w-[160px]">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full inline-block" style={{ background: p.color }} />
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
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Factoring Dashboard</h2>
          <p className="text-muted-foreground text-sm">Resumen operativo y salud del portafolio comercial.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" /> Exportar
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 size-4" /> Actualizar
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Portafolio Activo"
          value={formatCOP(3480000000, true)}
          sub="78 operaciones vigentes"
          change={12.5}
          icon={<DollarSign className="size-5 text-primary" />}
          accent="bg-primary/10"
        />
        <KpiCard
          label="Recaudado Mes"
          value={formatCOP(1240000000, true)}
          sub="Periodo: Marzo 2025"
          change={8.2}
          icon={<CheckCircle2 className="size-5 text-success" />}
          accent="bg-success/10"
        />
        <KpiCard
          label="Mora > 30 días"
          value={formatCOP(223000000, true)}
          sub="5 pagadores afectados"
          change={-4.1}
          icon={<AlertTriangle className="size-5 text-warning" />}
          accent="bg-warning/10"
        />
        <KpiCard
          label="Tasa Promedio"
          value="2.14%"
          sub="Mes vencido (MV)"
          change={0.5}
          icon={<Activity className="size-5 text-secondary" />}
          accent="bg-secondary/10"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-semibold">Evolución del Portafolio</CardTitle>
              <CardDescription className="text-xs">Desembolsos vs Recaudos (Millones COP)</CardDescription>
            </div>
            <div className="flex gap-1">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Activo</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <SafeChartContainer className="h-[300px] w-full">
              <AreaChart data={portfolioEvolution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCob" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="mes" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="desembolsado" 
                  name="Desembolsado"
                  stroke="var(--primary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDes)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="cobrado" 
                  name="Cobrado"
                  stroke="var(--success)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCob)" 
                />
              </AreaChart>
            </SafeChartContainer>
          </CardContent>
        </Card>

        {/* Status Mix */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Mix de Operaciones</CardTitle>
            <CardDescription className="text-xs">Distribución por estado actual</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-2">
            <SafeChartContainer className="h-[220px] w-full">
              <PieChart>
                <Pie
                  data={operacionesPorEstado}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {operacionesPorEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </SafeChartContainer>
            
            <div className="w-full space-y-2 mt-4">
              {operacionesPorEstado.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Actividad Reciente</CardTitle>
              <Activity className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {actividadReciente.map((act, i) => {
                const config = actividadConfig[act.tipo as keyof typeof actividadConfig];
                return (
                  <div key={i} className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={cn("mt-0.5 p-1.5 rounded-full flex-shrink-0", config.bg)}>
                      {config.icon}
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <p className="text-xs font-medium text-foreground line-clamp-1">{act.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{act.tiempo}</span>
                        <span className="text-[10px] text-muted-foreground font-bold">·</span>
                        <span className="text-[10px] font-semibold text-foreground">{formatCOP(act.monto)}</span>
                      </div>
                    </div>
                    <ChevronRight className="size-3 text-muted-foreground mt-1" />
                  </div>
                );
              })}
            </div>
            <div className="p-3 bg-muted/30 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs text-primary h-8 hover:bg-primary/5">
                Ver todo el historial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="border shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Principales Cedentes</CardTitle>
              <div className="flex gap-1">
                <Button variant="outline" size="sm">Mes</Button>
                <Button variant="ghost" size="sm">Año</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-muted-foreground text-[10px] uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-medium">Cedente</th>
                    <th className="px-4 py-3 text-right font-medium">Ops.</th>
                    <th className="px-4 py-3 text-right font-medium">Valor Total</th>
                    <th className="px-4 py-3 text-right font-medium">Recaudo</th>
                    <th className="px-4 py-3 text-right font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {topCedentes.map((ced, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 min-w-[200px]">
                        <p className="font-semibold text-foreground text-xs">{ced.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">{ced.nit}</p>
                      </td>
                      <td className="px-4 py-3 text-right font-medium tabular-nums">{ced.operaciones}</td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums text-xs">{formatCOP(ced.valor, true)}</td>
                      <td className="px-4 py-3 text-right min-w-[120px]">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] text-muted-foreground">{ced.cobradoPct}%</span>
                          <Progress value={ced.cobradoPct} className="h-1.5 w-12" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn("text-[10px] font-bold", ced.tendencia >= 0 ? "text-success" : "text-destructive")}>
                          {ced.tendencia >= 0 ? "+" : ""}{ced.tendencia}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Stats / Aging */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Aging del Portafolio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agingData.map((age) => (
              <div key={age.rango} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{age.rango}</span>
                    <span className="text-muted-foreground">({age.operaciones} ops)</span>
                  </div>
                  <span className="font-bold text-foreground">{formatCOP(age.valor, true)}</span>
                </div>
                <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn("absolute inset-y-0 left-0", age.color)} 
                    style={{ width: `${(age.valor / 2900000000) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Principales Pagadores</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {topDeudores.map((deu, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground">
                      {deu.nombre.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{deu.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{deu.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-foreground tabular-nums">{formatCOP(deu.valor, true)}</p>
                    <Badge variant={deu.riesgo === "bajo" ? "success-soft" : "warning-soft"} className="text-[9px] h-4 px-1 leading-none">
                      Riesgo {deu.riesgo}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
