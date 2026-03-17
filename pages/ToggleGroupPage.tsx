import { ComponentShowcase } from "../components/ui/component-showcase";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  List,
  ListOrdered,
  Grid,
  LayoutGrid,
  Table,
  MonitorSmartphone,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { Separator } from "../components/ui/separator";

export function ToggleGroupPage() {
  return (
    <ComponentShowcase
      title="Toggle Group"
      description="A set of two-state buttons that can be toggled on or off, supporting both single and multiple selection modes."
      category="Actions"
      
      // Main Preview
      preview={
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Single Selection</span>
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">Multiple Selection</span>
            <ToggleGroup type="multiple" defaultValue={["bold"]}>
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      }
      
      // Main Code
      code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export function ToggleGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Single Selection */}
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      {/* Multiple Selection */}
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "type",
          type: '"single" | "multiple"',
          description: "Group selection mode",
          required: true,
        },
        {
          name: "variant",
          type: '"default" | "outline"',
          default: '"default"',
          description: "Visual style of the group",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          default: '"default"',
          description: "Size of the group items",
        },
        {
          name: "value",
          type: "string | string[]",
          description: "Controlled value (string for single, array for multiple)",
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          description: "Initial uncontrolled value",
        },
        {
          name: "onValueChange",
          type: "(value: string | string[]) => void",
          description: "Callback when the selection changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the entire group",
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
          title: "Text Alignment Controls",
          description: "Text alignment controls with single selection",
          preview: (
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Align justify">
                <AlignJustify className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export function AlignmentControls() {
  return (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`,
        },
        {
          title: "Text Formatting Toolbar",
          description: "Multiple text formats with multiple selection",
          preview: (
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                <Strikethrough className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";

export function TextFormattingToolbar() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Strikethrough className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`,
        },
        {
          title: "Outline Variant",
          description: "Toggle group with outline variant",
          preview: (
            <div className="flex flex-col gap-4">
              <ToggleGroup type="single" variant="outline" defaultValue="grid">
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Table view">
                  <Table className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ToggleGroup type="single" variant="outline" defaultValue="center">
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, LayoutGrid, Table } from "lucide-react";

export function OutlineVariant() {
  return (
    <div className="flex flex-col gap-4">
      {/* With Icons */}
      <ToggleGroup type="single" variant="outline" defaultValue="grid">
        <ToggleGroupItem value="list">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid">
          <LayoutGrid className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="table">
          <Table className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      {/* With Text */}
      <ToggleGroup type="single" variant="outline">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
        },
        {
          title: "With Text Labels",
          description: "Toggle group items with text instead of just icons",
          preview: (
            <ToggleGroup type="single" defaultValue="list">
              <ToggleGroupItem value="list">List View</ToggleGroupItem>
              <ToggleGroupItem value="grid">Grid View</ToggleGroupItem>
              <ToggleGroupItem value="table">Table View</ToggleGroupItem>
            </ToggleGroup>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TextLabels() {
  return (
    <ToggleGroup type="single" defaultValue="list">
      <ToggleGroupItem value="list">List View</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid View</ToggleGroupItem>
      <ToggleGroupItem value="table">Table View</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
        },
        {
          title: "With Text and Icons",
          description: "Combination of text and icons for better UX",
          preview: (
            <ToggleGroup type="single" variant="outline" defaultValue="desktop">
              <ToggleGroupItem value="desktop" aria-label="Desktop view">
                <Monitor className="mr-2 h-4 w-4" />
                Desktop
              </ToggleGroupItem>
              <ToggleGroupItem value="tablet" aria-label="Tablet view">
                <Tablet className="mr-2 h-4 w-4" />
                Tablet
              </ToggleGroupItem>
              <ToggleGroupItem value="mobile" aria-label="Mobile view">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </ToggleGroupItem>
            </ToggleGroup>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export function TextAndIcons() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="desktop">
      <ToggleGroupItem value="desktop" aria-label="Desktop view">
        <Monitor className="mr-2 h-4 w-4" />
        Desktop
      </ToggleGroupItem>
      <ToggleGroupItem value="tablet" aria-label="Tablet view">
        <Tablet className="mr-2 h-4 w-4" />
        Tablet
      </ToggleGroupItem>
      <ToggleGroupItem value="mobile" aria-label="Mobile view">
        <Smartphone className="mr-2 h-4 w-4" />
        Mobile
      </ToggleGroupItem>
    </ToggleGroup>
  );
}`,
        },
        {
          title: "Size Variants",
          description: "Different available sizes",
          preview: (
            <div className="flex flex-col gap-4">
              <ToggleGroup type="single" size="sm" defaultValue="center">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ToggleGroup type="single" size="default" defaultValue="center">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ToggleGroup type="single" size="lg" defaultValue="center">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-5 w-5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-5 w-5" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function SizeVariants() {
  return (
    <div className="flex flex-col gap-4">
      {/* Small */}
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      {/* Default */}
      <ToggleGroup type="single" size="default">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      {/* Large */}
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
        },
        {
          title: "Disabled State",
          description: "Toggle group in disabled state",
          preview: (
            <div className="flex flex-col gap-4">
              <ToggleGroup type="single" disabled defaultValue="center">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ToggleGroup type="multiple" disabled defaultValue={["bold", "italic"]}>
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function DisabledState() {
  return (
    <div className="flex flex-col gap-4">
      {/* Single disabled */}
      <ToggleGroup type="single" disabled defaultValue="center">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      {/* Multiple disabled */}
      <ToggleGroup type="multiple" disabled defaultValue={["bold", "italic"]}>
        <ToggleGroupItem value="bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
        },
        {
          title: "Complete Text Editor Toolbar",
          description: "Combination of alignment and formatting in a complete toolbar",
          preview: (
            <div className="flex flex-wrap gap-2">
              <ToggleGroup type="single" defaultValue="left">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Separator orientation="vertical" className="h-9" />
              
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Separator orientation="vertical" className="h-9" />
              
              <ToggleGroup type="single">
                <ToggleGroupItem value="bullet" aria-label="Bullet list">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="numbered" aria-label="Numbered list">
                  <ListOrdered className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          ),
          code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline, 
  List,
  ListOrdered
} from "lucide-react";

export function TextEditorToolbar() {
  return (
    <div className="flex gap-2">
      {/* Alignment */}
      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Separator orientation="vertical" className="h-9" />
      
      {/* Formatting */}
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <Separator orientation="vertical" className="h-9" />
      
      {/* Lists */}
      <ToggleGroup type="single">
        <ToggleGroupItem value="bullet">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="numbered">
          <ListOrdered className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}`,
        },
      ]}
    />
  );
}