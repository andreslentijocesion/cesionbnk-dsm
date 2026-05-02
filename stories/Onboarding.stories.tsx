import type { Meta, StoryObj } from '@storybook/react';
import { Onboarding } from '../components/patterns/onboarding';
import { withGlobalProviders } from './decorators';

const meta: Meta<typeof Onboarding> = {
  title: 'DSM/Patterns/Onboarding',
  component: Onboarding,
  tags: ['autodocs'],
  decorators: [withGlobalProviders],
  args: {
    module: 'operaciones',
    actions: [
      { label: 'Nueva operación' },
      { label: 'Ver tutorial', variant: 'outline' },
    ],
    steps: [
      'Selecciona un cedente registrado',
      'Sube las facturas en PDF o XML',
      'Revisa condiciones y firma el contrato',
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Onboarding>;
export const Default: Story = {};
