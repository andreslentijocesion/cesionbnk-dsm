import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';

const meta: Meta = {
  title: 'DSM/Components/Tabs',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="resumen" className="w-96">
      <TabsList>
        <TabsTrigger value="resumen">Resumen</TabsTrigger>
        <TabsTrigger value="facturas">Facturas</TabsTrigger>
        <TabsTrigger value="pagos">Pagos</TabsTrigger>
      </TabsList>
      <TabsContent value="resumen">
        <p className="text-sm text-muted-foreground">Vista de resumen de la operación.</p>
      </TabsContent>
      <TabsContent value="facturas">
        <p className="text-sm text-muted-foreground">Listado de facturas cedidas.</p>
      </TabsContent>
      <TabsContent value="pagos">
        <p className="text-sm text-muted-foreground">Historial de pagos y cobranza.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithContent: Story = {
  name: 'Patrón — Con contenido en card',
  render: () => (
    <Tabs defaultValue="general" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="documentos">Documentos</TabsTrigger>
        <TabsTrigger value="historial">Historial</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Información general del cedente: RUT, razón social, contacto.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="documentos">
        <Card>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Documentos requeridos: escritura, poderes, estados financieros.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="historial">
        <Card>
          <CardContent className="pt-4 text-sm text-muted-foreground">
            Historial de operaciones y comportamiento de pago.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="activo" className="w-80">
      <TabsList>
        <TabsTrigger value="activo">Activo</TabsTrigger>
        <TabsTrigger value="borrador">Borrador</TabsTrigger>
        <TabsTrigger value="archivado" disabled>Archivado</TabsTrigger>
      </TabsList>
      <TabsContent value="activo">
        <p className="text-sm text-muted-foreground">Contenido activo.</p>
      </TabsContent>
      <TabsContent value="borrador">
        <p className="text-sm text-muted-foreground">Contenido en borrador.</p>
      </TabsContent>
    </Tabs>
  ),
};
