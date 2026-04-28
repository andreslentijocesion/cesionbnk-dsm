import { ComponentShowcase } from "../components/ui/component-showcase";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Building2, Globe, CreditCard, MapPin } from "lucide-react";

export function SelectPage() {
  return (
    <ComponentShowcase
      title="Select"
      description="Displays a list of options for the user to pick from—triggered by a button. Supports four size variants on the trigger: sm, default, lg, and xl."
      category="Forms"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="grid gap-6 max-w-md">
          {/* Size Variants */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Size Variants</p>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">sm</span>
                <Select>
                  <SelectTrigger size="sm">
                    <SelectValue placeholder="Small select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">default</span>
                <Select>
                  <SelectTrigger size="default">
                    <SelectValue placeholder="Default select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">lg</span>
                <Select>
                  <SelectTrigger size="lg">
                    <SelectValue placeholder="Large select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">xl</span>
                <Select>
                  <SelectTrigger size="xl">
                    <SelectValue placeholder="Extra large select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Basic Examples */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Basic</p>
            <div className="grid gap-3">
              <Select defaultValue="us">
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>

              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      }
      
      // Main Code
      code={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Size variants
<SelectTrigger size="sm">...</SelectTrigger>
<SelectTrigger size="default">...</SelectTrigger>
<SelectTrigger size="lg">...</SelectTrigger>
<SelectTrigger size="xl">...</SelectTrigger>

// Basic usage
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`}
      
      // Props Documentation
      props={[
        {
          name: "size",
          type: '"sm" | "default" | "lg" | "xl"',
          default: '"default"',
          description: "Controls the height, padding, and font size of the SelectTrigger",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Default value of the select (uncontrolled component)",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled value of the select (controlled component)",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback fired when the selected value changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the entire select",
        },
        {
          name: "name",
          type: "string",
          description: "Field name for HTML forms",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Marks the select as required in forms",
        },
        {
          name: "dir",
          type: '"ltr" | "rtl"',
          default: '"ltr"',
          description: "Text direction (left-to-right or right-to-left)",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "Sizes Comparison",
          description: "Side-by-side comparison of all four SelectTrigger sizes",
          preview: (
            <div className="flex flex-wrap items-end gap-3 max-w-2xl">
              <div className="grid gap-1.5">
                <Label className="text-xs">Small</Label>
                <Select>
                  <SelectTrigger size="sm" className="w-40">
                    <SelectValue placeholder="sm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Default</Label>
                <Select>
                  <SelectTrigger size="default" className="w-40">
                    <SelectValue placeholder="default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Large</Label>
                <Select>
                  <SelectTrigger size="lg" className="w-40">
                    <SelectValue placeholder="lg" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Extra Large</Label>
                <Select>
                  <SelectTrigger size="xl" className="w-40">
                    <SelectValue placeholder="xl" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ),
          code: `<SelectTrigger size="sm">...</SelectTrigger>
<SelectTrigger size="default">...</SelectTrigger>
<SelectTrigger size="lg">...</SelectTrigger>
<SelectTrigger size="xl">...</SelectTrigger>`,
        },
        {
          title: "With Label",
          description: "Select with descriptive label and helper text",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue="us">
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose the country for your billing address
              </p>
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="country">Country</Label>
  <Select defaultValue="us">
    <SelectTrigger id="country">
      <SelectValue placeholder="Select your country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-sm text-muted-foreground">
    Choose the country for your billing address
  </p>
</div>`
        },
        {
          title: "Disabled",
          description: "Select in disabled state",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="disabled">Disabled Select</Label>
              <Select disabled>
                <SelectTrigger id="disabled">
                  <SelectValue placeholder="Cannot select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ),
          code: `<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Cannot select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>`
        },
        {
          title: "With Groups",
          description: "Select with grouped options using SelectGroup",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="est">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Europe</SelectLabel>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                    <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ),
          code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time</SelectItem>
      <SelectItem value="cst">Central Standard Time</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
      <SelectItem value="cet">Central European Time</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`
        },
        {
          title: "With Icons",
          description: "Select items with decorative icons",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="location">Location Type</Label>
              <Select defaultValue="office">
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>Office</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="remote">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Remote</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hybrid">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Hybrid</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ),
          code: `import { Building2, Globe, MapPin } from "lucide-react";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select location" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="office">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        <span>Office</span>
      </div>
    </SelectItem>
    <SelectItem value="remote">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <span>Remote</span>
      </div>
    </SelectItem>
  </SelectContent>
</Select>`
        },
        {
          title: "Form Integration",
          description: "Select integrated in a complete form",
          preview: (
            <form className="grid gap-4 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-2">
                <Label htmlFor="payment">Payment Method *</Label>
                <Select defaultValue="card" required>
                  <SelectTrigger id="payment">
                    <SelectValue placeholder="Choose payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="billing">Billing Cycle *</Label>
                <Select defaultValue="monthly" required>
                  <SelectTrigger id="billing">
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly ($9.99/mo)</SelectItem>
                    <SelectItem value="quarterly">Quarterly ($8.99/mo)</SelectItem>
                    <SelectItem value="yearly">Yearly ($7.99/mo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Continue to Payment
              </button>
            </form>
          ),
          code: `<form onSubmit={handleSubmit}>
  <div className="grid gap-2">
    <Label htmlFor="payment">Payment Method *</Label>
    <Select defaultValue="card" required>
      <SelectTrigger id="payment">
        <SelectValue placeholder="Choose payment method" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="card">Credit Card</SelectItem>
        <SelectItem value="paypal">PayPal</SelectItem>
        <SelectItem value="bank">Bank Transfer</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <button type="submit">Continue</button>
</form>`
        },
        {
          title: "Scrollable Content",
          description: "Select with many options (internal scroll)",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="year">Birth Year</Label>
              <Select defaultValue="1990">
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => {
                    const year = 2024 - i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          ),
          code: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select year" />
  </SelectTrigger>
  <SelectContent>
    {Array.from({ length: 50 }, (_, i) => {
      const year = 2024 - i;
      return (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      );
    })}
  </SelectContent>
</Select>`
        },
        {
          title: "Controlled Component",
          description: "Select as a controlled component with state",
          preview: (
            <div className="grid gap-4 max-w-sm">
              <div className="grid gap-2">
                <Label htmlFor="controlled">Controlled Select</Label>
                <Select 
                  defaultValue="option1"
                  onValueChange={(value) => console.log('Selected:', value)}
                >
                  <SelectTrigger id="controlled">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Check console for selected value
              </p>
            </div>
          ),
          code: `import { useState } from "react";

function ControlledSelect() {
  const [value, setValue] = useState("option1");
  
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}`
        },
        {
          title: "Error State",
          description: "Select with error state and validation message",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="error">Category *</Label>
              <Select>
                <SelectTrigger 
                  id="error"
                  className="border-destructive focus:ring-destructive"
                >
                  <SelectValue placeholder="Please select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-destructive">
                Category is required
              </p>
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="error">Category *</Label>
  <Select>
    <SelectTrigger 
      id="error"
      className="border-destructive focus:ring-destructive"
    >
      <SelectValue placeholder="Please select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="electronics">Electronics</SelectItem>
      <SelectItem value="clothing">Clothing</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-sm text-destructive">
    Category is required
  </p>
</div>`
        }
      ]}
    />
  );
}