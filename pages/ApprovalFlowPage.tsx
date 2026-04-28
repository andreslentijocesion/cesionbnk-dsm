import { ComponentShowcase } from "../components/ui/component-showcase";
import { ApprovalFlow, type Approver } from "../components/patterns/approval-flow";
import { toast } from "sonner";

const approvers: Approver[] = [
  {
    id: "1",
    name: "María González",
    role: "Back Office",
    status: "approved",
    comment: "Documentación completa y deudor verificado.",
    timestamp: "09:12",
  },
  {
    id: "2",
    name: "Carlos Riquelme",
    role: "Analista de Riesgo",
    status: "approved",
    comment: "Score del deudor: 720. Límite disponible suficiente.",
    timestamp: "09:48",
  },
  {
    id: "3",
    name: "Ana Valdés",
    role: "Gerente de Operaciones",
    status: "pending",
    isCurrent: true,
  },
];

const rejectedApprovers: Approver[] = [
  {
    id: "a",
    name: "Pedro Morales",
    role: "Back Office",
    status: "approved",
    timestamp: "10:05",
  },
  {
    id: "b",
    name: "Luis Fernández",
    role: "Analista de Riesgo",
    status: "rejected",
    comment: "Deudor con mora mayor a 90 días. No procede la operación.",
    timestamp: "10:22",
  },
  {
    id: "c",
    name: "Ana Valdés",
    role: "Gerente de Operaciones",
    status: "skipped",
  },
];

export function ApprovalFlowPage() {
  return (
    <ComponentShowcase
      title="Approval Flow"
      description="Flujo de aprobación multi-firmante para operaciones de factoring. Muestra aprobadores, estado individual, comentarios y botones de acción para el aprobador actual."
      category="Patterns"
      atomicLevel="Organism"
      preview={
        <div className="max-w-sm">
          <ApprovalFlow
            title="Operación OP-441 · $620M"
            status="in_review"
            approvers={approvers}
            onApprove={() => toast.success("Operación aprobada")}
            onReject={() => toast.error("Operación rechazada")}
          />
        </div>
      }
      code={`import { ApprovalFlow } from "@/components/patterns/approval-flow"

<ApprovalFlow
  title="Operación OP-441 · $620M"
  status="in_review"
  approvers={[
    { id: "1", name: "María González", role: "Back Office", status: "approved", comment: "Documentación completa." },
    { id: "2", name: "Carlos Riquelme", role: "Riesgo",    status: "approved" },
    { id: "3", name: "Ana Valdés",      role: "Gerente",   status: "pending", isCurrent: true },
  ]}
  onApprove={() => handleApprove()}
  onReject={() => handleReject()}
/>`}
      props={[
        { name: "approvers",  type: "Approver[]",   description: "Lista de aprobadores con estado, comentario y timestamp." },
        { name: "status",     type: '"pending" | "in_review" | "approved" | "rejected"', description: "Estado general del flujo." },
        { name: "title",      type: "string",       description: "Título de la operación.", required: false },
        { name: "onApprove",  type: "() => void",   description: "Callback al aprobar (solo visible si hay un aprobador con isCurrent=true y status=pending).", required: false },
        { name: "onReject",   type: "() => void",   description: "Callback al rechazar.", required: false },
      ]}
      examples={[
        {
          title: "Rechazada en segunda firma",
          description: "Cuando un aprobador rechaza, los siguientes quedan como omitidos.",
          preview: (
            <div className="max-w-sm">
              <ApprovalFlow
                title="Operación OP-408 · $180M"
                status="rejected"
                approvers={rejectedApprovers}
              />
            </div>
          ),
          code: `<ApprovalFlow status="rejected" approvers={rejectedApprovers} />`,
        },
        {
          title: "Totalmente aprobada",
          description: "Todas las firmas completadas.",
          preview: (
            <div className="max-w-sm">
              <ApprovalFlow
                title="Operación OP-390 · $940M"
                status="approved"
                approvers={[
                  { id: "x1", name: "María González", role: "Back Office",      status: "approved", timestamp: "08:30" },
                  { id: "x2", name: "Carlos Riquelme", role: "Riesgo",          status: "approved", timestamp: "09:15" },
                  { id: "x3", name: "Ana Valdés",      role: "Gerente",         status: "approved", timestamp: "10:02", comment: "Operación estratégica aprobada." },
                ]}
              />
            </div>
          ),
          code: `<ApprovalFlow status="approved" approvers={completedApprovers} />`,
        },
      ]}
    />
  );
}
