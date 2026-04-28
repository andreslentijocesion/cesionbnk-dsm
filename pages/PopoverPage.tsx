import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/Popover";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export function PopoverPage() {
  return (
    <ComponentShowcase
      title="Popover"
      description="Displays rich content in a portal, triggered by a button."
      category="Feedback"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium">Popover Title</h4>
              <p className="text-sm text-muted-foreground">
                This is a simple popover with some content.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      }
      
      // Main Code
      code={`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a simple popover with some content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "modal",
          type: "boolean",
          default: "false",
          description: "Whether the popover is modal.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "With Form",
          description: "Popover containing a form.",
          preview: (
            <Popover>
              <PopoverTrigger asChild>
                <Button>Update dimensions</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" placeholder="100%" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" placeholder="25px" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `<Popover>
  <PopoverTrigger asChild>
    <Button>Update dimensions</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      {/* Form fields */}
    </div>
  </PopoverContent>
</Popover>`
        }
      ]}
    />
  );
}