import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../components/ui/emptystate';
import { FileX, Search, Inbox } from 'lucide-react';

const meta: Meta = { title: 'DSM/Patterns/EmptyState', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <EmptyState
      title="Sin operaciones"
      description="No hay operaciones registradas aún. Crea tu primera operación de factoring."
      action={{ label: 'Nueva operación', onClick: () => {} }}
    />
  ),
};

export const NoResults: Story = {
  name: 'Sin resultados de búsqueda',
  render: () => (
    <EmptyState
      icon={Search}
      title="Sin resultados"
      description='No se encontraron operaciones que coincidan con los filtros aplicados.'
      action={{ label: 'Limpiar filtros', onClick: () => {} }}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <EmptyState icon={Inbox} title="Bandeja vacía" description="No tienes notificaciones pendientes." />
      <EmptyState icon={FileX} title="Sin documentos" description="No hay documentos adjuntos a esta operación." action={{ label: 'Subir documento', onClick: () => {} }} />
    </div>
  ),
};
