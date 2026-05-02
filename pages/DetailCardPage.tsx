import { ComponentShowcase } from "../components/ui/componentshowcase"
import { DetailCard, DetailSection } from "../components/patterns/detail-card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Pencil } from "lucide-react"

function DetailCardDemo() {
  return (
    <div className="space-y-4 max-w-2xl">
      <DetailCard
        title="Datos de la Operación"
        columns={3}
        actions={
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
            <Pencil size={12} />
            Editar
          </Button>
        }
        fields={[
          { label: "Folio",         value: "FCT-2025-0842",                  copyable: true },
          { label: "Estado",        value: <Badge variant="info-soft-outline">Desembolsado</Badge> },
          { label: "Fecha emisión", value: "12/03/2025" },
          { label: "Cedente",       value: "Construcciones Andina S.A.",     span: 2 },
          { label: "NIT cedente",   value: "900.123.456-7",                  copyable: true },
          { label: "Deudor",        value: "Banco de Bogotá",                span: 2 },
          { label: "Monto factura", value: "$185.000.000",                   copyable: true, copyValue: "185000000" },
          { label: "% Anticipo",    value: "80%" },
          { label: "Monto desembolsado", value: "$148.000.000" },
          { label: "Tasa mensual", value: "1,8%" },
          { label: "Plazo",         value: "60 días" },
          { label: "Vencimiento",   value: "11/05/2025" },
        ]}
      />

      <DetailCard
        title="Datos del Cedente"
        columns={2}
        variant="compact"
        fields={[
          { label: "Razón social",  value: "Construcciones Andina S.A." },
          { label: "NIT",            value: "900.123.456-7", copyable: true },
          { label: "Representante", value: "Carlos Morales Díaz" },
          { label: "Teléfono",      value: "+57 310 876 5432",             copyable: true },
          { label: "Email",         value: "contacto@andina.co",           copyable: true },
          { label: "Banco",         value: "Bancolombia — Cta. 1234567890", span: 2 },
        ]}
      />
    </div>
  );
}

export function DetailCardPage() {
  return (
    <ComponentShowcase
      title="Detail Card"
      description="Card de pares clave-valor para vistas de detalle de operaciones, cedentes y deudores. Soporta grid de 2/3/4 columnas, valores con span, valores React (Badge, etc.), copiado al portapapeles y variante compacta."
      category="Patterns"
      atomicLevel="Molecule"
      preview={<DetailCardDemo />}
      code={`import { DetailCard } from "@/components/patterns/detailcard"

<DetailCard
  title="Datos de la Operación"
  columns={3}
  fields={[
    { label: "Folio",   value: "FCT-2025-0842", copyable: true },
    { label: "Estado",  value: <Badge variant="info-soft-outline">Desembolsado</Badge> },
    { label: "Cedente", value: "Construcciones Andina S.A.", span: 2 },
    { label: "Monto",   value: "$185.000.000" },
    { label: "Plazo",   value: "60 días" },
  ]}
/>`}
      props={[
        { name: "fields",   type: "DetailField[]", description: "Array de { label, value, span?, copyable?, hidden? }." },
        { name: "columns",  type: "2 | 3 | 4",     description: "Columnas del grid. Default: 2.", required: false },
        { name: "title",    type: "string",         description: "Título del card.", required: false },
        { name: "actions",  type: "React.ReactNode", description: "Slot derecho del header (ej. botón Editar).", required: false },
        { name: "variant",  type: '"default" | "compact"', description: "Padding interno. Default: default.", required: false },
      ]}
      examples={[
        {
          title: "DetailSection (sin card)",
          description: "Solo la grilla de campos, sin shell de Card. Para embeber dentro de otro card.",
          preview: (
            <div className="max-w-lg border rounded-lg p-4">
              <p className="text-sm font-medium mb-3">Resumen de operación</p>
              <DetailSection
                columns={3}
                fields={[
                  { label: "Folio",    value: "FCT-0842" },
                  { label: "Monto",    value: "$185M" },
                  { label: "Plazo",    value: "60 días" },
                  { label: "Cedente",  value: "Construcciones Andina", span: 2 },
                  { label: "Estado",   value: <Badge variant="info-soft-outline">Desembolsado</Badge> },
                ]}
              />
            </div>
          ),
          code: `import { DetailSection } from "@/components/patterns/detailcard"\n\n<DetailSection columns={3} fields={fields} />`,
        },
      ]}
    />
  );
}
