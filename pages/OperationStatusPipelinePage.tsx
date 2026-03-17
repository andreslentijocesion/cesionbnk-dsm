import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  OperationStatusPipeline,
  type PipelineStage,
} from "../components/patterns/operation-status-pipeline";

const activeStages: PipelineStage[] = [
  { id: "radicado",     label: "Radicado",     status: "completed", date: "01/03/2025", actor: "Ana Valdés" },
  { id: "revision",     label: "En revisión",  status: "completed", date: "03/03/2025", actor: "Carlos R." },
  { id: "aprobado",     label: "Aprobado",     status: "completed", date: "05/03/2025", actor: "Comité" },
  { id: "desembolsado", label: "Desembolsado", status: "active",    date: "07/03/2025" },
  { id: "cobro",        label: "En cobro",     status: "pending" },
  { id: "cobrado",      label: "Cobrado",      status: "pending" },
];

const rejectedStages: PipelineStage[] = [
  { id: "radicado",  label: "Radicado",    status: "completed", date: "01/03/2025" },
  { id: "revision",  label: "En revisión", status: "completed", date: "02/03/2025" },
  { id: "aprobado",  label: "Rechazado",   status: "rejected",  date: "04/03/2025", actor: "Comité crédito" },
  { id: "desembolso",label: "Desembolso",  status: "skipped" },
  { id: "cobro",     label: "En cobro",    status: "skipped" },
  { id: "cobrado",   label: "Cobrado",     status: "skipped" },
];

const verticalStages: PipelineStage[] = [
  { id: "radicado",     label: "Radicado",     description: "Operación recibida y registrada en el sistema.", status: "completed", date: "01/03/2025", actor: "Ana Valdés" },
  { id: "revision",     label: "En revisión",  description: "Análisis de documentación y score crediticio.",  status: "completed", date: "03/03/2025", actor: "Carlos Riquelme" },
  { id: "aprobado",     label: "Aprobado",     description: "Comité de crédito aprobó la operación.",         status: "completed", date: "05/03/2025", actor: "Comité" },
  { id: "desembolsado", label: "Desembolsado", description: "Fondos transferidos al cedente.",                status: "active",    date: "07/03/2025" },
  { id: "cobro",        label: "En cobro",     description: "Seguimiento y gestión de cobranza al deudor.",   status: "pending" },
  { id: "cobrado",      label: "Cobrado",      description: "Operación finalizada. Fondos recuperados.",      status: "pending" },
];

export function OperationStatusPipelinePage() {
  return (
    <ComponentShowcase
      title="Operation Status Pipeline"
      description="Pipeline visual de etapas para operaciones de factoring. Muestra el progreso desde la radicación hasta el cobro, con soporte para estados completado, activo, pendiente, rechazado y omitido. Disponible en orientación horizontal y vertical."
      category="Patterns"
      atomicLevel="Organism"
      preview={
        <div className="space-y-6 w-full">
          <OperationStatusPipeline stages={activeStages} orientation="horizontal" />
          <OperationStatusPipeline stages={rejectedStages} orientation="horizontal" />
        </div>
      }
      code={`import { OperationStatusPipeline } from "@/components/patterns/operation-status-pipeline"

const stages = [
  { id: "radicado",     label: "Radicado",     status: "completed", date: "01/03/2025" },
  { id: "revision",     label: "En revisión",  status: "completed", date: "03/03/2025" },
  { id: "aprobado",     label: "Aprobado",     status: "completed", date: "05/03/2025" },
  { id: "desembolsado", label: "Desembolsado", status: "active",    date: "07/03/2025" },
  { id: "cobro",        label: "En cobro",     status: "pending" },
  { id: "cobrado",      label: "Cobrado",      status: "pending" },
]

<OperationStatusPipeline stages={stages} orientation="horizontal" />`}
      props={[
        { name: "stages",       type: "PipelineStage[]",               description: "Lista de etapas con id, label, status, fecha y actor opcionales." },
        { name: "orientation",  type: "'horizontal' | 'vertical'",     description: "Orientación del pipeline. Default: 'horizontal'.", required: false },
        { name: "className",    type: "string",                        description: "Clase CSS adicional.", required: false },
      ]}
      examples={[
        {
          title: "Orientación vertical",
          description: "Con descripción completa de cada etapa. Ideal para vistas de detalle.",
          preview: (
            <div className="max-w-sm">
              <OperationStatusPipeline stages={verticalStages} orientation="vertical" />
            </div>
          ),
          code: `<OperationStatusPipeline stages={stages} orientation="vertical" />`,
        },
        {
          title: "Operación rechazada",
          description: "Estados rechazado y omitido para operaciones no aprobadas.",
          preview: <OperationStatusPipeline stages={rejectedStages} orientation="horizontal" />,
          code: `<OperationStatusPipeline stages={rejectedStages} orientation="horizontal" />`,
        },
      ]}
    />
  );
}
