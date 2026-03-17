import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Grid } from 'lucide-react';
import { useState } from 'react';

const meta: Meta = { title: 'DSM/Primitives/Toggle', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Negrita"><Bold className="size-4" /></Toggle>
      <Toggle aria-label="Cursiva"><Italic className="size-4" /></Toggle>
      <Toggle aria-label="Subrayado"><Underline className="size-4" /></Toggle>
    </div>
  ),
};

export const ViewToggle: Story = {
  name: 'Patrón — Cambio de vista',
  render: () => {
    const [view, setView] = useState('list');
    return (
      <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)}>
        <ToggleGroupItem value="list" aria-label="Vista lista"><List className="size-4" /></ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Vista grilla"><Grid className="size-4" /></ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Alignment: Story = {
  name: 'Alineación de texto',
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left"><AlignLeft className="size-4" /></ToggleGroupItem>
      <ToggleGroupItem value="center"><AlignCenter className="size-4" /></ToggleGroupItem>
      <ToggleGroupItem value="right"><AlignRight className="size-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};
