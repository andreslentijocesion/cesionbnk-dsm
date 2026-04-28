import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import { StatsDashboard } from "../components/patterns/StatsDashboard";

const statsDashboardCode = `import { StatsDashboard } from "@/components/patterns/StatsDashboard";

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