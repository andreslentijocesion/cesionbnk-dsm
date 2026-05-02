/* eslint-disable */
import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ProgressWithRange } from "../ui/ProgressWithRange";
import { Checkbox } from "../ui/Checkbox";
import {
  AlertTriangle, Clock, CheckCircle2, Send, Phone,
  Bell, BellOff, ArrowRight, RefreshCw,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { toast } from "sonner";
import { FactoringOperationDetail, FactoringRecord as DetailRecord } from "./factoring-operation-detail";
import { FactoringUrgency, FactoringAlert } from "./types/factoring.types";
import { mockMaturityAlerts } from "./mocks/factoring-maturity-alerts.mock";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COPCompact = (v: number) =>
  new Intl.NumberFormat("es-CO", { notation: "compact", style: "currency", currency: "COP", maximumFractionDigits: 1 }).format(v);

const urgencyConfig: Record<string, {
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

const URGENCY_ORDER: FactoringUrgency[] = ["vencido", "critico", "proximo", "vigilar"];

// ─── Alert Card ───────────────────────────────────────────────────────────────

function AlertCard({ alert, selected, onToggle, onDetail, onSendReminder }: {
  alert: FactoringAlert;
  selected: boolean;
  onToggle: () => void;
  onDetail: (alert: FactoringAlert) => void;
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
      {/* Urgency accent bar */}
      <div className={cn("w-1.5 flex-shrink-0", cfg.accentClass)} />

      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={selected} onCheckedChange={onToggle} className="mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold text-primary">{alert.operacionId}</span>
                <Badge variant={cfg.badgeVariant} className="text-[9px] px-1 h-4 font-bold uppercase tracking-tight">
                  {cfg.icon}
                  <span className="ml-1">{cfg.label}</span>
                </Badge>
                {alert.muted && <BellOff className="size-3 text-muted-foreground" />}
              </div>
              <h4 className="text-sm font-bold text-foreground leading-tight">{alert.cedente}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">Pagador: <span className="font-medium text-foreground">{alert.deudor}</span></p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-foreground tabular-nums">{COPCompact(valorPendiente)}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Pendiente de cobro</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground uppercase font-bold">Progreso de Recaudo ({alert.cobradoPct}%)</span>
              <span className={cn("font-bold", alert.diasRestantes < 0 ? "text-destructive" : "text-foreground")}>
                {alert.diasRestantes < 0 ? `Vencido hace ${Math.abs(alert.diasRestantes)}d` : `Vence en ${alert.diasRestantes}d`}
              </span>
            </div>
            <ProgressWithRange
              value={alert.cobradoPct}
              from={fmt(start)}
              to={fmt(end)}
              barClassName="h-1.5 bg-muted"
              indicatorClassName={progressColor}
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="size-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground">
                  {alert.analista.charAt(0)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon-sm" className="size-8" onClick={() => onSendReminder(alert.id)}>
                <Send className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="size-8">
                <Phone className="size-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={() => onDetail(alert)}>
                Gestionar <ArrowRight className="ml-1.5 size-3" />
              </Button>
            </div>
          </div>
        </div>

        {alert.recordatoriosEnviados > 0 && (
          <div className="mt-3 pt-3 border-t border-dashed flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Bell className="size-3" /> {alert.recordatoriosEnviados} recordatorios</span>
            <span className="flex items-center gap-1"><Clock className="size-3" /> Último contacto: {alert.ultimoContacto}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function FactoringMaturityAlerts() {
  const [alerts, setAlerts] = useState<FactoringAlert[]>(mockMaturityAlerts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState<FactoringUrgency | "all">("all");
  const [selectedAlertForDetail, setSelectedAlertForDetail] = useState<FactoringAlert | null>(null);

  const filteredAlerts = alerts
    .filter(a => filter === "all" || a.urgency === filter)
    .sort((a, b) => URGENCY_ORDER.indexOf(a.urgency) - URGENCY_ORDER.indexOf(b.urgency));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.length === filteredAlerts.length ? [] : filteredAlerts.map(a => a.id));
  };

  const handleSendReminder = (id: string) => {
    toast.info("Recordatorio enviado al cedente y deudor.");
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, recordatoriosEnviados: a.recordatoriosEnviados + 1, ultimoContacto: "Hoy" } : a));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alertas de Madurez</h2>
          <p className="text-muted-foreground text-sm">Operaciones próximas a vencer o con mora pendiente de gestión.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setAlerts(mockMaturityAlerts)}>
            <RefreshCw className="mr-2 size-4" /> Reset Demo
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {URGENCY_ORDER.map(u => {
          const count = alerts.filter(a => a.urgency === u).length;
          const cfg = urgencyConfig[u];
          return (
            <button
              key={u}
              onClick={() => setFilter(u)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all hover:shadow-elevation-1",
                filter === u ? "bg-primary/5 border-primary ring-1 ring-primary/20" : "bg-card border-border"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {cfg.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{cfg.label.split(' ')[0]}</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{count}</p>
            </button>
          );
        })}
      </div>

      <Card className="border shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.length === filteredAlerts.length && filteredAlerts.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-xs font-semibold text-muted-foreground uppercase">Seleccionar todo</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              className="h-8 w-[140px] rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">Todas las alertas</option>
              <option value="vencido">Solo Vencidas</option>
              <option value="critico">Solo Críticas</option>
              <option value="proximo">Solo Próximas</option>
              <option value="vigilar">En Vigilancia</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="p-4 space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="size-10 text-success mx-auto mb-3 opacity-20" />
              <p className="text-sm text-muted-foreground font-medium">No hay alertas pendientes en esta categoría.</p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                selected={selectedIds.includes(alert.id)}
                onToggle={() => toggleSelect(alert.id)}
                onSendReminder={handleSendReminder}
                onDetail={(a) => setSelectedAlertForDetail(a)}
              />
            ))
          )}
        </div>
      </Card>

      {/* Detail Drawer */}
      {selectedAlertForDetail && (
        <FactoringOperationDetail
          record={{
            id: selectedAlertForDetail.operacionId,
            cedente: selectedAlertForDetail.cedente,
            deudor: selectedAlertForDetail.deudor,
            valorNominal: selectedAlertForDetail.valorNominal,
            valorDesembolsado: selectedAlertForDetail.valorNominal * 0.95,
            fechaVencimiento: selectedAlertForDetail.fechaVencimiento,
            status: selectedAlertForDetail.urgency === "vencido" ? "vencido" : "en-cobro",
            diasRestantes: selectedAlertForDetail.diasRestantes,
            _cobradoPct: selectedAlertForDetail.cobradoPct
          } as unknown as DetailRecord}
          open={!!selectedAlertForDetail}
          onClose={() => setSelectedAlertForDetail(null)}
        />
      )}
    </div>
  );
}
