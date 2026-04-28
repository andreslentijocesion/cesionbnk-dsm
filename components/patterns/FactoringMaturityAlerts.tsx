/* eslint-disable */
import { useState } from "react";
import { Card, CardContent } from "../ui/Card";

import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { ProgressWithRange } from "../ui/ProgressWithRange";
import { Checkbox } from "../ui/Checkbox";
import {
  AlertTriangle, Clock, CheckCircle2, Send, Phone,
  Bell, BellOff, ArrowRight, RefreshCw,
} from "lucide-react";
import { cn } from "../ui/utils";
import { Badge } from "../ui/Badge";
import { toast } from "sonner";
import { FactoringOperationDetail, FactoringRecord } from "./FactoringOperationDetail";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COP = (v: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

const COPCompact = (v: number) =>
  new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(v);

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
  label: string;
  icon: React.ReactNode;
  accentClass: string;
  badgeVariant: React.ComponentProps<typeof Badge>["variant"];
}> = {
  vencido: {
    label: "Vencido",
    icon: <AlertTriangle className="size-3.5 .5 text-destructive-on-subtle" />,
    accentClass: "bg-destructive",
    badgeVariant: "destructive-soft",
  },
  critico: {
    label: "Crítico (≤ 7d)",
    icon: <Clock className="size-3.5 .5 text-warning-on-subtle" />,
    accentClass: "bg-warning",
    badgeVariant: "warning-soft",
  },
  proximo: {
    label: "Próximo (8–30d)",
    icon: <Bell className="size-3.5 .5 text-primary" />,
    accentClass: "bg-primary",
    badgeVariant: "primary-soft",
  },
  vigilar: {
    label: "Vigilar (31–60d)",
    icon: <Bell className="size-3.5 .5 text-muted-foreground" />,
    accentClass: "bg-border",
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

  const start = new Date(alert.fechaInicio);
  const end   = new Date(alert.fechaVencimiento);
  const fmt   = (d: Date) => d.toLocaleDateString("es-CO", { day: "2-digit", month: "short" });

  const progressColor =
    alert.cobradoPct >= 80      ? "bg-success" :
    alert.urgency === "vencido" ? "bg-destructive" :
    alert.urgency === "critico" ? "bg-warning"     : "bg-primary";

  return (
    <div className={cn(
      "rounded-lg border bg-card flex overflow-hidden transition-all",
      selected && "ring-2 ring-ring ring-offset-background ring-offset-1",
      alert.muted && "opacity-60"
    )}>
      {/* Urgency accent strip */}
      <div className={cn("w-1 flex-shrink-0", cfg.accentClass)} />

      <div className="flex-1 min-w-0 p-4 space-y-3">
        {/* ── Row 1: ID + badge + actions ── */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <Checkbox checked={selected} onCheckedChange={onToggle} />
            {cfg.icon}
            <span className="font-mono text-xs text-muted-foreground">{alert.operacionId}</span>
            <Badge variant={cfg.badgeVariant} className="rounded-full text-2xs font-semibold px-1.5 py-0.5">
              {alert.diasRestantes < 0
                ? `${Math.abs(alert.diasRestantes)}d vencido`
                : `${alert.diasRestantes}d restantes`}
            </Badge>
            {alert.muted && <BellOff className="size-3 text-muted-foreground" />}
          </div>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Button
              variant="ghost" size="icon-sm"
              title={alert.muted ? "Activar alertas" : "Silenciar"}
              onClick={() => onMute(alert.id)}
            >
              {alert.muted ? <Bell className="size-3.5 .5" /> : <BellOff className="size-3.5 .5" />}
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={() => onDetail(alert)}>
              <ArrowRight className="size-3.5 .5" />
            </Button>
          </div>
        </div>

        {/* ── Row 2: Cedente / Deudor + valor pendiente ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-semibold text-foreground truncate">{alert.cedente}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowRight className="size-3 flex-shrink-0" />
              <span className="truncate">{alert.deudor}</span>
            </p>
            <p className="text-xs text-muted-foreground">Analista: {alert.analista}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={cn(
              "text-base font-bold tabular-nums leading-none",
              alert.urgency === "vencido" ? "text-destructive-on-subtle" : "text-foreground"
            )}>
              {COP(valorPendiente)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              de {COP(alert.valorNominal)} · {alert.cobradoPct}% cobrado
            </p>
          </div>
        </div>

        {/* ── Row 3: Progress ── */}
        <ProgressWithRange
          value={alert.cobradoPct}
          from={fmt(start)}
          to={fmt(end)}
          barClassName="h-1.5 bg-muted"
          indicatorClassName={progressColor}
        />

        {/* ── Row 4: Actions + último contacto ── */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            size="sm" variant="outline" className="h-7 text-xs"
            onClick={() => onSendReminder(alert.id)}
          >
            <Send className="size-3" />
            {alert.recordatoriosEnviados === 0
              ? "1er recordatorio"
              : `Recordatorio #${alert.recordatoriosEnviados + 1}`}
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            <Phone className="size-3" /> Llamar
          </Button>
          {alert.urgency !== "vencido" || alert.cobradoPct > 0 ? (
            <Button
              size="sm" variant="success-outline" className="h-7 text-xs"
              onClick={() => onMarkCollected(alert.id)}
            >
              <CheckCircle2 className="size-3" /> Marcar cobrado
            </Button>
          ) : (
            <Button size="sm" variant="destructive-outline" className="h-7 text-xs">
              <AlertTriangle className="size-3" /> Iniciar cobranza
            </Button>
          )}
          {alert.ultimoContacto && (
            <span className="text-xs text-muted-foreground ml-auto hidden sm:block">
              Último contacto: {alert.ultimoContacto}
              {alert.recordatoriosEnviados > 0 && ` · ${alert.recordatoriosEnviados} rec.`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Urgency Distribution Bar ─────────────────────────────────────────────────

function UrgencyBar({ alerts }: { alerts: Alert[] }) {
  const total = alerts.length;
  if (total === 0) return null;

  const counts: Record<Urgency, number> = { vencido: 0, critico: 0, proximo: 0, vigilar: 0 };
  alerts.forEach((a) => counts[a.urgency]++);

  const segments: { urgency: Urgency; pct: number; label: string; color: string }[] = ([
    { urgency: "vencido", pct: (counts.vencido / total) * 100, label: "Vencido",    color: "bg-destructive" },
    { urgency: "critico", pct: (counts.critico / total) * 100, label: "Crítico",    color: "bg-warning" },
    { urgency: "proximo", pct: (counts.proximo / total) * 100, label: "Próximo",    color: "bg-primary" },
    { urgency: "vigilar", pct: (counts.vigilar / total) * 100, label: "Vigilar",    color: "bg-border" },
  ] as const).map(s => ({ ...s, urgency: s.urgency as Urgency })).filter((s) => s.pct > 0);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 h-2 rounded-full overflow-hidden">
        {segments.map((s) => (
          <div
            key={s.urgency}
            className={cn("h-full transition-all", s.color)}
            style={{ width: `${s.pct}%` }}
            title={`${s.label}: ${counts[s.urgency]}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {segments.map((s) => (
          <span key={s.urgency} className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className={cn("size-2 rounded-full inline-block", s.color)} />
            {s.label}: {counts[s.urgency]}
          </span>
        ))}
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

  const activeAlerts = alerts.filter((a) => !collected.has(a.id));

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

  const vencidoCount   = activeAlerts.filter(a => a.urgency === "vencido").length;
  const criticoCount   = activeAlerts.filter(a => a.urgency === "critico").length;
  const totalPendiente = activeAlerts.reduce((s, a) => s + a.valorNominal * (1 - a.cobradoPct / 100), 0);

  return (
    <div className="space-y-4">
      {/* ── KPI strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Vencidas",
            value: String(vencidoCount),
            icon: <AlertTriangle className="size-4 text-destructive-on-subtle" />,
            bg: "bg-destructive-subtle",
            color: "text-destructive-on-subtle",
          },
          {
            label: "Críticas (≤ 7d)",
            value: String(criticoCount),
            icon: <Clock className="size-4 text-warning-on-subtle" />,
            bg: "bg-warning-subtle",
            color: "text-warning-on-subtle",
          },
          {
            label: "Alertas activas",
            value: String(visible.length),
            icon: <Bell className="size-4 text-primary" />,
            bg: "bg-primary/10",
            color: "text-foreground",
          },
          {
            label: "Valor en riesgo",
            value: COPCompact(totalPendiente),
            icon: <AlertTriangle className="size-4 text-muted-foreground" />,
            bg: "bg-muted",
            color: "text-foreground",
          },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className={cn("size-8 rounded-lg flex items-center justify-center flex-shrink-0", k.bg)}>
                {k.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{k.label}</p>
                <p className={cn("text-lg font-bold tabular-nums leading-none mt-0.5", k.color)}>{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Urgency distribution bar ── */}
      {activeAlerts.length > 0 && <UrgencyBar alerts={activeAlerts} />}

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Segmented filter */}
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5 gap-0.5">
            {([["all", "Todas"], ...URGENCY_ORDER.map((u) => [u, urgencyConfig[u].label])] as [string, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterUrgency(key as Urgency | "all")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  filterUrgency === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button
            variant="outline" size="sm" className="h-8 text-xs"
            onClick={() => setShowMuted(!showMuted)}
          >
            {showMuted ? <Bell className="size-3.5 .5" /> : <BellOff className="size-3.5 .5" />}
            {showMuted ? "Ocultar silenciadas" : "Mostrar silenciadas"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <Button size="sm" className="h-8 text-xs" onClick={markAllSelected}>
                <CheckCircle2 className="size-3.5 .5" /> Marcar cobradas ({selected.size})
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleBulkSendReminder}>
                <Send className="size-3.5 .5" /> Enviar recordatorio ({selected.size})
              </Button>
            </>
          )}
          <Button variant="outline" size="icon" className="size-8">
            <RefreshCw className="size-3.5 .5" />
          </Button>
        </div>
      </div>

      {/* ── Alert Groups ── */}
      {visible.length === 0 ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="size-10 text-success-on-subtle" />
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
                <Badge variant={cfg.badgeVariant} className="rounded-full text-2xs font-bold px-1.5 py-0.5">
                  {group.length}
                </Badge>
                <Separator className="flex-1" />
              </div>
              <div className="space-y-2">
                {group.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    selected={selected.has(alert.id)}
                    onToggle={() => setSelected((prev) => {
                      const next = new Set(prev);
                      next.has(alert.id) ? next.delete(alert.id) : next.add(alert.id);
                      return next;
                    })}
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
