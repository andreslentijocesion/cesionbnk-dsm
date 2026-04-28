import type { Meta, StoryObj } from '@storybook/react';
import { ProgressWithRange } from '../components/ui/progress-with-range';

const meta: Meta<typeof ProgressWithRange> = {
  title: 'DSM/Components/ProgressWithRange',
  component: ProgressWithRange,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ProgressWithRange>;

export const Default: Story = {
  args: { value: 60, from: '15 Ene', to: '15 Mar' },
};

export const Early: Story = {
  args: { value: 15, from: '01 Feb', to: '01 May' },
};

export const Almost: Story = {
  args: { value: 88, from: '10 Nov', to: '10 Dic' },
};

export const FactoringVigencia: Story = {
  name: 'Factoring — Vigencia de operaciones',
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-xs text-muted-foreground mb-1">OP-2025-0011 · Factura F-00312</p>
        <ProgressWithRange value={72} from="01 Ene" to="31 Mar" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">OP-2025-0024 · Factura F-00445</p>
        <ProgressWithRange value={30} from="15 Feb" to="15 May" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1">OP-2025-0033 · Factura F-00502</p>
        <ProgressWithRange value={95} from="01 Mar" to="15 Mar" />
      </div>
    </div>
  ),
};
