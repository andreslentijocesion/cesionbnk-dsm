import type { Meta, StoryObj } from '@storybook/react';
import { TreemapChart } from '../components/advanced/treemap-chart';

const meta: Meta<typeof TreemapChart> = {
  title: 'DSM/Advanced/TreemapChart',
  component: TreemapChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TreemapChart>;

const sectorData = [
  { name: 'Retail', size: 4200000 },
  { name: 'Construcción', size: 3100000 },
  { name: 'Logística', size: 2800000 },
  { name: 'Manufactura', size: 2200000 },
  { name: 'Salud', size: 1500000 },
  { name: 'Tecnología', size: 1200000 },
  { name: 'Agroindustria', size: 900000 },
  { name: 'Educación', size: 600000 },
];

export const Default: Story = {
  args: {
    data: sectorData,
    title: 'Portfolio Distribution',
    description: 'By sector',
  },
};

export const FactoringConcentration: Story = {
  name: 'Factoring — Concentración por Sector',
  args: {
    data: sectorData,
    title: 'Concentración de Cartera',
    description: 'Exposición por sector económico (CLP)',
    height: 380,
  },
};

export const DebtorConcentration: Story = {
  name: 'Factoring — Concentración por Deudor',
  args: {
    data: [
      { name: 'Walmart Chile', size: 3200000 },
      { name: 'Cencosud', size: 2800000 },
      { name: 'Falabella', size: 2400000 },
      { name: 'Ripley', size: 1900000 },
      { name: 'Paris', size: 1200000 },
      { name: 'Otros', size: 800000 },
    ],
    title: 'Top Deudores',
    description: 'Concentración por cliente deudor',
    height: 320,
  },
};
