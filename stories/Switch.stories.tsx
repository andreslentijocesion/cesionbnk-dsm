import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

const meta: Meta<typeof Switch> = {
  title: 'DSM/Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notif" />
      <Label htmlFor="notif">Activar notificaciones</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="s1" />
        <Label htmlFor="s1">Apagado</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s2" defaultChecked />
        <Label htmlFor="s2">Encendido</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s3" disabled />
        <Label htmlFor="s3" className="text-muted-foreground">Deshabilitado apagado</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s4" disabled defaultChecked />
        <Label htmlFor="s4" className="text-muted-foreground">Deshabilitado encendido</Label>
      </div>
    </div>
  ),
};

export const SettingsPanel: Story = {
  name: 'Patrón — Panel de configuración',
  render: () => (
    <div className="w-80 border rounded-lg divide-y">
      {[
        { id: 'emails', label: 'Notificaciones por email', defaultChecked: true },
        { id: 'sms', label: 'Notificaciones por SMS', defaultChecked: false },
        { id: 'alerts', label: 'Alertas de vencimiento', defaultChecked: true },
        { id: 'reports', label: 'Reportes semanales', defaultChecked: false },
      ].map(({ id, label, defaultChecked }) => (
        <div key={id} className="flex items-center justify-between px-4 py-3">
          <Label htmlFor={id} className="text-sm cursor-pointer">{label}</Label>
          <Switch id={id} defaultChecked={defaultChecked} />
        </div>
      ))}
    </div>
  ),
};
