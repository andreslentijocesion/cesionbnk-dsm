import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  TreeTable,
  type Operation,
  type BatchAction,
} from "../components/advanced/tree-table";
import { toast } from "sonner";

/* ═══════════════════════════════════════════
   SAMPLE DATA — Financial Operations
   ═══════════════════════════════════════════ */

const operations: Operation[] = [
  {
    id: "OP-4635",
    operationDate: "08/02/2026",
    client: { name: "Industrias Haceb S.A.", taxId: "890.900.118-1" },
    invoices: [
      { id: "inv-4635-1", number: "INV-10231", payer: { name: "Almacenes Exito S.A.", taxId: "890.900.608-9" }, amount: 185000000, disbursementAmount: 175750000, dueDate: "15/03/2026", status: "current" },
      { id: "inv-4635-2", number: "INV-10232", payer: { name: "Almacenes Exito S.A.", taxId: "890.900.608-9" }, amount: 92500000, disbursementAmount: 87875000, dueDate: "22/03/2026", status: "current" },
      { id: "inv-4635-3", number: "INV-10233", payer: { name: "Falabella de Colombia S.A.", taxId: "900.017.447-8" }, amount: 67800000, disbursementAmount: 64410000, dueDate: "10/04/2026", status: "current" },
    ],
    invoiceAmount: 345300000,
    disbursementAmount: 328035000,
    status: "pending",
  },
  {
    id: "OP-4612",
    operationDate: "05/02/2026",
    client: { name: "Cementos Argos S.A.", taxId: "890.100.251-0" },
    invoices: [
      { id: "inv-4612-1", number: "INV-8890", payer: { name: "Constructora Conconcreto S.A.", taxId: "890.900.227-1" }, amount: 420000000, disbursementAmount: 399000000, dueDate: "28/02/2026", status: "paid" },
      { id: "inv-4612-2", number: "INV-8891", payer: { name: "Constructora Conconcreto S.A.", taxId: "890.900.227-1" }, amount: 315000000, disbursementAmount: 299250000, dueDate: "15/03/2026", status: "current" },
    ],
    invoiceAmount: 735000000,
    disbursementAmount: 698250000,
    status: "approved",
  },
  {
    id: "OP-4598",
    operationDate: "01/02/2026",
    client: { name: "Grupo Nutresa S.A.", taxId: "890.900.050-5" },
    invoices: [
      { id: "inv-4598-1", number: "INV-7745", payer: { name: "Olimpica S.A.", taxId: "890.101.815-9" }, amount: 156000000, disbursementAmount: 148200000, dueDate: "20/02/2026", status: "paid" },
      { id: "inv-4598-2", number: "INV-7746", payer: { name: "Grupo Exito S.A.", taxId: "890.900.608-9" }, amount: 203000000, disbursementAmount: 192850000, dueDate: "25/02/2026", status: "paid" },
      { id: "inv-4598-3", number: "INV-7747", payer: { name: "D1 SAS", taxId: "900.480.569-0" }, amount: 98500000, disbursementAmount: 93575000, dueDate: "10/03/2026", status: "current" },
      { id: "inv-4598-4", number: "INV-7748", payer: { name: "Jumbo Colombia S.A.", taxId: "860.000.150-8" }, amount: 142000000, disbursementAmount: 134900000, dueDate: "18/03/2026", status: "current" },
    ],
    invoiceAmount: 599500000,
    disbursementAmount: 569525000,
    status: "disbursed",
  },
  {
    id: "OP-4580",
    operationDate: "28/01/2026",
    client: { name: "Postobon S.A.", taxId: "890.903.939-5" },
    invoices: [
      { id: "inv-4580-1", number: "INV-6612", payer: { name: "Bavaria S.A.", taxId: "860.005.224-6" }, amount: 89000000, disbursementAmount: 84550000, dueDate: "15/02/2026", status: "overdue" },
      { id: "inv-4580-2", number: "INV-6613", payer: { name: "Bavaria S.A.", taxId: "860.005.224-6" }, amount: 112000000, disbursementAmount: 106400000, dueDate: "20/02/2026", status: "overdue" },
    ],
    invoiceAmount: 201000000,
    disbursementAmount: 190950000,
    status: "canceled",
  },
  {
    id: "OP-4571",
    operationDate: "25/01/2026",
    client: { name: "Colombina S.A.", taxId: "890.301.884-2" },
    invoices: [
      { id: "inv-4571-1", number: "INV-5503", payer: { name: "Almacenes Exito S.A.", taxId: "890.900.608-9" }, amount: 78500000, disbursementAmount: 74575000, dueDate: "28/02/2026", status: "current" },
    ],
    invoiceAmount: 78500000,
    disbursementAmount: 74575000,
    status: "approved",
  },
];

function formatAmount(val: number): string {
  return "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function TreeTableV2Page() {
  const handleBatchAction = (action: BatchAction, selectedIds: Set<string>) => {
    const count = selectedIds.size;
    const labels: Record<BatchAction, string> = { approve: "Approve", export: "Export", cancel: "Cancel" };
    toast.success(`${labels[action]} ${count} item${count !== 1 ? "s" : ""}`, {
      description: `IDs: ${Array.from(selectedIds).slice(0, 4).join(", ")}${count > 4 ? "..." : ""}`,
    });
  };

  const handleView = (op: Operation) => {
    toast.info(`View operation ${op.id}`, {
      description: `${op.client.name} — ${op.invoices.length} invoices for ${formatAmount(op.invoiceAmount)}`,
    });
  };

  return (
    <ComponentShowcase
      title="Financial Operations (Tree Table V2)"
      description="3-level hierarchical table: Operation (client) → Payer → Invoices. Each operation shows client info, payers, amounts, status, and direct actions. Expanding reveals payers grouped by Tax ID, and expanding each payer shows its invoices with status badges. Supports batch selection, search, sorting, and Excel export."
      category="Advanced"
      preview={
        <TreeTable
          data={operations}
          title="Financial Portfolio"
          description={`${operations.length} operations - ${operations.reduce((s, o) => s + o.invoices.length, 0)} invoices - ${formatAmount(operations.reduce((s, o) => s + o.invoiceAmount, 0))} total`}
          onSelectionChange={(ids) => console.log("Selection:", Array.from(ids))}
          onBatchAction={handleBatchAction}
          onViewOperation={handleView}
          onCancelOperation={(op) => toast.warning(`Cancel operation ${op.id}`)}
          onDownloadExcel={(op) => toast.success(`Download Excel — ${op.id}`)}
        />
      }
      code={`import { TreeTable, Operation, BatchAction } from "@/components/advanced/tree-table";

const operations: Operation[] = [
  {
    id: "OP-4635",
    operationDate: "08/02/2026",
    client: { name: "Industrias Haceb S.A.", taxId: "890.900.118-1" },
    invoices: [
      {
        id: "inv-1",
        number: "INV-10231",
        payer: { name: "Almacenes Exito S.A.", taxId: "890.900.608-9" },
        amount: 185000000,
        disbursementAmount: 175750000,
        dueDate: "15/03/2026",
        status: "current",
      },
    ],
    invoiceAmount: 185000000,
    disbursementAmount: 175750000,
    status: "pending",
  },
];

<TreeTable
  data={operations}
  title="Portfolio"
  onBatchAction={(action, ids) => console.log(action, ids)}
  onViewOperation={(op) => console.log("View:", op)}
  onDownloadExcel={(op) => console.log("Export:", op)}
/>`}
      props={[
        {
          name: "data",
          type: "Operation[]",
          description: "Array of financial operations with nested invoices.",
          required: true,
        },
        {
          name: "title",
          type: "string",
          description: "Title shown in the table header.",
        },
        {
          name: "description",
          type: "string",
          description: "Description shown under the title.",
        },
        {
          name: "onSelectionChange",
          type: "(ids: Set<string>) => void",
          description: "Callback when selection changes.",
        },
        {
          name: "onBatchAction",
          type: "(action: BatchAction, ids: Set<string>) => void",
          description: "Callback for batch actions (approve, export, cancel).",
        },
        {
          name: "onViewOperation",
          type: "(op: Operation) => void",
          description: "Callback when 'View' action is clicked.",
        },
        {
          name: "onCancelOperation",
          type: "(op: Operation) => void",
          description: "Callback when 'Cancel' action is clicked.",
        },
        {
          name: "onDownloadExcel",
          type: "(op: Operation) => void",
          description: "Callback when 'Download Excel' action is clicked.",
        },
      ]}
      examples={[
        {
          title: "Key Features",
          description: "Built-in capabilities of the Financial Tree Table V2.",
          preview: (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">3-Level Hierarchy</h4>
                <p className="text-sm text-muted-foreground">Operation → Payer → Invoice with expand/collapse at each level.</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">Batch Operations</h4>
                <p className="text-sm text-muted-foreground">Select multiple operations for approve, export, or cancel actions.</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">Search & Sort</h4>
                <p className="text-sm text-muted-foreground">Filter by ID, client, payer, or Tax ID. Sort by column headers.</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">Status Badges</h4>
                <p className="text-sm text-muted-foreground">Color-coded badges: pending, approved, disbursed, canceled, current, paid, overdue.</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">Currency Formatting</h4>
                <p className="text-sm text-muted-foreground">USD formatting with locale-aware number display.</p>
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <h4 className="font-medium">Action Menu</h4>
                <p className="text-sm text-muted-foreground">Per-row dropdown with View, Cancel, and Download Excel options.</p>
              </div>
            </div>
          ),
          code: `// BatchAction type: "approve" | "export" | "cancel"
// Operation includes: id, operationDate, client, invoices[], status`,
        },
      ]}
    />
  );
}
