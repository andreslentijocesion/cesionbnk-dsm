import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ProgressWithRange } from "../ui/progress-with-range";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { SafeChartContainer } from "../ui/safe-chart-container";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar,
} from "recharts";
import {
  Building2, Phone, Mail, MapPin, Calendar, FileText, Download,
  TrendingUp,
  ExternalLink, Shield, Star, Edit,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

const cedent = {
  id: "CED-001",
  nombre: "Servicios TI Colombia S.A.S.",
  nit: "900.123.456-1",
  razonSocial: "Servicios de Tecnología e Innovación Colombia S.A.S.",
  sector: "Tecnología de la Información",
  ciudad: "Bogotá D.C.",
  direccion: "Cra 7 # 72-41, Piso 8, Torre Norte",
  telefono: "+57 601 345 6789",
  email: "tesoreria@serviciosticolombia.com",
  contacto: "Laura Martínez — Directora Financiera",
  fechaVinculacion: "2022-03-15",
  analista: "C. Vargas",
  scoreCredito: 87,
  limiteCredito: 800_000_000,
  creditoUsado: 65,
  status: "activo" as const,
  operacionesActivas: 12,
  operacionesTotales: 34,
  valorPortafolio: 520_000_000,
  tasaCobro: 96.4,
  facturasVencidas: 0,
  tasaDescuentoPromedio: 1.75,
};

const historialMensual = [
  { mes: "Sep", desembolsado: 38, cobrado: 35 },
  { mes: "Oct", desembolsado: 45, cobrado: 42 },
  { mes: "Nov", desembolsado: 52, cobrado: 48 },
  { mes: "Dic", desembolsado: 61, cobrado: 58 },
  { mes: "Ene", desembolsado: 74, cobrado: 70 },
  { mes: "Feb", desembolsado: 88, cobrado: 83 },
  { mes: "Mar", desembolsado: 95, cobrado: 87 },
];

const scoreHistory = [
  { mes: "Sep", score: 79 },
  { mes: "Oct", score: 81 },
  { mes: "Nov", score: 82 },
  { mes: "Dic", score: 84 },
  { mes: "Ene", score: 83 },
  { mes: "Feb", score: 86 },
  { mes: "Mar", score: 87 },
];

const operaciones = [
  { id: "FCT-2025-001", deudor: "Banco de Bogotá S.A.",  valor: 185_000_000, tasa: 1.8, fechaInicio: "2025-01-15", fechaVenc: "2025-03-15", cobrado: 82,  status: "en-cobro" as const },
  { id: "FCT-2025-005", deudor: "Ecopetrol S.A.",         valor: 520_000_000, tasa: 1.6, fechaInicio: "2025-02-01", fechaVenc: "2025-05-01", cobrado: 20,  status: "desembolsado" as const },
  { id: "FCT-2024-088", deudor: "Avianca S.A.",            valor: 210_000_000, tasa: 1.9, fechaInicio: "2024-11-01", fechaVenc: "2025-01-30", cobrado: 100, status: "cobrado" as const },
  { id: "FCT-2024-071", deudor: "Claro Colombia S.A.",     valor: 95_000_000,  tasa: 2.1, fechaInicio: "2024-09-15", fechaVenc: "2024-12-15", cobrado: 100, status: "cobrado" as const },
  { id: "FCT-2024-055", deudor: "Grupo Nutresa S.A.",      valor: 145_000_000, tasa: 1.7, fechaInicio: "2024-07-01", fechaVenc: "2024-10-01", cobrado: 100, status: "cobrado" as const },
];

const documentos = [
  { nombre: "NIT actualizado",               tipo: "PDF", fecha: "2025-01-10", vigente: true  },
  { nombre: "Cámara de Comercio",            tipo: "PDF", fecha: "2025-01-10", vigente: true  },
  { nombre: "Estados financieros 2024",      tipo: "PDF", fecha: "2025-02-28", vigente: true  },
  { nombre: "Declaración de renta 2023",     tipo: "PDF", fecha: "2024-09-15", vigente: true  },
  { nombre: "Certificado bancario",          tipo: "PDF", fecha: "2025-01-14", vigente: true  },
  { nombre: "Pagaré marco vigente",          tipo: "PDF", fecha: "2024-06-01", vigente: false },
  { nombre: "Carta de instrucción irrevocable", tipo: "PDF", fecha: "2024-06-01", vigente: false },
];

const opStatus: Record<string, { label: string; variant: "success-soft-outline" | "warning-soft-outline" | "secondary-soft-outline" | "destructive-soft-outline" }> = {
  "en-cobro":   { label: "En cobro",     variant: "warning-soft-outline"     },
  desembolsado: { label: "Desembolsado", variant: "secondary-soft-outline"   },
  cobrado:      { label: "Cobrado",      variant: "success-soft-outline"     },
  vencido:      { label: "Vencido",      variant: "destructive-soft-outline" },
};

function ScoreMeter({ score }: { score: number }) {
  const color = score >= 80 ? "text-success-on-subtle" : score >= 65 ? "text-warning-on-subtle" : "text-destructive-on-subtle";
  const barColor = score >= 80 ? "bg-success" : score >= 65 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-3">
      <div className={cn("text-3xl font-bold tabular-nums", color)}>{score}</div>
      <div className="flex-1 space-y-1">
        <Progress value={score} className="h-2 bg-muted" indicatorClassName={barColor} />
        <p className="text-xs text-muted-foreground">{score >= 80 ? "Riesgo bajo" : score >= 65 ? "Riesgo medio" : "Riesgo alto"} · Escala 0–100</p>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-border/40 last:border-0">
      {icon && <span className="text-muted-foreground mt-0.5 flex-shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm text-foreground font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export function FactoringCedentProfile() {
  const usedAmount = cedent.limiteCredito * (cedent.creditoUsado / 100);
  const availableAmount = cedent.limiteCredito - usedAmount;

  return (
    <div className="space-y-4">
      {/* ── Profile Header ── */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-foreground">{cedent.nombre}</h2>
                  <Badge variant="success-soft-outline">Activo</Badge>
                  <Badge variant="secondary-soft-outline" className="text-xs">{cedent.id}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{cedent.razonSocial}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> NIT {cedent.nit}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {cedent.ciudad}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Vinculado {cedent.fechaVinculacion}</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> Analista: {cedent.analista}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Edit className="h-3.5 w-3.5 mr-1.5" /> Editar
              </Button>
              <Button size="sm" className="h-8 text-xs">
                <FileText className="h-3.5 w-3.5 mr-1.5" /> Nueva operación
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Portafolio activo",  value: new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(cedent.valorPortafolio), sub: `${cedent.operacionesActivas} operaciones`, color: "text-primary" },
              { label: "Tasa de cobro",      value: `${cedent.tasaCobro}%`, sub: "Histórico acumulado", color: "text-success-on-subtle" },
              { label: "Ops. totales",       value: `${cedent.operacionesTotales}`, sub: `${cedent.operacionesActivas} activas`, color: "text-foreground" },
              { label: "Tasa prom. MV",      value: `${cedent.tasaDescuentoPromedio}%`, sub: "Tasa pactada promedio", color: "text-secondary" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/50 px-3 py-2.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <p className={cn("text-xl font-bold tabular-nums mt-0.5", s.color)}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Tabs ── */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="h-9 bg-muted/60">
          <TabsTrigger value="overview" className="text-xs">Resumen</TabsTrigger>
          <TabsTrigger value="operations" className="text-xs">Operaciones</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs">Documentos</TabsTrigger>
          <TabsTrigger value="credit" className="text-xs">Crédito</TabsTrigger>
        </TabsList>

        {/* ── Overview ── */}
        <TabsContent value="overview" className="space-y-4 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Evolución mensual */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle>Volumen mensual (COP millones)</CardTitle>
                <CardDescription className="text-xs">Desembolsado vs cobrado — últimos 7 meses</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pb-3">
                <SafeChartContainer width="100%" height={180} minHeight="180px">
                  <BarChart data={historialMensual} margin={{ top: 5, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} width={48} />
                    <Tooltip formatter={(v: number) => [`$${v}M`, ""]} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="desembolsado" name="Desembolsado" fill="var(--secondary)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="cobrado"      name="Cobrado"      fill="var(--success)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </SafeChartContainer>
              </CardContent>
            </Card>

            {/* Info + Score */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2 px-4 pt-4">
                  <CardTitle>Score crediticio</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3 space-y-3">
                  <ScoreMeter score={cedent.scoreCredito} />
                  <SafeChartContainer width="100%" height={60} minHeight="60px">
                    <LineChart data={scoreHistory}>
                      <Line type="monotone" dataKey="score" stroke="var(--success)" strokeWidth={2} dot={false} />
                      <Tooltip formatter={(v: number) => [v, "Score"]} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                    </LineChart>
                  </SafeChartContainer>
                  <div className="flex items-center gap-1 text-xs text-success-on-subtle">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span className="font-medium">+8 puntos vs hace 6 meses</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-1 px-4 pt-3">
                  <CardTitle>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3">
                  <InfoRow label="Responsable" value={cedent.contacto} icon={<Building2 className="h-3.5 w-3.5" />} />
                  <InfoRow label="Teléfono" value={cedent.telefono} icon={<Phone className="h-3.5 w-3.5" />} />
                  <InfoRow label="Email" value={cedent.email} icon={<Mail className="h-3.5 w-3.5" />} />
                  <InfoRow label="Dirección" value={cedent.direccion} icon={<MapPin className="h-3.5 w-3.5" />} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── Operations ── */}
        <TabsContent value="operations" className="m-0">
          <Card className="overflow-hidden">
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historial de operaciones</CardTitle>
                  <CardDescription className="text-xs">{operaciones.length} operaciones registradas</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Exportar
                </Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="text-xs">Folio</TableHead>
                    <TableHead className="text-xs">Deudor</TableHead>
                    <TableHead className="text-xs text-right">Valor</TableHead>
                    <TableHead className="text-xs">Tasa</TableHead>
                    <TableHead className="text-xs min-w-[160px]">Emisión / Vencimiento</TableHead>
                    <TableHead className="text-xs">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operaciones.map((op) => (
                    <TableRow key={op.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">{op.id}</TableCell>
                      <TableCell className="text-xs font-medium">{op.deudor}</TableCell>
                      <TableCell className="text-right text-xs tabular-nums font-mono">{COP(op.valor)}</TableCell>
                      <TableCell className="text-xs">{op.tasa}% MV</TableCell>
                      <TableCell>
                        {(() => {
                          const start  = new Date(op.fechaInicio);
                          const end    = new Date(op.fechaVenc);
                          const today  = new Date("2025-03-07");
                          const total  = Math.max(1, (end.getTime() - start.getTime()) / 86_400_000);
                          const elapsed = (today.getTime() - start.getTime()) / 86_400_000;
                          const pct    = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
                          const fmt    = (d: Date) => d.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
                          const indicatorClass = op.cobrado === 100 ? "bg-success" : pct >= 80 ? "bg-warning" : "bg-primary";
                          return (
                            <ProgressWithRange
                              value={op.cobrado === 100 ? 100 : pct}
                              from={fmt(start)}
                              to={fmt(end)}
                              barClassName="h-1.5 bg-muted"
                              indicatorClassName={indicatorClass}
                              className="min-w-[148px]"
                            />
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={opStatus[op.status].variant} className="text-xs">{opStatus[op.status].label}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* ── Documents ── */}
        <TabsContent value="documents" className="m-0">
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documentos legales</CardTitle>
                  <CardDescription className="text-xs">{documentos.filter(d => d.vigente).length} vigentes · {documentos.filter(d => !d.vigente).length} por renovar</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs border-dashed">
                  <FileText className="h-3.5 w-3.5 mr-1.5" /> Subir documento
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {documentos.map((doc) => (
                <div key={doc.nombre} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors group">
                  <div className={cn("h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0", doc.vigente ? "bg-primary/10" : "bg-destructive/10")}>
                    <FileText className={cn("h-4 w-4", doc.vigente ? "text-primary" : "text-destructive")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{doc.nombre}</p>
                    <p className="text-xs text-muted-foreground">{doc.tipo} · Cargado {doc.fecha}</p>
                  </div>
                  {doc.vigente
                    ? <Badge variant="success-soft-outline" className="text-xs">Vigente</Badge>
                    : <Badge variant="destructive-soft-outline" className="text-xs">Por renovar</Badge>}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Credit ── */}
        <TabsContent value="credit" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle>Límite de crédito</CardTitle>
                <CardDescription className="text-xs">Cupo aprobado y utilización actual</CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cupo total</span>
                    <span className="font-bold tabular-nums">{COP(cedent.limiteCredito)}</span>
                  </div>
                  <Progress value={cedent.creditoUsado} className="h-3 bg-muted rounded-full" indicatorClassName={cedent.creditoUsado >= 80 ? "bg-warning" : "bg-primary"} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Usado: {COP(usedAmount)} ({cedent.creditoUsado}%)</span>
                    <span>Disponible: {COP(availableAmount)}</span>
                  </div>
                </div>
                <Separator />
                {[
                  { label: "Cupo aprobado",   value: COP(cedent.limiteCredito) },
                  { label: "Cupo utilizado",  value: COP(usedAmount) },
                  { label: "Cupo disponible", value: COP(availableAmount) },
                  { label: "Operaciones activas", value: `${cedent.operacionesActivas}` },
                  { label: "Facturas vencidas",   value: `${cedent.facturasVencidas}` },
                  { label: "Última revisión",     value: "2025-02-15" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-xs font-semibold tabular-nums">{row.value}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs">Solicitar aumento de cupo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="px-4 pt-4 pb-3">
                <CardTitle>Condiciones comerciales</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {[
                  { label: "Tasa base MV",        value: "1.6% – 2.1% MV" },
                  { label: "Plazo máximo",        value: "120 días" },
                  { label: "Comisión de gestión", value: "0.20% s/desembolso" },
                  { label: "Deudores permitidos", value: "Categoría A y B" },
                  { label: "Concentración max.",  value: "40% por deudor" },
                  { label: "Mínimo por factura",  value: COP(5_000_000) },
                  { label: "Tipo de facturación", value: "Electrónica y física" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-xs font-semibold text-foreground">{row.value}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs">Modificar condiciones</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
