# COMPREHENSIVE BADGE AUDIT REPORT
**Date**: April 8, 2026  
**Scope**: pages/**, components/patterns/**, components/advanced/**  
**Exclusions**: *.stories.tsx, *.test.tsx, guidelines/**, TOKENS.md

---

## EXECUTIVE SUMMARY

| Metric | Count |
|--------|-------|
| Files Analyzed | 50+ |
| Total Violations | 44 |
| NO Variant Violations | 4 |
| variant="secondary" | 10 |
| variant="default" | 4 |
| Custom Span Implementations | 6 |
| Inconsistent Sizing Issues | 10+ |
| Sizing Variations | text-[10px], text-[11px], text-xs, custom py/px |

---

## 🔴 SEVERITY 1: NO VARIANT SPECIFIED (Custom Styling Only)

### 1. AdvancedFormsPage.tsx
**Path**: [pages/AdvancedFormsPage.tsx](pages/AdvancedFormsPage.tsx#L64)  
**Line**: 64  
**Current Code**:
```jsx
<Badge className="bg-blue-500 hover:bg-blue-600 text-white">
  MEDIUM PRIORITY
</Badge>
```
**Issue**: Badge has NO variant, using only custom className for styling  
**Violation Type**: Missing variant + custom styling  
**Required Fix**: Use proper `variant="info"` or create variant for priority badges

---

### 2. factoring-calculator.tsx
**Path**: [components/patterns/factoring-calculator.tsx](components/patterns/factoring-calculator.tsx#L371)  
**Line**: 371  
**Current Code**:
```jsx
{isBest && <Badge className="ml-2 text-[10px] py-0 px-1.5 bg-green-100 text-green-700 border-0">Mejor</Badge>}
```
**Issue**: Badge has NO variant, completely custom styling (green theme hardcoded)  
**Violation Type**: Missing variant + custom colors + custom sizing  
**Required Fix**: Use `variant="success-soft"` or similar

---

### 3. chart-showcase.tsx (3 violations)
**Path**: [components/advanced/chart-showcase.tsx](components/advanced/chart-showcase.tsx#L61)  
**Lines**: 61, 87, 113  
**Current Code** (Line 61):
```jsx
<Badge>Line</Badge>
```
**Issue**: Badge has NO variant at all  
**Violation Type**: Missing variant  
**Required Fix**: Use appropriate variant (info, secondary, or neutral)

---

### 4. SidebarShowcasePage.tsx
**Path**: [pages/SidebarShowcasePage.tsx](pages/SidebarShowcasePage.tsx#L152)  
**Line**: 152  
**Current Code**:
```jsx
<Badge className="ml-auto">12</Badge>
```
**Issue**: Badge has NO variant, only custom margin  
**Violation Type**: Missing variant  
**Required Fix**: Use `variant="default"` or `variant="neutral"`

---

## 🔴 SEVERITY 2: variant="secondary" (10 violations)

These badges use deprecated/non-standard variant. Should be changed to outline or soft variants for consistency.

### 1. AdvancedFormsPage.tsx (4 occurrences)
**Path**: [pages/AdvancedFormsPage.tsx](pages/AdvancedFormsPage.tsx#L81)  
**Lines**: 81, 217, 249, 280  
**Current Code** (Line 81):
```jsx
<Badge variant="secondary">Progress Tracking</Badge>
```
**Issue**: Using deprecated `variant="secondary"`  
**Context**: Feature/capability labels in showcase sections  
**Required Fix**: Change to `variant="neutral-soft-outline"` or `variant="secondary-soft-outline"`

---

### 2. conditional-form.tsx
**Path**: [components/advanced/conditional-form.tsx](components/advanced/conditional-form.tsx#L72)  
**Line**: 72  
**Current Code**:
```jsx
<Badge variant="secondary">Business Information</Badge>
```
**Issue**: Using `variant="secondary"` for section header  
**Required Fix**: Change to `variant="info-soft-outline"` or similar

---

### 3. funnel-chart.tsx
**Path**: [components/advanced/funnel-chart.tsx](components/advanced/funnel-chart.tsx#L118)  
**Line**: 118  
**Current Code**:
```jsx
<Badge variant="secondary">{data.length} stages</Badge>
```
**Issue**: Using `variant="secondary"` for count badge  
**Required Fix**: Change to `variant="neutral-soft-outline"`

---

### 4. form-builder.tsx
**Path**: [components/advanced/form-builder.tsx](components/advanced/form-builder.tsx#L89)  
**Line**: 89  
**Current Code**:
```jsx
{field.required && <Badge variant="secondary" className="text-xs">Required</Badge>}
```
**Issue**: Using `variant="secondary"` + custom sizing  
**Required Fix**: Change to `variant="warning-soft-outline"` (indicates required field)

---

### 5. heatmap.tsx
**Path**: [components/advanced/heatmap.tsx](components/advanced/heatmap.tsx#L121)  
**Line**: 121  
**Current Code**:
```jsx
<Badge variant="secondary">{data.length} data points</Badge>
```
**Issue**: Using `variant="secondary"` for count  
**Required Fix**: Change to `variant="neutral-soft-outline"`

---

### 6. multi-column-form.tsx
**Path**: [components/advanced/multi-column-form.tsx](components/advanced/multi-column-form.tsx#L38)  
**Line**: 38  
**Current Code**:
```jsx
<Badge variant="secondary">Responsive</Badge>
```
**Issue**: Using `variant="secondary"` for feature label  
**Required Fix**: Change to `variant="info-soft-outline"`

---

### 7. multi-step-wizard.tsx
**Path**: [components/patterns/multi-step-wizard.tsx](components/patterns/multi-step-wizard.tsx#L257)  
**Line**: 257  
**Current Code**:
```jsx
<Badge variant="secondary">3 files</Badge>
```
**Issue**: Using `variant="secondary"` for file count  
**Required Fix**: Change to `variant="neutral-soft-outline"`

---

### 8. notification-center.tsx
**Path**: [components/patterns/notification-center.tsx](components/patterns/notification-center.tsx#L205)  
**Line**: 205  
**Current Code**:
```jsx
<Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
  {notificationList.length}
</Badge>
```
**Issue**: Using `variant="secondary"` + custom sizing for count  
**Required Fix**: Change to `variant="neutral-soft-outline"` and standardize sizing

---

### 9. factoring-portfolio-report.tsx
**Path**: [components/patterns/factoring-portfolio-report.tsx](components/patterns/factoring-portfolio-report.tsx#L336)  
**Line**: 336  
**Current Code**:
```jsx
<Badge variant="secondary" className="text-xs font-normal ml-1">{filtered.length} registros</Badge>
```
**Issue**: Using `variant="secondary"` for operation count indicator  
**Required Fix**: Change to `variant="neutral-soft-outline"` for consistency

---

### 10. timeline.tsx
**Path**: [components/patterns/timeline.tsx](components/patterns/timeline.tsx#L76)  
**Line**: 76  
**Current Code**:
```jsx
<Badge variant={item.badgeVariant ?? "secondary"} className="text-xs">
  {item.badge}
</Badge>
```
**Issue**: Default fallback to `variant="secondary"` when not specified  
**Violation Type**: Secondary as fallback (also indicates missing variant config)  
**Required Fix**: Change default to `variant="neutral-soft-outline"` or require explicit variant

---

## 🔴 SEVERITY 3: variant="default" (4 violations)

### 1. notification-center.tsx (2 occurrences)
**Path**: [components/patterns/notification-center.tsx](components/patterns/notification-center.tsx#L132)  
**Lines**: 132, 212  
**Current Code** (Line 132):
```jsx
<Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
```
**Issue**: Using `variant="default"` for indicator dot  
**Required Fix**: Consider `variant="neutral"` or create a dedicated dot badge variant

**Line 212**:
```jsx
<Badge variant="default" className="ml-2 h-5 px-1.5 text-xs">
  {unreadCount}
</Badge>
```
**Issue**: Using `variant="default"` for unread count + custom sizing  
**Required Fix**: Change to appropriate variant + standardize sizing

---

### 2. advanced-filter-panel.tsx
**Path**: [components/patterns/advanced-filter-panel.tsx](components/patterns/advanced-filter-panel.tsx#L94)  
**Line**: 94  
**Current Code**:
```jsx
<Badge
  variant="default"
  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
>
  {activeFilters}
</Badge>
```
**Issue**: Using `variant="default"` for active filter count + custom circle styling  
**Required Fix**: Change to `variant="neutral"` or `variant="info"` with proper sizing

---

### 3. risk-indicator.tsx
**Path**: [components/patterns/risk-indicator.tsx](components/patterns/risk-indicator.tsx#L147)  
**Line**: 147  
**Current Code**:
```jsx
<Badge
  variant={level === "bajo" ? "default" : level === "crítico" ? "destructive" : "outline"}
  className={cn("text-xs", ...custom styles)}
>
  {cfg.label}
</Badge>
```
**Issue**: Using conditional variants including `"default"` for risk levels  
**Violation Type**: Missing proper risk variant mapping + custom styling  
**Required Fix**: Map to soft-outline variants (success-soft-outline, warning-soft-outline, etc.)

---

## 🔴 SEVERITY 4: CUSTOM SPAN-BASED BADGE IMPLEMENTATIONS (6 violations)

These are `<span>` elements with badge-like styling that should be converted to proper Badge components.

### 1. factoring-portfolio-report.tsx
**Path**: [components/patterns/factoring-portfolio-report.tsx](components/patterns/factoring-portfolio-report.tsx#L383)  
**Line**: 383  
**Current Code**:
```jsx
<span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{r.sector}</span>
```
**Issue**: Custom span badge implementation with hardcoded styling  
**Sizing**: `text-[10px]` - inconsistent  
**Required Fix**: Replace with `<Badge variant="neutral-soft-outline" className="text-xs">`

---

### 2. factoring-maturity-alerts.tsx (2 occurrences)
**Path**: [components/patterns/factoring-maturity-alerts.tsx](components/patterns/factoring-maturity-alerts.tsx#L144)  
**Line**: 144  
**Current Code**:
```jsx
<span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", cfg.badgeColor)}>
  {alert.diasRestantes < 0 ? `${Math.abs(alert.diasRestantes)}d vencido` : `${alert.diasRestantes}d restantes`}
</span>
```
**Issue**: Custom span implementation using dynamic color + custom sizing  
**Sizing**: `text-[10px]` + custom padding  
**Required Fix**: Convert to Badge component with dynamic variant

**Line 365**:
```jsx
<span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", cfg.badgeColor)}>{group.length}</span>
```
**Issue**: Custom span for urgency group count  
**Sizing**: `text-[10px]` - inconsistent sizing issue  
**Required Fix**: Use Badge component

---

### 3. factoring-sector-concentration.tsx (2 occurrences)
**Path**: [components/patterns/factoring-sector-concentration.tsx](components/patterns/factoring-sector-concentration.tsx#L91)  
**Line**: 91  
**Current Code**:
```jsx
<span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${m.bg} ${m.color}`}>
  {m.label}
</span>
```
**Issue**: Custom span badge for risk levels  
**Sizing**: `text-[11px]` - inconsistent sizing  
**Required Fix**: Create proper Badge component for risk display

**Line 317**:
```jsx
<span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">{r.sector}</span>
```
**Issue**: Duplicate of portfolio-report sector badge  
**Required Fix**: Standardize with dedicated Badge variant

---

### 4. DSMVisualAuditPage.tsx
**Path**: [pages/DSMVisualAuditPage.tsx](pages/DSMVisualAuditPage.tsx#L656)  
**Line**: 656  
**Current Code**:
```jsx
<div className={`inline-block rounded-md px-2 py-0.5 mb-3 font-mono ${item.badge}`}>
  Paso {item.step}
</div>
```
**Issue**: Custom div implementation used as badge (step indicator)  
**Sizing**: `px-2 py-0.5` + custom margin  
**Required Fix**: Use `<Badge>` component

---

## 🟡 SEVERITY 5: INCONSISTENT SIZING (10+ violations)

Badges with custom font sizes creating visual inconsistency across the codebase.

### Size Variations Found:
- `text-xs` - Standard size (most common)
- `text-[10px]` - Smaller custom size
- `text-[11px]` - Slightly larger custom size
- Custom padding: `py-0`, `py-0.5`, `py-2.5`
- Custom height: `h-2`, `h-4`, `h-5`

### Files with Sizing Issues:

#### 1. file-viewer.tsx
**Path**: [components/patterns/file-viewer.tsx](components/patterns/file-viewer.tsx#L115)  
**Line**: 115  
**Current Code**:
```jsx
<Badge variant="outline" className="text-xs py-0 h-4">
```
**Issue**: `text-xs` + custom vertical padding + custom height  
**Required Fix**: Standardize to use only `text-xs` without extra padding/height adjustments

---

#### 2. signature-panel.tsx (3 occurrences)
**Path**: [components/patterns/signature-panel.tsx](components/patterns/signature-panel.tsx#L147)  
**Lines**: 147, 152, 200  
**Current Code** (Line 147):
```jsx
<Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
  Completado
</Badge>
```
**Issue**: Using `text-xs` + custom color styling overrides  
**Required Fix**: Use `variant="success-soft-outline"` instead of custom colors

**Line 152**:
```jsx
<Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
  Rechazado
</Badge>
```
**Issue**: Custom color overrides on outline variant  
**Required Fix**: Use `variant="destructive-soft-outline"`

**Line 200**:
```jsx
<Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4", cfg.badgeClass)}>
```
**Issue**: Using `text-[10px]` + custom padding + custom height  
**Sizing**: Creates inconsistency with other badges  
**Required Fix**: Standardize to `text-xs` without custom dimensions

---

#### 3. factoring-cedent-profile.tsx (2 occurrences)
**Path**: [components/patterns/factoring-cedent-profile.tsx](components/patterns/factoring-cedent-profile.tsx#L341)  
**Lines**: 341-342  
**Current Code**:
```jsx
? <Badge variant="success-soft-outline" className="text-[10px]">Vigente</Badge>
: <Badge variant="destructive-soft-outline" className="text-[10px]">Por renovar</Badge>}
```
**Issue**: Using `text-[10px]` instead of standard `text-xs`  
**Sizing**: Creates inconsistency with other badges  
**Required Fix**: Change `text-[10px]` to `text-xs`

---

## 📊 VIOLATION SUMMARY BY FILE

| File | Line(s) | Issue Type | Severity |
|------|---------|-----------|----------|
| AdvancedFormsPage.tsx | 64, 81, 217, 249, 280 | NO variant, secondary variant | 🔴🔴 |
| factoring-calculator.tsx | 371 | NO variant custom styling | 🔴 |
| chart-showcase.tsx | 61, 87, 113 | NO variant | 🔴 |
| SidebarShowcasePage.tsx | 152 | NO variant | 🔴 |
| conditional-form.tsx | 72 | secondary variant | 🔴 |
| funnel-chart.tsx | 118 | secondary variant | 🔴 |
| form-builder.tsx | 89 | secondary variant + sizing | 🔴 |
| heatmap.tsx | 121 | secondary variant | 🔴 |
| multi-column-form.tsx | 38 | secondary variant | 🔴 |
| multi-step-wizard.tsx | 257 | secondary variant | 🔴 |
| notification-center.tsx | 132, 205, 212 | default, secondary variants + sizing | 🔴 |
| factoring-portfolio-report.tsx | 336, 383 | secondary variant, custom span | 🔴 |
| timeline.tsx | 76 | secondary as fallback | 🔴 |
| advanced-filter-panel.tsx | 94 | default variant + sizing | 🔴 |
| risk-indicator.tsx | 147 | default/destructive conditional | 🔴 |
| factoring-maturity-alerts.tsx | 144, 365 | custom span implementations | 🔴 |
| factoring-sector-concentration.tsx | 91, 317 | custom span implementations | 🔴 |
| DSMVisualAuditPage.tsx | 656 | custom div implementation | 🔴 |
| file-viewer.tsx | 115 | inconsistent sizing | 🟡 |
| signature-panel.tsx | 147, 152, 200 | custom colors + inconsistent sizing | 🟡 |
| factoring-cedent-profile.tsx | 341-342 | inconsistent sizing text-[10px] | 🟡 |

---

## ✅ COMPLIANT COMPONENTS

These components properly implement Badge standards:

1. **audit-log.tsx** - All badges use `variant="outline"`
2. **aging-report.tsx** - All badges use `variant="outline"`
3. **data-table-advanced.tsx** - Uses `variant="*-soft-outline"`
4. **BulkActionToolbarPage.tsx** - Uses `variant="outline"`
5. **tree-table.tsx** - Uses `variant="outline"` consistently
6. **factoring-cedent-profile.tsx** (lines 140-141) - Uses soft-outline variants
7. **factoring-debtor-list.tsx** - Uses `variant="outline"`
8. **document-checklist.tsx** - Uses proper variants
9. **stats-dashboard.tsx** - Uses `variant="outline"`

---

## 🎯 RECOMMENDED FIXES (Priority Order)

### Priority 1: NO VARIANT Badges (4 files)
Replace entirely with proper variants:
- `AdvancedFormsPage.tsx:64` → Use `variant="info"`
- `factoring-calculator.tsx:371` → Use `variant="success-soft"`
- `chart-showcase.tsx:61,87,113` → Use `variant="neutral-soft-outline"`
- `SidebarShowcasePage.tsx:152` → Use `variant="neutral"` or default

### Priority 2: Standardize Secondary → Soft-Outline (10 files)
Replace all `variant="secondary"` with:
```
variant="neutral-soft-outline"    // Generic/neutral context
variant="info-soft-outline"       // Feature/info context
variant="warning-soft-outline"    // Alert/required context
```

### Priority 3: Replace Default → Proper Variants (4 files)
- Indicator dots → use `variant="neutral"`
- Counts → use `variant="neutral-soft-outline"`
- Risk level → use `variant="*-soft-outline"` conditional

### Priority 4: Convert Custom Spans → Badge Components (6 files)
Replace all custom `<span className="rounded-full...">` with `<Badge>`

### Priority 5: Standardize Sizing (10+ locations)
- Remove custom `text-[10px]`, `text-[11px]`
- Standardize to `text-xs` only
- Remove custom padding/height (let Badge component handle it)
- Remove custom color styling (use variant instead)

---

## 📝 STANDARDIZATION RULES

For future Badge implementations:

1. **Always specify a variant** - Never use `<Badge>` without `variant=`
2. **Use soft-outline for tables** - `variant="*-soft-outline"` for data display
3. **Use soft-outline for status** - `variant="success-soft-outline"`, etc.
4. **Sizing must be consistent** - Only use `text-xs` (no `text-[10px]`)
5. **No custom colors** - Use variants instead of className color overrides
6. **No custom padding** - Let Badge component handle margins
7. **No span badges** - Always use `<Badge>` component
8. **Color variants only in specific contexts**:
   - Status badges → `*-soft-outline`
   - Count indicators → `neutral-soft-outline`
   - Feature labels → `*-soft-outline`
   - Risk levels → conditional `*-soft-outline`

