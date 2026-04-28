import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Progress> = {
  title: 'DSM/Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: { value: 60 },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {[10, 30, 60, 85, 100].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <Progress value={v} className="flex-1" />
          <span className="text-xs text-muted-foreground w-8 text-right">{v}%</span>
        </div>
      ))}
    </div>
  ),
};

export const Semantic: Story = {
  name: 'Patrón — Estados de cobro factoring',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      {[
        { label: 'FAC-001', pct: 100, variant: 'success-soft-outline' as const, status: 'Cobrado' },
        { label: 'FAC-002', pct: 65, variant: 'info-soft-outline' as const, status: 'En cobro' },
        { label: 'FAC-003', pct: 20, variant: 'warning-soft-outline' as const, status: 'Pendiente' },
        { label: 'FAC-004', pct: 0, variant: 'destructive-soft' as const, status: 'Vencido' },
      ].map(({ label, pct, variant, status }) => (
        <div key={label}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">{label}</span>
            <Badge variant={variant} className="text-xs">{status}</Badge>
          </div>
          <Progress value={pct} />
        </div>
      ))}
    </div>
  ),
};
