import type { Meta, StoryObj } from '@storybook/react';
import { StatCard, StatCardGrid } from '../components/patterns/stat-card';
import { DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'DSM/Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'warning', 'destructive'] },
  },
  args: {
    title: 'Cartera Activa',
    value: '$1.240M',
    subtitle: '+12% vs mes anterior',
    trend: 'up',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};

export const Grid: Story = {
  render: () => (
    <StatCardGrid columns={4}>
      <StatCard title="Cartera Activa"   value="$1.240M"  trend="up"      icon={DollarSign}    variant="default" subtitle="+12% vs mes ant." />
      <StatCard title="Desembolsado Mes" value="$380M"    trend="up"      icon={TrendingUp}    variant="success" subtitle="+8% vs mes ant." />
      <StatCard title="En Mora"          value="$42M"     trend="down"    icon={AlertTriangle} variant="warning" subtitle="-3% vs mes ant." />
      <StatCard title="Vencido Hoy"      value="7 ops"    trend="neutral" icon={Clock}         variant="destructive" />
    </StatCardGrid>
  ),
};
