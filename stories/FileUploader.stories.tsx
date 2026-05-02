import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '../components/advanced/file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'DSM/Advanced/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  args: {
    accept: ['image/*', 'application/pdf'],
    maxSize: 10 * 1024 * 1024,
    maxFiles: 5,
  },
};

export const PDFOnly: Story = {
  args: {
    accept: ['application/pdf'],
    maxSize: 5 * 1024 * 1024,
    maxFiles: 5,
  },
};

export const FactoringDocuments: Story = {
  name: 'Factoring — Carga de Facturas',
  args: {
    accept: ['application/pdf', 'text/xml', 'application/xml'],
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
  },
};
