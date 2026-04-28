import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { MoreHorizontal, Eye, Edit, Copy, Trash2, Download, CheckCircle, XCircle } from 'lucide-react';

const meta: Meta = { title: 'DSM/Components/DropdownMenu', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Opciones</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Ver detalle</DropdownMenuItem>
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const RowActions: Story = {
  name: 'Patrón — Acciones de fila (tabla)',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Acciones">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>FAC-2025-00123</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><Eye className="size-4" />Ver detalle</DropdownMenuItem>
        <DropdownMenuItem><Edit className="size-4" />Editar</DropdownMenuItem>
        <DropdownMenuItem><Copy className="size-4" />Duplicar</DropdownMenuItem>
        <DropdownMenuItem><Download className="size-4" />Exportar PDF</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><CheckCircle className="size-4" />Aprobar</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <XCircle className="size-4" />Rechazar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="size-4" />Eliminar
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
