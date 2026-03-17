import { ComponentShowcase } from "../components/ui/component-showcase";
import { StatsDashboard } from "../components/patterns/stats-dashboard";

const statsDashboardCode = `import { StatsDashboard } from "@/components/patterns/stats-dashboard";

export function StatsDashboardDemo() {
  return <StatsDashboard />;
}`;

export function StatsDashboardPage() {
  return (
    <ComponentShowcase
      title="KPIs Dashboard"
      description="Card + Badge + Progress + Separator + Icons"
      category="Business Pattern"
      preview={<StatsDashboard />}
      code={statsDashboardCode}
    />
  );
}