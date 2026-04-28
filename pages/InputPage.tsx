import { ComponentShowcase } from "../components/ui/component-showcase";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Mail, Search, User, CreditCard } from "lucide-react";

export function InputPage() {
  return (
    <ComponentShowcase
      title="Input"
      description="Displays a form input field or a component that looks like an input field. Supports four size variants: sm, default, lg, and xl."
      category="Forms"
      atomicLevel="Atom"
      
      preview={
        <div className="grid gap-6 max-w-md">
          {/* Size Variants */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Size Variants</p>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">sm</span>
                <Input size="sm" placeholder="Small input" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">default</span>
                <Input size="default" placeholder="Default input" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">lg</span>
                <Input size="lg" placeholder="Large input" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16 shrink-0 text-right">xl</span>
                <Input size="xl" placeholder="Extra large input" />
              </div>
            </div>
          </div>

          {/* Types */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Input Types</p>
            <div className="grid gap-3">
              <Input type="text" placeholder="Text input" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Input type="number" placeholder="Number" />
              <Input type="tel" placeholder="Phone" />
              <Input type="url" placeholder="URL" />
            </div>
          </div>
        </div>
      }
      
      code={`import { Input } from "@/components/ui/input";

// Size variants
<Input size="sm" placeholder="Small" />
<Input size="default" placeholder="Default" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />

// Types
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />`}
      
      props={[
        {
          name: "size",
          type: '"sm" | "default" | "lg" | "xl"',
          default: '"default"',
          description: "Controls the height, padding, and font size of the input",
        },
        {
          name: "type",
          type: '"text" | "email" | "password" | "number" | "tel" | "url" | "date" | "time" | "file" | ...',
          default: '"text"',
          description: "Native HTML input type",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when the input is empty",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the input and prevents interaction",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled input value (controlled component)",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Initial input value (uncontrolled component)",
        },
        {
          name: "onChange",
          type: "(e: ChangeEvent<HTMLInputElement>) => void",
          description: "Callback fired when the value changes",
        },
        {
          name: "onBlur",
          type: "(e: FocusEvent<HTMLInputElement>) => void",
          description: "Callback fired when the input loses focus",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes for the input",
        },
        {
          name: "id",
          type: "string",
          description: "Input ID (useful for associating with Label)",
        },
        {
          name: "required",
          type: "boolean",
          default: "false",
          description: "Marks the input as required in HTML forms",
        },
      ]}
      
      examples={[
        {
          title: "Sizes Comparison",
          description: "Side-by-side comparison of all four input sizes",
          preview: (
            <div className="flex flex-wrap items-end gap-3 max-w-2xl">
              <div className="grid gap-1.5">
                <Label className="text-xs">Small</Label>
                <Input size="sm" placeholder="sm" className="w-40" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Default</Label>
                <Input size="default" placeholder="default" className="w-40" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Large</Label>
                <Input size="lg" placeholder="lg" className="w-40" />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs">Extra Large</Label>
                <Input size="xl" placeholder="xl" className="w-40" />
              </div>
            </div>
          ),
          code: `<Input size="sm" placeholder="sm" />
<Input size="default" placeholder="default" />
<Input size="lg" placeholder="lg" />
<Input size="xl" placeholder="xl" />`,
        },
        {
          title: "With Label",
          description: "Input with label and helper text",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
              <p className="text-sm text-muted-foreground">
                We'll never share your email with anyone else.
              </p>
            </div>
          ),
          code: `import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="grid gap-2 max-w-sm">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
  <p className="text-sm text-muted-foreground">
    We'll never share your email with anyone else.
  </p>
</div>`
        },
        {
          title: "Disabled",
          description: "Input in disabled state",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" disabled placeholder="Disabled input" />
            </div>
          ),
          code: `<Input disabled placeholder="Disabled input" />`
        },
        {
          title: "With Icon Prefix (all sizes)",
          description: "Input with leading icon adapts icon position per size",
          preview: (
            <div className="grid gap-4 max-w-sm">
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input size="sm" placeholder="Small with icon" className="pl-8" type="email" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input size="default" placeholder="Default with icon" className="pl-10" type="email" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input size="lg" placeholder="Large with icon" className="pl-10" type="email" />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input size="xl" placeholder="XL with icon" className="pl-12" type="email" />
              </div>
            </div>
          ),
          code: `// Small
<div className="relative">
  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
  <Input size="sm" placeholder="Small" className="pl-8" />
</div>

// Default
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Default" className="pl-10" />
</div>

// Large
<div className="relative">
  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input size="lg" placeholder="Large" className="pl-10" />
</div>

// XL
<div className="relative">
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
  <Input size="xl" placeholder="XL" className="pl-12" />
</div>`
        },
        {
          title: "With Icon Suffix",
          description: "Input with trailing icon",
          preview: (
            <div className="grid gap-4 max-w-sm">
              <div className="relative">
                <Input placeholder="Search..." className="pr-10" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="relative">
                <Input placeholder="Username" className="pr-10" />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ),
          code: `import { Search } from "lucide-react";

<div className="relative">
  <Input placeholder="Search..." className="pr-10" />
  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
</div>`
        },
        {
          title: "Error State",
          description: "Input with error state and message",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="error">Username</Label>
              <Input 
                id="error" 
                placeholder="Enter username"
                className="border-destructive focus-visible:ring-destructive"
              />
              <p className="text-sm text-destructive">
                Username is required
              </p>
            </div>
          ),
          code: `<div className="grid gap-2 max-w-sm">
  <Label htmlFor="error">Username</Label>
  <Input 
    id="error" 
    placeholder="Enter username"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p className="text-sm text-destructive">
    Username is required
  </p>
</div>`
        },
        {
          title: "Success State",
          description: "Input with success state",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="success">Email</Label>
              <Input 
                id="success" 
                type="email"
                placeholder="you@example.com"
                className="border-primary focus-visible:ring-primary"
                defaultValue="user@example.com"
              />
              <p className="text-sm text-primary">
                Email is valid
              </p>
            </div>
          ),
          code: `<Input 
  className="border-primary focus-visible:ring-primary"
  defaultValue="user@example.com"
/>`
        },
        {
          title: "File Upload",
          description: "File type input for uploading files",
          preview: (
            <div className="grid gap-2 max-w-sm">
              <Label htmlFor="file">Upload File</Label>
              <Input id="file" type="file" />
            </div>
          ),
          code: `<div className="grid gap-2 max-w-sm">
  <Label htmlFor="file">Upload File</Label>
  <Input id="file" type="file" />
</div>`
        },
        {
          title: "Date and Time",
          description: "Date, time, and datetime-local type inputs",
          preview: (
            <div className="grid gap-4 max-w-sm">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="datetime">Date & Time</Label>
                <Input id="datetime" type="datetime-local" />
              </div>
            </div>
          ),
          code: `<Input type="date" />
<Input type="time" />
<Input type="datetime-local" />`
        },
        {
          title: "With Validation Patterns",
          description: "Inputs with native HTML5 validation",
          preview: (
            <div className="grid gap-4 max-w-sm">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (US Format)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card">Credit Card</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="card" 
                    type="text" 
                    pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                    placeholder="1234-5678-9012-3456"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          ),
          code: `<Input 
  type="tel" 
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
  placeholder="123-456-7890"
/>`
        },
        {
          title: "Form Integration",
          description: "Full example of input in a form with validation",
          preview: (
            <form className="grid gap-4 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-2">
                <Label htmlFor="form-email">Email *</Label>
                <Input 
                  id="form-email" 
                  type="email" 
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="form-password">Password *</Label>
                <Input 
                  id="form-password" 
                  type="password" 
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters
                </p>
              </div>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Submit
              </button>
            </form>
          ),
          code: `<form onSubmit={handleSubmit}>
  <div className="grid gap-2">
    <Label htmlFor="email">Email *</Label>
    <Input 
      id="email" 
      type="email" 
      required
    />
  </div>
  <div className="grid gap-2">
    <Label htmlFor="password">Password *</Label>
    <Input 
      id="password" 
      type="password" 
      required
      minLength={8}
    />
  </div>
  <button type="submit">Submit</button>
</form>`
        }
      ]}
    />
  );
}