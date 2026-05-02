import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from '../components/ui/drawer';
import { Button } from '../components/ui/button';

const meta: Meta = {
  title: 'DSM/Components/Drawer',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalle de operación</DrawerTitle>
          <DrawerDescription>Factoring #OP-2025-0042 — Constructora del Norte S.A.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2 text-sm text-muted-foreground space-y-2">
          <p>Monto: <strong>$3.250.000</strong></p>
          <p>Tasa: <strong>1.8% mensual</strong></p>
          <p>Vencimiento: <strong>15 May 2025</strong></p>
        </div>
        <DrawerFooter>
          <Button>Aprobar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
