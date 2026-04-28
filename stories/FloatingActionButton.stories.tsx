import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from '../components/ui/floating-action-button';
import { Plus, Upload as UploadIcon, Edit } from 'lucide-react';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'DSM/Components/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="relative h-48 w-full border rounded-lg bg-muted/30"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {
  args: { icon: Plus, label: 'Nueva operación', position: 'bottom-right' },
};

export const UploadFAB: Story = {
  name: 'Upload',
  args: { icon: UploadIcon, label: 'Cargar facturas', position: 'bottom-right' },
};

export const BottomLeft: Story = {
  args: { icon: Edit, label: 'Editar', position: 'bottom-left' },
};
