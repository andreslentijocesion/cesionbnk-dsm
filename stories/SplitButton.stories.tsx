import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton } from '../components/ui/split-button';

const meta: Meta = { title: 'DSM/Primitives/SplitButton', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <SplitButton
      label="Aprobar"
      onMainAction={() => {}}
      actions={[
        { label: 'Aprobar y notificar', onClick: () => {} },
        { label: 'Aprobar en lote', onClick: () => {} },
        { label: 'Aprobar con condiciones', onClick: () => {} },
      ]}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <SplitButton label="Desembolsar" variant="default" onMainAction={() => {}}
        actions={[{ label: 'Desembolso parcial', onClick: () => {} }, { label: 'Desembolso programado', onClick: () => {} }]} />
      <SplitButton label="Exportar" variant="outline" onMainAction={() => {}}
        actions={[{ label: 'Exportar CSV', onClick: () => {} }, { label: 'Exportar Excel', onClick: () => {} }, { label: 'Exportar PDF', onClick: () => {} }]} />
      <SplitButton label="Rechazar" variant="destructive" onMainAction={() => {}}
        actions={[{ label: 'Rechazar con nota', onClick: () => {} }, { label: 'Rechazar en lote', onClick: () => {} }]} />
    </div>
  ),
};
