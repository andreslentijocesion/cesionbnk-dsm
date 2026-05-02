import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout, SplitLayout, StackLayout } from '../components/ui/pagelayout';

const meta: Meta = {
  title: 'DSM/Components/PageLayout',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;

const Box = ({ label, className = '' }: { label: string; className?: string }) => (
  <div className={`rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground flex items-center justify-center min-h-24 ${className}`}>
    {label}
  </div>
);

export const Constrained: StoryObj = {
  render: () => (
    <PageLayout variant="constrained" className="p-6">
      <Box label="Contenido con ancho máximo limitado" />
    </PageLayout>
  ),
};

export const Full: StoryObj = {
  render: () => (
    <PageLayout variant="full" className="p-6">
      <Box label="Contenido full-width" />
    </PageLayout>
  ),
};

export const SplitSidebarRight: StoryObj = {
  name: 'SplitLayout — Sidebar right',
  render: () => (
    <PageLayout variant="constrained" className="p-6">
      <SplitLayout ratio="sidebar-right" gap="md">
        <Box label="Panel principal (tabla / contenido)" className="min-h-64" />
        <Box label="Sidebar derecho (filtros / resumen)" />
      </SplitLayout>
    </PageLayout>
  ),
};

export const StackedSections: StoryObj = {
  name: 'StackLayout — Secciones apiladas',
  render: () => (
    <PageLayout variant="constrained" className="p-6">
      <StackLayout gap="relaxed">
        <Box label="KPIs" />
        <Box label="Tabla de operaciones" className="min-h-48" />
        <Box label="Gráficos" />
      </StackLayout>
    </PageLayout>
  ),
};

export const FactoringDashboard: StoryObj = {
  name: 'Factoring — Dashboard layout',
  render: () => (
    <PageLayout variant="constrained" className="p-6">
      <StackLayout gap="relaxed">
        <div className="grid grid-cols-4 gap-4">
          {['Cartera activa', 'Mora >30d', 'Aprobadas hoy', 'En análisis'].map((label) => (
            <Box key={label} label={label} className="min-h-20" />
          ))}
        </div>
        <SplitLayout ratio="sidebar-right" gap="md">
          <Box label="Tabla de operaciones" className="min-h-64" />
          <Box label="Alertas y vencimientos" />
        </SplitLayout>
      </StackLayout>
    </PageLayout>
  ),
};
