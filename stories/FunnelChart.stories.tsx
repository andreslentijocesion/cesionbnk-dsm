import type { Meta, StoryObj } from '@storybook/react';
import { FunnelChart } from '../components/advanced/funnel-chart';

const meta: Meta<typeof FunnelChart> = {
  title: 'DSM/Advanced/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

const approvalFunnel = [
  { name: 'Solicitudes recibidas', value: 1200 },
  { name: 'Documentación completa', value: 890 },
  { name: 'Análisis crediticio', value: 620 },
  { name: 'Comité aprobación', value: 410 },
  { name: 'Operaciones desembolsadas', value: 340 },
];

export const Default: Story = {
  args: {
    data: approvalFunnel,
    title: 'Funnel de Aprobación',
    description: 'Flujo de solicitudes de factoring',
  },
};

export const WithoutDropoff: Story = {
  args: {
    data: approvalFunnel,
    title: 'Funnel de Aprobación',
    showDropoff: false,
    showPercentages: true,
  },
};

export const FactoringPipeline: Story = {
  name: 'Factoring — Pipeline completo',
  args: {
    data: [
      { name: 'Leads', value: 500 },
      { name: 'Pre-calificados', value: 320 },
      { name: 'En análisis', value: 210 },
      { name: 'Aprobados', value: 155 },
      { name: 'Desembolsados', value: 130 },
    ],
    title: 'Pipeline Comercial',
    description: 'Q1 2025',
    showDropoff: true,
  },
};
