import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../components/ui/multi-select';
import { Label } from '../components/ui/label';
import { useState } from 'react';

const meta: Meta = { title: 'DSM/Components/MultiSelect', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

const deudores = [
  { value: 'retailer-abc', label: 'Retailer ABC S.A.' },
  { value: 'constructora-sur', label: 'Constructora Sur Ltda.' },
  { value: 'minera-norte', label: 'Minera Norte SpA' },
  { value: 'alimentos-central', label: 'Alimentos Central' },
  { value: 'transporte-rapido', label: 'Transporte Rápido Ltda.' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect options={deudores} selected={selected} onChange={setSelected} placeholder="Selecciona deudores..." />
      </div>
    );
  },
};

export const WithLabel: Story = {
  name: 'Con label y valores preseleccionados',
  render: () => {
    const [selected, setSelected] = useState(['retailer-abc', 'constructora-sur']);
    return (
      <div className="grid gap-1.5 w-80">
        <Label>Filtrar por deudor</Label>
        <MultiSelect options={deudores} selected={selected} onChange={setSelected} placeholder="Todos los deudores" />
        <p className="text-xs text-muted-foreground">{selected.length} deudor(es) seleccionado(s)</p>
      </div>
    );
  },
};
