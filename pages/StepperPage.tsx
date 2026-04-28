import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { Stepper, type Step } from "../components/ui/stepper";
import { Button } from "../components/ui/button";

const operationSteps: Step[] = [
  { id: "1", label: "Ingreso factura",   description: "Carga y datos básicos" },
  { id: "2", label: "Verificación",      description: "Deudor y límite" },
  { id: "3", label: "Aprobación",        description: "Firma gerente" },
  { id: "4", label: "Desembolso",        description: "Transferencia cedente" },
  { id: "5", label: "Cobranza",          description: "Pago del deudor" },
];

function InteractiveStepper() {
  const [active, setActive] = useState(2);
  return (
    <div className="space-y-6 max-w-2xl">
      <Stepper steps={operationSteps} activeStep={active} />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={active === 0} onClick={() => setActive(a => a - 1)}>Atrás</Button>
        <Button size="sm" disabled={active === operationSteps.length - 1} onClick={() => setActive(a => a + 1)}>Siguiente</Button>
      </div>
    </div>
  );
}

const errorSteps: Step[] = [
  { id: "a", label: "Ingreso",      status: "completed" },
  { id: "b", label: "Verificación", status: "error",     description: "Deudor con mora +90d" },
  { id: "c", label: "Aprobación",   status: "pending" },
  { id: "d", label: "Desembolso",   status: "pending" },
];

export function StepperPage() {
  return (
    <ComponentShowcase
      title="Stepper"
      description="Indicador de progreso para flujos de múltiples pasos. Soporta orientación horizontal y vertical, con estados completed, current, pending y error."
      category="Forms"
      atomicLevel="Molecule"
      preview={<InteractiveStepper />}
      code={`import { Stepper } from "@/components/ui/stepper"
import { useState } from "react"

const steps = [
  { id: "1", label: "Ingreso factura",  description: "Carga y datos básicos" },
  { id: "2", label: "Verificación",     description: "Deudor y límite" },
  { id: "3", label: "Aprobación",       description: "Firma gerente" },
  { id: "4", label: "Desembolso",       description: "Transferencia" },
]

export function Demo() {
  const [active, setActive] = useState(0)
  return <Stepper steps={steps} activeStep={active} />
}`}
      props={[
        { name: "steps",       type: "Step[]",                        description: "Lista de pasos. Cada step tiene id, label, y opcionalmente description y status." },
        { name: "activeStep",  type: "number",                        description: "Índice del paso activo (0-based). Si no se provee, se usan los status de cada step.", required: false },
        { name: "orientation", type: '"horizontal" | "vertical"',     description: "Orientación del stepper. Default: horizontal.", required: false },
        { name: "className",   type: "string",                        description: "Clase CSS adicional.", required: false },
      ]}
      examples={[
        {
          title: "Vertical",
          description: "Útil para paneles laterales o vistas de detalle de operación.",
          preview: (
            <div className="max-w-xs">
              <Stepper steps={operationSteps} activeStep={2} orientation="vertical" />
            </div>
          ),
          code: `<Stepper steps={steps} activeStep={2} orientation="vertical" />`,
        },
        {
          title: "Con error",
          description: "Cuando un paso falla, los siguientes quedan bloqueados.",
          preview: (
            <div className="max-w-xl">
              <Stepper steps={errorSteps} />
            </div>
          ),
          code: `const steps = [
  { id: "a", label: "Ingreso",      status: "completed" },
  { id: "b", label: "Verificación", status: "error" },
  { id: "c", label: "Aprobación",   status: "pending" },
]
<Stepper steps={steps} />`,
        },
      ]}
    />
  );
}
