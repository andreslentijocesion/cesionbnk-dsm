import { ComponentShowcase } from "../components/ui/ComponentShowcase"
import { ExportPanel } from "../components/patterns/export-panel"
import { toast } from "sonner"

const portfolioColumns = [
  { id: "folio",        label: "Folio",         defaultSelected: true },
  { id: "cedente",      label: "Cedente",        defaultSelected: true },
  { id: "deudor",       label: "Deudor",         defaultSelected: true },
  { id: "monto",        label: "Monto",          defaultSelected: true },
  { id: "tasa",         label: "Tasa",           defaultSelected: true },
  { id: "vencimiento",  label: "Vencimiento",    defaultSelected: true },
  { id: "estado",       label: "Estado",         defaultSelected: true },
  { id: "dias_mora",    label: "Días mora",       defaultSelected: false },
  { id: "score",        label: "Score deudor",   defaultSelected: false },
  { id: "sector",       label: "Sector",         defaultSelected: false },
  { id: "ejecutivo",    label: "Ejecutivo",       defaultSelected: false },
];

export function ExportPanelPage() {
  return (
    <ComponentShowcase
      title="Export Panel"
      description="Diálogo de exportación de datos con selección de formato (CSV, PDF) y columnas. Se activa con un botón trigger o de forma controlada desde el padre."
      category="Patterns"
      atomicLevel="Molecule"
      preview={
        <ExportPanel
          title="Exportar cartera de factoring"
          columns={portfolioColumns}
          formats={["csv", "pdf"]}
          onExport={(fmt, cols) =>
            toast.success(`Exportando ${cols.length} columnas en formato ${fmt.toUpperCase()}`)
          }
        />
      }
      code={`import { ExportPanel } from "@/components/patterns/ExportPanel"

const columns = [
  { id: "folio",    label: "Folio",    defaultSelected: true },
  { id: "cedente",  label: "Cedente",  defaultSelected: true },
  { id: "monto",    label: "Monto",    defaultSelected: true },
  { id: "estado",   label: "Estado",   defaultSelected: true },
  { id: "ejecutivo", label: "Ejecutivo", defaultSelected: false },
]

<ExportPanel
  title="Exportar cartera"
  columns={columns}
  formats={["csv", "pdf"]}
  onExport={(format, selectedCols) => {
    console.log("Exportar:", format, selectedCols)
  }}
/>`}
      props={[
        { name: "title",        type: "string",          description: "Título del diálogo.", required: false },
        { name: "columns",      type: "ExportColumn[]",  description: "Columnas seleccionables. defaultSelected controla el estado inicial.", required: false },
        { name: "formats",      type: "ExportFormat[]",  description: "Formatos disponibles. Default: ['csv', 'pdf'].", required: false },
        { name: "onExport",     type: "(format, columns) => void", description: "Callback con formato elegido y columnas seleccionadas." },
        { name: "triggerLabel", type: "string",          description: "Texto del botón trigger. Default: 'Exportar'.", required: false },
        { name: "showTrigger",  type: "boolean",         description: "Muestra el botón trigger. Default: true.", required: false },
        { name: "open",         type: "boolean",         description: "Control externo del estado abierto.", required: false },
        { name: "onOpenChange", type: "(open) => void",  description: "Callback cuando cambia el estado abierto.", required: false },
      ]}
      examples={[
        {
          title: "Solo CSV (sin columnas)",
          description: "Versión simplificada solo con selección de formato.",
          preview: (
            <ExportPanel
              title="Exportar cedentes"
              formats={["csv"]}
              triggerLabel="Descargar lista"
              onExport={(fmt) => toast.success(`Descargando en ${fmt.toUpperCase()}`)}
            />
          ),
          code: `<ExportPanel
  title="Exportar cedentes"
  formats={["csv"]}
  triggerLabel="Descargar lista"
  onExport={(fmt) => download(fmt)}
/>`,
        },
      ]}
    />
  );
}
