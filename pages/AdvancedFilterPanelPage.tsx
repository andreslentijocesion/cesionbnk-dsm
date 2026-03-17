import { ComponentShowcase } from "../components/ui/component-showcase";
import { AdvancedFilterPanel } from "../components/patterns/advanced-filter-panel";

const advancedFilterCode = `import { AdvancedFilterPanel } from "@/components/patterns/advanced-filter-panel";

export function AdvancedFilterPanelDemo() {
  return <AdvancedFilterPanel />;
}`;

export function AdvancedFilterPanelPage() {
  return (
    <ComponentShowcase
      title="Advanced Filter Panel"
      description="Advanced filter panel with lateral Sheet, DatePicker for date ranges, Select for statuses, Checkboxes for types, and ScrollArea. Self-contained component with internal state."
      category="Business Pattern"
      preview={<AdvancedFilterPanel />}
      code={advancedFilterCode}
      props={[
        { name: "(self-contained)", type: "—", description: "This component does not receive external props. It manages its own filter state (dates, statuses, client types, amounts)." },
      ]}
      examples={[
        {
          title: "Integration in listing page",
          description: "How to use the filter panel within an invoice list view.",
          preview: (
            <div className="text-center py-6 border rounded-lg">
              <p className="text-sm text-muted-foreground">The component is placed next to the data table in a sidebar or header layout.</p>
            </div>
          ),
          code: `import { AdvancedFilterPanel } from "@/components/patterns/advanced-filter-panel";

// In your listing page:
<div className="flex gap-4">
  <div className="flex-1">
    <DataTableAdvanced />
  </div>
  <AdvancedFilterPanel />
</div>`,
        },
      ]}
    />
  );
}