import type { Meta, StoryObj } from '@storybook/react';
import { AgingReport, type AgingBucket } from '../components/patterns/agingreport';

const defaultBuckets: AgingBucket[] = [
  { label: 'Al día',     amount: 1970, count: 27, risk: 'ok'       },
  { label: '1–15 días',  amount: 490,  count: 8,  risk: 'low'      },
  { label: '16–30 días', amount: 210,  count: 4,  risk: 'medium'   },
  { label: '31–60 días', amount: 145,  count: 3,  risk: 'high'     },
  { label: '+60 días',   amount: 78,   count: 2,  risk: 'critical' },
];

const meta: Meta<typeof AgingReport> = {
  title: 'DSM/Patterns/AgingReport',
  component: AgingReport,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { buckets: defaultBuckets },
};

export default meta;
type Story = StoryObj<typeof AgingReport>;
export const Default: Story = {};
