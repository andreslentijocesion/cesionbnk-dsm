# FIGMA LIBRARY ROADMAP — De Figma Make a Figma Design Library

> **Status**: En ejecucion — Fase 1-3 completadas (Theme Picker removido, DSM Refactor v6.1.0 activo)
> **Created**: 2026-02-19
> **Updated**: 2026-03-05
> **Contexto**: Guia para transcribir el DSM code-first (Figma Make) a una Figma Design Library conectada.
> **Tenant**: CESIONBNK (unico) — Primary `#374151` (Gray), Secondary `#796eff` (Purple), Font Gotham.

---

## RESUMEN

El DSM de CESIONBNK ya esta validado visualmente en Figma Make. El objetivo es **transcribir fielmente** (no redisenar) cada token, estilo y componente a Figma Design para tener una libreria publicable como Team Library.

---

## FASE 1 — Variables de Figma (Tokens) | ~2-3 horas | **COMPLETADA**

Base de toda la libreria. Sin esto, nada escala.

### Herramienta: Theme Picker Plugin v1.2.0 *(REMOVED)*

> **Nota:** El Theme Picker fue eliminado del proyecto. Las fases 1-3 documentadas aqui fueron completadas con ese plugin antes de su eliminacion. Para recrear Variables/Styles, usar los valores de `/styles/themes/cesionbnk.css` directamente en Figma.

### 3 Colecciones de Variables

| Coleccion | Contenido | Modos | Fuente en codigo |
|---|---|---|---|
| **1. Primitives** | Brand, Charts, KPI, Tailwind Palette (hex) | Value | `cesionbnk.css` + `code.js` primData |
| **2. Semantic** | 39 variables semanticas referenciando light/dark | Light / Dark | `:root` y `.dark` en `cesionbnk.css` |
| **3. Component** | Radius, Spacing, Opacity, BorderWidth, Sizes | Value | `TOKENS.md` secciones 3-4 |

### Mapeo directo CSS / Figma Variables

```
cesionbnk.css                  ->  Figma Variable
-----------------------------------------------------
--primary: #374151               Primitives/Brand/Primary
--secondary: #796eff           ->  Primitives/Brand/Secondary
--background: #ffffff  (:root) ->  Semantic/Surface/Background (Light)
--background: #0f172a  (.dark) ->  Semantic/Surface/Background (Dark)
--destructive: #ef4444         ->  Semantic/Feedback/Destructive (Light)
--destructive: #991b1b         ->  Semantic/Feedback/Destructive (Dark)
--radius: 0.625rem             ->  Component/Radius/lg = 10
--radius-sm: calc(-4px)        ->  Component/Radius/sm = 6
```

### Regla clave

Las variables semanticas en Figma deben **referenciar** las primitives, no ser valores directos. Asi cuando se cambie un primitivo, se propaga automaticamente.

---

## FASE 2 — Estilos de Texto | ~1 hora | **COMPLETADA (via Theme Picker)**

Fuente: `TOKENS.md` seccion 2.6 — Jerarquia Tipografica Completa.

| Style Name | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `Display` | Gotham | 48px | Bold (700) | 150% | 0.025em |
| `H1 / Page Title` | Gotham | 30px | Semibold (600) | 150% | 0.025em |
| `H2 / Section Title` | Gotham | 24px | Semibold (600) | 150% | 0.025em |
| `H3 / Subsection` | Gotham | 20px | Medium (500) | 150% | 0.025em |
| `H4 / Card Title` | Gotham | 18px | Medium (500) | 150% | 0.025em |
| `Body / Default` | Gotham | 16px | Regular (400) | 150% | 0.025em |
| `Body Small` | Gotham | 14px | Regular (400) | 150% | 0.025em |
| `Caption` | Gotham | 12px | Regular (400) | 150% | 0.025em |
| `Label` | Gotham | 14px | Medium (500) | 150% | 0.025em |
| `Button` | Gotham | 16px | Medium (500) | 150% | 0.025em |
| `KPI Value` | Gotham | 36px | Bold (700) | 125% | 0.025em |

> **Importante:** Gotham es una tipografia comercial (Hoefler & Co.). Instalar localmente via Adobe Fonts o con archivos `.woff2` licenciados para que aparezca en Figma. El fallback es Inter.

---

## FASE 3 — Estilos de Efecto (Shadows) | ~30 min | **COMPLETADA (via Theme Picker)**

Fuente: `globals.css` + `TOKENS.md` seccion 5.

| Effect Style | Valor | Uso |
|---|---|---|
| `Elevation/1` | `0 1px 2px rgba(34,34,34,0.05)` | Buttons, inputs |
| `Elevation/2` | `0 4px 6px -1px rgba(34,34,34,0.1), 0 2px 4px -2px rgba(34,34,34,0.1)` | Cards, tablas |
| `Elevation/3` | `0 10px 15px -3px rgba(34,34,34,0.1), 0 4px 6px -4px rgba(34,34,34,0.1)` | Hover, dropdowns |
| `Elevation/4` | `0 20px 25px -5px rgba(34,34,34,0.1), 0 8px 10px -6px rgba(34,34,34,0.1)` | Modals, sidebars |

> Shadow base color: `#222222` (Charcoal) for Light mode, `#000000` for Dark mode.

---

## FASE 4 — Componentes Figma (Bottom-Up) | ~2-4 dias

Seguir el orden de dependencias del Atomic Design. No empezar por paginas — empezar por atomos.

### Ola 1 — Atomos base (los que mas se reusan)

```
Button, Input, Label, Badge, Checkbox, Radio, Switch, Toggle,
Avatar, Skeleton, Progress, Tooltip
```

### Ola 2 — Moleculas compuestas

```
Card, Alert, Dialog, Sheet, Dropdown, Select, Tabs,
Breadcrumb, Pagination, Calendar, Popover, Slider, Accordion,
AlertDialog, InputOTP, InputFile
```

### Ola 3 — Organismos (advanced/ + extended)

```
DataTable, StepIndicator, MultiStepWizard, StatCard,
FilterChip, SearchBar, TimelineItem, HelpButton,
NotificationCenter
```

> Estos 9 componentes extended son los unicos activos en el plugin Figma (v27).

### Ola 4 — Patterns de negocio

```
AppLayout, KPIShowcase, EditableTable
```

---

## FASE 5 — Triple Alignment (NAMING_CONVENTION.md)

Aplicar al pie de la letra el naming ya definido:

```
Codigo                              ->  Figma Component Name
------------------------------------------------------------
components/ui/button.tsx            ->  UI / Button
components/ui/card.tsx              ->  UI / Card
components/widgets/stat-card.tsx    ->  Widgets / StatCard
components/advanced/data-table.tsx  ->  Advanced / DataTable
components/patterns/app-layout.tsx  ->  Patterns / AppLayout
```

### Estructura de Pages en Figma

| Figma Page | Directorio | Componentes activos |
|---|---|---|
| `UI /` | `components/ui/` | 41 base |
| `Advanced /` | `components/advanced/` | 5 active |
| `Patterns /` | `components/patterns/` | 2 active |
| `Widgets /` | `components/widgets/` | 4 active |
| `Help /` | `components/help/` | 1 active |
| **Total active in Figma** | | **51 types + 68 icons** |

---

## FASE 6 — Propiedades de Componente en Figma

Mapear los props de React a Component Properties de Figma:

| React Prop | Figma Property Type | Ejemplo |
|---|---|---|
| `variant="default\|destructive\|outline"` | **Variant** | Button variants |
| `size="sm\|md\|lg"` | **Variant** | Button sizes |
| `disabled={boolean}` | **Boolean** | Toggle estado disabled |
| `icon={<Icon />}` | **Instance Swap** | Slot de icono |
| `children="text"` | **Text** | Contenido editable |
| `badge={<Badge />}` | **Instance Swap** | Slot de badge |

### Ejemplo: Button (v6.0.0 — 60 variants)

```
Figma Component: UI / Button
  Properties:
    - Variant: Default, Secondary, Outline, Ghost, Destructive
    - Size: default, sm, lg, icon
    - State: Default, Hover, Disabled
    - Show left icon: Boolean (true/false)
    - Show right icon: Boolean (true/false)
    - iconLeft: Instance Swap (Lucide icons)
    - iconRight: Instance Swap (Lucide icons)
    - Label: Text ("Button")
```

---

## RECOMENDACIONES PRACTICAS

### 1. No redisenar — transcribir

El DSM ya esta validado visualmente en Make. Abrir el preview de Make al lado de Figma y transcribir pixel por pixel. No es momento de "mejorar" — es momento de replicar fielmente.

### 2. Auto Layout = Flexbox

Cada componente en Figma debe usar Auto Layout que mapee directamente a Flexbox/Grid de Tailwind:

| Tailwind | Figma Auto Layout |
|---|---|
| `gap-2` | Spacing: 8 |
| `gap-4` | Spacing: 16 |
| `p-6` | Padding: 24 (all sides) |
| `px-4 py-2` | Padding: H=16, V=8 |

### 3. Variables > Styles para colores

En Figma moderno, usar **Variables** (no Color Styles) para colores. Las Variables soportan modos (Light/Dark), los Styles no. Reservar Styles solo para Text y Effects.

### 4. No incluir componentes eliminados

`component-map.json` marca 48 componentes como removed. Solo transcribir los 51 activos (ver $coverage).

### 5. Publicar como Figma Library

Una vez terminada la Ola 1-2, publicar el archivo como **Team Library** en Figma. Asi cualquier archivo de diseno de CESIONBNK puede consumir los componentes y recibir actualizaciones.

### 6. Code Connect (Figma Dev Mode)

Si el equipo tiene plan Enterprise/Organization, [Code Connect](https://www.figma.com/dev-mode/) permite **vincular** cada componente de Figma con su archivo `.tsx`. Cuando un dev selecciona un componente en Figma, ve directamente:

```tsx
import { Button } from "@/components/ui/button";
<Button variant="default" size="lg">Click me</Button>
```

Esto cierra el loop Design / Code completamente.

---

## ORDEN DE PRIORIDAD

| Prioridad | Que hacer | Impacto |
|---|---|---|
| **P0** | Variables (3 colecciones) via Theme Picker Plugin | Todo depende de esto |
| **P0** | Text Styles (11 estilos Gotham) | Base tipografica |
| **P0** | Effect Styles (4 elevations) | Consistencia visual |
| **P1** | Ola 1 componentes (Button, Input, Card, Badge...) | 80% de la UI usa estos |
| **P2** | Ola 2-3 componentes | Completar catalogo |
| **P3** | Ola 4 + Patterns de negocio | Screens completos |
| **P3** | Code Connect | Developer experience |

---

## PLUGIN SYSTEM

| Plugin | Version | Estado | Funcion |
|---|---|---|---|
| **DSM Refactor** | v6.1.0 | Activo | Genera componentes + Icon Library (standalone, hardcoded hex) |
| **Theme Picker** | — | Eliminado | Fue `/plugin/theme/` |
| **Tokens (legacy)** | v3 | Referencia | Files en `/plugin/cesionbnk-tokens/` |
| **Icon Picker** | — | Eliminado | Usuarios importan Lucide library manualmente en Figma |
| **Components** | v27 | Superado | Reemplazado por DSM Refactor v6.1.0 |

> Documentacion completa: `/plugin/QUICKSTART.md`, `/plugin/README.md`

---

## PRE-REQUISITO

> **Completado v1.0.0**: Limpieza single-tenant ejecutada. Factoring eliminado. Multi-tenant removido (solo CESIONBNK + Light/Dark). Transparencias corregidas en componentes base.

---

*Version: 2.0.0*
*Creado: Febrero 19, 2026*
*Actualizado: Marzo 5, 2026*
*Licencia: Privada - CESIONBNK*
