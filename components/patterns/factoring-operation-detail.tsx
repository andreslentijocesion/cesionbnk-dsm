import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CheckCircle2, Clock, DollarSign, FileText, AlertTriangle,
  Building2, User, Calendar, Percent, Download, ExternalLink,
  Send, XCircle, RotateCcw, Stamp,
} from "lucide-react";
import { cn } from "../ui/utils";

// ─── Types (re-used from portfolio table) ─────────────────────────────────────

export type FactoringStatus =
  | "aprobado" | "desembolsado" | "en-cobro" | "cobrado" | "vencido" | "rechazado";

export interface FactoringRecord {
  id: string;
  cedente: string;
  deudor: string;
  valorNominal: number;
  valorDesembolsado: number;
  tasaDescuento: number;
  fechaInicio: string;
  fechaVencimiento: string;
  diasRestantes: number;
  cobradoPct: number;
  status: FactoringStatus;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

const statusConfig: Record<FactoringStatus, {
  label: string;
  variant: "success-soft-outline" | "warning-soft-outline" | "info-soft-outline" |
           "destructive-soft-outline" | "neutral-soft-outline" | "secondary-soft-outline";
}> = {
  aprobado:     { label: "Aprobado",     variant: "info-soft-outline" },
  desembolsado: { label: "Desembolsado", variant: "secondary-soft-outline" },
  "en-cobro":   { label: "En cobro",     variant: "warning-soft-outline" },
  cobrado:      { label: "Cobrado",      variant: "success-soft-outline" },
  vencido:      { label: "Vencido",      variant: "destructive-soft-outline" },
  rechazado:    { label: "Rechazado",    variant: "neutral-soft-outline" },
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

type TimelineEvent = {
  label: string;
  date: string;
  desc: string;
  icon: React.ReactNode;
  done: boolean;
};

function buildTimeline(r: FactoringRecord): TimelineEvent[] {
  const done = (s: FactoringStatus) =>
    ["aprobado", "desembolsado", "en-cobro", "cobrado"].includes(r.status) &&
    ["aprobado", "desembolsado", "en-cobro", "cobrado"].indexOf(r.status) >=
    ["aprobado", "desembolsado", "en-cobro", "cobrado"].indexOf(s);

  return [
    {
      label: "Radicación",
      date: r.fechaInicio,
      desc: `Operación radicada por ${r.cedente}`,
      icon: <FileText className="h-3.5 w-3.5" />,
      done: true,
    },
    {
      label: "Aprobación comité",
      date: r.fechaInicio,
      desc: `Aprobada. Tasa: ${r.tasaDescuento}% MV`,
      icon: <Stamp className="h-3.5 w-3.5" />,
      done: done("aprobado") || r.status === "rechazado",
    },
    {
      label: "Desembolso",
      date: r.fechaInicio,
      desc: r.valorDesembolsado > 0 ? `${COP(r.valorDesembolsado)} enviados al cedente` : "Pendiente",
      icon: <DollarSign className="h-3.5 w-3.5" />,
      done: done("desembolsado"),
    },
    {
      label: "Gestión de cobro",
      date: r.fechaVencimiento,
      desc: r.cobradoPct > 0 ? `${r.cobradoPct}% recaudado` : "En proceso",
      icon: <Clock className="h-3.5 w-3.5" />,
      done: done("en-cobro"),
    },
    {
      label: "Cobro total",
      date: r.fechaVencimiento,
      desc: r.status === "cobrado" ? "Operación cerrada exitosamente" : "Pendiente",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      done: r.status === "cobrado",
    },
  ];
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-border/40 last:border-0 gap-4">
      <span className="text-xs text-muted-foreground flex-shrink-0 w-36">{label}</span>
      <span className={cn("text-xs text-foreground text-right font-medium", mono && "font-mono tabular-nums")}>{value}</span>
    </div>
  );
}

// ─── Action Buttons by Status ─────────────────────────────────────────────────

function DetailActions({ status }: { status: FactoringStatus }) {
  const sets: Record<FactoringStatus, React.ReactNode> = {
    aprobado: (
      <>
        <Button size="sm" className="flex-1"><DollarSign className="h-4 w-4 mr-1.5" />Desembolsar</Button>
        <Button size="sm" variant="destructive" className="flex-1"><XCircle className="h-4 w-4 mr-1.5" />Rechazar</Button>
      </>
    ),
    desembolsado: (
      <>
        <Button size="sm" className="flex-1"><CheckCircle2 className="h-4 w-4 mr-1.5" />Marcar cobrado</Button>
        <Button size="sm" variant="outline" className="flex-1"><Send className="h-4 w-4 mr-1.5" />Notificar deudor</Button>
      </>
    ),
    "en-cobro": (
      <>
        <Button size="sm" className="flex-1"><CheckCircle2 className="h-4 w-4 mr-1.5" />Registrar cobro</Button>
        <Button size="sm" variant="outline" className="flex-1"><Send className="h-4 w-4 mr-1.5" />Enviar recordatorio</Button>
      </>
    ),
    cobrado: (
      <Button size="sm" variant="outline" className="flex-1"><Download className="h-4 w-4 mr-1.5" />Descargar soporte</Button>
    ),
    vencido: (
      <>
        <Button size="sm" className="flex-1"><RotateCcw className="h-4 w-4 mr-1.5" />Iniciar cobranza</Button>
        <Button size="sm" variant="outline" className="flex-1"><CheckCircle2 className="h-4 w-4 mr-1.5" />Marcar cobrado</Button>
      </>
    ),
    rechazado: (
      <Button size="sm" variant="outline" className="flex-1"><RotateCcw className="h-4 w-4 mr-1.5" />Reactivar</Button>
    ),
  };
  return <div className="flex gap-2">{sets[status]}</div>;
}

// ─── Documents Tab ────────────────────────────────────────────────────────────

const mockDocs = [
  { name: "Factura original.pdf",        size: "1.2 MB", date: "2025-01-15", type: "PDF" },
  { name: "Pagaré firmado.pdf",          size: "0.8 MB", date: "2025-01-15", type: "PDF" },
  { name: "Certificado bancario.pdf",    size: "0.4 MB", date: "2025-01-14", type: "PDF" },
  { name: "Carta de instrucción.docx",   size: "0.2 MB", date: "2025-01-16", type: "DOCX" },
];

// ─── Main Export ──────────────────────────────────────────────────────────────

interface Props {
  record: FactoringRecord | null;
  open: boolean;
  onClose: () => void;
}

export function FactoringOperationDetail({ record, open, onClose }: Props) {
  if (!record) return null;

  const timeline = buildTimeline(record);
  const descuento = record.valorNominal - record.valorDesembolsado;
  const plazoEstimado = Math.round(
    (new Date(record.fechaVencimiento).getTime() - new Date(record.fechaInicio).getTime()) / 86_400_000
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-[520px] flex flex-col p-0 gap-0">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <SheetTitle className="text-base font-semibold">{record.id}</SheetTitle>
              <SheetDescription className="text-xs">{record.cedente}</SheetDescription>
            </div>
            <Badge variant={statusConfig[record.status].variant}>{statusConfig[record.status].label}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Nominal</p>
              <p className="text-sm font-bold tabular-nums">{new Intl.NumberFormat("es-CO", { notation: "compact", maximumFractionDigits: 1 }).format(record.valorNominal)}</p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Tasa MV</p>
              <p className="text-sm font-bold">{record.tasaDescuento > 0 ? `${record.tasaDescuento}%` : "—"}</p>
            </div>
            <div className="rounded-lg bg-muted px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Plazo</p>
              <p className="text-sm font-bold">{plazoEstimado}d</p>
            </div>
          </div>
          {/* Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{record.fechaInicio}</span>
              <span className="font-medium">{record.cobradoPct}% cobrado</span>
              <span className="text-muted-foreground">{record.fechaVencimiento}</span>
            </div>
            <Progress
              value={record.status === "cobrado" ? 100 : record.cobradoPct}
              className="h-2 bg-muted"
              indicatorClassName={
                record.status === "cobrado" ? "bg-success" :
                record.status === "vencido" ? "bg-destructive" :
                record.cobradoPct >= 80 ? "bg-warning" : "bg-primary"
              }
            />
          </div>
        </SheetHeader>

        {/* Tabs */}
        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="resumen" className="h-full flex flex-col">
            <TabsList className="w-full rounded-none border-b border-border bg-muted/40 h-10 px-4 gap-1 justify-start">
              <TabsTrigger value="resumen" className="h-8 text-xs rounded-md data-[state=active]:bg-background">Resumen</TabsTrigger>
              <TabsTrigger value="timeline" className="h-8 text-xs rounded-md data-[state=active]:bg-background">Línea de tiempo</TabsTrigger>
              <TabsTrigger value="documentos" className="h-8 text-xs rounded-md data-[state=active]:bg-background">Documentos</TabsTrigger>
            </TabsList>

            {/* ── Resumen ── */}
            <TabsContent value="resumen" className="m-0 flex-1 overflow-auto px-5 py-4 space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Cedente</p>
                <InfoRow label="Empresa" value={record.cedente} />
                <InfoRow label="Contacto" value="Juan Pérez" />
                <InfoRow label="Correo" value="juan@empresa.com" />
                <InfoRow label="Banco" value="Bancolombia" />
                <InfoRow label="Cuenta" value="•••• •••• 4821" />
              </div>
              <Separator />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Deudor</p>
                <InfoRow label="Empresa" value={record.deudor} />
                <InfoRow label="NIT" value="900.123.456-1" />
                <InfoRow label="Sector" value="Energía" />
                <InfoRow label="Calificación riesgo" value="Bajo" />
              </div>
              <Separator />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Condiciones financieras</p>
                <InfoRow label="Valor nominal"       value={COP(record.valorNominal)}       mono />
                <InfoRow label="Descuento aplicado"  value={descuento > 0 ? `- ${COP(descuento)}` : "—"} mono />
                <InfoRow label="Valor desembolsado"  value={record.valorDesembolsado > 0 ? COP(record.valorDesembolsado) : "Pendiente"} mono />
                <InfoRow label="Tasa MV"             value={record.tasaDescuento > 0 ? `${record.tasaDescuento}% MV` : "—"} />
                <InfoRow label="Tasa EA estimada"    value={record.tasaDescuento > 0 ? `${(((1 + record.tasaDescuento / 100) ** 12) - 1).toFixed(1)}% EA` : "—"} />
                <InfoRow label="Plazo"               value={`${plazoEstimado} días`} />
                <InfoRow label="Fecha inicio"        value={record.fechaInicio} />
                <InfoRow label="Fecha vencimiento"   value={record.fechaVencimiento} />
              </div>
            </TabsContent>

            {/* ── Timeline ── */}
            <TabsContent value="timeline" className="m-0 flex-1 overflow-auto px-5 py-4">
              <div className="relative space-y-0">
                {timeline.map((ev, i) => (
                  <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
                    {/* Vertical line */}
                    {i < timeline.length - 1 && (
                      <div className={cn(
                        "absolute left-3.5 top-7 bottom-0 w-0.5",
                        ev.done ? "bg-primary/40" : "bg-border"
                      )} />
                    )}
                    {/* Icon */}
                    <div className={cn(
                      "h-7 w-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10",
                      ev.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-background text-muted-foreground"
                    )}>
                      {ev.icon}
                    </div>
                    {/* Content */}
                    <div className="pt-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-medium", ev.done ? "text-foreground" : "text-muted-foreground")}>
                          {ev.label}
                        </span>
                        {ev.done && <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{ev.desc}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">{ev.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ── Documentos ── */}
            <TabsContent value="documentos" className="m-0 flex-1 overflow-auto px-5 py-4 space-y-2">
              {mockDocs.map((doc) => (
                <div key={doc.name} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors group">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doc.size} · {doc.date}</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2 text-xs border-dashed">
                <FileText className="h-3.5 w-3.5 mr-1.5" /> Adjuntar documento
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer actions */}
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <DetailActions status={record.status} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
