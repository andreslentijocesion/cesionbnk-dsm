import { ComponentShowcase } from "../components/ui/component-showcase";
import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

export function ScrollAreaPage() {
  return (
    <ComponentShowcase
      title="Scroll Area"
      description="Augments native scroll functionality for custom, cross-browser styling."
      category="Layout"
      atomicLevel="Atom"
      
      // Main Preview
      preview={
        <ScrollArea className="h-72 w-full max-w-sm rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>
                <div className="text-sm">
                  Item {i + 1}
                </div>
                {i < 19 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      }
      
      // Main Code
      code={`import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "type",
          type: '"auto" | "always" | "scroll" | "hover"',
          default: '"hover"',
          description: "Controls when the scrollbar is visible.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Horizontal Scroll",
          description: "Scrollable area with horizontal orientation.",
          preview: (
            <ScrollArea className="w-full max-w-sm whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="shrink-0">
                    <div className="h-20 w-40 rounded-md border bg-muted flex items-center justify-center">
                      Item {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ),
          code: `<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {/* ... items */}
  </div>
</ScrollArea>`
        }
      ]}
    />
  );
}