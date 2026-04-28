import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useState } from "react";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { copyToClipboard } from "../lib/utils";

// Representative sample: ~20 icons covering the most common use cases
import {
  // Navigation
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp,
  // Actions
  Plus, Search, Download, Upload, Trash2, Copy, Check,
  // UI
  Menu, Settings, LayoutDashboard, Filter,
  // Status
  AlertCircle, CheckCircle, Info, Eye, EyeOff,
  // User
  User, Users,
  // Communication
  Mail, Bell, MessageSquare,
  // Media
  FileText, Folder, Image,
  // Commerce
  CreditCard, DollarSign, ShoppingCart,
  // Tech
  Globe, ExternalLink, Code,
} from "lucide-react";

/**
 * IconGalleryPage
 *
 * Lightweight documentation page showing how to use lucide-react icons
 * within the DSM. Imports only ~30 representative icons as examples.
 *
 * Previous version (v0.2.x) imported 500+ icons with search, categories,
 * and filtering — removed in v2.0.2 to reduce bundle stress and conflicts.
 *
 * @component
 */

/** Sample icons for the preview grid */
const SAMPLE_ICONS = [
  { name: "ArrowLeft", Icon: ArrowLeft },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "ChevronUp", Icon: ChevronUp },
  { name: "Plus", Icon: Plus },
  { name: "Search", Icon: Search },
  { name: "Download", Icon: Download },
  { name: "Upload", Icon: Upload },
  { name: "Trash2", Icon: Trash2 },
  { name: "Copy", Icon: Copy },
  { name: "Check", Icon: Check },
  { name: "Menu", Icon: Menu },
  { name: "Settings", Icon: Settings },
  { name: "LayoutDashboard", Icon: LayoutDashboard },
  { name: "Filter", Icon: Filter },
  { name: "AlertCircle", Icon: AlertCircle },
  { name: "CheckCircle", Icon: CheckCircle },
  { name: "Info", Icon: Info },
  { name: "Eye", Icon: Eye },
  { name: "EyeOff", Icon: EyeOff },
  { name: "User", Icon: User },
  { name: "Users", Icon: Users },
  { name: "Mail", Icon: Mail },
  { name: "Bell", Icon: Bell },
  { name: "MessageSquare", Icon: MessageSquare },
  { name: "FileText", Icon: FileText },
  { name: "Folder", Icon: Folder },
  { name: "Image", Icon: Image },
  { name: "CreditCard", Icon: CreditCard },
  { name: "DollarSign", Icon: DollarSign },
  { name: "ShoppingCart", Icon: ShoppingCart },
  { name: "Globe", Icon: Globe },
  { name: "ExternalLink", Icon: ExternalLink },
  { name: "Code", Icon: Code },
];

function IconGalleryContent() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const handleCopy = (importName: string) => {
    copyToClipboard(importName);
    setCopiedIcon(importName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* External Library Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>External Library</AlertTitle>
        <AlertDescription>
          Icons are provided by{" "}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary/80"
          >
            Lucide React
          </a>{" "}
          — an open-source icon library with 1500+ icons. It is a{" "}
          <strong>peer dependency</strong>, not bundled with the DSM.
          Browse the full catalog at{" "}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary/80"
          >
            lucide.dev/icons
          </a>.
        </AlertDescription>
      </Alert>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>Installation</CardTitle>
          <CardDescription>
            lucide-react is listed as a peer dependency of the DSM.
            Install it alongside the design system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
            <code>{`npm install lucide-react`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Usage</CardTitle>
          <CardDescription>
            Import individual icons by name. Each icon is tree-shakeable
            — only the icons you import are included in your bundle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
            <code>{`import { Search, Home, User, Settings } from "lucide-react";

// Standard sizes
<Search className="h-4 w-4" />           // 16px — inline, buttons
<Home className="h-5 w-5" />             // 20px — nav items
<User className="h-6 w-6" />             // 24px — default
<Settings className="h-8 w-8" />         // 32px — hero, empty states

// Colors via Tailwind
<Search className="h-4 w-4 text-primary" />
<AlertCircle className="h-4 w-4 text-destructive" />
<CheckCircle className="h-4 w-4 text-success" />
<Info className="h-4 w-4 text-info" />

// Stroke width (default: 2)
<Settings className="h-6 w-6" strokeWidth={1.5} />`}</code>
          </pre>
          <div className="flex items-center gap-6 p-4 bg-muted rounded-lg">
            <div className="flex flex-col items-center gap-1">
              <Search className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">16px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Search className="h-5 w-5" />
              <span className="text-xs text-muted-foreground">20px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Search className="h-6 w-6" />
              <span className="text-xs text-muted-foreground">24px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Search className="h-8 w-8" />
              <span className="text-xs text-muted-foreground">32px</span>
            </div>
            <div className="border-l pl-6 flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="text-xs text-muted-foreground">destructive</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-xs text-muted-foreground">success</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Info className="h-5 w-5 text-info" />
                <span className="text-xs text-muted-foreground">info</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage with DSM Components */}
      <Card>
        <CardHeader>
          <CardTitle>Usage with DSM Components</CardTitle>
          <CardDescription>
            Common patterns for combining icons with Button, Badge, Input, and other DSM components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
            <code>{`// In Buttons
<Button><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
<Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button>

// In Badges
<Badge variant="success-soft-outline"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>

// In Input (with absolute positioning)
<div className="relative">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search..." />
</div>

// In Alert
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Something needs attention.</AlertDescription>
</Alert>

// In navigation items
<a className="flex items-center gap-2">
  <LayoutDashboard className="h-4 w-4" />
  Dashboard
</a>`}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Sample Icons Grid */}
      <Card>
        <CardHeader>
          <CardTitle>
            Sample Icons
            <Badge variant="outline" className="ml-2">{SAMPLE_ICONS.length} shown</Badge>
          </CardTitle>
          <CardDescription>
            Representative selection from key categories. Click to copy the import name.
            For the full catalog of 1500+ icons, visit{" "}
            <a
              href="https://lucide.dev/icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:text-primary/80"
            >
              lucide.dev/icons
            </a>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {SAMPLE_ICONS.map((icon) => (
              <button
                key={icon.name}
                className="flex flex-col items-center justify-center p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors group relative"
                onClick={() => handleCopy(icon.name)}
              >
                <icon.Icon className="h-6 w-6 mb-2 text-foreground/80 group-hover:text-primary transition-colors" />
                <span className="text-xs text-muted-foreground text-center break-all">
                  {icon.name}
                </span>
                {copiedIcon === icon.name && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-xs">
                    Copied!
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm text-success flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Do
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Use <code className="bg-muted px-1 rounded">h-4 w-4</code> for inline / button icons</li>
                <li>Use <code className="bg-muted px-1 rounded">text-muted-foreground</code> for secondary icons</li>
                <li>Use <code className="bg-muted px-1 rounded">text-primary</code> for active / highlighted icons</li>
                <li>Import only the icons you need (tree-shaking)</li>
                <li>Use <code className="bg-muted px-1 rounded">strokeWidth={"{1.5}"}</code> for thinner appearance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Don't
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Don't import the entire library (<code className="bg-muted px-1 rounded">import * from "lucide-react"</code>)</li>
                <li>Don't use pixel sizes — use Tailwind classes</li>
                <li>Don't mix icon libraries (stick to lucide-react)</li>
                <li>Don't use icons without accessible labels when standalone</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function IconGalleryPage() {
  return (
    <ComponentShowcase
      title="Icon Gallery"
      description="Reference guide for using Lucide React icons within the DSM. Lucide React is an external peer dependency with 1500+ tree-shakeable icons. Browse the full catalog at lucide.dev/icons."
      category="Design System"
      preview={<IconGalleryContent />}
      code={`import { Search, Home, User, Settings, Plus, CheckCircle } from "lucide-react";

// Sizes — use Tailwind classes
<Search className="h-4 w-4" />      // 16px (buttons, inline)
<Home className="h-5 w-5" />        // 20px (nav items)
<User className="h-6 w-6" />        // 24px (default)

// Colors — use DSM token classes
<AlertCircle className="h-4 w-4 text-destructive" />
<CheckCircle className="h-4 w-4 text-success" />
<Info className="h-4 w-4 text-info" />

// In DSM components
<Button><Plus className="h-4 w-4 mr-2" /> Add</Button>
<Badge variant="success-soft-outline"><CheckCircle className="h-3 w-3 mr-1" /> Done</Badge>

// Full catalog: https://lucide.dev/icons/`}
      props={[
        { name: "className", type: "string", description: "Tailwind classes for size (h-4 w-4) and color (text-primary)." },
        { name: "strokeWidth", type: "number", default: "2", description: "SVG stroke width. Use 1.5 for thinner lines." },
        { name: "size", type: "number", default: "24", description: "Width and height in pixels (prefer className for sizing)." },
        { name: "fill", type: "string", default: "none", description: "SVG fill color. Use 'currentColor' for filled icons." },
      ]}
    />
  );
}