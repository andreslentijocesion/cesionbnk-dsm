import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from '../components/advanced/combobox';

const meta: Meta<typeof Combobox> = {
  title: 'DSM/Advanced/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
];

export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
  },
};

export const WithValue: Story = {
  args: {
    options: frameworks,
    value: 'react',
    placeholder: 'Select framework...',
  },
};

export const Cedentes: Story = {
  name: 'Factoring — Cedentes',
  args: {
    options: [
      { value: 'emp-001', label: 'Constructora del Norte S.A.' },
      { value: 'emp-002', label: 'Servicios Logísticos Ltda.' },
      { value: 'emp-003', label: 'Distribuidora Central S.A.' },
      { value: 'emp-004', label: 'Tecnología Aplicada SpA' },
    ],
    placeholder: 'Seleccionar cedente...',
  },
};
