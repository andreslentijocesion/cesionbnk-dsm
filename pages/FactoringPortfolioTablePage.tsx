import { ComponentShowcase } from "../components/ui/componentshowcase"
import { FactoringPortfolioTable } from "../components/patterns/factoring-portfolio-table"

const code = `import { FactoringPortfolioTable } from "@/components/patterns/factoring-portfolio-table"

export function MyPage() {
  return <FactoringPortfolioTable />;
}`;

export function FactoringPortfolioTablePage() {
  return (
    <ComponentShowcase
      title="Factoring Portfolio Table"
      description="Tabla de portafolio de factoring con KPIs integrados, progreso de cobro por fila, sorting por columna, filtros por estado y acciones contextuales según el estado de cada operación."
      category="Business Pattern"
      atomicLevel="Organism"
      preview={<FactoringPortfolioTable />}
      code={code}
      props={[
        { name: "(self-contained)", type: "—", description: "Componente autocontenido con datos mock de factoring. Integra MasterDataGrid, KPI strip con sparklines, progress inline y menú de acciones contextual." },
      ]}
      examples={[
        {
          title: "Columna de progreso de cobro",
          description: "Cada fila muestra una mini barra de progreso con fecha inicio → vencimiento y porcentaje cobrado. El color cambia según el estado: azul (normal), amarillo (>80% tiempo), rojo (vencido), verde (cobrado).",
          preview: (
            <div className="space-y-2 p-4">
              <p className="text-sm text-muted-foreground">La columna <strong>Cobro</strong> muestra el avance de recaudo entre la fecha de inicio y la fecha de vencimiento. Combinada con la columna <strong>Días</strong>, permite identificar rápidamente operaciones en riesgo.</p>
              <div className="grid grid-cols-3 gap-3 text-xs mt-3">
                <div className="rounded border border-success/30 bg-success/5 p-2 space-y-1">
                  <div className="font-medium text-success">Cobrado (100%)</div>
                  <div className="text-muted-foreground">Barra verde completa</div>
                </div>
                <div className="rounded border border-warning/30 bg-warning/5 p-2 space-y-1">
                  <div className="font-medium text-warning">En riesgo (≥80%)</div>
                  <div className="text-muted-foreground">Barra amarilla</div>
                </div>
                <div className="rounded border border-destructive/30 bg-destructive/5 p-2 space-y-1">
                  <div className="font-medium text-destructive">Vencido</div>
                  <div className="text-muted-foreground">Barra roja</div>
                </div>
              </div>
            </div>
          ),
          code: `// Columna de cobro en la tabla
<TableCell>
  <InlineProgress record={record} />
</TableCell>

// InlineProgress muestra:
// - Fechas inicio / vencimiento
// - Porcentaje cobrado
// - Barra coloreada por estado`,
        },
        {
          title: "Acciones contextuales por estado",
          description: "El menú de acciones cambia según el estado de la operación: Aprobado → Desembolsar/Rechazar, En cobro → Registrar cobro, Cobrado → Descargar soporte, etc.",
          preview: (
            <div className="p-4 space-y-2 text-sm">
              {[
                { status: "Aprobado",     actions: ["Ver detalle", "Desembolsar", "Rechazar"] },
                { status: "Desembolsado", actions: ["Ver detalle", "Registrar pago", "Marcar cobrado"] },
                { status: "En cobro",     actions: ["Ver detalle", "Registrar cobro", "Marcar vencido"] },
                { status: "Vencido",      actions: ["Ver detalle", "Iniciar gestión cobranza", "Marcar cobrado"] },
                { status: "Cobrado",      actions: ["Ver detalle", "Descargar soporte"] },
              ].map((row) => (
                <div key={row.status} className="flex items-center gap-3 py-1 border-b border-border/40 last:border-0">
                  <span className="w-28 font-medium text-foreground">{row.status}</span>
                  <span className="text-muted-foreground">{row.actions.join(" · ")}</span>
                </div>
              ))}
            </div>
          ),
          code: `const actions: Record<FactoringStatus, Action[]> = {
  aprobado:     ["Ver detalle", "Desembolsar", "Rechazar"],
  desembolsado: ["Ver detalle", "Registrar pago", "Marcar cobrado"],
  "en-cobro":   ["Ver detalle", "Registrar cobro", "Marcar vencido"],
  cobrado:      ["Ver detalle", "Descargar soporte"],
  vencido:      ["Ver detalle", "Iniciar gestión cobranza", "Marcar cobrado"],
  rechazado:    ["Ver detalle", "Reactivar"],
};`,
        },
      ]}
    />
  );
}
