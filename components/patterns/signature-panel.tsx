/**
 * SignaturePanel — Electronic signature workflow panel.
 * Shows signatories, their status, signing order, and available actions.
 * Designed for factoring: approval chains, disbursement authorization, KYC.
 * @layer patterns
 */
import { Check, X, Clock, Mail, RefreshCw, UserX, FileText, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export type SignatureStatus = "pending" | "signed" | "rejected" | "expired" | "skipped";

export interface Signatory {
  id: string;
  name: string;
  role: string;
  email: string;
  status: SignatureStatus;
  order?: number;
  signedAt?: string;
  rejectedReason?: string;
}

export interface SignaturePanelProps {
  title?: string;
  documentName?: string;
  signatories: Signatory[];
  /** Whether signing must follow the `order` field */
  sequential?: boolean;
  /** Expiry date of the signing request */
  expiresAt?: string;
  onRemind?: (id: string) => void;
  onRevoke?: (id: string) => void;
  className?: string;
}

const statusConfig: Record<SignatureStatus, {
  label: string;
  icon: React.ReactNode;
  badge: string;
  badgeClass: string;
  row: string;
}> = {
  signed: {
    label: "Firmado",
    icon: <Check className="size-4" />,
    badge: "Firmado",
    badgeClass: "bg-success/10 text-success border-success/20",
    row: "",
  },
  pending: {
    label: "Pendiente",
    icon: <Clock className="size-4" />,
    badge: "Pendiente",
    badgeClass: "bg-warning/10 text-warning border-warning/20",
    row: "bg-warning/5",
  },
  rejected: {
    label: "Rechazado",
    icon: <X className="size-4" />,
    badge: "Rechazado",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    row: "bg-destructive/5",
  },
  expired: {
    label: "Expirado",
    icon: <Clock className="size-4" />,
    badge: "Expirado",
    badgeClass: "bg-muted text-muted-foreground border-border",
    row: "",
  },
  skipped: {
    label: "Omitido",
    icon: <UserX className="size-4" />,
    badge: "Omitido",
    badgeClass: "bg-muted text-muted-foreground border-border",
    row: "",
  },
};

const statusIcon: Record<SignatureStatus, string> = {
  signed:   "bg-success text-success-foreground border-success",
  pending:  "bg-background text-warning border-warning",
  rejected: "bg-destructive text-destructive-foreground border-destructive",
  expired:  "bg-muted text-muted-foreground border-border",
  skipped:  "bg-muted text-muted-foreground border-border",
};

function ProgressBar({ signatories }: { signatories: Signatory[] }) {
  const signed = signatories.filter((s) => s.status === "signed").length;
  const total  = signatories.length;
  const pct    = total > 0 ? Math.round((signed / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{signed} de {total} firmas completadas</span>
        <span className="font-medium">{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-success rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SignaturePanel({
  title = "Solicitud de firma",
  documentName,
  signatories,
  sequential = false,
  expiresAt,
  onRemind,
  onRevoke,
  className,
}: SignaturePanelProps) {
  const sorted = sequential
    ? [...signatories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : signatories;

  const allSigned   = signatories.every((s) => s.status === "signed");
  const hasRejected = signatories.some((s) => s.status === "rejected");

  return (
    <div className={cn("rounded-lg border bg-card shadow-sm overflow-hidden", className)}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-border bg-muted/30">
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            {allSigned
              ? <Lock className="size-4 text-success" />
              : hasRejected
              ? <X className="size-4 text-destructive" />
              : <FileText className="size-4 text-primary" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {documentName && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">{documentName}</p>
            )}
          </div>
          {allSigned && (
            <Badge variant="success-soft-outline">
              Completado
            </Badge>
          )}
          {hasRejected && (
            <Badge variant="destructive-soft-outline">
              Rechazado
            </Badge>
          )}
        </div>

        <div className="mt-3">
          <ProgressBar signatories={signatories} />
        </div>

        {expiresAt && (
          <div className="flex items-center gap-1.5 mt-2">
            <Clock className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Vence: {expiresAt}</span>
          </div>
        )}

        {sequential && (
          <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
            <span className="inline-block size-1.5 .5 rounded-full bg-primary/60" />
            Firma secuencial — cada firmante debe completar en orden
          </p>
        )}
      </div>

      {/* Signatories */}
      <div className="divide-y divide-border">
        {sorted.map((sig, i) => {
          const cfg = statusConfig[sig.status];
          const isBlocked = sequential && i > 0 && sorted[i - 1]?.status !== "signed" && sig.status === "pending";

          return (
            <div key={sig.id} className={cn("px-5 py-3.5", cfg.row, isBlocked && "opacity-50")}>
              <div className="flex items-center gap-3">
                {/* Order / status circle */}
                <div className={cn(
                  "size-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold",
                  statusIcon[sig.status],
                )}>
                  {sig.status === "signed"   ? <Check className="size-3.5 .5" /> :
                   sig.status === "rejected" ? <X className="size-3.5 .5" /> :
                   sequential ? (sig.order ?? i + 1) : statusConfig[sig.status].icon}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground leading-tight">{sig.name}</p>
                    <Badge variant="outline" className={cn("text-xs px-1.5 py-0 h-4", cfg.badgeClass)}>
                      {cfg.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">{sig.role} · {sig.email}</p>
                  {sig.signedAt && (
                    <p className="text-xs text-success mt-0.5">Firmado: {sig.signedAt}</p>
                  )}
                  {sig.rejectedReason && (
                    <p className="text-xs text-destructive mt-0.5">{sig.rejectedReason}</p>
                  )}
                  {isBlocked && (
                    <p className="text-xs text-muted-foreground mt-0.5">Esperando firma anterior</p>
                  )}
                </div>

                {/* Actions */}
                {sig.status === "pending" && !isBlocked && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {onRemind && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-muted-foreground"
                        onClick={() => onRemind(sig.id)}
                      >
                        <Mail className="size-3 mr-1" />
                        Recordar
                      </Button>
                    )}
                    {onRevoke && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                        onClick={() => onRevoke(sig.id)}
                      >
                        <RefreshCw className="size-3 mr-1" />
                        Revocar
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
