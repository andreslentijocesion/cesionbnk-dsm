import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/ui/Skeleton';

const meta: Meta = {
  title: 'DSM/Primitives/Skeleton',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-64" />,
};

export const CardSkeleton: Story = {
  name: 'Patrón — Card loading',
  render: () => (
    <div className="border rounded-xl p-6 w-80 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 flex-1 rounded-md" />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  name: 'Patrón — Tabla loading',
  render: () => (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="bg-muted/40 flex gap-4 px-4 py-3">
        {[120, 180, 100, 80, 60].map((w, i) => (
          <Skeleton key={i} className="h-3" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="flex gap-4 px-4 py-3 border-t">
          {[120, 180, 100, 80, 60].map((w, i) => (
            <Skeleton key={i} className="h-3" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  ),
};
