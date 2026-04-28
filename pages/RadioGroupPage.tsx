import { ComponentShowcase } from "../components/ui/component-showcase";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Check, CreditCard, Building2, Wallet } from "lucide-react";

export function RadioGroupPage() {
  return (
    <ComponentShowcase
      title="Radio Group"
      description="A set of checkable buttons where only one option can be selected at a time. Perfect for exclusive choices."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="r1" />
            <Label htmlFor="r1">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="r2" />
            <Label htmlFor="r2">Option Two</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="r3" />
            <Label htmlFor="r3">Option Three</Label>
          </div>
        </RadioGroup>
      }
      
      // Main Code
      code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option Three</Label>
      </div>
    </RadioGroup>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "value",
          type: "string",
          description: "Controlled value of the selected radio",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Uncontrolled initial value",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback when the selection changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the entire group",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Required field in forms",
        },
        {
          name: "name",
          type: "string",
          description: "Group name (for forms)",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the container",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "Basic Options",
          description: "Simple radio group with basic options",
          preview: (
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="compact" />
                <Label htmlFor="compact">Compact</Label>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function BasicRadioGroup() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "With Descriptions",
          description: "Radio buttons with additional descriptions",
          preview: (
            <RadioGroup defaultValue="basic" className="space-y-3">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="basic" id="basic" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="basic">Basic Plan</Label>
                  <p className="text-muted-foreground">
                    $9/month - Perfect for individuals
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="pro" id="pro" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="pro">Pro Plan</Label>
                  <p className="text-muted-foreground">
                    $29/month - Best for small teams
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="enterprise">Enterprise Plan</Label>
                  <p className="text-muted-foreground">
                    Custom pricing - For large organizations
                  </p>
                </div>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function RadioWithDescriptions() {
  return (
    <RadioGroup defaultValue="basic" className="space-y-3">
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="basic" id="basic" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="basic">Basic Plan</Label>
          <p className="text-sm text-muted-foreground">
            $9/month - Perfect for individuals
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="pro" id="pro" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="pro">Pro Plan</Label>
          <p className="text-sm text-muted-foreground">
            $29/month - Best for small teams
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
        <div className="space-y-1">
          <Label htmlFor="enterprise">Enterprise Plan</Label>
          <p className="text-sm text-muted-foreground">
            Custom pricing - For large organizations
          </p>
        </div>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "Card Style Options",
          description: "Radio buttons inside cards for better UI",
          preview: (
            <RadioGroup defaultValue="card-1" className="grid gap-4">
              <div>
                <RadioGroupItem value="card-1" id="card-1" className="peer sr-only" />
                <Label
                  htmlFor="card-1"
                  className="flex flex-col items-start gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Option One</span>
                  </div>
                  <p className="text-muted-foreground">
                    This is the first option with a card style
                  </p>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem value="card-2" id="card-2" className="peer sr-only" />
                <Label
                  htmlFor="card-2"
                  className="flex flex-col items-start gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span>Option Two</span>
                  </div>
                  <p className="text-muted-foreground">
                    This is the second option with a card style
                  </p>
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export function CardStyleRadio() {
  return (
    <RadioGroup defaultValue="card-1" className="grid gap-4">
      <div>
        <RadioGroupItem value="card-1" id="card-1" className="peer sr-only" />
        <Label
          htmlFor="card-1"
          className="flex flex-col items-start gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Option One</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This is the first option with a card style
          </p>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="card-2" id="card-2" className="peer sr-only" />
        <Label
          htmlFor="card-2"
          className="flex flex-col items-start gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Option Two</span>
          </div>
          <p className="text-sm text-muted-foreground">
            This is the second option with a card style
          </p>
        </Label>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "Payment Method Selector",
          description: "Radio group for selecting payment method with icons",
          preview: (
            <RadioGroup defaultValue="card" className="space-y-3">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <span>Credit Card</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="h-4 w-4" />
                  <span>Bank Transfer</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-4 w-4" />
                  <span>Digital Wallet</span>
                </Label>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Building2, Wallet } from "lucide-react";

export function PaymentMethodSelector() {
  return (
    <RadioGroup defaultValue="card" className="space-y-3">
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
          <CreditCard className="h-4 w-4" />
          <span>Credit Card</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="bank" id="bank" />
        <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
          <Building2 className="h-4 w-4" />
          <span>Bank Transfer</span>
        </Label>
      </div>
      
      <div className="flex items-center space-x-3">
        <RadioGroupItem value="wallet" id="wallet" />
        <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
          <Wallet className="h-4 w-4" />
          <span>Digital Wallet</span>
        </Label>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "Horizontal Layout",
          description: "Radio group in horizontal layout",
          preview: (
            <RadioGroup defaultValue="yes" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes-h" />
                <Label htmlFor="yes-h">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no-h" />
                <Label htmlFor="no-h">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="maybe-h" />
                <Label htmlFor="maybe-h">Maybe</Label>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function HorizontalRadioGroup() {
  return (
    <RadioGroup defaultValue="yes" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id="yes-h" />
        <Label htmlFor="yes-h">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id="no-h" />
        <Label htmlFor="no-h">No</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="maybe" id="maybe-h" />
        <Label htmlFor="maybe-h">Maybe</Label>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "Disabled State",
          description: "Radio group in disabled state",
          preview: (
            <RadioGroup defaultValue="disabled-1" disabled>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled-1" id="disabled-1" />
                <Label htmlFor="disabled-1">Disabled and selected</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled-2" id="disabled-2" />
                <Label htmlFor="disabled-2">Disabled and unselected</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="disabled-3" id="disabled-3" />
                <Label htmlFor="disabled-3">Also disabled</Label>
              </div>
            </RadioGroup>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function DisabledRadioGroup() {
  return (
    <RadioGroup defaultValue="disabled-1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled-1" id="disabled-1" />
        <Label htmlFor="disabled-1">Disabled and selected</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled-2" id="disabled-2" />
        <Label htmlFor="disabled-2">Disabled and unselected</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled-3" id="disabled-3" />
        <Label htmlFor="disabled-3">Also disabled</Label>
      </div>
    </RadioGroup>
  );
}`,
        },
        {
          title: "Form Integration",
          description: "Radio group inside a complete form",
          preview: (
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>Notification Preferences</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-notif" />
                    <Label htmlFor="all-notif">All notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="important" id="important-notif" />
                    <Label htmlFor="important-notif">Important only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none-notif" />
                    <Label htmlFor="none-notif">No notifications</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Email Frequency</Label>
                <RadioGroup defaultValue="daily">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="realtime" id="realtime" />
                    <Label htmlFor="realtime">Real-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly summary</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button>Save Preferences</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          ),
          code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function PreferencesForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label>Notification Preferences</Label>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all-notif" />
            <Label htmlFor="all-notif">All notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="important" id="important-notif" />
            <Label htmlFor="important-notif">Important only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none-notif" />
            <Label htmlFor="none-notif">No notifications</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <Label>Email Frequency</Label>
        <RadioGroup defaultValue="daily">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="realtime" id="realtime" />
            <Label htmlFor="realtime">Real-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily digest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly summary</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button type="submit">Save Preferences</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </form>
  );
}`,
        },
      ]}
    />
  );
}