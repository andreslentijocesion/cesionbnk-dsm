import type { Meta, StoryObj } from '@storybook/react';
import { FileViewer, type FileItem } from '../components/patterns/FileViewer';

const operationFiles: FileItem[] = [
  { id: '1', name: 'Factura_0312_ComercialLopez.pdf',  type: 'pdf',         size: '245 KB', uploadedBy: 'Ana Valdés',      uploadedAt: '08/03/2025', category: 'Factura' },
  { id: '2', name: 'Contrato_cesion_FCT2025.pdf',      type: 'pdf',         size: '1.2 MB', uploadedBy: 'Carlos Riquelme', uploadedAt: '07/03/2025', category: 'Contrato' },
  { id: '3', name: 'Balance_2024_auditado.xlsx',       type: 'spreadsheet', size: '380 KB', uploadedBy: 'María González',  uploadedAt: '01/03/2025', category: 'Financiero' },
  { id: '4', name: 'Cheque_garantia_001.jpg',          type: 'image',       size: '620 KB', uploadedBy: 'Ana Valdés',      uploadedAt: '06/03/2025', category: 'Garantía' },
  { id: '5', name: 'Poder_notarial.pdf',               type: 'pdf',         size: '890 KB', uploadedBy: 'Sistema',         uploadedAt: '05/03/2025', category: 'Legal' },
];

const meta: Meta<typeof FileViewer> = {
  title: 'DSM/Patterns/FileViewer',
  component: FileViewer,
  tags: ['autodocs'],
  args: {
    files: operationFiles,
  },
};

export default meta;
type Story = StoryObj<typeof FileViewer>;

export const Default: Story = {};

export const Vacio: Story = {
  args: { files: [] },
};
