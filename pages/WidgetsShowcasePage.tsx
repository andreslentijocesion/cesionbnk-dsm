import { ComponentShowcase } from "../components/ui/component-showcase";
import {
  StatCard,
  StatsGrid,
  SearchBar,
  FilterChip,
  ApprovalTimelineItem,
  ActionButton,
  SimpleFormField,
  NavigationBar,
} from "../components/widgets";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Clock, DollarSign, User, Search, Bell, Settings } from "lucide-react";

export function WidgetsShowcasePage() {
  return (
    <ComponentShowcase
      title="UI Widgets"
      description="Reinstanciable building blocks and functional components for building application interfaces. Includes statistics (StatCard, StatsGrid), navigation (NavigationBar, FilterBar, SearchBar), actions (ActionButton, FilterChip), and data display (ApprovalTimelineItem, FormField)."
      category="Widgets"
      preview={
        <div className="space-y-8">
          {/* Statistics */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Statistics</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" icon={DollarSign} />
              <StatCard title="Active Users" value="+2350" change="+180.1%" trend="up" icon={User} />
              <StatCard title="Bounce Rate" value="12.23%" change="-4.5%" trend="down" icon={Clock} />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Navigation</h3>
            <div className="border rounded-md overflow-hidden bg-background">
              <NavigationBar />
              <div className="p-6 bg-muted text-center text-muted-foreground text-sm">Page Content Area</div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Search Bar</h3>
              <Card>
                <CardContent className="pt-6">
                  <SearchBar placeholder="Search users..." />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Filter Chips</h3>
              <Card>
                <CardContent className="pt-6 flex flex-wrap gap-2">
                  <FilterChip label="Status" value="Active" onRemove={() => {}} />
                  <FilterChip label="Role" value="Admin" onRemove={() => {}} />
                  <FilterChip label="Date" value="Today" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      }
      code={`import { StatCard, SearchBar, FilterChip, NavigationBar } from "@/components/widgets";
import { DollarSign, User, Clock } from "lucide-react";

// Stat Cards
<StatCard title="Revenue" value="$45,231" change="+20%" trend="up" icon={DollarSign} />

// Navigation
<NavigationBar />

// Search & Filters
<SearchBar placeholder="Search..." />
<FilterChip label="Status" value="Active" onRemove={() => {}} />`}
      props={[
        {
          name: "StatCard",
          type: "Component",
          description: "title, value, change, trend ('up'|'down'), icon (LucideIcon).",
        },
        {
          name: "SearchBar",
          type: "Component",
          description: "placeholder, onSearch callback.",
        },
        {
          name: "FilterChip",
          type: "Component",
          description: "label, value, onRemove callback.",
        },
        {
          name: "ActionButton",
          type: "Component",
          description: "icon, label, variant ('default'|'outline'|'ghost').",
        },
        {
          name: "NavigationBar",
          type: "Component",
          description: "Self-contained navigation bar with tabs.",
        },
      ]}
      examples={[
        {
          title: "Actions & Interaction",
          description: "ActionButton variants and form field widget.",
          preview: (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6 flex gap-4">
                  <ActionButton icon={Bell} label="Notifications" />
                  <ActionButton icon={Settings} label="Settings" variant="outline" />
                  <ActionButton icon={Search} label="Search" variant="ghost" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <SimpleFormField label="Username" id="username" placeholder="Enter username" required />
                  <SimpleFormField label="Email" id="email" type="email" placeholder="Enter email" error="Invalid email address" />
                </CardContent>
              </Card>
            </div>
          ),
          code: `<ActionButton icon={Bell} label="Notifications" />
<ActionButton icon={Settings} label="Settings" variant="outline" />
<SimpleFormField label="Username" id="username" required />`,
        },
        {
          title: "Approval Timeline",
          description: "Timeline items for tracking approval workflows.",
          preview: (
            <Card>
              <CardContent className="pt-6 space-y-6">
                <ApprovalTimelineItem
                  icon={CheckCircle}
                  iconColor="text-green-500"
                  title="Order Delivered"
                  user="System"
                  role="Automated"
                  timestamp="2 mins ago"
                  status="Completed"
                  statusVariant="default"
                />
                <ApprovalTimelineItem
                  icon={Clock}
                  iconColor="text-amber-500"
                  title="Order Processing"
                  user="Jane Doe"
                  role="Warehouse"
                  timestamp="1 hour ago"
                  status="In Progress"
                  statusVariant="secondary"
                />
              </CardContent>
            </Card>
          ),
          code: `<ApprovalTimelineItem
  icon={CheckCircle}
  iconColor="text-green-500"
  title="Order Delivered"
  user="System"
  role="Automated"
  timestamp="2 mins ago"
  status="Completed"
/>`,
        },
        {
          title: "Stats Grid",
          description: "Pre-composed grid of multiple StatCards with sample financial KPIs.",
          preview: <StatsGrid />,
          code: `import { StatsGrid } from "@/components/widgets";

<StatsGrid />`,
        },
      ]}
    />
  );
}