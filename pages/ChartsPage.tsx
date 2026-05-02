import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { SafeChartContainer } from "../components/ui/safechartcontainer";
import { GaugeChart } from "../components/advanced/gauge-chart";
import { Sparkline } from "../components/advanced/sparkline";
import { FunnelChart } from "../components/advanced/funnel-chart";
import { Heatmap } from "../components/advanced/heatmap";
import { TreemapChart } from "../components/advanced/treemap-chart";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ── Tooltip Style ──
const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  color: "var(--foreground)",
};

// ── Mock Data ──
const lineData = [
  { month: "Ene", ingresos: 45000, gastos: 28000 },
  { month: "Feb", ingresos: 52000, gastos: 31000 },
  { month: "Mar", ingresos: 61000, gastos: 29000 },
  { month: "Abr", ingresos: 58000, gastos: 35000 },
  { month: "May", ingresos: 70000, gastos: 32000 },
  { month: "Jun", ingresos: 65000, gastos: 38000 },
];

const barData = [
  { name: "Q1", value: 120 },
  { name: "Q2", value: 98 },
  { name: "Q3", value: 145 },
  { name: "Q4", value: 160 },
];

const pieData = [
  { name: "Aprobadas", value: 65, color: "var(--primary)" },
  { name: "Pendientes", value: 20, color: "var(--secondary)" },
  { name: "Rechazadas", value: 10, color: "var(--destructive)" },
  { name: "En Revision", value: 5, color: "var(--warning)" },
];

const areaData = [
  { date: "Lun", users: 120, sessions: 180 },
  { date: "Mar", users: 150, sessions: 220 },
  { date: "Mie", users: 180, sessions: 260 },
  { date: "Jue", users: 140, sessions: 200 },
  { date: "Vie", users: 200, sessions: 300 },
  { date: "Sab", users: 90, sessions: 130 },
  { date: "Dom", users: 70, sessions: 100 },
];

const funnelData = [
  { name: "Visitantes", value: 10000, description: "Total del sitio" },
  { name: "Registros", value: 4500, description: "Usuarios registrados" },
  { name: "Activacion", value: 2800, description: "Usuarios activos" },
  { name: "Conversion", value: 1200, description: "Compras realizadas" },
  { name: "Retencion", value: 850, description: "Clientes recurrentes" },
];

const heatmapRows = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
const heatmapColumns = ["00h", "04h", "08h", "12h", "16h", "20h"];
const heatmapData = heatmapRows.flatMap((row) =>
  heatmapColumns.map((col) => ({
    row,
    col,
    value: Math.floor(Math.random() * 100),
    label: `${row} ${col}`,
  }))
);

const treemapData = [
  { name: "Cessiones", size: 45000 },
  { name: "Leasing", size: 28000 },
  { name: "Credito", size: 22000 },
  { name: "Ahorro", size: 15000 },
  { name: "Seguros", size: 12000 },
  { name: "Inversion", size: 8000 },
];

const sparklineData = [
  { value: 45 }, { value: 52 }, { value: 48 }, { value: 61 },
  { value: 58 }, { value: 70 }, { value: 65 }, { value: 72 },
];

// ── Main Code ──
const mainCode = `import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SafeChartContainer } from "@/components/ui/safechartcontainer";

const data = [
  { month: "Ene", ingresos: 45000, gastos: 28000 },
  { month: "Feb", ingresos: 52000, gastos: 31000 },
  { month: "Mar", ingresos: 61000, gastos: 29000 },
];

export function BasicCharts() {
  return (
    <SafeChartContainer width="100%" height="100%" minHeight="300px">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ingresos" stroke="var(--primary)" strokeWidth={2} />
        <Line type="monotone" dataKey="gastos" stroke="var(--destructive)" strokeWidth={2} />
      </LineChart>
    </SafeChartContainer>
  );
}`;

export function ChartsPage() {
  return (
    <ComponentShowcase
      title="Charts (Recharts)"
      description="Biblioteca completa de graficos construidos con Recharts. Incluye Line, Bar, Area, Pie, Gauge, Sparkline, Funnel, Heatmap y Treemap."
      category="Advanced · Data Visualization"
      preview={
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>

          <TabsContent value="line">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Line Chart</CardTitle>
                <CardDescription>Ingresos vs Gastos mensuales</CardDescription>
              </CardHeader>
              <CardContent>
                <SafeChartContainer width="100%" height="100%" minHeight="300px">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="ingresos" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="gastos" stroke="var(--destructive)" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </SafeChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Bar Chart</CardTitle>
                <CardDescription>Ventas por trimestre</CardDescription>
              </CardHeader>
              <CardContent>
                <SafeChartContainer width="100%" height="100%" minHeight="300px">
                  <RechartsBarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                    />
                    <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </SafeChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="area">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Area Chart</CardTitle>
                <CardDescription>Usuarios y sesiones semanal</CardDescription>
              </CardHeader>
              <CardContent>
                <SafeChartContainer width="100%" height="100%" minHeight="300px">
                  <AreaChart data={areaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                    />
                    <Area type="monotone" dataKey="sessions" stackId="1" stroke="var(--primary)" fill="color-mix(in srgb, var(--primary) 20%, transparent)" />
                    <Area type="monotone" dataKey="users" stackId="2" stroke="var(--secondary)" fill="color-mix(in srgb, var(--secondary) 20%, transparent)" />
                  </AreaChart>
                </SafeChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pie">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pie Chart</CardTitle>
                <CardDescription>Distribucion de facturas por estado</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <SafeChartContainer width="100%" height="100%" minHeight="300px">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                    />
                  </PieChart>
                </SafeChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      }
      code={mainCode}
      props={[
        { name: "SafeChartContainer", type: "Component", description: "Drop-in replacement for Recharts ResponsiveContainer. Measures container before rendering to avoid -1 warnings." },
        { name: "width", type: "string | number", default: '"100%"', description: "Ancho del contenedor del chart." },
        { name: "height", type: "string | number", default: '"100%"', description: "Alto del contenedor." },
        { name: "minHeight", type: "string", default: '"300px"', description: "Altura minima CSS para el contenedor." },
        { name: "children", type: "ReactElement", description: "Componente Recharts hijo (LineChart, BarChart, PieChart, etc.).", required: true },
        { name: "className", type: "string", description: "Clases adicionales para el contenedor externo." },
      ]}
      examples={[
        {
          title: "GaugeChart",
          description: "Medidores tipo velocimetro para KPIs y progreso.",
          preview: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GaugeChart value={75} title="Performance" description="Score general" label="Excelente" color="var(--primary)" />
              <GaugeChart value={45} title="Completado" description="Progreso del proyecto" label="En progreso" color="var(--warning)" />
              <GaugeChart value={92} title="Satisfaccion" description="Ultimos 30 dias" label="Destacado" color="var(--success)" />
            </div>
          ),
          code: `<GaugeChart
  value={75}
  title="Performance"
  description="Score general"
  label="Excelente"
  color="var(--primary)"
/>

// Props: value (0-100), max?, title?, description?, label?, color?, size?, showPercentage?, thresholds?`,
        },
        {
          title: "Sparkline",
          description: "Graficos minimalistas para dashboards y tarjetas.",
          preview: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Sparkline data={sparklineData} title="Revenue" value="$45,231" change={12.5} changeLabel="+12.5% vs mes anterior" color="var(--primary)" showTrend />
              <Sparkline data={sparklineData.map((d) => ({ value: d.value * 0.8 }))} title="Usuarios" value="2,345" change={-5.2} changeLabel="-5.2% vs mes anterior" color="var(--destructive)" showTrend />
              <Sparkline data={sparklineData.map((d) => ({ value: d.value * 1.2 }))} title="Conversiones" value="892" change={8.3} changeLabel="+8.3% vs mes anterior" color="var(--success)" showTrend />
            </div>
          ),
          code: `<Sparkline
  data={[{ value: 45 }, { value: 52 }, { value: 70 }]}
  title="Revenue"
  value="$45,231"
  change={12.5}
  changeLabel="+12.5% vs mes anterior"
  color="var(--primary)"
  showTrend
/>

// Props: data (SparklineData[]), color?, height?, showTrend?, title?, value?, change?, changeLabel?`,
        },
        {
          title: "FunnelChart",
          description: "Visualizacion de embudos de conversion y pipeline.",
          preview: (
            <FunnelChart data={funnelData} title="Sales Funnel" description="Customer conversion journey" showPercentages showDropoff />
          ),
          code: `<FunnelChart
  data={[
    { name: "Visitantes", value: 10000 },
    { name: "Registros", value: 4500 },
    { name: "Conversion", value: 1200 },
  ]}
  title="Sales Funnel"
  showPercentages
  showDropoff
/>

// Props: data (FunnelStage[]), title?, description?, height?, showPercentages?, showDropoff?, colors?`,
        },
        {
          title: "Heatmap",
          description: "Matriz de datos con codificacion de color.",
          preview: (
            <Heatmap data={heatmapData} rows={heatmapRows} columns={heatmapColumns} title="Actividad Semanal" description="Actividad de usuarios por dia y hora" showValues showLabels />
          ),
          code: `<Heatmap
  data={heatmapData}
  rows={["Lun", "Mar", "Mie", "Jue", "Vie"]}
  columns={["00h", "06h", "12h", "18h"]}
  title="Actividad Semanal"
  showValues
  showLabels
/>

// Props: data (HeatmapCell[]), rows, columns, title?, colorScale?, showValues?, showLabels?, cellSize?`,
        },
        {
          title: "TreemapChart",
          description: "Visualizacion proporcional de datos jerarquicos.",
          preview: (
            <TreemapChart data={treemapData} title="Distribucion de Productos" description="Por volumen de operaciones" height={300} />
          ),
          code: `<TreemapChart
  data={[
    { name: "Cessiones", size: 45000 },
    { name: "Leasing", size: 28000 },
    { name: "Credito", size: 22000 },
  ]}
  title="Distribucion de Productos"
  height={300}
/>

// Props: data (TreemapData[]), title?, description?, height?, colors?`,
        },
      ]}
    />
  );
}