import { ComponentShowcase } from "../components/ui/componentshowcase"
import { FileViewer, type FileItem } from "../components/patterns/file-viewer"
import { toast } from "sonner"

const sampleFiles: FileItem[] = [
  {
    id: "1",
    name: "Factura_F-20240312_Constructora_Andina.pdf",
    type: "pdf",
    size: "248 KB",
    uploadedBy: "M. González",
    uploadedAt: "12 Mar 2024",
    category: "Factura",
  },
  {
    id: "2",
    name: "Contrato_Cesion_Credito_2024.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedBy: "A. Ramírez",
    uploadedAt: "10 Mar 2024",
    category: "Contrato",
  },
  {
    id: "3",
    name: "Estado_Cuenta_Retail_Express_Feb2024.xlsx",
    type: "spreadsheet",
    size: "84 KB",
    uploadedBy: "Sistema",
    uploadedAt: "01 Mar 2024",
    category: "Estado de cuenta",
  },
  {
    id: "4",
    name: "NIT_Constructora_Andina.jpg",
    type: "image",
    size: "320 KB",
    uploadedBy: "M. González",
    uploadedAt: "08 Feb 2024",
    category: "KYC",
  },
  {
    id: "5",
    name: "Pagare_Operacion_OP-441.pdf",
    type: "pdf",
    size: "156 KB",
    uploadedBy: "Back Office",
    uploadedAt: "05 Feb 2024",
    category: "Pagaré",
  },
  {
    id: "6",
    name: "Informe_Riesgo_Deudor_Q1_2024.pdf",
    type: "pdf",
    size: "2.1 MB",
    uploadedBy: "Riesgo",
    uploadedAt: "01 Feb 2024",
    category: "Riesgo",
  },
];

export function FileViewerPage() {
  return (
    <ComponentShowcase
      title="File Viewer"
      description="Lista de documentos con búsqueda, categorías y acciones de descarga y vista previa. Ideal para expedientes de cedentes, facturas y contratos."
      category="Patterns"
      atomicLevel="Organism"
      preview={
        <div className="max-w-2xl">
          <FileViewer
            files={sampleFiles}
            onDownload={(f) => toast.success(`Descargando ${f.name}`)}
            onPreview={(f) => toast.info(`Vista previa: ${f.name}`)}
          />
        </div>
      }
      code={`import { FileViewer } from "@/components/patterns/fileviewer"

const files = [
  {
    id: "1",
    name: "Factura_F-20240312.pdf",
    type: "pdf",
    size: "248 KB",
    uploadedBy: "M. González",
    uploadedAt: "12 Mar 2024",
    category: "Factura",
  },
  // ...
]

<FileViewer
  files={files}
  onDownload={(f) => console.log("Descargar", f.name)}
  onPreview={(f) => console.log("Preview", f.name)}
/>`}
      props={[
        { name: "files",      type: "FileItem[]",        description: "Lista de documentos a mostrar." },
        { name: "onDownload", type: "(file: FileItem) => void", description: "Callback al hacer clic en Descargar.", required: false },
        { name: "onPreview",  type: "(file: FileItem) => void", description: "Callback al hacer clic en Vista previa.", required: false },
        { name: "className",  type: "string",             description: "Clase CSS adicional.", required: false },
      ]}
      examples={[
        {
          title: "Lista vacía",
          description: "Estado vacío cuando no hay documentos.",
          preview: (
            <div className="max-w-2xl">
              <FileViewer files={[]} />
            </div>
          ),
          code: `<FileViewer files={[]} />`,
        },
        {
          title: "Solo PDFs (sin acciones)",
          description: "Vista de solo lectura sin botones de acción.",
          preview: (
            <div className="max-w-2xl">
              <FileViewer
                files={sampleFiles.filter((f) => f.type === "pdf").slice(0, 3)}
              />
            </div>
          ),
          code: `<FileViewer files={pdfFiles} />`,
        },
      ]}
    />
  );
}
