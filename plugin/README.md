# CESIONBNK — Figma Plugin System

This directory contains **1 active plugin** that generates the Design System in Figma.

## Active Plugin

| Plugin | Version | Location | UI | Purpose |
|--------|---------|----------|----|---------|
| **Componentes CESIONBNK** | v6.1.0 | `/plugin/cesionbnk-componentes/` | No (headless) | Creates component variants + Icon Library |

### Removed / Legacy

| Plugin | Status | Notes |
|--------|--------|-------|
| **Theme Picker** | Removed | Was at `/plugin/theme/`. Created Variables + Text Styles + Effects. |
| **Tokens** v3 | Legacy | Files kept at `/plugin/cesionbnk-tokens/` for reference. |
| **Icon Picker** | Removed | Users import Lucide library manually into Figma. |
| **Components** v27 | Superseded | Replaced by Componentes CESIONBNK v6.1.0. |
| **Button Catalog** | Removed | Was a visual showcase of 816 Button variants. |

---

## Componentes CESIONBNK v6.1.0

**Location:** `/plugin/cesionbnk-componentes/`
**Has UI:** No (headless, runs on execute)

### How to run

```
Figma → Plugins → Development → "CESIONBNK — Componentes CESIONBNK"
```

### What it creates

6 pages with ~1,200+ component variants:

| Page | Content |
|------|---------|
| `00 — Foundations` | Brand colors, Tailwind palettes, typography scale, spacing, elevations |
| `01 — Primitives` | Button (60), Input (48), Select, Textarea, Checkbox, Radio, Switch, Label, Slider, Toggle |
| `02 — Components` | Badge, Avatar, Table, Accordion, Separator, Card, Alert, Progress, Toast, Dialog, Popover, Tooltip, Sheet, Tabs, Breadcrumb, Pagination, DropdownMenu, Calendar, EmptyState |
| `03 — Patterns` | StatCard, DataTable, StepIndicator |
| `04 — Icon Library` | Lucide Icons ComponentSet (~70 icons, categorized) |
| `05 — Business` | BusinessKpiCard |

### Button — Icon Slots (v6.1.0)

Button variants include **Instance Swap dropdowns** + **Boolean switches** for icon control:

**Regular buttons (Size=sm/default/lg):**
- **"Show left icon"** — Boolean switch (default ON)
- **"Left icon"** — Instance Swap dropdown → pick from Lucide icons
- **"Show right icon"** — Boolean switch (default ON)
- **"Right icon"** — Instance Swap dropdown → pick from Lucide icons

**Icon-only buttons (Size=icon):**
- **"Icon"** — Instance Swap dropdown → pick from Lucide icons

The Instance Swap dropdowns show:
1. The plugin's built-in Lucide Icons ComponentSet (~70 icons)
2. Any externally imported Lucide library (if enabled in the file)

### Technical Notes

- Uses hardcoded hex from CESIONBNK tokens (no Variable binding)
- Icons created as real instances (not detached) for Instance Swap compatibility
- `addComponentProperty('name', 'INSTANCE_SWAP', componentKey)` creates the dropdown
- `componentPropertyReferences = { visible: boolKey, mainComponent: swapKey }` links both properties
- Strategy: NEVER changes `figma.currentPage` — creates on default page, moves to targets

---

## Troubleshooting

### Components don't have styles (transparent backgrounds)

**Expected behavior.** The Componentes CESIONBNK uses hardcoded CESIONBNK hex values. Components should render with correct colors in light mode. Check the console for errors if they appear transparent.

### Icon dropdown not visible in properties panel

The Instance Swap dropdown appears in the **Properties panel** (right side) when you select a Button instance. Look for "Left icon" / "Right icon" properties.

If you don't see them, the plugin may have fallen back to simple instances without the `INSTANCE_SWAP` property. Regenerate the components.

### Imported library icons not in dropdown

Go to **Assets panel → Libraries** → enable the Lucide library. Then Instance Swap dropdowns will include those icons.

---

## File Reference

| File | Purpose |
|------|---------|
| `/plugin/cesionbnk-componentes/code.js` | Componentes CESIONBNK plugin logic |
| `/plugin/cesionbnk-componentes/data/components.json` | Component definitions |
| `/plugin/cesionbnk-componentes/data/lucide-icons.json` | Lucide icon SVG paths |
| `/plugin/cesionbnk-componentes/data/tailwind-colors.json` | Tailwind color palette |
| `/plugin/component-map.json` | Coverage tracking (React vs Figma) |
| `/styles/themes/cesionbnk.css` | CSS token values (single source of truth) |

---

## Roadmap

### v28: Card variants (6 variants)
- Default / Compact / WithImage x WithFooter true/false

### v29: Interactive states
- Hover, Selected, Disabled on clickable components

### v29+: $gaps materialization
- Priority 1: InputGroup
- Priority 2: NumberInput, RatingStars, TagInput
- Priority 3: InvoiceCard, CurrencyDisplay (domain-specific)

---

**Last updated:** v6.1.0 — Instance Swap dropdowns for Button icon selection
