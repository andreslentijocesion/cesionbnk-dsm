import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, CardSkeleton, TableSkeleton } from '../components/ui/loading-states';

const meta: Meta = { title: 'DSM/Patterns/LoadingStates', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const SpinnerStory: Story = {
  name: 'Spinner',
  render: () => <Spinner />,
};

export const CardSkeletonStory: Story = {
  name: 'Card Skeleton',
  render: () => (
    <div className="w-80">
      <CardSkeleton />
    </div>
  ),
};

export const TableSkeletonStory: Story = {
  name: 'Table Skeleton',
  render: () => <TableSkeleton />,
};

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Spinner</p>
        <Spinner />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Card</p>
        <div className="w-80"><CardSkeleton /></div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Tabla</p>
        <TableSkeleton />
      </div>
    </div>
  ),
};
