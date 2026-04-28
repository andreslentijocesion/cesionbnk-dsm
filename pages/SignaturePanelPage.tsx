import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { SignaturePanel, type Signatory } from "../components/patterns/SignaturePanel";

const signatories: Signatory[] = [
  { id: "1", name: "Carlos Riquelme", role: "Gerente General",     email: "c.riquelme@empresa.com", status: "signed",   order: 1, signedAt: "07/03/2025 09:14" },
  { id: "2", name: "Ana Valdés",      role: "Representante Legal",  email: "a.valdes@empresa.com",   status: "signed",   order: 2, signedAt: "07/03/2025 11:30" },
  { id: "3", name: "Pedro Morales",   role: "Director Financiero",  email: "p.morales@empresa.com",  status: "pending",  order: 3 },
];

const rejectedSignatories: Signatory[] = [
  { id: "1", name: "Carlos Riquelme", role: "Gerente General",    email: "c.riquelme@empresa.com", status: "signed",   order: 1, signedAt: "05/03/2025 10:00" },
  { id: "2", name: "Ana Valdés",      role: "Representante Legal", email: "a.valdes@empresa.com",   status: "rejected", order: 2, rejectedReason: "Monto fuera del límite aprobado." },
  { id: "3", name: "Pedro Morales",   role: "Director Financiero", email: "p.morales@empresa.com",  status: "skipped",  order: 3 },
];

const parallelSignatories: Signatory[] = [
  { id: "1", name: "María González",  role: "Socia fundadora",  email: "m.gonzalez@empresa.com", status: "signed",  signedAt: "06/03/2025" },
  { id: "2", name: "Luis Pérez",      role: "Socio fundador",   email: "l.perez@empresa.com",    status: "pending" },
  { id: "3", name: "Roberto Díaz",    role: "Apoderado legal",  email: "r.diaz@empresa.com",     status: "pending" },
];

export function SignaturePanelPage() {
  return (
    <ComponentShowcase
      title="Signature Panel"
      description="Panel de firma electrónica para flujos de aprobación multi-firmante. Soporta firma secuencial (en orden) y paralela. Muestra estados individual por firmante, progreso global y acciones de recordatorio/revocación."
      category="Patterns"
      atomicLevel="Organism"
      preview={
        <div className="max-w-md w-full">
          <SignaturePanel
            title="Autorización de desembolso"
            documentName="FCT-2025-0842 — Construcciones Andina S.A. — $185.000.000"
            signatories={signatories}
            sequential
            expiresAt="14/03/2025"
            onRemind={(id) => console.log("Recordar", id)}
            onRevoke={(id) => console.log("Revocar", id)}
          />
        </div>
      }
      code={`import { SignaturePanel } from "@/components/patterns/SignaturePanel"

<SignaturePanel
  title="Autorización de desembolso"
  documentName="FCT-2025-0842 — Construcciones Andina S.A."
  signatories={[
    { id: "1", name: "Carlos Riquelme", role: "Gerente General",    email: "...", status: "signed",  order: 1, signedAt: "07/03/2025" },
    { id: "2", name: "Ana Valdés",      role: "Representante Legal", email: "...", status: "signed",  order: 2, signedAt: "07/03/2025" },
    { id: "3", name: "Pedro Morales",   role: "Director Financiero", email: "...", status: "pending", order: 3 },
  ]}
  sequential
  expiresAt="14/03/2025"
  onRemind={(id) => handleRemind(id)}
  onRevoke={(id) => handleRevoke(id)}
/>`}
      props={[
        { name: "signatories",  type: "Signatory[]",  description: "Lista de firmantes con nombre, rol, email, estado y orden." },
        { name: "title",        type: "string",        description: "Título del panel.", required: false },
        { name: "documentName", type: "string",        description: "Nombre o descripción del documento.", required: false },
        { name: "sequential",   type: "boolean",       description: "Si true, la firma debe seguir el campo `order`.", required: false },
        { name: "expiresAt",    type: "string",        description: "Fecha de vencimiento de la solicitud.", required: false },
        { name: "onRemind",     type: "(id: string) => void", description: "Callback para enviar recordatorio a un firmante.", required: false },
        { name: "onRevoke",     type: "(id: string) => void", description: "Callback para revocar la solicitud de un firmante.", required: false },
      ]}
      examples={[
        {
          title: "Con firma rechazada",
          description: "Un firmante rechazó — los siguientes quedan omitidos automáticamente.",
          preview: (
            <div className="max-w-md">
              <SignaturePanel
                title="Acuerdo de cesión"
                signatories={rejectedSignatories}
                sequential
                documentName="Cesión FCT-2025-0839"
              />
            </div>
          ),
          code: `<SignaturePanel signatories={rejectedSignatories} sequential />`,
        },
        {
          title: "Firma paralela",
          description: "Todos los firmantes pueden firmar en cualquier orden.",
          preview: (
            <div className="max-w-md">
              <SignaturePanel
                title="Contrato de factoring"
                signatories={parallelSignatories}
                sequential={false}
                documentName="Contrato marco 2025"
                expiresAt="20/03/2025"
                onRemind={(id) => console.log("Recordar", id)}
              />
            </div>
          ),
          code: `<SignaturePanel signatories={signatories} sequential={false} />`,
        },
      ]}
    />
  );
}
