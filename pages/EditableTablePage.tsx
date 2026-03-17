import { ComponentShowcase } from "../components/ui/component-showcase";
import { EditableTable } from "../components/patterns/editable-table";

const usageCode = `import { EditableTable } from "@biomahd-creator/financio-design-system/patterns";

// The EditableTable renders a fully interactive table with inline editing,
// row selection, date pickers, and status badges.
<EditableTable />`;

export function EditableTablePage() {
  return (
    <ComponentShowcase
      title="Editable Table"
      description="Interactive table with inline cell editing, row selection, date pickers, currency formatting, and status management. Designed for financial invoice workflows."
      category="Patterns"
      preview={<EditableTable />}
      code={usageCode}
      props={[
        {
          name: "(self-contained)",
          type: "—",
          description: "This component manages its own state internally with mock invoice data. Future versions will accept external data and callbacks.",
        },
      ]}
    />
  );
}