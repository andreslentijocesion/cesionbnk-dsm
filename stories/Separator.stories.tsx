import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components/ui/separator';

const meta: Meta = { title: 'DSM/Primitives/Separator', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 flex flex-col gap-3">
      <p className="text-sm font-medium">Sección A</p>
      <Separator />
      <p className="text-sm font-medium">Sección B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-sm">Portafolio</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Cedentes</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Reportes</span>
    </div>
  ),
};

export const InCard: Story = {
  name: 'Patrón — En ficha de datos',
  render: () => (
    <div className="border rounded-xl p-4 w-72 flex flex-col gap-3">
      <p className="text-sm font-semibold">FAC-2025-00123</p>
      <Separator />
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <span className="text-muted-foreground">Cedente</span><span>Constructora Sur</span>
        <span className="text-muted-foreground">Monto</span><span>$45.000.000</span>
        <span className="text-muted-foreground">Tasa</span><span>2.2% MV</span>
      </div>
      <Separator />
      <p className="text-xs text-muted-foreground">Creado el 01 Feb 2025</p>
    </div>
  ),
};
