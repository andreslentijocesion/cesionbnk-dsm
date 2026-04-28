import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from '../components/ui/sidebar';
import { Separator } from '../components/ui/separator';
import {
  LayoutDashboard, FileText, Briefcase, Users, UserCheck,
  Bell, BarChart2, Calculator, Settings, LogOut,
} from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/Sidebar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { label: 'Operaciones', icon: FileText, href: '#' },
  { label: 'Portafolio', icon: Briefcase, href: '#' },
];

const entitiesItems = [
  { label: 'Cedentes', icon: Users, href: '#' },
  { label: 'Deudores', icon: UserCheck, href: '#' },
];

const reportsItems = [
  { label: 'Alertas de vencimiento', icon: Bell, href: '#' },
  { label: 'Reporte de cartera', icon: BarChart2, href: '#' },
  { label: 'Calculadora', icon: Calculator, href: '#' },
];

export const Default: StoryObj = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary" />
            <span className="font-semibold text-sm">CesionBNK</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Entidades</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {entitiesItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Reportes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {reportsItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <Separator className="mb-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2 text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2 text-muted-foreground">
                  <LogOut className="h-4 w-4" />
                  <span>Salir</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="p-6 text-sm text-muted-foreground">
          Contenido principal aquí...
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
