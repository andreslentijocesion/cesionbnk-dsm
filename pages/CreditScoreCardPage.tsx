import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { CreditScoreCard } from "../components/patterns/CreditScoreCard"

export function CreditScoreCardPage() {
  return (
    <ComponentShowcase
      title="Credit Score Card"
      description="Tarjeta de evaluación crediticia del deudor. Muestra score, cupo disponible, métricas clave y nivel de riesgo con indicador visual. Ideal para el perfil de deudor y cola de aprobación."
      category="Patterns"
      atomicLevel="Molecule"
      preview={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <CreditScoreCard
            name="Retail Express Ltda."
            nit="900.543.210-7"
            industry="Retail — Gran distribución"
            score={720}
            limitAmount="$850M"
            usedAmount="$310M"
            riskLevel="bajo"
            updatedAt="12 Mar 2024"
            metrics={[
              { label: "Días prom. pago", value: "28 días",  trend: "up" },
              { label: "Facturas activas", value: "14",       trend: "neutral" },
              { label: "Mora histórica",   value: "0.4%",     trend: "up" },
              { label: "Antigüedad",        value: "4 años",  trend: "neutral" },
            ]}
          />
          <CreditScoreCard
            name="Constructora Norte S.A."
            nit="830.987.654-3"
            industry="Construcción"
            score={410}
            limitAmount="$500M"
            usedAmount="$480M"
            riskLevel="alto"
            updatedAt="11 Mar 2024"
            alert="Deuda vencida mayor a 60 días detectada. Límite casi agotado."
            metrics={[
              { label: "Días prom. pago", value: "58 días",  trend: "down" },
              { label: "Facturas activas", value: "7",        trend: "neutral" },
              { label: "Mora histórica",   value: "3.1%",     trend: "down" },
              { label: "Antigüedad",        value: "1.5 años", trend: "neutral" },
            ]}
          />
        </div>
      }
      code={`import { CreditScoreCard } from "@/components/patterns/CreditScoreCard"

<CreditScoreCard
  name="Retail Express Ltda."
  nit="900.543.210-7"
  industry="Retail — Gran distribución"
  score={720}
  limitAmount="$850M"
  usedAmount="$310M"
  riskLevel="bajo"
  metrics={[
    { label: "Días prom. pago", value: "28 días", trend: "up" },
    { label: "Mora histórica",  value: "0.4%",    trend: "up" },
  ]}
/>`}
      props={[
        { name: "name",        type: "string",  description: "Nombre del deudor." },
        { name: "score",       type: "number",  description: "Score crediticio 0–1000." },
        { name: "limitAmount", type: "string",  description: "Cupo máximo aprobado." },
        { name: "usedAmount",  type: "string",  description: "Cupo utilizado actualmente." },
        { name: "riskLevel",   type: '"bajo" | "medio" | "alto" | "critico"', description: "Nivel de riesgo del deudor." },
        { name: "nit",         type: "string",  description: "NIT o identificador tributario.", required: false },
        { name: "industry",    type: "string",  description: "Rubro o sector.", required: false },
        { name: "metrics",     type: "CreditMetric[]", description: "Métricas adicionales con tendencia opcional.", required: false },
        { name: "alert",       type: "string",  description: "Mensaje de alerta destacado (mora, límite agotado, etc.).", required: false },
        { name: "updatedAt",   type: "string",  description: "Fecha de última actualización.", required: false },
      ]}
      examples={[
        {
          title: "Riesgo crítico",
          description: "Deudor con score muy bajo y alerta activa.",
          preview: (
            <div className="max-w-sm">
              <CreditScoreCard
                name="Importadora Del Sur Ltda."
                nit="860.123.456-2"
                industry="Importación"
                score={185}
                limitAmount="$200M"
                usedAmount="$198M"
                riskLevel="critico"
                alert="Deudor en proceso de cobranza judicial. No operar."
                updatedAt="08 Mar 2024"
              />
            </div>
          ),
          code: `<CreditScoreCard
  score={185}
  riskLevel="critico"
  alert="Deudor en proceso de cobranza judicial."
/>`,
        },
        {
          title: "Riesgo medio",
          description: "Deudor con score intermedio y métricas mixtas.",
          preview: (
            <div className="max-w-sm">
              <CreditScoreCard
                name="Servicios Técnicos Centro S.A."
                industry="Servicios"
                score={540}
                limitAmount="$320M"
                usedAmount="$180M"
                riskLevel="medio"
                metrics={[
                  { label: "Días prom. pago", value: "42 días", trend: "neutral" },
                  { label: "Mora histórica",   value: "1.8%",   trend: "down" },
                ]}
              />
            </div>
          ),
          code: `<CreditScoreCard score={540} riskLevel="medio" ... />`,
        },
      ]}
    />
  );
}
