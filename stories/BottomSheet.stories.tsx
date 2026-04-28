import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from '../components/ui/BottomSheet';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const meta: Meta = {
  title: 'DSM/Components/BottomSheet',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <BottomSheet
      trigger={<Button variant="outline">Ver detalle</Button>}
      title="Detalle de operación"
      description="OP-2025-0042 · Constructora del Norte S.A."
      footer={
        <div className="flex gap-2 w-full">
          <Button className="flex-1">Aprobar</Button>
          <Button variant="outline" className="flex-1">Rechazar</Button>
        </div>
      }
    >
      <div className="space-y-3 text-sm px-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Monto</span>
          <span className="font-semibold">$3.250.000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tasa</span>
          <span>1.8% mensual</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Plazo</span>
          <span>60 días</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estado</span>
          <Badge variant="warning-soft">En análisis</Badge>
        </div>
      </div>
    </BottomSheet>
  ),
};
