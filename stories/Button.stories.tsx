import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'DSM/Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'outline', 'secondary', 'ghost', 'link',
        'destructive', 'success', 'warning', 'info',
        'destructive-outline', 'success-outline', 'warning-outline', 'info-outline',
        'destructive-ghost', 'success-ghost', 'warning-ghost', 'info-ghost',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    shape: {
      control: 'radio',
      options: ['default', 'pill'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
    shape: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="info">Info</Button>
    </div>
  ),
};

export const SemanticOutline: Story = {
  name: 'Semantic / Outline',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="destructive-outline">Destructive</Button>
      <Button variant="success-outline">Success</Button>
      <Button variant="warning-outline">Warning</Button>
      <Button variant="info-outline">Info</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button shape="pill">Pill Default</Button>
      <Button shape="pill" variant="outline">Pill Outline</Button>
      <Button shape="pill" variant="success">Pill Success</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Default</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="destructive">Destructive</Button>
    </div>
  ),
};
