import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb';

const meta: Meta = { title: 'DSM/Components/Breadcrumb', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Inicio</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Portafolio</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>FAC-2025-00123</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#">Inicio</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#">Cedentes</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Empresa Constructora Sur</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const FactoringFlow: Story = {
  name: 'Patrón — Flujo factoring',
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        ['Inicio', 'Operaciones', 'Nueva operación'],
        ['Inicio', 'Portafolio', 'FAC-2025-00123', 'Detalle'],
        ['Inicio', 'Cedentes', 'Empresa Sur Ltda.', 'Documentos'],
      ].map((crumbs, i) => (
        <Breadcrumb key={i}>
          <BreadcrumbList>
            {crumbs.map((crumb, j) => (
              <BreadcrumbItem key={j}>
                {j > 0 && <BreadcrumbSeparator />}
                {j === crumbs.length - 1
                  ? <BreadcrumbPage>{crumb}</BreadcrumbPage>
                  : <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
                }
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  ),
};
