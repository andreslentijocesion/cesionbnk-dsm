import type { Meta, StoryObj } from '@storybook/react';
import { InlineBanner } from '../components/ui/InlineBanner';

const meta: Meta<typeof InlineBanner> = {
  title: 'DSM/Primitives/InlineBanner',
  component: InlineBanner,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'radio', options: ['info', 'warning', 'success', 'error'] },
    dismissible: { control: 'boolean' },
    title:       { control: 'text' },
    message:     { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    variant:     'info',
    title:       'Actualización del sistema',
    message:     'El módulo de desembolsos estará en mantenimiento el domingo 16 de marzo.',
    actionLabel: 'Ver detalles',
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj<typeof InlineBanner>;

export const Info: Story = {};

export const Warning: Story = {
  args: {
    variant:     'warning',
    title:       'Documentos por vencer',
    message:     '3 cedentes tienen documentos KYC que vencen en los próximos 15 días.',
    actionLabel: 'Revisar cedentes',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title:   undefined,
    message: 'La operación FCT-2025-001 fue desembolsada exitosamente por $185.000.000.',
  },
};

export const Error: Story = {
  args: {
    variant:     'error',
    title:       'Error de sincronización',
    message:     'No se pudo conectar con el sistema bancario.',
    actionLabel: 'Reintentar',
  },
};

export const NoDescartable: Story = {
  args: {
    variant:     'error',
    title:       'Cuenta suspendida',
    message:     'Tu cuenta tiene facturas vencidas. Contacta a tu ejecutivo.',
    dismissible: false,
    actionLabel: 'Contactar ejecutivo',
  },
};

export const Todas: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <InlineBanner variant="info"    message="Aviso informativo del sistema." />
      <InlineBanner variant="warning" message="Documentos próximos a vencer." />
      <InlineBanner variant="success" message="Operación completada exitosamente." />
      <InlineBanner variant="error"   message="Error al procesar la solicitud." />
    </div>
  ),
};
