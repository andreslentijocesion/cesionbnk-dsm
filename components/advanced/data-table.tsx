import * as React from "react";
import {
  ColumnDef, ColumnFiltersState, Row, RowSelectionState,
  SortingState, VisibilityState,
  flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, SlidersHorizontal, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { MasterDataGrid } from "./master-data-grid";

// ── Selection column helper ──────────────────────────────────────────────────

export function createSelectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
}

// ── Sortable header helper ───────────────────────────────────────────────────

export function SortableHeader({ column, children }: { column: any; children: React.ReactNode }) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1.5 text-left font-medium text-foreground hover:text-foreground/80 transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {children}
      {sorted === "asc"  ? <ArrowUp className="h-3.5 w-3.5 text-primary" /> :
       sorted === "desc" ? <ArrowDown className="h-3.5 w-3.5 text-primary" /> :
                           <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />}
    </button>
  );
}

// ── Bulk actions bar ─────────────────────────────────────────────────────────

interface BulkAction<TData> {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline";
  onClick: (rows: Row<TData>[]) => void;
}

interface BulkActionsBarProps<TData> {
  selectedCount: number;
  selectedRows: Row<TData>[];
  actions: BulkAction<TData>[];
  onClear: () => void;
}

function BulkActionsBar<TData>({ selectedCount, selectedRows, actions, onClear }: BulkActionsBarProps<TData>) {
  if (selectedCount === 0) return null;
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm animate-in fade-in slide-in-from-top-1 duration-200">
      <span className="font-medium">{selectedCount} selected</span>
      <div className="flex items-center gap-1.5 ml-2">
        {actions.map((action, i) => (
          <Button
            key={i}
            size="sm"
            variant={action.variant === "destructive" ? "destructive" : "secondary"}
            className="h-7 text-xs"
            onClick={() => action.onClick(selectedRows)}
          >
            {action.icon && <span className="mr-1">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 ml-auto text-primary-foreground hover:bg-primary/80" onClick={onClear}>
        <X className="h-3.5 w-3.5" />
        <span className="sr-only">Clear selection</span>
      </Button>
    </div>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────────

function DataTableSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            <TableHead key={i}><Skeleton className="h-4 w-24" /></TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: columns }).map((_, j) => (
              <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── DataTable ────────────────────────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  title?: string;
  description?: string;
  /** Show checkbox column for row selection */
  selectable?: boolean;
  /** Called when row selection changes */
  onRowSelectionChange?: (rows: Row<TData>[]) => void;
  /** Bulk action buttons shown when rows are selected */
  bulkActions?: BulkAction<TData>[];
  /** Show loading skeleton */
  isLoading?: boolean;
  /** Number of skeleton rows while loading */
  loadingRows?: number;
  /** Empty state message */
  emptyMessage?: string;
}

export function DataTable<TData, TValue>({
  columns: userColumns,
  data,
  searchKey,
  searchPlaceholder = "Filter...",
  title,
  description,
  selectable = false,
  onRowSelectionChange,
  bulkActions = [],
  isLoading = false,
  loadingRows = 5,
  emptyMessage = "No results.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const columns = React.useMemo(
    () => selectable ? [createSelectionColumn<TData>(), ...userColumns] : userColumns,
    [selectable, userColumns],
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        onRowSelectionChange?.(table.getSelectedRowModel().rows);
        return next;
      });
    },
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  return (
    <MasterDataGrid
      title={title}
      description={description}
      searchQuery={(table.getColumn(searchKey ?? "")?.getFilterValue() as string) ?? ""}
      onSearchChange={(value) => searchKey && table.getColumn(searchKey)?.setFilterValue(value)}
      searchPlaceholder={searchPlaceholder}
      showViewOptions={false}
      showRefresh={false}
      showExport={false}
      toolbarActions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="ml-2 hidden sm:inline">View</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      }
      currentPage={table.getState().pagination.pageIndex + 1}
      totalPages={table.getPageCount()}
      onPageChange={(page) => table.setPageIndex(page - 1)}
      totalItems={table.getFilteredRowModel().rows.length}
      itemsPerPage={table.getState().pagination.pageSize}
      startIndex={table.getState().pagination.pageIndex * table.getState().pagination.pageSize}
      pageSizeOptions={[5, 10, 20, 30, 40, 50]}
      onPageSizeChange={(size) => table.setPageSize(size)}
    >
      <div className="w-full space-y-2">
        {selectable && bulkActions.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedCount}
            selectedRows={selectedRows}
            actions={bulkActions}
            onClear={() => table.resetRowSelection()}
          />
        )}

        {isLoading ? (
          <DataTableSkeleton columns={columns.length} rows={loadingRows} />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} style={header.column.columnDef.size ? { width: header.column.columnDef.size } : undefined}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </MasterDataGrid>
  );
}

// ── Re-export helpers ────────────────────────────────────────────────────────
export type { BulkAction };
export { Trash2 };
