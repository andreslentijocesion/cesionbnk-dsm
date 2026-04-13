import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarRail, SidebarInset, SidebarTrigger,
} from "../components/ui/sidebar";
import {
  BookOpen, Bot, ChevronRight, ChevronsUpDown, Inbox, Calendar, Search,
  PanelLeft, GalleryVerticalEnd, AudioWaveform, Sparkles, Settings2,
  Terminal, Frame, PieChart, Map, LifeBuoy,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";

function StandardSidebar() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm bg-background h-[500px] relative isolate">
      <SidebarProvider className="min-h-[500px]">
        <Sidebar collapsible="icon" className="absolute top-0 bottom-0 left-0 h-full border-r z-20">
          <SidebarHeader>
            <SidebarMenu><SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><GalleryVerticalEnd className="size-4" /></div>
                  <div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Acme Inc</span><span className="truncate text-xs">Enterprise</span></div>
                  <ChevronsUpDown className="ml-auto" />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem></SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip="Playground"><Terminal /><span>Playground</span><ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /></SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem><SidebarMenuSubButton asChild><a href="#">History</a></SidebarMenuSubButton></SidebarMenuSubItem>
                        <SidebarMenuSubItem><SidebarMenuSubButton asChild><a href="#">Starred</a></SidebarMenuSubButton></SidebarMenuSubItem>
                        <SidebarMenuSubItem><SidebarMenuSubButton asChild><a href="#">Settings</a></SidebarMenuSubButton></SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                <SidebarMenuItem><SidebarMenuButton tooltip="Models"><Bot /><span>Models</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip="Documentation"><BookOpen /><span>Documentation</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip="Settings"><Settings2 /><span>Settings</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton><Frame /><span>Design Engineering</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton><PieChart /><span>Sales & Marketing</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton><Map /><span>Travel</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu><SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="h-8 w-8 rounded-lg"><AvatarFallback className="rounded-lg">CN</AvatarFallback></Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">shadcn</span><span className="truncate text-xs">m@example.com</span></div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem></SidebarMenu>
          </SidebarFooter>
          <SidebarRail className="hover:after:bg-border" />
        </Sidebar>
        <SidebarInset className="overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb><BreadcrumbList>
              <BreadcrumbItem className="hidden md:block"><BreadcrumbLink href="#">Building Your Application</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem><BreadcrumbPage>Data Fetching</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList></Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
              <div className="aspect-video rounded-xl bg-muted" />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export function SidebarShowcasePage() {
  return (
    <ComponentShowcase
      title="Sidebar"
      description="Composable, collapsible, and responsive sidebar component. Supports 3 variants (sidebar, floating, inset), 2 sides (left, right), 3 collapse modes (offcanvas, icon, none), nested menus with collapsible sub-items, team switcher, user menu, breadcrumbs, and SidebarRail for resize. Built on Radix primitives with full keyboard and screen reader support."
      category="Layout"
      atomicLevel="Organism"
      preview={<StandardSidebar />}
      code={`import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader,
  SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton, SidebarRail, SidebarInset, SidebarTrigger,
} from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup />
      <SidebarMenu />
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <header><SidebarTrigger /></header>
    <main />
  </SidebarInset>
</SidebarProvider>`}
      props={[
        { name: "side", type: '"left" | "right"', default: '"left"', description: "Which side the sidebar is positioned on." },
        { name: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "Visual style: attached, floating with borders, or inset." },
        { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "Collapse behavior: hide completely, icon-only, or fixed." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state (SidebarProvider)." },
        { name: "open", type: "boolean", description: "Controlled open state (SidebarProvider)." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes (SidebarProvider)." },
      ]}
      examples={[
        {
          title: "Floating Variant",
          description: "Adds margin and rounded corners to the sidebar for a floating effect.",
          preview: (
            <div className="border rounded-xl overflow-hidden shadow-sm bg-muted dark:bg-card h-[400px] relative isolate">
              <SidebarProvider className="min-h-[400px]">
                <Sidebar collapsible="icon" variant="floating" className="absolute top-0 bottom-0 left-0 h-full z-20">
                  <SidebarHeader><SidebarMenu><SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild><a href="#"><div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><AudioWaveform className="size-4" /></div><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Inc</span><span className="truncate text-xs">Startup</span></div></a></SidebarMenuButton>
                  </SidebarMenuItem></SidebarMenu></SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup><SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton><Inbox /><span>Inbox</span><Badge variant="outline" className="ml-auto text-xs">12</Badge></SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton><Calendar /><span>Calendar</span></SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton><Search /><span>Search</span></SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu></SidebarGroup>
                    <SidebarGroup className="mt-auto"><SidebarGroupContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton><LifeBuoy /><span>Help</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroupContent></SidebarGroup>
                  </SidebarContent>
                  <SidebarRail />
                </Sidebar>
                <SidebarInset className="bg-background rounded-tl-xl overflow-hidden m-2 border shadow-sm">
                  <header className="flex h-14 items-center gap-2 px-4 border-b"><SidebarTrigger /><Separator orientation="vertical" className="h-4" /><span className="font-medium">Floating Layout</span></header>
                  <div className="p-4"><div className="h-24 rounded-lg bg-muted border-2 border-dashed" /></div>
                </SidebarInset>
              </SidebarProvider>
            </div>
          ),
          code: `<Sidebar variant="floating" collapsible="icon">...</Sidebar>`,
        },
        {
          title: "Right Sidebar",
          description: "Sidebar positioned on the right side for property panels or configuration.",
          preview: (
            <div className="border rounded-xl overflow-hidden shadow-sm bg-background h-[350px] relative isolate">
              <SidebarProvider className="min-h-[350px]">
                <SidebarInset className="overflow-hidden">
                  <header className="flex h-14 items-center justify-between px-4 border-b z-10 relative"><span className="font-semibold">Main Content</span><SidebarTrigger /></header>
                  <div className="p-8 flex items-center justify-center text-muted-foreground"><p>Content area on the left</p></div>
                </SidebarInset>
                <Sidebar collapsible="icon" side="right" className="absolute top-0 bottom-0 right-0 h-full border-l z-20">
                  <SidebarHeader><SidebarMenu><SidebarMenuItem><SidebarMenuButton size="lg"><Settings2 /><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">Properties</span><span className="truncate text-xs">Configuration</span></div></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarHeader>
                  <SidebarContent><SidebarGroup><SidebarGroupLabel>Display</SidebarGroupLabel><SidebarMenu>
                    <SidebarMenuItem><SidebarMenuButton><PanelLeft /><span>Layout</span></SidebarMenuButton></SidebarMenuItem>
                    <SidebarMenuItem><SidebarMenuButton><Sparkles /><span>Effects</span></SidebarMenuButton></SidebarMenuItem>
                  </SidebarMenu></SidebarGroup></SidebarContent>
                  <SidebarRail />
                </Sidebar>
              </SidebarProvider>
            </div>
          ),
          code: `<Sidebar side="right" collapsible="icon">...</Sidebar>`,
        },
      ]}
    />
  );
}