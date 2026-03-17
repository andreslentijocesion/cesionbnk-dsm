import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Button } from '../components/ui/button';

const meta: Meta = { title: 'DSM/Components/Sheet', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir panel</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Panel lateral</SheetTitle>
          <SheetDescription>Información adicional en panel deslizante.</SheetDescription>
        </SheetHeader>
        <div className="py-4 text-sm text-muted-foreground">Contenido del panel.</div>
      </SheetContent>
    </Sheet>
  ),
};

export const OperationDetail: Story = {
  name: 'Patrón — Detalle de operación',
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost">Ver detalle →</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>FAC-2025-00123</SheetTitle>
          <SheetDescription>Empresa Constructora Sur Ltda.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          {[
            ['Valor nominal', '$45.000.000'],
            ['Tasa de descuento', '2.2% MV'],
            ['Deudor', 'Retailer ABC S.A.'],
            ['Fecha emisión', '01 Feb 2025'],
            ['Fecha vencimiento', '15 Mar 2025'],
            ['Estado', 'Aprobado'],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button variant="outline" className="flex-1">Exportar PDF</Button>
          <Button className="flex-1">Desembolsar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-3">
      {(['left', 'right', 'top', 'bottom'] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Panel {side}</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};
