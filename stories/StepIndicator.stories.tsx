import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from '../components/advanced/stepindicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'DSM/Advanced/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof StepIndicator>;

const steps = [
  { id: '1', title: 'Datos básicos', description: 'Información del cedente' },
  { id: '2', title: 'Documentos', description: 'Carga de facturas' },
  { id: '3', title: 'Análisis', description: 'Revisión crediticia' },
  { id: '4', title: 'Aprobación', description: 'Comité de crédito' },
  { id: '5', title: 'Desembolso', description: 'Transferencia' },
];

export const Default: Story = {
  args: { steps, currentStep: 2 },
};

export const Vertical: Story = {
  args: { steps, currentStep: 1, orientation: 'vertical' },
};

export const Compact: Story = {
  args: { steps, currentStep: 3, variant: 'compact' },
};

export const Minimal: Story = {
  args: { steps, currentStep: 2, variant: 'minimal' },
};

export const Clickable: Story = {
  args: { steps, currentStep: 3, clickable: true },
};

export const FactoringWizard: Story = {
  name: 'Factoring — Nueva Operación',
  args: {
    steps: [
      { id: '1', title: 'Cedente', description: 'Seleccionar empresa' },
      { id: '2', title: 'Facturas', description: 'Cargar documentos' },
      { id: '3', title: 'Condiciones', description: 'Tasa y plazo' },
      { id: '4', title: 'Aprobación', description: 'Revisión final' },
    ],
    currentStep: 1,
    showProgress: true,
  },
};
