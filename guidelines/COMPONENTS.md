# COMPONENTS INVENTORY

Este documento es la fuente de verdad sobre el catálogo de componentes disponibles en el sistema.

> **v1.0.0 (post-cleanup)**: Factoring app eliminada por completo. Multi-tenant removido (solo CESIONBNK). Secciones 3.1 y 5.x eliminadas. TenantSelector eliminado.

## 1. UI PRIMITIVES (`/components/ui`)
Componentes base construidos sobre Radix UI y Tailwind CSS. Siguen los principios de Shadcn UI.
**Estado**: Estable y Documentado.

| Componente | Descripción | Figma Plugin |
|---|---|---|
| `Accordion` | Lista de elementos colapsables. | ✅ covered |
| `Alert` | Mensajes de feedback visual (Success, Error, Warning). | ✅ covered |
| `AlertDialog` | Modal que requiere acción del usuario. | ✅ covered |
| `AspectRatio` | Contenedor que mantiene una relación de aspecto. | ❌ removed v24 |
| `Avatar` | Imagen de perfil con fallback. | ✅ covered |
| `Badge` | Etiqueta pequeña para estados o categorías. | ✅ covered |
| `BottomSheet` | Panel deslizable desde abajo (Mobile). | ❌ removed v24 |
| `Breadcrumb` | Navegación jerárquica. | ✅ covered |
| `Button` | Elemento interactivo principal. | ✅ covered |
| `Calendar` | Selector de fechas visual. | ✅ covered |
| `Card` | Contenedor base con header, content y footer. | ✅ covered |
| `Carousel` | Carrusel de contenido interactivo. Soporta orientación horizontal/vertical, loop, multi-item y control programático via `setApi`. | ❌ removed v6 |
| `Chart` | Gráficos basados en Recharts. | ❌ removed v24 |
| `Checkbox` | Selección binaria. | ✅ covered |
| `Collapsible` | Contenido expandible simple. Más ligero que Accordion; ideal para un único toggle independiente. | ❌ removed v24 |
| `Command` | Menú de comandos tipo Spotlight. | ✅ covered |
| `ContextMenu` | Menú contextual (click derecho). | ❌ removed v24 |
| `DateRangePicker` | Selector de rango de fechas (UI Standard). | ✅ covered |
| `Dialog` | Modal estándar. | ✅ covered |
| `Drawer` | Panel lateral o inferior. | ❌ removed v24 |
| `DropdownMenu` | Menú desplegable. | ✅ covered |
| `EmptyState` | Placeholder para contenido vacío. | ✅ covered |
| `ErrorBoundary` | Captura de errores en runtime. | ❌ removed v24 |
| `FloatingActionButton` | Botón flotante para acciones principales. | ❌ removed v24 |
| `Form` | Wrappers para React Hook Form. | ❌ removed v24 |
| `HoverCard` | Preview de contenido al hacer hover. | ❌ removed v24 |
| `Input` | Campo de texto básico. | ✅ covered |
| `InputFile` | Selector de archivos. | ✅ covered |
| `InputOTP` | Campo para códigos de un solo uso. | ✅ covered |
| `Label` | Etiqueta accesible para inputs. | ✅ covered |
| `LoadingOverlay` | Overlay de carga global. | ❌ removed v24 |
| `LoadingStates` | Variantes de estados de carga. | ✅ covered (restored v24) |
| `Menubar` | Barra de menú horizontal para apps de escritorio. Soporta submenús anidados, shortcuts, checkboxes, radio items y variante destructive. | ❌ removed v24 |
| `MultiSelect` | Selector múltiple con tags (UI Standard). | ✅ covered |
| `NavigationMenu` | Menú de navegación principal. | ❌ removed v24 |
| `Pagination` | Navegación entre páginas de datos. | ✅ covered |
| `Popover` | Contenido flotante activado por click. | ✅ covered |
| `Progress` | Barra de progreso lineal. | ✅ covered |
| `ProgressWithRange` | Barra de progreso con etiquetas de rango inicio → fin (fechas, vigencias). | ❌ removed v24 |
| `RadioGroup` | Selección única entre opciones. | ✅ covered |
| `Resizable` | Paneles redimensionables lado a lado. Exporta `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Basado en `react-resizable-panels`. Archivo: `resizable.tsx`. | ❌ removed v20 |
| `ScrollArea` | Contenedor con scroll personalizado. | ❌ removed v24 |
| `Select` | Dropdown nativo estilizado. | ✅ covered |
| `Separator` | Divisor visual. | ✅ covered (restored v24) |
| `Sheet` | Panel lateral deslizante. | ✅ covered |
| `Sidebar` | Layout de navegación lateral. | ✅ covered |
| `Skeleton` | Placeholders de carga animados. | ✅ covered (restored v24) |
| `Slider` | Selector de rango numérico. | ✅ covered |
| `Sonner` | Sistema de notificaciones (Toasts). | ✅ covered |
| `SplitButton` | Botón con acción principal y menú desplegable (`label`, `actions`, `onMainAction`). | ❌ removed v24 |
| `Switch` | Toggle on/off. | ✅ covered |
| `Table` | Tablas básicas estilizadas. | ✅ covered |
| `Tabs` | Navegación por pestañas. | ✅ covered |
| `Textarea` | Campo de texto multilínea. | ✅ covered |
| `TextareaAutoresize` | Textarea que crece con el contenido. | ✅ covered |
| `Toggle` | Botón de estado binario. | ✅ covered |
| `ToggleGroup` | Grupo de botones toggle. | ✅ covered |
| `Tooltip` | Ayuda visual al hacer hover. | ✅ covered |

## 2. ADVANCED COMPONENTS (`/components/advanced`)
Componentes complejos de lógica específica o visualización avanzada.

| Componente | Descripción | Figma Plugin |
|---|---|---|
| `ChartShowcase` | Galería de gráficos de ejemplo. | — |
| `Combobox` | Select con búsqueda (Autocomplete). | ✅ covered |
| `ConditionalForm` | Formularios con lógica condicional. | — |
| `DataTable` | Tabla avanzada con filtros, ordenamiento y paginación (TanStack Table). | ✅ covered |
| `FileUploader` | Zona de carga de archivos drag & drop. | ❌ removed v24 |
| `FormBuilder` | Constructor visual de formularios. | — |
| `FunnelChart` | Gráfico de embudo. | ❌ removed v24 |
| `GaugeChart` | Gráfico de medidor/velocímetro. | ❌ removed v24 |
| `Heatmap` | Mapa de calor. | ❌ removed v24 |
| `InfiniteScroll` | Lista con carga infinita. | — |
| `MasterDataGrid` | Grid de datos maestro con edición masiva. | — |
| `MultiColumnForm` | Layout de formulario en múltiples columnas. | — |
| `RichTextEditor` | Editor de texto enriquecido (WYSIWYG). | ❌ removed v24 |
| `Sparkline` | Mini gráficos de línea. | ❌ removed v24 |
| `StepIndicator` | Indicador de pasos para wizards. | ✅ covered |
| `TreeTable` | Tabla jerárquica (3 niveles). Archivo: `tree-table.tsx`. | ❌ removed v24 |
| `TreemapChart` | Gráfico de mapa de árbol. | ❌ removed v24 |
| `VirtualizedList` | Lista de alto rendimiento para miles de items. | — |

## 3. BUSINESS PATTERNS (`/components/patterns`)
Soluciones completas para flujos de negocio comunes.

| Componente | Archivo | Descripción | Figma Plugin |
|---|---|---|---|
| `AdvancedFilterPanel` | `advanced-filter-panel.tsx` | Panel lateral de filtros complejos. | ❌ removed v24 |
| `AppLayout` | `app-layout.tsx` | Layout de aplicación con sidebar colapsable, header sticky y footer. | ❌ removed v20 |
| `DataTableAdvanced` | `data-table-advanced.tsx` | Implementación específica de DataTable. | excluded |
| `EditableTable` | `editable-table.tsx` | Tabla con edición en línea (Excel-like). | ❌ removed v24 |
| `KPIShowcase` | `kpi-showcase.tsx` | Grid de tarjetas de indicadores clave. | excluded |
| `KPIShowcaseExtended` | `kpi-showcase-extended.tsx` | Grid de KPIs extendido con variantes avanzadas. | excluded |
| `MultiStepWizard` | `multi-step-wizard.tsx` | Asistente paso a paso genérico. | ✅ covered |
| `NotificationCenter` | `notification-center.tsx` | Centro de notificaciones desplegable. | ✅ covered |
| ~~`ReportsConsultation`~~ | ~~`reports-consultation.tsx`~~ | *(Eliminado — solo consumido por factoring)* |
| `StatsDashboard` | `stats-dashboard.tsx` | Dashboard de estadísticas generales. | ❌ removed v24 |

## 4. WIDGETS (`/components/widgets`)
Piezas de UI especializadas, a menudo compuestas de primitivos.

| Componente | Archivo | Descripción | Figma Plugin |
|---|---|---|---|
| `ActionButton` | `action-button.tsx` | Botón con estados de carga/éxito integrados. | ❌ removed v24 |
| `ApprovalTimelineItem` | `approval-timeline-item.tsx` | Item de timeline para flujos de aprobación. | — |
| `ColorSwatch` | `color-swatch.tsx` | Muestra individual de color con label y valor hex. | excluded |
| `ContactForm` | `contact-form.tsx` | Formulario de contacto completo con validación. | — |
| `FilterBar` | `filter-bar.tsx` | Barra horizontal de filtros simples. | ❌ removed v24 |
| `FilterChip` | `filter-chip.tsx` | Chip individual de filtro. | ✅ covered |
| `GridSystemPreview` | `grid-system-preview.tsx` | Visualizador de grid layout. | excluded |
| `NavigationBar` | `navigation-bar.tsx` | Barra de navegación secundaria. | ❌ removed v24 |
| `SearchBar` | `search-bar.tsx` | Barra de búsqueda expandible. | ✅ covered |
| `SimpleFormField` | `simple-form-field.tsx` | Wrapper de campo de formulario (Legacy). | ❌ removed v24 |
| `SpacingPreview` | `spacing-preview.tsx` | Visualizador de tokens de espaciado. | excluded |
| `StatCard` | `stat-card.tsx` | Tarjeta simple de estadística. | ✅ covered |
| `StatsGrid` | `stats-grid.tsx` | Grid de StatCards. | ❌ removed v24 |
| `StatusKPICard` | `status-kpi-card.tsx` | KPI interactivo con variantes de color y estados visuales. | ❌ removed v24 |

## 4.1 HELP COMPONENTS (`/components/help`)
Componentes de ayuda contextual y onboarding.

| Componente | Archivo | Descripción | Figma Plugin |
|---|---|---|---|
| `ContextualHelp` | `ContextualHelp.tsx` | Tooltip/popover de ayuda contextual con contenido dinámico. | ❌ removed v24 |
| `HelpButton` | `HelpButton.tsx` | Botón flotante de ayuda (?) que abre el HelpCenter. | ✅ covered |
| `HelpCenter` | `HelpCenter.tsx` | Panel lateral de ayuda con búsqueda, FAQs y contacto. | ❌ removed v24 |
| `HelpProvider` | `HelpProvider.tsx` | Provider de contexto para el sistema de ayuda. | — |
| `ProductTour` | `ProductTour.tsx` | Tour guiado interactivo con pasos y highlights. | ❌ removed v24 |
| *(data)* | `tourSteps.ts` | Definición de pasos del tour con selectores y contenido. | — |

---

## Mantenimiento
- Para agregar un componente nuevo, ubícalo en la carpeta correspondiente según su complejidad.
- Actualiza este archivo al crear nuevos componentes.
- Evita la duplicidad: revisa si existe un componente similar en `/ui` antes de crear uno en `/widgets`.

### Barrel Files

> **v0.5.3**: Se eliminaron 8 barrel files muertos (0 consumidores): `components/index.ts`, `ui/index.ts`, `patterns/index.ts`, `advanced/index.ts`, `providers/index.ts`, `help/index.ts`, `hooks/index.ts`, `lib/index.ts`.
> El único barrel activo es `widgets/index.ts` (consumido por `WidgetsShowcasePage`).
