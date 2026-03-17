import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';

const meta: Meta = {
  title: 'DSM/Components/Form',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const form = useForm({ defaultValues: { name: '', email: '', role: '', notes: '' } });
    return (
      <Form {...form}>
        <form className="space-y-4 max-w-md" onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="name"
            rules={{ required: 'El nombre es requerido' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl><Input placeholder="Juan Pérez" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{ required: 'El email es requerido' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="juan@empresa.cl" {...field} /></FormControl>
                <FormDescription>Recibirá notificaciones en este correo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Seleccionar rol" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="analyst">Analista</SelectItem>
                    <SelectItem value="manager">Gerente</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl><Textarea placeholder="Notas adicionales..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    );
  },
};

export const WithValidation: StoryObj = {
  name: 'Factoring — Formulario con validación',
  render: () => {
    const form = useForm({
      defaultValues: { rut: '', monto: '', plazo: '', tasa: '' },
      mode: 'onBlur',
    });
    return (
      <Form {...form}>
        <form className="space-y-4 max-w-md" onSubmit={form.handleSubmit(() => alert('Operación enviada'))}>
          <FormField
            control={form.control}
            name="rut"
            rules={{ required: 'RUT requerido', pattern: { value: /^\d{1,8}-[\dkK]$/, message: 'Formato inválido (ej: 12345678-9)' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUT cedente</FormLabel>
                <FormControl><Input placeholder="12345678-9" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monto"
            rules={{ required: 'Monto requerido', min: { value: 1, message: 'Debe ser mayor a 0' } }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto (CLP)</FormLabel>
                <FormControl><Input type="number" placeholder="1000000" {...field} /></FormControl>
                <FormDescription>Monto total de las facturas a ceder.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="plazo"
              rules={{ required: 'Plazo requerido' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plazo (días)</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Plazo" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[30, 60, 90, 120].map((d) => (
                        <SelectItem key={d} value={String(d)}>{d} días</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tasa"
              rules={{ required: 'Tasa requerida' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tasa mensual (%)</FormLabel>
                  <FormControl><Input type="number" step="0.1" placeholder="1.5" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit">Crear operación</Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>Limpiar</Button>
          </div>
        </form>
      </Form>
    );
  },
};
