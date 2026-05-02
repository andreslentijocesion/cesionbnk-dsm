import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '../components/ui/sonner';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const meta: Meta = { title: 'DSM/Components/Toast', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('Operación guardada correctamente.')}>
      Mostrar toast
    </Button>
  ),
};

export const Types: Story = {
  name: 'Tipos de toast',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast('Mensaje informativo')}>Default</Button>
      <Button variant="success" onClick={() => toast.success('Operación aprobada exitosamente')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Error al procesar la solicitud')}>Error</Button>
      <Button variant="warning-outline" onClick={() => toast.warning('La factura vence en 2 días')}>Warning</Button>
      <Button variant="info-outline" onClick={() => toast.info('Revisión en proceso por el comité')}>Info</Button>
    </div>
  ),
};

export const WithAction: Story = {
  name: 'Con acción',
  render: () => (
    <Button onClick={() =>
      toast('Operación eliminada', {
        description: 'FAC-2025-00123 fue eliminada.',
        action: { label: 'Deshacer', onClick: () => toast.success('Operación restaurada') },
      })
    }>
      Eliminar con deshacer
    </Button>
  ),
};
