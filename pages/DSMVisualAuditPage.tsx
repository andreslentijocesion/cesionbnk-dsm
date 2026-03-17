import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import {
  AlertCircle, CheckCircle, Info, AlertTriangle,
  User, Settings, Bell, CreditCard,
  ChevronRight, ArrowRight
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6 border-b border-border pb-3">
      <h2 className="text-foreground">{title}</h2>
      {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </div>
  );
}

function AuditRow({
  label,
  token,
  status,
  children,
  note,
}: {
  label: string;
  token: string;
  status: "ok" | "fixed" | "pending";
  children: React.ReactNode;
  note?: string;
}) {
  const statusConfig = {
    ok:      { dot: "bg-success",  text: "text-success",  label: "DSM OK"   },
    fixed:   { dot: "bg-info",     text: "text-info",     label: "Corregido" },
    pending: { dot: "bg-warning",  text: "text-warning",  label: "Pendiente" },
  }[status];

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-4 py-4 border-b border-border last:border-0">
      <div className="flex flex-col gap-3">
        {/* Label + status badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-foreground">{label}</span>
          <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 border ${
            status === "ok"      ? "border-success/30 bg-success/8 text-success" :
            status === "fixed"   ? "border-info/30 bg-info/8 text-info" :
                                   "border-warning/30 bg-warning/8 text-warning"
          }`}>
            <span className={`size-1.5 rounded-full ${statusConfig.dot}`} />
            <span className="text-xs">{statusConfig.label}</span>
          </span>
        </div>
        {/* Token annotation */}
        <code className="inline-block rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground font-mono w-fit">
          {token}
        </code>
        {/* Note */}
        {note && <p className="text-muted-foreground">{note}</p>}
      </div>
      {/* Live component preview */}
      <div className="flex items-center justify-end gap-2 flex-wrap">
        {children}
      </div>
    </div>
  );
}

function AuditCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-elevation-1 overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-muted">
        <h3 className="text-foreground">{title}</h3>
      </div>
      <div className="px-6 py-2">
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Summary Banner
───────────────────────────────────────────────────────────── */

function SummaryBanner() {
  const items = [
    { label: "OK (sin cambios)",    count: 12, color: "text-success",  bg: "bg-success/8  border-success/20"  },
    { label: "Corregidos (v0.5.4)", count: 4,  color: "text-info",    bg: "bg-info/8     border-info/20"      },
    { label: "Pendientes",          count: 2,  color: "text-warning",  bg: "bg-warning/8  border-warning/20"   },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {items.map((item) => (
        <div key={item.label} className={`rounded-xl border px-6 py-4 flex items-center gap-4 ${item.bg}`}>
          <span className={`text-4xl font-bold ${item.color}`}>{item.count}</span>
          <span className={`${item.color}`}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Token Reference Panel
───────────────────────────────────────────────────────────── */

function TokenReference() {
  const tokens = [
    { name: "Radius/sm",  value: "~6px",   tw: "rounded-sm",   use: "Checkbox, Radio" },
    { name: "Radius/md",  value: "~8px",   tw: "rounded-md",   use: "Input, Badge, Select, Dropdown" },
    { name: "Radius/lg",  value: "10px",   tw: "rounded-lg",   use: "Button (BASE)" },
    { name: "Radius/xl",  value: "~14px",  tw: "rounded-xl",   use: "Card, Dialog, Modal, Tabs pill" },
    { name: "Radius/full","value": "9999px", tw: "rounded-full", use: "Switch, Avatar, Pills" },
  ];
  const shadows = [
    { name: "elevation-1", use: "Buttons, Inputs (hover)" },
    { name: "elevation-2", use: "Cards, Tables (static)" },
    { name: "elevation-3", use: "Dropdowns, Popovers, Hover cards" },
    { name: "elevation-4", use: "Modals, Sidebars, Toasts" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Radius */}
      <div className="rounded-xl border border-border bg-card shadow-elevation-1 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted">
          <h3 className="text-foreground">Border Radius Tokens</h3>
          <p className="text-muted-foreground mt-0.5">Base: 0.625rem (10px) — CESIONBNK</p>
        </div>
        <div className="divide-y divide-border">
          {tokens.map((t) => (
            <div key={t.name} className="px-6 py-3 flex items-center gap-4">
              <div
                className="shrink-0 size-10 bg-muted border border-border"
                style={{ borderRadius: t.value === "9999px" ? "9999px" : t.value }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-foreground">{t.name}</code>
                  <code className="text-xs font-mono text-muted-foreground">{t.tw}</code>
                </div>
                <p className="text-muted-foreground truncate">{t.use}</p>
              </div>
              <span className="shrink-0 text-muted-foreground">{t.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Shadows */}
      <div className="rounded-xl border border-border bg-card shadow-elevation-1 overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted">
          <h3 className="text-foreground">Shadow Elevation Tokens</h3>
          <p className="text-muted-foreground mt-0.5">CSS vars → dark-mode reactivos automáticamente</p>
        </div>
        <div className="divide-y divide-border">
          {shadows.map((s) => (
            <div key={s.name} className="px-6 py-4 flex items-center gap-4">
              <div className={`shrink-0 size-12 rounded-lg bg-card shadow-${s.name}`} />
              <div className="flex-1">
                <code className="text-xs font-mono text-foreground">{s.name}</code>
                <p className="text-muted-foreground">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────── */

export function DSMVisualAuditPage() {
  return (
    <TooltipProvider>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="info-soft">v0.5.4</Badge>
            <Badge variant="neutral-soft">DSM Audit</Badge>
          </div>
          <h1 className="text-foreground mb-2">DSM Visual Audit</h1>
          <p className="text-muted-foreground max-w-2xl">
            Revisión sistemática de todos los componentes contra los tokens del DSM.
            Cada entrada muestra el token aplicado, el estado (OK / Corregido / Pendiente) y
            un render en vivo para inspección visual.
          </p>
        </div>

        {/* Summary */}
        <SummaryBanner />

        {/* Token Reference */}
        <section>
          <SectionHeader title="Token Reference" description="Valores canónicos del DSM — úsalos como comparación visual rápida." />
          <TokenReference />
        </section>

        {/* ── FORM CONTROLS ─────────────────────────────────────── */}
        <section>
          <SectionHeader
            title="Form Controls"
            description="Inputs, Buttons, Checkboxes, Selects — los componentes de mayor frecuencia."
          />
          <AuditCard title="Button">
            <AuditRow
              label="Default shape → rounded-lg (10px)"
              token="Radius/lg = 10px → rounded-lg ✓ CORREGIDO de rounded-md"
              status="fixed"
              note="shape.default era 'rounded-md' (8px). DSM especifica Buttons = 10px (Radius/lg). Ahora alineado."
            >
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </AuditRow>
            <AuditRow
              label="Pill shape"
              token="Radius/full = 9999px → rounded-full ✓"
              status="ok"
            >
              <Button shape="pill" size="sm" variant="outline">Pill SM</Button>
              <Button shape="pill">Pill</Button>
            </AuditRow>
            <AuditRow
              label="Semantic variants"
              token="Brand/Primary · Feedback/Destructive · Feedback/Success · Feedback/Warning · Feedback/Info"
              status="ok"
            >
              <Button variant="destructive" size="sm">Error</Button>
              <Button variant="success" size="sm">Aprobado</Button>
              <Button variant="warning" size="sm">Pendiente</Button>
              <Button variant="info" size="sm">Info</Button>
            </AuditRow>
            <AuditRow
              label="Outline / Soft variants"
              token="border-{semantic}/30 · bg-{semantic}/10"
              status="ok"
            >
              <Button variant="destructive-outline" size="sm">Outline</Button>
              <Button variant="success-outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
            </AuditRow>
          </AuditCard>

          <div className="mt-6">
            <AuditCard title="Input">
              <AuditRow
                label="Sizes sm / default / lg"
                token="Radius/md = 8px → rounded-md ✓ · bg-input-background · border-input"
                status="ok"
              >
                <Input size="sm" placeholder="Small" className="w-32" />
                <Input placeholder="Default" className="w-36" />
                <Input size="lg" placeholder="Large" className="w-36" />
              </AuditRow>
              <AuditRow
                label="Error state"
                token="aria-invalid:border-destructive · aria-invalid:ring-destructive/20"
                status="ok"
              >
                <Input placeholder="Error state" aria-invalid="true" className="w-48" />
              </AuditRow>
            </AuditCard>
          </div>

          <div className="mt-6">
            <AuditCard title="Select">
              <AuditRow
                label="Trigger sizes"
                token="Radius/md · border-input · bg-input-background"
                status="ok"
              >
                <Select>
                  <SelectTrigger size="sm" className="w-32">
                    <SelectValue placeholder="Small" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Opción A</SelectItem>
                    <SelectItem value="b">Opción B</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Opción A</SelectItem>
                    <SelectItem value="b">Opción B</SelectItem>
                  </SelectContent>
                </Select>
              </AuditRow>
            </AuditCard>
          </div>

          <div className="mt-6">
            <AuditCard title="Checkbox · Switch · Radio">
              <AuditRow
                label="Checkbox — sizes sm / default / lg"
                token="Radius/sm (~4px hardcoded) · Brand/Primary · Form/Border"
                status="ok"
              >
                <Checkbox />
                <Checkbox defaultChecked />
                <Checkbox disabled />
              </AuditRow>
              <AuditRow
                label="Switch — sizes sm / default / lg"
                token="Radius/full · Brand/Primary · bg-switch-background"
                status="ok"
              >
                <Switch />
                <Switch defaultChecked />
                <Switch disabled />
              </AuditRow>
            </AuditCard>
          </div>
        </section>

        {/* ── DATA DISPLAY ─────────────────────────────────────── */}
        <section>
          <SectionHeader title="Data Display" description="Badge, Avatar, Progress — componentes de estado e información." />
          <AuditCard title="Badge">
            <AuditRow
              label="Radius → rounded-md (8px)"
              token="Radius/md · Brand/Primary · Brand/Secondary · Feedback/*"
              status="ok"
            >
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </AuditRow>
            <AuditRow
              label="Semantic sólidos"
              token="bg-{semantic} text-{semantic}-foreground"
              status="ok"
            >
              <Badge variant="success">Aprobado</Badge>
              <Badge variant="warning">Pendiente</Badge>
              <Badge variant="destructive">Rechazado</Badge>
              <Badge variant="info">Info</Badge>
            </AuditRow>
            <AuditRow
              label="Soft variants (factorado)"
              token="bg-{semantic}/10 border-{semantic}/30 text-{semantic}"
              status="ok"
            >
              <Badge variant="success-soft">Aprobado</Badge>
              <Badge variant="warning-soft">Pendiente</Badge>
              <Badge variant="destructive-soft">Error</Badge>
              <Badge variant="neutral-soft">Borrador</Badge>
            </AuditRow>
          </AuditCard>

          <div className="mt-6">
            <AuditCard title="Avatar">
              <AuditRow
                label="Sizes sm / default / lg"
                token="Radius/full · Neutral/Muted · Neutral/Muted Foreground"
                status="ok"
              >
                <Avatar className="size-8">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>DF</AvatarFallback>
                </Avatar>
                <Avatar className="size-12">
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
              </AuditRow>
            </AuditCard>
          </div>

          <div className="mt-6">
            <AuditCard title="Progress">
              <AuditRow
                label="Variants · Sizes · Values"
                token="Brand/Primary · Feedback/* · Radius/full"
                status="ok"
              >
                <div className="w-full space-y-2">
                  <Progress value={65} className="h-2" />
                  <Progress value={80} className="h-2 [&>div]:bg-success" />
                  <Progress value={45} className="h-2 [&>div]:bg-warning" />
                  <Progress value={20} className="h-2 [&>div]:bg-destructive" />
                </div>
              </AuditRow>
            </AuditCard>
          </div>
        </section>

        {/* ── FEEDBACK ─────────────────────────────────────────── */}
        <section>
          <SectionHeader title="Feedback" description="Alert — revisado para usar tokens semánticos en lugar de colores hardcoded." />
          <AuditCard title="Alert">
            <AuditRow
              label="Colores semánticos via tokens (no Tailwind hardcoded)"
              token="border-{semantic}/30 · bg-{semantic}/8 · text-{semantic} · CORREGIDO"
              status="fixed"
              note="Antes: bg-red-50, text-red-800, border-red-300 (hardcoded). Ahora: bg-destructive/8, text-destructive, border-destructive/30 — se adapta al modo oscuro."
            >
              <span />
            </AuditRow>
            <div className="space-y-3 pb-4">
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Error de validación</AlertTitle>
                <AlertDescription>La factura no pudo ser procesada. Revisa los datos e intenta nuevamente.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle className="size-4" />
                <AlertTitle>Operación aprobada</AlertTitle>
                <AlertDescription>La cesión fue registrada exitosamente en el sistema.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTriangle className="size-4" />
                <AlertTitle>Revisión requerida</AlertTitle>
                <AlertDescription>El deudor tiene alertas de riesgo activas.</AlertDescription>
              </Alert>
              <Alert variant="info">
                <Info className="size-4" />
                <AlertTitle>Información del proceso</AlertTitle>
                <AlertDescription>El plazo de pago vence en 3 días hábiles.</AlertDescription>
              </Alert>
            </div>
          </AuditCard>
        </section>

        {/* ── LAYOUT ───────────────────────────────────────────── */}
        <section>
          <SectionHeader title="Layout" description="Card, Accordion, Tabs — correcciones aplicadas en esta sesión." />
          <AuditCard title="Card">
            <AuditRow
              label="shadow-elevation-2 (cards estáticos)"
              token="elevation-2 = 0 4px 6px -1px rgba(34,34,34,.1) · CORREGIDO"
              status="fixed"
              note="Antes: sin shadow. DSM especifica static cards = elevation-2. Ahora aplica shadow-elevation-2 por defecto."
            >
              <span />
            </AuditRow>
            <AuditRow
              label="CardTitle leading-normal (line-height 1.5)"
              token="leading-normal = 1.5 · CORREGIDO de leading-none"
              status="fixed"
              note="DSM: line-height global default = 1.5. leading-none (1.0) era incorrecto para títulos de tarjeta."
            >
              <span />
            </AuditRow>
            <div className="pb-4">
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle>Operación #4521</CardTitle>
                  <CardDescription>Cesión de facturas — Cliente Empresas S.A.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="success-soft">Aprobada</Badge>
                    <span className="text-muted-foreground">$42.500.000</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AuditCard>

          <div className="mt-6">
            <AuditCard title="Accordion">
              <AuditRow
                label="Trigger: sin hover:underline — hover:text-foreground/80"
                token="transition-all · hover:text-foreground/80 · CORREGIDO"
                status="fixed"
                note="Antes: hover:underline (estilo link, no DSM). Ahora: fade de opacidad del texto, acorde al estilo del DSM."
              >
                <span />
              </AuditRow>
              <div className="pb-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Qué documentos necesita el proceso de cesión?</AccordionTrigger>
                    <AccordionContent>
                      Se requiere la factura original, RUT del cedente y deudor, y carta de instrucción firmada.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Cuánto tiempo tarda la aprobación?</AccordionTrigger>
                    <AccordionContent>
                      El proceso de aprobación estándar toma entre 24 y 48 horas hábiles desde la recepción completa.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Cuáles son las tasas de descuento aplicables?</AccordionTrigger>
                    <AccordionContent>
                      Las tasas varían según el perfil del deudor y el plazo de la factura. Rango típico: 0.8% – 2.5% mensual.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </AuditCard>
          </div>

          <div className="mt-6">
            <AuditCard title="Tabs">
              <AuditRow
                label="Pill style — bg-muted container · bg-card active · rounded-xl"
                token="Radius/xl · Neutral/Muted · Surface/Card · shadow-sm activo"
                status="ok"
                note="Ya estaba correcto desde v25 del plugin: TabsList = pill style, rounded-xl, bg-muted. Alineado con el DSM."
              >
                <span />
              </AuditRow>
              <div className="pb-4">
                <Tabs defaultValue="tab1" className="w-full max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1" className="gap-1.5">
                      <User className="size-3.5" /> Cuenta
                    </TabsTrigger>
                    <TabsTrigger value="tab2" className="gap-1.5">
                      <Bell className="size-3.5" /> Alertas
                    </TabsTrigger>
                    <TabsTrigger value="tab3" className="gap-1.5">
                      <Settings className="size-3.5" /> Config
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="pt-4">
                    <p className="text-muted-foreground">Información de cuenta y perfil.</p>
                  </TabsContent>
                  <TabsContent value="tab2" className="pt-4">
                    <p className="text-muted-foreground">Configuración de alertas y notificaciones.</p>
                  </TabsContent>
                  <TabsContent value="tab3" className="pt-4">
                    <p className="text-muted-foreground">Configuración general del sistema.</p>
                  </TabsContent>
                </Tabs>
              </div>
            </AuditCard>
          </div>
        </section>

        {/* ── OVERLAY ──────────────────────────────────────────── */}
        <section>
          <SectionHeader title="Overlay" description="Tooltip — verificación de tokens semánticos." />
          <AuditCard title="Tooltip">
            <AuditRow
              label="Radius/md · Surface/Popover · Surface/Popover Foreground"
              token="rounded-md · bg-popover · text-popover-foreground"
              status="ok"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">Hover para tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Token: Surface/Popover</p>
                </TooltipContent>
              </Tooltip>
            </AuditRow>
          </AuditCard>
        </section>

        {/* ── PENDING ──────────────────────────────────────────── */}
        <section>
          <SectionHeader
            title="Pendientes"
            description="Componentes con desviaciones conocidas que requieren análisis adicional antes de corregir."
          />
          <div className="rounded-xl border border-warning/30 bg-warning/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-warning/20 flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" />
              <h3 className="text-warning">2 items pendientes</h3>
            </div>
            <div className="divide-y divide-warning/10">
              <div className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <ChevronRight className="size-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground">Button base text size</p>
                    <p className="text-muted-foreground mt-1">
                      CVA base usa <code className="bg-muted px-1 rounded text-xs">text-sm</code> (14px).
                      DSM especifica Button text = 16px (<code className="bg-muted px-1 rounded text-xs">text-base</code>).
                      La capa <code className="bg-muted px-1 rounded text-xs">@layer base</code> de config.css
                      pone <code className="bg-muted px-1 rounded text-xs">text-base</code> en el selector <code className="bg-muted px-1 rounded text-xs">button</code>,
                      pero la utility class del CVA tiene mayor precedencia en Tailwind v4.
                      Requiere decisión de diseño: ¿cambiar la CVA o documentar excepción?
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <ChevronRight className="size-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground">Select / Input text-sm en size=default</p>
                    <p className="text-muted-foreground mt-1">
                      <code className="bg-muted px-1 rounded text-xs">size=default</code> usa
                      <code className="bg-muted px-1 rounded text-xs"> text-sm</code> en Select y Input (14px).
                      El patrón <code className="bg-muted px-1 rounded text-xs">md:text-sm</code> sugiere que es intencional para desktop
                      (accesibilidad con texto compacto en tablas/forms), pero puede no
                      coincidir exactamente con el spec de 16px del DSM en Figma.
                      Se recomienda validar contra los frames de Figma generados por el plugin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGY ─────────────────────────────────────────── */}
        <section>
          <SectionHeader title="Estrategia de Alineación" description="Plan de acción para mantener el DSM React ↔ Figma sincronizado." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: "01",
                title: "Token Audit",
                desc: "Usar esta página como checklist vivo. Cuando el plugin genere un componente en Figma, comparar con el render en vivo aquí.",
                color: "border-info/30 bg-info/5",
                badge: "bg-info/10 text-info",
              },
              {
                step: "02",
                title: "Fix en React primero",
                desc: "Si hay discrepancia, corregir el archivo .tsx del componente (tokens/radius/shadow) ANTES de reejecutar el plugin.",
                color: "border-success/30 bg-success/5",
                badge: "bg-success/10 text-success",
              },
              {
                step: "03",
                title: "Regenerar en Figma",
                desc: "Con el componente React corregido, re-ejecutar el plugin. El JSON component-map.json documenta el estado y el changelog.",
                color: "border-secondary bg-card",
                badge: "bg-muted text-secondary",
              },
            ].map((item) => (
              <div key={item.step} className={`rounded-xl border p-5 ${item.color}`}>
                <div className={`inline-block rounded-md px-2 py-0.5 mb-3 font-mono ${item.badge}`}>
                  Paso {item.step}
                </div>
                <h4 className="text-foreground mb-2">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </TooltipProvider>
  );
}