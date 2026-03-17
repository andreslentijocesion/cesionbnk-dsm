import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../ui/utils";
import { TrendingUp, CheckCircle, Clock, FileText } from "lucide-react";

export interface StatusKPICardProps {
  title: string;
  subtitle: string;
  amount?: string;
  count?: number;
  variant?: "negotiation" | "disbursed" | "default" | "warning" | "error";
  state?: "active" | "hover" | "normal";
  onViewClick?: () => void;
  className?: string;
}

export function StatusKPICard({
  title,
  subtitle,
  amount,
  count,
  variant = "default",
  state = "normal",
  onViewClick,
  className,
}: StatusKPICardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "negotiation":
        return state === "active"
          ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary"
          : "border-border hover:border-primary/50 hover:bg-primary/5";
      case "disbursed":
        return state === "active"
          ? "border-green-500 bg-green-50 shadow-md ring-1 ring-green-500"
          : "border-border hover:border-green-500/50 hover:bg-green-50";
      case "warning":
        return state === "active"
          ? "border-amber-500 bg-amber-50 shadow-md ring-1 ring-amber-500"
          : "border-border hover:border-amber-500/50 hover:bg-amber-50";
      case "error":
        return state === "active"
          ? "border-red-500 bg-red-50 shadow-md ring-1 ring-red-500"
          : "border-border hover:border-red-500/50 hover:bg-red-50";
      default:
        return state === "active"
          ? "border-foreground bg-accent shadow-md ring-1 ring-foreground"
          : "border-border hover:border-foreground/50 hover:bg-accent/50";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "negotiation": return <Clock className="h-4 w-4 text-primary" />;
      case "disbursed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <TrendingUp className="h-4 w-4 text-amber-600" />;
      case "error": return <TrendingUp className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getAmountColor = () => {
    switch (variant) {
      case "negotiation": return "text-primary";
      case "disbursed": return "text-green-600";
      case "warning": return "text-amber-600";
      case "error": return "text-red-600";
      default: return "text-foreground";
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 h-full",
        getVariantStyles(),
        className
      )}
      onClick={onViewClick}
    >
      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground/80 flex items-center gap-2">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={cn("p-2 rounded-full bg-background border shadow-sm", getAmountColor())}>
            {getIcon()}
          </div>
        </div>
        <div className="space-y-1">
          {amount && <div className={cn("text-2xl font-bold tracking-tight", getAmountColor())}>{amount}</div>}
          {count !== undefined && (
            <div className="text-xs font-medium text-muted-foreground">
              {count} {count === 1 ? "operation" : "operations"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
