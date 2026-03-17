import { Sparkline } from "../components/advanced/sparkline";
import { GaugeChart } from "../components/advanced/gauge-chart";
import { Heatmap } from "../components/advanced/heatmap";
import { TreemapChart } from "../components/advanced/treemap-chart";
import { FunnelChart } from "../components/advanced/funnel-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

// Mock data
const sparklineData = Array.from({ length: 30 }, (_, i) => ({
  value: Math.floor(Math.random() * 50) + 50 + (i * 2)
}));

const sparklineData2 = Array.from({ length: 30 }, (_, i) => ({
  value: Math.floor(Math.random() * 30) + 40 - (i * 0.5)
}));

const sparklineData3 = Array.from({ length: 30 }, (_, i) => ({
  value: Math.floor(Math.random() * 20) + 60
}));

const heatmapData = [
  // Monday
  { row: "Mon", col: "9am", value: 12 },
  { row: "Mon", col: "12pm", value: 45 },
  { row: "Mon", col: "3pm", value: 78 },
  { row: "Mon", col: "6pm", value: 34 },
  // Tuesday
  { row: "Tue", col: "9am", value: 23 },
  { row: "Tue", col: "12pm", value: 67 },
  { row: "Tue", col: "3pm", value: 89 },
  { row: "Tue", col: "6pm", value: 45 },
  // Wednesday
  { row: "Wed", col: "9am", value: 34 },
  { row: "Wed", col: "12pm", value: 56 },
  { row: "Wed", col: "3pm", value: 92 },
  { row: "Wed", col: "6pm", value: 67 },
  // Thursday
  { row: "Thu", col: "9am", value: 45 },
  { row: "Thu", col: "12pm", value: 78 },
  { row: "Thu", col: "3pm", value: 85 },
  { row: "Thu", col: "6pm", value: 54 },
  // Friday
  { row: "Fri", col: "9am", value: 56 },
  { row: "Fri", col: "12pm", value: 90 },
  { row: "Fri", col: "3pm", value: 95 },
  { row: "Fri", col: "6pm", value: 32 },
];

const treemapData = [
  {
    name: "Sales",
    size: 5000,
    children: [
      { name: "North", size: 2000 },
      { name: "South", size: 1500 },
      { name: "East", size: 1000 },
      { name: "West", size: 500 },
    ]
  },
  {
    name: "Marketing",
    size: 3000,
    children: [
      { name: "Digital", size: 1800 },
      { name: "Events", size: 700 },
      { name: "Content", size: 500 },
    ]
  },
  {
    name: "Operations",
    size: 2000,
    children: [
      { name: "Logistics", size: 1200 },
      { name: "Support", size: 800 },
    ]
  }
];

const funnelData = [
  { name: "Website Visitors", value: 10000, description: "Total unique visitors" },
  { name: "Product Views", value: 5000, description: "Viewed product pages" },
  { name: "Add to Cart", value: 2500, description: "Added items to cart" },
  { name: "Checkout Started", value: 1500, description: "Initiated checkout" },
  { name: "Payment Submitted", value: 1000, description: "Entered payment info" },
  { name: "Purchase Complete", value: 850, description: "Completed transaction" },
];

function DataVisualizationDemo() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="font-bold">Advanced Data Visualization</h1>
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            MEDIUM PRIORITY
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Advanced data visualization components built with Recharts.
          Includes sparklines, gauges, heatmaps, treemaps, and funnels for professional analytics.
        </p>
      </div>

      <Separator />

      {/* 1. Sparklines */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Sparklines</h2>
            <Badge variant="secondary">Micro Charts</Badge>
          </div>
          <p className="text-muted-foreground">
            Mini trend charts perfect for dashboards and KPI cards.
            They show patterns without taking up much space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Sparkline
            data={sparklineData}
            title="Revenue"
            value="$124,589"
            change={12.5}
            changeLabel="vs last month"
            color="#22c55e"
          />
          <Sparkline
            data={sparklineData2}
            title="Active Users"
            value="8,234"
            change={-5.2}
            changeLabel="vs last week"
            color="#ef4444"
          />
          <Sparkline
            data={sparklineData3}
            title="Conversion Rate"
            value="3.24%"
            change={0}
            changeLabel="no change"
            color="#3b82f6"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Standalone Sparkline</CardTitle>
            <CardDescription>Data line only, ideal for embeddings</CardDescription>
          </CardHeader>
          <CardContent>
            <Sparkline data={sparklineData} height={80} color="var(--primary)" />
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Minimalist design without axes or labels</li>
            <li>Trend indicators with icons (↑ ↓ →)</li>
            <li>Change percentage with semantic colors</li>
            <li>Full card mode or standalone</li>
            <li>Responsive and adaptable</li>
            <li>Customizable colors</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 2. Gauge Charts */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Gauge Charts</h2>
            <Badge variant="secondary">Progress Meters</Badge>
          </div>
          <p className="text-muted-foreground">
            Speedometer-style meters to visualize progress, KPIs, and scores.
            Automatic colors based on configurable thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GaugeChart
            value={85}
            title="Customer Satisfaction"
            description="Based on 1,234 surveys"
            label="Score"
          />
          <GaugeChart
            value={45}
            title="Project Completion"
            description="Q1 2025 Goals"
            label="Progress"
            color="#f59e0b"
          />
          <GaugeChart
            value={92}
            title="System Health"
            description="All services operational"
            label="Uptime %"
            color="#22c55e"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Semicircular speedometer design</li>
            <li>Configurable thresholds (low/medium/high)</li>
            <li>Automatic colors based on value</li>
            <li>Status badge (Low/Medium/High)</li>
            <li>Centered percentage with optional label</li>
            <li>Customizable size</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 3. Heatmaps */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Heatmaps</h2>
            <Badge variant="secondary">Matrix Visualization</Badge>
          </div>
          <p className="text-muted-foreground">
            Heat maps for visualizing patterns in matrix data.
            Ideal for activity tracking, correlations, and temporal analysis.
          </p>
        </div>

        <Heatmap
          data={heatmapData}
          rows={["Mon", "Tue", "Wed", "Thu", "Fri"]}
          columns={["9am", "12pm", "3pm", "6pm"]}
          title="Website Traffic Heatmap"
          description="Hourly visitors by day of week"
          showValues={true}
          showLabels={true}
        />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Table with cells colored by intensity</li>
            <li>Customizable color scale (low/medium/high)</li>
            <li>Optional numeric values in cells</li>
            <li>Row and column labels</li>
            <li>Hover effect with tooltip</li>
            <li>Legend with min/max values</li>
            <li>Configurable cell size</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 4. Treemaps */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Treemap Charts</h2>
            <Badge variant="secondary">Hierarchical Data</Badge>
          </div>
          <p className="text-muted-foreground">
            Hierarchical visualization using proportional rectangles.
            Perfect for portfolios, market share, and nested data structures.
          </p>
        </div>

        <TreemapChart
          data={treemapData}
          title="Department Budget Allocation"
          description="2025 Annual Budget Distribution"
          height={400}
        />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Rectangles proportional to value</li>
            <li>Support for hierarchical data (children)</li>
            <li>Automatically differentiated colors</li>
            <li>Labels with name and value</li>
            <li>Interactive tooltip on hover</li>
            <li>Responsive with SafeChartContainer</li>
            <li>Customizable color palette</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* 5. Funnel Charts */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-bold">Funnel Charts</h2>
            <Badge variant="secondary">Conversion Tracking</Badge>
          </div>
          <p className="text-muted-foreground">
            Conversion funnels to visualize processes and drop-offs.
            Essential for sales analytics, user flows, and optimization.
          </p>
        </div>

        <FunnelChart
          data={funnelData}
          title="E-commerce Sales Funnel"
          description="January 2025 Conversion Flow"
          showPercentages={true}
          showDropoff={true}
        />

        <div className="space-y-3">
          <h3 className="font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Bars that decrease in size by stage</li>
            <li>Absolute values and conversion percentages</li>
            <li>Drop-off indicators between stages</li>
            <li>Customizable colors per stage</li>
            <li>Tooltips with descriptions on hover</li>
            <li>Summary statistics at the end</li>
            <li>Total conversion rate calculated</li>
            <li>Responsive and adaptable</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Implementation Notes */}
      <section className="bg-card rounded-lg p-6 space-y-4 border border-border">
        <h3 className="font-semibold">📋 Implementation Notes</h3>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Location:</strong> All components are in{" "}
            <code className="bg-muted px-2 py-1 rounded">/components/advanced/</code>
          </p>
          <p>
            <strong>Dependencies:</strong> These components use{" "}
            <code className="bg-muted px-2 py-1 rounded">recharts</code> for visualizations.
            Recharts is already installed in the project.
          </p>
          <p>
            <strong>Required Imports:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ Sparkline }"} from "./components/advanced/Sparkline"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ GaugeChart }"} from "./components/advanced/GaugeChart"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ Heatmap }"} from "./components/advanced/Heatmap"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ TreemapChart }"} from "./components/advanced/TreemapChart"
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded">
                import {"{ FunnelChart }"} from "./components/advanced/FunnelChart"
              </code>
            </li>
          </ul>
          <p>
            <strong>Compatibility:</strong> All components are compatible with the
            Theme Customizer and automatically adapt colors in light/dark mode.
          </p>
          <p>
            <strong>Status:</strong> ✅ Phase 2 completed - 5 MEDIUM PRIORITY data visualization
            components implemented and documented.
          </p>
        </div>
      </section>
    </div>
  );
}

export function DataVisualizationPage() {
  return (
    <ComponentShowcase
      title="Data Visualization"
      description="Advanced visualization components: Sparklines for mini trend charts, Gauge Charts for KPI meters, Heatmap for data density, Treemap for hierarchical data, and Funnel Chart for conversion flows."
      category="Advanced"
      preview={<DataVisualizationDemo />}
      code={`import { Sparkline } from "@/components/advanced/Sparkline";
import { GaugeChart } from "@/components/advanced/GaugeChart";
import { Heatmap } from "@/components/advanced/Heatmap";
import { TreemapChart } from "@/components/advanced/TreemapChart";
import { FunnelChart } from "@/components/advanced/FunnelChart";

<Sparkline data={[...]} />
<GaugeChart value={75} max={100} />
<Heatmap data={matrix} />
<TreemapChart data={hierarchy} />
<FunnelChart data={stages} />`}
      props={[
        { name: "(aggregation)", type: "—", description: "Showcases 5 self-contained visualization components with sample data." },
      ]}
      examples={[]}
    />
  );
}