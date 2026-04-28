import type { Meta, StoryObj } from '@storybook/react';
import { BulkActionToolbar } from '../components/patterns/bulk-action-toolbar';
import { CheckCircle2, Send, Download, Trash2 } from 'lucide-react';

const actions = [
  { id: 'approve', label: 'Aprobar',       icon: CheckCircle2, variant: 'default'     as const, onClick: () => {} },
  { id: 'remind',  label: 'Recordatorio',  icon: Send,         variant: 'outline'     as const, onClick: () => {} },
  { id: 'export',  label: 'Exportar',      icon: Download,     variant: 'outline'     as const, onClick: () => {} },
  { id: 'delete',  label: 'Eliminar',      icon: Trash2,       variant: 'destructive' as const, onClick: () => {} },
];

const meta: Meta<typeof BulkActionToolbar> = {
  title: 'DSM/Patterns/BulkActionToolbar',
  component: BulkActionToolbar,
  tags: ['autodocs'],
  args: {
    selectedIds: ['FCT-001', 'FCT-002'],
    totalCount: 10,
    entityLabel: 'operación',
    actions,
    onClearSelection: () => {},
  },
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof BulkActionToolbar>;

export const Default: Story = {};

export const TodosSeleccionados: Story = {
  args: { selectedIds: Array.from({ length: 10 }, (_, i) => `FCT-00${i + 1}`) },
};

export const Vacio: Story = {
  args: { selectedIds: [] },
  render: (args) => (
    <div className="text-sm text-muted-foreground p-4">
      El toolbar no aparece cuando selectedIds está vacío.
      <BulkActionToolbar {...args} />
    </div>
  ),
};
