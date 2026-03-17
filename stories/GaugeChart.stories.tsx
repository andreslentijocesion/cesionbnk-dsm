import type { Meta, StoryObj } from '@storybook/react';
import { GaugeChart } from '../components/advanced/gauge-chart';

const meta: Meta<typeof GaugeChart> = {
  title: 'DSM/Advanced/GaugeChart',
  component: GaugeChart,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof GaugeChart>;

export const Default: Story = {
  args: {
    value: 72,
    title: 'Approval Score',
    description: 'Risk scoring model output',
    label: 'Score',
  },
};

export const Low: Story = {
  args: {
    value: 25,
    title: 'Collection Rate',
    label: '25%',
  },
};

export const High: Story = {
  args: {
    value: 92,
    title: 'Portfolio Health',
    label: '92%',
  },
};

export const FactoringRisk: Story = {
  name: 'Factoring — Risk Score',
  render: () => (
    <div className="flex gap-6">
      <GaugeChart value={85} title="Score Crediticio" label="850" max={1000} />
      <GaugeChart value={62} title="Concentración" description="Por deudor" label="62%" />
      <GaugeChart value={18} title="Mora Estimada" description="Cartera" label="18%" />
    </div>
  ),
};
