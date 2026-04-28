import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from '../components/advanced/Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'DSM/Advanced/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

const upTrend = [10, 15, 13, 20, 18, 25, 22, 30, 28, 35].map((v) => ({ value: v }));
const downTrend = [35, 30, 28, 25, 22, 18, 20, 13, 15, 10].map((v) => ({ value: v }));
const flat = [20, 21, 19, 22, 20, 21, 20, 19, 21, 20].map((v) => ({ value: v }));

export const Default: Story = {
  args: {
    data: upTrend,
    title: 'Monthly Revenue',
    value: '$128,450',
    change: 12.5,
  },
};

export const Negative: Story = {
  args: {
    data: downTrend,
    title: 'Overdue Rate',
    value: '8.3%',
    change: -5.2,
  },
};

export const Flat: Story = {
  args: {
    data: flat,
    title: 'Approval Rate',
    value: '94.1%',
    change: 0,
  },
};

export const FactoringKPIs: Story = {
  name: 'Factoring — KPI Row',
  render: () => (
    <div className="flex gap-4">
      <Sparkline data={upTrend} title="Cartera activa" value="$2.4M" change={8.1} />
      <Sparkline data={downTrend} title="Mora >30d" value="3.2%" change={-1.4} />
      <Sparkline data={flat} title="Aprobación" value="91%" change={0} />
    </div>
  ),
};
