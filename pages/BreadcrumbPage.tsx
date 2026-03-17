import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Home } from "lucide-react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage as BreadcrumbPageItem, 
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from "../components/ui/breadcrumb";

export function BreadcrumbPage() {
  return (
    <ComponentShowcase
      title="Breadcrumb"
      description="Displays the path to the current resource using a hierarchy of links. Construye breadcrumbs usando BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator y BreadcrumbPage."
      category="Navigation"
      
      // Main Preview
      preview={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPageItem>Breadcrumb</BreadcrumbPageItem>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      
      // Main Code
      code={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}
      
      // Props Documentation
      props={[
        {
          name: "href",
          type: "string",
          description: "URL for the BreadcrumbLink.",
        },
        {
          name: "asChild",
          type: "boolean",
          description: "Use custom link component (e.g. Next.js Link).",
        }
      ]}
      
      // Examples
      examples={[
        {
          title: "With Home Icon",
          description: "Replace the 'Home' text with a Home icon for a cleaner, more compact look.",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()} className="flex items-center">
                    <Home className="size-4" />
                    <span className="sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPageItem>Breadcrumb</BreadcrumbPageItem>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `import { Home } from "lucide-react"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" className="flex items-center">
        <Home className="size-4" />
        <span className="sr-only">Home</span>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
        },
        {
          title: "Multi-level",
          description: "Breadcrumb with deeper hierarchy.",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Electronics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPageItem>Laptops</BreadcrumbPageItem>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Electronics</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Laptops</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
        },
        {
          title: "Collapsed",
          description: "Breadcrumb with ellipsis for responsive layouts.",
          preview: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuItem>Resources</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPageItem>Breadcrumb</BreadcrumbPageItem>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
          code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BreadcrumbEllipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Documentation</DropdownMenuItem>
          <DropdownMenuItem>Themes</DropdownMenuItem>
          <DropdownMenuItem>Resources</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#" onClick={(e: React.MouseEvent) => e.preventDefault()}>Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
        }
      ]}
    />
  );
}