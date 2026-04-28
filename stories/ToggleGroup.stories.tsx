import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/ToggleGroup',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Single: StoryObj = {
  render: () => (
    <ToggleGroup type="single" defaultValue="month">
      <ToggleGroupItem value="day">Día</ToggleGroupItem>
      <ToggleGroupItem value="week">Semana</ToggleGroupItem>
      <ToggleGroupItem value="month">Mes</ToggleGroupItem>
      <ToggleGroupItem value="year">Año</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: StoryObj = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Alignment: StoryObj = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const FactoringFilter: StoryObj = {
  name: 'Factoring — Filtro de período',
  render: () => (
    <ToggleGroup type="single" defaultValue="month">
      <ToggleGroupItem value="today">Hoy</ToggleGroupItem>
      <ToggleGroupItem value="week">Esta semana</ToggleGroupItem>
      <ToggleGroupItem value="month">Este mes</ToggleGroupItem>
      <ToggleGroupItem value="quarter">Trimestre</ToggleGroupItem>
    </ToggleGroup>
  ),
};
