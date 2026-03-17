import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Search, Filter, Download, SlidersHorizontal, Calendar,
  RefreshCw, XCircle, ChevronLeft, ChevronRight,
  ArrowUpDown, ArrowUp, ArrowDown, Eye, EyeOff, FileText,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export interface MasterDataGridProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onNewAction?: () => void;
  newActionLabel?: string;
  newActionIcon?: React.ReactNode;
  headerActions?: React.ReactNode;
  filterOptions?: { label: string; value: string; options: { label: string; value: string }[] }[];
  onFilterChange?: (filterName: string, value: string) => void;
  onResetFilters?: () => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSortChange?: (column: string) => void;
  columns?: Array<{ id: string; label: string; visible: boolean }>;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showExport?: boolean;
  onExport?: () => void;
  showViewOptions?: boolean;
  onViewOptions?: () => void;
  onConsultReports?: () => void;
  toolbarActions?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  startIndex?: number;
  endIndex?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
}

export function MasterDataGrid({
  title, description, children,
  searchQuery, onSearchChange, searchPlaceholder = "Search...",
  onNewAction, newActionLabel = "New", newActionIcon, headerActions,
  filterOptions = [], onFilterChange, onResetFilters,
  sortColumn, sortDirection, onSortChange,
  columns, onColumnVisibilityChange,
  showRefresh = true, onRefresh,
  showExport = true, onExport,
  showViewOptions = true, onViewOptions,
  onConsultReports, toolbarActions,
  currentPage = 1, totalPages = 1, onPageChange,
  totalItems = 0, itemsPerPage = 10,
  startIndex = 0, endIndex = 0,
  pageSizeOptions, onPageSizeChange,
}: MasterDataGridProps) {
  return (
    <Card className="elevation-2 border-none shadow-md overflow-hidden bg-card">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center">
            {onSearchChange && (
              <div className="relative w-full md:w-56 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 h-9 bg-card"
                />
              </div>
            )}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {filterOptions.map((filter, index) => (
                <Select key={index} value={filter.value} onValueChange={(val: string) => onFilterChange && onFilterChange(filter.label, val)}>
                  <SelectTrigger className="h-9 w-[180px] border-dashed bg-card">
                    <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              {filterOptions.length > 0 && onSortChange && (
                <Button variant="outline" size="sm" className="h-9 border-dashed px-3 text-muted-foreground bg-card hover:text-foreground" onClick={() => onSortChange("fecha")}>
                  {sortColumn === "fecha" && sortDirection === "asc" && <ArrowUp className="mr-2 h-3.5 w-3.5" />}
                  {sortColumn === "fecha" && sortDirection === "desc" && <ArrowDown className="mr-2 h-3.5 w-3.5" />}
                  {sortColumn !== "fecha" && <Calendar className="mr-2 h-3.5 w-3.5" />}
                  Date
                </Button>
              )}
              {onResetFilters && (
                <Button variant="ghost" size="sm" className="h-9 px-2 text-muted-foreground hover:text-foreground" onClick={onResetFilters}>
                  Reset <XCircle className="ml-2 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 md:pt-0">
            {showRefresh && (
              <Button variant="outline" size="icon" className="h-9 w-9 hidden md:flex" onClick={onRefresh} title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            {showViewOptions && columns && onColumnVisibilityChange && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /> Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Show columns</h4>
                      <p className="text-xs text-muted-foreground mb-3">Select which columns to display</p>
                    </div>
                    <Separator />
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {columns.map((column) => (
                        <div key={column.id} className="flex items-center gap-2">
                          <Checkbox id={column.id} checked={column.visible} onCheckedChange={(checked: boolean | "indeterminate") => onColumnVisibilityChange(column.id, checked as boolean)} />
                          <Label htmlFor={column.id} className="text-sm font-normal cursor-pointer flex-1">{column.label}</Label>
                          {column.visible ? <Eye className="h-3.5 w-3.5 text-muted-foreground" /> : <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            {showViewOptions && !columns && (
              <Button variant="outline" size="sm" className="h-9" onClick={onViewOptions}>
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" /> View
              </Button>
            )}
            {showExport && (
              <Button variant="outline" size="sm" className="h-9" onClick={onExport}>
                <Download className="mr-2 h-3.5 w-3.5" /> Export
              </Button>
            )}
            {onConsultReports && (
              <Button variant="outline" size="sm" className="h-9" onClick={onConsultReports}>
                <FileText className="mr-2 h-3.5 w-3.5" /> View Reports
              </Button>
            )}
            {toolbarActions}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {children}
        {totalItems > 0 && onPageChange && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} records
              </div>
              {pageSizeOptions && onPageSizeChange && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page:</span>
                  <Select value={`${itemsPerPage}`} onValueChange={(val: string) => onPageSizeChange(Number(val))}>
                    <SelectTrigger className="h-8 w-[70px]"><SelectValue placeholder={itemsPerPage} /></SelectTrigger>
                    <SelectContent>
                      {pageSizeOptions.map((size) => <SelectItem key={size} value={`${size}`}>{size}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <div className="flex items-center gap-1">
                {(() => {
                  const pages: (number | string)[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    if (currentPage <= 4) {
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      pages.push("..."); pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1); pages.push("...");
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1); pages.push("...");
                      pages.push(currentPage - 1); pages.push(currentPage); pages.push(currentPage + 1);
                      pages.push("..."); pages.push(totalPages);
                    }
                  }
                  return pages.map((page, idx) =>
                    page === "..." ? (
                      <div key={`ellipsis-${idx}`} className="w-8 text-center text-xs text-muted-foreground">...</div>
                    ) : (
                      <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => onPageChange(page as number)} className="w-8 h-8 p-0">{page}</Button>
                    )
                  );
                })()}
              </div>
              <Button variant="outline" size="sm" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}