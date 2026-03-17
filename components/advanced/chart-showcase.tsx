import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SafeChartContainer } from "../ui/safe-chart-container";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const lineData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 61 },
  { month: "Apr", value: 58 },
  { month: "May", value: 70 },
  { month: "Jun", value: 65 },
];

const barData = [
  { category: "A", value: 45 },
  { category: "B", value: 32 },
  { category: "C", value: 28 },
  { category: "D", value: 21 },
  { category: "E", value: 18 },
];

const pieData = [
  { name: "Approved", value: 65, color: "var(--primary)" },
  { name: "Pending", value: 20, color: "var(--secondary)" },
  { name: "Rejected", value: 10, color: "var(--destructive)" },
  { name: "In Review", value: 5, color: "var(--warning)" },
];

export function ChartShowcase() {
  return (
    <Tabs defaultValue="line" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-lg">
        <TabsTrigger value="line">Line</TabsTrigger>
        <TabsTrigger value="bar">Bar</TabsTrigger>
        <TabsTrigger value="pie">Pie</TabsTrigger>
      </TabsList>

      <TabsContent value="line" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Line Chart Example</CardTitle>
                <CardDescription>Simple line chart visualization</CardDescription>
              </div>
              <Badge>Line</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <SafeChartContainer width="100%" height="100%" minHeight="350px">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} />
              </LineChart>
            </SafeChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bar" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bar Chart Example</CardTitle>
                <CardDescription>Simple bar chart visualization</CardDescription>
              </div>
              <Badge>Bar</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <SafeChartContainer width="100%" height="100%" minHeight="350px">
              <RechartsBarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="var(--primary)" />
              </RechartsBarChart>
            </SafeChartContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pie" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pie Chart Example</CardTitle>
                <CardDescription>Simple pie chart visualization</CardDescription>
              </div>
              <Badge>Pie</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <SafeChartContainer width="100%" height="100%" minHeight="350px">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="var(--primary)"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </SafeChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
