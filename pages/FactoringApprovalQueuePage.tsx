import { ComponentShowcase } from "../components/ui/component-showcase";
import { FactoringApprovalQueue } from "../components/patterns/factoring-approval-queue";

export function FactoringApprovalQueuePage() {
  return (
    <ComponentShowcase
      title="Cola de Aprobación"
      description="Gestión del comité de crédito: operaciones pendientes con score crediticio, prioridad, aprobación/rechazo individual o por lotes, y acceso al detalle completo de cada operación."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringApprovalQueue />}
      code={`import { FactoringApprovalQueue } from "@/components/patterns/factoring-approval-queue";\n\nexport function MyPage() {\n  return <FactoringApprovalQueue />;\n}`}
      props={[
        { name: "(self-contained)", type: "—", description: "Incluye KPIs de cola, tabla con score crediticio, prioridad, bulk select, aprobación/rechazo por fila o por lotes, y Sheet de detalle integrado." },
      ]}
    />
  );
}
