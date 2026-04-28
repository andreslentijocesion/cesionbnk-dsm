import type { Meta, StoryObj } from '@storybook/react';
import { TextareaAutoresize } from '../components/ui/TextareaAutoresize';

const meta: Meta<typeof TextareaAutoresize> = {
  title: 'DSM/Components/TextareaAutoresize',
  component: TextareaAutoresize,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TextareaAutoresize>;

export const Default: Story = {
  args: { placeholder: 'Escribe algo...', minRows: 3 },
};

export const WithMaxRows: Story = {
  args: { placeholder: 'Máximo 6 líneas...', minRows: 2, maxRows: 6 },
};

export const FactoringNotes: Story = {
  name: 'Factoring — Observaciones',
  args: {
    placeholder: 'Ingrese observaciones del análisis crediticio...',
    minRows: 3,
    maxRows: 8,
    className: 'w-full',
  },
};
