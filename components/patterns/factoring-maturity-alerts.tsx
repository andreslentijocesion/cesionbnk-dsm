/* eslint-disable */
import { useState } from "react";
import { Card, CardContent } from "../ui/card";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ProgressWithRange } from "../ui/progress-with-range";
import { Checkbox } from "../ui/checkbox";
import {
  AlertTriangle, Clock, CheckCircle2, Send, Phone,
  Bell, BellOff, ArrowRight, RefreshCw,
} from "lucide-react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { FactoringOperationDetail, FactoringRecord } from "./factoring-operation-detail";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

type Urgency = "vencido" | "critico" | "proximo" | "vigilar";

interface Alert {
  id: string;
  operacionId: string;
  cedente: string;
  deudor: string;
  valorNominal: number;
  cobradoPct: number;
  fechaVencimiento: string;
  fechaInicio: string;
  diasRestantes: number;
  urgency: Urgency;
  recordatoriosEnviados: number;
  ultimoContacto: string | null;
  analista: string;
  muted: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "ALT-001", operacionId: "FCT-2025-004",
    cedente: "Agropecuaria Los Llanos S.A.", deudor: "Grupo Nutresa S.A.",
    valorNominal: 78_000_000, cobradoPct: 0,
    fechaInicio: "2025-01-08", fechaVencimiento: "2025-02-28",
    diasRestantes: -8, urgency: "vencido", recordatoriosEnviados: 4,
    ultimoContacto: "2025-03-04", analista: "M. Rodríguez", muted: false,
  },
  {
    id: "ALT-002", operacionId: "FCT-2025-007",
    cedente: "Muebles Roble S.A.S.", deudor: "Ikea Colombia S.A.",
    valorNominal: 55_000_000, cobradoPct: 95,
    fechaInicio: "2025-01-10", fechaVencimiento: "2025-03-10",
    diasRestantes: 3, urgency: "critico", recordatoriosEnviados: 2,
    ultimoContacto: "2025-03-05", analista: "A. Torres", muted: false,
  },
  {
    id: "ALT-003", operacionId: "FCT-2025-001",
    cedente: "Construcciones Andina S.A.", deudor: "Banco de Bogotá S.A.",
    valorNominal: 185_000_000, cobradoPct: 82,
    fechaInicio: "2025-01-15", fechaVencimiento: "2025-03-15",
    diasRestantes: 8, urgency: "proximo", recordatoriosEnviados: 1,
    ultimoContacto: "2025-03-03", analista: "C. Vargas", muted: false,
  },
  {
    id: "ALT-004", operacionId: "FCT-2025-011",
    cedente: "Distribuidora Centro S.A.", deudor: "Almacenes La 14 S.A.",
    valorNominal: 95_000_000, cobradoPct: 45,
    fechaInicio: "2025-01-22", fechaVencimiento: "2025-03-22",
    diasRestantes: 15, urgency: "proximo", recordatoriosEnviados: 0,
    ultimoContacto: null, analista: "M. Rodríguez", muted: false,
  },
  {
    id: "ALT-005", operacionId: "FCT-2025-002",
    cedente: "Textiles del Valle Ltda.", deudor: "Almacenes Éxito S.A.",
    valorNominal: 92_500_000, cobradoPct: 45,
    fechaInicio: "2025-01-20", fechaVencimiento: "2025-04-20",
    diasRestantes: 44, urgency: "vigilar", recordatoriosEnviados: 0,
    ultimoContacto: null, analista: "A. Torres", muted: true,
  },
];

const urgencyConfig: Record<Urgency, {
  label: string; icon: React.ReactNode;
  cardBorder: string; headerBg: string;
  badgeVariant: React.ComponentProps<typeof Badge>["variant"];
}> = {
  vencido: {
    label: "Vencido",
    icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
    cardBorder: "border-destructive/40",
    headerBg: "bg-destructive/5",
    badgeVariant: "destructive-soft",
  },
  critico: {
    label: "Crítico (≤ 7d)",
    icon: <Clock className="h-4 w-4 text-warning" />,
    cardBorder: "border-warning/40",
    headerBg: "bg-warning/5",
    badgeVariant: "warning-soft",
  },
  proximo: {
    label: "Próximo (8–30d)",
    icon: <Bell className="h-4 w-4 text-primary" />,
    cardBorder: "border-primary/30",
    headerBg: "bg-primary/5",
    badgeVariant: "primary-soft",
  },
  vigilar: {
    label: "Vigilar (31–60d)",
    icon: <Bell className="h-4 w-4 text-muted-foreground" />,
    cardBorder: "border-border",
    headerBg: "bg-muted/40",
    badgeVariant: "neutral-soft",
  },
};

const URGENCY_ORDER: Urgency[] = ["vencido", "critico", "proximo", "vigilar"];

// ─── Alert Card ───────────────────────────────────────────────────────────────

function AlertCard({ alert, selected, onToggle, onMarkCollected, onMute, onDetail, onSendReminder }: {
  alert: Alert;
  selected: boolean;
  onToggle: () => void;
  onMarkCollected: (id: string) => void;
  onMute: (id: string) => void;
  onDetail: (alert: Alert) => void;
  onSendReminder: (id: string) => void;
}) {
  const cfg = urgencyConfig[alert.urgency];
  const valorPendiente = alert.valorNominal * (1 - alert.cobradoPct / 100);

  return (
    <div className={cn(
      "rounded-lg border overflow-hidden transition-all",
      cfg.cardBorder,
      selected && "ring-2 ring-primary ring-offset-1",
      alert.muted && "opacity-60"
    )}>
      <div className={cn("px-4 py-2.5 flex items-center justify-between gap-3", cfg.headerBg)}>
        <div className="flex items-center gap-2.5">
          <Checkbox checked={selected} onCheckedChange={onToggle} />
          {cfg.icon}
          <span className="text-xs font-semibold text-foreground">{alert.operacionId}</span>
          <Badge variant={cfg.badgeVariant} className="rounded-full text-2xs font-semibold px-1.5 py-0.5">
            {alert.diasRestantes < 0 ? `${Math.abs(alert.diasRestantes)}d vencido` : `${alert.diasRestantes}d restantes`}
          </Badge>
          {alert.muted && <BellOff className="h-3 w-3 text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost" size="icon" className="h-6 w-6"
            title={alert.muted ? "Activar alertas" : "Silenciar"}
            onClick={() => onMute(alert.id)}
          >
            {alert.muted ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDetail(alert)}>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Info */}
          <div className="sm:col-span-2 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">{alert.cedente}</span>
              <span className="text-xs text-muted-foreground">→</span>
              <span className="text-xs text-muted-foreground">{alert.deudor}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span>Nominal: <strong className="text-foreground tabular-nums">{COP(alert.valorNominal)}</strong></span>
              <span>Pendiente: <strong className={cn("tabular-nums", alert.urgency === "vencido" ? "text-destructive" : "text-foreground")}>{COP(valorPendiente)}</strong></span>
              <span>Analista: {alert.analista}</span>
            </div>
            {/* Progress */}
            {(() => {
              const start = new Date(alert.fechaInicio);
              const end   = new Date(alert.fechaVencimiento);
              const fmt   = (d: Date) => d.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });
              const indicatorClass =
                alert.cobradoPct >= 80   ? "bg-success" :
                alert.urgency === "vencido" ? "bg-destructive" :
                alert.urgency === "critico" ? "bg-warning" : "bg-primary";
              return (
                <ProgressWithRange
                  value={alert.cobradoPct}
                  from={fmt(start)}
                  to={fmt(end)}
                  barClassName="h-1.5 bg-muted mt-1.5"
                  indicatorClassName={indicatorClass}
                />
              );
            })()}
          </div>

          {/* Actions */}
          <div className="space-y-1.5">
            <Button size="sm" variant="outline" className="w-full h-7 text-xs justify-start" onClick={() => onSendReminder(alert.id)}>
              <Send className="h-3 w-3 mr-1.5" />
              {alert.recordatoriosEnviados === 0 ? "Enviar 1er recordatorio" : `Recordatorio #${alert.recordatoriosEnviados + 1}`}
            </Button>
            <Button size="sm" variant="outline" className="w-full h-7 text-xs justify-start">
              <Phone className="h-3 w-3 mr-1.5" /> Llamar deudor
            </Button>
            {alert.urgency !== "vencido" || alert.cobradoPct > 0 ? (
              <Button
                size="sm"
                className="w-full h-7 text-xs bg-success/10 hover:bg-success/20 text-success border-success/20 justify-start"
                variant="outline"
                onClick={() => onMarkCollected(alert.id)}
              >
                <CheckCircle2 className="h-3 w-3 mr-1.5" /> Marcar cobrado
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="w-full h-7 text-xs text-destructive border-destructive/20 hover:bg-destructive/5 justify-start">
                <AlertTriangle className="h-3 w-3 mr-1.5" /> Iniciar cobranza
              </Button>
            )}
          </div>
        </div>

        {alert.ultimoContacto && (
          <p className="text-xs text-muted-foreground mt-2">
            Último contacto: {alert.ultimoContacto} · {alert.recordatoriosEnviados} recordatorio{alert.recordatoriosEnviados !== 1 ? "s" : ""} enviado{alert.recordatoriosEnviados !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FactoringMaturityAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showMuted, setShowMuted] = useState(false);
  const [filterUrgency, setFilterUrgency] = useState<Urgency | "all">("all");
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [detailRecord, setDetailRecord] = useState<FactoringRecord | null>(null);

  const visible = alerts.filter((a) =>
    !collected.has(a.id) &&
    (showMuted || !a.muted) &&
    (filterUrgency === "all" || a.urgency === filterUrgency)
  );

  const byUrgency = URGENCY_ORDER.reduce((acc, u) => {
    acc[u] = visible.filter((a) => a.urgency === u);
    return acc;
  }, {} as Record<Urgency, Alert[]>);

  const toggleMute = (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, muted: !a.muted } : a));
    toast.info(alert?.muted ? "Alertas reactivadas" : "Alerta silenciada");
  };

  const markCollected = (id: string) => {
    setCollected((prev) => new Set([...prev, id]));
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const handleMarkCollected = (id: string) => {
    markCollected(id);
    toast.success("Operación marcada como cobrada");
  };

  const markAllSelected = () => {
    const count = selected.size;
    selected.forEach((id) => markCollected(id));
    toast.success(`${count} operación${count !== 1 ? "es" : ""} marcada${count !== 1 ? "s" : ""} como cobrada${count !== 1 ? "s" : ""}`);
  };

  const handleSendReminder = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, recordatoriosEnviados: a.recordatoriosEnviados + 1 } : a));
    toast.success("Recordatorio enviado al deudor");
  };

  const handleBulkSendReminder = () => {
    const count = selected.size;
    setAlerts((prev) => prev.map((a) => selected.has(a.id) ? { ...a, recordatoriosEnviados: a.recordatoriosEnviados + 1 } : a));
    toast.success(`Recordatorio enviado a ${count} deudor${count !== 1 ? "es" : ""}`);
  };

  const openDetail = (alert: Alert) => {
    setDetailRecord({
      id: alert.operacionId, cedente: alert.cedente, deudor: alert.deudor,
      valorNominal: alert.valorNominal, valorDesembolsado: alert.valorNominal * 0.95,
      tasaDescuento: 1.8, fechaInicio: "2025-01-15",
      fechaVencimiento: alert.fechaVencimiento, diasRestantes: alert.diasRestantes,
      cobradoPct: alert.cobradoPct,
      status: alert.diasRestantes < 0 ? "vencido" : "en-cobro",
    });
  };

  // Summary stats
  const vencidoCount  = mockAlerts.filter(a => a.urgency === "vencido").length;
  const criticoCount  = mockAlerts.filter(a => a.urgency === "critico").length;
  const totalPendiente = alerts.filter(a => !collected.has(a.id)).reduce((s, a) => s + a.valorNominal * (1 - a.cobradoPct / 100), 0);

  return (
    <div className="space-y-4">
      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Vencidas", value: vencidoCount, icon: <AlertTriangle className="h-4 w-4 text-destructive" />, bg: "bg-destructive/10", color: "text-destructive" },
          { label: "Críticas (≤7d)", value: criticoCount, icon: <Clock className="h-4 w-4 text-warning" />, bg: "bg-warning/10", color: "text-warning" },
          { label: "Alertas activas", value: visible.length, icon: <Bell className="h-4 w-4 text-primary" />, bg: "bg-primary/10", color: "text-primary" },
          { label: "Valor en riesgo", value: new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(totalPendiente), icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />, bg: "bg-muted", color: "text-foreground" },
        ].map((k) => (
          <Card key={k.label} className="border shadow-sm">
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0", k.bg)}>{k.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.label}</p>
                <p className={cn("text-lg font-bold tabular-nums", k.color)}>{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5 gap-0.5">
            {([["all", "Todas"], ...URGENCY_ORDER.map((u) => [u, urgencyConfig[u].label])] as [string, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterUrgency(key as Urgency | "all")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  filterUrgency === key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >{label}</button>
            ))}
          </div>
          <Button
            variant="outline" size="sm" className="h-8 text-xs"
            onClick={() => setShowMuted(!showMuted)}
          >
            {showMuted ? <Bell className="h-3.5 w-3.5 mr-1.5" /> : <BellOff className="h-3.5 w-3.5 mr-1.5" />}
            {showMuted ? "Ocultar silenciadas" : "Mostrar silenciadas"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <Button size="sm" className="h-8 text-xs" onClick={markAllSelected}>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Marcar cobradas ({selected.size})
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleBulkSendReminder}>
                <Send className="h-3.5 w-3.5 mr-1.5" /> Enviar recordatorio ({selected.size})
              </Button>
            </>
          )}
          <Button variant="outline" size="icon" className="h-8 w-8">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ── Alert Groups ── */}
      {visible.length === 0 ? (
        <Card className="border">
          <CardContent className="py-12 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
            <div>
              <p className="font-semibold">Sin alertas activas</p>
              <p className="text-sm text-muted-foreground">Todas las operaciones están al día.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        URGENCY_ORDER.map((urgency) => {
          const group = byUrgency[urgency];
          if (!group.length) return null;
          const cfg = urgencyConfig[urgency];
          return (
            <div key={urgency} className="space-y-2">
              <div className="flex items-center gap-2">
                {cfg.icon}
                <h4 className="text-sm font-semibold text-foreground">{cfg.label}</h4>
                <Badge variant={cfg.badgeVariant} className="rounded-full text-2xs font-bold px-1.5 py-0.5">{group.length}</Badge>
                <Separator className="flex-1" />
              </div>
              <div className="space-y-2">
                {group.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    selected={selected.has(alert.id)}
                    onToggle={() => setSelected((prev) => { const next = new Set(prev); next.has(alert.id) ? next.delete(alert.id) : next.add(alert.id); return next; })}
                    onMarkCollected={handleMarkCollected}
                    onMute={toggleMute}
                    onDetail={openDetail}
                    onSendReminder={handleSendReminder}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}

      <FactoringOperationDetail
        record={detailRecord}
        open={!!detailRecord}
        onClose={() => setDetailRecord(null)}
      />
    </div>
  );
}
