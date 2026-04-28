import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { Onboarding } from "../components/patterns/Onboarding";
import { toast } from "sonner";
import { Calculator } from "lucide-react";

export function OnboardingPage() {
  return (
    <ComponentShowcase
      title="Onboarding"
      description="Pantalla de bienvenida para módulos sin datos. Muestra ícono, título, descripción, pasos opcionales y CTAs. Incluye presets para los módulos de factoring."
      category="Patterns"
      atomicLevel="Molecule"
      preview={
        <Onboarding
          module="operaciones"
          actions={[
            { label: "Ingresar factura", onClick: () => toast.success("Navegar a nueva operación") },
            { label: "Ver tutorial", variant: "outline", onClick: () => toast.info("Abriendo tutorial") },
          ]}
          steps={[
            "Sube la factura en formato PDF o XML.",
            "Verifica los datos del deudor y el monto.",
            "Envía a aprobación — recibirás el dinero en 24 horas.",
          ]}
        />
      }
      code={`import { Onboarding } from "@/components/patterns/Onboarding"

<Onboarding
  module="operaciones"
  actions={[
    { label: "Ingresar factura", onClick: () => navigate("/nueva-operacion") },
    { label: "Ver tutorial",     variant: "outline" },
  ]}
  steps={[
    "Sube la factura en PDF o XML.",
    "Verifica deudor y monto.",
    "Envía a aprobación — dinero en 24 horas.",
  ]}
/>`}
      props={[
        { name: "module",      type: '"operaciones" | "cedentes" | "deudores" | "portafolio" | "alertas" | "calculadora" | "custom"', description: "Preset del módulo. Define ícono, título y descripción automáticamente.", required: false },
        { name: "title",       type: "string",  description: "Título. Sobreescribe el del módulo.", required: false },
        { name: "description", type: "string",  description: "Descripción. Sobreescribe la del módulo.", required: false },
        { name: "icon",        type: "LucideIcon", description: "Ícono. Sobreescribe el del módulo.", required: false },
        { name: "actions",     type: "OnboardingAction[]", description: "Botones de acción.", required: false },
        { name: "steps",       type: "string[]", description: "Lista de pasos numerados opcionales.", required: false },
        { name: "size",        type: '"sm" | "default" | "lg"', description: "Tamaño del componente. Default: default.", required: false },
      ]}
      examples={[
        {
          title: "Módulo Cartera (portafolio)",
          description: "Preset para el módulo de portafolio sin operaciones desembolsadas.",
          preview: (
            <Onboarding
              module="portafolio"
              actions={[{ label: "Ver operaciones aprobadas", variant: "outline" }]}
            />
          ),
          code: `<Onboarding module="portafolio" actions={[{ label: "Ver operaciones" }]} />`,
        },
        {
          title: "Custom con ícono propio",
          description: "Para módulos no incluidos en los presets.",
          preview: (
            <Onboarding
              module="custom"
              icon={Calculator}
              title="Simula tu primera operación"
              description="Calcula el costo de factorizar una factura: ingresa el monto, la tasa pactada y el plazo en días."
              size="sm"
              actions={[{ label: "Calcular ahora" }]}
            />
          ),
          code: `<Onboarding
  module="custom"
  icon={Calculator}
  title="Simula tu primera operación"
  description="Ingresa monto, tasa y plazo."
  size="sm"
  actions={[{ label: "Calcular ahora" }]}
/>`,
        },
        {
          title: "Sin datos — módulo alertas",
          description: "Estado tranquilizador cuando no hay alertas pendientes.",
          preview: (
            <Onboarding
              module="alertas"
              size="sm"
            />
          ),
          code: `<Onboarding module="alertas" size="sm" />`,
        },
      ]}
    />
  );
}
