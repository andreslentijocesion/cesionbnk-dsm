import { ComponentShowcase } from "../components/ui/componentshowcase"
import { FactoringMaturityAlerts } from "../components/patterns/factoring-maturity-alerts"

export function FactoringMaturityAlertsPage() {
  return (
    <ComponentShowcase
      title="Alertas de Vencimiento"
      description="Centro de notificaciones de vencimiento agrupado por urgencia: Vencido, Crítico (≤7d), Próximo (8–30d) y Vigilar. Con acciones de recordatorio, cobro y silenciado por operación."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringMaturityAlerts />}
      code={`import { FactoringMaturityAlerts } from "@/components/patterns/factoringmaturityalerts"\n\nexport function MyPage() {\n  return <FactoringMaturityAlerts />;\n}`}
      props={[{ name: "(self-contained)", type: "—", description: "Alertas agrupadas por urgencia con bulk select, envío de recordatorio, marcado de cobro, silenciado, filtro por categoría y Sheet de detalle integrado." }]}
    />
  );
}
