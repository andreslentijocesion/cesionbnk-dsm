import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../components/ui/Resizable';

const meta: Meta = {
  title: 'DSM/Components/Resizable',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Horizontal: StoryObj = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-52 rounded-lg border">
      <ResizablePanel defaultSize={65}>
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
          Panel principal (tabla de operaciones)
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35}>
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
          Panel lateral (detalle / filtros)
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="min-h-80 rounded-lg border">
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
          KPIs y resumen
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
          Tabla detalle
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: StoryObj = {
  name: 'Factoring — Three Panels',
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-64 rounded-lg border">
      <ResizablePanel defaultSize={20}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-foreground">Filtros</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={55}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-foreground">Tabla de operaciones</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-4 text-xs text-muted-foreground">Detalle</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
