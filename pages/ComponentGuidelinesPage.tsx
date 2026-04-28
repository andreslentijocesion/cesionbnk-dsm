/**
 * ComponentGuidelinesPage
 * ────────────────────────
 * Usage guidelines — when to use which component.
 * Covers the 5 most common decision points in the CesionBNK DSM.
 */
import { Badge } from "../components/ui/Badge";
import { Separator } from "../components/ui/Separator";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

// ─────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-8 mb-1">{children}</h2>
  );
}

function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground mb-6">{children}</p>;
}

function Do({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-success/30 bg-success-subtle p-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="size-4 text-success-on-subtle shrink-0" />
        <span className="text-sm font-semibold text-success-on-subtle">Usar cuando</span>
      </div>
      <ul className="space-y-1.5 text-sm text-success-on-subtle">{children}</ul>
    </div>
  );
}

function Dont({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive-subtle p-4">
      <div className="flex items-center gap-2 mb-2">
        <XCircle className="size-4 text-destructive-on-subtle shrink-0" />
        <span className="text-sm font-semibold text-destructive-on-subtle">No usar cuando</span>
      </div>
      <ul className="space-y-1.5 text-sm text-destructive-on-subtle">{children}</ul>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2"><span className="mt-1.5 size-1 rounded-full bg-current shrink-0" /><span>{children}</span></li>;
}

function ComponentCard({
  name,
  variant,
  desc,
  do: doItems,
  dont: dontItems,
  note,
}: {
  name: string;
  variant?: React.ComponentProps<typeof Badge>["variant"];
  desc: string;
  do: string[];
  dont: string[];
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-elevation-1">
      <div className="px-5 py-4 border-b border-border bg-muted/40 flex items-center gap-3">
        <Badge variant={variant ?? "neutral-soft"} className="font-mono text-xs">{name}</Badge>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="p-5 grid gap-4 md:grid-cols-2">
        <Do>{doItems.map((t, i) => <Li key={i}>{t}</Li>)}</Do>
        <Dont>{dontItems.map((t, i) => <Li key={i}>{t}</Li>)}</Dont>
      </div>
      {note && (
        <div className="px-5 pb-4">
          <div className="flex items-start gap-2 rounded-lg bg-info/8 border border-info/20 px-3 py-2.5">
            <Info className="size-3.5 .5 text-info-on-subtle shrink-0 mt-0.5" />
            <p className="text-xs text-info-on-subtle">{note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DecisionTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted border-b border-border">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/8 px-4 py-3">
      <AlertTriangle className="size-4 text-warning-on-subtle shrink-0 mt-0.5" />
      <p className="text-sm text-warning-on-subtle">{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// TOC
// ─────────────────────────────────────────────
const SECTIONS = [
  { id: "overlays",  label: "1. Overlays"           },
  { id: "feedback",  label: "2. Feedback"            },
  { id: "tables",    label: "3. Tablas de datos"     },
  { id: "forms",     label: "4. Controles de form"   },
  { id: "buttons",   label: "5. Botones"             },
  { id: "badges",    label: "6. Badges"              },
  { id: "factoring", label: "7. Patrones Factoring"  },
  { id: "charts",    label: "8. Visualización"       },
  { id: "print",     label: "9. Print / PDF"         },
  { id: "errors",    label: "10. Error States"        },
];

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export function ComponentGuidelinesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <Badge variant="info-soft">v0.4.0</Badge>
          <Badge variant="neutral-soft">Usage Guidelines</Badge>
        </div>
        <h1 className="mb-2">Component Usage Guidelines</h1>
        <p className="text-muted-foreground max-w-2xl">
          Guía de decisión para los componentes del DSM — cuándo usar cada uno,
          cuándo no, y qué alternativa preferir. Basado en los patrones más
          frecuentes de la plataforma CesionBNK.
        </p>
      </div>

      {/* TOC */}
      <nav className="rounded-xl border border-border bg-muted/30 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contenido</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-1.5 gap-x-4">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <Separator />

      {/* ── 1. OVERLAYS ─────────────────────────────── */}
      <section>
        <SectionTitle id="overlays">1. Overlays</SectionTitle>
        <SectionDesc>Dialog · Sheet · Drawer · Bottom Sheet · Popover — el error más frecuente es usar Dialog para todo.</SectionDesc>

        <DecisionTable
          headers={["Componente", "Tamaño", "Disparador", "Cuándo usarlo"]}
          rows={[
            [
              <Badge variant="neutral-soft" className="font-mono">Dialog</Badge>,
              "sm–md (max 600px)",
              "Acción crítica del usuario",
              "Confirmación de decisiones irreversibles (eliminar, aprobar, rechazar). Requiere respuesta inmediata.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Sheet</Badge>,
              "md–lg (40–50% ancho)",
              "Exploración secundaria",
              "Formularios largos, filtros avanzados, detalle de una fila de tabla. El usuario necesita ver el contexto original.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Drawer</Badge>,
              "lg (60–100% ancho)",
              "Flujo complejo",
              "Flujos de múltiples pasos que requieren toda la pantalla. Nueva operación, onboarding, wizard.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Bottom Sheet</Badge>,
              "Variable",
              "Acción móvil",
              "Menús de acción en mobile. Alternativa a ContextMenu en pantallas táctiles.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Popover</Badge>,
              "xs–sm (flotante)",
              "Hover / click en elemento",
              "Configuración contextual, filtros inline, pickers de fecha/color. Contenido relacionado con un elemento específico.",
            ],
          ]}
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ComponentCard
            name="Dialog"
            variant="neutral-soft"
            desc="Modal bloqueante — requiere acción"
            do={[
              "Confirmar eliminación de una operación",
              "Aprobar o rechazar con justificación breve",
              "Alertas de error crítico que bloquean el flujo",
            ]}
            dont={[
              "Formularios de más de 5 campos — usar Sheet",
              "Información de solo lectura — usar HoverCard o Sheet",
              "Acciones que el usuario iniciará muchas veces seguidas",
            ]}
            note="Siempre incluir un botón de cancelar. El usuario debe poder salir con Escape."
          />
          <ComponentCard
            name="Sheet"
            variant="neutral-soft"
            desc="Panel lateral — contexto preservado"
            do={[
              "Editar el detalle de un cedente sin salir del listado",
              "Filtros avanzados de cartera con preview en tiempo real",
              "Documentos adjuntos de una operación",
            ]}
            dont={[
              "Acciones destructivas — usar Dialog para mayor énfasis",
              "Contenido que necesita toda la pantalla — usar Drawer",
              "Popovers o tooltips — son demasiado pesados para eso",
            ]}
          />
        </div>
      </section>

      <Separator />

      {/* ── 2. FEEDBACK ─────────────────────────────── */}
      <section>
        <SectionTitle id="feedback">2. Feedback al usuario</SectionTitle>
        <SectionDesc>Alert · Toast · Inline Banner · Dialog — el error más frecuente es usar Toast para errores críticos que el usuario puede ignorar.</SectionDesc>

        <DecisionTable
          headers={["Componente", "Persistencia", "Bloquea UI", "Cuándo usarlo"]}
          rows={[
            [
              <Badge variant="neutral-soft" className="font-mono">Toast</Badge>,
              "3–5s (auto-dismiss)",
              "No",
              "Confirmación de acciones exitosas. El usuario ya sabe lo que hizo. Ej: 'Operación aprobada', 'Recordatorio enviado'.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Alert</Badge>,
              "Permanente",
              "No",
              "Estado persistente de la página. Advertencia de riesgo activo, información contextual que debe leerse antes de operar.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Inline Banner</Badge>,
              "Permanente",
              "No",
              "Mensajes a nivel de sección o formulario. Errores de validación de un grupo de campos, advertencias de datos incompletos.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Dialog</Badge>,
              "Hasta acción",
              "Sí",
              "Errores críticos que impiden continuar. El usuario DEBE leer y responder antes de seguir.",
            ],
          ]}
        />

        <div className="mt-4 space-y-4">
          <Note>
            <strong>Regla de oro:</strong> si el usuario puede ignorar el mensaje y no pasa nada grave → Toast.
            Si ignorarlo tiene consecuencias → Alert o Dialog.
          </Note>

          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard
              name="toast.success()"
              variant="success-soft"
              desc="Confirmación transitoria"
              do={[
                "'Operación aprobada' tras click en Aprobar",
                "'Recordatorio enviado al deudor'",
                "'Datos guardados correctamente'",
              ]}
              dont={[
                "Errores de red o del servidor — usar Alert o Dialog",
                "Información que el usuario necesitará más tarde",
                "Validaciones de formulario — usar mensajes inline",
              ]}
            />
            <ComponentCard
              name="Alert variant='destructive'"
              variant="destructive-soft"
              desc="Error persistente en la página"
              do={[
                "Operación bloqueada por deuda vencida del deudor",
                "Datos faltantes que impiden procesar una cesión",
                "Configuración de cuenta incompleta",
              ]}
              dont={[
                "Confirmaciones de éxito — usar Toast",
                "Errores que el usuario ya corrigió — remover el Alert",
                "Mensajes de más de 2 líneas — dividir en secciones",
              ]}
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── 3. TABLES ───────────────────────────────── */}
      <section>
        <SectionTitle id="tables">3. Tablas de datos</SectionTitle>
        <SectionDesc>Table · DataTable Advanced · MasterDataGrid · EditableTable — elegir mal aquí impacta directamente el rendimiento.</SectionDesc>

        <DecisionTable
          headers={["Componente", "Filas típicas", "Features", "Cuándo usarlo"]}
          rows={[
            [
              <Badge variant="neutral-soft" className="font-mono">Table</Badge>,
              "< 50",
              "Básico",
              "Listados simples sin paginación. Tablas de resumen, comparativas, configuración.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">DataTable Advanced</Badge>,
              "50–500",
              "Sort, filter, paginate, select",
              "Listados operacionales: cartera, cedentes, deudores. Soporte a bulk actions.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">MasterDataGrid</Badge>,
              "500–10k+",
              "Virtual scroll, column resize, freeze",
              "Reportes de cartera completa, portfolios grandes. Necesita rendimiento para miles de filas.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">EditableTable</Badge>,
              "< 100",
              "Edición inline por celda",
              "Carga de facturas masiva, ajuste de condiciones. Cuando el usuario necesita editar múltiples filas directamente.",
            ],
          ]}
        />

        <div className="mt-4">
          <Note>
            MasterDataGrid tiene mayor costo de hidratación inicial. No usar para tablas de menos de 200 filas — DataTable Advanced es suficiente y más liviano.
          </Note>
        </div>
      </section>

      <Separator />

      {/* ── 4. FORM CONTROLS ────────────────────────── */}
      <section>
        <SectionTitle id="forms">4. Controles de formulario</SectionTitle>
        <SectionDesc>Input · Select · Combobox · MultiSelect — depende de si el usuario puede escribir, cuántas opciones hay, y si puede elegir varias.</SectionDesc>

        <DecisionTable
          headers={["Componente", "Escritura libre", "Múltiple", "N° opciones", "Cuándo usarlo"]}
          rows={[
            [
              <Badge variant="neutral-soft" className="font-mono">Select</Badge>,
              "No", "No", "< 20",
              "Listas cortas y fijas: estado de operación, tipo de documento, moneda.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">Combobox</Badge>,
              "Sí (search)", "No", "20–500",
              "Buscar un cedente, un deudor, un banco. Listas largas donde el usuario sabe lo que busca.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">MultiSelect</Badge>,
              "Sí (search)", "Sí", "10–200",
              "Seleccionar sectores para reporte, múltiples estados de filtro, tags.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">TagInput</Badge>,
              "Sí (libre)", "Sí", "Ilimitado",
              "Ingreso de valores arbitrarios: NITs, correos, códigos. El valor no viene de una lista predefinida.",
            ],
          ]}
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ComponentCard
            name="DatePicker vs DateRangePicker"
            variant="neutral-soft"
            desc="Selección de fechas"
            do={[
              "DatePicker → una sola fecha: fecha de vencimiento, fecha de operación",
              "DateRangePicker → rango: filtrar cartera por período, reporte mensual",
              "DateNavigator → navegar por día/semana/mes en vistas de agenda",
            ]}
            dont={[
              "Usar Input type='date' directamente — pierde el token system y la accesibilidad",
              "DateRangePicker para una sola fecha",
            ]}
          />
          <ComponentCard
            name="Textarea vs RichTextEditor"
            variant="neutral-soft"
            desc="Entrada de texto largo"
            do={[
              "Textarea → observaciones simples, motivo de rechazo, comentarios",
              "TextareaAutoresize → cuando el tamaño debe adaptarse al contenido",
              "RichTextEditor → cuerpo de correos, términos y condiciones, documentos",
            ]}
            dont={[
              "RichTextEditor para campos cortos — demasiado pesado",
              "Textarea para contenido que necesita formato (negritas, listas)",
            ]}
          />
        </div>
      </section>

      <Separator />

      {/* ── 5. BUTTONS ──────────────────────────────── */}
      <section>
        <SectionTitle id="buttons">5. Botones</SectionTitle>
        <SectionDesc>La jerarquía de botones en una pantalla debe ser clara. Solo puede haber un botón Primary visible a la vez en un área de acción.</SectionDesc>

        <DecisionTable
          headers={["Variante", "Jerarquía", "Cuándo usarlo"]}
          rows={[
            [
              <Badge className="font-mono">default (primary)</Badge>,
              "1° — Acción principal",
              "La única acción más importante de la pantalla. 'Aprobar', 'Enviar', 'Crear operación'. Máximo 1 por área de acción.",
            ],
            [
              <Badge variant="secondary" className="font-mono">secondary</Badge>,
              "2° — Alternativa",
              "Acción secundaria junto a un primary. 'Guardar borrador', 'Vista previa', 'Exportar'.",
            ],
            [
              <Badge variant="outline" className="font-mono">outline</Badge>,
              "3° — Terciaria",
              "Acciones adicionales de menor peso. Filtros, configuración, navegación.",
            ],
            [
              <Badge variant="neutral-soft" className="font-mono">ghost</Badge>,
              "4° — Mínimo",
              "Acciones contextuales inline: botones de ícono en tablas, cerrar, cancelar.",
            ],
            [
              <Badge variant="destructive-soft" className="font-mono">destructive</Badge>,
              "Alerta — acción peligrosa",
              "Eliminar, anular, rechazar. Siempre acompañado de confirmación (Dialog).",
            ],
          ]}
        />

        <div className="mt-4">
          <Note>
            <strong>Regla de jerarquía:</strong> en un footer de formulario el orden debe ser siempre — Cancelar (ghost) → Acción secundaria (outline) → Acción principal (primary). Nunca invertir el orden ni poner dos primary juntos.
          </Note>
        </div>
      </section>

      <Separator />

      {/* ── 6. BADGES ───────────────────────────────── */}
      <section>
        <SectionTitle id="badges">6. Badges — selección de variante</SectionTitle>
        <SectionDesc>El badge comunica estado. Elegir la variante incorrecta genera ruido semántico.</SectionDesc>

        <DecisionTable
          headers={["Variante", "Significado", "Ejemplo en Factoring"]}
          rows={[
            [<Badge variant="success-soft">success-soft</Badge>, "Completado, activo, aprobado", "Cobrado · Aprobado · Activo"],
            [<Badge variant="success-soft-outline">success-soft-outline</Badge>, "Completado con menor énfasis", "Desembolsado · En regla"],
            [<Badge variant="warning-soft">warning-soft</Badge>, "Atención requerida, vence pronto", "En cobro · Esta semana · Pendiente revisión"],
            [<Badge variant="destructive-soft">destructive-soft</Badge>, "Problema, error, vencido", "Vencido · Rechazado · En mora"],
            [<Badge variant="destructive-soft-outline">destructive-soft-outline</Badge>, "Crítico con menor énfasis", "Crítico hoy · Anulado"],
            [<Badge variant="primary-soft">primary-soft</Badge>, "Próximo, upcoming, no urgente", "Próximo (15–30 días) · En proceso"],
            [<Badge variant="info-soft">info-soft</Badge>, "Informativo neutral", "En revisión · Pendiente aprobación"],
            [<Badge variant="neutral-soft">neutral-soft</Badge>, "Sin estado definido", "Borrador · Sin alerta · N/A"],
            [<Badge variant="secondary-soft">secondary-soft</Badge>, "Estado especial / negociado", "Negociado · Restructurado"],
          ]}
        />

        <div className="mt-4">
          <Note>
            No usar los colores de badge solid (success, warning, destructive sin -soft) en tablas — el fondo lleno compite visualmente con las filas. Reservar los sólidos para contadores de sidebar, KPIs y badges de primer plano.
          </Note>
        </div>
      </section>

      <Separator />

      {/* ── 7. FACTORING PATTERNS ───────────────────── */}
      <section>
        <SectionTitle id="factoring">7. Patrones específicos de Factoring</SectionTitle>
        <SectionDesc>Decisiones de diseño recurrentes en la plataforma CesionBNK.</SectionDesc>

        <div className="space-y-4">
          <ComponentCard
            name="StatCard vs KPI Card vs Badge"
            variant="neutral-soft"
            desc="Mostrar métricas"
            do={[
              "StatCard → métricas de dashboard con tendencia (↑↓ vs mes anterior)",
              "KPI Card (status-kpi-card) → semáforo de estado con contexto descriptivo",
              "Badge → estado de un ítem específico dentro de una tabla o lista",
            ]}
            dont={[
              "Badge para métricas numéricas — usar StatCard",
              "StatCard dentro de tablas — ocupan demasiado espacio",
              "KPI Cards para más de 6 indicadores simultáneos — saturan la vista",
            ]}
          />

          <ComponentCard
            name="ApprovalFlow vs MultiStepWizard vs OperationStatusPipeline"
            variant="neutral-soft"
            desc="Representar flujos de trabajo"
            do={[
              "ApprovalFlow → mostrar quién aprobó en cada etapa (histórico de firmas)",
              "MultiStepWizard → guiar al usuario a través de pasos secuenciales para crear algo",
              "OperationStatusPipeline → mostrar el estado actual de una operación en su ciclo de vida",
            ]}
            dont={[
              "ApprovalFlow para guiar un proceso activo — es retrospectivo, no de navegación",
              "MultiStepWizard para mostrar estado — es para input del usuario, no para lectura",
            ]}
          />

          <ComponentCard
            name="BulkActionToolbar vs DropdownMenu"
            variant="neutral-soft"
            desc="Acciones sobre múltiples ítems"
            do={[
              "BulkActionToolbar → aparece cuando el usuario selecciona 1 o más filas de tabla",
              "DropdownMenu → acciones sobre un solo ítem (kebab menu por fila)",
              "SplitButton → acción principal + alternativas para un solo ítem con variantes",
            ]}
            dont={[
              "BulkActionToolbar visible cuando no hay selección",
              "DropdownMenu para más de 8 acciones — dividir en submenús o usar Sheet",
            ]}
            note="El BulkActionToolbar debe mostrar el conteo de ítems seleccionados. Siempre incluir 'Deseleccionar todo'."
          />
        </div>
      </section>

      <Separator />

      {/* ── 8. CHARTS ───────────────────────────────── */}
      <section>
        <SectionTitle id="charts">8. Visualización de datos</SectionTitle>
        <SectionDesc>Qué gráfico usar para qué dato — el error más frecuente es usar barras para todo.</SectionDesc>

        <DecisionTable
          headers={["Gráfico", "Componente", "Cuándo usarlo", "No usarlo para"]}
          rows={[
            [
              <span className="font-medium">Barras verticales</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">BarChart</Badge>,
              "Comparar magnitudes entre categorías discretas: cartera por sector, operaciones por cedente, monto por mes.",
              "Series temporales densas (más de 12 puntos) — usar línea.",
            ],
            [
              <span className="font-medium">Línea / Área</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">LineChart / AreaChart</Badge>,
              "Evolución temporal: mora histórica, cartera mensual, tasa de aprobación.",
              "Comparar valores puntuales entre categorías — usar barras.",
            ],
            [
              <span className="font-medium">Dona</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">PieChart (donut)</Badge>,
              "Composición de un total: % por estado de cartera, distribución por moneda. Máximo 5–6 segmentos.",
              "Más de 6 categorías. Comparar magnitudes. Tendencias temporales.",
            ],
            [
              <span className="font-medium">Embudo</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">FunnelChart</Badge>,
              "Conversión por etapa: ingresadas → revisadas → aprobadas → desembolsadas.",
              "Datos sin relación de conversión secuencial.",
            ],
            [
              <span className="font-medium">Gauge</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">GaugeChart</Badge>,
              "Un único KPI con rango: score de riesgo, % de mora, utilización de línea.",
              "Múltiples métricas simultáneas — usar StatCards.",
            ],
            [
              <span className="font-medium">Heatmap</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">Heatmap</Badge>,
              "Densidad en dos dimensiones: vencimientos por día/semana, actividad por hora.",
              "Datos sin dos ejes naturales. Series temporales simples.",
            ],
            [
              <span className="font-medium">Sparkline</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">Sparkline</Badge>,
              "Mini-tendencia dentro de una celda de tabla o StatCard. Sin ejes ni labels.",
              "Análisis detallado — usar LineChart completo.",
            ],
            [
              <span className="font-medium">TreeMap</span>,
              <Badge variant="neutral-soft" className="font-mono text-xs">TreemapChart</Badge>,
              "Jerarquía + magnitud: concentración sectorial por tamaño de cartera.",
              "Datos sin jerarquía o sin diferencia notable de magnitud.",
            ],
          ]}
        />

        <div className="mt-6 space-y-4">
          <Note>
            <strong>Accesibilidad en charts:</strong> nunca comunicar información solo por color.
            Incluir siempre labels, tooltips y leyenda. Los tokens --chart-1 a --chart-5 están calibrados
            para mantener contraste entre sí en light y dark mode — no reemplazarlos por colores arbitrarios.
          </Note>
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard
              name="Cuándo NO usar chart"
              variant="destructive-soft"
              desc="Alternativas más simples y efectivas"
              do={[
                "1–2 valores → StatCard con tendencia (↑↓%)",
                "Comparar 2–4 valores exactos → tabla con badges",
                "Un solo porcentaje → ProgressWithRange o GaugeChart",
              ]}
              dont={[
                "Chart solo para dar color — genera ruido visual",
                "Donut con un segmento — es solo un número",
                "Barras con un único dato — usar número grande con contexto",
              ]}
            />
            <ComponentCard
              name="Performance con Recharts"
              variant="warning-soft"
              desc="Límites prácticos en producción"
              do={[
                "< 500 puntos por chart — animaciones fluidas",
                "SafeChartContainer para manejar resize sin crash",
                "Lazy load en charts below the fold",
              ]}
              dont={[
                "> 1000 puntos sin muestreo previo — causa jank",
                "Múltiples charts animados simultáneos en la misma vista",
                "Recharts dentro de listas virtualizadas",
              ]}
              note="En dashboards con 6+ charts usar isAnimationActive={false} para mejorar rendimiento."
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* ── 9. PRINT / PDF ──────────────────────────── */}
      <section id="print" className="space-y-6">
        <SectionTitle id="print">9. Print / PDF</SectionTitle>
        <SectionDesc>
          Guía para producir reportes impresos y PDFs limpios desde la plataforma.
          El DSM incluye <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">styles/print.css</code> con{" "}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">@media print</code> aplicado globalmente.
        </SectionDesc>

        <DecisionTable
          headers={["Escenario", "Solución recomendada", "Clase CSS helper"]}
          rows={[
            ["Ocultar sidebar / nav / botones al imprimir", "Automático — print.css oculta <nav>, <aside>, [data-sidebar]", <Badge variant="neutral-soft" className="font-mono text-xs">automático</Badge>],
            ["Ocultar un elemento específico", "Agregar clase al elemento", <Badge variant="neutral-soft" className="font-mono text-xs">.no-print</Badge>],
            ["Mostrar solo en print (ej: watermark, firma)", "Agregar clase al elemento", <Badge variant="neutral-soft" className="font-mono text-xs">.print-only</Badge>],
            ["Forzar salto de página antes de sección", "Agregar clase al contenedor", <Badge variant="neutral-soft" className="font-mono text-xs">.print-break-before</Badge>],
            ["Forzar salto de página después de sección", "Agregar clase al contenedor", <Badge variant="neutral-soft" className="font-mono text-xs">.print-break-after</Badge>],
            ["Evitar que un bloque se corte entre páginas", "Agregar clase al contenedor", <Badge variant="neutral-soft" className="font-mono text-xs">.print-break-inside-avoid</Badge>],
            ["Página en horizontal (tablas anchas)", "Agregar clase al wrapper de la página", <Badge variant="neutral-soft" className="font-mono text-xs">.print-landscape</Badge>],
            ["Header de reporte solo en print", "Envolver en <div className='print-only'>", <Badge variant="neutral-soft" className="font-mono text-xs">.print-only</Badge>],
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <ComponentCard
            name="Reporte de Cartera (Portfolio Report)"
            variant="primary-soft"
            desc="Documento A4 portrait — más común"
            do={[
              "Usar .print-break-before en cada nueva sección de cedente",
              "Incluir .print-page-header con logo + fecha de generación",
              "Tablas: thead se repite automáticamente en cada página",
              "Usar .print-break-inside-avoid en KPI cards superiores",
            ]}
            dont={[
              "Mezclar charts interactivos — usar versión estática o SVG snapshot",
              "Confiar en colores sutiles — usar bordes para diferenciar filas",
              "Incluir dropdowns, tooltips o popovers — se ocultarán",
            ]}
          />
          <ComponentCard
            name="Detalle de Operación (Operation Detail)"
            variant="primary-soft"
            desc="A4 portrait — layout de 2 columnas en pantalla"
            do={[
              "Añadir .print-break-inside-avoid al header de operación",
              "Sección de facturas: forzar tabla simple (sin sticky headers)",
              "Mostrar estado de aprobación como texto + ícono (no badge dinámico)",
              "Incluir número de operación y NIT cedente en .print-page-header",
            ]}
            dont={[
              "Grillas de 2 columnas sin media query — se solapan en A4",
              "Progress animados — print.css los convierte a estáticos",
              "Firmas digitales sin .print-break-inside-avoid",
            ]}
          />
        </div>

        <Note>
          <strong>Activar print:</strong> usar <code className="font-mono text-xs">window.print()</code> o el shortcut del navegador.
          Para PDF sin diálogo (ej: exportar desde botón) usar la librería <code className="font-mono text-xs">@react-pdf/renderer</code> o una API de generación en backend.
          El CSS de print funciona para ambos casos — browser print dialog y PDF headless.
        </Note>
      </section>

      <Separator />

      {/* ── 10. ERROR STATES ────────────────────────────────── */}
      <section id="errors" className="space-y-6">
        <SectionTitle id="errors">10. Error States</SectionTitle>
        <SectionDesc>
          Cómo comunicar errores al usuario — validación de formularios, fallos de servidor,
          estados vacíos con error y recuperación. Cada capa tiene un componente apropiado.
        </SectionDesc>

        {/* Capas de error */}
        <DecisionTable
          headers={["Capa", "Componente", "Cuándo usarlo", "Cuándo NO"]}
          rows={[
            [
              <Badge key="field" variant="neutral-soft" className="font-mono text-xs">Field</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"<p className='text-destructive'>"}</code>,
              "Error de validación sobre un campo específico (requerido, formato incorrecto, fuera de rango)",
              "Errores de servidor o errores que afectan más de un campo",
            ],
            [
              <Badge key="form" variant="neutral-soft" className="font-mono text-xs">Form</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"<Alert variant='destructive'>"}</code>,
              "Error de submit que afecta el formulario completo (ej: NIT duplicado, sesión expirada)",
              "Errores de campo individual — usar label del campo, no alert global",
            ],
            [
              <Badge key="page" variant="neutral-soft" className="font-mono text-xs">Page</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"<EmptyState>"}</code>,
              "Recurso no encontrado (404), sin permiso (403), lista vacía tras filtros sin resultado",
              "Errores transitorios de red — preferir toast con reintentar",
            ],
            [
              <Badge key="app" variant="neutral-soft" className="font-mono text-xs">App</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"<ErrorBoundary>"}</code>,
              "Crash de componente React inesperado — captura errores de render",
              "Errores de lógica de negocio o validación — no son crashes de render",
            ],
            [
              <Badge key="toast" variant="neutral-soft" className="font-mono text-xs">Transient</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"toast.error()"}</code>,
              "Operación asíncrona fallida (POST/PUT/DELETE) — feedback inmediato, se auto-cierra",
              "Errores que requieren acción del usuario — usar Alert o Dialog con CTA",
            ],
            [
              <Badge key="inline" variant="neutral-soft" className="font-mono text-xs">Inline</Badge>,
              <code key="c" className="text-xs bg-muted px-1.5 py-0.5 rounded">{"<InlineBanner variant='destructive'>"}</code>,
              "Error persistente en una sección de la UI (ej: datos de cedente con estado bloqueado)",
              "Errores de formulario o errores que ya tienen un campo asociado",
            ],
          ]}
        />

        {/* Form validation patterns */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Validación de formularios</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard
              name="Validación de campo (Field-level)"
              variant="neutral-soft"
              desc="El error más granular — siempre junto al campo"
              do={[
                "Mostrar error debajo del input con text-destructive text-sm",
                "Añadir aria-describedby apuntando al mensaje de error",
                "Validar on blur (al salir del campo) — no on change",
                "Usar react-hook-form + zod para validación tipada",
              ]}
              dont={[
                "Validar on change — interrumpe mientras el usuario tipea",
                "Texto de error genérico ('Campo inválido') — describir qué está mal",
                "Ocultar el label del campo cuando hay error — el label sigue siendo necesario",
              ]}
              note="Patrón: <FormField> → <FormItem> → <FormLabel> → <FormControl> → <FormMessage>. FormMessage usa role='alert' automáticamente."
            />
            <ComponentCard
              name="Error de submit (Form-level)"
              variant="neutral-soft"
              desc="Error del servidor al intentar guardar"
              do={[
                "Alert variant='destructive' encima del botón de submit",
                "Mantener el formulario lleno — no limpiar los campos",
                "Incluir el código de error si es útil para soporte (ej: ERR-4021)",
                "Ofrecer acción: reintentar, contactar soporte, o volver",
              ]}
              dont={[
                "Limpiar el formulario al fallar — el usuario pierde su trabajo",
                "Usar toast para errores que bloquean el submit — no se ve suficiente tiempo",
                "Alert sin descripción accionable — 'Error desconocido' no ayuda",
              ]}
            />
          </div>
        </div>

        {/* Server / async errors */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Errores de servidor y red</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <ComponentCard
              name="Error de operación asíncrona"
              variant="warning-soft"
              desc="POST/PUT/DELETE que falla en background"
              do={[
                "toast.error('Mensaje claro', { action: { label: 'Reintentar', onClick } })",
                "Revertir el estado optimista si se usó (rollback)",
                "Loggear el error con contexto (operationId, userId, timestamp)",
                "Duración larga en toasts de error: duration: 8000",
              ]}
              dont={[
                "Silenciar el error — el usuario debe saber que falló",
                "console.error sin feedback visual — solo útil en desarrollo",
                "Multiple toasts si el usuario reintenta rápido — deduplicar",
              ]}
            />
            <ComponentCard
              name="Página sin datos / error de carga"
              variant="warning-soft"
              desc="GET que falla o devuelve lista vacía"
              do={[
                "EmptyState con ícono contextual, título y descripción",
                "Distinguir: vacío real (sin datos) vs error de red (falló el fetch)",
                "Botón de reintento en errores de red (no en vacío real)",
                "Skeleton mientras carga, EmptyState cuando resuelve vacío",
              ]}
              dont={[
                "Dejar la página en blanco sin feedback — parece rota",
                "Mostrar 'Sin resultados' cuando en realidad hubo un error 500",
                "EmptyState con texto técnico ('Error 503') — humanizar el mensaje",
              ]}
            />
          </div>
        </div>

        {/* Hierarchy visual */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Jerarquía de errores en CesionBNK</p>
          <div className="space-y-2 text-sm">
            {[
              { level: "1", scope: "Campo",       comp: "text-destructive bajo el input",        color: "bg-destructive/10 text-destructive-on-subtle border-destructive/20" },
              { level: "2", scope: "Formulario",  comp: "Alert variant='destructive' sobre CTA", color: "bg-destructive/10 text-destructive-on-subtle border-destructive/20" },
              { level: "3", scope: "Sección",     comp: "InlineBanner variant='destructive'",    color: "bg-warning/10 text-warning-on-subtle border-warning/20"     },
              { level: "4", scope: "Operación",   comp: "toast.error() con action reintentar",   color: "bg-warning/10 text-warning-on-subtle border-warning/20"     },
              { level: "5", scope: "Página",      comp: "EmptyState con ícono de error",         color: "bg-caution/10 text-caution-on-subtle border-caution/20"     },
              { level: "6", scope: "Aplicación",  comp: "ErrorBoundary con fallback UI",         color: "bg-caution/10 text-caution-on-subtle border-caution/20"     },
            ].map(({ level, scope, comp, color }) => (
              <div key={level} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${color}`}>
                <span className="font-mono text-xs font-bold opacity-60 w-4 shrink-0">{level}</span>
                <span className="font-medium w-24 shrink-0">{scope}</span>
                <code className="text-xs opacity-80">{comp}</code>
              </div>
            ))}
          </div>
        </div>

        <Note>
          <strong>Accesibilidad en errores:</strong> los mensajes de error deben tener{" "}
          <code className="font-mono text-xs">role="alert"</code> o{" "}
          <code className="font-mono text-xs">aria-live="assertive"</code> para que los lectores
          de pantalla los anuncien automáticamente. <code className="font-mono text-xs">{"<FormMessage>"}</code>{" "}
          de shadcn/ui ya incluye <code className="font-mono text-xs">role="alert"</code>.
          Para toasts, Sonner maneja el anuncio con aria automáticamente.
        </Note>
      </section>

    </div>
  );
}
