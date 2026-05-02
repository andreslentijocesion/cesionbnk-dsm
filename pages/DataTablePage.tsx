import { ColumnDef, type Table, type Row, type Column } from "@tanstack/react-table";
import { copyToClipboard } from "../lib/utils";
import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdownmenu";
import { DataTable } from "../components/advanced/data-table";
import { MoreHorizontal, ArrowUpDown, CheckCircle, Clock, AlertCircle, XCircle, Circle } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";

// Sample Data Type
type Invoice = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  client: string;
  date: string;
  riskScore: number;
};

// Sample Data
const data: Invoice[] = Array.from({ length: 50 }, (_, i) => ({
  id: `INV-${1000 + i}`,
  amount: Math.floor(Math.random() * 1000000) + 50000,
  status: ["pending", "processing", "success", "failed"][
    Math.floor(Math.random() * 4)
  ] as Invoice["status"],
  email: `client${i}@example.com`,
  client: `Client Company ${i + 1} S.A.`,
  date: new Date(2024, 0, 1 + i).toISOString().split("T")[0],
  riskScore: Math.floor(Math.random() * 1000),
}));

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }: { table: Table<Invoice> }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Invoice> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Invoice> }) => {
      const status = row.getValue("status") as string;
      const config = {
        success: { variant: "success-soft-outline" as const, icon: CheckCircle, label: "Paid" },
        pending: { variant: "warning-soft-outline" as const, icon: Clock, label: "Pending" },
        processing: { variant: "info-soft-outline" as const, icon: AlertCircle, label: "Processing" },
        failed: { variant: "destructive-soft-outline" as const, icon: XCircle, label: "Failed" },
      }[status] || { variant: "neutral-soft-outline" as const, icon: Circle, label: status };

      const Icon = config.icon;

      return (
        <Badge variant={config.variant} className="flex w-fit items-center gap-1">
          <Icon className="size-3" />
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "client",
    header: ({ column }: { column: Column<Invoice> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Client
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Invoice> }) => <div className="font-medium ml-4">{row.getValue("client")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: Row<Invoice> }) => <div className="lowercase text-muted-foreground">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }: { row: Row<Invoice> }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      }).format(amount);

      return <div className="text-right font-medium font-mono tabular-nums">{formatted}</div>;
    },
  },
  {
    accessorKey: "riskScore",
    header: "Risk Score",
    cell: ({ row }: { row: Row<Invoice> }) => {
      const score = row.getValue("riskScore") as number;
      const colorClass = score < 500 ? "text-destructive" : score < 700 ? "text-yellow-500" : "text-success-on-subtle";

      return (
        <div className="flex items-center gap-2">
          <div className="w-24">
            <Progress
              value={score / 10}
              className="h-2"
              indicatorClassName={
                score < 500 ? "bg-red-500" :
                score < 700 ? "bg-yellow-500" :
                "bg-green-500"
              }
            />
          </div>
          <span className={`text-xs font-medium font-mono tabular-nums ${colorClass}`}>{score}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Invoice> }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                try {
                  copyToClipboard(payment.id)
                    .then(() => toast.success("Invoice ID copied to clipboard"))
                    .catch(() => toast.error("Failed to copy Invoice ID"));
                } catch {
                  toast.error("Clipboard access not available");
                }
              }}
            >
              Copy Invoice ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTablePage() {
  return (
    <ComponentShowcase
      title="Advanced Data Table"
      description="Powerful table component with sorting, filtering, pagination, row selection, column visibility, and custom cell renderers. Built on TanStack Table. Fully responsive with horizontal scroll on mobile."
      category="Advanced"
      preview={
        <DataTable
          columns={columns}
          data={data}
          searchKey="client"
          searchPlaceholder="Filter by client..."
          title="Invoices"
          description="A list of all your invoices."
        />
      }
      code={`import { DataTable } from "@/components/advanced/datatable";
import { ColumnDef } from "@tanstack/react-table";

type Invoice = {
  id: string;
  client: string;
  amount: number;
  status: "pending" | "success" | "failed";
};

const columns: ColumnDef<Invoice>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "client", header: "Client" },
  { accessorKey: "amount", header: "Amount" },
  { accessorKey: "status", header: "Status" },
];

<DataTable
  columns={columns}
  data={data}
  searchKey="client"
  searchPlaceholder="Filter by client..."
  title="Invoices"
  description="A list of all your invoices."
/>`}
      props={[
        {
          name: "columns",
          type: "ColumnDef<T>[]",
          description: "TanStack Table column definitions.",
          required: true,
        },
        {
          name: "data",
          type: "T[]",
          description: "Array of data objects to display.",
          required: true,
        },
        {
          name: "searchKey",
          type: "string",
          description: "The column accessor key to use for the search filter.",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Filter..."',
          description: "Placeholder text for the search input.",
        },
        {
          name: "title",
          type: "string",
          description: "Table title shown in the header.",
        },
        {
          name: "description",
          type: "string",
          description: "Description text shown under the title.",
        },
      ]}
      examples={[
        {
          title: "Features Overview",
          description: "The DataTable supports sorting, filtering, pagination, row selection, column visibility, and custom cells like badges, progress bars, and action menus.",
          preview: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Sorting</h3>
                <p className="text-sm text-muted-foreground">Click column headers to sort. Supports multi-column sorting.</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Filtering</h3>
                <p className="text-sm text-muted-foreground">Instant client-side filtering via the search input.</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Pagination</h3>
                <p className="text-sm text-muted-foreground">Built-in pagination with configurable page sizes (5, 10, 20).</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Row Selection</h3>
                <p className="text-sm text-muted-foreground">Checkbox-based selection for individual or all rows.</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Column Visibility</h3>
                <p className="text-sm text-muted-foreground">Toggle columns dynamically via the View dropdown.</p>
              </div>
              <div className="p-4 border rounded-lg bg-card">
                <h3 className="font-semibold mb-2">Custom Cells</h3>
                <p className="text-sm text-muted-foreground">Render badges, progress bars, and action menus in cells.</p>
              </div>
            </div>
          ),
          code: `// Custom cell example: Status Badge
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status");
    return <Badge variant={status}>{status}</Badge>;
  },
}`,
        },
      ]}
    />
  );
}