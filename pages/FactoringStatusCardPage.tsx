import { useState } from "react";
import { ComponentShowcase } from "../components/ui/componentshowcase";
import {
  FactoringStatusCard,
  FactoringStatusCardShowcase,
} from "../components/patterns/factoring-status-card";
import {
  Banknote,
  RefreshCw,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";

// ─── Single-card interactive demo ─────────────────────────────────────────────

function SingleCardDemo() {
  const [active, setActive] = useState(true);
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <FactoringStatusCard
        label="Cobrado"
        subtitle="Monto total"
        amount="$51.2M"
        count={47}
        icon={BadgeCheck}
        color="var(--success)"
        active={active}
        onClick={() => setActive((v) => !v)}
      />
      <p className="text-xs text-muted-foreground">
        Haz clic en la card para alternar activo / inactivo
      </p>
    </div>
  );
}

// ─── As filter-tabs demo ───────────────────────────────────────────────────────

const DEMO_CARDS = [
  { id: "desembolsado", label: "Desembolsado", subtitle: "Monto total", amount: "$34.1M", count: 23, icon: Banknote,      color: "var(--info)"      },
  { id: "en-cobro",    label: "En Cobro",     subtitle: "Monto total", amount: "$8.7M",  count: 11, icon: RefreshCw,     color: "var(--warning)"   },
  { id: "cobrado",     label: "Cobrado",      subtitle: "Monto total", amount: "$51.2M", count: 47, icon: BadgeCheck,    color: "var(--success)"   },
  { id: "vencido",     label: "Vencido",      subtitle: "Monto total", amount: "$3.9M",  count: 5,  icon: AlertTriangle, color: "var(--kpi-orange)" },
] as const;

function FilterTabsDemo() {
  const [active, setActive] = useState<string>("cobrado");
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DEMO_CARDS.map((c) => (
          <FactoringStatusCard
            key={c.id}
            label={c.label}
            subtitle={c.subtitle}
            amount={c.amount}
            count={c.count}
            icon={c.icon}
            color={c.color}
            active={active === c.id}
            onClick={() => setActive(c.id)}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground px-1">
        Filtro activo:{" "}
        <span className="font-semibold text-foreground">
          {DEMO_CARDS.find((c) => c.id === active)?.label}
        </span>
        {" "}— las cards actúan como tabs, el estado activo filtra la tabla subyacente.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function FactoringStatusCardPage() {
  return (
    <ComponentShowcase
      title="Status Cards"
      description="KPI cards con función de tab: cada card representa una categoría de estado (Aprobado, Desembolsado, En Cobro, Cobrado, Vencido…) y actúa como selector activo/inactivo para filtrar la tabla de datos subyacente. El estado activo se distingue mediante un borde inferior con gradiente cromático y elevación."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<SingleCardDemo />}
      code={`import { FactoringStatusCard } from "@/components/patterns/factoringstatuscard";
import { BadgeCheck } from "lucide-react";

function MyStatusTabs() {
  const [active, setActive] = useState("cobrado");

  return (
    <div className="grid grid-cols-4 gap-3">
      <FactoringStatusCard
        label="Cobrado"
        subtitle="Monto total"
        amount="$51.2M"
        count={47}
        icon={BadgeCheck}
        color="var(--success)"
        active={active === "cobrado"}
        onClick={() => setActive("cobrado")}
      />
      {/* más cards... */}
    </div>
  );
}`}
      props={[
        {
          name: "label",
          type: "string",
          required: true,
          description: "Nombre del estado que representa la card. Se muestra como título y define la categoría de filtro (ej. \"Cobrado\", \"Vencido\").",
        },
        {
          name: "count",
          type: "number",
          required: true,
          description: "Cantidad de operaciones en este estado. Se muestra como badge en la esquina superior derecha.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          required: true,
          description: "Icono de Lucide que representa visualmente el estado. Se renderiza en la esquina inferior derecha con 32×32 px.",
        },
        {
          name: "color",
          type: "string",
          required: true,
          description: "Color CSS del estado activo. Acepta cualquier valor CSS válido; se recomienda usar tokens semánticos del DSM: \"var(--success)\", \"var(--warning)\", \"var(--destructive)\", \"var(--primary)\", \"var(--info)\", \"var(--kpi-orange)\".",
        },
        {
          name: "active",
          type: "boolean",
          default: "false",
          description: "Indica si esta card está seleccionada. En estado activo: aplica el borde inferior con gradiente cromático, el color en título/Badge/icono y elevación (shadow-elevation-4). En inactivo: borde gris neutro y estilos apagados.",
        },
        {
          name: "subtitle",
          type: "string",
          default: "undefined",
          description: "Etiqueta secundaria sobre el monto (ej. \"Monto total\", \"Valor desembolsado\"). Opcional.",
        },
        {
          name: "amount",
          type: "string",
          default: "undefined",
          description: "Valor monetario formateado como string (ej. \"$51.2M\"). Se muestra en texto grande en la parte inferior. Opcional.",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Callback que se ejecuta al hacer clic. Úsalo para actualizar el estado activo en el componente padre y sincronizar el filtro de la tabla.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Clases CSS adicionales para el elemento raíz (button).",
        },
      ]}
      examples={[
        {
          title: "Como tabs de filtro (caso de uso principal)",
          description: "Grupo de 4 cards conectadas a un estado compartido. Al seleccionar una card se activa el filtro de la tabla subyacente. Solo una card puede estar activa a la vez.",
          preview: <FilterTabsDemo />,
          code: `const [active, setActive] = useState("cobrado");

<div className="grid grid-cols-4 gap-3">
  {STATUS_CARDS.map((c) => (
    <FactoringStatusCard
      key={c.id}
      {...c}
      active={active === c.id}
      onClick={() => setActive(c.id)}
    />
  ))}
</div>`,
        },
        {
          title: "Showcase completo (6 estados)",
          description: "Todos los estados del ciclo de vida de una operación de factoring: Aprobado, Desembolsado, En Cobro, Cobrado, Vencido y Rechazado.",
          preview: <FactoringStatusCardShowcase />,
          code: `import { FactoringStatusCardShowcase } from "@/components/patterns/factoringstatuscard";

// Demo interactiva con los 6 estados del ciclo de vida
<FactoringStatusCardShowcase />`,
        },
      ]}
    />
  );
}
