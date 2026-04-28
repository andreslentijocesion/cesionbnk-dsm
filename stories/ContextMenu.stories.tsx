import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from '../components/ui/ContextMenu';

const meta: Meta = {
  title: 'DSM/Components/ContextMenu',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground cursor-context-menu">
        Click derecho aquí
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>Ver detalle <ContextMenuShortcut>⌘↵</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuItem>Editar operación</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Cambiar estado</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Aprobar</ContextMenuItem>
            <ContextMenuItem>En análisis</ContextMenuItem>
            <ContextMenuItem>Rechazar</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Eliminar</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
