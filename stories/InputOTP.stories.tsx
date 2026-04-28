import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../components/ui/InputOTP';
import { Label } from '../components/ui/Label';

const meta: Meta = { title: 'DSM/Primitives/InputOTP', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSeparator />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const VerificacionCuenta: Story = {
  name: 'Patrón — Verificación de cuenta',
  render: () => (
    <div className="flex flex-col items-center gap-4 text-center">
      <div>
        <h3 className="text-base font-semibold">Verificar identidad</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Ingresa el código de 6 dígitos enviado a tu email
        </p>
      </div>
      <div className="grid gap-1.5">
        <Label>Código de verificación</Label>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p className="text-xs text-muted-foreground">¿No recibiste el código? <a href="#" className="text-primary underline">Reenviar</a></p>
    </div>
  ),
};
