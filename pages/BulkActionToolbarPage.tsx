import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { BulkActionToolbar } from "../components/patterns/bulk-action-toolbar";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, Send, Download, Trash2 } from "lucide-react";

const rows = [
  { id: "FCT-001", cedente: "Construcciones Andina", monto: "$185M", estado: "En cobro" },
  { id: "FCT-002", cedente: "Textiles del Valle",    monto: "$92M",  estado: "Desembolsado" },
  { id: "FCT-003", cedente: "Servicios TI Colombia", monto: "$520M", estado: "Desembolsado" },
  { id: "FCT-004", cedente: "Agropecuaria Llanos",   monto: "$78M",  estado: "Vencido" },
  { id: "FCT-005", cedente: "Muebles Roble S.A.S.",  monto: "$55M",  estado: "En cobro" },
];

function BulkDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggleAll = () =>
    setSelected(selected.size === rows.length ? new Set() : new Set(rows.map(r => r.id)));
  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelected(next);
  };

  return (
    <div className="space-y-2 max-w-2xl">
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 border-b">
              <th className="w-10 px-3 py-2">
                <Checkbox
                  checked={selected.size === rows.length}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">Folio</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">Cedente</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">Monto</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map(r => (
              <tr
                key={r.id}
                className={selected.has(r.id) ? "bg-primary/5" : "hover:bg-muted/20"}
                onClick={() => toggle(r.id)}
              >
                <td className="px-3 py-2">
                  <Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="px-3 py-2 font-medium">{r.cedente}</td>
                <td className="px-3 py-2">{r.monto}</td>
                <td className="px-3 py-2">
                  <Badge variant="secondary" className="text-xs">{r.estado}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">Haz clic en una fila para seleccionarla</p>

      <BulkActionToolbar
        selectedIds={Array.from(selected)}
        totalCount={rows.length}
        entityLabel="operación"
        onClearSelection={() => setSelected(new Set())}
        actions={[
          { id: "approve", label: "Aprobar", icon: CheckCircle2, variant: "default",
            onClick: (ids) => { toast.success(`${ids.length} operaciones aprobadas`); setSelected(new Set()); } },
          { id: "remind",  label: "Recordatorio", icon: Send, variant: "outline",
            onClick: (ids) => toast.info(`Recordatorio enviado a ${ids.length} deudores`) },
          { id: "export",  label: "Exportar", icon: Download, variant: "outline",
            onClick: (ids) => toast.info(`Exportando ${ids.length} operaciones`) },
          { id: "delete",  label: "Eliminar", icon: Trash2, variant: "destructive",
            onClick: (ids) => toast.error(`${ids.length} operaciones eliminadas`), minSelection: 1 },
        ]}
      />
    </div>
  );
}

export function BulkActionToolbarPage() {
  return (
    <ComponentShowcase
      title="Bulk Action Toolbar"
      description="Barra de acciones flotante que aparece al seleccionar filas en una tabla. Muestra el conteo de selección y botones de acción configurables. Se anima al aparecer desde abajo."
      category="Patterns"
      atomicLevel="Molecule"
      preview={<BulkDemo />}
      code={`import { BulkActionToolbar } from "@/components/patterns/bulk-action-toolbar"
import { CheckCircle2, Send } from "lucide-react"

<BulkActionToolbar
  selectedIds={selectedRows}
  totalCount={rows.length}
  entityLabel="operación"
  onClearSelection={() => setSelected([])}
  actions={[
    {
      id: "approve",
      label: "Aprobar",
      icon: CheckCircle2,
      variant: "default",
      onClick: (ids) => handleApprove(ids),
    },
    {
      id: "remind",
      label: "Recordatorio",
      icon: Send,
      variant: "outline",
      onClick: (ids) => sendReminder(ids),
    },
  ]}
/>`}
      props={[
        { name: "selectedIds",     type: "string[]",      description: "IDs de filas seleccionadas. Si está vacío, el toolbar no se renderiza." },
        { name: "actions",         type: "BulkAction[]",  description: "Acciones disponibles con id, label, icon, variant y onClick." },
        { name: "onClearSelection", type: "() => void",   description: "Limpia la selección al hacer clic en ✕." },
        { name: "totalCount",      type: "number",        description: "Total de filas para mostrar 'X de N seleccionados'.", required: false },
        { name: "entityLabel",     type: "string",        description: "Nombre de la entidad en singular (ej. 'operación'). Default: 'elemento'.", required: false },
      ]}
      examples={[]}
    />
  );
}
