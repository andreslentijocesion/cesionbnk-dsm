/* eslint-disable */
/**
 * TreeTable — Financial Operations Table (3 levels)
 * @layer advanced
 * Renamed from tree-table-v2.tsx — R4 compliance (no version suffixes)
 */
import { useState, useCallback, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";
import {
  ChevronRight, ChevronDown, Eye, Ban, FileSpreadsheet, X, Search,
  ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, Download, Trash2,
  Filter, ChevronsUpDown, XCircle, User,
} from "lucide-react";
import { cn } from "../ui/utils";

export interface Payer { name: string; taxId: string; }
export interface InvoiceDetail {
  id: string; number: string; payer: Payer;
  amount: number; disbursementAmount: number; dueDate: string;
  status: "current" | "overdue" | "paid";
}
export interface Operation {
  id: string; operationDate: string;
  client: { name: string; taxId: string };
  invoices: InvoiceDetail[];
  invoiceAmount: number; disbursementAmount: number;
  status: "pending" | "approved" | "disbursed" | "canceled";
}
export type BatchAction = "approve" | "export" | "cancel";
type SortField = "id" | "date" | "client" | "invoiceAmount" | "disbursementAmount" | null;
type SortDir = "asc" | "desc";
type CheckState = true | false | "indeterminate";

export interface TreeTableProps {
  data: Operation[];
  onSelectionChange?: (selectedIds: Set<string>) => void;
  onBatchAction?: (action: BatchAction, selectedIds: Set<string>) => void;
  onViewOperation?: (op: Operation) => void;
  onCancelOperation?: (op: Operation) => void;
  onDownloadExcel?: (op: Operation) => void;
  title?: string;
  description?: string;
}

interface PayerGroup {
  payer: Payer; invoices: InvoiceDetail[];
  totalAmount: number; totalDisbursement: number; groupId: string;
}

const operationStatusConfig: Record<Operation["status"], { label: string; variant: "outline"; order: number }> = {
  pending:    { label: "Pending",    variant: "outline", order: 1 },
  approved:   { label: "Approved",   variant: "outline", order: 2 },
  disbursed:  { label: "Disbursed",  variant: "outline", order: 3 },
  canceled:   { label: "Canceled",   variant: "outline", order: 4 },
};

const invoiceStatusConfig: Record<InvoiceDetail["status"], { label: string; variant: "outline" }> = {
  current: { label: "Current", variant: "outline" },
  overdue: { label: "Overdue", variant: "outline" },
  paid:    { label: "Paid",    variant: "outline" },
};

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "disbursed", label: "Disbursed" },
  { value: "canceled", label: "Canceled" },
];

function formatCurrency(val: number): string {
  return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function groupInvoicesByPayer(op: Operation): PayerGroup[] {
  const map = new Map<string, PayerGroup>();
  for (const inv of op.invoices) {
    const key = inv.payer.taxId;
    if (!map.has(key)) map.set(key, { payer: inv.payer, invoices: [], totalAmount: 0, totalDisbursement: 0, groupId: `${op.id}::payer::${key}` });
    const group = map.get(key)!;
    group.invoices.push(inv);
    group.totalAmount += inv.amount;
    group.totalDisbursement += inv.disbursementAmount;
  }
  return Array.from(map.values());
}

function getUniquePayers(op: Operation): Payer[] {
  const map = new Map<string, Payer>();
  for (const inv of op.invoices) { if (!map.has(inv.payer.taxId)) map.set(inv.payer.taxId, inv.payer); }
  return Array.from(map.values());
}

function getOpAllIds(op: Operation): string[] {
  const groups = groupInvoicesByPayer(op);
  return [op.id, ...groups.map((g) => g.groupId), ...op.invoices.map((inv) => inv.id)];
}

function getCheckStateFromInvoices(invoiceIds: string[], selected: Set<string>): CheckState {
  if (invoiceIds.length === 0) return false;
  const count = invoiceIds.filter((id) => selected.has(id)).length;
  if (count === 0) return false;
  if (count === invoiceIds.length) return true;
  return "indeterminate";
}

function getOpCheckState(op: Operation, selected: Set<string>): CheckState {
  return getCheckStateFromInvoices(op.invoices.map((inv) => inv.id), selected);
}

function getPayerGroupCheckState(group: PayerGroup, selected: Set<string>): CheckState {
  return getCheckStateFromInvoices(group.invoices.map((inv) => inv.id), selected);
}

function parseDate(dateStr: string): number {
  if (dateStr.includes("/")) { const [d, m, y] = dateStr.split("/"); return new Date(`${y}-${m}-${d}`).getTime(); }
  return new Date(dateStr).getTime();
}

function matchesSearch(op: Operation, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  if (op.id.toLowerCase().includes(q)) return true;
  if (op.client.name.toLowerCase().includes(q)) return true;
  if (op.client.taxId.toLowerCase().includes(q)) return true;
  for (const inv of op.invoices) {
    if (inv.payer.name.toLowerCase().includes(q)) return true;
    if (inv.payer.taxId.toLowerCase().includes(q)) return true;
    if (inv.number.toLowerCase().includes(q)) return true;
  }
  return false;
}

function sortOperations(ops: Operation[], field: SortField, dir: SortDir): Operation[] {
  if (!field) return ops;
  return [...ops].sort((a, b) => {
    let cmp = 0;
    switch (field) {
      case "id": cmp = a.id.localeCompare(b.id); break;
      case "date": cmp = parseDate(a.operationDate) - parseDate(b.operationDate); break;
      case "client": cmp = a.client.name.localeCompare(b.client.name); break;
      case "invoiceAmount": cmp = a.invoiceAmount - b.invoiceAmount; break;
      case "disbursementAmount": cmp = a.disbursementAmount - b.disbursementAmount; break;
    }
    return dir === "desc" ? -cmp : cmp;
  });
}

function countByStatus(ops: Operation[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const op of ops) counts[op.status] = (counts[op.status] || 0) + 1;
  return counts;
}

export function TreeTable({
  data, onSelectionChange, onBatchAction,
  onViewOperation, onCancelOperation, onDownloadExcel,
  title, description,
}: TreeTableProps) {
  const [expandedOps, setExpandedOps] = useState<Set<string>>(new Set());
  const [expandedPayers, setExpandedPayers] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const processedData = useMemo(() => {
    let result = data;
    if (searchQuery.trim()) result = result.filter((op) => matchesSearch(op, searchQuery));
    if (statusFilter !== "all") result = result.filter((op) => op.status === statusFilter);
    if (sortField) result = sortOperations(result, sortField, sortDir);
    return result;
  }, [data, searchQuery, statusFilter, sortField, sortDir]);

  const statusCounts = useMemo(() => countByStatus(data), [data]);
  const isFiltered = searchQuery.trim() !== "" || statusFilter !== "all";

  const allInvoiceIds = useMemo(() => {
    const ids: string[] = [];
    for (const op of processedData) for (const inv of op.invoices) ids.push(inv.id);
    return ids;
  }, [processedData]);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      if (sortDir === "asc") setSortDir("desc");
      else { setSortField(null); setSortDir("asc"); }
    } else { setSortField(field); setSortDir("asc"); }
  }, [sortField, sortDir]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="size-3 text-muted-foreground/40" />;
    if (sortDir === "asc") return <ArrowUp className="size-3 text-primary" />;
    return <ArrowDown className="size-3 text-primary" />;
  };

  const toggleExpandOp = (opId: string) => setExpandedOps((prev) => { const next = new Set(prev); next.has(opId) ? next.delete(opId) : next.add(opId); return next; });
  const toggleExpandPayer = (groupId: string) => setExpandedPayers((prev) => { const next = new Set(prev); next.has(groupId) ? next.delete(groupId) : next.add(groupId); return next; });

  const expandAll = useCallback(() => {
    setExpandedOps(new Set(processedData.map((op) => op.id)));
    const payerIds = new Set<string>();
    for (const op of processedData) for (const g of groupInvoicesByPayer(op)) payerIds.add(g.groupId);
    setExpandedPayers(payerIds);
  }, [processedData]);

  const collapseAll = useCallback(() => { setExpandedOps(new Set()); setExpandedPayers(new Set()); }, []);

  const updateSelection = useCallback((next: Set<string>) => { setSelectedIds(next); onSelectionChange?.(next); }, [onSelectionChange]);

  const reconcileParents = useCallback((next: Set<string>, op: Operation) => {
    const groups = groupInvoicesByPayer(op);
    let allGroupsFull = true;
    for (const group of groups) {
      const allSelected = group.invoices.every((inv) => next.has(inv.id));
      if (allSelected) next.add(group.groupId);
      else { next.delete(group.groupId); allGroupsFull = false; }
    }
    if (allGroupsFull && groups.length > 0) next.add(op.id);
    else next.delete(op.id);
  }, []);

  const toggleOpSelection = useCallback((op: Operation) => {
    const next = new Set(selectedIds);
    const currentState = getOpCheckState(op, selectedIds);
    const allIds = getOpAllIds(op);
    if (currentState === true) allIds.forEach((id) => next.delete(id));
    else { allIds.forEach((id) => next.add(id)); setExpandedOps((prev) => new Set(prev).add(op.id)); }
    updateSelection(next);
  }, [selectedIds, updateSelection]);

  const togglePayerSelection = useCallback((group: PayerGroup, op: Operation) => {
    const next = new Set(selectedIds);
    const currentState = getPayerGroupCheckState(group, selectedIds);
    if (currentState === true) { group.invoices.forEach((inv) => next.delete(inv.id)); next.delete(group.groupId); }
    else { group.invoices.forEach((inv) => next.add(inv.id)); next.add(group.groupId); setExpandedPayers((prev) => new Set(prev).add(group.groupId)); }
    reconcileParents(next, op);
    updateSelection(next);
  }, [selectedIds, updateSelection, reconcileParents]);

  const toggleInvoiceSelection = useCallback((invoice: InvoiceDetail, op: Operation) => {
    const next = new Set(selectedIds);
    next.has(invoice.id) ? next.delete(invoice.id) : next.add(invoice.id);
    reconcileParents(next, op);
    updateSelection(next);
  }, [selectedIds, updateSelection, reconcileParents]);

  const handleSelectAll = useCallback(() => {
    const allSelected = allInvoiceIds.length > 0 && allInvoiceIds.every((id) => selectedIds.has(id));
    if (allSelected) { updateSelection(new Set()); }
    else {
      const next = new Set<string>();
      for (const op of processedData) getOpAllIds(op).forEach((id) => next.add(id));
      expandAll();
      updateSelection(next);
    }
  }, [allInvoiceIds, selectedIds, processedData, updateSelection, expandAll]);

  const selectAllState: CheckState = useMemo(() => {
    if (allInvoiceIds.length === 0) return false;
    const count = allInvoiceIds.filter((id) => selectedIds.has(id)).length;
    if (count === 0) return false;
    if (count === allInvoiceIds.length) return true;
    return "indeterminate";
  }, [allInvoiceIds, selectedIds]);

  const clearSelection = useCallback(() => updateSelection(new Set()), [updateSelection]);
  const resetFilters = useCallback(() => { setSearchQuery(""); setStatusFilter("all"); setSortField(null); setSortDir("asc"); }, []);

  const selectedInvoiceCount = allInvoiceIds.filter((id) => selectedIds.has(id)).length;
  const selectedOpsCount = processedData.filter((op) => getOpCheckState(op, selectedIds) === true).length;
  const COL_COUNT = 10;

  return (
    <div className="rounded-lg border bg-card shadow-md overflow-hidden">
      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 p-4 border-b">
        {(title || description) && (
          <div className="flex items-start justify-between gap-4">
            <div>
              {title && <h3 className="font-medium">{title}</h3>}
              {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground" onClick={expandAll}><ChevronsUpDown className="size-3.5 .5 mr-1" />Expand</Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground" onClick={collapseAll}>Collapse</Button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search by ID, client, payer, Tax ID..." value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="size-3.5 .5" /></button>}
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-full sm:w-[190px] border-dashed">
              <Filter className="size-3.5 .5 mr-2 text-muted-foreground" /><SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}{opt.value !== "all" && statusCounts[opt.value] !== undefined && <span className="ml-1 text-muted-foreground">({statusCounts[opt.value]})</span>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isFiltered && (
            <Button variant="ghost" size="sm" className="h-9 px-2 text-muted-foreground hover:text-foreground shrink-0" onClick={resetFilters}>Reset<XCircle className="ml-1 size-3.5 .5" /></Button>
          )}
          {isFiltered && <span className="text-xs text-muted-foreground whitespace-nowrap">{processedData.length} of {data.length} operations</span>}
        </div>
      </div>

      {/* SELECTION BAR */}
      {selectedInvoiceCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted px-4 py-2">
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{selectedOpsCount}</span> operation{selectedOpsCount !== 1 ? "s" : ""} selected
            <span className="text-xs ml-1">({selectedInvoiceCount} invoices)</span>
          </span>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => onBatchAction?.("approve", selectedIds)}><CheckCircle2 className="size-3.5 .5 text-success-on-subtle" />Approve</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => onBatchAction?.("export", selectedIds)}><Download className="size-3.5 .5" />Export</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 text-destructive hover:text-destructive" onClick={() => onBatchAction?.("cancel", selectedIds)}><Trash2 className="size-3.5 .5" />Cancel</Button>
            <div className="w-px h-5 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={clearSelection}><X className="size-3" />Clear</Button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-[1200px] w-full align-middle">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">
                  <div className="flex items-center gap-1">
                    <Checkbox checked={selectAllState} onCheckedChange={handleSelectAll} aria-label="Select all" />
                  </div>
                </TableHead>
                <TableHead className="w-[110px]">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => handleSort("id")}>ID {renderSortIcon("id")}</button>
                </TableHead>
                <TableHead className="w-[100px]">
                  <button className="flex items-end gap-1 hover:text-foreground transition-colors" onClick={() => handleSort("date")}>
                    <span className="flex flex-col leading-tight text-left"><span className="text-2xs text-muted-foreground font-normal">Date</span><span>Operation</span></span>
                    {renderSortIcon("date")}
                  </button>
                </TableHead>
                <TableHead className="w-[170px]">
                  <button className="flex items-center gap-1 hover:text-foreground transition-colors" onClick={() => handleSort("client")}>Client {renderSortIcon("client")}</button>
                </TableHead>
                <TableHead className="w-[160px]">Payers</TableHead>
                <TableHead className="w-[80px] text-center">Invoices</TableHead>
                <TableHead className="w-[120px]">
                  <button className="flex items-end gap-1 hover:text-foreground transition-colors" onClick={() => handleSort("invoiceAmount")}>
                    <span className="flex flex-col leading-tight text-left"><span className="text-2xs text-muted-foreground font-normal">Value</span><span>Invoices</span></span>
                    {renderSortIcon("invoiceAmount")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px]">
                  <button className="flex items-end gap-1 hover:text-foreground transition-colors" onClick={() => handleSort("disbursementAmount")}>
                    <span className="flex flex-col leading-tight text-left"><span className="text-2xs text-muted-foreground font-normal">Value</span><span>Disbursement</span></span>
                    {renderSortIcon("disbursementAmount")}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] text-center">Status</TableHead>
                <TableHead className="w-[130px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {processedData.length > 0 ? (
              processedData.map((op) => {
                const isExpanded = expandedOps.has(op.id);
                const checkState = getOpCheckState(op, selectedIds);
                const payers = getUniquePayers(op);
                const payerGroups = groupInvoicesByPayer(op);
                const isMatch = !!(searchQuery.trim() && (op.id.toLowerCase().includes(searchQuery.toLowerCase().trim()) || op.client.name.toLowerCase().includes(searchQuery.toLowerCase().trim())));
                const statusCfg = operationStatusConfig[op.status];

                return (
                  <TableBody key={op.id}>
                    <TableRow className={cn("bg-background hover:bg-accent transition-colors", checkState === true && "bg-primary/10 hover:bg-primary/15", isMatch && "bg-yellow-50 dark:bg-yellow-900")} data-state={checkState === true ? "selected" : undefined}>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Checkbox checked={checkState} onCheckedChange={() => toggleOpSelection(op)} aria-label={`Select ${op.id}`} />
                          <Button variant="ghost" size="sm" className="size-6 p-0 hover:bg-primary/10" onClick={() => toggleExpandOp(op.id)}>
                            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell><span className="text-sm text-muted-foreground font-mono tabular-nums">{op.id}</span></TableCell>
                      <TableCell className="text-muted-foreground">{op.operationDate}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="truncate max-w-[160px]">{op.client.name}</span>
                          <span className="text-xs text-muted-foreground">{op.client.taxId}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {payers.length === 1 ? (
                          <div className="flex flex-col">
                            <span className="truncate max-w-[150px]">{payers[0].name}</span>
                            <span className="text-xs text-muted-foreground">{payers[0].taxId}</span>
                          </div>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex"><Badge variant="outline" className="cursor-default">{payers.length} payers</Badge></span>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-[280px]">
                              <ul className="space-y-1">{payers.map((p) => <li key={p.taxId} className="text-xs">{p.name} — {p.taxId}</li>)}</ul>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell className="text-center"><Badge variant="outline" className="text-xs">{op.invoices.length}</Badge></TableCell>
                      <TableCell className="font-medium font-mono tabular-nums">{formatCurrency(op.invoiceAmount)}</TableCell>
                      <TableCell className="font-medium font-mono tabular-nums">{formatCurrency(op.disbursementAmount)}</TableCell>
                      <TableCell className="text-center"><Badge variant="outline" className="text-xs">{statusCfg.label}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="sm" className="size-7 p-0" onClick={() => onViewOperation?.(op)}><Eye className="size-4" /><span className="sr-only">View</span></Button></TooltipTrigger><TooltipContent>View operation</TooltipContent></Tooltip>
                          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="sm" className="size-7 p-0 text-destructive hover:text-destructive" onClick={() => onCancelOperation?.(op)} disabled={op.status === "canceled" || op.status === "disbursed"}><Ban className="size-4" /><span className="sr-only">Cancel</span></Button></TooltipTrigger><TooltipContent>Cancel operation</TooltipContent></Tooltip>
                          <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="sm" className="size-7 p-0" onClick={() => onDownloadExcel?.(op)}><FileSpreadsheet className="size-4" /><span className="sr-only">Excel</span></Button></TooltipTrigger><TooltipContent>Download Excel</TooltipContent></Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>

                    {isExpanded && payerGroups.map((group) => {
                      const payerCheckState = getPayerGroupCheckState(group, selectedIds);
                      const isPayerExpanded = expandedPayers.has(group.groupId);
                      const payerMatch = !!(searchQuery.trim() && (group.payer.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) || group.payer.taxId.toLowerCase().includes(searchQuery.toLowerCase().trim())));

                      return [
                        <TableRow key={`payer-${group.groupId}`} className={cn("bg-accent hover:bg-muted transition-colors", payerCheckState === true && "bg-primary/10 hover:bg-primary/15", payerMatch && "bg-yellow-50 dark:bg-yellow-900")}>
                          <TableCell>
                            <div className="flex items-center gap-1 pl-4">
                              <Checkbox checked={payerCheckState} onCheckedChange={() => togglePayerSelection(group, op)} aria-label={`Select ${group.payer.name}`} />
                              <Button variant="ghost" size="sm" className="size-6 p-0 hover:bg-primary/10" onClick={() => toggleExpandPayer(group.groupId)}>
                                {isPayerExpanded ? <ChevronDown className="size-3.5 .5" /> : <ChevronRight className="size-3.5 .5" />}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="size-3.5 .5 text-muted-foreground shrink-0" />
                              <div className="flex flex-col">
                                <span className={cn("truncate max-w-[140px]", payerMatch && "bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded")}>{group.payer.name}</span>
                                <span className="text-xs text-muted-foreground">{group.payer.taxId}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell /><TableCell /><TableCell />
                      <TableCell className="text-center"><Badge variant="outline" className="text-xs">{op.invoices.length}</Badge></TableCell>
                          <TableCell className="text-sm font-mono tabular-nums">{formatCurrency(group.totalAmount)}</TableCell>
                          <TableCell className="text-sm font-mono tabular-nums">{formatCurrency(group.totalDisbursement)}</TableCell>
                          <TableCell /><TableCell />
                        </TableRow>,

                        ...(isPayerExpanded ? group.invoices.map((invoice) => {
                          const isInvoiceSelected = selectedIds.has(invoice.id);
                          const invoiceCfg = invoiceStatusConfig[invoice.status];
                          const invoiceMatch = !!(searchQuery.trim() && (invoice.number.toLowerCase().includes(searchQuery.toLowerCase().trim()) || invoice.payer.name.toLowerCase().includes(searchQuery.toLowerCase().trim())));
                          return (
                            <TableRow key={invoice.id} className={cn("bg-muted hover:bg-muted/80 transition-colors border-l-4 border-l-primary/15", isInvoiceSelected && "bg-primary/10 hover:bg-primary/15 border-l-primary/50", invoiceMatch && "bg-yellow-50 dark:bg-yellow-900")}>
                              <TableCell>
                                <div className="flex items-center gap-1 pl-10">
                                  <Checkbox checked={isInvoiceSelected} onCheckedChange={() => toggleInvoiceSelection(invoice, op)} aria-label={`Select ${invoice.number}`} />
                                </div>
                              </TableCell>
                              <TableCell><span className="text-sm text-muted-foreground font-mono tabular-nums">{invoice.number}</span></TableCell>
                              <TableCell className="text-muted-foreground text-sm">{invoice.dueDate}</TableCell>
                              <TableCell /><TableCell /><TableCell />
                              <TableCell className="text-sm font-mono tabular-nums">{formatCurrency(invoice.amount)}</TableCell>
                              <TableCell className="text-sm font-mono tabular-nums">{formatCurrency(invoice.disbursementAmount)}</TableCell>
                              <TableCell className="text-center"><Badge variant="outline" className="text-xs">{invoiceCfg.label}</Badge></TableCell>
                              <TableCell />
                            </TableRow>
                          );
                        }) : []),
                      ];
                    })}
                  </TableBody>
                );
              })
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={COL_COUNT} className="h-24 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-muted-foreground/30" />
                      <span className="text-muted-foreground">{isFiltered ? "No operations found for the applied filters" : "No operations available"}</span>
                      {isFiltered && <Button variant="link" size="sm" onClick={resetFilters}>Clear filters</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>
      <div className="p-2 text-xs text-muted-foreground text-center lg:hidden border-t bg-muted">Swipe horizontally to see all columns</div>
    </div>
  );
}

// Backwards-compatible alias — consumed by TreeTableV2Page while routing IDs migrate
export { TreeTable as TreeTableV2 };
export type { TreeTableProps as TreeTableV2Props };
