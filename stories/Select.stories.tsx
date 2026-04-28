import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';

const meta: Meta = {
  title: 'DSM/Primitives/Select',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aprobado">Aprobado</SelectItem>
        <SelectItem value="pendiente">Pendiente</SelectItem>
        <SelectItem value="rechazado">Rechazado</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid gap-1.5 w-56">
      <Label htmlFor="estado">Estado de la operación</Label>
      <Select>
        <SelectTrigger id="estado">
          <SelectValue placeholder="Selecciona..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="aprobado">Aprobado</SelectItem>
          <SelectItem value="desembolsado">Desembolsado</SelectItem>
          <SelectItem value="en-cobro">En cobro</SelectItem>
          <SelectItem value="cobrado">Cobrado</SelectItem>
          <SelectItem value="vencido">Vencido</SelectItem>
          <SelectItem value="rechazado">Rechazado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Selecciona banco..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Bancos nacionales</SelectLabel>
          <SelectItem value="bancolombia">Bancolombia</SelectItem>
          <SelectItem value="davivienda">Davivienda</SelectItem>
          <SelectItem value="bogota">Banco de Bogotá</SelectItem>
          <SelectItem value="occidente">Banco de Occidente</SelectItem>
          <SelectItem value="popular">Banco Popular</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Bancos internacionales</SelectLabel>
          <SelectItem value="bbva">BBVA</SelectItem>
          <SelectItem value="itau">Itaú</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-56">
      {(['sm', 'default', 'lg', 'xl'] as const).map((size) => (
        <Select key={size}>
          <SelectTrigger size={size}>
            <SelectValue placeholder={`Size: ${size}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opción A</SelectItem>
            <SelectItem value="b">Opción B</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Deshabilitado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Opción A</SelectItem>
      </SelectContent>
    </Select>
  ),
};
