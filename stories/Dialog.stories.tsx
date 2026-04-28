import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const meta: Meta = {
  title: 'DSM/Components/Dialog',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar acción</DialogTitle>
          <DialogDescription>¿Estás seguro de que deseas continuar con esta operación?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  name: 'Patrón — Con formulario',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nueva operación</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear operación de factoring</DialogTitle>
          <DialogDescription>Ingresa los datos básicos de la nueva operación.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-1.5">
            <Label htmlFor="cedente">Cedente</Label>
            <Input id="cedente" placeholder="Ej: Empresa Constructora Sur" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="monto">Monto nominal</Label>
            <Input id="monto" type="number" placeholder="$ 0" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="tasa">Tasa de descuento (%)</Label>
            <Input id="tasa" type="number" step="0.1" placeholder="2.5" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Crear operación</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  name: 'Patrón — Confirmación destructiva',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar operación</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar esta operación?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. La operación FAC-2025-00123 y todos sus documentos asociados serán eliminados permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Sí, eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
