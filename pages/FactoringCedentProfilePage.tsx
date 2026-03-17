import { ComponentShowcase } from "../components/ui/component-showcase";
import { FactoringCedentProfile } from "../components/patterns/factoring-cedent-profile";

export function FactoringCedentProfilePage() {
  return (
    <ComponentShowcase
      title="Perfil de Cedente"
      description="Vista detallada de un cedente: score crediticio con evolución, volumen mensual, historial de operaciones, documentos legales y condiciones comerciales."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringCedentProfile />}
      code={`import { FactoringCedentProfile } from "@/components/patterns/factoring-cedent-profile";\n\nexport function MyPage() {\n  return <FactoringCedentProfile />;\n}`}
      props={[{ name: "(self-contained)", type: "—", description: "Perfil completo con 4 tabs: Resumen (BarChart + Score), Operaciones (tabla con progress), Documentos, y Crédito (límite + condiciones comerciales)." }]}
    />
  );
}
