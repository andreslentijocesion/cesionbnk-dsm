import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/ui/Checkbox';
import { Label } from '../components/ui/Label';

const meta: Meta<typeof Checkbox> = {
  title: 'DSM/Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'radio', options: [true, false, 'indeterminate'] },
    disabled: { control: 'boolean' },
  },
  args: { disabled: false },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Acepto los términos y condiciones</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Sin marcar</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Marcado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" checked="indeterminate" />
        <Label htmlFor="c3">Indeterminado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" disabled />
        <Label htmlFor="c4" className="text-muted-foreground">Deshabilitado</Label>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  name: 'Grupo de opciones',
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium mb-1">Tipos de operación</p>
      {['Factoring', 'Confirming', 'Leasing', 'Descuento de cheques'].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox id={item} />
          <Label htmlFor={item}>{item}</Label>
        </div>
      ))}
    </div>
  ),
};
