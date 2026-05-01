import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { FactoringDashboard } from "../components/patterns/FactoringDashboard"

const code = `import { FactoringDashboard } from "@/components/patterns/FactoringDashboard"

export function MyPage() {
  return <FactoringDashboard />;
}`;

export function FactoringDashboardPage() {
  return (
    <ComponentShowcase
      title="Factoring Dashboard"
      description="Dashboard ejecutivo de factoring con KPIs, evolución del portafolio, distribución por estado, aging de vencimientos, top cedentes y feed de actividad reciente."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringDashboard />}
      code={code}
      props={[
        { name: "(self-contained)", type: "—", description: "Dashboard autocontenido con datos mock. Integra KPI cards, AreaChart de evolución, PieChart de operaciones, aging analysis, top cedentes y actividad reciente." },
      ]}
    />
  );
}
