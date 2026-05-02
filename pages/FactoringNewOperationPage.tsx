import { ComponentShowcase } from "../components/ui/componentshowcase"
import { FactoringNewOperation } from "../components/patterns/factoring-new-operation"

const code = `import { FactoringNewOperation } from "@/components/patterns/factoring-new-operation"

export function MyPage() {
  return <FactoringNewOperation />;
}`;

export function FactoringNewOperationPage() {
  return (
    <ComponentShowcase
      title="Nueva Operación de Factoring"
      description="Formulario de 4 pasos para radicar una nueva operación: datos del cedente, factura, condiciones financieras y confirmación. Incluye simulador financiero en el paso 3."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringNewOperation />}
      code={code}
      props={[
        { name: "(self-contained)", type: "—", description: "Wizard de 4 pasos: Cedente → Factura → Condiciones → Confirmación. El paso 3 incluye simulador financiero en tiempo real con tasa EA estimada." },
      ]}
    />
  );
}
