import { ComponentShowcase } from "../components/ui/component-showcase";
import { SplitButton } from "../components/ui/split-button";

const code = `import { SplitButton } from "@/components/ui/split-button";

export function SplitButtonDemo() {
  const handleSave = () => console.log("Main action: Save");
  
  const secondaryActions = [
    { label: "Save as draft", onClick: () => console.log("Draft saved") },
    { label: "Save and send", onClick: () => console.log("Sent") },
    { label: "Archive", onClick: () => console.log("Archived"), disabled: true },
  ];

  return (
    <SplitButton 
      label="Save"
      onMainAction={handleSave}
      actions={secondaryActions}
      variant="default"
    />
  );
}`;

export function SplitButtonPage() {
  return (
    <ComponentShowcase
      title="Split Button"
      description="A dual-action button that provides a primary action and a related list of secondary actions via a dropdown menu. Useful for combining common tasks like 'Save' and 'Save as Draft'."
      category="Actions"
      preview={
        <div className="h-[200px] flex items-center justify-center">
          <SplitButton 
            label="Save Operation"
            onMainAction={() => alert('Main action: Save Operation')}
            actions={[
              { label: "Save as draft", onClick: () => alert('Action: Save as draft') },
              { label: "Save and send", onClick: () => alert('Action: Save and send') },
              { label: "Export as PDF", onClick: () => alert('Action: Export as PDF') },
            ]}
          />
        </div>
      }
      code={code}
      props={[
        {
          name: "label",
          type: "string",
          description: "Text to display on the primary button.",
          required: true,
        },
        {
          name: "onMainAction",
          type: "() => void",
          description: "Callback function for the primary button click.",
          required: true,
        },
        {
          name: "actions",
          type: "Action[]",
          description: "Array of secondary actions for the dropdown menu.",
          required: true,
        },
        {
          name: "variant",
          type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
          default: '"default"',
          description: "Visual style variant of the buttons.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container.",
        },
      ]}
      examples={[
        {
          title: "Destructive Variant",
          description: "Used for dangerous actions like deleting or rejecting.",
          preview: (
            <SplitButton 
              label="Reject Invoice"
              variant="destructive"
              onMainAction={() => {}}
              actions={[
                { label: "Reject and notify", onClick: () => {} },
                { label: "Reject with comment", onClick: () => {} },
              ]}
            />
          ),
          code: `<SplitButton 
  label="Reject Invoice"
  variant="destructive"
  onMainAction={onReject}
  actions={[
    { label: "Reject and notify", onClick: () => {} },
    { label: "Reject with comment", onClick: () => {} },
  ]}
/>`,
        },
        {
          title: "Outline Style",
          description: "A less prominent secondary style.",
          preview: (
            <SplitButton 
              label="Export Data"
              variant="outline"
              onMainAction={() => {}}
              actions={[
                { label: "Export to CSV", onClick: () => {} },
                { label: "Export to Excel", onClick: () => {} },
                { label: "Print view", onClick: () => {} },
              ]}
            />
          ),
          code: `<SplitButton 
  label="Export Data"
  variant="outline"
  onMainAction={onExport}
  actions={[
    { label: "Export to CSV", onClick: () => {} },
    { label: "Export to Excel", onClick: () => {} },
  ]}
/>`,
        },
      ]}
    />
  );
}