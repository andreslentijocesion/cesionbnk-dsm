import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Textarea> = {
  title: 'DSM/Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: { placeholder: 'Escribe aquí...' },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-1.5 w-80">
      <Label htmlFor="obs">Observaciones</Label>
      <Textarea id="obs" placeholder="Ingresa las observaciones de la operación..." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea placeholder="Normal" />
      <Textarea placeholder="Deshabilitado" disabled />
      <div className="grid gap-1">
        <Textarea
          placeholder="Con error"
          aria-invalid="true"
          aria-describedby="ta-err"
        />
        <p id="ta-err" className="text-xs text-destructive">Este campo es requerido</p>
      </div>
    </div>
  ),
};
