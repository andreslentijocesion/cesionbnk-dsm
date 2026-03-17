import { ComponentShowcase } from "../components/ui/component-showcase";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { ChevronDown } from "lucide-react";

export function DropdownMenuPage() {
  return (
    <ComponentShowcase
      title="Dropdown Menu"
      description="Displays a menu to the user triggered by a button or other element."
      category="Navigation"
      
      // Main Preview
      preview={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      
      // Main Code
      code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "modal",
          type: "boolean",
          default: "true",
          description: "Whether the dropdown is modal.",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "With Checkboxes",
          description: "Dropdown with selectable items.",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Preferences</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>View Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Status Bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>
                  Panel
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuCheckboxItem checked>Status Bar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`
        },
        {
          title: "Radio Group",
          description: "Dropdown with radio selection.",
          preview: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Position</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="bottom">
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
          code: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuRadioGroup value="bottom">
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`
        }
      ]}
    />
  );
}
