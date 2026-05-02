import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { MoreHorizontal } from "lucide-react";
import { MasterDataGrid } from "../advanced/master-data-grid";

const mockInvoices = [
  {
    id: "INV-001",
    client: "Empresa ABC S.A.",
    amount: 2500000,
    date: "2024-01-15",
    dueDate: "2024-02-15",
    status: "approved",
  },
  {
    id: "INV-002",
    client: "Comercial XYZ Ltda.",
    amount: 1800000,
    date: "2024-01-18",
    dueDate: "2024-02-18",
    status: "pending",
  },
  {
    id: "INV-003",
    client: "Industrias DEF S.A.",
    amount: 3200000,
    date: "2024-01-20",
    dueDate: "2024-02-20",
    status: "review",
  },
  {
    id: "INV-004",
    client: "Servicios GHI Ltda.",
    amount: 950000,
    date: "2024-01-22",
    dueDate: "2024-02-22",
    status: "rejected",
  },
  {
    id: "INV-005",
    client: "Distribuidora JKL S.A.",
    amount: 4100000,
    date: "2024-01-25",
    dueDate: "2024-02-25",
    status: "paid",
  },
];

const statusConfig: Record<string, { label: string; variant: "success-soft-outline" | "warning-soft-outline" | "info-soft-outline" | "destructive-soft-outline" }> = {
  approved: { label: "Approved", variant: "success-soft-outline" },
  pending: { label: "Pending", variant: "warning-soft-outline" },
  review: { label: "In Review", variant: "info-soft-outline" },
  rejected: { label: "Rejected", variant: "destructive-soft-outline" },
  paid: { label: "Paid", variant: "success-soft-outline" },
};

export function DataTableAdvanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <MasterDataGrid
      title="Recent Invoices"
      description="Invoice management and payment status"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Search by client or number..."
      
      filterOptions={[
        {
          label: "Status",
          value: statusFilter,
          options: [
            { label: "All statuses", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "In Review", value: "review" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
            { label: "Paid", value: "paid" },
          ]
        }
      ]}
      onFilterChange={(_: string, val: string) => setStatusFilter(val)}
      onResetFilters={() => setStatusFilter("all")}
      
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={filteredInvoices.length}
      itemsPerPage={itemsPerPage}
      startIndex={startIndex}
    >
        <div className="border-t">
            <Table>
            <TableHeader>
                <TableRow className="bg-muted/40">
                <TableHead>Invoice No.</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                      No invoices match the current filters.
                    </TableCell>
                  </TableRow>
                )}
                {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                    <TableCell className="font-medium font-mono tabular-nums">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell className="font-mono tabular-nums">
                    ${invoice.amount.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                    <Badge variant={statusConfig[invoice.status].variant}>
                        {statusConfig[invoice.status].label}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Acciones de fila">
                            <MoreHorizontal className="size-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            Reject
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    </MasterDataGrid>
  );
}