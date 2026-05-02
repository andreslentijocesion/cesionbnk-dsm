import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { FactoringDebtorList } from "../components/patterns/factoring-debtor-list"

export function FactoringDebtorListPage() {
  return (
    <ComponentShowcase
      title="Gestión de Deudores"
      description="Directorio de empresas pagadoras con calificación de riesgo (AAA–B), exposición crediticia, tasa de pago histórica, días promedio de pago y estado por observación."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringDebtorList />}
      code={`import { FactoringDebtorList } from "@/components/patterns/FactoringDebtorList"\n\nexport function MyPage() {\n  return <FactoringDebtorList />;\n}`}
      props={[{ name: "(self-contained)", type: "—", description: "Tabla de deudores con calificación AAA–B, barra de exposición por límite, sparkline de tendencia, tasa de pago coloreada, días promedio y acciones contextuales." }]}
    />
  );
}
