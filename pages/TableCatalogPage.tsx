/* eslint-disable */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CodeBlock } from "../components/ui/code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Filter,
  ChevronRight,
  Edit,
  TreePine,
  ListFilter,
  Zap,
  Infinity,
  LayoutGrid,
  TableProperties,
  Eye,
  FileText,
  Info,
} from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ComponentShowcase } from "../components/ui/component-showcase";

// ============================================================
// TABLE CATALOG — Complete catalog of DSM table variations
// ============================================================

interface TableVariation {
  id: string;
  name: string;
  layer: "ui" | "advanced" | "patterns" | "patterns/business";
  path: string;
  pageId: string | null;
  usesMasterDataGrid: boolean | null;
  description: string;
  bestFor: string[];
  features: string[];
  icon: React.ElementType;
  layerColor: string;
  imports: string;
  usageCode: string;
}

const tableVariations: TableVariation[] = [
  {
    id: "table-primitive",
    name: "Table",
    layer: "ui",
    path: "/components/ui/table.tsx",
    pageId: "table",
    usesMasterDataGrid: null,
    description:
      "Base Shadcn UI primitive. Wraps <table> with consistent styles. No state logic, filtering, or pagination. Foundation for all other table components.",
    bestFor: [
      "Simple static tables",
      "Read-only data without interaction",
      "Base for composing custom tables",
    ],
    features: [
      "Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableFooter",
      "Consistent DSM styles",
      "Responsive with overflow-x-auto",
    ],
    icon: TableProperties,
    layerColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    imports: `import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";`,
    usageCode: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Factura</TableHead>
      <TableHead>Monto</TableHead>
      <TableHead>Estado</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>$2,500,000</TableCell>
      <TableCell><Badge variant="success-soft-outline">Aprobada</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  {
    id: "master-data-grid",
    name: "MasterDataGrid",
    layer: "advanced",
    path: "/components/advanced/MasterDataGrid.tsx",
    pageId: null,
    usesMasterDataGrid: true,
    description:
      "Reusable master container. Provides header with title, search bar, filters with Select, sorting, column visibility toggle (Popover), action buttons (refresh, export, reports), and full pagination with page-size selector. Receives the table as children.",
    bestFor: [
      "Tables with many columns (visibility toggle)",
      "Need for standard toolbar with search + filters + actions",
      "Base container for DataTable, TreeTable, EditableTable, etc.",
    ],
    features: [
      "Search input with icon",
      "Dynamic filters (Select with border-dashed)",
      "Column sorting (date)",
      "Column visibility Popover",
      "Buttons: Refresh, Export, Query Reports",
      "Pagination with page numbers + ellipsis + page-size selector",
      "Header with title, description, and custom actions",
      "Extensible toolbar via toolbarActions slot",
    ],
    icon: LayoutGrid,
    layerColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    imports: `import { MasterDataGrid } from "@/components/advanced/MasterDataGrid";`,
    usageCode: `<MasterDataGrid
  title="Facturas"
  description="Listado de facturas pendientes"
  searchQuery={search}
  onSearchChange={setSearch}
  searchPlaceholder="Buscar factura..."
  filterOptions={[
    { label: "Estado", value: statusFilter, options: [...] }
  ]}
  onFilterChange={handleFilterChange}
  columns={columnDefs}
  onColumnVisibilityChange={handleColumnToggle}
  showExport
  onExport={handleExport}
  currentPage={page}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={setPage}
  pageSizeOptions={[10, 25, 50]}
  onPageSizeChange={setPageSize}
>
  <Table>
    {/* Your table here */}
  </Table>
</MasterDataGrid>`,
  },
  {
    id: "data-table",
    name: "DataTable",
    layer: "advanced",
    path: "/components/advanced/DataTable.tsx",
    pageId: "data-table",
    usesMasterDataGrid: true,
    description:
      "Full integration with TanStack React Table. Declaratively define columns with ColumnDef[], automatic sorting, filtering, column visibility, row selection, and pagination. Composes on top of MasterDataGrid for the container UI.",
    bestFor: [
      "Tables with complex structured data",
      "Need for declarative multi-column sorting",
      "Row selection (checkbox)",
      "Configuration-defined columns (ColumnDef[])",
    ],
    features: [
      "TanStack React Table (sorting, filtering, pagination, row selection)",
      "Declarative ColumnDef[]",
      "Interactive column sorting",
      "Key column filtering (searchKey)",
      "Column visibility (DropdownMenu)",
      "Row selection with checkbox",
      "Automatic pagination",
    ],
    icon: ListFilter,
    layerColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    imports: `import { DataTable } from "@/components/advanced/DataTable";
import { ColumnDef } from "@tanstack/react-table";`,
    usageCode: `const columns: ColumnDef<Invoice>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "client", header: "Cliente" },
  { accessorKey: "amount", header: "Monto",
    cell: ({ row }) => formatCurrency(row.getValue("amount"))
  },
];

<DataTable
  columns={columns}
  data={invoices}
  searchKey="client"
  searchPlaceholder="Buscar cliente..."
  title="Facturas"
  description="50 registros"
/>`,
  },
  {
    id: "tree-table-v2",
    name: "TreeTable V2",
    layer: "advanced",
    path: "/components/advanced/TreeTableV2.tsx",
    pageId: "tree-table-v2",
    usesMasterDataGrid: true,
    description:
      "Advanced TreeTable variant with Soft-Outline DSM badges, cascading multi-selection (parent auto-selects children), indeterminate checkbox, bottom-up propagation (complete children auto-check parent), select-all in header, and selection summary bar.",
    bestFor: [
      "Batch operations on complete hierarchies",
      "Invoice selection by client/project in bulk",
      "Tables with Soft-Outline semantic badges",
    ],
    features: [
      "Soft-Outline Badges: warning, success, info, destructive",
      "Cascade selection: parent → all descendants",
      "Indeterminate checkbox on partial selection",
      "Bottom-up propagation: complete children → parent auto-check",
      "Select All in header with 3 states",
      "Summary bar with counter + clear",
      "Callback onSelectionChange(Set<string>)",
      "Lazy load + per-node pagination",
    ],
    icon: TreePine,
    layerColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    imports: `import { TreeTableV2, TreeNodeV2 } from "@/components/advanced/TreeTableV2";`,
    usageCode: `const data: TreeNodeV2[] = [
  {
    id: "client-1",
    name: "Corporacion Global S.A.",
    type: "client",
    children: [
      {
        id: "project-1",
        name: "Proyecto Expansion",
        type: "project",
        children: [
          { id: "inv-1", name: "F-001", type: "invoice",
            amount: 150000, status: "paid", date: "15/01/2026" }
        ]
      }
    ]
  }
];

<TreeTableV2
  data={data}
  showCheckboxes
  onSelectionChange={(ids) => console.log(ids)}
  title="Portafolio V2"
/>`,
  },
  {
    id: "data-table-advanced",
    name: "DataTableAdvanced",
    layer: "patterns",
    path: "/components/patterns/DataTableAdvanced.tsx",
    pageId: "data-table-advanced",
    usesMasterDataGrid: true,
    description:
      "Self-contained invoice table pattern with search, status filters, sorting, and contextual row actions (DropdownMenu). Includes mock data. Ideal as an implementation reference.",
    bestFor: [
      "Reference/demo of how to compose MasterDataGrid + Table",
      "CRUD table with row actions",
      "Rapid prototyping with mock data",
    ],
    features: [
      "Search by client/ID",
      "Status filter (Select)",
      "Row actions: View, Edit, Duplicate, Delete",
      "CLP currency format",
      "Semantic status badges",
      "Included mock data",
    ],
    icon: FileText,
    layerColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    imports: `import { DataTableAdvanced } from "@/components/patterns/data-table-advanced";`,
    usageCode: `// Self-contained, no props required
<DataTableAdvanced />`,
  },
  {
    id: "editable-table",
    name: "EditableTable",
    layer: "patterns",
    path: "/components/patterns/EditableTable.tsx",
    pageId: "editable-table",
    usesMasterDataGrid: true,
    description:
      "Table with direct inline cell editing. Text inputs, numbers, dates (DatePicker), status selects, and priority checkboxes. Ideal for flows where the user edits multiple records without opening modals.",
    bestFor: [
      "Bulk record editing",
      "Spreadsheet-style forms",
      "Flows where opening a modal per record is inefficient",
    ],
    features: [
      "Inline input for text and numbers",
      "Inline DatePicker for dates",
      "Inline Select for statuses",
      "Priority checkbox",
      "Visual validation (red borders on error)",
      "Automatic summary (totals, averages)",
    ],
    icon: Edit,
    layerColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    imports: `import { EditableTable } from "@/components/patterns/editable-table";`,
    usageCode: `// Self-contained with mock data
<EditableTable />`,
  },
  {
    id: "virtualized-list",
    name: "VirtualizedList",
    layer: "advanced",
    path: "/components/advanced/VirtualizedList.tsx",
    pageId: "virtualized-list",
    usesMasterDataGrid: null,
    description:
      "Virtualized list that only renders items visible in the viewport. Uses scroll position + fixed item height to calculate which elements to display. Ideal for 1,000+ element lists without performance impact.",
    bestFor: [
      "Lists with 1,000+ elements",
      "Critical performance (mobile, limited devices)",
      "Selection lists with many options",
    ],
    features: [
      "Render only visible items + buffer",
      "Fixed item height (configurable)",
      "Native scroll",
      "Generic: renderItem callback",
      "No external dependencies",
    ],
    icon: Zap,
    layerColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    imports: `import { VirtualizedList } from "@/components/advanced/VirtualizedList";`,
    usageCode: `<VirtualizedList
  items={bigDataset}
  height={400}
  itemHeight={48}
  renderItem={(item, index, style) => (
    <div style={style} key={item.id}>
      {item.name}
    </div>
  )}
/>`,
  },
  {
    id: "infinite-scroll",
    name: "InfiniteScroll",
    layer: "advanced",
    path: "/components/advanced/InfiniteScroll.tsx",
    pageId: "infinite-scroll",
    usesMasterDataGrid: null,
    description:
      "Wrapper that detects when the user reaches the end of scroll and triggers loading more data. Uses IntersectionObserver. Composable with any table or list.",
    bestFor: [
      "Paginated APIs (cursor-based / offset)",
      "Activity feeds",
      "Lists that grow on demand",
    ],
    features: [
      "IntersectionObserver native",
      "Loading spinner integrated (Loader2)",
      "Threshold configurable",
      "Composable with Table, VirtualizedList, etc.",
    ],
    icon: Infinity,
    layerColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    imports: `import { InfiniteScroll } from "@/components/advanced/InfiniteScroll";`,
    usageCode: `<InfiniteScroll
  loadMore={fetchNextPage}
  hasMore={hasNextPage}
  isLoading={isFetching}
>
  <Table>
    {/* rows grow incrementally */}
  </Table>
</InfiniteScroll>`,
  },
  {
    id: "advanced-filter-panel",
    name: "AdvancedFilterPanel",
    layer: "patterns",
    path: "/components/patterns/AdvancedFilterPanel.tsx",
    pageId: "advanced-filter",
    usesMasterDataGrid: null,
    description:
      "Side panel (Sheet) for complex filters: date ranges (DatePicker), multiple checkboxes, selects, and active filter badges. Composes ALONGSIDE a table, does not contain it. Ideal complement for MasterDataGrid when inline filters are not enough.",
    bestFor: [
      "Complex filters that don't fit in the toolbar",
      "Date ranges + multiple criteria",
      "Complement for MasterDataGrid or DataTable",
    ],
    features: [
      "Side Sheet (slide-in)",
      "DatePicker for date ranges",
      "Checkbox groups (statuses, types)",
      "Sort select",
      "Active filter badges",
      "Clear filters button",
    ],
    icon: Filter,
    layerColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    imports: `import { AdvancedFilterPanel } from "@/components/patterns/advanced-filter-panel";`,
    usageCode: `{/* Alongside your table */}
<div className="flex gap-4">
  <AdvancedFilterPanel />
  <MasterDataGrid ...>
    <Table>...</Table>
  </MasterDataGrid>
</div>`,
  },
];

// ─── Composability Map ───
const composabilityData = [
  { from: "Table", to: "MasterDataGrid", relation: "children", desc: "Table is passed as children to MasterDataGrid" },
  { from: "MasterDataGrid", to: "DataTable", relation: "composes", desc: "DataTable uses MasterDataGrid as container" },
  { from: "MasterDataGrid", to: "TreeTable V2", relation: "composes", desc: "TreeTable V2 uses MasterDataGrid as container" },
  { from: "MasterDataGrid", to: "EditableTable", relation: "composes", desc: "EditableTable uses MasterDataGrid as container" },
  { from: "MasterDataGrid", to: "DataTableAdvanced", relation: "composes", desc: "DataTableAdvanced uses MasterDataGrid as container" },
  { from: "AdvancedFilterPanel", to: "MasterDataGrid", relation: "complements", desc: "Side panel for filters that don't fit in toolbar" },
  { from: "InfiniteScroll", to: "Table", relation: "wraps", desc: "Infinite scroll wrapper for any table" },
  { from: "VirtualizedList", to: "—", relation: "standalone", desc: "Independent list, does not compose with Table directly" },
];

function LayerBadge({ layer }: { layer: string }) {
  const colors: Record<string, string> = {
    "ui": "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600",
    "advanced": "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600",
    "patterns": "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-600",
    "patterns/business": "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-600",
  };
  return (
    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${colors[layer] || ""}`}>
      {layer}
    </Badge>
  );
}

function VariationCard({ variation, onNavigate }: { variation: TableVariation; onNavigate: (pageId: string) => void }) {
  const Icon = variation.icon;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${variation.layerColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{variation.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <LayerBadge layer={variation.layer} />
                {variation.usesMasterDataGrid === true && (
                  <Badge variant="success-soft-outline">
                    usa MasterDataGrid
                  </Badge>
                )}
                {variation.usesMasterDataGrid === false && (
                  <Badge variant="warning-soft-outline">
                    custom pattern
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {variation.pageId && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={() => onNavigate(variation.pageId!)}
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Ver
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{variation.description}</p>
        
        <div>
          <p className="text-xs font-medium text-foreground/80 mb-1.5">Best for:</p>
          <ul className="space-y-1">
            {variation.bestFor.map((item, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-foreground/80 mb-1.5">Features:</p>
          <div className="flex flex-wrap gap-1">
            {variation.features.slice(0, 5).map((feat, i) => (
              <Badge key={i} variant="neutral-soft-outline">
                {feat}
              </Badge>
            ))}
            {variation.features.length > 5 && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                +{variation.features.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        <Separator />
        
        <div className="text-xs text-muted-foreground font-mono bg-muted rounded-md px-3 py-2">
          {variation.path}
        </div>
      </CardContent>
    </Card>
  );
}

function TableCatalogContent() {
  const [activeTab, setActiveTab] = useState("catalog");
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const handleNavigate = (pageId: string) => {
    window.dispatchEvent(new CustomEvent("dsm-navigate", { detail: pageId }));
  };

  const selectedVar = tableVariations.find((v) => v.id === selectedVariation);

  // Stats
  const totalVariations = tableVariations.length;
  const useMDG = tableVariations.filter((v) => v.usesMasterDataGrid === true).length;
  const layerCounts = {
    ui: tableVariations.filter((v) => v.layer === "ui").length,
    advanced: tableVariations.filter((v) => v.layer === "advanced").length,
    patterns: tableVariations.filter((v) => v.layer === "patterns" || v.layer === "patterns/business").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-4xl font-semibold">Table Catalog</h2>
          <Badge variant="outline" className="text-xs">
            DSM Reference
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Complete catalog of all {totalVariations} table variations available in the DSM.
          Includes primitives, advanced components, and business patterns.
        </p>
      </div>

      <Separator />

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-muted">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold">{totalVariations}</p>
            <p className="text-xs text-muted-foreground mt-1">Total variations</p>
          </CardContent>
        </Card>
        <Card className="bg-muted">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold">{useMDG}</p>
            <p className="text-xs text-muted-foreground mt-1">Use MasterDataGrid</p>
          </CardContent>
        </Card>
        <Card className="bg-muted">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold">{layerCounts.ui}</p>
            <p className="text-xs text-muted-foreground mt-1">UI Layer</p>
          </CardContent>
        </Card>
        <Card className="bg-muted">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold">{layerCounts.advanced}</p>
            <p className="text-xs text-muted-foreground mt-1">Advanced Layer</p>
          </CardContent>
        </Card>
        <Card className="bg-muted">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-semibold">{layerCounts.patterns}</p>
            <p className="text-xs text-muted-foreground mt-1">Patterns Layer</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="catalog">Visual Catalog</TabsTrigger>
          <TabsTrigger value="comparison">Comparison Table</TabsTrigger>
          <TabsTrigger value="composability">Composability</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        </TabsList>

        {/* ─── TAB 1: VISUAL CATALOG ─── */}
        <TabsContent value="catalog" className="space-y-6">
          {/* By Layer */}
          {[
            { layer: "ui", title: "UI Primitives", desc: "Base Shadcn UI components" },
            { layer: "advanced", title: "Advanced", desc: "Components with complex logic" },
            { layer: "patterns", title: "Patterns", desc: "Composed business patterns", includeBusiness: true },
          ].map((group) => {
            const items = tableVariations.filter((v) =>
              group.includeBusiness
                ? v.layer === group.layer || v.layer === `${group.layer}/business`
                : v.layer === group.layer
            );
            if (items.length === 0) return null;
            return (
              <div key={group.layer} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <Badge variant="outline" className="text-xs">{items.length}</Badge>
                  <span className="text-sm text-muted-foreground">— {group.desc}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {items.map((v) => (
                    <VariationCard key={v.id} variation={v} onNavigate={handleNavigate} />
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

        {/* ─── TAB 2: COMPARISON TABLE ─── */}
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
              <CardDescription>
                Quick reference for choosing the right variation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px] font-medium">Component</TableHead>
                      <TableHead className="font-medium">Layer</TableHead>
                      <TableHead className="text-center font-medium">Search</TableHead>
                      <TableHead className="text-center font-medium">Filters</TableHead>
                      <TableHead className="text-center font-medium">Sort</TableHead>
                      <TableHead className="text-center font-medium">Col Visibility</TableHead>
                      <TableHead className="text-center font-medium">Pagination</TableHead>
                      <TableHead className="text-center font-medium">Row Select</TableHead>
                      <TableHead className="text-center font-medium">Inline Edit</TableHead>
                      <TableHead className="text-center font-medium">Hierarchy</TableHead>
                      <TableHead className="text-center font-medium">Virtual</TableHead>
                      <TableHead className="text-center font-medium">MasterDataGrid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Table", layer: "ui", search: false, filters: false, sort: false, colVis: false, pagination: false, rowSelect: false, edit: false, hierarchy: false, virtual: false, mdg: "—" },
                      { name: "MasterDataGrid", layer: "advanced", search: true, filters: true, sort: true, colVis: true, pagination: true, rowSelect: false, edit: false, hierarchy: false, virtual: false, mdg: "is it" },
                      { name: "DataTable", layer: "advanced", search: true, filters: true, sort: true, colVis: true, pagination: true, rowSelect: true, edit: false, hierarchy: false, virtual: false, mdg: "yes" },
                      { name: "TreeTable V2", layer: "advanced", search: true, filters: true, sort: false, colVis: false, pagination: true, rowSelect: true, edit: false, hierarchy: true, virtual: false, mdg: "yes" },
                      { name: "DataTableAdvanced", layer: "patterns", search: true, filters: true, sort: true, colVis: false, pagination: true, rowSelect: false, edit: false, hierarchy: false, virtual: false, mdg: "yes" },
                      { name: "EditableTable", layer: "patterns", search: true, filters: true, sort: false, colVis: false, pagination: true, rowSelect: false, edit: true, hierarchy: false, virtual: false, mdg: "yes" },
                      { name: "VirtualizedList", layer: "advanced", search: false, filters: false, sort: false, colVis: false, pagination: false, rowSelect: false, edit: false, hierarchy: false, virtual: true, mdg: "—" },
                      { name: "InfiniteScroll", layer: "advanced", search: false, filters: false, sort: false, colVis: false, pagination: false, rowSelect: false, edit: false, hierarchy: false, virtual: false, mdg: "—" },
                      { name: "AdvancedFilterPanel", layer: "patterns", search: false, filters: true, sort: true, colVis: false, pagination: false, rowSelect: false, edit: false, hierarchy: false, virtual: false, mdg: "—" },
                    ].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className="font-medium text-sm">{row.name}</TableCell>
                        <TableCell><LayerBadge layer={row.layer} /></TableCell>
                        {[row.search, row.filters, row.sort, row.colVis, row.pagination, row.rowSelect, row.edit, row.hierarchy, row.virtual].map((val, i) => (
                          <TableCell key={i} className="text-center">
                            {val ? (
                              <span className="text-green-600 dark:text-green-400">&#10003;</span>
                            ) : (
                              <span className="text-muted-foreground/30">—</span>
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="text-center text-xs text-muted-foreground">{row.mdg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB 3: COMPOSABILITY ─── */}
        <TabsContent value="composability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Composability Tree</CardTitle>
              <CardDescription>
                How table components compose with each other
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visual Tree */}
              <div className="bg-muted rounded-lg p-6 space-y-2 font-mono text-sm">
                <div className="text-muted-foreground">{"// Dependency tree"}</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral-soft-outline">ui</Badge>
                    <span className="font-semibold">Table</span>
                    <span className="text-muted-foreground text-xs">← base primitive</span>
                  </div>
                  <div className="ml-4 border-l-2 border-muted-foreground/20 pl-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="info-soft-outline">advanced</Badge>
                      <span className="font-semibold">MasterDataGrid</span>
                      <span className="text-muted-foreground text-xs">← master container (receives Table as children)</span>
                    </div>
                    <div className="ml-4 border-l-2 border-muted-foreground/20 pl-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="info-soft-outline">advanced</Badge>
                        <span>DataTable</span>
                        <span className="text-muted-foreground text-xs">+ TanStack React Table</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="info-soft-outline">advanced</Badge>
                        <span>TreeTable V2</span>
                        <span className="text-muted-foreground text-xs">+ hierarchical expand/collapse</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="purple-soft-outline">patterns</Badge>
                        <span>DataTableAdvanced</span>
                        <span className="text-muted-foreground text-xs">+ row actions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="purple-soft-outline">patterns</Badge>
                        <span>EditableTable</span>
                        <span className="text-muted-foreground text-xs">+ inline editing</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-dashed border-muted-foreground/20 space-y-1">
                    <div className="text-muted-foreground text-xs mb-1">{"// Complementary components (composables)"}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="info-soft-outline">advanced</Badge>
                      <span>VirtualizedList</span>
                      <span className="text-muted-foreground text-xs">← standalone, virtualized render</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="info-soft-outline">advanced</Badge>
                      <span>InfiniteScroll</span>
                      <span className="text-muted-foreground text-xs">← wrapper, composes with any table</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] bg-purple-100 dark:bg-purple-900">patterns</Badge>
                      <span>AdvancedFilterPanel</span>
                      <span className="text-muted-foreground text-xs">← side Sheet, MasterDataGrid complement</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Relationship Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">From</TableHead>
                    <TableHead className="font-medium">Relation</TableHead>
                    <TableHead className="font-medium">To</TableHead>
                    <TableHead className="font-medium">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {composabilityData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-sm">{row.from}</TableCell>
                      <TableCell>
                        <Badge variant="neutral-soft-outline">{row.relation}</Badge>
                      </TableCell>
                      <TableCell className="font-medium text-sm">{row.to}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB 4: USAGE GUIDE ─── */}
        <TabsContent value="usage" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This guide helps you choose the right table variation for your use case.
              Click on a component name to see its usage code.
            </AlertDescription>
          </Alert>

          {/* Decision Tree */}
          <Card>
            <CardHeader>
              <CardTitle>Decision Tree</CardTitle>
              <CardDescription>Which table do I need?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    question: "Need static data without interaction?",
                    answer: "Table",
                    desc: "Use the Table primitive from ui/. No logic, just styles.",
                  },
                  {
                    question: "Need search + filters + pagination + column visibility?",
                    answer: "MasterDataGrid",
                    desc: "Master container. Pass your Table as children.",
                  },
                  {
                    question: "Need declarative sorting with ColumnDef[] and TanStack?",
                    answer: "DataTable",
                    desc: "Define columns as config, the component does the rest.",
                  },
                  {
                    question: "Is your data hierarchical (parent → child)?",
                    answer: "TreeTable V2",
                    desc: "Expand/collapse with nodes. Ideal for portfolios.",
                  },
                  {
                    question: "Need inline cell editing?",
                    answer: "EditableTable",
                    desc: "Inputs, selects, datepickers directly in the table.",
                  },
                  {
                    question: "Have 1,000+ items and need performance?",
                    answer: "VirtualizedList",
                    desc: "Only renders visible items in the viewport.",
                  },
                  {
                    question: "Data loads incrementally (paginated API)?",
                    answer: "InfiniteScroll",
                    desc: "Wrapper with IntersectionObserver. Composes with any table.",
                  },
                  {
                    question: "Inline filters not enough?",
                    answer: "AdvancedFilterPanel",
                    desc: "Side panel with date ranges, checkboxes, and more. Complement.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted transition-colors">
                    <div className="h-7 w-7 rounded-full bg-muted text-primary flex items-center justify-center shrink-0 text-sm font-medium">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <div className="shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setSelectedVariation(
                          tableVariations.find((v) => v.name === item.answer)?.id || null
                        )}
                      >
                        <ArrowRight className="h-3 w-3 mr-1" />
                        {item.answer}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Code Preview for Selected Variation */}
          {selectedVar && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedVar.name}</CardTitle>
                    <CardDescription>{selectedVar.path}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVariation(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-foreground/80 mb-2">Import:</p>
                  <CodeBlock code={selectedVar.imports} language="typescript" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/80 mb-2">Usage:</p>
                  <CodeBlock code={selectedVar.usageCode} language="tsx" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function TableCatalogPage() {
  return (
    <ComponentShowcase
      title="Table Catalog"
      description="Complete catalog of all 11 table variations available in the DSM. Covers 3 layers: UI primitives (Table), Advanced components (MasterDataGrid, DataTable, TreeTable V2, VirtualizedList, InfiniteScroll), and Business Patterns (DataTableAdvanced, EditableTable, AdvancedFilterPanel). Includes visual catalog, feature comparison matrix, composability tree, and interactive decision guide."
      category="Advanced"
      preview={<TableCatalogContent />}
      code={`// UI Layer
import { Table } from "@/components/ui/table";

// Advanced Layer
import { MasterDataGrid } from "@/components/advanced/master-data-grid";
import { DataTable } from "@/components/advanced/data-table";
import { TreeTableV2 } from "@/components/advanced/tree-table-v2";
import { VirtualizedList } from "@/components/advanced/virtualized-list";
import { InfiniteScroll } from "@/components/advanced/infinite-scroll";

// Patterns Layer
import { DataTableAdvanced } from "@/components/patterns/data-table-advanced";
import { EditableTable } from "@/components/patterns/editable-table";
import { AdvancedFilterPanel } from "@/components/patterns/advanced-filter-panel";

// Composability: Table → MasterDataGrid → DataTable/TreeTableV2/EditableTable`}
      props={[
        { name: "(catalog)", type: "—", description: "Self-contained reference page. No external props — displays all 11 table variations with comparison data." },
      ]}
    />
  );
}