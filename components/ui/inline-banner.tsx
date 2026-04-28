/**
 * InlineBanner — Full-width page-level notification banner
 * Sits at the top of a page or section. Dismissible, supports action button.
 * Different from Alert (inline) and Toast (ephemeral overlay).
 * @layer atoms
 */
import * as React from "react";
import { X, Info, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "./utils";

export type BannerVariant = "info" | "warning" | "success" | "error";

export interface InlineBannerProps {
  variant?: BannerVariant;
  title?: string;
  message: React.ReactNode;
  /** Action button label */
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Controlled visibility */
  visible?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BannerVariant, {
  wrapper: string;
  icon: React.ElementType;
  iconClass: string;
  actionClass: string;
}> = {
  info: {
    wrapper: "bg-info-subtle border-info/30 text-info-on-subtle dark:bg-info/10 dark:border-info/20 dark:text-info/90",
    icon: Info,
    iconClass: "text-info dark:text-info/80",
    actionClass: "text-info-on-subtle hover:text-info dark:text-info/70 dark:hover:text-info",
  },
  warning: {
    wrapper: "bg-warning-subtle border-warning/30 text-warning-on-subtle dark:bg-warning/10 dark:border-warning/20 dark:text-warning/90",
    icon: AlertTriangle,
    iconClass: "text-warning dark:text-warning/80",
    actionClass: "text-warning-on-subtle hover:text-warning dark:text-warning/70 dark:hover:text-warning",
  },
  success: {
    wrapper: "bg-success-subtle border-success/30 text-success-on-subtle dark:bg-success/10 dark:border-success/20 dark:text-success/90",
    icon: CheckCircle2,
    iconClass: "text-success dark:text-success/80",
    actionClass: "text-success-on-subtle hover:text-success dark:text-success/70 dark:hover:text-success",
  },
  error: {
    wrapper: "bg-destructive-subtle border-destructive/30 text-destructive-on-subtle dark:bg-destructive/10 dark:border-destructive/20 dark:text-destructive/90",
    icon: AlertCircle,
    iconClass: "text-destructive dark:text-destructive/80",
    actionClass: "text-destructive-on-subtle hover:text-destructive dark:text-destructive/70 dark:hover:text-destructive",
  },
};

export function InlineBanner({
  variant = "info",
  title,
  message,
  actionLabel,
  onAction,
  dismissible = true,
  onDismiss,
  visible = true,
  icon,
  className,
}: InlineBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (!visible || dismissed) return null;

  const cfg = variantStyles[variant];
  const Icon = cfg.icon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        cfg.wrapper,
        className
      )}
    >
      <span className="flex-shrink-0 mt-0.5">
        {icon ?? <Icon className={cn("h-4 w-4", cfg.iconClass)} />}
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold leading-tight mb-0.5">{title}</p>
        )}
        <p className="leading-snug opacity-90">{message}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={cn("mt-1.5 text-xs font-semibold underline underline-offset-2 transition-colors", cfg.actionClass)}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity rounded-sm p-0.5"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
