import { ComponentShowcase } from "../components/ui/componentshowcase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { User, Settings, Bell, CreditCard, Shield, Activity } from "lucide-react";

export function TabsPage() {
  return (
    <ComponentShowcase
      title="Tabs"
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
      category="Layout"
      atomicLevel="Molecule"
      
      // Main Preview
      preview={
        <Tabs defaultValue="account" className="w-full max-w-lg">
          <TabsList>
            <TabsTrigger value="account" className="font-normal">Account</TabsTrigger>
            <TabsTrigger value="password" className="font-normal">Password</TabsTrigger>
            <TabsTrigger value="notifications" className="font-normal">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-normal">Account Settings</h4>
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences here.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="password" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-normal">Password Settings</h4>
              <p className="text-sm text-muted-foreground">
                Update your password and security settings.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="font-normal">Notification Preferences</h4>
              <p className="text-sm text-muted-foreground">
                Configure how you receive notifications.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      }
      
      // Main Code
      code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Account content here
      </TabsContent>
      <TabsContent value="password">
        Password content here
      </TabsContent>
    </Tabs>
  );
}`}
      
      // Props Documentation
      props={[
        {
          name: "defaultValue",
          type: "string",
          description: "Default active tab (uncontrolled component)",
        },
        {
          name: "value",
          type: "string",
          description: "Active tab (controlled component)",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback fired when the active tab changes",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Tab orientation",
        },
        {
          name: "dir",
          type: '"ltr" | "rtl"',
          default: '"ltr"',
          description: "Text direction",
        },
      ]}
      
      // Examples
      examples={[
        {
          title: "With Form Content",
          description: "Tabs with forms in each panel",
          preview: (
            <Tabs defaultValue="account" className="w-full max-w-lg">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@johndoe" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ),
          code: `<Tabs defaultValue="account">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Make changes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Name" />
        <Input placeholder="Username" />
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    {/* Password form */}
  </TabsContent>
</Tabs>`
        },
        {
          title: "With Icons",
          description: "Tabs with icons in the triggers",
          preview: (
            <Tabs defaultValue="profile" className="w-full max-w-lg">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="size-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="size-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="size-4" />
                  Alerts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Your profile information and public details.
                </p>
              </TabsContent>
              <TabsContent value="settings" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Application settings and preferences.
                </p>
              </TabsContent>
              <TabsContent value="notifications" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Manage your notification preferences.
                </p>
              </TabsContent>
            </Tabs>
          ),
          code: `import { User, Settings, Bell } from "lucide-react";

<Tabs defaultValue="profile">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="profile" className="gap-2">
      <User className="size-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger value="settings" className="gap-2">
      <Settings className="size-4" />
      Settings
    </TabsTrigger>
    <TabsTrigger value="notifications" className="gap-2">
      <Bell className="size-4" />
      Alerts
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Content</TabsContent>
</Tabs>`
        },
        {
          title: "Disabled Tab",
          description: "Tabs with a disabled option",
          preview: (
            <Tabs defaultValue="overview" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Overview dashboard with key metrics.
                </p>
              </TabsContent>
              <TabsContent value="analytics" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Analytics and insights data.
                </p>
              </TabsContent>
              <TabsContent value="reports" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Reports section (coming soon).
                </p>
              </TabsContent>
            </Tabs>
          ),
          code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports" disabled>
      Reports
    </TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Content</TabsContent>
</Tabs>`
        },
        {
          title: "With Badges",
          description: "Tabs with badges to show counters",
          preview: (
            <Tabs defaultValue="all" className="w-full max-w-lg">
              <TabsList>
                <TabsTrigger value="all" className="gap-2">
                  All
                  <Badge variant="neutral" className="ml-1">24</Badge>
                </TabsTrigger>
                <TabsTrigger value="active" className="gap-2">
                  Active
                  <Badge variant="neutral" className="ml-1">12</Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  Completed
                  <Badge variant="outline" className="ml-1">12</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  All 24 items in your list.
                </p>
              </TabsContent>
              <TabsContent value="active" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  12 active items requiring attention.
                </p>
              </TabsContent>
              <TabsContent value="completed" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  12 completed items.
                </p>
              </TabsContent>
            </Tabs>
          ),
          code: `<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">
      All
      <Badge variant="neutral" className="ml-1">24</Badge>
    </TabsTrigger>
    <TabsTrigger value="active">
      Active
      <Badge variant="neutral" className="ml-1">12</Badge>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="all">Content</TabsContent>
</Tabs>`
        },
        {
          title: "Full Width Tabs",
          description: "Tabs that span the full available width",
          preview: (
            <Tabs defaultValue="tab1" className="w-full max-w-2xl">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="tab1">Dashboard</TabsTrigger>
                <TabsTrigger value="tab2">Transactions</TabsTrigger>
                <TabsTrigger value="tab3">Analytics</TabsTrigger>
                <TabsTrigger value="tab4">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="pt-4">
                <p className="text-sm text-muted-foreground">Dashboard content</p>
              </TabsContent>
              <TabsContent value="tab2" className="pt-4">
                <p className="text-sm text-muted-foreground">Transactions list</p>
              </TabsContent>
              <TabsContent value="tab3" className="pt-4">
                <p className="text-sm text-muted-foreground">Analytics charts</p>
              </TabsContent>
              <TabsContent value="tab4" className="pt-4">
                <p className="text-sm text-muted-foreground">Settings panel</p>
              </TabsContent>
            </Tabs>
          ),
          code: `<Tabs defaultValue="tab1">
  <TabsList className="grid w-full grid-cols-4">
    <TabsTrigger value="tab1">Dashboard</TabsTrigger>
    <TabsTrigger value="tab2">Transactions</TabsTrigger>
    <TabsTrigger value="tab3">Analytics</TabsTrigger>
    <TabsTrigger value="tab4">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>`
        },
        {
          title: "Settings Panel",
          description: "Complete settings panel with multiple tabs",
          preview: (
            <Tabs defaultValue="general" className="w-full max-w-2xl">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="size-5" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your general account settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label>Display Name</Label>
                      <Input placeholder="Your name" />
                    </div>
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="security" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="size-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Configure your security preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication, password management, and more.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="billing" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="size-5" />
                      Billing Information
                    </CardTitle>
                    <CardDescription>
                      Manage your payment methods and invoices.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Payment methods, billing history, and subscriptions.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="size-5" />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription>
                      Advanced configuration options.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      API keys, webhooks, and developer settings.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ),
          code: `<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general">
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Button>Save</Button>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>`
        },
        {
          title: "Controlled Tabs",
          description: "Tabs as a controlled component with state",
          preview: (
            <Tabs 
              defaultValue="tab1" 
              className="w-full max-w-lg"
              onValueChange={(value) => console.log('Active tab:', value)}
            >
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Content for Tab 1 (check console for active tab)
                </p>
              </TabsContent>
              <TabsContent value="tab2" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Content for Tab 2 (check console for active tab)
                </p>
              </TabsContent>
              <TabsContent value="tab3" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Content for Tab 3 (check console for active tab)
                </p>
              </TabsContent>
            </Tabs>
          ),
          code: `import { useState } from "react";

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );
}`
        }
      ]}
    />
  );
}