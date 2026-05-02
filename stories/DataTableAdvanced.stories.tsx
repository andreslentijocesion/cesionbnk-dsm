import type { Meta, StoryObj } from '@storybook/react';
import { DataTableAdvanced } from '../components/patterns/data-table-advanced';

const meta: Meta<typeof DataTableAdvanced> = {
  title: 'DSM/Patterns/DataTableAdvanced',
  component: DataTableAdvanced,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof DataTableAdvanced>;

export const Default: Story = {};
