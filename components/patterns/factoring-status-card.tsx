/**
 * FactoringStatusCard — Status filter cards for factoring portfolio.
 * Each card represents an operation status (e.g. Aprobado, Desembolsado, En Cobro).
 * Inactive: gray bottom border + gray styles.
 * Active: colored bottom border (4px only) + colored title/icon/badge + elevation-4 shadow.
 * @layer patterns
 */
import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FactoringStatusCardProps {
  label: string;
  subtitle?: string;
  amount?: string;
  count: number;
  icon: LucideIcon;
  color: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FactoringStatusCard({
  label,
  subtitle,
  amount,
  count,
  icon: Icon,
  color,
  active = false,
  onClick,
  className,
}: FactoringStatusCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl bg-card px-5 py-4 text-left transition-all",
        // Border: bottom only, 4px
        "border-0 border-b-4",
        active ? "shadow-elevation-4" : "shadow-elevation-2",
        className,
      )}
      style={{
        borderBottomColor: active ? "transparent" : "var(--muted-foreground)",
        ...(active && {
          backgroundImage: `linear-gradient(var(--card), var(--card)), linear-gradient(to right, ${color}, color-mix(in srgb, ${color} 25%, #111827))`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }),
      }}
    >
      {/* Count badge — top right */}
      <span
        className="absolute right-4 top-4 flex h-6 min-w-[1.5rem] items-center justify-center rounded-[10px] px-1.5 text-xs font-semibold border"
        style={
          active
            ? { color, borderColor: color, backgroundColor: "transparent" }
            : { color: "var(--muted-foreground)", borderColor: "var(--muted-foreground)", backgroundColor: "transparent" }
        }
      >
        {count}
      </span>

      {/* Title */}
      <span
        className="text-base font-bold leading-tight pr-8"
        style={{ color: active ? color : "var(--muted-foreground)" }}
      >
        {label}
      </span>

      {/* Divider */}
      <div className="h-px bg-border w-full" />

      {/* Bottom row: left content + icon */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
          {amount && (
            <span className="text-2xl font-normal text-muted-foreground">{amount}</span>
          )}
        </div>

        {/* Status icon */}
        <Icon
          className="shrink-0"
          style={{
            width: 32,
            height: 32,
            color: active ? color : "var(--muted-foreground)",
          }}
          strokeWidth={1.5}
        />
      </div>
    </button>
  );
}

// ── Demo showcase ──────────────────────────────────────────────────────────────

import { useState } from "react";
import {
  CheckCircle2,
  Banknote,
  RefreshCw,
  BadgeCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const STATUS_CARDS = [
  {
    id: "aprobado",
    label: "Aprobado",
    subtitle: "Monto total",
    amount: "$12.4M",
    count: 8,
    icon: CheckCircle2,
    color: "var(--info)",
  },
  {
    id: "desembolsado",
    label: "Desembolsado",
    subtitle: "Monto total",
    amount: "$34.1M",
    count: 23,
    icon: Banknote,
    color: "var(--info)",
  },
  {
    id: "en-cobro",
    label: "En Cobro",
    subtitle: "Monto total",
    amount: "$8.7M",
    count: 11,
    icon: RefreshCw,
    color: "var(--warning)",
  },
  {
    id: "cobrado",
    label: "Cobrado",
    subtitle: "Monto total",
    amount: "$51.2M",
    count: 47,
    icon: BadgeCheck,
    color: "var(--success)",
  },
  {
    id: "vencido",
    label: "Vencido",
    subtitle: "Monto total",
    amount: "$3.9M",
    count: 5,
    icon: AlertTriangle,
    color: "var(--kpi-orange)",
  },
  {
    id: "rechazado",
    label: "Rechazado",
    subtitle: "Monto total",
    amount: "$1.2M",
    count: 3,
    icon: XCircle,
    color: "var(--destructive)",
  },
] as const;

export function FactoringStatusCardShowcase() {
  const [active, setActive] = useState<string>("desembolsado");

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">Status Cards</h2>
        <p className="text-sm text-muted-foreground">
          Selecciona un estado para filtrar el portafolio de factoring.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {STATUS_CARDS.map((card) => (
          <FactoringStatusCard
            key={card.id}
            label={card.label}
            subtitle={card.subtitle}
            amount={card.amount}
            count={card.count}
            icon={card.icon}
            color={card.color}
            active={active === card.id}
            onClick={() => setActive(card.id)}
          />
        ))}
      </div>

      {/* Active state indicator */}
      <p className="text-sm text-muted-foreground">
        Mostrando facturas en estado:{" "}
        <span className="font-semibold text-foreground">
          {STATUS_CARDS.find((c) => c.id === active)?.label}
        </span>
      </p>
    </div>
  );
}
