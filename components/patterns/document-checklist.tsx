import { CheckCircle2, Clock, XCircle, AlertTriangle, Upload, Eye, FileText, RotateCcw } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { cn } from "../../lib/utils";

export type DocumentStatus =
  | "pending"
  | "uploaded"
  | "reviewing"
  | "approved"
  | "rejected"
  | "expired";

export interface ChecklistDocument {
  id: string;
  name: string;
  description?: string;
  required?: boolean;
  status: DocumentStatus;
  fileName?: string;
  uploadedAt?: string;
  expiresAt?: string;
  rejectionReason?: string;
}

export interface DocumentChecklistProps {
  documents: ChecklistDocument[];
  onUpload?: (id: string) => void;
  onView?: (id: string) => void;
  title?: string;
  showProgress?: boolean;
  className?: string;
}

const statusConfig: Record<
  DocumentStatus,
  { label: string; icon: React.ElementType; color: string; badgeVariant: "outline" }
> = {
  pending:   { label: "Pendiente",   icon: Clock,          color: "text-muted-foreground", badgeVariant: "outline" },
  uploaded:  { label: "Cargado",     icon: FileText,        color: "text-info-on-subtle",      badgeVariant: "outline" },
  reviewing: { label: "En revisión", icon: RotateCcw,       color: "text-warning-on-subtle",   badgeVariant: "outline" },
  approved:  { label: "Aprobado",    icon: CheckCircle2,    color: "text-success-on-subtle",   badgeVariant: "outline" },
  rejected:  { label: "Rechazado",   icon: XCircle,         color: "text-destructive",        badgeVariant: "outline" },
  expired:   { label: "Vencido",     icon: AlertTriangle,   color: "text-caution-on-subtle",  badgeVariant: "outline" },
};

function DocumentRow({
  doc,
  onUpload,
  onView,
}: {
  doc: ChecklistDocument;
  onUpload?: (id: string) => void;
  onView?: (id: string) => void;
}) {
  const cfg = statusConfig[doc.status];
  const Icon = cfg.icon;
  const canUpload = doc.status === "pending" || doc.status === "rejected" || doc.status === "expired";
  const canView = doc.status === "uploaded" || doc.status === "reviewing" || doc.status === "approved";

  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border transition-colors",
      doc.status === "approved" && "bg-success-subtle/50 border-success/20",
      doc.status === "rejected" && "bg-destructive-subtle/50 border-destructive/20",
      doc.status === "expired"  && "bg-caution-subtle/50 border-caution/20",
      doc.status === "pending"  && "border-dashed",
      !["approved","rejected","expired"].includes(doc.status) && "border-border",
    )}>
      <Icon size={18} className={cn("mt-0.5 shrink-0", cfg.color)} />

      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">{doc.name}</span>
          {doc.required && (
            <span className="text-xs text-destructive">*requerido</span>
          )}
          <Badge variant={cfg.badgeVariant} className="text-xs h-5">
            {cfg.label}
          </Badge>
        </div>

        {doc.description && (
          <p className="text-xs text-muted-foreground">{doc.description}</p>
        )}
        {doc.fileName && (
          <p className="text-xs text-muted-foreground truncate">{doc.fileName}</p>
        )}
        {doc.uploadedAt && (
          <p className="text-xs text-muted-foreground">Cargado: {doc.uploadedAt}</p>
        )}
        {doc.expiresAt && (
          <p className={cn(
            "text-xs",
            doc.status === "expired" ? "text-caution-on-subtle font-medium" : "text-muted-foreground",
          )}>
            Vence: {doc.expiresAt}
          </p>
        )}
        {doc.rejectionReason && (
          <p className="text-xs text-destructive">Motivo: {doc.rejectionReason}</p>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {canView && onView && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            aria-label="Ver documento"
            onClick={() => onView(doc.id)}
          >
            <Eye size={14} />
          </Button>
        )}
        {canUpload && onUpload && (
          <Button
            variant={doc.status === "pending" ? "outline" : "ghost"}
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={() => onUpload(doc.id)}
          >
            <Upload size={12} />
            {doc.status === "rejected" || doc.status === "expired" ? "Reemplazar" : "Cargar"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function DocumentChecklist({
  documents,
  onUpload,
  onView,
  title = "Documentos requeridos",
  showProgress = true,
  className,
}: DocumentChecklistProps) {
  const approved = documents.filter((d) => d.status === "approved").length;
  const total = documents.length;
  const pct = total > 0 ? Math.round((approved / total) * 100) : 0;

  const groups: Partial<Record<DocumentStatus, ChecklistDocument[]>> = {};
  for (const doc of documents) {
    if (!groups[doc.status]) groups[doc.status] = [];
    groups[doc.status]!.push(doc);
  }

  // Sort: rejected first, then expired, then pending, then reviewing, then uploaded, then approved
  const order: DocumentStatus[] = ["rejected","expired","pending","reviewing","uploaded","approved"];
  const sorted = order.flatMap((s) => groups[s] ?? []);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {approved}/{total} aprobados
        </span>
      </div>

      {showProgress && (
        <div className="space-y-1">
          <Progress value={pct} className="h-1.5" />
          <p className="text-xs text-muted-foreground text-right">{pct}% completado</p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((doc) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
            onUpload={onUpload}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
}
