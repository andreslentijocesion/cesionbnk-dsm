# SYSTEM GUIDELINES INDEX

Este archivo es el índice maestro del sistema de diseño y arquitectura de Figma Make.
Para facilitar la lectura por IAs y humanos, la documentación se ha dividido en módulos especializados.

> **v1.0.0 (post-cleanup)**: Factoring app eliminada. Multi-tenant removido (solo CESIONBNK + Light/Dark). TenantSelector eliminado.

## MÓDULOS DE DOCUMENTACIÓN

### 1. [TOKENS.md](./TOKENS.md)
**Diseño Visual**. Definiciones de estilos, colores, tipografía y accesibilidad.
- Colores: CESIONBNK (Gray primary, Purple secondary).
- Tipografía: Gotham.
- Modo Claro / Oscuro.

### 2. [COMPONENTS.md](./COMPONENTS.md)
**Catálogo**. Lista completa de componentes disponibles para evitar duplicidad.
- Shadcn/ui oficial.
- Patterns y Atomic Design.
- Componentes avanzados.

### 3. [PROMPT_GUIDE.md](./PROMPT_GUIDE.md)
**Automatización**. Guía para generar código nuevo usando IA.
- Plantillas de prompts.
- Checklists de validación.

### 4. [NAMING_CONVENTION.md](./NAMING_CONVENTION.md)
**Naming Convention — Triple Alignment**. Convención unificada para nombres de archivos, exports React y componentes Figma.
- Regla maestra: kebab-case (archivos) ↔ PascalCase (exports) ↔ Layer/Name (Figma).

### 5. [FIGMA_LIBRARY_ROADMAP.md](./FIGMA_LIBRARY_ROADMAP.md)
**Figma Design Library**. Guía para transcribir el DSM code-first a una Figma Design Library conectada.
- Fase 1: Variables de Figma (tokens primitivos y semánticos).
- Fase 2–4: Tipografía, componentes y estilos de efecto.
- Fase 5: Triple Alignment entre código, Figma y nomenclatura.

---

## SISTEMA DE TEMAS

El proyecto utiliza un **único tenant (CESIONBNK)** con modo claro y oscuro.

### Tenant

| ID | Name | Primary | Secondary | Font |
|---|---|---|---|---|
| `default` | CESIONBNK | `#374151` (Gray) | `#796eff` (Purple) | Gotham |

- **Border Radius**: 10px (0.625rem)
- **Modos**: Light / Dark

### Arquitectura de Tokens — Single Source of Truth

- **Entry point**: `/styles/globals.css` importa todo en orden correcto
- **Tokens**: `/styles/themes/cesionbnk.css` (light en `:root`, dark en `.dark`)
- **Config compartida**: `/styles/config.css` (Tailwind v4 `@theme inline` mapping)
- **Fonts**: Gotham, declarado directamente en `globals.css` (CDN import al inicio del archivo)
- **Provider**: `ThemeProvider.tsx` gestiona toggle light/dark

> **Nota**: No existe `LanguageProvider` ni sistema de traducciones. Todos los textos están hardcodeados directamente en los componentes.

---

## LANGUAGE RULES

| Scope | Language | Description |
|---|---|---|
| **DSM Components** (`ui/`, `patterns/`, `advanced/`, `widgets/`, `providers/`) | English | All UI labels, placeholders, status labels, tooltips, alert messages |
| **DSM Showcase** (`pages/`) | English | All page titles, descriptions, examples |
| **Locale formatting** | `en-US` | `date-fns` locale, `toLocaleString()`, `Intl.NumberFormat` |

---

## INFRAESTRUCTURA

Este proyecto utiliza **exclusivamente**:

| Plataforma | Uso |
|---|---|
| **Figma Make** | Desarrollo, prototipado y deploy |
| **Vite** | Dev server y build |

**Eliminado en v0.3.0:**
- NPM publishing (no hay `vite.config.lib.ts`, `index.ts` barrel, ni `publish.yml`)
- Testing (no hay `vitest.config.ts`, ni directorio `/tests/`)
- CI/CD pipelines (no hay `validate.yml` ni `publish.yml`)
- Storybook / Chromatic

**No se permite** integración con: Storybook, Chromatic, Vercel, Netlify, Firebase, AWS, Docker, Heroku, CircleCI, Travis, Jenkins, Sentry, Datadog, GitHub Actions, ni ningún otro servicio externo.

---

## DIRECTORY STRUCTURE — FLAT ROOT (NO `src/`)

> **Decision**: The project uses a **flat root structure** — all source files live at the project root, NOT inside a `src/` directory.

### Configuration Files

| File | Key Setting | Value |
|---|---|---|
| `index.html` | `<script src>` | `/main.tsx` |
| `vite.config.ts` | `alias @` | `path.resolve(__dirname, "./")` |
| `tsconfig.json` | `paths @/*` | `["./*"]` |
| `postcss.config.cjs` | (implicit) | Resolves from root |

### Rules

1. **Never create a `src/` directory** in the project.
2. **Never modify alias/paths** to point to `./src/*`.
3. `npm run dev` must work immediately without moving files.

### Root Layout

```
/                          ← Repository root = source root
├── App.tsx                ← DSM Showcase entry
├── main.tsx               ← Vite entry
├── index.html             ← Vite HTML entry
├── components/            ← All components (ui/, patterns/, advanced/, widgets/, providers/)
├── pages/                 ← DSM Showcase pages
├── hooks/                 ← Custom hooks
├── lib/                   ← Utilities
├── styles/                ← CSS (globals.css, tour.css) — Single Source of Truth
├── guidelines/            ← Project documentation
├── imports/               ← Figma imported assets (SVGs)
├── vite.config.ts         ← Dev server config
├── tsconfig.json          ← TypeScript config
├── package.json           ← Package manifest
└── postcss.config.cjs     ← PostCSS config
```

---

## SHOWCASE PAGES

El proyecto cuenta con showcase pages activas del DSM y se debe respetar la arquitectura documentada aquí.

 Some of the base components you are using may have styling(eg. gap/typography) baked in as defaults.
So make sure you explicitly set any styling information from the guidelines in the generated react to override the defaults.

---

## FIGMA PLUGIN SYSTEM

El proyecto tiene plugins de Figma para generar componentes en la Design Library:

### 1. **Componentes CESIONBNK Plugin** (`/plugin/cesionbnk-componentes/code.js`)
- **Version:** v6.1.0
- **Modo:** STANDALONE (100% autonomo)
- **Output:** 10 paginas (Cover, Foundation, Primitives, Components, Patterns, Icons, Templates, Documentacion, Advanced, Archive)
- **Button icons:** Instance Swap dropdowns + Boolean switches. Left icon visible, right hidden by default. Icon color = text color. Compatible con Lucide importado.

### Removed / Legacy
- **Theme Picker Plugin** — Removed (was at `/plugin/theme/`)
- **Tokens Plugin** (`/plugin/cesionbnk-tokens/`) — v3, legacy reference only
- **Icon Picker Plugin** — Removed (users import Lucide library manually)
- **Components Plugin** — Superseded by DSM Refactor v6.1.0

### Documentation
- **Quick Start:** `/plugin/QUICKSTART.md`
- **Technical Guide:** `/plugin/README.md`
- **Componentes CESIONBNK:** `/plugin/cesionbnk-componentes/README.md`
- **Component Map:** `/plugin/component-map.json` (v4.4.0)