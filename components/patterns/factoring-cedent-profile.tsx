import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ProgressWithRange } from "../ui/progresswithrange";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { SafeChartContainer } from "../ui/safechartcontainer";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar,
} from "recharts";
import {
  Building2, Phone, Mail, MapPin, Calendar, FileText, Download,
  TrendingUp,
  ExternalLink, Shield, Star, Edit,
} from "lucide-react";
import { cn, formatCOP } from "../../lib/utils";
import {
  cedent,
  historialMensual,
  scoreHistory,
  operaciones,
  documentos,
} from "./mocks/factoring-cedent-profile.mock";

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
      <div className="flex-1 max-w-[120px]">
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div className={cn("h-full transition-all", barColor)} style={{ width: `${score}%` }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter font-semibold">
          {score >= 80 ? "Excelente" : score >= 65 ? "Aceptable" : "Riesgo Alto"}
        </p>
      </div>
    </div>
  );
}

export function FactoringCedentProfile() {
  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="size-16 rounded-2xl bg-secondary flex items-center justify-center text-white text-2xl font-bold border-4 border-background shadow-elevation-2 flex-shrink-0">
            {cedent.nombre.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-foreground">{cedent.nombre}</h2>
              <Badge variant="success-soft" className="uppercase text-[10px] font-bold tracking-wider">
                <Shield className="size-3 mr-1" /> {cedent.status}
              </Badge>
              <Badge variant="outline" className="text-[10px]">ID: {cedent.id}</Badge>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-0.5">
              <Building2 className="size-3.5" /> {cedent.razonSocial}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="size-3" /> {cedent.ciudad}</span>
              <span className="flex items-center gap-1 font-mono">{cedent.nit}</span>
              <span className="flex items-center gap-1"><Calendar className="size-3" /> Vinculado: {cedent.fechaVinculacion}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="size-4 mr-2" /> Editar Perfil
          </Button>
          <Button size="sm">
            <ExternalLink className="size-4 mr-2" /> Nueva Operación
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Stats & Score */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Credit Score</CardTitle>
                <Star className="size-4 text-warning fill-warning" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ScoreMeter score={cedent.scoreCredito} />
              <div className="mt-6 pt-6 border-t border-dashed">
                <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase">Evolución del Score</p>
                <SafeChartContainer height={100} className="w-full">
                  <LineChart data={scoreHistory}>
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="var(--primary)" 
                      strokeWidth={2} 
                      dot={{ r: 3, fill: "var(--primary)" }} 
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: '10px', borderRadius: '4px', padding: '4px 8px' }}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                  </LineChart>
                </SafeChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Uso de Cupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span>Asignado</span>
                  <span className="text-foreground">{formatCOP(cedent.limiteCredito)}</span>
                </div>
                <ProgressWithRange 
                  value={cedent.creditoUsado} 
                  from="0%"
                  to="100%"
                  className="h-2"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Usado: {cedent.creditoUsado}%</span>
                  <span>Disponible: {formatCOP(cedent.limiteCredito * (1 - cedent.creditoUsado/100))}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Tasa Cobro</p>
                  <p className="text-lg font-bold text-success">{cedent.tasaCobro}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Ops. Activas</p>
                  <p className="text-lg font-bold text-foreground">{cedent.operacionesActivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2 text-xs font-semibold text-muted-foreground uppercase">Información de Contacto</CardHeader>
            <CardContent className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs">
                <div className="size-7 rounded bg-muted flex items-center justify-center text-muted-foreground"><Phone className="size-3.5" /></div>
                <span className="text-foreground font-medium">{cedent.telefono}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="size-7 rounded bg-muted flex items-center justify-center text-muted-foreground"><Mail className="size-3.5" /></div>
                <span className="text-foreground font-medium">{cedent.email}</span>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="size-7 rounded bg-muted flex items-center justify-center text-muted-foreground mt-0.5"><Building2 className="size-3.5" /></div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{cedent.contacto}</p>
                  <p className="text-[10px] text-muted-foreground uppercase mt-1">Analista: {cedent.analista}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Content Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 text-sm">Actividad Operativa</TabsTrigger>
              <TabsTrigger value="operations" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 text-sm">Historial Operaciones</TabsTrigger>
              <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 text-sm">Documentación</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="m-0 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Tendencia de Desembolsos</CardTitle>
                    <p className="text-[10px] text-muted-foreground">Últimos 7 meses (Facturas)</p>
                  </CardHeader>
                  <CardContent>
                    <SafeChartContainer height={180} className="w-full mt-2">
                      <BarChart data={historialMensual}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ borderRadius: '6px', border: '1px solid var(--border)', fontSize: '10px' }} />
                        <Bar dataKey="desembolsado" fill="var(--primary)" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </SafeChartContainer>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold">Tasa de Recaudo</CardTitle>
                    <p className="text-[10px] text-muted-foreground">Eficiencia de cobro vs proyecciones</p>
                  </CardHeader>
                  <CardContent>
                    <SafeChartContainer height={180} className="w-full mt-2">
                      <LineChart data={historialMensual}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                        <Line type="monotone" dataKey="cobrado" stroke="var(--success)" strokeWidth={2} dot={{ r: 3 }} />
                        <Tooltip contentStyle={{ borderRadius: '6px', border: '1px solid var(--border)', fontSize: '10px' }} />
                      </LineChart>
                    </SafeChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Métricas de Salud</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Mora Promedio</p>
                    <p className="text-xl font-bold text-foreground">3.2 días</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Tasa Prom.</p>
                    <p className="text-xl font-bold text-foreground">1.85%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Plazo Medio</p>
                    <p className="text-xl font-bold text-foreground">72 días</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Recalificación</p>
                    <div className="flex items-center justify-center gap-1 text-success">
                      <TrendingUp className="size-4" />
                      <p className="text-xl font-bold">A+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="m-0">
              <Card className="border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="text-xs">ID Operación</TableHead>
                      <TableHead className="text-xs">Pagador</TableHead>
                      <TableHead className="text-right text-xs">Monto</TableHead>
                      <TableHead className="text-right text-xs">Vencimiento</TableHead>
                      <TableHead className="text-right text-xs">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operaciones.map((op) => {
                      const status = opStatus[op.status];
                      return (
                        <TableRow key={op.id} className="hover:bg-muted/10 cursor-pointer">
                          <TableCell className="font-mono text-xs font-semibold text-primary">{op.id}</TableCell>
                          <TableCell className="text-xs font-medium">{op.deudor}</TableCell>
                          <TableCell className="text-right text-xs font-bold tabular-nums">{formatCOP(op.valor)}</TableCell>
                          <TableCell className="text-right text-xs tabular-nums text-muted-foreground">{op.fechaVenc}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={status.variant} className="text-[10px] h-5">{status.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <div className="p-3 border-t bg-muted/5 text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-primary">Cargar más historial</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="m-0">
              <div className="grid gap-3">
                {documentos.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", doc.vigente ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                        <FileText className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{doc.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">{doc.tipo} · Actualizado: {doc.fecha}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!doc.vigente && <Badge variant="destructive-soft" className="text-[9px] h-4 px-1 uppercase font-bold">Vencido</Badge>}
                      <Button variant="ghost" size="icon" className="size-8">
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 border-dashed h-10 text-xs">
                  Subir nuevo documento corporativo
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
