/**
 * FactoringCalculator — Standalone financial simulation widget.
 * Input: nominal, tasa MV, plazo → Output: descuento, desembolso, comisión, neto, TEA.
 * Includes donut chart, amortization table, and scenario comparison.
 */
import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { Slider } from "../ui/Slider";
import { Badge } from "../ui/Badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/Table";
import {
  Calculator, TrendingDown, DollarSign, Percent,
  RotateCcw, Save, Plus, Trash2, Info,
} from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

function calcFactoring(nominal: number, tasaMV: number, plazo: number, comisionPct: number) {
  const tasaDiaria = Math.pow(1 + tasaMV / 100, 1 / 30) - 1;
  const factor = Math.pow(1 + tasaDiaria, plazo);
  const descuento = nominal * (1 - 1 / factor);
  const comision = nominal * (comisionPct / 100);
  const desembolso = nominal - descuento;
  const neto = desembolso - comision;
  const tea = (Math.pow(1 + tasaMV / 100, 12) - 1) * 100;
  const rentabilidad = (descuento / desembolso) * 100;
  return { descuento, comision, desembolso, neto, tea, rentabilidad };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  id: string;
  label: string;
  nominal: number;
  tasaMV: number;
  plazo: number;
  comision: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NumInput({
  label, value, onChange, prefix, suffix, min, max, step, hint,
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; min: number; max: number; step: number; hint?: string;
}) {
  const [raw, setRaw] = useState<string>("");
  const [focused, setFocused] = useState(false);

  const display = focused ? raw : (prefix ? value.toLocaleString("es-CO") : value.toString());

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={display}
          onFocus={() => { setRaw(value.toString()); setFocused(true); }}
          onBlur={() => {
            setFocused(false);
            const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
            if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          onChange={e => setRaw(e.target.value)}
          className={`w-full rounded-md border border-input bg-background text-sm h-10 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all ${prefix ? "pl-8 pr-3" : "px-3"} ${suffix ? "pr-14" : ""}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min} max={max} step={step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{prefix}{min.toLocaleString("es-CO")}{suffix}</span>
        <span>{prefix}{max.toLocaleString("es-CO")}{suffix}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight, sublabel }: { label: string; value: string; highlight?: string; sublabel?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <span className="text-sm text-foreground">{label}</span>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
      <span className={`text-sm font-semibold ${highlight ?? "text-foreground"}`}>{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringCalculator() {
  const [nominal, setNominal] = useState(50000000);
  const [tasaMV, setTasaMV] = useState(1.8);
  const [plazo, setPlazo] = useState(90);
  const [comisionPct, setComisionPct] = useState(0.5);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const result = useMemo(
    () => calcFactoring(nominal, tasaMV, plazo, comisionPct),
    [nominal, tasaMV, plazo, comisionPct],
  );

  const pieData = [
    { name: "Neto cedente", value: result.neto,     color: "var(--chart-2)" },
    { name: "Descuento",    value: result.descuento, color: "var(--chart-1)" },
    { name: "Comisión",     value: result.comision,  color: "var(--chart-4)" },
  ];

  const addScenario = () => {
    const id = Date.now().toString();
    const label = `Escenario ${scenarios.length + 1}`;
    setScenarios(prev => [...prev, { id, label, nominal, tasaMV, plazo, comision: comisionPct }]);
  };

  const removeScenario = (id: string) => setScenarios(prev => prev.filter(s => s.id !== id));

  const reset = () => {
    setNominal(50000000);
    setTasaMV(1.8);
    setPlazo(90);
    setComisionPct(0.5);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Calculator className="size-5 text-primary" />
            Calculadora de Factoring
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Simule el rendimiento de una operación en tiempo real</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={reset}>
            <RotateCcw className="size-3.5 .5" /> Restablecer
          </Button>
          <Button variant="default" size="sm" className="gap-1.5" onClick={addScenario}>
            <Save className="size-3.5 .5" /> Guardar escenario
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Parámetros de la Operación</CardTitle>
            <CardDescription className="text-xs">Ajusta los sliders o escribe directamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <NumInput
              label="Valor Nominal de la Factura"
              value={nominal}
              onChange={setNominal}
              prefix="$"
              min={5000000}
              max={500000000}
              step={1000000}
              hint="COP"
            />
            <Separator />
            <NumInput
              label="Tasa de Descuento"
              value={tasaMV}
              onChange={setTasaMV}
              suffix="% MV"
              min={0.5}
              max={5.0}
              step={0.1}
              hint="Mensual vencida"
            />
            <Separator />
            <NumInput
              label="Plazo de la Operación"
              value={plazo}
              onChange={setPlazo}
              suffix=" días"
              min={15}
              max={180}
              step={1}
              hint="Días hasta vencimiento"
            />
            <Separator />
            <NumInput
              label="Comisión de Administración"
              value={comisionPct}
              onChange={setComisionPct}
              suffix="% s/nominal"
              min={0}
              max={3}
              step={0.1}
              hint="Cargo único"
            />
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {/* Donut */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Distribución del Capital</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-[130px] h-[130px] flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" innerRadius={38} outerRadius={58} paddingAngle={2} stroke="none">
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <ReTooltip
                        formatter={(v: number) => COP.format(v)}
                        contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", fontSize: "0.6875rem" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {pieData.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="size-2.5 .5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">{((d.value / nominal) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Resumen Financiero</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="divide-y divide-border/50">
                <ResultRow
                  label="Valor nominal"
                  value={COP.format(nominal)}
                />
                <ResultRow
                  label="Descuento financiero"
                  value={`− ${COP.format(result.descuento)}`}
                  highlight="text-destructive-on-subtle"
                  sublabel={`${((result.descuento / nominal) * 100).toFixed(2)}% s/nominal`}
                />
                <ResultRow
                  label="Comisión de administración"
                  value={`− ${COP.format(result.comision)}`}
                  highlight="text-warning-on-subtle"
                  sublabel={`${comisionPct.toFixed(1)}% cargo único`}
                />
                <ResultRow
                  label="Desembolso bruto"
                  value={COP.format(result.desembolso)}
                />
                <div className="flex items-center justify-between py-3 bg-primary/5 -mx-4 px-4 mt-1 rounded-md">
                  <div>
                    <span className="text-sm font-bold text-foreground">Neto para el cedente</span>
                    <p className="text-xs text-muted-foreground">Lo que recibe efectivamente</p>
                  </div>
                  <span className="text-lg font-bold text-success-on-subtle">{COP.format(result.neto)}</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Percent className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">TEA equivalente</span>
                    <Info className="size-3 text-muted-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">{result.tea.toFixed(2)}%</span>
                  <p className="text-xs text-muted-foreground">Tasa efectiva anual</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Rentabilidad neta</span>
                  </div>
                  <span className="text-xl font-bold text-success-on-subtle">{result.rentabilidad.toFixed(2)}%</span>
                  <p className="text-xs text-muted-foreground">Descuento / Desembolso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scenario comparison */}
      {scenarios.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="size-4 text-primary" />
                Comparación de Escenarios
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 text-muted-foreground" onClick={() => setScenarios([])}>
                <Trash2 className="size-3.5 .5" /> Limpiar
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Escenario</TableHead>
                  <TableHead className="text-xs text-right">Nominal</TableHead>
                  <TableHead className="text-xs text-right">Tasa MV</TableHead>
                  <TableHead className="text-xs text-right">Plazo</TableHead>
                  <TableHead className="text-xs text-right">Descuento</TableHead>
                  <TableHead className="text-xs text-right">Neto cedente</TableHead>
                  <TableHead className="text-xs text-right">TEA</TableHead>
                  <TableHead className="w-8" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((s) => {
                  const r = calcFactoring(s.nominal, s.tasaMV, s.plazo, s.comision);
                  const best = scenarios.reduce((prev, cur) => {
                    const rp = calcFactoring(prev.nominal, prev.tasaMV, prev.plazo, prev.comision);
                    const rc = calcFactoring(cur.nominal, cur.tasaMV, cur.plazo, cur.comision);
                    return rc.rentabilidad > rp.rentabilidad ? cur : prev;
                  });
                  const isBest = best.id === s.id && scenarios.length > 1;
                  return (
                    <TableRow key={s.id} className={isBest ? "bg-success-subtle/50" : ""}>
                      <TableCell className="text-xs font-medium">
                        {s.label}
                        {isBest && <Badge variant="success-soft-outline" className="ml-2">Mejor</Badge>}
                      </TableCell>
                      <TableCell className="text-xs text-right">{COP.format(s.nominal)}</TableCell>
                      <TableCell className="text-xs text-right">{s.tasaMV.toFixed(1)}%</TableCell>
                      <TableCell className="text-xs text-right">{s.plazo}d</TableCell>
                      <TableCell className="text-xs text-right text-destructive-on-subtle">{COP.format(r.descuento)}</TableCell>
                      <TableCell className="text-xs text-right font-semibold text-success-on-subtle">{COP.format(r.neto)}</TableCell>
                      <TableCell className="text-xs text-right">{r.tea.toFixed(1)}%</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" className="size-6 text-muted-foreground hover:text-destructive" aria-label="Eliminar escenario" onClick={() => removeScenario(s.id)}>
                          <Trash2 className="size-3.5 .5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {scenarios.length === 0 && (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="py-6 flex flex-col items-center gap-2 text-center">
            <Plus className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Guarda escenarios para comparar diferentes condiciones</p>
            <Button variant="outline" size="sm" className="gap-1.5 mt-1" onClick={addScenario}>
              <Save className="size-3.5 .5" /> Guardar escenario actual
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
