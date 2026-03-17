/**
 * FactoringSectorConcentration — Portfolio concentration analysis.
 * Treemap + bar chart breakdown by sector / cedente / deudor.
 * Includes risk heat coloring and exposure limits.
 */
import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { TreemapChart, type TreemapData } from "../advanced/treemap-chart";
import {
  PieChart as PieIcon, BarChart2, Grid3x3,
  AlertTriangle, TrendingUp, RefreshCw, Info,
  Building2, Users, Store,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "sector" | "cedente" | "deudor";

interface ConcentrationRow {
  name: string;
  nominal: number;
  operaciones: number;
  pctPortafolio: number;
  riesgo: "bajo" | "medio" | "alto" | "critico";
  limite: number;
  sector?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const TOTAL_PORTFOLIO = 1_025_000_000;

const SECTOR_DATA: ConcentrationRow[] = [
  { name: "Construcción",  nominal: 283_000_000, operaciones: 8,  pctPortafolio: 27.6, riesgo: "alto",    limite: 25 },
  { name: "Retail",        nominal: 210_000_000, operaciones: 11, pctPortafolio: 20.5, riesgo: "medio",   limite: 25 },
  { name: "Energía",       nominal: 187_000_000, operaciones: 5,  pctPortafolio: 18.2, riesgo: "medio",   limite: 20 },
  { name: "Tecnología",    nominal: 145_000_000, operaciones: 7,  pctPortafolio: 14.1, riesgo: "bajo",    limite: 20 },
  { name: "Salud",         nominal: 98_000_000,  operaciones: 6,  pctPortafolio: 9.6,  riesgo: "bajo",    limite: 20 },
  { name: "Agro",          nominal: 56_000_000,  operaciones: 4,  pctPortafolio: 5.5,  riesgo: "bajo",    limite: 15 },
  { name: "Logística",     nominal: 46_000_000,  operaciones: 3,  pctPortafolio: 4.5,  riesgo: "bajo",    limite: 15 },
];

const CEDENTE_DATA: ConcentrationRow[] = [
  { name: "Constructora Andina",       nominal: 285_000_000, operaciones: 5, pctPortafolio: 27.8, riesgo: "critico", limite: 20, sector: "Construcción" },
  { name: "Industrias Metálicas JR",   nominal: 215_000_000, operaciones: 4, pctPortafolio: 21.0, riesgo: "alto",   limite: 20, sector: "Construcción" },
  { name: "Tech Solutions S.A.S",      nominal: 187_000_000, operaciones: 3, pctPortafolio: 18.2, riesgo: "alto",   limite: 20, sector: "Tecnología"  },
  { name: "Pharma Norte S.A.S",        nominal: 142_000_000, operaciones: 4, pctPortafolio: 13.9, riesgo: "medio",  limite: 20, sector: "Salud"       },
  { name: "Textiles del Norte S.A.S",  nominal: 108_000_000, operaciones: 5, pctPortafolio: 10.5, riesgo: "medio",  limite: 20, sector: "Retail"      },
  { name: "Agro Pacífico Ltda.",        nominal: 56_000_000,  operaciones: 4, pctPortafolio: 5.5,  riesgo: "bajo",   limite: 20, sector: "Agro"        },
  { name: "Logística Rápida S.A.",      nominal: 32_000_000,  operaciones: 2, pctPortafolio: 3.1,  riesgo: "bajo",   limite: 20, sector: "Logística"   },
];

const DEUDOR_DATA: ConcentrationRow[] = [
  { name: "Ecopetrol",               nominal: 210_000_000, operaciones: 3, pctPortafolio: 20.5, riesgo: "alto",   limite: 20, sector: "Energía"      },
  { name: "Grupo Argos",             nominal: 178_000_000, operaciones: 4, pctPortafolio: 17.4, riesgo: "medio",  limite: 20, sector: "Construcción" },
  { name: "Bancolombia",             nominal: 155_000_000, operaciones: 3, pctPortafolio: 15.1, riesgo: "bajo",   limite: 20, sector: "Finanzas"     },
  { name: "Almacenes Éxito",         nominal: 122_000_000, operaciones: 5, pctPortafolio: 11.9, riesgo: "medio",  limite: 15, sector: "Retail"       },
  { name: "Claro Colombia",          nominal: 98_000_000,  operaciones: 3, pctPortafolio: 9.6,  riesgo: "bajo",   limite: 15, sector: "Tecnología"   },
  { name: "Falabella Colombia",      nominal: 88_000_000,  operaciones: 4, pctPortafolio: 8.6,  riesgo: "bajo",   limite: 15, sector: "Retail"       },
  { name: "Pacific Rubiales",        nominal: 76_000_000,  operaciones: 2, pctPortafolio: 7.4,  riesgo: "alto",   limite: 10, sector: "Energía"      },
  { name: "DHL Colombia",            nominal: 46_000_000,  operaciones: 2, pctPortafolio: 4.5,  riesgo: "bajo",   limite: 10, sector: "Logística"    },
  { name: "Audifarma",               nominal: 30_000_000,  operaciones: 1, pctPortafolio: 2.9,  riesgo: "bajo",   limite: 10, sector: "Salud"        },
  { name: "Otros",                   nominal: 22_000_000,  operaciones: 3, pctPortafolio: 2.1,  riesgo: "bajo",   limite: 10, sector: "Varios"       },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RIESGO_META = {
  bajo:    { label: "Bajo",    color: "text-success-on-subtle", bg: "bg-success-subtle dark:bg-success/20",       barColor: "var(--success)",              treemapColor: "var(--success-subtle)" },
  medio:   { label: "Medio",   color: "text-warning-on-subtle", bg: "bg-warning-subtle dark:bg-warning/20",       barColor: "var(--warning)",              treemapColor: "var(--warning-subtle)" },
  alto:    { label: "Alto",    color: "text-destructive-on-subtle", bg: "bg-destructive-subtle dark:bg-destructive/20", barColor: "var(--destructive)",      treemapColor: "var(--destructive-subtle)" },
  critico: { label: "Crítico", color: "text-destructive-on-subtle", bg: "bg-destructive/15 dark:bg-destructive/30",    barColor: "var(--destructive-on-subtle)", treemapColor: "var(--destructive-on-subtle)" },
};

function RiskBadge({ riesgo }: { riesgo: ConcentrationRow["riesgo"] }) {
  const m = RIESGO_META[riesgo];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${m.bg} ${m.color}`}>
      {m.label}
    </span>
  );
}

function toTreemap(data: ConcentrationRow[]): TreemapData[] {
  return data.map(d => ({
    name: d.name,
    size: d.nominal,
    fill: RIESGO_META[d.riesgo].treemapColor,
  }));
}

// ─── Alert Banner ─────────────────────────────────────────────────────────────

function ConcentrationAlert({ data }: { data: ConcentrationRow[] }) {
  const overLimit = data.filter(r => r.pctPortafolio > r.limite);
  if (overLimit.length === 0) return null;
  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 p-3 text-sm">
      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div>
        <span className="font-medium text-amber-800 dark:text-amber-300">
          {overLimit.length} concentración{overLimit.length > 1 ? "es" : ""} exceden el límite de política:
        </span>{" "}
        <span className="text-amber-700 dark:text-amber-400">
          {overLimit.map(r => `${r.name} (${r.pctPortafolio.toFixed(1)}% vs límite ${r.limite}%)`).join(", ")}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringSectorConcentration() {
  const [view, setView] = useState<ViewMode>("sector");

  const data: ConcentrationRow[] = view === "sector" ? SECTOR_DATA : view === "cedente" ? CEDENTE_DATA : DEUDOR_DATA;

  const treemapData = useMemo(() => toTreemap(data), [data]);
  const treemapColors = useMemo(() => data.map(d => RIESGO_META[d.riesgo].treemapColor), [data]);

  const alertData = useMemo(() => data.filter(r => r.pctPortafolio > r.limite), [data]);

  const hhi = useMemo(() => {
    return data.reduce((sum, r) => sum + Math.pow(r.pctPortafolio, 2), 0);
  }, [data]);

  const hhiLabel = hhi < 1500 ? "Baja (diversificado)" : hhi < 2500 ? "Moderada" : "Alta (concentrado)";
  const hhiColor = hhi < 1500 ? "text-green-600" : hhi < 2500 ? "text-amber-600" : "text-red-600";

  const VIEW_OPTIONS: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: "sector",   label: "Por Sector",   icon: <Grid3x3 className="h-3.5 w-3.5" /> },
    { id: "cedente",  label: "Por Cedente",  icon: <Building2 className="h-3.5 w-3.5" /> },
    { id: "deudor",   label: "Por Deudor",   icon: <Store className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-primary" />
            Concentración de Cartera
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Análisis de riesgos de concentración por dimensión</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border bg-muted/30 p-1 gap-1">
            {VIEW_OPTIONS.map(o => (
              <Button
                key={o.id}
                variant={view === o.id ? "default" : "ghost"}
                size="sm"
                className="gap-1.5 h-7 text-xs"
                onClick={() => setView(o.id)}
              >
                {o.icon}{o.label}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Alert */}
      {alertData.length > 0 && <ConcentrationAlert data={data} />}

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Cartera total</p>
            <p className="text-base font-bold text-foreground mt-0.5">{COP.format(TOTAL_PORTFOLIO)}</p>
            <p className="text-[10px] text-muted-foreground">{data.length} grupos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Mayor concentración</p>
            <p className="text-base font-bold text-foreground mt-0.5">{data[0].pctPortafolio.toFixed(1)}%</p>
            <p className="text-[10px] text-muted-foreground truncate">{data[0].name}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Índice HHI</p>
            <p className={`text-base font-bold mt-0.5 ${hhiColor}`}>{Math.round(hhi)}</p>
            <p className="text-[10px] text-muted-foreground">{hhiLabel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Exceden límite</p>
            <p className={`text-base font-bold mt-0.5 ${alertData.length > 0 ? "text-red-600" : "text-green-600"}`}>
              {alertData.length}
            </p>
            <p className="text-[10px] text-muted-foreground">de {data.length} grupos</p>
          </CardContent>
        </Card>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Treemap (3/5) */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Mapa de Calor — Concentración</CardTitle>
            <CardDescription className="text-xs">
              Tamaño proporcional al valor nominal · Color indica nivel de riesgo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex flex-wrap gap-2">
              {(["bajo", "medio", "alto", "critico"] as const).map(r => (
                <div key={r} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ background: RIESGO_META[r].treemapColor }} />
                  <span className="text-muted-foreground">{RIESGO_META[r].label}</span>
                </div>
              ))}
            </div>
            <TreemapChart
              data={treemapData}
              height={280}
              colors={treemapColors}
            />
          </CardContent>
        </Card>

        {/* Bar chart (2/5) */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">% del Portafolio</CardTitle>
            <CardDescription className="text-xs">Línea roja = límite de política</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data.slice(0, 8)}
                layout="vertical"
                margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" domain={[0, 35]} tickFormatter={v => `${v}%`} tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} />
                <ReTooltip
                  formatter={(v: number, name: string) =>
                    name === "Límite" ? [`${v}%`, "Límite política"] : [`${v.toFixed(1)}%`, "% Portafolio"]
                  }
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }}
                />
                <Bar dataKey="pctPortafolio" name="% Portafolio" radius={[0, 3, 3, 0]} maxBarSize={14}>
                  {data.map((d, i) => (
                    <Cell key={i} fill={RIESGO_META[d.riesgo].barColor} />
                  ))}
                </Bar>
                <Bar dataKey="limite" name="Límite" fill="transparent" stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4 2" radius={[0, 3, 3, 0]} maxBarSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detail table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              Detalle de Concentración
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              <span>Límites según política interna de riesgo</span>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Nombre</TableHead>
                {view !== "sector" && <TableHead className="text-xs">Sector</TableHead>}
                <TableHead className="text-xs text-right">Nominal</TableHead>
                <TableHead className="text-xs text-right">Ops</TableHead>
                <TableHead className="text-xs text-right">% Portafolio</TableHead>
                <TableHead className="text-xs text-right">Límite</TableHead>
                <TableHead className="text-xs">Uso del límite</TableHead>
                <TableHead className="text-xs text-center">Riesgo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((r, i) => {
                const uso = Math.min((r.pctPortafolio / r.limite) * 100, 100);
                const overLimit = r.pctPortafolio > r.limite;
                return (
                  <TableRow key={i} className={overLimit ? "bg-red-50/30 dark:bg-red-900/10" : ""}>
                    <TableCell className="text-xs font-medium text-foreground">{r.name}</TableCell>
                    {view !== "sector" && (
                      <TableCell className="text-xs">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{r.sector}</span>
                      </TableCell>
                    )}
                    <TableCell className="text-xs text-right font-medium">{COP.format(r.nominal)}</TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">{r.operaciones}</TableCell>
                    <TableCell className={`text-xs text-right font-semibold ${overLimit ? "text-red-600" : "text-foreground"}`}>
                      {r.pctPortafolio.toFixed(1)}%
                      {overLimit && <span className="ml-1 text-[10px] text-red-500">▲</span>}
                    </TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">{r.limite}%</TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress
                          value={uso}
                          className="h-1.5 flex-1"
                          indicatorClassName={overLimit ? "bg-red-500" : uso > 80 ? "bg-amber-500" : "bg-green-500"}
                        />
                        <span className={`text-[10px] font-medium w-8 text-right ${overLimit ? "text-red-600" : "text-muted-foreground"}`}>
                          {uso.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-center">
                      <RiskBadge riesgo={r.riesgo} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>HHI: <strong className={`${hhiColor}`}>{Math.round(hhi)}</strong> — {hhiLabel}</span>
          <span>Total: <strong className="text-foreground">{COP.format(TOTAL_PORTFOLIO)}</strong></span>
        </div>
      </Card>
    </div>
  );
}
