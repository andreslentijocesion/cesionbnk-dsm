import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../components/ui/Drawer";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Menu, User } from "lucide-react";
import { Separator } from "../components/ui/Separator";

export function DrawerPage() {
  return (
    <ComponentShowcase
      title="Drawer"
      description="Slidable panel from the screen edges, ideal for mobile."
      category="Feedback"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Menu className="size-4 mr-2" />
              Open Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Adjust your preferences</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Notifications</span>
                <Badge variant="success-soft-outline">Enabled</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dark mode</span>
                <Badge variant="outline">Auto</Badge>
              </div>
            </div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      }
      
      // Main Code
      code={`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "shouldScaleBackground",
          type: "boolean",
          default: "false",
          description: "Whether the background should scale when the drawer is open.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "Profile Example",
          description: "Example of a profile drawer.",
          preview: (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">View Profile</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Your Profile</DrawerTitle>
                  <DrawerDescription>Your account information</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-6">
                  <div className="flex items-center gap-4">
                    <User className="size-10 p-2 bg-muted rounded-full" />
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ),
          code: `<Drawer>
  {/* ... */}
  <DrawerContent>
    <div className="px-4 py-6">
      {/* Profile info */}
    </div>
  </DrawerContent>
</Drawer>`
        }
      ]}
    />
  );
}