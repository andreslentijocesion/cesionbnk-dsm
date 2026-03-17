import { ComponentShowcase } from "../components/ui/component-showcase";
import { DataTableAdvanced } from "../components/patterns/data-table-advanced";

const dataTableAdvancedCode = `import { DataTableAdvanced } from "@/components/patterns/data-table-advanced";

export function DataTableAdvancedDemo() {
  return <DataTableAdvanced />;
}`;

export function DataTableAdvancedPage() {
  return (
    <ComponentShowcase
      title="Data Table Advanced"
      description="Advanced table with search, status filters, sorting, per-row actions, and pagination. Self-contained component with mock invoice data."
      category="Business Pattern"
      preview={<DataTableAdvanced />}
      code={dataTableAdvancedCode}
      props={[
        { name: "(self-contained)", type: "—", description: "Self-contained component. Includes search, status filter, column sorting, contextual per-row actions, and internal pagination." },
      ]}
      examples={[
        {
          title: "In full-page layout",
          description: "Typical integration within an administration module.",
          preview: (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-sm text-muted-foreground">Renders as the main content of a page with header and sidebar.</p>
            </div>
          ),
          code: `import { DataTableAdvanced } from "@/components/patterns/data-table-advanced";

// In your invoices module:
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h1>Invoice Management</h1>
    <Button>New Invoice</Button>
  </div>
  <DataTableAdvanced />
</div>`,
        },
      ]}
    />
  );
}