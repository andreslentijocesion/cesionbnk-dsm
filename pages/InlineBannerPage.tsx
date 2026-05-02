import { useState } from "react";
import { ComponentShowcase } from "../components/ui/componentshowcase";
import { InlineBanner } from "../components/ui/inlinebanner";
import { Button } from "../components/ui/button";

function InlineBannerDemo() {
  const [show, setShow] = useState({ info: true, warning: true, success: true, error: true });
  const reset = () => setShow({ info: true, warning: true, success: true, error: true });

  return (
    <div className="space-y-3 max-w-2xl">
      {show.info && (
        <InlineBanner
          key="info"
          variant="info"
          title="Actualización del sistema"
          message="El módulo de desembolsos estará en mantenimiento el domingo 16 de marzo de 02:00 a 04:00 AM."
          actionLabel="Ver detalles"
          onAction={() => {}}
          onDismiss={() => setShow(s => ({ ...s, info: false }))}
        />
      )}
      {show.warning && (
        <InlineBanner
          key="warning"
          variant="warning"
          title="Documentos por vencer"
          message="3 cedentes tienen documentos KYC que vencen en los próximos 15 días. Solicita renovación a tiempo."
          actionLabel="Revisar cedentes"
          onAction={() => {}}
          onDismiss={() => setShow(s => ({ ...s, warning: false }))}
        />
      )}
      {show.success && (
        <InlineBanner
          key="success"
          variant="success"
          message="La operación FCT-2025-001 fue desembolsada exitosamente por $185.000.000."
          onDismiss={() => setShow(s => ({ ...s, success: false }))}
        />
      )}
      {show.error && (
        <InlineBanner
          key="error"
          variant="error"
          title="Error de sincronización"
          message="No se pudo conectar con el sistema bancario. Los datos de saldo pueden estar desactualizados."
          actionLabel="Reintentar"
          onAction={() => {}}
          onDismiss={() => setShow(s => ({ ...s, error: false }))}
        />
      )}
      {!Object.values(show).some(Boolean) && (
        <div className="text-center py-4">
          <Button variant="outline" size="sm" onClick={reset}>Mostrar de nuevo</Button>
        </div>
      )}
    </div>
  );
}

export function InlineBannerPage() {
  return (
    <ComponentShowcase
      title="Inline Banner"
      description="Banner de notificación de ancho completo para avisos a nivel de página o sección. Diferente al Alert (inline con contenido) y al Toast (superposición temporal). Ideal para mantenimiento, KYC vencido, límites agotados."
      category="Feedback"
      atomicLevel="Atom"
      preview={<InlineBannerDemo />}
      code={`import { InlineBanner } from "@/components/ui/inlinebanner"

<InlineBanner
  variant="warning"
  title="Documentos por vencer"
  message="3 cedentes tienen documentos KYC que vencen en 15 días."
  actionLabel="Revisar cedentes"
  onAction={() => navigate('/cedentes')}
/>`}
      props={[
        { name: "variant",      type: '"info" | "warning" | "success" | "error"', description: "Variante de color. Default: info." },
        { name: "message",      type: "React.ReactNode", description: "Mensaje principal del banner." },
        { name: "title",        type: "string",   description: "Título en negrita (opcional).", required: false },
        { name: "actionLabel",  type: "string",   description: "Texto del botón de acción.", required: false },
        { name: "onAction",     type: "() => void", description: "Callback del botón de acción.", required: false },
        { name: "dismissible",  type: "boolean",  description: "Muestra botón para cerrar. Default: true.", required: false },
        { name: "onDismiss",    type: "() => void", description: "Callback al cerrar.", required: false },
        { name: "visible",      type: "boolean",  description: "Control externo de visibilidad.", required: false },
      ]}
      examples={[
        {
          title: "Sin título ni botón de acción",
          description: "Versión mínima para confirmaciones simples.",
          preview: (
            <div className="space-y-2 max-w-2xl">
              <InlineBanner variant="success" message="Cambios guardados correctamente." dismissible={false} />
              <InlineBanner variant="info" message="Estás viendo datos del mes anterior." dismissible={false} />
            </div>
          ),
          code: `<InlineBanner variant="success" message="Cambios guardados." dismissible={false} />`,
        },
        {
          title: "No descartable",
          description: "Para avisos críticos que el usuario no puede ignorar.",
          preview: (
            <div className="max-w-2xl">
              <InlineBanner
                variant="error"
                title="Cuenta suspendida"
                message="Tu cuenta tiene facturas vencidas por más de 90 días. Contacta a tu ejecutivo para regularizar."
                dismissible={false}
                actionLabel="Contactar ejecutivo"
                onAction={() => {}}
              />
            </div>
          ),
          code: `<InlineBanner variant="error" title="Cuenta suspendida" message="..." dismissible={false} actionLabel="Contactar" />`,
        },
      ]}
    />
  );
}
