import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { RiskIndicator } from "../components/patterns/risk-indicator"

const goodFactors = [
  { label: "Historial de pago",   value: "Excelente",  impact: "positive" as const },
  { label: "Antigüedad empresa",  value: "12 años",    impact: "positive" as const },
  { label: "Deuda/Patrimonio",    value: "0.4×",       impact: "positive" as const },
  { label: "Sector",             value: "Construcción", impact: "neutral"  as const },
  { label: "Concentración deuda", value: "35%",        impact: "negative" as const },
];

const mediumFactors = [
  { label: "Historial de pago",   value: "Regular",    impact: "neutral"  as const },
  { label: "Antigüedad empresa",  value: "3 años",     impact: "negative" as const },
  { label: "Deuda/Patrimonio",    value: "1.2×",       impact: "negative" as const },
  { label: "Score DICOM",         value: "Sin deudas", impact: "positive" as const },
];

export function RiskIndicatorPage() {
  return (
    <ComponentShowcase
      title="Risk Indicator"
      description="Indicador de riesgo crediticio con gauge visual, nivel de riesgo, tendencia y factores clave. Diseñado para evaluación de cedentes y deudores en factoring. Incluye variante compacta para tablas y listas."
      category="Patterns"
      atomicLevel="Organism"
      preview={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <RiskIndicator
            score={820}
            level="bajo"
            trend="up"
            source="DICOM · Equifax"
            updatedAt="07/03/2025"
            factors={goodFactors}
          />
          <RiskIndicator
            score={540}
            level="medio"
            trend="neutral"
            source="DICOM · Equifax"
            updatedAt="05/03/2025"
            factors={mediumFactors}
          />
        </div>
      }
      code={`import { RiskIndicator } from "@/components/patterns/RiskIndicator"

<RiskIndicator
  score={820}
  level="bajo"
  trend="up"
  source="DICOM · Equifax"
  updatedAt="07/03/2025"
  factors={[
    { label: "Historial de pago",  value: "Excelente", impact: "positive" },
    { label: "Antigüedad empresa", value: "12 años",   impact: "positive" },
    { label: "Deuda/Patrimonio",   value: "0.4×",      impact: "positive" },
  ]}
/>`}
      props={[
        { name: "score",     type: "number",                           description: "Score crediticio 0–1000." },
        { name: "level",     type: "'bajo' | 'medio' | 'alto' | 'crítico'", description: "Nivel de riesgo que determina color y badge." },
        { name: "trend",     type: "'up' | 'down' | 'neutral'",       description: "Tendencia del score.", required: false },
        { name: "source",    type: "string",                           description: "Fuente del score (ej. DICOM · Equifax).", required: false },
        { name: "updatedAt", type: "string",                           description: "Fecha de última actualización.", required: false },
        { name: "factors",   type: "RiskFactor[]",                     description: "Factores con label, valor e impacto (positive/negative/neutral).", required: false },
        { name: "variant",   type: "'default' | 'compact'",           description: "Variante visual. 'compact' para listas y tablas.", required: false },
      ]}
      examples={[
        {
          title: "Riesgo alto",
          description: "Operación con indicadores de alerta.",
          preview: (
            <div className="max-w-xs">
              <RiskIndicator
                score={320}
                level="alto"
                trend="down"
                source="DICOM"
                updatedAt="01/03/2025"
                factors={[
                  { label: "Mora 90+ días",     value: "2 registros", impact: "negative" },
                  { label: "Deuda/Patrimonio",  value: "2.8×",        impact: "negative" },
                  { label: "Antigüedad",        value: "1 año",       impact: "negative" },
                ]}
              />
            </div>
          ),
          code: `<RiskIndicator score={320} level="alto" trend="down" />`,
        },
        {
          title: "Variante compacta",
          description: "Para uso en tablas, listas y filas de datos.",
          preview: (
            <div className="space-y-2 max-w-sm">
              <RiskIndicator score={820} level="bajo"   trend="up"      source="Construcciones Andina" variant="compact" />
              <RiskIndicator score={540} level="medio"  trend="neutral" source="Textiles del Valle"    variant="compact" />
              <RiskIndicator score={320} level="alto"   trend="down"    source="Muebles Roble S.A.S."  variant="compact" />
              <RiskIndicator score={140} level="crítico" trend="down"   source="Pharma Colombia Ltda." variant="compact" />
            </div>
          ),
          code: `<RiskIndicator score={820} level="bajo" variant="compact" />`,
        },
      ]}
    />
  );
}
