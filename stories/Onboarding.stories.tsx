import type { Meta, StoryObj } from '@storybook/react';
import { Onboarding } from '../components/patterns/onboarding';

const meta: Meta<typeof Onboarding> = {
  title: 'DSM/Patterns/Onboarding',
  component: Onboarding,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="border rounded-xl"><Story /></div>],
  args: {
    module: 'operaciones',
    actions: [
      { label: 'Nueva operación' },
      { label: 'Ver tutorial', variant: 'outline' },
    ],
    steps: [
      'Selecciona un cedente registrado',
      'Sube las facturas en PDF o XML',
      'Revisa condiciones y firma el contrato',
    ],
  },
  argTypes: {
    module: { control: 'radio', options: ['operaciones', 'cedentes', 'deudores', 'portafolio', 'alertas', 'calculadora', 'custom'] },
    size: { control: 'radio', options: ['sm', 'default', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Onboarding>;

export const Default: Story = {};

export const Cedentes: Story = {
  args: { module: 'cedentes', steps: undefined, actions: [{ label: 'Agregar cedente' }] },
};

export const Portafolio: Story = {
  args: { module: 'portafolio', steps: undefined, actions: [] },
};

export const Alertas: Story = {
  args: { module: 'alertas', steps: undefined, actions: [] },
};

export const Pequeno: Story = {
  args: { size: 'sm', steps: undefined, actions: [{ label: 'Comenzar' }] },
};
