import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-semibold">{value}</div>
        {change && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={trend === "up" ? "default" : "destructive"} className="text-xs">
              {change}
            </Badge>
            <p className="text-xs text-muted-foreground">vs mes anterior</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
