import { useState } from "react";
import { ComponentShowcase } from "../components/ui/ComponentShowcase";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/Collapsible";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ChevronsUpDown, ChevronDown, Plus, Settings, FileText } from "lucide-react";

// ── Demos ──────────────────────────────────────────────────────────────────

function BasicCollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full max-w-sm space-y-2"
    >
      <div className="flex items-center justify-between px-4 py-2 rounded-md border bg-muted">
        <span className="text-sm font-medium">@cesionbnk/ui — 3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 size-8">
            <ChevronsUpDown className="size-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm font-mono bg-background">
        @cesionbnk/components
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm font-mono bg-background">
          @cesionbnk/ui-tokens
        </div>
        <div className="rounded-md border px-4 py-3 text-sm font-mono bg-background">
          @cesionbnk/cessiones-utils
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SettingsPanelDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm">
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
          <span className="flex items-center gap-2">
            <Settings className="size-4 text-muted-foreground" />
            Advanced Settings
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-1 rounded-lg border bg-muted p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Auto-approve threshold</span>
            <Badge variant="neutral-soft-outline">COP 5,000,000</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk tolerance</span>
            <Badge variant="outline">Medium</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Notification frequency</span>
            <Badge variant="outline">Daily</Badge>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function MultiSectionDemo() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  const sections = [
    {
      id: "docs",
      icon: FileText,
      label: "Documents",
      count: 3,
      items: ["Invoice_001.pdf", "Contract_2026.pdf", "Tax_Form.pdf"],
    },
    {
      id: "settings",
      icon: Settings,
      label: "Preferences",
      count: 2,
      items: ["Notification settings", "Display options"],
    },
  ];

  return (
    <div className="w-full max-w-sm space-y-2">
      {sections.map(({ id, icon: Icon, label, count, items }) => (
        <Collapsible
          key={id}
          open={!!openSections[id]}
          onOpenChange={() => toggle(id)}
        >
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-md border bg-background px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
              <span className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground" />
                {label}
                <Badge variant="neutral" className="ml-1">{count}</Badge>
              </span>
              <Plus
                className={`size-4 text-muted-foreground transition-transform duration-200 ${
                  openSections[id] ? "rotate-45" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-1 rounded-md border divide-y bg-background">
              {items.map((item) => (
                <li key={item} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function CollapsiblePage() {
  return (
    <ComponentShowcase
      title="Collapsible"
      description="An interactive component that expands or collapses its content. Built on Radix UI Collapsible. Lighter than Accordion — use it for a single toggle section; use Accordion when you need a grouped list of sections."
      category="Layout"
      atomicLevel="Molecule"

      preview={<BasicCollapsibleDemo />}

      code={`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { Button } from "@/components/ui/Button";
import { ChevronsUpDown } from "lucide-react";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between px-4 py-2 rounded-md border">
        <span className="text-sm font-medium">3 repositories</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm font-mono">
        @org/main-repo
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm font-mono">
          @org/utils
        </div>
        <div className="rounded-md border px-4 py-3 text-sm font-mono">
          @org/design-system
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}`}

      props={[
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state. Use with onOpenChange for controlled mode.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Initial open state when uncontrolled.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback fired when the open state changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents toggling when true.",
        },
        {
          name: "asChild (CollapsibleTrigger)",
          type: "boolean",
          description: "Merges props onto the child element instead of rendering a default button.",
        },
      ]}

      examples={[
        {
          title: "Settings Panel",
          description: "A collapsible section with a chevron icon that rotates on open. Ideal for progressive disclosure in forms or config panels.",
          preview: <SettingsPanelDemo />,
          code: `<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <button className="flex w-full items-center justify-between ...">
      <span><Settings /> Advanced Settings</span>
      <ChevronDown className={open ? "rotate-180" : ""} />
    </button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* settings content */}
  </CollapsibleContent>
</Collapsible>`,
        },
        {
          title: "Multiple Independent Sections",
          description: "Each section manages its own open state independently — unlike Accordion which groups them.",
          preview: <MultiSectionDemo />,
          code: `const [openSections, setOpenSections] = useState({});
const toggle = (id) =>
  setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

{sections.map(({ id, label, items }) => (
  <Collapsible
    key={id}
    open={!!openSections[id]}
    onOpenChange={() => toggle(id)}
  >
    <CollapsibleTrigger asChild>
      <button>{label} <Plus /></button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      {items.map(item => <div key={item}>{item}</div>)}
    </CollapsibleContent>
  </Collapsible>
))}`,
        },
      ]}
    />
  );
}