import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { FactoringCedentList } from "../components/patterns/FactoringCedentList"

export function FactoringCedentListPage() {
  return (
    <ComponentShowcase
      title="Gestión de Cedentes"
      description="Directorio de empresas cedentes con portafolio activo, tasa de cobro, uso de límite de crédito, sparkline de tendencia, sorting por columna y acciones contextuales por estado."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringCedentList />}
      code={`import { FactoringCedentList } from "@/components/patterns/FactoringCedentList"\n\nexport function MyPage() {\n  return <FactoringCedentList />;\n}`}
      props={[
        { name: "(self-contained)", type: "—", description: "Tabla de cedentes con avatar de iniciales, barra de crédito usado, sparkline de tendencia por cedente, score de cobro coloreado, sorting multi-columna y menú de acciones." },
      ]}
    />
  );
}
