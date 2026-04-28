import { ComponentShowcase } from "../components/ui/component-showcase";
import { Separator } from "../components/ui/separator";

export function SeparatorPage() {
  return (
    <ComponentShowcase
      title="Separator"
      description="Visually or semantically separates content."
      category="Data Display"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <div className="w-full max-w-md">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
            <p className="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      }
      
      // Main Code
      code={`import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Orientation of the separator.",
        },
        {
          name: "decorative",
          type: "boolean",
          default: "true",
          description: "Whether the separator is decorative (removes from accessibility tree).",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Horizontal Separator",
          description: "Default horizontal divider.",
          preview: (
            <div className="w-full max-w-md">
              <p className="text-sm">Content above separator</p>
              <Separator className="my-4" />
              <p className="text-sm">Content below separator</p>
            </div>
          ),
          code: `<Separator className="my-4" />`
        },
        {
          title: "Vertical Separator",
          description: "Vertical divider for inline content.",
          preview: (
            <div className="flex h-20 items-center space-x-4">
              <div className="text-sm">Item 1</div>
              <Separator orientation="vertical" />
              <div className="text-sm">Item 2</div>
              <Separator orientation="vertical" />
              <div className="text-sm">Item 3</div>
            </div>
          ),
          code: `<Separator orientation="vertical" />`
        },
        {
          title: "With Content",
          description: "Separator in a real layout.",
          preview: (
            <div className="w-full max-w-md space-y-4">
              <div>
                <h3 className="font-semibold">Section Title</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is some content in the first section.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">Another Section</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is content in the second section.
                </p>
              </div>
            </div>
          ),
          code: `<Separator />`
        }
      ]}
    />
  );
}