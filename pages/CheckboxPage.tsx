import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Checkbox } from "../components/ui/Checkbox";
import { Label } from "../components/ui/Label";
import { Button } from "../components/ui/Button";

export function CheckboxPage() {
  return (
    <ComponentShowcase
      title="Checkbox"
      description="A control that allows the user to toggle between checked and not checked."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <Label htmlFor="terms1">Accept terms and conditions</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing1" defaultChecked />
            <Label htmlFor="marketing1">Send me marketing emails</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="disabled1" disabled />
            <Label htmlFor="disabled1" className="text-muted-foreground">Disabled checkbox</Label>
          </div>
        </div>
      }
      
      // Main Code
      code={`import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "checked",
          type: "boolean | 'indeterminate'",
          description: "Controlled state of the checkbox (checked/unchecked/indeterminate)",
        },
        {
          name: "defaultChecked",
          type: "boolean",
          description: "Initial state of the checkbox (uncontrolled component)",
        },
        {
          name: "onCheckedChange",
          type: "(checked: boolean | 'indeterminate') => void",
          description: "Callback that fires when the state changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the checkbox and prevents interaction",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Marks the checkbox as required in forms",
        },
        {
          name: "name",
          type: "string",
          description: "Field name for HTML forms",
        },
        {
          name: "value",
          type: "string",
          description: "Checkbox value when checked (for forms)",
        },
        {
          name: "id",
          type: "string",
          description: "Checkbox ID (useful for associating with Label)",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Label",
          description: "Checkbox with label associated for better accessibility",
          preview: (
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <Label htmlFor="terms2">
                I agree to the terms and conditions
              </Label>
            </div>
          ),
          code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">
    I agree to the terms and conditions
  </Label>
</div>`
        },
        {
          title: "Multiple Checkboxes",
          description: "Group of related checkboxes",
          preview: (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="email2" defaultChecked />
                <Label htmlFor="email2">Email notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sms2" />
                <Label htmlFor="sms2">SMS notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="push2" defaultChecked />
                <Label htmlFor="push2">Push notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="desktop2" />
                <Label htmlFor="desktop2">Desktop notifications</Label>
              </div>
            </div>
          ),
          code: `<div className="space-y-3">
  <div className="flex items-center space-x-2">
    <Checkbox id="email" defaultChecked />
    <Label htmlFor="email">Email notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="sms" />
    <Label htmlFor="sms">SMS notifications</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="push" defaultChecked />
    <Label htmlFor="push">Push notifications</Label>
  </div>
</div>`
        },
        {
          title: "Disabled State",
          description: "Checkboxes in disabled state",
          preview: (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled2" disabled />
                <Label htmlFor="disabled2" className="text-muted-foreground">
                  Disabled unchecked
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-checked2" disabled defaultChecked />
                <Label htmlFor="disabled-checked2" className="text-muted-foreground">
                  Disabled checked
                </Label>
              </div>
            </div>
          ),
          code: `<div className="space-y-3">
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled" disabled />
    <Label htmlFor="disabled">Disabled unchecked</Label>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="disabled-checked" disabled defaultChecked />
    <Label htmlFor="disabled-checked">Disabled checked</Label>
  </div>
</div>`
        },
        {
          title: "With Description",
          description: "Checkbox with label and descriptive text",
          preview: (
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox id="analytics" className="mt-1" defaultChecked />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="analytics">
                    Use Analytics Cookies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect anonymous usage data to improve the product.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox id="marketing2" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="marketing2">
                    Marketing Communications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features, updates, and offers.
                  </p>
                </div>
              </div>
            </div>
          ),
          code: `<div className="flex items-start space-x-2">
  <Checkbox id="analytics" className="mt-1" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="analytics">
      Use Analytics Cookies
    </Label>
    <p className="text-sm text-muted-foreground">
      Allow us to collect anonymous usage data.
    </p>
  </div>
</div>`
        },
        {
          title: "In a Form",
          description: "Checkboxes integrated into a complete form",
          preview: (
            <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <Label>Preferences</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" defaultChecked />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-save" />
                  <Label htmlFor="auto-save">Auto-save drafts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dark-mode" />
                  <Label htmlFor="dark-mode">Dark mode</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="agree" required />
                <Label htmlFor="agree">
                  I agree to the terms and conditions *
                </Label>
              </div>
              <Button type="submit">Save Preferences</Button>
            </form>
          ),
          code: `<form onSubmit={handleSubmit}>
  <div className="space-y-3">
    <Label>Preferences</Label>
    <div className="flex items-center space-x-2">
      <Checkbox id="notifications" defaultChecked />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="auto-save" />
      <Label htmlFor="auto-save">Auto-save drafts</Label>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="agree" required />
    <Label htmlFor="agree">I agree to the terms *</Label>
  </div>
  <Button type="submit">Save</Button>
</form>`
        },
        {
          title: "Controlled Checkbox",
          description: "Checkbox as a controlled component with state",
          preview: (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="controlled" 
                  defaultChecked
                  onCheckedChange={(checked) => console.log('Checked:', checked)}
                />
                <Label htmlFor="controlled">
                  Controlled checkbox (check console)
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Open the console to see state changes
              </p>
            </div>
          ),
          code: `import { useState } from "react";

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="controlled" 
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Label htmlFor="controlled">
        Controlled checkbox
      </Label>
    </div>
  );
}`
        },
        {
          title: "Checkbox List",
          description: "List of options with checkboxes (multi-select)",
          preview: (
            <div className="space-y-2">
              <Label>Select your interests</Label>
              <div className="grid gap-2 border rounded-md p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="tech" defaultChecked />
                  <Label htmlFor="tech" className="font-normal">Technology</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="design" defaultChecked />
                  <Label htmlFor="design" className="font-normal">Design</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="business" />
                  <Label htmlFor="business" className="font-normal">Business</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="science" />
                  <Label htmlFor="science" className="font-normal">Science</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="health" />
                  <Label htmlFor="health" className="font-normal">Health & Fitness</Label>
                </div>
              </div>
            </div>
          ),
          code: `<div className="space-y-2">
  <Label>Select your interests</Label>
  <div className="grid gap-2 border rounded-md p-4">
    <div className="flex items-center space-x-2">
      <Checkbox id="tech" defaultChecked />
      <Label htmlFor="tech">Technology</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="design" defaultChecked />
      <Label htmlFor="design">Design</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="business" />
      <Label htmlFor="business">Business</Label>
    </div>
  </div>
</div>`
        },
        {
          title: "Inline Checkboxes",
          description: "Checkboxes aligned horizontally",
          preview: (
            <div className="space-y-3">
              <Label>Size</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="small" />
                  <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="medium" defaultChecked />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="large" />
                  <Label htmlFor="large">Large</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="xlarge" />
                  <Label htmlFor="xlarge">X-Large</Label>
                </div>
              </div>
            </div>
          ),
          code: `<div className="space-y-3">
  <Label>Size</Label>
  <div className="flex flex-wrap gap-4">
    <div className="flex items-center space-x-2">
      <Checkbox id="small" />
      <Label htmlFor="small">Small</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="medium" defaultChecked />
      <Label htmlFor="medium">Medium</Label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="large" />
      <Label htmlFor="large">Large</Label>
    </div>
  </div>
</div>`
        }
      ]}
    />
  );
}