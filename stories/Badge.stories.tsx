import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'DSM/Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'secondary', 'outline', 'neutral',
        'destructive', 'success', 'warning', 'info',
        'destructive-outline', 'success-outline', 'warning-outline', 'info-outline',
        'destructive-soft', 'success-soft', 'warning-soft', 'info-soft',
        'destructive-soft-outline', 'success-soft-outline', 'warning-soft-outline', 'info-soft-outline',
        'neutral-soft', 'neutral-soft-outline',
        'secondary-soft', 'secondary-soft-outline',
        'purple-soft-outline',
      ],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Aprobado</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="destructive">Rechazado</Badge>
      <Badge variant="info">En revisión</Badge>
    </div>
  ),
};

export const Soft: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success-soft">Aprobado</Badge>
      <Badge variant="warning-soft">Pendiente</Badge>
      <Badge variant="destructive-soft">Rechazado</Badge>
      <Badge variant="info-soft">En revisión</Badge>
    </div>
  ),
};

export const SoftOutline: Story = {
  name: 'Soft + Outline',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success-soft-outline">Cobrado</Badge>
      <Badge variant="warning-soft-outline">Vencido</Badge>
      <Badge variant="destructive-soft-outline">Anulado</Badge>
      <Badge variant="info-soft-outline">Desembolsado</Badge>
      <Badge variant="neutral-soft-outline">Borrador</Badge>
      <Badge variant="secondary-soft-outline">Negociado</Badge>
    </div>
  ),
};

export const FactoringStatus: Story = {
  name: 'Factoring — Estados reales',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success-soft-outline">Cobrado</Badge>
      <Badge variant="info-soft-outline">Desembolsado</Badge>
      <Badge variant="warning-soft-outline">En cobro</Badge>
      <Badge variant="destructive-soft-outline">Vencido</Badge>
      <Badge variant="neutral-soft">Borrador</Badge>
      <Badge variant="destructive">Rechazado</Badge>
    </div>
  ),
};
