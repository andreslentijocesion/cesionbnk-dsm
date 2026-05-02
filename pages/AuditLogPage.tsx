import { ComponentShowcase } from "../components/ui/componentshowcase"
import { AuditLog, type AuditEntry } from "../components/patterns/audit-log"

const entries: AuditEntry[] = [
  { id: "1",  timestamp: "2024-03-12 08:12", user: "María González",   role: "Back Office",   action: "create",  entity: "Factura",    entityId: "F-20240312", description: "Ingresó nueva factura", source: "192.168.1.10" },
  { id: "2",  timestamp: "2024-03-12 08:45", user: "Sistema",          role: "Automático",    action: "approve", entity: "Factura",    entityId: "F-20240312", description: "Verificación de deudor aprobada automáticamente", source: "system" },
  { id: "3",  timestamp: "2024-03-12 09:10", user: "Carlos Riquelme",  role: "Riesgo",        action: "view",    entity: "Cedente",    entityId: "C-0041",     description: "Consultó perfil de cedente", source: "192.168.1.22" },
  { id: "4",  timestamp: "2024-03-12 09:35", user: "Ana Valdés",       role: "Gerente",       action: "approve", entity: "Operación",  entityId: "OP-441",     description: "Aprobó desembolso de operación", source: "192.168.1.5" },
  { id: "5",  timestamp: "2024-03-12 10:02", user: "Pedro Morales",    role: "Comercial",     action: "update",  entity: "Cedente",    entityId: "C-0052",     description: "Actualizó datos de contacto del cedente", source: "192.168.1.18" },
  { id: "6",  timestamp: "2024-03-12 10:22", user: "Sistema",          role: "Automático",    action: "reject",  entity: "Factura",    entityId: "F-20240308", description: "Factura rechazada por deudor con mora +90 días", source: "system" },
  { id: "7",  timestamp: "2024-03-12 11:15", user: "Ana Valdés",       role: "Gerente",       action: "export",  entity: "Reporte",    entityId: "cartera-Q1", description: "Exportó reporte de cartera Q1 2024", source: "192.168.1.5" },
  { id: "8",  timestamp: "2024-03-12 14:00", user: "Luis Fernández",   role: "Administrador", action: "delete",  entity: "Documento",  entityId: "DOC-0033",   description: "Eliminó documento duplicado", source: "192.168.1.1" },
  { id: "9",  timestamp: "2024-03-12 15:30", user: "María González",   role: "Back Office",   action: "login",   entity: "Sistema",                              description: "Inicio de sesión", source: "192.168.1.10" },
  { id: "10", timestamp: "2024-03-12 17:55", user: "María González",   role: "Back Office",   action: "logout",  entity: "Sistema",                              description: "Cierre de sesión", source: "192.168.1.10" },
];

export function AuditLogPage() {
  return (
    <ComponentShowcase
      title="Audit Log"
      description="Registro de auditoría del sistema. Muestra todas las acciones con usuario, rol, tipo de acción, entidad afectada y origen. Incluye búsqueda y filtros por acción y entidad."
      category="Patterns"
      atomicLevel="Organism"
      preview={<AuditLog entries={entries} />}
      code={`import { AuditLog } from "@/components/patterns/auditlog"

const entries = [
  {
    id: "1",
    timestamp: "2024-03-12 09:35",
    user: "Ana Valdés",
    role: "Gerente",
    action: "approve",
    entity: "Operación",
    entityId: "OP-441",
    description: "Aprobó desembolso de operación",
    source: "192.168.1.5",
  },
  // ...
]

<AuditLog entries={entries} />`}
      props={[
        { name: "entries",   type: "AuditEntry[]", description: "Lista de registros de auditoría." },
        { name: "className", type: "string",        description: "Clase CSS adicional.", required: false },
      ]}
      examples={[
        {
          title: "Lista vacía",
          description: "Estado cuando no hay registros.",
          preview: <AuditLog entries={[]} />,
          code: `<AuditLog entries={[]} />`,
        },
      ]}
    />
  );
}
