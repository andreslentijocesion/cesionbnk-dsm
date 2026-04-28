import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleButtonGroup } from '../components/ui/ToggleButtonGroup';
import { LayoutGrid, List, BarChart2 } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/ToggleButtonGroup',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [val, setVal] = useState('list');
    return (
      <ToggleButtonGroup
        value={val}
        onChange={setVal}
        options={[
          { value: 'grid', label: 'Grid', icon: <LayoutGrid className="h-4 w-4" /> },
          { value: 'list', label: 'Lista', icon: <List className="h-4 w-4" /> },
          { value: 'chart', label: 'Gráfico', icon: <BarChart2 className="h-4 w-4" /> },
        ]}
      />
    );
  },
};

export const Primary: StoryObj = {
  render: () => {
    const [val, setVal] = useState('activas');
    return (
      <ToggleButtonGroup
        variant="primary"
        value={val}
        onChange={setVal}
        options={[
          { value: 'activas', label: 'Activas' },
          { value: 'vencidas', label: 'Vencidas' },
          { value: 'cobradas', label: 'Cobradas' },
        ]}
      />
    );
  },
};

export const TextOnly: StoryObj = {
  render: () => {
    const [val, setVal] = useState('cedente');
    return (
      <ToggleButtonGroup
        value={val}
        onChange={setVal}
        options={[
          { value: 'cedente', label: 'Por cedente' },
          { value: 'deudor', label: 'Por deudor' },
          { value: 'sector', label: 'Por sector' },
        ]}
      />
    );
  },
};
