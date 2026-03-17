import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { LucideIcon } from "lucide-react";

interface ApprovalTimelineItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  user: string;
  role: string;
  timestamp: string;
  status: string;
  statusVariant?: "default" | "secondary" | "outline" | "destructive";
}

export function ApprovalTimelineItem({
  icon: Icon,
  iconColor,
  title,
  user,
  role,
  timestamp,
  status,
  statusVariant = "default",
}: ApprovalTimelineItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`flex-shrink-0 ${iconColor}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{title}</p>
          <Badge variant={statusVariant} className="text-xs">{status}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {user.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span>{user}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{role}</span>
        </div>
        <time className="text-xs text-muted-foreground">{timestamp}</time>
      </div>
    </div>
  );
}
