import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { Timeline, type TimelineItem } from "../components/patterns/Timeline"
import { FileCheck, Send, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

const operationTimeline: TimelineItem[] = [
  {
    id: "1",
    title: "Factura recibida",
    description: "Factura #F-20240312 subida por Constructora Andina SpA",
    timestamp: "08:12",
    status: "completed",
    icon: FileCheck,
    badge: "Recibida",
  },
  {
    id: "2",
    title: "Verificación de deudor",
    description: "Crédito del deudor validado. Límite disponible: $850M.",
    timestamp: "08:45",
    status: "completed",
    badge: "Aprobada",
    badgeVariant: "default",
  },
  {
    id: "3",
    title: "Aprobación de crédito",
    description: "Esperando firma del gerente de riesgo.",
    timestamp: "09:10",
    status: "current",
    icon: Clock,
    badge: "En revisión",
    badgeVariant: "secondary",
  },
  {
    id: "4",
    title: "Desembolso",
    description: "Transferencia al cedente pendiente de aprobación.",
    timestamp: "",
    status: "pending",
    icon: Send,
  },
  {
    id: "5",
    title: "Cobranza al deudor",
    description: "Vence el 15 de abril de 2024.",
    timestamp: "",
    status: "pending",
  },
];

const rejectedTimeline: TimelineItem[] = [
  {
    id: "a",
    title: "Factura recibida",
    description: "Factura #F-20240308 de Retail Express Ltda.",
    timestamp: "10:00",
    status: "completed",
  },
  {
    id: "b",
    title: "Verificación fallida",
    description: "El deudor figura con deuda vencida mayor a 90 días.",
    timestamp: "10:22",
    status: "error",
    icon: XCircle,
    badge: "Rechazada",
    badgeVariant: "destructive",
  },
  {
    id: "c",
    title: "Notificación al cedente",
    description: "Se informó el rechazo al cedente vía correo.",
    timestamp: "10:25",
    status: "warning",
    icon: AlertCircle,
  },
];

export function TimelinePage() {
  return (
    <ComponentShowcase
      title="Timeline"
      description="Línea de tiempo vertical para trazabilidad de operaciones: estados de facturas, historial de aprobaciones y auditoría de acciones."
      category="Patterns"
      atomicLevel="Molecule"
      preview={
        <div className="max-w-lg">
          <Timeline items={operationTimeline} />
        </div>
      }
      code={`import { Timeline } from "@/components/patterns/Timeline"

const items = [
  {
    id: "1",
    title: "Factura recibida",
    description: "Subida por Constructora Andina SpA",
    timestamp: "08:12",
    status: "completed",
    badge: "Recibida",
  },
  {
    id: "2",
    title: "Aprobación de crédito",
    status: "current",
  },
  {
    id: "3",
    title: "Desembolso",
    status: "pending",
  },
]

<Timeline items={items} />`}
      props={[
        { name: "items",     type: "TimelineItem[]", description: "Lista de eventos a mostrar." },
        { name: "className", type: "string",         description: "Clase CSS adicional para el contenedor.", required: false },
      ]}
      examples={[
        {
          title: "Operación rechazada",
          description: "Flujo con estado de error y advertencia.",
          preview: (
            <div className="max-w-lg">
              <Timeline items={rejectedTimeline} />
            </div>
          ),
          code: `<Timeline items={[
  { id: "a", title: "Factura recibida", status: "completed" },
  { id: "b", title: "Verificación fallida", status: "error", badge: "Rechazada", badgeVariant: "destructive" },
  { id: "c", title: "Notificación", status: "warning" },
]} />`,
        },
        {
          title: "Solo estados completados",
          description: "Auditoría retrospectiva de una operación finalizada.",
          preview: (
            <div className="max-w-lg">
              <Timeline
                items={[
                  { id: "x1", title: "Ingreso de factura", timestamp: "02 Mar 2024", status: "completed", icon: CheckCircle2 },
                  { id: "x2", title: "Aprobación de crédito", timestamp: "02 Mar 2024", status: "completed", icon: CheckCircle2 },
                  { id: "x3", title: "Desembolso $620M", timestamp: "03 Mar 2024", status: "completed", icon: CheckCircle2 },
                  { id: "x4", title: "Pago recibido del deudor", timestamp: "15 Mar 2024", status: "completed", icon: CheckCircle2, badge: "Cerrada", badgeVariant: "default" },
                ]}
              />
            </div>
          ),
          code: `<Timeline items={completedItems} />`,
        },
      ]}
    />
  );
}
