import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  DocumentChecklist,
  type ChecklistDocument,
} from "../components/patterns/document-checklist";
import { toast } from "sonner";

const initialDocuments: ChecklistDocument[] = [
  {
    id: "rut",
    name: "RUT empresa",
    description: "Certificado de RUT actualizado (últimos 3 meses)",
    required: true,
    status: "approved",
    fileName: "rut-construcciones-andina.pdf",
    uploadedAt: "12/02/2025",
  },
  {
    id: "escritura",
    name: "Escritura social",
    description: "Escritura de constitución y poderes vigentes",
    required: true,
    status: "rejected",
    fileName: "escritura-2020.pdf",
    rejectionReason: "Documento desactualizado. Se requiere versión 2023 o posterior.",
  },
  {
    id: "estados",
    name: "Estados financieros",
    description: "Últimos 2 años de EEFF auditados",
    required: true,
    status: "reviewing",
    fileName: "eeff-2023-2024.pdf",
    uploadedAt: "01/03/2025",
  },
  {
    id: "kyc",
    name: "Formulario KYC",
    description: "Formulario de conocimiento del cliente firmado",
    required: true,
    status: "pending",
  },
  {
    id: "dicom",
    name: "Certificado DICOM",
    description: "Informe comercial (últimos 30 días)",
    required: false,
    status: "expired",
    fileName: "dicom-enero-2025.pdf",
    expiresAt: "28/02/2025",
  },
  {
    id: "cuenta",
    name: "Certificado cuenta bancaria",
    description: "Cuenta de abono para desembolsos",
    required: true,
    status: "uploaded",
    fileName: "cert-cuenta-bci.pdf",
    uploadedAt: "05/03/2025",
  },
];

function DocumentChecklistDemo() {
  const [docs, setDocs] = useState<ChecklistDocument[]>(initialDocuments);

  const handleUpload = (id: string) => {
    toast.info(`Seleccionando archivo para "${docs.find((d) => d.id === id)?.name}"…`);
    // Simulate upload
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: "uploaded", fileName: "nuevo-documento.pdf", uploadedAt: "Hoy" }
            : d,
        ),
      );
      toast.success("Documento cargado exitosamente");
    }, 800);
  };

  const handleView = (id: string) => {
    toast.info(`Abriendo vista previa de "${docs.find((d) => d.id === id)?.name}"…`);
  };

  return (
    <div className="max-w-xl">
      <DocumentChecklist
        documents={docs}
        onUpload={handleUpload}
        onView={handleView}
        title="KYC — Cedente: Construcciones Andina S.A."
        showProgress
      />
    </div>
  );
}

export function DocumentChecklistPage() {
  return (
    <ComponentShowcase
      title="Document Checklist"
      description="Lista de documentos requeridos con estado por ítem. Muestra progreso general, acciones de carga/vista previa y motivos de rechazo. Ideal para KYC de cedentes y deudores, y requisitos de operaciones."
      category="Patterns"
      atomicLevel="Organism"
      preview={<DocumentChecklistDemo />}
      code={`import { DocumentChecklist } from "@/components/patterns/document-checklist"

const documents = [
  {
    id: "rut",
    name: "RUT empresa",
    required: true,
    status: "approved",
    fileName: "rut-empresa.pdf",
    uploadedAt: "12/02/2025",
  },
  {
    id: "kyc",
    name: "Formulario KYC",
    required: true,
    status: "pending",
  },
]

<DocumentChecklist
  documents={documents}
  onUpload={(id) => handleUpload(id)}
  onView={(id) => openPreview(id)}
  title="Documentos requeridos"
  showProgress
/>`}
      props={[
        { name: "documents",    type: "ChecklistDocument[]", description: "Lista de documentos con id, name, status y metadatos opcionales." },
        { name: "onUpload",     type: "(id: string) => void", description: "Callback al hacer clic en 'Cargar' o 'Reemplazar'.", required: false },
        { name: "onView",       type: "(id: string) => void", description: "Callback al hacer clic en el ojo de vista previa.", required: false },
        { name: "title",        type: "string",   description: "Título del checklist. Default: 'Documentos requeridos'.", required: false },
        { name: "showProgress", type: "boolean",  description: "Muestra barra de progreso. Default: true.", required: false },
      ]}
      examples={[
        {
          title: "Solo lectura (sin callbacks)",
          description: "Para mostrar el estado sin acciones.",
          preview: (
            <div className="max-w-xl">
              <DocumentChecklist
                documents={[
                  { id: "1", name: "RUT empresa", required: true, status: "approved" },
                  { id: "2", name: "KYC", required: true, status: "pending" },
                  { id: "3", name: "DICOM", status: "expired", expiresAt: "15/01/2025" },
                ]}
                showProgress
              />
            </div>
          ),
          code: `<DocumentChecklist documents={documents} showProgress />`,
        },
      ]}
    />
  );
}
