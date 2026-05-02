import type { Meta, StoryObj } from '@storybook/react';
import { InputFile } from '../components/ui/inputfile';
import { Label } from '../components/ui/label';

const meta: Meta = { title: 'DSM/Primitives/InputFile', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <InputFile className="w-80" />,
};

export const MultiFile: Story = {
  name: 'Múltiples archivos',
  render: () => (
    <div className="grid gap-1.5 w-80">
      <Label>Documentos de la operación</Label>
      <InputFile maxFiles={5} accept=".pdf,.doc,.docx" />
      <p className="text-xs text-muted-foreground">PDF, DOC hasta 10MB. Máximo 5 archivos.</p>
    </div>
  ),
};

export const InvoiceUpload: Story = {
  name: 'Patrón — Carga de facturas',
  render: () => (
    <div className="grid gap-1.5 w-96">
      <Label>Cargar facturas (XML/PDF)</Label>
      <InputFile maxFiles={10} accept=".pdf,.xml" showPreview />
      <p className="text-xs text-muted-foreground">Archivos XML del SII o PDF. Máximo 10 facturas por operación.</p>
    </div>
  ),
};
