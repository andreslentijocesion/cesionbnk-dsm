import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Filter } from 'lucide-react';

const meta: Meta = { title: 'DSM/Components/Popover', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Contenido del popover. Puede contener cualquier elemento.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const FilterPopover: Story = {
  name: 'Patrón — Filtros avanzados',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="size-4" />Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Filtrar operaciones</h4>
            <p className="text-xs text-muted-foreground">Ajusta los filtros del portafolio.</p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="cedente-filter" className="text-xs">Cedente</Label>
              <Input id="cedente-filter" placeholder="Nombre o RUT..." className="h-8 text-sm" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="monto-min" className="text-xs">Monto mínimo</Label>
              <Input id="monto-min" type="number" placeholder="$ 0" className="h-8 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">Limpiar</Button>
            <Button size="sm" className="flex-1">Aplicar</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
