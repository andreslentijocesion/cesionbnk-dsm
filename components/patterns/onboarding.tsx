/**
 * Onboarding — Module-specific empty state with illustration, title, description and CTA
 * Factoring-ready: pantallas de bienvenida para módulos sin datos aún.
 * @layer patterns
 */
import {
  FileText, Users, Building2, BarChart3, Bell, Calculator,
  Plus, ArrowRight, type LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type OnboardingModule =
  | "operaciones" | "cedentes" | "deudores" | "portafolio"
  | "alertas" | "calculadora" | "custom";

export interface OnboardingAction {
  label: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary";
  icon?: LucideIcon;
}

export interface OnboardingProps {
  module?: OnboardingModule;
  /** Override title */
  title?: string;
  /** Override description */
  description?: string;
  /** Override icon */
  icon?: LucideIcon;
  actions?: OnboardingAction[];
  /** Additional tips or steps list */
  steps?: string[];
  /** Size variant */
  size?: "sm" | "default" | "lg";
  className?: string;
}

const moduleMeta: Record<Exclude<OnboardingModule, "custom">, {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}> = {
  operaciones: {
    title: "Sin operaciones aún",
    description: "Ingresa tu primera factura para comenzar el proceso de factoring. El flujo completo toma menos de 5 minutos.",
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  cedentes: {
    title: "Sin cedentes registrados",
    description: "Agrega los cedentes que cederán sus facturas. Necesitarás RUT, razón social y documentación KYC.",
    icon: Building2,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  deudores: {
    title: "Sin deudores registrados",
    description: "Los deudores se agregan automáticamente al ingresar facturas, o puedes crearlos manualmente con sus datos tributarios.",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  portafolio: {
    title: "Tu cartera está vacía",
    description: "Una vez que se desembolsen operaciones, aquí verás el análisis completo de tu cartera activa con indicadores de riesgo.",
    icon: BarChart3,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  alertas: {
    title: "Sin alertas pendientes",
    description: "Las alertas de vencimiento aparecen automáticamente cuando una factura se acerca a su fecha de pago.",
    icon: Bell,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  calculadora: {
    title: "Simula tu operación",
    description: "Ingresa el monto de la factura, la tasa y el plazo para calcular el costo del factoring y el monto a recibir.",
    icon: Calculator,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
  },
};

const sizeStyles = {
  sm:      { wrapper: "py-8 px-4 max-w-sm",  iconWrapper: "h-12 w-12", icon: "h-6 w-6",   title: "text-base",  desc: "text-xs" },
  default: { wrapper: "py-12 px-6 max-w-md", iconWrapper: "h-16 w-16", icon: "h-8 w-8",   title: "text-lg",    desc: "text-sm" },
  lg:      { wrapper: "py-16 px-8 max-w-lg", iconWrapper: "h-20 w-20", icon: "h-10 w-10", title: "text-xl",    desc: "text-base" },
};

export function Onboarding({
  module = "custom",
  title,
  description,
  icon,
  actions = [],
  steps,
  size = "default",
  className,
}: OnboardingProps) {
  const meta = module !== "custom" ? moduleMeta[module] : null;
  const resolvedTitle = title ?? meta?.title ?? "Sin datos";
  const resolvedDesc = description ?? meta?.description ?? "";
  const resolvedColor = meta?.color ?? "text-muted-foreground";
  const resolvedBg = meta?.bg ?? "bg-muted";
  const Icon = icon ?? meta?.icon ?? FileText;
  const sz = sizeStyles[size];

  return (
    <div className={cn("flex flex-col items-center text-center mx-auto", sz.wrapper, className)}>
      {/* Icon */}
      <div className={cn("flex items-center justify-center rounded-2xl mb-5 flex-shrink-0", sz.iconWrapper, resolvedBg)}>
        <Icon className={cn(sz.icon, resolvedColor)} />
      </div>

      {/* Text */}
      <h3 className={cn("font-semibold text-foreground", sz.title)}>{resolvedTitle}</h3>
      {resolvedDesc && (
        <p className={cn("mt-2 text-muted-foreground leading-relaxed", sz.desc)}>{resolvedDesc}</p>
      )}

      {/* Steps */}
      {steps && steps.length > 0 && (
        <ol className="mt-4 text-left space-y-2 w-full">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={cn(
                "flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold h-5 w-5 mt-0.5",
                resolvedBg, resolvedColor
              )}>
                {i + 1}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      )}

      {/* Actions */}
      {actions.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {actions.map((action, i) => {
            const ActionIcon = action.icon ?? (i === 0 ? Plus : ArrowRight);
            return (
              <Button
                key={i}
                variant={action.variant ?? (i === 0 ? "default" : "outline")}
                onClick={action.onClick}
              >
                <ActionIcon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
