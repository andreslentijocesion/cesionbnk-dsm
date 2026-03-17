import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';

const meta: Meta = { title: 'DSM/Primitives/RadioGroup', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="aprobado">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="aprobado" id="r1" />
        <Label htmlFor="r1">Aprobado</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pendiente" id="r2" />
        <Label htmlFor="r2">Pendiente</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="rechazado" id="r3" />
        <Label htmlFor="r3">Rechazado</Label>
      </div>
    </RadioGroup>
  ),
};

export const TipoOperacion: Story = {
  name: 'Patrón — Tipo de operación',
  render: () => (
    <div className="grid gap-2 w-72">
      <p className="text-sm font-medium">Tipo de operación</p>
      <RadioGroup defaultValue="factoring">
        {[
          { value: 'factoring', label: 'Factoring', desc: 'Cesión de facturas comerciales' },
          { value: 'confirming', label: 'Confirming', desc: 'Pago anticipado a proveedores' },
          { value: 'cheques', label: 'Descuento de cheques', desc: 'Adelanto sobre cheques' },
        ].map(({ value, label, desc }) => (
          <div key={value} className="flex items-start gap-3 border rounded-lg p-3 has-[button[data-state=checked]]:border-primary transition-colors">
            <RadioGroupItem value={value} id={value} className="mt-0.5" />
            <div>
              <Label htmlFor={value} className="font-medium cursor-pointer">{label}</Label>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
};
