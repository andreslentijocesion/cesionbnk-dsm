import { KPIShowcase } from "../components/patterns/kpi-showcase";
import { KPIShowcaseExtended } from "../components/patterns/kpi-showcase-extended";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ComponentShowcase } from "../components/ui/component-showcase";

function KpiShowcaseDemo() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">KPI Showcase</h1>
        <p className="text-muted-foreground mt-2">
          Complete KPI system: Advanced dashboard with interactive charts, standard metrics, and KPI Cards
        </p>
      </div>

      <Tabs defaultValue="advanced" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-2">
          <TabsTrigger value="advanced">Advanced Dashboard</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
        </TabsList>

        {/* Advanced Dashboard Tab */}
        <TabsContent value="advanced" className="mt-6">
          <KPIShowcase />
        </TabsContent>

        {/* Standard KPI Tab */}
        <TabsContent value="standard" className="mt-6">
          <KPIShowcaseExtended />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function KpiShowcasePage() {
  return (
    <ComponentShowcase
      title="KPI Showcase"
      description="Complete KPI system: advanced dashboard with interactive charts, standard metrics, and KPI Cards. Includes KPIShowcase and KPIShowcaseExtended patterns with tabs to switch between views."
      category="Patterns"
      preview={<KpiShowcaseDemo />}
      code={`import { KPIShowcase } from "@/components/patterns/kpi-showcase";
import { KPIShowcaseExtended } from "@/components/patterns/kpi-showcase-extended";

<KPIShowcase />
<KPIShowcaseExtended />`}
      props={[
        { name: "(self-contained)", type: "—", description: "Both KPIShowcase and KPIShowcaseExtended are self-contained with mock data." },
      ]}
      examples={[]}
    />
  );
}