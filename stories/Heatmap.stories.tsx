import type { Meta, StoryObj } from '@storybook/react';
import { Heatmap } from '../components/advanced/heatmap';

const meta: Meta<typeof Heatmap> = {
  title: 'DSM/Advanced/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const sectors = ['Retail', 'Construcción', 'Logística', 'Manufactura', 'Salud'];

const data = sectors.flatMap((row) =>
  months.map((col) => ({
    row,
    col,
    value: Math.round(Math.random() * 100),
  }))
);

export const Default: Story = {
  args: {
    data,
    rows: sectors,
    columns: months,
    title: 'Performance Matrix',
    description: 'Score by sector and month',
  },
};

export const FactoringMora: Story = {
  name: 'Factoring — Mora por Sector/Mes',
  args: {
    data: sectors.flatMap((row) =>
      months.map((col, ci) => ({
        row,
        col,
        value: Math.round(5 + Math.random() * 20 + ci),
        label: `${(5 + Math.random() * 20 + ci).toFixed(1)}%`,
      }))
    ),
    rows: sectors,
    columns: months,
    title: 'Índice de Mora',
    description: 'Porcentaje de mora por sector económico (2025)',
    showValues: true,
  },
};

export const ApprovalRate: Story = {
  name: 'Factoring — Tasa Aprobación',
  args: {
    data: sectors.flatMap((row) =>
      months.map((col) => ({
        row,
        col,
        value: Math.round(60 + Math.random() * 35),
      }))
    ),
    rows: sectors,
    columns: months,
    title: 'Tasa de Aprobación (%)',
    showValues: true,
    cellSize: 64,
  },
};
