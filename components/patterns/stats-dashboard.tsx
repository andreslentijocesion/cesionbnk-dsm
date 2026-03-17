import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Active Portfolio",
    value: "$45,231,890",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    progress: 75,
    subtitle: "vs last month",
  },
  {
    title: "Invoices Processed",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    progress: 82,
    subtitle: "this month",
  },
  {
    title: "Approval Rate",
    value: "94.2%",
    change: "+2.3%",
    trend: "up",
    icon: CheckCircle,
    progress: 94,
    subtitle: "monthly average",
  },
  {
    title: "Average Time",
    value: "2.4 days",
    change: "-15.8%",
    trend: "down",
    icon: Clock,
    progress: 68,
    subtitle: "processing time",
  },
];

export function StatsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.subtitle}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendIcon
                      className={`h-3 w-3 ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stat.progress}%
                  </Badge>
                </div>

                <Progress value={stat.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
