import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../components/ui/stepper';

const meta: Meta<typeof Stepper> = {
  title: 'DSM/Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { id: '1', label: 'Datos del cedente', status: 'completed' as const },
  { id: '2', label: 'Carga de facturas', status: 'completed' as const },
  { id: '3', label: 'Análisis crediticio', status: 'current' as const },
  { id: '4', label: 'Aprobación comité', status: 'pending' as const },
  { id: '5', label: 'Desembolso', status: 'pending' as const },
];

export const Horizontal: Story = {
  args: { steps, orientation: 'horizontal', activeStep: 2 },
};

export const Vertical: Story = {
  args: { steps, orientation: 'vertical', activeStep: 2 },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: '1', label: 'Datos del cedente', status: 'completed' as const },
      { id: '2', label: 'Carga de facturas', status: 'error' as const, description: 'Documento inválido' },
      { id: '3', label: 'Análisis crediticio', status: 'pending' as const },
    ],
    activeStep: 1,
  },
};
