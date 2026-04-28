import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/Sheet";
import { Button } from "../components/ui/Button";

export function SheetPage() {
  return (
    <ComponentShowcase
      title="Sheet"
      description="Extends the Dialog component to display content that slides in from the edge of the screen."
      category="Feedback"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {/* Content */}
              <div className="h-20 bg-muted rounded-md border border-dashed flex items-center justify-center text-muted-foreground text-sm">
                Sheet Content
              </div>
            </div>
          </SheetContent>
        </Sheet>
      }
      
      // Main Code
      code={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "side",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"right"',
          description: "The edge of the screen from which the sheet slides in.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Sheet Sides",
          description: "Sheets can slide from different sides.",
          preview: (
            <div className="flex flex-wrap gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Top</Button>
                </SheetTrigger>
                <SheetContent side="top">
                  <SheetHeader>
                    <SheetTitle>Top Sheet</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Right</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Right Sheet</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom Sheet</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Left</Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Left Sheet</SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          ),
          code: `<Sheet>
  <SheetTrigger>Top</SheetTrigger>
  <SheetContent side="top">...</SheetContent>
</Sheet>

<Sheet>
  <SheetTrigger>Right</SheetTrigger>
  <SheetContent side="right">...</SheetContent>
</Sheet>

{/* ... etc */}`
        }
      ]}
    />
  );
}