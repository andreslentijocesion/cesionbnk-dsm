import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/Accordion';

const meta: Meta = { title: 'DSM/Components/Accordion', tags: ['autodocs'] };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="q1">
        <AccordionTrigger>¿Qué es el factoring?</AccordionTrigger>
        <AccordionContent>El factoring es la cesión de facturas a una empresa financiera a cambio de liquidez inmediata.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="q2">
        <AccordionTrigger>¿Cuánto demora el desembolso?</AccordionTrigger>
        <AccordionContent>El desembolso se realiza en 24-48 horas hábiles luego de la aprobación de la operación.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="q3">
        <AccordionTrigger>¿Qué documentos se requieren?</AccordionTrigger>
        <AccordionContent>Se requieren las facturas cedidas, escritura de la empresa, poderes del representante legal y estados financieros del último año.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="cedente">
        <AccordionTrigger>Información del cedente</AccordionTrigger>
        <AccordionContent>Datos del cedente: NIT, razón social, actividad económica y contacto principal.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="deudor">
        <AccordionTrigger>Información del deudor</AccordionTrigger>
        <AccordionContent>Datos del deudor: empresa pagadora de las facturas cedidas.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="condiciones">
        <AccordionTrigger>Condiciones de la operación</AccordionTrigger>
        <AccordionContent>Tasa de descuento, plazo, monto mínimo y máximo, y condiciones especiales.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
