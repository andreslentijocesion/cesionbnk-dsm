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
  ["progress",             "Progress",            "feedback"],
  ["progress-with-range",  "Progress with Range", "feedback"],
  ["skeleton",             "Skeleton",            "feedback"],
  ["sheet",                "Sheet",               "feedback"],
  ["drawer",               "Drawer",              "feedback"],
  ["popover",              "Popover",             "feedback"],
  ["empty-state",          "Empty State",         "feedback"],
  ["error-boundary",       "Error Boundary",      "feedback"],
  ["bottom-sheet",         "Bottom Sheet",        "feedback"],
  ["loading-states",       "Loading States",      "feedback"],

  // ── Layout ──
  ["accordion",         "Accordion",   "layout"],
  ["collapsible",       "Collapsible", "layout"],
  ["carousel",          "Carousel",    "layout"],
  ["scroll-area",       "Scroll Area", "layout"],
  ["sidebar-showcase",  "Sidebar",     "layout"],
  ["app-layout",        "App Layout",  "layout"],

  // ── Patterns ──
  ["data-table-advanced",            "Data Table Advanced",       "patterns"],
  ["factoring-dashboard",            "Factoring Dashboard",       "patterns"],
  ["factoring-portfolio",            "Factoring Portfolio",       "patterns"],
  ["factoring-new-operation",        "Nueva Operación",           "patterns"],
  ["factoring-approval-queue",       "Cola de Aprobación",        "patterns"],
  ["factoring-cedent-list",          "Gestión de Cedentes",       "patterns"],
  ["factoring-cedent-profile",       "Perfil de Cedente",         "patterns"],
  ["factoring-debtor-list",          "Gestión de Deudores",       "patterns"],
  ["factoring-maturity-alerts",      "Alertas de Vencimiento",    "patterns"],
  ["factoring-portfolio-report",     "Reporte de Cartera",        "patterns"],
  ["factoring-calculator",           "Calculadora",               "patterns"],
  ["factoring-sector-concentration", "Concentración Sectorial",   "patterns"],
  ["factoring-status-card",          "Status Cards",              "patterns"],
  ["advanced-filter",                "Advanced Filter Panel",     "patterns"],
  ["editable-table",                 "Editable Table",            "patterns"],
  ["multi-step-wizard",              "Multi-Step Wizard",         "patterns"],
  ["multi-step-form",                "Multi-Step Form",           "patterns"],
  ["notification-center",            "Notification Center",       "patterns"],
  ["timeline",                       "Timeline",                  "patterns"],
  ["file-viewer",                    "File Viewer",               "patterns"],
  ["stat-card",                      "Stat Card",                 "patterns"],
  ["aging-report",                   "Aging Report",              "patterns"],
  ["audit-log",                      "Audit Log",                 "patterns"],
  ["credit-score-card",              "Credit Score Card",         "patterns"],
  ["approval-flow",                  "Approval Flow",             "patterns"],
  ["export-panel",                   "Export Panel",              "patterns"],
  ["onboarding",                     "Onboarding",                "patterns"],
  ["bulk-action-toolbar",            "Bulk Action Toolbar",       "patterns"],
  ["comment-thread",                 "Comment Thread",            "patterns"],
  ["document-checklist",             "Document Checklist",        "patterns"],
  ["detail-card",                    "Detail Card",               "patterns"],
  ["operation-status-pipeline",      "Operation Status Pipeline",  "patterns"],
  ["risk-indicator",                 "Risk Indicator",             "patterns"],
  ["signature-panel",                "Signature Panel",            "patterns"],

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
  "dsm-visual-audit": "DSM Visual Audit",
  changelog:          "Changelog",
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
