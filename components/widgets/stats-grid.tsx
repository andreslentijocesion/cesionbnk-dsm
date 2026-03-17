import { StatCard } from "./stat-card";
import { DollarSign, FileText, CheckCircle, Clock } from "lucide-react";

export function StatsGrid() {
  const stats = [
    { title: "Active Portfolio", value: "$45,231,890", change: "+20.1%", trend: "up" as const, icon: DollarSign },
    { title: "Invoices Processed", value: "1,234", change: "+12.5%", trend: "up" as const, icon: FileText },
    { title: "Approval Rate", value: "94.2%", change: "+2.3%", trend: "up" as const, icon: CheckCircle },
    { title: "Average Time", value: "2.4 days", change: "-15.8%", trend: "down" as const, icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
