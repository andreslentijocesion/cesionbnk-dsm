import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

const meta: Meta = {
  title: 'DSM/Components/Alert',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Información</AlertTitle>
      <AlertDescription>Esta es una alerta informativa del sistema.</AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="success">
        <CheckCircle />
        <AlertTitle>Operación aprobada</AlertTitle>
        <AlertDescription>La factura fue aprobada y está lista para desembolso.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <Info />
        <AlertTitle>Revisión pendiente</AlertTitle>
        <AlertDescription>La operación está siendo revisada por el equipo de riesgo.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Vencimiento próximo</AlertTitle>
        <AlertDescription>Esta factura vence en 3 días. Gestiona el cobro a tiempo.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircle />
        <AlertTitle>Operación rechazada</AlertTitle>
        <AlertDescription>El deudor no cumple con los criterios de riesgo definidos.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Alert variant="success">
        <AlertTitle>Guardado correctamente</AlertTitle>
        <AlertDescription>Los cambios fueron guardados exitosamente.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Sin conexión</AlertTitle>
        <AlertDescription>Trabajando en modo offline. Los cambios se sincronizarán al reconectar.</AlertDescription>
      </Alert>
    </div>
  ),
};
