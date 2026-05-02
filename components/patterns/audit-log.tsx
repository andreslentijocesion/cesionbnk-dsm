/**
 * AuditLog — System action history table with filters
 * Tracks who did what, when, on which entity. Compliance & traceability.
 * @layer patterns
 */
import { useState, useMemo } from "react";
import { Search, X, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { cn } from "../../lib/utils";

const PAGE_SIZE = 10;

export type AuditAction =
  | "create" | "update" | "delete" | "approve" | "reject"
  | "login" | "logout" | "export" | "view";

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  /** User role/area */
  role?: string;
  action: AuditAction;
  /** Entity type, e.g. "Factura", "Cedente", "Operación" */
  entity: string;
  /** Entity ID or name */
  entityId?: string;
  /** Human-readable description */
  description: string;
  /** IP address or system identifier */
  source?: string;
}

interface AuditLogProps {
  entries: AuditEntry[];
  className?: string;
}

const actionMeta: Record<AuditAction, { label: string; variant: "outline" }> = {
  create:  { label: "Creó",     variant: "outline" },
  update:  { label: "Modificó", variant: "outline" },
  delete:  { label: "Eliminó",  variant: "outline" },
  approve: { label: "Aprobó",   variant: "outline" },
  reject:  { label: "Rechazó",  variant: "outline" },
  login:   { label: "Ingresó",  variant: "outline" },
  logout:  { label: "Salió",    variant: "outline" },
  export:  { label: "Exportó",  variant: "outline" },
  view:    { label: "Consultó", variant: "outline" },
};

export function AuditLog({ entries, className }: AuditLogProps) {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueEntities = useMemo(
    () => Array.from(new Set(entries.map((e) => e.entity))).sort(),
    [entries]
  );

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return entries.filter((e) => {
      const matchSearch =
        !search ||
        e.user.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.entityId?.toLowerCase().includes(search.toLowerCase());
      const matchAction = actionFilter === "all" || e.action === actionFilter;
      const matchEntity = entityFilter === "all" || e.entity === entityFilter;
      return matchSearch && matchAction && matchEntity;
    });
  }, [entries, search, actionFilter, entityFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const hasFilters = search || actionFilter !== "all" || entityFilter !== "all";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3 px-4 pt-4 border-b border-border">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuario, descripción..."
              className="pl-9 pr-8 h-9"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="h-9 w-40">
              <Filter className="size-3.5 .5 mr-1 text-muted-foreground" />
              <SelectValue placeholder="Acción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las acciones</SelectItem>
              {Object.entries(actionMeta).map(([key, m]) => (
                <SelectItem key={key} value={key}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue placeholder="Entidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las entidades</SelectItem>
              {uniqueEntities.map((ent) => (
                <SelectItem key={ent} value={ent}>{ent}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9"
              onClick={() => { setSearch(""); setActionFilter("all"); setEntityFilter("all"); }}
            >
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-36 text-xs">Fecha / Hora</TableHead>
                <TableHead className="text-xs">Usuario</TableHead>
                <TableHead className="w-28 text-xs">Acción</TableHead>
                <TableHead className="text-xs">Descripción</TableHead>
                <TableHead className="w-28 text-xs hidden md:table-cell">Origen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((e) => {
                  const meta = actionMeta[e.action];
                  return (
                    <TableRow key={e.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">{e.timestamp}</TableCell>
                      <TableCell>
                        <p className="font-medium text-foreground leading-tight">{e.user}</p>
                        {e.role && <p className="text-xs text-muted-foreground">{e.role}</p>}
                      </TableCell>
                      <TableCell>
                        <Badge variant={meta.variant} className="text-xs">{meta.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {e.description}
                        {e.entityId && (
                          <span className="ml-1 font-medium text-foreground">({e.entityId})</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono hidden md:table-cell">
                        {e.source ?? "—"}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {filtered.length} de {entries.length} registros · página {safePage} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline" size="icon" className="size-8"
              aria-label="Página anterior"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="size-3.5 .5" />
            </Button>
            <Button
              variant="outline" size="icon" className="size-8"
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
