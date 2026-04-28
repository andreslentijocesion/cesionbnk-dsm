import type { Meta, StoryObj } from '@storybook/react';
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut, MenubarSub,
  MenubarSubTrigger, MenubarSubContent,
} from '../components/ui/Menubar';

const meta: Meta = {
  title: 'DSM/Components/Menubar',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Operaciones</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Nueva operación <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
          <MenubarItem>Cargar facturas</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Exportar</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Exportar CSV</MenubarItem>
              <MenubarItem>Exportar PDF</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Portafolio</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Ver portafolio</MenubarItem>
          <MenubarItem>Reporte de cartera</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Concentración sectorial</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Reportes</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Informe mensual</MenubarItem>
          <MenubarItem>Alertas de vencimiento</MenubarItem>
          <MenubarItem>Dashboard ejecutivo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
