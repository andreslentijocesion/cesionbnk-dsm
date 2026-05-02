import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/ui/navigationmenu';

const meta: Meta = {
  title: 'DSM/Components/NavigationMenu',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Operaciones</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-64">
              <li>
                <NavigationMenuLink className="block rounded-md p-3 hover:bg-accent text-sm">
                  <div className="font-medium mb-1">Nueva operación</div>
                  <div className="text-muted-foreground text-xs">Iniciar un proceso de factoring</div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block rounded-md p-3 hover:bg-accent text-sm">
                  <div className="font-medium mb-1">Cola de aprobación</div>
                  <div className="text-muted-foreground text-xs">Revisar solicitudes pendientes</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Portafolio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-64">
              <li>
                <NavigationMenuLink className="block rounded-md p-3 hover:bg-accent text-sm">
                  <div className="font-medium mb-1">Cartera activa</div>
                  <div className="text-muted-foreground text-xs">Operaciones vigentes</div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block rounded-md p-3 hover:bg-accent text-sm">
                  <div className="font-medium mb-1">Reportes</div>
                  <div className="text-muted-foreground text-xs">Informes y analytics</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};
