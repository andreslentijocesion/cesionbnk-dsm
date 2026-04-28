import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';

const meta: Meta<typeof Label> = {
  title: 'DSM/Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: { children: { control: 'text' } },
  args: { children: 'Etiqueta' },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="grid gap-1.5">
        <Label htmlFor="campo1">Campo requerido *</Label>
        <Input id="campo1" placeholder="Ingresa un valor" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="campo2" className="text-muted-foreground">Campo opcional</Label>
        <Input id="campo2" placeholder="Opcional" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="campo3">Campo deshabilitado</Label>
        <Input id="campo3" disabled placeholder="Deshabilitado" />
      </div>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="check-label" />
      <Label htmlFor="check-label" className="cursor-pointer">Acepto los términos</Label>
    </div>
  ),
};
