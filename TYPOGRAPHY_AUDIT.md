# CESIONBNK Typography System — Comprehensive Audit

**Generated:** April 8, 2026  
**System:** Cesionbnk DSM v7.0.1  
**Status:** ✓ Documented & Reviewed

---

## 📐 Executive Summary

The CESIONBNK Design System has a **well-structured typography system** with:
- ✅ **Centralized token definitions** in JSON
- ✅ **CSS custom properties** for theme support (light/dark)
- ✅ **Tailwind CSS utilities** for component usage
- ✅ **Consistent font family** (Gotham + Inter fallbacks)
- ⚠️ **Minor inconsistencies** in custom font-size usage (text-[10px], text-[11px])
- ⚠️ **Incomplete heading hierarchy** in some component pages

---

## 1. Typography Token Definitions

### 📁 **File:** [tokens/cesionbnk.tokens.json](tokens/cesionbnk.tokens.json)

#### Font Families
```json
"fontFamily": {
  "sans": "Inter, 'Gotham HTF', system-ui, sans-serif",
  "mono": "'JetBrains Mono', 'Fira Code', monospace"
}
```

#### Font Sizes (pixels)
| Token | Size | Use Case |
|-------|------|----------|
| `xs` | 12px | Captions, badges, small labels |
| `sm` | 14px | Body text, small content |
| `base` | 16px | Default body, primary text |
| `lg` | 18px | Subheadings, card titles |
| `xl` | 20px | Heading 3 equivalent |
| `2xl` | 24px | Heading 2 equivalent |
| `3xl` | 32px | Heading 1 equivalent |

#### Font Weights
```json
"fontWeight": {
  "regular": 400,   // Default body text
  "medium": 500,    // Semi-bold labels, helper text
  "semibold": 600,  // Cards, larger text elements
  "bold": 700       // Page headings
}
```

#### Line Heights
```json
"lineHeight": {
  "tight": 1.25,    // Compact spacing (headings)
  "normal": 1.5,    // Standard body (16px * 1.5 = 24px)
  "relaxed": 1.75   // Loose spacing (accessibility)
}
```

#### Letter Spacing
- **Base:** `0.025em` (defined globally in CSS)
- **Applied to:** All typographic elements (p, span, label, h1-h6, button, input, etc.)
- **Location:** [styles/themes/cesionbnk.css](styles/themes/cesionbnk.css#L113)

**CSS:**
```css
--letter-spacing-base: 0.025em;
--font-sans: 'Gotham', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## 2. CSS Custom Properties (Theme Variables)

### 📁 **File:** [styles/themes/cesionbnk.css](styles/themes/cesionbnk.css)

All typography-related CSS variables are defined at `:root` level (light mode) and `.dark` class (dark mode).

#### Font Configuration
```css
/* Light Mode */
:root {
  --font-sans: 'Gotham', ui-sans-serif, system-ui, ...;
  --letter-spacing-base: 0.025em;
}

/* Dark Mode */
.dark {
  --font-sans: 'Gotham', ui-sans-serif, system-ui, ...;
  --letter-spacing-base: 0.025em;
}
```

#### Typography Application in Base Layer
See [styles/config.css#L153-L178](styles/config.css#L153-L178):

```css
@layer base {
  h1 { @apply text-2xl font-medium; line-height: 1.5; }
  h2 { @apply text-xl font-medium;  line-height: 1.5; }
  h3 { @apply text-lg font-medium;  line-height: 1.5; }
  h4 { @apply text-base font-medium; line-height: 1.5; }
  label, button { @apply text-base font-medium; line-height: 1.5; }
  input { @apply text-base font-normal; line-height: 1.5; }
}
```

---

## 3. Heading Hierarchy & Styling

### 📐 Standard Heading Scale

| Element | Tailwind Class | Font Size | Font Weight | Used For |
|---------|---|---|---|---|
| `<h1>` | `text-3xl font-bold` | 32px | 700 (bold) | Page titles, main headings |
| `<h2>` | `text-2xl font-bold` | 24px | 700 (bold) | Section headings |
| `<h3>` | `text-xl font-bold` | 20px | 700 (bold) | Subsection headings |
| `<h4>` | `text-lg font-semibold` | 18px | 600 (semibold) | Card titles, small headings |
| `<h5>` | `text-base font-semibold` | 16px | 600 (semibold) | Label text, emphasis |
| `<h6>` | `text-sm font-semibold` | 14px | 600 (semibold) | Small labels, captions |

### 🔍 Actual Usage Patterns in Codebase

#### Heading Level 1
```tsx
// App.tsx - Line 102
<h1 className="font-semibold text-foreground">
  CESIONBNK Design System
</h1>
```
**Issue:** `font-semibold` (600) but should be `font-bold` (700) for h1  
**Size:** Inherits default `text-2xl` from base styles

#### Heading Level 2 (Pattern Examples)
```tsx
// AdvancedFormsPage.tsx - Line 80
<h2 className="font-bold">Step Indicator</h2>

// FactoringPortfolioReport.tsx - Line 187
<h2 className="text-xl font-bold text-foreground flex items-center gap-2">
  <FileText className="h-5 w-5 text-primary" />
  Portfolio Analysis
</h2>
```
**✓ Correct:** `text-xl font-bold` (20px / 700 weight)

#### Heading Level 3 (Pattern Examples)
```tsx
// AdvancedFormsPage.tsx - Line 197
<h3 className="font-semibold">Key Features:</h3>

// Pages - Pattern
<h3 className="font-semibold">Implementation Notes</h3>
```
**✓ Correct:** Uses `font-semibold` (600 weight)  
**Size:** Inherits `text-lg` from base styles (18px assumed)

#### Heading Level 4
```tsx
// BrandLayoutPage.tsx - Line 43
<h4 className="font-medium text-sm mb-4 text-muted-foreground">
  Light Backgrounds
</h4>
```
**✓ Correct:** `text-sm font-medium` (14px / 500 weight)

---

## 4. Body Text & Content Styles

### 📋 Paragraph & Body Text

**Standard patterns:**
```tsx
// Standard paragraph
<p className="text-base text-foreground">
  Body text content...
</p>

// Muted/secondary content
<p className="text-sm text-muted-foreground">
  Secondary description...
</p>

// Small text (captions, metadata)
<p className="text-xs text-muted-foreground">
  Caption or metadata...
</p>
```

### Text Size Classes Used in Components

| Class | Size | Color | Primary Use |
|-------|------|-------|-------------|
| `text-xs` | 12px | `text-muted-foreground` | Badges, captions, metadata |
| `text-sm` | 14px | `text-foreground` or `text-muted-foreground` | Secondary text, descriptions |
| `text-base` | 16px | `text-foreground` | Primary body text |
| `text-lg` | 18px | `text-foreground` | Card titles, emphasized text |
| `text-xl` | 20px | `text-foreground` (usually `font-bold`) | Heading 3 level |
| `text-2xl` | 24px | `text-foreground` | Heading 2 level |
| `text-3xl` | 32px | `text-foreground` | Heading 1 level |

### ⚠️ Custom Font Sizes (Non-standard)

**Issue:** Some components use arbitrary pixel sizes instead of token values:

| Custom Class | Size | Locations | Status |
|---|---|---|---|
| `text-[10px]` | 10px | 25+ files (badges, tables, annotations) | ⚠️ Inconsistent |
| `text-[11px]` | 11px | 10+ files (code, metadata) | ⚠️ Inconsistent |

**Files with custom sizes:**
- [components/patterns/factoring-portfolio-report.tsx](components/patterns/factoring-portfolio-report.tsx#L177) - `text-[10px]`, `text-[11px]`
- [styles/tour.css](styles/tour.css#L29) - Uses `font-size: 0.8125rem` (13px) directly
- [guidelines/TOKENS.md](guidelines/TOKENS.md) - Document references

**Examples:**
```tsx
// FactoringPortfolioReport.tsx - Line 177
<span className="text-[10px] text-primary">↑ ↓</span>

// FactoringPortfolioReport.tsx - Line 379
<TableCell className="font-mono text-[11px] text-primary font-medium">
  {r.folio}
</TableCell>

// App.tsx - Line 120
<code className="font-mono text-[11px] text-primary bg-muted px-1 py-0.5 rounded">
  keyboard shortcut
</code>
```

✅ **Recommendation:** Replace with `text-xs` (12px) when possible

---

## 5. Label & Button Text Styles

### Label Styling

**Standard patterns:**
```tsx
// Component from ui/label.tsx
<label className="text-sm font-medium">
  Field Label
</label>
```

**CSS base application:**
```css
label {
  @apply text-base font-medium;
  line-height: 1.5;
}
```

**Size mapping:**
- Default: `text-base` (16px) + `font-medium` (500)
- Small labels: `text-sm` + `font-medium` (14px / 500)

### Button Text

**From [components/ui/button.tsx](components/ui/button.tsx):**

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ...",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 gap-1.5 px-3",
        lg: "h-10 px-6",
      },
    },
  }
);
```

- **Standard size:** `text-sm font-medium` (14px / 500 weight)
- **All buttons use:** `text-sm` regardless of size variant
- **Weight:** Consistently `font-medium` (500)

### Badge Text Styles

**From [components/ui/badge.tsx](components/ui/badge.tsx#L6):**

```tsx
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        // ... more variants
      },
    },
  }
);
```

- **Size:** Fixed `text-xs font-medium` (12px / 500 weight)
- **All badge variants use same size**

**⚠️ Exception:** Some badges use custom `text-[10px]`:
```tsx
// BADGE_AUDIT_COMPREHENSIVE.md
<Badge className="ml-2 text-[10px] py-0 px-1.5 bg-green-100 text-green-700 border-0">
  Mejor
</Badge>
```

---

## 6. Card & Component Typography

### Card Title & Description

**From [components/ui/card.tsx](components/ui/card.tsx):**

```tsx
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-normal", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}
```

**Used in components:**
```tsx
// FactoringPortfolioReport.tsx - Line 261
<CardTitle className="text-sm font-semibold">
  Desembolsos vs Cobros Mensuales
</CardTitle>

<CardDescription className="text-xs">
  Flujo de capital por mes (COP millones)
</CardDescription>
```

**Default styles:**
- `CardTitle`: Renders as `<h4>` with `leading-normal` (line-height utility)
- `CardDescription`: Renders as `<p>` with `text-muted-foreground` color

### Component-Specific Text Examples

- **Avatar fallback text:** `text-xs` to `text-xl` (size variants)
- **Table headers:** `text-xs font-medium text-muted-foreground`
- **Table cells:** Varies - `text-xs`, `text-sm`, `text-base` depending on content
- **Breadcrumb:** `text-sm`
- **Tooltip:** `text-sm`
- **Alert title:** `font-semibold`

---

## 7. Font Weight Usage Patterns

### Distribution by Weight

| Weight | Value | Usage Count | Primary Uses |
|--------|-------|---|---|
| **400** (regular) | 400 | ~50 | Input text, default body |
| **500** (medium) | 500 | ~100+ | Labels, button text, badges |
| **600** (semibold) | 600 | ~150+ | Card titles, subheadings, emphasis |
| **700** (bold) | 700 | ~80+ | Page headings, h1-h3 |

### Default Font Weight by Element

```css
/* From config.css @layer base */
input { @apply font-normal; }        /* 400 */
label, button { @apply font-medium; } /* 500 */
h1, h2, h3, h4 { @apply font-medium; } /* 500 (base default) */
```

### Component Overrides

```tsx
<h1 className="font-semibold">...</h1>  // 600
<h2 className="font-bold">...</h2>      // 700
<h3 className="font-semibold">...</h3>  // 600
<p className="font-medium">...</p>      // 500
```

---

## 8. Line Height & Spacing Patterns

### Base Line Heights

```json
"lineHeight": {
  "tight": 1.25,     // Compact (heading alt)
  "normal": 1.5,     // Standard (body, default)
  "relaxed": 1.75    // Loose (long-form, accessibility)
}
```

### Global Application

**From config.css:**
```css
h1, h2, h3, h4, label, button, input {
  line-height: 1.5;  /* ~24px for 16px text */
}
```

### Component-Specific Overrides

```tsx
// CardTitle uses explicit override
<h4 className={cn("leading-normal", className)} />
// leading-normal = line-height: 1.5

// Tour popover uses custom
.driver-popover-title { line-height: 1.4; }
.driver-popover-description { line-height: 1.6; }
```

### Tailwind Line Height Classes

| Class | Value | Usage |
|-------|-------|-------|
| `leading-none` | 1 | Not used |
| `leading-tight` | 1.25 | Occasional overrides |
| `leading-normal` | 1.5 | Default (most common) |
| `leading-relaxed` | 1.75 | Accessibility variants |
| `leading-loose` | 2 | Not used |

---

## 9. Letter Spacing

### Global Configuration

**From themes/cesionbnk.css:**
```css
--letter-spacing-base: 0.025em;
```

### Global Application

**From config.css @layer base:**
```css
p, span, label, a, button, input, textarea, select,
h1, h2, h3, h4, h5, h6,
div, td, th, li {
  letter-spacing: var(--letter-spacing-base);
}
```

**Applied to:** All text elements automatically (0.025em = slightly tighter spacing for readability)

### CSS Equivalent
- At 16px: 0.025em ≈ 0.4px
- At 12px: 0.025em ≈ 0.3px

---

## 10. Typography Component Examples

### Example 1: Page Title
**File:** [pages/AdvancedFormsPage.tsx#L63](pages/AdvancedFormsPage.tsx#L63)
```tsx
<h1 className="font-bold">Advanced Forms</h1>
<Badge className="bg-blue-500 hover:bg-blue-600 text-white" variant="outline">
  Updated
</Badge>
<p className="text-muted-foreground">
  Comprehensive overview of form patterns...
</p>
```
- h1: `font-bold` (700 weight, inherits `text-2xl` = 24px from base)
- Badge: Custom color variant with `text-white`
- Description: `text-muted-foreground` color, default `text-base`

### Example 2: Section Heading with Icon
**File:** [components/patterns/factoring-portfolio-report.tsx#L187](components/patterns/factoring-portfolio-report.tsx#L187)
```tsx
<h2 className="text-xl font-bold text-foreground flex items-center gap-2">
  <FileText className="h-5 w-5 text-primary" />
  Portfolio Analysis
</h2>
<p className="text-sm text-muted-foreground mt-0.5">
  Detailed operations analysis by period
</p>
```
- h2: `text-xl font-bold` (20px / 700 weight) - ✓ Correct
- Icon: `h-5 w-5` (20px square)
- Description: `text-sm text-muted-foreground` (14px / secondary color)

### Example 3: Card with Title & Description
**File:** [pages/AdvancedFormsPage.tsx#L100](pages/AdvancedFormsPage.tsx#L100)
```tsx
<CardTitle className="text-lg">
  Horizontal Step Indicator
</CardTitle>
```
- Renders as: `<h4 className="leading-normal text-lg" />`
- Size: `text-lg` (18px)
- Weight: Default from CardTitle component

### Example 4: Table Headers
**File:** [pages/BulkActionToolbarPage.tsx#L39](pages/BulkActionToolbarPage.tsx#L39)
```tsx
<th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">
  Folio
</th>
```
- Size: `text-xs` (12px)
- Weight: `font-medium` (500)
- Color: `text-muted-foreground`

### Example 5: Driver.js Tour Styles
**File:** [styles/tour.css#L26-L69](styles/tour.css#L26-L69)
```css
.driver-popover-title {
  color: var(--foreground);
  font-weight: 600;
  font-size: 0.875rem;      /* 14px */
  line-height: 1.4;
}

.driver-popover-description {
  color: var(--muted-foreground);
  font-size: 0.8125rem;     /* 13px - custom! */
  line-height: 1.6;
}

.driver-popover-progress-text {
  font-size: 0.75rem;       /* 12px */
}
```

---

## 11. Inconsistencies & Issues Found

### 🔴 Critical Issues

**None identified.** The typography system is fundamentally sound.

### 🟡 Moderate Issues

#### 1. **Custom Font Sizes (text-[10px], text-[11px])**
- **Locations:** 25+ instances across components
- **Impact:** Breaks token consistency
- **Examples:**
  - [factoring-portfolio-report.tsx#L177](components/patterns/factoring-portfolio-report.tsx#L177)
  - [App.tsx#L120](App.tsx#L120)
  - [BADGE_AUDIT_COMPREHENSIVE.md](BADGE_AUDIT_COMPREHENSIVE.md) - Multiple badge examples
- **Fix:** Replace with `text-xs` (12px token)

#### 2. **Heading Weight Inconsistency (h1)**
- **Location:** [App.tsx#L102](App.tsx#L102)
- **Issue:** Uses `font-semibold` (600) when `h1` should be `font-bold` (700)
- **Fix:** Change to `font-bold`

#### 3. **Tour CSS Uses Non-token Font Sizes**
- **File:** [styles/tour.css#L28-L47](styles/tour.css#L28-L47)
- **Issues:**
  - `font-size: 0.875rem` (14px - should be `text-sm`)
  - `font-size: 0.8125rem` (13px - no token, use `text-xs` at 12px)
  - `font-size: 0.75rem` (12px - matches `text-xs`)
- **Fix:** Use Tailwind classes instead of direct font-size values

#### 4. **Incomplete H5 & H6 Styles**
- **Issue:** Base CSS only defines h1-h4, h5-h6 fall to defaults
- **File:** [styles/config.css#L153-L178](styles/config.css#L153-L178)
- **Fix:** Add explicit styles for h5 & h6

### 🟢 Minor Issues (Improvements)

1. **CardTitle missing explicit size** - Currently uses no size class, relies on base styles
2. **Some components mix text-sm with text-base inconsistently** (e.g., table cells)
3. **Letter spacing globally applied** - Works but no atomic class available for override

---

## 12. Hierarchy Completeness

### ✓ Covered
- [x] h1 → h4 have defined base styles
- [x] Label, button, input have defined base styles
- [x] Text color variables complete (foreground, muted-foreground, etc.)
- [x] Font sizes (xs to 3xl) well-distributed
- [x] Font weights (400, 500, 600, 700) complete

### ⚠️ Needs Definition
- [ ] h5 & h6 base styles (currently missing)
- [ ] Explicit `leading-tight`, `leading-relaxed` utility classes for components
- [ ] Code/pre block typography (currently only in tour.css)

---

## 13. Files Summary

### 📋 Key Typography Files

| File | Purpose | Status |
|------|---------|--------|
| [tokens/cesionbnk.tokens.json](tokens/cesionbnk.tokens.json) | Token definitions | ✓ Complete |
| [styles/config.css](styles/config.css) | Tailwind bridge & base styles | ✓ Complete (h1-h4) |
| [styles/themes/cesionbnk.css](styles/themes/cesionbnk.css) | CSS custom properties | ✓ Complete |
| [styles/tour.css](styles/tour.css) | Driver.js tour styles | ⚠️ Non-token sizes |
| [components/ui/button.tsx](components/ui/button.tsx) | Button component | ✓ Correct |
| [components/ui/badge.tsx](components/ui/badge.tsx) | Badge component | ⚠️ Custom overrides exist |
| [components/ui/card.tsx](components/ui/card.tsx) | Card title/description | ✓ Correct |
| [pages/BrandLayoutPage.tsx](pages/BrandLayoutPage.tsx) | Typography showcase | ✓ Comprehensive |

---

## 14. Usage Examples by Context

### Page/Section Headings
```tsx
<h1 className="font-bold">Page Title</h1>
// Renders: 24px, 700 weight
```

### Card Headers  
```tsx
<CardTitle className="text-sm font-semibold">Card Title</CardTitle>
// Renders: 14px, 600 weight
```

### Data Tables
```tsx
<th className="text-xs font-medium">Column Header</th>
<td className="text-sm">Cell content</td>
// Headers: 12px, 500 weight
// Cells: 14px, default weight
```

### Badges & Labels
```tsx
<Badge className="text-xs font-medium">Badge</Badge>
// Renders: 12px, 500 weight
```

### Body Text
```tsx
<p className="text-base">Body paragraph</p>
<p className="text-sm text-muted-foreground">Description</p>
// Primary: 16px, default weight
// Secondary: 14px, gray color
```

### Code & Monospace
```tsx
<code className="font-mono text-[11px]">code</code>
// Currently: 11px (non-token)
// Should be: text-xs font-mono
```

---

## 15. Recommendations

### Priority 1: Standardization
- [ ] Replace all `text-[10px]` with `text-xs`
- [ ] Replace all `text-[11px]` with `text-xs` or add `text-2xs` token at 11px if needed
- [ ] Update [styles/tour.css](styles/tour.css) to use Tailwind classes instead of direct CSS

### Priority 2: Completeness
- [ ] Add h5 & h6 base styles to [styles/config.css](styles/config.css)
- [ ] Add explicit `text-[13px]` token if needed (currently missing between xs=12px and sm=14px)
- [ ] Document monospace typography (code blocks, pre)

### Priority 3: Enhancement
- [ ] Create typography utility class for code blocks
- [ ] Add `prose` class for long-form content
- [ ] Consider adding `text-truncate` or `line-clamp-*` utilities

### Testing Checklist
- [ ] Verify heading hierarchy renders correctly across all pages
- [ ] Test light/dark mode text contrast (WCAG AA minimum)
- [ ] Validate responsive typography scales
- [ ] Audit all custom `text-[*px]` classes for replacement

---

## Appendix: Quick Reference

### Tailwind Typography Classes
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

font-normal (400)
font-medium (500)
font-semibold (600)
font-bold (700)

leading-normal (1.5)
leading-tight (1.25)
leading-relaxed (1.75)

text-foreground          /* Primary text */
text-muted-foreground    /* Secondary text */
text-card-foreground     /* Card text */
```

### CSS Variables
```css
--font-sans: 'Gotham', system-ui, ...
--letter-spacing-base: 0.025em
```

### Valid Font Families
- **Recommended:** Gotham (via @import in globals.css)
- **Fallback:** Inter, system fonts
- **Monospace:** JetBrains Mono, Fira Code

---

**Last Updated:** April 8, 2026  
**Audit Version:** 1.0  
**Next Review:** When new components added
