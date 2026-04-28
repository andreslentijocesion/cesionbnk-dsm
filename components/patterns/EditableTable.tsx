/**
 * EditableTable
 * ─────────────
 * Capa: Patterns
 *
 * Interactive table with inline cell editing, row selection,
 * date pickers, currency formatting, and status management.
 * Designed for financial invoice workflows.
 * Self-contained with mock data.
 */
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
import { Badge } from "../ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Check,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "../ui/utils";

// ── Types ──────────────────────────────────────────────────────────

type InvoiceStatus = "pendiente" | "aprobada" | "rechazada" | "en_revision";

interface EditableRow {
  id: string;
  number: string;
  payor: string;
  amount: number;
  rate: number;
  dueDate: string;
  status: InvoiceStatus;
  observations: string;
}

// ── Mock Data ──────────────────────────────────────────────────────

const INITIAL_DATA: EditableRow[] = [
  { id: "row-1", number: "FE-20241001", payor: "Empresa Alfa Ltda.", amount: 4500000, rate: 1.8, dueDate: "2024-04-15", status: "aprobada", observations: "Cliente prioritario" },
  { id: "row-2", number: "FE-20241002", payor: "Comercial Beta S.A.", amount: 2300000, rate: 2.1, dueDate: "2024-04-22", status: "pendiente", observations: "" },
  { id: "row-3", number: "FE-20241003", payor: "Distribuidora Gamma SpA", amount: 8700000, rate: 1.9, dueDate: "2024-05-01", status: "en_revision", observations: "Revisión documental" },
  { id: "row-4", number: "FE-20241004", payor: "Empresa Alfa Ltda.", amount: 3200000, rate: 1.8, dueDate: "2024-04-30", status: "aprobada", observations: "" },
  { id: "row-5", number: "FE-20241005", payor: "Proveedora Delta Inc.", amount: 11500000, rate: 2.3, dueDate: "2024-04-10", status: "rechazada", observations: "Inconsistencia en datos" },
  { id: "row-6", number: "FE-20241006", payor: "Comercial Beta S.A.", amount: 1800000, rate: 2.1, dueDate: "2024-05-15", status: "pendiente", observations: "" },
  { id: "row-7", number: "FE-20241007", payor: "Distribuidora Gamma SpA", amount: 6400000, rate: 1.9, dueDate: "2024-04-18", status: "aprobada", observations: "Aceptada digitalmente" },
  { id: "row-8", number: "FE-20241008", payor: "Proveedora Delta Inc.", amount: 9100000, rate: 2.3, dueDate: "2024-04-25", status: "en_revision", observations: "" },
  { id: "row-9", number: "FE-20241009", payor: "Empresa Alfa Ltda.", amount: 2750000, rate: 1.8, dueDate: "2024-05-20", status: "pendiente", observations: "Nuevo proveedor" },
  { id: "row-10", number: "FE-20241010", payor: "Comercial Beta S.A.", amount: 5300000, rate: 2.1, dueDate: "2024-04-08", status: "aprobada", observations: "" },
  { id: "row-11", number: "FE-20241011", payor: "Distribuidora Gamma SpA", amount: 3900000, rate: 1.9, dueDate: "2024-05-05", status: "pendiente", observations: "" },
  { id: "row-12", number: "FE-20241012", payor: "Proveedora Delta Inc.", amount: 7200000, rate: 2.3, dueDate: "2024-04-28", status: "rechazada", observations: "Deudor con mora registrada" },
];

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; variant: "success-soft-outline" | "warning-soft-outline" | "info-soft-outline" | "destructive-soft-outline" }> = {
  aprobada:    { label: "Aprobada",    variant: "success-soft-outline" },
  pendiente:   { label: "Pendiente",   variant: "warning-soft-outline" },
  en_revision: { label: "En Revisión", variant: "info-soft-outline" },
  rechazada:   { label: "Rechazada",   variant: "destructive-soft-outline" },
};

const ITEMS_PER_PAGE = 8;

// ── Helpers ────────────────────────────────────────────────────────

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}

let nextId = 13;

// ── Main Component ─────────────────────────────────────────────────

export function EditableTable() {
  const [rows, setRows] = useState<EditableRow[]>(INITIAL_DATA);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<EditableRow>>({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Filter + paginate ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        !q ||
        r.number.toLowerCase().includes(q) ||
        r.payor.toLowerCase().includes(q) ||
        r.observations.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  // ── Selection ─────────────────────────────────────────────────────
  const allPageSelected = paginated.length > 0 && paginated.every((r) => selectedIds.has(r.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        paginated.forEach((r) => next.add(r.id));
        return next;
      });
    }
  };

  // ── Edit ─────────────────────────────────────────────────────────
  const startEdit = (row: EditableRow) => {
    setEditingId(row.id);
    setEditDraft({ ...row });
  };

  const commitEdit = () => {
    if (!editingId || !editDraft) return;
    setRows((prev) => prev.map((r) => (r.id === editingId ? { ...r, ...editDraft } as EditableRow : r)));
    setEditingId(null);
    setEditDraft({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
  };

  // ── Add / Delete ──────────────────────────────────────────────────
  const addRow = () => {
    const newRow: EditableRow = {
      id: `row-${nextId++}`,
      number: `FE-2024${String(nextId).padStart(4, "0")}`,
      payor: "",
      amount: 0,
      rate: 2.0,
      dueDate: new Date().toISOString().slice(0, 10),
      status: "pendiente",
      observations: "",
    };
    setRows((prev) => [newRow, ...prev]);
    setCurrentPage(1);
    setEditingId(newRow.id);
    setEditDraft({ ...newRow });
  };

  const deleteSelected = () => {
    setRows((prev) => prev.filter((r) => !selectedIds.has(r.id)));
    setSelectedIds(new Set());
  };

  return (
    <Card className="border-border shadow-sm bg-card overflow-hidden">
      {/* Toolbar */}
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar factura, pagador..."
              className="pl-9 h-9"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <Button variant="outline" size="sm" onClick={deleteSelected} className="h-9 text-destructive hover:text-destructive">
                <Trash2 className="size-3.5 .5 mr-1.5" />
                Eliminar ({selectedIds.size})
              </Button>
            )}
            <Button size="sm" onClick={addRow} className="h-9">
              <Plus className="size-3.5 .5 mr-1.5" />
              Agregar fila
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Table */}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-10 pl-4">
                  <Checkbox checked={allPageSelected} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead className="text-xs min-w-[130px]">Numeración</TableHead>
                <TableHead className="text-xs min-w-[170px]">Pagador</TableHead>
                <TableHead className="text-xs text-right min-w-[120px]">Monto</TableHead>
                <TableHead className="text-xs text-right min-w-[80px]">Tasa %</TableHead>
                <TableHead className="text-xs min-w-[120px]">Vencimiento</TableHead>
                <TableHead className="text-xs min-w-[110px]">Estado</TableHead>
                <TableHead className="text-xs min-w-[160px]">Observaciones</TableHead>
                <TableHead className="text-xs w-20 text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-10 text-muted-foreground text-sm">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row) => {
                  const isEditing = editingId === row.id;
                  const isSelected = selectedIds.has(row.id);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(
                        "transition-colors",
                        isSelected && "bg-accent",
                        isEditing && "bg-warning-subtle"
                      )}
                    >
                      {/* Checkbox */}
                      <TableCell className="pl-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(row.id)}
                          disabled={isEditing}
                        />
                      </TableCell>

                      {/* Number */}
                      <TableCell className="text-xs font-mono tabular-nums">
                        {isEditing ? (
                          <Input
                            value={editDraft.number ?? ""}
                            onChange={(e) => setEditDraft((d) => ({ ...d, number: e.target.value }))}
                            className="h-7 text-xs w-full min-w-[110px]"
                          />
                        ) : (
                          row.number
                        )}
                      </TableCell>

                      {/* Payor */}
                      <TableCell className="text-xs">
                        {isEditing ? (
                          <Input
                            value={editDraft.payor ?? ""}
                            onChange={(e) => setEditDraft((d) => ({ ...d, payor: e.target.value }))}
                            className="h-7 text-xs w-full min-w-[140px]"
                            placeholder="Nombre pagador"
                          />
                        ) : (
                          <span className="truncate block max-w-[160px]">{row.payor}</span>
                        )}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="text-xs text-right font-mono tabular-nums">
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editDraft.amount ?? 0}
                            onChange={(e) => setEditDraft((d) => ({ ...d, amount: Number(e.target.value) }))}
                            className="h-7 text-xs text-right w-28"
                          />
                        ) : (
                          <span className="font-medium">{formatCOP(row.amount)}</span>
                        )}
                      </TableCell>

                      {/* Rate */}
                      <TableCell className="text-xs text-right">
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.1"
                            value={editDraft.rate ?? 0}
                            onChange={(e) => setEditDraft((d) => ({ ...d, rate: Number(e.target.value) }))}
                            className="h-7 text-xs text-right w-20"
                          />
                        ) : (
                          <span className="font-mono tabular-nums">{row.rate.toFixed(1)}%</span>
                        )}
                      </TableCell>

                      {/* Due Date */}
                      <TableCell className="text-xs">
                        {isEditing ? (
                          <Input
                            type="date"
                            value={editDraft.dueDate ?? ""}
                            onChange={(e) => setEditDraft((d) => ({ ...d, dueDate: e.target.value }))}
                            className="h-7 text-xs w-32"
                          />
                        ) : (
                          row.dueDate
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-xs">
                        {isEditing ? (
                          <Select
                            value={editDraft.status ?? row.status}
                            onValueChange={(v) => setEditDraft((d) => ({ ...d, status: v as InvoiceStatus }))}
                          >
                            <SelectTrigger className="h-7 text-xs w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendiente">Pendiente</SelectItem>
                              <SelectItem value="aprobada">Aprobada</SelectItem>
                              <SelectItem value="en_revision">En Revisión</SelectItem>
                              <SelectItem value="rechazada">Rechazada</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant={STATUS_CONFIG[row.status].variant} className="text-xs">
                            {STATUS_CONFIG[row.status].label}
                          </Badge>
                        )}
                      </TableCell>

                      {/* Observations */}
                      <TableCell className="text-xs">
                        {isEditing ? (
                          <Input
                            value={editDraft.observations ?? ""}
                            onChange={(e) => setEditDraft((d) => ({ ...d, observations: e.target.value }))}
                            className="h-7 text-xs w-full min-w-[140px]"
                            placeholder="Observaciones..."
                          />
                        ) : (
                          <span className="truncate block max-w-[150px] text-muted-foreground">{row.observations || "—"}</span>
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="icon" className="size-7 text-primary hover:text-primary" aria-label="Confirmar edición" onClick={commitEdit}>
                              <Check className="size-3.5 .5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" aria-label="Cancelar edición" onClick={cancelEdit}>
                              <X className="size-3.5 .5" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 opacity-0 group-hover:opacity-100 hover:opacity-100 text-muted-foreground hover:text-foreground"
                            aria-label="Editar fila"
                            onClick={() => startEdit(row)}
                          >
                            <Pencil className="size-3.5 .5" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {filtered.length} filas · página {safePage} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Página anterior"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="size-3.5 .5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Página siguiente"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="size-3.5 .5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}