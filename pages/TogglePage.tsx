import { ComponentShowcase } from "../components/ui/component-showcase";
import { Toggle } from "../components/ui/toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Strikethrough, Code, List, ListOrdered, Quote } from "lucide-react";

export function TogglePage() {
  return (
    <ComponentShowcase
      title="Toggle"
      description="A two-state button that can be either on or off."
      category="Actions"
      
      // Main Preview
      preview={
        <div className="flex flex-wrap gap-4">
          <Toggle aria-label="Toggle default">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle outline">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle defaultPressed aria-label="Toggle pressed">
            <Underline className="h-4 w-4" />
          </Toggle>
          <Toggle disabled aria-label="Toggle disabled">
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </div>
      }
      
      // Main Code
      code={`import { Toggle } from "@/components/ui/toggle";
import { Italic, Bold, Underline } from "lucide-react";

export function ToggleDemo() {
  return (
    <div className="flex gap-4">
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle defaultPressed aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "variant",
          type: '"default" | "outline"',
          default: '"default"',
          description: "Visual style of the toggle",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          default: '"default"',
          description: "Toggle size",
        },
        {
          name: "defaultPressed",
          type: "boolean",
          default: "false",
          description: "Initial toggle state (uncontrolled)",
        },
        {
          name: "pressed",
          type: "boolean",
          description: "Controlled toggle state",
        },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          description: "Callback when the state changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the toggle",
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible label (required)",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "Text Formatting Toolbar",
          description: "Common toolbar for text editors",
          preview: (
            <div className="flex gap-2">
              <Toggle aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle strikethrough">
                <Strikethrough className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Toggle code">
                <Code className="h-4 w-4" />
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline, Strikethrough, Code } from "lucide-react";

export function TextFormattingToolbar() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle strikethrough">
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle code">
        <Code className="h-4 w-4" />
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "Outline Variants",
          description: "Toggle with outline variant in all sizes",
          preview: (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Toggle variant="outline" size="sm" aria-label="Small outline">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Default outline">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle variant="outline" size="lg" aria-label="Large outline">
                  <Underline className="h-5 w-5" />
                </Toggle>
              </div>
              <div className="flex gap-4">
                <Toggle variant="outline" aria-label="Outline with text">
                  <Italic className="mr-2 h-4 w-4" />
                  Italic
                </Toggle>
                <Toggle variant="outline" defaultPressed aria-label="Outline pressed">
                  <Bold className="mr-2 h-4 w-4" />
                  Bold
                </Toggle>
                <Toggle variant="outline" disabled aria-label="Outline disabled">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Italic, Bold, Underline } from "lucide-react";

export function OutlineToggles() {
  return (
    <div className="flex flex-col gap-4">
      {/* Sizes */}
      <div className="flex gap-4">
        <Toggle variant="outline" size="sm">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle variant="outline">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle variant="outline" size="lg">
          <Underline className="h-5 w-5" />
        </Toggle>
      </div>
      
      {/* With text and states */}
      <div className="flex gap-4">
        <Toggle variant="outline">
          <Italic className="mr-2 h-4 w-4" />
          Italic
        </Toggle>
        <Toggle variant="outline" defaultPressed>
          <Bold className="mr-2 h-4 w-4" />
          Bold
        </Toggle>
      </div>
    </div>
  );
}`,
        },
        {
          title: "Sizes",
          description: "Different available sizes for the toggle",
          preview: (
            <div className="flex items-center gap-4">
              <Toggle size="sm" aria-label="Small toggle">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle size="default" aria-label="Default toggle">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle size="lg" aria-label="Large toggle">
                <Bold className="h-5 w-5" />
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

export function ToggleSizes() {
  return (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "With Text",
          description: "Toggle with icon and text combined",
          preview: (
            <div className="flex flex-wrap gap-4">
              <Toggle aria-label="Toggle italic">
                <Italic className="mr-2 h-4 w-4" />
                Italic
              </Toggle>
              <Toggle variant="outline" aria-label="Toggle bold">
                <Bold className="mr-2 h-4 w-4" />
                Bold
              </Toggle>
              <Toggle aria-label="Toggle underline">
                <Underline className="mr-2 h-4 w-4" />
                Underline
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Italic, Bold, Underline } from "lucide-react";

export function ToggleWithText() {
  return (
    <div className="flex gap-4">
      <Toggle aria-label="Toggle italic">
        <Italic className="mr-2 h-4 w-4" />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <Bold className="mr-2 h-4 w-4" />
        Bold
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="mr-2 h-4 w-4" />
        Underline
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "Alignment Controls",
          description: "Toggle for text alignment controls",
          preview: (
            <div className="flex gap-2">
              <Toggle aria-label="Align left" defaultPressed>
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function AlignmentControls() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Align left" defaultPressed>
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "List Controls",
          description: "Toggle for list controls",
          preview: (
            <div className="flex gap-2">
              <Toggle variant="outline" aria-label="Unordered list">
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Ordered list">
                <ListOrdered className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Quote">
                <Quote className="h-4 w-4" />
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { List, ListOrdered, Quote } from "lucide-react";

export function ListControls() {
  return (
    <div className="flex gap-2">
      <Toggle variant="outline" aria-label="Unordered list">
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Ordered list">
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Quote">
        <Quote className="h-4 w-4" />
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "Disabled States",
          description: "Toggle in disabled states",
          preview: (
            <div className="flex flex-wrap gap-4">
              <Toggle disabled aria-label="Disabled off">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle disabled defaultPressed aria-label="Disabled pressed">
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" disabled aria-label="Outline disabled">
                <Underline className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" disabled defaultPressed aria-label="Outline disabled pressed">
                <Strikethrough className="h-4 w-4" />
              </Toggle>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";

export function DisabledToggles() {
  return (
    <div className="flex gap-4">
      <Toggle disabled aria-label="Disabled">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle disabled defaultPressed aria-label="Disabled pressed">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" disabled aria-label="Outline disabled">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}`,
        },
        {
          title: "Controlled State",
          description: "Toggle with controlled state using React state",
          preview: (
            <div className="flex flex-col gap-4">
              <Toggle aria-label="Toggle bold">
                <Bold className="mr-2 h-4 w-4" />
                Bold
              </Toggle>
              <p className="text-muted-foreground">
                Use the <code className="text-xs bg-muted px-1 py-0.5 rounded">pressed</code> and{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">onPressedChange</code> props to control the state
              </p>
            </div>
          ),
          code: `import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";
import { useState } from "react";

export function ControlledToggle() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle bold"
      >
        <Bold className="mr-2 h-4 w-4" />
        Bold
      </Toggle>
      
      <p className="text-sm text-muted-foreground">
        State: {pressed ? "Pressed" : "Not pressed"}
      </p>
    </div>
  );
}`,
        },
      ]}
    />
  );
}