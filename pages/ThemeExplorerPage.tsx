import { Check, Paintbrush } from "lucide-react";
import { useTheme, DESIGN_THEMES, DesignTheme } from "../components/providers/ThemeProvider";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
import { cn } from "../components/ui/utils";

/* ── Preview Panel ──────────────────────────────────────────────────────────── */

function PreviewPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* Buttons */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Buttons</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="destructive" size="sm">Destructive</Button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Badges</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success-soft">Success</Badge>
          <Badge variant="warning-soft">Warning</Badge>
          <Badge variant="destructive-soft">Error</Badge>
          <Badge variant="info-soft">Info</Badge>
        </div>
      </div>

      {/* Inputs */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Form</p>
        <div className="flex gap-2">
          <Input placeholder="Placeholder text..." className="max-w-xs" />
          <Button size="default">Submit</Button>
        </div>
      </div>

      {/* Card */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Card</p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Factura #001234</CardTitle>
            <CardDescription>Empresa ABC · Vence el 30 Abr 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">$48,500,000</span>
              <Badge variant="success-soft">Activo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Alerts</p>
        <div className="flex flex-col gap-2">
          <Alert variant="info">
            <AlertTitle>Información</AlertTitle>
            <AlertDescription>La factura fue recibida y está en proceso de verificación.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>El archivo no cumple con el formato requerido.</AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Typography */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Typography</p>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold text-foreground">Heading XL</p>
          <p className="text-xl font-semibold text-foreground">Heading LG</p>
          <p className="text-base text-foreground">Body text — Información de la cesión de facturas</p>
          <p className="text-sm text-muted-foreground">Small — Fecha de creación: 15 Abr 2026</p>
          <p className="text-xs text-muted-foreground">XS — ID: cesion-bnk-0012</p>
        </div>
      </div>

      {/* Color swatches */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Semantic Colors</p>
        <div className="grid grid-cols-6 gap-2">
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-success-subtle border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Success</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-warning-subtle border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Warning</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-destructive-subtle border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Error</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-info-subtle border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Info</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-muted border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Muted</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-full rounded bg-primary border border-border" />
            <span className="text-2xs text-muted-foreground text-center">Primary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Theme Card ─────────────────────────────────────────────────────────────── */

function ThemeSelectCard({
  config,
  isActive,
  onSelect,
}: {
  config: (typeof DESIGN_THEMES)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      data-theme={config.id === "cesionbnk" ? undefined : config.id}
      className={cn(
        "group relative text-left rounded-xl border p-4 transition-all w-full",
        "hover:border-primary/60 hover:shadow-elevation-2",
        isActive
          ? "border-primary bg-primary/5 shadow-elevation-2 ring-1 ring-primary/20"
          : "border-border bg-card hover:bg-accent/30"
      )}
    >
      {/* Swatch strip — uses real CSS variables from the theme itself */}
      <div className="flex gap-1.5 mb-3 bg-background p-1 rounded-lg border border-border/40">
        <div className="h-6 flex-1 rounded-md bg-primary" />
        <div className="h-6 flex-1 rounded-md border border-border bg-background" />
        <div className="h-6 flex-1 rounded-md bg-accent" />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{config.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {config.description}
          </p>
        </div>
        {isActive && (
          <div className="flex-shrink-0 size-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="size-3 text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────────── */

export function ThemeExplorerPage() {
  const { designTheme, setDesignTheme, colorMode, toggleColorMode } = useTheme();

  const activeConfig = DESIGN_THEMES.find((t) => t.id === designTheme)!;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Paintbrush className="size-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Theme Explorer</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Cambia la identidad visual del sistema en tiempo real — los componentes no cambian, solo los tokens CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
        {/* Selector column */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-1">Temas disponibles</h2>
            <p className="text-xs text-muted-foreground mb-3">
              Selecciona un estilo visual. El cambio es instantáneo y persiste en localStorage.
            </p>
            <div className="flex flex-col gap-2">
              {DESIGN_THEMES.map((t) => (
                <ThemeSelectCard
                  key={t.id}
                  config={t}
                  isActive={designTheme === t.id}
                  onSelect={() => setDesignTheme(t.id as DesignTheme)}
                />
              ))}
            </div>
          </div>

          {/* Dark mode toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Color mode</p>
              <p className="text-xs text-muted-foreground capitalize">{colorMode} mode activo</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleColorMode}>
              {colorMode === "dark" ? "Light" : "Dark"}
            </Button>
          </div>

          {/* How it works */}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-xs font-semibold text-foreground mb-2">Cómo funciona</p>
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <p>→ Cada tema sobreescribe custom properties CSS en <code className="font-mono text-foreground">[data-theme=&quot;...&quot;]</code></p>
              <p>→ Los componentes usan tokens semánticos (<code className="font-mono text-foreground">bg-primary</code>, <code className="font-mono text-foreground">text-foreground</code>)</p>
              <p>→ Al cambiar el tema, los tokens cambian — los componentes no</p>
              <p>→ CesionBNK es el default (<code className="font-mono text-foreground">:root</code>, sin atributo)</p>
            </div>
          </div>
        </div>

        {/* Preview column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Preview — {activeConfig.label}
            </h2>
            <Badge variant="outline" className="text-xs font-mono">
              {designTheme === "cesionbnk" ? ":root" : `[data-theme="${designTheme}"]`}
            </Badge>
          </div>
          <div className="rounded-xl border border-border bg-background p-6 shadow-elevation-1">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
