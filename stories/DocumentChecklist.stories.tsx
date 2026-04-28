import type { Meta, StoryObj } from '@storybook/react';
import { DocumentChecklist, type ChecklistDocument } from '../components/patterns/DocumentChecklist';

const fullDocs: ChecklistDocument[] = [
  { id: '1', name: 'RUT empresa',         required: true,  status: 'approved',  fileName: 'rut.pdf',    uploadedAt: '12/02/2025' },
  { id: '2', name: 'Escritura social',    required: true,  status: 'rejected',  fileName: 'escritura.pdf', rejectionReason: 'Documento desactualizado.' },
  { id: '3', name: 'Estados financieros', required: true,  status: 'reviewing', fileName: 'eeff.pdf',   uploadedAt: '01/03/2025' },
  { id: '4', name: 'Formulario KYC',      required: true,  status: 'pending' },
  { id: '5', name: 'Certificado DICOM',   required: false, status: 'expired',   fileName: 'dicom.pdf',  expiresAt: '28/02/2025' },
  { id: '6', name: 'Cert. cuenta banco',  required: true,  status: 'uploaded',  fileName: 'cuenta.pdf', uploadedAt: '05/03/2025' },
];

const meta: Meta<typeof DocumentChecklist> = {
  title: 'DSM/Patterns/DocumentChecklist',
  component: DocumentChecklist,
  tags: ['autodocs'],
  argTypes: {
    showProgress: { control: 'boolean' },
    title:        { control: 'text' },
  },
  args: {
    documents:    fullDocs,
    showProgress: true,
    title:        'KYC — Construcciones Andina S.A.',
  },
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DocumentChecklist>;

export const Default: Story = {};

export const TodosAprobados: Story = {
  args: {
    documents: fullDocs.map((d) => ({ ...d, status: 'approved' as const })),
    title: 'KYC completo',
  },
};

export const SoloLectura: Story = {
  args: { documents: fullDocs },
  render: (args) => (
    <div className="max-w-xl">
      <DocumentChecklist {...args} onUpload={undefined} onView={undefined} />
    </div>
  ),
};
