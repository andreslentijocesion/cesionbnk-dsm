import { ComponentShowcase } from "../components/ui/component-showcase";
import { AgingReport, type AgingBucket } from "../components/patterns/aging-report";

const buckets: AgingBucket[] = [
  { label: "Al día",     amount: 2840, count: 98,  risk: "ok" },
  { label: "1–30 días",  amount: 620,  count: 31,  risk: "low" },
  { label: "31–60 días", amount: 310,  count: 18,  risk: "medium" },
  { label: "61–90 días", amount: 145,  count: 9,   risk: "high" },
  { label: "+90 días",   amount: 88,   count: 5,   risk: "critical" },
];

const smallBuckets: AgingBucket[] = [
  { label: "Al día",     amount: 1200, count: 45, risk: "ok" },
  { label: "1–30 días",  amount: 180,  count: 12, risk: "low" },
  { label: "31–60 días", amount: 60,   count: 4,  risk: "medium" },
  { label: "61–90 días", amount: 0,    count: 0,  risk: "high" },
  { label: "+90 días",   amount: 20,   count: 2,  risk: "critical" },
];

export function AgingReportPage() {
  return (
    <ComponentShowcase
      title="Aging Report"
      description="Análisis de cartera por días de mora. Muestra distribución en 5 tramos: al día, 1–30, 31–60, 61–90 y +90 días. Incluye resumen, gráfico de barras y tabla detalle."
      category="Patterns"
      atomicLevel="Organism"
      preview={<AgingReport buckets={buckets} unit="M CLP" />}
      code={`import { AgingReport } from "@/components/patterns/aging-report"

const buckets = [
  { label: "Al día",     amount: 2840, count: 98, risk: "ok" },
  { label: "1–30 días",  amount: 620,  count: 31, risk: "low" },
  { label: "31–60 días", amount: 310,  count: 18, risk: "medium" },
  { label: "61–90 días", amount: 145,  count: 9,  risk: "high" },
  { label: "+90 días",   amount: 88,   count: 5,  risk: "critical" },
]

<AgingReport buckets={buckets} unit="M CLP" />`}
      props={[
        { name: "buckets", type: "AgingBucket[]", description: "Lista de tramos con monto, cantidad de facturas y nivel de riesgo." },
        { name: "unit",    type: "string",         description: "Etiqueta de unidad para montos (ej. 'M CLP'). Default: 'M CLP'.", required: false },
        { name: "className", type: "string",       description: "Clase CSS adicional.", required: false },
      ]}
      examples={[
        {
          title: "Cartera saludable",
          description: "Portafolio concentrado en tramos sin mora.",
          preview: <AgingReport buckets={smallBuckets} unit="M CLP" />,
          code: `<AgingReport buckets={healthyBuckets} />`,
        },
      ]}
    />
  );
}
