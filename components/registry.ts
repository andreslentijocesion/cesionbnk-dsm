/**
 * registry.ts — Single source of truth for DSM navigation.
 *
 * Adding a new page requires ONLY editing this file:
 *   1. Add entry to ITEMS_SPEC
 *   2. Add import + case in PageRenderer.tsx
 *
 * Everything else (PageId type, sidebar nav, page labels, section counts)
 * is derived automatically.
 */

// ── Section definitions ────────────────────────────────────────────────────────

export type SectionId =
  | "actions"
  | "forms"
  | "navigation"
  | "data-display"
  | "feedback"
  | "layout"
  | "factoring"
  | "patterns"
  | "advanced";

export interface SectionMeta {
  id: SectionId;
  label: string;
}

export const SECTIONS: readonly SectionMeta[] = [
  { id: "actions",      label: "Actions"      },
  { id: "forms",        label: "Forms"        },
  { id: "navigation",   label: "Navigation"   },
  { id: "data-display", label: "Data Display" },
  { id: "feedback",     label: "Feedback"     },
  { id: "layout",       label: "Layout"       },
  { id: "factoring",    label: "Factoring"    },
  { id: "patterns",     label: "Patterns"     },
  { id: "advanced",     label: "Advanced"     },
] as const;

// ── Nav items ──────────────────────────────────────────────────────────────────
// Format: [id, label, section]
// Add new items here — everything else updates automatically.

const ITEMS_SPEC = [
  // ── Actions ──
  ["button",        "Button",                  "actions"],
  ["toggle",        "Toggle",                  "actions"],
  ["toggle-group",  "Toggle Group",            "actions"],
  ["split-button",  "Split Button",            "actions"],
  ["fab",           "Floating Action Button",  "actions"],

  // ── Forms ──
  ["input",               "Input",               "forms"],
  ["currency-input",      "Currency Input",      "forms"],
  ["masked-input",        "Masked Input",        "forms"],
  ["number-input",        "Number Input",        "forms"],
  ["stepper",             "Stepper",             "forms"],
  ["tag-input",           "Tag Input",           "forms"],
  ["date-navigator",      "Date Navigator",      "forms"],
  ["textarea",            "Textarea",            "forms"],
  ["select",              "Select",              "forms"],
  ["checkbox",            "Checkbox",            "forms"],
  ["radio-group",         "Radio Group",         "forms"],
  ["switch",              "Switch",              "forms"],
  ["calendar",            "Calendar",            "forms"],
  ["date-picker",         "Date Picker",         "forms"],
  ["date-range-picker",   "Date Range Picker",   "forms"],
  ["combobox",            "Combobox",            "forms"],
  ["multi-select",        "Multi Select",        "forms"],
  ["form",                "Form",                "forms"],
  ["label",               "Label",               "forms"],
  ["slider",              "Slider",              "forms"],
  ["input-otp",           "Input OTP",           "forms"],
  ["input-file",          "Input File",          "forms"],
  ["textarea-autoresize", "Textarea Autoresize", "forms"],

  // ── Navigation ──
  ["tabs",             "Tabs",             "navigation"],
  ["breadcrumb",       "Breadcrumb",       "navigation"],
  ["command",          "Command",          "navigation"],
  ["dropdown-menu",    "Dropdown Menu",    "navigation"],
  ["context-menu",     "Context Menu",     "navigation"],
  ["navigation-menu",  "Navigation Menu",  "navigation"],
  ["pagination",       "Pagination",       "navigation"],
  ["menubar",          "Menubar",          "navigation"],

  // ── Data Display ──
  ["card",        "Card",        "data-display"],
  ["table",       "Table",       "data-display"],
  ["badge",       "Badge",       "data-display"],
  ["avatar",      "Avatar",      "data-display"],
  ["separator",   "Separator",   "data-display"],
  ["hover-card",  "Hover Card",  "data-display"],

  // ── Feedback ──
  ["alert",                "Alert",               "feedback"],
  ["inline-banner",        "Inline Banner",       "feedback"],
  ["alert-dialog",         "Alert Dialog",        "feedback"],
  ["dialog",               "Dialog",              "feedback"],
  ["toast",                "Toast (Sonner)",       "feedback"],
  ["tooltip",              "Tooltip",             "feedback"],
  ["popover",              "Popover",             "feedback"],
  ["progress",             "Progress",            "feedback"],
  ["progress-with-range",  "Progress with Range", "feedback"],
  ["skeleton",             "Skeleton",            "feedback"],
  ["empty-state",          "Empty State",         "feedback"],
  ["error-boundary",       "Error Boundary",      "feedback"],
  ["loading-states",       "Loading States",      "feedback"],

  // ── Layout ──
  ["accordion",         "Accordion",    "layout"],
  ["app-layout",        "App Layout",   "layout"],
  ["bottom-sheet",      "Bottom Sheet", "layout"],
  ["carousel",          "Carousel",     "layout"],
  ["collapsible",       "Collapsible",  "layout"],
  ["drawer",            "Drawer",       "layout"],
  ["scroll-area",       "Scroll Area",  "layout"],
  ["sheet",             "Sheet",        "layout"],
  ["sidebar-showcase",  "Sidebar",      "layout"],

  // ── Factoring ──
  ["factoring-dashboard",            "Dashboard",                 "factoring"],
  ["factoring-portfolio",            "Portfolio",                 "factoring"],
  ["factoring-new-operation",        "Nueva Operación",           "factoring"],
  ["factoring-approval-queue",       "Cola de Aprobación",        "factoring"],
  ["factoring-cedent-list",          "Gestión de Cedentes",       "factoring"],
  ["factoring-cedent-profile",       "Perfil de Cedente",         "factoring"],
  ["factoring-debtor-list",          "Gestión de Deudores",       "factoring"],
  ["factoring-maturity-alerts",      "Alertas de Vencimiento",    "factoring"],
  ["factoring-portfolio-report",     "Reporte de Cartera",        "factoring"],
  ["factoring-calculator",           "Calculadora",               "factoring"],
  ["factoring-sector-concentration", "Concentración Sectorial",   "factoring"],
  ["factoring-status-card",          "Status Cards",              "factoring"],

  // ── Patterns ──
  ["advanced-filter",                "Advanced Filter Panel",      "patterns"],
  ["aging-report",                   "Aging Report",               "patterns"],
  ["approval-flow",                  "Approval Flow",              "patterns"],
  ["audit-log",                      "Audit Log",                  "patterns"],
  ["bulk-action-toolbar",            "Bulk Action Toolbar",        "patterns"],
  ["comment-thread",                 "Comment Thread",             "patterns"],
  ["credit-score-card",              "Credit Score Card",          "patterns"],
  ["data-table-advanced",            "Data Table Advanced",        "patterns"],
  ["detail-card",                    "Detail Card",                "patterns"],
  ["document-checklist",             "Document Checklist",         "patterns"],
  ["editable-table",                 "Editable Table",             "patterns"],
  ["export-panel",                   "Export Panel",               "patterns"],
  ["file-viewer",                    "File Viewer",                "patterns"],
  ["multi-step-form",                "Multi-Step Form",            "patterns"],
  ["multi-step-wizard",              "Multi-Step Wizard",          "patterns"],
  ["notification-center",            "Notification Center",        "patterns"],
  ["onboarding",                     "Onboarding",                 "patterns"],
  ["operation-status-pipeline",      "Operation Status Pipeline",  "patterns"],
  ["risk-indicator",                 "Risk Indicator",             "patterns"],
  ["signature-panel",                "Signature Panel",            "patterns"],
  ["stat-card",                      "Stat Card",                  "patterns"],
  ["timeline",                       "Timeline",                   "patterns"],

  // ── Advanced ──
  ["charts",            "Charts",            "advanced"],
  ["advanced-forms",    "Advanced Forms",    "advanced"],
  ["data-table",        "Data Table",        "advanced"],
  ["file-uploader",     "File Uploader",     "advanced"],
  ["infinite-scroll",   "Infinite Scroll",   "advanced"],
  ["rich-text-editor",  "Rich Text Editor",  "advanced"],
] as const satisfies ReadonlyArray<readonly [string, string, SectionId]>;

// ── Derived types ──────────────────────────────────────────────────────────────

/** IDs of all navigable DSM pages (derived from ITEMS_SPEC — no manual sync needed) */
export type NavPageId = (typeof ITEMS_SPEC)[number][0];

/** Non-nav special pages (home, design system, resources, legacy) */
export type SpecialPageId =
  | "home"
  | "dsm-dashboard"
  | "brand-layout"
  | "design-tokens"
  | "component-guidelines"
  | "help-system-demo"
  | "animations"
  | "icon-gallery"
  | "dsm-visual-audit"
  | "changelog";

/** Union of all valid page IDs in the DSM */
export type PageId = NavPageId | SpecialPageId;

// ── Nav item interface ─────────────────────────────────────────────────────────

export interface NavEntry {
  id: NavPageId;
  label: string;
  section: SectionId;
}

// ── Runtime data ───────────────────────────────────────────────────────────────

/** Flat list of all navigable items */
export const NAV_ITEMS: readonly NavEntry[] = ITEMS_SPEC.map(
  ([id, label, section]) => ({ id: id as NavPageId, label, section }),
);

/** label lookup for all nav items */
export const PAGE_LABELS: Readonly<Record<string, string>> = Object.fromEntries(
  ITEMS_SPEC.map(([id, label]) => [id, label]),
);

/** Labels for special (non-nav) pages */
export const SPECIAL_LABELS: Record<SpecialPageId, string> = {
  home:               "Home",
  "dsm-dashboard":    "DSM Dashboard",
  "brand-layout":     "Brand Layout",
  "design-tokens":    "Design Tokens",
  "help-system-demo": "Help System",
  animations:         "Animations",
  "icon-gallery":     "Icon Gallery",
  "dsm-visual-audit":       "DSM Visual Audit",
  "component-guidelines":   "Component Guidelines",
  changelog:                "Changelog",
};

/** Combined label map for all pages */
export const ALL_PAGE_LABELS: Readonly<Record<string, string>> = {
  ...PAGE_LABELS,
  ...SPECIAL_LABELS,
};

/** Items grouped by section */
export const ITEMS_BY_SECTION: Readonly<Record<SectionId, NavEntry[]>> =
  NAV_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {} as Record<SectionId, NavEntry[]>,
  );
