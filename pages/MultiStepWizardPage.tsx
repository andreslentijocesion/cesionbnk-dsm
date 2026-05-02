import { ComponentShowcase } from "../components/ui/componentshowcase"
import { MultiStepWizard } from "../components/patterns/multi-step-wizard"

export function MultiStepWizardPage() {
  return (
    <ComponentShowcase
      title="Multi-Step Wizard"
      description="Multi-step form wizard for complex processes like financial applications. Guides users through structured stages with visual progress indicators, step validation, and intuitive navigation. Includes smooth transitions, contextual inputs (Info, Financial, Docs), and a final summary before submission."
      category="Patterns"
      preview={
        <div className="max-w-3xl mx-auto">
          <MultiStepWizard />
        </div>
      }
      code={`import { MultiStepWizard } from "@/components/patterns/multi-step-wizard"

export default function ApplicationPage() {
  return (
    <div className="container mx-auto py-10">
      <MultiStepWizard />
    </div>
  );
}`}
      props={[
        {
          name: "(self-contained)",
          type: "—",
          description: "This component is self-contained with internal state management. No external props required.",
        },
      ]}
      examples={[
        {
          title: "Key Features",
          description: "Built-in capabilities of the Multi-Step Wizard pattern.",
          preview: (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium">Structured Navigation</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Visual step indicator (active, completed)</li>
                  <li>Progress bar with percentage</li>
                  <li>Previous / Next navigation</li>
                  <li>Per-step validation before advancing</li>
                </ul>
              </div>
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium">User Experience</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Smooth transitions between steps</li>
                  <li>Final summary before submission</li>
                  <li>Context-specific inputs per step</li>
                  <li>Clear visual feedback at each stage</li>
                </ul>
              </div>
            </div>
          ),
          code: `// The wizard internally manages:
// Step 1: Company Information
// Step 2: Financial Details
// Step 3: Document Upload
// Step 4: Review & Submit`,
        },
      ]}
    />
  );
}