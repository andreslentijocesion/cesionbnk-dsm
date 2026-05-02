# NAMING CONVENTION — Triple Alignment

> **Status**: Completed (v0.3.2)
> **Created**: 2026-02-17
> **Completed**: 2026-02-22
> **Affects**: `components/ui/`, `components/patterns/`, `components/advanced/`, `components/patterns/`, Figma Design
> **Updated**: 2026-03-05 — Removed factoring references (app eliminated in v1.0.0)

---

## Problem

The project currently mixes 3 file naming conventions:

| Layer | Current Convention | Example |
|---|---|---|
| `ui/` | kebab-case (correct) | `alert-dialog.tsx` |
| `patterns/` | PascalCase | `ApprovalFlowWizard.tsx` |
| `advanced/` | PascalCase | `ChartShowcase.tsx` |
| `widgets/` | PascalCase | `ActionButton.tsx` |
| ~~`factoring/`~~ | ~~Mixed~~ | *(Eliminated in v1.0.0)* |

Additionally, some exports don't match their file names:

```
widgets/TimelineItem.tsx  → export { ApprovalTimelineItem }
widgets/FormField.tsx     → export { SimpleFormField }
```

> **Note**: Domain-specific factoring components were eliminated in v1.0.0.

---

## Convention: Triple Alignment

One semantic name automatically generates file name, React export, and Figma name.

### Master Rule

```
Semantic Name:  "Approval Flow Wizard"
  → File:       approval-flow-wizard.tsx
  → Export:     ApprovalFlowWizard
  → Figma:      Patterns / ApprovalFlowWizard
  → Import:     @/components/patterns/approval-flow-wizard
```

### Derivation Table

| Derivation | Rule | Example |
|---|---|---|
| **File** | kebab-case + `.tsx` | `approval-flow-wizard.tsx` |
| **React export** | PascalCase (from kebab) | `ApprovalFlowWizard` |
| **Figma** | `Layer / PascalCase` | `Patterns / ApprovalFlowWizard` |

### Figma Layer Mapping

| Directory | Figma Frame | Atomic Design | Content | Domain prefix |
|---|---|---|---|---|
| `ui/` | `UI / {Name}` | Atoms + Molecules | Generic primitives, no business logic | Never |
| `widgets/` | `Patterns / {Name}` | Composed Molecules | Small composed pieces of UI primitives | Never |
| `advanced/` | `Advanced / {Name}` | Complex Organisms | Data-heavy, charts, editors | Never |
| `patterns/` | `Patterns / {Name}` | Business Organisms | Reusable cross-domain flows | Never |

> **Note**: The `factoring/` directory was eliminated in v1.0.0. Only the 4 library layers above exist.

---

## Rules

### R1 — File naming: always kebab-case

```
approval-flow-wizard.tsx     (patterns/)
chart-showcase.tsx           (advanced/)
action-button.tsx            (widgets/)
```

### R2 — 1:1 file-to-export mapping

The primary export name must be the PascalCase version of the file name. No exceptions.

```
approval-flow-wizard.tsx  → export { ApprovalFlowWizard }
stat-card.tsx             → export { StatCard }
```

### R3 — No domain prefixes in library components

Library layers (`ui/`, `patterns/`, `advanced/`, `widgets/`) must never use domain prefixes.

```
BAD:  patterns/banking-calculator.tsx      (domain prefix)
GOOD: patterns/financial-calculator.tsx    (generic name)
```

### R4 — No version suffixes

```
BAD:  tree-table-v2.tsx
GOOD: tree-table.tsx              (current version)
GOOD: tree-table-legacy.tsx       (deprecated version, if needed)
```

### R5 — Sub-component files in feature folders

When a component has multiple sub-files, use a folder with kebab-case:

```
components/advanced/
  data-table/
    data-table.tsx                (main)
    data-table-columns.tsx        (sub-component)
    data-table-toolbar.tsx        (sub-component)
    mock-data.ts                  (data)
```

### R6 — Barrel exports match file names

```typescript
// components/patterns/index.ts
export * from "./approval-flow-wizard";
export * from "./activity-feed";
export * from "./admin-portal";
```

---

## Migration Plan

### Phase 1 — Rename files to kebab-case (~74 files) ✅ DONE

Rename all PascalCase files in `patterns/`, `advanced/`, `widgets/` to kebab-case.
Update all barrel `index.ts` files and imports across the codebase.

**Method**: Node script (`scripts/rename-to-kebab.mjs`) — bulk rename + auto-update imports.

### Phase 2 — Fix export-file mismatches (2-3 files) ✅ DONE

| Old File | Export | New File | Status |
|---|---|---|---|
| `widgets/timeline-item.tsx` | `ApprovalTimelineItem` | `widgets/approval-timeline-item.tsx` | ✅ Renamed |
| `widgets/form-field.tsx` | `SimpleFormField` | `widgets/simple-form-field.tsx` | ✅ Renamed |

### Phase 3 — Reclassify domain-specific components ✅ DONE

| Old Location | Action | New Location | Status |
|---|---|---|---|
| `patterns/factoring-kpi-card.tsx` | Moved | `factoring/components/factoring-kpi-card.tsx` | ✅ Done |
| `patterns/factoring-kpi-card-group.tsx` | Moved | `factoring/components/factoring-kpi-card-group.tsx` | ✅ Done |

Removed from `patterns/index.ts`. All 4 consumers updated.

> **Note**: `FactoringCalculator` and `CupoValidator` were orphans with no consumers — already removed in v0.3.0.

### Phase 4 — Resolve duplicates ✅ DONE

| Pair | Decision | Status |
|---|---|---|
| `advanced/data-table.tsx` vs `patterns/data-table-advanced.tsx` | **Keep both** — `DataTable` is a generic TanStack Table wrapper; `DataTableAdvanced` is a self-contained demo pattern with mock data | ✅ Documented |
| `widgets/invoice-table.tsx` vs `patterns/factoring/factoring-invoice-table.tsx` | **Keep both** — `InvoiceTable` is a simple generic widget demo; `FactoringInvoiceTable` is a full-featured domain-specific component | ✅ Documented |
| `patterns/kpi-showcase.tsx` vs `patterns/kpi-showcase-extended.tsx` | **Rebuilt** — both were broken stubs (re-exports of deleted PascalCase files). Rebuilt with full implementations | ✅ Fixed |
| `advanced/tree-table.tsx` vs `advanced/tree-table-v2.tsx` | **R4 compliance** — V1 never existed; renamed `tree-table-v2.tsx` → `tree-table.tsx`, export `TreeTableV2` → `TreeTable`, all consumers updated | ✅ Done |

### Phase 5b — Collapse stubs into real files ✅ DONE

Convert the 3 remaining kebab-case stub files into the real implementations,
inlining the content from their PascalCase backing files, and deleting the PascalCase originals.

| Stub File | Backing File (deleted) | Direct-import consumers fixed | Status |
|---|---|---|---|
| `factoring/operations-list.tsx` | `factoring/OperationsList.tsx` | `pages/OperationsListPage.tsx` | ✅ Done |
| `factoring/c-financia/c-financia-client-flow.tsx` | `c-financia/CFinanciaClientFlow.tsx` | `FactoringApp.tsx` (lazy import) | ✅ Done |
| `factoring/dashboard-comercial/dashboard-comercial.tsx` | `dashboard-comercial/DashboardComercial.tsx` | None (already via stub) | ✅ Done |

---

## Estimated Effort

| Phase | Files | Method | Time | Status |
|---|---|---|---|---|
| F1 — Rename to kebab-case | ~74 | Script (`rename-to-kebab.mjs`) | ~1 hour | ✅ Done |
| F2 — Fix mismatches | 2 | Manual | ~10 min | ✅ Done |
| F3 — Reclassify domain | 2 | Manual | ~15 min | ✅ Done |
| F4 — Resolve duplicates | 4 pairs | Analysis + manual | ~30 min | ✅ Done |
| **F5b — Collapse stubs** | **3 files** | **Manual** | **~20 min** | **✅ Done** |
| **Total** | | | **~2h 20min** | **✅ 100% Complete** |

---

## Checklist — Adding a New Component

When creating a new component, follow this checklist:

1. [ ] Choose the correct layer (`ui/`, `widgets/`, `advanced/`, `patterns/`)
2. [ ] File name is kebab-case: `my-component.tsx`
3. [ ] Primary export is PascalCase: `export function MyComponent`
4. [ ] Export name matches file name (PascalCase of kebab)
5. [ ] No domain prefix if it's a library component
6. [ ] Added to the layer's `index.ts` barrel
7. [ ] Figma component named: `Layer / MyComponent`
8. [ ] Updated `COMPONENTS.md` inventory