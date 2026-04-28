# Changelog

All notable changes to `@andreslentijocesion/cesionbnk-dsm` are documented here.

---

## [0.4.1] — 2026-04-28

### Added
- `.npmrc` configuration to handle peer dependency conflicts (Radix UI / ESLint).
- Deployment support for Vercel with automatic CI/CD from GitHub.
- New Theme Explorer and additional visual themes (Vercel, Stripe, Linear, Apple, Duotone).

### Fixed
- **Infrastructure**: Resolved Rollup architecture mismatch error on Apple Silicon (M1/M2/M3).
- **TypeScript**: Fixed production build by excluding `tests/` and `stories/` from the main `tsconfig.json`.
- **Typing**: Resolved `Urgency` type mismatch in `FactoringMaturityAlerts`.
- **Linting**: Cleaned up unused imports in `FactoringStatusCardPage` and other components.
- **Styles**: Moved gradient accent borders from top to bottom in `AgingReport` and `CreditScoreCard` per design refinement.
- **Tests**: Fixed export issues in `tests/utils/render.tsx` to align with `@testing-library/react` v16.

---

## [0.4.0] — 2026-03-14

### Added

**New exports in `lib/index.ts` — Advanced / Factoring components**
- `Combobox` — searchable select with command palette
- `FileUploader` — drag-and-drop file upload with progress
- `Sparkline` / `SparklineData` — mini trend charts for KPI cards
- `GaugeChart` — semicircular gauge for scores and ratios
- `FunnelChart` / `FunnelStage` — conversion funnel visualization
- `StepIndicator` / `Step` — multi-step progress indicator (horizontal, vertical, compact, minimal)
- `VirtualizedList` — virtualized scrolling for large lists (500+ items)
- `TreemapChart` / `TreemapData` — hierarchical treemap for portfolio/sector concentration
- `Heatmap` / `HeatmapCell` — matrix heatmap for mora/approval rate analysis
- `InfiniteScroll` — intersection-observer-based infinite scroll
- `RichTextEditor` — contentEditable rich text with toolbar

**New Storybook stories (28 files)**
- Advanced: Combobox, FileUploader, Sparkline, GaugeChart, FunnelChart, StepIndicator, VirtualizedList, TreemapChart, Heatmap, InfiniteScroll, RichTextEditor
- UI components: Calendar, DateRangePicker, Drawer, Collapsible, HoverCard, Command, ScrollArea, Stepper, ProgressWithRange, TextareaAutoresize, ToggleGroup, ToggleButtonGroup, PageLayout, DateNavigator, BottomSheet, FloatingActionButton, Resizable, Menubar, NavigationMenu, ContextMenu, Carousel, Form, Sidebar

### Fixed

- `rich-text-editor.tsx`: `placeholder` prop was destructured but never applied to the DOM — now passed as `data-placeholder` on the contentEditable div
- `file-uploader.tsx`: unused `i` variable in `files.forEach((_, i) => removeFile(0))` — removed
- `step-indicator.tsx`: unused `Card`/`CardContent` import removed

### Plugin (Figma) — v7.1.0

- **Page rename**: `Foundation` → `Design System`
- **Icons page**: new 7th page with visual icon grid organized by category
- **Page subtitles** updated to reflect showcase structure (Actions · Forms, Navigation · Data Display, etc.)
- **Separator frames**: fixed 55 separator frames collapsing to 0 height — explicit `FIXED` sizing after `layoutMode = 'HORIZONTAL'`
- **Table cells**: fixed ~20 cell/row types in Master Table and factoring patterns (HUG → FIXED sizing)
- **Checkboxes**: fixed checked checkboxes expanding horizontally due to layout mode reset

---

## [0.3.0] — 2026-03-07

### Added

- Complete token system: `tokens/cesionbnk.tokens.json` with brand, surface, semantic, UI, radius, spacing, typography, shadow
- Token build pipeline: `scripts/build-tokens.cjs` — syncs tokens → CSS custom properties + plugin C/DARK objects
- Color migration script: `scripts/migrate-plugin-colors.cjs` — replaces hardcoded hex → C.* token references
- Figma Variables support in plugin (light + dark mode, all semantic tokens)
- `DataTable` enhanced: selectable rows, bulk actions bar, loading skeleton, column visibility
- `MasterDataGrid`: unified grid shell with search, pagination, toolbar actions
- Expanded exports: `EmptyState`, `SplitButton`, `InlineBanner`, `FloatingActionButton`, `ToggleButtonGroup`, `LoadingOverlay`, `ErrorBoundary`, `PageLayout`, `SplitLayout`, `StackLayout`, `DateNavigator`, `ProgressWithRange`, `Stepper`, `BottomSheet`, `Carousel`, `Resizable`

### Fixed

- `Heatmap`: `transition-all` → `transition-opacity` + backgroundColor applied directly (CSS vars were not resolving)
- `TreemapChart`: `height="100%"` → `height={height}` in SafeChartContainer to stop ResizeObserver loop
- `FactoringSectorConcentration`: colors array memoized with `useMemo` to prevent re-renders
- Plugin: resolved 75+ Figma API validation errors (variable types, mode IDs, missing properties)

---

## [0.1.0] — Initial release

- Core primitive components: Button, Badge, Input, Label, Textarea, Checkbox, Switch, Slider, Separator, Progress, Skeleton, Toggle, ToggleGroup, SplitButton
- Form components: Form, Select, RadioGroup, MultiSelect, InputOTP, InputFile, Calendar, DateRangePicker
- Layout/Navigation: Tabs, Breadcrumb, Pagination, NavigationMenu, Accordion, Collapsible, ScrollArea, Command
- Menus: DropdownMenu, ContextMenu
- Data Display: Card, Table, Avatar, HoverCard, EmptyState
- Feedback/Overlays: Alert, AlertDialog, Dialog, Tooltip, Popover, Sheet, Toaster, Drawer
- Advanced: DataTable, Combobox, FileUploader
- CesionBNK theme: `styles/themes/cesionbnk.css` with CSS custom properties
- Storybook with Chromatic visual regression CI
- GitHub Packages publish workflow
