# CESIONBNK Plugin — Quick Start

## Plugin System

| Plugin | Version | Location | Purpose |
|--------|---------|----------|---------|
| **Componentes CESIONBNK** | v6.1.0 | `/plugin/cesionbnk-componentes/` | Creates component variants + Icon Library (standalone) |

> **Removed:** Theme Picker, Icon Picker, Tokens v3, Components v27.
> Users import Lucide library manually into Figma for extended icon selection.

---

## How to Run

```
Figma → Plugins → Development → "CESIONBNK — Componentes CESIONBNK"
```

**Creates 10 pages:**
- `Cover` — Branded cover frame
- `Foundation` — Colors, typography, spacing, elevations
- `Primitives` — Button, Input, Select, Checkbox, etc.
- `Components` — Badge, Card, Alert, Dialog, etc.
- `Patterns` — 11 real-world compositions
- `Icons` — Lucide Icons ComponentSet
- `Templates` — Reusable screen layouts (placeholder)
- `Documentacion` — DSM usage guide
- `Advanced` — Business components
- `Archive` — Deprecated components

---

## Button Icons — How to Use

Button variants have **two icon slots** with dropdown selectors:

### Properties Panel (per Button instance)

| Property | Type | Description |
|----------|------|-------------|
| **Show left icon** | Boolean switch (ON) | Toggle left icon ON/OFF |
| **Left icon** | Instance Swap dropdown | Pick any icon from Lucide library |
| **Show right icon** | Boolean switch (OFF) | Toggle right icon ON/OFF — hidden by default |
| **Right icon** | Instance Swap dropdown | Pick any icon from Lucide library |

> **Rule:** Only one icon shows at a time. Icons always match the button text color.

### Workflow

1. Select a Button instance
2. In the **Properties panel** (right side), you'll see:
   - Toggle switches for "Show left icon" / "Show right icon"
   - Dropdown selectors for "Left icon" / "Right icon"
3. Click the icon dropdown → search/pick from the Lucide Icons ComponentSet
4. If you have an imported Lucide library, those icons also appear in the dropdown

### Using an Imported Lucide Library

1. Import the Lucide Figma library: Community → search "Lucide Icons" → Enable
2. Select a Button instance → click the icon dropdown in Properties
3. Figma shows icons from BOTH the plugin's built-in set AND your imported library

### Icon-Only Buttons (Size=icon)

These have a single "Icon" dropdown property — no left/right, just one centered icon.

---

## Troubleshooting

### Components look unstyled

The Componentes CESIONBNK uses **hardcoded CESIONBNK hex values** — components should render with correct colors in light mode. If they appear transparent, check the Figma console for errors.

### Icon dropdown not showing

Make sure you're looking at the **Properties panel** (right side, not the layers panel). The dropdown appears as "Left icon" / "Right icon" under the component properties.

### Imported library icons not in dropdown

Go to **Assets panel → Libraries** → enable the Lucide library. Then the Instance Swap dropdown will include those icons.

---

## Full Documentation

- **Componentes CESIONBNK:** `/plugin/cesionbnk-componentes/README.md`
- **Component Map:** `/plugin/component-map.json`