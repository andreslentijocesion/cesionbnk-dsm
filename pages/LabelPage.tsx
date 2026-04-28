import { ComponentShowcase } from "../components/ui/component-showcase";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

export function LabelPage() {
  return (
    <ComponentShowcase
      title="Label"
      description="Renders an accessible label associated with form controls. Essential for accessibility and user experience."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="cursor-pointer">
              I accept the terms and conditions
            </Label>
          </div>
        </div>
      }
      
      // Main Code
      code={`import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function LabelDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="cursor-pointer">
          I accept the terms and conditions
        </Label>
      </div>
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "htmlFor",
          type: "string",
          description: "ID of the associated form control",
          required: true,
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Label content",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Renders as a child of the label",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Input",
          description: "Basic label associated with an input",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function LabelWithInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  );
}`,
        },
        {
          title: "Required Field Indicator",
          description: "Label with asterisk for required fields",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-req">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input id="email-req" type="email" placeholder="required@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-req">
                  Password <span className="text-destructive">*</span>
                </Label>
                <Input id="password-req" type="password" placeholder="••••••••" required />
              </div>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function RequiredFields() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-req">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="email-req" 
          type="email" 
          placeholder="required@example.com" 
          required 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password-req">
          Password <span className="text-destructive">*</span>
        </Label>
        <Input 
          id="password-req" 
          type="password" 
          placeholder="••••••••" 
          required 
        />
      </div>
    </div>
  );
}`,
        },
        {
          title: "With Helper Text",
          description: "Label with additional helper text",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
              <p className="text-muted-foreground">
                Brief description for your profile. Max 500 characters.
              </p>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function LabelWithHelper() {
  return (
    <div className="space-y-2">
      <Label htmlFor="bio">Biography</Label>
      <Textarea 
        id="bio" 
        placeholder="Tell us about yourself..." 
        rows={4} 
      />
      <p className="text-sm text-muted-foreground">
        Brief description for your profile. Max 500 characters.
      </p>
    </div>
  );
}`,
        },
        {
          title: "With Checkbox",
          description: "Clickable label associated with a checkbox",
          preview: (
            <div className="w-full max-w-md space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="notifications" />
                <Label htmlFor="notifications" className="cursor-pointer">
                  Enable email notifications
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <Label htmlFor="marketing" className="cursor-pointer">
                  Receive marketing emails
                </Label>
              </div>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function LabelWithCheckbox() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="notifications" />
        <Label htmlFor="notifications" className="cursor-pointer">
          Enable email notifications
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing" className="cursor-pointer">
          Receive marketing emails
        </Label>
      </div>
    </div>
  );
}`,
        },
        {
          title: "With Radio Group",
          description: "Labels associated with radio buttons",
          preview: (
            <div className="w-full max-w-md">
              <Label className="mb-3 block">Choose a plan</Label>
              <RadioGroup defaultValue="pro">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic-plan" />
                  <Label htmlFor="basic-plan" className="cursor-pointer">
                    Basic - $9/month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pro" id="pro-plan" />
                  <Label htmlFor="pro-plan" className="cursor-pointer">
                    Pro - $29/month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="enterprise-plan" />
                  <Label htmlFor="enterprise-plan" className="cursor-pointer">
                    Enterprise - Custom pricing
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LabelWithRadio() {
  return (
    <div>
      <Label className="mb-3 block">Choose a plan</Label>
      <RadioGroup defaultValue="pro">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="basic" id="basic-plan" />
          <Label htmlFor="basic-plan" className="cursor-pointer">
            Basic - $9/month
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pro" id="pro-plan" />
          <Label htmlFor="pro-plan" className="cursor-pointer">
            Pro - $29/month
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="enterprise" id="enterprise-plan" />
          <Label htmlFor="enterprise-plan" className="cursor-pointer">
            Enterprise - Custom pricing
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}`,
        },
        {
          title: "With Switch",
          description: "Labels for switch controls",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-muted-foreground">
                    Enable dark theme
                  </p>
                </div>
                <Switch id="dark-mode" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-save">Auto-save</Label>
                  <p className="text-muted-foreground">
                    Automatically save changes
                  </p>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function LabelWithSwitch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <p className="text-sm text-muted-foreground">
            Enable dark theme
          </p>
        </div>
        <Switch id="dark-mode" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="auto-save">Auto-save</Label>
          <p className="text-sm text-muted-foreground">
            Automatically save changes
          </p>
        </div>
        <Switch id="auto-save" defaultChecked />
      </div>
    </div>
  );
}`,
        },
        {
          title: "With Tooltip",
          description: "Label with informational tooltip",
          preview: (
            <div className="w-full max-w-md space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your unique API key for authentication</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input id="api-key" type="password" placeholder="sk_test_..." />
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

export function LabelWithTooltip() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="api-key">API Key</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Your unique API key for authentication</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input id="api-key" type="password" placeholder="sk_test_..." />
    </div>
  );
}`,
        },
        {
          title: "Disabled Label",
          description: "Label for disabled controls",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disabled-input" className="text-muted-foreground">
                  Disabled Field
                </Label>
                <Input id="disabled-input" disabled placeholder="Cannot edit" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled-check" disabled />
                <Label htmlFor="disabled-check" className="text-muted-foreground">
                  Disabled option
                </Label>
              </div>
            </div>
          ),
          code: `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function DisabledLabel() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="disabled-input" className="text-muted-foreground">
          Disabled Field
        </Label>
        <Input id="disabled-input" disabled placeholder="Cannot edit" />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-check" disabled />
        <Label htmlFor="disabled-check" className="text-muted-foreground">
          Disabled option
        </Label>
      </div>
    </div>
  );
}`,
        },
      ]}
    />
  );
}