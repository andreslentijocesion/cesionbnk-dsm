import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';

const meta: Meta = {
  title: 'DSM/Primitives/Avatar',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Usuario" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {['size-8', 'size-10', 'size-12', 'size-16'].map((size) => (
        <Avatar key={size} className={size}>
          <AvatarFallback className="text-xs">AL</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Stack: Story = {
  name: 'Patrón — Grupo de avatares',
  render: () => (
    <div className="flex -space-x-3">
      {['AL', 'MR', 'JP', 'CN', '+4'].map((init, i) => (
        <Avatar key={i} className="size-9 ring-2 ring-background">
          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">{init}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
