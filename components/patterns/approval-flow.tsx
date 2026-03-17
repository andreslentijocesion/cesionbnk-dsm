/**
 * ApprovalFlow — Multi-step approval workflow panel
 * Shows approvers, their status, comments, and timestamps.
 * Factoring-ready: aprobación de operaciones, límites de crédito, incorporación de cedentes.
 * @layer patterns
 */
import { CheckCircle2, XCircle, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type ApproverStatus = "approved" | "rejected" | "pending" | "skipped";

export interface Approver {
  id: string;
  name: string;
  role: string;
  status: ApproverStatus;
  comment?: string;
  timestamp?: string;
  /** Whether this approver is the current user */
  isCurrent?: boolean;
}

export interface ApprovalFlowProps {
  title?: string;
  /** Overall status of the approval */
  status: "pending" | "approved" | "rejected" | "in_review";
  approvers: Approver[];
  /** Called when current approver clicks Approve */
  onApprove?: () => void;
  /** Called when current approver clicks Reject */
  onReject?: () => void;
  className?: string;
}

const approverMeta: Record<ApproverStatus, {
  icon: React.ElementType;
  dotClass: string;
  iconClass: string;
  label: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
}> = {
  approved: { icon: CheckCircle2, dotClass: "border-primary bg-primary",         iconClass: "text-primary-foreground", label: "Aprobó",    badgeVariant: "default" },
  rejected: { icon: XCircle,      dotClass: "border-destructive bg-destructive",  iconClass: "text-destructive-foreground", label: "Rechazó",  badgeVariant: "destructive" },
  pending:  { icon: Clock,        dotClass: "border-border bg-background",        iconClass: "text-muted-foreground",   label: "Pendiente", badgeVariant: "secondary" },
  skipped:  { icon: AlertCircle,  dotClass: "border-border bg-muted",             iconClass: "text-muted-foreground",   label: "Omitido",   badgeVariant: "outline" },
};

const flowStatusMeta: Record<ApprovalFlowProps["status"], { label: string; color: string; bg: string }> = {
  pending:   { label: "Pendiente de aprobación", color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-950/40" },
  in_review: { label: "En revisión",             color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 dark:bg-blue-950/40" },
  approved:  { label: "Aprobada",                color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  rejected:  { label: "Rechazada",               color: "text-destructive",                   bg: "bg-destructive/10" },
};

export function ApprovalFlow({ title, status, approvers, onApprove, onReject, className }: ApprovalFlowProps) {
  const flowMeta = flowStatusMeta[status];
  const currentApprover = approvers.find((a) => a.isCurrent && a.status === "pending");

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className={cn("flex items-center gap-2 rounded-lg px-4 py-3", flowMeta.bg)}>
        <div className="flex-1">
          {title && <p className="text-xs text-muted-foreground mb-0.5">{title}</p>}
          <p className={cn("text-sm font-semibold", flowMeta.color)}>{flowMeta.label}</p>
        </div>
        <Badge
          variant={status === "approved" ? "default" : status === "rejected" ? "destructive" : "secondary"}
          className="text-xs"
        >
          {approvers.filter((a) => a.status === "approved").length}/{approvers.length} aprobaciones
        </Badge>
      </div>

      {/* Approvers list */}
      <ol className="space-y-0">
        {approvers.map((approver, i) => {
          const meta = approverMeta[approver.status];
          const Icon = meta.icon;
          const isLast = i === approvers.length - 1;
          return (
            <li key={approver.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors", meta.dotClass)}>
                  <Icon className={cn("h-4 w-4", meta.iconClass)} />
                </div>
                {!isLast && (
                  <div className={cn(
                    "mt-1 w-0.5 flex-1 transition-colors",
                    approver.status === "approved" ? "bg-primary" : "bg-border"
                  )} style={{ minHeight: "1.5rem" }} />
                )}
              </div>
              <div className={cn("pb-4 flex-1 min-w-0", isLast && "pb-0")}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={cn(
                      "text-sm font-medium leading-tight",
                      approver.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {approver.name}
                      {approver.isCurrent && (
                        <span className="ml-1.5 text-xs font-normal text-primary">(tú)</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{approver.role}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <Badge variant={meta.badgeVariant} className="text-xs">{meta.label}</Badge>
                    {approver.timestamp && (
                      <span className="text-xs text-muted-foreground">{approver.timestamp}</span>
                    )}
                  </div>
                </div>
                {approver.comment && (
                  <div className="mt-1.5 flex gap-1.5 items-start text-xs text-muted-foreground bg-muted/40 rounded-md px-2.5 py-2">
                    <MessageSquare className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                    <span>{approver.comment}</span>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Action buttons for current approver */}
      {currentApprover && (onApprove || onReject) && (
        <div className="flex gap-2 pt-2 border-t border-border">
          {onApprove && (
            <Button className="flex-1" onClick={onApprove}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Aprobar
            </Button>
          )}
          {onReject && (
            <Button variant="destructive" className="flex-1" onClick={onReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Rechazar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
