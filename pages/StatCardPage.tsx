import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { StatCard, StatCardGrid } from "../components/patterns/stat-card"
import { DollarSign, FileText, Users, TrendingUp, Clock, Percent } from "lucide-react"

function StatCardDemo() {
  return (
    <StatCardGrid columns={4}>
      <StatCard
        title="Cartera Activa"
        value="$4,320M"
        change="+8.3%"
        trend="up"
        icon={DollarSign}
        subtitle="COP desembolsados"
        variant="primary"
      />
      <StatCard
        title="Facturas Vigentes"
        value="187"
        change="+14"
        trend="up"
        icon={FileText}
        subtitle="Este mes"
        variant="success"
      />
      <StatCard
        title="Cedentes Activos"
        value="43"
        change="-2"
        trend="down"
        icon={Users}
        subtitle="Vinculados"
        variant="default"
      />
      <StatCard
        title="Tasa Promedio"
        value="1.85%"
        change="+0.05%"
        trend="down"
        icon={Percent}
        subtitle="Mensual"
        variant="warning"
      />
    </StatCardGrid>
  );
}

export function StatCardPage() {
  return (
    <ComponentShowcase
      title="Stat Card"
      description="Tarjeta de métrica para KPIs financieros y operativos. Muestra valor, tendencia e ícono. Ideal para dashboards de factoring."
      category="Patterns"
      atomicLevel="Molecule"
      preview={<StatCardDemo />}
      code={`import { StatCard, StatCardGrid } from "@/components/patterns/StatCard"
import { DollarSign } from "lucide-react"

<StatCardGrid columns={4}>
  <StatCard
    title="Cartera Activa"
    value="$4,320M"
    change="+8.3%"
    trend="up"
    icon={DollarSign}
    subtitle="COP desembolsados"
    variant="primary"
  />
</StatCardGrid>`}
      props={[
        { name: "title",    type: "string",  description: "Etiqueta de la métrica." },
        { name: "value",    type: "string",  description: "Valor principal a destacar." },
        { name: "change",   type: "string",  description: "Variación vs. período anterior (ej. '+8.3%').", required: false },
        { name: "trend",    type: '"up" | "down" | "neutral"', description: "Dirección de la variación.", required: false },
        { name: "icon",     type: "LucideIcon", description: "Ícono decorativo.", required: false },
        { name: "subtitle", type: "string",  description: "Sub-etiqueta debajo del valor.", required: false },
        { name: "variant",  type: '"default" | "primary" | "success" | "warning" | "destructive"', description: "Esquema de color del ícono.", required: false },
      ]}
      examples={[
        {
          title: "Grid 2 columnas",
          description: "Versión compacta para vistas laterales o paneles estrechos.",
          preview: (
            <StatCardGrid columns={2}>
              <StatCard title="Vencidas" value="12" change="+3" trend="down" icon={Clock} variant="destructive" />
              <StatCard title="Rentabilidad" value="22.4%" change="+1.2%" trend="up" icon={TrendingUp} variant="success" />
            </StatCardGrid>
          ),
          code: `<StatCardGrid columns={2}>
  <StatCard title="Vencidas" value="12" trend="down" variant="destructive" />
  <StatCard title="Rentabilidad" value="22.4%" trend="up" variant="success" />
</StatCardGrid>`,
        },
        {
          title: "Sin tendencia",
          description: "Cuando no hay dato de variación disponible.",
          preview: (
            <StatCardGrid columns={3}>
              <StatCard title="Total Cedentes" value="43" icon={Users} />
              <StatCard title="Facturas Aprobadas" value="134" icon={FileText} variant="primary" />
              <StatCard title="Desembolsos Hoy" value="$980M" icon={DollarSign} variant="success" />
            </StatCardGrid>
          ),
          code: `<StatCard title="Total Cedentes" value="43" icon={Users} />`,
        },
      ]}
    />
  );
}
