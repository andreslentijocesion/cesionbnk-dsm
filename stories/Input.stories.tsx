import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Input> = {
  title: 'DSM/Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    placeholder: 'Ingresa un valor...',
    size: 'default',
    type: 'text',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-1.5 w-72">
      <Label htmlFor="name">Nombre completo</Label>
      <Input id="name" placeholder="Ej: Juan Pérez" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input placeholder="Normal" />
      <Input placeholder="Deshabilitado" disabled />
      <Input placeholder="Requerido" required aria-required="true" />
      <div className="grid gap-1">
        <Input
          placeholder="Con error"
          aria-invalid="true"
          aria-describedby="err"
        />
        <p id="err" className="text-xs text-destructive">Este campo es requerido</p>
      </div>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <Input type="text" placeholder="Texto" />
      <Input type="email" placeholder="correo@ejemplo.com" />
      <Input type="password" placeholder="Contraseña" />
      <Input type="number" placeholder="0" />
      <Input type="search" placeholder="Buscar..." />
    </div>
  ),
};

export const FormField: Story = {
  name: 'Patrón — Campo de formulario',
  render: () => (
    <form className="grid gap-4 w-80">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="correo@cesionbnk.com" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="rut">RUT empresa</Label>
        <Input id="rut" placeholder="12.345.678-9" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="monto">Monto factura</Label>
        <Input id="monto" type="number" placeholder="$ 0" size="lg" />
      </div>
    </form>
  ),
};
