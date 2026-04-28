import type { Meta, StoryObj } from '@storybook/react';
import { EditableTable } from '../components/patterns/EditableTable';

const meta: Meta<typeof EditableTable> = {
  title: 'DSM/Patterns/EditableTable',
  component: EditableTable,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof EditableTable>;

export const Default: Story = {};
